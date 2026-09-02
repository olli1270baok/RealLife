"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { startCheckout } from "@/lib/commerce/checkout";

export default function BahnRebellMarketingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 lg:px-12 max-w-7xl mx-auto">
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

      {/* Hero */}
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
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => router.push("/app/bahn-rebell")}
                className="bg-[#F97316] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#EA580C] transition-colors"
              >
                Kostenlos ausprobieren
              </button>
              <a href="#pro-section" className="px-8 py-4 rounded font-bold text-lg border border-[#334155] text-[#94A3B8] hover:text-white hover:border-gray-400 transition-colors flex items-center justify-center">
                Pro-Funktionen ansehen
              </a>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-[#334155] shadow-2xl">
            <img src="/images/screenshots/bahn-rebell-1.png" alt="Bahn-Rebell App" className="w-full h-auto" />
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="bg-[#1E293B] py-20 border-y border-[#334155]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F8FAFC]">Was kannst du mit Bahn-Rebell erledigen?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Fahrt erfassen</h3>
              <p className="text-[#64748B] text-sm">Trage alle relevanten Zug- und Falldaten übersichtlich ein.</p>
            </div>
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Entschädigung prüfen</h3>
              <p className="text-[#64748B] text-sm">Lass dir die mögliche Fahrpreisentschädigung berechnen.</p>
            </div>
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Kosten dokumentieren</h3>
              <p className="text-[#64748B] text-sm">Halte relevante Angaben und Zusatzkosten strukturiert fest.</p>
            </div>
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Schreiben vorbereiten</h3>
              <p className="text-[#64748B] text-sm">Erstelle Anschreiben, kopiere, drucke oder exportiere sie direkt.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F8FAFC]">Einblick in die App</h2>
          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Übersicht & Falldaten</h3>
                <p className="text-[#94A3B8]">Behalte den Überblick über all deine Verbindungen und Verspätungen.</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#334155] shadow-lg">
                <img src="/images/screenshots/bahn-rebell-1.png" alt="Übersicht" className="w-full" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="md:order-2">
                <h3 className="text-2xl font-bold mb-4">Berechnung & Bearbeitung</h3>
                <p className="text-[#94A3B8]">Detaillierte Erfassung von Zusatzkosten und Berechnung deiner Ansprüche.</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#334155] shadow-lg md:order-1">
                <img src="/images/screenshots/bahn-rebell-2.png" alt="Berechnung" className="w-full" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Schreiben & Export</h3>
                <p className="text-[#94A3B8]">Erstelle sofort bereite PDF-Dokumente für die weitere Bearbeitung.</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#334155] shadow-lg">
                <img src="/images/screenshots/bahn-rebell-3.png" alt="Export" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Section */}
      <section className="bg-[#1E293B] py-20 border-y border-[#334155] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-[#F97316] font-bold tracking-widest uppercase mb-4 text-sm">KOSTENLOS STARTEN</div>
          <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Erst mal ausprobieren?</h2>
          <p className="text-[#94A3B8] text-lg mb-8">
            Mit Bahn-Rebell Free kannst du die App direkt testen und eine mögliche Fahrpreisentschädigung für deinen Fall prüfen.
          </p>
          <button 
            onClick={() => router.push("/app/bahn-rebell")}
            className="bg-white text-[#0F172A] px-8 py-4 rounded font-bold text-lg hover:bg-gray-200 transition-colors"
          >
            Bahn-Rebell kostenlos starten
          </button>
        </div>
      </section>

      {/* Pro Section */}
      <section id="pro-section" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#0F172A] border border-[#334155] rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl">⭐</div>
            <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Mehr Möglichkeiten mit Bahn-Rebell Pro</h2>
            <p className="text-[#94A3B8] mb-8 text-lg">Schalte zusätzliche Features frei für eine effizientere Bearbeitung deiner Fälle.</p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✓</span> Unbegrenzte Anzahl von Fällen speichern</li>
              <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✓</span> Direkter PDF-Export ohne Wasserzeichen</li>
              <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✓</span> Kosten- und Auslagen-Manager</li>
              <li className="flex items-center text-[#E2E8F0]"><span className="text-[#F97316] mr-3">✓</span> Priorisierter E-Mail-Support</li>
            </ul>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#1E293B] p-6 rounded-xl border border-[#334155]">
              <div>
                <div className="text-sm text-[#94A3B8] mb-1">Einmalzahlung (Lifetime)</div>
                <div className="text-4xl font-bold text-white">19,00 €</div>
              </div>
              <button 
                onClick={() => startCheckout('bahnRebell')}
                className="w-full md:w-auto bg-[#F97316] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#EA580C] transition-colors"
              >
                Bahn-Rebell Pro kaufen
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}