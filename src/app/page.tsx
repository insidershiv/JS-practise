"use client";

import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  Circle,
  Clock,
  Code,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Week {
  id: number;
  title: string;
  focus: string;
  topics: string[];
  deliverables: string[];
  codingTarget: string;
  completed: boolean;
  progress: number;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  category: "coding" | "ui" | "system-design" | "react" | "rn" | "behavioral";
  completed: boolean;
}

export default function InterviewRoadmap() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(
    new Set()
  );

  const weeks: Week[] = [
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

  const topics: Topic[] = [
    // JavaScript & Browser
    {
      id: "js-event-loop",
      name: "Event Loop & Async",
      description: "Microtasks vs macrotasks, promise scheduling",
      category: "coding",
      completed: false,
    },
    {
      id: "js-closures",
      name: "Closures & Prototypes",
      description: "Scope chains, prototype inheritance",
      category: "coding",
      completed: false,
    },
    {
      id: "js-modules",
      name: "Modules & Hoisting",
      description: "ES6 modules, temporal dead zone",
      category: "coding",
      completed: false,
    },

    // React Web
    {
      id: "react-reconciliation",
      name: "Reconciliation",
      description: "Virtual DOM diffing, key optimization",
      category: "react",
      completed: false,
    },
    {
      id: "react-hooks",
      name: "Hooks Deep Dive",
      description: "Rules, effect timing, transitions",
      category: "react",
      completed: false,
    },
    {
      id: "react-performance",
      name: "React Performance",
      description: "Profiling, memoization, virtualization",
      category: "react",
      completed: false,
    },

    // React Native
    {
      id: "rn-architecture",
      name: "RN Architecture",
      description: "Fabric, TurboModules, bridging",
      category: "rn",
      completed: false,
    },
    {
      id: "rn-performance",
      name: "RN Performance",
      description: "FlatList, Reanimated, memory management",
      category: "rn",
      completed: false,
    },

    // System Design
    {
      id: "sd-caching",
      name: "Caching Strategy",
      description: "SWR, RTK Query, cache invalidation",
      category: "system-design",
      completed: false,
    },
    {
      id: "sd-performance",
      name: "Performance Architecture",
      description: "SSR/SSG/ISR, Core Web Vitals",
      category: "system-design",
      completed: false,
    },
    {
      id: "sd-observability",
      name: "Observability",
      description: "RUM, error tracking, metrics",
      category: "system-design",
      completed: false,
    },

    // UI Implementation
    {
      id: "ui-virtualization",
      name: "Virtualization",
      description: "Large lists, infinite scroll",
      category: "ui",
      completed: false,
    },
    {
      id: "ui-accessibility",
      name: "Accessibility",
      description: "ARIA, keyboard navigation, screen readers",
      category: "ui",
      completed: false,
    },
    {
      id: "ui-performance",
      name: "UI Performance",
      description: "Bundle splitting, lazy loading",
      category: "ui",
      completed: false,
    },

    // Behavioral
    {
      id: "behavioral-leadership",
      name: "Leadership Stories",
      description: "Scope, impact, cross-team collaboration",
      category: "behavioral",
      completed: false,
    },
    {
      id: "behavioral-impact",
      name: "Impact Quantification",
      description: "Metrics, outcomes, measurable results",
      category: "behavioral",
      completed: false,
    },
  ];

  const toggleTopic = (topicId: string) => {
    const newCompleted = new Set(completedTopics);
    if (newCompleted.has(topicId)) {
      newCompleted.delete(topicId);
    } else {
      newCompleted.add(topicId);
    }
    setCompletedTopics(newCompleted);
  };

  const getCategoryIcon = (category: Topic["category"]) => {
    switch (category) {
      case "coding":
        return <Code className="w-4 h-4" />;
      case "ui":
        return <Target className="w-4 h-4" />;
      case "system-design":
        return <BookOpen className="w-4 h-4" />;
      case "react":
        return <Zap className="w-4 h-4" />;
      case "rn":
        return <Users className="w-4 h-4" />;
      case "behavioral":
        return <Users className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: Topic["category"]) => {
    switch (category) {
      case "coding":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ui":
        return "bg-green-100 text-green-800 border-green-200";
      case "system-design":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "react":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "rn":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "behavioral":
        return "bg-pink-100 text-pink-800 border-pink-200";
    }
  };

  const selectedWeekData = weeks.find((w) => w.id === selectedWeek);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Senior Frontend Interview Prep
              </h1>
              <p className="text-gray-600 mt-1">8-Week Roadmap to Success</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Target Role</p>
                <p className="font-semibold text-gray-900">
                  Senior Frontend Engineer
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Time Commitment</p>
                <p className="font-semibold text-gray-900">10-15 hrs/week</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Progress */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Weekly Progress
              </h2>
              <div className="space-y-4">
                {weeks.map((week) => (
                  <div
                    key={week.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedWeek === week.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedWeek(week.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        Week {week.id}
                      </h3>
                      {week.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{week.title}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${week.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Week Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              {selectedWeekData && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Week {selectedWeekData.id}
                      </h2>
                      <p className="text-xl text-gray-600">
                        {selectedWeekData.title}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>10-15 hours</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Focus Areas */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Focus Areas
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {selectedWeekData.focus}
                      </p>

                      <h4 className="font-medium text-gray-900 mb-2">
                        Topics to Master:
                      </h4>
                      <ul className="space-y-2">
                        {selectedWeekData.topics.map((topic, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <Circle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                              {topic}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Deliverables
                      </h3>
                      <ul className="space-y-2">
                        {selectedWeekData.deliverables.map(
                          (deliverable, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600">
                                {deliverable}
                              </span>
                            </li>
                          )
                        )}
                      </ul>

                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">
                          Coding Target
                        </h4>
                        <p className="text-sm text-blue-700">
                          {selectedWeekData.codingTarget}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Topic Mastery */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Topic Mastery Checklist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    completedTopics.has(topic.id)
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => toggleTopic(topic.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                        topic.category
                      )}`}
                    >
                      {getCategoryIcon(topic.category)}
                      <span className="ml-1 capitalize">
                        {topic.category.replace("-", " ")}
                      </span>
                    </div>
                    {completedTopics.has(topic.id) ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-gray-600">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEI Questions from interview */}
        <div className="mt-8">
          <div className="rounded-xl shadow-sm border border-indigo-100 p-6 bg-indigo-50/30">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    From My Interview
                  </h3>
                  <p className="text-sm text-gray-600">
                    Questions & solutions from your FEI prep — categorized by section and difficulty
                  </p>
                </div>
              </div>
              <Link
                href="/fei-questions"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Open curriculum
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Coding Practice
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Focus on arrays/strings, hash maps, sliding window, and BFS/DFS
            </p>
            <Link
              href="/coding"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors inline-block text-center"
            >
              Start Practice
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">UI Katas</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Build complex components: tables, editors, drag-drop, virtualized
              lists
            </p>
            <Link
              href="/ui-katas"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors inline-block text-center"
            >
              View Katas
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                System Design
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Architecture for large apps: state, caching, performance, a11y
            </p>
            <Link
              href="/system-design"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors inline-block text-center"
            >
              Design Drills
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
