export default function ResponsePanel({
  text = "",
  loading = false,
  error = false,
  className = "",
}) {
  const containerBase = [
    "w-full",
    "rounded-md border",
    "p-3 sm:p-4",
    "text-white/90",
  ].join(" ");

  const stateStyles = error
    ? "border-red-500/40 bg-red-500/5"
    : "border-white/10 bg-white/5";

  const icon = (
    <svg
      className={`h-4 w-4 ${loading ? "animate-spin text-[var(--accent)]" : error ? "text-red-400" : "text-[var(--accent)]"}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {loading ? (
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
      ) : (
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      )}
      {loading ? (
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      ) : null}
    </svg>
  );

  return (
    <div className={[containerBase, stateStyles, className].join(" ")}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{icon}</div>
        <div className="min-w-0 grow">
          <div className="max-h-[50svh] sm:max-h-[60vh] overflow-auto whitespace-pre-wrap break-words text-left text-sm sm:text-base">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}