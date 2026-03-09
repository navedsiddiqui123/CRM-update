import { useState } from "react";
import {
  Star, Mail, RefreshCw, Search, RotateCcw,
  ChevronDown, ChevronUp, Undo2, AlertCircle,
} from "lucide-react";
import { ACTION_TYPE_META } from "../../data/mockData";
import RationaleDrawer from "./RationaleDrawer";
import OverrideModal from "./OverrideModal";

const TYPE_ICONS = {
  LEAD_SCORED:        Star,
  EMAIL_SENT:         Mail,
  STATUS_CHANGED:     RefreshCw,
  RESEARCH_COMPLETED: Search,
  OVERRIDDEN:         AlertCircle,
};

export default function ActionCard({ action, onOverride }) {
  const [expanded, setExpanded] = useState(false);
  const [showOverride, setShowOverride] = useState(false);
  const [hovered, setHovered] = useState(false);

  const meta = ACTION_TYPE_META[action.type] || ACTION_TYPE_META.LEAD_SCORED;
  const Icon = TYPE_ICONS[action.type] || Star;

  const isOverridden = action.overridden;

  const handleOverrideConfirm = (data) => {
    setShowOverride(false);
    onOverride(action.id, data);
  };

  return (
    <>
      <div
        className={`relative rounded-xl border transition-all duration-150 overflow-hidden ${
          isOverridden
            ? "border-red-200 bg-red-50/60"
            : "border-ms-border bg-white hover:shadow-md"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
          style={{ backgroundColor: isOverridden ? "#D83B01" : meta.color }}
        />

        <div className="pl-4 pr-3 pt-3 pb-3">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: isOverridden ? "#FEF0EB" : meta.bg }}
              >
                <Icon size={14} style={{ color: isOverridden ? "#D83B01" : meta.color }} />
              </div>
              <div>
                <span className="text-sm font-semibold text-[#1a2332]">{action.label}</span>
                {isOverridden && (
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-700 border border-red-200">
                    Overridden by Jordan Mills
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Override button — visible on hover */}
              {!isOverridden && hovered && (
                <button
                  onClick={() => setShowOverride(true)}
                  className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-ms-muted border border-ms-border rounded-md hover:border-ms-orange hover:text-ms-orange transition-colors cursor-pointer"
                >
                  <Undo2 size={11} />
                  Override
                </button>
              )}
              <span className="text-[11px] text-ms-muted">{action.relativeTime}</span>
            </div>
          </div>

          {/* Summary */}
          <p className="mt-2 text-sm text-ms-muted leading-relaxed pl-9">{action.summary}</p>

          {/* Rationale toggle */}
          {action.rationale && !isOverridden && (
            <div className="pl-9 mt-2">
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1 text-xs font-medium text-ms-blue hover:text-ms-dark transition-colors cursor-pointer group"
              >
                {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                {expanded ? "Hide reasoning" : "Why did the agent do this?"}
                {!expanded && (
                  <span className="ml-1 inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
                    SPEC: Core explainability feature — plain language rationale on demand
                  </span>
                )}
              </button>

              <RationaleDrawer
                rationale={action.rationale}
                emailPreview={action.emailPreview}
                isOpen={expanded}
              />
            </div>
          )}

          {/* Agent version tag */}
          <div className="mt-2.5 pl-9">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] text-ms-muted bg-ms-surface border border-ms-border">
              {action.agentVersion}
            </span>
          </div>
        </div>
      </div>

      {/* Override Modal */}
      {showOverride && (
        <OverrideModal
          action={action}
          onConfirm={handleOverrideConfirm}
          onCancel={() => setShowOverride(false)}
        />
      )}
    </>
  );
}
