"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { startCheckout } from "@/lib/commerce/checkout";

export default function BahnRebellMarketingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1E293B]">
        <Link href="/" className="text-xl font-black tracking-tight text-white hover:text-[#F97316] transition-colors">
          VORLAGENBUDE
        </Link>
        <button
          onClick={() => router.push("/app/bahn-rebell")}
          className="bg-[#F97316] text-white px-6 py-2 rounded font-semibold hover:bg-[#EA580C] transition-colors"
        >
          Kostenlos ausprobieren
        </button>
      </header>

      {/* 1. HERO */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[#F97316] font-bold tracking-widest uppercase mb-4 text-sm">
              BAHN-REBELL
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-[#F8FAFC]">
              Zug verspätet, ausgefallen oder Anschluss verpasst?
            </h1>
            <p className="text-xl text-[#94A3B8] mb-8">
              Bahn-Rebell hilft dir, deinen Bahnfall strukturiert zu erfassen, eine mögliche Fahrpreisentschädigung einzuordnen und die nächsten Schritte vorzubereiten. Fahrtdaten, Berechnung und Unterlagen bleiben übersichtlich zusammen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button 
                onClick={() => router.push("/app/bahn-rebell")}
                className="bg-[#F97316] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#EA580C] transition-colors"
              >
                Kostenlos ausprobieren
              </button>
              <a href="#pro-section" className="px-8 py-4 rounded font-bold text-lg border border-[#334155] text-[#94A3B8] hover:text-white hover:border-[#475569] transition-colors flex items-center justify-center">
                Bahn-Rebell Pro ansehen
              </a>
            </div>
            <div className="text-sm text-[#64748B] flex items-center gap-2">
              <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Direkt im Browser · lokal nutzbar · Free-Version ohne Login
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-[#334155] shadow-2xl">
            <img src="/images/screenshots/bahn-rebell-1.png" alt="Bahn-Rebell App Übersicht" className="w-full h-auto" />
          </div>
        </div>
      </main>

      {/* 2. WAS STECKT DRIN? */}
      <section className="bg-[#1E293B] py-24 border-y border-[#334155]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F8FAFC]">Was kannst du mit Bahn-Rebell erledigen?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Fall strukturiert erfassen</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Reisedaten, Verspätung und wichtige Angaben zu deiner Fahrt an einem Ort festhalten.</p>
            </div>
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Mögliche Entschädigung einordnen</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Auf Basis deiner Angaben eine mögliche Fahrpreisentschädigung berechnen und den Fall besser einschätzen.</p>
            </div>
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Vorgang dokumentieren</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Relevante Angaben, zusätzliche Kosten und Informationen zum Fall übersichtlich zusammenhalten, soweit im Produkt vorhanden.</p>
            </div>
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Schreiben vorbereiten</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Persönliche Angaben und Reisedaten für ein strukturiertes Schreiben verwenden und das Ergebnis kopieren, drucken oder exportieren.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCREENSHOT SECTION 1 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Aus einer verspäteten Fahrt wird ein organisierter Fall</h2>
              <p className="text-[#94A3B8] text-lg mb-8 leading-relaxed">
                Erfasse die wichtigsten Reisedaten und halte deinen Vorgang übersichtlich fest. So musst du Informationen nicht später aus Tickets, Notizen und einzelnen Dokumenten zusammensuchen.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Fahrtdaten
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Fallübersicht
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> lokal speichern
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#334155] shadow-2xl md:order-1">
              <img src="/images/screenshots/bahn-rebell-1.png" alt="Bahn-Rebell Fallübersicht" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. ALLES AN EINEM ORT */}
      <section className="py-24 bg-[#1E293B] border-y border-[#334155]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-16 text-[#F8FAFC]">Nicht mehr zwischen Ticket, Notizen und Formularen springen</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155] text-left w-full md:w-64 opacity-70">
              <div className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-6">Vorher</div>
              <ul className="space-y-3 text-[#94A3B8]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Ticketdaten</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Verspätungsinfo</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Notizen</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> zusätzliche Kosten</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Schreiben</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> verschiedene Dateien</li>
              </ul>
            </div>
            
            <div className="text-[#F97316] text-4xl hidden md:block">→</div>
            <div className="text-[#F97316] text-4xl md:hidden">↓</div>
            
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#F97316] shadow-[0_0_30px_rgba(249,115,22,0.15)] text-left w-full md:w-64 relative">
              <div className="text-sm font-bold text-[#F97316] uppercase tracking-wider mb-6">Bahn-Rebell</div>
              <ul className="space-y-3 text-[#E2E8F0] font-medium">
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Fall</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Reisedaten</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> mögliche Entschädigung</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Zusatzinformationen</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Schreiben</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Export / Backup</li>
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
              <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Mögliche Entschädigung direkt einordnen</h2>
              <p className="text-[#94A3B8] text-lg mb-8 leading-relaxed">
                Bahn-Rebell nutzt deine Reisedaten, um eine mögliche Fahrpreisentschädigung zu berechnen. So bekommst du eine erste Orientierung und kannst anschließend strukturiert weiterarbeiten.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Verspätung
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Fahrpreis
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> mögliche Entschädigung
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#334155] shadow-2xl">
              <img src="/images/screenshots/bahn-rebell-2.png" alt="Bahn-Rebell Berechnung" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* SCREENSHOT SECTION 3 */}
      <section className="py-24 bg-[#1E293B] border-y border-[#334155]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Vom Fall zum vorbereiteten Schreiben</h2>
              <p className="text-[#94A3B8] text-lg mb-8 leading-relaxed">
                Nutze deine bereits erfassten Angaben, um den nächsten Schritt vorzubereiten. Schreiben lassen sich – je nach vorhandener Funktion – kopieren, als Text sichern, drucken oder als PDF ausgeben.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Schreiben
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Export
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Druck / PDF
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#334155] shadow-2xl md:order-1">
              <img src="/images/screenshots/bahn-rebell-3.png" alt="Bahn-Rebell Export" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. SO FUNKTIONIERT ES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center text-[#F8FAFC]">So funktioniert Bahn-Rebell</h2>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-0.5 bg-[#334155]"></div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#F97316] text-[#F97316] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">01</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Fahrt erfassen</h3>
              <p className="text-[#94A3B8] text-sm">Reisedaten und Verspätung eintragen.</p>
            </div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#334155] text-[#94A3B8] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">02</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Fall einordnen</h3>
              <p className="text-[#94A3B8] text-sm">Mögliche Fahrpreisentschädigung anhand deiner Angaben prüfen.</p>
            </div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#334155] text-[#94A3B8] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">03</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Angaben ergänzen</h3>
              <p className="text-[#94A3B8] text-sm">Weitere relevante Informationen zum Vorgang festhalten.</p>
            </div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#334155] text-[#94A3B8] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">04</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Weiterarbeiten</h3>
              <p className="text-[#94A3B8] text-sm">Schreiben vorbereiten, speichern oder exportieren.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BAHN-REBELL FREE */}
      <section className="py-24 bg-[#1E293B] border-y border-[#334155] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-[#F97316] font-bold tracking-widest uppercase mb-4 text-sm">KOSTENLOS STARTEN</div>
          <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Erst mal ausprobieren?</h2>
          <p className="text-[#94A3B8] text-lg mb-8">
            Mit Bahn-Rebell Free kannst du direkt starten, eine mögliche Fahrpreisentschädigung prüfen und deinen ersten Fall strukturiert vorbereiten.
          </p>
          <button 
            onClick={() => router.push("/app/bahn-rebell")}
            className="bg-white text-[#0F172A] px-8 py-4 rounded font-bold text-lg hover:bg-gray-200 transition-colors inline-block"
          >
            Bahn-Rebell kostenlos starten
          </button>
        </div>
      </section>

      {/* 8. KAUFBLOCK (PRO) */}
      <section id="pro-section" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#0F172A] border border-[#F97316]/30 rounded-2xl p-8 md:p-12 shadow-[0_0_40px_rgba(249,115,22,0.1)] relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-[#F8FAFC]">Mehr Möglichkeiten mit Bahn-Rebell Pro</h2>
                <p className="text-[#94A3B8] text-lg mb-8">Für alle, die ihren Bahnfall nicht nur prüfen, sondern mit dem vollständigen Funktionsumfang weiterbearbeiten möchten.</p>
                <ul className="space-y-3 mb-8 md:mb-0">
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> unbegrenzte Anzahl von Fällen</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Kosten- & Auslagendokumentation</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> erweiterte PDF-Exporte</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Backup & Import</li>
                </ul>
              </div>
              
              <div className="bg-[#1E293B] rounded-xl p-8 text-center border border-[#334155]">
                <div className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Einmalzahlung</div>
                <div className="text-5xl font-black text-[#F8FAFC] mb-6">19€</div>
                <button 
                  onClick={() => startCheckout('bahnRebell')}
                  className="w-full bg-[#F97316] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#EA580C] transition-colors mb-4"
                >
                  Bahn-Rebell Pro kaufen
                </button>
                <p className="text-xs text-[#64748B]">Du wirst zum Shopify-Checkout weitergeleitet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24 bg-[#1E293B] border-t border-[#334155]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F8FAFC]">Noch Fragen?</h2>
          
          <div className="space-y-6">
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Muss ich mich für Bahn-Rebell Free anmelden?</h3>
              <p className="text-[#94A3B8]">Nein. Die Free-Version kann direkt im Browser gestartet werden, ohne dass ein Benutzerkonto oder Login erforderlich ist.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Ist Bahn-Rebell Free wirklich kostenlos?</h3>
              <p className="text-[#94A3B8]">Ja. Die Erstprüfung und Basis-Dokumentation für deinen Fall sind völlig kostenfrei nutzbar.</p>
            </div>

            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Was ist der Unterschied zwischen Free und Pro?</h3>
              <p className="text-[#94A3B8]">In der Free-Version kannst du einen Fall anlegen und prüfen. Mit der Pro-Version kannst du unbegrenzt Fälle speichern, Zusatzkosten dokumentieren und alle Funktionen zur strukturierten Weiterbearbeitung nutzen.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Wo werden meine eingegebenen Daten gespeichert?</h3>
              <p className="text-[#94A3B8]">Sämtliche von dir eingetragenen Daten werden standardmäßig nur lokal in deinem Browser (Local Storage) gespeichert. Es gibt keinen automatischen Upload auf externe Server.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Kann ich meine Daten sichern?</h3>
              <p className="text-[#94A3B8]">Ja. Da die Daten lokal liegen, gibt es in der App eine integrierte Backup-Funktion, mit der du all deine Einträge als Datei auf deinem Gerät sichern und später importieren kannst.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Bekomme ich mit Bahn-Rebell garantiert eine Entschädigung?</h3>
              <p className="text-[#94A3B8]">Nein. Bahn-Rebell hilft bei Berechnung, Einordnung und Vorbereitung. Ob im konkreten Fall ein Anspruch besteht, hängt von den jeweiligen Voraussetzungen ab.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}