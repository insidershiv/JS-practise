import practiceData from "@/data/practice-questions.json";
import type { PracticeDataFile, PracticeQuestion } from "@/types/practice";

const data = practiceData as PracticeDataFile;

export function getPracticeData(): PracticeDataFile {
  return data;
}

export function getAllQuestions(): PracticeQuestion[] {
  return data.questions;
}

export function getQuestionById(id: string): PracticeQuestion | undefined {
  return data.questions.find((q) => q.id === id);
}

export function getTopics() {
  return data.topics;
}
