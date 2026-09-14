// ============================================================
// JobFind AI — Job Listings Explorer
// Search, filters, sorting, pagination, bookmarks
// ============================================================
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, Bookmark, BookmarkCheck, ChevronUp, ChevronDown,
  ChevronLeft, ChevronRight, MapPin, Clock, Briefcase, SlidersHorizontal,
  X, ExternalLink,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { jobListings } from "@/data/mockData";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

type SortKey = "company" | "role" | "salary" | "postedDate";
type SortDir = "asc" | "desc";

const WORK_TYPES = ["all", "Remote", "Hybrid", "On-site"];
const EXPERIENCE_LEVELS = ["all", "0-2 years", "2-4 years", "3-5 years", "3-6 years", "4-6 years", "4-7 years", "4-8 years", "5-8 years", "5+ years", "8+ years"];
const PAGE_SIZE = 8;

function SkeletonRow() {
  return (
    <tr className="border-b border-white/5">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <td key={i} className="px-4 py-3.5">
          <div className="skeleton h-4 rounded" style={{ width: `${60 + Math.random() * 40}%` }} />
        </td>
      ))}
    </tr>
  );
}

function WorkTypeBadge({ type }: { type: string }) {
  const cls = type === "Remote" ? "badge-remote" : type === "Hybrid" ? "badge-hybrid" : "badge-onsite";
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>{type}</span>;
}

