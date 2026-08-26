"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Homepage() {
  const router = useRouter();

  // ONLY FOR SECTION 5: KOSTENLOS TESTEN
  const [delay, setDelay] = useState<number>(60);
  const [ticketPrice, setTicketPrice] = useState<number>(100);
  let compensation = 0;
  if (delay >= 60 && delay < 120) compensation = ticketPrice * 0.25;
  else if (delay >= 120) compensation = ticketPrice * 0.5;

  return (
    <div className="min-h-screen font-sans text-[#0F172A] bg-white">
      
      {/* 2. HERO */}
      <section className="pt-20 pb-24 px-6 lg:px-12 max-w-screen-2xl mx-auto bg-white">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="lg:w-1/2 flex flex-col items-start w-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 text-[#0F172A]" style={{ fontFamily: 'var(--font-head)' }}>
              Komplizierte Dinge einfacher machen.
            </h1>
            <p className="text-xl md:text-2xl text-[#0F172A] font-bold leading-relaxed mb-6 max-w-xl">
              Digitale Apps für Bahnärger, Nebenkosten, Abos, Flugprobleme und anderen Alltagskram.
            </p>
            <p className="text-lg text-[#64748B] font-medium leading-relaxed mb-12 max-w-xl">
              Praktische digitale Werkzeuge, mit denen du Dinge nicht nur berechnest, sondern organisierst, dokumentierst und weiterbearbeitest.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full sm:w-auto">
              <button 
                onClick={() => document.getElementById('kern-apps')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#EA580C] text-white px-10 py-4 rounded font-bold text-lg hover:bg-[#C2410C] transition-colors w-full sm:w-auto text-center"
              >
                Apps entdecken
              </button>
              <button 
                onClick={() => document.getElementById('kostenlos-testen')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[#0F172A] bg-transparent hover:bg-[#F5F4F0] px-8 py-4 rounded font-bold text-lg transition-colors w-full sm:w-auto text-center"
              >
                Kostenlos testen
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            {/* HERU VISUAL: ECHTES BILD-PLATZHALTER */}
            <div className="aspect-[4/3] md:aspect-[16/10] bg-[#F5F4F0] rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden relative flex items-center justify-center">
              {/* Hier kommt später das echte Bild rein */}
              {/* <img src="/images/hero-abo-killer.jpg" alt="Abo-Killer App Ansicht" className="w-full h-full object-cover" /> */}
              
              <div className="text-[#94A3B8] font-bold flex flex-col items-center gap-3">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                <span>Platzhalter: Hero App-Visual (Bild)</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. KERN-APPS */}
      <section id="kern-apps">
        <div className="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto text-center">
          <div className="text-sm font-bold text-[#64748B] mb-2 uppercase tracking-wide">UNSERE APPS</div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4" style={{ fontFamily: 'var(--font-head)' }}>Welche App hilft dir gerade?</h2>
          <p className="text-xl text-[#64748B]">Wähle das Thema, das du gerade erledigen möchtest.</p>
        </div>

        {/* ABO-KILLER (Text Links, Bild Rechts) */}
        <div className="bg-[#F5F4F0] py-24 border-y border-[#E2E8F0]">
          <div className="px-6 lg:px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-5/12 w-full">
              <div className="text-xs font-bold text-[#EA580C] mb-4 uppercase tracking-widest bg-white px-3 py-1 rounded inline-block shadow-sm">Abo-Killer</div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                Zu viele Abos und keine Ahnung, was sie zusammen kosten?
              </h3>
              <p className="text-[#0F172A] text-lg mb-8 leading-relaxed">
                Abo-Killer bringt deine laufenden Abos, Kosten, Fristen und Kündigungen an einen Ort. Statt zwischen E-Mails, Kontoauszügen und einzelnen Kundenkonten zu suchen, bekommst du eine zentrale Übersicht über deine laufenden Verträge.
              </p>
              <ul className="space-y-4 mb-10 text-[#0F172A] font-medium">
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Abos erfassen und verwalten</li>
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Monatliche und jährliche Kosten überblicken</li>
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Laufzeiten und Kündigungsfristen im Blick behalten</li>
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Kündigungen strukturiert vorbereiten</li>
              </ul>
              <button onClick={() => router.push('/abo-killer')} className="bg-[#0F172A] text-white px-8 py-4 rounded font-bold hover:bg-[#1E293B] transition-colors">
                Abo-Killer ansehen
              </button>
            </div>
            <div className="lg:w-7/12 w-full">
              {/* ECHTES BILD-PLATZHALTER */}
              <div className="aspect-[4/3] bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden relative flex items-center justify-center">
                {/* <img src="/images/app-abo-killer.jpg" alt="Abo-Killer App" className="w-full h-full object-cover" /> */}
                <div className="text-[#94A3B8] font-bold flex flex-col items-center gap-3">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  <span>Platzhalter: Abo-Killer Bild</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BAHN-REBELL (Bild Links, Text Rechts) */}
        <div className="bg-white py-24">
          <div className="px-6 lg:px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center">
            <div className="lg:w-5/12 w-full">
              <div className="text-xs font-bold text-[#EA580C] mb-4 uppercase tracking-widest bg-[#F5F4F0] px-3 py-1 rounded inline-block shadow-sm">Bahn-Rebell</div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                Zug verspätet, ausgefallen oder Anschluss verpasst?
              </h3>
              <p className="text-[#0F172A] text-lg mb-8 leading-relaxed">
                Bahn-Rebell hilft dir, deinen Bahnfall strukturiert zu erfassen, eine mögliche Fahrpreisentschädigung einzuordnen und die nächsten Schritte vorzubereiten. Fahrtdaten, Berechnung und Unterlagen bleiben übersichtlich an einem Ort.
              </p>
              <ul className="space-y-4 mb-10 text-[#0F172A] font-medium">
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Fälle bzw. Fahrten erfassen</li>
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Mögliche Fahrpreisentschädigung berechnen</li>
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Relevante Angaben speichern</li>
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Schreiben bzw. Unterlagen vorbereiten</li>
              </ul>
              <button onClick={() => router.push('/bahn-rebell')} className="bg-[#0F172A] text-white px-8 py-4 rounded font-bold hover:bg-[#1E293B] transition-colors">
                Bahn-Rebell ansehen
              </button>
            </div>
            <div className="lg:w-7/12 w-full">
              {/* ECHTES BILD-PLATZHALTER */}
              <div className="aspect-[4/3] bg-[#F5F4F0] rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden relative flex items-center justify-center">
                {/* <img src="/images/app-bahn-rebell.jpg" alt="Bahn-Rebell App" className="w-full h-full object-cover" /> */}
                <div className="text-[#94A3B8] font-bold flex flex-col items-center gap-3">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  <span>Platzhalter: Bahn-Rebell Bild</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NEBENKOSTEN-REBELL (Text Links, Bild Rechts) */}
        <div className="bg-[#F5F4F0] py-24 border-y border-[#E2E8F0]">
          <div className="px-6 lg:px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-5/12 w-full">
              <div className="text-xs font-bold text-[#EA580C] mb-4 uppercase tracking-widest bg-white px-3 py-1 rounded inline-block shadow-sm">Nebenkosten-Rebell</div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                Nebenkostenabrechnung bekommen – aber kaum nachvollziehbar, woher die Nachzahlung kommt?
              </h3>
              <p className="text-[#0F172A] text-lg mb-8 leading-relaxed">
                Nebenkosten-Rebell hilft dir, deine Abrechnung strukturiert auseinanderzunehmen. Kostenpositionen, Vorauszahlungen und Veränderungen werden übersichtlich aufbereitet, damit du besser nachvollziehen kannst, wie sich das Ergebnis zusammensetzt.
              </p>
              <ul className="space-y-4 mb-10 text-[#0F172A] font-medium">
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Abrechnungsdaten erfassen</li>
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Kostenpositionen strukturieren</li>
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Vorauszahlungen und Gesamtkosten vergleichen</li>
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Veränderungen nachvollziehen</li>
              </ul>
              <button onClick={() => router.push('/nebenkosten-rebell')} className="bg-[#0F172A] text-white px-8 py-4 rounded font-bold hover:bg-[#1E293B] transition-colors">
                Nebenkosten-Rebell ansehen
              </button>
            </div>
            <div className="lg:w-7/12 w-full">
              {/* ECHTES BILD-PLATZHALTER */}
              <div className="aspect-[4/3] bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden relative flex items-center justify-center">
                {/* <img src="/images/app-nebenkosten.jpg" alt="Nebenkosten-Rebell App" className="w-full h-full object-cover" /> */}
                <div className="text-[#94A3B8] font-bold flex flex-col items-center gap-3">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  <span>Platzhalter: Nebenkosten-Rebell Bild</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FLUG-REBELL (Bild Links, Text Rechts) */}
        <div className="bg-white py-24 border-b border-[#E2E8F0]">
          <div className="px-6 lg:px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center">
            <div className="lg:w-5/12 w-full">
              <div className="text-xs font-bold text-[#EA580C] mb-4 uppercase tracking-widest bg-[#F5F4F0] px-3 py-1 rounded inline-block shadow-sm">Flug-Rebell</div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                Flug verspätet, gestrichen oder Anschluss verpasst?
              </h3>
              <p className="text-[#0F172A] text-lg mb-8 leading-relaxed">
                Flug-Rebell hilft dir, deinen Fall strukturiert einzuordnen und die nächsten Schritte vorzubereiten. Flugdaten, mögliche Entschädigung, zusätzliche Kosten und Schreiben lassen sich in einem nachvollziehbaren Ablauf organisieren.
              </p>
              <ul className="space-y-4 mb-10 text-[#0F172A] font-medium">
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Flugdaten und Fall erfassen</li>
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Mögliche Entschädigung einordnen</li>
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Zusatzkosten dokumentieren</li>
                <li className="flex gap-3"><span className="text-[#EA580C]">✔</span> Schreiben vorbereiten</li>
              </ul>
              <button onClick={() => router.push('/flug-rebell')} className="bg-[#0F172A] text-white px-8 py-4 rounded font-bold hover:bg-[#1E293B] transition-colors">
                Flug-Rebell ansehen
              </button>
            </div>
            <div className="lg:w-7/12 w-full">
              {/* ECHTES BILD-PLATZHALTER */}
              <div className="aspect-[4/3] bg-[#F5F4F0] rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden relative flex items-center justify-center">
                {/* <img src="/images/app-flug-rebell.jpg" alt="Flug-Rebell App" className="w-full h-full object-cover" /> */}
                <div className="text-[#94A3B8] font-bold flex flex-col items-center gap-3">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  <span>Platzhalter: Flug-Rebell Bild</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 4. WEITERE APPS */}
      <section className="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-extrabold text-[#0F172A] mb-12" style={{ fontFamily: 'var(--font-head)' }}>Weitere digitale Helfer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2 text-[#0F172A]">Retouren-Rebell</h3>
            <p className="text-[#64748B] text-sm mb-6 flex-1">Rücksendungen, Paketverluste und Erstattungen übersichtlich organisieren.</p>
            <Link href="/retouren-rebell" className="text-[#EA580C] font-bold text-sm">Ansehen &rarr;</Link>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2 text-[#0F172A]">Behörden Shield</h3>
            <p className="text-[#64748B] text-sm mb-6 flex-1">Behördenvorgänge strukturieren und nächste Schritte vorbereiten.</p>
            <Link href="/behoerden-shield" className="text-[#EA580C] font-bold text-sm">Ansehen &rarr;</Link>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2 text-[#0F172A]">Digitales Schutzschild</h3>
            <p className="text-[#64748B] text-sm mb-6 flex-1">Datenschutzanfragen und Löschungen an Anbieter senden.</p>
            <Link href="/digital-schutzschild" className="text-[#EA580C] font-bold text-sm">Ansehen &rarr;</Link>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2 text-[#0F172A]">Lebenslagen-Lotse</h3>
            <p className="text-[#64748B] text-sm mb-6 flex-1">Komplexe Alltagssituationen in Aufgaben und Fristen zerlegen.</p>
            <Link href="/lebenslagen-lotse" className="text-[#EA580C] font-bold text-sm">Ansehen &rarr;</Link>
          </div>
        </div>
      </section>

      {/* 5. KOSTENLOS TESTEN */}
      <section id="kostenlos-testen" className="py-24 bg-[#F5F4F0] border-t border-[#E2E8F0]">
        <div className="max-w-screen-md mx-auto px-6 text-center">
          <div className="text-sm font-bold text-[#EA580C] mb-2 uppercase tracking-wide">KOSTENLOS TESTEN</div>
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-6" style={{ fontFamily: 'var(--font-head)' }}>Erst mal ausprobieren?</h2>
          <p className="text-xl text-[#0F172A] mb-12">
            Mit Bahn-Rebell Free kannst du kostenlos eine erste mögliche Fahrpreisentschädigung prüfen.
          </p>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 lg:p-12 text-left shadow-lg">
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-[#E2E8F0]">
              <div className="font-bold text-[#0F172A] text-lg">Bahn-Rebell Schnellcheck</div>
              <div className="text-xs font-bold text-[#EA580C] bg-[#FFF5F1] px-3 py-1 rounded uppercase tracking-wider border border-[#FFDCD0]">Kostenloser Schnellcheck</div>
            </div>

            <div className="space-y-8 mb-10">
              <div>
                <label className="block font-bold text-[#0F172A] mb-3">Ticketpreis (Einzelfahrt)</label>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    value={ticketPrice} 
                    onChange={e => setTicketPrice(parseFloat(e.target.value))}
                    className="w-full max-w-[200px] border border-[#CBD5E1] p-4 rounded font-bold text-[#0F172A] text-lg"
                  />
                  <span className="ml-4 font-bold text-[#64748B] text-lg">€</span>
                </div>
              </div>
              <div>
                <label className="block font-bold text-[#0F172A] mb-3">Verspätung am Zielort</label>
                <div className="flex items-center gap-6">
                  <input 
                    type="range" 
                    min="0" max="180" step="15"
                    value={delay} 
                    onChange={e => setDelay(parseInt(e.target.value))}
                    className="flex-1 accent-[#EA580C] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="w-24 text-right font-bold text-[#0F172A] text-lg">{delay} Min</div>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-xl text-center">
              <div className="text-sm font-bold text-[#64748B] mb-2 uppercase">Mögliche Fahrpreisentschädigung</div>
              <div className="text-5xl font-black text-[#EA580C] mb-8">
                {compensation.toFixed(2).replace('.', ',')} €
              </div>
              <button onClick={() => router.push('/bahn-rebell')} className="bg-[#EA580C] text-white px-8 py-4 rounded font-bold hover:bg-[#C2410C] transition-colors w-full sm:w-auto text-lg">
                Kostenlos prüfen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WARUM VORLAGENBUDE */}
      <section id="warum-vorlagenbude" className="py-24 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-16" style={{ fontFamily: 'var(--font-head)' }}>
            Einfach anfangen. Ohne Software-Zirkus.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left max-w-5xl mx-auto">
            <div>
              <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Direkt nutzbar</h3>
              <p className="text-[#64748B] text-lg leading-relaxed">
                Apps öffnen und loslegen.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Persönliche Daten möglichst lokal</h3>
              <p className="text-[#64748B] text-lg leading-relaxed">
                Nur soweit dies beim jeweiligen Produkt technisch zutrifft.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Konkrete Werkzeuge</h3>
              <p className="text-[#64748B] text-lg leading-relaxed">
                Jede App konzentriert sich auf ein klar umrissenes Alltagsproblem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-[#F5F4F0] py-12 border-t border-[#E2E8F0]">
        <div className="max-w-screen-xl mx-auto px-6 text-center flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-8 mb-6 font-semibold text-sm text-[#0F172A]">
            <Link href="/impressum" className="hover:text-[#EA580C] transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-[#EA580C] transition-colors">Datenschutz</Link>
            <Link href="/agb" className="hover:text-[#EA580C] transition-colors">AGB</Link>
          </div>
          <p className="text-[#64748B] text-sm">© {new Date().getFullYear()} Vorlagenbude. Werkzeuge ersetzen keine Rechtsberatung.</p>
        </div>
      </footer>

    </div>
  );
}
