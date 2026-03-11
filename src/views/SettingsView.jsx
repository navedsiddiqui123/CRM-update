import { useState } from "react";
import { Lock, CheckSquare, Square } from "lucide-react";

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none
        ${checked ? "bg-ms-teal" : "bg-gray-200"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
          ${checked ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}

function SettingRow({ label, sub, children }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-ms-border last:border-0">
      <div>
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {sub && <p className="text-xs text-ms-muted mt-0.5">{sub}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

const DATA_SOURCES = [
  "Email NLP Model",
  "Intent Engine",
  "Skills Registry",
  "Order Management System",
  "Case History",
  "PII Compliance API",
];

export default function SettingsView() {
  const [settings, setSettings] = useState({
    agentActive:      true,
    autoCreate:       true,
    autoRouting:      true,
    draftApproval:    true,
    knowledgeCount:   "1",
  });
  const [dataSources, setDataSources] = useState(
    Object.fromEntries(DATA_SOURCES.map(s => [s, true]))
  );

  const set = (key, val) => setSettings(s => ({ ...s, [key]: val }));

  const toggleDS = (src) => setDataSources(d => ({ ...d, [src]: !d[src] }));

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-gray-900">Agent Settings</h1>
        <p className="text-ms-muted text-sm mt-1">Configure Case Management Agent behaviour</p>
      </div>

      {/* Core toggles */}
      <div className="bg-white rounded-xl border border-ms-border px-5 mb-4">
        <SettingRow label="Case Management Agent" sub="Enable AI agent on all active cases">
          <Toggle checked={settings.agentActive} onChange={v => set("agentActive", v)} />
        </SettingRow>
        <SettingRow label="Auto-case creation from email" sub="Automatically create cases from inbound email">
          <Toggle checked={settings.autoCreate} onChange={v => set("autoCreate", v)} />
        </SettingRow>
        <SettingRow label="Auto-routing" sub="Use intent-based routing to assign cases">
          <Toggle checked={settings.autoRouting} onChange={v => set("autoRouting", v)} />
        </SettingRow>
        <SettingRow label="Response draft approval" sub="Rep must approve agent draft before sending">
          <Toggle checked={settings.draftApproval} onChange={v => set("draftApproval", v)} />
        </SettingRow>
      </div>

      {/* Knowledge count */}
      <div className="bg-white rounded-xl border border-ms-border px-5 mb-4">
        <div className="py-4">
          <p className="text-sm font-semibold text-gray-800 mb-3">Knowledge suggestion count</p>
          <div className="flex gap-3">
            {["1", "3", "5"].map(n => (
              <label key={n} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="knowledgeCount"
                  value={n}
                  checked={settings.knowledgeCount === n}
                  onChange={() => set("knowledgeCount", n)}
                  className="accent-ms-teal"
                />
                <span className="text-sm text-gray-700">{n} article{n !== "1" ? "s" : ""}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Override logging (non-editable) */}
      <div className="bg-white rounded-xl border border-ms-border px-5 mb-4">
        <div className="py-4 flex items-center justify-between opacity-60">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-800">Override logging</p>
              <Lock className="w-3.5 h-3.5 text-ms-muted" />
            </div>
            <p className="text-xs text-ms-muted mt-0.5">Always enabled — compliance requirement. Cannot be disabled.</p>
          </div>
          <span className="text-sm font-semibold text-ms-muted bg-gray-100 border border-gray-200 px-3 py-1 rounded-lg">
            Always
          </span>
        </div>
      </div>

      {/* Data sources */}
      <div className="bg-white rounded-xl border border-ms-border px-5 mb-4">
        <div className="py-4">
          <p className="text-sm font-semibold text-gray-800 mb-3">Active data sources</p>
          <div className="grid grid-cols-2 gap-2">
            {DATA_SOURCES.map(src => (
              <label key={src} className="flex items-center gap-2 cursor-pointer group">
                <button
                  onClick={() => toggleDS(src)}
                  className="text-ms-teal hover:text-ms-teal/80 transition-colors"
                >
                  {dataSources[src]
                    ? <CheckSquare className="w-4 h-4" />
                    : <Square className="w-4 h-4 text-gray-300" />
                  }
                </button>
                <span className="text-sm text-gray-700">{src}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-5 py-2.5 bg-ms-blue text-white text-sm font-semibold rounded-lg hover:bg-ms-dark transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}
