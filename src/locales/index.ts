// Locale registry. To add a new language:
//  1. Create `src/locales/<code>.json` with the translated keys.
//  2. Add it to LOCALES and LANG_META below.
//  3. (Optional) Update `Lang` in `src/lib/i18n.ts`.
import en from "./en.json";
import te from "./te.json";
import hi from "./hi.json";

export const LOCALES = { en, te, hi } as const;

export type LocaleCode = keyof typeof LOCALES;
export type TranslationKey = keyof typeof en;

export const LANG_META: { code: LocaleCode; native: string; english: string }[] = [
  { code: "te", native: "తెలుగు", english: "Telugu" },
  { code: "hi", native: "हिन्दी", english: "Hindi" },
  { code: "en", native: "English", english: "English" },
];
