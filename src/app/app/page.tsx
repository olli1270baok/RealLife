"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AppDashboard() {
  const router = useRouter();
  const [isPro, setIsPro] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        setIsPro(session.user.app_metadata?.is_pro === true);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="content-wrapper">
          <section className="view active">
            <div className="hero">
              <h1>Willkommen in der <br/><span>Kommandozentrale.</span></h1>
              <p style={{fontSize: '16px', maxWidth: '700px', marginBottom: 0}}>
                Hier hast du Zugriff auf alle 36 Schutzschilde. Wähle dein Werkzeug.
              </p>
            </div>

            {!loading && !isPro && (
              <div style={{
                background: 'rgba(255, 30, 86, 0.1)', 
                border: '1px solid var(--accent-red)', 
                borderRadius: '8px', 
                padding: '24px', 
                marginTop: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', color: 'white' }}>Werde zum Master-User 👑</h3>
                  <p style={{ margin: 0, color: 'var(--muted)', maxWidth: '500px' }}>
                    Dein Account ist aktuell limitiert. Schalte alle 36 Werkzeuge dauerhaft frei (Lifetime) und entfessele die volle Power der Vorlagenbude.
                  </p>
                </div>
                <a 
                  href={`https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01?client_reference_id=${userId}`}
                  className="btn btn-primary"
                  style={{ textDecoration: 'none', padding: '12px 24px', whiteSpace: 'nowrap' }}
                >
                  Jetzt Master-Pass sichern (19€)
                </a>
              </div>
            )}

            <h2 style={{marginTop: '40px'}}>Deine Schutzschilde {!loading && !isPro ? '(Gesperrt)' : '(Freigeschaltet)'}</h2>
            <div className="grid-3">
              <div className={`card ${!loading && !isPro ? '' : 'highlight'}`} style={{cursor: 'pointer', position: 'relative'}} onClick={() => router.push('/app/retouren-rebell')}>
                {!loading && !isPro && <div style={{position: 'absolute', top: 16, right: 16, fontSize: '24px'}}>🔒</div>}
                <h3 style={{color: !loading && !isPro ? 'var(--muted)' : 'var(--accent-red)'}}>🛍️ Retouren-Rebell</h3>
                <p style={{color: !loading && !isPro ? 'var(--muted)' : 'white'}}>E-Commerce Abwehr (Paketverlust, Amazon-Sperren, Gewährleistung).</p>
                {!loading && !isPro ? (
                  <div style={{marginTop: '16px', color: 'var(--muted)', fontSize: '12px', fontWeight: 'bold'}}>PREMIUM WERKZEUG</div>
                ) : (
                  <div style={{marginTop: '16px', color: 'var(--accent-blue)', fontSize: '12px', fontWeight: 'bold'}}>JETZT STARTEN →</div>
                )}
              </div>
              
              <div className="card" style={{opacity: 0.5, position: 'relative'}}>
                {!loading && !isPro && <div style={{position: 'absolute', top: 16, right: 16, fontSize: '24px'}}>🔒</div>}
                <h3>🏥 Patienten-Bollwerk</h3>
                <p>Pflegegrad, GdB, Bürgergeld. (In Entwicklung)</p>
              </div>

              <div className="card" style={{opacity: 0.5, position: 'relative'}}>
                {!loading && !isPro && <div style={{position: 'absolute', top: 16, right: 16, fontSize: '24px'}}>🔒</div>}
                <h3>📸 Blitzer-Bollwerk</h3>
                <p>Bußgeld, Punkte, MPU. (In Entwicklung)</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
