"use client";

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/login');
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#fdf8f3', color: '#1a2233', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(160deg, #e8f4fd 0%, #fef3e2 55%, #fdf8f3 100%)',
        padding: '60px 20px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '-60px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(251,146,60,0.12)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(59,130,246,0.10)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#fff', color: '#f97316',
            padding: '8px 18px', borderRadius: '50px',
            fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px',
            marginBottom: '28px', boxShadow: '0 2px 12px rgba(249,115,22,0.15)',
            border: '1px solid rgba(249,115,22,0.2)'
          }}>
            ✨ Legal-Tech für den deutschen Alltag
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 8vw, 58px)',
            fontWeight: 900, lineHeight: 1.1,
            marginBottom: '20px', letterSpacing: '-1px',
            color: '#0f172a'
          }}>
            Dein Recht.<br />
            <span style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #f97316 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Einfach gemacht.
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 4vw, 19px)', color: '#64748b',
            maxWidth: '540px', margin: '0 auto 36px', lineHeight: 1.7
          }}>
            Fertige Schreiben, Rechtsgrundlagen und PDF-Generatoren –
            für Flugentschädigungen, Mängel, Datenschutz und mehr.
            Kein Anwalt nötig.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
            <button
              onClick={handleCheckout}
              style={{
                width: '100%', maxWidth: '360px',
                padding: '18px 32px', fontSize: '17px', fontWeight: 700,
                background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
                color: '#fff', border: 'none', borderRadius: '16px',
                cursor: 'pointer', boxShadow: '0 8px 24px rgba(59,130,246,0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(59,130,246,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,130,246,0.35)'; }}
            >
              Kostenlos starten →
            </button>
            <button
              onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'transparent', border: 'none',
                color: '#94a3b8', fontSize: '14px', cursor: 'pointer',
                textDecoration: 'underline', textDecorationColor: 'transparent',
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#64748b'}
              onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
            >
              Alle Tools ansehen ↓
            </button>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section style={{ background: '#fff', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '28px 20px' }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '24px', textAlign: 'center'
        }}>
          {[
            { icon: '⚡', label: 'In 60 Sekunden fertig', sub: 'Kein Warten, kein Suchen' },
            { icon: '⚖️', label: 'Rechtssicher', sub: 'BGB, DSGVO & EU-Recht' },
            { icon: '💰', label: 'Einmalpreis', sub: 'Lifetime – kein Abo' },
            { icon: '📱', label: 'Mobil & Offline', sub: 'Läuft als App auf dem Handy' },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>{item.icon}</div>
              <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a', marginBottom: '4px' }}>{item.label}</strong>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section id="tools" style={{ padding: '72px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(24px, 6vw, 40px)', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
            Deine Werkzeuge
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '520px', margin: '0 auto' }}>
            Spezialisierte Tools für die häufigsten Alltagsprobleme – sofort einsatzbereit.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            { icon: '✈️', name: 'Flug-Rebell', desc: 'Bis zu 600 € Entschädigung für Verspätung & Annullierung. Airline-Ausreden widerlegen mit EuGH-Urteilen.', path: '/app/flug-rebell', color: '#3b82f6' },
            { icon: '🚄', name: 'Bahn-Rebell', desc: 'Strafzettel trotz App-Ticket? Verpassten Anschluss? 9 fertige Schreiben für jede Bahn-Situation.', path: '/app/bahn-rebell', color: '#f97316' },
            { icon: '📦', name: 'Retouren-Rebell', desc: 'Paketverlust beim Rückversand? Händler weigert sich? Erstattung erzwingen mit § 475 BGB.', path: '/app/retouren-rebell', color: '#10b981' },
            { icon: '📋', name: 'Anzeigen-Cockpit', desc: 'Professionelle Anzeigen & Beschwerden für Ordnungsamt, Finanzamt, DSGVO und mehr.', path: '/app/anzeigen-cockpit', color: '#8b5cf6' },
            { icon: '🛡️', name: 'Digital-Schutzschild', desc: 'Account gesperrt, Datenpanne, Spam-Mails. Deine digitalen Rechte mit einem Klick durchsetzen.', path: '/app/digital-schutzschild', color: '#ec4899' },
            { icon: '🏥', name: 'Patienten-Rebell', desc: 'Pflegegrad abgelehnt? Widerspruch gegen MDK-Bescheide mit medizinisch-juristisch optimierten Texten.', path: '/app/patienten-rebell', color: '#14b8a6' },
          ].map((tool, i) => (
            <div
              key={i}
              onClick={() => router.push(tool.path)}
              style={{
                background: '#fff', border: '1px solid #f1f5f9',
                borderRadius: '20px', padding: '28px',
                cursor: 'pointer', transition: 'all 0.25s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.10)`;
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = tool.color;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#f1f5f9';
              }}
            >
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: `${tool.color}18`, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', marginBottom: '18px'
              }}>
                {tool.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>{tool.name}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{tool.desc}</p>
              <div style={{ marginTop: '18px', color: tool.color, fontSize: '13px', fontWeight: 600 }}>
                Tool öffnen →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #fff7ed 100%)', padding: '72px 20px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(22px, 5vw, 36px)', fontWeight: 800, color: '#0f172a', marginBottom: '48px' }}>
            So einfach geht's
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'left' }}>
            {[
              { step: '1', icon: '🎯', title: 'Tool wählen', desc: 'Wähle das passende Tool für dein Anliegen – Flug, Bahn, Datenschutz und mehr.' },
              { step: '2', icon: '✍️', title: 'Formular ausfüllen', desc: 'Fülle in 2 Minuten das geführte Formular aus. Kein juristisches Vorwissen nötig.' },
              { step: '3', icon: '📄', title: 'PDF generieren', desc: 'Lade dein rechtssicheres Schreiben als PDF herunter – fertig zum Absenden.' },
            ].map((step, i) => (
              <div key={i} style={{
                display: 'flex', gap: '20px', alignItems: 'flex-start',
                background: '#fff', borderRadius: '18px', padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                  background: 'linear-gradient(135deg, #3b82f6, #f97316)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 900, fontSize: '18px'
                }}>
                  {step.step}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    {step.icon} {step.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING CTA ── */}
      <section style={{ padding: '72px 20px', textAlign: 'center' }}>
        <div style={{
          maxWidth: '480px', margin: '0 auto',
          background: '#fff', borderRadius: '28px',
          padding: '48px 32px', boxShadow: '0 24px 64px rgba(59,130,246,0.12)',
          border: '1px solid #e0eaff'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎉</div>
          <h2 style={{ fontSize: 'clamp(22px, 5vw, 32px)', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
            Starte heute
          </h2>
          <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px', lineHeight: 1.6 }}>
            Einmaliger Preis. Kein Abo. Kein Kleingedrucktes.<br />Lifetime-Zugang zu allen Tools.
          </p>

          <div style={{ marginBottom: '28px' }}>
            <span style={{ fontSize: '56px', fontWeight: 900, color: '#0f172a', letterSpacing: '-2px' }}>19</span>
            <span style={{ fontSize: '24px', color: '#64748b', marginLeft: '4px' }}>€</span>
            <div style={{
              display: 'inline-block', marginLeft: '12px',
              background: '#fef3c7', color: '#d97706',
              padding: '4px 12px', borderRadius: '30px', fontSize: '12px', fontWeight: 700
            }}>
              Lifetime
            </div>
          </div>

          <button
            onClick={handleCheckout}
            style={{
              width: '100%', padding: '18px 24px', fontSize: '17px', fontWeight: 700,
              background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
              color: '#fff', border: 'none', borderRadius: '14px',
              cursor: 'pointer', boxShadow: '0 8px 24px rgba(59,130,246,0.30)',
              marginBottom: '16px'
            }}
          >
            Account erstellen →
          </button>
          <p style={{ color: '#94a3b8', fontSize: '12px' }}>
            🔒 Sichere Zahlung via Stripe · Sofort-Zugang
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: '#f8fafc', borderTop: '1px solid #e2e8f0',
        padding: '32px 20px', textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {[['Impressum', '/impressum'], ['Datenschutz', '/datenschutz'], ['AGB & Widerruf', '/agb']].map(([label, href]) => (
            <a key={href} href={href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px' }}
              onMouseEnter={e => e.currentTarget.style.color = '#64748b'}
              onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
            >{label}</a>
          ))}
        </div>
        <p style={{ color: '#cbd5e1', fontSize: '12px' }}>
          © {new Date().getFullYear()} Baokmedia · Die Vorlagen ersetzen keine individuelle Rechtsberatung.
        </p>
      </footer>

    </div>
  );
}
