// ============================================================
// JobFind AI — StatCard with Sparkline
// ============================================================
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down";
  icon: React.ReactNode;
  sparklineData: number[];
  color: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

export default function StatCard({
  title, value, change, trend, icon, sparklineData, color, prefix = "", suffix = "", delay = 0,
}: StatCardProps) {
  const sparkData = sparklineData.map((v, i) => ({ v, i }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      className="glass-card glass-card-hover p-5 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-white font-mono">
            {prefix}{typeof value === "number" ? value.toLocaleString() : value}{suffix}
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}20`, border: `1px solid ${color}30` }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className={cn("flex items-center gap-1 text-xs font-medium", trend === "up" ? "text-emerald-400" : "text-red-400")}>
          {trend === "up" ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          <span>{trend === "up" ? "+" : ""}{change}%</span>
          <span className="text-white/30 font-normal">vs last month</span>
        </div>
        <div className="w-24 h-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={color}
                strokeWidth={1.5}
                dot={false}
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
