"use client";

import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import ScreenHeader from "@/components/ScreenHeader";
import { policies } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import {
  FileText,
  Sparkles,
  MessageCircle,
  Download,
  Hospital,
  Shield,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

export default function PolicyDetail({ params }: { params: { id: string } }) {
  const { t } = useT();
  const policy = policies.find((p) => p.id === params.id);
  if (!policy) return notFound();

  const covered = [
    t("policy.covered.1"),
    t("policy.covered.2"),
    t("policy.covered.3"),
    t("policy.covered.4"),
    t("policy.covered.5"),
  ];
  const excluded = [t("policy.excluded.1"), t("policy.excluded.2"), t("policy.excluded.3")];

  const memberLabel = (m: string) => {
    if (m === "Self") return t("policy.member.self");
    if (m === "Spouse") return t("policy.member.spouse");
    if (m === "Child") return t("policy.member.child");
    return m;
  };

  return (
    <AppShell>
      <ScreenHeader title={policy.insurer} subtitle={policy.product} back="/wallet" />

      {/* Hero */}
      <div className="px-5">
        <div className="rounded-3xl bg-gradient-to-br from-bg-elevated to-bg-card border border-line p-5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-ink-muted">
              {t(`wallet.filter.${policy.type.toLowerCase()}` as any)} · {policy.status === "Expiring" ? t("wallet.status.expiring") : t("wallet.status.active")}
            </span>
            <span className="text-[10px] text-ink-muted">{policy.policyNo}</span>
          </div>
          <p className="mt-3 text-[34px] font-semibold tracking-tight">{policy.sumInsured}</p>
          <p className="text-[11px] text-ink-secondary">{t("policy.sum")}</p>

          <div className="mt-4 pt-4 border-t border-line grid grid-cols-3 gap-3 text-[11px]">
            <div>
              <p className="text-ink-muted">{t("policy.premiumYr")}</p>
              <p className="text-ink-primary font-medium text-[13px]">{policy.premium}/yr</p>
            </div>
            <div>
              <p className="text-ink-muted">{t("policy.validTill")}</p>
              <p className="text-ink-primary font-medium text-[13px]">{policy.endDate}</p>
            </div>
            <div>
              <p className="text-ink-muted">{t("policy.renewsIn")}</p>
              <p className={`font-medium text-[13px] ${policy.status === "Expiring" ? "text-warning" : "text-ink-primary"}`}>
                {policy.renewIn}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action grid */}
      <div className="px-5 mt-4 grid grid-cols-4 gap-2">
        {[
          { icon: FileText, label: t("policy.action.doc") },
          { icon: Hospital, label: t("policy.action.hospitals") },
          { icon: Download, label: t("policy.action.download") },
          { icon: Shield, label: t("policy.action.compare") },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-bg-card border border-line hover:bg-bg-elevated transition"
          >
            <Icon size={16} className="text-ink-primary" />
            <span className="text-[10px] text-ink-secondary text-center px-1">{label}</span>
          </button>
        ))}
      </div>

      {/* KYP Summary */}
      <div className="px-5 mt-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-ink-primary" />
          <h2 className="text-[14px] font-semibold">{t("policy.kyp.title")}</h2>
          <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-bg-card border border-line text-ink-muted uppercase tracking-wider">
            AI
          </span>
        </div>
        <div className="rounded-2xl bg-bg-card border border-line p-4 text-[13px] text-ink-secondary leading-relaxed">
          {t("policy.kyp.body")} <span className="text-ink-primary underline">{t("policy.kyp.read")}</span>
        </div>
      </div>

      {/* Members */}
      {policy.members && (
        <div className="px-5 mt-5">
          <h2 className="text-[14px] font-semibold mb-3">{t("policy.members")}</h2>
          <div className="flex gap-2">
            {policy.members.map((m) => {
              const lab = memberLabel(m);
              return (
                <div key={m} className="flex-1 px-3 py-3 rounded-2xl bg-bg-card border border-line text-center">
                  <div className="w-8 h-8 rounded-full bg-bg-elevated border border-line mx-auto mb-1.5 flex items-center justify-center text-[12px]">
                    {lab[0]}
                  </div>
                  <p className="text-[11px] text-ink-secondary">{lab}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Coverage */}
      <div className="px-5 mt-5">
        <h2 className="text-[14px] font-semibold mb-3">{t("policy.covered")}</h2>
        <div className="rounded-2xl bg-bg-card border border-line divide-y divide-line">
          {covered.map((c) => (
            <div key={c} className="flex items-center gap-3 px-4 py-3">
              <div className="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center">
                <Check size={12} className="text-success" />
              </div>
              <p className="text-[13px] text-ink-primary">{c}</p>
            </div>
          ))}
          {excluded.map((c) => (
            <div key={c} className="flex items-center gap-3 px-4 py-3">
              <div className="w-6 h-6 rounded-full bg-danger/15 flex items-center justify-center">
                <X size={12} className="text-danger" />
              </div>
              <p className="text-[13px] text-ink-muted line-through">{c}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ask Your Policy */}
      <div className="px-5 mt-5 mb-5">
        <button className="w-full rounded-2xl bg-bg-card border border-line p-4 flex items-center gap-3 hover:bg-bg-elevated transition">
          <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-line flex items-center justify-center">
            <MessageCircle size={16} className="text-ink-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[13px] font-medium">{t("policy.ask.title")}</p>
            <p className="text-[11px] text-ink-muted">{t("policy.ask.sub")}</p>
          </div>
          <ChevronRight size={16} className="text-ink-muted" />
        </button>
      </div>
    </AppShell>
  );
}
