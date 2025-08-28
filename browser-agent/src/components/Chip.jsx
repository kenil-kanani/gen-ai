export default function Chip({ children, active = false }) {
  return (
    <span
      className={
        `inline-flex items-center rounded-full border px-4 py-2 text-sm/none` +
        ` ${active ? 'border-[var(--accent)]/60 bg-[var(--accent)]/10 text-white' : 'border-white/10 text-white/80 hover:border-white/20'}`
      }
    >
      {children}
    </span>
  );
}