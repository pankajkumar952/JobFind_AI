// ============================================================
// JobFind AI — Skill Analytics Page
// Radar charts, heatmap, demand growth, rankings
// ============================================================
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
  ResponsiveContainer, Legend,
} from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ChartCard from "@/components/ui/ChartCard";
import { skillAnalytics, topSkills } from "@/data/mockData";
import { TrendingUp, Zap } from "lucide-react";

const TOOLTIP_STYLE = {
  contentStyle: { background: "rgba(15,18,30,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white", fontSize: "12px" },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const HEAT_COLORS = [
  "rgba(217, 119, 6, 0.1)", "rgba(217, 119, 6, 0.2)", "rgba(217, 119, 6, 0.35)",
  "rgba(217, 119, 6, 0.5)", "rgba(148, 163, 184, 0.5)", "rgba(148, 163, 184, 0.7)",
];

function getHeatColor(value: number) {
  if (value < 35) return HEAT_COLORS[0];
  if (value < 50) return HEAT_COLORS[1];
  if (value < 60) return HEAT_COLORS[2];
  if (value < 70) return HEAT_COLORS[3];
  if (value < 80) return HEAT_COLORS[4];
  return HEAT_COLORS[5];
}

export default function SkillAnalytics() {
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-[1400px]">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-bold text-white">Skill Analytics</h1>
          <p className="text-sm text-white/40 mt-0.5">Demand trends, growth rates, and category breakdowns</p>
        </motion.div>

        {/* Top skill cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {topSkills.slice(0, 5).map((skill, i) => (
            <motion.div
              key={skill.skill}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className="glass-card glass-card-hover p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-white/40">{skill.category}</span>
                <div className="flex items-center gap-1 text-xs text-emerald-400">
                  <TrendingUp className="w-3 h-3" />
                  +{skill.growth}%
                </div>
              </div>
              <p className="text-lg font-bold text-white">{skill.skill}</p>
              <p className="text-xs text-white/40 font-mono mt-0.5">{skill.demand.toLocaleString()} jobs</p>
            </motion.div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Radar Chart */}
          <ChartCard title="Skill Category Demand" subtitle="Current vs 6 months ago" delay={0.2}>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={skillAnalytics.radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 9 }} />
                <Radar name="Current" dataKey="A" stroke="#d97706" fill="#d97706" fillOpacity={0.25} strokeWidth={2} />
                <Radar name="6 Months Ago" dataKey="B" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.15} strokeWidth={2} strokeDasharray="4 2" />
                <Legend wrapperStyle={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }} />
                <Tooltip {...TOOLTIP_STYLE} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Growth Rate Bar Chart */}
          <ChartCard title="Fastest Growing Skills" subtitle="Year-over-year demand growth %" delay={0.25}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={skillAnalytics.growthData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="skill" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} width={75} />
                <Tooltip {...TOOLTIP_STYLE} formatter={(v: number) => [`+${v}%`, "YoY Growth"]} />
                <Bar dataKey="growth" radius={[0, 4, 4, 0]} animationDuration={800}>
                  {skillAnalytics.growthData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Heatmap */}
        <ChartCard title="Skill Demand Heatmap" subtitle="Monthly demand intensity (Jan–Jun 2024)" delay={0.3}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-xs text-white/40 font-medium pb-2 pr-4 w-24">Skill</th>
                  {MONTHS.map((m) => (
                    <th key={m} className="text-center text-xs text-white/40 font-medium pb-2 px-2">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {skillAnalytics.heatmapData.map((row, i) => (
                  <motion.tr
                    key={row.skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <td className="text-sm font-medium text-white/70 pr-4 py-1.5">{row.skill}</td>
                    {MONTHS.map((m, j) => {
                      const key = m.toLowerCase() as keyof typeof row;
                      const val = row[key] as number;
                      return (
                        <td key={m} className="px-2 py-1.5 text-center">
                          <div
                            className="w-full h-8 rounded flex items-center justify-center text-xs font-mono transition-all hover:scale-105 cursor-default"
                            style={{ background: getHeatColor(val), color: val > 60 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)" }}
                            title={`${row.skill} in ${m}: ${val}`}
                          >
                            {val}
                          </div>
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center gap-2 mt-4 justify-end">
              <span className="text-xs text-white/30">Low</span>
              {HEAT_COLORS.map((c, i) => (
                <div key={i} className="w-6 h-4 rounded" style={{ background: c }} />
              ))}
              <span className="text-xs text-white/30">High</span>
            </div>
          </div>
        </ChartCard>

        {/* Skill Rankings Table */}
        <ChartCard title="Full Skill Rankings" subtitle="All tracked technologies by demand" delay={0.35}>
          <div className="space-y-2">
            {topSkills.map((skill, i) => (
              <motion.div
                key={skill.skill}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.04 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/3 transition-colors"
              >
                <span className="text-xs font-mono text-white/30 w-5 text-right flex-shrink-0">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white/80">{skill.skill}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white/40 font-mono">{skill.demand.toLocaleString()}</span>
                      <span className="text-xs text-emerald-400 flex items-center gap-0.5">
                        <Zap className="w-3 h-3" />+{skill.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(skill.demand / 54200) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.04 }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, #d97706, #94a3b8)` }}
                    />
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full text-white/50 bg-white/5 flex-shrink-0">{skill.category}</span>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
}
