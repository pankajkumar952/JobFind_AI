// ============================================================
// JobFind AI — Company Insights Page
// ============================================================
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Cell, ResponsiveContainer,
} from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ChartCard from "@/components/ui/ChartCard";
import { companyInsights } from "@/data/mockData";
import { TrendingUp, TrendingDown, Star, MapPin, Briefcase, DollarSign, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const TOOLTIP_STYLE = {
  contentStyle: { background: "rgba(15,18,30,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white", fontSize: "12px" },
};

export default function CompanyInsights() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  const filtered = companyInsights.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const salaryChartData = companyInsights.map((c) => ({
    name: c.name,
    salary: c.avgSalary,
    color: c.color,
  }));

  const openPositionsData = companyInsights.map((c) => ({
    name: c.name,
    positions: c.openPositions,
    color: c.color,
  }));

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-[1400px]">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-bold text-white">Company Insights</h1>
          <p className="text-sm text-white/40 mt-0.5">Salary benchmarks, hiring trends, and growth analysis</p>
        </motion.div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white/5 border border-white/8 rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:border-amber-500/50 transition-all"
          />
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelected(selected === company.id ? null : company.id)}
              className={cn(
                "glass-card glass-card-hover p-5 cursor-pointer transition-all",
                selected === company.id && "border-amber-500/40"
              )}
              style={selected === company.id ? { boxShadow: "0 0 30px rgba(217, 119, 6, 0.2)" } : {}}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ background: `${company.color}20`, border: `1px solid ${company.color}40`, color: company.color === "#ffffff" || company.color === "#24292e" ? "#e2e8f0" : company.color }}
                  >
                    {company.logo}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{company.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-white/50">{company.rating}</span>
                    </div>
                  </div>
                </div>
                <div className={cn("flex items-center gap-1 text-xs font-medium", company.growth >= 0 ? "text-emerald-400" : "text-red-400")}>
                  {company.growth >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {company.growth >= 0 ? "+" : ""}{company.growth}%
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Briefcase className="w-3 h-3 text-white/30" />
                    <span className="text-xs text-white/40">Open Roles</span>
                  </div>
                  <p className="text-base font-bold text-white font-mono">{company.openPositions.toLocaleString()}</p>
                </div>
                <div className="p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <DollarSign className="w-3 h-3 text-white/30" />
                    <span className="text-xs text-white/40">Avg Salary</span>
                  </div>
                  <p className="text-base font-bold text-emerald-400 font-mono">${(company.avgSalary/1000).toFixed(0)}K</p>
                </div>
              </div>

              {/* Hiring frequency badge */}
              <div className="flex items-center justify-between">
                <span className={cn("text-xs px-2 py-0.5 rounded-full", {
                  "badge-active": company.hiringFrequency === "Very High",
                  "badge-remote": company.hiringFrequency === "High",
                  "badge-hybrid": company.hiringFrequency === "Medium",
                })}>
                  {company.hiringFrequency} Hiring
                </span>
                <div className="flex items-center gap-1 text-xs text-white/35">
                  <MapPin className="w-3 h-3" />
                  {company.locations[0]}
                </div>
              </div>

              {/* Expanded details */}
              {selected === company.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-white/8 space-y-3"
                >
                  <div>
                    <p className="text-xs text-white/40 mb-1.5">Top Roles</p>
                    <div className="flex flex-wrap gap-1.5">
                      {company.topRoles.map((role) => (
                        <span key={role} className="px-2 py-0.5 text-xs text-white/60 bg-white/5 border border-white/8 rounded-full">{role}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1.5">Locations</p>
                    <div className="flex flex-wrap gap-1.5">
                      {company.locations.map((loc) => (
                        <span key={loc} className="px-2 py-0.5 text-xs text-white/60 bg-white/5 border border-white/8 rounded-full">{loc}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Comparison Charts */}
        <div className="grid lg:grid-cols-2 gap-5">
          <ChartCard title="Average Salary by Company" subtitle="Compensation benchmarks" delay={0.3}>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={salaryChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip {...TOOLTIP_STYLE} formatter={(v: number) => [`$${v.toLocaleString()}`, "Avg Salary"]} />
                <Bar dataKey="salary" radius={[4, 4, 0, 0]} animationDuration={800}>
                  {salaryChartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color === "#ffffff" || entry.color === "#24292e" ? "#475569" : entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Open Positions by Company" subtitle="Current hiring volume" delay={0.35}>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={openPositionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toLocaleString()} />
                <Tooltip {...TOOLTIP_STYLE} formatter={(v: number) => [v.toLocaleString(), "Open Positions"]} />
                <Bar dataKey="positions" radius={[4, 4, 0, 0]} animationDuration={800}>
                  {openPositionsData.map((entry, i) => (
                    <Cell key={i} fill={entry.color === "#ffffff" || entry.color === "#24292e" ? "#94a3b8" : entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
