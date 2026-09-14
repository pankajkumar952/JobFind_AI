// ============================================================
// JobFind AI — Login Page
// Split-screen: left = aurora art, right = form
// ============================================================
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Zap, Eye, EyeOff, ArrowRight, Github, Chrome } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export default function Login() {
  const [, navigate] = useLocation();
  const { login, isAuthenticated } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.documentElement.classList.add("dark");
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setError(""); setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) navigate("/dashboard");
    else setError("Invalid credentials. Try any email/password.");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/images/auth-bg.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-background/40 to-background/80" />
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
              <div className="glass-card p-6 mb-6 max-w-sm">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-sm text-white/75 leading-relaxed">
                  "JobFind AI helped me negotiate a 40% salary increase by showing me real market data."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "#d97706" }}>SC</div>
                  <div>
                    <p className="text-xs font-semibold text-white">Sarah Chen</p>
                    <p className="text-xs text-white/40">Senior SWE at Stripe</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="pulse-dot" />
                <span className="text-xs text-white/50">124,800 jobs tracked in real-time</span>
              </div>
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
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center btn-gradient">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">JobFind <span className="gradient-text">AI</span></span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white">Welcome back</h1>
            <p className="mt-1 text-sm text-white/45">Sign in to your account to continue</p>
          </div>

          {/* Social logins */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[{ icon: Github, label: "GitHub" }, { icon: Chrome, label: "Google" }].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center justify-center gap-2 py-2.5 text-sm text-white/60 border border-white/10 rounded-xl hover:bg-white/5 hover:text-white/80 transition-all"
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-white/30">or continue with email</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:border-amber-500/60 focus:bg-white/8 transition-all"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-white/50">Password</label>
                <a href="#" className="text-xs text-amber-400 hover:text-amber-300 transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-10 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:border-amber-500/60 focus:bg-white/8 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-semibold rounded-xl btn-gradient text-white flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign in <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/40">
            Don't have an account?{" "}
            <Link href="/register">
              <span className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-medium">Create one free</span>
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
