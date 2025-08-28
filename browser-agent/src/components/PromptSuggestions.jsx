import Button from "./Button";

export const DEFAULT_PROMPTS = [
  {
    label: "Summarize HN",
    value: "Open https://news.ycombinator.com and summarize top 5 stories.",
  },
];

export default function PromptSuggestions({ prompts = DEFAULT_PROMPTS, onSelect, disabled = false }) {
  const normalized = prompts.map((p) =>
    typeof p === "string" ? { label: p, value: p } : p
  );

  return (
    <div className="mt-4">
      <div className="mb-2 text-left text-xs font-medium uppercase tracking-wide text-white/60">
        Try one of these
      </div>
      <div className="flex flex-wrap gap-2">
        {normalized.map(({ label, value }, idx) => (
          <Button
            key={idx}
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => onSelect?.(value)}
            title={value}
            disabled={disabled}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}