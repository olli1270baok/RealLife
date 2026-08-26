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
    <div className="min-h-screen font-sans text-[#1e3a8a] bg-[#F5F4F0] overflow-hidden">
      
      {/* 2. PREMIUM HERO */}
      <section className="relative pt-24 pb-32 px-6 lg:px-12 max-w-screen-2xl mx-auto">
        {/* Soft Animated Background Blobs: Steel Blue & Soft Orange Harmony */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#93c5fd] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#fed7aa] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-[#bfdbfe] rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob animation-delay-4000 pointer-events-none"></div>

        <div className="relative flex flex-col lg:flex-row gap-16 lg:gap-24 items-center z-10">
          
          <div className="lg:w-1/2 flex flex-col items-start w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-[#bfdbfe] shadow-sm backdrop-blur-md mb-8">
              <span className="flex h-2 w-2 rounded-full bg-[#EA580C]"></span>
              <span className="text-sm font-semibold text-[#1e40af]">Digitale Alltags-Helfer</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.05] mb-8 text-[#1e3a8a]" style={{ fontFamily: 'var(--font-head)' }}>
              Komplizierte Dinge einfacher machen.
            </h1>
            <p className="text-xl md:text-2xl text-[#1e3a8a] font-medium leading-relaxed mb-6 max-w-xl">
              Digitale Apps für Bahnärger, Nebenkosten, Abos, Flugprobleme und anderen Alltagskram.
            </p>
            <p className="text-lg text-[#3b82f6] font-medium leading-relaxed mb-12 max-w-xl">
              Praktische digitale Werkzeuge, mit denen du Dinge nicht nur berechnest, sondern organisierst, dokumentierst und weiterbearbeitest.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full sm:w-auto">
              <button 
                onClick={() => document.getElementById('kern-apps')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-[#EA580C] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#C2410C] transition-all w-full sm:w-auto text-center shadow-lg shadow-[#EA580C]/20 hover:shadow-xl hover:shadow-[#EA580C]/30 hover:-translate-y-0.5"
              >
                Apps entdecken
              </button>
              <button 
                onClick={() => document.getElementById('kostenlos-testen')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[#1e3a8a] bg-white/50 backdrop-blur-sm border border-[#bfdbfe] px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:shadow-sm transition-all w-full sm:w-auto text-center"
              >
                Kostenlos testen
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            {/* HERO BROWSER WINDOW - DOM UI SCREENSHOT */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#93c5fd] to-[#fed7aa] rounded-[1.5rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative aspect-[4/3] md:aspect-[16/10] bg-[#eff6ff] rounded-2xl shadow-2xl border border-[#dbeafe] overflow-hidden flex flex-col">
                <div className="h-10 bg-white border-b border-[#dbeafe] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#bfdbfe]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#bfdbfe]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#bfdbfe]"></div>
                  <div className="ml-4 flex-1 h-5 bg-[#eff6ff] rounded-md border border-[#dbeafe]"></div>
                </div>
                
                {/* Dashboard-like UI */}
                <div className="flex-1 bg-white relative p-6 flex flex-col gap-4 overflow-hidden">
                   <div className="flex justify-between items-center mb-2">
                      <div className="w-32 h-6 bg-[#eff6ff] rounded-md"></div>
                      <div className="w-10 h-10 rounded-full bg-[#bfdbfe]/30"></div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 flex flex-col justify-between">
                         <div className="w-12 h-4 bg-[#e2e8f0] rounded"></div>
                         <div className="w-20 h-6 bg-[#1e3a8a] rounded"></div>
                      </div>
                      <div className="h-24 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 flex flex-col justify-between">
                         <div className="w-12 h-4 bg-[#e2e8f0] rounded"></div>
                         <div className="w-20 h-6 bg-[#ea580c] rounded"></div>
                      </div>
                   </div>
                   <div className="flex-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl mt-2 p-4">
                      <div className="w-full h-4 bg-[#e2e8f0] rounded mb-4"></div>
                      <div className="w-3/4 h-4 bg-[#e2e8f0] rounded mb-4"></div>
                      <div className="w-5/6 h-4 bg-[#e2e8f0] rounded"></div>
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. KERN-APPS (HIGH-END 2x2 GRID) */}
      <section id="kern-apps" className="bg-white relative py-24 px-6 lg:px-12 border-t border-[#dbeafe]">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eff6ff] border border-[#bfdbfe] mb-6">
              <span className="text-xs font-bold text-[#1e40af] uppercase tracking-widest">UNSERE APPS</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1e3a8a] tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>Welche App hilft dir gerade?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* ABO-KILLER */}
            <div className="flex flex-col group bg-white border border-[#dbeafe] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-[16/10] bg-[#eff6ff] overflow-hidden flex flex-col border-b border-[#dbeafe]">
                <div className="h-10 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#cbd5e1]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#cbd5e1]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#cbd5e1]"></div>
                  <div className="ml-4 text-[10px] font-bold text-[#64748b]">Abo-Killer</div>
                </div>
                {/* DOM UI SCREENSHOT: Abo-Killer */}
                <div className="flex-1 bg-[#f8fafc] p-6 relative">
                  <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5 h-full flex flex-col">
                    <div className="flex justify-between items-end mb-6">
                       <div>
                          <div className="text-xs font-bold text-[#64748b] mb-1">Monatliche Kosten</div>
                          <div className="text-3xl font-black text-[#1e3a8a]">89,95 <span className="text-lg text-[#94a3b8]">€</span></div>
                       </div>
                       <div className="bg-[#eff6ff] text-[#1e40af] px-3 py-1 rounded-full text-xs font-bold border border-[#bfdbfe]">6 Aktive Abos</div>
                    </div>
                    <div className="space-y-3">
                       <div className="flex justify-between items-center p-3 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-md bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">N</div>
                             <div>
                                <div className="text-sm font-bold text-[#1e3a8a]">Netflix</div>
                                <div className="text-[10px] text-[#64748b]">Monatlich</div>
                             </div>
                          </div>
                          <div className="text-sm font-bold text-[#ea580c]">17,99 €</div>
                       </div>
                       <div className="flex justify-between items-center p-3 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-md bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">S</div>
                             <div>
                                <div className="text-sm font-bold text-[#1e3a8a]">Spotify</div>
                                <div className="text-[10px] text-[#64748b]">Monatlich</div>
                             </div>
                          </div>
                          <div className="text-sm font-bold text-[#ea580c]">14,99 €</div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#bfdbfe] shadow-sm flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1e3a8a]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                  <div className="text-sm font-bold text-[#1e3a8a] uppercase tracking-widest">Abo-Killer</div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-[#1e3a8a] tracking-tight mb-4 leading-snug">
                  Zu viele Abos und keine Ahnung, was sie zusammen kosten?
                </h3>
                <p className="text-[#1e40af] text-base mb-2 leading-relaxed">
                  Abo-Killer bringt deine laufenden Abos, Kosten, Fristen und Kündigungen an einen Ort. Statt zwischen E-Mails, Kontoauszügen und einzelnen Kundenkonten zu suchen, bekommst du eine klare Übersicht über alles, was noch läuft.
                </p>
                <p className="text-[#ea580c] font-bold text-sm mb-6">Damit du nicht erst auf der Abrechnung merkst, was eigentlich alles noch aktiv ist.</p>
                
                <ul className="space-y-3 mb-10 flex-1">
                  {['Abos übersichtlich erfassen und verwalten', 'monatliche und jährliche Gesamtkosten im Blick behalten', 'Laufzeiten und Kündigungsfristen besser organisieren', 'Daten speichern, sichern und später weiterbearbeiten'].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#EA580C]/10 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-[#1e3a8a] font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => router.push('/abo-killer')} className="bg-[#1e3a8a] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#172554] shadow-md shadow-[#1e3a8a]/10 transition-all text-center w-full">
                  Abo-Killer ansehen
                </button>
              </div>
            </div>

            {/* BAHN-REBELL */}
            <div className="flex flex-col group bg-white border border-[#dbeafe] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-[16/10] bg-[#eff6ff] overflow-hidden flex flex-col border-b border-[#dbeafe]">
                <div className="h-10 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#cbd5e1]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#cbd5e1]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#cbd5e1]"></div>
                  <div className="ml-4 text-[10px] font-bold text-[#64748b]">Bahn-Rebell</div>
                </div>
                {/* DOM UI SCREENSHOT: Bahn-Rebell */}
                <div className="flex-1 bg-[#f8fafc] p-6 relative">
                  <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#f1f5f9]">
                       <div className="w-10 h-10 rounded-full bg-[#eff6ff] text-[#1e40af] flex items-center justify-center font-bold">ICE</div>
                       <div>
                          <div className="text-sm font-bold text-[#1e3a8a]">München Hbf → Berlin Hbf</div>
                          <div className="text-xs text-[#ea580c] font-bold">+ 145 Min. Verspätung</div>
                       </div>
                    </div>
                    <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-4 mb-4">
                       <div className="text-xs font-bold text-[#1e40af] mb-1">Mögliche Entschädigung</div>
                       <div className="text-2xl font-black text-[#1e3a8a]">50% <span className="text-sm font-normal text-[#3b82f6]">des Ticketpreises</span></div>
                    </div>
                    <div className="flex gap-2 mt-auto">
                       <div className="flex-1 h-8 bg-[#1e3a8a] rounded-lg opacity-90"></div>
                       <div className="w-1/3 h-8 bg-[#e2e8f0] rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#eff6ff] border border-[#dbeafe] shadow-sm flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1e3a8a]"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><path d="M4 14h16"></path><path d="M4 10h16"></path></svg>
                  </div>
                  <div className="text-sm font-bold text-[#1e3a8a] uppercase tracking-widest">Bahn-Rebell</div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-[#1e3a8a] tracking-tight mb-4 leading-snug">
                  Zug verspätet, ausgefallen oder Anschluss verpasst?
                </h3>
                <p className="text-[#1e40af] text-base mb-2 leading-relaxed">
                  Bahn-Rebell hilft dir, deinen Bahnfall strukturiert zu erfassen, eine mögliche Fahrpreisentschädigung einzuordnen und die nächsten Schritte vorzubereiten. Fahrtdaten, Berechnung und Unterlagen bleiben dabei übersichtlich an einem Ort.
                </p>
                <p className="text-[#ea580c] font-bold text-sm mb-6">Aus Bahnärger wird ein klarer nächster Schritt.</p>

                <ul className="space-y-3 mb-10 flex-1">
                  {['mögliche Fahrpreisentschädigung prüfen', 'Fahrten bzw. Fälle erfassen und speichern', 'relevante Angaben und Zusatzinfos übersichtlich sammeln', 'Schreiben vorbereiten, kopieren, drucken oder exportieren'].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#EA580C]/10 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-[#1e3a8a] font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3">
                  <button onClick={() => router.push('/bahn-rebell')} className="bg-[#1e3a8a] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#172554] shadow-md shadow-[#1e3a8a]/10 transition-all text-center w-full">
                    Bahn-Rebell ansehen
                  </button>
                  <button onClick={() => document.getElementById('kostenlos-testen')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-[#1e3a8a] border border-[#dbeafe] px-6 py-4 rounded-xl font-bold hover:bg-[#eff6ff] transition-all text-center w-full">
                    Kostenlos ausprobieren
                  </button>
                </div>
              </div>
            </div>

            {/* NEBENKOSTEN-REBELL */}
            <div className="flex flex-col group bg-white border border-[#dbeafe] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-[16/10] bg-[#eff6ff] overflow-hidden flex flex-col border-b border-[#dbeafe]">
                <div className="h-10 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#cbd5e1]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#cbd5e1]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#cbd5e1]"></div>
                  <div className="ml-4 text-[10px] font-bold text-[#64748b]">Nebenkosten-Rebell</div>
                </div>
                {/* DOM UI SCREENSHOT: Nebenkosten */}
                <div className="flex-1 bg-[#f8fafc] p-6 relative">
                  <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5 h-full flex flex-col">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                       <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                          <div className="text-[10px] font-bold text-red-600 uppercase">Nachzahlung</div>
                          <div className="text-lg font-black text-red-700">482,50 €</div>
                       </div>
                       <div className="p-3 bg-[#eff6ff] rounded-lg border border-[#bfdbfe]">
                          <div className="text-[10px] font-bold text-[#1e40af] uppercase">Vorauszahlung</div>
                          <div className="text-lg font-black text-[#1e3a8a]">1.200,00 €</div>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between items-center text-xs p-2 bg-[#f8fafc] rounded border border-[#e2e8f0]">
                          <span className="font-bold text-[#334155]">Heizkosten</span>
                          <span className="font-bold text-[#ea580c]">+ 15%</span>
                       </div>
                       <div className="flex justify-between items-center text-xs p-2 bg-[#f8fafc] rounded border border-[#e2e8f0]">
                          <span className="font-bold text-[#334155]">Kaltwasser</span>
                          <span className="font-bold text-green-600">- 4%</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#bfdbfe] shadow-sm flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1e3a8a]"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                  </div>
                  <div className="text-sm font-bold text-[#1e3a8a] uppercase tracking-widest">Nebenkosten-Rebell</div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-[#1e3a8a] tracking-tight mb-4 leading-snug">
                  Nebenkostenabrechnung bekommen – aber kaum nachvollziehbar, woher die Nachzahlung kommt?
                </h3>
                <p className="text-[#1e40af] text-base mb-2 leading-relaxed">
                  Nebenkosten-Rebell hilft dir, deine Abrechnung strukturiert auseinanderzunehmen. Kostenpositionen, Vorauszahlungen und Veränderungen werden übersichtlicher dargestellt, damit du besser nachvollziehen kannst, wie sich das Ergebnis zusammensetzt.
                </p>
                <p className="text-[#ea580c] font-bold text-sm mb-6">Nicht nur sehen, was du nachzahlen sollst. Verstehen, wie die Abrechnung zustande kommt.</p>

                <ul className="space-y-3 mb-10 flex-1">
                  {['Abrechnungsdaten strukturiert erfassen', 'Kostenpositionen übersichtlich prüfen', 'Vorauszahlungen und Gesamtkosten gegenüberstellen', 'Veränderungen und offene Punkte nachvollziehbar festhalten'].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#EA580C]/10 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-[#1e3a8a] font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => router.push('/nebenkosten-rebell')} className="bg-[#1e3a8a] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#172554] shadow-md shadow-[#1e3a8a]/10 transition-all text-center w-full">
                  Nebenkosten-Rebell ansehen
                </button>
              </div>
            </div>

            {/* FLUG-REBELL */}
            <div className="flex flex-col group bg-white border border-[#dbeafe] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-[16/10] bg-[#eff6ff] overflow-hidden flex flex-col border-b border-[#dbeafe]">
                <div className="h-10 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#cbd5e1]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#cbd5e1]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#cbd5e1]"></div>
                  <div className="ml-4 text-[10px] font-bold text-[#64748b]">Flug-Rebell</div>
                </div>
                {/* DOM UI SCREENSHOT: Flug-Rebell */}
                <div className="flex-1 bg-[#f8fafc] p-6 relative">
                  <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                       <div className="text-2xl font-black text-[#1e3a8a]">FRA</div>
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#94a3b8]"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 4-4 4-2.8-.9c-.4-.1-.8.1-1 .5L1 17l5 2 2 5c.4-.2.6-.6.5-1l-.9-2.8 4-4 4 6l1.2-.7c.4-.2.7-.6.6-1.1z"></path></svg>
                       <div className="text-2xl font-black text-[#1e3a8a]">JFK</div>
                    </div>
                    <div className="text-center text-xs font-bold text-red-600 bg-red-50 py-2 rounded-lg border border-red-100 mb-4">Flug gestrichen</div>
                    <div className="space-y-2 mt-auto">
                       <div className="h-6 w-full bg-[#f8fafc] rounded border border-[#e2e8f0]"></div>
                       <div className="h-6 w-3/4 bg-[#f8fafc] rounded border border-[#e2e8f0]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#eff6ff] border border-[#dbeafe] shadow-sm flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1e3a8a]"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 4-4 4-2.8-.9c-.4-.1-.8.1-1 .5L1 17l5 2 2 5c.4-.2.6-.6.5-1l-.9-2.8 4-4 4 6l1.2-.7c.4-.2.7-.6.6-1.1z"></path></svg>
                  </div>
                  <div className="text-sm font-bold text-[#1e3a8a] uppercase tracking-widest">Flug-Rebell</div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-[#1e3a8a] tracking-tight mb-4 leading-snug">
                  Flug verspätet, gestrichen oder Anschluss verpasst?
                </h3>
                <p className="text-[#1e40af] text-base mb-2 leading-relaxed">
                  Flug-Rebell hilft dir, deinen Fall strukturiert einzuordnen und die nächsten Schritte vorzubereiten. Flugdaten, mögliche Entschädigung, zusätzliche Kosten und Schreiben lassen sich in einem nachvollziehbaren Ablauf organisieren.
                </p>
                <p className="text-[#ea580c] font-bold text-sm mb-6">Flug vorbei. Papierkram noch nicht.</p>

                <ul className="space-y-3 mb-10 flex-1">
                  {['Flugdaten und Fall erfassen', 'mögliche Entschädigung einordnen', 'zusätzliche Kosten dokumentieren', 'Schreiben bzw. Mahnstufen strukturiert weiterverwenden'].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#EA580C]/10 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-[#1e3a8a] font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => router.push('/flug-rebell')} className="bg-[#1e3a8a] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#172554] shadow-md shadow-[#1e3a8a]/10 transition-all text-center w-full">
                  Flug-Rebell ansehen
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WEITERE APPS */}
      <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto bg-white border-t border-[#dbeafe]">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] tracking-tight mb-12 text-center" style={{ fontFamily: 'var(--font-head)' }}>Weitere digitale Helfer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group bg-[#eff6ff] border border-[#dbeafe] p-8 rounded-2xl flex flex-col hover:bg-white hover:shadow-xl hover:border-[#bfdbfe] transition-all hover:-translate-y-1">
            <h3 className="font-bold text-xl mb-3 text-[#1e3a8a]">Retouren-Rebell</h3>
            <div className="font-bold text-sm text-[#ea580c] mb-2 leading-snug">Retoure abgeschickt – aber die Erstattung lässt auf sich warten?</div>
            <p className="text-[#1e40af] text-sm mb-8 flex-1 leading-relaxed">Retouren-Rebell hilft dir, Rücksendungen, offene Erstattungen und den weiteren Vorgang übersichtlich zu organisieren. So bleibt nachvollziehbar, was zurückgeschickt wurde und was noch offen ist.</p>
            <Link href="/retouren-rebell" className="text-[#1e3a8a] font-bold text-sm inline-flex items-center gap-1 group-hover:text-[#EA580C] transition-colors">Retouren-Rebell ansehen <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></Link>
          </div>
          
          <div className="group bg-[#eff6ff] border border-[#dbeafe] p-8 rounded-2xl flex flex-col hover:bg-white hover:shadow-xl hover:border-[#bfdbfe] transition-all hover:-translate-y-1">
            <h3 className="font-bold text-xl mb-3 text-[#1e3a8a]">Behörden Shield</h3>
            <div className="font-bold text-sm text-[#ea580c] mb-2 leading-snug">Behördenpost bekommen und erstmal nicht wissen, was jetzt zu tun ist?</div>
            <p className="text-[#1e40af] text-sm mb-8 flex-1 leading-relaxed">Behörden Shield hilft dir, Vorgänge übersichtlicher zu strukturieren und passende nächste Schritte oder Schreiben vorzubereiten. So bleibt ein Fall nachvollziehbar, statt im Papierchaos unterzugehen.</p>
            <Link href="/behoerden-shield" className="text-[#1e3a8a] font-bold text-sm inline-flex items-center gap-1 group-hover:text-[#EA580C] transition-colors">Behörden Shield ansehen <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></Link>
          </div>
          
          <div className="group bg-[#eff6ff] border border-[#dbeafe] p-8 rounded-2xl flex flex-col hover:bg-white hover:shadow-xl hover:border-[#bfdbfe] transition-all hover:-translate-y-1">
            <h3 className="font-bold text-xl mb-3 text-[#1e3a8a]">Digitales Schutzschild</h3>
            <div className="font-bold text-sm text-[#ea580c] mb-2 leading-snug">Wichtige Themen an einem Ort.</div>
            <p className="text-[#1e40af] text-sm mb-8 flex-1 leading-relaxed">Ein digitaler Helfer, der wichtige Informationen, Vorgänge oder Schutz-Themen strukturiert an einem Ort zusammenführt.</p>
            <Link href="/digital-schutzschild" className="text-[#1e3a8a] font-bold text-sm inline-flex items-center gap-1 group-hover:text-[#EA580C] transition-colors">Digitales Schutzschild ansehen <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></Link>
          </div>
          
          <div className="group bg-[#eff6ff] border border-[#dbeafe] p-8 rounded-2xl flex flex-col hover:bg-white hover:shadow-xl hover:border-[#bfdbfe] transition-all hover:-translate-y-1">
            <h3 className="font-bold text-xl mb-3 text-[#1e3a8a]">Lebenslagen-Lotse</h3>
            <div className="font-bold text-sm text-[#ea580c] mb-2 leading-snug">Alltag in Aufgaben zerlegen.</div>
            <p className="text-[#1e40af] text-sm mb-8 flex-1 leading-relaxed">Ein digitaler Helfer, der komplexere Alltagssituationen in klare Aufgaben und nächste Schritte zerlegt.</p>
            <Link href="/lebenslagen-lotse" className="text-[#1e3a8a] font-bold text-sm inline-flex items-center gap-1 group-hover:text-[#EA580C] transition-colors">Lebenslagen-Lotse ansehen <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></Link>
          </div>
        </div>
      </section>

      {/* 5. KOSTENLOS TESTEN (HIGH END) */}
      <section id="kostenlos-testen" className="py-24 bg-[#eff6ff] border-t border-[#dbeafe] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#bfdbfe]/40 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-screen-md mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#dbeafe] mb-6 shadow-sm">
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-widest">KOSTENLOS TESTEN</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1e3a8a] tracking-tight mb-6" style={{ fontFamily: 'var(--font-head)' }}>Erst mal ausprobieren?</h2>
          <p className="text-xl text-[#3b82f6] mb-12">
            Mit Bahn-Rebell Free kannst du kostenlos eine erste mögliche Fahrpreisentschädigung prüfen.
          </p>

          <div className="glass-card rounded-[2rem] p-8 lg:p-12 text-left relative overflow-hidden border-[#bfdbfe]">
            
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-[#dbeafe]/50">
              <div className="font-bold text-[#1e3a8a] text-xl">Bahn-Rebell Schnellcheck</div>
              <div className="text-xs font-bold text-[#EA580C] bg-[#EA580C]/10 px-3 py-1.5 rounded-full uppercase tracking-wider border border-[#EA580C]/20">Gratis Check</div>
            </div>

            <div className="space-y-8 mb-12">
              <div>
                <label className="block font-bold text-[#1e40af] mb-3 text-sm uppercase tracking-wide">Ticketpreis (Einzelfahrt)</label>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    value={ticketPrice} 
                    onChange={e => setTicketPrice(parseFloat(e.target.value))}
                    className="w-full max-w-[200px] bg-white border border-[#bfdbfe] p-4 rounded-xl font-bold text-[#1e3a8a] text-xl shadow-sm focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] outline-none transition-all"
                  />
                  <span className="ml-4 font-bold text-[#93c5fd] text-xl">€</span>
                </div>
              </div>
              <div>
                <label className="block font-bold text-[#1e40af] mb-3 text-sm uppercase tracking-wide">Verspätung am Zielort</label>
                <div className="flex items-center gap-6 bg-white p-4 rounded-xl border border-[#bfdbfe] shadow-sm">
                  <input 
                    type="range" 
                    min="0" max="180" step="15"
                    value={delay} 
                    onChange={e => setDelay(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <div className="w-24 text-right font-bold text-[#1e3a8a] text-xl border-l border-[#dbeafe] pl-4">{delay} Min</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#bfdbfe] p-8 rounded-2xl text-center shadow-sm">
              <div className="text-sm font-bold text-[#1e40af] mb-3 uppercase tracking-wide">Mögliche Fahrpreisentschädigung</div>
              <div className="text-6xl font-black text-[#1e3a8a] tracking-tighter mb-8">
                {compensation.toFixed(2).replace('.', ',')} <span className="text-[#93c5fd]">€</span>
              </div>
              <button onClick={() => router.push('/bahn-rebell')} className="bg-[#EA580C] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#C2410C] shadow-lg shadow-[#EA580C]/20 hover:shadow-xl transition-all w-full sm:w-auto text-lg">
                Kostenlos prüfen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WARUM VORLAGENBUDE */}
      <section id="warum-vorlagenbude" className="py-24 bg-white border-t border-[#dbeafe]">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1e3a8a] tracking-tight mb-16" style={{ fontFamily: 'var(--font-head)' }}>
            Einfach anfangen.<br/>Ohne Software-Zirkus.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-[#eff6ff] border border-[#dbeafe]">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-[#bfdbfe] mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1e3a8a]"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-[#1e3a8a]">Direkt nutzbar</h3>
              <p className="text-[#1e40af] text-lg leading-relaxed">
                Apps öffnen und loslegen. Keine endlosen Setup-Wizards oder Tutorials.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[#eff6ff] border border-[#dbeafe]">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-[#bfdbfe] mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1e3a8a]"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-[#1e3a8a]">Persönliche Daten lokal</h3>
              <p className="text-[#1e40af] text-lg leading-relaxed">
                Wir speichern nur das, was absolut notwendig ist. Der Rest bleibt bei dir.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[#eff6ff] border border-[#dbeafe]">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-[#bfdbfe] mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1e3a8a]"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-[#1e3a8a]">Konkrete Werkzeuge</h3>
              <p className="text-[#1e40af] text-lg leading-relaxed">
                Jede App konzentriert sich auf genau ein klar umrissenes Alltagsproblem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-[#eff6ff] py-12 border-t border-[#dbeafe]">
        <div className="max-w-screen-xl mx-auto px-6 text-center flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-8 mb-8 font-semibold text-sm text-[#1e3a8a]">
            <Link href="/impressum" className="hover:text-[#EA580C] transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-[#EA580C] transition-colors">Datenschutz</Link>
            <Link href="/agb" className="hover:text-[#EA580C] transition-colors">AGB</Link>
          </div>
          <p className="text-[#3b82f6] text-sm">© {new Date().getFullYear()} Vorlagenbude. Werkzeuge ersetzen keine Rechtsberatung.</p>
        </div>
      </footer>

    </div>
  );
}
