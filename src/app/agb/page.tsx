export default function AGBPage() {
  return (
    <div className="bg-[#F5F4F0] min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-[#E2E8F0]">
        <h1 className="text-4xl font-extrabold text-[#1e3a8a] mb-8 tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>AGB & Widerrufsbelehrung</h1>
        
        <div className="text-[#334155] leading-relaxed space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">1. Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über den Kauf von digitalen Produkten (wie Zugänge zu Online-Generatoren, "Master-Pass"), die zwischen Baokmedia und dem Kunden über die Webseite vorlagenbude.de geschlossen werden.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">2. Vertragsschluss</h2>
            <p>
              Die Präsentation der Dienstleistungen und digitalen Produkte stellt kein rechtlich bindendes Angebot dar. Ein Vertrag kommt erst zustande, wenn der Nutzer den Kaufprozess über den Zahlungsdienstleister Stripe erfolgreich abschließt und den Zugang freigeschaltet bekommt.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">3. Keine Rechtsberatung</h2>
            <p>
              Wir stellen lediglich Software-Tools, Generatoren und juristische Vorlagen zur Verfügung. Die Nutzung der Vorlagen und Generatoren ersetzt keine individuelle anwaltliche Rechtsberatung. Wir übernehmen keine Gewähr für den Erfolg der mit unseren Generatoren erstellten Dokumente im Einzelfall. Die Nutzung geschieht auf eigene Gefahr.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">4. Widerrufsbelehrung & Erlöschen des Widerrufsrechts</h2>
            <p className="mb-4"><strong>Widerrufsrecht:</strong> Verbraucher haben grundsätzlich ein 14-tägiges Widerrufsrecht.</p>
            <div className="bg-[#eff6ff] p-5 rounded-xl border-l-4 border-[#1e3a8a] text-[#1e40af]">
              <strong>Vorzeitiges Erlöschen des Widerrufsrechts:</strong><br/>
              Bei Verträgen über die Lieferung von digitalen Inhalten (z. B. unser Zugang zu Online-Tools) erlischt Ihr Widerrufsrecht vorzeitig, wenn wir mit der Vertragserfüllung (Freischaltung des Accounts) begonnen haben. Indem Sie dem Kauf zustimmen, willigen Sie ausdrücklich ein, dass wir vor Ablauf der Widerrufsfrist mit der Ausführung des Vertrags beginnen, und Sie bestätigen Ihre Kenntnisnahme, dass Sie durch diese Zustimmung Ihr Widerrufsrecht verlieren.
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">5. Laufzeit und Preise</h2>
            <p>
              Sofern nicht anders ausgewiesen, handelt es sich bei den Käufen um "Lifetime"-Lizenzen oder festgelegte Jahreszugänge. Alle angegebenen Preise sind Endpreise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
