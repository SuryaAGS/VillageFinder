# Shopkeeper Dashboard Inventory Improvements

Update `src/routes/shopkeeper.tsx` only. No backend or schema changes. Preserve existing styling, tokens, and mobile responsiveness.

## 1. Reorder sections

Move the existing **Shop Status** card (currently at lines ~492–509) to render directly below the header/summary card and above **Popular Items**.

New top-to-bottom order on the page:
1. Shop summary/header card (unchanged)
2. Shop Status card (moved up, content unchanged)
3. Popular Items section (unchanged)
4. Inventory search bar (new)
5. Inventory items list = current "Other Items" list, now controlled by search + show-more
6. Danger Zone (unchanged)

## 2. Inventory search bar (with voice)

Render between Popular Items and the inventory list. Heading stays as `t("otherItems")` above the list; the search bar sits just below that heading.

- Input: controlled `query` state, `placeholder` from a new locale key `searchInventoryPlaceholder` (EN/HI/TE).
- Mic button inside the input (right side), uses `lucide-react` `Mic` / `MicOff`.
- Filtering: case-insensitive match against `i.name` AND `localizeItem(i.name, lang)` so users can type in their UI language. Filter is applied to the "other items" list (items not already in Popular).
- Debounce not required (lists are small); use `useMemo` for filtered list to avoid re-renders.

### Voice search (Web Speech API)

- Feature-detect `window.SpeechRecognition || window.webkitSpeechRecognition`. If absent, hide the mic button.
- Map `lang` → recognition language: `en`→`en-IN`, `hi`→`hi-IN`, `te`→`te-IN`.
- On mic click: start recognition, set `listening=true`, show pulsing red ring around the mic + visually-hidden "Listening…" text (`aria-live="polite"`).
- `onresult`: set query to the final transcript; list updates via existing memo.
- `onerror` / permission denied: toast a friendly message (`voiceErrorPermission` / `voiceErrorGeneric` locale keys) and reset state.
- `onend`: clear `listening`.
- Cleanup recognition on unmount and on language change (recreate instance when `lang` changes).
- Accessibility: `aria-label` on input ("Search inventory"), `aria-pressed` on mic button, focus ring preserved.

## 3. Show More / Show Less

- Add `expanded` state (default `false`).
- `visibleItems = expanded ? filtered : filtered.slice(0, 5)`.
- Render button below the list only when `filtered.length > 5`. Text toggles between `showMore` / `showLess` locale keys.
- Smooth transition: use `framer-motion` (already imported) `AnimatePresence` + `motion.li` with `layout` for the appearing/disappearing items, or a simple `transition-all` height — choose `layout` animation for consistency with the existing motion usage.
- Reset `expanded` to `false` whenever `query` changes so newly filtered results start collapsed.

## Locale keys to add (EN/HI/TE in `src/locales/*.json`)

- `searchInventoryPlaceholder`
- `showMore`, `showLess`
- `listening`
- `voiceErrorPermission`, `voiceErrorGeneric`
- `voiceNotSupported` (used as mic button tooltip when API missing — though button is hidden)

## Technical notes

- All changes confined to `src/routes/shopkeeper.tsx` plus three locale JSON files.
- No changes to data fetching, RLS, RPCs, or Popular Items behavior.
- Mobile: search input is full-width with mic absolutely positioned right; existing `max-w-2xl` container preserved.
- Use existing tokens (`bg-card`, `border-border`, `rounded-2xl`, `shadow-soft`) — no hardcoded colors.
