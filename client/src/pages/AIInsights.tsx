// ============================================================
// JobFind AI — AI Insights Page
// Futuristic glowing insight cards with animated indicators
// ============================================================
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, Brain, Lightbulb, Globe, DollarSign, Zap,
  Sparkles, ArrowRight, RefreshCw,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { aiInsights } from "@/data/mockData";

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp, Brain, Lightbulb, Globe, DollarSign, Zap,
};

function ConfidenceBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="text-xs font-mono text-white/50">{value}%</span>
    </div>
  );
}

export default function AIInsights() {
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-[1400px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h1 className="text-xl font-bold text-white">AI Insights</h1>
            </div>
            <p className="text-sm text-white/40">Machine learning predictions and market intelligence</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-xs text-white/50 border border-white/10 rounded-xl hover:bg-white/5 hover:text-white/70 transition-all">
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh Insights
          </button>
        </motion.div>

        {/* AI Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 flex items-center gap-4"
          style={{ background: "rgba(217, 119, 6, 0.08)", border: "1px solid rgba(217, 119, 6, 0.2)" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(217, 119, 6, 0.2)", border: "1px solid rgba(217, 119, 6, 0.4)" }}>
            <Brain className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">AI Analysis Engine Active</p>
            <p className="text-xs text-white/45 mt-0.5">Processing 124,800 job postings · Last updated 2 minutes ago · Model confidence: 91%</p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div className="pulse-dot" />
            <span className="text-xs text-emerald-400">Live</span>
          </div>
        </motion.div>

        {/* Insight Cards Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {aiInsights.map((insight, i) => {
            const Icon = ICON_MAP[insight.icon] || Zap;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                className="glass-card p-5 flex flex-col gap-4 relative overflow-hidden group cursor-pointer"
                style={{
                  transition: "box-shadow 250ms ease, border-color 250ms ease",
                }}
                whileHover={{
                  boxShadow: `0 8px 40px ${insight.color}25, 0 0 0 1px ${insight.color}30`,
                  y: -2,
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${insight.color}15, transparent 70%)`, transform: "translate(30%, -30%)" }}
                />

                {/* Header */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${insight.color}18`, border: `1px solid ${insight.color}35` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: insight.color }} />
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: `${insight.color}18`, color: insight.color, border: `1px solid ${insight.color}30` }}
                  >
                    {insight.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-2">{insight.title}</h3>
                  <p className="text-xs text-white/55 leading-relaxed">{insight.description}</p>
                </div>

                {/* Confidence */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-white/35">AI Confidence</span>
                  </div>
                  <ConfidenceBar value={insight.confidence} color={insight.color} />
                </div>

                {/* CTA */}
                <button className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                  style={{ color: insight.color }}>
                  Explore insight <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Market Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-semibold text-white">Market Summary — December 2024</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Bullish Signals",
                color: "#10b981",
                items: ["AI/ML hiring up 34% QoQ", "Remote positions stabilizing at 67%", "Rust and Go seeing explosive growth", "Q1 budget cycles opening soon"],
              },
              {
                title: "Watch Closely",
                color: "#f59e0b",
                items: ["Big Tech layoffs creating talent pool", "Visa restrictions affecting H1-B market", "Startup funding tightening", "Contract-to-hire increasing 18%"],
              },
              {
                title: "Emerging Opportunities",
                color: "#d97706",
                items: ["Platform Engineering roles +156%", "AI Safety Engineer demand rising", "Edge computing specialists needed", "Web3 cooling, AI infra heating"],
              },
            ].map((section) => (
              <div key={section.title}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: section.color }} />
                  <h3 className="text-xs font-semibold text-white/70">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-white/50">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: section.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
