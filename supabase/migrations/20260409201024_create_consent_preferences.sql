/*
  # Create consent preferences table

  1. New Tables
    - `consent_preferences`
      - `id` (uuid, primary key)
      - `visitor_id` (text, unique) - anonymous browser fingerprint/UUID
      - `analytics` (boolean, default false) - Plausible, Google Analytics
      - `marketing` (boolean, default false) - Meta Ads, Google Ads, remarketing
      - `functional` (boolean, default false) - chat widgets, preferences
      - `ip_address` (text, nullable) - for audit trail
      - `user_agent` (text, nullable) - for audit trail
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `consent_preferences` table
    - Add insert policy for anonymous users (public site visitors)
    - Add update policy scoped by visitor_id header
    - Add select policy scoped by visitor_id header

  3. Notes
    - visitor_id is a client-generated UUID stored in localStorage
    - No authentication required since this is a public portfolio site
    - Policies use request headers to scope access to own records
*/

CREATE TABLE IF NOT EXISTS consent_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text UNIQUE NOT NULL,
  analytics boolean NOT NULL DEFAULT false,
  marketing boolean NOT NULL DEFAULT false,
  functional boolean NOT NULL DEFAULT false,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE consent_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert their own consent"
  ON consent_preferences
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Visitors can read own consent by visitor_id"
  ON consent_preferences
  FOR SELECT
  TO anon
  USING (visitor_id = current_setting('request.headers', true)::json->>'x-visitor-id');

CREATE POLICY "Visitors can update own consent by visitor_id"
  ON consent_preferences
  FOR UPDATE
  TO anon
  USING (visitor_id = current_setting('request.headers', true)::json->>'x-visitor-id')
  WITH CHECK (visitor_id = current_setting('request.headers', true)::json->>'x-visitor-id');
