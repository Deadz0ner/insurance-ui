"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  Check,
  ChevronRight,
  Heart,
  Car,
  Plane,
  Activity,
  BedDouble,
  Stethoscope,
  Syringe,
  Pill,
  ShieldAlert,
  KeyRound,
  Users,
  HeartPulse,
  Accessibility,
  Banknote,
  CalendarX,
  Luggage,
  PlaneTakeoff,
  Camera,
  FileImage,
  FileText,
  Plus,
  Sparkles,
  Loader2,
  Wallet,
  Building2,
  Clock,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { policies, type Policy } from "@/lib/data";
import { useT } from "./LanguageProvider";
import type { TKey } from "@/lib/i18n";

/* ------------------------------------------------------------------ *
 * Context — opened globally from anywhere (e.g. the Claims button),
 * rendered once at the phone-shell level so it can cover the screen.
 * ------------------------------------------------------------------ */

type Ctx = { open: boolean; openWizard: () => void; closeWizard: () => void };
const ClaimWizardCtx = createContext<Ctx | null>(null);

export function useClaimWizard() {
  const ctx = useContext(ClaimWizardCtx);
  if (!ctx) throw new Error("useClaimWizard must be used within ClaimWizardProvider");
  return ctx;
}

export function ClaimWizardProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ClaimWizardCtx.Provider
      value={{ open, openWizard: () => setOpen(true), closeWizard: () => setOpen(false) }}
    >
      {children}
      <ClaimWizardSheet />
    </ClaimWizardCtx.Provider>
  );
}

/* ------------------------------------------------------------------ *
 * Adaptive data — reasons + cashless partners keyed by policy type.
 * ------------------------------------------------------------------ */

const policyIcon: Record<Policy["type"], LucideIcon> = {
  Health: Heart,
  Motor: Car,
  Life: Activity,
  Travel: Plane,
};

const reasonMeta: Record<Policy["type"], { key: TKey; icon: LucideIcon }[]> = {
  Health: [
    { key: "cw.reason.health.1", icon: BedDouble },
    { key: "cw.reason.health.2", icon: Stethoscope },
    { key: "cw.reason.health.3", icon: Syringe },
    { key: "cw.reason.health.4", icon: Pill },
  ],
  Motor: [
    { key: "cw.reason.motor.1", icon: Car },
    { key: "cw.reason.motor.2", icon: ShieldAlert },
    { key: "cw.reason.motor.3", icon: KeyRound },
    { key: "cw.reason.motor.4", icon: Users },
  ],
  Life: [
    { key: "cw.reason.life.1", icon: HeartPulse },
    { key: "cw.reason.life.2", icon: Accessibility },
    { key: "cw.reason.life.3", icon: Banknote },
    { key: "cw.reason.life.4", icon: Users },
  ],
  Travel: [
    { key: "cw.reason.travel.1", icon: Stethoscope },
    { key: "cw.reason.travel.2", icon: CalendarX },
    { key: "cw.reason.travel.3", icon: Luggage },
    { key: "cw.reason.travel.4", icon: PlaneTakeoff },
  ],
};

const networkByType: Record<Policy["type"], string[]> = {
  Health: ["Apollo Hospital, Sector 12", "Fortis Escorts", "Manipal, Whitefield"],
  Motor: ["Mahindra First Choice, Pune", "Bosch Car Service, Baner", "AccidentAssist Express"],
  Life: ["Priority claims cell, Mumbai", "Doorstep document pickup"],
  Travel: ["Allianz Global Assistance", "AXA 24×7 Travel Desk"],
};

// Demo-friendly relative dates anchored to "today".
const whenDate: Record<string, string> = {
  today: "28 May 2026",
  yesterday: "27 May 2026",
  earlier: "24 May 2026",
};

const fakeFiles = [
  { name: "IMG_4821.jpg", image: true },
  { name: "Repair_estimate.pdf", image: false },
  { name: "Incident_note.pdf", image: false },
];

type Settle = "cashless" | "reimburse";

const TOTAL_STEPS = 6; // input/review steps; the success screen is terminal

/* ------------------------------------------------------------------ *
 * The sheet itself.
 * ------------------------------------------------------------------ */

