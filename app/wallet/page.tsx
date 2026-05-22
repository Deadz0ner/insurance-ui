"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import ScreenHeader from "@/components/ScreenHeader";
import { policies } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import { Heart, Car, Plane, Activity, Plus, ChevronRight } from "lucide-react";

const typeIcon = {
  Health: Heart,
  Motor: Car,
  Life: Activity,
  Travel: Plane,
};

export default function Wallet() {
  const { t } = useT();
  const totalCover = "₹2.16 Cr";
  const totalPremium = "₹46,740";

  return (
    <AppShell>
      <ScreenHeader
        title={t("wallet.title")}
        right={
          <button className="w-10 h-10 rounded-full bg-bg-card border border-line flex items-center justify-center">
            <Plus size={17} className="text-ink-primary" />
          </button>
        }
      />

      {/* Summary — the one number that matters */}
      <div className="px-6 mt-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand/[0.14] via-brand/[0.03] to-white border border-brand/20 p-6 shadow-[0_8px_24px_-8px_rgba(124,58,237,0.12)]">
          <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-brand/[0.18] blur-3xl" />

          <p className="relative text-[10px] text-brand uppercase tracking-[0.15em] font-semibold">
            {t("wallet.total")}
          </p>
          <p className="relative mt-3 text-[40px] font-semibold tracking-tight leading-none bg-gradient-to-r from-brand-deep to-brand bg-clip-text text-transparent">
            {totalCover}
          </p>
          <p className="relative mt-3 text-[12px] text-ink-secondary">
            {policies.length} {t("wallet.insurers").toLowerCase()} · {totalPremium} / yr
          </p>
        </div>
      </div>

      {/* All policies — clean list, lots of air */}
      <div className="px-6 mt-10">
        <h2 className="text-[18px] font-semibold tracking-tight mb-5">
          {t("dash.policies")}
        </h2>

        <div className="space-y-3">
          {policies.map((p) => {
            const Icon = typeIcon[p.type];
            const isExpiring = p.status === "Expiring";
            const typeLabel = t(`wallet.filter.${p.type.toLowerCase()}` as any);
            return (
              <Link
                key={p.id}
                href={`/policy/${p.id}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-bg-card border border-line hover:bg-bg-elevated transition"
              >
                <div className="w-12 h-12 rounded-xl bg-brand/[0.08] border border-brand/15 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-brand" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-semibold tracking-tight truncate">
                      {p.insurer}
                    </p>
                    {isExpiring && (
                      <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-warning/10 text-warning border border-warning/25 font-medium uppercase tracking-wide">
                        {t("wallet.status.expiring")}
                      </span>
                    )}
                  </div>
                  <p className="text-[11.5px] text-ink-muted mt-0.5">
                    {typeLabel} · {p.sumInsured}
                  </p>
                </div>
                <ChevronRight size={16} className="text-ink-muted shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
