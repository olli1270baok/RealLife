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
      <main className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="text-[#F97316] font-bold tracking-widest uppercase mb-4 text-sm">
          Abo-Killer
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-[#F8FAFC]">
          Kündige Verträge <br className="hidden md:block" />in Sekunden.
        </h1>
        <p className="text-xl text-[#94A3B8] mb-12 max-w-2xl mx-auto">
          Schluss mit versteckten Kündigungsfristen und endlosen Telefonaten. Generiere rechtsgültige Kündigungsschreiben mit einem Klick.
        </p>

        <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-8 max-w-lg mx-auto mb-12 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-[#F8FAFC]">Vollzugriff erhalten</h2>
          <p className="text-[#94A3B8] mb-6 text-sm">
            Schalte die App frei, um alle Funktionen uneingeschränkt zu nutzen.
          </p>
          <button 
            onClick={() => startCheckout('aboKiller')}
            className="w-full bg-[#F97316] text-white py-4 rounded font-bold text-lg hover:bg-[#EA580C] transition-colors"
          >
            Abo-Killer kaufen
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto">
          <div>
            <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">1. Anbieter wählen</h3>
            <p className="text-[#64748B] text-sm">Aus unserer großen Datenbank auswählen.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">2. Daten ergänzen</h3>
            <p className="text-[#64748B] text-sm">Kundennummer und Adresse eintragen.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-[#E2E8F0]">3. Fertig</h3>
            <p className="text-[#64748B] text-sm">Das Dokument sofort speichern oder drucken.</p>
          </div>
        </div>
      </main>
    </div>
  );
}