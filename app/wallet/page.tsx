"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import ScreenHeader from "@/components/ScreenHeader";
import { policies } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import { Heart, Car, Plane, Activity, Plus, Search } from "lucide-react";

const typeIcon = {
  Health: Heart,
  Motor: Car,
  Life: Activity,
  Travel: Plane,
};

export default function Wallet() {
  const { t } = useT();
  const filters: { key: string; label: string }[] = [
    { key: "all", label: t("wallet.filter.all") },
    { key: "health", label: t("wallet.filter.health") },
    { key: "motor", label: t("wallet.filter.motor") },
    { key: "life", label: t("wallet.filter.life") },
    { key: "travel", label: t("wallet.filter.travel") },
  ];

  const totalCover = "₹2.16 Cr";
  const totalPremium = "₹46,740";

  return (
    <AppShell>
      <ScreenHeader
        title={t("wallet.title")}
        subtitle={t("wallet.sub")}
        right={
          <button className="w-9 h-9 rounded-full bg-bg-card border border-line flex items-center justify-center">
            <Plus size={17} className="text-ink-primary" />
          </button>
        }
      />

      {/* Summary card */}
      <div className="px-5">
        <div className="rounded-3xl bg-gradient-to-br from-bg-elevated to-bg-card border border-line p-5">
          <p className="text-[11px] text-ink-muted uppercase tracking-widest">{t("wallet.total")}</p>
          <p className="mt-1 text-[34px] font-semibold tracking-tight">{totalCover}</p>
          <div className="mt-4 flex items-center gap-4 pt-4 border-t border-line">
            <div className="flex-1">
              <p className="text-[10px] text-ink-muted">{t("wallet.annual")}</p>
              <p className="text-[14px] font-medium">{totalPremium}</p>
            </div>
            <div className="w-px h-8 bg-line" />
            <div className="flex-1">
              <p className="text-[10px] text-ink-muted">{t("wallet.insurers")}</p>
              <p className="text-[14px] font-medium">4</p>
            </div>
            <div className="w-px h-8 bg-line" />
            <div className="flex-1">
              <p className="text-[10px] text-ink-muted">{t("wallet.eia")}</p>
              <p className="text-[14px] font-medium text-success">{t("common.yes")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-bg-card border border-line">
          <Search size={15} className="text-ink-muted" />
          <input
            placeholder={t("wallet.search")}
            className="bg-transparent outline-none text-[13px] text-ink-primary placeholder:text-ink-muted flex-1"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 flex gap-2 px-5 overflow-x-auto phone-scroll">
        {filters.map((f, i) => (
          <button
            key={f.key}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap border transition ${
              i === 0
                ? "bg-ink-primary text-bg-base border-ink-primary"
                : "bg-bg-card text-ink-secondary border-line hover:text-ink-primary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Policies list */}
      <div className="px-5 mt-5 space-y-3">
        {policies.map((p) => {
          const Icon = typeIcon[p.type];
          const isExpiring = p.status === "Expiring";
          return (
            <Link
              key={p.id}
              href={`/policy/${p.id}`}
              className="block rounded-2xl bg-bg-card border border-line p-4 hover:bg-bg-elevated transition"
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-bg-elevated border border-line flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-ink-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] font-semibold">{p.insurer}</p>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isExpiring
                          ? "bg-warning/15 text-warning border border-warning/30"
                          : "bg-success/10 text-success border border-success/20"
                      }`}
                    >
                      {isExpiring ? t("wallet.status.expiring") : t("wallet.status.active")}
                    </span>
                  </div>
                  <p className="text-[12px] text-ink-secondary truncate">{p.product}</p>

                  <div className="mt-3 flex items-center gap-3 text-[11px]">
                    <div>
                      <p className="text-ink-muted">{t("wallet.cover")}</p>
                      <p className="text-ink-primary font-medium">{p.sumInsured}</p>
                    </div>
                    <div className="w-px h-7 bg-line" />
                    <div>
                      <p className="text-ink-muted">{t("wallet.premium")}</p>
                      <p className="text-ink-primary font-medium">{p.premium}</p>
                    </div>
                    <div className="w-px h-7 bg-line" />
                    <div>
                      <p className="text-ink-muted">{t("wallet.renews")}</p>
                      <p
                        className={`font-medium ${
                          isExpiring ? "text-warning" : "text-ink-primary"
                        }`}
                      >
                        {p.renewIn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Add policy CTA */}
      <div className="px-5 mt-4">
        <button className="w-full py-3.5 rounded-2xl border border-dashed border-line text-[13px] text-ink-secondary flex items-center justify-center gap-2 hover:bg-bg-card transition">
          <Plus size={15} /> {t("wallet.upload")}
        </button>
      </div>
    </AppShell>
  );
}
