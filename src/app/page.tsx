"use client";

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleCheckout = () => {
    // Leite den User zuerst zum Login/Registrierung,
    // bevor er bezahlen oder auf das Dashboard zugreifen kann.
    router.push('/login');
  };

  return (
    <div className="main-content" style={{ padding: '0', flex: 1, overflowY: 'auto' }}>
      {/* Hero Section */}
      <section style={{ padding: '80px 40px', textAlign: 'center', background: 'radial-gradient(circle at top, var(--card) 0%, var(--bg) 100%)' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255, 51, 102, 0.1)', color: 'var(--accent-red)', padding: '6px 16px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px', border: '1px solid rgba(255,51,102,0.3)' }}>
          🚀 Dein rechtlicher Schutzschild
        </div>
        <h1 style={{ fontSize: '56px', maxWidth: '800px', margin: '0 auto 24px', lineHeight: '1.1' }}>
          Das System ist nicht <br/> <span style={{ color: 'var(--accent-red)' }}>für dich</span> gemacht.
        </h1>
        <p style={{ fontSize: '20px', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto 40px' }}>
          Behörden wimmeln dich ab. Konzerne behalten dein Geld. Es ist Zeit, zurückzuschlagen. Die Vorlagenbude gibt dir 36 digitale Waffen.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)' }}>
            <span style={{ color: '#00ff88' }}>✓</span> 36 Vollautomatisierte Tools
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)' }}>
            <span style={{ color: '#00ff88' }}>✓</span> Rechtssichere PDF-Generatoren
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)' }}>
            <span style={{ color: '#00ff88' }}>✓</span> 100% Abo-frei (Lifetime)
          </div>
        </div>
      </section>

      {/* Trust Banner (Like Real Life) */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--card)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', padding: '32px 20px', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>💎</div>
            <strong style={{ display: 'block', fontSize: '16px' }}>Einmalig 19 €</strong>
            <span style={{ color: 'var(--muted)', fontSize: '13px' }}>Vollversion ohne Abo</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🚫</div>
            <strong style={{ display: 'block', fontSize: '16px' }}>Keine Abofalle</strong>
            <span style={{ color: 'var(--muted)', fontSize: '13px' }}>Du zahlst nur ein einziges Mal</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚖️</div>
            <strong style={{ display: 'block', fontSize: '16px' }}>Juristisch fundiert</strong>
            <span style={{ color: 'var(--muted)', fontSize: '13px' }}>BGB, DSGVO, StGB gestützt</span>
          </div>
        </div>
      </section>

      {/* Pricing / CTA Section */}
      <section style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2>Hol dir den Master-Pass</h2>
          <p style={{ color: 'var(--muted)' }}>Sofortiger Zugriff auf alle 36 Schutzschilde.</p>
        </div>

        <div className="card highlight" style={{ maxWidth: '500px', margin: '0 auto', padding: '40px', textAlign: 'center', border: '1px solid var(--accent-red)', background: 'linear-gradient(180deg, rgba(255,51,102,0.05) 0%, var(--card) 100%)' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Lifetime Deal</h3>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '8px', margin: '24px 0' }}>
            <span style={{ fontSize: '56px', fontWeight: 'bold', fontFamily: 'var(--font-head)' }}>19</span>
            <span style={{ fontSize: '24px', color: 'var(--muted)' }}>€</span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '32px' }}>Einmalzahlung. Kein Abo. Keine versteckten Kosten.</p>
          
          <button className="btn btn-primary" style={{ width: '100%', fontSize: '18px', padding: '18px' }} onClick={handleCheckout}>
            Jetzt freischalten
          </button>
          
          <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '24px' }}>
            Sichere Bezahlung via Stripe. Zugriff erfolgt sofort nach Kauf.
          </p>
        </div>
      </section>
    </div>
  );
}
