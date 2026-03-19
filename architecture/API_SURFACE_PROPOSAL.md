# API Surface Proposal
## Source Bible — Backend Endpoints

> All endpoints are JSON REST (or tRPC procedures). Base URL: `/api/v1/`
> All responses follow envelope: `{ data: T, error: null | { code, message }, meta: { requestId, duration } }`

---

## Bible Content Endpoints

### `GET /bible/translations`

Returns available translations with metadata.

**Response:**
```json
{
  "data": [
    {
      "code": "KJV",
      "name": "King James Version",
      "language": "en",
      "direction": "ltr",
      "testament": "all"
    },
    {
      "code": "OGI",
      "name": "Переклад Огієнка",
      "language": "uk",
      "direction": "ltr",
      "testament": "all"
    }
  ]
}
```

**Frontend connection:** Currently, translation list is hardcoded in `VERSE_STUDY_DB[v].translations[].name`. This endpoint populates a translation picker in `TopBar.tsx`.

---

### `GET /bible/:translation/books`

Returns book list with metadata.

**Response:**
```json
{
  "data": [
    { "id": 1, "osisId": "Gen", "name": "Genesis", "chapterCount": 50, "testament": "OT" },
    { "id": 19, "osisId": "Ps", "name": "Psalms", "chapterCount": 150, "testament": "OT" }
  ]
}
```

---

### `GET /bible/:translation/:book/:chapter`

Primary Bible reader endpoint. Returns a full chapter.

**Params:**
- `translation`: `"KJV"` | `"OGI"` | etc.
- `book`: `"Psalms"` | `"Gen"` | OSIS ID
- `chapter`: integer

**Response:**
```json
{
  "data": {
    "translation": "KJV",
    "book": "Psalms",
    "bookId": 19,
    "chapter": 1,
    "totalChapters": 150,
    "verses": [
      {
        "id": 14401,
        "verse": 1,
        "text": "Blessed is the man that walketh not in the counsel of the ungodly...",
        "tokens": [
          { "index": 0, "text": "Blessed", "anchorKey": "blessed", "strongNumber": "H835" },
          { "index": 1, "text": " ", "anchorKey": null, "strongNumber": null },
          { "index": 2, "text": "is", "anchorKey": "is", "strongNumber": null }
        ],
        "originalTokens": [
          {
            "index": 0,
            "original": "אַשְׁרֵי",
            "transliteration": "ʾašrê",
            "strongNumber": "H835",
            "gloss": "Blessed",
            "morphologyDisplay": "Noun | plural | construct"
          }
        ]
      }
    ]
  }
}
```

**Frontend connection:** Replaces `PSALM_1` constant in `constants.ts` and `VERSE_STUDY_DB[v].originalTokens` for the reader. `BibleText.tsx` reads tokens to render words. `VerseStudyContent.tsx` reads `originalTokens` for the "Original Language" tab.

**Caching:** Redis key `bible:KJV:Psalms:1` → TTL 24 hours.

---

### `GET /bible/:translation/:book/:chapter/:verse`

Single verse fetch.

**Response:** Same shape as a single item in the `verses[]` array above.

---

### `GET /bible/passage?ref=Ps.1.1-Ps.1.6&translation=KJV`

Passage range fetch.

**Use case:** Cross-reference navigation — when user taps a cross-reference, load the target passage.

---

## Study Data Endpoints

### `GET /study/word/:strongNumber`

Full word study data for a Strong's number.

**Example:** `GET /study/word/H835`

**Response:**
```json
{
  "data": {
    "strongNumber": "H835",
    "original": "אֶשֶׁר",
    "transliteration": "esher",
    "partOfSpeech": "noun masculine",
    "gloss": "happiness, blessedness",
    "definition": "happiness; used only in exclamations of congratulation...",
    "semanticRange": ["щастя", "блаженство", "задоволення"],
    "occurrenceCount": 45,
    "morphology": {
      "rawCode": "HNcmpa",
      "partOfSpeech": "Noun",
      "number": "plural",
      "state": "construct"
    }
  }
}
```

