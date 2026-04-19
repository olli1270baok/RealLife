import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { data, error } = await supabase
    .from('guide_settings')
    .select('content')
    .eq('id', 'production')
    .single();

  if (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Fehler beim Laden der Daten aus Supabase' });
  }

  return res.status(200).json(data.content);
}
