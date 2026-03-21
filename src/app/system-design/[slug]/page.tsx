import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TopicDetailContent } from "../TopicDetailContent";
import {
  getAllChallengeSlugs,
  getChallengeBySlug,
} from "@/lib/systemDesignRegistry";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllChallengeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getChallengeBySlug(slug);
  if (!topic) return { title: "Not found" };
  return {
    title: topic.title,
    description: topic.description,
  };
}

export default async function SystemDesignTopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getChallengeBySlug(slug);
  if (!topic) notFound();

  return <TopicDetailContent topic={topic} />;
}
