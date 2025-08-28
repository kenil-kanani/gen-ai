import Hero from "./Hero";

export default function Landing() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <div className="h-[calc(100svh-3.5rem)] overflow-hidden">
        <div className="pt-10" />
        <Hero />
      </div>
    </main>
  );
}