export default function JobListings() {
  const { bookmarkedJobs, toggleBookmark } = useAppStore();
  const [search, setSearch] = useState("");
  const [workType, setWorkType] = useState("all");
  const [experience, setExperience] = useState("all");
  const [salaryMin, setSalaryMin] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>("postedDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let data = [...jobListings];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((j) =>
        j.company.toLowerCase().includes(q) ||
        j.role.toLowerCase().includes(q) ||
        j.skills.some((s) => s.toLowerCase().includes(q)) ||
        j.location.toLowerCase().includes(q)
      );
    }
    if (workType !== "all") data = data.filter((j) => j.workType === workType);
    if (experience !== "all") data = data.filter((j) => j.experience === experience);
    if (salaryMin > 0) data = data.filter((j) => j.salary.min >= salaryMin);

    data.sort((a, b) => {
      let av: string | number, bv: string | number;
      if (sortKey === "salary") { av = a.salary.min; bv = b.salary.min; }
      else if (sortKey === "postedDate") { av = a.postedDate; bv = b.postedDate; }
      else { av = a[sortKey]; bv = b[sortKey]; }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [search, workType, experience, salaryMin, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const SortIcon = ({ k }: { k: SortKey }) => (
    <span className="ml-1 inline-flex flex-col gap-0">
      <ChevronUp className={cn("w-2.5 h-2.5", sortKey === k && sortDir === "asc" ? "text-amber-400" : "text-white/20")} />
      <ChevronDown className={cn("w-2.5 h-2.5 -mt-1", sortKey === k && sortDir === "desc" ? "text-amber-400" : "text-white/20")} />
    </span>
  );

  return (
    <DashboardLayout>
      <div className="p-6 space-y-5 max-w-[1400px]">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Job Listings</h1>
            <p className="text-sm text-white/40 mt-0.5">{filtered.length.toLocaleString()} positions found</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn("flex items-center gap-2 px-3 py-2 text-sm rounded-xl border transition-all", showFilters ? "border-amber-500/50 bg-amber-500/10 text-amber-300" : "border-white/10 text-white/60 hover:text-white hover:bg-white/5")}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Search + Filter bar */}
        <div className="glass-card p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by company, role, skill, or location..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white/5 border border-white/8 rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:border-amber-500/50 transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 overflow-hidden"
              >
                <div>
                  <label className="block text-xs text-white/40 mb-1">Work Type</label>
                  <select
                    value={workType}
                    onChange={(e) => { setWorkType(e.target.value); setPage(1); }}
                    className="w-full px-3 py-2 text-sm bg-white/5 border border-white/8 rounded-lg text-white focus:outline-none focus:border-amber-500/50"
                  >
                    {WORK_TYPES.map((t) => <option key={t} value={t} className="bg-slate-900">{t === "all" ? "All Types" : t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1">Experience</label>
                  <select
                    value={experience}
                    onChange={(e) => { setExperience(e.target.value); setPage(1); }}
                    className="w-full px-3 py-2 text-sm bg-white/5 border border-white/8 rounded-lg text-white focus:outline-none focus:border-amber-500/50"
                  >
                    {EXPERIENCE_LEVELS.map((e) => <option key={e} value={e} className="bg-slate-900">{e === "all" ? "All Levels" : e}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1">Min Salary</label>
                  <select
                    value={salaryMin}
                    onChange={(e) => { setSalaryMin(Number(e.target.value)); setPage(1); }}
                    className="w-full px-3 py-2 text-sm bg-white/5 border border-white/8 rounded-lg text-white focus:outline-none focus:border-amber-500/50"
                  >
                    {[0, 80000, 100000, 120000, 150000, 180000, 200000].map((v) => (
                      <option key={v} value={v} className="bg-slate-900">{v === 0 ? "Any Salary" : `$${(v/1000).toFixed(0)}K+`}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => { setWorkType("all"); setExperience("all"); setSalaryMin(0); setSearch(""); setPage(1); }}
                    className="w-full py-2 text-xs text-white/50 border border-white/8 rounded-lg hover:bg-white/5 hover:text-white/80 transition-all"
                  >
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/6">
                  {[
                    { label: "Company", key: "company" as SortKey },
                    { label: "Role", key: "role" as SortKey },
                    { label: "Salary", key: "salary" as SortKey },
                    { label: "Location", key: null },
                    { label: "Experience", key: null },
                    { label: "Skills", key: null },
                    { label: "Posted", key: "postedDate" as SortKey },
                    { label: "Type", key: null },
                  ].map(({ label, key }) => (
                    <th
                      key={label}
                      onClick={() => key && handleSort(key)}
                      className={cn("px-4 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider whitespace-nowrap", key && "cursor-pointer hover:text-white/70 transition-colors")}
                    >
                      <span className="flex items-center">
                        {label}
                        {key && <SortIcon k={key} />}
                      </span>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">Save</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
                ) : paginated.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Briefcase className="w-10 h-10 text-white/15" />
                        <p className="text-sm text-white/40">No jobs match your filters</p>
                        <button onClick={() => { setWorkType("all"); setExperience("all"); setSalaryMin(0); setSearch(""); }} className="text-xs text-amber-400 hover:text-amber-300">Clear all filters</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence mode="wait">
                    {paginated.map((job, i) => (
                      <motion.tr
                        key={job.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-white/5 hover:bg-white/3 transition-colors group"
                      >
                        {/* Company */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                              style={{ background: `${job.companyColor}25`, border: `1px solid ${job.companyColor}40`, color: job.companyColor === "#ffffff" ? "#e2e8f0" : job.companyColor }}
                            >
                              {job.companyLogo}
                            </div>
                            <span className="text-sm font-medium text-white/80">{job.company}</span>
                          </div>
                        </td>
                        {/* Role */}
                        <td className="px-4 py-3.5">
                          <span className="text-sm text-white/90 font-medium whitespace-nowrap">{job.role}</span>
                        </td>
                        {/* Salary */}
                        <td className="px-4 py-3.5">
                          <span className="text-sm font-mono text-emerald-400 whitespace-nowrap">
                            ${(job.salary.min/1000).toFixed(0)}K – ${(job.salary.max/1000).toFixed(0)}K
                          </span>
                        </td>
                        {/* Location */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1 text-xs text-white/50 whitespace-nowrap">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </div>
                        </td>
                        {/* Experience */}
                        <td className="px-4 py-3.5">
                          <span className="text-xs text-white/50 whitespace-nowrap">{job.experience}</span>
                        </td>
                        {/* Skills */}
                        <td className="px-4 py-3.5">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {job.skills.slice(0, 3).map((skill) => (
                              <span key={skill} className="px-1.5 py-0.5 rounded text-xs text-white/50 bg-white/5 border border-white/8">
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 3 && (
                              <span className="px-1.5 py-0.5 rounded text-xs text-white/30">+{job.skills.length - 3}</span>
                            )}
                          </div>
                        </td>
                        {/* Posted */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1 text-xs text-white/40 whitespace-nowrap">
                            <Clock className="w-3 h-3" />
                            {new Date(job.postedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </div>
                        </td>
                        {/* Work Type */}
                        <td className="px-4 py-3.5">
                          <WorkTypeBadge type={job.workType} />
                        </td>
                        {/* Bookmark */}
                        <td className="px-4 py-3.5">
                          <button
                            onClick={() => toggleBookmark(job.id)}
                            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            {bookmarkedJobs.includes(job.id) ? (
                              <BookmarkCheck className="w-4 h-4 text-amber-400" />
                            ) : (
                              <Bookmark className="w-4 h-4 text-white/25 hover:text-white/60 transition-colors" />
                            )}
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && filtered.length > PAGE_SIZE && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/6">
              <p className="text-xs text-white/40">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn("w-7 h-7 rounded-lg text-xs font-medium transition-all", p === page ? "bg-amber-600 text-white" : "text-white/40 hover:text-white/80 hover:bg-white/5")}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
