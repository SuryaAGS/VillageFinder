# Plan: Fix production build env injection (deployment/platform only)

Scope: deployment/build environment only. No changes to React, TypeScript, Supabase integration files, or any application source code.

## Steps for tomorrow

1. **Re-verify env presence at build time**
   - Confirm `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are still set in the project's build environment (not just the sandbox shell).
   - Confirm `.env` still exists in the project root and contains both `VITE_*` keys (it is gitignored, which is expected — Lovable's build worker reads from the project workspace, not Git).

2. **Diagnose why the build worker sees empty values**
   - Inspect the current published bundle again to confirm `var Ji = {}` is still the symptom.
   - Check whether `.env` is present in the workspace snapshot used by the publish worker (versus only in the running dev sandbox).
   - Check `@lovable.dev/vite-tanstack-config` version and its env-loading behavior for the publish/Cloudflare build mode.

3. **Fix the environment**
   - If `.env` is missing from the publish workspace: restore it with the two `VITE_*` values so Vite's `loadEnv` picks them up during the production build.
   - If `.env` is present but not loaded: escalate as a platform issue with the exact evidence (bundle hash, missing keys, wrapper version).
   - Do not edit `vite.config.ts`, `src/integrations/supabase/client.ts`, or any application file.

4. **Republish and verify**
   - Trigger a fresh publish.
   - Fetch the new bundle from `https://villagefinder.lovable.app/` and grep the built `useAuth-*.js` (or equivalent) for the Supabase URL substring `cxmqtsucyvznfaxnvkse` to confirm `Ji` is now populated instead of `{}`.
   - Load the site and confirm no "Missing Supabase environment variables" runtime error.

## Explicit non-goals

- No edits to `src/**`, `vite.config.ts`, `package.json`, `wrangler.jsonc`, or Supabase client code.
- No schema or RLS changes.
- No security scan changes.

## Success criteria

- Published `https://villagefinder.lovable.app/` loads without the Supabase env error.
- The production JS bundle contains the real Supabase URL and publishable key values (not `{}`).
