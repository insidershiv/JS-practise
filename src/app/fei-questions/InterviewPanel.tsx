"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, MessageCircle, Loader2, Mic, MicOff, RotateCcw } from "lucide-react";
import type { FEIQuestion } from "@/data/fei-questions";

type ChatMessage = { role: "user" | "assistant"; content: string };

async function streamAssistantReply(
  questionTitle: string,
  questionText: string,
  messages: ChatMessage[],
  onChunk: (chunk: string) => void
): Promise<string> {
  const res = await fetch("/api/interview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      questionTitle,
      questionText,
      messages,
      stream: true,
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || res.statusText);
  }
  const reader = res.body?.getReader();
  if (!reader) throw new Error("No response body");
  const decoder = new TextDecoder();
  let full = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    full += chunk;
    onChunk(full);
  }
  return full.trim() || "I didn't get a response. Try again.";
}

export function InterviewPanel({
  question,
  isOpen,
  onClose,
}: {
  question: FEIQuestion | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const runInitialStream = useCallback(() => {
    if (!question) return;
    setLoading(true);
    setError(null);
    streamAssistantReply(question.title, question.question, [], setStreamingContent)
      .then((content) => {
        setMessages([{ role: "assistant", content }]);
        setStreamingContent("");
      })
      .catch((err) => setError(err.message || "Failed to start interview"))
      .finally(() => setLoading(false));
  }, [question]);

  useEffect(() => {
    if (!isOpen || !question) return;
    setMessages([]);
    setError(null);
    setInput("");
    setStreamingContent("");
    runInitialStream();
  }, [isOpen, question, runInitialStream]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, streamingContent]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || !question || loading) return;
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);
    setStreamingContent("");
    try {
      const content = await streamAssistantReply(
        question.title,
        question.question,
        newMessages,
        setStreamingContent
      );
      setMessages((prev) => [...prev, { role: "assistant", content }]);
      setStreamingContent("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [input, question, loading, messages]);

  const startVoiceInput = useCallback(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognitionAPI =
      (window as unknown as { SpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setError("Speech recognition is not supported in this browser. Try Chrome or Edge.");
      return;
    }
    const recognition = new SpeechRecognitionAPI() as SpeechRecognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        final += result[0].transcript;
        if (result.isFinal) break;
      }
      if (final) setInput((prev) => (prev + final).trim());
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
    setError(null);
  }, []);

  const stopVoiceInput = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setListening(false);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-slate-200 bg-white shadow-xl"
        aria-label="Practice with AI"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-indigo-600" />
            <h2 className="font-semibold text-slate-900">Practice with AI</h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Close and pick another question"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Next question</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        {question && (
          <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-2">
            <p className="text-sm font-medium text-slate-700 truncate" title={question.title}>
              {question.title}
            </p>
            <p className="text-xs text-slate-500">
              {question.section} · {question.difficulty}
            </p>
          </div>
        )}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading && messages.length === 0 && !streamingContent && (
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Starting interview…</span>
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}
          {streamingContent && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl bg-slate-100 px-4 py-2.5 text-sm text-slate-800">
                <p className="whitespace-pre-wrap">{streamingContent}</p>
                <span className="inline-block h-4 w-0.5 animate-pulse bg-slate-500 align-middle" />
              </div>
            </div>
          )}
          {loading && messages.length > 0 && !streamingContent && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-slate-100 px-4 py-2.5">
                <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
              </div>
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
              {error}
            </div>
          )}
        </div>
        <div className="border-t border-slate-200 p-4">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Type your answer…"
              rows={2}
              className="flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-60"
              disabled={loading || !question}
              aria-label="Your answer"
            />
            <div className="flex flex-col gap-1.5 self-end">
              <button
                type="button"
                onClick={listening ? stopVoiceInput : startVoiceInput}
                className={`rounded-xl p-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  listening
                    ? "bg-rose-100 text-rose-700 hover:bg-rose-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                title={listening ? "Stop listening" : "Voice input"}
                aria-label={listening ? "Stop listening" : "Start voice input"}
              >
                {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim() || !question}
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Send"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            The AI will ask follow-ups and give hints. It won’t reveal the full solution. Use the
            mic for voice (Chrome/Edge).
          </p>
        </div>
      </aside>
    </>
  );
}
