"use client";

import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import ScreenHeader from "@/components/ScreenHeader";
import { policies } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import { Sparkles, Check, X } from "lucide-react";

export default function PolicyDetail({ params }: { params: { id: string } }) {
  const { t } = useT();
  const policy = policies.find((p) => p.id === params.id);
  if (!policy) return notFound();

  const covered = [
    t("policy.covered.1"),
    t("policy.covered.2"),
    t("policy.covered.3"),
    t("policy.covered.4"),
  ];
  const excluded = [t("policy.excluded.1"), t("policy.excluded.2")];

  const memberLabel = (m: string) => {
    if (m === "Self") return t("policy.member.self");
    if (m === "Spouse") return t("policy.member.spouse");
    if (m === "Child") return t("policy.member.child");
    return m;
  };

  return (
    <AppShell>
      <ScreenHeader title={policy.insurer} back="/wallet" />

      {/* Hero — only the headline number */}
      <div className="px-6 mt-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand/[0.14] via-brand/[0.03] to-white border border-brand/20 p-6 shadow-[0_8px_24px_-8px_rgba(124,58,237,0.15)]">
          <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-brand/[0.18] blur-3xl" />

          <p className="relative text-[10px] text-brand uppercase tracking-[0.15em] font-semibold">
            {t(`wallet.filter.${policy.type.toLowerCase()}` as any)} · {policy.product}
          </p>
          <p className="relative mt-3 text-[42px] font-semibold tracking-tight leading-none bg-gradient-to-r from-brand-deep to-brand bg-clip-text text-transparent">
            {policy.sumInsured}
          </p>
          <p className="relative mt-2 text-[12px] text-ink-secondary">
            {t("policy.sum")}
          </p>

          <div className="relative mt-6 pt-5 border-t border-brand/15 flex items-center gap-5 text-[11.5px]">
            <div>
              <p className="text-ink-muted">{t("policy.premiumYr")}</p>
              <p className="text-ink-primary font-semibold text-[13px] mt-0.5">{policy.premium}</p>
            </div>
            <div className="w-px h-8 bg-brand/15" />
            <div>
              <p className="text-ink-muted">{t("policy.renewsIn")}</p>
              <p className={`font-semibold text-[13px] mt-0.5 ${policy.status === "Expiring" ? "text-warning" : "text-brand"}`}>
                {policy.renewIn}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KYP — single AI insight, no clutter */}
      <div className="px-6 mt-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
            <Sparkles size={13} className="text-brand" />
          </div>
          <h2 className="text-[16px] font-semibold tracking-tight">{t("policy.kyp.title")}</h2>
        </div>
        <p className="text-[14px] text-ink-secondary leading-relaxed">
          {t("policy.kyp.body")}
        </p>
      </div>

      {/* Members */}
      {policy.members && (
        <div className="px-6 mt-10">
          <h2 className="text-[16px] font-semibold tracking-tight mb-4">{t("policy.members")}</h2>
          <div className="flex gap-3">
            {policy.members.map((m) => {
              const lab = memberLabel(m);
              return (
                <div
                  key={m}
                  className="flex-1 px-3 py-4 rounded-2xl bg-bg-card border border-line text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 mx-auto mb-2 flex items-center justify-center text-[14px] font-semibold text-brand">
                    {lab[0]}
                  </div>
                  <p className="text-[11.5px] text-ink-secondary">{lab}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Coverage — clear two-list pattern */}
      <div className="px-6 mt-10">
        <h2 className="text-[16px] font-semibold tracking-tight mb-4">{t("policy.covered")}</h2>
        <div className="space-y-2">
          {covered.map((c) => (
            <div key={c} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-bg-card border border-line">
              <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                <Check size={12} className="text-brand" strokeWidth={2.8} />
              </div>
              <p className="text-[13px] text-ink-primary">{c}</p>
            </div>
          ))}
          {excluded.map((c) => (
            <div key={c} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-bg-card border border-line">
              <div className="w-6 h-6 rounded-full bg-ink-muted/10 flex items-center justify-center shrink-0">
                <X size={12} className="text-ink-muted" strokeWidth={2.4} />
              </div>
              <p className="text-[13px] text-ink-muted line-through">{c}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
