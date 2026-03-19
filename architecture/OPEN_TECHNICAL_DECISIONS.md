# Open Technical Decisions
## Source Bible — Unresolved Architecture Questions

> These decisions need evaluation before or during the MVP spike. Each entry has a recommendation, but the tradeoffs are real.

---

## 1. Deployment Target: Serverless vs Always-On Server?

**Context:** The prototype uses Vite (client-only). The only server-side code is `api/search.ts`, which is structured as a serverless function.

**Options:**
| Option | Pros | Cons |
|---|---|---|
| Serverless (Vercel, Cloudflare Workers) | Zero-ops, edge-native, scales to zero | Cold starts hurt latency; can't hold DB connections; hard to run pgvector locally |
| Always-on server (Fly.io, Railway) | Persistent DB connections, lower p99 latency, simpler local dev | Manual ops, cost scales with traffic |
| Hybrid (serverless for stateless; container for AI/DB) | Best of both | More infra complexity |

**Recommendation:** Start with an always-on Node.js/Bun server on Railway or Fly.io. Serverless is appealing but the AI orchestration path (long LLM calls) and pgvector requirement make it awkward.

**When to revisit:** If traffic grows significantly and cold starts are not a problem (AI queries already take 2–5 seconds).

---

## 2. Monolith vs Microservices?

**Context:** The plan describes 5 services. They don't need to be separate deployments.

**Recommendation:** Start as a **modular monolith** — one server process, separate service classes/modules. Extract to separate services only when:
- The AI Orchestration service needs different scaling than the Bible Content service
- A team wants to own a specific service

**Risk:** Premature microservices add deployment, networking, and observability complexity with no benefit at MVP scale.

---

## 3. ORM Choice

**Options:** Drizzle ORM, Prisma, Kysely, raw SQL (postgres.js)

**Tradeoffs:**
- Drizzle: TypeScript-native, SQL-close, migrations as code, excellent DX for this schema
- Prisma: Excellent DX but poor support for pgvector, slower queries
- Kysely: Query builder, type-safe, verbose
- Raw SQL: Full control, no magic, verbose

**Recommendation:** Drizzle ORM with `drizzle-kit` for migrations. Reasons:
1. pgvector support via raw SQL escape hatches
2. Fast (no N+1 abstraction issues)
3. TypeScript inference without extra schema files

---

## 4. Vector Database: pgvector vs Pinecone?

**Context:** pgvector runs in the same PostgreSQL instance. Pinecone is a managed service.

**Decision matrix:**
| Factor | pgvector | Pinecone |
|---|---|---|
| Setup cost | Low (just enable extension) | Medium (new service, API key) |
| Query performance (10K vectors) | Excellent | Excellent |
| Query performance (10M vectors) | Good with IVFFlat | Better |
| Full Bible in all translations = ~100K vectors | Fine in pgvector | Overkill |
| Cost | Included in Postgres | $70+/month |
| Metadata filtering | Good (JOIN queries) | Native but separate |

**Recommendation:** Use pgvector for MVP and foreseeable future. The full Bible (31K verses × 3 translations × 1 embedding = ~100K vectors) is well within pgvector's efficient range with IVFFlat indexing.

**When to switch:** If you index commentary text and study material and reach >1M vectors.

---

## 5. Embedding Model Choice

**Context:** The search quality depends on the embedding model. Multilingual quality matters because the app is currently Ukrainian-focused.

