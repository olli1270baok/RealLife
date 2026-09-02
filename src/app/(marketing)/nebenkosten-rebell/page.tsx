"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { startCheckout } from "@/lib/commerce/checkout";

export default function NebenkostenRebellMarketingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1E293B]">
        <Link href="/" className="text-xl font-black tracking-tight text-white hover:text-[#F97316] transition-colors">
          VORLAGENBUDE
        </Link>
        <button
          onClick={() => startCheckout('nebenkostenRebell')}
          className="bg-[#F97316] text-white px-6 py-2 rounded font-semibold hover:bg-[#EA580C] transition-colors"
        >
          Nebenkosten-Rebell kaufen
        </button>
      </header>

      {/* 1. HERO */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[#F97316] font-bold tracking-widest uppercase mb-4 text-sm">
              NEBENKOSTEN-REBELL
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-[#F8FAFC]">
              Nebenkostenabrechnung bekommen – aber kaum nachvollziehbar, wie sie zustande kommt?
            </h1>
            <p className="text-xl text-[#94A3B8] mb-8">
              Nebenkosten-Rebell hilft dir, Kostenpositionen, Vorauszahlungen und Veränderungen strukturiert nachzuvollziehen und offene Punkte für die weitere Prüfung festzuhalten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button 
                onClick={() => startCheckout('nebenkostenRebell')}
                className="bg-[#F97316] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#EA580C] transition-colors"
              >
                Nebenkosten-Rebell kaufen
              </button>
              <a href="#screenshots" className="px-8 py-4 rounded font-bold text-lg border border-[#334155] text-[#94A3B8] hover:text-white hover:border-[#475569] transition-colors flex items-center justify-center">
                Einblick in die App
              </a>
            </div>
            <div className="text-sm text-[#64748B] flex items-center gap-2">
              <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Direkt im Browser · lokal nutzbar · Einmalkauf
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-[#334155] shadow-2xl">
            <img src="/images/screenshots/nebenkosten-rebell-1.png" alt="Nebenkosten-Rebell App" className="w-full h-auto" />
          </div>
        </div>
      </main>

      {/* 2. WAS STECKT DRIN? */}
      <section className="bg-[#1E293B] py-24 border-y border-[#334155]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F8FAFC]">Was kannst du mit Nebenkosten-Rebell erledigen?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Abrechnung strukturieren</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Wichtige Angaben und Kostenpositionen aus deiner Nebenkostenabrechnung übersichtlich erfassen.</p>
            </div>
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Kosten nachvollziehen</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Gesamtkosten, Vorauszahlungen und einzelne Positionen strukturiert gegenüberstellen.</p>
            </div>
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Veränderungen erkennen</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Entwicklungen und Unterschiede zwischen Abrechnungszeiträumen nachvollziehbarer machen.</p>
            </div>
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Offene Punkte vorbereiten</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Fragen, Auffälligkeiten und weitere Schritte dokumentieren und passende Schreiben vorbereiten, soweit im Produkt vorhanden.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCREENSHOT SECTION 1 */}
      <section id="screenshots" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Aus vielen Positionen wird eine verständliche Übersicht</h2>
              <p className="text-[#94A3B8] text-lg mb-8 leading-relaxed">
                Erfasse die relevanten Werte aus deiner Abrechnung und betrachte Kostenpositionen, Vorauszahlungen und Ergebnis in einer gemeinsamen Struktur.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Kostenpositionen
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Vorauszahlungen
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Gesamtergebnis
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#334155] shadow-2xl md:order-1">
              <img src="/images/screenshots/nebenkosten-rebell-1.png" alt="Nebenkosten Übersicht" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. ALLES AN EINEM ORT */}
      <section className="py-24 bg-[#1E293B] border-y border-[#334155]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-16 text-[#F8FAFC]">Eine Abrechnung. Viele Zahlen. Eine klare Struktur.</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155] text-left w-full md:w-64 opacity-70">
              <div className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-6">Vorher</div>
              <ul className="space-y-3 text-[#94A3B8]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Abrechnung</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Vorauszahlungen</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> einzelne Kostenpositionen</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Taschenrechner</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Notizen</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Vergleichswerte</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Schreiben</li>
              </ul>
            </div>
            
            <div className="text-[#F97316] text-4xl hidden md:block">→</div>
            <div className="text-[#F97316] text-4xl md:hidden">↓</div>
            
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#F97316] shadow-[0_0_30px_rgba(249,115,22,0.15)] text-left w-full md:w-64 relative">
              <div className="text-sm font-bold text-[#F97316] uppercase tracking-wider mb-6">Nebenkosten-Rebell</div>
              <ul className="space-y-3 text-[#E2E8F0] font-medium">
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Abrechnungsdaten</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Kostenpositionen</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Vorauszahlungen</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Vergleiche</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> offene Punkte</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Schreiben</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SCREENSHOT SECTION 2 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Veränderungen statt nur Endbeträge sehen</h2>
              <p className="text-[#94A3B8] text-lg mb-8 leading-relaxed">
                Vergleiche relevante Werte und erkenne schneller, welche Positionen sich verändert haben und wo sich genaueres Hinsehen lohnt.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Vergleich
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Veränderungen
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Überblick
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#334155] shadow-2xl">
              <img src="/images/screenshots/nebenkosten-rebell-2.png" alt="Nebenkosten Vergleich" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. SCREENSHOT SECTION 3 */}
      <section className="py-24 bg-[#1E293B] border-y border-[#334155]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Offene Punkte strukturiert weiterverfolgen</h2>
              <p className="text-[#94A3B8] text-lg mb-8 leading-relaxed">
                Halte Fragen und Auffälligkeiten fest und nutze deine bereits erfassten Angaben, um weitere Schritte oder ein passendes Schreiben vorzubereiten.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Dokumentieren
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> vorbereiten
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> weiterarbeiten
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#334155] shadow-2xl md:order-1">
              <img src="/images/screenshots/nebenkosten-rebell-3.png" alt="Nebenkosten Schreiben" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. SO FUNKTIONIERT ES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center text-[#F8FAFC]">So funktioniert Nebenkosten-Rebell</h2>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-0.5 bg-[#334155]"></div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#F97316] text-[#F97316] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">01</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Abrechnung erfassen</h3>
              <p className="text-[#94A3B8] text-sm">Wichtige Angaben und Kostenwerte übernehmen.</p>
            </div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#334155] text-[#94A3B8] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">02</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Kosten nachvollziehen</h3>
              <p className="text-[#94A3B8] text-sm">Positionen, Vorauszahlungen und Veränderungen strukturiert betrachten.</p>
            </div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#334155] text-[#94A3B8] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">03</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Offene Punkte festhalten</h3>
              <p className="text-[#94A3B8] text-sm">Fragen und Auffälligkeiten dokumentieren.</p>
            </div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#334155] text-[#94A3B8] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">04</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Weiteres Vorgehen vorbereiten</h3>
              <p className="text-[#94A3B8] text-sm">Vorhandene Ergebnisse für weitere Prüfung oder Schreiben verwenden.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. KAUFBLOCK */}
      <section id="pro-section" className="py-24 bg-[#1E293B] border-y border-[#334155]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#0F172A] border border-[#F97316]/30 rounded-2xl p-8 md:p-12 shadow-[0_0_40px_rgba(249,115,22,0.1)] relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-[#F8FAFC]">Nebenkosten-Rebell Pro</h2>
                <p className="text-[#94A3B8] text-lg mb-8">Die vollständige App für alle, die ihre Nebenkostenabrechnung nicht nur abheften, sondern nachvollziehen möchten.</p>
                <ul className="space-y-3 mb-8 md:mb-0">
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Abrechnungsdaten erfassen</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Kostenpositionen strukturieren</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Vorauszahlungen gegenüberstellen</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Veränderungen vergleichen</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> offene Punkte dokumentieren</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Schreiben / Export / Backup</li>
                </ul>
              </div>
              
              <div className="bg-[#1E293B] rounded-xl p-8 text-center border border-[#334155]">
                <div className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Einmalzahlung</div>
                <div className="text-5xl font-black text-[#F8FAFC] mb-6">19€</div>
                <button 
                  onClick={() => startCheckout('nebenkostenRebell')}
                  className="w-full bg-[#F97316] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#EA580C] transition-colors mb-4"
                >
                  Nebenkosten-Rebell kaufen
                </button>
                <p className="text-xs text-[#64748B]">Nach dem Klick wirst du zum Shopify-Checkout weitergeleitet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F8FAFC]">Noch Fragen?</h2>
          
          <div className="space-y-6">
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Prüft Nebenkosten-Rebell meine Abrechnung automatisch auf Rechtsfehler?</h3>
              <p className="text-[#94A3B8]">Nein. Die App hilft bei Strukturierung, Vergleich und Vorbereitung einer weiteren Prüfung; sie bietet keine automatische Rechtsberatung oder Garantie auf Fehlerfreiheit.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Kann ich unterschiedliche Kostenpositionen erfassen?</h3>
              <p className="text-[#94A3B8]">Ja. Du kannst jede umlagefähige Kostenart (z.B. Wasser, Heizung, Müll, Aufzug, Hausmeister) einzeln erfassen und dokumentieren.</p>
            </div>

            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Kann ich Vorjahre vergleichen?</h3>
              <p className="text-[#94A3B8]">Ja, du kannst die Positionen der aktuellen Abrechnung direkt mit denen des Vorjahres vergleichen, um starke Abweichungen und Preissprünge schnell zu erkennen.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Kann ich ein Schreiben vorbereiten?</h3>
              <p className="text-[#94A3B8]">Ja, du kannst direkt aus der App heraus ein Schreiben an den Vermieter oder Verwalter vorbereiten, um beispielsweise Belegeinsicht zu fordern oder Einwendungen zu erheben.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Wo werden meine Daten gespeichert?</h3>
              <p className="text-[#94A3B8]">Deine eingegebenen Informationen werden sicher und ausschließlich lokal in deinem Browser (Local Storage) gespeichert. Es findet keine Übertragung auf unsere Server statt.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Ist Nebenkosten-Rebell ein Abo?</h3>
              <p className="text-[#94A3B8]">Nein. Nebenkosten-Rebell ist ein Einmalkauf. Du kaufst die App einmalig und kannst sie danach für beliebig viele Abrechnungen zeitlich unbegrenzt einsetzen.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}