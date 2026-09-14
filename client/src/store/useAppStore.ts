// ============================================================
// JobFind AI — Zustand Global Store
// ============================================================
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jobListings } from "@/data/mockData";

export type Theme = "dark" | "light";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  plan: "free" | "pro" | "team";
  joinedDate: string;
}

interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;

  // Theme
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;

  // Sidebar
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;

  // Bookmarks
  bookmarkedJobs: string[];
  toggleBookmark: (jobId: string) => void;

  // Filters
  jobFilters: {
    search: string;
    workType: string;
    location: string;
    experience: string;
    salaryMin: number;
    salaryMax: number;
  };
  setJobFilter: (key: string, value: string | number) => void;
  resetJobFilters: () => void;

  // Notifications
  notifications: {
    email: boolean;
    push: boolean;
    weeklyReport: boolean;
    salaryAlerts: boolean;
    newJobs: boolean;
  };
  setNotification: (key: string, value: boolean) => void;
}

const defaultUser: User = {
  id: "usr_01",
  name: "Pankaj Kumar",
  email: "pankjku5698@jobfind.ai",
  avatar: "PK",
  role: "Software Engineer",
  plan: "pro",
  joinedDate: "2024-01-15",
};

const defaultFilters = {
  search: "",
  workType: "all",
  location: "all",
  experience: "all",
  salaryMin: 0,
  salaryMax: 500000,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      isAuthenticated: false,
      user: null,

      login: async (email: string, _password: string) => {
        await new Promise((r) => setTimeout(r, 800));
        if (email) {
          set({
            isAuthenticated: true,
            user: { ...defaultUser, email },
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },

      register: async (name: string, email: string, _password: string) => {
        await new Promise((r) => setTimeout(r, 1000));
        set({
          isAuthenticated: true,
          user: {
            ...defaultUser,
            name,
            email,
            plan: "free",
          },
        });
        return true;
      },

      // Theme
      theme: "dark",
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        set({ theme: next });
        document.documentElement.classList.toggle("dark", next === "dark");
        document.documentElement.classList.toggle("light", next === "light");
      },
      setTheme: (theme: Theme) => {
        set({ theme });
        document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.classList.toggle("light", theme === "light");
      },

      // Sidebar
      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

      // Bookmarks
      bookmarkedJobs: jobListings.filter((j) => j.bookmarked).map((j) => j.id),
      toggleBookmark: (jobId: string) => {
        const current = get().bookmarkedJobs;
        const updated = current.includes(jobId)
          ? current.filter((id) => id !== jobId)
          : [...current, jobId];
        set({ bookmarkedJobs: updated });
      },

      // Filters
      jobFilters: defaultFilters,
      setJobFilter: (key, value) =>
        set((s) => ({ jobFilters: { ...s.jobFilters, [key]: value } })),
      resetJobFilters: () => set({ jobFilters: defaultFilters }),

      // Notifications
      notifications: {
        email: true,
        push: false,
        weeklyReport: true,
        salaryAlerts: true,
        newJobs: false,
      },
      setNotification: (key, value) =>
        set((s) => ({ notifications: { ...s.notifications, [key]: value } })),
    }),
    {
      name: "jobfind-storage",
      partialize: (state) => ({
        theme: state.theme,
        bookmarkedJobs: state.bookmarkedJobs,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        notifications: state.notifications,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
