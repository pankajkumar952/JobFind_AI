// ============================================================
// JobFind AI — Salary Trends Page
// ============================================================
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell,
} from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ChartCard from "@/components/ui/ChartCard";
import { salaryTrends } from "@/data/mockData";
import { TrendingUp, DollarSign, ArrowUp } from "lucide-react";

const TOOLTIP_STYLE = {
  contentStyle: { background: "rgba(15,18,30,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white", fontSize: "12px" },
};

const salaryByRole = [
  { role: "ML Engineer", p25: 155000, median: 210000, p75: 280000 },
  { role: "Staff SWE", p25: 180000, median: 240000, p75: 320000 },
  { role: "Senior SWE", p25: 140000, median: 185000, p75: 240000 },
  { role: "DevOps/SRE", p25: 130000, median: 175000, p75: 225000 },
  { role: "Full Stack", p25: 110000, median: 150000, p75: 200000 },
  { role: "Frontend", p25: 100000, median: 140000, p75: 185000 },
  { role: "Backend", p25: 115000, median: 155000, p75: 205000 },
  { role: "Mobile", p25: 120000, median: 160000, p75: 210000 },
];

const salaryByLocation = [
  { city: "San Francisco", salary: 195000, color: "#d97706" },
  { city: "New York", salary: 185000, color: "#64748b" },
  { city: "Seattle", salary: 175000, color: "#b45309" },
  { city: "Austin", salary: 155000, color: "#94a3b8" },
  { city: "Boston", salary: 160000, color: "#10b981" },
  { city: "London", salary: 140000, color: "#f59e0b" },
  { city: "Berlin", salary: 120000, color: "#ec4899" },
  { city: "Remote", salary: 145000, color: "#f59e0b" },
];

const salaryByExperience = [
  { level: "Entry (0-2y)", salary: 88000 },
  { level: "Junior (2-4y)", salary: 108000 },
  { level: "Mid (4-6y)", salary: 135000 },
  { level: "Senior (6-10y)", salary: 175000 },
  { level: "Staff (10y+)", salary: 225000 },
  { level: "Principal", salary: 280000 },
];

export default function SalaryTrends() {
  const [range, setRange] = useState<"3m" | "6m" | "12m">("12m");

  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  const displayData = range === "3m" ? salaryTrends.slice(-3) : range === "6m" ? salaryTrends.slice(-6) : salaryTrends;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-[1400px]">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-bold text-white">Salary Trends</h1>
          <p className="text-sm text-white/40 mt-0.5">Comprehensive salary analytics across roles, locations, and experience</p>
        </motion.div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Median SWE Salary", value: "$145K", change: "+8.5%", color: "#d97706" },
            { label: "Senior Engineer", value: "$210K", change: "+12.2%", color: "#94a3b8" },
            { label: "ML Engineer", value: "$248K", change: "+18.7%", color: "#10b981" },
            { label: "Entry Level", value: "$88K", change: "+5.3%", color: "#f59e0b" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4" style={{ color: item.color }} />
                <span className="text-xs text-white/40">{item.label}</span>
              </div>
              <p className="text-2xl font-bold text-white font-mono">{item.value}</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400">
                <ArrowUp className="w-3 h-3" />
                {item.change} YoY
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main trend chart */}
        <ChartCard
          title="Salary Trends Over Time"
          subtitle="By experience level"
          delay={0.2}
          action={
            <div className="flex gap-1">
              {(["3m", "6m", "12m"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-all ${range === r ? "bg-amber-600 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={displayData}>
              <defs>
                {[
                  { id: "s1", color: "#d97706" }, { id: "s2", color: "#94a3b8" },
                  { id: "s3", color: "#10b981" }, { id: "s4", color: "#f59e0b" },
                ].map(({ id, color }) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip {...TOOLTIP_STYLE} formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }} />
              <Area type="monotone" dataKey="seniorSalary" name="Senior" stroke="#d97706" strokeWidth={2} fill="url(#s1)" />
              <Area type="monotone" dataKey="avgSalary" name="Average" stroke="#94a3b8" strokeWidth={2} fill="url(#s2)" />
              <Area type="monotone" dataKey="midSalary" name="Mid-Level" stroke="#10b981" strokeWidth={2} fill="url(#s3)" />
              <Area type="monotone" dataKey="juniorSalary" name="Junior" stroke="#f59e0b" strokeWidth={2} fill="url(#s4)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* By Role */}
          <ChartCard title="Salary by Role" subtitle="P25 / Median / P75 percentiles" delay={0.3}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={salaryByRole} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="role" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip {...TOOLTIP_STYLE} formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
                <Legend wrapperStyle={{ fontSize: "10px", color: "rgba(255,255,255,0.5)" }} />
                <Bar dataKey="p25" name="P25" fill="rgba(217, 119, 6, 0.3)" radius={[0, 2, 2, 0]} stackId="a" />
                <Bar dataKey="median" name="Median" fill="rgba(217, 119, 6, 0.7)" radius={[0, 2, 2, 0]} stackId="b" />
                <Bar dataKey="p75" name="P75" fill="rgba(148, 163, 184, 0.6)" radius={[0, 2, 2, 0]} stackId="c" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* By Location */}
          <ChartCard title="Salary by Location" subtitle="Average compensation by city" delay={0.35}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={salaryByLocation}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="city" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={40} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip {...TOOLTIP_STYLE} formatter={(v: number) => [`$${v.toLocaleString()}`, "Avg Salary"]} />
                <Bar dataKey="salary" radius={[4, 4, 0, 0]} animationDuration={800}>
                  {salaryByLocation.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* By Experience */}
        <ChartCard title="Salary Progression by Experience" subtitle="How compensation grows with seniority" delay={0.4}>
          <div className="space-y-3">
            {salaryByExperience.map((item, i) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="flex items-center gap-4"
              >
                <span className="text-sm text-white/60 w-36 flex-shrink-0">{item.level}</span>
                <div className="flex-1 h-7 bg-white/5 rounded-lg overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.salary / 280000) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.06 }}
                    className="h-full rounded-lg flex items-center justify-end pr-3"
                    style={{ background: `linear-gradient(90deg, rgba(217, 119, 6, 0.6), rgba(148, 163, 184, 0.8))` }}
                  >
                    <span className="text-xs font-mono font-bold text-white">${(item.salary/1000).toFixed(0)}K</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
}
