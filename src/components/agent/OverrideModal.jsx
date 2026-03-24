import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

const QUEUES = ["Billing & Refunds", "General Support", "Technical Support", "Account Management", "Escalations"];
const REPS = ["Jordan Kim", "Priya Osei", "Carlos Wu", "Anita Sharma", "Liam Okafor"];

function FormCaseCreated({ form, setForm }) {
  return (
    <>
      <div className="bg-ms-lblue border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-xs text-ms-muted">Agent Classification</p>
        <p className="text-sm font-semibold text-ms-blue mt-0.5">Billing &amp; Refunds · Priority 2</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Priority</label>
          <select
            className="w-full border border-ms-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-ms-blue"
            value={form.priority || "P2"}
            onChange={e => setForm({ ...form, priority: e.target.value })}
          >
            <option>P1</option>
            <option>P2</option>
            <option>P3</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Queue</label>
          <select
            className="w-full border border-ms-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-ms-blue"
            value={form.queue || QUEUES[0]}
            onChange={e => setForm({ ...form, queue: e.target.value })}
          >
            {QUEUES.map(q => <option key={q}>{q}</option>)}
          </select>
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Reason <span className="text-ms-red">*</span></label>
        <textarea
          className="w-full border border-ms-border rounded-lg px-3 py-2 text-sm h-20 resize-none focus:outline-none focus:border-ms-blue"
          placeholder="Explain why you're overriding the agent's classification..."
          value={form.reason || ""}
          onChange={e => setForm({ ...form, reason: e.target.value })}
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input type="checkbox" className="rounded" checked={form.flagQuality || false} onChange={e => setForm({ ...form, flagQuality: e.target.checked })} />
        Flag for quality review
      </label>
    </>
  );
}

