export default function ImpressumPage() {
  return (
    <div className="bg-[#F5F4F0] min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-[#E2E8F0]">
        <h1 className="text-4xl font-extrabold text-[#1e3a8a] mb-8 tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>Impressum</h1>
        
        <div className="text-[#334155] leading-relaxed space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Angaben gemäß § 5 DDG</h2>
            <p>
              Baokmedia<br />
              c/o Impressumservice Dein-Impressum<br />
              Stettiner Straße 41<br />
              35410 Hungen
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Vertreten durch:</h2>
            <p>
              O. Balko
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Kontakt:</h2>
            <p>
              E-Mail: info@vorlagenbude.de
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#EA580C] hover:underline">https://ec.europa.eu/consumers/odr/</a>.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
