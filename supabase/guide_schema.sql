-- ============================================================================
-- ADULT GUIDE: CONTENT PERSISTENCE SCHEMA
-- Führe dieses Skript im Supabase SQL Editor aus
-- ============================================================================

-- Tabelle für die globalen Einstellungen und Inhalte der App
CREATE TABLE IF NOT EXISTS guide_settings (
  id TEXT PRIMARY KEY, -- 'production', 'staging' etc.
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initialer Datensatz (Platzhalter)
-- Wir werden diesen beim ersten Speichern aus der admin.js füllen
INSERT INTO guide_settings (id, content)
VALUES ('production', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- RLS (Row Level Security)
ALTER TABLE guide_settings ENABLE ROW LEVEL SECURITY;

-- Jeder darf die Inhalte lesen (für die App)
CREATE POLICY "Public read guide_settings"
  ON guide_settings FOR SELECT
  USING (true);

-- Nur authentifizierte Anfragen (mit Service Key via API) dürfen schreiben
-- Da wir die API-Routen auf dem Server nutzen, ist dies sicher.
CREATE POLICY "Service management only"
  ON guide_settings FOR ALL
  USING (false)
  WITH CHECK (false);
