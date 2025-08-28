export default function AccentBadge({ children, className = "" }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)] ${className}`}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      {children}
    </div>
  );
}