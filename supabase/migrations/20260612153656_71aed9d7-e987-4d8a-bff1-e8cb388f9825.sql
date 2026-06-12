-- Hide user_id of raters from other authenticated users via column-level privileges.
REVOKE SELECT ON public.shop_ratings FROM authenticated;
GRANT SELECT (id, shop_id, rating, comment, created_at, updated_at) ON public.shop_ratings TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.shop_ratings TO authenticated;
-- Re-grant write privileges (REVOKE SELECT above only removed SELECT, but be explicit):
REVOKE SELECT ON public.shop_ratings FROM authenticated;
GRANT SELECT (id, shop_id, rating, comment, created_at, updated_at) ON public.shop_ratings TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.shop_ratings TO authenticated;

-- Allow each rater to read their own user_id via a dedicated policy that targets the same table;
-- column privileges apply globally, so to let a user see their own user_id we expose it through an
-- RPC or skip it. Application code does not need user_id back, so we leave it hidden.

-- Strengthen shop UPDATE policy to require shopkeeper role.
DROP POLICY IF EXISTS "Shopkeeper update own shop" ON public.shops;
CREATE POLICY "Shopkeeper update own shop"
ON public.shops
FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id AND public.has_role(auth.uid(), 'shopkeeper'))
WITH CHECK (auth.uid() = owner_id AND public.has_role(auth.uid(), 'shopkeeper'));

-- Same hardening for DELETE for consistency.
DROP POLICY IF EXISTS "Shopkeeper delete own shop" ON public.shops;
CREATE POLICY "Shopkeeper delete own shop"
ON public.shops
FOR DELETE
TO authenticated
USING (auth.uid() = owner_id AND public.has_role(auth.uid(), 'shopkeeper'));