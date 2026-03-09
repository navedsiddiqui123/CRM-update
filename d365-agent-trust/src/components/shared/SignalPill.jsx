const WEIGHT_STYLES = {
  high:   { color: "#0078D4", bg: "#EBF3FB" },
  medium: { color: "#D67E00", bg: "#FFF8E1" },
  low:    { color: "#5A6472", bg: "#F0F4F8" },
};

export default function SignalPill({ weight }) {
  const style = WEIGHT_STYLES[weight] || WEIGHT_STYLES.low;
  return (
    <span
      className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase"
      style={{ color: style.color, backgroundColor: style.bg }}
    >
      {weight}
    </span>
  );
}
