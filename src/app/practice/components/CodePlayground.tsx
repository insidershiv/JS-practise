"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { editor } from "monaco-editor";
import type { OnMount } from "@monaco-editor/react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[320px] items-center justify-center bg-[#1e1e1e] text-zinc-500 text-sm">
      Loading editor…
    </div>
  ),
});

export function CodePlayground({
  value,
  onChange,
  language = "javascript",
}: {
  value: string;
  onChange: (v: string) => void;
  language?: string;
}) {
  const options = useMemo<editor.IStandaloneEditorConstructionOptions>(
    () => ({
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: "on",
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      wordWrap: "on",
      suggestOnTriggerCharacters: true,
      quickSuggestions: {
        other: true,
        comments: false,
        strings: true,
      },
      parameterHints: { enabled: true },
      formatOnPaste: true,
      formatOnType: true,
      bracketPairColorization: { enabled: true },
      padding: { top: 12, bottom: 12 },
    }),
    []
  );

  const handleMount: OnMount = (editorInstance, monaco) => {
    monaco.editor.setTheme("vs-dark");
  };

  return (
    <MonacoEditor
      height="100%"
      language={language === "typescript" ? "typescript" : "javascript"}
      theme="vs-dark"
      value={value}
      onChange={(v) => onChange(v ?? "")}
      options={options}
      onMount={handleMount}
    />
  );
}
