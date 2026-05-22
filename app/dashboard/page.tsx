"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AppShell from "@/components/AppShell";
import { policies, walletBalance } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import {
  Bell,
  ArrowUpRight,
  Heart,
  Car,
  Plane,
  Activity,
  ChevronRight,
  ChevronLeft,
  Clock,
} from "lucide-react";

const typeIcon = {
  Health: Heart,
  Motor: Car,
  Life: Activity,
  Travel: Plane,
};

export default function Dashboard() {
  const router = useRouter();
  const { t } = useT();
  const expiring = policies.find((p) => p.status === "Expiring");
  const renewDays = expiring?.renewIn.match(/\d+/)?.[0];

  return (
    <AppShell>
      {/* Top action row */}
      <div className="px-6 pt-3 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-bg-card border border-line flex items-center justify-center text-ink-secondary hover:text-ink-primary transition"
          aria-label={t("common.back")}
        >
          <ChevronLeft size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-bg-card border border-line flex items-center justify-center relative">
          <Bell size={17} className="text-ink-secondary" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-danger" />
        </button>
      </div>

      {/* Greeting — generous breathing room */}
      <div className="px-6 pt-10 pb-2">
        <p className="text-[13px] text-ink-muted">{t("dash.greet")}</p>
        <h1 className="text-[32px] font-semibold tracking-tight leading-tight mt-1">
          {t("dash.user")}
        </h1>
        <p className="text-[12px] text-ink-secondary mt-2.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand" />
          {t("dash.tier")}
        </p>
      </div>

      {/* THE hero — Soft Benefits Wallet */}
      <Link href="/benefits" className="block px-6 mt-10">
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold/[0.18] via-gold/[0.04] to-white border border-gold/25 p-6 shadow-[0_8px_24px_-8px_rgba(91,33,182,0.15)]"
        >
          <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-gold/[0.20] blur-3xl" />

          <p className="relative text-[10px] text-gold-deep uppercase tracking-[0.15em] font-semibold">
            {t("dash.wallet.label")}
          </p>
          <p className="relative mt-3 text-[44px] font-semibold tracking-tight leading-none bg-gradient-to-r from-gold-deep to-gold bg-clip-text text-transparent">
            ₹{walletBalance.toLocaleString("en-IN")}
          </p>
          <p className="relative mt-3 text-[12px] text-ink-secondary">
            {t("dash.wallet.sub")}
          </p>

          <div className="relative mt-7 flex items-center justify-between">
            <span className="text-[11px] text-gold-deep font-medium">
              {t("dash.wallet.perks")}
            </span>
            <span className="flex items-center gap-1.5 text-[13px] text-gold-deep font-semibold">
              {t("dash.wallet.redeem")} <ArrowUpRight size={14} strokeWidth={2.4} />
            </span>
          </div>
        </motion.div>
      </Link>

      {/* Renewal alert — only when something's expiring */}
      {expiring && (
        <Link href={`/policy/${expiring.id}`} className="block px-6 mt-6">
          <div className="rounded-2xl border border-warning/25 bg-warning/[0.05] p-4 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-warning/10 flex items-center justify-center shrink-0">
              <Clock size={17} className="text-warning" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-medium text-ink-primary">
                {t("dash.renew.in")} {renewDays} {t("frame.days")}
              </p>
              <p className="text-[11px] text-ink-muted mt-0.5 truncate">
                {expiring.insurer} · {expiring.product}
              </p>
            </div>
            <ChevronRight size={18} className="text-ink-muted shrink-0" />
          </div>
        </Link>
      )}

      {/* Policies — only 2, with generous spacing */}
      <div className="px-6 mt-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[18px] font-semibold tracking-tight">
            {t("dash.policies")}
          </h2>
          <Link
            href="/wallet"
            className="text-[12px] text-brand font-medium flex items-center gap-0.5"
          >
            {t("common.viewAll")}
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="space-y-3">
          {policies.slice(0, 2).map((p) => {
            const Icon = typeIcon[p.type];
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
                  <p className="text-[14px] font-semibold tracking-tight">
                    {p.insurer}
                  </p>
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
