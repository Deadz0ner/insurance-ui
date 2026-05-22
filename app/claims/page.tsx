"use client";

import AppShell from "@/components/AppShell";
import ScreenHeader from "@/components/ScreenHeader";
import { claims } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import { Zap, Camera, FileText, Hospital, Check, ChevronRight, Clock } from "lucide-react";

export default function Claims() {
  const { t } = useT();
  const active = claims.find((c) => c.status !== "Settled");
  const steps = [t("claims.step.filed"), t("claims.step.assessing"), t("claims.step.approved"), t("claims.step.settled")];

  const statusLabel = (s: string) => {
    if (s === "Filed") return t("claims.step.filed");
    if (s === "Assessing") return t("claims.step.assessing");
    if (s === "Approved") return t("claims.step.approved");
    return t("claims.step.settled");
  };

  return (
    <AppShell>
      <ScreenHeader title={t("claims.title")} subtitle={t("claims.sub")} />

      {/* File new */}
      <div className="px-5">
        <button className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-bg-elevated to-bg-card border border-line p-5 text-left active:scale-[0.98] transition">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[0.05] blur-3xl" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-ink-primary text-bg-base flex items-center justify-center">
              <Zap size={20} strokeWidth={2.4} />
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-semibold">{t("claims.file.title")}</p>
              <p className="text-[12px] text-ink-muted">{t("claims.file.sub")}</p>
            </div>
            <ChevronRight size={18} className="text-ink-muted" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { icon: Camera, label: t("claims.opt.photo") },
              { icon: Hospital, label: t("claims.opt.cashless") },
              { icon: FileText, label: t("claims.opt.reimburse") },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-bg-base/60 border border-line"
              >
                <Icon size={12} className="text-ink-secondary" />
                <span className="text-[10px] text-ink-secondary">{label}</span>
              </div>
            ))}
          </div>
        </button>
      </div>

      {/* Active claim tracker */}
      {active && (
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-semibold">{t("claims.active")}</h2>
            <span className="text-[10px] text-ink-muted flex items-center gap-1">
              <Clock size={11} /> {t("claims.updated")}
            </span>
          </div>

          <div className="rounded-2xl bg-bg-card border border-line p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold">{active.type}</p>
                <p className="text-[11px] text-ink-muted">{active.policy} · {active.date}</p>
              </div>
              <p className="text-[16px] font-semibold">{active.amount}</p>
            </div>

            <div className="mt-5 relative">
              <div className="absolute top-3 left-3 right-3 h-px bg-line" />
              <div
                className="absolute top-3 left-3 h-px bg-ink-primary transition-all"
                style={{ width: `${((active.step - 1) / (steps.length - 1)) * 92}%` }}
              />
              <div className="relative flex justify-between">
                {steps.map((s, i) => {
                  const done = i < active.step;
                  const current = i === active.step - 1;
                  return (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                          done
                            ? "bg-ink-primary border-ink-primary text-bg-base"
                            : current
                            ? "bg-bg-card border-ink-primary text-ink-primary"
                            : "bg-bg-card border-line text-ink-muted"
                        }`}
                      >
                        {done ? <Check size={11} strokeWidth={3} /> : i + 1}
                      </div>
                      <span
                        className={`text-[10px] text-center ${
                          done || current ? "text-ink-primary font-medium" : "text-ink-muted"
                        }`}
                      >
                        {s}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-line">
              <p className="text-[11px] text-ink-muted">{t("claims.next")}</p>
              <p className="text-[12px] text-ink-primary mt-0.5">{t("claims.next.body")}</p>
            </div>

            <button className="mt-3 w-full py-2.5 rounded-xl bg-bg-elevated border border-line text-[12px] font-medium text-ink-primary hover:bg-bg-base transition">
              {t("claims.concierge")}
            </button>
          </div>
        </div>
      )}

      {/* History */}
      <div className="px-5 mt-6">
        <h2 className="text-[14px] font-semibold mb-3">{t("claims.history")}</h2>
        <div className="space-y-2">
          {claims.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-bg-card border border-line"
            >
              <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-line flex items-center justify-center">
                <FileText size={15} className="text-ink-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate">{c.type}</p>
                <p className="text-[11px] text-ink-muted">{c.policy} · {c.date}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-semibold">{c.amount}</p>
                <span
                  className={`text-[10px] font-medium ${
                    c.status === "Settled" || c.status === "Approved" ? "text-success" : "text-warning"
                  }`}
                >
                  {statusLabel(c.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help banner */}
      <div className="px-5 mt-5">
        <div className="rounded-2xl border border-line bg-bg-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-line flex items-center justify-center">
            🛡️
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-semibold">{t("claims.help.title")}</p>
            <p className="text-[10px] text-ink-muted">{t("claims.help.sub")}</p>
          </div>
          <ChevronRight size={16} className="text-ink-muted" />
        </div>
      </div>
    </AppShell>
  );
}
