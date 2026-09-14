// ============================================================
// JobFind AI — Landing Page
// Aurora Glassmorphism: Hero, Features, Stats, Testimonials, Pricing, Footer
// ============================================================
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  Zap, TrendingUp, Globe, Code2, DollarSign, Users, BarChart3,
  ArrowRight, Check, Star, ChevronRight, Sparkles, Shield, Cpu,
  Building2, Menu, X, Sun, Moon,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { testimonials, pricingPlans } from "@/data/mockData";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

const heroChartData = [
  { m: "Jul", s: 128000 }, { m: "Aug", s: 132000 }, { m: "Sep", s: 135000 },
  { m: "Oct", s: 139000 }, { m: "Nov", s: 143000 }, { m: "Dec", s: 145000 },
];

const features = [
  { icon: TrendingUp, title: "Real-Time Salary Trends", desc: "Track average, median, and percentile salaries across roles, locations, and experience levels updated daily.", color: "#d97706" },
  { icon: Code2, title: "Skill Demand Analytics", desc: "See which technologies are rising or falling in demand. Radar charts, heatmaps, and growth rankings.", color: "#64748b" },
  { icon: Building2, title: "Company Insights", desc: "Deep profiles on top hiring companies — salary benchmarks, hiring frequency, growth trends, and culture ratings.", color: "#b45309" },
  { icon: Globe, title: "Remote Work Intelligence", desc: "Understand the remote landscape: which roles, companies, and countries are most remote-friendly.", color: "#94a3b8" },
  { icon: Sparkles, title: "AI-Powered Predictions", desc: "Machine learning models forecast salary movements, emerging skills, and optimal job application timing.", color: "#10b981" },
  { icon: BarChart3, title: "Hiring Activity Tracker", desc: "Monitor real-time hiring spikes and slowdowns across the tech industry with weekly granularity.", color: "#f59e0b" },
];

const trustedCompanies = ["Stripe", "Vercel", "Linear", "Figma", "Notion", "Datadog", "Anthropic", "Shopify"];

const stats = [
  { value: "124K+", label: "Jobs Tracked", icon: Briefcase },
  { value: "$145K", label: "Avg Salary", icon: DollarSign },
  { value: "67%", label: "Remote Roles", icon: Globe },
  { value: "50K+", label: "Professionals", icon: Users },
];

