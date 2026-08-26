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
    <div className="min-h-screen font-sans text-[#0F172A] bg-[#F5F4F0] overflow-hidden">
      
      {/* 2. PREMIUM HERO */}
      <section className="relative pt-24 pb-32 px-6 lg:px-12 max-w-screen-2xl mx-auto">
        {/* Soft Animated Background Blobs for Premium Feel */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#cbd5e1] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#e2e8f0] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 pointer-events-none"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-[#f8fafc] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000 pointer-events-none"></div>

        <div className="relative flex flex-col lg:flex-row gap-16 lg:gap-24 items-center z-10">
          
          <div className="lg:w-1/2 flex flex-col items-start w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-white/80 shadow-sm backdrop-blur-md mb-8">
              <span className="flex h-2 w-2 rounded-full bg-[#EA580C]"></span>
              <span className="text-sm font-semibold text-[#475569]">Digitale Alltags-Helfer</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.05] mb-8 text-[#0F172A]" style={{ fontFamily: 'var(--font-head)' }}>
              Komplizierte Dinge einfacher machen.
            </h1>
            <p className="text-xl md:text-2xl text-[#0F172A] font-medium leading-relaxed mb-6 max-w-xl">
              Digitale Apps für Bahnärger, Nebenkosten, Abos, Flugprobleme und anderen Alltagskram.
            </p>
            <p className="text-lg text-[#475569] font-medium leading-relaxed mb-12 max-w-xl">
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
                className="text-[#0F172A] bg-white/50 backdrop-blur-sm border border-[#CBD5E1] px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:shadow-sm transition-all w-full sm:w-auto text-center"
              >
                Kostenlos testen
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            {/* HIGH-END MAC-STYLE BROWSER WINDOW PLACEHOLDER */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#cbd5e1] to-[#f1f5f9] rounded-[1.5rem] blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative aspect-[4/3] md:aspect-[16/10] bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col">
                
                {/* Browser Chrome */}
                <div className="h-10 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                </div>

                {/* Content Area / Image Target */}
                <div className="flex-1 bg-white relative flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                  
                  {/* <img src="/images/hero-abo-killer.jpg" alt="Abo-Killer App Ansicht" className="absolute inset-0 w-full h-full object-cover" /> */}
                  
                  <div className="text-[#475569] font-bold flex flex-col items-center gap-4 bg-white/80 px-6 py-4 rounded-xl backdrop-blur-sm border border-[#E2E8F0] shadow-sm">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#94A3B8]"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    <span>Platzhalter: Hero App-Visual (Bild)</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. KERN-APPS (Z-PATTERN, HIGH-END) */}
      <section id="kern-apps" className="bg-white relative">
        <div className="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto text-center border-t border-[#E2E8F0]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] mb-6">
            <span className="text-xs font-bold text-[#475569] uppercase tracking-widest">UNSERE APPS</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-6" style={{ fontFamily: 'var(--font-head)' }}>Welche App hilft dir gerade?</h2>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto">Wähle das Thema, das du gerade erledigen möchtest. Jede App ist spezialisiert auf ein konkretes Alltagsproblem.</p>
        </div>

        {/* ABO-KILLER (Text Links, Bild Rechts) */}
        <div className="relative py-28 border-y border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#e2e8f0]/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="relative px-6 lg:px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-20 items-center z-10">
            <div className="lg:w-5/12 w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#0F172A]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div className="text-sm font-bold text-[#0F172A] uppercase tracking-widest">Abo-Killer</div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-6 leading-[1.15]">
                Zu viele Abos und keine Ahnung, was sie zusammen kosten?
              </h3>
              <p className="text-[#475569] text-lg mb-10 leading-relaxed">
                Abo-Killer bringt deine laufenden Abos, Kosten, Fristen und Kündigungen an einen Ort. Statt zwischen E-Mails, Kontoauszügen und einzelnen Kundenkonten zu suchen, bekommst du eine zentrale Übersicht über deine laufenden Verträge.
              </p>
              
              <ul className="grid grid-cols-1 gap-4 mb-10">
                {['Abos erfassen und verwalten', 'Monatliche & jährliche Kosten überblicken', 'Laufzeiten & Kündigungsfristen im Blick', 'Kündigungen strukturiert vorbereiten'].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#EA580C]/10 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-[#0F172A] font-medium">{text}</span>
                  </li>
                ))}
              </ul>
              
              <button onClick={() => router.push('/abo-killer')} className="bg-[#0F172A] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1E293B] shadow-lg shadow-[#0F172A]/10 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Abo-Killer ansehen
              </button>
            </div>

            <div className="lg:w-7/12 w-full">
              <div className="relative aspect-[4/3] bg-white rounded-[2rem] shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col">
                <div className="h-12 bg-white border-b border-[#F1F5F9] flex items-center px-6 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                </div>
                <div className="flex-1 bg-[#F8FAFC] relative flex items-center justify-center">
                  {/* <img src="/images/app-abo-killer.jpg" alt="Abo-Killer App" className="absolute inset-0 w-full h-full object-cover" /> */}
                  <div className="text-[#475569] font-bold flex flex-col items-center gap-3">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#CBD5E1]"><image href="" /></svg>
                    <span>Bild: Abo-Killer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BAHN-REBELL (Bild Links, Text Rechts) */}
        <div className="relative py-28 bg-white overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#e2e8f0]/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

          <div className="relative px-6 lg:px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center z-10">
            <div className="lg:w-5/12 w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#0F172A]"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><path d="M4 14h16"></path><path d="M4 10h16"></path></svg>
                </div>
                <div className="text-sm font-bold text-[#0F172A] uppercase tracking-widest">Bahn-Rebell</div>
              </div>

              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-6 leading-[1.15]">
                Zug verspätet, ausgefallen oder Anschluss verpasst?
              </h3>
              <p className="text-[#475569] text-lg mb-10 leading-relaxed">
                Bahn-Rebell hilft dir, deinen Bahnfall strukturiert zu erfassen, eine mögliche Fahrpreisentschädigung einzuordnen und die nächsten Schritte vorzubereiten. Fahrtdaten, Berechnung und Unterlagen bleiben übersichtlich an einem Ort.
              </p>
              
              <ul className="grid grid-cols-1 gap-4 mb-10">
                {['Fälle bzw. Fahrten erfassen', 'Mögliche Fahrpreisentschädigung berechnen', 'Relevante Angaben speichern', 'Schreiben bzw. Unterlagen vorbereiten'].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#EA580C]/10 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-[#0F172A] font-medium">{text}</span>
                  </li>
                ))}
              </ul>
              
              <button onClick={() => router.push('/bahn-rebell')} className="bg-[#0F172A] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1E293B] shadow-lg shadow-[#0F172A]/10 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Bahn-Rebell ansehen
              </button>
            </div>

            <div className="lg:w-7/12 w-full">
              <div className="relative aspect-[4/3] bg-white rounded-[2rem] shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col">
                <div className="h-12 bg-white border-b border-[#F1F5F9] flex items-center px-6 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                </div>
                <div className="flex-1 bg-[#F8FAFC] relative flex items-center justify-center">
                  {/* <img src="/images/app-bahn-rebell.jpg" alt="Bahn-Rebell App" className="absolute inset-0 w-full h-full object-cover" /> */}
                  <div className="text-[#475569] font-bold flex flex-col items-center gap-3">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#CBD5E1]"><image href="" /></svg>
                    <span>Bild: Bahn-Rebell</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NEBENKOSTEN-REBELL (Text Links, Bild Rechts) */}
        <div className="relative py-28 border-y border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden">
          <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#e2e8f0]/40 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

          <div className="relative px-6 lg:px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-20 items-center z-10">
            <div className="lg:w-5/12 w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#0F172A]"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                </div>
                <div className="text-sm font-bold text-[#0F172A] uppercase tracking-widest">Nebenkosten-Rebell</div>
              </div>

              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-6 leading-[1.15]">
                Nebenkostenabrechnung kaum nachvollziehbar?
              </h3>
              <p className="text-[#475569] text-lg mb-10 leading-relaxed">
                Nebenkosten-Rebell hilft dir, deine Abrechnung strukturiert auseinanderzunehmen. Kostenpositionen, Vorauszahlungen und Veränderungen werden übersichtlich aufbereitet, damit du besser nachvollziehen kannst, wie sich das Ergebnis zusammensetzt.
              </p>
              
              <ul className="grid grid-cols-1 gap-4 mb-10">
                {['Abrechnungsdaten erfassen', 'Kostenpositionen strukturieren', 'Vorauszahlungen & Gesamtkosten vergleichen', 'Veränderungen nachvollziehen'].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#EA580C]/10 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-[#0F172A] font-medium">{text}</span>
                  </li>
                ))}
              </ul>
              
              <button onClick={() => router.push('/nebenkosten-rebell')} className="bg-[#0F172A] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1E293B] shadow-lg shadow-[#0F172A]/10 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Nebenkosten-Rebell ansehen
              </button>
            </div>

            <div className="lg:w-7/12 w-full">
              <div className="relative aspect-[4/3] bg-white rounded-[2rem] shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col">
                <div className="h-12 bg-white border-b border-[#F1F5F9] flex items-center px-6 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                </div>
                <div className="flex-1 bg-[#F8FAFC] relative flex items-center justify-center">
                  {/* <img src="/images/app-nebenkosten.jpg" alt="Nebenkosten-Rebell App" className="absolute inset-0 w-full h-full object-cover" /> */}
                  <div className="text-[#475569] font-bold flex flex-col items-center gap-3">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#CBD5E1]"><image href="" /></svg>
                    <span>Bild: Nebenkosten-Rebell</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FLUG-REBELL (Bild Links, Text Rechts) */}
        <div className="relative py-28 bg-white border-b border-[#E2E8F0] overflow-hidden">
          <div className="relative px-6 lg:px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center z-10">
            <div className="lg:w-5/12 w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#0F172A]"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 4-4 4-2.8-.9c-.4-.1-.8.1-1 .5L1 17l5 2 2 5c.4-.2.6-.6.5-1l-.9-2.8 4-4 4 6l1.2-.7c.4-.2.7-.6.6-1.1z"></path></svg>
                </div>
                <div className="text-sm font-bold text-[#0F172A] uppercase tracking-widest">Flug-Rebell</div>
              </div>

              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-6 leading-[1.15]">
                Flug verspätet, gestrichen oder Anschluss verpasst?
              </h3>
              <p className="text-[#475569] text-lg mb-10 leading-relaxed">
                Flug-Rebell hilft dir, deinen Fall strukturiert einzuordnen und die nächsten Schritte vorzubereiten. Flugdaten, mögliche Entschädigung, zusätzliche Kosten und Schreiben lassen sich in einem nachvollziehbaren Ablauf organisieren.
              </p>
              
              <ul className="grid grid-cols-1 gap-4 mb-10">
                {['Flugdaten und Fall erfassen', 'Mögliche Entschädigung einordnen', 'Zusatzkosten dokumentieren', 'Schreiben vorbereiten'].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#EA580C]/10 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-[#0F172A] font-medium">{text}</span>
                  </li>
                ))}
              </ul>
              
              <button onClick={() => router.push('/flug-rebell')} className="bg-[#0F172A] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1E293B] shadow-lg shadow-[#0F172A]/10 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Flug-Rebell ansehen
              </button>
            </div>

            <div className="lg:w-7/12 w-full">
              <div className="relative aspect-[4/3] bg-white rounded-[2rem] shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col">
                <div className="h-12 bg-white border-b border-[#F1F5F9] flex items-center px-6 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                </div>
                <div className="flex-1 bg-[#F8FAFC] relative flex items-center justify-center">
                  {/* <img src="/images/app-flug-rebell.jpg" alt="Flug-Rebell App" className="absolute inset-0 w-full h-full object-cover" /> */}
                  <div className="text-[#475569] font-bold flex flex-col items-center gap-3">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#CBD5E1]"><image href="" /></svg>
                    <span>Bild: Flug-Rebell</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 4. WEITERE APPS */}
      <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto bg-white">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-12 text-center" style={{ fontFamily: 'var(--font-head)' }}>Weitere digitale Helfer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-2xl flex flex-col hover:bg-white hover:shadow-xl hover:border-transparent transition-all hover:-translate-y-1">
            <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Retouren-Rebell</h3>
            <p className="text-[#475569] text-sm mb-8 flex-1 leading-relaxed">Rücksendungen, Paketverluste und Erstattungen übersichtlich organisieren.</p>
            <Link href="/retouren-rebell" className="text-[#0F172A] font-bold text-sm inline-flex items-center gap-1 group-hover:text-[#EA580C] transition-colors">Ansehen <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></Link>
          </div>
          <div className="group bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-2xl flex flex-col hover:bg-white hover:shadow-xl hover:border-transparent transition-all hover:-translate-y-1">
            <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Behörden Shield</h3>
            <p className="text-[#475569] text-sm mb-8 flex-1 leading-relaxed">Behördenvorgänge strukturieren und nächste Schritte vorbereiten.</p>
            <Link href="/behoerden-shield" className="text-[#0F172A] font-bold text-sm inline-flex items-center gap-1 group-hover:text-[#EA580C] transition-colors">Ansehen <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></Link>
          </div>
          <div className="group bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-2xl flex flex-col hover:bg-white hover:shadow-xl hover:border-transparent transition-all hover:-translate-y-1">
            <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Digitales Schutzschild</h3>
            <p className="text-[#475569] text-sm mb-8 flex-1 leading-relaxed">Datenschutzanfragen und Löschungen an Anbieter senden.</p>
            <Link href="/digital-schutzschild" className="text-[#0F172A] font-bold text-sm inline-flex items-center gap-1 group-hover:text-[#EA580C] transition-colors">Ansehen <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></Link>
          </div>
          <div className="group bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-2xl flex flex-col hover:bg-white hover:shadow-xl hover:border-transparent transition-all hover:-translate-y-1">
            <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Lebenslagen-Lotse</h3>
            <p className="text-[#475569] text-sm mb-8 flex-1 leading-relaxed">Komplexe Alltagssituationen in Aufgaben und Fristen zerlegen.</p>
            <Link href="/lebenslagen-lotse" className="text-[#0F172A] font-bold text-sm inline-flex items-center gap-1 group-hover:text-[#EA580C] transition-colors">Ansehen <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></Link>
          </div>
        </div>
      </section>

      {/* 5. KOSTENLOS TESTEN (HIGH END) */}
      <section id="kostenlos-testen" className="py-24 bg-[#F8FAFC] border-t border-[#E2E8F0] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#e2e8f0]/40 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-screen-md mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E2E8F0] mb-6 shadow-sm">
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-widest">KOSTENLOS TESTEN</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-6" style={{ fontFamily: 'var(--font-head)' }}>Erst mal ausprobieren?</h2>
          <p className="text-xl text-[#475569] mb-12">
            Mit Bahn-Rebell Free kannst du kostenlos eine erste mögliche Fahrpreisentschädigung prüfen.
          </p>

          <div className="glass-card rounded-[2rem] p-8 lg:p-12 text-left relative overflow-hidden">
            
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-[#E2E8F0]/50">
              <div className="font-bold text-[#0F172A] text-xl">Bahn-Rebell Schnellcheck</div>
              <div className="text-xs font-bold text-[#EA580C] bg-[#EA580C]/10 px-3 py-1.5 rounded-full uppercase tracking-wider border border-[#EA580C]/20">Gratis Check</div>
            </div>

            <div className="space-y-8 mb-12">
              <div>
                <label className="block font-bold text-[#475569] mb-3 text-sm uppercase tracking-wide">Ticketpreis (Einzelfahrt)</label>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    value={ticketPrice} 
                    onChange={e => setTicketPrice(parseFloat(e.target.value))}
                    className="w-full max-w-[200px] bg-white border border-[#CBD5E1] p-4 rounded-xl font-bold text-[#0F172A] text-xl shadow-sm focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] outline-none transition-all"
                  />
                  <span className="ml-4 font-bold text-[#94A3B8] text-xl">€</span>
                </div>
              </div>
              <div>
                <label className="block font-bold text-[#475569] mb-3 text-sm uppercase tracking-wide">Verspätung am Zielort</label>
                <div className="flex items-center gap-6 bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-sm">
                  <input 
                    type="range" 
                    min="0" max="180" step="15"
                    value={delay} 
                    onChange={e => setDelay(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <div className="w-24 text-right font-bold text-[#0F172A] text-xl border-l border-[#E2E8F0] pl-4">{delay} Min</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] p-8 rounded-2xl text-center shadow-sm">
              <div className="text-sm font-bold text-[#475569] mb-3 uppercase tracking-wide">Mögliche Fahrpreisentschädigung</div>
              <div className="text-6xl font-black text-[#0F172A] tracking-tighter mb-8">
                {compensation.toFixed(2).replace('.', ',')} <span className="text-[#94A3B8]">€</span>
              </div>
              <button onClick={() => router.push('/bahn-rebell')} className="bg-[#EA580C] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#C2410C] shadow-lg shadow-[#EA580C]/20 hover:shadow-xl transition-all w-full sm:w-auto text-lg">
                Kostenlos prüfen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WARUM VORLAGENBUDE */}
      <section id="warum-vorlagenbude" className="py-24 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-16" style={{ fontFamily: 'var(--font-head)' }}>
            Einfach anfangen.<br/>Ohne Software-Zirkus.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-[#E2E8F0] mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#0F172A]"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Direkt nutzbar</h3>
              <p className="text-[#475569] text-lg leading-relaxed">
                Apps öffnen und loslegen. Keine endlosen Setup-Wizards oder Tutorials.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-[#E2E8F0] mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#0F172A]"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Persönliche Daten lokal</h3>
              <p className="text-[#475569] text-lg leading-relaxed">
                Wir speichern nur das, was absolut notwendig ist. Der Rest bleibt bei dir.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-[#E2E8F0] mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#0F172A]"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Konkrete Werkzeuge</h3>
              <p className="text-[#475569] text-lg leading-relaxed">
                Jede App konzentriert sich auf genau ein klar umrissenes Alltagsproblem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-[#F8FAFC] py-12 border-t border-[#E2E8F0]">
        <div className="max-w-screen-xl mx-auto px-6 text-center flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-8 mb-8 font-semibold text-sm text-[#0F172A]">
            <Link href="/impressum" className="hover:text-[#EA580C] transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-[#EA580C] transition-colors">Datenschutz</Link>
            <Link href="/agb" className="hover:text-[#EA580C] transition-colors">AGB</Link>
          </div>
          <p className="text-[#94A3B8] text-sm">© {new Date().getFullYear()} Vorlagenbude. Werkzeuge ersetzen keine Rechtsberatung.</p>
        </div>
      </footer>

    </div>
  );
}
