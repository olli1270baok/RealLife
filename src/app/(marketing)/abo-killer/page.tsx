"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { startCheckout } from "@/lib/commerce/checkout";

export default function AboKillerMarketingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 lg:px-12 max-w-7xl mx-auto">
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

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[#F97316] font-bold tracking-widest uppercase mb-4 text-sm">
              ABO-KILLER
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-[#F8FAFC]">
              Zu viele Abos und keine Ahnung, was sie zusammen kosten?
            </h1>
            <p className="text-xl text-[#94A3B8] mb-8">
              Abo-Killer bringt laufende Abos, Kosten, Fristen und Kündigungen an einen Ort. So siehst du schneller, was noch läuft und wo du genauer hinschauen möchtest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => startCheckout('aboKiller')}
                className="bg-[#F97316] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#EA580C] transition-colors"
              >
                Abo-Killer kaufen
              </button>
              <a href="#features-section" className="px-8 py-4 rounded font-bold text-lg border border-[#334155] text-[#94A3B8] hover:text-white hover:border-gray-400 transition-colors flex items-center justify-center">
                Einblick in die App
              </a>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-[#334155] shadow-2xl">
            <img src="/images/screenshots/abo-killer-1.png" alt="Abo-Killer App" className="w-full h-auto" />
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features-section" className="bg-[#1E293B] py-20 border-y border-[#334155]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F8FAFC]">Was kannst du mit Abo-Killer erledigen?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Abos verwalten</h3>
              <p className="text-[#64748B] text-sm">Behalte alle deine laufenden Verträge und Abonnements im Blick.</p>
            </div>
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Kostenkontrolle</h3>
              <p className="text-[#64748B] text-sm">Sehe sofort, wie viel du monatlich und jährlich ausgibst.</p>
            </div>
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Schreiben generieren</h3>
              <p className="text-[#64748B] text-sm">Erstelle Kündigungsschreiben für deine Anbieter mit einem Klick.</p>
            </div>
            <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
              <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">Ghost-Detektiv</h3>
              <p className="text-[#64748B] text-sm">Finde vergessene Abos und ungenutzte Mitgliedschaften.</p>
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
                <h3 className="text-2xl font-bold mb-4">Cockpit & Übersicht</h3>
                <p className="text-[#94A3B8]">Das zentrale Dashboard zeigt dir genau, wohin dein Geld fließt und welche Abos bald verlängert werden.</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#334155] shadow-lg">
                <img src="/images/screenshots/abo-killer-1.png" alt="Abo-Killer Dashboard" className="w-full" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="md:order-2">
                <h3 className="text-2xl font-bold mb-4">Kündigung vorbereiten</h3>
                <p className="text-[#94A3B8]">Wähle einfach den Anbieter aus und das System erstellt das fertige Schreiben für dich.</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#334155] shadow-lg md:order-1">
                <img src="/images/screenshots/abo-killer-2.png" alt="Kündigung" className="w-full" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Druckfertige PDFs</h3>
                <p className="text-[#94A3B8]">Speichere das Kündigungsschreiben als PDF oder drucke es direkt aus der App heraus.</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#334155] shadow-lg">
                <img src="/images/screenshots/abo-killer-3.png" alt="PDF Export" className="w-full" />
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
              Schalte die App frei, um alle Funktionen uneingeschränkt zu nutzen. Behalte die Kontrolle über deine Ausgaben und kündige stressfrei.
            </p>
            
            <button 
              onClick={() => startCheckout('aboKiller')}
              className="w-full md:w-auto bg-[#F97316] text-white px-12 py-5 rounded font-bold text-xl hover:bg-[#EA580C] transition-colors"
            >
              Abo-Killer kaufen
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}