// ============================================================
// JobFind AI — Register Page
// ============================================================
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Zap, Eye, EyeOff, ArrowRight, Github, Chrome, Check } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const perks = [
  "Free forever plan — no credit card needed",
  "Access to 124K+ tracked job listings",
  "Real-time salary benchmarks",
  "AI-powered career recommendations",
];

export default function Register() {
  const [, navigate] = useLocation();
  const { register, isAuthenticated } = useAppStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.documentElement.classList.add("dark");
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.includes("@")) e.email = "Valid email required";
    if (password.length < 8) e.password = "Password must be at least 8 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await register(name, email, password);
    setLoading(false);
    navigate("/dashboard");
  };

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ["", "#ef4444", "#f59e0b", "#10b981"];
  const strengthLabels = ["", "Weak", "Fair", "Strong"];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/images/analytics-illustration.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/50 to-background/80" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center btn-gradient">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">JobFind <span className="gradient-text">AI</span></span>
            </div>
          </Link>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-extrabold text-white mb-2">
                Start your data-driven
                <br />
                <span className="gradient-text">career journey</span>
              </h2>
              <p className="text-sm text-white/45 mb-8">Join 50,000+ tech professionals making smarter career moves.</p>
              <ul className="space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-white/65">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16, 185, 129, 0.2)", border: "1px solid rgba(16, 185, 129, 0.4)" }}>
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    {perk}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center btn-gradient">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">JobFind <span className="gradient-text">AI</span></span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white">Create your account</h1>
            <p className="mt-1 text-sm text-white/45">Free forever. No credit card required.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[{ icon: Github, label: "GitHub" }, { icon: Chrome, label: "Google" }].map(({ icon: Icon, label }) => (
              <button key={label} className="flex items-center justify-center gap-2 py-2.5 text-sm text-white/60 border border-white/10 rounded-xl hover:bg-white/5 hover:text-white/80 transition-all">
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-white/30">or sign up with email</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Pankaj Kumar"
                className={`w-full px-4 py-2.5 text-sm bg-white/5 border rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:bg-white/8 transition-all ${errors.name ? "border-red-500/50 focus:border-red-500/70" : "border-white/10 focus:border-amber-500/60"}`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 text-sm bg-white/5 border rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:bg-white/8 transition-all ${errors.email ? "border-red-500/50 focus:border-red-500/70" : "border-white/10 focus:border-amber-500/60"}`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className={`w-full px-4 py-2.5 pr-10 text-sm bg-white/5 border rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:bg-white/8 transition-all ${errors.password ? "border-red-500/50" : "border-white/10 focus:border-amber-500/60"}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((level) => (
                      <div key={level} className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ background: passwordStrength >= level ? strengthColors[passwordStrength] : "rgba(255,255,255,0.1)" }} />
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: strengthColors[passwordStrength] }}>{strengthLabels[passwordStrength]}</span>
                </div>
              )}
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
            </div>

            <p className="text-xs text-white/30">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-amber-400 hover:text-amber-300">Terms of Service</a> and{" "}
              <a href="#" className="text-amber-400 hover:text-amber-300">Privacy Policy</a>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-semibold rounded-xl btn-gradient text-white flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/40">
            Already have an account?{" "}
            <Link href="/login">
              <span className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-medium">Sign in</span>
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
