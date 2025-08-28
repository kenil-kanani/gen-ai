export default function FeatureStep({ title, description }) {
  return (
    <div className="text-center text-white/70">
      <h3 className="text-lg font-semibold text-white">
        <span className="mr-2 inline-block h-2 w-2 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-6">{description}</p>
    </div>
  );
}