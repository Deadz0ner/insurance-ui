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
  Zap,
  Heart,
  Car,
  Plane,
  Activity,
  Wallet,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const typeIcon = {
  Health: Heart,
  Motor: Car,
  Life: Activity,
  Travel: Plane,
};

export default function Dashboard() {
  const router = useRouter();
  const { t, lang } = useT();
  const expiring = policies.find((p) => p.status === "Expiring");

  const renewDays = expiring?.renewIn.match(/\d+/)?.[0];

  return (
    <AppShell>
      {/* Top action row */}
      <div className="px-5 pt-2 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-bg-card border border-line flex items-center justify-center text-ink-secondary hover:text-ink-primary transition"
          aria-label={t("common.back")}
        >
          <ChevronLeft size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-bg-card border border-line flex items-center justify-center relative">
          <Bell size={17} className="text-ink-secondary" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-danger" />
        </button>
      </div>

      {/* Greeting */}
      <div className="px-5 pt-3 pb-4">
        <p className="text-[12px] text-ink-muted">{t("dash.greet")}</p>
        <h1 className="text-[26px] font-semibold tracking-tight leading-tight">{t("dash.user")}</h1>
        <p className="text-[12px] text-ink-secondary mt-0.5 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
          {t("dash.tier")}
        </p>
      </div>

      {/* Hero card — Soft Benefits */}
      <Link href="/benefits" className="block px-5">
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bg-elevated to-bg-card border border-line p-5"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[0.04] blur-3xl" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-ink-muted uppercase tracking-widest">{t("dash.wallet.label")}</p>
              <p className="mt-1 text-[34px] font-semibold tracking-tight">
                ₹{walletBalance.toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] text-ink-secondary mt-0.5">{t("dash.wallet.sub")}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-bg-base border border-line flex items-center justify-center">
              <Wallet size={20} className="text-ink-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[12px] text-ink-secondary">
            <span className="px-2 py-1 rounded-full bg-bg-base/80 border border-line">{t("dash.wallet.perks")}</span>
            <span className="ml-auto flex items-center gap-1 text-ink-primary font-medium">
              {t("dash.wallet.redeem")} <ArrowUpRight size={13} />
            </span>
          </div>
        </motion.div>
      </Link>

      {/* Quick actions */}
      <div className="px-5 mt-4 grid grid-cols-4 gap-2">
        {[
          { icon: Zap, label: t("dash.qa.file"), href: "/claims" },
          { icon: Heart, label: t("dash.qa.hospital"), href: "/dashboard" },
          { icon: Car, label: t("dash.qa.fastag"), href: "/dashboard" },
          { icon: Plane, label: t("dash.qa.travel"), href: "/dashboard" },
        ].map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-bg-card border border-line hover:bg-bg-elevated transition"
          >
            <Icon size={18} className="text-ink-primary" />
            <span className="text-[10px] text-ink-secondary text-center px-1">{label}</span>
          </Link>
        ))}
      </div>

      {/* Renewal alert */}
      {expiring && (
        <div className="px-5 mt-5">
          <div className="rounded-2xl border border-warning/30 bg-warning/[0.06] p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning/15 flex items-center justify-center text-warning text-lg">
              ⏳
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-medium text-ink-primary">
                {t("dash.renew.in")} {renewDays} {t("frame.days")}
              </p>
              <p className="text-[11px] text-ink-muted">{expiring.insurer} · {expiring.product}</p>
            </div>
            <Link
              href={`/policy/${expiring.id}`}
              className="text-[12px] font-medium text-ink-primary px-3 py-1.5 rounded-full bg-bg-card border border-line"
            >
              {t("common.review")}
            </Link>
          </div>
        </div>
      )}

      {/* Your policies */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-semibold">{t("dash.policies")}</h2>
          <Link href="/wallet" className="text-[12px] text-ink-secondary flex items-center">
            {t("common.viewAll")} <ChevronRight size={13} />
          </Link>
        </div>

        <div className="space-y-2.5">
          {policies.slice(0, 3).map((p) => {
            const Icon = typeIcon[p.type];
            const typeLabel = t(`wallet.filter.${p.type.toLowerCase()}` as any);
            return (
              <Link
                key={p.id}
                href={`/policy/${p.id}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-bg-card border border-line hover:bg-bg-elevated transition"
              >
                <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-line flex items-center justify-center">
                  <Icon size={16} className="text-ink-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium truncate">{p.insurer}</p>
                    <span className="text-[10px] text-ink-muted px-1.5 py-0.5 rounded-md border border-line">
                      {typeLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-muted truncate">{p.product} · {p.sumInsured}</p>
                </div>
                <ChevronRight size={16} className="text-ink-muted" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Wealth snapshot */}
      <div className="px-5 mt-6">
        <h2 className="text-[15px] font-semibold mb-3">{t("dash.wealth")}</h2>
        <div className="rounded-2xl bg-bg-card border border-line p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] text-ink-muted">{t("dash.wealth.value")}</p>
              <p className="text-[22px] font-semibold tracking-tight">₹14,82,400</p>
              <p className="text-[11px] text-success mt-0.5">▲ ₹24,180 {t("dash.wealth.today")} (+1.65%)</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-ink-muted">{t("dash.wealth.ratio")}</p>
              <p className="text-[16px] font-medium">62%</p>
              <p className="text-[10px] text-warning">{t("dash.wealth.gap")}</p>
            </div>
          </div>
          <div className="mt-3 flex gap-1.5 h-1.5">
            <div className="flex-[6.2] bg-ink-primary/80 rounded-full" />
            <div className="flex-[3.8] bg-line rounded-full" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
