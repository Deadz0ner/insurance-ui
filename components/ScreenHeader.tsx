"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

export default function ScreenHeader({
  title,
  back,
  right,
  subtitle,
  showBack = true,
}: {
  title: string;
  back?: string;
  right?: ReactNode;
  subtitle?: string;
  showBack?: boolean;
}) {
  const router = useRouter();

  const backBtnClass =
    "w-10 h-10 rounded-full bg-bg-card border border-line flex items-center justify-center text-ink-secondary hover:text-ink-primary transition shrink-0";

  return (
    <div className="px-6 pt-3 pb-2 flex items-center justify-between gap-3">
      {showBack &&
        (back ? (
          <Link href={back} className={backBtnClass} aria-label="Back">
            <ChevronLeft size={18} />
          </Link>
        ) : (
          <button onClick={() => router.back()} className={backBtnClass} aria-label="Back">
            <ChevronLeft size={18} />
          </button>
        ))}
      <div className="flex-1 min-w-0">
        <h1 className="text-[24px] font-semibold tracking-tight truncate">{title}</h1>
        {subtitle && <p className="text-[12px] text-ink-muted truncate mt-0.5">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}
