-- Review before running on production and take a current database backup.
-- This migration preserves the workflow's existing `status` column and adds a
-- separate moderation state so a rating never decides whether a review is public.

BEGIN;

ALTER TABLE public.website_reviews
  ADD COLUMN IF NOT EXISTS moderation_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS needs_attention boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_to_publish boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS approved_at timestamptz;

UPDATE public.website_reviews
SET needs_attention = COALESCE(rating <= 2, false)
WHERE needs_attention IS DISTINCT FROM COALESCE(rating <= 2, false);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.website_reviews'::regclass
      AND conname = 'website_reviews_moderation_status_check'
  ) THEN
    ALTER TABLE public.website_reviews
      ADD CONSTRAINT website_reviews_moderation_status_check
      CHECK (moderation_status IN ('pending', 'approved', 'rejected'));
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.website_reviews'::regclass
      AND conname = 'website_reviews_rating_range_check'
  ) THEN
    ALTER TABLE public.website_reviews
      ADD CONSTRAINT website_reviews_rating_range_check
      CHECK (rating BETWEEN 1 AND 5) NOT VALID;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS website_reviews_public_feed_idx
  ON public.website_reviews (approved_at DESC, created_at DESC)
  WHERE moderation_status = 'approved' AND consent_to_publish = true;

CREATE OR REPLACE VIEW public.approved_website_reviews AS
SELECT
  left(trim(customer_name), 80) AS name,
  rating::integer AS rating,
  left(review, 1000) AS review,
  NULLIF(left(service, 160), '') AS service,
  COALESCE(approved_at, created_at) AS created_at
FROM public.website_reviews
WHERE moderation_status = 'approved'
  AND consent_to_publish = true;

COMMENT ON VIEW public.approved_website_reviews IS
  'Public review feed without customer email or internal workflow fields.';

CREATE TABLE IF NOT EXISTS public.website_review_rate_limits (
  client_hash char(64) NOT NULL,
  window_start timestamptz NOT NULL,
  attempt_count integer NOT NULL DEFAULT 1 CHECK (attempt_count > 0),
  PRIMARY KEY (client_hash, window_start)
);

CREATE INDEX IF NOT EXISTS website_review_rate_limits_cleanup_idx
  ON public.website_review_rate_limits (window_start);

COMMIT;

-- The n8n INSERT must set consent_to_publish from the server-validated payload:
--   ..., consent_to_publish, needs_attention
--   ..., $10::boolean, ($4::integer <= 2)
-- moderation_status is intentionally omitted so PostgreSQL assigns `pending`.
-- A manager can publish a genuine, consented review with:
-- UPDATE public.website_reviews
-- SET moderation_status = 'approved', approved_at = now()
-- WHERE review_id = $1 AND consent_to_publish = true;
-- Give the GET workflow a separate least-privilege database role with SELECT on
-- `public.approved_website_reviews` only; do not give it access to the base table.
-- Run this from an hourly n8n schedule so pseudonymous limiter records expire:
-- DELETE FROM public.website_review_rate_limits
-- WHERE window_start < now() - interval '24 hours';
