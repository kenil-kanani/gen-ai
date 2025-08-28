export default function Button({
  children,
  variant = "solid", // "solid" | "outline" | "ghost"
  size = "md", // "sm" | "md" | "lg"
  className = "",
  type = "button",
  ...props
}) {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 focus-visible:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none active:translate-y-px";

  const sizes = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-3.5 py-2.5 text-sm",
  };

  const variants = {
    solid:
      "bg-[var(--accent)] text-white hover:brightness-110 shadow-lg shadow-[var(--accent)]/30 hover:shadow-[var(--accent)]/40",
    outline:
      "text-[var(--accent)] shadow-[0_0_0_1px_var(--accent)_inset] hover:bg-white/5 hover:shadow-[var(--accent)]/20",
    ghost: "text-[var(--accent)] hover:bg-white/5",
  };

  const classes = [base, sizes[size], variants[variant], className].join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}