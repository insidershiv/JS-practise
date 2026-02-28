"use client";

import { CheckCircle, Circle, Clock, Target } from "lucide-react";
import { useState } from "react";

interface Problem {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  completed: boolean;
  timeSpent?: number;
  notes?: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  targetCount: number;
  completedCount: number;
  problems: Problem[];
}

export default function CodingPractice() {
  const [selectedCategory, setSelectedCategory] = useState<string>("arrays");
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(
    new Set()
  );

  const categories: Category[] = [
    {
      id: "arrays",
      name: "Arrays & Strings",
      description:
        "Fundamental array operations, string manipulation, and basic algorithms",
      targetCount: 30,
      completedCount: 0,
      problems: [
        {
          id: "two-sum",
          title: "Two Sum",
          difficulty: "easy",
          category: "arrays",
          completed: false,
        },
        {
          id: "valid-parentheses",
          title: "Valid Parentheses",
          difficulty: "easy",
          category: "arrays",
          completed: false,
        },
        {
          id: "merge-sorted-array",
          title: "Merge Sorted Array",
          difficulty: "easy",
          category: "arrays",
          completed: false,
        },
        {
          id: "remove-duplicates",
          title: "Remove Duplicates from Sorted Array",
          difficulty: "easy",
          category: "arrays",
          completed: false,
        },
        {
          id: "plus-one",
          title: "Plus One",
          difficulty: "easy",
          category: "arrays",
          completed: false,
        },
        {
          id: "move-zeroes",
          title: "Move Zeroes",
          difficulty: "easy",
          category: "arrays",
          completed: false,
        },
        {
          id: "rotate-array",
          title: "Rotate Array",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "container-with-most-water",
          title: "Container With Most Water",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "3sum",
          title: "3Sum",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "longest-substring-without-repeating",
          title: "Longest Substring Without Repeating Characters",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "product-of-array-except-self",
          title: "Product of Array Except Self",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "maximum-subarray",
          title: "Maximum Subarray",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "search-in-rotated-sorted-array",
          title: "Search in Rotated Sorted Array",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "find-first-and-last-position",
          title: "Find First and Last Position of Element in Sorted Array",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "combination-sum",
          title: "Combination Sum",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "jump-game",
          title: "Jump Game",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "merge-intervals",
          title: "Merge Intervals",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "insert-interval",
          title: "Insert Interval",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "spiral-matrix",
          title: "Spiral Matrix",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "rotate-image",
          title: "Rotate Image",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "set-matrix-zeroes",
          title: "Set Matrix Zeroes",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "word-search",
          title: "Word Search",
          difficulty: "medium",
          category: "arrays",
          completed: false,
        },
        {
          id: "longest-consecutive-sequence",
          title: "Longest Consecutive Sequence",
          difficulty: "hard",
          category: "arrays",
          completed: false,
        },
        {
          id: "trapping-rain-water",
          title: "Trapping Rain Water",
          difficulty: "hard",
          category: "arrays",
          completed: false,
        },
        {
          id: "median-of-two-sorted-arrays",
          title: "Median of Two Sorted Arrays",
          difficulty: "hard",
          category: "arrays",
          completed: false,
        },
      ],
    },
    {
      id: "hash-maps",
      name: "Hash Maps & Sets",
      description:
        "Efficient lookups, frequency counting, and duplicate detection",
      targetCount: 20,
      completedCount: 0,
      problems: [
        {
          id: "valid-anagram",
          title: "Valid Anagram",
          difficulty: "easy",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "contains-duplicate",
          title: "Contains Duplicate",
          difficulty: "easy",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "single-number",
          title: "Single Number",
          difficulty: "easy",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "intersection-of-two-arrays",
          title: "Intersection of Two Arrays",
          difficulty: "easy",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "happy-number",
          title: "Happy Number",
          difficulty: "easy",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "group-anagrams",
          title: "Group Anagrams",
          difficulty: "medium",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "longest-consecutive-sequence",
          title: "Longest Consecutive Sequence",
          difficulty: "medium",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "subarray-sum-equals-k",
          title: "Subarray Sum Equals K",
          difficulty: "medium",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "top-k-frequent-elements",
          title: "Top K Frequent Elements",
          difficulty: "medium",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "find-all-anagrams-in-string",
          title: "Find All Anagrams in a String",
          difficulty: "medium",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "minimum-window-substring",
          title: "Minimum Window Substring",
          difficulty: "hard",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "substring-with-concatenation",
          title: "Substring with Concatenation of All Words",
          difficulty: "hard",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "repeated-dna-sequences",
          title: "Repeated DNA Sequences",
          difficulty: "medium",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "longest-substring-with-at-most-k",
          title: "Longest Substring with At Most K Distinct Characters",
          difficulty: "medium",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "longest-substring-with-at-most-two",
          title: "Longest Substring with At Most Two Distinct Characters",
          difficulty: "medium",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "palindrome-pairs",
          title: "Palindrome Pairs",
          difficulty: "hard",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "word-pattern",
          title: "Word Pattern",
          difficulty: "easy",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "isomorphic-strings",
          title: "Isomorphic Strings",
          difficulty: "easy",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "fraction-to-recurring-decimal",
          title: "Fraction to Recurring Decimal",
          difficulty: "medium",
          category: "hash-maps",
          completed: false,
        },
        {
          id: "logger-rate-limiter",
          title: "Logger Rate Limiter",
          difficulty: "easy",
          category: "hash-maps",
          completed: false,
        },
      ],
    },
    {
      id: "sliding-window",
      name: "Sliding Window",
      description: "Fixed and variable size windows, substring problems",
      targetCount: 15,
      completedCount: 0,
      problems: [
        {
          id: "best-time-to-buy-sell",
          title: "Best Time to Buy and Sell Stock",
          difficulty: "easy",
          category: "sliding-window",
          completed: false,
        },
        {
          id: "maximum-average-subarray",
          title: "Maximum Average Subarray I",
          difficulty: "easy",
          category: "sliding-window",
          completed: false,
        },
        {
          id: "longest-repeating-character",
          title: "Longest Repeating Character Replacement",
          difficulty: "medium",
          category: "sliding-window",
          completed: false,
        },
        {
          id: "minimum-window-substring",
          title: "Minimum Window Substring",
          difficulty: "hard",
          category: "sliding-window",
          completed: false,
        },
        {
          id: "permutation-in-string",
          title: "Permutation in String",
          difficulty: "medium",
          category: "sliding-window",
          completed: false,
        },
        {
          id: "longest-substring-without-repeating",
          title: "Longest Substring Without Repeating Characters",
          difficulty: "medium",
          category: "sliding-window",
          completed: false,
        },
        {
          id: "longest-substring-with-at-most-k",
          title: "Longest Substring with At Most K Distinct Characters",
          difficulty: "medium",
          category: "sliding-window",
          completed: false,
        },
        {
          id: "longest-substring-with-at-most-two",
          title: "Longest Substring with At Most Two Distinct Characters",
          difficulty: "medium",
          category: "sliding-window",
          completed: false,
        },
        {
          id: "find-all-anagrams-in-string",
          title: "Find All Anagrams in a String",
          difficulty: "medium",
          category: "sliding-window",
          completed: false,
        },
        {
          id: "substring-with-concatenation",
          title: "Substring with Concatenation of All Words",
          difficulty: "hard",
          category: "sliding-window",
          completed: false,
        },
        {
          id: "minimum-size-subarray-sum",
          title: "Minimum Size Subarray Sum",
          difficulty: "medium",
          category: "sliding-window",
          completed: false,
        },
        {
          id: "maximum-points-you-can-obtain",
          title: "Maximum Points You Can Obtain from Cards",
          difficulty: "medium",
          category: "sliding-window",
          completed: false,
        },
        {
          id: "grumpy-bookstore-owner",
          title: "Grumpy Bookstore Owner",
          difficulty: "medium",
          category: "sliding-window",
          completed: false,
        },
        {
          id: "longest-turbulent-subarray",
          title: "Longest Turbulent Subarray",
          difficulty: "medium",
          category: "sliding-window",
          completed: false,
        },
        {
          id: "get-equal-substrings-within-budget",
          title: "Get Equal Substrings Within Budget",
          difficulty: "medium",
          category: "sliding-window",
          completed: false,
        },
      ],
    },
    {
      id: "two-pointers",
      name: "Two Pointers",
      description:
        "Array traversal, linked list problems, and palindrome detection",
      targetCount: 16,
      completedCount: 0,
      problems: [
        {
          id: "valid-palindrome",
          title: "Valid Palindrome",
          difficulty: "easy",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "remove-duplicates-sorted",
          title: "Remove Duplicates from Sorted Array",
          difficulty: "easy",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "remove-element",
          title: "Remove Element",
          difficulty: "easy",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "move-zeroes",
          title: "Move Zeroes",
          difficulty: "easy",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "reverse-string",
          title: "Reverse String",
          difficulty: "easy",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "reverse-vowels-of-string",
          title: "Reverse Vowels of a String",
          difficulty: "easy",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "sort-colors",
          title: "Sort Colors",
          difficulty: "medium",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "container-with-most-water",
          title: "Container With Most Water",
          difficulty: "medium",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "3sum",
          title: "3Sum",
          difficulty: "medium",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "3sum-closest",
          title: "3Sum Closest",
          difficulty: "medium",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "4sum",
          title: "4Sum",
          difficulty: "medium",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "trapping-rain-water",
          title: "Trapping Rain Water",
          difficulty: "hard",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "valid-triangle-number",
          title: "Valid Triangle Number",
          difficulty: "medium",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "two-sum-ii",
          title: "Two Sum II - Input Array Is Sorted",
          difficulty: "medium",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "backspace-string-compare",
          title: "Backspace String Compare",
          difficulty: "easy",
          category: "two-pointers",
          completed: false,
        },
        {
          id: "squares-of-sorted-array",
          title: "Squares of a Sorted Array",
          difficulty: "easy",
          category: "two-pointers",
          completed: false,
        },
      ],
    },
    {
      id: "stack-queue",
      name: "Stack & Queue",
      description:
        "LIFO/FIFO operations, monotonic stacks, and queue implementations",
      targetCount: 20,
      completedCount: 0,
      problems: [
        {
          id: "valid-parentheses",
          title: "Valid Parentheses",
          difficulty: "easy",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "implement-stack",
          title: "Implement Stack using Queues",
          difficulty: "medium",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "implement-queue",
          title: "Implement Queue using Stacks",
          difficulty: "easy",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "min-stack",
          title: "Min Stack",
          difficulty: "medium",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "daily-temperatures",
          title: "Daily Temperatures",
          difficulty: "medium",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "largest-rectangle-histogram",
          title: "Largest Rectangle in Histogram",
          difficulty: "hard",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "evaluate-reverse-polish",
          title: "Evaluate Reverse Polish Notation",
          difficulty: "medium",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "decode-string",
          title: "Decode String",
          difficulty: "medium",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "flatten-nested-list",
          title: "Flatten Nested List Iterator",
          difficulty: "medium",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "number-of-islands",
          title: "Number of Islands",
          difficulty: "medium",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "surrounded-regions",
          title: "Surrounded Regions",
          difficulty: "medium",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "walls-and-gates",
          title: "Walls and Gates",
          difficulty: "medium",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "course-schedule",
          title: "Course Schedule",
          difficulty: "medium",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "course-schedule-ii",
          title: "Course Schedule II",
          difficulty: "medium",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "redundant-connection",
          title: "Redundant Connection",
          difficulty: "medium",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "number-of-provinces",
          title: "Number of Provinces",
          difficulty: "medium",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "graph-valid-tree",
          title: "Graph Valid Tree",
          difficulty: "medium",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "word-ladder",
          title: "Word Ladder",
          difficulty: "hard",
          category: "stack-queue",
          completed: false,
        },
        {
          id: "word-ladder-ii",
          title: "Word Ladder II",
          difficulty: "hard",
          category: "stack-queue",
          completed: false,
        },
      ],
    },
    {
      id: "trees-graphs",
      name: "Trees & Graphs (Light)",
      description: "Binary trees, BFS/DFS, and basic graph traversal",
      targetCount: 30,
      completedCount: 0,
      problems: [
        {
          id: "max-depth-binary-tree",
          title: "Maximum Depth of Binary Tree",
          difficulty: "easy",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "invert-binary-tree",
          title: "Invert Binary Tree",
          difficulty: "easy",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "same-tree",
          title: "Same Tree",
          difficulty: "easy",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "symmetric-tree",
          title: "Symmetric Tree",
          difficulty: "easy",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "path-sum",
          title: "Path Sum",
          difficulty: "easy",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "binary-tree-level-order",
          title: "Binary Tree Level Order Traversal",
          difficulty: "medium",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "binary-tree-zigzag",
          title: "Binary Tree Zigzag Level Order Traversal",
          difficulty: "medium",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "construct-binary-tree",
          title: "Construct Binary Tree from Preorder and Inorder Traversal",
          difficulty: "medium",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "construct-binary-tree-post",
          title: "Construct Binary Tree from Inorder and Postorder Traversal",
          difficulty: "medium",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "populating-next-right",
          title: "Populating Next Right Pointers in Each Node",
          difficulty: "medium",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "flatten-binary-tree",
          title: "Flatten Binary Tree to Linked List",
          difficulty: "medium",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "binary-tree-maximum-path",
          title: "Binary Tree Maximum Path Sum",
          difficulty: "hard",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "serialize-deserialize",
          title: "Serialize and Deserialize Binary Tree",
          difficulty: "hard",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "number-of-islands",
          title: "Number of Islands",
          difficulty: "medium",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "clone-graph",
          title: "Clone Graph",
          difficulty: "medium",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "course-schedule",
          title: "Course Schedule",
          difficulty: "medium",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "course-schedule-ii",
          title: "Course Schedule II",
          difficulty: "medium",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "redundant-connection",
          title: "Redundant Connection",
          difficulty: "medium",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "number-of-provinces",
          title: "Number of Provinces",
          difficulty: "medium",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "graph-valid-tree",
          title: "Graph Valid Tree",
          difficulty: "medium",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "word-ladder",
          title: "Word Ladder",
          difficulty: "hard",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "word-ladder-ii",
          title: "Word Ladder II",
          difficulty: "hard",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "redundant-connection-ii",
          title: "Redundant Connection II",
          difficulty: "hard",
          category: "trees-graphs",
          completed: false,
        },
        {
          id: "graph-connectivity",
          title: "Graph Connectivity With Threshold",
          difficulty: "hard",
          category: "trees-graphs",
          completed: false,
        },
      ],
    },
    {
      id: "binary-search",
      name: "Binary Search",
      description:
        "Efficient search algorithms for sorted data and optimization problems",
      targetCount: 12,
      completedCount: 0,
      problems: [
        {
          id: "binary-search",
          title: "Binary Search",
          difficulty: "easy",
          category: "binary-search",
          completed: false,
        },
        {
          id: "search-insert-position",
          title: "Search Insert Position",
          difficulty: "easy",
          category: "binary-search",
          completed: false,
        },
        {
          id: "first-bad-version",
          title: "First Bad Version",
          difficulty: "easy",
          category: "binary-search",
          completed: false,
        },
        {
          id: "sqrt-x",
          title: "Sqrt(x)",
          difficulty: "easy",
          category: "binary-search",
          completed: false,
        },
        {
          id: "search-in-rotated-sorted-array",
          title: "Search in Rotated Sorted Array",
          difficulty: "medium",
          category: "binary-search",
          completed: false,
        },
        {
          id: "find-first-and-last-position",
          title: "Find First and Last Position of Element in Sorted Array",
          difficulty: "medium",
          category: "binary-search",
          completed: false,
        },
        {
          id: "search-2d-matrix",
          title: "Search a 2D Matrix",
          difficulty: "medium",
          category: "binary-search",
          completed: false,
        },
        {
          id: "kth-smallest-element",
          title: "Kth Smallest Element in a Sorted Matrix",
          difficulty: "medium",
          category: "binary-search",
          completed: false,
        },
        {
          id: "find-peak-element",
          title: "Find Peak Element",
          difficulty: "medium",
          category: "binary-search",
          completed: false,
        },
        {
          id: "minimum-in-rotated-sorted",
          title: "Find Minimum in Rotated Sorted Array",
          difficulty: "medium",
          category: "binary-search",
          completed: false,
        },
        {
          id: "median-of-two-sorted-arrays",
          title: "Median of Two Sorted Arrays",
          difficulty: "hard",
          category: "binary-search",
          completed: false,
        },
        {
          id: "split-array-largest-sum",
          title: "Split Array Largest Sum",
          difficulty: "hard",
          category: "binary-search",
          completed: false,
        },
      ],
    },
    {
      id: "product-specific",
      name: "Product-Specific Problems",
      description:
        "Real-world problems commonly asked at Google, Meta, Amazon, Apple, Microsoft, etc.",
      targetCount: 20,
      completedCount: 0,
      problems: [
        {
          id: "design-hit-counter",
          title: "Design Hit Counter",
          difficulty: "medium",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-tic-tac-toe",
          title: "Design Tic-Tac-Toe",
          difficulty: "medium",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-snake-game",
          title: "Design Snake Game",
          difficulty: "medium",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-phone-directory",
          title: "Design Phone Directory",
          difficulty: "medium",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-excel-sheet",
          title: "Design Excel Sheet",
          difficulty: "hard",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-text-editor",
          title: "Design Text Editor",
          difficulty: "hard",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-browser-history",
          title: "Design Browser History",
          difficulty: "medium",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-undo-redo",
          title: "Design Undo Redo",
          difficulty: "medium",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-file-system",
          title: "Design File System",
          difficulty: "hard",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-cache",
          title: "Design Cache",
          difficulty: "medium",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-autocomplete",
          title: "Design Autocomplete System",
          difficulty: "hard",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-search-suggestions",
          title: "Design Search Suggestions System",
          difficulty: "hard",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-news-feed",
          title: "Design News Feed System",
          difficulty: "hard",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-chat-system",
          title: "Design Chat System",
          difficulty: "hard",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-url-shortener",
          title: "Design URL Shortener",
          difficulty: "medium",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-tiny-url",
          title: "Design TinyURL",
          difficulty: "medium",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-rate-limiter",
          title: "Design Rate Limiter",
          difficulty: "medium",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-distributed-cache",
          title: "Design Distributed Cache",
          difficulty: "hard",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-load-balancer",
          title: "Design Load Balancer",
          difficulty: "hard",
          category: "product-specific",
          completed: false,
        },
        {
          id: "design-consistent-hashing",
          title: "Design Consistent Hashing",
          difficulty: "hard",
          category: "product-specific",
          completed: false,
        },
      ],
    },
    {
      id: "google-specific",
      name: "Google-Style Problems",
      description:
        "Problems commonly asked at Google interviews - focus on algorithms and optimization",
      targetCount: 15,
      completedCount: 0,
      problems: [
        {
          id: "google-egg-drop",
          title: "Egg Drop Problem",
          difficulty: "hard",
          category: "google-specific",
          completed: false,
        },
        {
          id: "google-paint-house",
          title: "Paint House",
          difficulty: "medium",
          category: "google-specific",
          completed: false,
        },
        {
          id: "google-word-ladder",
          title: "Word Ladder",
          difficulty: "hard",
          category: "google-specific",
          completed: false,
        },
        {
          id: "google-number-of-islands",
          title: "Number of Islands",
          difficulty: "medium",
          category: "google-specific",
          completed: false,
        },
        {
          id: "google-clone-graph",
          title: "Clone Graph",
          difficulty: "medium",
          category: "google-specific",
          completed: false,
        },
        {
          id: "google-pacific-atlantic",
          title: "Pacific Atlantic Water Flow",
          difficulty: "medium",
          category: "google-specific",
          completed: false,
        },
        {
          id: "google-sentence-screen-fitting",
          title: "Sentence Screen Fitting",
          difficulty: "medium",
          category: "google-specific",
          completed: false,
        },
        {
          id: "google-range-sum-query",
          title: "Range Sum Query 2D - Immutable",
          difficulty: "medium",
          category: "google-specific",
          completed: false,
        },
        {
          id: "google-bomb-enemy",
          title: "Bomb Enemy",
          difficulty: "medium",
          category: "google-specific",
          completed: false,
        },
        {
          id: "google-design-tic-tac-toe",
          title: "Design Tic-Tac-Toe",
          difficulty: "medium",
          category: "google-specific",
          completed: false,
        },
        {
          id: "google-design-hit-counter",
          title: "Design Hit Counter",
          difficulty: "medium",
          category: "google-specific",
          completed: false,
        },
        {
          id: "google-design-phone-directory",
          title: "Design Phone Directory",
          difficulty: "medium",
          category: "google-specific",
          completed: false,
        },
        {
          id: "google-design-excel",
          title: "Design Excel Sum Formula",
          difficulty: "hard",
          category: "google-specific",
          completed: false,
        },
        {
          id: "google-design-text-editor",
          title: "Design Text Editor",
          difficulty: "hard",
          category: "google-specific",
          completed: false,
        },
        {
          id: "google-design-file-system",
          title: "Design In-Memory File System",
          difficulty: "hard",
          category: "google-specific",
          completed: false,
        },
      ],
    },
    {
      id: "meta-specific",
      name: "Meta/Facebook-Style Problems",
      description:
        "Problems commonly asked at Meta interviews - focus on graphs, trees, and social features",
      targetCount: 15,
      completedCount: 0,
      problems: [
        {
          id: "meta-remove-invalid-parentheses",
          title: "Remove Invalid Parentheses",
          difficulty: "hard",
          category: "meta-specific",
          completed: false,
        },
        {
          id: "meta-word-search",
          title: "Word Search",
          difficulty: "medium",
          category: "meta-specific",
          completed: false,
        },
        {
          id: "meta-word-search-ii",
          title: "Word Search II",
          difficulty: "hard",
          category: "meta-specific",
          completed: false,
        },
        {
          id: "meta-number-of-islands",
          title: "Number of Islands",
          difficulty: "medium",
          category: "meta-specific",
          completed: false,
        },
        {
          id: "meta-surrounded-regions",
          title: "Surrounded Regions",
          difficulty: "medium",
          category: "meta-specific",
          completed: false,
        },
        {
          id: "meta-walls-and-gates",
          title: "Walls and Gates",
          difficulty: "medium",
          category: "meta-specific",
          completed: false,
        },
        {
          id: "meta-course-schedule",
          title: "Course Schedule",
          difficulty: "medium",
          category: "meta-specific",
          completed: false,
        },
        {
          id: "meta-course-schedule-ii",
          title: "Course Schedule II",
          difficulty: "medium",
          category: "meta-specific",
          completed: false,
        },
        {
          id: "meta-redundant-connection",
          title: "Redundant Connection",
          difficulty: "medium",
          category: "meta-specific",
          completed: false,
        },
        {
          id: "meta-number-of-provinces",
          title: "Number of Provinces",
          difficulty: "medium",
          category: "meta-specific",
          completed: false,
        },
        {
          id: "meta-graph-valid-tree",
          title: "Graph Valid Tree",
          difficulty: "medium",
          category: "meta-specific",
          completed: false,
        },
        {
          id: "meta-word-ladder",
          title: "Word Ladder",
          difficulty: "hard",
          category: "meta-specific",
          completed: false,
        },
        {
          id: "meta-word-ladder-ii",
          title: "Word Ladder II",
          difficulty: "hard",
          category: "meta-specific",
          completed: false,
        },
        {
          id: "meta-redundant-connection-ii",
          title: "Redundant Connection II",
          difficulty: "hard",
          category: "meta-specific",
          completed: false,
        },
        {
          id: "meta-graph-connectivity",
          title: "Graph Connectivity With Threshold",
          difficulty: "hard",
          category: "meta-specific",
          completed: false,
        },
      ],
    },
    {
      id: "amazon-specific",
      name: "Amazon-Style Problems",
      description:
        "Problems commonly asked at Amazon interviews - focus on arrays, strings, and system design",
      targetCount: 15,
      completedCount: 0,
      problems: [
        {
          id: "amazon-two-sum",
          title: "Two Sum",
          difficulty: "easy",
          category: "amazon-specific",
          completed: false,
        },
        {
          id: "amazon-longest-substring",
          title: "Longest Substring Without Repeating Characters",
          difficulty: "medium",
          category: "amazon-specific",
          completed: false,
        },
        {
          id: "amazon-container-with-most-water",
          title: "Container With Most Water",
          difficulty: "medium",
          category: "amazon-specific",
          completed: false,
        },
        {
          id: "amazon-3sum",
          title: "3Sum",
          difficulty: "medium",
          category: "amazon-specific",
          completed: false,
        },
        {
          id: "amazon-valid-parentheses",
          title: "Valid Parentheses",
          difficulty: "easy",
          category: "amazon-specific",
          completed: false,
        },
        {
          id: "amazon-merge-intervals",
          title: "Merge Intervals",
          difficulty: "medium",
          category: "amazon-specific",
          completed: false,
        },
        {
          id: "amazon-insert-interval",
          title: "Insert Interval",
          difficulty: "medium",
          category: "amazon-specific",
          completed: false,
        },
        {
          id: "amazon-group-anagrams",
          title: "Group Anagrams",
          difficulty: "medium",
          category: "amazon-specific",
          completed: false,
        },
        {
          id: "amazon-top-k-frequent",
          title: "Top K Frequent Elements",
          difficulty: "medium",
          category: "amazon-specific",
          completed: false,
        },
        {
          id: "amazon-product-of-array",
          title: "Product of Array Except Self",
          difficulty: "medium",
          category: "amazon-specific",
          completed: false,
        },
        {
          id: "amazon-maximum-subarray",
          title: "Maximum Subarray",
          difficulty: "medium",
          category: "amazon-specific",
          completed: false,
        },
        {
          id: "amazon-search-in-rotated",
          title: "Search in Rotated Sorted Array",
          difficulty: "medium",
          category: "amazon-specific",
          completed: false,
        },
        {
          id: "amazon-find-first-last",
          title: "Find First and Last Position of Element in Sorted Array",
          difficulty: "medium",
          category: "amazon-specific",
          completed: false,
        },
        {
          id: "amazon-combination-sum",
          title: "Combination Sum",
          difficulty: "medium",
          category: "amazon-specific",
          completed: false,
        },
        {
          id: "amazon-jump-game",
          title: "Jump Game",
          difficulty: "medium",
          category: "amazon-specific",
          completed: false,
        },
      ],
    },
  ];

  const toggleProblem = (problemId: string) => {
    const newCompleted = new Set(completedProblems);
    if (newCompleted.has(problemId)) {
      newCompleted.delete(problemId);
    } else {
      newCompleted.add(problemId);
    }
    setCompletedProblems(newCompleted);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const selectedCategoryData = categories.find(
    (c) => c.id === selectedCategory
  );
  const totalCompleted = completedProblems.size;
  const totalTarget = categories.reduce((sum, cat) => sum + cat.targetCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Coding Practice
            </h1>
            <p className="text-gray-600 mt-1">
              Master DSA for Senior Frontend Interviews
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Target className="w-5 h-5 text-blue-600" aria-hidden />
            <span className="font-semibold text-gray-900">
              {totalCompleted}/{totalTarget}
            </span>
            <span className="text-gray-500">completed</span>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Problem Categories
              </h2>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCategory === category.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {category.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {category.completedCount}/{category.targetCount}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {category.description}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${
                            (category.completedCount / category.targetCount) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Problems List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              {selectedCategoryData && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedCategoryData.name}
                      </h2>
                      <p className="text-gray-600">
                        {selectedCategoryData.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedCategoryData.completedCount}
                        </div>
                        <div className="text-sm text-gray-500">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {selectedCategoryData.targetCount}
                        </div>
                        <div className="text-sm text-gray-500">Target</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedCategoryData.problems.map((problem) => (
                      <div
                        key={problem.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          completedProblems.has(problem.id)
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => toggleProblem(problem.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {completedProblems.has(problem.id) ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                              <Circle className="w-6 h-6 text-gray-400" />
                            )}
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {problem.title}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <span
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                                    problem.difficulty
                                  )}`}
                                >
                                  {problem.difficulty}
                                </span>
                                <span className="text-sm text-gray-500">
                                  • {problem.category}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              Practice
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
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
              {categories.map((category) => (
                <div key={category.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">
                      {category.name}
                    </h3>
                    <span className="text-sm font-medium text-gray-500">
                      {category.completedCount}/{category.targetCount}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          (category.completedCount / category.targetCount) *
                            100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {category.description}
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
