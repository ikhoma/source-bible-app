# Backend Architecture Plan
## Source Bible — Pro Bible Study App

> Status: Planning document. No backend exists yet.
> Evidence base: Prototype inspection of App.tsx, constants.ts, api/search.ts, types.ts, data/*.

---

## 1. Current State Summary

The prototype is a **single-page React app** with all content hardcoded:

| What | Where in prototype |
|---|---|
| Bible text (Psalm 1 only) | `constants.ts` → `PSALM_1: Verse[]` |
| All 4 translations | `VERSE_STUDY_DB[verseId].translations[]` inside `constants.ts` |
| Hebrew original tokens | `VERSE_STUDY_DB[verseId].originalTokens[]` inside `constants.ts` |
| Cross-references | `data/cross-references-ukrainian.json` + `data/cross-references.json` |
| Commentary (Calvin, Henry, Spurgeon) | `data/commentary-*.json` + `VERSE_STUDY_DB[verseId].commentaries[]` |
| Word definitions, Strong's, morphology | `data/wordStudyDb.ts` |
| AI search | `api/search.ts` → Gemini with Psalm 1 text hardcoded as context |
| User state (highlights) | React `useState` in `App.tsx`, lost on refresh |
| Notes / bookmarks | UI only, no implementation |

**Scaling blockers:**
- All Bible content is a static TypeScript constant. Adding Genesis chapter 1 requires manually editing `constants.ts`.
- AI search sends the full Psalm 1 text verbatim as context. For the whole Bible (31,102 verses), this approach is impossible.
- No user accounts. No persistence. No authentication.
- Token structure (`v{verseId}-t{tokenIndex}`) is Psalm-1-specific. No book/chapter scoping.
- Commentary and cross-references are siloed JSON blobs with no relational structure.

---

## 2. Target Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                │
│  React PWA (mobile-first)                                           │
│  • Bible reader  • Word/Verse study  • AI search  • User data       │
│  • Offline-capable bundles (service worker, future)                 │
└───────────────────────────┬─────────────────────────────────────────┘
                            │  HTTPS / REST or tRPC
┌───────────────────────────▼─────────────────────────────────────────┐
│                           API GATEWAY                               │
│  • Auth / JWT validation          • Rate limiting                   │
│  • Request validation             • Response envelope formatting    │
│  • Routing to internal services   • Error normalization             │
└──┬──────────┬──────────┬──────────┬──────────┬───────────────────┬──┘
   │          │          │          │          │                   │
   ▼          ▼          ▼          ▼          ▼                   ▼
┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────────┐  ┌──────────────┐
│Bible │  │Study │  │Search│  │  AI  │  │  User    │  │   Admin /    │
│Conten│  │Data  │  │Svc   │  │Orch. │  │  Data    │  │  Ingestion   │
│  Svc │  │  Svc │  │      │  │  Svc │  │  Svc     │  │  Pipeline   │
└──┬───┘  └──┬───┘  └──┬───┘  └──┬───┘  └──┬───────┘  └──────────────┘
   │         │         │         │          │
   └────┬────┘         │    ┌────┘          │
        │              │    │               │
┌───────▼──────────────▼────▼───────────────▼──────────┐
│                    DATA LAYER                          │
│  ┌──────────────┐  ┌──────────┐  ┌────────────────┐  │
│  │  Relational  │  │  Vector  │  │     Cache      │  │
│  │  DB (Pg)     │  │  DB      │  │    (Redis)     │  │
│  │  Bible text  │  │  pgvecto │  │  hot verses    │  │
│  │  Study data  │  │  -rs or  │  │  study data    │  │
│  │  User data   │  │  Pinecone│  │  search results│  │
│  └──────────────┘  └──────────┘  └────────────────┘  │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Object Storage (S3/R2) - optional               │ │
│  │  Audio files, user attachments, export bundles   │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

---

## 3. API Gateway

**Technology options:** Hono (edge-native, TypeScript), Fastify, or tRPC over Next.js
**Recommended:** Hono on Cloudflare Workers or Node.js target

**Responsibilities:**
- JWT validation (Auth0 / Clerk / custom)
- Request body validation (Zod schemas)
- Rate limiting per IP + per user tier
- Route forwarding to internal services (or monolith routing)
- Response envelope: `{ data, error, meta }`
- Correlation IDs for tracing

**Auth strategy:**
- JWT with short expiry (15m access + 7d refresh)
- Anonymous read allowed for Bible content
- Authenticated required for: notes, highlights, bookmarks, preferences
- Future: user tier (free vs pro) for AI search quota

---

## 4. Core Backend Services

### 4.1 Bible Content Service

**Purpose:** Serve Bible text, translations, passage ranges, and original-language tokens.

**Key operations:**
- `GET /bible/{translation}/{book}/{chapter}` → full chapter with verse tokens
- `GET /bible/{translation}/{book}/{chapter}/{verse}` → single verse
- `GET /bible/passage/{ref}` → passage range (e.g., John 3:16-21)
- `GET /bible/translations` → list available translations with metadata
- `GET /bible/original/{testament}/{book}/{chapter}/{verse}` → Hebrew/Greek source tokens

**Data served:**
- `VerseText` rows (per translation)
- `SourceToken` rows (Hebrew/Greek with Strong's, morphology)
- `Translation` metadata

**Connection to prototype:**
Replaces `PSALM_1` and `VERSE_STUDY_DB[v].translations[]` and `VERSE_STUDY_DB[v].originalTokens[]` in `constants.ts`. The token ID format `v{id}-t{idx}` currently has no book/chapter scope—the backend uses `{translation}:{book}:{chapter}:{verse}:{tokenIndex}` as the canonical reference.

---

### 4.2 Study Data Service

**Purpose:** Serve cross-references, commentary, lexicon data, morphology, concordance.

**Key operations:**
- `GET /study/cross-references/{book}/{chapter}/{verse}` → array of `CrossReference`
- `GET /study/commentary/{source}/{book}/{chapter}/{verse}` → `CommentaryEntry`
- `GET /study/lexicon/{strongsNumber}` → `StrongEntry` + `Lexeme`
- `GET /study/word/{anchorKey}` → word study aggregation (replaces `WORD_STUDY_DB[key]`)
- `GET /study/morphology/{book}/{chapter}/{verse}/{tokenIndex}` → morphology tags
- `GET /study/concordance/{strongsNumber}` → all occurrences across Bible

**Connection to prototype:**
Replaces `WORD_STUDY_DB` from `data/wordStudyDb.ts` and commentary fields in `VERSE_STUDY_DB`. The `anchorKey` pattern used in `types.ts` (`WordStudyData`) maps directly to the `anchorKey → StrongEntry` lookup.

---

### 4.3 Search Service

**Purpose:** Full-Bible text search (keyword + semantic) with hybrid retrieval.

**Key operations:**
- `POST /search` → `{ query, filters }` → ranked passages + metadata
- `GET /search/suggestions?q=` → autocomplete from verse text + titles

**Internally:**
- Keyword search via full-text index in PostgreSQL (`tsvector`)
- Semantic search via vector similarity in pgvector or Pinecone
- Hybrid merge with RRF (Reciprocal Rank Fusion) or scored merge
- Returns `SearchChunk[]` with scores, not raw verses

**Connection to prototype:**
Replaces the keyword filtering in `SearchView.tsx` (lines 155–200 approximately) which currently filters `PSALM_1` tokens in memory. Also replaces the AI search context—the Search Service provides retrieved passages to the AI Orchestration Service.

---

### 4.4 AI Orchestration Service

**Purpose:** RAG (retrieval-augmented generation) for natural-language Bible study questions.

**Key operations:**
- `POST /ai/search` → `{ query }` → `{ explanation, verses[], confidence }`
- `POST /ai/explain-word` → `{ strongsNumber, context }` → word explanation
- `POST /ai/commentary-synthesis` → generate synthesized commentary from sources

**Flow:**
1. Receive query
2. Call Search Service for top-K passages (semantic + keyword)
3. Rerank if needed
4. Build prompt: `[system] + [passages] + [user query] + [output schema]`
5. Call LLM (Gemini or Claude)
6. Validate structured output
7. Return to client

**Connection to prototype:**
Replaces `api/search.ts` which currently sends the whole Psalm 1 text as context. The current Gemini call using `gemini-3-flash-preview` is the correct LLM call pattern—the backend version simply wraps it with retrieved passages from the Search Service instead of hardcoded context.

---

### 4.5 User Data Service

**Purpose:** Persist and serve user-specific study data.

**Key operations:**
- `GET/POST/DELETE /user/highlights`
- `GET/POST/PUT/DELETE /user/notes`
- `GET/POST/DELETE /user/bookmarks`
- `GET/PUT /user/preferences` → theme, font, translation preference
- `GET /user/reading-history`
- `POST /user/reading-progress`

**Connection to prototype:**
Replaces the `highlights: Set<string | number>` state in `App.tsx` (currently lost on page refresh) and the placeholder `handleCreateNote()` which currently calls `alert()`. The `NavTab.Notes` already exists as a UI hook—connecting it to this service makes it functional.

---

## 5. Data Stores

### 5.1 Relational Database — PostgreSQL

**Schema areas:**
- Bible content: `translations`, `books`, `chapters`, `verses`, `verse_texts`
- Original language: `source_tokens`, `alignment_edges`
- Study data: `lexemes`, `strong_entries`, `morphology_tags`, `commentary_entries`, `cross_references`
- User data: `users`, `notes`, `highlights`, `bookmarks`, `reading_progress`, `preferences`

**Indexing:**
- Full-text (`tsvector`) on `verse_texts.text` per translation
- Composite indexes on `(book_id, chapter, verse)` for range queries
- `strong_number` index on `source_tokens` for concordance

### 5.2 Vector Database

**Purpose:** Semantic search embeddings for Bible passages.

**Options:**
- `pgvector` extension in PostgreSQL (simplest, same infra)
- Pinecone (managed, higher throughput if needed)

**Recommended for MVP:** pgvector (avoids separate infra)

**Schema:** `search_chunks(id, verse_range, text, embedding vector(1536), translation_id, book_id, chapter_start, verse_start, ...metadata)`

### 5.3 Cache — Redis

**What to cache:**
- Full chapter responses (Bible Content Service) — TTL 24h
- Study data per verse — TTL 1h
- AI search results for identical queries — TTL 30m
- Translation metadata list — TTL 1d

**Key patterns:**
```
bible:{translation}:{book}:{chapter}          → chapter JSON
study:cross-refs:{book}:{chapter}:{verse}     → cross-reference list
study:commentary:{source}:{book}:{chapter}:{verse} → commentary entry
ai:search:{sha256(query)}                     → search result
```

### 5.4 Object Storage (Cloudflare R2 or AWS S3) — Optional at MVP

**Use cases:**
- Offline content bundles (compressed book JSON for service worker)
- User note attachments (future)
- Commentary source backups

---

## 6. Admin / Ingestion Pipeline

A separate admin CLI / pipeline responsible for:
1. Import raw Bible text → normalize → insert to DB
2. Import original-language datasets (Macula) → link to verses
3. Import Strong's dictionaries → populate lexicon tables
4. Import commentary JSON → parse chapters/verse references → insert
5. Import cross-references → normalize → insert
6. Generate embeddings for all `search_chunks`
7. Build full-text search indexes

See `INGESTION_PIPELINE_PLAN.md` for detail.

---

## 7. Deployment Architecture (Recommended)

**MVP (simple):**
- Single Node.js/Bun monolith with service-layer separation (not microservices yet)
- PostgreSQL + pgvector (Railway, Supabase, or Neon)
- Redis (Upstash or Railway)
- Deployed on Fly.io, Railway, or Render
- Vite frontend on Vercel or Cloudflare Pages

**Scale-out path:**
- Split AI Orchestration to separate worker (LLM calls are slow, isolate them)
- Add read replicas to Postgres for Bible content reads
- Add CDN caching layer (Cloudflare) for Bible chapter responses
- Move to Pinecone if vector search becomes the bottleneck

---

## 8. What Stays Client-Side

| Concern | Decision | Rationale |
|---|---|---|
| Theme (light/dark) | Client-side (localStorage) | User preference, no server needed |
| Font style (modern/antique) | Client-side (localStorage) | Same |
| Last-read position | Client-side initially, sync to server periodically | Offline-first UX |
| Psalm 1 content bundle | Can ship as a static bundle for offline MVP | Fast first load |
| Token highlighting (transient) | Client-side | Session-only state |
| Sheet open/close state | Client-side | Pure UI state |
| Bottom nav active tab | Client-side | Pure UI state |

---

## 9. What Must Move Server-Side

| Concern | Must move because |
|---|---|
| Bible text for books beyond Psalm 1 | Cannot bundle entire Bible in JS |
| All translations (NIV, ESV, etc.) | Copyright—cannot bundle; must serve via authenticated API |
| Commentary for full Bible | Too large for client bundle |
| Cross-references (full) | ~80KB for Psalm 1 only; full Bible is much larger |
| AI search context | Whole Bible cannot be sent to LLM |
| User notes/highlights/bookmarks | Must persist across devices |
| Strong's concordance (all occurrences) | Requires full-Bible index |
| Morphology for all verses | Requires database query |

---

## 10. MVP Backend Scope

**Phase 1 — Minimal viable backend (recommended first spike):**
1. PostgreSQL schema for Bible content + one open translation
2. Ingest KJV (public domain) into DB
3. Bible Content Service: chapter endpoint
4. Search Service: full-text keyword search on KJV
5. AI Orchestration: RAG replacing current `api/search.ts`
6. Frontend updated to load chapters dynamically

That's it. Notes/highlights/bookmarks can stay in `localStorage` for Phase 1.

See `MVP_SPIKE_PLAN.md` for the concrete implementation plan.
