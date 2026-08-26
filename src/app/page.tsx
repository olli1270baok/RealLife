"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Homepage() {
  const router = useRouter();

  // Bahn-Rebell Schnellcheck State
  const [delay, setDelay] = useState<number>(95);
  const [ticketPrice, setTicketPrice] = useState<number>(89.90);
  
  let compensation = 0;
  if (delay >= 60 && delay < 120) compensation = ticketPrice * 0.25;
  else if (delay >= 120) compensation = ticketPrice * 0.5;

  return (
    <div className="min-h-screen">
      
      {/* ── HERO ── */}
      <section className="pt-16 pb-20 px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left: Editorial Claim */}
          <div className="lg:w-1/2 flex flex-col items-start w-full">
            <div className="uppercase font-bold tracking-widest text-[#0F172A] text-sm mb-6">
              VORLAGENBUDE
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-[#0F172A]" style={{ fontFamily: 'var(--font-head)' }}>
              Komplizierte Dinge <br className="hidden md:block" />
              einfacher machen.
            </h1>
            <p className="text-xl md:text-2xl text-[#0F172A] font-bold leading-relaxed mb-2 max-w-xl">
              Digitale Apps für Bahnärger, Nebenkosten, Abos, Flugprobleme und anderen Alltagskram.
            </p>
            <p className="text-lg text-[#64748B] font-medium leading-relaxed mb-10 max-w-xl">
              Nicht nur nachschlagen oder ausrechnen – organisieren, dokumentieren und weiterarbeiten.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full sm:w-auto">
              <button 
                onClick={() => document.getElementById('showcases')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#EA580C] text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-[#C2410C] transition-colors w-full sm:w-auto text-center"
              >
                Apps entdecken
              </button>
              <button 
                onClick={() => document.getElementById('schnellcheck')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[#0F172A] font-bold text-lg hover:text-[#EA580C] transition-colors whitespace-nowrap"
              >
                Bahn-Rebell kostenlos testen &rarr;
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-[#64748B] tracking-wide">
              <span>Im Browser starten</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>auf Wunsch installieren</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>offline nutzbar</span>
            </div>
          </div>

          {/* Right: Abo-Killer App Preview */}
          <div className="lg:w-1/2 w-full hidden md:block">
            <div className="bg-[#0B1221] rounded-xl shadow-2xl border border-[#1E293B] overflow-hidden flex flex-col h-[500px]">
              {/* App Header */}
              <div className="flex items-center gap-6 px-6 py-4 border-b border-[#1E293B] bg-[#030712]">
                <div className="text-white font-bold text-lg tracking-wide uppercase">Abo-Killer</div>
                <div className="flex gap-4 text-sm font-medium">
                  <span className="text-white border-b-2 border-[#EA580C] pb-4 -mb-4">Übersicht</span>
                  <span className="text-[#64748B]">Abos</span>
                  <span className="text-[#64748B]">Fristen</span>
                  <span className="text-[#64748B]">Kündigungen</span>
                </div>
              </div>
              
              <div className="flex-1 p-8 bg-[#0B1221] flex flex-col gap-8">
                {/* Totals Row */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-[#1E293B] p-4 rounded-lg border-l-4 border-[#3498db]">
                    <div className="text-xs uppercase text-[#94A3B8] font-bold tracking-wide mb-1">PRO MONAT</div>
                    <div className="text-3xl text-white font-black font-mono">127,40 €</div>
                  </div>
                  <div className="bg-[#1E293B] p-4 rounded-lg border-l-4 border-[#9b59b6]">
                    <div className="text-xs uppercase text-[#94A3B8] font-bold tracking-wide mb-1">PRO JAHR</div>
                    <div className="text-3xl text-white font-black font-mono">1.528,80 €</div>
                  </div>
                </div>

                {/* Subscriptions List */}
                <div className="flex-1">
                  <div className="text-xs uppercase text-[#94A3B8] font-bold tracking-wide mb-4">AKTIVE ABOS</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-[#030712] border border-[#1E293B] rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="text-white font-bold">Netflix</span>
                        <span className="text-xs text-[#3498db] bg-[#3498db]/10 px-2 py-1 rounded">Streaming</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-white font-mono font-bold">19,99 €</span>
                        <span className="text-[#64748B] text-sm w-16 text-right">aktiv</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#e74c3c]/10 border border-[#e74c3c]/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="text-white font-bold">McFit</span>
                        <span className="text-xs text-[#2ecc71] bg-[#2ecc71]/10 px-2 py-1 rounded">Fitness</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-white font-mono font-bold">39,90 €</span>
                        <span className="text-[#e74c3c] font-bold text-sm w-16 text-right">18 Tage</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#030712] border border-[#1E293B] rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="text-white font-bold">Apple One</span>
                        <span className="text-xs text-[#9b59b6] bg-[#9b59b6]/10 px-2 py-1 rounded">Software</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-white font-mono font-bold">19,95 €</span>
                        <span className="text-[#64748B] text-sm w-16 text-right">aktiv</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SHOWCASES ── */}
      <section id="showcases" className="py-24 border-t border-[#E2E8F0]">
        
        {/* SHOWCASE 1: ABO-KILLER */}
        <div className="px-6 lg:px-12 max-w-screen-2xl mx-auto mb-32">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-5/12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-[1.05] mb-6 tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>
                Ein Abo für 9,99 € fällt nicht auf. Elf davon schon.
              </h2>
              <p className="text-[#64748B] text-xl mb-10 leading-relaxed max-w-lg font-medium">
                Abo-Killer bringt laufende Kosten, Fristen und Kündigungen in eine gemeinsame Übersicht.
              </p>
              <button onClick={() => router.push('/abo-killer')} className="bg-[#0F172A] text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-[#1E293B] transition-colors group inline-flex items-center">
                Abo-Killer ansehen <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
            <div className="lg:w-7/12 w-full">
              {/* Product Screenshot / UI */}
              <div className="bg-[#FAFAFA] border border-[#E2E8F0] rounded-xl shadow-lg p-6 lg:p-10 font-mono text-sm overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-8 border-b-2 border-dashed border-[#CBD5E1] pb-4">
                  <div className="text-lg font-bold text-[#0F172A] uppercase">Kostenradar</div>
                  <div className="text-right">
                    <div className="text-[#64748B] text-xs">JAHRESKOSTEN</div>
                    <div className="text-2xl font-black text-[#EA580C]">1.018,44 €</div>
                  </div>
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[#94A3B8] border-b border-[#E2E8F0]">
                      <th className="py-3 font-semibold w-1/3">Dienst</th>
                      <th className="py-3 font-semibold">Zyklus</th>
                      <th className="py-3 font-semibold text-right">Kosten</th>
                      <th className="py-3 font-semibold text-right hidden sm:table-cell">Aktion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E2E8F0]">
                      <td className="py-4 font-bold text-[#0F172A]">Streaming Premium</td>
                      <td className="py-4 text-[#64748B]">monatlich</td>
                      <td className="py-4 text-right font-bold">19,99 €</td>
                      <td className="py-4 text-right hidden sm:table-cell"><span className="bg-[#E2E8F0] px-3 py-1 text-xs rounded font-sans cursor-pointer hover:bg-[#CBD5E1]">Bearbeiten</span></td>
                    </tr>
                    <tr className="border-b border-[#E2E8F0]">
                      <td className="py-4 font-bold text-[#0F172A]">Fitnessstudio</td>
                      <td className="py-4 text-[#64748B]">monatlich</td>
                      <td className="py-4 text-right font-bold">39,90 €</td>
                      <td className="py-4 text-right hidden sm:table-cell"><span className="bg-[#EA580C] text-white px-3 py-1 text-xs rounded font-sans cursor-pointer hover:bg-[#C2410C]">Kündigung (PDF)</span></td>
                    </tr>
                    <tr className="border-b border-[#E2E8F0]">
                      <td className="py-4 font-bold text-[#0F172A]">Cloud Storage</td>
                      <td className="py-4 text-[#64748B]">jährlich</td>
                      <td className="py-4 text-right font-bold">119,88 €</td>
                      <td className="py-4 text-right hidden sm:table-cell"><span className="bg-[#E2E8F0] px-3 py-1 text-xs rounded font-sans cursor-pointer hover:bg-[#CBD5E1]">Bearbeiten</span></td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold text-[#0F172A] opacity-50 line-through">Magazin Plus</td>
                      <td className="py-4 text-[#64748B] opacity-50">monatlich</td>
                      <td className="py-4 text-right font-bold opacity-50">14,99 €</td>
                      <td className="py-4 text-right hidden sm:table-cell"><span className="text-[#2ecc71] font-bold text-xs uppercase font-sans">Gekündigt</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* SHOWCASE 2: BAHN-REBELL */}
        <div className="px-6 lg:px-12 max-w-screen-2xl mx-auto mb-32">
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            <div className="lg:w-5/12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-[1.05] mb-6 tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>
                Der Zug war zu spät. Dein Fall muss deshalb nicht chaotisch werden.
              </h2>
              <p className="text-[#64748B] text-xl mb-10 leading-relaxed max-w-lg font-medium">
                Bahn-Rebell hilft, Fahrtdaten, mögliche Entschädigung und den weiteren Vorgang strukturiert zusammenzuhalten.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => router.push('/bahn-rebell')} className="bg-[#0F172A] text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-[#1E293B] transition-colors group inline-flex items-center justify-center">
                  Bahn-Rebell ansehen <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </button>
                <button onClick={() => document.getElementById('schnellcheck')?.scrollIntoView({ behavior: 'smooth' })} className="text-[#0F172A] font-bold text-lg hover:text-[#EA580C] transition-colors py-4 text-center">
                  Kostenlos prüfen
                </button>
              </div>
            </div>
            <div className="lg:w-7/12 w-full">
              {/* Product Screenshot / UI */}
              <div className="bg-[#0B1221] text-white border border-[#1E293B] rounded-xl shadow-2xl p-6 lg:p-10 font-sans flex flex-col">
                <div className="flex justify-between items-center mb-8 border-b border-[#1E293B] pb-4">
                  <div className="text-xl font-bold uppercase tracking-wider text-[#EA580C]">Fahrgastrechte Terminal</div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-[#94A3B8] text-xs uppercase font-bold">Wartend</div>
                      <div className="font-mono text-xl font-bold">22,48 €</div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-[#94A3B8] text-sm uppercase font-bold tracking-widest mb-4">Meine Fälle</h3>
                <div className="space-y-4">
                  
                  <div className="bg-[#030712] border border-[#1E293B] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex gap-4 items-center">
                      <div className="w-1.5 h-12 bg-[#3498db] rounded-full"></div>
                      <div>
                        <div className="font-mono font-bold text-xl text-[#EA580C] mb-1">22,48 €</div>
                        <div className="text-sm text-[#94A3B8]">ICE 789 — 14.10.2025</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-[#1E293B] text-[#3498db] text-xs font-bold px-3 py-1.5 rounded border border-[#3498db]/30">🔵 Eingereicht</span>
                      <span className="text-[#94A3B8] text-sm cursor-pointer hover:text-white">PDF ⭳</span>
                    </div>
                  </div>

                  <div className="bg-[#030712] border border-[#1E293B] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex gap-4 items-center">
                      <div className="w-1.5 h-12 bg-[#f39c12] rounded-full"></div>
                      <div>
                        <div className="font-mono font-bold text-xl text-[#EA580C] mb-1">34,95 €</div>
                        <div className="text-sm text-[#94A3B8]">ICE 102 — 02.11.2025 (Zugausfall)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-[#1E293B] text-[#f39c12] text-xs font-bold px-3 py-1.5 rounded border border-[#f39c12]/30">🟡 Vorbereitet</span>
                      <span className="bg-[#EA580C] text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer hover:bg-[#C2410C]">Brief generieren</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SHOWCASE 3: NEBENKOSTEN-REBELL */}
        <div className="px-6 lg:px-12 max-w-screen-2xl mx-auto mb-32">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-5/12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-[1.05] mb-6 tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>
                740 € Nachzahlung sind eine Zahl. Interessant ist, woher sie kommt.
              </h2>
              <p className="text-[#64748B] text-xl mb-10 leading-relaxed max-w-lg font-medium">
                Nebenkosten-Rebell bringt Kostenpositionen, Veränderungen und den gesamten Prüfvorgang in eine nachvollziehbare Struktur.
              </p>
              <button onClick={() => router.push('/nebenkosten-rebell')} className="bg-[#0F172A] text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-[#1E293B] transition-colors group inline-flex items-center">
                Nebenkosten-Rebell ansehen <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
            <div className="lg:w-7/12 w-full">
              {/* Product Screenshot / UI */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-lg p-6 lg:p-10 font-sans flex flex-col">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#E2E8F0]">
                  <h3 className="font-bold text-lg uppercase tracking-wide text-[#0F172A]">Analyse-Workspace</h3>
                  <div className="bg-[#F5F4F0] px-3 py-1 rounded text-sm font-bold text-[#64748B]">Vergleich 2024 / 2025</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-[#FAFAFA] border border-[#E2E8F0] p-4 rounded-lg text-center">
                    <div className="text-xs uppercase text-[#64748B] font-bold mb-1">Vorjahr</div>
                    <div className="text-2xl font-bold font-mono">2.290,00 €</div>
                  </div>
                  <div className="bg-[#FAFAFA] border border-[#E2E8F0] p-4 rounded-lg text-center">
                    <div className="text-xs uppercase text-[#64748B] font-bold mb-1">Aktuell</div>
                    <div className="text-2xl font-bold font-mono">2.780,00 €</div>
                  </div>
                  <div className="bg-[#FFF5F1] border border-[#FFDCD0] p-4 rounded-lg text-center">
                    <div className="text-xs uppercase text-[#EA580C] font-bold mb-1">Differenz</div>
                    <div className="text-2xl font-black font-mono text-[#EA580C]">+490,00 €</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-[#E2E8F0]">
                    <span className="font-semibold text-[#0F172A]">Heizkosten</span>
                    <div className="flex items-center gap-4 w-48 justify-end">
                      <span className="font-mono text-sm text-[#64748B]">1.450 €</span>
                      <span className="bg-[#FFF5F1] text-[#EA580C] text-xs font-bold px-2 py-1 rounded w-16 text-center">+34%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E2E8F0]">
                    <span className="font-semibold text-[#0F172A]">Kaltwasser</span>
                    <div className="flex items-center gap-4 w-48 justify-end">
                      <span className="font-mono text-sm text-[#64748B]">280 €</span>
                      <span className="bg-[#FAFAFA] text-[#64748B] text-xs font-bold px-2 py-1 rounded border border-[#E2E8F0] w-16 text-center">+2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E2E8F0]">
                    <span className="font-semibold text-[#0F172A]">Müllabfuhr</span>
                    <div className="flex items-center gap-4 w-48 justify-end">
                      <span className="font-mono text-sm text-[#64748B]">190 €</span>
                      <span className="bg-[#F0FDF4] text-[#16A34A] text-xs font-bold px-2 py-1 rounded border border-[#DCFCE7] w-16 text-center">-5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SHOWCASE 4: FLUG-REBELL */}
        <div className="px-6 lg:px-12 max-w-screen-2xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            <div className="lg:w-5/12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-[1.05] mb-6 tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>
                Flug vorbei. Papierkram noch nicht.
              </h2>
              <p className="text-[#64748B] text-xl mb-10 leading-relaxed max-w-lg font-medium">
                Flug-Rebell hilft dir, den Fall einzuordnen, Ansprüche zu dokumentieren und die Mahnstufen vorzubereiten.
              </p>
              <button onClick={() => router.push('/flug-rebell')} className="bg-[#0F172A] text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-[#1E293B] transition-colors group inline-flex items-center">
                Flug-Rebell ansehen <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
            <div className="lg:w-7/12 w-full">
              {/* Product Screenshot / UI */}
              <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl shadow-lg p-6 lg:p-10 font-sans flex flex-col">
                <div className="flex justify-between items-start mb-8 pb-4 border-b border-[#CBD5E1]">
                  <div>
                    <div className="text-xs uppercase text-[#64748B] font-bold tracking-widest mb-1">Fall-Akte</div>
                    <h3 className="font-black text-2xl text-[#0F172A]">LH 1450 (MUC - ALC)</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase text-[#64748B] font-bold tracking-widest mb-1">Anspruch</div>
                    <div className="font-mono text-3xl font-black text-[#3b82f6]">1.200 €</div>
                  </div>
                </div>

                <div className="relative pl-6 border-l-2 border-[#CBD5E1] space-y-8 font-mono text-sm py-2">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#CBD5E1]"></div>
                    <div className="text-[#64748B]">Geplante Ankunft</div>
                    <div className="text-lg font-bold text-[#0F172A]">14:20 Uhr</div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#0F172A]"></div>
                    <div className="text-[#64748B]">Tatsächliche Ankunft</div>
                    <div className="text-lg font-bold text-[#0F172A]">18:05 Uhr</div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[35px] top-2 w-5 h-5 rounded-full border-4 border-[#F8FAFC] bg-[#e74c3c]"></div>
                    <div className="bg-white border border-[#E2E8F0] p-4 rounded shadow-sm">
                      <div className="text-[#64748B] font-bold uppercase text-xs mb-2">Verspätung</div>
                      <div className="text-2xl font-black text-[#e74c3c]">3 h 45 min</div>
                      <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex justify-between items-center">
                        <span className="font-sans text-[#0F172A] font-bold">Stufe 1 Mahnung generieren</span>
                        <span className="bg-[#3b82f6] text-white px-3 py-1 rounded text-xs font-bold cursor-pointer">PDF</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>

      {/* ── KOSTENLOSE SCHNELLCHECKS ── */}
      <section id="schnellcheck" className="py-24 bg-[#F5F4F0] border-t border-[#E2E8F0]">
        <div className="px-6 lg:px-12 max-w-screen-xl mx-auto text-center">
          <div className="uppercase font-bold tracking-widest text-[#EA580C] text-sm mb-4">KOSTENLOS TESTEN</div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-[#0F172A]" style={{ fontFamily: 'var(--font-head)' }}>
            Erst mal schauen, was für deinen Fall drin ist?
          </h2>
          <p className="text-xl text-[#64748B] font-medium leading-relaxed mb-16 max-w-2xl mx-auto">
            Starte mit einem kostenlosen Schnellcheck. Wenn du danach den gesamten Vorgang organisieren möchtest, kannst du mit der passenden App weiterarbeiten.
          </p>

          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto text-left">
            <div className="bg-[#0B1221] p-6 text-white flex justify-between items-center">
              <h3 className="font-bold text-xl uppercase tracking-wider">Bahn-Rebell Schnellcheck</h3>
              <span className="bg-[#EA580C] text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">Kostenlos</span>
            </div>
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#64748B] uppercase mb-2">Verspätung am Zielort (Minuten)</label>
                  <input 
                    type="range" 
                    min="0" max="180" 
                    value={delay} 
                    onChange={e => setDelay(parseInt(e.target.value))}
                    className="w-full accent-[#EA580C]"
                  />
                  <div className="text-right text-[#0F172A] font-bold mt-1 font-mono">{delay} Min</div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#64748B] uppercase mb-2">Ticketpreis (Einzelfahrt)</label>
                  <input 
                    type="number" 
                    value={ticketPrice} 
                    onChange={e => setTicketPrice(parseFloat(e.target.value))}
                    className="w-full border border-[#CBD5E1] p-3 rounded font-mono text-[#0F172A] text-lg font-bold"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-lg text-center">
                  <div className="text-[#64748B] font-bold text-sm uppercase tracking-wide mb-2">Mögliche Fahrpreisentschädigung</div>
                  <div className="text-6xl font-black text-[#EA580C] font-mono mb-6">
                    {compensation.toFixed(2).replace('.', ',')} €
                  </div>
                  <button onClick={() => router.push('/bahn-rebell')} className="bg-[#EA580C] text-white px-6 py-4 rounded font-bold hover:bg-[#C2410C] transition-colors w-full">
                    Kostenlos prüfen
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6 text-sm font-medium text-[#64748B]">
            <div className="flex flex-col items-center">
              <span className="font-bold text-[#0F172A] uppercase mb-1">Schnellcheck</span>
              <span>2 Angaben &rarr; erste Orientierung</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-[#CBD5E1]"></div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-[#0F172A] uppercase mb-1">Vollständige App</span>
              <span>Fall erfassen &rarr; speichern &rarr; weiterbearbeiten &rarr; dokumentieren &rarr; exportieren</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── PROZESSLINIE ── */}
      <section className="py-12 bg-[#0F172A] text-white border-t border-[#1E293B]">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-lg font-bold mb-4">
            <span>Starten</span>
            <span className="text-[#EA580C] hidden md:block">&rarr;</span>
            <span>Eintragen</span>
            <span className="text-[#EA580C] hidden md:block">&rarr;</span>
            <span>Überblick bekommen</span>
            <span className="text-[#EA580C] hidden md:block">&rarr;</span>
            <span>Weiterarbeiten</span>
          </div>
          <p className="text-[#94A3B8] text-sm">Kein kompliziertes Setup. Kein unnötiger Software-Ballast.</p>
        </div>
      </section>

      {/* ── UPSELL (MASTER PASS) ── */}
      <section className="py-16 border-b border-[#E2E8F0]">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h3 className="font-bold text-[#0F172A] text-lg mb-2">Mehr als ein Thema?</h3>
          <button 
            onClick={async () => {
              const { startCheckout } = await import('@/lib/commerce/checkout');
              await startCheckout('masterPass');
            }}
            className="text-[#EA580C] font-bold hover:text-[#0F172A] transition-colors inline-flex items-center group"
          >
            Alle Vorlagenbude-Apps entdecken <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#F5F4F0] text-[#64748B] py-12 text-center text-sm border-t border-[#E2E8F0]">
        <div className="flex justify-center gap-8 mb-6 font-medium">
          <Link href="/impressum" className="hover:text-[#0F172A] transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-[#0F172A] transition-colors">Datenschutz</Link>
          <Link href="/agb" className="hover:text-[#0F172A] transition-colors">AGB</Link>
        </div>
        <p>© {new Date().getFullYear()} Vorlagenbude. Werkzeuge ersetzen keine Rechtsberatung.</p>
      </footer>

    </div>
  );
}
