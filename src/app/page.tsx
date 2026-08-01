"use client";

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/login');
  };

  return (
    <div className="main-content" style={{ padding: '0', flex: 1, overflowY: 'auto', backgroundColor: '#0d1117' }}>
      
      {/* Hero Section */}
      <section style={{ 
        padding: '120px 20px', 
        textAlign: 'center', 
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at top, rgba(255, 30, 86, 0.15) 0%, #0d1117 70%)' 
      }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '400px', background: 'rgba(255,30,86,0.1)', filter: 'blur(150px)', borderRadius: '50%', pointerEvents: 'none' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255, 255, 255, 0.05)', color: 'white', padding: '8px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', textTransform: 'uppercase' }}>
            <span style={{ color: 'var(--accent-red)' }}>NEU:</span> Legal-Tech für den Alltag
          </div>
          
          <h1 style={{ fontSize: '72px', margin: '0 auto 24px', lineHeight: '1.05', fontWeight: 900, letterSpacing: '-2px' }}>
            Lass dich nicht länger <br/> 
            <span style={{ 
              background: 'linear-gradient(90deg, #ff1e56 0%, #ff8a00 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>hinhalten.</span>
          </h1>
          
          <p style={{ fontSize: '22px', color: 'var(--muted)', maxWidth: '650px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            Behörden wimmeln dich ab. Konzerne behalten dein Geld. E-Commerce Giganten sperren deinen Account. Es ist Zeit, mit juristischer Härte zurückzuschlagen.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button 
              onClick={handleCheckout} 
              className="btn btn-primary" 
              style={{ padding: '18px 40px', fontSize: '18px', fontWeight: 600, letterSpacing: '1px', boxShadow: '0 0 30px rgba(255,30,86,0.4)', transition: 'all 0.3s ease' }}
            >
              Jetzt Arsenal freischalten
            </button>
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} 
              className="btn" 
              style={{ padding: '18px 40px', fontSize: '18px', fontWeight: 600, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              So funktioniert's ↓
            </button>
          </div>
        </div>
      </section>

      {/* Stats / Trust Banner */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', padding: '40px 20px', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.8 }}>⚡</div>
            <strong style={{ display: 'block', fontSize: '24px', letterSpacing: '-1px' }}>Vollautomatisch</strong>
            <span style={{ color: 'var(--muted)', fontSize: '15px' }}>KI & dynamische PDF-Generatoren</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.8 }}>⚖️</div>
            <strong style={{ display: 'block', fontSize: '24px', letterSpacing: '-1px' }}>Rechtssicher</strong>
            <span style={{ color: 'var(--muted)', fontSize: '15px' }}>BGB, DSGVO & StGB gestützt</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.8 }}>💎</div>
            <strong style={{ display: 'block', fontSize: '24px', letterSpacing: '-1px' }}>100% Abo-frei</strong>
            <span style={{ color: 'var(--muted)', fontSize: '15px' }}>Einmalig zahlen, Lifetime nutzen</span>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" style={{ padding: '120px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>Deine neuen Superkräfte</h2>
          <p style={{ color: 'var(--muted)', fontSize: '20px', maxWidth: '600px', margin: '0 auto' }}>Zugriff auf 36 spezialisierte Module, um deine Rechte knallhart durchzusetzen.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '40px', transition: 'transform 0.3s', cursor: 'default' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📦</div>
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Retouren-Rebell</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.6', fontSize: '16px' }}>Paketverlust beim Rückversand? Der Händler weigert sich? Zerstöre den "Zusteller-Trick" sofort mit § 475 BGB und erzwinge deine Erstattung per PDF-Generator.</p>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '40px', transition: 'transform 0.3s', cursor: 'default' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🛒</div>
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Amazon-Spezial</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.6', fontSize: '16px' }}>Konto grundlos gesperrt? Gutscheinguthaben eingefroren? Wehre dich erfolgreich gegen KI-Sperrungen mit harten DSGVO-Forderungen.</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '40px', transition: 'transform 0.3s', cursor: 'default' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏥</div>
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Patienten-Bollwerk</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.6', fontSize: '16px' }}>Pflegegrad oder GdB abgelehnt? Nutze medizinisch-juristisch optimierte Widersprüche, die den MDK und Versorgungsämter einknicken lassen.</p>
          </div>
        </div>
      </section>

      {/* CTA / Pricing Box */}
      <section style={{ padding: '80px 20px 140px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ 
          background: 'linear-gradient(145deg, rgba(255,30,86,0.1) 0%, rgba(20,10,15,0.8) 100%)', 
          border: '1px solid rgba(255,30,86,0.3)', 
          borderRadius: '32px', 
          padding: '60px', 
          textAlign: 'center',
          boxShadow: '0 40px 100px -20px rgba(255,30,86,0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, transparent, var(--accent-red), transparent)' }}></div>
          <h2 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>Werde zum Master-User</h2>
          <p style={{ fontSize: '20px', color: 'var(--muted)', marginBottom: '40px' }}>
            Hör auf, dich wehrlos zu fühlen. Einmaliger Preis. Keine Abofalle.
          </p>
          
          <div style={{ fontSize: '64px', fontWeight: 900, marginBottom: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
            19 <span style={{ fontSize: '32px', color: 'var(--muted)' }}>€</span>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '12px', fontSize: '14px', alignSelf: 'center', color: '#fff' }}>Lifetime</span>
          </div>

          <button 
            onClick={handleCheckout}
            className="btn btn-primary" 
            style={{ padding: '24px 60px', fontSize: '20px', fontWeight: 700, borderRadius: '100px', width: '100%', maxWidth: '400px' }}
          >
            Jetzt Account erstellen
          </button>
          
          <p style={{ marginTop: '24px', color: 'var(--muted)', fontSize: '14px' }}>
            Sichere Bezahlung über Stripe. Vollautomatischer Zugang.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '40px 20px', textAlign: 'center', background: 'rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <a href="/impressum" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>Impressum</a>
          <a href="/datenschutz" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>Datenschutz</a>
          <a href="/agb" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>AGB & Widerruf</a>
        </div>
        <div style={{ color: 'var(--muted)', fontSize: '12px', opacity: 0.6 }}>
          © {new Date().getFullYear()} Baokmedia. Alle Rechte vorbehalten. Die bereitgestellten Generatoren und Vorlagen ersetzen keine individuelle Rechtsberatung.
        </div>
      </footer>

    </div>
  );
}
