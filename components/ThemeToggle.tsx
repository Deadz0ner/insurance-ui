"use client";

import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      className="relative inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-bg-card border border-line text-[11px] font-medium text-ink-secondary hover:text-ink-primary transition overflow-hidden"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -10, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 10, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5"
        >
          {isDark ? <Sun size={12} className="text-gold" /> : <Moon size={12} className="text-brand" />}
          <span>{isDark ? "Light" : "Dark"}</span>
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