function FormCaseRouted({ form, setForm }) {
  return (
    <>
      <div className="bg-ms-lblue border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-xs text-ms-muted">Current Assignment</p>
        <p className="text-sm font-semibold text-ms-blue mt-0.5">Assigned to: Jordan Kim</p>
      </div>
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">New Assignee</label>
        <select
          className="w-full border border-ms-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-ms-blue"
          value={form.assignee || REPS[0]}
          onChange={e => setForm({ ...form, assignee: e.target.value })}
        >
          {REPS.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Reason <span className="text-ms-red">*</span></label>
        <textarea
          className="w-full border border-ms-border rounded-lg px-3 py-2 text-sm h-20 resize-none focus:outline-none focus:border-ms-blue"
          placeholder="Explain why you're reassigning this case..."
          value={form.reason || ""}
          onChange={e => setForm({ ...form, reason: e.target.value })}
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input type="checkbox" className="rounded" defaultChecked={true} />
        Notify supervisor
      </label>
    </>
  );
}

function FormKnowledgeSuggested({ form, setForm }) {
  return (
    <>
      <div className="bg-ms-lblue border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-xs text-ms-muted">Suggested Article</p>
        <p className="text-sm font-semibold text-ms-blue mt-0.5">KB-2241 — Refund processing delays</p>
      </div>
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-2">Override Action</label>
        <div className="space-y-2">
          {[
            { value: "different", label: "Use a different article" },
            { value: "none",      label: "No article needed" },
            { value: "escalate",  label: "Escalate to knowledge team" },
          ].map(opt => (
            <label key={opt.value} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="knowledgeOverride"
                value={opt.value}
                checked={form.action === opt.value}
                onChange={() => setForm({ ...form, action: opt.value })}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
      {form.action === "different" && (
        <div className="mb-3">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Alternative Article ID</label>
          <input
            type="text"
            placeholder="e.g. KB-1887"
            className="w-full border border-ms-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-ms-blue"
            value={form.altArticle || ""}
            onChange={e => setForm({ ...form, altArticle: e.target.value })}
          />
        </div>
      )}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Reason <span className="text-ms-red">*</span></label>
        <textarea
          className="w-full border border-ms-border rounded-lg px-3 py-2 text-sm h-20 resize-none focus:outline-none focus:border-ms-blue"
          placeholder="Explain why you're overriding the knowledge suggestion..."
          value={form.reason || ""}
          onChange={e => setForm({ ...form, reason: e.target.value })}
        />
      </div>
    </>
  );
}

function FormResponseDrafted({ form, setForm, emailDraft }) {
  const TONES = ["Professional", "Empathetic", "Direct"];
  const toggleTone = (tone) => {
    const curr = form.tones || [];
    const next = curr.includes(tone) ? curr.filter(t => t !== tone) : [...curr, tone];
    setForm({ ...form, tones: next });
  };

  return (
    <>
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Original Agent Draft</label>
        <textarea
          className="w-full border border-ms-border rounded-lg px-3 py-2 text-xs h-24 resize-none bg-gray-50 text-gray-500"
          readOnly
          value={emailDraft?.body || ""}
        />
      </div>
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Your Edits</label>
        <textarea
          className="w-full border border-ms-border rounded-lg px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:border-ms-blue"
          value={form.edits || emailDraft?.body || ""}
          onChange={e => setForm({ ...form, edits: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-2">Tone</label>
        <div className="flex gap-2">
          {TONES.map(tone => (
            <button
              key={tone}
              onClick={() => toggleTone(tone)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                (form.tones || []).includes(tone)
                  ? "bg-ms-blue text-white border-ms-blue"
                  : "bg-white text-gray-700 border-ms-border hover:border-ms-blue"
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">What did you change and why? <span className="text-ms-red">*</span></label>
        <textarea
          className="w-full border border-ms-border rounded-lg px-3 py-2 text-sm h-20 resize-none focus:outline-none focus:border-ms-blue"
          placeholder="Describe your edits and reasoning..."
          value={form.reason || ""}
          onChange={e => setForm({ ...form, reason: e.target.value })}
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input type="checkbox" className="rounded" defaultChecked={true} />
        Submit to improve agent (flag as training feedback)
      </label>
    </>
  );
}

const MODAL_TITLES = {
  CASE_CREATED:        "Override Case Classification",
  CASE_ROUTED:         "Override Routing Assignment",
  KNOWLEDGE_SUGGESTED: "Override Knowledge Suggestion",
  RESPONSE_DRAFTED:    "Edit Agent Draft",
};

export default function OverrideModal({ action, onConfirm, onCancel }) {
  const [form, setForm] = useState({ action: "different" });

  const title = MODAL_TITLES[action.type] || "Override Agent Action";

  const handleConfirm = () => {
    if (!form.reason) return;
    onConfirm({ ...form });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ms-border">
          <h2 className="font-display font-bold text-gray-900 text-base">{title}</h2>
          <button onClick={onCancel} className="text-ms-muted hover:text-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {action.type === "CASE_CREATED"        && <FormCaseCreated form={form} setForm={setForm} />}
          {action.type === "CASE_ROUTED"         && <FormCaseRouted form={form} setForm={setForm} />}
          {action.type === "KNOWLEDGE_SUGGESTED" && <FormKnowledgeSuggested form={form} setForm={setForm} />}
          {action.type === "RESPONSE_DRAFTED"    && <FormResponseDrafted form={form} setForm={setForm} emailDraft={action.emailDraft} />}
        </div>

        {/* Compliance notice */}
        <div className="mx-5 mb-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <AlertTriangle className="w-4 h-4 text-ms-amber shrink-0 mt-0.5" />
          <p className="text-xs text-gray-700">
            This override will be logged to the audit trail with your name and timestamp.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-ms-border">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-ms-border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!form.reason}
            className="px-4 py-2 text-sm font-semibold text-white bg-ms-orange rounded-lg hover:bg-ms-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm &amp; Log Override
          </button>
        </div>
      </div>
    </div>
  );
}
