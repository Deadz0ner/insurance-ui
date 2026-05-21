"use client";

import AppShell from "@/components/AppShell";
import ScreenHeader from "@/components/ScreenHeader";
import { perks, walletBalance } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import { Clock, Gift, Wallet } from "lucide-react";

export default function Benefits() {
  const { t } = useT();
  const earned = 4250;
  const used = earned - walletBalance;

  const categories: { key: string; label: string }[] = [
    { key: "all", label: t("ben.cat.all") },
    { key: "movies", label: t("ben.cat.movies") },
    { key: "dining", label: t("ben.cat.dining") },
    { key: "travel", label: t("ben.cat.travel") },
    { key: "wellness", label: t("ben.cat.wellness") },
    { key: "shopping", label: t("ben.cat.shopping") },
  ];

  const perkTitle = (id: string) => {
    const map: Record<string, string> = {
      k1: t("perk.movies"),
      k2: t("perk.dining"),
      k3: t("perk.travel"),
      k4: t("perk.wellness"),
      k5: t("perk.shopping"),
      k6: t("perk.lounge"),
    };
    return map[id];
  };

  return (
    <AppShell>
      <ScreenHeader title={t("ben.title")} subtitle={t("ben.sub")} />

      {/* Balance hero */}
      <div className="px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bg-elevated to-bg-card border border-line p-6">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/[0.05] blur-3xl" />

          <div className="flex items-center gap-2">
            <Wallet size={14} className="text-ink-primary" />
            <p className="text-[10px] uppercase tracking-widest text-ink-muted">{t("ben.balance")}</p>
          </div>
          <p className="mt-2 text-[42px] font-semibold tracking-tight leading-none">
            ₹{walletBalance.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-ink-muted mt-1.5 flex items-center gap-1.5">
            <Clock size={11} /> {t("ben.expires")} <span className="text-ink-secondary">12 Jun 2027</span>
          </p>

          <div className="mt-5">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-ink-muted">
                {t("ben.used")} ₹{used.toLocaleString("en-IN")}
              </span>
              <span className="text-ink-secondary">
                {t("ben.earned")} ₹{earned.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-line overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-ink-primary to-ink-secondary rounded-full"
                style={{ width: `${(used / earned) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="px-5 mt-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: "💰", title: t("ben.how.1.title"), note: t("ben.how.1.sub") },
            { icon: "✨", title: t("ben.how.2.title"), note: t("ben.how.2.sub") },
            { icon: "🎁", title: t("ben.how.3.title"), note: t("ben.how.3.sub") },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl bg-bg-card border border-line p-3">
              <div className="text-[16px]">{s.icon}</div>
              <p className="text-[11px] font-medium mt-1.5">{s.title}</p>
              <p className="text-[9px] text-ink-muted mt-0.5">{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category filters */}
      <div className="mt-5 flex gap-2 px-5 overflow-x-auto phone-scroll">
        {categories.map((c, i) => (
          <button
            key={c.key}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap border transition ${
              i === 0
                ? "bg-ink-primary text-bg-base border-ink-primary"
                : "bg-bg-card text-ink-secondary border-line hover:text-ink-primary"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Perks grid */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-semibold">{t("ben.featured")}</h2>
          <span className="text-[11px] text-ink-muted">{perks.length} {t("ben.available")}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {perks.map((p) => {
            const canAfford = walletBalance >= p.cost;
            return (
              <div
                key={p.id}
                className="rounded-2xl bg-bg-card border border-line p-3.5 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-bg-elevated border border-line flex items-center justify-center text-[22px]">
                  {p.emoji}
                </div>
                <p className="mt-3 text-[13px] font-semibold leading-snug">{perkTitle(p.id)}</p>
                <p className="text-[10px] text-ink-muted">{p.brand}</p>

                <div className="mt-3 pt-3 border-t border-line flex items-center justify-between">
                  <p className="text-[12px] font-semibold">₹{p.cost.toLocaleString("en-IN")}</p>
                  <button
                    disabled={!canAfford}
                    className={`text-[10px] font-medium px-2.5 py-1 rounded-full border transition ${
                      canAfford
                        ? "bg-ink-primary text-bg-base border-ink-primary"
                        : "bg-bg-elevated text-ink-muted border-line cursor-not-allowed"
                    }`}
                  >
                    {canAfford ? t("ben.redeem") : t("ben.locked")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Refer */}
      <div className="px-5 mt-5">
        <div className="rounded-2xl bg-bg-card border border-line p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-line flex items-center justify-center">
            <Gift size={16} className="text-ink-primary" />
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-semibold">{t("ben.refer.title")}</p>
            <p className="text-[10px] text-ink-muted">{t("ben.refer.sub")}</p>
          </div>
          <button className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-line text-ink-primary">
            {t("ben.refer.cta")}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
