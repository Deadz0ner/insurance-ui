"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, FileText, Gift, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "./LanguageProvider";
import type { TKey } from "@/lib/i18n";

const tabs: { href: string; key: TKey; icon: typeof Home }[] = [
  { href: "/dashboard", key: "nav.home", icon: Home },
  { href: "/wallet", key: "nav.wallet", icon: Wallet },
  { href: "/claims", key: "nav.claims", icon: FileText },
  { href: "/benefits", key: "nav.perks", icon: Gift },
  { href: "/profile", key: "nav.you", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useT();

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40">
      <div className="mx-3 mb-3 rounded-[28px] glass border border-line glow-ring backdrop-blur-2xl bg-bg-card/80">
        <div className="grid grid-cols-5 px-2 py-2">
          {tabs.map((tab) => {
            const active = pathname.startsWith(tab.href);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-1.5 rounded-2xl transition-all",
                  active ? "text-ink-primary" : "text-ink-muted hover:text-ink-secondary"
                )}
              >
                <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
                <span className="text-[10px] font-medium tracking-wide">{t(tab.key)}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center pb-1.5">
        <div className="w-32 h-[5px] rounded-full bg-ink-primary/50" />
      </div>
    </div>
  );
}
