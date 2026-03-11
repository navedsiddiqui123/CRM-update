import { TrendingUp, Tag, DollarSign, Frown, Clock, Repeat, GitBranch, User, Calendar, BarChart2, History, Search, ThumbsUp, Zap, FileText, MessageCircle, Edit, Shield } from "lucide-react";
import KnowledgePreview from "./KnowledgePreview";

const ICON_MAP = {
  "tag": Tag,
  "dollar-sign": DollarSign,
  "frown": Frown,
  "clock": Clock,
  "repeat": Repeat,
  "git-branch": GitBranch,
  "user": User,
  "calendar": Calendar,
  "trending-up": TrendingUp,
  "history": History,
  "search": Search,
  "thumbs-up": ThumbsUp,
  "zap": Zap,
  "file-text": FileText,
  "message-circle": MessageCircle,
  "edit": Edit,
  "shield": Shield,
  "bar-chart-2": BarChart2,
};

const WEIGHT_STYLES = {
  high:   "bg-red-100 text-ms-red border border-red-200",
  medium: "bg-amber-50 text-ms-amber border border-amber-200",
  low:    "bg-gray-100 text-gray-500 border border-gray-200",
};

function ConfidenceBar({ confidence }) {
  const color = confidence >= 85 ? "#107C10" : confidence >= 70 ? "#C79B00" : "#A4262C";
  const label = confidence >= 85 ? "High confidence" : confidence >= 70 ? "Medium confidence" : "Low — human review recommended";

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-gray-700">
          Agent Confidence
          {/* Spec annotation */}
          <span className="ml-2 text-[10px] bg-ms-purple/10 text-ms-purple px-1.5 py-0.5 rounded border border-ms-purple/20 font-normal">
            Spec: Agent model confidence — rep uses this to calibrate trust. &lt;70% = human review recommended.
          </span>
        </span>
        <span className="text-sm font-bold" style={{ color }}>{confidence}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${confidence}%`,
            background: `linear-gradient(to right, #A4262C, #C79B00, #107C10)`,
            clipPath: `inset(0 ${100 - confidence}% 0 0)`,
          }}
        />
      </div>
      <p className="text-xs text-ms-muted mt-1">{label}</p>
    </div>
  );
}

function CsatContextCard({ text }) {
  return (
    <div className="border border-ms-teal/40 rounded-lg bg-teal-50/50 p-3 mb-4">
      <div className="flex items-center gap-1.5 mb-1">
        <TrendingUp className="w-4 h-4 text-ms-teal" />
        <span className="text-xs font-semibold text-ms-teal">CSAT Impact</span>
        {/* Spec annotation */}
        <span className="text-[10px] bg-ms-teal/10 text-ms-teal px-1.5 py-0.5 rounded border border-ms-teal/20 font-normal ml-1">
          NEW vs Sales version — ties every action to CSAT outcome
        </span>
      </div>
      <p className="text-xs text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}

function SignalCard({ signal }) {
  const Icon = ICON_MAP[signal.icon] || Tag;
  const weightCls = WEIGHT_STYLES[signal.weight] || WEIGHT_STYLES.low;

  return (
    <div className="bg-white border border-ms-border rounded-lg p-3">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-ms-muted shrink-0" />
          <span className="text-xs font-semibold text-gray-800">{signal.label}</span>
        </div>
        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border shrink-0 ${weightCls}`}>
          {signal.weight}
        </span>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed">{signal.value}</p>
    </div>
  );
}

function EmailDraftPreview({ draft }) {
  return (
    <div className="border border-ms-border rounded-lg bg-white p-3 mb-4">
      <p className="text-xs font-semibold text-gray-700 mb-2">Agent Draft (read-only)</p>
      <div className="text-xs text-ms-muted space-y-0.5 mb-2">
        <p><span className="font-medium">To:</span> {draft.to}</p>
        <p><span className="font-medium">Subject:</span> {draft.subject}</p>
      </div>
      <div className="bg-gray-50 border border-ms-border rounded p-2 max-h-24 overflow-y-auto">
        <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{draft.body}</p>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {draft.tokens.map(t => (
          <span key={t} className="text-[10px] bg-ms-lblue text-ms-blue px-1.5 py-0.5 rounded border border-blue-200">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RationaleDrawer({ action }) {
  const { rationale, type, knowledgeArticle, emailDraft } = action;

  return (
    <div className="pt-3 border-t border-ms-border">
      {/* Headline */}
      <p className="text-sm font-semibold text-gray-800 mb-3 leading-snug">
        {rationale.headline}
      </p>

      {/* Confidence bar */}
      <ConfidenceBar confidence={rationale.confidence} />

      {/* CSAT Context card — appears in every drawer */}
      <CsatContextCard text={rationale.csatContext} />

      {/* Knowledge preview (only for KNOWLEDGE_SUGGESTED) */}
      {type === "KNOWLEDGE_SUGGESTED" && knowledgeArticle && (
        <KnowledgePreview article={knowledgeArticle} />
      )}

      {/* Email draft preview (only for RESPONSE_DRAFTED) */}
      {type === "RESPONSE_DRAFTED" && emailDraft && (
        <EmailDraftPreview draft={emailDraft} />
      )}

      {/* Signals grid */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-700 mb-2">Decision Signals</p>
        <div className="grid grid-cols-1 gap-2">
          {rationale.signals.map((s, i) => (
            <SignalCard key={i} signal={s} />
          ))}
        </div>
      </div>

      {/* Data sources strip */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-700 mb-1.5">Data Sources</p>
        <div className="flex flex-wrap gap-1.5">
          {rationale.dataSources.map(src => (
            <span key={src} className="text-[10px] bg-ms-surface border border-ms-border text-ms-muted px-2 py-0.5 rounded">
              {src}
            </span>
          ))}
        </div>
      </div>

      {/* Model note */}
      <p className="text-[11px] text-ms-muted italic leading-relaxed border-t border-ms-border pt-3">
        {rationale.modelNote}
      </p>
    </div>
  );
}
