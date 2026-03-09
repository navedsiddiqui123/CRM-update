import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

export default function OverrideModal({ action, onConfirm, onCancel }) {
  const [reason, setReason] = useState("");
  const [notifyManager, setNotifyManager] = useState(true);
  const [newScore, setNewScore] = useState(
    action.type === "LEAD_SCORED" ? action.rationale?.confidence ?? 87 : null
  );
  const [newStatus, setNewStatus] = useState("New");

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onConfirm({ reason, notifyManager, newScore, newStatus });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-ms-border">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-ms-orange/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={18} className="text-ms-orange" />
            </div>
            <div>
              <h2 className="font-display font-bold text-[#1a2332] text-base">Override Agent Action</h2>
              <p className="text-xs text-ms-muted mt-0.5">{action.label} — {action.summary}</p>
            </div>
          </div>
          <button onClick={onCancel} className="text-ms-muted hover:text-[#1a2332] transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Score input for LEAD_SCORED */}
          {action.type === "LEAD_SCORED" && (
            <div>
              <label className="block text-xs font-semibold text-ms-muted uppercase tracking-wide mb-1.5">
                Manual Score Override (0–100)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={newScore}
                onChange={(e) => setNewScore(Number(e.target.value))}
                className="w-full border border-ms-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-ms-blue"
              />
            </div>
          )}

          {/* Status dropdown for STATUS_CHANGED */}
          {action.type === "STATUS_CHANGED" && (
            <div>
              <label className="block text-xs font-semibold text-ms-muted uppercase tracking-wide mb-1.5">
                New Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full border border-ms-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-ms-blue bg-white"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Disqualified</option>
                <option>Nurturing</option>
              </select>
            </div>
          )}

          {/* Reason textarea */}
          <div>
            <label className="block text-xs font-semibold text-ms-muted uppercase tracking-wide mb-1.5">
              Reason for Override <span className="text-ms-red">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why you're overriding the agent's decision…"
              rows={3}
              className="w-full border border-ms-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-ms-blue resize-none"
            />
          </div>

          {/* Notify manager */}
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={notifyManager}
              onChange={(e) => setNotifyManager(e.target.checked)}
              className="w-4 h-4 accent-ms-blue"
            />
            <span className="text-sm text-[#1a2332]">Notify manager of this override</span>
          </label>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-ms-border bg-ms-surface">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-ms-muted border border-ms-border rounded-lg hover:bg-ms-border/40 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors cursor-pointer disabled:opacity-40"
            style={{ backgroundColor: reason.trim() ? "#D83B01" : "#D83B01" }}
          >
            Confirm Override
          </button>
        </div>
      </div>
    </div>
  );
}
