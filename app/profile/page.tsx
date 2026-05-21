"use client";

import AppShell from "@/components/AppShell";
import ScreenHeader from "@/components/ScreenHeader";
import { useT } from "@/components/LanguageProvider";
import {
  ChevronRight,
  MessageCircle,
  FileText,
  Shield,
  Settings,
  LogOut,
  Users,
  LucideIcon,
} from "lucide-react";

type Item = { icon: LucideIcon; label: string; value?: string; badge?: string };

export default function Profile() {
  const { t } = useT();

  const sections: { title: string; items: Item[] }[] = [
    {
      title: t("profile.section.advisory"),
      items: [
        { icon: MessageCircle, label: t("profile.advisory.concierge"), value: "Rohan K.", badge: t("common.online") },
        { icon: Users, label: t("profile.advisory.psip"), value: t("profile.advisory.psip.sub") },
      ],
    },
    {
      title: t("profile.section.account"),
      items: [
        { icon: FileText, label: t("profile.account.docs"), value: t("profile.account.docs.sub") },
        { icon: Shield, label: t("profile.account.privacy") },
        { icon: Settings, label: t("profile.account.settings") },
      ],
    },
  ];

  return (
    <AppShell>
      <ScreenHeader title={t("profile.title")} />

      {/* Profile card */}
      <div className="px-5">
        <div className="rounded-3xl bg-gradient-to-br from-bg-elevated to-bg-card border border-line p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-bg-base border border-line flex items-center justify-center text-[24px]">
              U
            </div>
            <div className="flex-1">
              <p className="text-[18px] font-semibold tracking-tight">Utkarsh Patidar</p>
              <p className="text-[11px] text-ink-muted">utkarsh.patidar@primathon.in</p>
              <span className="mt-1.5 inline-block text-[10px] px-2 py-0.5 rounded-full bg-ink-primary text-bg-base font-medium">
                {t("profile.tier")}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-line grid grid-cols-3 gap-3 text-[11px]">
            <div>
              <p className="text-ink-muted">{t("profile.since")}</p>
              <p className="text-ink-primary font-medium text-[13px]">2022</p>
            </div>
            <div>
              <p className="text-ink-muted">{t("profile.policies")}</p>
              <p className="text-ink-primary font-medium text-[13px]">4</p>
            </div>
            <div>
              <p className="text-ink-muted">{t("profile.nps")}</p>
              <p className="text-success font-medium text-[13px]">76</p>
            </div>
          </div>
        </div>
      </div>

      {sections.map((sec) => (
        <div key={sec.title} className="px-5 mt-5">
          <p className="text-[10px] uppercase tracking-widest text-ink-muted mb-2 px-1">{sec.title}</p>
          <div className="rounded-2xl bg-bg-card border border-line divide-y divide-line">
            {sec.items.map((it) => (
              <button
                key={it.label}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-bg-elevated transition text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-bg-elevated border border-line flex items-center justify-center">
                  <it.icon size={15} className="text-ink-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px]">{it.label}</p>
                  {it.value && <p className="text-[10px] text-ink-muted">{it.value}</p>}
                </div>
                {it.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/15 text-success">
                    {it.badge}
                  </span>
                )}
                <ChevronRight size={15} className="text-ink-muted" />
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="px-5 mt-5">
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-bg-card border border-line text-ink-secondary text-[13px] hover:bg-bg-elevated transition">
          <LogOut size={14} /> {t("profile.signout")}
        </button>
        <p className="text-center text-[10px] text-ink-dim mt-3">{t("profile.footer")}</p>
      </div>
    </AppShell>
  );
}
