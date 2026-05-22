"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import BottomNav from "./BottomNav";
import AIAgent from "./AIAgent";
import LanguageToggle from "./LanguageToggle";
import { LanguageProvider, useT } from "./LanguageProvider";

function FrameInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { t } = useT();
  const showNav = pathname !== "/";

  return (
    <div className="min-h-screen app-bg flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        {/* Demo controls outside the phone */}
        <div className="flex items-center gap-3">
          <div className="text-ink-muted text-xs tracking-widest uppercase">{t("frame.preview")}</div>
          <LanguageToggle />
        </div>

        {/* Phone shell */}
        <div
          className={cn(
            "relative w-[390px] h-[844px] rounded-[54px]",
            "bg-bg-base border border-line",
            "shadow-[0_0_0_8px_#0c0c10,0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_9px_#1a1a1f]",
            "overflow-hidden"
          )}
        >
          {/* Dynamic island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[34px] rounded-full bg-black z-50" />

          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-12 z-40 flex items-center justify-between px-8 text-[13px] font-medium text-ink-primary pointer-events-none">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="text-[11px]">•••</span>
              <span className="text-[11px]">5G</span>
              <span className="w-6 h-3 rounded-sm border border-ink-primary/60 relative">
                <span className="absolute inset-0.5 right-1 bg-ink-primary rounded-[1px]" />
              </span>
            </span>
          </div>

          {/* Scrollable screen area */}
          <div className="absolute inset-0 pt-12 phone-scroll overflow-y-auto">
            <div className={showNav ? "pb-28" : ""}>{children}</div>
          </div>

          {showNav && <AIAgent />}
          {showNav && <BottomNav />}
        </div>

        <div className="text-ink-dim text-[11px]">{t("frame.spec")}</div>
      </div>
    </div>
  );
}

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <FrameInner>{children}</FrameInner>
    </LanguageProvider>
  );
}
