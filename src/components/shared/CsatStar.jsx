import { Star } from "lucide-react";

export default function CsatStar({ score, max = 5, showLabel = true }) {
  const color = score >= 4 ? "text-ms-green" : score >= 3 ? "text-ms-amber" : "text-ms-red";
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${color}`}>
      <Star className="w-3.5 h-3.5 fill-current" />
      {showLabel && <span>Predicted CSAT: {score.toFixed(1)} / {max}.0</span>}
      {!showLabel && <span>{score.toFixed(1)}</span>}
    </span>
  );
}
