import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are an experienced frontend interviewer. The candidate is practicing for an interview. Your role:
- Ask the current question clearly and concisely when starting.
- Respond to their answers with brief feedback: acknowledge what's good, ask follow-up questions, or give a small hint if they're stuck.
- Don't give away the full solution—nudge them to think. If they've answered well, you can say they can check the solution or move on.
- Keep each message short (2–4 sentences unless explaining something). Be encouraging but professional.`;

function buildMessages(
  questionTitle: string,
  questionText: string,
  messages: { role: "user" | "assistant"; content: string }[]
): OpenAI.Chat.ChatCompletionMessageParam[] {
  const questionContext = `Current question: "${questionTitle}".\n\n${questionText}`;
  const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
  ];
  if (messages.length === 0) {
    openaiMessages.push({
      role: "user",
      content: `${questionContext}\n\nStart by asking the candidate this question in 1–2 short sentences. Don't repeat the full question text—just introduce it and ask them to answer.`,
    });
  } else {
    for (const m of messages) {
      openaiMessages.push({ role: m.role, content: m.content });
    }
  }
  return openaiMessages;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not set. Add it in .env.local to use Practice with AI." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      questionTitle,
      questionText,
      messages = [],
      stream: streamRequested = true,
    }: {
      questionTitle: string;
      questionText: string;
      messages: { role: "user" | "assistant"; content: string }[];
      stream?: boolean;
    } = body;

    if (!questionTitle || !questionText) {
      return NextResponse.json(
        { error: "questionTitle and questionText are required" },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey });
    const openaiMessages = buildMessages(questionTitle, questionText, messages);

    if (streamRequested) {
      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: openaiMessages,
        max_tokens: 512,
        temperature: 0.7,
        stream: true,
      });

      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const delta = chunk.choices[0]?.delta?.content ?? "";
              if (delta) controller.enqueue(encoder.encode(delta));
            }
          } catch (e) {
            controller.error(e);
          } finally {
            controller.close();
          }
        },
      });

      return new NextResponse(readable, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked",
        },
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: openaiMessages,
      max_tokens: 512,
      temperature: 0.7,
    });
    const content =
      completion.choices[0]?.message?.content?.trim() ||
      "I didn't get a response. Try again.";
    return NextResponse.json({ content });
  } catch (err) {
    console.error("[interview API]", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: message.startsWith("Incorrect API key") ? "Invalid OPENAI_API_KEY." : message },
      { status: 500 }
    );
  }
}
