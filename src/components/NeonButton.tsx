import type { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "motion/react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export function NeonButton({
  children,
  variant = "secondary",
  className = "",
  ...props
}: NeonButtonProps) {
  const variants = {
    primary:
      "border-cyan-300/70 bg-cyan-300/10 text-cyan-100 hover:bg-cyan-300/15 hover:shadow-[0_0_24px_rgba(34,211,238,.18)]",
    secondary:
      "border-slate-600/70 bg-slate-950/45 text-slate-200 hover:border-violet-400/70 hover:text-white",
    danger:
      "border-fuchsia-400/50 bg-fuchsia-400/5 text-fuchsia-200 hover:bg-fuchsia-400/10",
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.14 }}
      className={`min-h-11 border px-4 py-2 text-sm font-semibold tracking-[0.08em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
