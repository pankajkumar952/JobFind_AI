// ============================================================
// JobFind AI — ChartCard wrapper
// ============================================================
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  action?: React.ReactNode;
}

export default function ChartCard({ title, subtitle, children, className, delay = 0, action }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      className={cn("glass-card p-5 flex flex-col gap-4", className)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white/90">{title}</h3>
          {subtitle && <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      {children}
    </motion.div>
  );
}
