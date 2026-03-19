# Ingestion Pipeline Plan
## Source Bible — Data Import and Normalization

> How to get from raw public-domain datasets to a queryable production database.
> All scripts are one-time runs (idempotent with upserts). Order matters.

---

## Pipeline Overview

```
Raw Sources (files, APIs, SWORD modules)
        │
        ▼
Download & Cache Scripts (run once, local copies)
        │
        ▼
Normalizers (parse → canonical format)
        │
        ▼
DB Insert Scripts (idempotent upserts)
        │
        ▼
Linking Scripts (join tables, alignment edges)
        │
        ▼
Index Generation (full-text, vector embeddings)
        │
        ▼
Validation Checks (row counts, spot checks)
```

---

## Stage 0 — Pre-conditions

Run all scripts from a `scripts/ingestion/` directory.

```
.env:
  DATABASE_URL=...
  OPENAI_API_KEY=...         # For embeddings
  SWORD_MODULES_PATH=...     # Local path to downloaded SWORD modules
  MACULA_DATA_PATH=...       # Local path to Macula TSV downloads
  STRONGS_DATA_PATH=...      # Local path to openscriptures/strongs JSON
```

**Download these before running the pipeline (one-time manual step):**

1. `macula-hebrew` TSV from github.com/Clear-Bible/macula-hebrew
2. `macula-greek` TSV from github.com/Clear-Bible/macula-greek
3. Strong's Hebrew JSON from github.com/openscriptures/strongs
4. Strong's Greek JSON from same repo
5. KJV XML/JSON from github.com/christos-c/bible-corpus or eBible.org
6. Ogienko Ukrainian Bible text (verify public domain status first)
7. Matthew Henry Commentary (SWORD module or CCEL HTML)
8. Spurgeon Treasury of David (CCEL HTML)
9. Calvin Commentaries (CCEL HTML — available for major books)
10. TSK cross-references CSV from openscriptures or SWORD `TSK` module
11. OpenBible cross-references TSV from openbible.info/labs/cross-references

---

## Stage 1 — Seed Static Data

**Script:** `seed-books.ts`

Insert all 66 canonical books with `canonical_order`, `osis_id`, `testament`, `chapter_count`.

