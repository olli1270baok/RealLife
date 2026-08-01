export default function DatenschutzPage() {
  return (
    <div className="main-content" style={{ padding: '60px 20px', backgroundColor: '#0d1117', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '24px', fontWeight: 700 }}>Datenschutzerklärung</h1>
        
        <div style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>1. Datenschutz auf einen Blick</h2>
          <p>
            Folgende Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
          </p>

          <h2 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>2. Hosting und Dienste von Drittanbietern</h2>
          <p><strong>Vercel</strong><br/>
          Wir hosten unsere Website bei Vercel. Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adresse.</p>
          
          <p style={{ marginTop: '12px' }}><strong>Supabase (Nutzerverwaltung & Datenbank)</strong><br/>
          Für die Registrierung und Speicherung von Nutzerdaten (E-Mail, Passwort-Hash, Account-Status) nutzen wir Supabase. Die Daten werden sicher in Rechenzentren (i.d.R. EU) gespeichert.</p>

          <p style={{ marginTop: '12px' }}><strong>Stripe (Zahlungsabwicklung)</strong><br/>
          Wenn Sie einen kostenpflichtigen Zugang erwerben, erfolgt die Zahlungsabwicklung über Stripe. Ihre Zahlungsdaten (Kreditkarte, Name) werden direkt von Stripe verarbeitet. Wir speichern keine Kreditkartendaten auf unseren eigenen Servern.</p>

          <h2 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>3. Lokale Speicherung (Local Storage)</h2>
          <p>Um Ihre Arbeit im PDF-Brief-Generator zu erleichtern, speichern wir Ihren Namen und Ihre Adresse (sowie weitere Formulardaten) ausschließlich lokal in Ihrem Browser (Local Storage). Diese Daten werden NICHT an unsere Server übertragen und dienen lediglich dem automatischen Ausfüllen beim nächsten Besuch.</p>

          <h2 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>4. Rechte der Betroffenen (Art. 15 DSGVO)</h2>
          <p>Sie haben das Recht, jederzeit Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten, sowie das Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Kontaktieren Sie uns hierzu einfach über die im Impressum angegebene E-Mail-Adresse.</p>
        </div>
      </div>
    </div>
  );
}
