"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Fingerprint } from "lucide-react";
import { useT } from "@/components/LanguageProvider";

export default function Welcome() {
  const { t } = useT();

  const pills: [string, string][] = [
    ["⚡", t("welcome.pill.claims")],
    ["🛡️", t("welcome.pill.insurers")],
    ["💰", t("welcome.pill.perks")],
    ["👤", t("welcome.pill.advisor")],
  ];

  return (
    <div className="relative min-h-full px-7 pt-16 pb-10 flex flex-col">
      <div className="absolute -top-40 -left-20 w-80 h-80 rounded-full bg-brand/[0.22] blur-3xl" />
      <div className="absolute top-40 -right-20 w-72 h-72 rounded-full bg-coral/[0.18] blur-3xl" />
      <div className="absolute bottom-10 -left-10 w-64 h-64 rounded-full bg-gold/[0.15] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2.5"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand/25 to-brand/5 border border-brand/30 flex items-center justify-center">
          <ShieldCheck size={18} className="text-brand" />
        </div>
        <div>
          <div className="text-[15px] font-semibold tracking-tight">InsureOne</div>
          <div className="text-[10px] text-ink-muted tracking-widest uppercase">{t("welcome.brand.by")}</div>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col justify-center -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-brand/30 bg-brand/[0.08] text-[11px] text-brand">
            <Sparkles size={11} /> {t("welcome.tagline")}
          </div>
          <h1 className="mt-6 text-[42px] leading-[1.05] font-semibold tracking-tight">
            {t("welcome.title.1")}
            <br />
            <span className="text-ink-muted">{t("welcome.title.2")}</span>
            <br />
            <span className="bg-gradient-to-r from-brand-deep via-brand to-coral bg-clip-text text-transparent">
              {t("welcome.title.3")}
            </span>
          </h1>
          <p className="mt-5 text-[14px] text-ink-secondary leading-relaxed max-w-[300px]">
            {t("welcome.sub")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 grid grid-cols-2 gap-2.5"
        >
          {pills.map(([emoji, text]) => (
            <div
              key={text}
              className="px-3 py-2.5 rounded-2xl bg-bg-card border border-line flex items-center gap-2"
            >
              <span className="text-[14px]">{emoji}</span>
              <span className="text-[12px] text-ink-secondary">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-3"
      >
        <Link
          href="/dashboard"
          className="w-full h-13 py-4 rounded-2xl bg-gradient-to-b from-brand to-brand-deep text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_8px_24px_-6px_rgba(91,33,182,0.35)] active:scale-[0.98] transition"
        >
          <Fingerprint size={18} /> {t("welcome.cta.bima")}
        </Link>
        <Link
          href="/dashboard"
          className="w-full py-3.5 rounded-2xl bg-bg-card border border-line text-ink-primary font-medium text-[14px] flex items-center justify-center hover:bg-bg-elevated transition"
        >
          {t("welcome.cta.mobile")}
        </Link>
        <p className="text-center text-[11px] text-ink-muted pt-1">
          {t("welcome.terms.prefix")} <span className="text-ink-secondary underline">{t("welcome.terms")}</span> {t("welcome.and")} <span className="text-ink-secondary underline">{t("welcome.privacy")}</span>
        </p>
      </motion.div>
    </div>
  );
}
