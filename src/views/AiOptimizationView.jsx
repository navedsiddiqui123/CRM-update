import { AGENT_KPI, ACTION_TYPE_META, ACTION_BREAKDOWN, OVERRIDE_REASONS } from "../data/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";
import { Brain, BookOpen, TrendingUp, RotateCcw, CheckCircle, Zap, Target } from "lucide-react";

function StatRow({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-ms-border last:border-0">
      <span className="text-xs text-ms-muted">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-ms-teal" : "text-gray-800"}`}>{value}</span>
    </div>
  );
}

function AgentCard({ icon: Icon, name, color, children }) {
  return (
    <div className="bg-white rounded-xl border border-ms-border p-5 flex-1">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${color}18` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div>
          <h3 className="font-display font-semibold text-gray-900 text-sm">{name}</h3>
          <span className="text-[10px] text-ms-muted">Active</span>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function AiOptimizationView() {
  const cma = AGENT_KPI.caseManagementAgent;
  const ka = AGENT_KPI.knowledgeAgent;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-gray-900">AI Optimization Hub</h1>
        <p className="text-ms-muted text-sm mt-1">Agent performance, trust metrics, and action-level analytics</p>
      </div>

      {/* Two agent cards */}
      <div className="flex gap-4 mb-6">
        {/* Case Management Agent */}
        <AgentCard icon={Brain} name={cma.name} color="#0078D4">
          <StatRow label="Cases handled"       value={cma.casesHandled.toLocaleString()} />
          <StatRow label="Auto-resolution rate" value={cma.autoResolutionRate} highlight />
          <StatRow label="Avg confidence"       value={`${cma.avgConfidence}%`} />
          <StatRow label="Override rate"        value={cma.overrideRate} />
          <StatRow label="CSAT impact"          value={cma.csatImpact} highlight />
          <StatRow label="Intent accuracy"      value={cma.intentAccuracy} />
          <div className="mt-3 pt-3 border-t border-ms-border">
            <p className="text-xs text-ms-muted mb-1.5">Top action type</p>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: ACTION_TYPE_META.CASE_CREATED.bg,
                color: ACTION_TYPE_META.CASE_CREATED.color,
                border: `1px solid ${ACTION_TYPE_META.CASE_CREATED.color}40`,
              }}
            >
              {ACTION_TYPE_META.CASE_CREATED.label}
            </span>
          </div>
        </AgentCard>

        {/* Knowledge Agent */}
        <AgentCard icon={BookOpen} name={ka.name} color="#6B52A0">
          <StatRow label="Articles created"   value={ka.articlesCreated} />
          <StatRow label="Articles suggested" value={ka.articlesSuggested.toLocaleString()} />
          <StatRow label="Helpful rate"       value={ka.helpfulRate} highlight />
          <StatRow label="Avg relevance"      value={ka.avgRelevance} />
          <StatRow label="CSAT impact"        value={ka.csatImpact} highlight />
        </AgentCard>
      </div>

      {/* Action Breakdown BarChart */}
      <div className="bg-white rounded-xl border border-ms-border p-5 mb-6">
        <h2 className="font-display font-semibold text-gray-900 text-base mb-1">Action Volume by Type</h2>
        <p className="text-xs text-ms-muted mb-4">Last 4 weeks · Case Management Agent</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={ACTION_BREAKDOWN} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E1E8EF" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#5A6472" }} />
            <YAxis tick={{ fontSize: 11, fill: "#5A6472" }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E1E8EF" }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="CASE_CREATED"        name="Case Created"          fill={ACTION_TYPE_META.CASE_CREATED.color}        radius={[2,2,0,0]} />
            <Bar dataKey="CASE_ROUTED"         name="Case Routed"           fill={ACTION_TYPE_META.CASE_ROUTED.color}         radius={[2,2,0,0]} />
            <Bar dataKey="KNOWLEDGE_SUGGESTED" name="Knowledge Suggested"   fill={ACTION_TYPE_META.KNOWLEDGE_SUGGESTED.color} radius={[2,2,0,0]} />
            <Bar dataKey="RESPONSE_DRAFTED"    name="Response Drafted"      fill={ACTION_TYPE_META.RESPONSE_DRAFTED.color}    radius={[2,2,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Override Reasons Table */}
      <div className="bg-white rounded-xl border border-ms-border overflow-hidden">
        <div className="px-5 py-4 border-b border-ms-border flex items-start justify-between">
          <div>
            <h2 className="font-display font-semibold text-gray-900 text-base">Top Override Reasons</h2>
            <p className="text-xs text-ms-muted mt-0.5">Last 30 days · All reps</p>
          </div>
          {/* Spec annotation */}
          <div className="bg-ms-teal/10 border border-ms-teal/30 rounded-lg px-3 py-2 max-w-xs text-right">
            <p className="text-[10px] text-ms-teal font-semibold flex items-center gap-1 justify-end mb-0.5">
              <Zap className="w-3 h-3" /> Training Loop
            </p>
            <p className="text-[10px] text-ms-muted leading-relaxed">
              Override reasons feed back to agent training via supervised fine-tuning pipeline.
            </p>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ms-surface text-left">
              <th className="px-5 py-3 text-xs font-semibold text-ms-muted">#</th>
              <th className="px-5 py-3 text-xs font-semibold text-ms-muted">Override Reason</th>
              <th className="px-5 py-3 text-xs font-semibold text-ms-muted">Count</th>
              <th className="px-5 py-3 text-xs font-semibold text-ms-muted">Training Signal</th>
            </tr>
          </thead>
          <tbody>
            {OVERRIDE_REASONS.map((row, i) => (
              <tr key={i} className="border-t border-ms-border hover:bg-ms-surface transition-colors">
                <td className="px-5 py-3 text-ms-muted text-xs">{i + 1}</td>
                <td className="px-5 py-3 font-medium text-gray-800">{row.reason}</td>
                <td className="px-5 py-3">
                  <span className="font-semibold text-gray-900">{row.overrides}</span>
                  <span className="text-ms-muted text-xs ml-1">overrides</span>
                </td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-teal-50 text-ms-teal border border-teal-200 px-2 py-0.5 rounded">
                    <CheckCircle className="w-3 h-3" /> Queued for fine-tuning
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
