# MVP Spike Plan
## Source Bible — First Backend Implementation Spike

> Goal: Prove the backend architecture works end-to-end before committing to full ingestion.
> Scope: One book (Psalms), one translation (KJV), core services running.

---

## Spike Objective

Replace the hardcoded `PSALM_1` constant and static `api/search.ts` in the prototype with:
1. A real PostgreSQL database
2. A Bible Content Service endpoint
3. A Search Service endpoint (full-text + semantic)
4. AI Orchestration Service (RAG replacing the current Gemini call)

Confirm the frontend can load Psalm 1 from the API and AI search returns relevant results from retrieved passages.

---

## Phase 0 — Environment Setup (Day 1)

**What to create:**
- Node.js / Bun backend repo (can be monorepo with frontend or separate)
- PostgreSQL instance (local Docker or Railway)
- Redis instance (local Docker or Upstash free tier)
- `.env` with:
  ```
  DATABASE_URL=postgresql://...
  REDIS_URL=redis://...
  GEMINI_API_KEY=...
  OPENAI_API_KEY=...    (for embeddings)
  ```

**Stack decision:**
- Runtime: Bun (or Node 20+)
- Framework: Hono (TypeScript, edge-compatible, fast)
- ORM: Drizzle ORM (TypeScript-first, SQL-close, works with Bun)
- Validation: Zod
- PostgreSQL driver: `postgres` (bun compatible)
- Vector: `pgvector` extension in PostgreSQL

**Deliverable:** `docker-compose.yml` with Postgres + pgvector + Redis. Dev server running at `:4000`.

---

## Phase 1 — Database Schema + Migration (Day 1–2)

**Run migrations for these tables only (minimal spike set):**

```sql
translations       -- 1 row: KJV
books              -- 66 rows (seed from static list)
verses             -- Psalms only: 150 chapters, ~2,461 verses
verse_texts        -- KJV text for Psalms only
source_tokens      -- Macula Hebrew for Psalms (OT only for this spike)
lexemes            -- Strong's H-numbers referenced in Psalms
strong_entries     -- Same subset
search_chunks      -- KJV Psalm 1–150, one row per verse
search_embeddings  -- Vectors for above (pgvector)
```

**Why Psalms only:**
- Proof of concept fits in a weekend
- Psalm 1 is already in the prototype — can diff against the DB output
- Psalms has rich word-study content (Hebrew poetry)

---

## Phase 2 — Data Ingestion (Day 2–3)

Write a one-time CLI ingestion script:

### 2a. KJV Text for Psalms

**Source:** eBible.org KJV USFM or getBible KJV JSON (acceptable for spike, not production)

```
scripts/ingest-kjv-psalms.ts
```

1. Fetch/parse KJV Psalms JSON
2. For each verse: insert `verse` + `verse_text (translation=KJV)` row
3. Log: `Ingested Psalm {chapter}:{verse}`

**Expected duration:** 30 minutes to write, <5 minutes to run.

### 2b. Macula Hebrew for Psalms

**Source:** Download `macula-hebrew` TSV from github.com/Clear-Bible/macula-hebrew

```
scripts/ingest-macula-psalms.ts
```

1. Filter rows where OSIS ref starts with `Ps`
2. For each token: insert `source_token` row linked to `verse`
3. Also upsert `lexeme` rows from `strong_number + lemma + gloss`

**Expected duration:** 1 hour to write, <10 minutes to run on Psalms.

### 2c. Strong's Dictionary (H-numbers)

**Source:** openscriptures/strongs JSON export

```
scripts/ingest-strongs-hebrew.ts
```

1. Parse JSON
2. Upsert `strong_entries` for all H-numbers
3. Link to `lexemes` by `strong_number`

**Expected duration:** 2 hours including normalization.

### 2d. Embeddings Generation

```
scripts/generate-embeddings.ts
```

1. Query all `search_chunks` for KJV Psalms with no embedding
2. Call `openai.embeddings.create({ model: "text-embedding-3-small", input: chunk_text })`
3. Insert `search_embedding` rows
4. Batch 100 at a time to stay within API rate limits

**Cost estimate:** 2,461 verses × ~100 tokens = ~246K tokens → ~$0.005 total. Negligible.

**Expected duration:** <1 hour to write, ~5 minutes to run.

---

## Phase 3 — Bible Content Service (Day 3–4)

Implement one endpoint:

### `GET /api/bible/:translation/:book/:chapter`

**Returns:**
```json
{
  "translation": "KJV",
  "book": "Psalms",
  "chapter": 1,
  "verses": [
    {
      "verse": 1,
      "text": "Blessed is the man that walketh not...",
      "tokens": [
        { "index": 0, "text": "Blessed", "anchorKey": "blessed", "originalToken": null },
        ...
      ],
      "originalTokens": [
        {
          "index": 0,
          "original": "אַשְׁרֵי",
          "transliteration": "ashrei",
          "strongNumber": "H835",
          "gloss": "Blessed",
          "morphologyDisplay": "Noun | plural | construct"
        }
      ]
    }
  ]
}
```

**This replaces `PSALM_1` and `VERSE_STUDY_DB[v].originalTokens` in `constants.ts`.**

