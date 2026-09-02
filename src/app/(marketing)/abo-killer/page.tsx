"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { startCheckout } from "@/lib/commerce/checkout";

export default function AboKillerMarketingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1E293B]">
        <Link href="/" className="text-xl font-black tracking-tight text-white hover:text-[#F97316] transition-colors">
          VORLAGENBUDE
        </Link>
        <button
          onClick={() => startCheckout('aboKiller')}
          className="bg-[#F97316] text-white px-6 py-2 rounded font-semibold hover:bg-[#EA580C] transition-colors"
        >
          Abo-Killer kaufen
        </button>
      </header>

      {/* 1. HERO */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[#F97316] font-bold tracking-widest uppercase mb-4 text-sm">
              ABO-KILLER
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-[#F8FAFC]">
              Deine Abos. Deine Kosten. Endlich Überblick.
            </h1>
            <p className="text-xl text-[#94A3B8] mb-8">
              Erfasse laufende Verträge, behalte Kosten und Fristen im Blick und bereite Kündigungen strukturiert vor – in einer App.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button 
                onClick={() => startCheckout('aboKiller')}
                className="bg-[#F97316] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#EA580C] transition-colors"
              >
                Abo-Killer kaufen
              </button>
              <a href="#features-section" className="px-8 py-4 rounded font-bold text-lg border border-[#334155] text-[#94A3B8] hover:text-white hover:border-[#475569] transition-colors flex items-center justify-center">
                Einblick in die App
              </a>
            </div>
            <div className="text-sm text-[#64748B] flex items-center gap-2">
              <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Einmaliger Kauf · kein Abo · direkt im Browser nutzbar
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-[#334155] shadow-2xl">
            <img src="/images/screenshots/abo-killer-1.png" alt="Abo-Killer App Dashboard" className="w-full h-auto" />
          </div>
        </div>
      </main>

      {/* 2. WAS STECKT DRIN? */}
      <section id="features-section" className="bg-[#1E293B] py-24 border-y border-[#334155]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F8FAFC]">Was steckt im Abo-Killer?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Kosten im Blick</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Monatliche und jährliche Gesamtkosten automatisch zusammenführen und schneller erkennen, was tatsächlich jeden Monat läuft.</p>
            </div>
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Abos verwalten</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Anbieter, Preise, Laufzeiten und Status zentral erfassen und später weiterbearbeiten.</p>
            </div>
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Fristen organisieren</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Kündigungsfristen und wichtige Vertragsdaten übersichtlich im Blick behalten.</p>
            </div>
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-3 text-[#E2E8F0]">Kündigungen vorbereiten</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Passende Schreiben strukturiert vorbereiten, anpassen, kopieren, drucken oder als PDF weiterverwenden.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KÜNDIGUNG VORBEREITEN */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Kündigung vorbereiten, ohne jedes Mal bei null anzufangen</h2>
              <p className="text-[#94A3B8] text-lg mb-8 leading-relaxed">
                Anbieter auswählen, Vertragsdaten ergänzen und das passende Schreiben vorbereiten. So liegen Vertragsübersicht und nächster Schritt direkt nebeneinander.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Anbieter auswählen
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Schreiben anpassen
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> direkt weiterverwenden
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#334155] shadow-2xl md:order-1">
              <img src="/images/screenshots/abo-killer-2.png" alt="Abo-Killer Kündigung vorbereiten" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. ALLES AN EINEM ORT */}
      <section className="py-24 bg-[#1E293B] border-y border-[#334155]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-16 text-[#F8FAFC]">Alles an einem Ort statt über fünf Stellen verteilt</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155] text-left w-full md:w-64 opacity-70">
              <div className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-6">Vorher</div>
              <ul className="space-y-3 text-[#94A3B8]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Banking-App</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> E-Mails</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Anbieter-Konten</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Kalender</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> Notizen</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span> einzelne PDF-Vorlagen</li>
              </ul>
            </div>
            
            <div className="text-[#F97316] text-4xl hidden md:block">→</div>
            <div className="text-[#F97316] text-4xl md:hidden">↓</div>
            
            <div className="bg-[#0F172A] p-8 rounded-xl border border-[#F97316] shadow-[0_0_30px_rgba(249,115,22,0.15)] text-left w-full md:w-64 relative">
              <div className="text-sm font-bold text-[#F97316] uppercase tracking-wider mb-6">Abo-Killer</div>
              <ul className="space-y-3 text-[#E2E8F0] font-medium">
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Abos</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Kosten</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Fristen</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Kündigungen</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Schreiben</li>
                <li className="flex items-center gap-2"><span className="text-[#F97316]">✔</span> Backup</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DRUCKFERTIGE PDFS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Aus der App direkt zum fertigen Schreiben</h2>
              <p className="text-[#94A3B8] text-lg mb-8 leading-relaxed">
                Kündigung vorbereitet? Dann kannst du dein Schreiben kopieren, drucken oder als PDF sichern – ohne den Inhalt erst in ein anderes Programm übertragen zu müssen.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Kopieren
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> Drucken
                </li>
                <li className="flex items-center text-[#E2E8F0] font-medium">
                  <span className="text-[#F97316] mr-3">✔</span> PDF sichern
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#334155] shadow-2xl">
              <img src="/images/screenshots/abo-killer-3.png" alt="Abo-Killer PDF Export" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. SO FUNKTIONIERT ES */}
      <section className="py-24 bg-[#1E293B] border-y border-[#334155]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center text-[#F8FAFC]">So funktioniert Abo-Killer</h2>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-0.5 bg-[#334155]"></div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#F97316] text-[#F97316] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">01</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Erfassen</h3>
              <p className="text-[#94A3B8] text-sm">Abo und Vertragsdaten eintragen.</p>
            </div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#334155] text-[#94A3B8] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">02</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Überblick</h3>
              <p className="text-[#94A3B8] text-sm">Laufende Verträge und Kosten sehen.</p>
            </div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#334155] text-[#94A3B8] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">03</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Entscheiden</h3>
              <p className="text-[#94A3B8] text-sm">Behalten, prüfen oder Kündigung vorbereiten.</p>
            </div>
            
            <div className="relative text-center md:text-left">
              <div className="w-12 h-12 bg-[#0F172A] border-2 border-[#334155] text-[#94A3B8] rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 mx-auto md:mx-0">04</div>
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Weiterarbeiten</h3>
              <p className="text-[#94A3B8] text-sm">Schreiben sichern, drucken oder Daten exportieren.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. KAUFBLOCK */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#0F172A] border border-[#F97316]/30 rounded-2xl p-8 md:p-12 shadow-[0_0_40px_rgba(249,115,22,0.1)] relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-[#F8FAFC]">Abo-Killer Ultimate</h2>
                <p className="text-[#94A3B8] text-lg mb-8">Einmal kaufen. Dauerhaft nutzen.</p>
                <ul className="space-y-3 mb-8 md:mb-0">
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> vollständige Abo-Verwaltung</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Monats- und Jahreskosten</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Fristenorganisation</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Kündigungsworkflow</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Schreiben / PDF</li>
                  <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✔</span> Backup & Import</li>
                </ul>
              </div>
              
              <div className="bg-[#1E293B] rounded-xl p-8 text-center border border-[#334155]">
                <div className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Einmalzahlung</div>
                <div className="text-5xl font-black text-[#F8FAFC] mb-6">19€</div>
                <button 
                  onClick={() => startCheckout('aboKiller')}
                  className="w-full bg-[#F97316] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#EA580C] transition-colors mb-4"
                >
                  Abo-Killer kaufen
                </button>
                <p className="text-xs text-[#64748B]">Nach dem Klick wirst du zum Shopify-Checkout weitergeleitet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 bg-[#1E293B] border-t border-[#334155]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F8FAFC]">Noch Fragen?</h2>
          
          <div className="space-y-6">
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Brauche ich für Abo-Killer ein Abo?</h3>
              <p className="text-[#94A3B8]">Nein. Abo-Killer ist ein reines Einmalkauf-Produkt. Du zahlst einmalig und kannst die App dauerhaft nutzen, ohne laufende Kosten.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Muss ich etwas installieren?</h3>
              <p className="text-[#94A3B8]">Abo-Killer ist eine moderne Web-App (PWA). Du kannst sie direkt im Browser nutzen oder als App auf deinem Homescreen hinzufügen (per Browser-Funktion), ganz ohne App-Store-Download.</p>
            </div>

            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Funktioniert Abo-Killer offline?</h3>
              <p className="text-[#94A3B8]">Teilweise. Da Abo-Killer als Progressive Web App (PWA) gebaut ist, können viele Kernfunktionen (wie die Anzeige und das Bearbeiten deiner gespeicherten Daten) auch ohne aktive Internetverbindung genutzt werden. Für den PDF-Druck und den Erst-Login ist eine Verbindung nötig.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Wo werden meine Daten gespeichert?</h3>
              <p className="text-[#94A3B8]">Sämtliche von dir eingetragenen Vertrags- und Abo-Daten werden standardmäßig nur lokal in deinem Browser (Local Storage) gespeichert. Es findet keine Synchronisation auf unsere Server statt.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Kann ich meine Daten sichern?</h3>
              <p className="text-[#94A3B8]">Ja. Da die Daten lokal liegen, gibt es eine integrierte Backup-Funktion, mit der du all deine Einträge als Datei auf deinem Gerät sichern und später wieder importieren kannst.</p>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Funktioniert Abo-Killer auch auf Smartphone und Tablet?</h3>
              <p className="text-[#94A3B8]">Ja. Die Oberfläche ist responsiv und passt sich an alle Bildschirmgrößen an, sodass du deine Abos sowohl am großen Desktop-Bildschirm als auch mobil bequem verwalten kannst.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}