import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Code fehlt' });

  // Prüfen ob der Code existiert und noch nicht benutzt wurde
  const { data: license, error } = await supabase
    .from('licenses')
    .select('*')
    .eq('code', code)
    .single();

  if (error || !license) {
    return res.status(404).json({ error: 'Code ungültig oder nicht gefunden' });
  }

  // Code kann mehrfach verwendet werden (für Gerätewechsel oder Cache-Löschung)
  // Wir entfernen die harte Sperre if (license.used) { ... }

  // Code als benutzt markieren
  const { error: updateError } = await supabase
    .from('licenses')
    .update({ used: true, used_at: new Date().toISOString() })
    .eq('id', license.id);

  if (updateError) {
    return res.status(500).json({ error: 'Fehler beim Entsperren. Bitte Support kontaktieren.' });
  }

  return res.status(200).json({ success: true, message: 'Erfolgreich freigeschaltet!' });
}