Use a hardcoded JSON fixture (doesn't change):
```json
[
  { "canonicalOrder": 1, "osisId": "Gen", "nameEn": "Genesis", "testament": "OT", "chapterCount": 50 },
  ...
  { "canonicalOrder": 19, "osisId": "Ps", "nameEn": "Psalms", "testament": "OT", "chapterCount": 150 },
  ...
  { "canonicalOrder": 66, "osisId": "Rev", "nameEn": "Revelation", "testament": "NT", "chapterCount": 22 }
]
```

Also insert the 2 MVP translations:
```sql
INSERT INTO translations (code, name, language, direction, testament, license)
VALUES
  ('KJV', 'King James Version', 'en', 'ltr', 'all', 'public_domain'),
  ('OGI', 'Переклад Огієнка', 'uk', 'ltr', 'all', 'public_domain');
```

**Estimated time:** < 1 second.

---

## Stage 2 — Bible Text Ingestion

### 2a. KJV Text

**Script:** `ingest-kjv.ts`

**Source:** eBible.org KJV USX or christos-c/bible-corpus XML

**Steps:**
1. Parse XML/JSON verse by verse
2. For each verse:
   - Upsert `verses (book_id, chapter, verse, osis_ref)` row
   - Upsert `verse_texts (verse_id, translation_id=KJV, text)` row
3. After all inserts, run:
   ```sql
   UPDATE verse_texts SET text_tsv = to_tsvector('english', text)
   WHERE translation_id = (SELECT id FROM translations WHERE code = 'KJV');
   ```

**Expected row counts:**
- `verses`: 31,102 rows
- `verse_texts` (KJV): 31,102 rows

**Idempotency:** `ON CONFLICT (verse_id, translation_id) DO UPDATE SET text = EXCLUDED.text`

**Estimated time:** 30 min to write script, ~2 min to run.

---

### 2b. Ukrainian Ogienko Text

**Script:** `ingest-ogienko.ts`

Same pattern as KJV. Source format varies (likely plain text, one verse per line or USFM).

**Note:** Verify public domain status before running in production. See `DATA_SOURCES_AND_INTEGRATIONS.md`.

---

## Stage 3 — Original Language Tokens (Macula)

### 3a. Macula Hebrew (OT)

**Script:** `ingest-macula-hebrew.ts`

**Source:** `macula-hebrew/sources/*.tsv` — one file per book or all combined

**Macula TSV columns (relevant subset):**
```
xml:id | ref | text | lemma | normalized | strong | morph | gloss | ...
```

**Steps:**
1. Parse TSV line by line
2. Parse `ref` → extract OSIS reference → look up `verse_id` from `verses` table
3. For each token row:
   - Upsert `source_tokens (verse_id, token_index, testament='OT', original_text, transliteration, lemma, strong_number, morphology_code, gloss)`
4. Upsert `lexemes (lemma, language='Hebrew', strong_number, gloss)` for each unique lemma

**Strong number normalization:**
- Macula uses format `H835` — store as-is
- Some Macula entries have Strong's variants (e.g., `H835a`) — normalize to base number + variant field

**Expected row counts:**
- `source_tokens`: ~306,000 rows (OT Hebrew)
- `lexemes`: ~8,674 unique lemmas

**Estimated time:** 1–2 hours to write, ~10 min to run.

---

### 3b. Macula Greek (NT)

**Script:** `ingest-macula-greek.ts`

Same pattern. Source is `macula-greek/sources/*.tsv`.

**Greek morphology** uses Robinson code format (e.g., `V-PAI-1S`). Parse into `morphology_tags` rows.

**Expected row counts:**
- `source_tokens`: ~138,000 rows (NT Greek)
- `lexemes`: ~5,624 unique lemmas

---

### 3c. Morphology Tag Parsing

**Script:** `parse-morphology-tags.ts`

After `source_tokens` are inserted, run a batch parser:

1. For each `source_token` with a `morphology_code`:
2. Parse the code:
   - Macula Hebrew: `HNcmpa` → `H`=Hebrew, `N`=Noun, `c`=common gender, `m`=masculine, `p`=plural, `a`=absolute
   - Macula Greek: `V-PAI-1S` → Verb, Present Active Indicative, 1st Singular
3. Insert `morphology_tags` row
4. Compute `display_label` in English and Ukrainian:
   - `"Noun | plural | construct"` (EN)
   - `"Іменник | мн. | status constructus"` (UK)

**Connection to prototype:** `OriginalToken.morphology` is currently a display string like `"Іменник | мн."`. This script generates that string from parsed codes.

---

## Stage 4 — Strong's Dictionary

**Script:** `ingest-strongs.ts`

**Source:** openscriptures/strongs JSON (`hebrew_strongs_dict.json`, `greek_strongs_dict.json`)

**Steps:**
1. Parse JSON (keyed by Strong's number)
2. For each entry, upsert `strong_entries (strong_number, original_text, transliteration, pronunciation, source_entry, kjv_definition, testament)`
3. Link to `lexemes` where `lexemes.strong_number = strong_entries.strong_number`

**Expected row counts:**
- `strong_entries`: ~8,674 Hebrew + ~5,624 Greek = ~14,298 rows

---

## Stage 5 — Cross-References

**Script:** `ingest-cross-references.ts`

**Sources:**
1. Treasury of Scripture Knowledge (TSK) — CSV
2. OpenBible cross-references — TSV with confidence scores

**Steps:**
1. Parse TSK CSV: `from_ref, to_ref`
2. Parse OpenBible TSV: `from_ref, to_ref, votes`
3. For each row:
   - Resolve `from_verse_id` and `to_verse_id` from OSIS refs
   - Upsert `cross_references (from_verse_id, to_verse_id, source, confidence)`
4. After both sources, merge duplicates (same from/to pair from different sources → keep both source labels)

**Expected row counts:**
- TSK: ~500,000 rows
- OpenBible: ~350,000 rows (some overlap)
- Combined unique: ~600,000–700,000 rows

**Connection to prototype:** `cross-references.json` has 12 cross-references for Psalm 1. Backend has all ~500K.

---

## Stage 6 — Commentary Ingestion

**Script:** `ingest-commentary-henry.ts` / `ingest-commentary-spurgeon.ts` / `ingest-commentary-calvin.ts`

**Matthew Henry:**
- Source: CCEL HTML or SWORD module
- Structure: Book → Chapter → section (usually 1–2 sections per chapter)
- Parse HTML → extract commentary text per verse range
- Normalize to Markdown (remove HTML tags, preserve lists/paragraphs)
- Upsert `commentary_entries (source_id=HENRY, book_id, chapter_start, verse_start, verse_end, content_markdown)`

**Spurgeon Treasury of David:**
- Psalm-only (150 chapters)
- Source: CCEL HTML (well structured)
- Similar parse pattern
- Maps 1:1 to Psalm chapters and individual verse expositions

**Calvin Commentaries:**
- More complex structure — Calvin wrote in sections, not verse-by-verse
- Map section headings to approximate verse ranges
- Upsert with `verse_start` and `verse_end` set to the range

**After insertion:**
```sql
UPDATE commentary_entries SET content_tsv = to_tsvector('english', content_markdown);
```

**Expected row counts:**
- Henry: ~7,900 sections (covers all 66 books)
- Spurgeon: ~900 sections (Psalms only)
- Calvin: ~3,000 sections (major books)

**Connection to prototype:** `data/commentary-henry.json`, `data/commentary-spurgeon.json`, `data/commentary-calvin.json` exist for Psalm 1. The ingestion pipeline extends this to the full Bible.

---

## Stage 7 — Translation Token Alignment

**Script:** `generate-translation-tokens.ts`

For each verse in each translation:
1. Tokenize the verse text (split on spaces + punctuation boundaries)
2. Insert `translation_tokens (verse_id, translation_id, token_index, text, anchor_key, is_punctuation)`
3. `anchor_key` = lowercased word, stripped of diacritics

**Note:** This is a simple whitespace tokenizer for Phase 1. Morphological tokenizers can improve accuracy later.

**Script:** `generate-alignment-edges.ts`

For Phase 1: skip formal alignment. Instead, link `translation_tokens` to `source_tokens` via Strong's number:
- If a `translation_token.anchor_key` maps to a known `lexeme`, insert an `alignment_edge`
- This is approximate — formal word-alignment (eflomal, awesome-align) can replace this later

---

## Stage 8 — Search Chunks

**Script:** `generate-search-chunks.ts`

For each `verse_text` in each translation:
1. Create a `search_chunks` row: `(translation_id, verse_start_id, verse_end_id=verse_start_id, chunk_text=verse_text.text, chunk_type='verse')`

**Optional additional chunks (post-MVP):**
- 3-verse sliding window passages
- Chapter introductions from commentary

**Expected row counts:**
- 31,102 verses × 2 translations = ~62,204 chunks for MVP

---

## Stage 9 — Embedding Generation

**Script:** `generate-embeddings.ts`

**Steps:**
1. Query all `search_chunks` with no associated `search_embedding`
2. Batch into groups of 100
3. For each batch:
   ```typescript
   const response = await openai.embeddings.create({
     model: "text-embedding-3-small",
     input: batch.map(c => c.chunkText)
   });
   ```
4. Insert `search_embeddings (chunk_id, model, embedding)` rows

**Rate limiting:** OpenAI rate limit is 3,000 RPM on `text-embedding-3-small`. At batch size 100, that's 600 batches for 60,000 chunks — ~12 minutes to generate.

**Cost:** 62,204 chunks × ~100 tokens avg = ~6.2M tokens → ~$0.12 total at $0.02/1M

**After insertion, create IVFFlat index:**
```sql
CREATE INDEX ON search_embeddings USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

**Estimated time:** ~15 minutes total.

---

## Stage 10 — Validation

**Script:** `validate-ingestion.ts`

Run after pipeline completes:

```
✓ books: 66 rows
✓ translations: 2 rows
✓ verses: 31,102 rows
✓ verse_texts (KJV): 31,102 rows
✓ verse_texts (OGI): 31,102 rows
✓ source_tokens (OT Hebrew): ~306,000 rows
✓ source_tokens (NT Greek): ~138,000 rows
✓ lexemes: ~14,298 rows
✓ strong_entries: ~14,298 rows
✓ cross_references: ~600,000+ rows
✓ commentary_entries (HENRY): ~7,900 rows
✓ commentary_entries (SPURGEON): ~900 rows
✓ search_chunks: ~62,204 rows
✓ search_embeddings: ~62,204 rows

Spot checks:
✓ Ps.1.1 KJV text = "Blessed is the man that walketh not in the counsel of the ungodly..."
✓ H835 lexeme exists: "happiness, blessedness"
✓ Strong H835 source_tokens count = 45 (expected from concordance)
✓ Ps.1.1 cross-references count ≥ 3
✓ HENRY commentary exists for Ps.1
✓ Embedding for Ps.1.1 KJV chunk exists
✓ Vector similarity: nearest neighbor of Ps.1.1 embedding is in Ps or Prov (sanity check)
```

---

## Running Order

```bash
# Stage 1
npx ts-node scripts/ingestion/seed-books.ts

# Stage 2
npx ts-node scripts/ingestion/ingest-kjv.ts
npx ts-node scripts/ingestion/ingest-ogienko.ts

# Stage 3
npx ts-node scripts/ingestion/ingest-macula-hebrew.ts
npx ts-node scripts/ingestion/ingest-macula-greek.ts
npx ts-node scripts/ingestion/parse-morphology-tags.ts

# Stage 4
npx ts-node scripts/ingestion/ingest-strongs.ts

# Stage 5
npx ts-node scripts/ingestion/ingest-cross-references.ts

# Stage 6
npx ts-node scripts/ingestion/ingest-commentary-henry.ts
npx ts-node scripts/ingestion/ingest-commentary-spurgeon.ts
npx ts-node scripts/ingestion/ingest-commentary-calvin.ts

# Stage 7
npx ts-node scripts/ingestion/generate-translation-tokens.ts
npx ts-node scripts/ingestion/generate-alignment-edges.ts

# Stage 8
npx ts-node scripts/ingestion/generate-search-chunks.ts

# Stage 9
npx ts-node scripts/ingestion/generate-embeddings.ts

# Stage 10
npx ts-node scripts/ingestion/validate-ingestion.ts
```

**Total pipeline time estimate (first full run):** ~3–4 hours (dominated by parsing HTML commentary and LLM embedding generation)

**Subsequent re-runs (incremental):** minutes (idempotent upserts skip existing rows; embeddings script skips chunks that already have embeddings)

---

## Content Versioning

Add `version` + `last_updated_at` columns to all content tables.

When re-running ingestion (e.g., after a source update):
1. Bump `version` on changed rows
2. Keep `search_embeddings` linked to the chunk version
3. Mark stale embeddings for regeneration via `is_stale BOOLEAN DEFAULT FALSE`

This allows partial re-ingestion without full pipeline reruns.
