"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  Check,
  Car,
  ShieldAlert,
  Coins,
  CheckCircle2,
  Gift,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "./LanguageProvider";
import type { TKey } from "@/lib/i18n";

type Tone = "brand" | "warning" | "gold" | "success" | "coral";

type Notif = {
  id: string;
  icon: LucideIcon;
  tone: Tone;
  titleKey: TKey;
  bodyKey: TKey;
  timeKey: TKey;
  href: string;
  unread: boolean;
};

const SEED: Notif[] = [
  { id: "n1", icon: Car,          tone: "brand",   titleKey: "notif.claim.title",   bodyKey: "notif.claim.body",   timeKey: "notif.time.2h", href: "/claims",    unread: true },
  { id: "n2", icon: ShieldAlert,  tone: "warning", titleKey: "notif.renew.title",   bodyKey: "notif.renew.body",   timeKey: "notif.time.5h", href: "/policy/p1", unread: true },
  { id: "n3", icon: Coins,        tone: "gold",    titleKey: "notif.reward.title",  bodyKey: "notif.reward.body",  timeKey: "notif.time.1d", href: "/wallet",    unread: true },
  { id: "n4", icon: CheckCircle2, tone: "success", titleKey: "notif.settled.title", bodyKey: "notif.settled.body", timeKey: "notif.time.3d", href: "/claims",    unread: false },
  { id: "n5", icon: Gift,         tone: "coral",   titleKey: "notif.perk.title",    bodyKey: "notif.perk.body",    timeKey: "notif.time.5d", href: "/benefits",  unread: false },
];

// Static class strings so Tailwind keeps them through purge.
const toneMap: Record<Tone, { chip: string; icon: string; unread: string; dot: string }> = {
  brand:   { chip: "bg-brand/10 border-brand/25",     icon: "text-brand",      unread: "bg-brand/[0.06] border-brand/20",     dot: "bg-brand" },
  warning: { chip: "bg-warning/10 border-warning/25", icon: "text-warning",    unread: "bg-warning/[0.06] border-warning/25", dot: "bg-warning" },
  gold:    { chip: "bg-gold/10 border-gold/25",       icon: "text-gold-deep",  unread: "bg-gold/[0.07] border-gold/25",       dot: "bg-gold-deep" },
  success: { chip: "bg-success/10 border-success/25", icon: "text-success",    unread: "bg-success/[0.06] border-success/20", dot: "bg-success" },
  coral:   { chip: "bg-coral/10 border-coral/25",     icon: "text-coral-deep", unread: "bg-coral/[0.06] border-coral/20",     dot: "bg-coral" },
};

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  items: Notif[];
  unreadCount: number;
  markAllRead: () => void;
  markRead: (id: string) => void;
};

const NotificationsCtx = createContext<Ctx | null>(null);

export function useNotifications() {
  const ctx = useContext(NotificationsCtx);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
}

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notif[]>(SEED);
  const unreadCount = items.filter((i) => i.unread).length;
  const markAllRead = () => setItems((p) => p.map((i) => ({ ...i, unread: false })));
  const markRead = (id: string) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, unread: false } : i)));

  return (
    <NotificationsCtx.Provider
      value={{ open, setOpen, items, unreadCount, markAllRead, markRead }}
    >
      {children}
      <NotificationPanel />
    </NotificationsCtx.Provider>
  );
}

