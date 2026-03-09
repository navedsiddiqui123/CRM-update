export default function Badge({ label, color = "#0078D4", bg = "#EBF3FB", className = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${className}`}
      style={{ color, backgroundColor: bg }}
    >
      {label}
    </span>
  );
}
