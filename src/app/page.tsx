"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Homepage() {
  const router = useRouter();

  // Bahn-Rebell Demo State
  const [delay, setDelay] = useState<number>(95);
  const [ticketPrice, setTicketPrice] = useState<number>(89.90);
  
  let compensation = 0;
  if (delay >= 60 && delay < 120) compensation = ticketPrice * 0.25;
  else if (delay >= 120) compensation = ticketPrice * 0.5;

  return (
    <div className="min-h-screen">
      
      {/* ── HERO ── */}
      <section className="pt-16 pb-20 px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left: Editorial Claim */}
          <div className="lg:w-1/2 flex flex-col items-start w-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-[#0F172A]" style={{ fontFamily: 'var(--font-head)' }}>
              Komplizierte Dinge <br className="hidden md:block" />
              einfacher machen.
            </h1>
            <p className="text-xl md:text-2xl text-[#64748B] font-medium leading-relaxed mb-10 max-w-xl">
              <strong className="text-[#0F172A] font-bold">Zug verspätet. Nebenkosten zu hoch. Abo vergessen. Flug ausgefallen.</strong><br/>
              Vorlagenbude bringt Struktur rein, wenn Alltagskram unnötig kompliziert wird.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full sm:w-auto">
              <button 
                onClick={() => router.push('/bahn-rebell')}
                className="bg-[#EA580C] text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-[#C2410C] transition-colors w-full sm:w-auto text-center"
              >
                Bahn-Entschädigung kostenlos prüfen
              </button>
              <button 
                onClick={() => document.getElementById('loesungen')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[#0F172A] font-bold text-lg hover:text-[#EA580C] transition-colors whitespace-nowrap"
              >
                Alle Lösungen ansehen &rarr;
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-[#64748B] tracking-wide">
              <span>Direkt nutzbar</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>kein unnötiges Abo</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>persönliche Daten möglichst lokal</span>
            </div>
          </div>

          {/* Right: Utility Snippet (Navy Panel) */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-[#0B1221] text-white p-8 md:p-12 shadow-xl border border-[#1E293B]">
              <div className="flex justify-between items-center mb-8 border-b border-[#1E293B] pb-4">
                <div className="font-bold text-[#EA580C] tracking-wide uppercase text-sm">Bahn-Rebell</div>
              </div>

              <div className="space-y-8">
                <div className="flex justify-between items-end border-b border-[#1E293B] pb-4">
                  <div className="text-sm font-semibold text-[#94A3B8]">Verspätung am Ziel</div>
                  <div className="text-3xl font-bold font-mono">{delay} Min</div>
                </div>
                
                <div className="flex justify-between items-end border-b border-[#1E293B] pb-4">
                  <div className="text-sm font-semibold text-[#94A3B8]">Ticketpreis</div>
                  <div className="text-3xl font-bold font-mono">{ticketPrice.toFixed(2).replace('.', ',')} €</div>
                </div>

                <div className="bg-[#1E293B] p-6 mt-6 border-l-4 border-[#EA580C]">
                  <div className="text-sm uppercase tracking-wide text-[#94A3B8] font-bold mb-2">Mögliche Fahrpreisentschädigung</div>
                  <div className="text-5xl font-black text-white font-mono">
                    {compensation.toFixed(2).replace('.', ',')} €
                  </div>
                </div>

                <button 
                  onClick={() => router.push('/bahn-rebell')}
                  className="w-full text-left font-bold text-[#EA580C] hover:text-white transition-colors mt-6 text-lg flex justify-between items-center group"
                >
                  <span>Fall kostenlos prüfen &rarr;</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── LOESUNGEN / WAS NERVT GERADE? ── */}
      <section id="loesungen" className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto border-t border-[#E2E8F0]">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#0F172A]" style={{ fontFamily: 'var(--font-head)' }}>
            Was nervt gerade?
          </h2>
        </div>

        <div className="flex flex-col gap-24">
          
          {/* BAHN-REBELL MODUL */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/3">
              <div className="text-[#0F172A] text-8xl md:text-9xl font-black leading-none mb-4 tracking-tighter" style={{ fontFamily: 'var(--font-head)' }}>95<span className="text-4xl ml-2 text-[#EA580C]">MIN</span></div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Zug verspätet?</h3>
              <p className="text-[#64748B] text-lg mb-8 leading-relaxed">
                Prüfe mögliche Fahrpreisentschädigung und bring deinen Fall in eine klare Struktur.
              </p>
              <button onClick={() => router.push('/bahn-rebell')} className="font-bold text-[#EA580C] hover:text-[#0F172A] transition-colors text-lg inline-flex items-center group">
                Entschädigung prüfen <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
            <div className="lg:w-1/3 bg-[#0B1221] p-8 text-white w-full border border-[#1E293B] shadow-xl">
              <div className="space-y-6 font-mono text-lg">
                <div className="flex justify-between border-b border-[#1E293B] pb-4">
                  <span className="text-[#94A3B8]">Ticket</span>
                  <span>89,90 €</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-[#94A3B8]">Möglich</span>
                  <span className="text-[#EA580C] font-bold">22,48 €</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-[#E2E8F0]" />

          {/* NEBENKOSTEN-REBELL MODUL */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/2">
              <h3 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-head)' }}>
                740 € Nachzahlung – aber woher kommen die eigentlich?
              </h3>
              <p className="text-[#64748B] text-lg mb-8 leading-relaxed max-w-md">
                Nebenkosten-Rebell hilft dir, Veränderungen, Kostenpositionen und Auffälligkeiten strukturiert nachzuvollziehen.
              </p>
              <button onClick={() => router.push('/nebenkosten-rebell')} className="font-bold text-[#EA580C] hover:text-[#0F172A] transition-colors text-lg inline-flex items-center group">
                Abrechnung durchblicken <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
            <div className="lg:w-1/2 w-full bg-white p-8 md:p-12 border border-[#E2E8F0] shadow-sm">
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-[#E2E8F0] pb-4">
                  <div className="text-[#64748B] font-bold text-sm">2025</div>
                  <div className="text-2xl font-bold font-mono text-[#0F172A]">2.290 €</div>
                </div>
                <div className="flex justify-between items-end border-b border-[#E2E8F0] pb-4">
                  <div className="text-[#64748B] font-bold text-sm">2026</div>
                  <div className="text-2xl font-bold font-mono text-[#0F172A]">2.780 €</div>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <div className="text-[#0F172A] font-bold">Differenz</div>
                  <div className="text-3xl font-black font-mono text-[#EA580C]">+490 €</div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-[#0F172A] font-bold">Veränderung</div>
                  <div className="text-2xl font-black font-mono text-[#EA580C]">+21,4 %</div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-[#E2E8F0]" />

          {/* ABO-KILLER MODUL */}
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-start">
            <div className="lg:w-1/2">
              <h3 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-head)' }}>
                Was kosten dich deine Abos wirklich?
              </h3>
              <p className="text-[#64748B] text-lg mb-8 leading-relaxed max-w-md">
                Abo-Killer bringt Abos, laufende Kosten, Fristen und Kündigungen an einen Ort.
              </p>
              <button onClick={() => router.push('/abo-killer')} className="font-bold text-[#EA580C] hover:text-[#0F172A] transition-colors text-lg inline-flex items-center group">
                Meine Abos sortieren <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
            <div className="lg:w-1/3 w-full bg-[#FAFAFA] p-8 md:p-12 border-l-4 border-[#0F172A] shadow-sm font-mono text-sm">
              <div className="space-y-4 mb-8 text-[#64748B]">
                <div className="flex justify-between"><span>Streaming</span><span>19,99 €</span></div>
                <div className="flex justify-between"><span>Fitness</span><span>39,90 €</span></div>
                <div className="flex justify-between"><span>Cloud</span><span>9,99 €</span></div>
                <div className="flex justify-between"><span>Software</span><span>14,99 €</span></div>
              </div>
              <div className="border-t-2 border-dashed border-[#CBD5E1] pt-6 space-y-4">
                <div className="flex justify-between text-lg font-bold text-[#0F172A]">
                  <span>Monatlich</span><span>84,87 €</span>
                </div>
                <div className="flex justify-between text-xl font-black text-[#EA580C]">
                  <span>Pro Jahr</span><span>1.018,44 €</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-[#E2E8F0]" />

          {/* FLUG-REBELL MODUL */}
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="uppercase font-bold tracking-widest text-[#EA580C] text-sm mb-4">Flugproblem</div>
              <div className="relative pl-8 space-y-8 border-l-2 border-[#E2E8F0] mb-8 font-mono">
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#E2E8F0]"></div>
                  <div className="text-[#64748B] text-sm">Geplant</div>
                  <div className="text-xl font-bold text-[#0F172A]">14:20</div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#0F172A]"></div>
                  <div className="text-[#64748B] text-sm">Tatsächlich</div>
                  <div className="text-xl font-bold text-[#0F172A]">18:05</div>
                </div>
                <div className="relative bg-[#0B1221] text-white p-4 -ml-4 shadow-md">
                  <div className="text-[#94A3B8] text-sm mb-1">Verspätung</div>
                  <div className="text-3xl font-black text-[#EA580C]">3 h 45 min</div>
                </div>
                <div className="relative pt-4">
                  <div className="absolute -left-[37px] top-5 w-4 h-4 rounded-full border-2 border-[#EA580C] bg-white"></div>
                  <div className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Status: Fall prüfen</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <p className="text-[#64748B] text-lg mb-8 leading-relaxed max-w-md">
                Flug-Rebell hilft dir, deinen Fall einzuordnen, mögliche Ansprüche zu verstehen und nächste Schritte vorzubereiten.
              </p>
              <button onClick={() => router.push('/flug-rebell')} className="font-bold text-[#EA580C] hover:text-[#0F172A] transition-colors text-lg inline-flex items-center group">
                Möglichkeiten prüfen <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
          </div>
          
        </div>
      </section>

      {/* ── SO FUNKTIONIERT'S (PROZESSLINIE) ── */}
      <section id="so-funktionierts" className="py-24 bg-[#0B1221] text-white border-t border-[#1E293B]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16 text-white" style={{ fontFamily: 'var(--font-head)' }}>
            Kein Software-Zirkus.
          </h2>
          
          <div className="flex flex-col md:flex-row gap-12 md:gap-6 justify-between relative">
            <div className="hidden md:block absolute top-6 left-0 right-12 h-px bg-[#1E293B]"></div>
            
            <div className="flex-1 relative">
              <div className="hidden md:block w-3 h-3 bg-[#EA580C] rounded-full absolute -top-[5px] left-0"></div>
              <div className="text-[#1E293B] text-6xl font-black mb-4" style={{ fontFamily: 'var(--font-head)' }}>01</div>
              <h3 className="text-lg font-bold mb-2 text-white">Problem</h3>
              <p className="text-[#94A3B8] text-sm">Starte das passende Werkzeug ohne Installation.</p>
            </div>
            
            <div className="flex-1 relative">
              <div className="hidden md:block w-3 h-3 bg-[#EA580C] rounded-full absolute -top-[5px] left-0"></div>
              <div className="text-[#1E293B] text-6xl font-black mb-4" style={{ fontFamily: 'var(--font-head)' }}>02</div>
              <h3 className="text-lg font-bold mb-2 text-white">Angaben</h3>
              <p className="text-[#94A3B8] text-sm">Nur die Daten eingeben, die wirklich zählen.</p>
            </div>
            
            <div className="flex-1 relative">
              <div className="hidden md:block w-3 h-3 bg-[#EA580C] rounded-full absolute -top-[5px] left-0"></div>
              <div className="text-[#1E293B] text-6xl font-black mb-4" style={{ fontFamily: 'var(--font-head)' }}>03</div>
              <h3 className="text-lg font-bold mb-2 text-white">Überblick</h3>
              <p className="text-[#94A3B8] text-sm">Klartext-Analyse für deine Situation erhalten.</p>
            </div>
            
            <div className="flex-1 relative">
              <div className="hidden md:block w-3 h-3 bg-[#EA580C] rounded-full absolute -top-[5px] left-0"></div>
              <div className="text-[#1E293B] text-6xl font-black mb-4" style={{ fontFamily: 'var(--font-head)' }}>04</div>
              <h3 className="text-lg font-bold mb-2 text-white">Weiterarbeiten</h3>
              <p className="text-[#94A3B8] text-sm">PDF laden oder drucken. Nächste Schritte erkennen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── UPSELL (MASTER PASS) ── */}
      <section className="py-24 border-b border-[#E2E8F0]">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <div className="inline-block text-left bg-white border border-[#E2E8F0] p-6 pr-12 shadow-sm">
            <h3 className="font-bold text-[#0F172A] text-lg mb-1">Mehr als ein Thema?</h3>
            <button 
              onClick={async () => {
                const { startCheckout } = await import('@/lib/commerce/checkout');
                await startCheckout('masterPass');
              }}
              className="text-[#EA580C] font-bold hover:text-[#0F172A] transition-colors inline-flex items-center group"
            >
              Vorlagenbude Pass <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#F5F4F0] text-[#64748B] py-12 text-center text-sm border-t border-[#E2E8F0]">
        <div className="flex justify-center gap-8 mb-6 font-medium">
          <Link href="/impressum" className="hover:text-[#0F172A] transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-[#0F172A] transition-colors">Datenschutz</Link>
          <Link href="/agb" className="hover:text-[#0F172A] transition-colors">AGB</Link>
        </div>
        <p>© {new Date().getFullYear()} Vorlagenbude. Werkzeuge ersetzen keine Rechtsberatung.</p>
      </footer>

    </div>
  );
}
