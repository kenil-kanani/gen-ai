import AccentBadge from "./AccentBadge";
import AgentRunner from "./AgentRunner";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 pb-16 pt-14 text-center">
      {/* Badge */}
      <AccentBadge className="mx-auto">Agentic Browser Automation</AccentBadge>

      {/* Heading with accent gradient */}
      <h1 className="mx-auto mt-4 max-w-4xl bg-gradient-to-b from-[var(--accent)] to-white bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
        What do you need done today?
      </h1>

      {/* Subheading */}
      <p className="mx-auto mt-4 max-w-2xl text-balance text-white/70">
        Automate browsing, extract data, and deliver results. Powered by an
        <span className="mx-1 font-semibold text-[var(--accent)]/90">agentic workflow</span>
        designed for real-world tasks.
      </p>

      {/* Agent runner (prompt + response) */}
      <div className="mt-7">
        <AgentRunner />
        <p className="mt-2 text-xs text-white/50">Press ⌘+Enter / Ctrl+Enter to run, or click the <span className="text-[var(--accent)]">Run</span> button.</p>
      </div>

      {/* Accent glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="mx-auto h-40 w-40 rounded-full bg-[var(--accent)]/25 blur-3xl" />
        <div className="absolute left-1/4 top-6 h-32 w-32 -translate-x-1/2 rounded-full bg-[var(--accent)]/15 blur-3xl" />
        <div className="absolute right-1/5 bottom-4 h-28 w-28 translate-x-1/3 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      </div>
    </section>
  );
}