import { Briefcase } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  return <span className="gradient-text">{target}{suffix}</span>;
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useAppStore();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/6" : ""
      }`}
      style={{ background: scrolled ? "rgba(9, 11, 20, 0.9)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center btn-gradient">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">JobFind <span className="gradient-text">AI</span></span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {["Features", "Pricing", "Companies", "Blog"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-white/50 hover:text-white/90 transition-colors">
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link href="/login">
            <button className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors">Sign in</button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 text-sm font-medium rounded-lg btn-gradient text-white">Get Started</button>
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white/60 hover:text-white">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/6 px-4 py-4 space-y-2"
          style={{ background: "rgba(9, 11, 20, 0.98)" }}
        >
          {["Features", "Pricing", "Companies"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-white/60 hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/login"><button className="w-full py-2 text-sm text-white/70 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">Sign in</button></Link>
            <Link href="/register"><button className="w-full py-2 text-sm font-medium rounded-lg btn-gradient text-white">Get Started</button></Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default function Landing() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.svg"
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        </div>

        {/* Aurora blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="aurora-blob w-[600px] h-[600px] bg-amber-600 -top-32 -right-32" />
          <div className="aurora-blob w-[400px] h-[400px] bg-slate-500 bottom-0 left-0" style={{ animationDelay: "10s" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ background: "rgba(217, 119, 6, 0.15)", border: "1px solid rgba(217, 119, 6, 0.3)", color: "#fcd34d" }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Job Market Intelligence
            <ChevronRight className="w-3 h-3" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight"
          >
            Track the Global
            <br />
            <span className="gradient-text">Tech Job Market</span>
            <br />
            in Real Time
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed"
          >
            AI-powered analytics for salaries, hiring trends, skills demand, and remote work insights.
            Make data-driven career decisions with confidence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register">
              <button className="px-6 py-3 text-sm font-semibold rounded-xl btn-gradient text-white flex items-center gap-2">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="px-6 py-3 text-sm font-medium rounded-xl text-white/70 hover:text-white border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2">
                View Demo <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-xs text-white/30"
          >
            No credit card required · Free forever plan available
          </motion.p>

          {/* Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 relative"
          >
            <div className="glass-card overflow-hidden max-w-5xl mx-auto"
              style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)" }}>
              <img
                src="/images/dashboard-preview.svg"
                alt="JobFind AI Dashboard"
                className="w-full rounded-xl"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trusted Companies ── */}
      <section className="py-12 border-y border-white/6" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-white/30 uppercase tracking-widest mb-8">
            Trusted by engineers at world-class companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {trustedCompanies.map((company, i) => (
              <motion.span
                key={company}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="text-sm font-semibold text-white/25 hover:text-white/50 transition-colors cursor-default"
              >
                {company}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section ref={statsRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card p-6 text-center"
              >
                <p className="text-3xl font-extrabold gradient-text">{stat.value}</p>
                <p className="mt-1 text-sm text-white/40">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Platform Features</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
                Everything you need to navigate
                <br />
                <span className="gradient-text">the tech job market</span>
              </h2>
              <p className="mt-4 text-white/50 max-w-xl mx-auto">
                From salary benchmarks to AI predictions, JobFind AI gives you the data advantage in your career.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass-card glass-card-hover p-6"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${feature.color}18`, border: `1px solid ${feature.color}30` }}
                >
                  <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chart Preview ── */}
      <section className="py-20" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Live Analytics</span>
              <h2 className="mt-3 text-3xl font-extrabold text-white">
                Salary trends updated
                <br />
                <span className="gradient-text-cyan">every single day</span>
              </h2>
              <p className="mt-4 text-white/50 leading-relaxed">
                Our data pipeline processes thousands of job postings daily, extracting salary signals and aggregating them into actionable trend data.
              </p>
              <ul className="mt-6 space-y-3">
                {["Percentile breakdowns (P25, P50, P75, P90)", "Role-specific salary trajectories", "Geographic salary variance maps", "YoY and MoM change tracking"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <button className="mt-8 px-5 py-2.5 text-sm font-medium rounded-xl btn-gradient text-white flex items-center gap-2">
                  Explore Salary Data <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-white">Average Software Engineer Salary</p>
                  <p className="text-xs text-white/40">Last 6 months</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white font-mono">$145,000</p>
                  <p className="text-xs text-emerald-400">+8.5% YoY</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={heroChartData}>
                  <defs>
                    <linearGradient id="salaryGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{ background: "rgba(15,18,30,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white" }}
                    formatter={(v: number) => [`$${v.toLocaleString()}`, "Avg Salary"]}
                  />
                  <Area type="monotone" dataKey="s" stroke="#d97706" strokeWidth={2} fill="url(#salaryGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Testimonials</span>
            <h2 className="mt-3 text-3xl font-extrabold text-white">
              Loved by <span className="gradient-text">50,000+ professionals</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card glass-card-hover p-5 flex flex-col gap-4"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-white/65 leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: t.avatarColor }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Pricing</span>
            <h2 className="mt-3 text-3xl font-extrabold text-white">
              Simple, transparent <span className="gradient-text">pricing</span>
            </h2>
            <p className="mt-3 text-white/45">Start free. Upgrade when you need more.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`glass-card p-6 flex flex-col relative ${plan.highlighted ? "border-amber-500/40" : ""}`}
                style={plan.highlighted ? { boxShadow: "0 0 40px rgba(217, 119, 6, 0.2), 0 4px 24px rgba(0,0,0,0.3)" } : {}}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white btn-gradient">
                    Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-base font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-white/40 mt-1">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-white">R{plan.price}</span>
                  {plan.price > 0 && <span className="text-white/40 text-sm">/{plan.period}</span>}
                  {plan.price === 0 && <span className="text-white/40 text-sm"> {plan.period}</span>}
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-white/60">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={plan.price === 0 ? "/register" : "/register"}>
                  <button
                    className={`w-full py-2.5 text-sm font-semibold rounded-xl transition-all ${
                      plan.highlighted
                        ? "btn-gradient text-white"
                        : "border border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 relative overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(217, 119, 6, 0.15)" }}
          >
            <div className="aurora-blob w-64 h-64 bg-amber-600 -top-16 -right-16 opacity-20" />
            <div className="aurora-blob w-48 h-48 bg-slate-500 -bottom-8 -left-8 opacity-20" />
            <div className="relative z-10">
              <Cpu className="w-10 h-10 mx-auto mb-4" style={{ color: "#d97706" }} />
              <h2 className="text-3xl font-extrabold text-white mb-3">
                Ready to make <span className="gradient-text">data-driven</span> career moves?
              </h2>
              <p className="text-white/50 mb-8 max-w-md mx-auto">
                Join 50,000+ tech professionals using JobFind AI to navigate the job market with confidence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <button className="px-8 py-3 text-sm font-semibold rounded-xl btn-gradient text-white flex items-center gap-2">
                    Start for Free <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button className="px-8 py-3 text-sm font-medium rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all">
                    Explore Demo
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/6 py-12" style={{ background: "rgba(9, 11, 20, 0.8)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center btn-gradient">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-sm text-white">JobFind <span className="gradient-text">AI</span></span>
              </div>
              <p className="text-xs text-white/35 leading-relaxed max-w-48">
                AI-powered job market analytics for the modern tech professional.
              </p>
              <div className="flex items-center gap-1 mt-3">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span className="text-xs text-white/30">SOC 2 Type II Certified</span>
              </div>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { title: "Resources", links: ["Documentation", "Blog", "API", "Status"] },
              { title: "Company", links: ["About", "Careers", "Privacy", "Terms"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-xs text-white/35 hover:text-white/65 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">© JobFind AI. All rights reserved.| Developed By Er. Pankaj Kumar</p>
            
          </div>
        </div>
      </footer>
    </div>
  );
}