**Decision:**
- For Ukrainian content: Use a multilingual model (Cohere multilingual or Google's multilingual embedding)
- For English KJV content: Standard OpenAI `text-embedding-3-small` is fine
- Mixing models in one vector table is problematic

**Options:**
1. **Generate embeddings for the Ukrainian translation text** using a multilingual model → search in Ukrainian
2. **Generate embeddings for KJV** using English model → search results returned in all translations
3. **Generate both** → two embedding columns, search both, merge

**Recommendation for MVP:** Generate KJV embeddings (English) with OpenAI `text-embedding-3-small`. The AI search query will be in any language; if the user searches in Ukrainian, translate query to English first before embedding. Revisit when Ukrainian content becomes dominant.

**Open question:** Does Ukrainian-language semantic search need to be precise for the product to work? If yes, prioritize multilingual embeddings from day 1.

---

## 6. Chunking Strategy for Search

**Context:** Bible verses are short (~15 words average). A 1:1 verse-to-chunk mapping may miss thematic context.

**Options:**
1. **Single verse** (simplest): 1 chunk = 1 verse. Clean references, may miss multi-verse passages.
2. **Sliding window passages**: 3–5 verse windows with overlap. Better semantic context, messier references.
3. **Pericope-based** (thematic sections): Best semantic units, but requires a pericope dataset.
4. **Hybrid**: Embed single verses AND key 3-verse passages around thematic inflection points.

**Recommendation:** Start with single verses (option 1). The retrieval system returns multiple verses anyway, so multi-verse context is reconstructed at query time. Add pericope data later as a quality improvement.

---

## 7. AI Model Provider Strategy

**Context:** The prototype uses only Gemini. Multiple providers may be needed for different use cases.

**Current state:** `api/search.ts` uses `@google/genai` with `gemini-3-flash-preview` and `GEMINI_API_KEY`.

**Options:**
1. Stick with Gemini for all AI features
2. Use Gemini for fast search, Claude/GPT-4 for deeper explanation
3. Abstract over providers with a unified interface

**Recommendation:** Build a thin provider abstraction layer from day 1:
```typescript
interface LLMProvider {
  complete(prompt: string, schema: ZodSchema): Promise<unknown>;
}
```
Use Gemini Flash as default. Add Claude as an alternative for premium-tier users or deeper study features.

**Risk of not doing this:** If Gemini pricing changes or the model is deprecated (note: `gemini-3-flash-preview` is already a preview model — production should use a stable model ID), migration is painful.

---

## 8. Authentication Strategy

**Context:** The prototype has no auth. Notes/highlights/bookmarks need user identity.

**Options:**
| Option | Pros | Cons |
|---|---|---|
| Clerk | Best DX, built-in UI, webhooks | External SaaS dependency, $25+/month |
| Auth0 | Industry standard, mature | Complex setup, cost |
| Supabase Auth | Integrated if using Supabase Postgres | Vendor lock-in |
| Custom JWT (passport.js) | Full control | Auth is hard to get right |
| "Anonymous mode" first | Simple, fast to ship | Notes don't sync across devices |

**Recommendation:** Start with anonymous mode (localStorage) for notes/highlights, add Clerk auth in Phase 2. This unblocks the product without auth complexity on day 1.

---

## 9. Translation Licensing Strategy

**Context:** The prototype uses Ogienko (Ukrainian), Turkoniak (Ukrainian), KJV, and ASV. For production, users will expect NIV, ESV, NKJV.

**Open questions:**
- Is Turkoniak (Турконяк) under copyright? (Likely yes — it's a modern translation. Verify.)
- For English: Can we negotiate direct licensing with Biblica (NIV) and Crossway (ESV)?
- Is it viable to serve only public-domain translations for a paid app? (Likely no — users expect NIV/ESV)

**Recommendation:**
1. Launch with KJV + Ogienko (confirmed public domain)
2. Verify Turkoniak licensing immediately — if it's copyrighted, remove from prototype too
3. Contact Biblica and Crossway about API licensing terms

---

## 10. Offline Support Strategy

**Context:** A Bible study app that requires internet is a poor experience. Service workers + offline bundles are the path.

**Open questions:**
- Which content should be available offline? (At minimum: the currently-open book)
- Should offline bundles be pre-built (static) or dynamically cached?
- How do we handle AI search offline? (It can't work offline.)

**Recommendation:**
1. Enable service worker caching for Bible chapter API responses (cache-first strategy)
2. Allow users to "download for offline" specific books — pre-built JSON bundles from R2/S3
3. AI search shows "offline" state gracefully
4. Notes/highlights sync when online, work from local storage when offline

**Deferred until:** After core reading + study features work online. Don't build offline-first on day 1.

---

## 11. Commentary Granularity

**Context:** Commentary data doesn't always map 1:1 to individual verses. Calvin's commentary often covers verse ranges or chapter sections.

**Open question:** When a user views verse 3 and the commentary covers verses 1–4 together, should we:
1. Show the full section (preferred for context)
2. Attempt to extract the verse-specific portion (risky, may corrupt content)
3. Show a "closest match" with a note about the range

**Recommendation:** Store commentary at its natural granularity (verse range). At query time, return the commentary entry whose range includes the requested verse. Display the range label clearly: "Commentary covers Psalm 1:1–6."

---

## 12. API Design: REST vs tRPC vs GraphQL?

**Context:** All consumers will be first-party (the React app). No public API planned.

**Recommendation:** **tRPC** for internal API (type-safe, no schema duplication, excellent DX for TypeScript monorepo). Fall back to REST if mobile clients (React Native) are added and tRPC client support is insufficient.

**Not GraphQL:** Overkill for this use case, complex authorization model, not worth the DX overhead for a single-client API.

---

## Summary: Decisions to Make Before Spike

| # | Decision | Recommended | Must Decide Before Spike? |
|---|---|---|---|
| 1 | Deployment target | Always-on server (Railway/Fly) | Yes |
| 2 | Monolith vs services | Modular monolith | Yes |
| 3 | ORM | Drizzle | Yes |
| 4 | Vector DB | pgvector | Yes |
| 5 | Embedding model | OpenAI text-embedding-3-small | Yes |
| 6 | Chunking strategy | Single verse | Yes |
| 7 | LLM provider | Gemini Flash + provider abstraction | Yes |
| 8 | Auth | Anonymous first | No (defer) |
| 9 | Translation licensing | KJV + Ogienko only | Verify Turkoniak |
| 10 | Offline | Defer | No |
| 11 | Commentary granularity | Range-based | After spike |
| 12 | API design | tRPC | Yes |
