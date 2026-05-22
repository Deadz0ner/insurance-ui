"use client";

import { Languages } from "lucide-react";
import { useT } from "./LanguageProvider";
import { cn } from "@/lib/utils";

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useT();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-full bg-bg-card/90 border border-line backdrop-blur-md",
        compact ? "text-[10px]" : "text-[11px]"
      )}
    >
      <Languages size={12} className="text-ink-muted ml-1.5" />
      <button
        onClick={() => setLang("en")}
        className={cn(
          "px-2.5 py-1 rounded-full font-medium tracking-wide transition",
          lang === "en"
            ? "bg-brand text-white shadow-[0_2px_8px_-2px_rgba(124,58,237,0.4)]"
            : "text-ink-secondary hover:text-ink-primary"
        )}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLang("hi")}
        className={cn(
          "px-2.5 py-1 rounded-full font-medium tracking-wide transition",
          lang === "hi"
            ? "bg-brand text-white shadow-[0_2px_8px_-2px_rgba(124,58,237,0.4)]"
            : "text-ink-secondary hover:text-ink-primary"
        )}
        aria-pressed={lang === "hi"}
      >
        हिं
      </button>
    </div>
  );
}
