import { Smile, Meh, Frown, AlertCircle } from "lucide-react";

const SENTIMENT_CONFIG = {
  positive:   { Icon: Smile,       color: "text-ms-green", bg: "bg-green-50 border-green-200",  label: "Positive"   },
  neutral:    { Icon: Meh,         color: "text-ms-muted", bg: "bg-gray-100 border-gray-200",   label: "Neutral"    },
  frustrated: { Icon: Frown,       color: "text-ms-amber", bg: "bg-amber-50 border-amber-200",  label: "Frustrated" },
  angry:      { Icon: AlertCircle, color: "text-ms-red",   bg: "bg-red-50 border-red-200",      label: "Angry"      },
};

export default function SentimentChip({ sentiment }) {
  const cfg = SENTIMENT_CONFIG[sentiment] || SENTIMENT_CONFIG.neutral;
  const { Icon, color, bg, label } = cfg;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${bg} ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
