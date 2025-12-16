/*
  # Add company name and phone fields to contact_submissions

  1. Schema Changes
    - Add `company_name` field (text, optional)
    - Add `phone` field (text, optional)
    - Add `phone_confirm` field (text, optional)

  2. Security
    - Maintain existing RLS policies
    - No changes to existing permissions
*/

-- Add new fields to contact_submissions table
DO $$
BEGIN
  -- Add company_name field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'company_name'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN company_name text;
  END IF;

  -- Add phone field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'phone'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN phone text;
  END IF;

  -- Add phone_confirm field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'phone_confirm'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN phone_confirm text;
  END IF;
END $$;