# Domain Model
## Source Bible — Pro Bible Study App

> Entities, relationships, and indexes grounded in the prototype's data structures.

---

## Core Reference System

All entities use a canonical verse reference: `(book_id, chapter, verse)`.

The prototype uses integer `verseId` (1–6 for Psalm 1) and token IDs `v{verseId}-t{tokenIndex}`. The production system extends this to a full cross-book coordinate system:

```
book_id: integer (1=Genesis ... 66=Revelation, following standard canonical order)
chapter: integer (1-based)
verse:   integer (1-based)
```

OSIS reference string: `{OSIS_book}.{chapter}.{verse}` — e.g., `Ps.1.1`, `Gen.1.1`, `Rev.22.21`

---

## Entity Definitions

### Translation

Metadata for a Bible version.

```sql
CREATE TABLE translations (
  id          SERIAL PRIMARY KEY,
  code        TEXT UNIQUE NOT NULL,       -- "KJV", "ASV", "OGI" (Ogienko), etc.
  name        TEXT NOT NULL,              -- "King James Version"
  language    TEXT NOT NULL,              -- "en", "uk" (ISO 639-1)
  direction   TEXT NOT NULL DEFAULT 'ltr',-- "ltr" | "rtl"
  testament   TEXT NOT NULL DEFAULT 'all',-- "OT" | "NT" | "all"
  license     TEXT,
  attribution TEXT,
  is_internal BOOLEAN DEFAULT TRUE,       -- FALSE = served via external API (temporary)
  version     INTEGER DEFAULT 1,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

**Connection to prototype:** `VERSE_STUDY_DB[v].translations[]` contains `{name, text}` arrays. The `name` values ("Огієнко", "Турконяк", "King James", "American Standard") become `code` values in this table.

---

### Book

```sql
CREATE TABLE books (
  id             SERIAL PRIMARY KEY,
  canonical_order INTEGER UNIQUE NOT NULL,  -- 1-66
  osis_id        TEXT UNIQUE NOT NULL,      -- "Gen", "Ps", "Rev"
  name_en        TEXT NOT NULL,
  name_uk        TEXT,
  testament      TEXT NOT NULL,             -- "OT" | "NT"
  chapter_count  INTEGER NOT NULL
);
```

---

### Verse

Canonical verse coordinate — independent of translation.

```sql
CREATE TABLE verses (
  id         BIGSERIAL PRIMARY KEY,
  book_id    INTEGER REFERENCES books(id),
  chapter    INTEGER NOT NULL,
  verse      INTEGER NOT NULL,
  osis_ref   TEXT NOT NULL,                -- "Ps.1.1"
  UNIQUE (book_id, chapter, verse)
);
CREATE INDEX idx_verses_book_chapter ON verses(book_id, chapter);
```

---

### VerseText

The actual translated text of a verse in a specific translation.

```sql
CREATE TABLE verse_texts (
  id              BIGSERIAL PRIMARY KEY,
  verse_id        BIGINT REFERENCES verses(id),
  translation_id  INTEGER REFERENCES translations(id),
  text            TEXT NOT NULL,
  text_tsv        TSVECTOR,               -- full-text search index
  UNIQUE (verse_id, translation_id)
);
CREATE INDEX idx_verse_texts_tsv ON verse_texts USING GIN(text_tsv);
CREATE INDEX idx_verse_texts_translation ON verse_texts(translation_id);
```

**Connection to prototype:** `Verse.text` in `types.ts`. The `PSALM_1` array in `constants.ts` is essentially a hard-coded `verse_texts` table for the Ogienko translation.

---

### SourceToken

A single token in the original Hebrew or Greek text.

```sql
CREATE TABLE source_tokens (
  id              BIGSERIAL PRIMARY KEY,
  verse_id        BIGINT REFERENCES verses(id),
  token_index     INTEGER NOT NULL,        -- 0-based position
  testament       TEXT NOT NULL,           -- "OT" | "NT"
  original_text   TEXT NOT NULL,           -- "אַשְׁרֵי" | "μακάριος"
  transliteration TEXT,                    -- "ashrei" | "makarios"
  lemma           TEXT,                    -- Normalized dictionary form
  strong_number   TEXT,                    -- "H835" | "G3107"
  morphology_code TEXT,                    -- e.g. "HNcmpa" (Macula format)
  gloss           TEXT,                    -- "blessed" | "Блаженний"
  UNIQUE (verse_id, token_index)
);
CREATE INDEX idx_source_tokens_strong ON source_tokens(strong_number);
CREATE INDEX idx_source_tokens_lemma ON source_tokens(lemma);
CREATE INDEX idx_source_tokens_verse ON source_tokens(verse_id);
```

**Connection to prototype:** `OriginalToken` interface in `types.ts`:
```typescript
{ original, transliteration, strongs, gloss, morphology, refKey }
```
The `refKey` → `anchorKey` linkage (e.g. `"блаженний"`) will be replaced by joining `source_tokens.strong_number` → `lexemes.anchor_keys[]`.

---

### TranslationToken

A token in a translated text (for word-level alignment display).

```sql
CREATE TABLE translation_tokens (
  id              BIGSERIAL PRIMARY KEY,
  verse_id        BIGINT REFERENCES verses(id),
  translation_id  INTEGER REFERENCES translations(id),
  token_index     INTEGER NOT NULL,
  text            TEXT NOT NULL,
  anchor_key      TEXT,                   -- Normalized form for word-study lookup
  is_punctuation  BOOLEAN DEFAULT FALSE,
  UNIQUE (verse_id, translation_id, token_index)
);
CREATE INDEX idx_translation_tokens_anchor ON translation_tokens(anchor_key);
```

**Connection to prototype:** `VerseToken` in `types.ts`:
```typescript
{ id: "v1-t0", text: "Блаженний", anchorKey: "блаженний" }
```
The `id` format becomes `{verse_id}:{translation_id}:{token_index}` in production.

---

### AlignmentEdge

Maps a translation token to a source token (many-to-many word alignment).

```sql
CREATE TABLE alignment_edges (
  id                     BIGSERIAL PRIMARY KEY,
  translation_token_id   BIGINT REFERENCES translation_tokens(id),
  source_token_id        BIGINT REFERENCES source_tokens(id),
  alignment_type         TEXT,           -- "direct" | "partial" | "phrase"
  confidence             FLOAT
);
```

---

### Lexeme

The base lexical entry — represents a lemma across all its inflected forms.

```sql
CREATE TABLE lexemes (
  id              SERIAL PRIMARY KEY,
  lemma           TEXT NOT NULL,
  language        TEXT NOT NULL,          -- "Hebrew" | "Greek"
  strong_number   TEXT UNIQUE,            -- "H835" | "G3107"
  transliteration TEXT,
  gloss           TEXT,                   -- Short definition
  definition      TEXT,                   -- Extended definition
  semantic_domain TEXT[],                 -- Tags: ["blessing", "ethics"]
  part_of_speech  TEXT,
  origin_strong   TEXT[],                 -- Etymology Strong's numbers
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_lexemes_strong ON lexemes(strong_number);
CREATE INDEX idx_lexemes_lemma ON lexemes(lemma);
```

**Connection to prototype:** `WordStudyData` in `types.ts`:
```typescript
{
  strongs: "833",
  original: "אַשְׁרֵי",
  transliteration: "ashrei",
  partOfSpeech: "іменник",
  semanticRange: ["щастя", "блаженство", ...],
  definition: "...",
  notDefinition: "...",
  origin: { strongs, transliteration, original }
}
```
Maps directly to `Lexeme` + `StrongEntry` rows.

---

### StrongEntry

The canonical Strong's dictionary entry (text from Strong's Exhaustive Concordance).

```sql
CREATE TABLE strong_entries (
  id              SERIAL PRIMARY KEY,
  strong_number   TEXT UNIQUE NOT NULL,   -- "H835"
  lexeme_id       INTEGER REFERENCES lexemes(id),
  original_text   TEXT,
  transliteration TEXT,
  pronunciation   TEXT,
  source_entry    TEXT,                   -- Full original Strong's text
  kjv_definition  TEXT,                  -- KJV usage string
  occurrences     INTEGER,               -- Total count in Bible
  testament       TEXT                   -- "OT" | "NT"
);
```

---

### MorphologyTag

Parsed morphology for a source token.

```sql
CREATE TABLE morphology_tags (
  id               SERIAL PRIMARY KEY,
  source_token_id  BIGINT REFERENCES source_tokens(id),
  code             TEXT NOT NULL,        -- Raw Macula morphology code
  part_of_speech   TEXT,
  person           TEXT,                 -- "1st" | "2nd" | "3rd"
  number           TEXT,                 -- "singular" | "plural"
  gender           TEXT,                 -- "masculine" | "feminine" | "neuter"
  tense            TEXT,
  voice            TEXT,
  mood             TEXT,
  case_            TEXT,
  state            TEXT,                 -- Hebrew: "absolute" | "construct"
  display_label    TEXT                  -- Human readable: "Noun | plural | construct"
);
```

**Connection to prototype:** `OriginalToken.morphology` in `types.ts` is a display string like `"Іменник | мн."`. This table stores parsed components; the service concatenates them into display strings per locale.

---

### CommentarySource

A commentary work (author + title metadata).

```sql
CREATE TABLE commentary_sources (
  id           SERIAL PRIMARY KEY,
  code         TEXT UNIQUE NOT NULL,   -- "HENRY", "CALVIN", "SPURGEON"
  author_name  TEXT NOT NULL,
  title        TEXT NOT NULL,
  year_written INTEGER,
  language     TEXT NOT NULL DEFAULT 'en',
  license      TEXT,
  image_url    TEXT,
  is_public    BOOLEAN DEFAULT TRUE
);
```

**Connection to prototype:** `VerseStudyData.commentaries[].{author, title, image, subtitle, preview, body}` in `constants.ts`. The `author` + `title` fields map to `CommentarySource` rows.

---

### CommentaryEntry

A commentary passage covering a verse or verse range.

```sql
CREATE TABLE commentary_entries (
  id                  BIGSERIAL PRIMARY KEY,
  source_id           INTEGER REFERENCES commentary_sources(id),
  book_id             INTEGER REFERENCES books(id),
  chapter_start       INTEGER NOT NULL,
  verse_start         INTEGER,            -- NULL = whole chapter
  verse_end           INTEGER,            -- NULL = single verse
  content_markdown    TEXT NOT NULL,
  content_tsv         TSVECTOR,
  subtitle            TEXT,
  preview             TEXT GENERATED ALWAYS AS (LEFT(content_markdown, 280)) STORED
);
CREATE INDEX idx_commentary_entries_location
  ON commentary_entries(source_id, book_id, chapter_start, verse_start, verse_end);
CREATE INDEX idx_commentary_entries_tsv
  ON commentary_entries USING GIN(content_tsv);
```

---

### CrossReference

A directional link between two verse locations.

```sql
CREATE TABLE cross_references (
  id             BIGSERIAL PRIMARY KEY,
  from_verse_id  BIGINT REFERENCES verses(id),
  to_verse_id    BIGINT REFERENCES verses(id),
  source         TEXT,                   -- "TSK" | "OPENBIBLE"
  confidence     FLOAT,                  -- OpenBible vote-based score
  ref_type       TEXT,                   -- "parallel" | "allusion" | "quotation"
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_cross_refs_from ON cross_references(from_verse_id);
CREATE INDEX idx_cross_refs_to ON cross_references(to_verse_id);
```

**Connection to prototype:** `cross-references.json` and `cross-references-ukrainian.json` in `data/`. The prototype hardcodes 12 cross-reference verses for Psalm 1. Production has ~500,000 pairs.

---

### ParallelPassage

A distinct table for thematic parallels (different from direct cross-references).

```sql
CREATE TABLE parallel_passages (
  id              BIGSERIAL PRIMARY KEY,
  passage_a_start BIGINT REFERENCES verses(id),
  passage_a_end   BIGINT REFERENCES verses(id),
  passage_b_start BIGINT REFERENCES verses(id),
  passage_b_end   BIGINT REFERENCES verses(id),
  relationship    TEXT                   -- "type" | "antitype" | "fulfillment"
);
```

---

### SearchChunk

A chunked text unit used for embedding-based retrieval. Not always a single verse.

```sql
CREATE TABLE search_chunks (
  id              BIGSERIAL PRIMARY KEY,
  translation_id  INTEGER REFERENCES translations(id),
  verse_start_id  BIGINT REFERENCES verses(id),
  verse_end_id    BIGINT REFERENCES verses(id),
  chunk_text      TEXT NOT NULL,
  book_id         INTEGER REFERENCES books(id),
  chapter_start   INTEGER,
  verse_start_num INTEGER,
  verse_end_num   INTEGER,
  token_count     INTEGER,
  chunk_type      TEXT DEFAULT 'verse'    -- "verse" | "passage" | "chapter_intro"
);
```

---

### SearchEmbedding

Embedding vector for a `SearchChunk`.

```sql
CREATE TABLE search_embeddings (
  id           BIGSERIAL PRIMARY KEY,
  chunk_id     BIGINT REFERENCES search_chunks(id),
  model        TEXT NOT NULL,             -- "text-embedding-3-small"
  embedding    VECTOR(1536),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_search_embeddings_vector
  ON search_embeddings USING ivfflat (embedding vector_cosine_ops);
```

---

### User

```sql
CREATE TABLE users (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email        TEXT UNIQUE,
  name         TEXT,
  auth_provider TEXT,                    -- "google" | "apple" | "email"
  auth_sub     TEXT UNIQUE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ
);
```

---

### Note

```sql
CREATE TABLE notes (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES users(id),
  verse_id       BIGINT REFERENCES verses(id),
  token_id       BIGINT REFERENCES translation_tokens(id), -- optional (word-level)
  translation_id INTEGER REFERENCES translations(id),
  content        TEXT NOT NULL,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_notes_user_verse ON notes(user_id, verse_id);
```

**Connection to prototype:** `handleCreateNote()` in `App.tsx` currently calls `alert("Note creation coming soon!")`. This table is what makes it real.

---

### Highlight

```sql
CREATE TABLE highlights (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES users(id),
  verse_id       BIGINT REFERENCES verses(id),
  token_id       BIGINT REFERENCES translation_tokens(id), -- NULL = whole verse
  translation_id INTEGER REFERENCES translations(id),
  color          TEXT NOT NULL DEFAULT 'yellow',
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_highlights_user_verse ON highlights(user_id, verse_id);
```

**Connection to prototype:** `highlights: Set<string | number>` in `App.tsx`. Currently in-memory. This table persists them.

---

### Bookmark

```sql
CREATE TABLE bookmarks (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES users(id),
  verse_id       BIGINT REFERENCES verses(id),
  translation_id INTEGER REFERENCES translations(id),
  label          TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, verse_id, translation_id)
);
```

**Connection to prototype:** Bookmark button exists in `TopBar` but has no implementation.

---

### ReadingProgress

```sql
CREATE TABLE reading_progress (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES users(id),
  book_id        INTEGER REFERENCES books(id),
  chapter        INTEGER NOT NULL,
  verse          INTEGER NOT NULL,
  translation_id INTEGER REFERENCES translations(id),
  recorded_at    TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_reading_progress_user ON reading_progress(user_id, recorded_at DESC);
```

---

### UserPreference

```sql
CREATE TABLE user_preferences (
  user_id            UUID PRIMARY KEY REFERENCES users(id),
  default_translation TEXT NOT NULL DEFAULT 'OGI',
  theme              TEXT NOT NULL DEFAULT 'light',
  font_style         TEXT NOT NULL DEFAULT 'modern',
  font_size          TEXT NOT NULL DEFAULT 'md',
  preferred_language TEXT NOT NULL DEFAULT 'uk',
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);
```

**Connection to prototype:** `ThemeProvider.tsx` stores `theme` and `fontStyle` in `localStorage`. This table syncs those preferences server-side.

---

## Key Relationships Summary

```
Translation ──< VerseText >── Verse ──< SourceToken >── Lexeme >── StrongEntry
                                 │                          │
                                 └──< CrossReference        └──< MorphologyTag
                                 │
                                 └──< CommentaryEntry (via book/chapter/verse range)
                                 │
                                 └──< SearchChunk >── SearchEmbedding

User ──< Note >── Verse
User ──< Highlight >── Verse
User ──< Bookmark >── Verse
User ── UserPreference
User ──< ReadingProgress >── Verse
```

---

## Concordance as a Query

Concordance is not a separate table. It is a join query:

```sql
-- All verses where Strong's H835 appears (concordance for "blessed")
SELECT v.osis_ref, vt.text
FROM source_tokens st
JOIN verses v ON st.verse_id = v.id
JOIN verse_texts vt ON vt.verse_id = v.id AND vt.translation_id = $translation_id
WHERE st.strong_number = 'H835'
ORDER BY v.book_id, v.chapter, v.verse;
```

This replaces the manually curated `usages[]` array in `wordStudyDb.ts`.
