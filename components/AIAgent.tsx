"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Mic, ArrowUp } from "lucide-react";
import { useT } from "./LanguageProvider";
import type { TKey } from "@/lib/i18n";

type CtxKeys = { labelKey: TKey; introKey: TKey; suggestions: TKey[] };

function getContextKeys(pathname: string): CtxKeys {
  if (pathname.startsWith("/policy/")) {
    return {
      labelKey: "ai.ctx.policy",
      introKey: "ai.ctx.policy.intro",
      suggestions: ["ai.sug.policy.1", "ai.sug.policy.2", "ai.sug.policy.3"],
    };
  }
  if (pathname.startsWith("/dashboard")) {
    return {
      labelKey: "ai.ctx.dashboard",
      introKey: "ai.ctx.dashboard.intro",
      suggestions: ["ai.sug.dash.1", "ai.sug.dash.2", "ai.sug.dash.3"],
    };
  }
  if (pathname.startsWith("/wallet")) {
    return {
      labelKey: "ai.ctx.wallet",
      introKey: "ai.ctx.wallet.intro",
      suggestions: ["ai.sug.wallet.1", "ai.sug.wallet.2", "ai.sug.wallet.3"],
    };
  }
  if (pathname.startsWith("/claims")) {
    return {
      labelKey: "ai.ctx.claims",
      introKey: "ai.ctx.claims.intro",
      suggestions: ["ai.sug.claims.1", "ai.sug.claims.2", "ai.sug.claims.3"],
    };
  }
  if (pathname.startsWith("/benefits")) {
    return {
      labelKey: "ai.ctx.benefits",
      introKey: "ai.ctx.benefits.intro",
      suggestions: ["ai.sug.ben.1", "ai.sug.ben.2", "ai.sug.ben.3"],
    };
  }
  if (pathname.startsWith("/profile")) {
    return {
      labelKey: "ai.ctx.profile",
      introKey: "ai.ctx.profile.intro",
      suggestions: ["ai.sug.profile.1", "ai.sug.profile.2", "ai.sug.profile.3"],
    };
  }
  return {
    labelKey: "ai.title",
    introKey: "ai.ctx.dashboard.intro",
    suggestions: [],
  };
}

export default function AIAgent() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useT();
  const ctx = getContextKeys(pathname);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileTap={{ scale: 0.92 }}
        className="absolute bottom-28 right-4 z-30 w-12 h-12 rounded-full bg-gradient-to-br from-coral to-coral-deep text-white flex items-center justify-center shadow-[0_10px_28px_-6px_rgba(124,58,237,0.55),0_0_0_4px_rgba(124,58,237,0.12)] active:scale-95"
        aria-label={t("ai.title")}
      >
        <Sparkles size={18} strokeWidth={2.6} />
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-brand border-[2px] border-bg-base" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
              className="absolute left-0 right-0 bottom-0 z-50 bg-bg-surface border-t border-line rounded-t-[28px] flex flex-col overflow-hidden"
              style={{ height: "82%" }}
            >
              <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-40 rounded-full bg-white/[0.04] blur-3xl" />

              <div className="pt-3 flex justify-center shrink-0">
                <div className="w-10 h-1 rounded-full bg-line" />
              </div>

              <div className="px-5 pt-3 pb-3 flex items-center justify-between border-b border-line shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-coral/20 to-coral/5 border border-coral/30 flex items-center justify-center">
                    <Sparkles size={15} className="text-coral-deep" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-brand border-[2px] border-bg-surface" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold tracking-tight">{t("ai.title")}</p>
                    <p className="text-[10px] text-ink-muted">
                      {t("ai.viewing")} <span className="text-ink-secondary">{t(ctx.labelKey)}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full bg-bg-card border border-line flex items-center justify-center text-ink-secondary hover:text-ink-primary transition"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="flex-1 px-5 py-4 overflow-y-auto phone-scroll space-y-3">
                <div className="flex gap-2 animate-fade-in">
                  <div className="w-7 h-7 rounded-lg bg-coral/10 border border-coral/25 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={11} className="text-coral-deep" />
                  </div>
                  <div className="rounded-2xl rounded-tl-md bg-bg-card border border-line p-3 max-w-[82%]">
                    <p className="text-[12.5px] text-ink-primary leading-relaxed">
                      {t("ai.hi")} {t(ctx.introKey)}
                    </p>
                  </div>
                </div>

                {ctx.suggestions[0] && (
                  <div className="flex justify-end animate-fade-in">
                    <div className="rounded-2xl rounded-tr-md bg-gradient-to-br from-brand to-brand-deep text-white p-3 max-w-[82%] shadow-[0_4px_14px_-4px_rgba(124,58,237,0.35)]">
                      <p className="text-[12.5px] leading-relaxed font-semibold">{t(ctx.suggestions[0])}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 animate-fade-in">
                  <div className="w-7 h-7 rounded-lg bg-coral/10 border border-coral/25 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={11} className="text-coral-deep" />
                  </div>
                  <div className="rounded-2xl rounded-tl-md bg-bg-card border border-line p-3 max-w-[82%] space-y-2.5">
                    <p className="text-[12.5px] text-ink-primary leading-relaxed">{t("ai.read")}</p>
                    <ul className="text-[12px] text-ink-secondary space-y-1.5">
                      {(["ai.bullet.1", "ai.bullet.2", "ai.bullet.3"] as TKey[]).map((k) => (
                        <li key={k} className="flex gap-2">
                          <span className="text-ink-muted">•</span>
                          <span>{t(k)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <button className="text-[10.5px] px-2.5 py-1 rounded-full bg-bg-elevated border border-line text-ink-primary">
                        {t("ai.cta.plan")}
                      </button>
                      <button className="text-[10.5px] px-2.5 py-1 rounded-full bg-bg-elevated border border-line text-ink-primary">
                        {t("ai.cta.notify")}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-lg bg-coral/10 border border-coral/25 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={11} className="text-coral-deep" />
                  </div>
                  <div className="rounded-2xl bg-bg-card border border-line px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                        className="w-1.5 h-1.5 rounded-full bg-ink-secondary"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {ctx.suggestions.length > 0 && (
                <div className="px-5 pt-2 pb-2 flex gap-2 overflow-x-auto phone-scroll shrink-0">
                  {ctx.suggestions.map((s) => (
                    <button
                      key={s}
                      className="px-3 py-1.5 rounded-full text-[11px] text-ink-secondary bg-bg-card border border-line whitespace-nowrap hover:text-ink-primary hover:bg-bg-elevated transition shrink-0"
                    >
                      {t(s)}
                    </button>
                  ))}
                </div>
              )}

              <div className="px-4 pt-2 pb-5 border-t border-line shrink-0 bg-bg-surface">
                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-bg-card border border-line focus-within:border-ink-muted transition">
                  <input
                    placeholder={t("ai.input")}
                    className="flex-1 bg-transparent outline-none text-[13px] text-ink-primary placeholder:text-ink-muted py-1"
                  />
                  <button className="w-8 h-8 rounded-full text-ink-secondary hover:text-ink-primary flex items-center justify-center transition">
                    <Mic size={15} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-gradient-to-br from-coral to-coral-deep text-white flex items-center justify-center active:scale-95 transition shadow-[0_4px_12px_-2px_rgba(124,58,237,0.45)]">
                    <ArrowUp size={14} strokeWidth={2.8} />
                  </button>
                </div>
                <p className="text-center text-[9.5px] text-ink-dim mt-2">{t("ai.disclaimer")}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
