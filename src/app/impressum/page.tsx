export default function ImpressumPage() {
  return (
    <div className="main-content" style={{ padding: '60px 20px', backgroundColor: '#0d1117', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '24px', fontWeight: 700 }}>Impressum</h1>
        
        <div style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>Angaben gemäß § 5 DDG</h2>
          <p>
            Baokmedia©<br />
            c/o Impressumservice Dein-Impressum<br />
            Stettiner Straße 41<br />
            35410 Hungen
          </p>

          <h2 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>Vertreten durch:</h2>
          <p>
            O. Balko
          </p>

          <h2 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>Kontakt:</h2>
          <p>
            E-Mail: [HIER E-MAIL EINTRAGEN]<br />
            Telefon: [HIER TELEFON EINTRAGEN - OPTIONAL]
          </p>

          <h2 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>https://ec.europa.eu/consumers/odr/</a>.<br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>

          <h2 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
    </div>
  );
}
