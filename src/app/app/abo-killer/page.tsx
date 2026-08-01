"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface Subscription {
  id: string;
  name: string;
  category: string;
  price: number;
  cycle: string;
  endDate: string;
  notice: number;
  contract: string;
  address: string;
  status: 'active' | 'cancelled';
}

const PROVIDER_DB: Record<string, any> = {
  // STREAMING
  netflix: { name: 'Netflix', category: 'Streaming', price: 12.99, cycle: 'monthly', address: 'Netflix International B.V.\nKeizersgracht 440\n1016 GD Amsterdam\nNiederlande' },
  spotify: { name: 'Spotify', category: 'Streaming', price: 10.99, cycle: 'monthly', address: 'Spotify AB\nRegeringsgatan 19\nSE-111 53 Stockholm\nSchweden' },
  amazon: { name: 'Amazon Prime', category: 'Streaming', price: 89.90, cycle: 'yearly', address: 'Amazon Deutschland Services GmbH\nMarcel-Breuer-Str. 12\n80807 München' },
  dazn: { name: 'DAZN', category: 'Streaming', price: 29.99, cycle: 'monthly', address: 'DAZN Limited\nHanover House, Plane Tree Crescent\nFeltham, TW13 7BZ\nGroßbritannien' },
  disney: { name: 'Disney+', category: 'Streaming', price: 8.99, cycle: 'monthly', address: 'The Walt Disney Company (Benelux) B.V.\nDe Passage 144\n1101 AX Amsterdam\nNiederlande' },
  wow: { name: 'WOW (Sky)', category: 'Streaming', price: 9.99, cycle: 'monthly', address: 'Sky Deutschland Fernsehen GmbH & Co. KG\nMedienallee 26\n85774 Unterföhring' },
  youtube: { name: 'YouTube Premium', category: 'Streaming', price: 12.99, cycle: 'monthly', address: 'Google Ireland Limited\nGordon House, Barrow Street\nDublin 4\nIrland' },
  apple: { name: 'Apple Music', category: 'Streaming', price: 10.99, cycle: 'monthly', address: 'Apple Distribution International Ltd.\nHollyhill Industrial Estate\nHollyhill, Cork\nIrland' },
  
  // FITNESS
  fitx: { name: 'FitX', category: 'Fitness', price: 24.00, cycle: 'monthly', address: 'FitX Deutschland GmbH\nRuhrallee 165\n45136 Essen' },
  mcfit: { name: 'McFit', category: 'Fitness', price: 24.90, cycle: 'monthly', address: 'RSG Group GmbH\nTannenberg 4\n96132 Schlüsselfeld' },
  cleverfit: { name: 'Clever Fit', category: 'Fitness', price: 29.90, cycle: 'monthly', address: 'clever fit GmbH\nAugsburger Str. 52\n86899 Landsberg am Lech' },
  johnreed: { name: 'John Reed', category: 'Fitness', price: 30.00, cycle: 'monthly', address: 'RSG Group GmbH\nTannenberg 4\n96132 Schlüsselfeld' },
  gymondo: { name: 'Gymondo', category: 'Fitness', price: 6.99, cycle: 'monthly', address: 'Gymondo GmbH\nRitterstraße 12-14\n10969 Berlin' },

  // SOFTWARE
  adobe: { name: 'Adobe CC', category: 'Software', price: 59.49, cycle: 'monthly', address: 'Adobe Systems Software Ireland Ltd.\n4-6 Riverwalk, Citywest Business Campus\nDublin 24\nIrland' },
  microsoft: { name: 'Microsoft 365', category: 'Software', price: 69.00, cycle: 'yearly', address: 'Microsoft Ireland Operations Ltd.\nOne Microsoft Place, South County Business Park\nLeopardstown, Dublin 18\nIrland' },
  icloud: { name: 'Apple iCloud', category: 'Software', price: 2.99, cycle: 'monthly', address: 'Apple Distribution International Ltd.\nHollyhill Industrial Estate\nHollyhill, Cork\nIrland' },
  google: { name: 'Google One', category: 'Software', price: 1.99, cycle: 'monthly', address: 'Google Ireland Limited\nGordon House, Barrow Street\nDublin 4\nIrland' },

  // WOHNEN & SONSTIGES
  gez: { name: 'Rundfunkbeitrag', category: 'Wohnen', price: 18.36, cycle: 'monthly', address: 'ARD ZDF Deutschlandradio\nBeitragsservice\n50656 Köln' },
  adac: { name: 'ADAC', category: 'Sonstiges', price: 54.00, cycle: 'yearly', address: 'ADAC e.V.\nHansastraße 19\n80686 München' },
  deutschlandticket: { name: 'Deutschlandticket', category: 'Sonstiges', price: 49.00, cycle: 'monthly', address: 'DB Vertrieb GmbH\nStephensonstraße 1\n60326 Frankfurt am Main' },
  telekom: { name: 'Telekom', category: 'Wohnen', price: 39.95, cycle: 'monthly', address: 'Telekom Deutschland GmbH\nLandgrabenweg 151\n53227 Bonn' },
  vodafone: { name: 'Vodafone', category: 'Wohnen', price: 34.99, cycle: 'monthly', address: 'Vodafone GmbH\nKundenbetreuung\n40875 Ratingen' },
  o2: { name: 'O2 (Telefónica)', category: 'Wohnen', price: 29.99, cycle: 'monthly', address: 'Telefónica Germany GmbH & Co. OHG\nKundenbetreuung\n90345 Nürnberg' },

  // MEDIEN & GAMING
  audible: { name: 'Audible', category: 'Streaming', price: 9.95, cycle: 'monthly', address: 'Audible GmbH\nSchumannstraße 6\n10117 Berlin' },
  kindle: { name: 'Kindle Unlimited', category: 'Streaming', price: 11.75, cycle: 'monthly', address: 'Amazon Digital UK Limited\n1 Principal Place, Worship Street\nLondon EC2A 2FA\nGroßbritannien' },
  psplus: { name: 'PlayStation Plus', category: 'Streaming', price: 71.99, cycle: 'yearly', address: 'Sony Interactive Entertainment Network Europe Ltd.\n10 Great Marlborough Street\nLondon W1F 7LP\nGroßbritannien' },
  xbox: { name: 'Xbox Game Pass', category: 'Streaming', price: 14.99, cycle: 'monthly', address: 'Microsoft Ireland Operations Ltd.\nOne Microsoft Place\nLeopardstown, Dublin 18\nIrland' },
};