function ClaimWizardSheet() {
  const { open, closeWizard } = useClaimWizard();
  const { t, lang } = useT();

  const [step, setStep] = useState(0);
  const [policyId, setPolicyId] = useState<string | null>(null);
  const [reasonKey, setReasonKey] = useState<TKey | null>(null);
  const [when, setWhen] = useState<string | null>(null);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [files, setFiles] = useState<typeof fakeFiles>([]);
  const [scanning, setScanning] = useState(false);
  const [settle, setSettle] = useState<Settle | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [claimId, setClaimId] = useState("");

  const policy = useMemo(() => policies.find((p) => p.id === policyId) ?? null, [policyId]);

  // Reset everything a beat after the sheet closes.
  useEffect(() => {
    if (open) return;
    const tmr = setTimeout(() => {
      setStep(0);
      setPolicyId(null);
      setReasonKey(null);
      setWhen(null);
      setDesc("");
      setAmount("");
      setFiles([]);
      setScanning(false);
      setSettle(null);
      setNetwork(null);
      setSubmitting(false);
      setClaimId("");
    }, 300);
    return () => clearTimeout(tmr);
  }, [open]);

  // "AI is reading your documents" — runs briefly after each upload.
  useEffect(() => {
    if (files.length === 0) return;
    setScanning(true);
    const tmr = setTimeout(() => setScanning(false), 1500);
    return () => clearTimeout(tmr);
  }, [files.length]);

  const typeLabel = (p: Policy) => t(`wallet.filter.${p.type.toLowerCase()}` as TKey);

  const addFile = () => {
    if (files.length >= fakeFiles.length) return;
    setFiles((prev) => [...prev, fakeFiles[prev.length]]);
  };

  const partners = policy ? networkByType[policy.type] : [];

  // Per-step gate for the Continue button.
  const canContinue = (() => {
    switch (step) {
      case 0:
        return !!policyId;
      case 1:
        return !!reasonKey;
      case 2:
        return !!when && desc.trim().length > 0;
      case 3:
        return files.length > 0;
      case 4:
        return settle === "reimburse" || (settle === "cashless" && !!network);
      case 5:
        return true;
      default:
        return false;
    }
  })();

  const settleLabel = settle ? t(settle === "cashless" ? "cw.settle.cashless" : "cw.settle.reimburse") : "";

  const aiSummary = (() => {
    if (!policy || !reasonKey) return "";
    const reason = t(reasonKey);
    const date = when ? whenDate[when] : "";
    const amt = amount.trim();
    const amtFmt = amt ? `₹${Number(amt).toLocaleString("en-IN")}` : "";
    if (lang === "hi") {
      return (
        `${policy.insurer} ${typeLabel(policy)} पॉलिसी पर ${date} को ${reason} रिपोर्ट किया गया` +
        (amtFmt ? `, अनुमानित ${amtFmt}` : "") +
        `। निपटान ${settleLabel} द्वारा` +
        (settle === "cashless" && network ? `, ${network} पर` : "") +
        ` अनुरोधित।`
      );
    }
    return (
      `${reason} reported on ${date} under the ${policy.insurer} ` +
      `${typeLabel(policy).toLowerCase()} policy` +
      (amtFmt ? `, estimated at ${amtFmt}` : "") +
      `. Settlement requested via ${settleLabel.toLowerCase()}` +
      (settle === "cashless" && network ? ` at ${network}` : "") +
      `.`
    );
  })();

  const handleBack = () => {
    if (step === 0) closeWizard();
    else setStep((s) => s - 1);
  };

  const handleContinue = () => {
    if (step < 5) {
      setStep((s) => s + 1);
      return;
    }
    // step 5 → submit
    setSubmitting(true);
    setTimeout(() => {
      const id = `CLM-26-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
      setClaimId(id);
      setSubmitting(false);
      setStep(6);
    }, 1700);
  };

  const isDone = step === 6;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="claim-wizard"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 34, stiffness: 320 }}
          className="absolute inset-0 z-[80] flex flex-col bg-bg-base overflow-hidden"
        >
          <div className="pointer-events-none absolute -top-24 -right-16 w-64 h-56 rounded-full bg-brand/[0.16] blur-3xl" />
          <div className="pointer-events-none absolute -top-10 -left-20 w-56 h-48 rounded-full bg-brand-deep/[0.12] blur-3xl" />

          {/* Header — clears the dynamic island */}
          <div className="relative shrink-0 px-5 pt-14 pb-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                aria-label={t("common.back")}
                className="w-10 h-10 rounded-full bg-bg-card border border-line flex items-center justify-center text-ink-secondary hover:text-ink-primary transition active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              <p className="text-[12px] font-medium text-ink-secondary">
                {isDone ? (
                  t("cw.title")
                ) : (
                  <>
                    {t("cw.step")} {step + 1} {t("cw.of")} {TOTAL_STEPS}
                  </>
                )}
              </p>
              <button
                onClick={closeWizard}
                aria-label="Close"
                className="w-10 h-10 rounded-full bg-bg-card border border-line flex items-center justify-center text-ink-secondary hover:text-ink-primary transition active:scale-95"
              >
                <X size={16} />
              </button>
            </div>

            {/* Progress segments */}
            {!isDone && (
              <div className="mt-4 flex gap-1.5">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div key={i} className="h-1.5 flex-1 rounded-full bg-line overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-brand-deep"
                      initial={false}
                      animate={{ width: i <= step ? "100%" : "0%" }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Step content */}
          <div className="relative flex-1 overflow-y-auto phone-scroll px-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="pb-6"
              >
                {/* STEP 0 — pick policy */}
                {step === 0 && (
                  <StepBody title={t("cw.s1.title")} sub={t("cw.s1.sub")}>
                    <div className="space-y-2.5">
                      {policies.map((p) => {
                        const Icon = policyIcon[p.type];
                        const selected = policyId === p.id;
                        return (
                          <SelectRow key={p.id} selected={selected} onClick={() => setPolicyId(p.id)}>
                            <IconTile selected={selected}>
                              <Icon size={18} strokeWidth={1.9} />
                            </IconTile>
                            <div className="flex-1 min-w-0">
                              <p className="text-[14px] font-semibold tracking-tight truncate">
                                {p.insurer}
                              </p>
                              <p className="text-[11.5px] text-ink-muted mt-0.5 truncate">
                                {typeLabel(p)} · {p.sumInsured} · {p.policyNo}
                              </p>
                            </div>
                            <SelectMark selected={selected} />
                          </SelectRow>
                        );
                      })}
                    </div>
                  </StepBody>
                )}

                {/* STEP 1 — what happened */}
                {step === 1 && policy && (
                  <StepBody title={t("cw.s2.title")} sub={t("cw.s2.sub")}>
                    <div className="grid grid-cols-2 gap-2.5">
                      {reasonMeta[policy.type].map((r) => {
                        const Icon = r.icon;
                        const selected = reasonKey === r.key;
                        return (
                          <button
                            key={r.key}
                            onClick={() => setReasonKey(r.key)}
                            className={cn(
                              "relative flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition active:scale-[0.98]",
                              selected
                                ? "border-brand bg-brand/[0.06] shadow-[0_10px_26px_-16px_rgba(124,58,237,0.55)]"
                                : "border-line bg-bg-card hover:bg-bg-elevated"
                            )}
                          >
                            <IconTile selected={selected}>
                              <Icon size={18} strokeWidth={1.9} />
                            </IconTile>
                            <span className="text-[13px] font-semibold tracking-tight leading-snug">
                              {t(r.key)}
                            </span>
                            {selected && (
                              <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center">
                                <Check size={12} strokeWidth={3} />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </StepBody>
                )}

                {/* STEP 2 — when + details */}
                {step === 2 && (
                  <StepBody title={t("cw.s3.title")} sub={t("cw.s3.sub")}>
                    <div className="grid grid-cols-3 gap-2.5">
                      {(["today", "yesterday", "earlier"] as const).map((w) => {
                        const selected = when === w;
                        return (
                          <button
                            key={w}
                            onClick={() => setWhen(w)}
                            className={cn(
                              "rounded-2xl border px-2 py-3 text-center transition active:scale-[0.97]",
                              selected
                                ? "border-brand bg-brand/[0.06]"
                                : "border-line bg-bg-card hover:bg-bg-elevated"
                            )}
                          >
                            <p
                              className={cn(
                                "text-[13px] font-semibold tracking-tight",
                                selected ? "text-brand" : "text-ink-primary"
                              )}
                            >
                              {t(`cw.when.${w}` as TKey)}
                            </p>
                            <p className="text-[10px] text-ink-muted mt-0.5">{whenDate[w]}</p>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-5">
                      <label className="text-[11px] font-medium text-ink-secondary uppercase tracking-wider">
                        {t("cw.desc.label")}
                      </label>
                      <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder={t("cw.desc.ph")}
                        rows={3}
                        className="mt-2 w-full resize-none rounded-2xl border border-line bg-bg-card px-4 py-3 text-[13px] text-ink-primary placeholder:text-ink-muted outline-none focus:border-brand transition"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="text-[11px] font-medium text-ink-secondary uppercase tracking-wider">
                        {t("cw.amount.label")}{" "}
                        <span className="text-ink-dim normal-case tracking-normal">
                          · {t("cw.amount.opt")}
                        </span>
                      </label>
                      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-line bg-bg-card px-4 focus-within:border-brand transition">
                        <span className="text-[16px] font-semibold text-ink-muted">₹</span>
                        <input
                          value={amount}
                          onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ""))}
                          inputMode="numeric"
                          placeholder="0"
                          className="flex-1 bg-transparent py-3 text-[15px] font-semibold text-ink-primary placeholder:text-ink-muted outline-none"
                        />
                      </div>
                    </div>
                  </StepBody>
                )}

                {/* STEP 3 — evidence */}
                {step === 3 && (
                  <StepBody title={t("cw.s4.title")} sub={t("cw.s4.sub")}>
                    {files.length === 0 ? (
                      <button
                        onClick={addFile}
                        className="w-full rounded-3xl border-2 border-dashed border-brand/30 bg-brand/[0.04] p-8 flex flex-col items-center gap-3 transition active:scale-[0.98]"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-brand/[0.1] text-brand flex items-center justify-center">
                          <Camera size={24} strokeWidth={1.8} />
                        </div>
                        <p className="text-[14px] font-semibold tracking-tight text-ink-primary">
                          {t("cw.upload.cta")}
                        </p>
                        <p className="text-[11.5px] text-ink-muted">{t("cw.upload.hint")}</p>
                      </button>
                    ) : (
                      <div className="space-y-2.5">
                        {files.map((f) => (
                          <motion.div
                            key={f.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 rounded-2xl border border-line bg-bg-card p-3"
                          >
                            <div className="w-11 h-11 rounded-xl bg-brand/[0.08] border border-brand/15 flex items-center justify-center text-brand shrink-0">
                              {f.image ? (
                                <FileImage size={18} strokeWidth={1.8} />
                              ) : (
                                <FileText size={18} strokeWidth={1.8} />
                              )}
                            </div>
                            <p className="flex-1 min-w-0 text-[13px] font-medium text-ink-primary truncate">
                              {f.name}
                            </p>
                            <span className="w-6 h-6 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0">
                              <Check size={13} strokeWidth={3} />
                            </span>
                          </motion.div>
                        ))}

                        {files.length < fakeFiles.length && (
                          <button
                            onClick={addFile}
                            className="w-full rounded-2xl border border-dashed border-line bg-bg-card/60 py-3 flex items-center justify-center gap-2 text-[12.5px] font-medium text-ink-secondary hover:text-ink-primary transition active:scale-[0.98]"
                          >
                            <Plus size={15} /> {t("cw.upload.more")}
                          </button>
                        )}

                        {/* AI scan status */}
                        <div
                          className={cn(
                            "mt-1 flex items-center gap-2.5 rounded-2xl border p-3.5 transition-colors",
                            scanning
                              ? "border-brand/25 bg-brand/[0.05]"
                              : "border-success/25 bg-success/[0.05]"
                          )}
                        >
                          {scanning ? (
                            <Loader2 size={16} className="text-brand animate-spin shrink-0" />
                          ) : (
                            <Sparkles size={16} className="text-success shrink-0" />
                          )}
                          <p className="text-[12px] font-medium text-ink-primary">
                            {scanning ? t("cw.ai.scanning") : t("cw.ai.done")}
                          </p>
                        </div>
                      </div>
                    )}
                  </StepBody>
                )}

                {/* STEP 4 — settlement */}
                {step === 4 && (
                  <StepBody title={t("cw.s5.title")} sub={t("cw.s5.sub")}>
                    <div className="space-y-2.5">
                      <SelectRow selected={settle === "cashless"} onClick={() => setSettle("cashless")}>
                        <IconTile selected={settle === "cashless"}>
                          <Wallet size={18} strokeWidth={1.9} />
                        </IconTile>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-semibold tracking-tight">
                            {t("cw.settle.cashless")}
                          </p>
                          <p className="text-[11.5px] text-ink-muted mt-0.5 leading-snug">
                            {t("cw.settle.cashless.sub")}
                          </p>
                        </div>
                        <SelectMark selected={settle === "cashless"} />
                      </SelectRow>

                      <SelectRow
                        selected={settle === "reimburse"}
                        onClick={() => {
                          setSettle("reimburse");
                          setNetwork(null);
                        }}
                      >
                        <IconTile selected={settle === "reimburse"}>
                          <Banknote size={18} strokeWidth={1.9} />
                        </IconTile>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-semibold tracking-tight">
                            {t("cw.settle.reimburse")}
                          </p>
                          <p className="text-[11.5px] text-ink-muted mt-0.5 leading-snug">
                            {t("cw.settle.reimburse.sub")}
                          </p>
                        </div>
                        <SelectMark selected={settle === "reimburse"} />
                      </SelectRow>
                    </div>

                    <AnimatePresence initial={false}>
                      {settle === "cashless" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-5 mb-2.5 text-[11px] font-medium text-ink-secondary uppercase tracking-wider">
                            {t("cw.network.label")}
                          </p>
                          <div className="space-y-2.5">
                            {partners.map((n) => {
                              const selected = network === n;
                              return (
                                <SelectRow key={n} selected={selected} onClick={() => setNetwork(n)}>
                                  <IconTile selected={selected}>
                                    <Building2 size={18} strokeWidth={1.9} />
                                  </IconTile>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[13.5px] font-semibold tracking-tight truncate">
                                      {n}
                                    </p>
                                    <p className="text-[11px] text-brand mt-0.5 font-medium">
                                      {t("cw.network.tag")}
                                    </p>
                                  </div>
                                  <SelectMark selected={selected} />
                                </SelectRow>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </StepBody>
                )}

                {/* STEP 5 — review */}
                {step === 5 && policy && (
                  <StepBody title={t("cw.s6.title")} sub={t("cw.s6.sub")}>
                    <div className="rounded-3xl border border-line bg-bg-card divide-y divide-line overflow-hidden">
                      <ReviewRow label={t("cw.review.policy")} value={`${policy.insurer} · ${typeLabel(policy)}`} />
                      <ReviewRow label={t("cw.review.reason")} value={reasonKey ? t(reasonKey) : "—"} />
                      <ReviewRow label={t("cw.review.when")} value={when ? whenDate[when] : "—"} />
                      <ReviewRow
                        label={t("cw.review.amount")}
                        value={amount.trim() ? `₹${Number(amount).toLocaleString("en-IN")}` : "—"}
                      />
                      <ReviewRow
                        label={t("cw.review.settle")}
                        value={
                          settle === "cashless"
                            ? `${t("cw.settle.cashless")}${network ? ` · ${network}` : ""}`
                            : t("cw.settle.reimburse")
                        }
                      />
                      <ReviewRow
                        label={t("cw.review.docs")}
                        value={`${files.length} ${t(
                          files.length === 1 ? "cw.review.docs.one" : "cw.review.docs.count"
                        )}`}
                      />
                    </div>

                    {/* AI-drafted summary */}
                    <div className="mt-4 rounded-3xl border border-brand/20 bg-gradient-to-b from-brand/[0.06] to-transparent p-4">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                          <Sparkles size={14} />
                        </span>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                          {t("cw.review.summary")}
                        </p>
                      </div>
                      <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-secondary">
                        {aiSummary}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-2.5 rounded-2xl border border-line bg-bg-card px-4 py-3">
                      <Clock size={15} className="text-brand shrink-0" />
                      <p className="text-[12px] text-ink-secondary">
                        {t("cw.review.eta.label")}:{" "}
                        <span className="font-semibold text-ink-primary">{t("cw.review.eta.value")}</span>
                      </p>
                    </div>
                  </StepBody>
                )}

                {/* STEP 6 — done */}
                {isDone && policy && (
                  <div className="pt-6 flex flex-col items-center text-center">
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", damping: 14, stiffness: 220 }}
                      className="relative w-24 h-24 rounded-full bg-gradient-to-br from-brand to-brand-deep text-white flex items-center justify-center shadow-[0_18px_40px_-12px_rgba(91,33,182,0.6)]"
                    >
                      <motion.span
                        className="absolute inset-0 rounded-full bg-brand/40"
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                      />
                      <Check size={42} strokeWidth={2.6} />
                    </motion.div>

                    <h2 className="mt-6 text-[22px] font-semibold tracking-tight">{t("cw.done.title")}</h2>
                    <p className="mt-2 text-[13px] text-ink-secondary leading-relaxed max-w-[280px]">
                      {t("cw.done.sub")}
                    </p>

                    <div className="mt-6 w-full rounded-2xl border border-line bg-bg-card px-4 py-3.5 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-ink-muted uppercase tracking-wider">
                        {t("cw.done.id")}
                      </span>
                      <span className="text-[14px] font-semibold tracking-tight text-brand">{claimId}</span>
                    </div>

                    <div className="mt-3 w-full rounded-2xl border border-brand/20 bg-brand/[0.05] p-4 text-left">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                        {t("cw.done.next")}
                      </p>
                      <p className="mt-1.5 text-[12.5px] text-ink-secondary leading-relaxed">
                        {t("cw.done.next.body")}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="relative shrink-0 px-5 pt-3 pb-6 border-t border-line bg-bg-base">
            {isDone ? (
              <div className="flex gap-3">
                <button
                  onClick={closeWizard}
                  className="flex-1 rounded-2xl border border-line bg-bg-card py-3.5 text-[14px] font-semibold text-ink-primary active:scale-[0.98] transition"
                >
                  {t("cw.done.close")}
                </button>
                <button
                  onClick={closeWizard}
                  className="flex-1 rounded-2xl bg-gradient-to-br from-brand to-brand-deep text-white py-3.5 text-[14px] font-semibold active:scale-[0.98] transition shadow-[0_12px_28px_-10px_rgba(91,33,182,0.6)] flex items-center justify-center gap-1.5"
                >
                  {t("cw.done.track")} <ArrowRight size={16} strokeWidth={2.4} />
                </button>
              </div>
            ) : (
              <button
                disabled={!canContinue || submitting}
                onClick={handleContinue}
                className={cn(
                  "w-full rounded-2xl py-3.5 text-[15px] font-semibold flex items-center justify-center gap-2 transition active:scale-[0.98]",
                  canContinue && !submitting
                    ? "bg-gradient-to-br from-brand to-brand-deep text-white shadow-[0_12px_28px_-10px_rgba(91,33,182,0.6)]"
                    : "bg-line text-ink-muted cursor-not-allowed"
                )}
              >
                {submitting ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    {t("cw.submitting")}
                  </>
                ) : step === 5 ? (
                  <>
                    {t("cw.submit")} <Check size={17} strokeWidth={2.6} />
                  </>
                ) : (
                  <>
                    {t("cw.continue")} <ChevronRight size={17} strokeWidth={2.4} />
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ *
 * Small presentational helpers.
 * ------------------------------------------------------------------ */

function StepBody({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-[20px] font-semibold tracking-tight leading-snug">{title}</h2>
      <p className="mt-1.5 text-[12.5px] text-ink-secondary leading-relaxed">{sub}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function SelectRow({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3.5 rounded-2xl border p-3.5 text-left transition active:scale-[0.98]",
        selected
          ? "border-brand bg-brand/[0.06] shadow-[0_10px_26px_-16px_rgba(124,58,237,0.55)]"
          : "border-line bg-bg-card hover:bg-bg-elevated"
      )}
    >
      {children}
    </button>
  );
}

function IconTile({ selected, children }: { selected: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors",
        selected ? "bg-brand text-white" : "bg-brand/[0.08] border border-brand/15 text-brand"
      )}
    >
      {children}
    </div>
  );
}

function SelectMark({ selected }: { selected: boolean }) {
  return (
    <span
      className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition",
        selected ? "bg-brand border-brand text-white" : "border-line text-transparent"
      )}
    >
      <Check size={13} strokeWidth={3} />
    </span>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3">
      <span className="text-[12px] text-ink-muted shrink-0">{label}</span>
      <span className="text-[12.5px] font-medium text-ink-primary text-right">{value}</span>
    </div>
  );
}
