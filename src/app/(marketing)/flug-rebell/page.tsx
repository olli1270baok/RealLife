"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { startCheckout } from "@/lib/commerce/checkout";

export default function FlugRebellMarketingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1E293B]">
        <Link href="/" className="text-xl font-black tracking-tight text-white hover:text-[#F97316] transition-colors">
          VORLAGENBUDE
        </Link>
        <button
          onClick={() => startCheckout('flugRebell')}
          className="bg-[#F97316] text-white px-6 py-2 rounded font-semibold hover:bg-[#EA580C] transition-colors"
        >
          Flug-Rebell kaufen
        </button>
      </header>

      {/* 1. HERO */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[#F97316] font-bold tracking-widest uppercase mb-4 text-sm">
              FLUG-REBELL
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-[#F8FAFC]">
              Flug verspätet, gestrichen oder Anschluss verpasst?
            </h1>
            <p className="text-xl text-[#94A3B8] mb-8">
              Flug-Rebell hilft dir, deinen Fall strukturiert einzuordnen, eine mögliche Entschädigung zu prüfen und die nächsten Schritte vorzubereiten. Flugdaten, zusätzliche Kosten und Schreiben bleiben übersichtlich zusammen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button 
                onClick={() => startCheckout('flugRebell')}
                className="bg-[#F97316] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#EA580C] transition-colors"
              >
                Flug-Rebell kaufen
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
            <img src="/images/screenshots/flug-rebell-1.png" alt="Flug-Rebell App" className="w-full h-auto" />
          </div>
        </div>
      </main>

      {/* 2. WAS STECKT DRIN? */}
      <section className="bg-[#1E293B] py-24 border-y border-[#334155]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F8FAFC]">Was kannst du mit Flug-Rebell erledigen?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Flugfall erfassen</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Flugdaten, Verspätung, Ausfall und relevante Angaben strukturiert dokumentieren.</p>
            </div>
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Mögliche Entschädigung einordnen</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Auf Basis der eingegebenen Daten prüfen, welche mögliche Entschädigung grundsätzlich infrage kommen könnte.</p>
            </div>
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Zusatzkosten festhalten</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Relevante zusätzliche Ausgaben und Informationen zum Vorgang dokumentieren, soweit diese Funktion vorhanden ist.</p>
            </div>
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Schreiben und Mahnstufen vorbereiten</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Vorhandene Daten für passende Schreiben und die im Produkt enthaltenen Mahnstufen weiterverwenden.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCREENSHOT SECTION 1 */}
      <section id="screenshots" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Dein Flugproblem als klarer Vorgang</h2>
              <p className="text-[#94A3B8] text-lg mb-8 leading-relaxed">
                Flugdaten und wichtige Informationen werden nicht über Notizen, E-Mails und einzelne Dokumente verteilt, sondern strukturiert in einem Fall zusammengeführt.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Flugdaten
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Fallübersicht
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Status
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#334155] shadow-2xl md:order-1">
              <img src="/images/screenshots/flug-rebell-1.png" alt="Flug-Rebell Fallübersicht" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. ALLES AN EINEM ORT */}
      <section className="py-24 bg-[#1E293B] border-y border-[#334155]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-16 text-[#F8FAFC]">Flug vorbei. Vorgang noch nicht.</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155] text-left w-full md:w-64 opacity-70">
              <div className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-6">Vorher</div>
              <ul className="space-y-3 text-[#94A3B8]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Buchungsdaten</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Flugnummer</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Verspätungsinfo</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Belege</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Zusatzkosten</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Schreiben</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Erinnerungen</li>
              </ul>
            </div>
            
            <div className="text-[#F97316] text-4xl hidden md:block">→</div>
            <div className="text-[#F97316] text-4xl md:hidden">↓</div>
            
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#F97316] shadow-[0_0_30px_rgba(249,115,22,0.15)] text-left w-full md:w-64 relative">
              <div className="text-sm font-bold text-[#F97316] uppercase tracking-wider mb-6">Flug-Rebell</div>
              <ul className="space-y-3 text-[#E2E8F0] font-medium">
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Fall</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Flugdaten</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> mögliche Entschädigung</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Zusatzkosten</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Schreiben</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Mahnstufen</li>
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
              <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Mögliche Entschädigung besser einordnen</h2>
              <p className="text-[#94A3B8] text-lg mb-8 leading-relaxed">
                Flug-Rebell nutzt deine Angaben, um den Fall strukturiert zu prüfen und eine mögliche Entschädigung einzuordnen. Das Ergebnis dient als Orientierung für die weiteren Schritte.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Flugstrecke
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Verspätung
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> mögliche Entschädigung
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#334155] shadow-2xl">
              <img src="/images/screenshots/flug-rebell-2.png" alt="Flug-Rebell Berechnung" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. SCREENSHOT SECTION 3 */}
      <section className="py-24 bg-[#1E293B] border-y border-[#334155]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Nicht bei einem Schreiben aufhören</h2>
              <p className="text-[#94A3B8] text-lg mb-8 leading-relaxed">
                Wenn eine erste Kontaktaufnahme nicht zum Ziel führt, kannst du den Vorgang mit den vorhandenen weiteren Schreiben und Mahnstufen strukturiert fortsetzen.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Schreiben
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Mahnstufen
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Vorgang weiterführen
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#334155] shadow-2xl md:order-1">
              {/* Assuming same image as earlier or flug-rebell-2 since only 2 screens were listed, but using flug-rebell-1 for fallback if needed, or 3 if it exists */}
              <img src="/images/screenshots/flug-rebell-2.png" alt="Flug-Rebell Export" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. SO FUNKTIONIERT ES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center text-[#F8FAFC]">So funktioniert Flug-Rebell</h2>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-0.5 bg-[#334155]"></div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#F97316] text-[#F97316] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">01</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Flug erfassen</h3>
              <p className="text-[#94A3B8] text-sm">Flugdaten und Problem eingeben.</p>
            </div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#334155] text-[#94A3B8] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">02</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Fall einordnen</h3>
              <p className="text-[#94A3B8] text-sm">Mögliche Entschädigung anhand deiner Angaben prüfen.</p>
            </div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#334155] text-[#94A3B8] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">03</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Unterlagen vorbereiten</h3>
              <p className="text-[#94A3B8] text-sm">Zusätzliche Kosten und relevante Angaben ergänzen.</p>
            </div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#334155] text-[#94A3B8] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">04</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Weiterarbeiten</h3>
              <p className="text-[#94A3B8] text-sm">Schreiben und vorhandene Mahnstufen für den weiteren Vorgang nutzen.</p>
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
                <h2 className="text-3xl font-bold mb-2 text-[#F8FAFC]">Flug-Rebell</h2>
                <p className="text-[#94A3B8] text-lg mb-8">Einmal kaufen. Den gesamten Vorgang strukturiert bearbeiten.</p>
                <ul className="space-y-3 mb-8 md:mb-0">
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Flugfall erfassen</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> mögliche Entschädigung einordnen</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Zusatzkosten dokumentieren</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Schreiben vorbereiten</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> 3 Mahnstufen nutzen</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Daten speichern / exportieren</li>
                </ul>
              </div>
              
              <div className="bg-[#1E293B] rounded-xl p-8 text-center border border-[#334155]">
                <div className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Einmalzahlung</div>
                <div className="text-5xl font-black text-[#F8FAFC] mb-6">19€</div>
                <button 
                  onClick={() => startCheckout('flugRebell')}
                  className="w-full bg-[#F97316] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#EA580C] transition-colors mb-4"
                >
                  Flug-Rebell kaufen
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
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Für welche Flugprobleme ist Flug-Rebell gedacht?</h3>
              <p className="text-[#94A3B8]">Flug-Rebell unterstützt dich bei der Dokumentation und Erstprüfung von Flugverspätungen, Annullierungen und verpassten Anschlussflügen im Rahmen der EU-Fluggastrechte.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Ist eine Entschädigung garantiert?</h3>
              <p className="text-[#94A3B8]">Nein. Das Tool unterstützt Einordnung und Vorbereitung; der konkrete Anspruch hängt von den Voraussetzungen des Einzelfalls ab.</p>
            </div>

            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Was bedeuten die Mahnstufen?</h3>
              <p className="text-[#94A3B8]">Sollte eine Fluggesellschaft nicht reagieren, stellt dir die App drei aufeinanderfolgende Mahnstufen zur Verfügung, um deinen Vorgang strukturiert eskalieren zu können.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Kann ich zusätzliche Kosten dokumentieren?</h3>
              <p className="text-[#94A3B8]">Ja. Du kannst Auslagen wie Verpflegung, Hotel oder Ersatztransport strukturiert festhalten und in deinen Schreiben ergänzen.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Wo werden meine Daten gespeichert?</h3>
              <p className="text-[#94A3B8]">Deine eingegebenen Informationen werden sicher und ausschließlich lokal in deinem Browser (Local Storage) gespeichert. Es findet keine Übertragung auf unsere Server statt.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Muss ich ein Abo abschließen?</h3>
              <p className="text-[#94A3B8]">Nein. Flug-Rebell ist ein Einmalkauf. Du zahlst einmalig und kannst die App anschließend unbegrenzt und dauerhaft nutzen.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}