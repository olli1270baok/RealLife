"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface TrainCase {
  id: string;
  date: string;
  train: string;
  amount: string;
  type: string;
  reason: string;
}

export default function BahnRebell() {
  const router = useRouter();
  const [activeView, setActiveView] = useState('dashboard');
  const [isPro, setIsPro] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const [cases, setCases] = useState<TrainCase[]>([]);

  // Form Fields Brief 1
  const [b1Name, setB1Name] = useState('');
  const [b1Iban, setB1Iban] = useState('');
  const [b1Date, setB1Date] = useState('');
  const [b1Train, setB1Train] = useState('');
  const [b1From, setB1From] = useState('');
  const [b1To, setB1To] = useState('');
  const [b1TimePlan, setB1TimePlan] = useState('');
  const [b1TimeReal, setB1TimeReal] = useState('');
  const [b1Case, setB1Case] = useState('');
  const [brief1Html, setBrief1Html] = useState('');

  // Form Fields Brief 2
  const [b2Name, setB2Name] = useState('');
  const [b2Iban, setB2Iban] = useState('');
  const [b2Date, setB2Date] = useState('');
  const [b2Train, setB2Train] = useState('');
  const [b2Type, setB2Type] = useState('taxi');
  const [b2Amount, setB2Amount] = useState('');
  const [brief2Html, setBrief2Html] = useState('');

  // Form Fields Brief 3
  const [b3Name, setB3Name] = useState('');
  const [b3Iban, setB3Iban] = useState('');
  const [b3Date, setB3Date] = useState('');
  const [b3Train, setB3Train] = useState('');
  const [b3Amount, setB3Amount] = useState('');
  const [brief3Html, setBrief3Html] = useState('');

  // Calc Fields
  const [cTicketType, setCTicketType] = useState('einfach');
  const [cPrice, setCPrice] = useState('50');
  const [cDelay, setCDelay] = useState('60');
  const [cReason, setCReason] = useState('bahn');
  const [cTrain, setCTrain] = useState('');
  const [cDate, setCDate] = useState('');
  const [cResult, setCResult] = useState<{amount: string, msg: string, class: string, rawCalc: any} | null>(null);

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
    // Load local storage data
    const savedCases = localStorage.getItem('bahnrebell_cases');
    if (savedCases) setCases(JSON.parse(savedCases));

    const sName = localStorage.getItem('bahn_name');
    const sIban = localStorage.getItem('bahn_iban');
    if (sName) {
      setB1Name(sName); setB2Name(sName); setB3Name(sName);
    }
    if (sIban) {
      setB1Iban(sIban); setB2Iban(sIban); setB3Iban(sIban);
    }
  }, []);

  const saveUserData = () => {
    localStorage.setItem('bahn_name', b1Name || b2Name || b3Name);
    localStorage.setItem('bahn_iban', b1Iban || b2Iban || b3Iban);
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

  const calculateTrainClaim = () => {
    const delay = parseInt(cDelay);
    const price = parseFloat(cPrice) || 0;
    const train = cTrain || 'Zug';
    const date = cDate || new Date().toISOString().split('T')[0];

    let amount = 0;
    let hasClaim = true;
    let alertMsg = "";
    let alertClass = "success";

    if (delay === 0) {
      hasClaim = false;
      alertMsg = "Unter 60 Minuten Verspätung am Zielort gibt es keinen gesetzlichen Entschädigungsanspruch.";
      alertClass = "warning";
    }

    if (hasClaim && (cReason === 'wetter' || cReason === 'fremd')) {
      hasClaim = false;
      alertMsg = "Seit Juni 2023 (EU 2021/782) entfällt die Entschädigung bei extremem Wetter oder Fremdeinwirkung (Personen im Gleis). ABER: Hotel- und Taxikosten (bis 120€) müssen weiterhin bezahlt werden (Betreuungspflicht)! Nutze dafür den Brief-Generator 'Taxi & Hotel'.";
      alertClass = "fail";
    }

    if (hasClaim && cReason === 'streik') {
      alertMsg = "Streik des eigenen Bahnpersonals entbindet die Bahn NICHT von der Entschädigungspflicht. Voller Anspruch!";
      alertClass = "success";
    }

    if (hasClaim) {
      if (cTicketType === 'dticket') {
        amount = 1.50;
        alertMsg = "Beim Deutschlandticket gibt es pauschal 1,50 € pro Fall ab 60 Min Verspätung. Achtung: Da Auszahlungen erst ab 4,00 € erfolgen, musst du 3 Fälle in einem Monat sammeln!";
      } else if (cTicketType === 'zeitkarte') {
        amount = 1.50; 
        alertMsg = "Pauschaler Erstattungssatz für Zeitkarten. Ggf. abweichend je nach genauer Kartenart (z.B. BahnCard 100).";
      } else {
        amount = (delay === 60) ? price * 0.25 : price * 0.5;
        alertMsg = "Dein Erstattungsanspruch ist gültig. Erstelle jetzt das Forderungsschreiben.";
      }
    }

    const formattedAmount = amount.toFixed(2).replace('.', ',');
    
    setCResult({
      amount: formattedAmount,
      msg: alertMsg,
      class: alertClass,
      rawCalc: { id: Date.now().toString(), date, train, amount: formattedAmount, type: cTicketType, reason: cReason }
    });
  };

  const saveTrainCase = () => {
    if (!cResult?.rawCalc) return;
    const newCases = [...cases, cResult.rawCalc];
    setCases(newCases);
    localStorage.setItem('bahnrebell_cases', JSON.stringify(newCases));
    alert("Fall gespeichert!");
    switchView('dashboard');
  };

  const deleteCase = (id: string) => {
    const newCases = cases.filter(c => c.id !== id);
    setCases(newCases);
    localStorage.setItem('bahnrebell_cases', JSON.stringify(newCases));
  };

  const handleCaseSelect = (e: any) => {
    const id = e.target.value;
    setB1Case(id);
    const c = cases.find(x => x.id === id);
    if (c) {
      setB1Date(c.date);
      setB1Train(c.train);
    }
  };

  const genBrief1 = () => {
    saveUserData();
    const today = new Date().toLocaleDateString('de-DE');
    const name = b1Name || '[Dein Name]';
    const iban = b1Iban || '[Deine IBAN]';
    const date = b1Date ? new Date(b1Date).toLocaleDateString('de-DE') : '[Datum]';
    const train = b1Train || '[Zugnummer]';
    const from = b1From || '[Start]';
    const to = b1To || '[Ziel]';
    const time_plan = b1TimePlan || '[hh:mm]';
    const time_real = b1TimeReal || '[hh:mm]';

    setBrief1Html(`
      <div class="sender">${name}<br>[Deine Straße]<br>[PLZ Ort]<br></div>
      <div class="recipient">An:<br>DB Fernverkehr AG<br>Fahrgastrechte<br>60647 Frankfurt am Main</div>
      <div class="date">${today}</div>
      <div class="subject">Forderung von Fahrgastrechten gemäß EU-Verordnung 2021/782</div>
      <p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit mache ich Erstattungsansprüche für meine Reise am <strong>${date}</strong> geltend.</p>
      <p>Ich war Reisender im Zug <strong>${train}</strong> von <strong>${from}</strong> nach <strong>${to}</strong>. Die planmäßige Ankunft war für ${time_plan} Uhr vorgesehen. Tatsächlich erreichte ich mein Ziel erst um ${time_real} Uhr, was eine signifikante Verspätung darstellt.</p>
      <p>Gemäß Art. 19 der EU-Fahrgastrechteverordnung 2021/782 steht mir bei einer Verspätung in diesem Ausmaß eine prozentuale Entschädigung des Ticketpreises bzw. die Pauschale für Zeitkarten zu.</p>
      <p>Kopien meiner Originalfahrkarte(n) liegen diesem Schreiben bei.</p>
      <p>Ich fordere Sie auf, den Entschädigungsbetrag innerhalb von 14 Tagen auf folgendes Konto zu überweisen:</p>
      <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>
      <p>Sollten Sie die Zahlung verweigern, behalte ich mir vor, die Schlichtungsstelle für den öffentlichen Personenverkehr (söp) bzw. das Eisenbahn-Bundesamt einzuschalten.</p>
      <p>Mit freundlichen Grüßen,</p>
      <p><br>[Unterschrift]</p>
    `);
  };

  const genBrief2 = () => {
    saveUserData();
    const today = new Date().toLocaleDateString('de-DE');
    const name = b2Name || '[Dein Name]';
    const iban = b2Iban || '[Deine IBAN]';
    const date = b2Date ? new Date(b2Date).toLocaleDateString('de-DE') : '[Datum]';
    const train = b2Train || '[Zugnummer]';
    const amount = b2Amount || '[Betrag]';
    const isTaxi = b2Type === 'taxi';
    const typeText = isTaxi ? 'Taxikosten / Beförderungskosten' : 'Hotel- / Übernachtungskosten';

    setBrief2Html(`
      <div class="sender">${name}<br>[Deine Straße]<br>[PLZ Ort]<br></div>
      <div class="recipient">An:<br>DB Fernverkehr AG<br>Fahrgastrechte<br>60647 Frankfurt am Main</div>
      <div class="date">${today}</div>
      <div class="subject">Rückerstattung von Ersatzaufwendungen (${typeText}) gemäß Art. 20 EU-VO 2021/782</div>
      <p>Sehr geehrte Damen und Herren,</p>
      <p>am <strong>${date}</strong> wollte ich den Zug <strong>${train}</strong> nutzen. Aufgrund eines Zugausfalls bzw. einer erheblichen Verspätung war es mir nicht möglich, mein Fahrtziel planmäßig oder am selben Tag zu erreichen.</p>
      <p>Gemäß Art. 20 der EU-Fahrgastrechteverordnung (Betreuungsleistungen) ist das Eisenbahnunternehmen in einem solchen Fall verpflichtet, ${isTaxi ? 'für eine alternative Beförderung (z.B. Taxi bis zu 120 Euro) zu sorgen, da meine planmäßige Ankunft zwischen 0:00 und 5:00 Uhr lag bzw. es der letzte planmäßige Zug war.' : 'angemessene Hotel- oder andere Unterbringungskosten zu übernehmen, wenn ein Aufenthalt von einer oder mehreren Nächten notwendig wird.'}</p>
      <p>Da von Ihrem Personal vor Ort keine entsprechende Lösung bereitgestellt wurde, war ich gezwungen, diese Leistung selbst in Anspruch zu nehmen und in Vorleistung zu treten.</p>
      <p>Ich fordere Sie hiermit auf, meine Auslagen in Höhe von <strong>${amount} Euro</strong> zu erstatten. Die Originalquittung liegt diesem Schreiben bei.</p>
      <p>Bitte überweisen Sie den Betrag innerhalb von 14 Tagen auf mein Konto:</p>
      <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>
      <p>Mit freundlichen Grüßen,</p>
      <p><br>[Unterschrift]</p>
    `);
  };

  const genBrief3 = () => {
    saveUserData();
    const today = new Date().toLocaleDateString('de-DE');
    const name = b3Name || '[Dein Name]';
    const iban = b3Iban || '[Deine IBAN]';
    const date = b3Date ? new Date(b3Date).toLocaleDateString('de-DE') : '[Datum]';
    const train = b3Train || '[Zugnummer]';
    const amount = b3Amount || '[Betrag]';

    setBrief3Html(`
      <div class="sender">${name}<br>[Deine Straße]<br>[PLZ Ort]<br></div>
      <div class="recipient">An:<br>DB Fernverkehr AG<br>Fahrgastrechte<br>60647 Frankfurt am Main</div>
      <div class="date">${today}</div>
      <div class="subject">Fahrtverzicht & Forderung auf 100% Ticket-Erstattung</div>
      <p>Sehr geehrte Damen und Herren,</p>
      <p>ich hatte für den <strong>${date}</strong> eine Fahrt mit dem Zug <strong>${train}</strong> gebucht.</p>
      <p>Vor oder bei der Abfahrt war absehbar, dass der Zug mit einer Verspätung von über 60 Minuten am Zielort eintreffen würde (bzw. er ist komplett ausgefallen). Da die Fahrt nach diesen Plänen sinnlos wurde, habe ich gemäß Art. 18 der EU-Verordnung 2021/782 von meinem Recht auf Fahrtverzicht Gebrauch gemacht und die Fahrt nicht angetreten.</p>
      <p>Ich fordere Sie auf, den vollen Ticketpreis in Höhe von <strong>${amount} Euro</strong> unverzüglich zu erstatten.</p>
      <p>Die ungenutzte Originalfahrkarte liegt diesem Schreiben bei.</p>
      <p>Bitte überweisen Sie den Betrag auf folgendes Konto:</p>
      <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>
      <p>Mit freundlichen Grüßen,</p>
      <p><br>[Unterschrift]</p>
    `);
  };

  const printView = (viewId: string) => {
    const el = document.getElementById(viewId);
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
          <span className="nav-label">Kommando</span>
          <button className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => switchView('dashboard')}><span className="nav-icon">🚄</span> Dashboard</button>
          <button className={`nav-item ${activeView === 'rechner' ? 'active' : ''}`} onClick={() => switchView('rechner')}><span className="nav-icon">🧮</span> Entschädigungs-Rechner</button>
        </div>
        
        <div className="nav-group">
          <span className="nav-label">Brief-Generatoren</span>
          <button className={`nav-item ${activeView === 'brief_verspaetung' ? 'active' : ''}`} onClick={() => switchView('brief_verspaetung')}><span className="nav-icon">⏱️</span> 25% / 50% Erstattung</button>
          <button className={`nav-item ${activeView === 'brief_zusatzkosten' ? 'active' : ''}`} onClick={() => switchView('brief_zusatzkosten')}><span className="nav-icon">🚕</span> Taxi & Hotel (120€)</button>
          <button className={`nav-item ${activeView === 'brief_abbruch' ? 'active' : ''}`} onClick={() => switchView('brief_abbruch')}><span className="nav-icon">🛑</span> 100% Fahrtabbruch</button>
        </div>
        
        <div className="nav-group">
          <span className="nav-label">Juristische Waffen</span>
          <button className={`nav-item ${activeView === 'ausreden' ? 'active' : ''}`} onClick={() => switchView('ausreden')}><span className="nav-icon">🛡️</span> Die neue EU-Regel (2023)</button>
        </div>
      </aside>

      <main className="main-content relative">
        {!loadingUser && !isPro && activeView !== 'dashboard' && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--accent-red)', borderRadius: '12px', padding: '60px 40px', maxWidth: '600px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔒</div>
              <h2 style={{ color: 'var(--accent-blue)', marginBottom: '20px' }}>Premium-Werkzeug gesperrt</h2>
              <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '40px' }}>Dieses Werkzeug ist aktuell gesperrt. Schalte jetzt den vollen Funktionsumfang der Vorlagenbude frei – Lifetime, ohne Abo.</p>
              <button className="btn btn-primary" style={{ width: '100%', padding: '20px', fontSize: '18px' }} onClick={handleCheckout}>
                JETZT MASTER-PASS KAUFEN (19€)
              </button>
              <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '20px' }}>Nach der Zahlung wird dein Account automatisch freigeschaltet. Lade die Seite nach der Rückkehr ggf. einmal neu.</p>
            </div>
          </div>
        )}

        <div className="content-wrapper">
          {/* DASHBOARD */}
          {activeView === 'dashboard' && (
            <section className="view active" id="view-dashboard">
              <div className="hero" style={{ background: 'linear-gradient(135deg, var(--card) 0%, #060A1A 100%)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent-red)', padding: '40px', borderRadius: '8px', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '12px', display: 'block' }}>Fahrgastrechte Terminal</span>
                <h1>Hol dir dein Geld <br/><span style={{ color: 'var(--accent-red)' }}>von der Bahn.</span></h1>
                <p style={{ fontSize: '16px', maxWidth: '700px', marginBottom: 0 }}>Seit Juni 2023 nutzt die Bahn neue "außergewöhnliche Umstände", um nicht zu zahlen. Dieses Terminal berechnet deine exakten Ansprüche nach der aktuellen EU-Verordnung 2021/782 und generiert druckfertige Anschreiben für 25%, 50% und 100% Erstattungen sowie Taxi- und Hotelkosten.</p>
                
                <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                  <button className="btn btn-primary" onClick={() => switchView('rechner')}>Neuen Fall berechnen</button>
                  <button className="btn btn-secondary" onClick={() => switchView('brief_verspaetung')}>Zum Brief-Generator</button>
                </div>

                {!loadingUser && !isPro && (
                  <div style={{ marginTop: '24px', background: 'rgba(255,51,102,0.1)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--accent-red)', display: 'inline-block' }}>
                    <strong style={{ color: 'var(--accent-red)' }}>Dein Account ist limitiert.</strong> Du kannst aktuell nur die Übersicht betrachten.
                  </div>
                )}
              </div>

              <h3 style={{ color: 'var(--white)', marginBottom: '16px' }}>Gespeicherte Fälle</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {cases.length === 0 ? (
                  <p style={{ color: 'var(--muted)' }}>Noch keine Fälle gespeichert.</p>
                ) : (
                  cases.map(c => (
                    <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'var(--black)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--accent-red)', marginBottom: '4px' }}>{c.amount} €</div>
                        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{c.train} — {c.date}</div>
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
              <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '12px', display: 'block' }}>EU VO 2021/782</span>
              <h2>Entschädigungs-Rechner</h2>
              <p>Berechne, wie viel dir die Bahn aufgrund der Verspätung am Zielort schuldet.</p>

              <div className="grid-2" style={{ marginTop: '32px' }}>
                <div className="card highlight" style={{ borderTop: '4px solid var(--accent-red)' }}>
                  <div className="form-group">
                    <label>Art des Tickets</label>
                    <select value={cTicketType} onChange={e => setCTicketType(e.target.value)}>
                      <option value="einfach">Einzelfahrkarte / Hin- und Rückfahrt</option>
                      <option value="dticket">Deutschlandticket (49€-Ticket)</option>
                      <option value="zeitkarte">Zeitkarte (Wochen-/Monatskarte / BahnCard 100)</option>
                    </select>
                  </div>

                  {cTicketType === 'einfach' && (
                    <div className="form-group">
                      <label>Ticketpreis (in €)</label>
                      <input type="number" value={cPrice} onChange={e => setCPrice(e.target.value)} min="0" step="0.1" />
                    </div>
                  )}

                  <div className="form-group">
                    <label>Verspätung am Zielbahnhof</label>
                    <select value={cDelay} onChange={e => setCDelay(e.target.value)}>
                      <option value="0">Unter 60 Minuten (0%)</option>
                      <option value="60">60 bis 119 Minuten (25%)</option>
                      <option value="120">Ab 120 Minuten (50%)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Grund für Verspätung/Ausfall (laut Bahn)</label>
                    <select value={cReason} onChange={e => setCReason(e.target.value)}>
                      <option value="bahn">Schuld der Bahn (Lokschaden, Personalmangel, Stellwerk)</option>
                      <option value="streik">Streik des Bahn-Personals</option>
                      <option value="wetter">Extremes Wetter (Sturm, Überschwemmung)</option>
                      <option value="fremd">Fremdeinwirkung (Personen im Gleis, Kabelklau)</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Zugnummer (z.B. ICE 123)</label>
                      <input type="text" value={cTrain} onChange={e => setCTrain(e.target.value)} placeholder="ICE 123" />
                    </div>
                    <div className="form-group">
                      <label>Datum der Fahrt</label>
                      <input type="date" value={cDate} onChange={e => setCDate(e.target.value)} />
                    </div>
                  </div>

                  <button className="btn btn-primary" style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }} onClick={calculateTrainClaim}>Anspruch prüfen</button>
                </div>

                <div>
                  {cResult && (
                    <div className="card" style={{ marginBottom: '24px' }}>
                      <h3>Dein Anspruch</h3>
                      <div style={{ textAlign: 'center', padding: '40px', background: 'var(--black)', border: '2px dashed var(--border)', borderRadius: '8px', margin: '24px 0' }}>
                        <div style={{ fontSize: '72px', color: 'var(--accent-red)', lineHeight: 1, fontWeight: 700 }}>{cResult.amount} €</div>
                        <div style={{ color: 'var(--muted)', marginTop: '12px', fontSize: '16px', fontWeight: 600 }}>Erstattungswert</div>
                      </div>
                      <div className={`result-box ${cResult.class}`} style={{ display: 'block', marginBottom: '24px' }} dangerouslySetInnerHTML={{ __html: `<strong>Analyse:</strong> ${cResult.msg}` }}></div>
                      <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={saveTrainCase}>💾 Fall speichern</button>
                    </div>
                  )}

                  <div className="card">
                    <h3 style={{ color: 'var(--white)' }}>Die 4€-Bagatellgrenze</h3>
                    <p>Beträge unter 4,00 € zahlt die Bahn nicht aus. <strong>Trick für Zeitkarten/D-Ticket:</strong> Du kannst Entschädigungen (je 1,50€ beim D-Ticket) innerhalb der Gültigkeitsdauer deiner Karte <strong>sammeln</strong> und zusammen einreichen, sobald du über 4€ kommst (also ab 3 Verspätungen).</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* AUSREDEN */}
          {activeView === 'ausreden' && (
            <section className="view active" id="view-ausreden">
              <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '12px', display: 'block' }}>EU-Gesetzesänderung Juni 2023</span>
              <h2>Der neue Ausreden-Buster</h2>
              <p>Seit Juni 2023 gilt die neue EU-Bahngastrechteverordnung (VO 2021/782). Die Bahn nutzt das massiv aus, um nicht mehr zu zahlen. Hier sind die echten Regeln.</p>

              <div className="grid-2" style={{ marginTop: '32px' }}>
                <div className="card">
                  <h3 style={{ color: 'var(--accent-red)' }}>Neue Ausrede: Wetter / Fremdeinwirkung</h3>
                  <p>Die Bahn muss bei extremen Wetterereignissen (schwerer Sturm), "Personen im Gleis", Kabeldiebstahl oder Polizeieinsätzen <strong>keine 25% oder 50% Erstattung mehr zahlen</strong>.</p>
                  <div className="alert alert-danger" style={{ marginTop: '16px' }}>
                    <strong>Vorsicht:</strong> Das gilt ABER NICHT für Streiks des eigenen Personals! Bei Streik gibt es nach wie vor Geld! Und es gilt nicht für normales schlechtes Wetter (Regen, Herbstlaub).
                  </div>
                </div>

                <div className="card">
                  <h3 style={{ color: 'var(--accent-red)' }}>Die Waffe: Betreuungspflicht!</h3>
                  <p>Selbst wenn die Bahn wegen Sturm nicht erstatten muss, <strong>muss sie dir Hotel und Taxi zahlen!</strong> (Artikel 20 der VO).</p>
                  <div className="alert alert-success" style={{ marginTop: '16px' }}>
                    <strong>Regel:</strong> Fällt dein Zug aus und du kommst am selben Tag nicht mehr ans Ziel, MUSS die Bahn dir ein Hotel stellen oder bezahlen. Und wenn planmäßige Ankunft 0:00-05:00 Uhr ist und du +60 Min Verspätung hast, MUSS sie ein Taxi bis 120€ zahlen.
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* BRIEF 1: VERSAETUNG */}
          {activeView === 'brief_verspaetung' && (
            <section className="view active" id="view-brief_verspaetung">
              <div className="no-print">
                <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '12px', display: 'block' }}>Formular-Ersatz</span>
                <h2>Erstattung (25% / 50%) einfordern</h2>
                <p>Statt das unübersichtliche Fahrgastrechte-Formular der DB zu nutzen, kannst du hier ein klares, juristisches Anschreiben generieren. (Auch für gesammelte Deutschlandticket-Fälle!).</p>

                <div className="card highlight" style={{ borderTop: '4px solid var(--accent-red)', marginTop: '32px' }}>
                  <div className="form-group">
                    <label>Gespeicherten Fall laden</label>
                    <select value={b1Case} onChange={handleCaseSelect}>
                      <option value="">-- manuell eingeben --</option>
                      {cases.map(c => <option key={c.id} value={c.id}>{c.train} am {c.date} ({c.amount}€)</option>)}
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Reisender (Name)</label><input type="text" value={b1Name} onChange={e => setB1Name(e.target.value)} /></div>
                    <div className="form-group"><label>IBAN</label><input type="text" value={b1Iban} onChange={e => setB1Iban(e.target.value)} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Datum der Fahrt</label><input type="date" value={b1Date} onChange={e => setB1Date(e.target.value)} /></div>
                    <div className="form-group"><label>Zugnummer (z.B. ICE 123)</label><input type="text" value={b1Train} onChange={e => setB1Train(e.target.value)} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Abfahrtsbahnhof</label><input type="text" value={b1From} onChange={e => setB1From(e.target.value)} /></div>
                    <div className="form-group"><label>Zielbahnhof</label><input type="text" value={b1To} onChange={e => setB1To(e.target.value)} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Planmäßige Ankunft</label><input type="time" value={b1TimePlan} onChange={e => setB1TimePlan(e.target.value)} /></div>
                    <div className="form-group"><label>Tatsächliche Ankunft</label><input type="time" value={b1TimeReal} onChange={e => setB1TimeReal(e.target.value)} /></div>
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} onClick={genBrief1}>Brief generieren</button>
                </div>
              </div>

              {brief1Html && (
                <div style={{ marginTop: '24px' }}>
                  <div className="no-print" style={{ padding: '16px', background: 'var(--darker)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Brief-Vorschau</h3>
                    <button className="btn btn-secondary" onClick={() => printView('view-brief_verspaetung')}>🖨️ Drucken / PDF</button>
                  </div>
                  <div className="letter-paper" dangerouslySetInnerHTML={{ __html: brief1Html }} />
                </div>
              )}
            </section>
          )}

          {/* BRIEF 2: TAXI/HOTEL */}
          {activeView === 'brief_zusatzkosten' && (
            <section className="view active" id="view-brief_zusatzkosten">
              <div className="no-print">
                <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '12px', display: 'block' }}>EU 2021/782 Art. 20</span>
                <h2>Taxi & Hotelkosten (120€)</h2>
                <p>Einforderung von Ersatzaufwendungen. WICHTIG: Original-Belege unbedingt mitschicken!</p>

                <div className="card highlight" style={{ borderTop: '4px solid var(--accent-red)', marginTop: '32px' }}>
                  <div className="form-row">
                    <div className="form-group"><label>Reisender (Name)</label><input type="text" value={b2Name} onChange={e => setB2Name(e.target.value)} /></div>
                    <div className="form-group"><label>IBAN</label><input type="text" value={b2Iban} onChange={e => setB2Iban(e.target.value)} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Datum der Störung</label><input type="date" value={b2Date} onChange={e => setB2Date(e.target.value)} /></div>
                    <div className="form-group"><label>Ausgefallener Zug</label><input type="text" value={b2Train} onChange={e => setB2Train(e.target.value)} /></div>
                  </div>
                  <div className="form-group">
                    <label>Art der Zusatzkosten</label>
                    <select value={b2Type} onChange={e => setB2Type(e.target.value)}>
                      <option value="taxi">Taxikosten (Zugausfall Nachts / letzter Zug)</option>
                      <option value="hotel">Hotelübernachtung (Weiterfahrt am selben Tag nicht möglich)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Höhe der Kosten (in €)</label>
                    <input type="number" value={b2Amount} onChange={e => setB2Amount(e.target.value)} step="0.01" />
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} onClick={genBrief2}>Brief generieren</button>
                </div>
              </div>

              {brief2Html && (
                <div style={{ marginTop: '24px' }}>
                  <div className="no-print" style={{ padding: '16px', background: 'var(--darker)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Brief-Vorschau</h3>
                    <button className="btn btn-secondary" onClick={() => printView('view-brief_zusatzkosten')}>🖨️ Drucken / PDF</button>
                  </div>
                  <div className="letter-paper" dangerouslySetInnerHTML={{ __html: brief2Html }} />
                </div>
              )}
            </section>
          )}

          {/* BRIEF 3: ABBRUCH */}
          {activeView === 'brief_abbruch' && (
            <section className="view active" id="view-brief_abbruch">
              <div className="no-print">
                <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '12px', display: 'block' }}>100% Erstattung</span>
                <h2>Fahrtabbruch / Nichtantritt</h2>
                <p>Wenn bei Abfahrt bereits eine Verspätung von {">"}60 Minuten am Zielort absehbar war, darfst du von der Reise zurücktreten und 100% des Preises fordern.</p>

                <div className="card highlight" style={{ borderTop: '4px solid var(--accent-red)', marginTop: '32px' }}>
                  <div className="form-row">
                    <div className="form-group"><label>Reisender (Name)</label><input type="text" value={b3Name} onChange={e => setB3Name(e.target.value)} /></div>
                    <div className="form-group"><label>IBAN</label><input type="text" value={b3Iban} onChange={e => setB3Iban(e.target.value)} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Datum der Fahrt</label><input type="date" value={b3Date} onChange={e => setB3Date(e.target.value)} /></div>
                    <div className="form-group"><label>Ticketpreis (in €)</label><input type="number" value={b3Amount} onChange={e => setB3Amount(e.target.value)} step="0.01" /></div>
                  </div>
                  <div className="form-group">
                    <label>Geplanter Zug</label>
                    <input type="text" value={b3Train} onChange={e => setB3Train(e.target.value)} />
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} onClick={genBrief3}>Brief generieren</button>
                </div>
              </div>

              {brief3Html && (
                <div style={{ marginTop: '24px' }}>
                  <div className="no-print" style={{ padding: '16px', background: 'var(--darker)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Brief-Vorschau</h3>
                    <button className="btn btn-secondary" onClick={() => printView('view-brief_abbruch')}>🖨️ Drucken / PDF</button>
                  </div>
                  <div className="letter-paper" dangerouslySetInnerHTML={{ __html: brief3Html }} />
                </div>
              )}
            </section>
          )}

        </div>
      </main>
    </div>
  );
}
