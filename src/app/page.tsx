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
    <div className="min-h-screen font-sans text-[#0F172A] bg-[#F5F4F0]">
      
      {/* 2. HERO */}
      <section className="pt-24 pb-32 px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="lg:w-1/2 flex flex-col items-start w-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 text-[#0F172A]" style={{ fontFamily: 'var(--font-head)' }}>
              Komplizierte Dinge einfacher machen.
            </h1>
            <p className="text-xl md:text-2xl text-[#0F172A] font-bold leading-relaxed mb-6 max-w-xl">
              Digitale Apps für Bahnärger, Nebenkosten, Abos, Flugprobleme und anderen Alltagskram.
            </p>
            <p className="text-lg text-[#0F172A] leading-relaxed mb-12 max-w-xl">
              Praktische digitale Werkzeuge, mit denen du Dinge nicht nur berechnest, sondern organisierst, dokumentierst und weiterbearbeitest.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full sm:w-auto">
              <button 
                onClick={() => document.getElementById('kern-apps')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#EA580C] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#C2410C] transition-colors w-full sm:w-auto text-center"
              >
                Apps entdecken
              </button>
              <button 
                onClick={() => document.getElementById('kostenlos-testen')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[#0F172A] bg-white border border-[#CBD5E1] px-8 py-4 rounded font-bold text-lg hover:bg-[#F8FAFC] transition-colors w-full sm:w-auto text-center"
              >
                Kostenlos testen
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full hidden md:block">
            {/* HERU VISUAL: RUGIHES, HOCHWERTIGES APP-VISUAL (ABO-KILLER) */}
            <div className="bg-white rounded-xl shadow-xl border border-[#E2E8F0] overflow-hidden flex flex-col h-[520px] max-w-lg ml-auto pointer-events-none">
              {/* App Navigation */}
              <div className="flex items-center gap-6 px-8 py-5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="text-[#0F172A] font-bold text-lg">Abo-Killer</div>
                <div className="flex gap-6 text-sm font-semibold">
                  <span className="text-[#0F172A]">Übersicht</span>
                  <span className="text-[#94A3B8]">Archiv</span>
                </div>
              </div>
              <div className="p-8 flex flex-col gap-8 flex-1 bg-white">
                {/* Kostenübersicht */}
                <div className="flex gap-12 border-b border-[#E2E8F0] pb-8">
                  <div>
                    <div className="text-sm text-[#64748B] font-semibold mb-1">Kosten pro Monat</div>
                    <div className="text-3xl font-bold text-[#0F172A]">127,40 €</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#64748B] font-semibold mb-1">Kosten pro Jahr</div>
                    <div className="text-3xl font-bold text-[#0F172A]">1.528,80 €</div>
                  </div>
                </div>
                {/* Abos */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-[#F1F5F9]">
                    <div>
                      <div className="font-bold text-[#0F172A] text-lg">Fitnessstudio</div>
                      <div className="text-sm text-[#EA580C] font-semibold mt-1">Kündigungsfrist in 18 Tagen</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#0F172A] text-lg">39,90 €</div>
                      <div className="text-[#94A3B8] text-sm">monatlich</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#F1F5F9]">
                    <div>
                      <div className="font-bold text-[#0F172A] text-lg">Streaming Dienst</div>
                      <div className="text-sm text-[#64748B] mt-1">Aktiv</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#0F172A] text-lg">19,99 €</div>
                      <div className="text-[#94A3B8] text-sm">monatlich</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <div className="font-bold text-[#0F172A] text-lg">Musik-Abo</div>
                      <div className="text-sm text-[#64748B] mt-1">Aktiv</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#0F172A] text-lg">14,99 €</div>
                      <div className="text-[#94A3B8] text-sm">monatlich</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. KERN-APPS */}
      <section id="kern-apps" className="pt-24 pb-32 px-6 lg:px-12 max-w-screen-2xl mx-auto border-t border-[#E2E8F0] bg-white">
        <div className="mb-20">
          <div className="text-sm font-bold text-[#64748B] mb-2 uppercase tracking-wide">UNSERE APPS</div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4" style={{ fontFamily: 'var(--font-head)' }}>Welche App hilft dir gerade?</h2>
          <p className="text-xl text-[#0F172A]">Wähle das Thema, das du gerade erledigen möchtest.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20">
          
          {/* ABO-KILLER */}
          <div className="flex flex-col">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl mb-8 aspect-[4/3] flex flex-col overflow-hidden pointer-events-none">
              <div className="px-6 py-4 border-b border-[#E2E8F0] bg-white flex items-center justify-between">
                <div className="font-bold text-[#0F172A]">Abo-Killer</div>
              </div>
              <div className="p-6 flex-1 flex flex-col gap-6">
                <div className="flex justify-between pb-4 border-b border-[#E2E8F0]">
                  <div><div className="text-xs text-[#64748B] mb-1">Jahreskosten</div><div className="text-2xl font-bold text-[#0F172A]">1.018,44 €</div></div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center"><div className="font-semibold text-[#0F172A]">Fitnessstudio</div><div className="font-semibold text-[#0F172A]">39,90 €</div></div>
                  <div className="flex justify-between items-center"><div className="font-semibold text-[#0F172A]">Streaming</div><div className="font-semibold text-[#0F172A]">19,99 €</div></div>
                  <div className="flex justify-between items-center"><div className="font-semibold text-[#0F172A]">Cloud Storage</div><div className="font-semibold text-[#0F172A]">9,99 €</div></div>
                </div>
              </div>
            </div>
            
            <div className="font-bold text-lg mb-2 text-[#EA580C]">Abo-Killer</div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Zu viele Abos und keine Ahnung, was sie zusammen kosten?</h3>
            <p className="text-[#0F172A] mb-6 leading-relaxed">
              Abo-Killer bringt deine laufenden Abos, Kosten, Fristen und Kündigungen an einen Ort. Statt zwischen E-Mails, Kontoauszügen und einzelnen Kundenkonten zu suchen, bekommst du eine zentrale Übersicht über deine laufenden Verträge.
            </p>
            <ul className="space-y-2 mb-8 text-[#0F172A] font-medium flex-1">
              <li>• Abos erfassen und verwalten</li>
              <li>• monatliche und jährliche Kosten überblicken</li>
              <li>• Laufzeiten und Kündigungsfristen im Blick behalten</li>
              <li>• Kündigungen strukturiert vorbereiten</li>
            </ul>
            <button onClick={() => router.push('/abo-killer')} className="bg-[#0F172A] text-white px-6 py-3 rounded font-bold hover:bg-[#1E293B] transition-colors self-start">
              Abo-Killer ansehen
            </button>
          </div>

          {/* BAHN-REBELL */}
          <div className="flex flex-col">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl mb-8 aspect-[4/3] flex flex-col overflow-hidden pointer-events-none">
              <div className="px-6 py-4 border-b border-[#E2E8F0] bg-white flex items-center justify-between">
                <div className="font-bold text-[#0F172A]">Bahn-Rebell</div>
              </div>
              <div className="p-6 flex-1 flex flex-col gap-6">
                <div className="bg-white border border-[#E2E8F0] p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-bold text-[#0F172A] text-lg">ICE 789</div>
                    <div className="text-sm text-[#64748B]">14.10.2025</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#0F172A] text-lg">22,48 €</div>
                    <div className="text-xs font-bold text-[#3498db] bg-[#3498db]/10 px-2 py-1 rounded mt-1">Eingereicht</div>
                  </div>
                </div>
                <div className="bg-white border border-[#E2E8F0] p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-bold text-[#0F172A] text-lg">ICE 102 (Ausfall)</div>
                    <div className="text-sm text-[#64748B]">02.11.2025</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#0F172A] text-lg">34,95 €</div>
                    <div className="text-xs font-bold text-[#f39c12] bg-[#f39c12]/10 px-2 py-1 rounded mt-1">Vorbereitet</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="font-bold text-lg mb-2 text-[#EA580C]">Bahn-Rebell</div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Zug verspätet, ausgefallen oder Anschluss verpasst?</h3>
            <p className="text-[#0F172A] mb-6 leading-relaxed">
              Bahn-Rebell hilft dir, deinen Bahnfall strukturiert zu erfassen, eine mögliche Fahrpreisentschädigung einzuordnen und die nächsten Schritte vorzubereiten. Fahrtdaten, Berechnung und Unterlagen bleiben übersichtlich an einem Ort.
            </p>
            <ul className="space-y-2 mb-8 text-[#0F172A] font-medium flex-1">
              <li>• Fälle bzw. Fahrten erfassen</li>
              <li>• mögliche Fahrpreisentschädigung berechnen</li>
              <li>• relevante Angaben speichern</li>
              <li>• Schreiben bzw. Unterlagen vorbereiten</li>
            </ul>
            <button onClick={() => router.push('/bahn-rebell')} className="bg-[#0F172A] text-white px-6 py-3 rounded font-bold hover:bg-[#1E293B] transition-colors self-start">
              Bahn-Rebell ansehen
            </button>
          </div>

          {/* NEBENKOSTEN-REBELL */}
          <div className="flex flex-col">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl mb-8 aspect-[4/3] flex flex-col overflow-hidden pointer-events-none">
              <div className="px-6 py-4 border-b border-[#E2E8F0] bg-white flex items-center justify-between">
                <div className="font-bold text-[#0F172A]">Nebenkosten-Rebell</div>
              </div>
              <div className="p-6 flex-1 flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="flex-1 bg-white border border-[#E2E8F0] p-4 rounded-lg text-center">
                    <div className="text-xs text-[#64748B] mb-1">Vorjahr</div>
                    <div className="font-bold text-[#0F172A] text-lg">2.290 €</div>
                  </div>
                  <div className="flex-1 bg-white border border-[#E2E8F0] p-4 rounded-lg text-center">
                    <div className="text-xs text-[#64748B] mb-1">Aktuell</div>
                    <div className="font-bold text-[#0F172A] text-lg">2.780 €</div>
                  </div>
                </div>
                <div className="bg-white border border-[#E2E8F0] rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-semibold text-[#0F172A]">Heizkosten</div>
                    <div className="font-semibold text-[#EA580C]">+34 %</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-[#0F172A]">Kaltwasser</div>
                    <div className="font-semibold text-[#0F172A]">+2 %</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="font-bold text-lg mb-2 text-[#EA580C]">Nebenkosten-Rebell</div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Nebenkostenabrechnung bekommen – aber kaum nachvollziehbar, woher die Nachzahlung kommt?</h3>
            <p className="text-[#0F172A] mb-6 leading-relaxed">
              Nebenkosten-Rebell hilft dir, deine Abrechnung strukturiert auseinanderzunehmen. Kostenpositionen, Vorauszahlungen und Veränderungen werden übersichtlich aufbereitet, damit du besser nachvollziehen kannst, wie sich das Ergebnis zusammensetzt.
            </p>
            <ul className="space-y-2 mb-8 text-[#0F172A] font-medium flex-1">
              <li>• Abrechnungsdaten erfassen</li>
              <li>• Kostenpositionen strukturieren</li>
              <li>• Vorauszahlungen und Gesamtkosten vergleichen</li>
              <li>• Veränderungen nachvollziehen</li>
            </ul>
            <button onClick={() => router.push('/nebenkosten-rebell')} className="bg-[#0F172A] text-white px-6 py-3 rounded font-bold hover:bg-[#1E293B] transition-colors self-start">
              Nebenkosten-Rebell ansehen
            </button>
          </div>

          {/* FLUG-REBELL */}
          <div className="flex flex-col">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl mb-8 aspect-[4/3] flex flex-col overflow-hidden pointer-events-none">
              <div className="px-6 py-4 border-b border-[#E2E8F0] bg-white flex items-center justify-between">
                <div className="font-bold text-[#0F172A]">Flug-Rebell</div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center">
                <div className="bg-white border border-[#E2E8F0] p-6 rounded-lg shadow-sm">
                  <div className="text-xs text-[#64748B] mb-1 font-bold">Fall-Akte</div>
                  <div className="text-2xl font-bold text-[#0F172A] mb-6">LH 1450</div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-[#F1F5F9] pb-2">
                      <span className="text-[#64748B]">Geplante Ankunft</span>
                      <span className="font-bold text-[#0F172A]">14:20</span>
                    </div>
                    <div className="flex justify-between border-b border-[#F1F5F9] pb-2">
                      <span className="text-[#64748B]">Tatsächliche Ankunft</span>
                      <span className="font-bold text-[#0F172A]">18:05</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Anspruch</span>
                      <span className="font-bold text-[#EA580C]">1.200 €</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="font-bold text-lg mb-2 text-[#EA580C]">Flug-Rebell</div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Flug verspätet, gestrichen oder Anschluss verpasst?</h3>
            <p className="text-[#0F172A] mb-6 leading-relaxed">
              Flug-Rebell hilft dir, deinen Fall strukturiert einzuordnen und die nächsten Schritte vorzubereiten. Flugdaten, mögliche Entschädigung, zusätzliche Kosten und Schreiben lassen sich in einem nachvollziehbaren Ablauf organisieren.
            </p>
            <ul className="space-y-2 mb-8 text-[#0F172A] font-medium flex-1">
              <li>• Flugdaten und Fall erfassen</li>
              <li>• mögliche Entschädigung einordnen</li>
              <li>• Zusatzkosten dokumentieren</li>
              <li>• Schreiben vorbereiten</li>
            </ul>
            <button onClick={() => router.push('/flug-rebell')} className="bg-[#0F172A] text-white px-6 py-3 rounded font-bold hover:bg-[#1E293B] transition-colors self-start">
              Flug-Rebell ansehen
            </button>
          </div>

        </div>
      </section>

      {/* 4. WEITERE APPS */}
      <section className="pt-24 pb-24 px-6 lg:px-12 max-w-screen-2xl mx-auto border-t border-[#E2E8F0]">
        <h2 className="text-3xl font-extrabold text-[#0F172A] mb-12" style={{ fontFamily: 'var(--font-head)' }}>Weitere digitale Helfer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl flex flex-col shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-[#0F172A]">Retouren-Rebell</h3>
            <p className="text-[#0F172A] text-sm mb-6 flex-1 leading-relaxed">
              Rücksendungen, Paketverluste und Erstattungen übersichtlich nachverfolgen und dokumentieren.
            </p>
            <Link href="/retouren-rebell" className="text-[#EA580C] font-bold text-sm hover:underline">Ansehen &rarr;</Link>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl flex flex-col shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-[#0F172A]">Behörden Shield</h3>
            <p className="text-[#0F172A] text-sm mb-6 flex-1 leading-relaxed">
              Behördenvorgänge übersichtlicher strukturieren und passende nächste Schritte bzw. Schreiben vorbereiten.
            </p>
            <Link href="/behoerden-shield" className="text-[#EA580C] font-bold text-sm hover:underline">Ansehen &rarr;</Link>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl flex flex-col shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-[#0F172A]">Digitales Schutzschild</h3>
            <p className="text-[#0F172A] text-sm mb-6 flex-1 leading-relaxed">
              Datenschutzanfragen, Kontolöschungen und Widersprüche strukturieren und an Anbieter senden.
            </p>
            <Link href="/digital-schutzschild" className="text-[#EA580C] font-bold text-sm hover:underline">Ansehen &rarr;</Link>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl flex flex-col shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-[#0F172A]">Lebenslagen-Lotse</h3>
            <p className="text-[#0F172A] text-sm mb-6 flex-1 leading-relaxed">
              Komplexe Alltagssituationen in konkrete Aufgaben zerlegen und eine nachvollziehbare Struktur schaffen.
            </p>
            <Link href="/lebenslagen-lotse" className="text-[#EA580C] font-bold text-sm hover:underline">Ansehen &rarr;</Link>
          </div>
        </div>
      </section>

      {/* 5. KOSTENLOS TESTEN */}
      <section id="kostenlos-testen" className="py-24 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-screen-md mx-auto px-6 text-center">
          <div className="text-sm font-bold text-[#64748B] mb-2 uppercase tracking-wide">KOSTENLOS TESTEN</div>
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-6" style={{ fontFamily: 'var(--font-head)' }}>Erst mal ausprobieren?</h2>
          <p className="text-xl text-[#0F172A] mb-12">
            Mit Bahn-Rebell Free kannst du kostenlos eine erste mögliche Fahrpreisentschädigung prüfen.
          </p>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-8 text-left shadow-sm">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#E2E8F0]">
              <div className="font-bold text-[#0F172A]">Bahn-Rebell Schnellcheck</div>
              <div className="text-xs font-bold text-white bg-[#EA580C] px-3 py-1 rounded uppercase tracking-wider">Kostenloser Schnellcheck</div>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block font-bold text-[#0F172A] mb-2">Ticketpreis (Einzelfahrt)</label>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    value={ticketPrice} 
                    onChange={e => setTicketPrice(parseFloat(e.target.value))}
                    className="w-full max-w-[200px] border border-[#CBD5E1] p-3 rounded font-bold text-[#0F172A]"
                  />
                  <span className="ml-3 font-bold text-[#64748B]">€</span>
                </div>
              </div>
              <div>
                <label className="block font-bold text-[#0F172A] mb-2">Verspätung am Zielort</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="0" max="180" step="15"
                    value={delay} 
                    onChange={e => setDelay(parseInt(e.target.value))}
                    className="flex-1 accent-[#EA580C]"
                  />
                  <div className="w-20 text-right font-bold text-[#0F172A]">{delay} Min</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] p-6 rounded-lg text-center">
              <div className="text-sm font-bold text-[#64748B] mb-2 uppercase">Mögliche Fahrpreisentschädigung</div>
              <div className="text-4xl font-black text-[#EA580C] mb-6">
                {compensation.toFixed(2).replace('.', ',')} €
              </div>
              <button onClick={() => router.push('/bahn-rebell')} className="bg-[#0F172A] text-white px-8 py-4 rounded font-bold hover:bg-[#1E293B] transition-colors w-full sm:w-auto">
                Kostenlos prüfen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WARUM VORLAGENBUDE */}
      <section id="warum-vorlagenbude" className="py-24 bg-[#F5F4F0] border-t border-[#E2E8F0]">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-16 text-center" style={{ fontFamily: 'var(--font-head)' }}>
            Einfach anfangen. Ohne Software-Zirkus.
          </h2>
          
          <div className="flex flex-col md:flex-row gap-12 max-w-4xl mx-auto">
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Direkt nutzbar</h3>
              <p className="text-[#0F172A] text-lg leading-relaxed">
                Apps öffnen und loslegen.
              </p>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Persönliche Daten möglichst lokal</h3>
              <p className="text-[#0F172A] text-lg leading-relaxed">
                Nur soweit dies beim jeweiligen Produkt technisch zutrifft.
              </p>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Konkrete Werkzeuge</h3>
              <p className="text-[#0F172A] text-lg leading-relaxed">
                Jede App konzentriert sich auf ein klar umrissenes Alltagsproblem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-white py-12 border-t border-[#E2E8F0]">
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
