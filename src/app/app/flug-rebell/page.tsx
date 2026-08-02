"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface FlightCase {
  id: string;
  date: string;
  airline: string;
  flight: string;
  amount: number;
  pax: number;
  total: number;
  reason: string;
  dist: number;
  status: string;
}

export default function FlugRebell() {
  const router = useRouter();
  const [activeView, setActiveView] = useState('dashboard');
  const [isPro, setIsPro] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const [cases, setCases] = useState<FlightCase[]>([]);

  // Unified Form Fields for Brief Terminal
  const [bName, setBName] = useState('');
  const [bIban, setBIban] = useState('');
  const [bArt, setBArt] = useState('stufe1');
  const [bDate, setBDate] = useState('');
  const [bAirline, setBAirline] = useState('');
  const [bFlight, setBFlight] = useState('');
  const [bPnr, setBPnr] = useState('');
  const [bPaxNames, setBPaxNames] = useState('');
  const [bAmount, setBAmount] = useState('');
  const [bPir, setBPir] = useState('');
  const [bFrom, setBFrom] = useState('');
  const [bTo, setBTo] = useState('');

  const [bCaseSelection, setBCaseSelection] = useState('');
  const [letterHtml, setLetterHtml] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  // Calc Fields
  const [cType, setCType] = useState('verspaetung');
  const [cDelay, setCDelay] = useState('3');
  const [cReason, setCReason] = useState('tech');
  const [cDist, setCDist] = useState('1500');
  const [cPax, setCPax] = useState('1');
  const [cAirline, setCAirline] = useState('');
  const [cFlight, setCFlight] = useState('');
  const [cResult, setCResult] = useState<{amount: number, total: number, msg: string, class: string, rawCalc: any} | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUserId(session.user.id);
      if (session.user.app_metadata?.is_pro) {
        setIsPro(true);
      }
      setLoadingUser(false);
    };
    checkUser();
  }, [router]);

  useEffect(() => {
    const savedCases = localStorage.getItem('flugrebell_cases');
    if (savedCases) setCases(JSON.parse(savedCases));

    const sName = localStorage.getItem('flug_name');
    const sIban = localStorage.getItem('flug_iban');
    if (sName) setBName(sName);
    if (sIban) setBIban(sIban);
  }, []);

  const saveUserData = () => {
    localStorage.setItem('flug_name', bName);
    localStorage.setItem('flug_iban', bIban);
  };

  const switchView = (view: string) => {
    setActiveView(view);
    window.scrollTo(0, 0);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      alert('Checkout error');
    }
  };

  const calculateClaim = () => {
    const delay = parseInt(cDelay);
    const dist = parseInt(cDist);
    const pax = parseInt(cPax);
    const airline = cAirline || 'Unbekannt';
    const flight = cFlight || 'Unbekannt';

    let amount = 0;
    let hasClaim = true;
    let alertMsg = "";
    let alertClass = "success";

    if (delay === 0 && cType !== 'annullierung' && cType !== 'ueberbuchung') {
      hasClaim = false;
      alertMsg = "Bei unter 2-3 Stunden Verspätung gibt es leider keine Entschädigung nach EU 261/2004.";
      alertClass = "warning";
    }
    
    if (cReason === 'streik_extern' || cReason === 'wetter') {
      hasClaim = false;
      alertMsg = "Die Airline beruft sich auf außergewöhnliche Umstände. Bei Wetter oder externen Streiks (Fluglotse) gibt es meist keine Entschädigung, AUSSER du kannst der Airline nachweisen, dass sie lügt (siehe Ausreden-Buster).";
      alertClass = "fail";
    }

    if (cReason === 'tech') {
      alertMsg = "Technischer Defekt ist KEIN außergewöhnlicher Umstand (EuGH C-549/07). Die Airline muss zahlen, auch wenn sie das zuerst ablehnt!";
      alertClass = "success";
    }

    if (cReason === 'streik_intern') {
      alertMsg = "Streik des eigenen Personals ist laut EuGH C-28/20 KEIN außergewöhnlicher Umstand. Die Airline muss zahlen!";
      alertClass = "success";
    }

    if (hasClaim) {
      if (dist === 1500) amount = 250;
      else if (dist === 3500) amount = 400;
      else if (dist === 9999) amount = 600;

      if (cType === 'verspaetung' && delay === 2 && dist > 1500) {
        alertMsg += " (Anspruch evtl. um 50% gekürzt wegen geringer Verspätung bei der Distanz).";
      }
    }

    const total = amount * pax;
    
    setCResult({
      amount,
      total,
      msg: alertMsg || "Dein Anspruch sieht sehr gut aus. Fordere das Geld jetzt ein!",
      class: alertClass,
      rawCalc: { id: Date.now().toString(), date: new Date().toISOString().split('T')[0], airline, flight, amount, pax, total, reason: cReason, dist, status: 'open' }
    });
  };

  const saveCase = () => {
    if (!cResult?.rawCalc) return;
    const newCases = [...cases, cResult.rawCalc];
    setCases(newCases);
    localStorage.setItem('flugrebell_cases', JSON.stringify(newCases));
    alert("Fall gespeichert! Du findest ihn im Dashboard.");
    switchView('dashboard');
  };

  const deleteCase = (id: string) => {
    if(confirm('Diesen Fall wirklich löschen?')) {
      const newCases = cases.filter(c => c.id !== id);
      setCases(newCases);
      localStorage.setItem('flugrebell_cases', JSON.stringify(newCases));
    }
  };

  const handleCaseSelect = (e: any) => {
    const id = e.target.value;
    setBCaseSelection(id);
    const c = cases.find(x => x.id === id);
    if (c) {
      setBDate(c.date);
      setBAirline(c.airline);
      setBFlight(c.flight);
      setBAmount(c.total.toString());
    }
  };

  const generateLetter = () => {
    saveUserData();
    setIsScanning(true);
    setScanStep(0);

    setTimeout(() => setScanStep(1), 400);
    setTimeout(() => setScanStep(2), 800);
    setTimeout(() => setScanStep(3), 1200);

    setTimeout(() => {
      const today = new Date().toLocaleDateString('de-DE');
      const name = bName || '[Dein Name]';
      const iban = bIban || '[Deine IBAN]';
      const date = bDate ? new Date(bDate).toLocaleDateString('de-DE') : '[Flugdatum]';
      const airline = bAirline || '[Fluggesellschaft]';
      const flight = bFlight || '[Flugnummer]';
      const pnr = bPnr || '[Buchungscode/PNR]';
      const paxNames = bPaxNames || '[Passagier-Namen]';
      const amount = bAmount || '[Betrag]';
      const pir = bPir || '[PIR-Referenznummer]';
      const from = bFrom || '[Abflugort]';
      const to = bTo || '[Zielort]';

      let subj = "";
      let body = "";

      const frist = new Date();
      frist.setDate(frist.getDate() + (bArt === 'stufe2' ? 7 : 14));
      const fristStr = frist.toLocaleDateString('de-DE');

      if (bArt === 'stufe1') {
        subj = `Forderung von Ausgleichsleistungen nach Art. 7 der Fluggastrechte-Verordnung (EG) Nr. 261/2004`;
        body = `<p>Sehr geehrte Damen und Herren,</p>
        <p>hiermit mache ich Ansprüche auf Ausgleichsleistungen gemäß Art. 7 der EU-Verordnung 261/2004 geltend.</p>
        <p>Am <strong>${date}</strong> war ich/waren wir auf den Flug <strong>${flight}</strong> gebucht (Buchungscode: <strong>${pnr}</strong>). Passagiere: ${paxNames}.</p>
        <p>Dieser Flug erreichte sein Ziel mit einer erheblichen Verspätung bzw. wurde annulliert. Gemäß der Verordnung steht mir/uns daher eine pauschale Ausgleichszahlung zu.</p>
        <p>Ich fordere Sie auf, den mir/uns zustehenden Betrag in Höhe von <strong>${amount} €</strong> bis spätestens zum</p>
        <p style="text-align:center;font-weight:bold;font-size:14pt">${fristStr}</p>
        <p>auf folgendes Konto zu überweisen:</p>
        <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>
        <p>Sollte die Frist fruchtlos verstreichen, werde ich rechtliche Schritte einleiten und mich an die Schlichtungsstelle für den öffentlichen Personenverkehr (söp) wenden. Die dadurch entstehenden Kosten gehen zu Ihren Lasten.</p>`;
      } else if (bArt === 'stufe2') {
        subj = `LETZTE MAHNUNG: Forderung von Ausgleichsleistungen (Verordnung (EG) Nr. 261/2004)`;
        body = `<p>Sehr geehrte Damen und Herren,</p>
        <p>auf mein Schreiben bezüglich des Fluges <strong>${flight}</strong> am <strong>${date}</strong> (Buchungscode: <strong>${pnr}</strong>) haben Sie den fälligen Betrag bisher nicht überwiesen.</p>
        <p>Daher setze ich Ihnen hiermit eine <strong>letzte Nachfrist</strong> bis zum</p>
        <p style="text-align:center;font-weight:bold;font-size:14pt;color:red">${fristStr}</p>
        <p>um den Betrag von <strong>${amount} €</strong> auf folgendes Konto zu zahlen:</p>
        <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>
        <p>Da Sie sich bereits in Verzug befinden, behalte ich mir vor, ab sofort Verzugszinsen geltend zu machen. Nach fruchtlosem Ablauf dieser letzten Frist werde ich ohne weitere Vorwarnung gerichtliche Schritte einleiten oder meine Forderung an einen Rechtsanwalt übergeben.</p>`;
      } else if (bArt === 'stufe3') {
        subj = `Widerspruch gegen Ihre Ablehnung / Technischer Defekt ist kein außergewöhnlicher Umstand`;
        body = `<p>Sehr geehrte Damen und Herren,</p>
        <p>ich nehme Bezug auf Ihre Ablehnung meiner Forderung zu Flug <strong>${flight}</strong> am <strong>${date}</strong>.</p>
        <p>Sie berufen sich auf "außergewöhnliche Umstände" (z.B. technischer Defekt). Ich weise diese Begründung hiermit rechtlich entschieden zurück.</p>
        <p>Nach ständiger Rechtsprechung des Europäischen Gerichtshofs (EuGH, Urteil vom 22.12.2008 – C-549/07, Wallentin-Hermann) stellen technische Probleme, die bei der Wartung oder im laufenden Betrieb zutage treten, <strong>keine</strong> außergewöhnlichen Umstände dar, da sie Teil der normalen Ausübung der Tätigkeit eines Luftfahrtunternehmens sind.</p>
        <p>Ihre pauschale Ablehnung ist daher rechtlich haltlos. Ich erwarte den Eingang meiner Ausgleichszahlung in Höhe von <strong>${amount} €</strong> auf folgendes Konto (IBAN: ${iban}) bis spätestens:</p>
        <p style="text-align:center;font-weight:bold;font-size:14pt">${fristStr}</p>
        <p>Sollte die Zahlung ausbleiben, reiche ich umgehend Klage ein.</p>`;
      } else if (bArt === 'gepaeck') {
        subj = `Schadensersatzforderung nach dem Montrealer Übereinkommen (Gepäckverspätung/-verlust)`;
        body = `<p>Sehr geehrte Damen und Herren,</p>
        <p>am <strong>${date}</strong> flog ich mit Ihrer Gesellschaft von <strong>${from}</strong> nach <strong>${to}</strong> (Flugnummer: <strong>${flight}</strong>, Buchungscode: <strong>${pnr}</strong>).</p>
        <p>Leider ist mein aufgegebenes Gepäck (PIR-Referenznummer: <strong>${pir}</strong>) nicht rechtzeitig am Zielort eingetroffen. Aufgrund dieser Verspätung war ich gezwungen, notwendige Ersatzkäufe (Hygieneartikel, Kleidung) zu tätigen, um die Zeit bis zum Eintreffen meines Gepäcks zu überbrücken.</p>
        <p>Gemäß Art. 19 des Montrealer Übereinkommens haftet der Luftfrachtführer für Schäden durch Verspätung bei der Luftbeförderung von Reisegepäck bis zu einer Höhe von 1.288 SZR.</p>
        <p>Ich fordere Sie hiermit auf, die mir entstandenen Kosten in Höhe von insgesamt <strong>${amount} Euro</strong> zu erstatten. Eine detaillierte Aufstellung sowie Kopien der Kaufbelege liegen diesem Schreiben bei.</p>
        <p>Bitte überweisen Sie den Betrag bis spätestens zum <strong>${fristStr}</strong> auf folgendes Konto:</p>
        <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>
        <p>Sollte die Frist fruchtlos verstreichen, werde ich rechtliche Schritte einleiten.</p>`;
      } else if (bArt === 'storno') {
        subj = `Rückforderung von Steuern und Gebühren wegen nicht angetretenem Flug`;
        body = `<p>Sehr geehrte Damen und Herren,</p>
        <p>ich hatte für den <strong>${date}</strong> einen Flug von <strong>${from}</strong> nach <strong>${to}</strong> (Flugnummer: <strong>${flight}</strong>, Buchungscode: <strong>${pnr}</strong>) gebucht.</p>
        <p>Diesen Flug konnte ich nicht antreten. Wie Ihnen bekannt ist, fallen Steuern, Flughafengebühren und flugabhängige Zuschläge nur dann an, wenn der Passagier den Flug auch tatsächlich antritt. Da ich nicht geflogen bin, mussten Sie diese Beträge nicht an Dritte (z.B. Flughafenbetreiber) abführen.</p>
        <p>Ein Einbehalt dieser Beträge stellt eine ungerechtfertigte Bereicherung im Sinne des § 812 BGB dar. Auch eventuelle Klauseln in Ihren AGB, die eine Erstattung ausschließen oder hohe Bearbeitungsgebühren dafür vorsehen, sind nach ständiger deutscher Rechtsprechung (u.a. LG Frankfurt a.M., Az. 2-24 O 100/13) unwirksam.</p>
        <p>Ich fordere Sie hiermit auf, mir die im Ticketpreis enthaltenen Steuern und Gebühren in Höhe von <strong>${amount} Euro</strong> bis spätestens zum <strong>${fristStr}</strong> auf folgendes Konto zu erstatten:</p>
        <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>
        <p>Sollte die Zahlung ausbleiben, werde ich meine Forderung rechtlich durchsetzen.</p>`;
      }

      setLetterHtml(`
        <div class="sender">${name.replace(/\n/g, '<br>')}<br>[Deine Straße]<br>[PLZ Ort]<br></div>
        <div class="recipient">An:<br>${airline}<br>Kundenservice / Fluggastrechte<br>[Adresse der Airline]</div>
        <div class="date">${today}</div>
        <div class="subject">${subj}</div>
        ${body}
        <p>Mit freundlichen Grüßen,</p>
        <br><br><br>
        <p>${name.split('\n')[0]}</p>
      `);
      setIsScanning(false);
      setTimeout(() => {
        document.getElementById('view-preview')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1600);
  };

  const printLetter = () => {
    const el = document.getElementById('view-briefe');
    if (el) {
      el.classList.add('print-me');
      window.print();
      setTimeout(() => el.classList.remove('print-me'), 500);
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar no-print">
        <div className="nav-group">
          <span className="nav-label">Zentrale</span>
          <button className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => switchView('dashboard')}><span className="nav-icon">📊</span> Dashboard</button>
          <button className={`nav-item ${activeView === 'rechner' ? 'active' : ''}`} onClick={() => switchView('rechner')}><span className="nav-icon">🧮</span> Entschädigungs-Rechner</button>
        </div>
        
        <div className="nav-group">
          <span className="nav-label">Waffenarsenal</span>
          <button className={`nav-item ${activeView === 'briefe' ? 'active' : ''}`} onClick={() => switchView('briefe')}><span className="nav-icon">📜</span> PDF-Brief-Terminal (5)</button>
          <button className={`nav-item ${activeView === 'ausreden' ? 'active' : ''}`} onClick={() => switchView('ausreden')}><span className="nav-icon">🛡️</span> Ausreden-Buster (EuGH)</button>
        </div>
      </aside>

      <main className="main-content relative">
        {!loadingUser && !isPro && activeView !== 'dashboard' && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(3, 7, 18, 0.8)', backdropFilter: 'blur(20px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '60px 40px', maxWidth: '600px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', backdropFilter: 'blur(16px)' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔒</div>
              <h2 className="gradient-title" style={{ marginBottom: '20px' }}>Premium-Werkzeug gesperrt</h2>
              <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '40px' }}>Dieses Werkzeug ist aktuell gesperrt. Schalte jetzt den vollen Funktionsumfang der Vorlagenbude frei – Lifetime, ohne Abo.</p>
              <button className="btn btn-primary" style={{ width: '100%', padding: '20px', fontSize: '18px' }} onClick={handleCheckout}>
                JETZT MASTER-PASS KAUFEN (19€)
              </button>
            </div>
          </div>
        )}

        <div className="content-wrapper">
          {/* DASHBOARD */}
          {activeView === 'dashboard' && (
            <section className="view active" id="view-dashboard">
              <div className="tech-anim-container no-print" style={{ height: '100px' }}>
                <svg width="100%" height="100" viewBox="0 0 800 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 20 80 Q 200 10 400 80 T 780 80" stroke="rgba(0, 240, 255, 0.12)" strokeWidth="3" className="flight-path-line" />
                  <g className="flight-trace-dot">
                    <path d="M-8,-8 L8,0 L-8,8 L-4,0 Z" fill="var(--accent-blue)" transform="rotate(-15)" />
                    <circle cx="0" cy="0" r="2.5" fill="var(--accent-blue)" />
                  </g>
                </svg>
              </div>

              <div className="hero glow-blue" style={{ transition: 'all 0.3s', borderLeft: '4px solid var(--accent-blue)', padding: '40px', marginBottom: '40px' }}>
                <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '11px', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '12px', display: 'block' }}>Fluggastrechte Terminal</span>
                <h1 className="gradient-title" style={{ fontSize: '3.2rem', lineHeight: '1.1', marginBottom: '16px' }}>Hol dir dein Geld <br/>zurück.</h1>
                <p style={{ fontSize: '16px', maxWidth: '700px', marginBottom: 0 }}>Airlines spekulieren darauf, dass du aufgibst. Portale wie Flightright nehmen 30% deiner Entschädigung. Der Flug-Rebell liefert dir die exakten Berechnungen und 5 juristische Werkzeuge — du behältst 100%.</p>
                
                <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                  <button className="btn btn-primary" onClick={() => switchView('rechner')}>Neuen Fall berechnen</button>
                  <button className="btn btn-secondary" onClick={() => switchView('briefe')}>Zum Brief-Terminal</button>
                </div>
              </div>

              <h3 style={{ color: 'var(--white)', marginBottom: '16px' }}>Meine Fälle</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {cases.length === 0 ? (
                  <p style={{ color: 'var(--muted)' }}>Noch keine Fälle gespeichert.</p>
                ) : (
                  cases.map(c => (
                    <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'var(--black)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--accent-blue)', marginBottom: '4px' }}>{c.total} € <span style={{fontSize:'12px', color:'var(--muted)', fontWeight:400}}>({c.pax}x {c.amount}€)</span></div>
                        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{c.airline} — Flug {c.flight}</div>
                      </div>
                      <div>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', borderColor: 'rgba(255,82,82,0.3)', color: '#ff5252' }} onClick={() => deleteCase(c.id)}>Löschen</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {/* RECHNER */}
          {activeView === 'rechner' && (
            <section className="view active" id="view-rechner">
              <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '12px', display: 'block' }}>EU Verordnung 261/2004</span>
              <h2>Entschädigungs-Rechner</h2>
              <p>Berechne deinen exakten Anspruch bei Verspätung, Annullierung oder Überbuchung.</p>

              <div className="grid-2" style={{ marginTop: '32px' }}>
                <div className="card highlight" style={{ borderTop: '4px solid var(--accent-blue)' }}>
                  <div className="form-group">
                    <label>Was ist passiert?</label>
                    <select value={cType} onChange={e => setCType(e.target.value)}>
                      <option value="verspaetung">Flugverspätung (Ankunft am Zielort)</option>
                      <option value="annullierung">Flug annulliert / gestrichen</option>
                      <option value="ueberbuchung">Wegen Überbuchung nicht mitgenommen</option>
                      <option value="verpasst">Anschlussflug verpasst</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Verspätung am Zielort</label>
                      <select value={cDelay} onChange={e => setCDelay(e.target.value)}>
                        <option value="0">Weniger als 2 Stunden (0€)</option>
                        <option value="2">2 bis 3 Stunden</option>
                        <option value="3">3 bis 4 Stunden</option>
                        <option value="4">Mehr als 4 Stunden</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Grund (laut Airline)</label>
                      <select value={cReason} onChange={e => setCReason(e.target.value)}>
                        <option value="tech">Technischer Defekt</option>
                        <option value="streik_intern">Streik (Personal der Airline)</option>
                        <option value="streik_extern">Streik (Fluglotse/Sicherheit)</option>
                        <option value="wetter">Schlechtes Wetter</option>
                        <option value="unknown">Unbekannt / Keine Angabe</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Flugdistanz (Luftlinie)</label>
                    <select value={cDist} onChange={e => setCDist(e.target.value)}>
                      <option value="1500">Kurzstrecke (bis 1.500 km — z.B. Berlin-Mallorca)</option>
                      <option value="3500">Mittelstrecke (1.500 bis 3.500 km — z.B. Frankfurt-Kanaren)</option>
                      <option value="9999">Langstrecke (über 3.500 km — z.B. München-New York)</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Anzahl Passagiere</label>
                      <input type="number" value={cPax} onChange={e => setCPax(e.target.value)} min="1" max="10" />
                    </div>
                    <div className="form-group">
                      <label>Airline Name</label>
                      <input type="text" value={cAirline} onChange={e => setCAirline(e.target.value)} placeholder="z.B. Lufthansa" />
                    </div>
                    <div className="form-group">
                      <label>Flugnummer</label>
                      <input type="text" value={cFlight} onChange={e => setCFlight(e.target.value)} placeholder="z.B. LH123" />
                    </div>
                  </div>

                  <button className="btn btn-primary" style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }} onClick={calculateClaim}>💰 Anspruch prüfen</button>
                </div>

                <div>
                  {cResult && (
                    <div className="card" style={{ marginBottom: '24px' }}>
                      <h3>Dein Anspruch</h3>
                      <div style={{ textAlign: 'center', padding: '40px', background: 'var(--black)', border: '2px dashed var(--border)', borderRadius: '8px', margin: '24px 0' }}>
                        <div style={{ fontSize: '72px', color: 'var(--accent-blue)', lineHeight: 1, fontWeight: 700 }}>{cResult.amount} €</div>
                        <div style={{ color: 'var(--muted)', marginTop: '12px', fontSize: '16px', fontWeight: 600 }}>pro Passagier</div>
                      </div>
                      {cResult.total > cResult.amount && (
                        <div style={{ textAlign: 'center', color: 'var(--accent-blue)', fontWeight: 600, marginBottom: '16px' }}>
                          Gesamt für {cPax} Passagiere: {cResult.total} €
                        </div>
                      )}
                      <div className={`result-box ${cResult.class}`} style={{ display: 'block', marginBottom: '24px' }} dangerouslySetInnerHTML={{ __html: `<strong>Analyse:</strong> ${cResult.msg}` }}></div>
                      <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={saveCase}>💾 Fall speichern</button>
                    </div>
                  )}

                  <div className="card">
                    <h3 style={{ color: 'var(--white)' }}>Wichtige Regel (EuGH)</h3>
                    <p>Die Verspätung richtet sich <strong>immer nach der Ankunftszeit</strong> am Zielort (Öffnen der Flugzeugtür), nicht nach der Abflugzeit!</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* AUSREDEN */}
          {activeView === 'ausreden' && (
            <section className="view active" id="view-ausreden">
              <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '12px', display: 'block' }}>EuGH Urteils-Datenbank</span>
              <h2>Ausreden-Buster</h2>
              <p>Airlines verweigern fast immer die erste Zahlung mit dem Standard-Satz: *"Es lagen außergewöhnliche Umstände vor."* Hier ist die juristische Munition dagegen.</p>

              <div className="grid-2" style={{ marginTop: '32px' }}>
                <div className="card">
                  <h3 style={{ color: 'var(--accent-red)' }}>Ausrede: "Technischer Defekt"</h3>
                  <p>Die häufigste Lüge. Flugzeuge gehen kaputt, das ist das unternehmerische Risiko der Airline.</p>
                  <div style={{ padding: '16px', borderLeft: '3px solid var(--accent-blue)', background: 'rgba(255,255,255,.02)', margin: '12px 0', fontStyle: 'italic', fontSize: '13px' }}>
                    <strong style={{ color: 'var(--accent-blue)', fontStyle: 'normal', display: 'block', marginBottom: '4px' }}>EuGH, Urteil vom 22.12.2008 – C-549/07</strong>
                    "Technische Probleme, die bei der Wartung von Flugzeugen zutage treten [...] können keine außergewöhnlichen Umstände darstellen."
                  </div>
                  <div className="alert alert-success" style={{ marginTop: '16px' }}><strong>Gegenschlag:</strong> Die Airline MUSS zahlen.</div>
                </div>

                <div className="card">
                  <h3 style={{ color: 'var(--accent-red)' }}>Ausrede: "Streik"</h3>
                  <p>Hier muss man exakt unterscheiden: Wer hat gestreikt?</p>
                  <div style={{ padding: '16px', borderLeft: '3px solid var(--accent-blue)', background: 'rgba(255,255,255,.02)', margin: '12px 0', fontStyle: 'italic', fontSize: '13px' }}>
                    <strong style={{ color: 'var(--accent-blue)', fontStyle: 'normal', display: 'block', marginBottom: '4px' }}>EuGH, Urteil vom 23.03.2021 – C-28/20</strong>
                    "Ein Streik des eigenen Personals der Fluggesellschaft stellt keinen außergewöhnlichen Umstand dar."
                  </div>
                  <div className="alert alert-warning" style={{ marginTop: '16px' }}><strong>Gegenschlag:</strong> Wenn Piloten oder Kabinencrew streiken -&gt; Airline MUSS zahlen. Bei Flughafen-Security -&gt; Höhere Gewalt.</div>
                </div>
              </div>
            </section>
          )}

          {/* BRIEF TERMINAL */}
          {activeView === 'briefe' && (
            <section className="view active" id="view-briefe">
              <div className="no-print">
                <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '12px', display: 'block' }}>Brief-Generator</span>
                <h2>PDF-Brief-Terminal (5 Vorlagen)</h2>
                <p>Generiere hier druckfertige juristische PDF-Schreiben gegen die Airline. Wähle einfach den passenden Fall aus.</p>

                <div className="card highlight" style={{ borderTop: '4px solid var(--accent-blue)', marginTop: '32px' }}>
                  
                  <div className="form-group">
                    <label>Art des Schreibens wählen</label>
                    <select value={bArt} onChange={e => setBArt(e.target.value)} style={{ padding: '16px', background: 'var(--darker)' }}>
                      <optgroup label="EU 261/2004 (Flugverspätung / Ausfall)">
                        <option value="stufe1">Stufe 1: Erstforderung (14 Tage Frist)</option>
                        <option value="stufe2">Stufe 2: Letzte Mahnung (7 Tage Frist + Zinsen)</option>
                        <option value="stufe3">Stufe 3: Ablehnung der Ausrede (z.B. Technischer Defekt)</option>
                      </optgroup>
                      <optgroup label="Weitere Rechte">
                        <option value="gepaeck">Gepäck-Verspätung/-Verlust (Montrealer Übereinkommen)</option>
                        <option value="storno">Steuer-Rückforderer (Stornierung / Nichtantritt)</option>
                      </optgroup>
                    </select>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />

                  {(bArt === 'stufe1' || bArt === 'stufe2' || bArt === 'stufe3') && (
                    <div className="form-group">
                      <label>Daten aus gespeichertem Fall laden (optional)</label>
                      <select value={bCaseSelection} onChange={handleCaseSelect}>
                        <option value="">-- manuell eingeben --</option>
                        {cases.map(c => <option key={c.id} value={c.id}>{c.airline} ({c.flight}) am {c.date} ({c.total}€)</option>)}
                      </select>
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group"><label>Dein Name</label><input type="text" value={bName} onChange={e => setBName(e.target.value)} /></div>
                    <div className="form-group"><label>Deine IBAN</label><input type="text" value={bIban} onChange={e => setBIban(e.target.value)} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Datum des Fluges</label><input type="date" value={bDate} onChange={e => setBDate(e.target.value)} /></div>
                    <div className="form-group"><label>Airline</label><input type="text" value={bAirline} onChange={e => setBAirline(e.target.value)} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Flugnummer</label><input type="text" value={bFlight} onChange={e => setBFlight(e.target.value)} /></div>
                    <div className="form-group"><label>Buchungscode (PNR)</label><input type="text" value={bPnr} onChange={e => setBPnr(e.target.value)} /></div>
                  </div>

                  {(bArt === 'stufe1' || bArt === 'stufe2') && (
                    <div className="form-group"><label>Namen aller Passagiere (kommasepariert)</label><input type="text" value={bPaxNames} onChange={e => setBPaxNames(e.target.value)} placeholder="Max Müller, Anna Müller" /></div>
                  )}

                  {(bArt === 'gepaeck' || bArt === 'storno') && (
                    <div className="form-row">
                      <div className="form-group"><label>Abflugort</label><input type="text" value={bFrom} onChange={e => setBFrom(e.target.value)} /></div>
                      <div className="form-group"><label>Zielort</label><input type="text" value={bTo} onChange={e => setBTo(e.target.value)} /></div>
                    </div>
                  )}

                  {bArt === 'gepaeck' && (
                    <div className="form-group">
                      <label>PIR-Referenznummer (am Schalter erhalten)</label>
                      <input type="text" value={bPir} onChange={e => setBPir(e.target.value)} />
                    </div>
                  )}

                  <div className="form-group">
                    <label>Geforderter Gesamtbetrag (in €)</label>
                    <input type="number" value={bAmount} onChange={e => setBAmount(e.target.value)} step="0.01" />
                  </div>

                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '24px' }} onClick={generateLetter}>
                    PDF-Vorschau generieren
                  </button>
                </div>
              </div>

              {/* BRIEF PREVIEW */}
              {letterHtml && activeView === 'briefe' && (
                <div id="view-preview" style={{ marginTop: '24px' }}>
                  <div className="no-print" style={{ padding: '16px', background: 'var(--darker)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Brief-Vorschau</h3>
                    <button className="btn btn-secondary" onClick={printLetter}>🖨️ Drucken / PDF</button>
                  </div>
                  <div className="letter-paper" dangerouslySetInnerHTML={{ __html: letterHtml }} />
                </div>
              )}
            </section>
          )}

        </div>
      </main>
    </div>
  );
}
