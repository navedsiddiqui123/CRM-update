export default function ScoreMeter({ score, size = 72 }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const gap = circumference - progress;

  const color = score >= 80 ? "#107C10" : score >= 60 ? "#FFB900" : "#A4262C";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E1E8EF"
          strokeWidth={8}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeDasharray={`${progress} ${gap}`}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute font-display font-bold"
        style={{ fontSize: size * 0.28, color, lineHeight: 1 }}
      >
        {score}
      </span>
    </div>
  );
}
