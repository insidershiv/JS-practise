export type PracticeDifficulty = "easy" | "medium" | "hard";

export type PracticeCategory =
  | "javascript-functions"
  | "ui-coding"
  | "algorithmic-coding";

export type PracticeFormat = "coding" | "system-design" | "quiz";

export interface PracticeTestCase {
  name: string;
  /** Runs after user code; may be sync or return a Promise */
  code: string;
}

export interface PracticeQuestion {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  difficulty: PracticeDifficulty;
  category: PracticeCategory;
  format: PracticeFormat;
  languages: ("javascript" | "typescript")[];
  estimatedMinutes: number;
  doneCountLabel: string;
  topics: string[];
  warmUp: boolean;
  starterCode: string;
  solutionCode: string;
  tests: PracticeTestCase[];
}

export interface PracticeTopic {
  id: string;
  label: string;
}

export interface PracticeDataFile {
  meta: {
    version: number;
    description: string;
  };
  topics: PracticeTopic[];
  questions: PracticeQuestion[];
}
