export default function DatenschutzPage() {
  return (
    <div className="bg-[#F5F4F0] min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-[#E2E8F0]">
        <h1 className="text-4xl font-extrabold text-[#1e3a8a] mb-8 tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>Datenschutzerklärung</h1>
        
        <div className="text-[#334155] leading-relaxed space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">1. Datenschutz auf einen Blick</h2>
            <p>
              Folgende Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">2. Hosting und Dienste von Drittanbietern</h2>
            <div className="space-y-4">
              <p><strong>Vercel</strong><br/>
              Wir hosten unsere Website bei Vercel. Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adresse.</p>
              
              <p><strong>Supabase (Nutzerverwaltung & Datenbank)</strong><br/>
              Für die Registrierung und Speicherung von Nutzerdaten (E-Mail, Passwort-Hash, Account-Status) nutzen wir Supabase. Die Daten werden sicher in Rechenzentren (i.d.R. EU) gespeichert.</p>

              <p><strong>Stripe (Zahlungsabwicklung)</strong><br/>
              Wenn Sie einen kostenpflichtigen Zugang erwerben, erfolgt die Zahlungsabwicklung über Stripe. Ihre Zahlungsdaten (Kreditkarte, Name) werden direkt von Stripe verarbeitet. Wir speichern keine Kreditkartendaten auf unseren eigenen Servern.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">3. Lokale Speicherung (Local Storage)</h2>
            <p>Um Ihre Arbeit in unseren Apps zu erleichtern, speichern wir Ihre Eingaben teilweise ausschließlich lokal in Ihrem Browser (Local Storage). Diese Daten werden nicht zwingend an unsere Server übertragen und dienen dem automatischen Ausfüllen beim nächsten Besuch.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">4. Rechte der Betroffenen (Art. 15 DSGVO)</h2>
            <p>Sie haben das Recht, jederzeit Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten, sowie das Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Kontaktieren Sie uns hierzu einfach über die im Impressum angegebene E-Mail-Adresse.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
