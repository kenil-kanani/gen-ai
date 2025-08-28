import React from "react";

const TextArea = React.forwardRef(function TextArea(
  { className = "", rows = 4, ...props },
  ref
) {
  const base = [
    "block w-full rounded-md",
    "border border-white/15 bg-transparent",
    "px-3 py-2.5 text-sm text-white placeholder-white/40",
    "outline-none transition",
    "focus:border-[var(--accent)]/50 focus:ring-2 focus:ring-[var(--accent)]/30",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "min-h-24",
  ].join(" ");

  return <textarea ref={ref} rows={rows} className={[base, className].join(" ")} {...props} />;
});

export default TextArea;