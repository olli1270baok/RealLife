export default function AGBPage() {
  return (
    <div className="main-content" style={{ padding: '60px 20px', backgroundColor: '#0d1117', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '24px', fontWeight: 700 }}>AGB & Widerrufsbelehrung</h1>
        
        <div style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über den Kauf von digitalen Produkten (wie Zugänge zu Online-Generatoren, "Master-Pass"), die zwischen Baokmedia und dem Kunden über die Webseite vorlagenbude.de geschlossen werden.
          </p>

          <h2 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>2. Vertragsschluss</h2>
          <p>
            Die Präsentation der Dienstleistungen und digitalen Produkte stellt kein rechtlich bindendes Angebot dar. Ein Vertrag kommt erst zustande, wenn der Nutzer den Kaufprozess über den Zahlungsdienstleister Stripe erfolgreich abschließt und den Zugang freigeschaltet bekommt.
          </p>

          <h2 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>3. Keine Rechtsberatung</h2>
          <p>
            Wir stellen lediglich Software-Tools, Generatoren und juristische Vorlagen zur Verfügung. Die Nutzung der Vorlagen und Generatoren ersetzt keine individuelle anwaltliche Rechtsberatung. Wir übernehmen keine Gewähr für den Erfolg der mit unseren Generatoren erstellten Dokumente im Einzelfall. Die Nutzung geschieht auf eigene Gefahr.
          </p>

          <h2 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>4. Widerrufsbelehrung & Erlöschen des Widerrufsrechts</h2>
          <p><strong>Widerrufsrecht:</strong> Verbraucher haben grundsätzlich ein 14-tägiges Widerrufsrecht.</p>
          <div style={{ background: 'rgba(255,51,102,0.1)', padding: '16px', borderLeft: '4px solid var(--accent-red)', marginTop: '16px', color: 'var(--text)' }}>
            <strong>Vorzeitiges Erlöschen des Widerrufsrechts:</strong><br/>
            Bei Verträgen über die Lieferung von digitalen Inhalten (z. B. unser "Master-Pass" / Zugang zu Online-Tools) erlischt Ihr Widerrufsrecht vorzeitig, wenn wir mit der Vertragserfüllung (Freischaltung des Accounts) begonnen haben. Indem Sie dem Kauf zustimmen, willigen Sie ausdrücklich ein, dass wir vor Ablauf der Widerrufsfrist mit der Ausführung des Vertrags beginnen, und Sie bestätigen Ihre Kenntnisnahme, dass Sie durch diese Zustimmung Ihr Widerrufsrecht verlieren.
          </div>

          <h2 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>5. Laufzeit und Preise</h2>
          <p>
            Sofern nicht anders ausgewiesen, handelt es sich bei den Käufen um sogenannte "Lifetime"-Lizenzen. Es fallen keine laufenden Abo-Gebühren an. Alle angegebenen Preise sind Endpreise.
          </p>
        </div>
      </div>
    </div>
  );
}
