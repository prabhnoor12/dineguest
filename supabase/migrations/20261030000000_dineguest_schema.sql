-- DineGuest: Captive Guest WiFi Marketing, Diner CRM & VIP SMS SaaS
-- PostgreSQL Database Schema with Row-Level Security (RLS)

-- 1. Agencies Table (Hospitality Agencies & White-Label Resellers)
CREATE TABLE IF NOT EXISTS agencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_name TEXT NOT NULL DEFAULT 'TasteCraft Hospitality Agency',
  agency_tagline TEXT DEFAULT 'Captive Guest WiFi Marketing & Diner CRM Suite',
  brand_color TEXT NOT NULL DEFAULT '#10b981',
  custom_domain TEXT DEFAULT 'wifi.tastecraft.agency',
  contact_email TEXT NOT NULL DEFAULT 'concierge@tastecraft.agency',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Restaurants / Hospitality Venues
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  venue_type TEXT NOT NULL DEFAULT 'Restaurant & Bar',
  owner_name TEXT NOT NULL,
  phone TEXT,
  wifi_ssid TEXT NOT NULL DEFAULT 'Guest_Free_WiFi',
  router_gateway TEXT NOT NULL DEFAULT 'Ubiquiti UniFi Cloud Controller',
  diners_captured_month INTEGER NOT NULL DEFAULT 0,
  total_diners_database INTEGER NOT NULL DEFAULT 0,
  repeat_rate NUMERIC(4, 1) NOT NULL DEFAULT 32.5,
  monthly_retainer NUMERIC(10, 2) NOT NULL DEFAULT 149.00,
  campaign_revenue_month NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expiring_soon', 'paused')),
  card_brand TEXT DEFAULT 'Visa',
  card_last4 TEXT DEFAULT '4412',
  next_billing TEXT DEFAULT 'Nov 1, 2026',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Live Active WiFi Sessions (Diners connected in dining room right now)
CREATE TABLE IF NOT EXISTS active_wifi_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  diner_name TEXT NOT NULL,
  diner_phone TEXT NOT NULL,
  device_model TEXT DEFAULT 'iPhone / Android',
  mac_address TEXT NOT NULL,
  dwell_minutes INTEGER NOT NULL DEFAULT 1,
  seating_section TEXT DEFAULT 'Main Dining',
  vip_tier TEXT NOT NULL DEFAULT 'First-Time Guest',
  connected_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Diner CRM Profiles (Verified guest contact & dining habits)
CREATE TABLE IF NOT EXISTS diner_crm (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  total_visits INTEGER NOT NULL DEFAULT 1,
  last_visit TEXT DEFAULT 'Today',
  avg_party_size INTEGER NOT NULL DEFAULT 2,
  favorite_dish TEXT DEFAULT 'Wood-Fired Pizza',
  estimated_spend NUMERIC(10, 2) NOT NULL DEFAULT 65.00,
  vip_status TEXT NOT NULL DEFAULT 'First-Time Guest',
  marketing_opt_in BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Captive Portal Splash Settings
CREATE TABLE IF NOT EXISTS captive_portal_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  headline TEXT NOT NULL,
  subheadline TEXT,
  brand_color TEXT NOT NULL DEFAULT '#10b981',
  hero_image_url TEXT,
  opt_in_vip_club BOOLEAN NOT NULL DEFAULT true,
  vip_incentive TEXT DEFAULT 'Get 10% off your next special by joining our text club',
  require_phone BOOLEAN NOT NULL DEFAULT true,
  require_name BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Automated Re-Engagement Campaigns & Churn Bots
CREATE TABLE IF NOT EXISTS reengagement_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  trigger_rule TEXT NOT NULL,
  sms_copy TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  diners_reactivated INTEGER NOT NULL DEFAULT 0,
  revenue_generated NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row-Level Security (RLS)
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE active_wifi_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE diner_crm ENABLE ROW LEVEL SECURITY;
ALTER TABLE captive_portal_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reengagement_campaigns ENABLE ROW LEVEL SECURITY;

-- Public RLS Policies
CREATE POLICY "Public read for active restaurants"
  ON restaurants FOR SELECT
  USING (true);

CREATE POLICY "Public insert for captive portal wifi sessions"
  ON active_wifi_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public read and write for diner CRM"
  ON diner_crm FOR ALL
  USING (true)
  WITH CHECK (true);
