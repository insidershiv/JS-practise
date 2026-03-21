/**
 * Additional classic system-design prompts (FE interview style).
 * Merged with `_challenges-raw.ts` in `system-design-challenges.ts`.
 */
export const EXTRA_CHALLENGES = [
  {
    id: "chat-application",
    title: "Design a Chat Application",
    description:
      "Real-time messaging with delivery guarantees, presence, typing indicators, and history sync across web and mobile clients.",
    difficulty: "advanced" as const,
    category: "Real-time Systems",
    requirements: [
      "1:1 and small group messaging with ordering guarantees",
      "Online/offline presence and last-seen semantics",
      "Message history with pagination and search",
      "Attachments, read receipts, and delivery states",
      "End-to-end encryption considerations (optional deep dive)",
      "Moderation, abuse reporting, and rate limits",
    ],
    architecture: [
      "WebSockets or MQTT for bidirectional streams; fallback to long-polling",
      "Shard chat metadata by conversation id; hot partitions mitigated with consistent hashing",
      "Message store (append-only log or time-series friendly DB) + object storage for media",
      "Redis for presence, typing, ephemeral counters",
      "CDN for shared media; push notifications via FCM/APNs",
    ],
    considerations: [
      "Ordering vs availability under partition (per-conversation sequence numbers)",
      "Back-pressure on clients with thousands of unread messages",
      "Multi-region: conflict-free ordering and replication lag exposure in UI",
      "Compliance: retention policies and export/delete",
    ],
    estimatedTime: "45 min",
    topics: ["WebSockets", "HTTP", "SQL", "NoSQL"],
    frontendAngle: [
      "Virtualize long message lists; anchor scroll on new messages vs user reading position.",
      "Optimistic sends with explicit failure states; reconcile with server ordering keys.",
      "Split bundle: lightweight shell + lazy load rich composer and attachment previews.",
    ],
    deepDive:
      "In frontend interviews, emphasize how you expose connection state (reconnecting, degraded mode), how you avoid layout thrash when batches of messages arrive, and how you test flaky networks with Playwright or Cypress.",
  },
  {
    id: "url-shortener",
    title: "Design a URL Shortener",
    description:
      "Create short links that redirect quickly, resist enumeration abuse, and scale to billions of lookups per day.",
    difficulty: "intermediate" as const,
    category: "Distributed Systems",
    requirements: [
      "Short-code generation with low collision probability",
      "Fast redirects with minimal latency worldwide",
      "Analytics: click counts, referrers, geo (privacy-aware)",
      "Expiration, custom slugs, and abuse prevention",
      "Optional signed URLs for private campaigns",
    ],
    architecture: [
      "Base62 / bijective encoding from distributed id generators (Snowflake-like)",
      "Read-heavy path: cache hot short codes in edge KV (Redis, Memcached)",
      "Write path: durable DB (SQL or Dynamo-style) + async analytics pipeline",
      "Rate limiting at API gateway; CAPTCHA for public creation endpoints",
    ],
    considerations: [
      "Hot keys for viral links — cache stampede mitigation",
      "Collision handling vs retry vs reserved namespace",
      "GDPR: PII in analytics and retention windows",
    ],
    estimatedTime: "35 min",
    topics: ["Hashing", "Database", "Redirection"],
    frontendAngle: [
      "Admin UI for campaigns: validate slugs client-side, show availability hints, debounce checks.",
      "Redirect performance is mostly server/CDN — still discuss prefetch and SSR for marketing pages.",
      "Security: open-redirect prevention for destination URLs in editable flows.",
    ],
    deepDive:
      "Walk through generating IDs without coordination storms, and how a CDN edge can answer 302s for the hottest codes while origin stays authoritative.",
  },
  {
    id: "autocomplete-typeahead",
    title: "Design Autocomplete / Typeahead",
    description:
      "Low-latency search suggestions as users type, with stale-while-revalidate behavior and keyboard accessibility.",
    difficulty: "intermediate" as const,
    category: "Search Systems",
    requirements: [
      "Sub-100ms p95 suggestion latency for popular prefixes",
      "Ranking: popularity, personalization, and safe content",
      "Debouncing, cancellation, and request de-duplication",
      "Keyboard navigation and screen reader semantics",
      "Backpressure when upstream search is slow",
    ],
    architecture: [
      "Trie or prefix index in memory for hot prefixes; bloom filters for negatives",
      "Search cluster (Elasticsearch/OpenSearch) for fuzzy and rich docs",
      "API gateway with per-user rate limits and edge caching for anonymous traffic",
      "Async personalization features recomputed offline",
    ],
    considerations: [
      "Stale results while user types faster than network round trips",
      "Diversity in suggestions; avoid harmful completions",
      "Cost of fan-out queries for every keystroke",
    ],
    estimatedTime: "40 min",
    topics: ["Trie", "Debounce", "API Design"],
    frontendAngle: [
      "Request IDs: only apply latest response; cancel in-flight fetches with AbortController.",
      "Stale-while-revalidate in the client cache for instant suggestions.",
      "A11y: aria-activedescendant, listbox pattern, and focus management.",
    ],
    deepDive:
      "This is a classic FE system design: tie together debounce, network concurrency, and optimistic UI with clear diagrams for race conditions.",
  },
  {
    id: "google-docs-collaborative",
    title: "Design Google Docs (Collaborative Editor)",
    description:
      "Multiple users editing the same document with low latency, conflict resolution, and rich text support.",
    difficulty: "advanced" as const,
    category: "Collaboration",
    requirements: [
      "Character-level or operational transforms with convergence guarantees",
      "Cursors, selections, and presence for collaborators",
      "Offline editing with merge on reconnect",
      "Version history and named revisions",
      "Import/export and large document performance",
    ],
    architecture: [
      "CRDT or OT engine in the client with deterministic server validation",
      "WebSocket room per document; snapshot + operation log storage",
      "Periodic compaction of operation history; cold storage for snapshots",
      "Search index built asynchronously from snapshots",
    ],
    considerations: [
      "Memory use for long editing sessions in the browser",
      "Latency fairness: slow peers should not block others",
      "Undo/redo stacks across concurrent edits",
    ],
    estimatedTime: "50 min",
    topics: ["CRDT", "OT", "WebSockets"],
    frontendAngle: [
      "Isolate editor core in a worker where possible; keep main thread for input and layout.",
      "Virtualize viewport for huge documents; incremental layout for embeds.",
      "Fuzz-test convergence: property-based tests for OT/CRDT invariants.",
    ],
    deepDive:
      "Contrast OT vs CRDT: OT often needs a central server for ordering; CRDTs can be more peer-friendly but heavier in memory. Discuss how you’d surface conflicts in the UI (you rarely show raw conflicts in docs).",
  },
];
