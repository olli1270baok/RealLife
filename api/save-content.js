import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// In einer echten Produktion sollte dies ein Environment Variable sein (z.B. process.env.ADMIN_PIN)
const ADMIN_PIN = "1234"; 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { content, pin } = req.body;

  if (pin !== ADMIN_PIN) {
    return res.status(401).json({ error: 'Ungültige PIN' });
  }

  if (!content) {
    return res.status(400).json({ error: 'Kein Inhalt gesendet' });
  }

  const { error } = await supabase
    .from('guide_settings')
    .upsert({ 
      id: 'production', 
      content: content,
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.error('Save error:', error);
    return res.status(500).json({ error: 'Fehler beim Speichern in Supabase' });
  }

  return res.status(200).json({ success: true, message: 'Daten erfolgreich in Supabase gespeichert' });
}
