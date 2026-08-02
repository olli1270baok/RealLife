"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RetourenRebell() {
  const router = useRouter();
  const [activeView, setActiveView] = useState('dashboard');
  const [isPro, setIsPro] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // States for Brief Generator
  const [bName, setBName] = useState('');
  const [bAdresse, setBAdresse] = useState('');
  const [bHaendler, setBHaendler] = useState('');
  const [bBestellnr, setBBestellnr] = useState('');
  const [bArt, setBArt] = useState('paket');
  const [letterHtml, setLetterHtml] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  // States for Paket Logic
  const [pKaeufer, setPKaeufer] = useState('privat');
  const [pStatus, setPStatus] = useState('verloren');
  const [pZustimmung, setPZustimmung] = useState('nein');
  const [pResult, setPResult] = useState<{status: 'success' | 'fail', html: string} | null>(null);

  // States for Gewährleistung Logic
  const [gKaufdatum, setGKaufdatum] = useState('');
  const [gDefektdatum, setGDefektdatum] = useState('');
  const [gResult, setGResult] = useState<{status: 'success' | 'fail' | 'warn', html: string} | null>(null);

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

  // Load saved data on mount
  useEffect(() => {
    const savedName = localStorage.getItem('rebell_name');
    const savedAdresse = localStorage.getItem('rebell_adresse');
    if (savedName) setBName(savedName);
    if (savedAdresse) setBAdresse(savedAdresse);
  }, []);

  // Save data on change
  useEffect(() => {
    localStorage.setItem('rebell_name', bName);
    localStorage.setItem('rebell_adresse', bAdresse);
  }, [bName, bAdresse]);

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

  // === PAKET LOGIK ===
  const checkPaket = () => {
    if (pKaeufer === 'gewerblich') {
      setPResult({
        status: 'fail',
        html: "<h3>❌ Händler haftet NICHT!</h3><p>Beim B2B-Kauf geht die Gefahr auf dich über, sobald der Händler das Paket an den Zusteller (DHL, Hermes, DPD etc.) übergibt (§ 447 BGB).</p>"
      });
      return;
    }

    if (pZustimmung === 'ja' && (pStatus === 'ablageort' || pStatus === 'nachbar')) {
      setPResult({
        status: 'fail',
        html: "<h3>❌ Du haftest! (Garagenvertrag)</h3><p>Da du dem Paketdienst (z.B. in der App) ausdrücklich die Erlaubnis erteilt hast, das Paket dort abzulegen, endete die Verantwortung des Händlers genau dort.</p>"
      });
      return;
    }

    setPResult({
      status: 'success',
      html: "<h3>✅ Der Händler haftet zu 100%!</h3><p>Beim privaten Verbrauchsgüterkauf (§ 475 BGB) trägt IMMER der Händler das Versandrisiko, bis du das Paket in Händen hältst.</p>"
    });
  };

  // === GEWÄHRLEISTUNG LOGIK ===
  const checkGewaehrleistung = () => {
    if (!gKaufdatum || !gDefektdatum) return;
    const kauf = new Date(gKaufdatum);
    const def = new Date(gDefektdatum);
    
    const months = (def.getFullYear() - kauf.getFullYear()) * 12 + (def.getMonth() - kauf.getMonth());
    
    if (months > 24) {
      setGResult({
        status: 'fail',
        html: "<h3>❌ Gewährleistung abgelaufen (24 Monate überschritten)</h3>"
      });
    } else if (months <= 12) {
      setGResult({
        status: 'success',
        html: `<h3>✅ Beweislast beim Händler!</h3><p>Der Defekt trat innerhalb von 12 Monaten auf. Gemäß <strong>§ 477 BGB (Beweislastumkehr)</strong> muss der Händler beweisen, dass du es warst! Du hast Recht auf kostenlose Reparatur oder Neuware.</p>`
      });
    } else {
      setGResult({
        status: 'warn',
        html: `<h3>⚠️ Beweislast bei DIR (Monat ${months})</h3><p>Die 12 Monate sind um. Nun musst DU (z.B. per Gutachten) beweisen, dass der Fehler schon beim Kauf versteckt vorhanden war.</p>`
      });
    }
  };

  const generateLetter = () => {
    setIsScanning(true);
    setScanStep(0);

    setTimeout(() => setScanStep(1), 400);
    setTimeout(() => setScanStep(2), 800);
    setTimeout(() => setScanStep(3), 1200);

    setTimeout(() => {
      const name = bName || '[Vor- und Nachname]';
      const adresse = bAdresse || '[Straße, PLZ, Ort]';
      const haendler = bHaendler || '[Gegenseite]';
      const bestellnr = bBestellnr || '[Aktenzeichen]';
      const today = new Date().toLocaleDateString('de-DE');
      
      let subj = "";
      let body = "";

      if (bArt === 'paket') {
        subj = `Mahnung bei Nichtlieferung / Verlust der Sendung - Nr: ${bestellnr}`;
        body = `<p>Sehr geehrte Damen und Herren,</p>
        <p>ich habe bei Ihnen Ware gekauft. Diese ist nicht bei mir eingetroffen.</p>
        <p>Der Paketdienstleister behauptet fälschlicherweise, das Paket sei zugestellt worden. Die Gefahr des zufälligen Untergangs der Sache geht gemäß <strong>§ 475 Abs. 2 BGB</strong> (Verbrauchsgüterkauf) erst dann auf mich über, wenn mir die Sache physisch übergeben wurde. Ein Verweis auf den Versanddienstleister weise ich zurück.</p>
        <p>Ich fordere Sie auf, mir die bezahlte Ware bis spätestens in <strong>10 Tagen</strong> zukommen zu lassen oder den Kaufbetrag zu erstatten.</p>`;
      } else if (bArt === 'gewaehrleistung') {
        subj = `Aufforderung zur Nacherfüllung (Sachmangel) - Nr: ${bestellnr}`;
        body = `<p>Sehr geehrte Damen und Herren,</p>
        <p>der bei Ihnen gekaufte Artikel weist einen Sachmangel auf, der nicht durch mich verschuldet wurde. Da der Mangel innerhalb der ersten 12 Monate nach Übergabe aufgetreten ist, greift zu meinen Gunsten die <strong>Beweislastumkehr gem. § 477 BGB</strong>.</p>
        <p>Ich fordere Sie zur Nacherfüllung gemäß <strong>§ 439 BGB</strong> auf. Bitte tauschen Sie den Artikel gegen einen mangelfreien aus oder reparieren Sie ihn kostenfrei. Frist: <strong>14 Tage</strong>.</p>`;
      } else if (bArt === 'verzug') {
        subj = `Lieferverzug: Fristsetzung und Rücktrittsvorbehalt - Nr: ${bestellnr}`;
        body = `<p>Sehr geehrte Damen und Herren,</p>
        <p>ich warte nun bereits seit mehreren Wochen auf die Lieferung meiner bezahlten Ware. Hiermit setze ich Ihnen eine letzte Nachfrist zur Lieferung bis spätestens <strong>10 Tage ab heute</strong>.</p>
        <p>Sollte die Frist fruchtlos verstreichen, erkläre ich bereits jetzt hilfsweise den <strong>Rücktritt vom Kaufvertrag gemäß § 323 BGB</strong> und fordere Sie auf, mir den Kaufpreis umgehend zu erstatten.</p>`;
      } else if (bArt === 'reparatur') {
        subj = `Recht auf Reparatur (EU-Richtlinie 2026) - Nr: ${bestellnr}`;
        body = `<p>Sehr geehrte Damen und Herren,</p>
        <p>das bei Ihnen gekaufte Gerät ist defekt. Anstelle eines Neukaufs mache ich hiermit mein gesetzliches <strong>Recht auf Reparatur</strong> (gemäß der 2026 in Kraft getretenen nationalen Umsetzung der EU-Reparatur-Richtlinie) geltend.</p>
        <p>Sie sind verpflichtet, die Instandsetzung des Produkts zu zumutbaren Bedingungen anzubieten und die erforderlichen Ersatzteile vorzuhalten. Ich erwarte Ihren Kostenvoranschlag innerhalb von 14 Tagen.</p>`;
      } else if (bArt === 'inapp') {
        subj = `Widerruf: Unwirksamer Vertrag durch Minderjährigen (§§ 108, 110 BGB) - Nr: ${bestellnr}`;
        body = `<p>Sehr geehrte Damen und Herren,</p>
        <p>die oben genannten Transaktionen (In-App-Käufe) wurden ohne meine Zustimmung von meinem minderjährigen Kind getätigt. Da die getätigten Summen den Rahmen des üblichen Taschengeldes bei Weitem überschreiten, findet der sogenannte Taschengeldparagraph (§ 110 BGB) keine Anwendung.</p>
        <p>Gemäß <strong>§ 108 Abs. 1 BGB</strong> sind Verträge, die von beschränkt Geschäftsfähigen ohne die erforderliche Einwilligung der gesetzlichen Vertreter geschlossen werden, schwebend unwirksam. Hiermit verweigere ich als gesetzlicher Vertreter offiziell und endgültig die Genehmigung zu diesen Vertragsabschlüssen.</p>
        <p>Die Verträge sind somit von Anfang an nichtig. Ich fordere Sie auf, den abgebuchten Betrag umgehend auf mein Konto zurückzuerstatten.</p>`;
      } else if (bArt === 'amazon_sperre') {
        subj = `Widerspruch gegen Kontosperrung / Auszahlung Guthaben - Konto: ${bestellnr}`;
        body = `<p>Sehr geehrte Damen und Herren,</p>
        <p>Sie haben mein Kundenkonto ohne nachvollziehbare Begründung gesperrt. Auf diesem Konto befindet sich noch mein rechtmäßiges Eigentum in Form von Geschenkkarten-Guthaben / Kontostand.</p>
        <p>Ich fordere Sie hiermit auf, das eingefrorene Guthaben innerhalb von 14 Tagen auf mein Bankkonto auszuzahlen. Ein Einbehalt dieses Guthabens erfüllt den Tatbestand der ungerechtfertigten Bereicherung (§ 812 BGB).</p>
        <p>Zudem fordere ich gemäß <strong>Art. 15 DSGVO</strong> vollumfängliche Auskunft über alle zu meiner Person gespeicherten Daten, insbesondere über das interne "Scoring" und die genauen maschinellen Gründe (Algorithmus), die zur Kontosperrung führten.</p>`;
      } else if (bArt === 'amazon_eides') {
        subj = `Eidesstattliche Versicherung - Rücksendung / Falscher Artikel - Bestellnr: ${bestellnr}`;
        body = `<p>Sehr geehrte Damen und Herren,</p>
        <p>Sie werfen mir vor, bei meiner Retoure zu der oben genannten Bestellung einen falschen Artikel oder ein leeres Paket zurückgesendet zu haben. Dies weise ich aufs Schärfste zurück. Das Paket wurde von mir mit dem korrekten Original-Artikel verpackt und an den Versanddienstleister übergeben.</p>
        <p>Zur Glaubhaftmachung gebe ich hiermit folgende <strong>Eidesstattliche Versicherung</strong> ab:</p>
        <p style="font-style:italic; padding-left:20px; border-left:3px solid #ccc">"Ich versichere hiermit an Eides statt, dass ich den zur Bestellung gehörenden Original-Artikel in unbeschädigtem Zustand in das Retouren-Paket gelegt und dieses ordnungsgemäß an den Versanddienstleister übergeben habe. Mir ist bekannt, dass die Abgabe einer falschen eidesstattlichen Versicherung gemäß § 156 StGB strafbar ist."</p>
        <p>Ich erwarte nunmehr die sofortige und vollständige Erstattung des Kaufpreises.</p>`;
      } else if (bArt === 'inkasso') {
        subj = `Bestreiten der Forderung & Untersagung der Schufa-Meldung - Aktenzeichen: ${bestellnr}`;
        body = `<p>Sehr geehrte Damen und Herren,</p>
        <p>hiermit weise ich die von Ihnen geltend gemachte Hauptforderung in vollem Umfang zurück und bestreite diese ausdrücklich. Ein rechtsgültiger Vertrag bzw. ein offener Rechnungsbetrag, der diese Forderung rechtfertigen würde, liegt nicht vor.</p>
        <p>Ich weise Sie in aller Deutlichkeit auf <strong>§ 31 Abs. 2 BDSG</strong> hin: Da die Forderung hiermit offiziell bestritten ist, untersage ich Ihnen jegliche Übermittlung von Daten zu dieser Forderung an Auskunfteien (wie die SCHUFA Holding AG).</p>
        <p>Eine Zuwiderhandlung oder eine unberechtigte Einmeldung stellt einen gravierenden Verstoß gegen die DSGVO sowie das BDSG dar, was ich unmittelbar mit einer Beschwerde beim Landesdatenschutzbeauftragten sowie Schadensersatzforderungen sanktionieren werde.</p>`;
      } else if (bArt === 'kleinanzeigen') {
        subj = `Rücktritt vom Kaufvertrag wegen arglistiger Täuschung - Vorgang: ${bestellnr}`;
        body = `<p>Sehr geehrte/r Verkäufer/in,</p>
        <p>der von Ihnen verkaufte Artikel weist erhebliche, verschwiegene Mängel auf. Der in Ihrem Inserat/Kaufvertrag formulierte Haftungsausschluss ("Gekauft wie gesehen" / "Unter Ausschluss jeglicher Gewährleistung") ist gemäß <strong>§ 444 BGB</strong> unwirksam, da Sie einen wesentlichen Mangel arglistig verschwiegen bzw. eine Beschaffenheitsgarantie übernommen haben.</p>
        <p>Ich erkläre hiermit den Rücktritt vom Kaufvertrag und fordere Sie auf, den Kaufpreis innerhalb von 7 Tagen Zug-um-Zug gegen Rückgabe des Artikels zu erstatten.</p>`;
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
      setIsScanning(false);
    }, 1600);
  };

  const printLetter = () => {
    const el = document.getElementById('view-briefe') || document.getElementById('view-preview');
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
          <button className={`nav-item ${activeView === 'paket' ? 'active' : ''}`} onClick={() => switchView('paket')}><span className="nav-icon">📦</span> Paket-Verlust (DHL)</button>
          <button className={`nav-item ${activeView === 'verzug' ? 'active' : ''}`} onClick={() => switchView('verzug')}><span className="nav-icon">⏱️</span> Lieferverzug / Fake-Shop</button>
          <button className={`nav-item ${activeView === 'kleinanzeigen' ? 'active' : ''}`} onClick={() => switchView('kleinanzeigen')}><span className="nav-icon">🤝</span> Kleinanzeigen-Radar</button>
        </div>
        
        <div className="nav-group">
          <span className="nav-label">Tech Giganten</span>
          <button className={`nav-item ${activeView === 'amazon' ? 'active' : ''}`} onClick={() => switchView('amazon')}><span className="nav-icon">🛒</span> Amazon-Spezial (Sperren)</button>
          <button className={`nav-item ${activeView === 'inapp' ? 'active' : ''}`} onClick={() => switchView('inapp')}><span className="nav-icon">🎮</span> Kinder & In-App Käufe</button>
        </div>

        <div className="nav-group">
          <span className="nav-label">Mängel & Defekte</span>
          <button className={`nav-item ${activeView === 'gewaehrleistung' ? 'active' : ''}`} onClick={() => switchView('gewaehrleistung')}><span className="nav-icon">🔍</span> Gewährleistungs-Frist</button>
          <button className={`nav-item ${activeView === 'reparatur' ? 'active' : ''}`} onClick={() => switchView('reparatur')}><span className="nav-icon">🔧</span> Recht auf Reparatur '26</button>
        </div>

        <div className="nav-group">
          <span className="nav-label">Spezial-Abwehr</span>
          <button className={`nav-item ${activeView === 'schufa' ? 'active' : ''}`} onClick={() => switchView('schufa')}><span className="nav-icon">🛑</span> Inkasso- & Schufa-Blocker</button>
          <button className={`nav-item ${activeView === 'tickets' ? 'active' : ''}`} onClick={() => switchView('tickets')}><span className="nav-icon">🎟️</span> Ticket-Mafia & Dark-Patterns</button>
        </div>
        
        <div className="nav-group">
          <span className="nav-label">Generatoren</span>
          <button className={`nav-item ${activeView === 'briefe' ? 'active' : ''}`} onClick={() => switchView('briefe')}><span className="nav-icon">📜</span> PDF-Brief-Terminal</button>
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
              <div className="hero glow-red" style={{ transition: 'all 0.3s', background: 'linear-gradient(135deg, var(--card) 0%, #060A1A 100%)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent-red)', padding: '40px', borderRadius: '8px', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div className="package-container no-print">
                    <div className="laser-line"></div>
                    <div style={{ zIndex: 10, fontSize: '48px' }}>📦</div>
                  </div>
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <h1>E-Commerce Bossen <br/>den <span style={{ color: 'var(--accent-red)' }}>Krieg erklären.</span></h1>
                    <p style={{ fontSize: '16px', maxWidth: '700px', marginBottom: 0 }}>Die PRO-Version des Retouren-Rebells. Vom verlorenen DHL-Paket über illegale Schufa-Drohungen durch Klarna & Co. bis hin zu versehentlichen In-App-Käufen durch Kinder. Dieses Werkzeug liefert die harte BGB-Logik, um dein Geld zurückzuholen.</p>
                  </div>
                </div>
                {!loadingUser && !isPro && (
                  <div style={{ marginTop: '24px', background: 'rgba(255,51,102,0.1)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--accent-red)', display: 'inline-block' }}>
                    <strong style={{ color: 'var(--accent-red)' }}>Dein Account ist limitiert.</strong> Du kannst aktuell nur die Übersicht betrachten.
                  </div>
                )}
              </div>

              <div className="grid-3">
                <div className="card" style={{ cursor: 'pointer' }} onClick={() => switchView('paket')}>
                  <h3 style={{ color: 'var(--brown)' }}>{!isPro && '🔒 '}📦 Paket-Verlust</h3>
                  <p>Händler wälzen Paketverlust gern auf DHL, Hermes, DPD & Co. ab. Zerstöre diesen Trick mit § 475 BGB (Gefahrübergang).</p>
                </div>
                <div className="card" style={{ cursor: 'pointer' }} onClick={() => switchView('gewaehrleistung')}>
                  <h3 style={{ color: '#00ff88' }}>{!isPro && '🔒 '}🔍 12M Beweislast</h3>
                  <p>Berechne die gesetzliche 12-monatige Beweislastumkehr auf den Tag genau für Nacherfüllung.</p>
                </div>
                <div className="card" style={{ cursor: 'pointer' }} onClick={() => switchView('schufa')}>
                  <h3 style={{ color: 'var(--accent-red)' }}>{!isPro && '🔒 '}🛑 Inkasso-Blocker</h3>
                  <p>Sperre drohende Schufa-Einträge durch Inkasso-Unternehmen vollautomatisch durch formelles "Bestreiten".</p>
                </div>
                <div className="card" style={{ cursor: 'pointer' }} onClick={() => switchView('inapp')}>
                  <h3 style={{ color: 'var(--accent-purple)' }}>{!isPro && '🔒 '}🎮 Kinder In-App</h3>
                  <p>Hol dir hunderte Euro von Apple/Google zurück, wenn das Kind heimlich digitale Währung gekauft hat.</p>
                </div>
                <div className="card" style={{ cursor: 'pointer' }} onClick={() => switchView('amazon')}>
                  <h3 style={{ color: '#FFA600' }}>{!isPro && '🔒 '}🛒 Amazon-Spezial</h3>
                  <p>Kontosperrungen, eingefrorenes Gutscheinguthaben und der Vorwurf "Sie haben das falsche Produkt retourniert".</p>
                </div>
                <div className="card" style={{ cursor: 'pointer' }} onClick={() => switchView('briefe')}>
                  <h3 style={{ color: '#FF3366' }}>{!isPro && '🔒 '}📜 Brief-Terminal</h3>
                  <p>Generiert jetzt 9 verschiedene, juristisch wasserdichte PDF-Druckvorlagen für jeden Fall (inkl. Eidesstattliche Versicherung).</p>
                </div>
              </div>
            </section>
          )}

          {/* PAKET VERLUST */}
          {activeView === 'paket' && (
            <section className="view active" id="view-paket">
              <h2>Paket-Verlust & Beschädigung (Der Zusteller-Trick)</h2>
              <p>Der häufigste Trick der Händler: Das Risiko des Versands auf den Kunden abzuwälzen. Beim "Verbrauchsgüterkauf" trägt der <strong>Händler</strong> das Transportrisiko (§ 475 BGB)!</p>

              <div className="alert alert-danger" style={{ marginTop: '24px' }}>
                <strong>Regel Nr.1:</strong> Lass dich NIEMALS vom Händler an DHL, Hermes, DPD, GLS oder UPS verweisen! Der Händler hat den Vertrag mit dem Paketdienst, nicht du.
              </div>

              <div className="alert alert-warning" style={{ marginTop: '16px' }}>
                <strong>📸 BEWEISSICHERUNG:</strong> Mache SOFORT Screenshots von der Sendungsverfolgung! Status-Updates ändern sich oft nachträglich. Dokumentiere jede E-Mail und jeden Chatverlauf.
              </div>

              <div className="card highlight" style={{ marginTop: '32px' }}>
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
                    <option value="nachbar">Zugestellt beim Nachbarn (aber der hat nichts)</option>
                    <option value="ablageort">Zugestellt am Ablageort (Garage/Flur) – dort ist es nicht</option>
                    <option value="beschaedigt">Paket kam völlig zerstört an</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Hast du dem Ablageort / Nachbarn ausdrücklich zugestimmt? (z.B. in der App)</label>
                  <select value={pZustimmung} onChange={(e) => setPZustimmung(e.target.value)}>
                    <option value="nein">Nein, das hat der Bote einfach gemacht</option>
                    <option value="ja">Ja, ich habe die Erlaubnis erteilt ("Garagenvertrag")</option>
                  </select>
                </div>
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={checkPaket}>Rechtslage prüfen</button>

                {pResult && (
                  <div className={`result-box ${pResult.status === 'success' ? 'success' : 'fail'}`} style={{ display: 'block', marginTop: '24px' }}>
                    <div dangerouslySetInnerHTML={{ __html: pResult.html }} />
                    {pResult.status === 'success' && (
                      <button className="btn btn-secondary" style={{ marginTop: '15px' }} onClick={() => { setBArt('paket'); switchView('briefe'); }}>
                        Brief generieren
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* VERZUG & WIDERRUF */}
          {activeView === 'verzug' && (
            <section className="view active" id="view-verzug">
              <h2>Lieferverzug & Fake-Shops</h2>
              <div className="grid-2">
                <div className="card highlight">
                  <h3>Die harte Fristsetzung</h3>
                  <p>Solange du dem Händler keine nachweisbare Nachfrist gesetzt hast, bist du an den Vertrag gebunden. Setze eine Frist von <strong>7 bis 14 Tagen</strong>.</p>
                  <p>Verstreicht die Frist ohne Lieferung, erklärst du den <strong>Rücktritt vom Kaufvertrag (§ 323 BGB)</strong> und forderst dein Geld zurück. <em>Nutze den Generator im Brief-Terminal!</em></p>
                  <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => { setBArt('verzug'); switchView('briefe'); }}>Fristsetzung generieren</button>
                </div>
                
                <div className="card">
                  <h3>Das "China-Dropshipping" Problem</h3>
                  <p>Viele Shops geben sich als deutsche Firmen aus. Wenn du widerrufst, sollst du das Paket plötzlich für 40€ nach Asien schicken.</p>
                  <div className="alert alert-warning" style={{ marginTop: '16px', padding: '10px' }}>
                    <strong>Abwehr:</strong> War die Rücksendeadresse in China beim Kauf nicht transparent (z.B. in der Widerrufsbelehrung) ausgewiesen, musst du die Kosten für den Rückversand nach Asien NICHT tragen!
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* KLEINANZEIGEN */}
          {activeView === 'kleinanzeigen' && (
            <section className="view active" id="view-kleinanzeigen">
              <h2>Kleinanzeigen-Radar (Privatkauf)</h2>
              <p>"Gekauft wie gesehen" – Ein Mythos, der oft nicht stimmt. Privatverkäufer haften nicht automatisch für nichts.</p>

              <div className="alert alert-warning" style={{ marginTop: '24px' }}>
                <strong>📸 WICHTIG:</strong> Mache immer Screenshots vom Original-Inserat, BEVOR du kaufst! Verkäufer löschen oft nachträglich Beschreibungen (z.B. "Unfallfrei"), um Beweise zu vernichten.
              </div>
              
              <div className="grid-2" style={{ marginTop: '32px' }}>
                <div className="card highlight">
                  <h3>Die "Arglist"-Falle</h3>
                  <p>Ein Haftungsausschluss ("Keine Rücknahme, keine Gewährleistung") ist <strong>nichtig</strong>, wenn der Verkäufer einen Mangel arglistig verschwiegen hat (§ 444 BGB).</p>
                  <p><em>Beispiel:</em> Verkauft dir jemand ein Auto mit verschwiegenem Unfallschaden, kannst du den Kaufvertrag widerrufen, EGAL was im Vertrag steht.</p>
                  <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => { setBArt('kleinanzeigen'); switchView('briefe'); }}>Rücktritt generieren</button>
                </div>
                <div className="card">
                  <h3>"Sicher Bezahlen" Scam</h3>
                  <p>Warnung vor dem "Dreiecksbetrug": Der Käufer schickt dir einen Screenshot, dass er per "Sicher Bezahlen" gezahlt hat, aber es kommt eine SMS mit einem Link zur Bestätigung. <strong>Fake!</strong> Kleinanzeigen schickt NIEMALS SMS mit Links für den Geldeingang.</p>
                </div>
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
                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={checkGewaehrleistung}>Frist Berechnen</button>
                  
                  {gResult && (
                    <div className={`result-box ${gResult.status === 'success' ? 'success' : gResult.status === 'warn' ? 'warning' : 'fail'}`} style={{ display: 'block', marginTop: '24px' }}>
                      <div dangerouslySetInnerHTML={{ __html: gResult.html }} />
                      {gResult.status === 'success' && (
                        <button className="btn btn-secondary" style={{ marginTop: '15px' }} onClick={() => { setBArt('gewaehrleistung'); switchView('briefe'); }}>
                          Brief generieren
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="card">
                  <h3>Die magischen 12 Monate</h3>
                  <p>Geht ein Gerät innerhalb der ersten 12 Monate nach dem Kauf kaputt, wird gesetzlich vermutet, dass der Fehler schon beim Kauf existierte (Beweislastumkehr).</p>
                  <p><strong>Die Waffe:</strong> Der Händler MUSS das Gerät kostenlos reparieren oder austauschen (Nacherfüllung). Will er das nicht, muss ER gutachterlich beweisen, dass du es kaputt gemacht hast!</p>
                </div>
              </div>
            </section>
          )}

          {/* REPARATUR */}
          {activeView === 'reparatur' && (
            <section className="view active" id="view-reparatur">
              <h2>Recht auf Reparatur (Neu seit Juli 2026)</h2>
              <div className="card highlight">
                <h3>Deine neuen Rechte gegen Hersteller:</h3>
                <ul style={{ lineHeight: '2.2', color: 'var(--text)', marginLeft: '20px' }}>
                  <li><strong>Reparaturpflicht:</strong> Hersteller MÜSSEN Reparaturen für Waschmaschinen, Handys, Tablets etc. auch nach Ablauf der Gewährleistung anbieten.</li>
                  <li><strong>Gewährleistungs-Bonus:</strong> Lässt du ein Gerät innerhalb der Gewährleistung reparieren, verlängert sich die rechtliche Gewährleistung automatisch um <strong>1 Jahr!</strong></li>
                  <li><strong>Software-Blockaden verboten:</strong> Apple & Co. dürfen unabhängige Werkstätten nicht mehr durch Software-Locks (Seriennummern-Kopplung bei Akkus/Displays) aussperren.</li>
                </ul>
                <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => { setBArt('reparatur'); switchView('briefe'); }}>Reparatur-Aufforderung generieren</button>
              </div>
            </section>
          )}

          {/* IN-APP KÄUFE (KINDER) */}
          {activeView === 'inapp' && (
            <section className="view active" id="view-inapp">
              <h2>Kinder-Schutzschild (In-App Käufe)</h2>
              <p>Der Schock: Das 10-jährige Kind hat auf dem Smartphone für 500€ Fortnite V-Bucks, Roblox-Coins oder FIFA-Packs gekauft.</p>
              
              <div className="grid-2" style={{ marginTop: '24px' }}>
                <div className="card purple">
                  <h3>Der Taschengeld-Paragraph (§ 110 BGB)</h3>
                  <p>Kinder (7 bis 17 Jahre) sind <em>beschränkt geschäftsfähig</em>. Verträge, die nicht mit Taschengeld bewirkt werden können, sind ohne Einwilligung der Eltern <strong>schwebend unwirksam</strong>.</p>
                  <p>Da 500€ In-App-Käufe offensichtlich das Taschengeld übersteigen, kam rechtlich <strong>nie ein Vertrag zustande</strong>. Apple, Google oder Epic Games MÜSSEN das Geld erstatten, wenn du als Elternteil die Genehmigung formell verweigerst.</p>
                  <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => { setBArt('inapp'); switchView('briefe'); }}>In-App-Widerruf generieren</button>
                </div>
                <div className="card">
                  <h3>Vorgehensweise</h3>
                  <p>Schreibe Apple (App Store) oder Google (Play Store) über deren Support-Formular an und lade unser generiertes PDF hoch.</p>
                  <p>Lass dich nicht abwimmeln! Häufige erste Antwort der US-Konzerne: "Laut unseren AGB sind Käufe final". Deutsche AGB brechen aber niemals deutsches BGB (§ 108 BGB).</p>
                </div>
              </div>
            </section>
          )}

          {/* AMAZON SPEZIAL */}
          {activeView === 'amazon' && (
            <section className="view active" id="view-amazon">
              <h2>Amazon-Spezial (Sperren & Retouren-Albtraum)</h2>
              <p>Amazon ist der größte Händler, hat aber die aggressivsten Algorithmen. Wenn der Algorithmus zuschlägt, friert er Konten und Geld gnadenlos ein.</p>
              
              <div className="grid-2" style={{ marginTop: '24px' }}>
                <div className="card highlight" style={{ borderColor: '#FFA600' }}>
                  <h3 style={{ color: '#FFA600' }}>Albtraum 1: Kontosperrung</h3>
                  <p><strong>Grund:</strong> "Zu viele Retouren" oder unklare Verstöße. Oft behält Amazon hunderte Euro an Gutscheinguthaben ein.</p>
                  <p><strong>Die Waffe:</strong> Die DSGVO. Ein US-Konzern darf in Europa Guthaben nicht grundlos einfrieren. Fordere über die DSGVO (Art. 15) alle über dich gespeicherten Daten an und setze eine harte Frist auf Auszahlung des Restguthabens.</p>
                  <button className="btn btn-secondary" style={{ marginTop: '16px', borderColor: '#FFA600', color: '#FFA600' }} onClick={() => { setBArt('amazon_sperre'); switchView('briefe'); }}>DSGVO-Auskunft generieren</button>
                </div>
                <div className="card">
                  <h3>Albtraum 2: "Falscher Artikel retourniert"</h3>
                  <p><strong>Grund:</strong> Du retournierst ein iPhone. Amazon sagt: "Da war ein Stein im Karton, wir behalten das Geld." (Passiert extrem oft bei Logistik-Diebstahl!)</p>
                  <p><strong>Die Waffe:</strong> Amazon wälzt den Diebstahl auf dich ab. Da der Beweis schwer ist, ist die einzige juristische Waffe, die Amazon akzeptiert, eine <strong>Eidesstattliche Versicherung</strong> (§ 156 StGB), dass du das korrekte Gerät eingepackt und übergeben hast.</p>
                  <button className="btn btn-secondary" style={{ marginTop: '16px' }} onClick={() => { setBArt('amazon_eides'); switchView('briefe'); }}>Eidesstattliche generieren</button>
                </div>
              </div>
            </section>
          )}

          {/* INKASSO & SCHUFA */}
          {activeView === 'schufa' && (
            <section className="view active" id="view-schufa">
              <h2>Inkasso-Blocker & Schufa-Verbot</h2>
              <p>Oft eskaliert ein Retouren-Problem mit "Buy Now, Pay Later" Anbietern (wie Klarna) direkt in ein aggressives Inkasso-Schreiben mit Schufa-Drohung.</p>

              <div className="card highlight" style={{ borderColor: 'var(--accent-red)', marginTop: '24px' }}>
                <h3>Die ultimative Eskalations-Bremse</h3>
                <p>Ein Inkasso-Unternehmen darf eine offene Forderung <strong>unter keinen Umständen</strong> an die Schufa oder andere Auskunfteien melden, wenn die Forderung vom Schuldner formell <strong>bestritten</strong> wird (§ 31 Abs. 2 BDSG)!</p>
                <div className="alert alert-danger" style={{ marginTop: '16px' }}>
                  <strong>Was du tun musst:</strong> Reagiere SOFORT auf das Inkasso-Schreiben. Nutze unseren Brief-Generator und bestreite die Forderung formell. Verbiete gleichzeitig ausdrücklich die Meldung an die Schufa. Ab diesem Moment sind sie gesetzlich blockiert.
                </div>
                <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => { setBArt('inkasso'); switchView('briefe'); }}>Inkasso-Abwehr generieren</button>
              </div>
            </section>
          )}

          {/* TICKET MAFIA & DSA */}
          {activeView === 'tickets' && (
            <section className="view active" id="view-tickets">
              <h2>Ticket-Zweitmärkte & Dark Patterns</h2>
              
              <div className="grid-2" style={{ marginTop: '24px' }}>
                <div className="card">
                  <h3>🎟️ Ticket-Mafia (Viagogo)</h3>
                  <p>Wer auf Viagogo oder Ticketbande kauft, zahlt oft Wucherpreise für personalisierte Tickets, mit denen man nicht ins Stadion kommt. </p>
                  <p>Viele dieser Käufe können wegen Wucher/Sittenwidrigkeit (§ 138 BGB) angefochten werden. <strong style={{ color: 'var(--accent-red)' }}>Mache Screenshots vom Kaufprozess!</strong></p>
                </div>
                <div className="card highlight">
                  <h3>🕵️ Dark Patterns (DSA 2026)</h3>
                  <p>Das neue EU-Gesetz (Digital Services Act) verbietet manipulative Designs:</p>
                  <ul style={{ marginLeft: '20px', color: 'var(--muted)' }}>
                    <li>Gefälschte Countdown-Timer ("Angebot endet in 5 Min").</li>
                    <li>Fake-Verknappung ("Nur noch 1 auf Lager").</li>
                    <li>Abo-Fallen (Schwerer Kündigen als Abschließen).</li>
                  </ul>
                  <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--accent-red)' }}>Screenshotte den Countdown-Timer oder die "Nur noch X auf Lager" Anzeige als Beweis!</strong></p>
                </div>
              </div>
            </section>
          )}

          {/* BRIEFE */}
          {activeView === 'briefe' && (
            <section className="view active" id="view-briefe">
              <div className="no-print">
                <h2>📜 Brief-Terminal (PDF-Generator)</h2>
                <p>Generiere hier druckfertige juristische PDF-Schreiben. Wir decken von Nacherfüllung bis hin zum Taschengeld-Paragraphen alles ab.</p>

                <div className="card highlight" style={{ marginTop: '24px' }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Dein Vor- und Nachname</label>
                      <input type="text" value={bName} onChange={e => setBName(e.target.value)} placeholder="Max Mustermann" />
                    </div>
                    <div className="form-group">
                      <label>Deine Adresse</label>
                      <input type="text" value={bAdresse} onChange={e => setBAdresse(e.target.value)} placeholder="Musterstr. 1, 12345 Stadt" />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Gegenseite (Händler/Inkasso/Apple)</label>
                      <input type="text" value={bHaendler} onChange={e => setBHaendler(e.target.value)} placeholder="Shop XYZ GmbH" />
                    </div>
                    <div className="form-group">
                      <label>Akten- / Bestellnummer</label>
                      <input type="text" value={bBestellnr} onChange={e => setBBestellnr(e.target.value)} placeholder="DE-123456" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Art des Schreibens wählen</label>
                    <select value={bArt} onChange={e => setBArt(e.target.value)}>
                      <option value="paket">Paketverlust: Rückerstattung erzwingen (§ 475 BGB)</option>
                      <option value="gewaehrleistung">Gewährleistung: Nacherfüllung/Austausch einfordern (§ 439 BGB)</option>
                      <option value="verzug">Lieferverzug: Fristsetzung & Rücktritt (§ 323 BGB)</option>
                      <option value="reparatur">Recht auf Reparatur 2026 einfordern</option>
                      <option value="inapp">Kinder-In-App: Vertrag verweigern (§§ 108, 110 BGB)</option>
                      <option value="amazon_sperre">Amazon: Kontosperrung & Guthabenforderung (DSGVO)</option>
                      <option value="amazon_eides">Amazon: Eidesstattliche Versicherung (Falsche Retoure)</option>
                      <option value="inkasso">Inkasso-Blocker: Forderung bestreiten & Schufa-Verbot</option>
                      <option value="kleinanzeigen">Privatkauf: Rücktritt wegen arglistiger Täuschung</option>
                    </select>
                  </div>
                  
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} onClick={generateLetter}>
                    PDF-Vorschau generieren
                  </button>
                </div>
              </div>

              {letterHtml && activeView === 'briefe' && (
                <section className="view active" id="view-preview" style={{ marginTop: '24px' }}>
                  <div className="no-print" style={{ padding: '16px', background: 'var(--darker)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Brief-Vorschau</h3>
                    <button className="btn btn-secondary" onClick={printLetter}>🖨️ Drucken / PDF</button>
                  </div>
                  <div className="letter-paper" dangerouslySetInnerHTML={{ __html: letterHtml }} />
                </section>
              )}
            </section>
          )}

        </div>
      </main>

      {isScanning && (
        <div className="brief-scanner-overlay">
          <div style={{ background: 'var(--card)', padding: '40px', borderRadius: '12px', border: '1px solid var(--accent-red)', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 0 30px rgba(255, 51, 102, 0.3)' }}>
            <div style={{ fontSize: '40px', marginBottom: '20px', animation: 'pulseGlow 1.5s infinite' }}>📦⚖️</div>
            <h3 style={{ color: 'var(--accent-red)' }}>Retouren-Rebell Scan</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '24px' }}>Generiere Mahnung...</p>
            
            <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ height: '100%', background: 'var(--accent-red)', width: '0%', animation: 'scanProgress 1.5s linear forwards' }} />
            </div>

            <div style={{ fontSize: '13px', textAlign: 'left', minHeight: '40px', color: 'var(--text)' }}>
              {scanStep === 0 && "🔍 Prüfe Gefahrübergang nach § 475 BGB..."}
              {scanStep === 1 && "📖 Lese Fristen für Lieferverzug aus..."}
              {scanStep === 2 && "📝 Setze eidesstattliche Erklärung auf..."}
              {scanStep === 3 && "✍️ Generiere rechtssicheres Schreiben..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