**Frontend connection:** Replaces `WORD_STUDY_DB["блаженний"]` lookup in `WordStudyContent.tsx`. Current `WordStudyData` interface maps directly. The `anchorKey` from `translation_tokens.anchor_key` is linked to `source_tokens.strong_number`.

---

### `GET /study/word/:strongNumber/concordance?translation=KJV`

All occurrences in the Bible for a given Strong's number.

**Response:**
```json
{
  "data": {
    "strongNumber": "H835",
    "occurrenceCount": 45,
    "occurrences": [
      {
        "ref": "Ps.1.1",
        "displayRef": "Psalm 1:1",
        "text": "Blessed is the man...",
        "translationText": "Блаженний муж..."
      },
      {
        "ref": "Ps.2.12",
        "displayRef": "Psalm 2:12",
        "text": "Blessed are all they that put their trust in him."
      }
    ]
  }
}
```

**Frontend connection:** Replaces `WordStudyData.usages[]` in `WordStudyContent.tsx` Usage tab. Currently shows ~3 manually curated examples. Backend returns all 45.

---

### `GET /study/verse/:book/:chapter/:verse`

Full verse study aggregation.

**Response:**
```json
{
  "data": {
    "verseRef": "Ps.1.1",
    "crossReferences": [
      {
        "ref": "Ps.119.1",
        "text": "Blessed are the undefiled in the way...",
        "confidence": 0.91,
        "type": "parallel"
      }
    ],
    "commentaries": [
      {
        "source": "HENRY",
        "author": "Matthew Henry",
        "title": "Complete Commentary",
        "range": "Psalm 1:1-6",
        "subtitle": "The happiness of the godly",
        "preview": "This psalm is a preface to the whole...",
        "contentMarkdown": "..."
      }
    ]
  }
}
```

**Frontend connection:** Replaces `VERSE_STUDY_DB[verseId]` for the `VerseStudyContent.tsx` component's cross-references and commentary tabs.

---

### `GET /study/verse/:book/:chapter/:verse/translations`

All translations for a verse (parallel comparison).

**Response:**
```json
{
  "data": [
    { "code": "KJV", "name": "King James Version", "text": "Blessed is the man..." },
    { "code": "OGI", "name": "Переклад Огієнка", "text": "Блаженний муж, що не йде..." },
    { "code": "ASV", "name": "American Standard", "text": "Blessed is the man that walketh not..." }
  ]
}
```

**Frontend connection:** Replaces `VERSE_STUDY_DB[v].translations[]` in `VerseStudyContent.tsx` "Translations" tab.

---

### `GET /study/cross-references/:book/:chapter/:verse`

Cross-references for a verse.

**Response:**
```json
{
  "data": [
    { "ref": "Ps.119.1", "text": "Blessed are the undefiled in the way", "type": "parallel" },
    { "ref": "Prov.4.14", "text": "Enter not into the path of the wicked", "type": "allusion" }
  ]
}
```

---

## Search Endpoints

### `POST /search`

Full-text + semantic hybrid search.

**Request:**
```json
{
  "query": "blessed man righteous path",
  "filters": {
    "translation": "KJV",
    "testament": "OT",
    "books": ["Psalms", "Proverbs"]
  },
  "mode": "hybrid",
  "limit": 20
}
```

**Response:**
```json
{
  "data": {
    "results": [
      {
        "chunkId": 14401,
        "ref": "Ps.1.1",
        "displayRef": "Psalm 1:1",
        "text": "Blessed is the man that walketh not...",
        "score": 0.94,
        "matchType": "semantic"
      }
    ],
    "totalCount": 87,
    "searchMode": "hybrid",
    "durationMs": 145
  }
}
```

**Frontend connection:** Replaces keyword filtering in `SearchView.tsx` (currently filters `PSALM_1` in memory). Also feeds the AI Orchestration endpoint.

---

### `GET /search/suggestions?q=blessed+man`

Autocomplete suggestions.

