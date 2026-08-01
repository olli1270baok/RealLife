"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isPro, setIsPro] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        setIsPro(session.user.app_metadata?.is_pro === true);
      }
      setLoadingUser(false);
    };
    fetchUser();
  }, []);

  // Paket State
  const [pKaeufer, setPKaeufer] = useState('privat');
  const [pStatus, setPStatus] = useState('verloren');
  const [pZustimmung, setPZustimmung] = useState('nein');
  const [pResult, setPResult] = useState<{ status: string, html: string } | null>(null);

  // Gewährleistung State
  const [gKaufdatum, setGKaufdatum] = useState('');
  const [gDefektdatum, setGDefektdatum] = useState('');
  const [gResult, setGResult] = useState<{ status: string, html: string } | null>(null);

  // Brief State
  const [bName, setBName] = useState('');
  const [bAdresse, setBAdresse] = useState('');
  const [bHaendler, setBHaendler] = useState('');
  const [bBestellnr, setBBestellnr] = useState('');
  const [bArt, setBArt] = useState('paket');
  const [letterHtml, setLetterHtml] = useState<string | null>(null);

  const switchView = (viewId: string) => {
    setActiveView(viewId);
    window.scrollTo(0, 0);
  };

  const checkPaket = () => {
    if (pKaeufer === 'gewerblich') {
      setPResult({
        status: 'fail',
        html: "<h3>❌ Händler haftet NICHT!</h3><p>Beim B2B-Kauf geht die Gefahr auf dich über, sobald der Händler das Paket an den Zusteller übergibt (§ 447 BGB).</p>"
      });
      return;
    }
    if (pZustimmung === 'ja' && (pStatus === 'ablageort' || pStatus === 'nachbar')) {
      setPResult({
        status: 'fail',
        html: "<h3>❌ Du haftest! (Garagenvertrag)</h3><p>Da du dem Paketdienst ausdrücklich die Erlaubnis erteilt hast, das Paket dort abzulegen, endete die Verantwortung des Händlers genau dort.</p>"
      });
      return;
    }
    setPResult({
      status: 'success',
      html: "<h3>✅ Der Händler haftet zu 100%!</h3><p>Beim privaten Verbrauchsgüterkauf (§ 475 BGB) trägt IMMER der Händler das Versandrisiko.</p>"
    });
  };

  const checkGewaehrleistung = () => {
    if (!gKaufdatum || !gDefektdatum) return;
    const kauf = new Date(gKaufdatum);
    const def = new Date(gDefektdatum);
    const months = (def.getFullYear() - kauf.getFullYear()) * 12 + (def.getMonth() - kauf.getMonth());

    if (months > 24) {
      setGResult({ status: 'fail', html: "<h3>❌ Gewährleistung abgelaufen (24 Monate überschritten)</h3>" });
    } else if (months <= 12) {
      setGResult({
        status: 'success',
        html: `<h3>✅ Beweislast beim Händler!</h3><p>Der Defekt trat innerhalb von 12 Monaten auf. Gemäß <strong>§ 477 BGB (Beweislastumkehr)</strong> muss der Händler beweisen, dass du es warst! Du hast Recht auf kostenlose Reparatur oder Neuware.</p>`
      });
    } else {
      setGResult({
        status: 'fail',
        html: `<h3>⚠️ Beweislast bei DIR (Monat ${months})</h3><p>Die 12 Monate sind um. Nun musst DU (z.B. per Gutachten) beweisen, dass der Fehler schon beim Kauf versteckt vorhanden war.</p>`
      });
    }
  };

  const generateLetter = () => {
    const name = bName || '[Vor- und Nachname]';
    const adresse = bAdresse || '[Straße, PLZ, Ort]';
    const haendler = bHaendler || '[Gegenseite]';
    const bestellnr = bBestellnr || '[Aktenzeichen]';
    const today = new Date().toLocaleDateString('de-DE');

    let subj = "";
    let body = "";

    if (bArt === 'paket') {
      subj = `Mahnung bei Nichtlieferung / Verlust der Sendung - Nr: ${bestellnr}`;
      body = `<p>Sehr geehrte Damen und Herren,</p><p>ich habe bei Ihnen Ware gekauft. Diese ist nicht bei mir eingetroffen.</p><p>Der Paketdienstleister behauptet fälschlicherweise, das Paket sei zugestellt worden. Die Gefahr des zufälligen Untergangs der Sache geht gemäß <strong>§ 475 Abs. 2 BGB</strong> (Verbrauchsgüterkauf) erst dann auf mich über, wenn mir die Sache physisch übergeben wurde.</p><p>Ich fordere Sie auf, mir die bezahlte Ware bis spätestens in <strong>10 Tagen</strong> zukommen zu lassen oder den Kaufbetrag zu erstatten.</p>`;
    } else if (bArt === 'gewaehrleistung') {
      subj = `Aufforderung zur Nacherfüllung (Sachmangel) - Nr: ${bestellnr}`;
      body = `<p>Sehr geehrte Damen und Herren,</p><p>der bei Ihnen gekaufte Artikel weist einen Sachmangel auf, der nicht durch mich verschuldet wurde. Da der Mangel innerhalb der ersten 12 Monate nach Übergabe aufgetreten ist, greift zu meinen Gunsten die <strong>Beweislastumkehr gem. § 477 BGB</strong>.</p><p>Ich fordere Sie zur Nacherfüllung gemäß <strong>§ 439 BGB</strong> auf. Bitte tauschen Sie den Artikel gegen einen mangelfreien aus oder reparieren Sie ihn kostenfrei. Frist: <strong>14 Tage</strong>.</p>`;
    } else if (bArt === 'amazon_sperre') {
      subj = `Widerspruch gegen Kontosperrung / Auszahlung Guthaben - Konto: ${bestellnr}`;
      body = `<p>Sehr geehrte Damen und Herren,</p><p>Sie haben mein Kundenkonto ohne nachvollziehbare Begründung gesperrt. Auf diesem Konto befindet sich noch mein rechtmäßiges Eigentum in Form von Geschenkkarten-Guthaben.</p><p>Ich fordere Sie hiermit auf, das eingefrorene Guthaben innerhalb von 14 Tagen auf mein Bankkonto auszuzahlen. Ein Einbehalt erfüllt den Tatbestand der ungerechtfertigten Bereicherung (§ 812 BGB).</p><p>Zudem fordere ich gemäß <strong>Art. 15 DSGVO</strong> vollumfängliche Auskunft über alle zu meiner Person gespeicherten Daten.</p>`;
    }

    const html = `
      <div class="sender">${name.replace(/\n/g, '<br>')}<br>${adresse.replace(/\n/g, '<br>')}</div>
      <div class="recipient">An:<br>${haendler.replace(/\n/g, '<br>')}</div>
      <div class="date">${today}</div>
      <div class="subject">${subj}</div>
      ${body}
      <p>Mit freundlichen Grüßen,</p>
      <br><br><br>
      <p>${name.split('\n')[0]}</p>
    `;

    setLetterHtml(html);
  };

  const printLetter = () => {
    // Add print-me class to view-briefe then print
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
          <span className="nav-label">Dashboard</span>
          <button className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => switchView('dashboard')}><span className="nav-icon">🛡️</span> Home</button>
        </div>
        
        <div className="nav-group">
          <span className="nav-label">Kauf & Versand</span>
          <button className={`nav-item ${activeView === 'paket' ? 'active' : ''}`} onClick={() => switchView('paket')}><span className="nav-icon">📦</span> Paket-Verlust</button>
        </div>
        
        <div className="nav-group">
          <span className="nav-label">Mängel & Defekte</span>
          <button className={`nav-item ${activeView === 'gewaehrleistung' ? 'active' : ''}`} onClick={() => switchView('gewaehrleistung')}><span className="nav-icon">🔍</span> Gewährleistung</button>
        </div>

        <div className="nav-group">
          <span className="nav-label">Tech Giganten</span>
          <button className={`nav-item ${activeView === 'amazon' ? 'active' : ''}`} onClick={() => switchView('amazon')}><span className="nav-icon">🛒</span> Amazon-Spezial</button>
        </div>
        
        <div className="nav-group">
          <span className="nav-label">Generatoren</span>
          <button className={`nav-item ${activeView === 'briefe' ? 'active' : ''}`} onClick={() => switchView('briefe')}><span className="nav-icon">📜</span> PDF-Brief-Terminal</button>
        </div>
      </aside>

      <main className="main-content" style={{ position: 'relative' }}>
        <div className="content-wrapper">
          {/* PAYWALL OVERLAY */}
          {!loadingUser && !isPro && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(5px)',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px',
              textAlign: 'center'
            }}>
              <div className="card" style={{ maxWidth: '500px', border: '1px solid var(--accent-red)' }}>
                <h2>Master-Pass erforderlich 🔒</h2>
                <p style={{ color: 'var(--muted)', marginBottom: '30px' }}>
                  Die Tools sind für dich aktuell gesperrt. Schalte jetzt den vollen Funktionsumfang der Vorlagenbude frei – Lifetime, ohne Abo.
                </p>
                <a 
                  href={`https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01?client_reference_id=${userId}`} 
                  className="btn btn-primary" 
                  style={{ width: '100%', fontSize: '18px', padding: '16px', display: 'block', textDecoration: 'none' }}
                >
                  Jetzt Master-Pass kaufen (19€)
                </a>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '20px', marginBottom: 0 }}>
                  Nach der Zahlung wird dein Account automatisch und sofort freigeschaltet. (Lade die Seite nach der Rückkehr ggf. einmal neu).
                </p>
              </div>
            </div>
          )}

          {/* DASHBOARD */}
          {activeView === 'dashboard' && (
            <section className="view active" id="view-dashboard">
              <div className="hero">
                <h1>E-Commerce Bossen <br/>den <span>Krieg erklären.</span></h1>
                <p style={{fontSize: '16px', maxWidth: '700px', marginBottom: 0}}>
                  Die PRO-Version des Retouren-Rebells. Jetzt als echte Next.js Web-App.
                </p>
              </div>

              <div className="grid-3">
                <div className="card" style={{cursor: 'pointer'}} onClick={() => switchView('paket')}>
                  <h3 style={{color: 'var(--brown)'}}>📦 Paket-Verlust</h3>
                  <p>Händler wälzen Paketverlust gern auf DHL ab. Zerstöre diesen Trick mit § 475 BGB.</p>
                </div>
                <div className="card" style={{cursor: 'pointer'}} onClick={() => switchView('gewaehrleistung')}>
                  <h3 style={{color: '#00ff88'}}>🔍 12M Beweislast</h3>
                  <p>Berechne die gesetzliche 12-monatige Beweislastumkehr auf den Tag genau.</p>
                </div>
                <div className="card" style={{cursor: 'pointer'}} onClick={() => switchView('amazon')}>
                  <h3 style={{color: '#FFA600'}}>🛒 Amazon-Spezial</h3>
                  <p>Kontosperrungen, eingefrorenes Gutscheinguthaben und falsche Retouren.</p>
                </div>
              </div>
            </section>
          )}

          {/* PAKET */}
          {activeView === 'paket' && (
            <section className="view active" id="view-paket">
              <h2>Paket-Verlust & Beschädigung (Zusteller-Trick)</h2>
              <div className="alert alert-danger">
                <strong>Regel Nr.1:</strong> Lass dich NIEMALS vom Händler an DHL, Hermes oder UPS verweisen! Der Händler hat den Vertrag, nicht du.
              </div>

              <div className="card highlight">
                <h3>Fallprüfung: Wer haftet?</h3>
                <div className="form-group">
                  <label>Wer hat bestellt?</label>
                  <select value={pKaeufer} onChange={(e) => setPKaeufer(e.target.value)}>
                    <option value="privat">Ich als Privatperson (Verbraucher)</option>
                    <option value="gewerblich">Ich für meine Firma (B2B)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Wo ist das Paket laut Tracking?</label>
                  <select value={pStatus} onChange={(e) => setPStatus(e.target.value)}>
                    <option value="verloren">Es hat sich seit Tagen nicht bewegt / Verloren</option>
                    <option value="nachbar">Zugestellt beim Nachbarn</option>
                    <option value="ablageort">Zugestellt am Ablageort</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Ablageort zugestimmt?</label>
                  <select value={pZustimmung} onChange={(e) => setPZustimmung(e.target.value)}>
                    <option value="nein">Nein, das hat der Bote einfach gemacht</option>
                    <option value="ja">Ja, ich habe die Erlaubnis erteilt</option>
                  </select>
                </div>
                <button className="btn btn-primary" style={{width: '100%'}} onClick={checkPaket}>Rechtslage prüfen</button>

                {pResult && (
                  <div className={`result-box ${pResult.status}`} style={{display: 'block'}} dangerouslySetInnerHTML={{ __html: pResult.html }} />
                )}
              </div>
            </section>
          )}

          {/* GEWÄHRLEISTUNG */}
          {activeView === 'gewaehrleistung' && (
            <section className="view active" id="view-gewaehrleistung">
              <h2>Gewährleistungs-Scanner (Beweislast)</h2>
              <div className="grid-2">
                <div className="card highlight">
                  <div className="form-group">
                    <label>Kauf- / Lieferdatum des Artikels</label>
                    <input type="date" value={gKaufdatum} onChange={(e) => setGKaufdatum(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Wann ist der Defekt aufgetreten?</label>
                    <input type="date" value={gDefektdatum} onChange={(e) => setGDefektdatum(e.target.value)} />
                  </div>
                  <button className="btn btn-primary" style={{width: '100%'}} onClick={checkGewaehrleistung}>Frist Berechnen</button>
                  {gResult && (
                    <div className={`result-box ${gResult.status}`} style={{display: 'block'}} dangerouslySetInnerHTML={{ __html: gResult.html }} />
                  )}
                </div>
              </div>
            </section>
          )}

          {/* AMAZON */}
          {activeView === 'amazon' && (
            <section className="view active" id="view-amazon">
              <h2>Amazon-Spezial (Sperren & Retouren-Albtraum)</h2>
              <div className="grid-2">
                <div className="card highlight" style={{borderColor: '#FFA600'}}>
                  <h3 style={{color: '#FFA600'}}>Albtraum 1: Kontosperrung</h3>
                  <p><strong>Die Waffe:</strong> Die DSGVO. Ein US-Konzern darf in Europa Guthaben nicht grundlos einfrieren. Nutze den Brief-Generator!</p>
                </div>
              </div>
            </section>
          )}

          {/* BRIEFE */}
          {activeView === 'briefe' && (
            <section className="view active" id="view-briefe">
              <h2>📜 Brief-Terminal (PDF-Generator)</h2>
              
              <div className="card highlight no-print">
                <div className="form-row">
                  <div className="form-group">
                    <label>Dein Vor- und Nachname</label>
                    <input type="text" value={bName} onChange={(e) => setBName(e.target.value)} placeholder="Max Mustermann" />
                  </div>
                  <div className="form-group">
                    <label>Deine Adresse</label>
                    <input type="text" value={bAdresse} onChange={(e) => setBAdresse(e.target.value)} placeholder="Musterstr. 1" />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Gegenseite (Händler)</label>
                    <input type="text" value={bHaendler} onChange={(e) => setBHaendler(e.target.value)} placeholder="Shop XYZ GmbH" />
                  </div>
                  <div className="form-group">
                    <label>Akten- / Bestellnummer</label>
                    <input type="text" value={bBestellnr} onChange={(e) => setBBestellnr(e.target.value)} placeholder="DE-123456" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Art des Schreibens wählen</label>
                  <select value={bArt} onChange={(e) => setBArt(e.target.value)}>
                    <option value="paket">Paketverlust: Rückerstattung erzwingen (§ 475 BGB)</option>
                    <option value="gewaehrleistung">Gewährleistung: Nacherfüllung einfordern (§ 439 BGB)</option>
                    <option value="amazon_sperre">Amazon: Kontosperrung & Guthabenforderung (DSGVO)</option>
                  </select>
                </div>
                
                <button className="btn btn-primary" style={{width: '100%', marginTop: '10px'}} onClick={generateLetter}>PDF-Vorschau generieren</button>
              </div>

              {letterHtml && (
                <>
                  <div id="letter-preview-box" className="no-print" style={{display: 'block'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', marginBottom: '10px'}}>
                      <h3>VORSCHAU-DOKUMENT</h3>
                      <button className="btn btn-secondary" onClick={printLetter}>🖨️ PDF / Drucken</button>
                    </div>
                  </div>
                  <div id="letter-output" className="letter-paper" style={{display: 'block'}} dangerouslySetInnerHTML={{ __html: letterHtml }} />
                </>
              )}
            </section>
          )}

        </div>
      </main>
    </div>
  );
}
