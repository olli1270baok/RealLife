"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Homepage() {
  const router = useRouter();

  // Bahn-Rebell Demo State
  const [ticketPrice, setTicketPrice] = useState<string>('');
  const [delay, setDelay] = useState<string>('');
  const [compensation, setCompensation] = useState<number | null>(null);

  const calculateCompensation = () => {
    const price = parseFloat(ticketPrice);
    const delayMins = parseInt(delay);
    if (isNaN(price) || isNaN(delayMins)) return;

    if (delayMins < 60) {
      setCompensation(0);
    } else if (delayMins >= 60 && delayMins < 120) {
      setCompensation(price * 0.25);
    } else {
      setCompensation(price * 0.5);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg)', color: 'var(--text-dark)', overflowX: 'hidden' }}>
      
      {/* ── HERO ── */}
      <section style={{
        backgroundColor: 'var(--bg-dark)',
        color: 'var(--text-light)',
        padding: '100px 20px 80px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(40px, 8vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            marginBottom: '24px'
          }}>
            Komplizierte Dinge<br />einfacher machen.
          </h1>
          <p style={{
            fontSize: 'clamp(18px, 4vw, 22px)',
            color: 'var(--muted-light)',
            marginBottom: '40px',
            lineHeight: 1.5,
            maxWidth: '640px',
            margin: '0 auto 40px'
          }}>
            Digitale Helfer für Bahnärger, Nebenkosten, Abos, Fluggastrechte und anderen Alltagskram.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button 
              onClick={() => document.getElementById('problems')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                backgroundColor: 'var(--accent-orange)',
                color: '#fff',
                border: 'none',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: 600,
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-main)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-orange-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-orange)'}
            >
              Kostenlos ausprobieren
            </button>
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                backgroundColor: 'transparent',
                color: 'var(--text-light)',
                border: '1px solid var(--border-dark)',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: 600,
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-main)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Alle Lösungen ansehen
            </button>
          </div>
          
          <div style={{
            fontSize: '14px',
            color: 'var(--muted-light)',
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <span>✓ Direkt nutzbar</span>
            <span>·</span>
            <span>Auf Wunsch installierbar</span>
            <span>·</span>
            <span>Persönliche Daten möglichst lokal</span>
          </div>
        </div>
      </section>

      {/* ── DIRECT PROBLEM ENTRY ── */}
      <section id="problems" style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-head)', 
          fontSize: '32px', 
          fontWeight: 700,
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          Was willst du gerade erledigen?
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          {/* Bahn-Rebell */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid var(--border)',
            padding: '32px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-dark)' }}>Zug verspätet?</h3>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted-dark)', textTransform: 'uppercase', marginBottom: '16px' }}>Bahn-Rebell</div>
              <p style={{ fontSize: '16px', color: 'var(--muted-dark)', marginBottom: '24px' }}>
                Verspätung und mögliche Entschädigung strukturiert prüfen.
              </p>
            </div>
            <button 
              onClick={() => router.push('/bahn-rebell')}
              style={{
                backgroundColor: 'var(--bg-dark)',
                color: '#fff',
                border: 'none',
                padding: '12px',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Entschädigung prüfen
            </button>
          </div>

          {/* Nebenkosten-Rebell */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid var(--border)',
            padding: '32px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: '4px solid var(--accent-orange)'
          }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-dark)' }}>Nebenkosten bekommen?</h3>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted-dark)', textTransform: 'uppercase', marginBottom: '16px' }}>Nebenkosten-Rebell</div>
              <p style={{ fontSize: '16px', color: 'var(--muted-dark)', marginBottom: '24px' }}>
                Kosten, Positionen und Veränderungen verständlicher nachvollziehen.
              </p>
            </div>
            <button 
              onClick={() => router.push('/nebenkosten-rebell')}
              style={{
                backgroundColor: 'var(--bg-dark)',
                color: '#fff',
                border: 'none',
                padding: '12px',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Abrechnung prüfen
            </button>
          </div>

          {/* Abo-Killer */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid var(--border)',
            padding: '32px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-dark)' }}>Zu viele Abos?</h3>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted-dark)', textTransform: 'uppercase', marginBottom: '16px' }}>Abo-Killer</div>
              <p style={{ fontSize: '16px', color: 'var(--muted-dark)', marginBottom: '24px' }}>
                Abos, laufende Kosten und Kündigungen an einem Ort organisieren.
              </p>
            </div>
            <button 
              onClick={() => router.push('/abo-killer')}
              style={{
                backgroundColor: 'var(--bg-dark)',
                color: '#fff',
                border: 'none',
                padding: '12px',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Kosten sortieren
            </button>
          </div>

          {/* Flug-Rebell */}
          <div style={{
            backgroundColor: 'var(--bg-dark)',
            color: 'var(--text-light)',
            padding: '32px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Flugproblem?</h3>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted-light)', textTransform: 'uppercase', marginBottom: '16px' }}>Flug-Rebell</div>
              <p style={{ fontSize: '16px', color: 'var(--muted-light)', marginBottom: '24px' }}>
                Den eigenen Fall einordnen und nächste Schritte vorbereiten.
              </p>
            </div>
            <button 
              onClick={() => router.push('/flug-rebell')}
              style={{
                backgroundColor: '#fff',
                color: 'var(--bg-dark)',
                border: 'none',
                padding: '12px',
                borderRadius: '6px',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Möglichkeiten prüfen
            </button>
          </div>
        </div>
      </section>

      {/* ── BAHN-REBELL FREE DEMO ── */}
      <section style={{ backgroundColor: '#fff', padding: '80px 20px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'center' }}>
          
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ display: 'inline-block', backgroundColor: '#e2e8f0', color: 'var(--text-dark)', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 700, marginBottom: '16px' }}>
              KOSTENLOS · DIREKT NUTZBAR
            </div>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '36px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>
              Zug verspätet?
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--muted-dark)', marginBottom: '32px', lineHeight: 1.6 }}>
              Prüfe kostenlos, was für deinen Fall grundsätzlich infrage kommen könnte.
            </p>
            <button 
              onClick={() => router.push('/app/bahn-rebell')}
              style={{
                backgroundColor: 'var(--bg-dark)',
                color: '#fff',
                border: 'none',
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Bahn-Rebell kostenlos testen
            </button>
          </div>

          <div style={{ flex: '1 1 340px', backgroundColor: 'var(--bg)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>Live-Preview</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Ticketpreis (€)</label>
                <input 
                  type="number" 
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  placeholder="z.B. 49.90"
                  style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '16px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Verspätung am Ziel (Minuten)</label>
                <input 
                  type="number" 
                  value={delay}
                  onChange={(e) => setDelay(e.target.value)}
                  placeholder="z.B. 65"
                  style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '16px' }}
                />
              </div>
              <button 
                onClick={calculateCompensation}
                style={{
                  backgroundColor: 'var(--accent-orange)',
                  color: '#fff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '8px'
                }}
              >
                Prüfen
              </button>

              {compensation !== null && (
                <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid var(--border)', textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: 'var(--muted-dark)', marginBottom: '4px' }}>Mögliche Entschädigung:</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: compensation > 0 ? '#10b981' : 'var(--text-dark)' }}>
                    {compensation.toFixed(2).replace('.', ',')} €
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-dark)', marginTop: '8px' }}>Dies ist eine unverbindliche Orientierung. Für Sonderfälle nutze die vollständige App.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS (PROBLEM -> UTILITY -> SOLUTION) ── */}
      <section id="products" style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '36px', fontWeight: 800, textAlign: 'center', marginBottom: '64px' }}>
          Digitale Helfer für echten Alltagskram
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          
          {/* Abo-Killer */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 300px', backgroundColor: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontWeight: 600 }}>Streaming</span>
                <span style={{ fontWeight: 700 }}>24,98 €</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontWeight: 600 }}>Software</span>
                <span style={{ fontWeight: 700 }}>19,99 €</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontWeight: 600 }}>Fitness</span>
                <span style={{ fontWeight: 700 }}>39,00 €</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ color: 'var(--muted-dark)', fontSize: '14px' }}>Summe pro Jahr</span>
                <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-orange)' }}>1.007,64 €</span>
              </div>
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px' }}>Weißt du, was deine Abos dich wirklich kosten?</h3>
              <p style={{ fontSize: '18px', color: 'var(--muted-dark)', marginBottom: '24px' }}>
                Abo-Killer bringt Kosten, Laufzeiten und Kündigungen an einen Ort.
              </p>
              <button 
                onClick={() => router.push('/abo-killer')}
                style={{ backgroundColor: 'var(--bg-dark)', color: '#fff', padding: '12px 24px', borderRadius: '6px', border: 'none', fontWeight: 600, cursor: 'pointer' }}
              >
                Mehr erfahren
              </button>
            </div>
          </div>

          {/* Weitere Helfer (Liste) */}
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', borderBottom: '2px solid var(--border)', paddingBottom: '12px' }}>Weitere Helfer</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
              <a href="/nebenkosten-rebell" style={{ textDecoration: 'none', color: 'var(--text-dark)', padding: '16px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>Nebenkosten-Rebell</div>
                <div style={{ fontSize: '14px', color: 'var(--muted-dark)' }}>Kosten & Veränderungen nachvollziehen</div>
              </a>
              <a href="/flug-rebell" style={{ textDecoration: 'none', color: 'var(--text-dark)', padding: '16px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>Flug-Rebell</div>
                <div style={{ fontSize: '14px', color: 'var(--muted-dark)' }}>Deinen Fall einordnen</div>
              </a>
              <a href="/app/retouren-rebell" style={{ textDecoration: 'none', color: 'var(--text-dark)', padding: '16px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>Retouren-Rebell</div>
                <div style={{ fontSize: '14px', color: 'var(--muted-dark)' }}>Rechte bei Rücksendungen</div>
              </a>
              <a href="/app/digital-schutzschild" style={{ textDecoration: 'none', color: 'var(--text-dark)', padding: '16px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>Digital-Schutzschild</div>
                <div style={{ fontSize: '14px', color: 'var(--muted-dark)' }}>Hilfe bei Sperrungen & Datenpannen</div>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── MASTER PASS UPSELL ── */}
      <section style={{ backgroundColor: 'var(--bg-dark)', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '32px', fontWeight: 800, marginBottom: '16px' }}>Mehr als ein Thema?</h2>
          <p style={{ fontSize: '18px', color: 'var(--muted-light)', marginBottom: '32px' }}>
            Mit dem Vorlagenbude Pass bekommst du Zugriff auf mehrere digitale Helfer gleichzeitig.
          </p>
          <button 
            onClick={async () => {
              const { startCheckout } = await import('@/lib/commerce/checkout');
              await startCheckout('masterPass');
            }}
            style={{ backgroundColor: 'var(--accent-orange)', color: '#fff', padding: '14px 28px', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer' }}
          >
            Master-Pass sichern (19 €)
          </button>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '36px', fontWeight: 800, textAlign: 'center', marginBottom: '64px' }}>
          Kein Software-Zirkus. Einfach anfangen.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-orange)', marginBottom: '12px' }}>1. Problem auswählen</div>
            <p style={{ color: 'var(--muted-dark)', lineHeight: 1.6 }}>Das passende digitale Werkzeug starten.</p>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-orange)', marginBottom: '12px' }}>2. Angaben eintragen</div>
            <p style={{ color: 'var(--muted-dark)', lineHeight: 1.6 }}>Nur das erfassen, was wirklich benötigt wird.</p>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-orange)', marginBottom: '12px' }}>3. Überblick bekommen</div>
            <p style={{ color: 'var(--muted-dark)', lineHeight: 1.6 }}>Kosten, Fristen, Berechnungen oder nächste Schritte strukturieren.</p>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-orange)', marginBottom: '12px' }}>4. Weiterarbeiten</div>
            <p style={{ color: 'var(--muted-dark)', lineHeight: 1.6 }}>Speichern, exportieren oder passende Funktionen nutzen.</p>
          </div>
        </div>
      </section>

      {/* ── TRUST SECTION ── */}
      <section style={{ backgroundColor: '#fff', padding: '80px 20px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '36px', fontWeight: 800, textAlign: 'center', marginBottom: '64px' }}>
            Warum Vorlagenbude?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Kein unnötiges Abo</h3>
              <p style={{ color: 'var(--muted-dark)', lineHeight: 1.6 }}>Produkte sind nicht künstlich an laufende Gebühren gekoppelt.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Deine Daten möglichst bei dir</h3>
              <p style={{ color: 'var(--muted-dark)', lineHeight: 1.6 }}>Persönliche App-Daten werden lokal gespeichert, soweit im jeweiligen Produkt vorgesehen.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Keine Fachsoftware</h3>
              <p style={{ color: 'var(--muted-dark)', lineHeight: 1.6 }}>Werkzeuge funktionieren ohne lange Einarbeitung.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Ein Problem. Eine Lösung.</h3>
              <p style={{ color: 'var(--muted-dark)', lineHeight: 1.6 }}>Keine künstlich aufgeblähten Funktionen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--muted-light)', padding: '40px 20px', textAlign: 'center', fontSize: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '24px' }}>
          <a href="/impressum" style={{ color: 'var(--muted-light)', textDecoration: 'none' }}>Impressum</a>
          <a href="/datenschutz" style={{ color: 'var(--muted-light)', textDecoration: 'none' }}>Datenschutz</a>
          <a href="/agb" style={{ color: 'var(--muted-light)', textDecoration: 'none' }}>AGB</a>
        </div>
        <p>© {new Date().getFullYear()} Vorlagenbude. Die Werkzeuge ersetzen keine individuelle rechtliche Beratung.</p>
      </footer>

    </div>
  );
}
