/** 8-week prep roadmap — used by Dashboard + Study Plans */
export interface RoadmapWeek {
  id: number;
  title: string;
  focus: string;
  topics: string[];
  deliverables: string[];
  codingTarget: string;
  completed: boolean;
  progress: number;
}

export const ROADMAP_WEEKS: RoadmapWeek[] = [
  {
    id: 1,
    title: "Baseline & JS Fundamentals",
    focus: "JavaScript deep dive + React refresh",
    topics: [
      "Event loop (microtasks vs macrotasks)",
      "Closures & prototypes",
      "Promises & async/await",
      "React reconciliation",
      "Controlled vs uncontrolled",
      "Effects lifecycle",
    ],
    deliverables: ["Autocomplete with debounced fetch + keyboard nav + a11y"],
    codingTarget: "25 easy → medium problems (arrays/strings, hash maps)",
    completed: false,
    progress: 0,
  },
  {
    id: 2,
    title: "Data Structures + UI Katas",
    focus: "Sliding window + Virtualized components",
    topics: [
      "Sliding window algorithms",
      "Two-pointers technique",
      "Stack/queue problems",
      "Virtualized list (10k rows)",
      "Date range picker",
      "React performance profiling",
    ],
    deliverables: [
      "Virtualized list with sticky header",
      "Date range picker (keyboard + a11y)",
    ],
    codingTarget: "20 problems (sliding window, two-pointers, stack/queue)",
    completed: false,
    progress: 0,
  },
  {
    id: 3,
    title: "Frontend System Design I",
    focus: "State architecture + Data fetching",
    topics: [
      "State architecture (feature vs app-wide)",
      "Data fetching (SWR/RTK Query)",
      "Caching strategies",
      "Pagination patterns",
      "Error handling",
      "i18n & theming",
    ],
    deliverables: ["Notifications center", "Realtime comments system"],
    codingTarget:
      "15 mediums (maps/sets, prefix sums), 3 hards (graph BFS/DFS)",
    completed: false,
    progress: 0,
  },
  {
    id: 4,
    title: "Networking, Performance & Security",
    focus: "Web performance + Security best practices",
    topics: [
      "Core Web Vitals (LCP/CLS/INP)",
      "Critical CSS & image strategy",
      "Bundle analysis",
      "SSR vs SSG vs ISR",
      "XSS & CSRF protection",
      "CORS & security headers",
    ],
    deliverables: ["Lighthouse optimization", "React Profiler analysis"],
    codingTarget: "15 mediums, 1-2 hards (binary search variants)",
    completed: false,
    progress: 0,
  },
  {
    id: 5,
    title: "React Native Focus",
    focus: "RN architecture + Performance tuning",
    topics: [
      "Fabric & TurboModules",
      "Hermes engine",
      "Bridging patterns",
      "Gesture/responder system",
      "FlatList optimization",
      "Reanimated basics",
    ],
    deliverables: [
      "Chat list with pagination + optimistic send + offline queue",
    ],
    codingTarget: "10 mediums (trees/graphs light)",
    completed: false,
    progress: 0,
  },
  {
    id: 6,
    title: "Frontend System Design II",
    focus: "Micro-frontends + Observability",
    topics: [
      "Micro-frontends vs monolith",
      "Error boundaries strategy",
      "Feature flags & A/B testing",
      "Logging/metrics/tracing",
      "RUM implementation",
    ],
    deliverables: [
      "Schema-driven form engine",
      "Large data grid",
      "File uploader (5GB, chunking, retry)",
    ],
    codingTarget: "Mixed problems + system design focus",
    completed: false,
    progress: 0,
  },
  {
    id: 7,
    title: "Interview Simulation & Stories",
    focus: "Mock interviews + Behavioral prep",
    topics: [
      "Mock coding interviews",
      "UI implementation practice",
      "System design drills",
      "STAR story preparation",
      "Impact quantification",
    ],
    deliverables: [
      "2 coding mocks",
      "1 UI mock",
      "1 system design",
      "1 behavioral",
      "6 STAR stories",
    ],
    codingTarget: "Timed practice sessions",
    completed: false,
    progress: 0,
  },
  {
    id: 8,
    title: "Targeted Gaps + Polishing",
    focus: "Weak spot filling + Final prep",
    topics: [
      "Gap analysis",
      "Company-specific practice",
      "Trade-off explanations",
      "Resume optimization",
      "Final dry run",
    ],
    deliverables: [
      "One full mock loop",
      "Resume rewrite",
      "Portfolio polish",
    ],
    codingTarget: "Targeted practice based on gaps",
    completed: false,
    progress: 0,
  },
];
