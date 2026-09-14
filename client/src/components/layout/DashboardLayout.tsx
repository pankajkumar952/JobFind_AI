// ============================================================
// JobFind AI — Dashboard Layout
// Aurora Glassmorphism: Persistent sidebar + topbar
// ============================================================
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Briefcase, Code2, Building2, TrendingUp,
  Settings, Bell, Search, Sun, Moon, Menu, X, ChevronLeft,
  Sparkles, LogOut, User, ChevronRight, Zap,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Briefcase, label: "Job Listings", path: "/jobs" },
  { icon: Sparkles, label: "AI Insights", path: "/ai-insights" },
  { icon: Code2, label: "Skill Analytics", path: "/skills" },
  { icon: Building2, label: "Companies", path: "/companies" },
  { icon: TrendingUp, label: "Salary Trends", path: "/salary" },
];

const bottomNavItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  const { theme, toggleTheme, sidebarCollapsed, toggleSidebar, user, logout } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Apply theme class on mount
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const sidebarWidth = sidebarCollapsed ? 72 : 240;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Aurora background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="aurora-blob w-96 h-96 bg-amber-600 top-0 right-0" style={{ animationDelay: "0s" }} />
        <div className="aurora-blob w-80 h-80 bg-slate-600 bottom-20 left-20" style={{ animationDelay: "7s" }} />
        <div className="aurora-blob w-64 h-64 bg-slate-500 top-1/2 right-1/4" style={{ animationDelay: "14s" }} />
      </div>

      {/* ── Desktop Sidebar ── */}
      <motion.aside
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-full z-30 border-r border-white/6"
        style={{ background: "rgba(11, 13, 22, 0.95)", backdropFilter: "blur(20px)" }}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-white/6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 btn-gradient">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-bold text-sm text-white whitespace-nowrap gradient-text"
                >
                  JobFind AI
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={toggleSidebar}
            className="ml-auto p-1.5 rounded-md text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors flex-shrink-0"
          >
            <ChevronLeft
              className={cn("w-4 h-4 transition-transform duration-300", sidebarCollapsed && "rotate-180")}
            />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.path || (item.path !== "/" && location.startsWith(item.path));
            return (
              <Link key={item.path} href={item.path}>
                <motion.div
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group",
                    isActive
                      ? "nav-item-active"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("w-4.5 h-4.5 flex-shrink-0", isActive ? "text-amber-400" : "text-white/40 group-hover:text-white/70")} />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-sm font-medium whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && !sidebarCollapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom nav */}
        <div className="py-4 px-2 border-t border-white/6 space-y-1">
          {bottomNavItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200",
                    isActive ? "nav-item-active" : "text-white/50 hover:text-white/80 hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm font-medium whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            );
          })}

          {/* User profile */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
            >
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #d97706, #94a3b8)" }}>
                {user?.avatar || "U"}
              </div>
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 text-left min-w-0"
                  >
                    <p className="text-xs font-medium text-white/80 truncate">{user?.name || "User"}</p>
                    <p className="text-xs text-white/40 truncate capitalize">{user?.plan || "free"} plan</p>
                  </motion.div>
                )}
              </AnimatePresence>
              {!sidebarCollapsed && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-0 mb-2 w-48 glass-card py-1 z-50"
                  style={{ background: "rgba(15, 18, 30, 0.98)" }}
                >
                  <Link href="/settings">
                    <div className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                      <User className="w-4 h-4" /> Profile
                    </div>
                  </Link>
                  <div className="border-t border-white/8 my-1" />
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* ── Mobile Sidebar Overlay ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="fixed left-0 top-0 h-full w-64 z-50 flex flex-col border-r border-white/6 lg:hidden"
              style={{ background: "rgba(11, 13, 22, 0.98)", backdropFilter: "blur(20px)" }}
            >
              <div className="flex items-center h-16 px-4 border-b border-white/6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center btn-gradient">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="ml-3 font-bold text-sm gradient-text">JobFind AI</span>
                <button onClick={() => setMobileMenuOpen(false)} className="ml-auto text-white/40 hover:text-white/80">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 py-4 px-2 space-y-1">
                {navItems.map((item) => {
                  const isActive = location === item.path || (item.path !== "/" && location.startsWith(item.path));
                  return (
                    <Link key={item.path} href={item.path}>
                      <div
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all",
                          isActive ? "nav-item-active" : "text-white/50 hover:text-white/80 hover:bg-white/5"
                        )}
                      >
                        <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
              <div className="py-4 px-2 border-t border-white/6">
                <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div
        className="flex-1 flex flex-col min-h-0 transition-all duration-300 relative z-10 lg:ml-[var(--sidebar-w)]"
        style={{ ["--sidebar-w" as string]: `${sidebarWidth}px` } as React.CSSProperties}
      >
        {/* Topbar */}
        <header className="h-16 flex items-center gap-4 px-4 lg:px-6 border-b border-white/6 flex-shrink-0"
          style={{ background: "rgba(9, 11, 20, 0.8)", backdropFilter: "blur(20px)" }}>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search jobs, skills, companies..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/8 rounded-lg text-white/70 placeholder:text-white/25 focus:outline-none focus:border-amber-500/50 focus:bg-white/8 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
            </button>

            {/* User avatar */}
            <Link href="/settings">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:opacity-80 transition-opacity"
                style={{ background: "linear-gradient(135deg, #d97706, #94a3b8)" }}>
                {user?.avatar || "U"}
              </div>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
