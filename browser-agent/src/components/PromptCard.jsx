"use client";

import { useRef, useState } from "react";
import Button from "./Button";
import TextArea from "./TextArea";
import PromptSuggestions, { DEFAULT_PROMPTS } from "./PromptSuggestions";

export default function PromptCard({ onRun, disabled = false }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleSelect = (text) => {
    if (disabled) return;
    setValue(text);
    // focus the textarea after selecting a prompt
    queueMicrotask(() => inputRef.current?.focus());
  };

  const run = () => {
    if (disabled) return;
    const v = value.trim();
    if (!v) return;
    onRun?.(v);
    // clear the input immediately after submit
    setValue("");
  };

  const onKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      run();
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl p-3">
      <div className="p-0 text-white/80">
        <TextArea
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Describe your goal. Example: Crawl docs, extract FAQs, and generate a summary PDF."
          disabled={disabled}
        />

        <PromptSuggestions prompts={DEFAULT_PROMPTS} onSelect={handleSelect} disabled={disabled} />

        <div className="mt-3 flex items-center justify-between text-xs text-white/60">
          <span className="text-[10px] sm:text-xs">Press ⌘+Enter / Ctrl+Enter to run</span>
          <Button variant="solid" size="sm" onClick={run} disabled={disabled}>{disabled ? "Running..." : "Run"}</Button>
        </div>
      </div>
    </div>
  );
}