/** Bell trigger with a periodic ring + pulsing unread badge. Drop into any header. */
export function NotificationBell() {
  const { setOpen, unreadCount } = useNotifications();
  const { t } = useT();

  return (
    <button
      onClick={() => setOpen(true)}
      aria-label={t("notif.title")}
      className="relative w-10 h-10 rounded-full bg-bg-card border border-line flex items-center justify-center shrink-0 active:scale-95 transition"
    >
      <motion.span
        style={{ transformOrigin: "50% 18%", display: "inline-flex" }}
        animate={{ rotate: [0, -12, 12, -9, 9, -5, 5, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
      >
        <Bell size={17} className="text-ink-secondary" />
      </motion.span>

      {unreadCount > 0 && (
        <>
          <motion.span
            className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-coral/60"
            animate={{ scale: [1, 2], opacity: [0.55, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-coral to-brand text-white text-[10px] font-bold leading-none flex items-center justify-center border-2 border-bg-base">
            {unreadCount}
          </span>
        </>
      )}
    </button>
  );
}

/** Top sheet that drops in from the bell. Rendered once by the provider. */
function NotificationPanel() {
  const { open, setOpen, items, unreadCount, markAllRead, markRead } = useNotifications();
  const { t } = useT();
  const router = useRouter();

  const openItem = (n: Notif) => {
    markRead(n.id);
    setOpen(false);
    router.push(n.href);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute top-0 left-0 right-0 z-[70] bg-bg-surface border-b border-line rounded-b-[32px] flex flex-col overflow-hidden"
            style={{ maxHeight: "86%" }}
          >
            <div className="pointer-events-none absolute -top-24 -right-12 w-60 h-48 rounded-full bg-coral/[0.14] blur-3xl" />
            <div className="pointer-events-none absolute -top-20 -left-16 w-56 h-44 rounded-full bg-brand/[0.12] blur-3xl" />

            {/* Header — pt clears the status bar / dynamic island */}
            <div className="relative px-5 pt-14 pb-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-coral/20 to-brand/10 border border-line flex items-center justify-center">
                  <Bell size={16} className="text-coral-deep" />
                </div>
                <div>
                  <p className="text-[16px] font-semibold tracking-tight">{t("notif.title")}</p>
                  {unreadCount > 0 ? (
                    <p className="text-[11px] text-coral-deep font-medium">
                      {unreadCount} {t("notif.new")}
                    </p>
                  ) : (
                    <p className="text-[11px] text-ink-muted flex items-center gap-1">
                      <Check size={11} /> {t("notif.caught")}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-bg-card border border-line flex items-center justify-center text-ink-secondary hover:text-ink-primary transition"
              >
                <X size={15} />
              </button>
            </div>

            <AnimatePresence initial={false}>
              {unreadCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 pb-2 shrink-0 overflow-hidden"
                >
                  <button
                    onClick={markAllRead}
                    className="text-[11.5px] font-medium text-brand hover:text-brand-deep transition"
                  >
                    {t("notif.markAll")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative px-4 pb-2 overflow-y-auto phone-scroll space-y-2">
              {items.map((n, i) => {
                const tone = toneMap[n.tone];
                const Icon = n.icon;
                return (
                  <motion.button
                    key={n.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.05,
                      type: "spring",
                      damping: 24,
                      stiffness: 280,
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openItem(n)}
                    className={cn(
                      "w-full text-left flex gap-3 p-3 rounded-2xl border transition-colors",
                      n.unread ? tone.unread : "bg-bg-card border-line"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl border flex items-center justify-center shrink-0",
                        tone.chip
                      )}
                    >
                      <Icon size={17} className={tone.icon} strokeWidth={1.9} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <p className="text-[13px] font-semibold tracking-tight text-ink-primary flex-1 min-w-0">
                          {t(n.titleKey)}
                        </p>
                        {n.unread && (
                          <span className={cn("mt-1 w-1.5 h-1.5 rounded-full shrink-0", tone.dot)} />
                        )}
                      </div>
                      <p className="text-[11.5px] text-ink-secondary mt-0.5 leading-snug">
                        {t(n.bodyKey)}
                      </p>
                      <p className="text-[10px] text-ink-muted mt-1.5">{t(n.timeKey)}</p>
                    </div>
                  </motion.button>
                );
              })}

              <p className="text-center text-[10px] text-ink-dim pt-2 pb-1">{t("notif.footer")}</p>
            </div>

            {/* Bottom grabber doubles as a close affordance */}
            <button
              onClick={() => setOpen(false)}
              aria-label={t("notif.title")}
              className="flex justify-center py-2.5 shrink-0"
            >
              <span className="w-10 h-1 rounded-full bg-line" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
