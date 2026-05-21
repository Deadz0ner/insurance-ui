"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { dict, type Lang, type TKey } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
};

const LangCtx = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("insureone-lang") as Lang | null;
      if (saved === "en" || saved === "hi") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("insureone-lang", l);
    } catch {}
  };

  const t = (key: TKey) => (dict[lang] as Record<string, string>)[key] ?? key;

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export function useT() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
}
