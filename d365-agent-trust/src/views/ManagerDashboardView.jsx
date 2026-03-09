import { TEAM_ACTIONS_SUMMARY } from "../data/mockData";
import Breadcrumb from "../components/layout/Breadcrumb";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Users, Zap, AlertTriangle, TrendingUp, ChevronDown } from "lucide-react";

const KPI_CARDS = [
  { label: "Total Agent Actions This Week", value: "612", icon: Zap, color: "#0078D4", bg: "#EBF3FB" },
  { label: "Avg Team Trust Score",           value: "86%",  icon: Users, color: "#107C10", bg: "#E6F2E6" },
  { label: "Override Rate",                  value: "8.2%", icon: AlertTriangle, color: "#D83B01", bg: "#FEF0EB" },
  { label: "Agent-Assisted Conversions",     value: "+34%", icon: TrendingUp, color: "#00B294", bg: "#E6F5F2" },
];

function TrustBar({ score }) {
  const color = score >= 90 ? "#107C10" : score >= 75 ? "#FFB900" : "#D83B01";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-ms-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-semibold w-8 text-right" style={{ color }}>{score}</span>
    </div>
  );
}

// Chart data
const chartData = TEAM_ACTIONS_SUMMARY.map((rep) => ({
  name: rep.rep.split(" ")[0],
  "Lead Scored": Math.round(rep.agentActions * 0.3),
  "Email Sent": Math.round(rep.agentActions * 0.25),
  "Status Changed": Math.round(rep.agentActions * 0.2),
  "Research Done": Math.round(rep.agentActions * 0.25),
}));

export default function ManagerDashboardView() {
  const sorted = [...TEAM_ACTIONS_SUMMARY].sort((a, b) => b.trustScore - a.trustScore);

  return (
    <div className="p-6 max-w-[1400px]">
      <Breadcrumb items={[{ label: "Manager Dashboard" }]} />

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-[#1a2332]">Agent Activity — Team Overview</h1>
          <p className="text-sm text-ms-muted mt-1">Week of Mar 3–8, 2026 &bull; West Region &bull; 5 reps</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Visual-only filters */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-ms-border rounded-lg bg-white text-ms-muted hover:border-ms-blue transition-colors cursor-pointer">
            Mar 3–8, 2026 <ChevronDown size={13} />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-ms-border rounded-lg bg-white text-ms-muted hover:border-ms-blue transition-colors cursor-pointer">
            All Reps <ChevronDown size={13} />
          </button>
        </div>
      </div>

      {/* Spec annotation */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 px-2 py-1 rounded text-[11px] font-medium">
          SPEC: NEW view — aggregate agent actions + trust scores across team
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {KPI_CARDS.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white border border-ms-border rounded-xl overflow-hidden shadow-sm">
            <div className="h-1" style={{ backgroundColor: color }} />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display font-bold text-2xl text-[#1a2332]">{value}</p>
                  <p className="text-xs text-ms-muted mt-1 leading-snug">{label}</p>
                </div>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                  <Icon size={16} style={{ color }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two column: table + chart */}
      <div className="grid grid-cols-5 gap-6">
        {/* Team table — 3/5 */}
        <div className="col-span-3 bg-white border border-ms-border rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-ms-border">
            <h2 className="font-display font-bold text-sm text-[#1a2332]">Rep Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ms-surface border-b border-ms-border">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-ms-muted uppercase tracking-wide">Rep</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-ms-muted uppercase tracking-wide">Leads</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-ms-muted uppercase tracking-wide">Agent Actions</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-ms-muted uppercase tracking-wide">Overrides</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-ms-muted uppercase tracking-wide">Conv. Rate</th>
                  <th className="px-4 py-3 text-xs font-semibold text-ms-muted uppercase tracking-wide" style={{ minWidth: 120 }}>Trust Score</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((row) => {
                  const highOverride = row.overrides > 10;
                  return (
                    <tr
                      key={row.rep}
                      className={`border-b border-ms-border last:border-0 transition-colors ${
                        highOverride ? "bg-amber-50/70" : "hover:bg-ms-surface"
                      }`}
                    >
                      <td className="px-5 py-3 font-semibold text-[#1a2332]">{row.rep}</td>
                      <td className="px-4 py-3 text-right text-ms-muted">{row.leads}</td>
                      <td className="px-4 py-3 text-right text-ms-muted">{row.agentActions}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`font-semibold ${highOverride ? "text-amber-600" : "text-ms-muted"}`}>
                          {row.overrides}
                          {highOverride && " ⚠"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-ms-green">{row.conversionRate}</td>
                      <td className="px-4 py-3">
                        <TrustBar score={row.trustScore} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Volume Chart — 2/5 */}
        <div className="col-span-2 bg-white border border-ms-border rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-ms-border">
            <h2 className="font-display font-bold text-sm text-[#1a2332]">Action Volume by Rep</h2>
          </div>
          <div className="p-4" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E1E8EF" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#5A6472" }} />
                <YAxis tick={{ fontSize: 11, fill: "#5A6472" }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E1E8EF" }}
                  cursor={{ fill: "#F8FAFC" }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Lead Scored"     stackId="a" fill="#0078D4" radius={[0,0,0,0]} />
                <Bar dataKey="Email Sent"      stackId="a" fill="#00B294" />
                <Bar dataKey="Status Changed"  stackId="a" fill="#FFB900" />
                <Bar dataKey="Research Done"   stackId="a" fill="#8764B8" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
