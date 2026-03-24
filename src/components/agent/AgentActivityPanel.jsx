import { useState } from "react";
import { Settings, ExternalLink, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ActionCard from "./ActionCard";

const SPEC_ANNOTATIONS = {
  panel: "New panel — right column of every Case record. Persistent when any agent is active on the case.",
  pulseDot: "Live — pulses when agent has acted on this case in last 60 mins",
};

export default function AgentActivityPanel({ actions: initialActions }) {
  const navigate = useNavigate();
  const [actions, setActions] = useState(initialActions);

  const handleOverride = (actionId, form) => {
    setActions(prev => {
      // Mark original action as overridden
      const updated = prev.map(a =>
        a.id === actionId
          ? {
              ...a,
              overridden: true,
              overriddenBy: "Jordan Kim",
              overriddenReason: form.reason,
            }
          : a
      );

      // Prepend a new OVERRIDDEN entry
      const original = prev.find(a => a.id === actionId);
      const overrideEntry = {
        id:           `override-${actionId}-${Date.now()}`,
        timestamp:    "Just now",
        relativeTime: "Just now",
        type:         "OVERRIDDEN",
        label:        "Override Logged",
        agentVersion: original?.agentVersion || "Case Management Agent v2.3",
        status:       "completed",
        overridden:   false,
        summary:      `Rep override of "${original?.label}": ${form.reason}`,
        rationale: {
          headline:   "Rep override logged to audit trail",
          confidence: 100,
          signals: [
            {
              label: "Override Reason",
              value: form.reason,
              weight: "high",
              icon: "edit",
              delta: null,
            },
          ],
          dataSources: ["Override Audit System"],
          modelNote:   "Override logged for compliance. Reason will be reviewed for agent training.",
          csatContext: "Rep overrides are reviewed weekly to improve agent accuracy and CSAT outcomes.",
        },
      };

      return [overrideEntry, ...updated];
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div className="flex items-start justify-between mb-4 pb-3 border-b border-ms-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-display font-bold text-gray-900 text-base">Agent Activity</h2>
            {/* Animated pulse dot */}
            <div className="relative">
              <span className="w-2 h-2 rounded-full bg-ms-teal block pulse-dot" />
              <span className="absolute inset-0 w-2 h-2 rounded-full bg-ms-teal/40 animate-ping" />
            </div>
            {/* Spec annotation */}
            <span
              title={SPEC_ANNOTATIONS.pulseDot}
              className="text-[10px] bg-ms-teal/10 text-ms-teal px-1.5 py-0.5 rounded border border-ms-teal/20 cursor-help"
            >
              Live
            </span>
          </div>
          <p className="text-xs text-ms-muted">Case Management Agent v2.3 — {actions.length} actions on this case</p>

          {/* Spec annotation badge */}
          <p className="text-[10px] text-ms-purple bg-ms-purple/5 border border-ms-purple/20 rounded px-2 py-1 mt-2 leading-relaxed">
            {SPEC_ANNOTATIONS.panel}
          </p>
        </div>
        <button
          onClick={() => navigate("/ai-optimization")}
          className="flex items-center gap-1.5 text-xs text-ms-blue hover:text-ms-dark font-medium transition-colors shrink-0"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>View in AI Optimization Hub</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[22px] top-4 bottom-4 w-px bg-ms-border" />

          <div className="space-y-3">
            {actions.map(action => (
              <div key={action.id} className="relative pl-0">
                <ActionCard action={action} onOverride={handleOverride} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
