import { useState } from "react";
import Breadcrumb from "../components/layout/Breadcrumb";
import { Bot, Sliders, Mail, Route, Database } from "lucide-react";

function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-6 py-4 border-b border-ms-border last:border-0">
      <div>
        <p className="text-sm font-semibold text-[#1a2332]">{label}</p>
        {description && <p className="text-xs text-ms-muted mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative flex-shrink-0 w-10 h-5 rounded-full transition-colors duration-200 cursor-pointer ${
          checked ? "bg-ms-teal" : "bg-ms-border"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

const DATA_SOURCES = [
  { id: "linkedin", label: "LinkedIn Sales Navigator" },
  { id: "bombora",  label: "Bombora Intent Data" },
  { id: "zoominfo", label: "ZoomInfo" },
  { id: "builtwith", label: "BuiltWith" },
  { id: "website",  label: "Website Analytics" },
];

export default function SettingsView() {
  const [agentActive, setAgentActive]           = useState(true);
  const [autoRouting, setAutoRouting]           = useState(true);
  const [emailApproval, setEmailApproval]       = useState(false);
  const [threshold, setThreshold]               = useState(80);
  const [sources, setSources]                   = useState({
    linkedin: true, bombora: true, zoominfo: true, builtwith: true, website: true,
  });

  const toggleSource = (id) => setSources((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="p-6 max-w-2xl">
      <Breadcrumb items={[{ label: "Agent Settings" }]} />

      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-[#1a2332]">Agent Settings</h1>
        <p className="text-sm text-ms-muted mt-1">Configure the Sales Qualification Agent behaviour for your team.</p>
      </div>

      {/* Card: Agent On/Off */}
      <div className="bg-white border border-ms-border rounded-xl overflow-hidden shadow-sm mb-4">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-ms-border bg-ms-surface">
          <Bot size={15} className="text-ms-teal" />
          <h2 className="font-display font-bold text-sm text-[#1a2332]">Agent Control</h2>
          {agentActive && (
            <span className="ml-auto flex items-center gap-1 text-ms-teal text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-ms-teal pulse-dot" />
              Active
            </span>
          )}
        </div>
        <div className="px-5">
          <Toggle
            label="Sales Qualification Agent"
            description="When active, the agent automatically scores, enriches, and routes incoming leads."
            checked={agentActive}
            onChange={setAgentActive}
          />
        </div>
      </div>

      {/* Card: Qualification */}
      <div className="bg-white border border-ms-border rounded-xl overflow-hidden shadow-sm mb-4">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-ms-border bg-ms-surface">
          <Sliders size={15} className="text-ms-blue" />
          <h2 className="font-display font-bold text-sm text-[#1a2332]">Qualification Rules</h2>
        </div>
        <div className="px-5 py-4">
          <div className="mb-2">
            <div className="flex justify-between mb-1.5">
              <label className="text-sm font-semibold text-[#1a2332]">Qualification Score Threshold</label>
              <span className="text-sm font-bold text-ms-blue">{threshold}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full accent-ms-blue"
            />
            <div className="flex justify-between text-[11px] text-ms-muted mt-0.5">
              <span>0 — Never qualify</span>
              <span>100 — Manual only</span>
            </div>
          </div>
        </div>
        <div className="px-5 border-t border-ms-border">
          <Toggle
            label="Auto-Routing"
            description="Automatically assign leads to reps based on territory and performance rules."
            checked={autoRouting}
            onChange={setAutoRouting}
          />
        </div>
      </div>

      {/* Card: Email */}
      <div className="bg-white border border-ms-border rounded-xl overflow-hidden shadow-sm mb-4">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-ms-border bg-ms-surface">
          <Mail size={15} className="text-ms-teal" />
          <h2 className="font-display font-bold text-sm text-[#1a2332]">Email Settings</h2>
        </div>
        <div className="px-5">
          <Toggle
            label="Require Rep Approval Before Sending"
            description="When on, the agent drafts emails but waits for rep confirmation before sending."
            checked={emailApproval}
            onChange={setEmailApproval}
          />
        </div>
      </div>

      {/* Card: Data sources */}
      <div className="bg-white border border-ms-border rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-ms-border bg-ms-surface">
          <Database size={15} className="text-[#8764B8]" />
          <h2 className="font-display font-bold text-sm text-[#1a2332]">Data Sources</h2>
        </div>
        <div className="px-5 py-4 space-y-2">
          {DATA_SOURCES.map(({ id, label }) => (
            <label key={id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={sources[id]}
                onChange={() => toggleSource(id)}
                className="w-4 h-4 accent-ms-blue"
              />
              <span className="text-sm text-[#1a2332] group-hover:text-ms-blue transition-colors">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
