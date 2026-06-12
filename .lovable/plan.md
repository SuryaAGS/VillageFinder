# Translate remaining dynamic content (Telugu/Hindi)

The static UI is already localized. The English text left in the screenshot is dynamic/data-driven. This plan localizes it.

## 1. Localize relative time strings
- Update `timeAgo()` (src/lib/mockData.ts) to use translation keys: "just now", "{n}m ago", "{n}h ago", "{n}d ago".
- Add keys to en/te/hi locale files (e.g. `timeAgoDays` → "{n}రోజుల క్రితం" in Telugu).
- Update all call sites (ShopCard, shopkeeper inventory) to pass the current language.

## 2. Localize shop categories
- Add a category translation map (Kirana/Grocery, Vegetables, Dairy, Medical, etc.) so "Kirana / Grocery" displays as "కిరాణా / సరుకులు" in Telugu and Hindi equivalents.
- Apply in ShopCard and shopkeeper setup form.

## 3. Expand the item-name dictionary
- Add ~40 more common items to `src/lib/inventoryI18n.ts`: Basmati Rice, Wheat Flour (Atta), Medimix, biscuits, dals, spices, oils, snacks, household items — with Telugu and Hindi names.
- Make matching case-insensitive and tolerant of extra words (e.g. "(Atta)" suffix) so more shopkeeper-typed names match.

## 4. Units
- Localize unit labels (kg, L, pc, pack) shown after prices.

## Not translated (by design)
- Shop names ("Krishna kirana") and landmarks ("Beside temple") are shopkeeper-entered free text — translating these automatically risks wrong/garbled names. They stay as entered.

## Note about the screenshot
The screenshot is from the **published** site (narzo-finder-hub.lovable.app). After this change you must re-publish for it to appear there.
