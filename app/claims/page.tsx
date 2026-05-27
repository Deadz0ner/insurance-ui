"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import ScreenHeader from "@/components/ScreenHeader";
import { claims } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import {
  Zap,
  FileText,
  Check,
  ChevronRight,
  Camera,
  Sparkles,
  PhoneCall,
  ArrowRight,
} from "lucide-react";

export default function Claims() {
  const { t } = useT();
  const [showClaimFlow, setShowClaimFlow] = useState(false);
  const active = claims.find((c) => c.status !== "Settled");
  const steps = [
    t("claims.step.filed"),
    t("claims.step.assessing"),
    t("claims.step.approved"),
    t("claims.step.settled"),
  ];
  const filingSteps = [
    {
      icon: Camera,
      title: t("claims.filing.step1.title"),
      body: t("claims.filing.step1.body"),
      eta: t("claims.filing.step1.eta"),
    },
    {
      icon: Sparkles,
      title: t("claims.filing.step2.title"),
      body: t("claims.filing.step2.body"),
      eta: t("claims.filing.step2.eta"),
    },
    {
      icon: PhoneCall,
      title: t("claims.filing.step3.title"),
      body: t("claims.filing.step3.body"),
      eta: t("claims.filing.step3.eta"),
    },
  ];

  const statusLabel = (s: string) => {
    if (s === "Filed") return t("claims.step.filed");
    if (s === "Assessing") return t("claims.step.assessing");
    if (s === "Approved") return t("claims.step.approved");
    return t("claims.step.settled");
  };

  return (
    <AppShell>
      <ScreenHeader title={t("claims.title")} />

      {/* Big single action — file a claim */}
      <div className="px-6 mt-6">
        <button
          className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand/[0.14] via-brand/[0.03] to-white border border-brand/25 p-6 text-left active:scale-[0.98] transition shadow-[0_8px_24px_-8px_rgba(124,58,237,0.18)]"
          onClick={() => setShowClaimFlow((prev) => !prev)}
          aria-pressed={showClaimFlow}
        >
          <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-brand/[0.18] blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-brand-deep text-white flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(91,33,182,0.45)]">
              <Zap size={22} strokeWidth={2.2} />
            </div>
            <div className="flex-1">
              <p className="text-[17px] font-semibold tracking-tight">{t("claims.file.title")}</p>
              <p className="text-[12px] text-ink-secondary mt-1">{t("claims.file.sub")}</p>
            </div>
            <ChevronRight size={18} className="text-ink-muted" />
          </div>
        </button>

        {showClaimFlow && (
          <div className="mt-4 rounded-[28px] border border-brand/15 bg-gradient-to-b from-white/95 to-brand/[0.04] p-5 shadow-[0_16px_40px_-18px_rgba(91,33,182,0.28)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-brand font-semibold">
                  {t("claims.filing.kicker")}
                </p>
                <h2 className="mt-2 text-[18px] font-semibold tracking-tight text-ink-primary">
                  {t("claims.filing.title")}
                </h2>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-secondary">
                  {t("claims.filing.sub")}
                </p>
              </div>
              <div className="shrink-0 rounded-2xl bg-brand text-white px-3 py-2 text-[11px] font-semibold shadow-[0_12px_24px_-14px_rgba(91,33,182,0.6)]">
                {t("claims.filing.badge")}
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {filingSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.28)]"
                  >
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/[0.1] text-brand">
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[13.5px] font-semibold tracking-tight text-ink-primary">
                          {index + 1}. {step.title}
                        </p>
                        <span className="rounded-full bg-brand/[0.08] px-2.5 py-1 text-[10px] font-semibold text-brand">
                          {step.eta}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-ink-secondary">
                        {step.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-2 text-[12px] font-medium text-brand">
              <span>{t("claims.filing.footer")}</span>
              <ArrowRight size={14} strokeWidth={2.3} />
            </div>
          </div>
        )}
      </div>

      {/* Active claim tracker — focused, with air */}
      {active && (
        <div className="px-6 mt-10">
          <h2 className="text-[16px] font-semibold tracking-tight mb-4">{t("claims.active")}</h2>

          <div className="rounded-3xl bg-bg-card border border-line p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold tracking-tight truncate">{active.type}</p>
                <p className="text-[11.5px] text-ink-muted mt-1">{active.policy}</p>
              </div>
              <p className="text-[17px] font-semibold shrink-0">{active.amount}</p>
            </div>

            {/* Stepper — more vertical room */}
            <div className="mt-7 relative">
              <div className="absolute top-3 left-3 right-3 h-px bg-line" />
              <div
                className="absolute top-3 left-3 h-px bg-brand transition-all"
                style={{ width: `${((active.step - 1) / (steps.length - 1)) * 92}%` }}
              />
              <div className="relative flex justify-between">
                {steps.map((s, i) => {
                  const done = i < active.step;
                  const current = i === active.step - 1;
                  return (
                    <div key={s} className="flex flex-col items-center gap-2.5">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                          done
                            ? "bg-brand border-brand text-white"
                            : current
                            ? "bg-bg-card border-brand text-brand"
                            : "bg-bg-card border-line text-ink-muted"
                        }`}
                      >
                        {done ? <Check size={11} strokeWidth={3} /> : i + 1}
                      </div>
                      <span
                        className={`text-[10px] text-center ${
                          done
                            ? "text-brand font-medium"
                            : current
                            ? "text-ink-primary font-medium"
                            : "text-ink-muted"
                        }`}
                      >
                        {s}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-line">
              <p className="text-[10.5px] text-ink-muted uppercase tracking-wider font-medium">{t("claims.next")}</p>
              <p className="text-[13px] text-ink-primary mt-1.5 leading-relaxed">{t("claims.next.body")}</p>
            </div>
          </div>
        </div>
      )}

      {/* History — minimal list */}
      <div className="px-6 mt-10">
        <h2 className="text-[16px] font-semibold tracking-tight mb-4">{t("claims.history")}</h2>
        <div className="space-y-3">
          {claims.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-bg-card border border-line"
            >
              <div className="w-11 h-11 rounded-xl bg-brand/[0.08] border border-brand/15 flex items-center justify-center shrink-0">
                <FileText size={16} className="text-brand" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] font-semibold tracking-tight truncate">{c.type}</p>
                <p className="text-[11px] text-ink-muted mt-0.5">{c.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[13.5px] font-semibold">{c.amount}</p>
                <span
                  className={`text-[10px] font-medium ${
                    c.status === "Settled" || c.status === "Approved" ? "text-brand" : "text-warning"
                  }`}
                >
                  {statusLabel(c.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