The frontend `BibleText.tsx` component currently reads `PSALM_1`. Change this to:
```typescript
const { data: chapter } = useQuery(['bible', 'KJV', 'Psalms', 1], () =>
  fetch('/api/bible/KJV/Psalms/1').then(r => r.json())
);
```

---

## Phase 4 — Search Service (Day 4)

### `POST /api/search`

**Request:**
```json
{
  "query": "the righteous man walks in God's way",
  "filters": { "testament": "OT", "book": "Psalms" },
  "mode": "hybrid"
}
```

**Internal flow:**
1. Run full-text search on `verse_texts` (tsvector)
2. Generate embedding for query (OpenAI)
3. Run vector similarity on `search_embeddings`
4. Merge results with Reciprocal Rank Fusion
5. Return top 10 chunks with scores

**Response:**
```json
{
  "results": [
    {
      "chunkId": 1,
      "verseRef": "Ps.1.1",
      "text": "Blessed is the man...",
      "score": 0.92,
      "book": "Psalms",
      "chapter": 1,
      "verse": 1
    }
  ]
}
```

---

## Phase 5 — AI Orchestration Service (Day 5)

### `POST /api/ai/search`

**Request:** Same as current `api/search.ts`:
```json
{ "query": "What does it mean to walk with the wicked?" }
```

**Internal flow (replacing current hardcoded context approach):**
1. Call Search Service with the query
2. Take top 5 chunks
3. Build prompt:
   ```
   You are a Bible study assistant. Based only on the following passages, answer the question.

   Passages:
   [Ps.1.1] "Blessed is the man..."
   [Ps.1.2] "But his delight is in the law..."
   ...

   Question: What does it mean to walk with the wicked?

   Respond in JSON: { "explanation": string, "verseRefs": string[], "confidence": "high" | "medium" | "low" }
   ```
4. Call Gemini (or Claude) with structured output schema
5. Validate response shape
6. Return structured result

**Response:**
```json
{
  "explanation": "Walking with the wicked means habitually associating with...",
  "verses": [
    { "ref": "Ps.1.1", "text": "Blessed is the man...", "relevance": 0.95 },
    { "ref": "Ps.1.4", "text": "The ungodly are not so...", "relevance": 0.72 }
  ],
  "confidence": "high"
}
```

**This replaces `api/search.ts` entirely.** The current file sends `PSALM_1` as raw text context. The new version sends top retrieved passages from the Search Service.

---

## Phase 6 — Frontend Integration (Day 5–6)

**Minimal changes to prototype to consume the new API:**

1. `constants.ts`: Keep as fallback; add `USE_BACKEND_API = true` flag
2. `App.tsx`: Add `useEffect` to load chapter from API on mount when flag is true
3. `api/search.ts`: Replace implementation with call to new `/api/ai/search`
4. `SearchView.tsx`: No change needed — it already calls `api/search.ts`

**Test:**
- Load `localhost:3000` — Psalm 1 loads from DB not constants
- Type query in AI search → response comes from RAG not hardcoded text
- Original Hebrew tokens display correctly

---

## Phase 7 — Validation Checklist

- [ ] KJV Psalm 1 verse text from DB matches current `PSALM_1` text in `constants.ts`
- [ ] Hebrew tokens for Psalm 1:1 from DB match `VERSE_STUDY_DB[1].originalTokens`
- [ ] AI search for "blessed man" returns Psalm 1:1 as top result
- [ ] AI search for "like a tree" returns Psalm 1:3
- [ ] AI search explanation is coherent
- [ ] Search latency < 3 seconds end-to-end (including LLM call)
- [ ] Bible chapter API response time < 200ms (from cache after first load)
- [ ] No hardcoded Psalm 1 context being sent to LLM

---

## What the Spike Does NOT Include (by design)

- Multi-book support (architecture works; just skip ingestion for now)
- User accounts / auth / notes / bookmarks
- Commentary endpoint (content service works; skip commentary table for spike)
- Cross-reference endpoint
- Translation switching UI
- Mobile offline support

These are Phases 2–4 of the full implementation.

---

## Spike Timeline

| Day | Deliverable |
|---|---|
| 1 | DB schema migrations, Docker Compose, Hono server running |
| 2 | KJV Psalms ingested, Macula Hebrew ingested for Psalm 1 |
| 3 | Strong's ingested, Embeddings generated |
| 4 | Bible Content + Search endpoints working and tested |
| 5 | AI Orchestration endpoint working, frontend integrated |
| 6 | Validation checklist complete, spike demo |

**Output of the spike:** A working system that can answer "What does Psalm 1 teach about the righteous man?" using retrieved passages — not hardcoded text.

---

## Phase 2+ Implementation Sequence

After the spike is validated:

1. **Expand content**: Ingest all 66 books (KJV + Ukrainian Ogienko)
2. **Study data**: Commentary, cross-references endpoints
3. **Word study**: Strong's + morphology API endpoint
4. **User auth**: JWT auth, user registration
5. **User data**: Notes, highlights, bookmarks persistence
6. **Translation switching**: Multiple translations ingested + UI connected
7. **Concordance**: All occurrences query endpoint
8. **Offline bundles**: Pre-built book JSON for service worker
9. **Licensed translations**: Ingestion pipeline for NIV/ESV once licensed
