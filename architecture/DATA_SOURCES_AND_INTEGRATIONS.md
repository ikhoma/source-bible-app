# Data Sources and Integrations
## Source Bible — Pro Bible Study App

> For every source: licensing classification, ingestion strategy, and production suitability.

---

## A. Bible Text / Translations

### Strategy
**Do not build around external Bible APIs as a permanent core dependency.**
Ingest open/public-domain translations into internal PostgreSQL tables.
Licensed modern translations become separate controlled ingestion pipelines.

---

### A1. Public Domain / Open Translations (for MVP + Architecture)

| Translation | Source | License | Notes |
|---|---|---|---|
| King James Version (KJV) | CrossWire SWORD, getBible, eBible | **Public domain** | US/worldwide; excellent baseline |
| American Standard Version (ASV) | Same sources | **Public domain** | Already partially in prototype (`VERSE_STUDY_DB[v].translations`) |
| World English Bible (WEB) | eBible.org | **Public domain** | Modern public domain English translation |
| Ukrainian Ogienko Bible (УБТ) | Various | **Public domain (Ukraine)** | Already used in prototype as primary |
| Ukrainian Turkoniak | Publisher rights | **Likely requires licensing** | Used in prototype; verify before production |
| Septuagint (LXX, Greek) | SWORD / open | **Public domain** | OT Greek; needed for word study |
| Textus Receptus (Greek NT) | Open | **Public domain** | Base for Strong's NT |
| Westminster Leningrad Codex (Hebrew OT) | OSHB project | **CC BY 4.0** | Hebrew OT with vowels and accents |

**Recommended for MVP ingestion:** KJV + Ogienko Ukrainian + ASV (already implied by prototype)

---

### A2. Licensed Modern Translations (post-MVP)

| Translation | Rights Holder | Notes |
|---|---|---|
| NIV | Biblica | Requires license; commonly licensed to Bible apps |
| ESV | Crossway | Requires license |
| NLT | Tyndale | Requires license |
| NKJV | Thomas Nelson / HarperCollins | Requires license |
| Ukrainian translation (сучасні) | Publishers | Verify per translation |

**These MUST NOT be bundled client-side.** Serve via authenticated API with:
- User authentication enforced
- No bulk download endpoints
- Verse-by-verse or chapter-by-chapter APIs only

---

### A3. CrossWire / SWORD Ecosystem

- **URL:** crosswire.org/sword
- **Format:** SWORD modules (zipped binary + XML variants)
- **Contains:** 300+ translations, commentaries, dictionaries
- **License:** Varies per module (many public domain, some restricted)
- **Use:** Primary bulk ingestion source for open translations and commentaries
- **Production suitability:** Good for ingestion pipeline. Not for runtime API dependency.
- **Tools:** `sword-to-json`, `diatheke` CLI, `node-sword-interface` NPM package

---

### A4. getBible / bible-api.com (External API)

- **URL:** getBible.net / bible-api.com
- **Use:** Acceptable for prototype validation and development queries
- **License:** Free but terms vary; content rights belong to original publishers
- **Production suitability:** **NOT suitable as permanent core dependency.** Rate limits, no SLA, external dependency.
- **Verdict:** Use during development only. Replace with internal ingestion.

---

## B. Original Language + Morphology

### B1. Macula Hebrew (BHSA-based)

- **Source:** Clear Bible (github.com/Clear-Bible/macula-hebrew)
- **Format:** TSV / JSON with word-level data
- **License:** **CC BY 4.0** (requires attribution)
- **Contains:**
  - Every Hebrew word in the OT
  - Lemma, lexeme, morphology code, gloss
  - Strong's number per word
  - Syntactic role and semantic domain
  - Full alignment to verse/chapter/book
- **Production suitability:** Excellent. Should be primary OT original-language source.
- **Ingestion:** Parse TSV → `source_tokens` + `morphology_tags` + link to `verse` via OSIS reference

### B2. Macula Greek (GNT-based)

- **Source:** Clear Bible (github.com/Clear-Bible/macula-greek)
- **Format:** TSV / JSON
- **License:** **CC BY 4.0** (requires attribution)
- **Contains:**
  - Every Greek word in the NT (SBLGNT or NA28 base)
  - Lemma, morphology (Robinson code), Strong's, gloss
  - Clause-level and phrase-level structure
