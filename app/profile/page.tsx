"use client";

import AppShell from "@/components/AppShell";
import ScreenHeader from "@/components/ScreenHeader";
import { useT } from "@/components/LanguageProvider";
import {
  ChevronRight,
  MessageCircle,
  FileText,
  Shield,
  LogOut,
  Users,
  LucideIcon,
} from "lucide-react";

type Item = { icon: LucideIcon; label: string; value?: string; badge?: string };

export default function Profile() {
  const { t } = useT();

  const items: Item[] = [
    { icon: MessageCircle, label: t("profile.advisory.concierge"), value: "Rohan K.", badge: t("common.online") },
    { icon: Users, label: t("profile.advisory.psip"), value: t("profile.advisory.psip.sub") },
    { icon: FileText, label: t("profile.account.docs"), value: t("profile.account.docs.sub") },
    { icon: Shield, label: t("profile.account.privacy") },
  ];

  return (
    <AppShell>
      <ScreenHeader title={t("profile.title")} />

      {/* Profile card — the hero */}
      <div className="px-6 mt-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold/[0.16] via-gold/[0.04] to-white border border-gold/25 p-6 shadow-[0_8px_24px_-8px_rgba(91,33,182,0.18)]">
          <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-gold/[0.22] blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gold to-gold-deep flex items-center justify-center text-[28px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(91,33,182,0.4)]">
              U
            </div>
            <p className="mt-4 text-[20px] font-semibold tracking-tight">Utkarsh Patidar</p>
            <span className="mt-2 inline-block text-[10px] px-2.5 py-1 rounded-full bg-gradient-to-r from-gold to-gold-deep text-white font-semibold tracking-wider">
              {t("profile.tier")}
            </span>
          </div>
        </div>
      </div>

      {/* Settings list — one clean stack, no section noise */}
      <div className="px-6 mt-10">
        <div className="rounded-2xl bg-bg-card border border-line divide-y divide-line overflow-hidden">
          {items.map((it) => (
            <button
              key={it.label}
              className="w-full flex items-center gap-4 px-5 py-4 hover:bg-bg-elevated transition text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-brand/[0.08] border border-brand/15 flex items-center justify-center shrink-0">
                <it.icon size={16} className="text-brand" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium tracking-tight">{it.label}</p>
                {it.value && <p className="text-[11px] text-ink-muted mt-0.5">{it.value}</p>}
              </div>
              {it.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand/10 text-brand border border-brand/25 font-medium">
                  {it.badge}
                </span>
              )}
              <ChevronRight size={15} className="text-ink-muted shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Sign out — minimal */}
      <div className="px-6 mt-10">
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-ink-secondary text-[13px] font-medium hover:bg-bg-card transition">
          <LogOut size={14} /> {t("profile.signout")}
        </button>
      </div>
    </AppShell>
  );
}
