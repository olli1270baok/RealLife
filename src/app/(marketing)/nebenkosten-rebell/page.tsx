"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { startCheckout } from "@/lib/commerce/checkout";

export default function NebenkostenRebellMarketingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 lg:px-12 max-w-7xl mx-auto">
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

      {/* Hero */}
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
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => startCheckout('nebenkostenRebell')}
                className="bg-[#F97316] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#EA580C] transition-colors"
              >
                Nebenkosten-Rebell kaufen
              </button>
              <a href="#features-section" className="px-8 py-4 rounded font-bold text-lg border border-[#334155] text-[#94A3B8] hover:text-white hover:border-gray-400 transition-colors flex items-center justify-center">
                Einblick in die App
              </a>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-[#334155] shadow-2xl">
            <img src="/images/screenshots/nebenkosten-rebell-1.png" alt="Nebenkosten-Rebell App" className="w-full h-auto" />
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features-section" className="bg-[#1E293B] py-20 border-y border-[#334155]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F8FAFC]">Was kannst du mit Nebenkosten-Rebell erledigen?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Abrechnung prüfen</h3>
              <p className="text-[#64748B] text-sm">Erfasse alle Positionen deiner Abrechnung und überprüfe sie auf formelle Richtigkeit.</p>
            </div>
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Vergleich mit Vorjahr</h3>
              <p className="text-[#64748B] text-sm">Erkenne sofort, welche Posten ungewöhnlich stark gestiegen sind.</p>
            </div>
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Belege anfordern</h3>
              <p className="text-[#64748B] text-sm">Generiere Anschreiben zur Belegeinsicht für deinen Vermieter.</p>
            </div>
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Mängel protokollieren</h3>
              <p className="text-[#64748B] text-sm">Führe ein strukturiertes Protokoll über bekannte Mängel und offene Fragen.</p>
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
                <h3 className="text-2xl font-bold mb-4">Erfassung der Abrechnung</h3>
                <p className="text-[#94A3B8]">Trage deine Nebenkostenpositionen strukturiert in das System ein, um einen klaren Überblick zu erhalten.</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#334155] shadow-lg">
                <img src="/images/screenshots/nebenkosten-rebell-1.png" alt="Nebenkosten Übersicht" className="w-full" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="md:order-2">
                <h3 className="text-2xl font-bold mb-4">Analyse & Vergleich</h3>
                <p className="text-[#94A3B8]">Identifiziere Auffälligkeiten in den Kostenverteilungen und vergleiche Werte mit Durchschnittsangaben.</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#334155] shadow-lg md:order-1">
                <img src="/images/screenshots/nebenkosten-rebell-2.png" alt="Kostenanalyse" className="w-full" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Schreiben & Vorlagen</h3>
                <p className="text-[#94A3B8]">Erstelle sofort bereite Schreiben für die Kommunikation mit dem Vermieter.</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#334155] shadow-lg">
                <img src="/images/screenshots/nebenkosten-rebell-3.png" alt="PDF Generierung" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section className="py-24 bg-[#1E293B] border-y border-[#334155]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#0F172A] border border-[#334155] rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#F8FAFC]">Vollzugriff erhalten</h2>
            <p className="text-[#94A3B8] mb-10 text-lg max-w-2xl mx-auto">
              Schalte die App frei, um alle Funktionen uneingeschränkt zu nutzen. Nachvollziehbarkeit statt unklarer Forderungen.
            </p>
            
            <button 
              onClick={() => startCheckout('nebenkostenRebell')}
              className="w-full md:w-auto bg-[#F97316] text-white px-12 py-5 rounded font-bold text-xl hover:bg-[#EA580C] transition-colors"
            >
              Nebenkosten-Rebell kaufen
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}