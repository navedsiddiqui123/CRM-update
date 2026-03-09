import {
  User, Building, Layers, Cpu, Eye, Mail, MapPin,
  Clock, Edit, Users, CheckCircle, DollarSign, TrendingUp,
  Target, Linkedin,
} from "lucide-react";
import ConfidenceBar from "./ConfidenceBar";
import SignalPill from "../shared/SignalPill";

const ICON_MAP = {
  user:         User,
  building:     Building,
  layers:       Layers,
  cpu:          Cpu,
  eye:          Eye,
  linkedin:     Linkedin,
  mail:         Mail,
  "map-pin":    MapPin,
  clock:        Clock,
  edit:         Edit,
  users:        Users,
  "check-circle": CheckCircle,
  "dollar-sign":  DollarSign,
  "trending-up":  TrendingUp,
  target:       Target,
};

function SignalCard({ signal }) {
  const Icon = ICON_MAP[signal.icon] || User;
  return (
    <div className="bg-ms-surface border border-ms-border rounded-lg p-3 flex flex-col gap-1.5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Icon size={14} className="text-ms-muted flex-shrink-0 mt-0.5" />
          <span className="text-xs font-semibold text-[#1a2332]">{signal.label}</span>
        </div>
        <SignalPill weight={signal.weight} />
      </div>
      <p className="text-xs text-ms-muted leading-relaxed">{signal.value}</p>
      {signal.delta && (
        <span className="self-start inline-flex items-center px-1.5 py-0.5 rounded bg-ms-lblue text-ms-blue text-[10px] font-bold">
          {signal.delta}
        </span>
      )}
    </div>
  );
}

function EmailPreview({ emailPreview }) {
  return (
    <div className="mb-4 border border-ms-border rounded-lg overflow-hidden">
      <div className="bg-[#F0F4F8] px-3 py-2 border-b border-ms-border">
        <p className="text-xs text-ms-muted"><span className="font-semibold">To:</span> {emailPreview.to}</p>
        <p className="text-xs text-ms-muted mt-0.5"><span className="font-semibold">Subject:</span> {emailPreview.subject}</p>
      </div>
      <div className="p-3 bg-white max-h-36 overflow-y-auto">
        <pre className="text-xs text-[#1a2332] font-sans whitespace-pre-wrap leading-relaxed">{emailPreview.body}</pre>
      </div>
      <div className="px-3 py-2 border-t border-ms-border bg-[#F0F4F8]">
        <p className="text-[10px] text-ms-muted font-semibold mb-1 uppercase tracking-wide">Personalisation tokens used</p>
        <div className="flex flex-wrap gap-1">
          {emailPreview.personalisationTokens.map((t) => (
            <span key={t} className="px-1.5 py-0.5 bg-ms-teal/10 text-ms-teal text-[10px] rounded font-medium border border-ms-teal/20">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RationaleDrawer({ rationale, emailPreview, isOpen }) {
  return (
    <div className={isOpen ? "rationale-open" : "rationale-closed"}>
      <div className="mt-3 pt-3 border-t border-ms-border">
        {/* Headline */}
        <p className="text-sm font-semibold text-[#1a2332] mb-3">{rationale.headline}</p>

        {/* Confidence bar */}
        <ConfidenceBar confidence={rationale.confidence} />

        {/* Email preview for EMAIL_SENT */}
        {emailPreview && <EmailPreview emailPreview={emailPreview} />}

        {/* Signals grid */}
        <div className="mb-3">
          <p className="text-[10px] font-semibold text-ms-muted uppercase tracking-wide mb-2">
            ICP Signals
            <span className="ml-2 inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
              SPEC: ICP signals weighted HIGH / MEDIUM / LOW — seller can verify each claim
            </span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {rationale.signals.map((signal, i) => (
              <SignalCard key={i} signal={signal} />
            ))}
          </div>
        </div>

        {/* Data sources */}
        <div className="mb-3">
          <p className="text-[10px] font-semibold text-ms-muted uppercase tracking-wide mb-1.5">Data sources used:</p>
          <div className="flex flex-wrap gap-1.5">
            {rationale.dataSources.map((src) => (
              <span key={src} className="px-2 py-0.5 bg-[#F0F4F8] text-ms-muted text-[11px] rounded-full border border-ms-border">
                {src}
              </span>
            ))}
          </div>
          <div className="mt-1">
            <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
              SPEC: Full provenance — every signal is traceable to a named data source
            </span>
          </div>
        </div>

        {/* Model note */}
        <p className="text-[11px] text-ms-muted italic leading-relaxed border-t border-ms-border pt-2">
          {rationale.modelNote}
        </p>
      </div>
    </div>
  );
}
