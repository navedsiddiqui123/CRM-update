export default function ConfidenceBar({ confidence }) {
  const color = confidence >= 85 ? "#107C10" : confidence >= 70 ? "#FFB900" : "#A4262C";
  const gradientId = `conf-grad-${confidence}`;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-semibold text-ms-muted uppercase tracking-wide">Agent Confidence</span>
        <span className="text-sm font-bold" style={{ color }}>{confidence}%</span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-ms-border overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${confidence}%`,
            background: confidence >= 85
              ? "linear-gradient(to right, #107C10, #54C254)"
              : confidence >= 70
              ? "linear-gradient(to right, #D67E00, #FFB900)"
              : "linear-gradient(to right, #A4262C, #D83B01)",
          }}
        />
      </div>

      {/* Spec annotation */}
      <div className="mt-1 text-[10px] text-ms-muted italic">
        <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
          SPEC: Confidence % from agent model — seller uses this to calibrate trust
        </span>
      </div>
    </div>
  );
}
