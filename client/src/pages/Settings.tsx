// ============================================================
// JobFind AI — Settings / Profile Page
// ============================================================
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User, Bell, Palette, Bookmark, Download, Save, Camera,
  Sun, Moon, Check, Trash2,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAppStore } from "@/store/useAppStore";
import { jobListings } from "@/data/mockData";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "saved", label: "Saved Jobs", icon: Bookmark },
  { id: "export", label: "Export", icon: Download },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn("relative w-10 h-5.5 rounded-full transition-all duration-200 flex-shrink-0", checked ? "bg-amber-600" : "bg-white/10")}
    >
      <span className={cn("absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform duration-200", checked ? "translate-x-4.5" : "translate-x-0")} />
    </button>
  );
}

export default function Settings() {
  const { user, theme, toggleTheme, notifications, setNotification, bookmarkedJobs, toggleBookmark } = useAppStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");

  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  const bookmarked = jobListings.filter((j) => bookmarkedJobs.includes(j.id));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-xl font-bold text-white">Settings</h1>
          <p className="text-sm text-white/40 mt-0.5">Manage your account, preferences, and data</p>
        </motion.div>

        <div className="flex gap-6">
          {/* Sidebar tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-48 flex-shrink-0 space-y-1"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all",
                  activeTab === tab.id
                    ? "bg-amber-600/20 text-amber-300 border border-amber-500/30"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                )}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-w-0"
          >
            {/* ── Profile Tab ── */}
            {activeTab === "profile" && (
              <div className="glass-card p-6 space-y-6">
                <h2 className="text-sm font-semibold text-white">Profile Information</h2>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #d97706, #94a3b8)" }}>
                      {user?.avatar || "U"}
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center">
                      <Camera className="w-3 h-3 text-white" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{user?.name}</p>
                    <p className="text-xs text-white/40">{user?.email}</p>
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs badge-hybrid">
                      {user?.plan} plan
                    </span>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", value: name, onChange: setName, placeholder: "Your name" },
                    { label: "Email Address", value: email, onChange: setEmail, placeholder: "your@email.com" },
                  ].map(({ label, value, onChange, placeholder }) => (
                    <div key={label}>
                      <label className="block text-xs font-medium text-white/50 mb-1.5">{label}</label>
                      <input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:border-amber-500/50 transition-all"
                      />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-white/50 mb-1.5">Current Role</label>
                    <input
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:border-amber-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl btn-gradient text-white"
                  >
                    {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saved ? "Saved!" : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {/* ── Notifications Tab ── */}
            {activeTab === "notifications" && (
              <div className="glass-card p-6 space-y-4">
                <h2 className="text-sm font-semibold text-white">Notification Preferences</h2>
                <p className="text-xs text-white/40">Choose how and when you want to be notified.</p>
                <div className="space-y-3">
                  {[
                    { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                    { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
                    { key: "weeklyReport", label: "Weekly Market Report", desc: "Summary of job market trends every Monday" },
                    { key: "salaryAlerts", label: "Salary Alerts", desc: "Notify when salary benchmarks change significantly" },
                    { key: "newJobs", label: "New Job Alerts", desc: "Get notified about new matching positions" },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/3 transition-colors">
                      <div>
                        <p className="text-sm text-white/80">{label}</p>
                        <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                      </div>
                      <Toggle
                        checked={notifications[key as keyof typeof notifications]}
                        onChange={(v) => setNotification(key, v)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Appearance Tab ── */}
            {activeTab === "appearance" && (
              <div className="glass-card p-6 space-y-5">
                <h2 className="text-sm font-semibold text-white">Appearance</h2>
                <div>
                  <p className="text-xs text-white/50 mb-3">Theme</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "dark", label: "Dark Mode", icon: Moon, desc: "Easy on the eyes" },
                      { id: "light", label: "Light Mode", icon: Sun, desc: "Clean and bright" },
                    ].map(({ id, label, icon: Icon, desc }) => (
                      <button
                        key={id}
                        onClick={() => id !== theme && toggleTheme()}
                        className={cn(
                          "p-4 rounded-xl border text-left transition-all",
                          theme === id
                            ? "border-amber-500/50 bg-amber-500/10"
                            : "border-white/8 hover:border-white/15 hover:bg-white/3"
                        )}
                      >
                        <Icon className={cn("w-5 h-5 mb-2", theme === id ? "text-amber-400" : "text-white/40")} />
                        <p className="text-sm font-medium text-white">{label}</p>
                        <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                        {theme === id && <div className="mt-2 flex items-center gap-1 text-xs text-amber-400"><Check className="w-3 h-3" /> Active</div>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Saved Jobs Tab ── */}
            {activeTab === "saved" && (
              <div className="glass-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-white">Saved Jobs</h2>
                  <span className="text-xs text-white/40">{bookmarked.length} saved</span>
                </div>
                {bookmarked.length === 0 ? (
                  <div className="py-12 text-center">
                    <Bookmark className="w-10 h-10 text-white/15 mx-auto mb-3" />
                    <p className="text-sm text-white/40">No saved jobs yet</p>
                    <p className="text-xs text-white/25 mt-1">Bookmark jobs from the listings page</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {bookmarked.map((job) => (
                      <div key={job.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: `${job.companyColor}20`, color: job.companyColor === "#ffffff" ? "#e2e8f0" : job.companyColor }}
                        >
                          {job.companyLogo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white/80 truncate">{job.role}</p>
                          <p className="text-xs text-white/40">{job.company} · {job.location}</p>
                        </div>
                        <span className="text-xs font-mono text-emerald-400 flex-shrink-0">
                          ${(job.salary.min/1000).toFixed(0)}K+
                        </span>
                        <button onClick={() => toggleBookmark(job.id)} className="p-1.5 text-white/30 hover:text-red-400 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Export Tab ── */}
            {activeTab === "export" && (
              <div className="glass-card p-6 space-y-4">
                <h2 className="text-sm font-semibold text-white">Export Data</h2>
                <p className="text-xs text-white/40">Download your analytics data and saved searches in various formats.</p>
                <div className="space-y-3">
                  {[
                    { label: "Salary Trends Report", desc: "12-month salary data as CSV", format: "CSV" },
                    { label: "Job Listings Export", desc: "All filtered job listings", format: "CSV" },
                    { label: "Skill Analytics Report", desc: "Demand and growth data", format: "PDF" },
                    { label: "Company Benchmarks", desc: "Salary benchmarks by company", format: "XLSX" },
                  ].map(({ label, desc, format }) => (
                    <div key={label} className="flex items-center justify-between p-3 rounded-xl border border-white/6 hover:bg-white/3 transition-colors">
                      <div>
                        <p className="text-sm text-white/80">{label}</p>
                        <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                      </div>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all">
                        <Download className="w-3.5 h-3.5" />
                        {format}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
