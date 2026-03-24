import { CASE, AGENT_ACTIONS } from "../data/mockData";
import Breadcrumb from "../components/layout/Breadcrumb";
import Badge from "../components/shared/Badge";
import SentimentChip from "../components/shared/SentimentChip";
import CsatStar from "../components/shared/CsatStar";
import ChannelIcon from "../components/shared/ChannelIcon";
import AgentActivityPanel from "../components/agent/AgentActivityPanel";
import { Clock, User, Mail, Building2, History, MessageSquare } from "lucide-react";

function SlaChip({ status, deadline }) {
  const styles = {
    "on-track": "bg-green-50 text-ms-green border-green-200",
    "at-risk":  "bg-amber-50 text-ms-amber border-amber-200",
    "breached": "bg-red-50 text-ms-red border-red-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || styles["on-track"]}`}>
      <Clock className="w-3.5 h-3.5" />
      SLA: {status === "on-track" ? "On Track" : status === "at-risk" ? "At Risk" : "Breached"} — Due {deadline}
    </span>
  );
}

export default function CaseDetailView() {
  return (
    <div className="flex flex-col h-full bg-ms-surface">
      {/* Top breadcrumb bar */}
      <div className="bg-white border-b border-ms-border px-6 py-3">
        <Breadcrumb items={["Home", "My Work", CASE.id]} />
      </div>

      {/* Case header */}
      <div className="bg-white border-b border-ms-border px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge type="status">{CASE.id}</Badge>
              <h1 className="font-display font-bold text-gray-900 text-lg leading-snug">{CASE.title}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <ChannelIcon channel={CASE.channel} />
              <Badge type="priority">{CASE.priority}</Badge>
              <Badge type="status">{CASE.status}</Badge>
              <SentimentChip sentiment={CASE.sentiment} />
              <CsatStar score={CASE.csatPredicted} />
              <SlaChip status={CASE.slaStatus} deadline={CASE.slaDeadline} />
            </div>
          </div>
          <div className="text-right text-xs text-ms-muted shrink-0">
            <p>Queue: <span className="font-semibold text-gray-700">{CASE.queue}</span></p>
            <p className="mt-0.5">Rep: <span className="font-semibold text-gray-700">{CASE.assignedRep}</span></p>
            <p className="mt-0.5">Created: {CASE.createdAt}</p>
          </div>
        </div>
      </div>

      {/* Main content — 2 columns */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Case Information (55%) */}
        <div className="w-[55%] overflow-y-auto p-6 border-r border-ms-border">
          {/* Customer Info */}
          <section className="bg-white rounded-xl border border-ms-border p-4 mb-4">
            <h3 className="font-display font-semibold text-gray-900 text-sm mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4 text-ms-muted" />
                <span className="font-medium">{CASE.customer}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <History className="w-4 h-4 text-ms-muted" />
                <span>{CASE.caseHistory} prior cases</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 col-span-2">
                <Mail className="w-4 h-4 text-ms-muted" />
                <span>{CASE.customerEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 col-span-2">
                <Building2 className="w-4 h-4 text-ms-muted" />
                <span>{CASE.accountName}</span>
              </div>
            </div>
          </section>

          {/* Case Summary */}
          <section className="bg-white rounded-xl border border-ms-border p-4 mb-4">
            <h3 className="font-display font-semibold text-gray-900 text-sm mb-2">Case Summary</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{CASE.summary}</p>
          </section>

          {/* Conversation thread stub */}
          <section className="bg-white rounded-xl border border-ms-border p-4">
            <h3 className="font-display font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-ms-muted" />
              Conversation
            </h3>

            {/* Inbound email card */}
            <div className="border border-ms-border rounded-lg overflow-hidden mb-3">
              <div className="bg-ms-surface border-b border-ms-border px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-ms-blue/20 flex items-center justify-center text-xs font-semibold text-ms-blue">M</div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Maya Patel</p>
                    <p className="text-[10px] text-ms-muted">{CASE.customerEmail}</p>
                  </div>
                </div>
                <span className="text-xs text-ms-muted">Today, 09:01 AM</span>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  RE: Refund not processed — Order #ORD-88271
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Hi, I'm still waiting for my refund of $249.99 for order #ORD-88271 which I cancelled 8 days ago.
                  Your policy says 5 business days, and it's now been over a week. This is unacceptable — I've emailed
                  twice already. Can someone please look into this urgently?
                </p>
              </div>
            </div>

            <button className="text-xs text-ms-blue hover:underline font-medium">
              View full conversation (2 messages) →
            </button>
          </section>
        </div>

        {/* Right: Agent Activity Panel (45%) */}
        <div className="w-[45%] overflow-y-auto p-6">
          <AgentActivityPanel actions={AGENT_ACTIONS} />
        </div>
      </div>
    </div>
  );
}
