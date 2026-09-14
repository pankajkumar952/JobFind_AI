// ============================================================
// JobFind AI — App Router
// Aurora Glassmorphism SaaS Analytics Platform
// ============================================================
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";
import { useAppStore } from "./store/useAppStore";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import JobListings from "./pages/JobListings";
import SkillAnalytics from "./pages/SkillAnalytics";
import CompanyInsights from "./pages/CompanyInsights";
import SalaryTrends from "./pages/SalaryTrends";
import AIInsights from "./pages/AIInsights";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function ThemeInitializer() {
  const { theme } = useAppStore();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/jobs" component={JobListings} />
      <Route path="/skills" component={SkillAnalytics} />
      <Route path="/companies" component={CompanyInsights} />
      <Route path="/salary" component={SalaryTrends} />
      <Route path="/ai-insights" component={AIInsights} />
      <Route path="/settings" component={Settings} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <ThemeInitializer />
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
