/** Legacy difficulty from original curriculum */
export type SystemDesignDifficultyLegacy = "intermediate" | "advanced";

/** UI labels (interview style) */
export type SystemDesignDifficultyLabel = "medium" | "hard";

export interface SystemDesignChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: SystemDesignDifficultyLegacy;
  category: string;
  requirements: string[];
  architecture: string[];
  considerations: string[];
  estimatedTime: string;
  topics: string[];
  /** Interview-style stats (demo) */
  attemptedLabel: string;
  completionRateLabel: string;
  /** Frontend / product angle for the detail page */
  frontendAngle: string[];
  /** Extra long-form intro for detail page */
  deepDive?: string;
}
