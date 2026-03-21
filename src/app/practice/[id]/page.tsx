import { notFound } from "next/navigation";
import { getQuestionById } from "@/lib/practiceQuestions";
import { PracticeWorkspace } from "../components/PracticeWorkspace";

export default async function PracticeQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const question = getQuestionById(id);
  if (!question) {
    notFound();
  }
  return <PracticeWorkspace question={question} />;
}
