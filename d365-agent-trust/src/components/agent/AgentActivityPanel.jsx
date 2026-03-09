import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, Settings, ExternalLink, AlertCircle } from "lucide-react";
import ActionCard from "./ActionCard";
import { ACTION_TYPE_META } from "../../data/mockData";

export default function AgentActivityPanel({ actions: initialActions }) {
  const navigate = useNavigate();
  const [actions, setActions] = useState(initialActions);

  const handleOverride = (actionId, data) => {
    setActions((prev) => {
      const updated = prev.map((a) =>
        a.id === actionId ? { ...a, overridden: true } : a
      );

      // Add a new OVERRIDDEN entry at the top
      const overriddenAction = prev.find((a) => a.id === actionId);
      const newEntry = {
        id: `override-${actionId}-${Date.now()}`,
        timestamp: "Just now",
        relativeTime: "Just now",
        type: "OVERRIDDEN",
        label: "Overridden by Jordan Mills",
        agentVersion: "Sales Qualification Agent v2.1",
        status: "overridden",
        summary: data.reason,
        overridden: false,
        rationale: null,
      };

      return [newEntry, ...updated];
    });
  };

  return (
    <div className="bg-white border border-ms-border rounded-xl overflow-hidden h-full flex flex-col">
      {/* Panel Header */}
      <div className="flex items-start justify-between px-4 py-3 border-b border-ms-border bg-ms-surface">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 relative">
            <Bot size={18} className="text-ms-teal" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-ms-teal pulse-dot" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-[#1a2332] text-sm">Agent Activity</h3>
              {/* Spec annotation */}
              <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
                SPEC: New panel — right column of Lead record. Always visible when agent is active.
              </span>
            </div>
            <p className="text-xs text-ms-muted mt-0.5">
              Sales Qualification Agent v2.1 &mdash; {actions.length} actions logged
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/manager")}
            className="flex items-center gap-1 text-xs text-ms-blue hover:text-ms-dark font-medium transition-colors cursor-pointer"
          >
            View all
            <ExternalLink size={11} />
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="text-ms-muted hover:text-[#1a2332] transition-colors cursor-pointer"
          >
            <Settings size={14} />
          </button>
        </div>
      </div>

      {/* Pulse indicator annotation */}
      <div className="px-4 pt-2">
        <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
          SPEC: Live indicator — pulses when agent has taken action in last 24h
        </span>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-3 top-4 bottom-4 w-px bg-ms-border" />

          <div className="space-y-3 pl-0">
            {actions.map((action, i) => (
              <div key={action.id} className="relative">
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 top-4 w-2 h-2 rounded-full border-2 border-white z-10"
                  style={{
                    backgroundColor: action.overridden
                      ? "#D83B01"
                      : ACTION_TYPE_META[action.type]?.color || "#0078D4",
                  }}
                />
                <div className="pl-7">
                  <ActionCard action={action} onOverride={handleOverride} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overridden state spec annotation */}
      <div className="px-4 pb-3 border-t border-ms-border pt-2 bg-ms-surface">
        <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
          SPEC: Post-override: card turns red-tinted, manager notified, reason recorded
        </span>
      </div>
    </div>
  );
}
