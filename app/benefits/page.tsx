"use client";

import AppShell from "@/components/AppShell";
import ScreenHeader from "@/components/ScreenHeader";
import { perks, walletBalance } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import { Wallet } from "lucide-react";

export default function Benefits() {
  const { t } = useT();
  const earned = 4250;
  const used = earned - walletBalance;

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
      <ScreenHeader title={t("ben.title")} />

      {/* Balance — the only hero */}
      <div className="px-6 mt-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold/[0.18] via-gold/[0.04] to-white border border-gold/25 p-7 shadow-[0_8px_24px_-8px_rgba(91,33,182,0.18)]">
          <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-gold/[0.22] blur-3xl" />

          <div className="relative flex items-center gap-2">
            <Wallet size={14} className="text-gold-deep" />
            <p className="text-[10px] uppercase tracking-[0.15em] text-gold-deep font-semibold">
              {t("ben.balance")}
            </p>
          </div>
          <p className="relative mt-3 text-[48px] font-semibold tracking-tight leading-none bg-gradient-to-r from-gold-deep to-gold bg-clip-text text-transparent">
            ₹{walletBalance.toLocaleString("en-IN")}
          </p>
          <p className="relative mt-3 text-[12px] text-ink-secondary">
            {t("ben.sub")}
          </p>

          {/* Progress — used vs earned, simple */}
          <div className="relative mt-7">
            <div className="flex items-center justify-between text-[11px] mb-2">
              <span className="text-ink-muted">
                {t("ben.used")} ₹{used.toLocaleString("en-IN")}
              </span>
              <span className="text-gold-deep font-medium">
                ₹{earned.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-line overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-deep to-gold rounded-full"
                style={{ width: `${(used / earned) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Perks — single grid, no filters competing for attention */}
      <div className="px-6 mt-10">
        <h2 className="text-[18px] font-semibold tracking-tight mb-5">
          {t("ben.featured")}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {perks.map((p) => {
            const canAfford = walletBalance >= p.cost;
            return (
              <div
                key={p.id}
                className="rounded-2xl bg-bg-card border border-line p-4 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-brand/[0.08] border border-brand/15 flex items-center justify-center text-[22px]">
                  {p.emoji}
                </div>
                <p className="mt-4 text-[13.5px] font-semibold tracking-tight leading-snug">
                  {perkTitle(p.id)}
                </p>
                <p className="text-[10.5px] text-ink-muted mt-0.5">{p.brand}</p>

                <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                  <p className="text-[13px] font-semibold">
                    ₹{p.cost.toLocaleString("en-IN")}
                  </p>
                  <button
                    disabled={!canAfford}
                    className={`text-[10.5px] font-semibold px-3 py-1 rounded-full transition ${
                      canAfford
                        ? "bg-gold-deep text-white"
                        : "bg-bg-elevated text-ink-muted cursor-not-allowed"
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
    </AppShell>
  );
}
