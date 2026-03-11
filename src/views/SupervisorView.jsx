import { TEAM_DATA, CSAT_TREND } from "../data/mockData";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ReferenceLine, ResponsiveContainer,
} from "recharts";
import { Users, TrendingUp, Award, Target, Calendar, AlertTriangle } from "lucide-react";

function KpiCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white rounded-xl border border-ms-border p-4">
      <div className="flex items-start justify-between mb-2">
        <p className="text-xs font-medium text-ms-muted">{label}</p>
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}18` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-display font-bold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-ms-muted mt-1">{sub}</p>}
    </div>
  );
}

function TrustBar({ score }) {
  const color = score >= 85 ? "#107C10" : score >= 70 ? "#C79B00" : "#A4262C";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-semibold w-10 text-right" style={{ color }}>{score}%</span>
    </div>
  );
}

const CustomDot = ({ cx, cy, payload }) => {
  if (payload.withExplain === null) return null;
  return <circle cx={cx} cy={cy} r={4} fill="#00B294" stroke="white" strokeWidth={2} />;
};

export default function SupervisorView() {
  const sortedTeam = [...TEAM_DATA].sort((a, b) => b.trustScore - a.trustScore);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-gray-900">
          Team Performance — AI Agent Trust &amp; CSAT
        </h1>
        <p className="text-ms-muted text-sm mt-1">
          Week of Mar 3–8, 2026 · Contact Centre West · 5 reps
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={Award}     label="Team Avg CSAT"    value="4.0 / 5.0" sub="↑ +0.3 vs prior period" color="#107C10" />
        <KpiCard icon={TrendingUp} label="Override Rate"   value="9.9%"      sub="Target: <15%"            color="#C79B00" />
        <KpiCard icon={Target}    label="AI Trust Score"   value="84%"        sub="Target: >80% ✓"          color="#0078D4" />
        <KpiCard icon={Users}     label="FCR Rate"         value="71%"        sub="Target: +8% in 90 days"  color="#6B52A0" />
      </div>

      {/* CSAT Trend Chart */}
      <div className="bg-white rounded-xl border border-ms-border p-5 mb-6">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="font-display font-semibold text-gray-900 text-base">CSAT Trend — With vs Without Explainability</h2>
            <p className="text-xs text-ms-muted mt-0.5">8-week view · Contact Centre West</p>
          </div>
          {/* Spec annotation */}
          <span className="text-[10px] bg-ms-purple/10 text-ms-purple px-2 py-1 rounded border border-ms-purple/20 max-w-xs text-right leading-relaxed">
            Headline ROI: CSAT improvement after explainability feature enabled (Feb 10). This is the adoption story.
          </span>
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={CSAT_TREND} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E1E8EF" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#5A6472" }} />
            <YAxis domain={[3.3, 4.5]} tick={{ fontSize: 11, fill: "#5A6472" }} tickFormatter={v => v.toFixed(1)} />
            <Tooltip
              formatter={(value, name) => [value ? value.toFixed(1) : "—", name]}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E1E8EF" }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <ReferenceLine
              x="Feb 10"
              stroke="#C79B00"
              strokeDasharray="4 4"
              label={{ value: "Explainability enabled", position: "top", fontSize: 10, fill: "#C79B00" }}
            />
            <Line
              type="monotone"
              dataKey="withoutExplain"
              name="Without Explainability"
              stroke="#5A6472"
              strokeWidth={2}
              dot={false}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="withExplain"
              name="With Explainability"
              stroke="#00B294"
              strokeWidth={2.5}
              dot={<CustomDot />}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Team table */}
      <div className="bg-white rounded-xl border border-ms-border overflow-hidden mb-4">
        <div className="px-5 py-4 border-b border-ms-border flex items-center justify-between">
          <h2 className="font-display font-semibold text-gray-900 text-base">Team Trust Scores</h2>
          <span className="text-xs text-ms-muted">Sorted by Trust Score ↓</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-ms-surface text-left">
                {["Rep", "Cases", "Agent Actions", "Overrides", "Override Rate", "CSAT Avg", "Trust Score", "FCR"].map(col => (
                  <th key={col} className="px-4 py-3 text-xs font-semibold text-ms-muted">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedTeam.map((rep) => {
                const isAnita = rep.rep === "Anita Sharma";
                return (
                  <tr
                    key={rep.rep}
                    className={`border-t border-ms-border transition-colors ${isAnita ? "bg-amber-50/50" : "hover:bg-ms-surface"}`}
                    title={isAnita ? "High override rate detected — coaching opportunity" : ""}
                  >
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      <div className="flex items-center gap-2">
                        {rep.rep}
                        {isAnita && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-ms-orange/10 text-ms-orange border border-ms-orange/20 px-1.5 py-0.5 rounded font-semibold">
                            <AlertTriangle className="w-3 h-3" /> Coaching
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{rep.cases}</td>
                    <td className="px-4 py-3 text-gray-700">{rep.agentActions}</td>
                    <td className="px-4 py-3 text-gray-700">{rep.overrides}</td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${
                        parseFloat(rep.overrideRate) > 15 ? "text-ms-red" :
                        parseFloat(rep.overrideRate) > 10 ? "text-ms-amber" : "text-ms-green"
                      }`}>
                        {rep.overrideRate}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{rep.csat.toFixed(1)}</td>
                    <td className="px-4 py-3 min-w-[140px]">
                      <TrustBar score={rep.trustScore} />
                    </td>
                    <td className="px-4 py-3 text-gray-700">{rep.fcr}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coaching Alert */}
      <div className="bg-orange-50 border-l-4 border-ms-orange rounded-r-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-ms-orange shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-display font-semibold text-gray-900 text-sm mb-1 flex items-center gap-2">
              Coaching Opportunity Detected
              {/* Spec annotation */}
              <span className="text-[10px] bg-ms-purple/10 text-ms-purple px-1.5 py-0.5 rounded border border-ms-purple/20 font-normal">
                High override rate = leading indicator of rep–agent misalignment. Surfaces before CSAT drops.
              </span>
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              Anita Sharma's override rate (28.9%) is 3x the team average. Most overrides are on CASE_ROUTED
              actions. Consider reviewing routing logic understanding or confidence in the intent model.
            </p>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-ms-orange text-ms-orange text-sm font-semibold rounded-lg hover:bg-ms-orange hover:text-white transition-colors">
              <Calendar className="w-4 h-4" />
              Schedule coaching session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