export default function AboKiller() {
  const router = useRouter();
  const [activeView, setActiveView] = useState('dashboard');
  const [isPro, setIsPro] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const [subs, setSubs] = useState<Subscription[]>([]);
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [letterHtml, setLetterHtml] = useState('');

  // Form
  const [fName, setFName] = useState('');
  const [fCat, setFCat] = useState('Streaming');
  const [fPrice, setFPrice] = useState('');
  const [fCycle, setFCycle] = useState('monthly');
  const [fEndDate, setFEndDate] = useState('');
  const [fNotice, setFNotice] = useState('1');
  const [fContract, setFContract] = useState('');
  const [fAddress, setFAddress] = useState('');

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
    const saved = localStorage.getItem('abokiller_subs');
    if (saved) setSubs(JSON.parse(saved));
    const uName = localStorage.getItem('abokiller_name');
    const uAddr = localStorage.getItem('abokiller_addr');
    if (uName) setUserName(uName);
    if (uAddr) setUserAddress(uAddr);
  }, []);

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

  const handleAutofill = (key: string) => {
    const prov = PROVIDER_DB[key];
    if (prov) {
      setFName(prov.name);
      setFCat(prov.category);
      setFPrice(prov.price.toString());
      setFCycle(prov.cycle);
      setFAddress(prov.address);
    }
  };

  const addAbo = () => {
    const newSub: Subscription = {
      id: Date.now().toString(),
      name: fName,
      category: fCat,
      price: parseFloat(fPrice || '0'),
      cycle: fCycle,
      endDate: fEndDate,
      notice: parseInt(fNotice || '1'),
      contract: fContract,
      address: fAddress,
      status: 'active'
    };
    const newSubs = [...subs, newSub];
    setSubs(newSubs);
    localStorage.setItem('abokiller_subs', JSON.stringify(newSubs));
    
    // Reset form
    setFName(''); setFPrice(''); setFContract(''); setFAddress(''); setFEndDate('');
    setActiveView('dashboard');
  };

  const deleteSub = (id: string) => {
    if(confirm('Abo wirklich löschen?')) {
      const newSubs = subs.filter(s => s.id !== id);
      setSubs(newSubs);
      localStorage.setItem('abokiller_subs', JSON.stringify(newSubs));
    }
  };

  const toggleStatus = (id: string) => {
    const newSubs = subs.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'active' ? 'cancelled' : 'active' } as Subscription;
      }
      return s;
    });
    setSubs(newSubs);
    localStorage.setItem('abokiller_subs', JSON.stringify(newSubs));
  };

  const [pendingSub, setPendingSub] = useState<Subscription | null>(null);

  const generateLetter = (sub: Subscription) => {
    if (!userName || !userAddress) {
      setPendingSub(sub);
      alert("Bitte fülle zuerst deine Absenderdaten unter Einstellungen aus!");
      setActiveView('settings');
      return;
    }

    const today = new Date().toLocaleDateString('de-DE');
    const contractInfo = sub.contract ? `(Vertrags-/Kundennummer: ${sub.contract})` : '';

    const html = `
      <div class="sender">${userName}<br>${userAddress.replace(/\n/g, '<br>')}</div>
      <div class="recipient">An:<br>${sub.name}<br>${(sub.address || '').replace(/\n/g, '<br>')}</div>
      <div class="date">${today}</div>
      <div class="subject">Kündigung meines Vertrages</div>
      <p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit kündige ich meinen oben genannten Vertrag ${contractInfo} fristgerecht zum nächstmöglichen Zeitpunkt.</p>
      <p>Bitte senden Sie mir eine schriftliche Bestätigung der Kündigung unter Angabe des Beendigungszeitpunktes zu.</p>
      <p>Gleichzeitig widerrufe ich hiermit eine Ihnen erteilte Einzugsermächtigung für mein Bankkonto zum Zeitpunkt des Vertragsendes.</p>
      <p>Mit freundlichen Grüßen,</p>
      <br><br><br>
      <p>${userName}</p>
    `;
    setLetterHtml(html);
    setActiveView('brief');
    setPendingSub(null);
  };

  const printLetter = () => {
    const el = document.getElementById('view-brief');
    if (el) {
      el.classList.add('print-me');
      window.print();
      setTimeout(() => el.classList.remove('print-me'), 500);
    }
  };

  const saveSettings = () => {
    localStorage.setItem('abokiller_name', userName);
    localStorage.setItem('abokiller_addr', userAddress);
    alert('Daten gespeichert!');
    if (pendingSub) {
      generateLetter(pendingSub);
    }
  };

  // Stats calc
  const activeSubs = subs.filter(s => s.status === 'active');
  const cancelledSubs = subs.filter(s => s.status === 'cancelled');
  
  const monthlyTotal = activeSubs.reduce((acc, s) => acc + (s.cycle === 'monthly' ? s.price : s.price / 12), 0);
  const yearlyTotal = monthlyTotal * 12;
  const savedYearly = cancelledSubs.reduce((acc, s) => acc + (s.cycle === 'yearly' ? s.price : s.price * 12), 0);

  return (
    <div className="app-container">
      <aside className="sidebar no-print">
        <div className="nav-group">
          <span className="nav-label">Zentrale</span>
          <button className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveView('dashboard')}><span className="nav-icon">📊</span> Dashboard</button>
          <button className={`nav-item ${activeView === 'neu' ? 'active' : ''}`} onClick={() => setActiveView('neu')}><span className="nav-icon">➕</span> Abo hinzufügen</button>
        </div>
        
        <div className="nav-group">
          <span className="nav-label">Waffenarsenal</span>
          <button className={`nav-item ${activeView === 'ghost' ? 'active' : ''}`} onClick={() => setActiveView('ghost')}><span className="nav-icon">🕵️</span> Ghost Detektiv</button>
          <button className={`nav-item ${activeView === 'settings' ? 'active' : ''}`} onClick={() => setActiveView('settings')}><span className="nav-icon">⚙️</span> Einstellungen (Absender)</button>
        </div>
      </aside>

      <main className="main-content relative">
        {!loadingUser && !isPro && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--accent-red)', borderRadius: '12px', padding: '60px 40px', maxWidth: '600px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔒</div>
              <h2 style={{ color: '#27ae60', marginBottom: '20px' }}>Premium-Werkzeug gesperrt</h2>
              <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '40px' }}>Dieses Werkzeug ist aktuell gesperrt. Schalte jetzt den vollen Funktionsumfang der Vorlagenbude frei – Lifetime, ohne Abo.</p>
              <button className="btn btn-primary" style={{ width: '100%', padding: '20px', fontSize: '18px', background: '#27ae60', borderColor: '#27ae60' }} onClick={handleCheckout}>
                JETZT MASTER-PASS KAUFEN (19€)
              </button>
            </div>
          </div>
        )}

        <div className="content-wrapper">
          {activeView === 'dashboard' && (
            <section className="view active">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)', borderLeft: '4px solid #3498db' }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, letterSpacing: '1px' }}>Fixkosten / Monat</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px' }}>{monthlyTotal.toFixed(2).replace('.', ',')} €</div>
                </div>
                <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)', borderLeft: '4px solid #f39c12' }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, letterSpacing: '1px' }}>Fixkosten / Jahr</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px' }}>{yearlyTotal.toFixed(2).replace('.', ',')} €</div>
                </div>
                <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)', borderLeft: '4px solid #27ae60' }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, letterSpacing: '1px' }}>Gekündigt (Gespart/Jahr)</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px', color: '#27ae60' }}>{savedYearly.toFixed(2).replace('.', ',')} €</div>
                </div>
              </div>

              <h2 style={{ marginBottom: '20px' }}>Meine Abos</h2>
              <div style={{ display: 'grid', gap: '12px' }}>
                {subs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px', border: '1px dashed var(--border)', borderRadius: '8px', color: 'var(--muted)' }}>
                    Noch keine Abos eingetragen. Klicke auf "Abo hinzufügen".
                  </div>
                ) : (
                  subs.map(s => (
                    <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'var(--black)', border: '1px solid var(--border)', borderRadius: '8px', opacity: s.status === 'cancelled' ? 0.5 : 1 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h3 style={{ margin: 0, fontSize: '18px', textDecoration: s.status === 'cancelled' ? 'line-through' : 'none' }}>{s.name}</h3>
                          <span style={{ fontSize: '10px', background: 'var(--border)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>{s.category}</span>
                        </div>
                        {s.contract && <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Vertrag: {s.contract}</div>}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '20px', fontWeight: 700 }}>{s.price.toFixed(2).replace('.', ',')} €</div>
                          <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{s.cycle === 'monthly' ? 'pro Monat' : 'pro Jahr'}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {s.status === 'active' && (
                            <button className="btn btn-primary" style={{ padding: '8px 12px', fontSize: '12px', background: '#e74c3c', borderColor: '#e74c3c' }} onClick={() => generateLetter(s)}>Kündigen (PDF)</button>
                          )}
                          <button className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '12px' }} onClick={() => toggleStatus(s.id)}>{s.status === 'active' ? 'Als gekündigt markieren' : 'Wieder aktivieren'}</button>
                          <button className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '12px', color: '#e74c3c' }} onClick={() => deleteSub(s.id)}>Löschen</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {activeView === 'neu' && (
            <section className="view active">
              <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: '#27ae60', marginBottom: '12px', display: 'block' }}>Kostenfalle hinzufügen</span>
              <h2>Neues Abo hinterlegen</h2>
              
              <div className="card highlight" style={{ borderTop: '4px solid #27ae60', marginTop: '24px' }}>
                <div className="form-group">
                  <label>🔍 Schnell-Auswahl (Auto-Fill)</label>
                  <select onChange={e => handleAutofill(e.target.value)} defaultValue="">
                    <option value="" disabled>Manuell eintragen...</option>
                    <optgroup label="Streaming">
                      <option value="netflix">Netflix</option>
                      <option value="spotify">Spotify</option>
                      <option value="amazon">Amazon Prime</option>
                      <option value="disney">Disney+</option>
                      <option value="youtube">YouTube Premium</option>
                    </optgroup>
                    <optgroup label="Fitness">
                      <option value="mcfit">McFit</option>
                      <option value="fitx">FitX</option>
                      <option value="cleverfit">Clever Fit</option>
                    </optgroup>
                    <optgroup label="Sonstiges">
                      <option value="gez">Rundfunkbeitrag (GEZ)</option>
                      <option value="deutschlandticket">Deutschlandticket</option>
                      <option value="adac">ADAC</option>
                    </optgroup>
                  </select>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />

                <div className="form-group">
                  <label>Anbieter / Name</label>
                  <input type="text" value={fName} onChange={e => setFName(e.target.value)} placeholder="z.B. Netflix" />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Kategorie</label>
                    <select value={fCat} onChange={e => setFCat(e.target.value)}>
                      <option value="Streaming">Streaming</option>
                      <option value="Fitness">Fitness</option>
                      <option value="Software">Software</option>
                      <option value="Wohnen">Wohnen / Leben</option>
                      <option value="Sonstiges">Sonstiges</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Kosten</label>
                    <input type="number" step="0.01" value={fPrice} onChange={e => setFPrice(e.target.value)} placeholder="0.00" />
                  </div>
                  <div className="form-group">
                    <label>Zyklus</label>
                    <select value={fCycle} onChange={e => setFCycle(e.target.value)}>
                      <option value="monthly">Monatlich</option>
                      <option value="yearly">Jährlich</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Kundennummer / Vertrags-ID (Wichtig für Kündigung)</label>
                  <input type="text" value={fContract} onChange={e => setFContract(e.target.value)} />
                </div>
                
                <div className="form-group">
                  <label>Adresse des Anbieters (Für PDF-Brief)</label>
                  <textarea value={fAddress} onChange={e => setFAddress(e.target.value)} rows={3}></textarea>
                </div>

                <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} onClick={addAbo}>Abo speichern</button>
              </div>
            </section>
          )}

          {activeView === 'settings' && (
            <section className="view active">
              <h2>Einstellungen (Absenderdaten)</h2>
              <p style={{ color: 'var(--muted)' }}>Diese Daten werden für die automatische Generierung deiner PDF-Kündigungsschreiben verwendet.</p>
              
              <div className="card" style={{ marginTop: '24px' }}>
                <div className="form-group">
                  <label>Dein Vor- und Nachname</label>
                  <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Deine Adresse (Straße, PLZ, Ort)</label>
                  <textarea value={userAddress} onChange={e => setUserAddress(e.target.value)} rows={3}></textarea>
                </div>
                <button className="btn btn-primary" onClick={saveSettings}>Speichern</button>
              </div>
            </section>
          )}

          {activeView === 'ghost' && (
            <section className="view active">
              <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: '#3498db', marginBottom: '12px', display: 'block' }}>Die Kostenfallen</span>
              <h2>🕵️ Der Ghost-Abo Detektiv</h2>
              <p style={{ color: 'var(--muted)' }}>Wir haben die häufigsten, heimlichen Geldfresser identifiziert. Gehe diese Checkliste durch – zahlst du für einen dieser Dienste, ohne es zu merken?</p>

              <div className="card" style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ width: 'auto' }} /> Apple iCloud / Google One Speicher (oft 0,99€ - 9,99€)</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ width: 'auto' }} /> Amazon Prime (wird oft jährlich unerwartet abgebucht)</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ width: 'auto' }} /> Jahresgebühr der Kreditkarte (oft 30-100€)</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ width: 'auto' }} /> Audible Hörbücher (wird oft vergessen zu kündigen)</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ width: 'auto' }} /> Handy-App-Abos (Tinder, Bumble, Fitness-Apps, oft in-App Käufe)</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ width: 'auto' }} /> Zeitschriften-Abos (Readly, Spiegel+, etc.)</label>
                </div>
              </div>
            </section>
          )}

          {activeView === 'brief' && letterHtml && (
            <section className="view active" id="view-brief">
              <div className="no-print" style={{ padding: '16px', background: 'var(--darker)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ margin: 0 }}>Kündigungsschreiben</h3>
                <button className="btn btn-secondary" onClick={printLetter}>🖨️ Drucken / Als PDF speichern</button>
              </div>
              <div className="letter-paper" dangerouslySetInnerHTML={{ __html: letterHtml }} />
            </section>
          )}

        </div>
      </main>
    </div>
  );
}
