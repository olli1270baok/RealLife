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
    <div className="min-h-screen font-sans text-[#0F172A] bg-[#F5F4F0]">
      
      {/* ── HERO ── */}
      <section className="pt-20 pb-24 px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="lg:w-1/2 flex flex-col items-start w-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-[#0F172A]" style={{ fontFamily: 'var(--font-head)' }}>
              Komplizierte Dinge <br className="hidden lg:block" />
              einfacher machen.
            </h1>
            <p className="text-xl md:text-2xl text-[#0F172A] font-bold leading-relaxed mb-4 max-w-xl">
              Digitale Apps für Bahnärger, Nebenkosten, Abos, Flugprobleme und anderen Alltagskram.
            </p>
            <p className="text-lg text-[#64748B] font-medium leading-relaxed mb-10 max-w-xl">
              Übersichtlich, praktisch und direkt im Browser nutzbar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full sm:w-auto mb-10">
              <button 
                onClick={() => document.getElementById('kern-apps')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#EA580C] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#C2410C] transition-colors w-full sm:w-auto text-center"
              >
                Apps entdecken
              </button>
              <button 
                onClick={() => document.getElementById('schnellcheck')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[#0F172A] font-bold text-lg hover:text-[#EA580C] transition-colors whitespace-nowrap"
              >
                Kostenlos ausprobieren
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-[#64748B] tracking-wide">
              <span>Im Browser starten</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>auf Wunsch installieren</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>offline nutzbar</span>
            </div>
          </div>

          <div className="lg:w-1/2 w-full hidden md:block">
            {/* Hochwertiges App-Visual (Abo-Killer) */}
            <div className="bg-[#0B1221] rounded-xl shadow-2xl overflow-hidden flex flex-col h-[520px] max-w-lg ml-auto border border-[#1E293B]">
              <div className="flex items-center gap-6 px-6 py-4 border-b border-[#1E293B] bg-[#030712]">
                <div className="text-white font-bold text-lg tracking-wide uppercase">Abo-Killer</div>
                <div className="flex gap-4 text-sm font-medium">
                  <span className="text-white border-b-2 border-[#EA580C] pb-4 -mb-4">Übersicht</span>
                </div>
              </div>
              <div className="flex-1 p-8 flex flex-col gap-8">
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
                <div className="flex-1">
                  <div className="text-xs uppercase text-[#94A3B8] font-bold tracking-wide mb-4">AKTIVE ABOS</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-[#030712] border border-[#1E293B] rounded-lg">
                      <div>
                        <div className="text-white font-bold text-lg mb-1">Netflix</div>
                        <div className="text-[#3498db] text-xs font-bold uppercase tracking-wider">Streaming</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-mono font-bold text-lg">19,99 €</div>
                        <div className="text-[#64748B] text-sm">monatlich</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#e74c3c]/10 border border-[#e74c3c]/50 rounded-lg">
                      <div>
                        <div className="text-white font-bold text-lg mb-1">McFit</div>
                        <div className="text-[#2ecc71] text-xs font-bold uppercase tracking-wider">Fitness</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-mono font-bold text-lg">39,90 €</div>
                        <div className="text-[#e74c3c] font-bold text-sm">18 Tage</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#030712] border border-[#1E293B] rounded-lg">
                      <div>
                        <div className="text-white font-bold text-lg mb-1">Apple One</div>
                        <div className="text-[#9b59b6] text-xs font-bold uppercase tracking-wider">Software</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-mono font-bold text-lg">19,95 €</div>
                        <div className="text-[#64748B] text-sm">monatlich</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── KERN-APPS EINLEITUNG ── */}
      <section id="kern-apps" className="pt-32 pb-16 px-6 lg:px-12 max-w-screen-2xl mx-auto border-t border-[#E2E8F0]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="uppercase font-bold tracking-widest text-[#64748B] text-sm mb-4">UNSERE APPS</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-[#0F172A]" style={{ fontFamily: 'var(--font-head)' }}>
            Welche App hilft dir gerade?
          </h2>
          <p className="text-xl text-[#64748B] font-medium leading-relaxed">
            Wähle das Thema, das du gerade erledigen möchtest.
          </p>
        </div>

        {/* ── KERN-APP 01: ABO-KILLER ── */}
        <div className="mb-40 flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 w-full order-2 lg:order-1">
            <div className="bg-[#FAFAFA] border border-[#E2E8F0] rounded-xl shadow-lg p-6 lg:p-10 font-mono text-sm overflow-hidden flex flex-col h-[500px]">
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
                    <td className="py-5 font-bold text-[#0F172A]">Streaming Premium</td>
                    <td className="py-5 text-[#64748B]">monatlich</td>
                    <td className="py-5 text-right font-bold text-lg">19,99 €</td>
                    <td className="py-5 text-right hidden sm:table-cell"><span className="bg-[#E2E8F0] px-4 py-2 text-xs rounded font-sans cursor-pointer hover:bg-[#CBD5E1] font-bold">Bearbeiten</span></td>
                  </tr>
                  <tr className="border-b border-[#E2E8F0]">
                    <td className="py-5 font-bold text-[#0F172A]">Fitnessstudio</td>
                    <td className="py-5 text-[#64748B]">monatlich</td>
                    <td className="py-5 text-right font-bold text-lg">39,90 €</td>
                    <td className="py-5 text-right hidden sm:table-cell"><span className="bg-[#EA580C] text-white px-4 py-2 text-xs rounded font-sans cursor-pointer hover:bg-[#C2410C] font-bold">Kündigung (PDF)</span></td>
                  </tr>
                  <tr className="border-b border-[#E2E8F0]">
                    <td className="py-5 font-bold text-[#0F172A]">Cloud Storage</td>
                    <td className="py-5 text-[#64748B]">jährlich</td>
                    <td className="py-5 text-right font-bold text-lg">119,88 €</td>
                    <td className="py-5 text-right hidden sm:table-cell"><span className="bg-[#E2E8F0] px-4 py-2 text-xs rounded font-sans cursor-pointer hover:bg-[#CBD5E1] font-bold">Bearbeiten</span></td>
                  </tr>
                  <tr>
                    <td className="py-5 font-bold text-[#0F172A] opacity-50 line-through">Magazin Plus</td>
                    <td className="py-5 text-[#64748B] opacity-50">monatlich</td>
                    <td className="py-5 text-right font-bold opacity-50 text-lg">14,99 €</td>
                    <td className="py-5 text-right hidden sm:table-cell"><span className="text-[#2ecc71] font-bold text-xs uppercase font-sans tracking-wider">Gekündigt</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex flex-col items-start order-1 lg:order-2">
            <div className="uppercase font-bold tracking-widest text-[#0F172A] text-sm mb-4">Abo-Killer</div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-[1.15] mb-6 tracking-tight">
              Zu viele Abos und keine Ahnung, was sie zusammen kosten?
            </h3>
            <p className="text-[#0F172A] text-lg font-medium mb-6 leading-relaxed">
              Abo-Killer bringt deine laufenden Abos, Kosten, Fristen und Kündigungen an einen Ort. Statt zwischen E-Mails, Kontoauszügen und einzelnen Kundenkonten zu suchen, bekommst du eine zentrale Übersicht über deine laufenden Verträge.
            </p>
            <ul className="space-y-3 mb-10 text-[#64748B] text-base font-medium">
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> Abos übersichtlich erfassen und verwalten</li>
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> monatliche und jährliche Gesamtkosten sehen</li>
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> Laufzeiten und Kündigungsfristen im Blick behalten</li>
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> Kündigungen strukturiert vorbereiten</li>
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> Daten lokal speichern und sichern</li>
            </ul>
            <div className="bg-[#FFF5F1] text-[#C2410C] font-bold p-4 rounded-lg mb-8 text-sm">
              Damit du nicht erst auf der Kreditkartenabrechnung merkst, was eigentlich alles noch läuft.
            </div>
            <button onClick={() => router.push('/abo-killer')} className="bg-[#0F172A] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#1E293B] transition-colors w-full sm:w-auto text-center">
              Abo-Killer ansehen
            </button>
          </div>
        </div>

        {/* ── KERN-APP 02: BAHN-REBELL ── */}
        <div className="mb-40 flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 flex flex-col items-start">
            <div className="uppercase font-bold tracking-widest text-[#0F172A] text-sm mb-4">Bahn-Rebell</div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-[1.15] mb-6 tracking-tight">
              Zug verspätet, ausgefallen oder Anschluss verpasst?
            </h3>
            <p className="text-[#0F172A] text-lg font-medium mb-6 leading-relaxed">
              Bahn-Rebell hilft dir, einen Bahnfall strukturiert zu erfassen, eine mögliche Fahrpreisentschädigung einzuordnen und die nächsten Schritte vorzubereiten. Fahrtdaten, Berechnung und Unterlagen bleiben dabei übersichtlich an einem Ort.
            </p>
            <ul className="space-y-3 mb-10 text-[#64748B] text-base font-medium">
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> mögliche Fahrpreisentschädigung berechnen</li>
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> Fahrten bzw. Fälle erfassen</li>
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> persönliche Erstattungsunterlagen bzw. Schreiben vorbereiten</li>
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> gespeicherte Daten sichern und wieder importieren</li>
            </ul>
            <div className="bg-[#FFF5F1] text-[#C2410C] font-bold p-4 rounded-lg mb-8 text-sm">
              Aus Bahnärger wird ein klarer nächster Schritt.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button onClick={() => router.push('/bahn-rebell')} className="bg-[#0F172A] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#1E293B] transition-colors w-full sm:w-auto text-center">
                Bahn-Rebell ansehen
              </button>
              <button onClick={() => document.getElementById('schnellcheck')?.scrollIntoView({ behavior: 'smooth' })} className="text-[#0F172A] font-bold text-lg hover:text-[#EA580C] transition-colors py-4 px-4 text-center">
                Kostenlos ausprobieren
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-[#0B1221] text-white border border-[#1E293B] rounded-xl shadow-2xl p-6 lg:p-10 font-sans flex flex-col h-[500px]">
              <div className="flex justify-between items-center mb-10 border-b border-[#1E293B] pb-6">
                <div className="text-xl font-bold uppercase tracking-wider text-[#EA580C]">Fahrgastrechte Terminal</div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-[#94A3B8] text-xs uppercase font-bold tracking-widest mb-1">Wartend</div>
                    <div className="font-mono text-2xl font-bold text-white">22,48 €</div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-[#94A3B8] text-xs uppercase font-bold tracking-widest mb-6">Meine Fälle</h3>
              <div className="space-y-4 flex-1">
                <div className="bg-[#030712] border border-[#1E293B] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-5 items-center">
                    <div className="w-1.5 h-12 bg-[#3498db] rounded-full"></div>
                    <div>
                      <div className="font-mono font-bold text-xl text-[#EA580C] mb-1">22,48 €</div>
                      <div className="text-sm text-[#94A3B8] font-medium">ICE 789 — 14.10.2025</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-[#1E293B] text-[#3498db] text-xs font-bold px-3 py-1.5 rounded border border-[#3498db]/30 tracking-wide uppercase">Eingereicht</span>
                  </div>
                </div>

                <div className="bg-[#030712] border border-[#1E293B] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-5 items-center">
                    <div className="w-1.5 h-12 bg-[#f39c12] rounded-full"></div>
                    <div>
                      <div className="font-mono font-bold text-xl text-[#EA580C] mb-1">34,95 €</div>
                      <div className="text-sm text-[#94A3B8] font-medium">ICE 102 — 02.11.2025 (Zugausfall)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-[#1E293B] text-[#f39c12] text-xs font-bold px-3 py-1.5 rounded border border-[#f39c12]/30 tracking-wide uppercase">Vorbereitet</span>
                    <span className="bg-[#EA580C] text-white text-xs font-bold px-4 py-2 rounded cursor-pointer hover:bg-[#C2410C] tracking-wide">Brief generieren</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── KERN-APP 03: NEBENKOSTEN-REBELL ── */}
        <div className="mb-40 flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 w-full order-2 lg:order-1">
            <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-lg p-6 lg:p-10 font-sans flex flex-col h-[500px]">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-[#E2E8F0]">
                <h3 className="font-bold text-xl uppercase tracking-wider text-[#0F172A]">Analyse-Workspace</h3>
                <div className="bg-[#F5F4F0] px-3 py-1.5 rounded text-xs font-bold tracking-widest uppercase text-[#64748B]">Vergleich 2024 / 2025</div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-[#FAFAFA] border border-[#E2E8F0] p-5 rounded-lg text-center flex flex-col justify-center">
                  <div className="text-xs uppercase text-[#64748B] font-bold tracking-widest mb-2">Vorjahr</div>
                  <div className="text-xl lg:text-2xl font-bold font-mono text-[#0F172A]">2.290 €</div>
                </div>
                <div className="bg-[#FAFAFA] border border-[#E2E8F0] p-5 rounded-lg text-center flex flex-col justify-center">
                  <div className="text-xs uppercase text-[#64748B] font-bold tracking-widest mb-2">Aktuell</div>
                  <div className="text-xl lg:text-2xl font-bold font-mono text-[#0F172A]">2.780 €</div>
                </div>
                <div className="bg-[#FFF5F1] border border-[#FFDCD0] p-5 rounded-lg text-center flex flex-col justify-center">
                  <div className="text-xs uppercase text-[#EA580C] font-bold tracking-widest mb-2">Differenz</div>
                  <div className="text-xl lg:text-2xl font-black font-mono text-[#EA580C]">+490 €</div>
                </div>
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between py-4 border-b border-[#E2E8F0]">
                  <span className="font-bold text-[#0F172A] text-lg">Heizkosten</span>
                  <div className="flex items-center gap-6 justify-end">
                    <span className="font-mono font-bold text-lg text-[#64748B]">1.450 €</span>
                    <span className="bg-[#FFF5F1] text-[#EA580C] text-sm font-bold px-3 py-1.5 rounded w-16 text-center">+34%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-[#E2E8F0]">
                  <span className="font-bold text-[#0F172A] text-lg">Kaltwasser</span>
                  <div className="flex items-center gap-6 justify-end">
                    <span className="font-mono font-bold text-lg text-[#64748B]">280 €</span>
                    <span className="bg-[#FAFAFA] text-[#64748B] text-sm font-bold px-3 py-1.5 rounded border border-[#E2E8F0] w-16 text-center">+2%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span className="font-bold text-[#0F172A] text-lg">Müllabfuhr</span>
                  <div className="flex items-center gap-6 justify-end">
                    <span className="font-mono font-bold text-lg text-[#64748B]">190 €</span>
                    <span className="bg-[#F0FDF4] text-[#16A34A] text-sm font-bold px-3 py-1.5 rounded border border-[#DCFCE7] w-16 text-center">-5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex flex-col items-start order-1 lg:order-2">
            <div className="uppercase font-bold tracking-widest text-[#0F172A] text-sm mb-4">Nebenkosten-Rebell</div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-[1.15] mb-6 tracking-tight">
              Nebenkostenabrechnung bekommen – aber kaum nachvollziehbar, woher die Nachzahlung kommt?
            </h3>
            <p className="text-[#0F172A] text-lg font-medium mb-6 leading-relaxed">
              Nebenkosten-Rebell hilft dir dabei, deine Abrechnung strukturiert auseinanderzunehmen. Kostenpositionen, Vorauszahlungen, Veränderungen und Vergleichswerte werden übersichtlicher, damit du besser nachvollziehen kannst, wie sich das Ergebnis zusammensetzt.
            </p>
            <ul className="space-y-3 mb-10 text-[#64748B] text-base font-medium">
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> Abrechnungsdaten strukturiert erfassen</li>
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> einzelne Kostenpositionen übersichtlich betrachten</li>
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> Veränderungen zum Vorjahr nachvollziehen</li>
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> Auffälligkeiten bzw. offene Fragen dokumentieren</li>
            </ul>
            <div className="bg-[#FFF5F1] text-[#C2410C] font-bold p-4 rounded-lg mb-8 text-sm">
              Nicht nur sehen, was du nachzahlen sollst. Verstehen, wie die Abrechnung zustande kommt.
            </div>
            <button onClick={() => router.push('/nebenkosten-rebell')} className="bg-[#0F172A] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#1E293B] transition-colors w-full sm:w-auto text-center">
              Nebenkosten-Rebell ansehen
            </button>
          </div>
        </div>

        {/* ── KERN-APP 04: FLUG-REBELL ── */}
        <div className="mb-20 flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 flex flex-col items-start">
            <div className="uppercase font-bold tracking-widest text-[#0F172A] text-sm mb-4">Flug-Rebell</div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-[1.15] mb-6 tracking-tight">
              Flug verspätet, gestrichen oder Anschluss verpasst?
            </h3>
            <p className="text-[#0F172A] text-lg font-medium mb-6 leading-relaxed">
              Flug-Rebell hilft dir, deinen Fall strukturiert einzuordnen und mögliche nächste Schritte vorzubereiten. Flugdaten, mögliche Entschädigung, zusätzliche Kosten und Schreiben lassen sich in einem nachvollziehbaren Ablauf organisieren.
            </p>
            <ul className="space-y-3 mb-10 text-[#64748B] text-base font-medium">
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> Flugdaten und Fall erfassen</li>
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> mögliche Entschädigung einordnen</li>
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> Schreiben vorbereiten</li>
              <li className="flex gap-3 items-start"><span className="text-[#EA580C] font-bold">✓</span> Vorgang strukturiert weiterverfolgen</li>
            </ul>
            <div className="bg-[#FFF5F1] text-[#C2410C] font-bold p-4 rounded-lg mb-8 text-sm">
              Flug vorbei. Papierkram noch nicht.
            </div>
            <button onClick={() => router.push('/flug-rebell')} className="bg-[#0F172A] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#1E293B] transition-colors w-full sm:w-auto text-center">
              Flug-Rebell ansehen
            </button>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl shadow-lg p-6 lg:p-10 font-sans flex flex-col h-[500px]">
              <div className="flex justify-between items-start mb-10 pb-6 border-b border-[#CBD5E1]">
                <div>
                  <div className="text-xs uppercase text-[#64748B] font-bold tracking-widest mb-2">Fall-Akte</div>
                  <h3 className="font-black text-2xl lg:text-3xl text-[#0F172A]">LH 1450 (MUC - ALC)</h3>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase text-[#64748B] font-bold tracking-widest mb-2">Anspruch</div>
                  <div className="font-mono text-3xl font-black text-[#3b82f6]">1.200 €</div>
                </div>
              </div>

              <div className="relative pl-8 border-l-[3px] border-[#CBD5E1] space-y-10 font-mono text-sm py-4 flex-1">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#CBD5E1]"></div>
                  <div className="text-[#64748B] font-bold tracking-wide mb-1 uppercase text-xs">Geplante Ankunft</div>
                  <div className="text-xl font-bold text-[#0F172A]">14:20 Uhr</div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#0F172A]"></div>
                  <div className="text-[#64748B] font-bold tracking-wide mb-1 uppercase text-xs">Tatsächliche Ankunft</div>
                  <div className="text-xl font-bold text-[#0F172A]">18:05 Uhr</div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[46px] top-2.5 w-6 h-6 rounded-full border-[5px] border-[#F8FAFC] bg-[#e74c3c]"></div>
                  <div className="bg-white border border-[#E2E8F0] p-5 rounded shadow-sm">
                    <div className="text-[#64748B] font-bold uppercase text-xs tracking-widest mb-3">Verspätung</div>
                    <div className="text-3xl font-black text-[#e74c3c] mb-4">3 h 45 min</div>
                    <div className="pt-4 border-t border-[#E2E8F0] flex justify-between items-center">
                      <span className="font-sans text-[#0F172A] font-bold">Stufe 1 Mahnung generieren</span>
                      <span className="bg-[#3b82f6] text-white px-4 py-2 rounded text-xs font-bold cursor-pointer uppercase tracking-wider">PDF</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── WEITERE APPS ── */}
      <section className="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto border-t border-[#E2E8F0]">
        <div className="uppercase font-bold tracking-widest text-[#64748B] text-sm mb-4">WEITERE HELFER</div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-16 text-[#0F172A]" style={{ fontFamily: 'var(--font-head)' }}>
          Noch mehr für den Alltag.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Retouren-Rebell */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm flex flex-col">
            <h3 className="font-bold text-xl mb-4 text-[#0F172A]">Rücksendung erledigt – aber die Erstattung lässt auf sich warten?</h3>
            <p className="text-[#64748B] mb-6 flex-1 text-base leading-relaxed">
              Retouren-Rebell hilft dir, Rücksendungen, offene Erstattungen und den weiteren Vorgang übersichtlich zu organisieren. So bleibt nachvollziehbar, was zurückgeschickt wurde, was noch offen ist und wo du gegebenenfalls nachfassen solltest.
            </p>
            <ul className="space-y-2 mb-8 text-sm font-medium text-[#0F172A]">
              <li className="flex gap-2"><span className="text-[#EA580C]">✓</span> Paketverlust (DHL) dokumentieren</li>
              <li className="flex gap-2"><span className="text-[#EA580C]">✓</span> Lieferverzug / Fake-Shop prüfen</li>
              <li className="flex gap-2"><span className="text-[#EA580C]">✓</span> Gewährleistungsfristen erfassen</li>
              <li className="flex gap-2"><span className="text-[#EA580C]">✓</span> PDF-Brief-Terminal nutzen</li>
            </ul>
            <button onClick={() => router.push('/retouren-rebell')} className="bg-[#0F172A] text-white py-3 rounded font-bold text-sm hover:bg-[#1E293B] transition-colors w-full">
              Retouren-Rebell ansehen
            </button>
          </div>

          {/* Digital-Schutzschild */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm flex flex-col">
            <h3 className="font-bold text-xl mb-4 text-[#0F172A]">Unerwünschte Datenweitergabe oder Probleme mit Online-Diensten?</h3>
            <p className="text-[#64748B] mb-6 flex-1 text-base leading-relaxed">
              Digital-Schutzschild hilft dir, Datenschutzanfragen, Kontolöschungen und Widerrufe strukturiert zu organisieren und notwendige Schreiben an Anbieter vorzubereiten.
            </p>
            <ul className="space-y-2 mb-8 text-sm font-medium text-[#0F172A]">
              <li className="flex gap-2"><span className="text-[#EA580C]">✓</span> DSGVO-Auskünfte vorbereiten</li>
              <li className="flex gap-2"><span className="text-[#EA580C]">✓</span> Datenlöschung anfordern</li>
              <li className="flex gap-2"><span className="text-[#EA580C]">✓</span> Werbewidersprüche organisieren</li>
              <li className="flex gap-2"><span className="text-[#EA580C]">✓</span> Vorgänge strukturiert speichern</li>
            </ul>
            <button onClick={() => router.push('/digital-schutzschild')} className="bg-[#0F172A] text-white py-3 rounded font-bold text-sm hover:bg-[#1E293B] transition-colors w-full">
              Digital-Schutzschild ansehen
            </button>
          </div>

          {/* Lebenslagen-Lotse */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm flex flex-col">
            <h3 className="font-bold text-xl mb-4 text-[#0F172A]">Zu viele Dinge gleichzeitig zu regeln und keine klare Reihenfolge?</h3>
            <p className="text-[#64748B] mb-6 flex-1 text-base leading-relaxed">
              Der Lebenslagen-Lotse hilft dabei, komplexere Alltagssituationen in konkrete Aufgaben und nächste Schritte zu zerlegen. Statt alles gleichzeitig im Kopf behalten zu müssen, entsteht eine nachvollziehbare Struktur.
            </p>
            <ul className="space-y-2 mb-8 text-sm font-medium text-[#0F172A]">
              <li className="flex gap-2"><span className="text-[#EA580C]">✓</span> Komplizierte Vorgänge ordnen</li>
              <li className="flex gap-2"><span className="text-[#EA580C]">✓</span> Nächste Schritte priorisieren</li>
              <li className="flex gap-2"><span className="text-[#EA580C]">✓</span> Aufgabenlisten speichern</li>
              <li className="flex gap-2"><span className="text-[#EA580C]">✓</span> Dokumente und Fristen erfassen</li>
            </ul>
            <button onClick={() => router.push('/lebenslagen-lotse')} className="bg-[#0F172A] text-white py-3 rounded font-bold text-sm hover:bg-[#1E293B] transition-colors w-full">
              Lebenslagen-Lotse ansehen
            </button>
          </div>

        </div>
      </section>

      {/* ── KOSTENLOSE SCHNELLCHECKS ── */}
      <section id="schnellcheck" className="py-24 bg-white border-t border-[#E2E8F0]">
        <div className="px-6 lg:px-12 max-w-screen-xl mx-auto text-center">
          <div className="uppercase font-bold tracking-widest text-[#EA580C] text-sm mb-4">KOSTENLOS AUSPROBIEREN</div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-[#0F172A]" style={{ fontFamily: 'var(--font-head)' }}>
            Erst mal testen?
          </h2>
          <p className="text-xl text-[#64748B] font-medium leading-relaxed mb-16 max-w-2xl mx-auto">
            Mit Bahn-Rebell Free kannst du kostenlos prüfen, ob für deine verspätete Fahrt grundsätzlich eine mögliche Fahrpreisentschädigung infrage kommt.
          </p>

          <div className="bg-[#F5F4F0] border border-[#E2E8F0] rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto text-left">
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2 space-y-8">
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] uppercase mb-4 tracking-wider">Verspätung am Zielort (Minuten)</label>
                  <input 
                    type="range" 
                    min="0" max="180" 
                    value={delay} 
                    onChange={e => setDelay(parseInt(e.target.value))}
                    className="w-full accent-[#EA580C]"
                  />
                  <div className="text-right text-[#0F172A] font-bold mt-2 font-mono text-lg">{delay} Min</div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] uppercase mb-4 tracking-wider">Ticketpreis (Einzelfahrt)</label>
                  <input 
                    type="number" 
                    value={ticketPrice} 
                    onChange={e => setTicketPrice(parseFloat(e.target.value))}
                    className="w-full border border-[#CBD5E1] p-4 rounded font-mono text-[#0F172A] text-xl font-bold bg-white"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="bg-white border border-[#E2E8F0] p-8 rounded-lg text-center shadow-sm">
                  <div className="text-[#64748B] font-bold text-xs uppercase tracking-widest mb-4">Mögliche Entschädigung</div>
                  <div className="text-6xl font-black text-[#EA580C] font-mono mb-8">
                    {compensation.toFixed(2).replace('.', ',')} €
                  </div>
                  <button onClick={() => router.push('/bahn-rebell')} className="bg-[#EA580C] text-white px-6 py-4 rounded font-bold hover:bg-[#C2410C] transition-colors w-full text-lg">
                    Bahn-Rebell kostenlos testen
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ── WARUM VORLAGENBUDE? ── */}
      <section id="so-funktionierts" className="py-24 bg-[#0B1221] text-white border-t border-[#1E293B]">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-16" style={{ fontFamily: 'var(--font-head)' }}>
            Einfach anfangen. Ohne Software-Zirkus.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div>
              <h3 className="font-bold text-xl mb-4 text-white">Direkt nutzbar</h3>
              <p className="text-[#94A3B8] text-lg leading-relaxed">
                App öffnen und loslegen – ohne komplizierte Einrichtung.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4 text-white">Deine Daten möglichst bei dir</h3>
              <p className="text-[#94A3B8] text-lg leading-relaxed">
                Persönliche App-Daten werden lokal gespeichert, soweit das jeweilige Produkt dies unterstützt.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4 text-white">Kein künstlich aufgeblähtes Produkt</h3>
              <p className="text-[#94A3B8] text-lg leading-relaxed">
                Jede App konzentriert sich auf ein konkretes Problem und die Funktionen, die dafür tatsächlich sinnvoll sind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#F5F4F0] py-12 border-t border-[#E2E8F0]">
        <div className="max-w-screen-xl mx-auto px-6 text-center flex flex-col items-center">
          
          <div className="mb-12">
            <h3 className="font-bold text-[#0F172A] text-base mb-3">Mehrere Apps interessant?</h3>
            <button 
              onClick={async () => {
                const { startCheckout } = await import('@/lib/commerce/checkout');
                await startCheckout('masterPass');
              }}
              className="text-[#EA580C] font-bold text-sm hover:text-[#0F172A] transition-colors inline-flex items-center group uppercase tracking-widest"
            >
              Vorlagenbude Pass ansehen <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
          </div>

          <div className="flex justify-center gap-8 mb-6 font-medium text-sm text-[#64748B]">
            <Link href="/impressum" className="hover:text-[#0F172A] transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-[#0F172A] transition-colors">Datenschutz</Link>
            <Link href="/agb" className="hover:text-[#0F172A] transition-colors">AGB</Link>
          </div>
          <p className="text-[#94A3B8] text-xs">© {new Date().getFullYear()} Vorlagenbude. Werkzeuge ersetzen keine Rechtsberatung.</p>
        </div>
      </footer>

    </div>
  );
}