- **Production suitability:** Excellent. Primary NT original-language source.

**Connection to prototype:** `VerseStudyContent.tsx` shows `originalTokens[]` with `{original, transliteration, strongs, gloss, morphology}` — this maps exactly to what Macula provides per token.

---

## C. Strong's Dictionaries

### C1. Strong's Hebrew Dictionary

- **Source:** Open Scriptures (github.com/openscriptures), SWORD modules
- **Format:** XML (Strongs XML project), JSON
- **License:** **Public domain** (Strong's work 1890)
- **Contains:** H1–H8674 entries with Hebrew lemma, transliteration, gloss, definition, etymology
- **Ingestion:** Parse → `strong_entries` table keyed by `H{number}`

### C2. Strong's Greek Dictionary

- **Source:** Same
- **License:** **Public domain**
- **Contains:** G1–G5624 entries
- **Ingestion:** Parse → `strong_entries` table keyed by `G{number}`

**Connection to prototype:** `WordStudyData.strongs` field in `types.ts` maps to `H{number}` or `G{number}`. The `wordStudyDb.ts` already contains Strong's numbers for each Ukrainian word (e.g., `strongs: "833"`). Backend Strong's table replaces/extends this.

---

## D. Cross-References

### D1. Treasury of Scripture Knowledge (TSK)

- **Source:** Open Scriptures, SWORD `TSK` module
- **Format:** CSV / XML
- **License:** **Public domain**
- **Contains:** ~500,000 cross-reference links across the whole Bible
- **Ingestion:** Parse → `cross_references` table with `(from_book, from_chapter, from_verse)` → `(to_book, to_chapter, to_verse, type)`

### D2. OpenBible Cross-Reference Dataset

- **Source:** openbible.info/labs/cross-references
- **Format:** CSV (TSV)
- **License:** **CC BY 3.0** (requires attribution)
- **Contains:** ~350,000 links with strength/confidence score
- **Advantage:** Has vote-based confidence scores per cross-reference
- **Ingestion:** Parse → same `cross_references` table, add `source` and `confidence_score` columns

**Strategy:** Ingest both, deduplicate, prefer TSK for coverage + OpenBible for confidence scoring.

**Connection to prototype:** `cross-references.json` and `cross-references-ukrainian.json` in `data/` already implement this pattern but only for Psalm 1 and only 12 cross-references. Backend replaces with full dataset.

---

## E. Commentaries

### E1. Matthew Henry Complete Commentary

- **Source:** SWORD module, sacred-texts.com, ccel.org
- **Format:** HTML / XML
- **License:** **Public domain** (Matthew Henry, 1710)
- **Contains:** Commentary on every verse in the Bible, chapter introductions
- **Ingestion:** Parse HTML → extract by verse reference → `commentary_entries` table
- **Prototype reference:** `data/commentary-henry.json` exists; scaling this to the full Bible requires DB ingestion

### E2. John Calvin Commentaries

- **Source:** CCEL (ccel.org/ccel/calvin)
- **Format:** HTML / XML
- **License:** **Public domain**
- **Contains:** OT + NT commentaries (not complete for every book)
- **Ingestion:** Same pattern; note coverage gaps (Calvin is more theological, less verse-by-verse)
- **Prototype reference:** `data/commentary-calvin.json` exists

### E3. Spurgeon's Treasury of David

- **Source:** CCEL, SWORD
- **Format:** HTML
- **License:** **Public domain** (Spurgeon, 1885)
- **Contains:** Psalm commentary only — extensive verse-by-verse
- **Ingestion:** Psalm-specific → `commentary_entries` linked to Psalm chapters/verses
- **Prototype reference:** `data/commentary-spurgeon.json` exists

### E4. Additional Commentaries (post-MVP)

| Source | License | Notes |
|---|---|---|
| Jamieson-Fausset-Brown | Public domain | Good single-volume coverage |
| Adam Clarke | Public domain | Methodist perspective |
| Geneva Bible Notes | Public domain | Reformed, verse-level |
| Modern commentaries (NICOT, WBC) | **Requires licensing** | Major academic cost |

---

## F. Concordance (Internal Derived Dataset)

**Not a standalone external source.** Build concordance as an **internal indexed capability**:

1. After ingesting Bible text + Macula tokens:
   - Index `source_tokens.lemma` → all verse occurrences
   - Index `source_tokens.strong_number` → all verse occurrences
   - Index `verse_texts.text` (full-text) → keyword concordance
2. Concordance endpoint = query by Strong's number → return all `verse_texts` where that Strong's number appears

**No external API needed.** Concordance is a database query.

**Connection to prototype:** `WordStudyContent.tsx` shows a "Usage" tab with occurrence examples. Currently limited to manually curated `usages[]` in `wordStudyDb.ts`. Backend concordance provides all occurrences automatically.

---

## G. Embeddings / Vector Search

### G1. Embedding Model

| Option | License | Cost | Quality |
|---|---|---|---|
| OpenAI `text-embedding-3-small` | Commercial API | ~$0.02/1M tokens | High |
| OpenAI `text-embedding-3-large` | Commercial API | ~$0.13/1M tokens | Very high |
| Cohere `embed-multilingual-v3` | Commercial API | ~$0.10/1M tokens | Best for multilingual (Ukrainian) |
| `nomic-embed-text` (local) | Apache 2.0 | Free (self-hosted) | Good |
| Google `text-embedding-004` | Commercial API | ~$0.025/1M tokens | Good |

**Recommendation for MVP:** OpenAI `text-embedding-3-small` (cost-effective, well-tested)
**Recommendation for multilingual (Ukrainian):** Cohere multilingual or Google's model

**Estimated Bible embedding cost (KJV, 31,102 verses):**
- ~4M tokens total at ~130 tokens/verse average
- OpenAI small: ~$0.08 one-time generation cost
- Manageable for MVP

### G2. Vector Store

| Option | Notes |
|---|---|
| `pgvector` (PostgreSQL extension) | **Recommended for MVP.** Same DB, no extra infra |
| Pinecone | Managed, good at scale. Extra cost. |
| Qdrant | Open source, self-hosted. Good performance. |
| Weaviate | Open source, schema-optional |

**Recommendation:** Start with pgvector. Migrate to Pinecone if query latency becomes a bottleneck (>500ms p95).

---

## H. LLM for AI Orchestration

| Model | Provider | Notes |
|---|---|---|
| `gemini-2.0-flash` | Google | Already used in prototype (`api/search.ts`). Fast, cheap |
| `claude-3-5-haiku` | Anthropic | Good for structured output, reliable JSON |
| `claude-3-7-sonnet` | Anthropic | Better reasoning for theological queries |
| `gpt-4o-mini` | OpenAI | Fast, cheap, good structured output |

**Prototype uses:** `gemini-3-flash-preview` via `@google/genai` SDK with `GEMINI_API_KEY`

**Recommendation:** Keep Gemini Flash for search (speed + cost). Use Claude Sonnet for deeper explanation features (better at complex theological nuance).

---

## Licensing Classification Summary

| Source | License Class | Production Safe? |
|---|---|---|
| KJV | Public domain | Yes |
| ASV | Public domain | Yes |
| World English Bible | Public domain | Yes |
| Ukrainian Ogienko | Public domain (verify) | Likely yes, verify |
| Ukrainian Turkoniak | Likely requires license | **Verify before production** |
| NIV, ESV, NLT | Requires direct license | **Must license before production** |
| Macula Hebrew | CC BY 4.0 (attribution) | Yes with attribution |
| Macula Greek | CC BY 4.0 (attribution) | Yes with attribution |
| Strong's Dictionaries | Public domain | Yes |
| Treasury of Scripture Knowledge | Public domain | Yes |
| OpenBible Cross-References | CC BY 3.0 (attribution) | Yes with attribution |
| Matthew Henry Commentary | Public domain | Yes |
| Calvin Commentaries | Public domain | Yes |
| Spurgeon's Treasury | Public domain | Yes |
| getBible / bible-api.com | External API / varies | **Not for production core** |
| CrossWire SWORD modules | Varies per module | **Verify each module** |
| OpenAI embeddings | Commercial API | Yes (operational cost) |
| Google Gemini | Commercial API | Yes (operational cost) |

**Items to flag for legal review before production:**
- Ukrainian Turkoniak translation
- Any SWORD modules used beyond the known public-domain set
- Modern translation licensing (NIV, ESV, etc.) — obtain directly from publishers
