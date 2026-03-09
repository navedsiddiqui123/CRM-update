import { Mail, Phone, Linkedin, Building, Users, DollarSign, Calendar, Clock, TrendingUp } from "lucide-react";
import { LEAD, AGENT_ACTIONS } from "../data/mockData";
import Breadcrumb from "../components/layout/Breadcrumb";
import ScoreMeter from "../components/shared/ScoreMeter";
import AgentActivityPanel from "../components/agent/AgentActivityPanel";

function Field({ label, value, children }) {
  return (
    <div>
      <p className="text-[10px] text-ms-muted uppercase tracking-wide font-semibold mb-0.5">{label}</p>
      {children || <p className="text-sm text-[#1a2332] font-medium">{value}</p>}
    </div>
  );
}

export default function LeadDetailView() {
  const lead = LEAD;
  const delta = lead.score - lead.previousScore;

  return (
    <div className="p-6 max-w-[1400px]">
      <Breadcrumb items={[{ label: "Leads", path: "/lead" }, { label: lead.name }]} />

      {/* Lead Header */}
      <div className="flex items-start gap-5 mb-6 pb-5 border-b border-ms-border">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-ms-blue to-ms-dark flex items-center justify-center text-white font-display font-bold text-xl flex-shrink-0">
          {lead.name.split(" ").map((n) => n[0]).join("")}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display font-bold text-2xl text-[#1a2332]">{lead.name}</h1>
            {/* Status pill */}
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-ms-green/10 text-ms-green border border-ms-green/20">
              {lead.status}
            </span>
            {/* Score delta */}
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-ms-green/10 text-ms-green border border-ms-green/20">
              <TrendingUp size={12} />
              ↑ {delta} pts (AI)
            </span>
          </div>
          <p className="text-sm text-ms-muted mt-0.5">{lead.title} &bull; {lead.company}</p>
          <p className="text-xs text-ms-muted mt-1">{lead.industry}</p>
        </div>

        {/* Score meter */}
        <div className="flex flex-col items-center gap-1">
          <ScoreMeter score={lead.score} size={80} />
          <span className="text-xs text-ms-muted font-medium">Qualification Score</span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6" style={{ minHeight: "calc(100vh - 280px)" }}>
        {/* Left column — 60% */}
        <div className="flex-[3] min-w-0">
          <div className="bg-white border border-ms-border rounded-xl p-5">
            <h2 className="font-display font-bold text-sm text-[#1a2332] mb-4 uppercase tracking-wide text-ms-muted">
              Lead Information
            </h2>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <Field label="Company">
                <div className="flex items-center gap-1.5">
                  <Building size={13} className="text-ms-muted" />
                  <span className="text-sm font-medium text-[#1a2332]">{lead.company}</span>
                </div>
              </Field>

              <Field label="Industry" value={lead.industry} />

              <Field label="Title" value={lead.title} />

              <Field label="Email">
                <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-sm text-ms-blue font-medium hover:text-ms-dark transition-colors">
                  <Mail size={13} />
                  {lead.email}
                </a>
              </Field>

              <Field label="Phone">
                <div className="flex items-center gap-1.5">
                  <Phone size={13} className="text-ms-muted" />
                  <span className="text-sm font-medium text-[#1a2332]">{lead.phone}</span>
                </div>
              </Field>

              <Field label="LinkedIn">
                <a href="#" className="flex items-center gap-1.5 text-sm text-ms-blue font-medium hover:text-ms-dark transition-colors">
                  <Linkedin size={13} />
                  {lead.linkedIn}
                </a>
              </Field>

              <Field label="Annual Revenue" value={lead.annualRevenue} />

              <Field label="Company Size">
                <div className="flex items-center gap-1.5">
                  <Users size={13} className="text-ms-muted" />
                  <span className="text-sm font-medium text-[#1a2332]">{lead.companySize.toLocaleString()} employees</span>
                </div>
              </Field>

              <Field label="Tech Stack">
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                  {lead.techStack.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-ms-lblue text-ms-blue text-xs rounded-full font-medium border border-ms-blue/20">
                      {t}
                    </span>
                  ))}
                </div>
              </Field>

              <Field label="Assigned Rep" value={lead.assignedRep} />

              <Field label="Created Date">
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-ms-muted" />
                  <span className="text-sm font-medium text-[#1a2332]">{lead.createdDate}</span>
                </div>
              </Field>

              <Field label="Last Activity">
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-ms-muted" />
                  <span className="text-sm font-medium text-[#1a2332]">{lead.lastActivity}</span>
                </div>
              </Field>
            </div>
          </div>
        </div>

        {/* Right column — 40% — Agent Activity Panel */}
        <div className="flex-[2] min-w-0">
          <AgentActivityPanel actions={AGENT_ACTIONS} />
        </div>
      </div>
    </div>
  );
}
