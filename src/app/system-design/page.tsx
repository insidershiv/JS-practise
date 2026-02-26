"use client";

import {
  BookOpen,
  CheckCircle,
  Circle,
  Eye,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface DesignChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: "intermediate" | "advanced";
  category: string;
  requirements: string[];
  architecture: string[];
  considerations: string[];
  estimatedTime: string;
  completed: boolean;
  topics: string[];
}

export default function SystemDesign() {
  const [selectedChallenge, setSelectedChallenge] =
    useState<string>("notifications");
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(
    new Set()
  );

  const challenges: DesignChallenge[] = [
    {
      id: "notifications",
      title: "Notifications Center",
      description:
        "Design a real-time notification system with push notifications, deduplication, and offline support",
      difficulty: "intermediate",
      category: "Real-time Systems",
      requirements: [
        "Real-time push notifications",
        "Notification deduplication",
        "Offline queue and sync",
        "User preferences and filtering",
        "Cross-platform delivery",
        "Analytics and engagement tracking",
      ],
      architecture: [
        "WebSocket connections for real-time updates",
        "Redis for notification caching and deduplication",
        "Message queue (RabbitMQ/Kafka) for reliable delivery",
        "Service workers for offline support",
        "CDN for global delivery optimization",
      ],
      considerations: [
        "Scalability: Handle millions of concurrent connections",
        "Performance: Sub-100ms notification delivery",
        "Reliability: 99.9% uptime with graceful degradation",
        "Security: Authentication and rate limiting",
        "Cost: Optimize for bandwidth and storage",
      ],
      estimatedTime: "3-4 hours",
      completed: false,
      topics: [
        "WebSockets",
        "Redis",
        "Message Queues",
        "Service Workers",
        "Push APIs",
      ],
    },
    {
      id: "realtime-comments",
      title: "Realtime Comments System",
      description:
        "Build a collaborative commenting system with optimistic updates and conflict resolution",
      difficulty: "advanced",
      category: "Collaboration",
      requirements: [
        "Real-time comment updates",
        "Optimistic UI updates",
        "Conflict resolution (OT/CRDT)",
        "Comment threading and replies",
        "Rich text formatting",
        "Moderation and spam filtering",
      ],
      architecture: [
        "Operational Transform (OT) for conflict resolution",
        "WebSocket for real-time synchronization",
        "PostgreSQL with JSONB for comment storage",
        "Redis for active session caching",
        "Elasticsearch for comment search and filtering",
      ],
      considerations: [
        "Consistency: Handle concurrent edits without conflicts",
        "Performance: Support thousands of concurrent users",
        "Scalability: Horizontal scaling across multiple regions",
        "Data integrity: Ensure comment ordering and threading",
        "User experience: Minimize latency and conflicts",
      ],
      estimatedTime: "4-5 hours",
      completed: false,
      topics: [
        "Operational Transform",
        "CRDT",
        "WebSockets",
        "Conflict Resolution",
        "Optimistic UI",
      ],
    },
    {
      id: "schema-forms",
      title: "Schema-Driven Form Engine",
      description:
        "Design a dynamic form system that renders forms from JSON schemas with validation",
      difficulty: "intermediate",
      category: "Form Systems",
      requirements: [
        "JSON schema to form rendering",
        "Dynamic validation rules",
        "Conditional field visibility",
        "Form state management",
        "Custom field types",
        "Form submission and error handling",
      ],
      architecture: [
        "JSON Schema specification for form definitions",
        "React component library for form fields",
        "Validation engine with custom rules",
        "Form state machine (XState)",
        "Schema registry and versioning",
      ],
      considerations: [
        "Flexibility: Support complex form logic and dependencies",
        "Performance: Efficient rendering of large forms",
        "Accessibility: WCAG compliance for all field types",
        "Extensibility: Easy addition of new field types",
        "Developer experience: Clear schema documentation",
      ],
      estimatedTime: "3-4 hours",
      completed: false,
      topics: [
        "JSON Schema",
        "Form Validation",
        "State Machines",
        "Component Libraries",
        "Dynamic Rendering",
      ],
    },
    {
      id: "data-grid",
      title: "Large Data Grid System",
      description:
        "Architect a high-performance data grid with virtualization, sorting, and filtering",
      difficulty: "advanced",
      category: "Data Display",
      requirements: [
        "Virtual scrolling for 100k+ rows",
        "Multi-column sorting and filtering",
        "Column grouping and aggregation",
        "Row editing and validation",
        "Export functionality",
        "Real-time data updates",
      ],
      architecture: [
        "Virtual scrolling with dynamic height calculation",
        "IndexedDB for client-side caching",
        "Web Workers for data processing",
        "GraphQL for efficient data fetching",
        "Redis for server-side caching and aggregation",
      ],
      considerations: [
        "Performance: Smooth scrolling with large datasets",
        "Memory: Efficient data loading and caching",
        "Scalability: Handle millions of records",
        "User experience: Responsive interactions",
        "Data consistency: Real-time updates without conflicts",
      ],
      estimatedTime: "4-6 hours",
      completed: false,
      topics: [
        "Virtualization",
        "Web Workers",
        "IndexedDB",
        "GraphQL",
        "Data Processing",
      ],
    },
    {
      id: "file-upload",
      title: "Large File Upload System",
      description:
        "Design a robust file upload system supporting 5GB+ files with chunking and resume",
      difficulty: "advanced",
      category: "File Management",
      requirements: [
        "Chunked uploads for large files",
        "Upload resume and retry logic",
        "Progress tracking and cancellation",
        "File validation and virus scanning",
        "Cloud storage integration",
        "Upload queue management",
      ],
      architecture: [
        "Chunked upload with multipart/form-data",
        "Redis for upload session management",
        "S3/Cloud storage for file storage",
        "Message queue for background processing",
        "CDN for global file distribution",
      ],
      considerations: [
        "Reliability: Handle network failures and resume uploads",
        "Performance: Optimize upload speed and bandwidth usage",
        "Security: File validation and access control",
        "Scalability: Support concurrent large uploads",
        "Cost: Optimize storage and bandwidth costs",
      ],
      estimatedTime: "3-4 hours",
      completed: false,
      topics: [
        "Chunked Uploads",
        "Cloud Storage",
        "Message Queues",
        "File Validation",
        "Progress Tracking",
      ],
    },
    {
      id: "micro-frontends",
      title: "Micro-Frontend Architecture",
      description:
        "Design a micro-frontend system with independent deployment and team autonomy",
      difficulty: "advanced",
      category: "Architecture",
      requirements: [
        "Independent deployment of frontend modules",
        "Shared component library",
        "Routing and navigation coordination",
        "State management across modules",
        "Performance monitoring",
        "Team autonomy and ownership",
      ],
      architecture: [
        "Module Federation for code sharing",
        "Single-spa for application orchestration",
        "Shared state management (Redux/Zustand)",
        "API Gateway for backend coordination",
        "Shared design system and component library",
      ],
      considerations: [
        "Team autonomy: Independent development and deployment",
        "Performance: Minimize bundle size and loading time",
        "Consistency: Maintain UI/UX across modules",
        "Scalability: Support multiple teams and modules",
        "Maintenance: Shared tooling and standards",
      ],
      estimatedTime: "4-5 hours",
      completed: false,
      topics: [
        "Module Federation",
        "Single-spa",
        "Micro-frontends",
        "Shared State",
        "Team Architecture",
      ],
    },
    {
      id: "real-time-dashboard",
      title: "Real-time Analytics Dashboard",
      description:
        "Design a real-time dashboard system that processes and displays millions of data points",
      difficulty: "advanced",
      category: "Real-time Systems",
      requirements: [
        "Real-time data ingestion and processing",
        "Interactive charts and visualizations",
        "Customizable dashboards and widgets",
        "Data aggregation and filtering",
        "Alert system and notifications",
        "Historical data analysis",
      ],
      architecture: [
        "Apache Kafka for data streaming",
        "Apache Spark for real-time processing",
        "Redis for caching and session management",
        "WebSocket for real-time updates",
        "Elasticsearch for data indexing and search",
        "D3.js for client-side visualizations",
      ],
      considerations: [
        "Scalability: Handle millions of events per second",
        "Performance: Sub-second query response times",
        "Reliability: 99.99% uptime with data consistency",
        "User experience: Smooth real-time updates",
        "Cost: Optimize for data storage and processing",
      ],
      estimatedTime: "4-5 hours",
      completed: false,
      topics: [
        "Stream Processing",
        "Real-time Analytics",
        "Data Visualization",
        "Event Sourcing",
        "CQRS",
      ],
    },
    {
      id: "social-media-feed",
      title: "Social Media Feed System",
      description:
        "Design a social media feed that serves personalized content to millions of users",
      difficulty: "advanced",
      category: "Content Delivery",
      requirements: [
        "Personalized content ranking and filtering",
        "Real-time feed updates",
        "Content moderation and spam detection",
        "Media upload and processing",
        "Engagement tracking and analytics",
        "Cross-platform synchronization",
      ],
      architecture: [
        "GraphQL for flexible data fetching",
        "Redis for feed caching and ranking",
        "Elasticsearch for content search",
        "CDN for media delivery",
        "Machine learning for content ranking",
        "Apache Kafka for event streaming",
      ],
      considerations: [
        "Performance: Serve feeds in under 200ms",
        "Scalability: Support millions of concurrent users",
        "Personalization: Accurate content recommendations",
        "Content safety: Effective moderation systems",
        "Cost: Optimize for storage and bandwidth",
      ],
      estimatedTime: "5-6 hours",
      completed: false,
      topics: [
        "Content Ranking",
        "Personalization",
        "GraphQL",
        "Machine Learning",
        "Event Streaming",
      ],
    },
    {
      id: "video-streaming-platform",
      title: "Video Streaming Platform",
      description:
        "Design a Netflix-like video streaming platform with adaptive bitrate streaming",
      difficulty: "advanced",
      category: "Media Streaming",
      requirements: [
        "Adaptive bitrate streaming (HLS/DASH)",
        "Content delivery network integration",
        "Video transcoding and processing",
        "User authentication and DRM",
        "Recommendation system",
        "Analytics and viewing metrics",
      ],
      architecture: [
        "HLS/DASH for adaptive streaming",
        "CDN for global content delivery",
        "FFmpeg for video transcoding",
        "Redis for session management",
        "PostgreSQL for user data and metadata",
        "Elasticsearch for content search",
      ],
      considerations: [
        "Performance: Smooth streaming with minimal buffering",
        "Scalability: Support millions of concurrent streams",
        "Quality: Adaptive bitrate based on network conditions",
        "Security: DRM and content protection",
        "Cost: Optimize for bandwidth and storage",
      ],
      estimatedTime: "4-5 hours",
      completed: false,
      topics: [
        "Video Streaming",
        "CDN",
        "Adaptive Bitrate",
        "DRM",
        "Media Processing",
      ],
    },
    {
      id: "ride-sharing-system",
      title: "Ride-Sharing System",
      description:
        "Design a Uber-like ride-sharing platform with real-time location tracking and matching",
      difficulty: "advanced",
      category: "Location Services",
      requirements: [
        "Real-time location tracking",
        "Driver-rider matching algorithm",
        "Payment processing and billing",
        "Route optimization and ETA calculation",
        "Safety features and emergency support",
        "Rating and review system",
      ],
      architecture: [
        "WebSocket for real-time location updates",
        "Redis for location caching and matching",
        "PostgreSQL for user and trip data",
        "Payment gateway integration",
        "Maps API for routing and geocoding",
        "Push notifications for updates",
      ],
      considerations: [
        "Performance: Real-time location updates and matching",
        "Scalability: Handle thousands of concurrent rides",
        "Safety: Emergency features and driver verification",
        "Reliability: 99.9% uptime for critical services",
        "Cost: Optimize for location services and payments",
      ],
      estimatedTime: "4-5 hours",
      completed: false,
      topics: [
        "Location Services",
        "Real-time Matching",
        "Payment Processing",
        "Route Optimization",
        "Push Notifications",
      ],
    },
    {
      id: "google-search",
      title: "Google Search Engine",
      description:
        "Design a search engine that handles billions of queries with relevant results and autocomplete",
      difficulty: "advanced",
      category: "Search Systems",
      requirements: [
        "Web crawling and indexing",
        "Search ranking algorithm",
        "Autocomplete suggestions",
        "Spell correction and synonyms",
        "Personalized results",
        "Real-time search analytics",
      ],
      architecture: [
        "Distributed web crawlers",
        "Inverted index for fast search",
        "PageRank algorithm for ranking",
        "Trie data structure for autocomplete",
        "Machine learning for personalization",
        "CDN for global result delivery",
      ],
      considerations: [
        "Scalability: Handle billions of queries per day",
        "Performance: Sub-100ms search response time",
        "Relevance: High-quality search results",
        "Freshness: Real-time content indexing",
        "Cost: Optimize for massive data processing",
      ],
      estimatedTime: "5-6 hours",
      completed: false,
      topics: [
        "Search Algorithms",
        "Web Crawling",
        "Information Retrieval",
        "Machine Learning",
        "Distributed Systems",
      ],
    },
    {
      id: "facebook-newsfeed",
      title: "Facebook News Feed",
      description:
        "Design a social media news feed that serves personalized content to billions of users",
      difficulty: "advanced",
      category: "Social Media",
      requirements: [
        "Content ranking and personalization",
        "Real-time feed updates",
        "Content moderation and safety",
        "Media processing and delivery",
        "Engagement tracking and analytics",
        "Cross-platform synchronization",
      ],
      architecture: [
        "GraphQL for flexible data fetching",
        "Redis for feed caching and ranking",
        "Elasticsearch for content search",
        "CDN for media delivery",
        "Machine learning for content ranking",
        "Apache Kafka for event streaming",
      ],
      considerations: [
        "Performance: Serve feeds in under 200ms",
        "Scalability: Support billions of users",
        "Personalization: Accurate content recommendations",
        "Content safety: Effective moderation systems",
        "Privacy: User data protection and compliance",
      ],
      estimatedTime: "5-6 hours",
      completed: false,
      topics: [
        "Content Ranking",
        "Personalization",
        "GraphQL",
        "Machine Learning",
        "Privacy & Safety",
      ],
    },
    {
      id: "amazon-product-catalog",
      title: "Amazon Product Catalog",
      description:
        "Design a product catalog system that handles millions of products with search and recommendations",
      difficulty: "advanced",
      category: "E-commerce",
      requirements: [
        "Product catalog management",
        "Advanced search and filtering",
        "Product recommendations",
        "Inventory management",
        "Price optimization",
        "Review and rating system",
      ],
      architecture: [
        "Elasticsearch for product search",
        "Redis for caching and sessions",
        "PostgreSQL for product data",
        "Machine learning for recommendations",
        "CDN for product images",
        "Microservices for scalability",
      ],
      considerations: [
        "Performance: Fast search and product loading",
        "Scalability: Handle millions of products",
        "Accuracy: Relevant search results and recommendations",
        "Availability: 99.99% uptime for critical services",
        "Cost: Optimize for storage and compute",
      ],
      estimatedTime: "4-5 hours",
      completed: false,
      topics: [
        "Search Systems",
        "Recommendation Engines",
        "Microservices",
        "Machine Learning",
        "E-commerce",
      ],
    },
    {
      id: "netflix-recommendation",
      title: "Netflix Recommendation System",
      description:
        "Design a recommendation engine that suggests personalized content to millions of users",
      difficulty: "advanced",
      category: "Recommendation Systems",
      requirements: [
        "Content-based filtering",
        "Collaborative filtering",
        "Real-time personalization",
        "A/B testing framework",
        "Content metadata management",
        "User behavior tracking",
      ],
      architecture: [
        "Apache Spark for ML processing",
        "Redis for user preferences caching",
        "PostgreSQL for content metadata",
        "Kafka for user behavior streaming",
        "TensorFlow for ML models",
        "CDN for content delivery",
      ],
      considerations: [
        "Accuracy: High-quality content recommendations",
        "Performance: Real-time recommendation generation",
        "Scalability: Support millions of users",
        "Diversity: Avoid recommendation bubbles",
        "Cost: Optimize for ML model training and inference",
      ],
      estimatedTime: "4-5 hours",
      completed: false,
      topics: [
        "Machine Learning",
        "Recommendation Systems",
        "A/B Testing",
        "Data Processing",
        "Personalization",
      ],
    },
    {
      id: "uber-matching",
      title: "Uber Driver-Rider Matching",
      description:
        "Design a real-time matching system that connects drivers and riders efficiently",
      difficulty: "advanced",
      category: "Location Services",
      requirements: [
        "Real-time location tracking",
        "Driver-rider matching algorithm",
        "ETA calculation and optimization",
        "Surge pricing system",
        "Driver availability management",
        "Safety and verification features",
      ],
      architecture: [
        "WebSocket for real-time updates",
        "Redis for location caching",
        "PostgreSQL for user and trip data",
        "Graph algorithms for matching",
        "Maps API for routing",
        "Push notifications for updates",
      ],
      considerations: [
        "Performance: Real-time matching and updates",
        "Scalability: Handle thousands of concurrent rides",
        "Efficiency: Optimal driver-rider matching",
        "Safety: Driver and rider verification",
        "Cost: Optimize for location services and compute",
      ],
      estimatedTime: "4-5 hours",
      completed: false,
      topics: [
        "Real-time Systems",
        "Location Services",
        "Matching Algorithms",
        "Graph Theory",
        "Safety Systems",
      ],
    },
    {
      id: "airbnb-booking",
      title: "Airbnb Booking System",
      description:
        "Design a booking platform that handles property listings, reservations, and payments",
      difficulty: "advanced",
      category: "Booking Systems",
      requirements: [
        "Property listing and search",
        "Availability calendar management",
        "Booking and reservation system",
        "Payment processing and security",
        "Review and rating system",
        "Host-guest communication",
      ],
      architecture: [
        "Elasticsearch for property search",
        "PostgreSQL for bookings and users",
        "Redis for availability caching",
        "Stripe for payment processing",
        "WebSocket for real-time messaging",
        "CDN for property images",
      ],
      considerations: [
        "Performance: Fast search and booking process",
        "Scalability: Handle millions of properties",
        "Reliability: Accurate availability and bookings",
        "Security: Secure payment processing",
        "Trust: Review and verification systems",
      ],
      estimatedTime: "4-5 hours",
      completed: false,
      topics: [
        "Booking Systems",
        "Payment Processing",
        "Search & Filtering",
        "Real-time Communication",
        "Trust & Safety",
      ],
    },
    {
      id: "spotify-music-streaming",
      title: "Spotify Music Streaming",
      description:
        "Design a music streaming platform with personalized playlists and recommendations",
      difficulty: "advanced",
      category: "Media Streaming",
      requirements: [
        "Music streaming and playback",
        "Playlist creation and management",
        "Music recommendation system",
        "Social features and sharing",
        "Offline listening capability",
        "Audio quality optimization",
      ],
      architecture: [
        "CDN for music delivery",
        "Redis for playlist caching",
        "PostgreSQL for user data",
        "Machine learning for recommendations",
        "WebSocket for real-time features",
        "Service workers for offline support",
      ],
      considerations: [
        "Performance: Smooth streaming with minimal buffering",
        "Scalability: Support millions of concurrent streams",
        "Quality: High audio quality with bandwidth optimization",
        "Personalization: Accurate music recommendations",
        "Cost: Optimize for bandwidth and licensing",
      ],
      estimatedTime: "4-5 hours",
      completed: false,
      topics: [
        "Media Streaming",
        "Recommendation Systems",
        "Offline Support",
        "Audio Processing",
        "Social Features",
      ],
    },
    {
      id: "linkedin-network",
      title: "LinkedIn Professional Network",
      description:
        "Design a professional networking platform with job matching and content sharing",
      difficulty: "advanced",
      category: "Professional Networks",
      requirements: [
        "Professional profile management",
        "Network connections and recommendations",
        "Job posting and matching",
        "Content sharing and engagement",
        "Professional messaging system",
        "Analytics and insights",
      ],
      architecture: [
        "Graph database for network connections",
        "Elasticsearch for job and profile search",
        "Redis for feed caching",
        "PostgreSQL for user data",
        "Machine learning for job matching",
        "WebSocket for real-time messaging",
      ],
      considerations: [
        "Performance: Fast network and job search",
        "Scalability: Support millions of professionals",
        "Relevance: Accurate job and connection recommendations",
        "Privacy: Professional data protection",
        "Engagement: Content and networking features",
      ],
      estimatedTime: "4-5 hours",
      completed: false,
      topics: [
        "Graph Databases",
        "Job Matching",
        "Professional Networks",
        "Content Management",
        "Privacy & Security",
      ],
    },
    {
      id: "twitter-timeline",
      title: "Twitter Timeline System",
      description:
        "Design a real-time timeline system that serves tweets to millions of users",
      difficulty: "advanced",
      category: "Social Media",
      requirements: [
        "Real-time tweet publishing",
        "Timeline generation and ranking",
        "Follow/unfollow system",
        "Trending topics detection",
        "Content moderation and safety",
        "Analytics and engagement tracking",
      ],
      architecture: [
        "Apache Kafka for tweet streaming",
        "Redis for timeline caching",
        "PostgreSQL for user and tweet data",
        "Elasticsearch for search functionality",
        "Machine learning for content ranking",
        "CDN for media delivery",
      ],
      considerations: [
        "Performance: Real-time timeline updates",
        "Scalability: Handle millions of tweets per day",
        "Relevance: Personalized timeline ranking",
        "Safety: Content moderation and spam detection",
        "Cost: Optimize for real-time processing",
      ],
      estimatedTime: "4-5 hours",
      completed: false,
      topics: [
        "Real-time Systems",
        "Timeline Generation",
        "Content Moderation",
        "Trending Detection",
        "Social Networks",
      ],
    },
    {
      id: "instagram-media",
      title: "Instagram Media Platform",
      description:
        "Design a photo and video sharing platform with stories, reels, and discovery features",
      difficulty: "advanced",
      category: "Media Sharing",
      requirements: [
        "Photo and video upload and processing",
        "Stories and reels functionality",
        "Feed generation and discovery",
        "Direct messaging system",
        "Content moderation and safety",
        "Analytics and engagement tracking",
      ],
      architecture: [
        "CDN for media delivery",
        "Redis for feed caching",
        "PostgreSQL for user and content data",
        "Machine learning for content discovery",
        "WebSocket for real-time features",
        "Media processing pipeline",
      ],
      considerations: [
        "Performance: Fast media loading and processing",
        "Scalability: Handle millions of media uploads",
        "Quality: High-quality media with compression",
        "Discovery: Relevant content recommendations",
        "Safety: Content moderation and privacy",
      ],
      estimatedTime: "4-5 hours",
      completed: false,
      topics: [
        "Media Processing",
        "Content Discovery",
        "Real-time Features",
        "Media Compression",
        "Social Discovery",
      ],
    },
  ];

  const toggleChallenge = (challengeId: string) => {
    const newCompleted = new Set(completedChallenges);
    if (newCompleted.has(challengeId)) {
      newCompleted.delete(challengeId);
    } else {
      newCompleted.add(challengeId);
    }
    setCompletedChallenges(newCompleted);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
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
      case "Real-time Systems":
        return <Zap className="w-4 h-4" />;
      case "Collaboration":
        return <Users className="w-4 h-4" />;
      case "Form Systems":
        return <BookOpen className="w-4 h-4" />;
      case "Data Display":
        return <Eye className="w-4 h-4" />;
      case "File Management":
        return <BookOpen className="w-4 h-4" />;
      case "Architecture":
        return <Target className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const selectedChallengeData = challenges.find(
    (c) => c.id === selectedChallenge
  );
  const totalCompleted = completedChallenges.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              System Design
            </h1>
            <p className="text-gray-600 mt-1">
              Architecture for Large Frontend Applications
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Target className="w-5 h-5 text-purple-600" aria-hidden />
            <span className="font-semibold text-gray-900">
              {totalCompleted}/{challenges.length}
            </span>
            <span className="text-gray-500">completed</span>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Challenges List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Design Challenges
              </h2>
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedChallenge === challenge.id
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedChallenge(challenge.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {challenge.title}
                      </h3>
                      {completedChallenges.has(challenge.id) ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                          challenge.difficulty
                        )}`}
                      >
                        {challenge.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">
                        • {challenge.estimatedTime}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {challenge.description}
                    </p>
                    <div className="flex items-center space-x-1">
                      {getCategoryIcon(challenge.category)}
                      <span className="text-xs text-gray-500">
                        {challenge.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Challenge Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              {selectedChallengeData && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedChallengeData.title}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {selectedChallengeData.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Difficulty</div>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                            selectedChallengeData.difficulty
                          )}`}
                        >
                          {selectedChallengeData.difficulty}
                        </span>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Time</div>
                        <div className="font-semibold text-gray-900">
                          {selectedChallengeData.estimatedTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Requirements */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Requirements
                      </h3>
                      <ul className="space-y-2">
                        {selectedChallengeData.requirements.map(
                          (req, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-600">
                                {req}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Architecture */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Architecture Components
                      </h3>
                      <ul className="space-y-2">
                        {selectedChallengeData.architecture.map(
                          (arch, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-600">
                                {arch}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Considerations */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Key Considerations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedChallengeData.considerations.map(
                        (consideration, index) => (
                          <div
                            key={index}
                            className="p-3 bg-gray-50 rounded-lg"
                          >
                            <span className="text-sm text-gray-700">
                              {consideration}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">
                      Key Topics to Master
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedChallengeData.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white border border-purple-200 rounded-full text-sm text-purple-700"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-4">
                    <button
                      className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                        completedChallenges.has(selectedChallengeData.id)
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                      onClick={() => toggleChallenge(selectedChallengeData.id)}
                    >
                      {completedChallenges.has(selectedChallengeData.id)
                        ? "Completed ✓"
                        : "Mark as Complete"}
                    </button>
                    <button className="flex-1 py-3 px-6 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                      Start Design
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">
                      {challenge.title}
                    </h3>
                    {completedChallenges.has(challenge.id) ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                        challenge.difficulty
                      )}`}
                    >
                      {challenge.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">
                      {challenge.estimatedTime}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {challenge.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