**Response:**
```json
{
  "data": [
    { "text": "blessed is the man", "type": "verse_start" },
    { "text": "blessed are the pure in heart", "type": "verse_start" }
  ]
}
```

---

## AI Orchestration Endpoints

### `POST /ai/search`

RAG-powered natural language Bible search.

**Request:**
```json
{
  "query": "What does it mean to walk with the wicked?",
  "filters": { "testament": "OT" },
  "locale": "uk"
}
```

**Internal flow:** query → Search Service → top-5 passages → LLM → structured response

**Response:**
```json
{
  "data": {
    "explanation": "Walking with the wicked means habitually associating with those who reject God...",
    "verses": [
      {
        "ref": "Ps.1.1",
        "displayRef": "Psalm 1:1",
        "text": "Blessed is the man that walketh not in the counsel of the ungodly...",
        "relevanceScore": 0.97
      },
      {
        "ref": "Ps.1.4",
        "displayRef": "Psalm 1:4",
        "text": "The ungodly are not so...",
        "relevanceScore": 0.71
      }
    ],
    "confidence": "high",
    "sourcePassages": 5
  }
}
```

**Frontend connection:** Replaces `api/search.ts` entirely. `SearchView.tsx` receives the same `verseIds[]` + `explanation` structure already expected by the current UI.

---

## User Data Endpoints (Auth Required)

### `GET /user/preferences`

```json
{
  "data": {
    "defaultTranslation": "OGI",
    "theme": "dark",
    "fontStyle": "modern",
    "fontSize": "md"
  }
}
```

### `PUT /user/preferences`

```json
{ "theme": "light", "fontStyle": "antique" }
```

**Frontend connection:** Replaces `localStorage` in `ThemeProvider.tsx`. On login, fetch preferences and initialize theme state from server.

---

### `GET /user/highlights?book=Psalms&chapter=1`

```json
{
  "data": [
    { "id": "uuid", "verseId": 14401, "ref": "Ps.1.1", "color": "yellow", "createdAt": "..." }
  ]
}
```

### `POST /user/highlights`

```json
{ "verseRef": "Ps.1.1", "translation": "OGI", "color": "yellow" }
```

### `DELETE /user/highlights/:id`

**Frontend connection:** Replaces `highlights: Set<string | number>` state in `App.tsx`. `SheetActionBar.tsx` calls highlight toggle which currently just updates local state.

---

### `GET /user/notes?book=Psalms&chapter=1`

### `POST /user/notes`

```json
{
  "verseRef": "Ps.1.1",
  "translation": "OGI",
  "content": "This verse connects to the Beatitudes in Matthew 5..."
}
```

**Frontend connection:** Replaces `handleCreateNote()` which currently calls `alert("Note creation coming soon!")` in `App.tsx:237`.

---

### `GET /user/bookmarks`

### `POST /user/bookmarks`

```json
{ "verseRef": "Ps.1.1", "translation": "OGI", "label": "Morning study" }
```

**Frontend connection:** Fills the bookmark button in `TopBar.tsx` which currently has no implementation.

---

## Error Codes

| Code | Meaning |
|---|---|
| `TRANSLATION_NOT_FOUND` | Requested translation code does not exist |
| `VERSE_NOT_FOUND` | Reference resolves to no verse in DB |
| `SEARCH_QUERY_TOO_LONG` | Query exceeds 500 characters |
| `AI_UNAVAILABLE` | LLM service timeout or error |
| `AI_INVALID_RESPONSE` | LLM returned invalid JSON — fallback to search-only |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `AUTH_REQUIRED` | Endpoint requires authentication |
| `FORBIDDEN` | User does not have access to this resource |

---

## Rate Limits (Suggested)

| Endpoint group | Anonymous | Authenticated Free | Pro |
|---|---|---|---|
| Bible content | 100/min | 500/min | Unlimited |
| Study data | 60/min | 300/min | Unlimited |
| Search (keyword) | 30/min | 100/min | Unlimited |
| AI search | 3/min | 10/min | 60/min |
| User data | — | 100/min | Unlimited |
