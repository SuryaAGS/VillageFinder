import { useSyncExternalStore } from "react";
import { LOCALES, LANG_META, type LocaleCode, type TranslationKey } from "@/locales";

export type Lang = LocaleCode;
export type TKey = TranslationKey;

export const LANG_KEY = "vf_lang";
// kept for backward compat with any UI still referencing them
export const ROLE_KEY = "vf_role";
export const PHONE_KEY = "vf_phone";

export type Role = "customer" | "shopkeeper";

const LANG_EVENT = "vf:languagechange";

export function getLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(LANG_KEY) as Lang | null;
  if (stored && stored in LOCALES) return stored;
  return "en";
}

export function setLang(l: Lang) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LANG_KEY, l);
  document.documentElement.lang = l;
  window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: l }));
}

/**
 * Translate a key. Falls back to English, then to the key itself (with a
 * dev warning) when a translation is missing.
 */
export function t(key: TKey | string, lang?: Lang): string {
  const l = lang || getLang();
  const localized = (LOCALES[l] as Record<string, string>)[key as string];
  if (localized != null) return localized;
  const english = (LOCALES.en as Record<string, string>)[key as string];
  if (english != null) return english;
  if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(`[i18n] Missing translation key: "${key}"`);
  }
  return key as string;
}

// ---- React hooks (reactive) ----

const langStore = {
  subscribe(cb: () => void) {
    if (typeof window === "undefined") return () => {};
    const handler = () => cb();
    window.addEventListener(LANG_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(LANG_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  },
  get: () => getLang(),
  ssr: (): Lang => "en",
};

/** Returns the current language; re-renders when it changes. */
export function useLang(): Lang {
  return useSyncExternalStore(langStore.subscribe, langStore.get, langStore.ssr);
}

/** Returns a translation function bound to the current language; re-renders on change. */
export function useT(): (key: TKey | string) => string {
  const lang = useLang();
  return (key) => t(key, lang);
}

export const LANGS = LANG_META.map(({ code, native, english }) => ({
  code,
  native,
  english,
}));
