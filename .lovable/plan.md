## Goal
Make the entire app respect the language picker (English / Telugu / Hindi), with a scalable i18n system and English fallback.

## Why current setup falls short
- `src/lib/i18n.ts` already has a `t()` helper, but:
  - It reads `localStorage` once per call and doesn't notify components when language changes mid-session — switching requires a full reload.
  - There is no in-app language switcher (only the `/language` route on first run), so most sessions never re-trigger a render with the new language.
- Large portions of `customer.tsx` (700 lines), `shopkeeper.tsx` (1116 lines), `admin.tsx`, `feedback.tsx`, dialogs, toasts, and error/empty states are **hardcoded English** strings that never call `t()`.

## What I'll build

### 1. Locale files (scalable)
Move all strings into JSON so future languages = add one file.
```
src/locales/en.json
src/locales/te.json
src/locales/hi.json
```
Add a `src/locales/index.ts` registry so adding `ta.json` (Tamil) etc. is a one-line change.

### 2. Reactive i18n core (`src/lib/i18n.ts`)
- Keep `getLang` / `setLang` / `LANGS` exports for back-compat.
- `setLang` dispatches a `languagechange` window event.
- New `useT()` hook: subscribes to the event so components re-render instantly when language changes.
- New `useLang()` hook returning current `Lang`.
- `t(key, lang?)` falls back to English when key is missing in te/hi, then to the key itself (with a `console.warn` in dev).
- Supports dotted keys (`shopkeeper.inventory.title`) for organization.

### 3. In-app language switcher
Add a compact language dropdown to `AppHeader` (visible on every screen) so users can switch any time, not just on first launch.

### 4. Audit & replace hardcoded strings
Scan and translate, in priority order:
- `AppHeader`, `LocationSheet`, `LocationHelpDialog`, `ShopCard`, `ShopCardSkeleton` — global components
- `customer.tsx` — search/empty states/cart/sort/filters/toasts/dialogs
- `shopkeeper.tsx` — inventory CRUD labels, add/voice/scan flows, delete confirm, shop setup, toasts
- `admin.tsx` — dashboard cards, feedback list
- `feedback.tsx`, `login.tsx`, `forgot-password.tsx`, `reset-password.tsx`, `role.tsx` — already partially translated; finish remaining strings
- Friendly error messages in `src/lib/friendlyError.ts`

For every replacement: add the key to all three JSON files. Telugu/Hindi get real translations for high-traffic strings; for long/edge strings I'll translate where confident and leave English fallback (auto-handled) where a quality translation needs a native reviewer — flagged in the deliverable list.

### 5. Persistence
Already via `localStorage["vf_lang"]`. I'll also initialize `<html lang="...">` from the same source in `__root.tsx` so SEO / screen readers reflect the choice.

### 6. Voice search
Unchanged — already reads `getLang()`. Will verify after the refactor.

## Technical notes
- JSON import uses Vite's native `import en from "./en.json"` (no resolver config needed).
- `useT()` returns the `t` function bound to current language; usage is `const t = useT(); <h1>{t("inventory")}</h1>`.
- Existing call sites that use `import { t } from "@/lib/i18n"` keep working (static `t` still resolves via current `localStorage`), but new code uses the hook for reactivity.

## Deliverables (provided in final reply)
- List of translated components/files
- Translation file structure
- List of any remaining English-only strings I intentionally left for native review

## Out of scope
- Translating user-generated content (shop names, item names entered by shopkeepers).
- RTL languages (none of en/te/hi need RTL).

Approve and I'll implement.