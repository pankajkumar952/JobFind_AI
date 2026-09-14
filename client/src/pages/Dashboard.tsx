// ============================================================
// JobFind AI — Main Dashboard
// Stat cards + sparklines + 5 analytics charts
// ============================================================
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, DollarSign, Globe, Code2 } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/ui/StatCard";
import ChartCard from "@/components/ui/ChartCard";
import {
  salaryTrends, topSkills, hiringActivity, remoteVsOnsite,
  countryHiring, sparklineData, dashboardStats,
} from "@/data/mockData";
import { useAppStore } from "@/store/useAppStore";

const TOOLTIP_STYLE = {
  contentStyle: { background: "rgba(15,18,30,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white", fontSize: "12px" },
};

const AXIS_TICK = { fill: "rgba(255,255,255,0.3)", fontSize: 11 };

export default function Dashboard() {
  const { user } = useAppStore();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-[1400px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start justify-between"
        >
          <div>
            <h1 className="text-xl font-bold text-white">
              Welcome back, <span className="gradient-text">{user?.name?.split(" ")[0] || "Pankaj"}</span> 👋
            </h1>
            <p className="text-sm text-white/40 mt-0.5">Here's what's happening in the tech job market today.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 glass-card text-xs text-white/50">
            <div className="pulse-dot" />
            Live data
          </div>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="Total Jobs Tracked"
            value={dashboardStats.totalJobs.value}
            change={dashboardStats.totalJobs.change}
            trend="up"
            icon={<Briefcase className="w-5 h-5" />}
            sparklineData={sparklineData.jobs}
            color="#d97706"
            delay={0}
          />
          <StatCard
            title="Average Salary"
            value={dashboardStats.avgSalary.value}
            change={dashboardStats.avgSalary.change}
            trend="up"
            icon={<DollarSign className="w-5 h-5" />}
            sparklineData={sparklineData.salary}
            color="#94a3b8"
            prefix="$"
            delay={0.05}
          />
          <StatCard
            title="Remote Jobs"
            value={dashboardStats.remotePercentage.value}
            change={dashboardStats.remotePercentage.change}
            trend="up"
            icon={<Globe className="w-5 h-5" />}
            sparklineData={sparklineData.remote}
            color="#10b981"
            suffix="%"
            delay={0.1}
          />
          <StatCard
            title="Top Demanded Skill"
            value={dashboardStats.topSkill.value}
            change={dashboardStats.topSkill.change}
            trend="up"
            icon={<Code2 className="w-5 h-5" />}
            sparklineData={sparklineData.skills}
            color="#f59e0b"
            delay={0.15}
          />
        </div>

        {/* Main charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Salary Trends — 2/3 width */}
          <ChartCard
            title="Salary Trends Over Time"
            subtitle="Average salary by experience level"
            className="lg:col-span-2"
            delay={0.2}
          >
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={salaryTrends}>
                <defs>
                  {[
                    { id: "senior", color: "#d97706" },
                    { id: "mid", color: "#94a3b8" },
                    { id: "junior", color: "#10b981" },
                  ].map(({ id, color }) => (
                    <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip {...TOOLTIP_STYLE} formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
                <Legend wrapperStyle={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }} />
                <Area type="monotone" dataKey="seniorSalary" name="Senior" stroke="#d97706" strokeWidth={2} fill="url(#senior)" />
                <Area type="monotone" dataKey="midSalary" name="Mid-Level" stroke="#94a3b8" strokeWidth={2} fill="url(#mid)" />
                <Area type="monotone" dataKey="juniorSalary" name="Junior" stroke="#10b981" strokeWidth={2} fill="url(#junior)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Remote vs Onsite — 1/3 width */}
          <ChartCard title="Work Type Distribution" subtitle="Remote vs Hybrid vs On-site" delay={0.25}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={remoteVsOnsite}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  animationBegin={200}
                  animationDuration={800}
                >
                  {remoteVsOnsite.map((entry, index) => (
                    <Cell key={index} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip {...TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`, ""]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {remoteVsOnsite.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-xs text-white/60">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-white font-mono">{item.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Second charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Skills */}
          <ChartCard title="Top Demanded Technologies" subtitle="By number of job postings" delay={0.3}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={topSkills.slice(0, 8)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="skill" tick={AXIS_TICK} axisLine={false} tickLine={false} width={70} />
                <Tooltip {...TOOLTIP_STYLE} formatter={(v: number) => [v.toLocaleString(), "Job Postings"]} />
                <Bar dataKey="demand" radius={[0, 4, 4, 0]} animationDuration={800}>
                  {topSkills.slice(0, 8).map((_, i) => {
                    const colors = ["#d97706", "#64748b", "#b45309", "#94a3b8", "#10b981", "#f59e0b", "#ec4899", "#f59e0b"];
                    return <Cell key={i} fill={colors[i % colors.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Hiring Activity */}
          <ChartCard title="Hiring Activity" subtitle="Weekly job postings vs filled positions" delay={0.35}>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={hiringActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" tick={{ ...AXIS_TICK, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
                <Tooltip {...TOOLTIP_STYLE} formatter={(v: number) => [v.toLocaleString(), ""]} />
                <Legend wrapperStyle={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }} />
                <Line type="monotone" dataKey="postings" name="Posted" stroke="#d97706" strokeWidth={2} dot={false} animationDuration={1000} />
                <Line type="monotone" dataKey="filled" name="Filled" stroke="#10b981" strokeWidth={2} dot={false} strokeDasharray="4 2" animationDuration={1000} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Country Distribution */}
        <ChartCard title="Top Hiring Countries" subtitle="Job postings by geography" delay={0.4}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {countryHiring.map((country, i) => (
              <motion.div
                key={country.country}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-2xl">{country.flag}</span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white/80 truncate">{country.country}</p>
                  <p className="text-xs text-white/40 font-mono">{country.jobs.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
}
