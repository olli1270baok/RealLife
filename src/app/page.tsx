"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Homepage() {
  const router = useRouter();

  // Bahn-Rebell Demo State
  const [ticketPrice, setTicketPrice] = useState<string>('49.90');
  const [delay, setDelay] = useState<string>('65');
  
  const price = parseFloat(ticketPrice) || 0;
  const delayMins = parseInt(delay) || 0;
  let compensation = 0;
  if (delayMins >= 60 && delayMins < 120) compensation = price * 0.25;
  else if (delayMins >= 120) compensation = price * 0.5;

  return (
    <div className="min-h-screen bg-[#F5F4F0] text-[#0F172A] font-sans selection:bg-[#EA580C] selection:text-white">
      
      {/* ── HERO ── */}
      <section className="pt-24 pb-16 px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Editorial Claim */}
          <div className="lg:w-1/2">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8" style={{ fontFamily: 'var(--font-head)' }}>
              Komplizierte Dinge <br />
              <span className="text-[#EA580C]">einfacher machen.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#64748B] font-medium leading-relaxed mb-10 max-w-xl">
              Digitale Werkzeuge für Bahnärger, Nebenkosten, Abos, Fluggastrechte und anderen echten Alltagskram.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#0B1221] text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-[#1E293B] transition-colors shadow-lg"
              >
                Werkzeuge ansehen
              </button>
            </div>
            <div className="mt-8 flex gap-6 text-sm font-semibold text-[#94A3B8] uppercase tracking-wide">
              <span>✓ Direkt nutzbar</span>
              <span>✓ Daten lokal</span>
            </div>
          </div>

          {/* Right: Utility Snippet (Navy Panel) */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-[#0B1221] text-white rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-[#1E293B]">
              {/* Subtle grid background */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#1E293B 1px, transparent 1px), linear-gradient(90deg, #1E293B 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-8 border-b border-[#1E293B] pb-4">
                  <div className="uppercase tracking-widest text-[#94A3B8] text-xs font-bold">App-Ausschnitt</div>
                  <div className="font-bold text-[#EA580C]">Bahn-Rebell</div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wide text-[#64748B] mb-2 font-bold">Ticketpreis (€)</label>
                      <input 
                        type="number" 
                        value={ticketPrice}
                        onChange={(e) => setTicketPrice(e.target.value)}
                        className="w-full bg-[#1E293B] border-none text-white p-4 rounded-md font-mono text-xl focus:ring-2 focus:ring-[#EA580C] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wide text-[#64748B] mb-2 font-bold">Verspätung (Min)</label>
                      <input 
                        type="number" 
                        value={delay}
                        onChange={(e) => setDelay(e.target.value)}
                        className="w-full bg-[#1E293B] border-none text-white p-4 rounded-md font-mono text-xl focus:ring-2 focus:ring-[#EA580C] outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-[#1E293B] rounded-lg p-6 flex justify-between items-center mt-6">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-[#64748B] font-bold mb-1">Mögliche Entschädigung</div>
                      <div className="text-sm text-[#94A3B8]">Gemäß EU-Fahrgastrechten</div>
                    </div>
                    <div className={`text-4xl font-black ${compensation > 0 ? 'text-[#10B981]' : 'text-white'}`}>
                      {compensation.toFixed(2).replace('.', ',')} €
                    </div>
                  </div>

                  <button 
                    onClick={() => router.push('/bahn-rebell')}
                    className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold py-4 rounded-md transition-colors shadow-lg mt-4"
                  >
                    Fall prüfen & Formular generieren
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── MAGAZINE GRID (TOOLS) ── */}
      <section id="tools" className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto border-t border-[#E2E8F0]">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ fontFamily: 'var(--font-head)' }}>
            Werkzeuge für den Alltag.
          </h2>
          <p className="text-xl text-[#64748B] font-medium max-w-2xl">
            Ein Problem. Eine Lösung. Kein unnötiger Ballast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
          
          {/* Bahn-Rebell (Large) */}
          <div className="lg:col-span-2 bg-[#0B1221] text-white rounded-2xl p-8 md:p-10 flex flex-col justify-between border border-[#1E293B] group hover:border-[#EA580C] transition-colors cursor-pointer relative overflow-hidden" onClick={() => router.push('/bahn-rebell')}>
            <div className="absolute top-0 right-0 p-10 opacity-10 font-black text-9xl pointer-events-none transform translate-x-4 -translate-y-8 text-[#EA580C]">
              60+
            </div>
            <div className="relative z-10">
              <div className="uppercase tracking-widest text-[#EA580C] text-xs font-bold mb-4">Reise</div>
              <h3 className="text-3xl font-extrabold mb-2" style={{ fontFamily: 'var(--font-head)' }}>Bahn-Rebell</h3>
              <p className="text-[#94A3B8] text-lg max-w-md mb-12">
                Zug verspätet? Orientierung erhalten und automatisierte Formulare für Fahrgastrechte generieren.
              </p>
              <div className="flex gap-4">
                <div className="bg-[#1E293B] rounded p-4 border border-[#334155]">
                  <div className="text-xs text-[#94A3B8] uppercase font-bold mb-1">Ab 60 Min</div>
                  <div className="text-xl font-bold text-white">25% Erstattung</div>
                </div>
                <div className="bg-[#1E293B] rounded p-4 border border-[#334155]">
                  <div className="text-xs text-[#94A3B8] uppercase font-bold mb-1">Ab 120 Min</div>
                  <div className="text-xl font-bold text-white">50% Erstattung</div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <span className="text-[#EA580C] font-bold group-hover:translate-x-2 transition-transform inline-block">Öffnen &rarr;</span>
            </div>
          </div>

          {/* Nebenkosten-Rebell (Tall) */}
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#E2E8F0] flex flex-col justify-between group hover:border-[#0F172A] transition-colors cursor-pointer shadow-sm" onClick={() => router.push('/nebenkosten-rebell')}>
            <div>
              <div className="uppercase tracking-widest text-[#64748B] text-xs font-bold mb-4">Wohnen</div>
              <h3 className="text-3xl font-extrabold text-[#0F172A] mb-2" style={{ fontFamily: 'var(--font-head)' }}>Nebenkosten-<br/>Rebell</h3>
              <p className="text-[#64748B] mb-8">
                Abrechnungen auf formelle Fehler prüfen und Vergleichswerte heranziehen.
              </p>
              
              {/* Fake Chart Metaphor */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end border-b border-[#E2E8F0] pb-2">
                  <div className="text-sm font-semibold">Heizkosten</div>
                  <div className="text-[#EF4444] font-bold text-sm">+ 42% ↗</div>
                </div>
                <div className="flex justify-between items-end border-b border-[#E2E8F0] pb-2">
                  <div className="text-sm font-semibold">Wasser</div>
                  <div className="text-[#10B981] font-bold text-sm">- 4% ↘</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#0F172A] group-hover:translate-x-2 transition-transform inline-block">Prüfen &rarr;</span>
            </div>
          </div>

          {/* Abo-Killer */}
          <div className="bg-[#EA580C] text-white rounded-2xl p-8 md:p-10 border border-[#C2410C] flex flex-col justify-between group hover:bg-[#C2410C] transition-colors cursor-pointer shadow-md" onClick={() => router.push('/abo-killer')}>
            <div>
              <div className="uppercase tracking-widest text-[#FFEDD5] text-xs font-bold mb-4">Finanzen</div>
              <h3 className="text-3xl font-extrabold mb-2" style={{ fontFamily: 'var(--font-head)' }}>Abo-Killer</h3>
              <p className="text-[#FFEDD5] mb-8 max-w-sm">
                Kündigungsfristen im Blick behalten und Kündigungsschreiben per Klick generieren.
              </p>
              <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm border border-white/20 mb-6">
                <div className="flex justify-between border-b border-white/20 pb-2 mb-2">
                  <span>Streaming</span>
                  <span className="font-mono">19,99 €</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2 mb-2">
                  <span>Fitness</span>
                  <span className="font-mono">39,90 €</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold">Monatlich</span>
                  <span className="font-mono font-bold text-xl">59,89 €</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <span className="font-bold text-white group-hover:translate-x-2 transition-transform inline-block">Abos managen &rarr;</span>
            </div>
          </div>

          {/* Flug-Rebell */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 md:p-10 border border-[#E2E8F0] flex flex-col justify-between group hover:border-[#0F172A] transition-colors cursor-pointer shadow-sm" onClick={() => router.push('/flug-rebell')}>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="uppercase tracking-widest text-[#64748B] text-xs font-bold mb-4">Reise</div>
                <h3 className="text-3xl font-extrabold text-[#0F172A] mb-2" style={{ fontFamily: 'var(--font-head)' }}>Flug-Rebell</h3>
                <p className="text-[#64748B] max-w-md">
                  Flugausfall oder gravierende Verspätung? Sichern Sie sich mögliche Entschädigungen nach EU-Recht.
                </p>
              </div>
              <div className="flex-1 w-full relative">
                {/* Timeline Metaphor */}
                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-[#E2E8F0]"></div>
                <div className="space-y-6 relative z-10 pl-10">
                  <div className="relative">
                    <div className="absolute -left-10 w-6 h-6 bg-[#E2E8F0] rounded-full border-4 border-white flex items-center justify-center"></div>
                    <div className="text-xs font-bold text-[#94A3B8]">08:00</div>
                    <div className="text-sm font-semibold text-[#0F172A]">Geplanter Abflug</div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-10 w-6 h-6 bg-[#EA580C] rounded-full border-4 border-white flex items-center justify-center"></div>
                    <div className="text-xs font-bold text-[#EA580C]">12:30</div>
                    <div className="text-sm font-semibold text-[#0F172A]">Tatsächlicher Abflug</div>
                    <div className="text-xs text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded inline-block mt-1">+4,5h Verspätung</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <span className="font-bold text-[#0F172A] group-hover:translate-x-2 transition-transform inline-block">Anspruch prüfen &rarr;</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── PROCESS LINE (Kein Software-Zirkus) ── */}
      <section className="py-24 bg-[#0F172A] text-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ fontFamily: 'var(--font-head)' }}>
              Kein Software-Zirkus. <br className="hidden md:block"/>
              Einfach anfangen.
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-[#334155]"></div>
            
            <div className="flex-1 relative z-10">
              <div className="text-[#EA580C] text-8xl font-black opacity-20 absolute -top-8 -left-4">1</div>
              <div className="w-4 h-4 bg-[#EA580C] rounded-full mb-8 hidden md:block"></div>
              <h3 className="text-xl font-bold mb-3 relative z-10 text-white">Problem wählen</h3>
              <p className="text-[#94A3B8] font-medium">Starte das passende Werkzeug ohne Installation.</p>
            </div>
            
            <div className="flex-1 relative z-10">
              <div className="text-[#EA580C] text-8xl font-black opacity-20 absolute -top-8 -left-4">2</div>
              <div className="w-4 h-4 bg-[#EA580C] rounded-full mb-8 hidden md:block"></div>
              <h3 className="text-xl font-bold mb-3 relative z-10 text-white">Fakten eintragen</h3>
              <p className="text-[#94A3B8] font-medium">Nur die Daten eingeben, die wirklich zählen.</p>
            </div>
            
            <div className="flex-1 relative z-10">
              <div className="text-[#EA580C] text-8xl font-black opacity-20 absolute -top-8 -left-4">3</div>
              <div className="w-4 h-4 bg-[#EA580C] rounded-full mb-8 hidden md:block"></div>
              <h3 className="text-xl font-bold mb-3 relative z-10 text-white">Überblick sichern</h3>
              <p className="text-[#94A3B8] font-medium">Klartext-Analyse für deine Situation erhalten.</p>
            </div>
            
            <div className="flex-1 relative z-10">
              <div className="text-[#EA580C] text-8xl font-black opacity-20 absolute -top-8 -left-4">4</div>
              <div className="w-4 h-4 bg-[#EA580C] rounded-full mb-8 hidden md:block"></div>
              <h3 className="text-xl font-bold mb-3 relative z-10 text-white">Exportieren</h3>
              <p className="text-[#94A3B8] font-medium">PDF laden oder drucken. Fertig.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST SECTION ── */}
      <section className="py-24 border-b border-[#E2E8F0]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#0F172A]">Kein unnötiges Abo</h3>
              <p className="text-[#64748B]">Wir binden Werkzeuge nicht an künstliche Dauergebühren.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#0F172A]">Daten bleiben lokal</h3>
              <p className="text-[#64748B]">Wo möglich, speichern die Web-Apps persönliche Eingaben nur auf deinem Gerät.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#0F172A]">Keine Fachsoftware</h3>
              <p className="text-[#64748B]">Gebaut für Menschen, nicht für Behörden. Sofort verständlich.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#0F172A]">Ein Problem. Eine Lösung.</h3>
              <p className="text-[#64748B]">Jedes Werkzeug macht genau eine Sache richtig gut.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── UPSELL (Demoted) ── */}
      <section className="py-16 max-w-3xl mx-auto px-6 text-center">
        <div className="bg-white border border-[#E2E8F0] p-8 rounded-2xl shadow-sm">
          <h2 className="font-bold text-[#0F172A] text-xl mb-2">Mehrere Baustellen gleichzeitig?</h2>
          <p className="text-[#64748B] mb-6 text-sm">
            Mit dem Vorlagenbude Master-Pass erhältst du Zugriff auf alle digitalen Helfer und zukünftigen Erweiterungen.
          </p>
          <button 
            onClick={async () => {
              const { startCheckout } = await import('@/lib/commerce/checkout');
              await startCheckout('masterPass');
            }}
            className="text-sm font-bold text-[#EA580C] hover:text-[#C2410C] transition-colors bg-[#FFF7ED] hover:bg-[#FFEDD5] px-6 py-2 rounded-full border border-[#FFEDD5]"
          >
            Zum Master-Pass (19 €)
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0F172A] text-[#94A3B8] py-12 text-center text-sm">
        <div className="flex justify-center gap-8 mb-6 font-medium">
          <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
          <Link href="/agb" className="hover:text-white transition-colors">AGB</Link>
        </div>
        <p>© {new Date().getFullYear()} Vorlagenbude. Werkzeuge ersetzen keine Rechtsberatung.</p>
      </footer>

    </div>
  );
}
