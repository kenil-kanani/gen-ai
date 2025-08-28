import FeatureStep from "./FeatureStep";

export default function StepsRow() {
  const steps = [
    {
      title: "Prompt",
      description:
        "State the objective. Provide links, files, or constraints. The Agent plans the route.",
    },
    {
      title: "Execute",
      description:
        "The Agent runs tasks end‑to‑end: browse, code, call APIs, transform data, and more.",
    },
    {
      title: "Review",
      description:
        "See decisions, artifacts, and logs. Adjust instructions or approve suggested actions.",
    },
    {
      title: "Deliver",
      description:
        "Get outputs you can use—reports, code PRs, structured data, or deployed changes.",
    },
  ];

  return (
    <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 items-center gap-8 sm:grid-cols-2 lg:grid-cols-7">
      {/* Step 1 */}
      <div className="lg:col-span-1"><FeatureStep {...steps[0]} /></div>
      {/* Arrow */}
      <div className="hidden items-center justify-center lg:flex lg:col-span-1">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent)]/30 text-white/80">→</span>
      </div>
      {/* Step 2 */}
      <div className="lg:col-span-1"><FeatureStep {...steps[1]} /></div>
      {/* Arrow */}
      <div className="hidden items-center justify-center lg:flex lg:col-span-1">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent)]/30 text-white/80">→</span>
      </div>
      {/* Step 3 */}
      <div className="lg:col-span-1"><FeatureStep {...steps[2]} /></div>
      {/* Arrow */}
      <div className="hidden items-center justify-center lg:flex lg:col-span-1">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent)]/30 text-white/80">→</span>
      </div>
      {/* Step 4 */}
      <div className="lg:col-span-1"><FeatureStep {...steps[3]} /></div>
    </div>
  );
}