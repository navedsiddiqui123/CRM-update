import { useState } from "react";
import { ChevronDown, ChevronUp, RotateCcw, AlertCircle, FileSearch, BookOpen, MessageSquare, PlusCircle, GitBranch } from "lucide-react";
import { ACTION_TYPE_META } from "../../data/mockData";
import RationaleDrawer from "./RationaleDrawer";
import OverrideModal from "./OverrideModal";

const TYPE_ICONS = {
  CASE_CREATED:        PlusCircle,
  CASE_ROUTED:         GitBranch,
  KNOWLEDGE_SUGGESTED: BookOpen,
  RESPONSE_DRAFTED:    MessageSquare,
  CASE_RESOLVED:       FileSearch,
};

const SPEC_ANNOTATIONS = {
  CASE_CREATED:        null,
  CASE_ROUTED:         null,
  KNOWLEDGE_SUGGESTED: null,
  RESPONSE_DRAFTED:    "Pre-rendered: rep edited draft for tone. Override logged, flagged as training feedback for agent improvement.",
};

export default function ActionCard({ action, onOverride }) {
  const [rationaleOpen, setRationaleOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const meta = ACTION_TYPE_META[action.type] || {};
  const Icon = TYPE_ICONS[action.type] || FileSearch;
  const isOverridden = action.overridden;
  const specNote = SPEC_ANNOTATIONS[action.type];

  const handleConfirmOverride = (form) => {
    setModalOpen(false);
    onOverride(action.id, form);
  };

  return (
    <>
      <div
        className={`relative rounded-xl border transition-all duration-200 overflow-hidden
          ${isOverridden
            ? "bg-red-50/60 border-ms-red/30"
            : "bg-white border-ms-border hover:border-ms-blue/40 hover:shadow-sm"
          }
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
          style={{ backgroundColor: isOverridden ? "#A4262C" : meta.color }}
        />

        <div className="pl-4 pr-3 py-3">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <div
                className="p-1.5 rounded-lg"
                style={{ backgroundColor: isOverridden ? "#FDE8E9" : meta.bg }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: isOverridden ? "#A4262C" : meta.color }} />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-800">{action.label}</span>
                {isOverridden && (
                  <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-semibold bg-red-100 text-ms-red border border-red-200 px-1.5 py-0.5 rounded">
                    <AlertCircle className="w-3 h-3" /> Overridden
                  </span>
                )}
              </div>
            </div>
            <span className="text-xs text-ms-muted shrink-0">{action.relativeTime}</span>
          </div>

          {/* Spec annotation for overridden card */}
          {specNote && (
            <div className="mb-2 flex items-start gap-1.5 bg-ms-purple/5 border border-ms-purple/20 rounded px-2 py-1.5">
              <span className="text-[10px] text-ms-purple leading-relaxed">{specNote}</span>
            </div>
          )}

          {/* Summary */}
          <p className="text-xs text-ms-muted leading-relaxed mb-2">{action.summary}</p>

          {/* Overridden banner */}
          {isOverridden && (
            <div className="mb-2 bg-red-100/60 border border-ms-red/20 rounded-lg px-3 py-2">
              <p className="text-xs text-ms-red font-semibold mb-0.5">
                Overridden by {action.overriddenBy}
              </p>
              <p className="text-xs text-ms-red/80 leading-relaxed">
                "{action.overriddenReason}"
              </p>
            </div>
          )}

          {/* Knowledge article link */}
          {action.type === "KNOWLEDGE_SUGGESTED" && (
            <p className="text-xs text-ms-blue hover:underline cursor-pointer mb-2 font-medium">
              View Article: {action.knowledgeArticle?.id} — {action.knowledgeArticle?.title}
            </p>
          )}

          {/* Action buttons row */}
          <div className="flex items-center justify-between">
            {/* Rationale toggle */}
            <button
              onClick={() => setRationaleOpen(o => !o)}
              className="flex items-center gap-1.5 text-xs font-medium text-ms-blue hover:text-ms-dark transition-colors"
            >
              {rationaleOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>
                {rationaleOpen ? "Hide reasoning" : "Why did the agent do this?"}
              </span>
              {!rationaleOpen && (
                <span className="text-[10px] bg-ms-purple/10 text-ms-purple px-1 py-0.5 rounded border border-ms-purple/20 ml-1">
                  CORE
                </span>
              )}
            </button>

            {/* Override button — visible on hover or if not overridden */}
            {!isOverridden && (hovered || true) && (
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-1 text-xs font-medium text-ms-muted border border-ms-border rounded-lg px-2.5 py-1 hover:border-ms-orange hover:text-ms-orange transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Override
              </button>
            )}
          </div>

          {/* Agent version tag */}
          <p className="text-[10px] text-ms-muted mt-2 font-mono">{action.agentVersion}</p>

          {/* Rationale drawer (inline expand) */}
          <div className={`overflow-hidden transition-all duration-300 ${rationaleOpen ? "max-h-[1400px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
            {rationaleOpen && <RationaleDrawer action={action} />}
          </div>
        </div>
      </div>

      {/* Override modal */}
      {modalOpen && (
        <OverrideModal
          action={action}
          onConfirm={handleConfirmOverride}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
