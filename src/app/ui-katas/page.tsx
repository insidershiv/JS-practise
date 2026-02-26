"use client";

import {
  CheckCircle,
  Circle,
  Code,
  Eye,
  Target,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface Kata {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  requirements: string[];
  bonusFeatures: string[];
  estimatedTime: string;
  completed: boolean;
  techStack: string[];
}

export default function UIKatas() {
  const [selectedKata, setSelectedKata] = useState<string>("autocomplete");
  const [completedKatas, setCompletedKatas] = useState<Set<string>>(new Set());

  const katas: Kata[] = [
    {
      id: "autocomplete",
      title: "Autocomplete Component",
      description:
        "Build a searchable autocomplete with debounced API calls, keyboard navigation, and accessibility features",
      difficulty: "intermediate",
      category: "Form Components",
      requirements: [
        "Debounced search input (300ms delay)",
        "Keyboard navigation (arrow keys, enter, escape)",
        "Accessibility (ARIA labels, screen reader support)",
        "Loading states and error handling",
        "Click outside to close",
        "Highlight matching text in suggestions",
      ],
      bonusFeatures: [
        "Virtual scrolling for large datasets",
        "Recent searches with localStorage",
        "Voice input support",
        "Multi-select with chips",
      ],
      estimatedTime: "4-6 hours",
      completed: false,
      techStack: ["React", "TypeScript", "Tailwind CSS", "React Hook Form"],
    },
    {
      id: "virtualized-list",
      title: "Virtualized List (10k rows)",
      description:
        "Create a high-performance list component that can handle thousands of items with smooth scrolling",
      difficulty: "advanced",
      category: "Performance",
      requirements: [
        "Render only visible items (viewport virtualization)",
        "Dynamic height calculation",
        "Smooth scrolling performance",
        "Sticky headers support",
        "Infinite scroll with pagination",
        "Memory efficient rendering",
      ],
      bonusFeatures: [
        "Variable height items",
        "Grouped items with collapsible sections",
        "Drag and drop reordering",
        "Search/filter with virtualization",
      ],
      estimatedTime: "6-8 hours",
      completed: false,
      techStack: ["React", "TypeScript", "React Window", "React Virtualized"],
    },
    {
      id: "date-range-picker",
      title: "Date Range Picker",
      description:
        "Build a comprehensive date range picker with calendar view, presets, and validation",
      difficulty: "intermediate",
      category: "Form Components",
      requirements: [
        "Calendar grid with month navigation",
        "Range selection with visual feedback",
        "Keyboard navigation and shortcuts",
        "Date validation and constraints",
        "Preset ranges (Last 7 days, This month, etc.)",
        "Accessibility compliance",
      ],
      bonusFeatures: [
        "Multiple date formats",
        "Time selection within dates",
        "Custom date ranges with business logic",
        "Internationalization (i18n) support",
      ],
      estimatedTime: "5-7 hours",
      completed: false,
      techStack: ["React", "TypeScript", "Date-fns", "React Hook Form"],
    },
    {
      id: "data-grid",
      title: "Advanced Data Grid",
      description:
        "Create a feature-rich data grid with sorting, filtering, grouping, and column management",
      difficulty: "advanced",
      category: "Data Display",
      requirements: [
        "Sortable columns with multi-sort",
        "Filterable data with multiple filter types",
        "Column resizing and reordering",
        "Row selection (single/multi)",
        "Pagination with configurable page sizes",
        "Export functionality (CSV, Excel)",
      ],
      bonusFeatures: [
        "Column grouping and aggregation",
        "Custom cell renderers",
        "Row editing with validation",
        "Column pinning and freezing",
        "Advanced filtering with saved filters",
      ],
      estimatedTime: "8-12 hours",
      completed: false,
      techStack: ["React", "TypeScript", "React Table", "XLSX"],
    },
    {
      id: "rich-text-editor",
      title: "Rich Text Editor",
      description:
        "Build a WYSIWYG editor with formatting options, undo/redo, and markdown support",
      difficulty: "advanced",
      category: "Content Editing",
      requirements: [
        "Basic formatting (bold, italic, underline)",
        "Headings and paragraph styles",
        "Lists (ordered and unordered)",
        "Undo/redo functionality",
        "Paste sanitization",
        "Markdown import/export",
      ],
      bonusFeatures: [
        "Image upload and embedding",
        "Table creation and editing",
        "Code blocks with syntax highlighting",
        "Collaborative editing indicators",
        "Version history",
      ],
      estimatedTime: "10-15 hours",
      completed: false,
      techStack: ["React", "TypeScript", "Slate.js", "React Slate"],
    },
    {
      id: "kanban-board",
      title: "Kanban Board",
      description:
        "Create a drag-and-drop kanban board with columns, cards, and real-time updates",
      difficulty: "intermediate",
      category: "Project Management",
      requirements: [
        "Drag and drop between columns",
        "Add/edit/delete columns and cards",
        "Card details with descriptions",
        "Multi-select and bulk operations",
        "Responsive design for mobile",
        "Local storage persistence",
      ],
      bonusFeatures: [
        "Real-time collaboration",
        "Card templates and cloning",
        "Due dates and reminders",
        "Search and filtering",
        "Board templates",
      ],
      estimatedTime: "6-8 hours",
      completed: false,
      techStack: ["React", "TypeScript", "React DnD", "Zustand"],
    },
    {
      id: "image-gallery",
      title: "Image Gallery with Masonry",
      description:
        "Build a responsive image gallery with masonry layout, lightbox, and lazy loading",
      difficulty: "intermediate",
      category: "Media Display",
      requirements: [
        "Masonry layout with dynamic heights",
        "Lazy loading with intersection observer",
        "Lightbox with zoom and navigation",
        "Responsive design (mobile/desktop)",
        "Image optimization and fallbacks",
        "Keyboard navigation",
      ],
      bonusFeatures: [
        "Infinite scroll loading",
        "Image editing (crop, rotate, filters)",
        "Bulk selection and operations",
        "Album organization",
        "Social sharing integration",
      ],
      estimatedTime: "5-7 hours",
      completed: false,
      techStack: [
        "React",
        "TypeScript",
        "React Masonry CSS",
        "React Image Lightbox",
      ],
    },
    {
      id: "file-uploader",
      title: "Advanced File Uploader",
      description:
        "Create a robust file uploader with drag-drop, progress tracking, and chunked uploads",
      difficulty: "advanced",
      category: "File Management",
      requirements: [
        "Drag and drop file selection",
        "File type validation and preview",
        "Upload progress with cancel/resume",
        "Chunked uploads for large files",
        "Multiple file selection",
        "Error handling and retry logic",
      ],
      bonusFeatures: [
        "Image compression before upload",
        "File deduplication",
        "Background upload queue",
        "Upload speed optimization",
        "Cloud storage integration",
      ],
      estimatedTime: "7-10 hours",
      completed: false,
      techStack: ["React", "TypeScript", "React Dropzone", "Axios"],
    },
    {
      id: "infinite-scroll",
      title: "Infinite Scroll Feed",
      description:
        "Build a social media-style infinite scroll feed with virtualization and real-time updates",
      difficulty: "intermediate",
      category: "Performance",
      requirements: [
        "Infinite scroll with intersection observer",
        "Virtualization for performance",
        "Real-time updates with WebSocket",
        "Pull-to-refresh functionality",
        "Optimistic updates for likes/comments",
        "Image lazy loading and optimization",
      ],
      bonusFeatures: [
        "Offline support with service workers",
        "Push notifications for new posts",
        "Advanced filtering and search",
        "Custom scroll indicators",
      ],
      estimatedTime: "6-8 hours",
      completed: false,
      techStack: [
        "React",
        "TypeScript",
        "React Query",
        "WebSocket",
        "Intersection Observer",
      ],
    },
    {
      id: "real-time-chat",
      title: "Real-time Chat Application",
      description:
        "Create a real-time chat app with message persistence, typing indicators, and file sharing",
      difficulty: "advanced",
      category: "Real-time",
      requirements: [
        "Real-time messaging with WebSocket",
        "Message persistence and history",
        "Typing indicators and read receipts",
        "File upload and sharing",
        "User presence and status",
        "Message search and filtering",
      ],
      bonusFeatures: [
        "Voice and video calling",
        "Message encryption",
        "Group chat functionality",
        "Message reactions and threads",
      ],
      estimatedTime: "8-12 hours",
      completed: false,
      techStack: ["React", "TypeScript", "Socket.io", "Node.js", "MongoDB"],
    },
    {
      id: "dashboard-analytics",
      title: "Analytics Dashboard",
      description:
        "Build a comprehensive analytics dashboard with charts, real-time data, and interactive filters",
      difficulty: "advanced",
      category: "Data Visualization",
      requirements: [
        "Multiple chart types (line, bar, pie, heatmap)",
        "Real-time data updates",
        "Interactive filters and date ranges",
        "Responsive design for all devices",
        "Data export functionality",
        "Customizable widgets and layouts",
      ],
      bonusFeatures: [
        "Predictive analytics and forecasting",
        "Custom chart builder",
        "Data drill-down capabilities",
        "Automated reporting",
      ],
      estimatedTime: "10-15 hours",
      completed: false,
      techStack: ["React", "TypeScript", "D3.js", "Chart.js", "React Query"],
    },
    {
      id: "e-commerce-cart",
      title: "E-commerce Shopping Cart",
      description:
        "Create a full-featured shopping cart with inventory management, promotions, and checkout flow",
      difficulty: "intermediate",
      category: "E-commerce",
      requirements: [
        "Add/remove items from cart",
        "Quantity updates and price calculations",
        "Promotion codes and discounts",
        "Inventory validation",
        "Save cart for later",
        "Checkout flow with form validation",
      ],
      bonusFeatures: [
        "Wishlist functionality",
        "Product recommendations",
        "Multiple payment methods",
        "Order tracking",
      ],
      estimatedTime: "6-8 hours",
      completed: false,
      techStack: [
        "React",
        "TypeScript",
        "React Hook Form",
        "Zustand",
        "Stripe",
      ],
    },
    {
      id: "code-editor",
      title: "Code Editor with Syntax Highlighting",
      description:
        "Build a code editor with syntax highlighting, autocomplete, and multiple language support",
      difficulty: "advanced",
      category: "Development Tools",
      requirements: [
        "Syntax highlighting for multiple languages",
        "Line numbers and gutter",
        "Auto-indentation and formatting",
        "Find and replace functionality",
        "Multiple cursors and selections",
        "Theme support (dark/light)",
      ],
      bonusFeatures: [
        "IntelliSense and autocomplete",
        "Git integration",
        "Multiple file tabs",
        "Code folding and minimap",
      ],
      estimatedTime: "8-12 hours",
      completed: false,
      techStack: [
        "React",
        "TypeScript",
        "Monaco Editor",
        "Prism.js",
        "CodeMirror",
      ],
    },
    {
      id: "google-search-autocomplete",
      title: "Google Search Autocomplete",
      description:
        "Build a search autocomplete system with real-time suggestions and search analytics",
      difficulty: "advanced",
      category: "Search Systems",
      requirements: [
        "Real-time search suggestions",
        "Search analytics and trending queries",
        "Personalized suggestions based on history",
        "Keyboard navigation and accessibility",
        "Debounced API calls with caching",
        "Search result previews",
      ],
      bonusFeatures: [
        "Voice search integration",
        "Search suggestions with images",
        "Multi-language support",
        "Search history management",
      ],
      estimatedTime: "6-8 hours",
      completed: false,
      techStack: [
        "React",
        "TypeScript",
        "Redis",
        "Elasticsearch",
        "WebSocket",
        "Analytics API",
      ],
    },
    {
      id: "facebook-newsfeed",
      title: "Facebook News Feed",
      description:
        "Create a social media news feed with infinite scroll, real-time updates, and engagement features",
      difficulty: "advanced",
      category: "Social Media",
      requirements: [
        "Infinite scroll with virtualization",
        "Real-time content updates",
        "Like, comment, and share functionality",
        "Content moderation and reporting",
        "Personalized feed ranking",
        "Media optimization and lazy loading",
      ],
      bonusFeatures: [
        "Live video integration",
        "Story creation and viewing",
        "Advanced privacy controls",
        "Content recommendation engine",
      ],
      estimatedTime: "8-12 hours",
      completed: false,
      techStack: [
        "React",
        "TypeScript",
        "GraphQL",
        "Redis",
        "WebSocket",
        "Machine Learning API",
      ],
    },
    {
      id: "amazon-product-page",
      title: "Amazon Product Page",
      description:
        "Build a comprehensive product page with reviews, recommendations, and purchase flow",
      difficulty: "intermediate",
      category: "E-commerce",
      requirements: [
        "Product image gallery with zoom",
        "Review and rating system",
        "Product recommendations",
        "Add to cart and wishlist",
        "Price tracking and alerts",
        "Responsive design for mobile",
      ],
      bonusFeatures: [
        "AR product visualization",
        "Voice shopping integration",
        "Social sharing features",
        "Advanced filtering and comparison",
      ],
      estimatedTime: "6-8 hours",
      completed: false,
      techStack: [
        "React",
        "TypeScript",
        "Stripe",
        "Redis",
        "Image Processing API",
        "Recommendation API",
      ],
    },
    {
      id: "netflix-browse",
      title: "Netflix Browse Interface",
      description:
        "Create a video streaming browse interface with personalized recommendations and smooth navigation",
      difficulty: "advanced",
      category: "Media Streaming",
      requirements: [
        "Horizontal scrolling categories",
        "Video preview on hover",
        "Personalized recommendations",
        "Search with filters and genres",
        "Continue watching section",
        "Responsive design for TV and mobile",
      ],
      bonusFeatures: [
        "Video preview autoplay",
        "Advanced search with voice",
        "Multiple user profiles",
        "Content rating and parental controls",
      ],
      estimatedTime: "8-10 hours",
      completed: false,
      techStack: [
        "React",
        "TypeScript",
        "Video.js",
        "Redis",
        "Recommendation API",
        "WebRTC",
      ],
    },
    {
      id: "uber-ride-booking",
      title: "Uber Ride Booking Interface",
      description:
        "Build a ride booking interface with real-time location tracking and driver matching",
      difficulty: "advanced",
      category: "Location Services",
      requirements: [
        "Interactive map with location picker",
        "Real-time driver tracking",
        "Ride type selection and pricing",
        "ETA calculation and route display",
        "Payment method management",
        "Ride history and receipts",
      ],
      bonusFeatures: [
        "Voice commands for booking",
        "Scheduled rides",
        "Ride sharing options",
        "Emergency features and safety tools",
      ],
      estimatedTime: "8-12 hours",
      completed: false,
      techStack: [
        "React",
        "TypeScript",
        "Mapbox",
        "WebSocket",
        "Payment API",
        "Location Services",
      ],
    },
    {
      id: "airbnb-property-listing",
      title: "Airbnb Property Listing",
      description:
        "Create a property listing interface with search, filtering, and booking capabilities",
      difficulty: "intermediate",
      category: "Booking Systems",
      requirements: [
        "Property search with filters",
        "Interactive map view",
        "Property image gallery",
        "Availability calendar",
        "Booking and reservation system",
        "Host and guest messaging",
      ],
      bonusFeatures: [
        "Virtual tour integration",
        "Instant booking options",
        "Price comparison tools",
        "Local experience recommendations",
      ],
      estimatedTime: "6-8 hours",
      completed: false,
      techStack: [
        "React",
        "TypeScript",
        "Mapbox",
        "Stripe",
        "WebSocket",
        "Calendar API",
      ],
    },
    {
      id: "spotify-music-player",
      title: "Spotify Music Player",
      description:
        "Build a music streaming player with playlist management and social features",
      difficulty: "advanced",
      category: "Media Streaming",
      requirements: [
        "Music player with controls",
        "Playlist creation and management",
        "Search and discovery features",
        "Social sharing and collaboration",
        "Offline download capability",
        "Audio visualization",
      ],
      bonusFeatures: [
        "Voice control integration",
        "Crossfade and audio effects",
        "Collaborative playlists",
        "Music recommendation engine",
      ],
      estimatedTime: "8-10 hours",
      completed: false,
      techStack: [
        "React",
        "TypeScript",
        "Web Audio API",
        "Service Workers",
        "WebSocket",
        "Audio Processing",
      ],
    },
    {
      id: "linkedin-profile",
      title: "LinkedIn Profile Interface",
      description:
        "Create a professional profile interface with networking and job matching features",
      difficulty: "intermediate",
      category: "Professional Networks",
      requirements: [
        "Professional profile management",
        "Network connection suggestions",
        "Job recommendations",
        "Content sharing and engagement",
        "Professional messaging",
        "Analytics and insights",
      ],
      bonusFeatures: [
        "Resume builder integration",
        "Skill endorsements",
        "Professional certifications",
        "Advanced networking tools",
      ],
      estimatedTime: "6-8 hours",
      completed: false,
      techStack: [
        "React",
        "TypeScript",
        "GraphQL",
        "WebSocket",
        "Analytics API",
        "Document Processing",
      ],
    },
    {
      id: "twitter-compose",
      title: "Twitter Compose Interface",
      description:
        "Build a tweet composition interface with character limits, media upload, and scheduling",
      difficulty: "intermediate",
      category: "Social Media",
      requirements: [
        "Tweet composition with character count",
        "Media upload and preview",
        "Hashtag and mention suggestions",
        "Tweet scheduling",
        "Draft saving and management",
        "Accessibility features",
      ],
      bonusFeatures: [
        "Voice-to-text integration",
        "Advanced media editing",
        "Thread creation tools",
        "Analytics and engagement tracking",
      ],
      estimatedTime: "5-7 hours",
      completed: false,
      techStack: [
        "React",
        "TypeScript",
        "Media Processing API",
        "WebSocket",
        "Analytics API",
        "Speech Recognition",
      ],
    },
    {
      id: "instagram-story-creator",
      title: "Instagram Story Creator",
      description:
        "Create a story creation interface with filters, stickers, and interactive elements",
      difficulty: "advanced",
      category: "Media Creation",
      requirements: [
        "Photo and video capture",
        "Filter and effect application",
        "Sticker and text overlay",
        "Interactive polls and questions",
        "Story scheduling and management",
        "Privacy and audience controls",
      ],
      bonusFeatures: [
        "AR filters and effects",
        "Music integration",
        "Collaborative stories",
        "Advanced editing tools",
      ],
      estimatedTime: "8-12 hours",
      completed: false,
      techStack: [
        "React",
        "TypeScript",
        "WebRTC",
        "Canvas API",
        "Media Processing",
        "AR Libraries",
      ],
    },
  ];

  const toggleKata = (kataId: string) => {
    const newCompleted = new Set(completedKatas);
    if (newCompleted.has(kataId)) {
      newCompleted.delete(kataId);
    } else {
      newCompleted.add(kataId);
    }
    setCompletedKatas(newCompleted);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Form Components":
        return <Code className="w-4 h-4" />;
      case "Performance":
        return <Zap className="w-4 h-4" />;
      case "Data Display":
        return <Eye className="w-4 h-4" />;
      case "Content Editing":
        return <Code className="w-4 h-4" />;
      case "Project Management":
        return <Target className="w-4 h-4" />;
      case "Media Display":
        return <Eye className="w-4 h-4" />;
      case "File Management":
        return <Code className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  const selectedKataData = katas.find((k) => k.id === selectedKata);
  const totalCompleted = completedKatas.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">UI Katas</h1>
            <p className="text-gray-600 mt-1">
              Build Complex Components from Specs
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Target className="w-5 h-5 text-green-600" aria-hidden />
            <span className="font-semibold text-gray-900">
              {totalCompleted}/{katas.length}
            </span>
            <span className="text-gray-500">completed</span>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Katas List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Available Katas
              </h2>
              <div className="space-y-4">
                {katas.map((kata) => (
                  <div
                    key={kata.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedKata === kata.id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedKata(kata.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {kata.title}
                      </h3>
                      {completedKatas.has(kata.id) ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                          kata.difficulty
                        )}`}
                      >
                        {kata.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">
                        • {kata.estimatedTime}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {kata.description}
                    </p>
                    <div className="flex items-center space-x-1">
                      {getCategoryIcon(kata.category)}
                      <span className="text-xs text-gray-500">
                        {kata.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kata Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              {selectedKataData && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedKataData.title}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {selectedKataData.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Difficulty</div>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                            selectedKataData.difficulty
                          )}`}
                        >
                          {selectedKataData.difficulty}
                        </span>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Time</div>
                        <div className="font-semibold text-gray-900">
                          {selectedKataData.estimatedTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Requirements */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Core Requirements
                      </h3>
                      <ul className="space-y-2">
                        {selectedKataData.requirements.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-600">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bonus Features */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Bonus Features
                      </h3>
                      <ul className="space-y-2">
                        {selectedKataData.bonusFeatures.map(
                          (feature, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-600">
                                {feature}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Recommended Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedKataData.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-4">
                    <button
                      className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                        completedKatas.has(selectedKataData.id)
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                      onClick={() => toggleKata(selectedKataData.id)}
                    >
                      {completedKatas.has(selectedKataData.id)
                        ? "Completed ✓"
                        : "Mark as Complete"}
                    </button>
                    <button className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Start Building
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Progress Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {["beginner", "intermediate", "advanced"].map((difficulty) => {
                const difficultyKatas = katas.filter(
                  (k) => k.difficulty === difficulty
                );
                const completed = difficultyKatas.filter((k) =>
                  completedKatas.has(k.id)
                ).length;
                return (
                  <div key={difficulty} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 capitalize">
                        {difficulty}
                      </h3>
                      <span className="text-sm font-medium text-gray-500">
                        {completed}/{difficultyKatas.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${
                            difficultyKatas.length > 0
                              ? (completed / difficultyKatas.length) * 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
