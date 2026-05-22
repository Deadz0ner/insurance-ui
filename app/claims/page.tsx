"use client";

import AppShell from "@/components/AppShell";
import ScreenHeader from "@/components/ScreenHeader";
import { claims } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import { Zap, FileText, Check, ChevronRight } from "lucide-react";

export default function Claims() {
  const { t } = useT();
  const active = claims.find((c) => c.status !== "Settled");
  const steps = [
    t("claims.step.filed"),
    t("claims.step.assessing"),
    t("claims.step.approved"),
    t("claims.step.settled"),
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
        <button className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand/[0.14] via-brand/[0.03] to-white border border-brand/25 p-6 text-left active:scale-[0.98] transition shadow-[0_8px_24px_-8px_rgba(124,58,237,0.18)]">
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
