"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function DigitalSchutzschild() {
  const router = useRouter();
  
  // Auth states
  const [userId, setUserId] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // App navigation
  const [activeView, setActiveView] = useState('dashboard');

  // Global settings / User Profile
  const [userName, setUserName] = useState('');
  const [userAddr, setUserAddr] = useState('');

  // 12 Brief-Generator Inputs
  // Brief 1: DSGVO Auskunft
  const [b1Firma, setB1Firma] = useState('');
  const [b1FirmaAdr, setB1FirmaAdr] = useState('');
  const [b1Empf, setB1Empf] = useState('allgemein');
  const [b1Id, setB1Id] = useState('');
  const [b1Extras, setB1Extras] = useState('');
  const [b1Tone, setB1Tone] = useState('firm');
  const [b1Att, setB1Att] = useState({ ausweis: false, vertrag: false });

  // Brief 2: DSGVO Löschung
  const [b2Firma, setB2Firma] = useState('');
  const [b2FirmaAdr, setB2FirmaAdr] = useState('');
  const [b2Grund, setB2Grund] = useState('zweck_entfaellt');
  const [b2Daten, setB2Daten] = useState('');
  const [b2Extras, setB2Extras] = useState('');
  const [b2Tone, setB2Tone] = useState('firm');
  const [b2Att, setB2Att] = useState({ ausweis: false });

  // Brief 3: LfDI-Beschwerde
  const [b3Bl, setB3Bl] = useState('bfdi');
  const [b3Art, setB3Art] = useState('auskunft');
  const [b3Firma, setB3Firma] = useState('');
  const [b3Datum, setB3Datum] = useState('');
  const [b3Sachverhalt, setB3Sachverhalt] = useState('');
  const [b3Tone, setB3Tone] = useState('firm');
  const [b3Att, setB3Att] = useState({ antrag: false, ablehnung: false });

  // Brief 4: Google-Bewertung
  const [b4Url, setB4Url] = useState('');
  const [b4Name, setB4Name] = useState('');
  const [b4Grund, setB4Grund] = useState('kein_kontakt');
  const [b4Details, setB4Details] = useState('');
  const [b4Tone, setB4Tone] = useState('firm');

  // Brief 5: Jameda
  const [b5Url, setB5Url] = useState('');
  const [b5Name, setB5Name] = useState('');
  const [b5Details, setB5Details] = useState('');
  const [b5Tone, setB5Tone] = useState('firm');

  // Brief 6: eBay/Amazon
  const [b6Plattform, setB6Plattform] = useState('ebay');
  const [b6Item, setB6Item] = useState('');
  const [b6Name, setB6Name] = useState('');
  const [b6Details, setB6Details] = useState('');
  const [b6Tone, setB6Tone] = useState('firm');

  // Brief 7: Trustpilot
  const [b7Url, setB7Url] = useState('');
  const [b7Name, setB7Name] = useState('');
  const [b7Details, setB7Details] = useState('');
  const [b7Tone, setB7Tone] = useState('firm');

  // Brief 8-11: Social Media Sperren (Instagram, Facebook, YouTube, TikTok)
  const [smUsername, setSmUsername] = useState('');
  const [smEmail, setSmEmail] = useState('');
  const [smDatum, setSmDatum] = useState('');
  const [smDetails, setSmDetails] = useState('');
  const [smTone, setSmTone] = useState('firm');

  // Brief 12: Urheberrecht - Modifizierte Unterlassung
  const [b12Abmahner, setB12Abmahner] = useState('');
  const [b12Kanzlei, setB12Kanzlei] = useState('');
  const [b12KanzleiAdr, setB12KanzleiAdr] = useState('');
  const [b12Werk, setB12Werk] = useState('');
  const [b12Datum, setB12Datum] = useState('');
  const [b12Frist, setB12Frist] = useState('');
  const [b12Aktenzeichen, setB12Aktenzeichen] = useState('');

  // Brief 13: Urheberrecht - Gegenabmahnung
  const [b13Gegner, setB13Gegner] = useState('');
  const [b13GegnerAdr, setB13GegnerAdr] = useState('');
  const [b13Werk, setB13Werk] = useState('');
  const [b13Datum, setB13Datum] = useState('');
  const [b13Kosten, setB13Kosten] = useState('300');

  // Brief 14: DMCA Notice
  const [b14Plattform, setB14Plattform] = useState('google');
  const [b14PlattformAdr, setB14PlattformAdr] = useState('Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA');
  const [b14Werk, setB14Werk] = useState('');
  const [b14UrlOriginal, setB14UrlOriginal] = useState('');
  const [b14UrlKopie, setB14UrlKopie] = useState('');

  // 3 Calculators States
  const [calcGw, setCalcGw] = useState(5000);
  const [calcArt, setCalcArt] = useState('aussergerichtlich');
  const [calcSw, setCalcSw] = useState(5000);
  const [calcRisiko, setCalcRisiko] = useState('mittel');
  const [calcSterne, setCalcSterne] = useState(1);
  const [calcReichweite, setCalcReichweite] = useState(5000);
  const [calcSchwere, setCalcSchwere] = useState('mittel');

  // Frist-Tracker State
  const [fristWas, setFristWas] = useState('');
  const [fristStart, setFristStart] = useState('');
  const [fristTage, setFristTage] = useState('30');
  const [fristen, setFristen] = useState<any[]>([]);

  // Statistics
  const [statBriefe, setStatBriefe] = useState(0);

  // Mount effects
  useEffect(() => {
    document.body.className = 'theme-digital';
    
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

    // Load LocalStorage State
    try {
      const local = localStorage.getItem('vb_schuetzschild_v1');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.fristen) setFristen(parsed.fristen);
        if (parsed.counters) {
          setStatBriefe(parsed.counters.briefe || 0);
        }
        if (parsed.profile) {
          setUserName(parsed.profile.name || '');
          setUserAddr(parsed.profile.addr || '');
        }
      } else {
        // Set default date to today for tracker
        setFristStart(new Date().toISOString().split('T')[0]);
      }
    } catch (e) {
      console.error(e);
    }

    return () => {
      document.body.className = '';
    };
  }, [router]);

  // Sync state to local storage
  const saveState = (updatedFristen = fristen, count = statBriefe, name = userName, addr = userAddr) => {
    try {
      localStorage.setItem('vb_schuetzschild_v1', JSON.stringify({
        fristen: updatedFristen,
        counters: { briefe: count },
        profile: { name, addr }
      }));
    } catch (e) {
      console.error(e);
    }
  };

  // Tone Map helper
  const TONE_MAP: Record<string, any> = {
    friendly: { greet: 'Sehr geehrte Damen und Herren,', close: 'Mit freundlichen Grüßen', frist: '14 Tagen', eskal: '', harte: false },
    firm: { greet: 'Sehr geehrte Damen und Herren,', close: 'Mit freundlichen Grüßen', frist: '14 Tagen', eskal: '<p style="margin-top:14px">Sollten Sie nicht innerhalb der genannten Frist reagieren, behalte ich mir weitere rechtliche Schritte vor.</p>', harte: false },
    lawyer: { greet: 'Sehr geehrte Damen und Herren,', close: 'Mit freundlichen Grüßen', frist: '7 Tagen', eskal: '<p style="margin-top:14px"><strong>Letztmalig fordere ich Sie auf.</strong> Andernfalls werde ich ohne weitere Ankündigung rechtliche Schritte einleiten und einen Rechtsanwalt beauftragen. Die Kosten dieses Verfahrens haben Sie zu tragen.</p>', harte: true }
  };

  const getToneObj = (toneKey: string) => TONE_MAP[toneKey] || TONE_MAP.firm;

  // LfDI Presets
  const LfDI_PRESETS: Record<string, string> = {
    bw: 'Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg\nKönigstraße 10a, 70173 Stuttgart',
    by: 'Bayerisches Landesamt für Datenschutzaufsicht\nPromenade 18, 91522 Ansbach',
    be: 'Berliner Beauftragte für Datenschutz und Informationsfreiheit\nFriedrichstr. 219, 10969 Berlin',
    bb: 'Landesbeauftragte für den Datenschutz und für das Recht auf Akteneinsicht Brandenburg\nStahnsdorfer Damm 77, 14532 Kleinmachnow',
    hb: 'Die Landesbeauftragte für Datenschutz und Informationsfreiheit der Freien Hansestadt Bremen\nArndtstraße 1, 27570 Bremerhaven',
    hh: 'Hamburgische Beauftragte für Datenschutz und Informationsfreiheit\nLudwig-Erhard-Straße 22, 20459 Hamburg',
    he: 'Hessischer Beauftragter für Datenschutz und Informationsfreiheit\nGustav-Stresemann-Ring 1, 65189 Wiesbaden',
    mv: 'Landesbeauftragter für Datenschutz und Informationsfreiheit Mecklenburg-Vorpommern\nLennéstraße 1, 19053 Schwerin',
    ni: 'Landesbeauftragte für den Datenschutz Niedersachsen\nPrinzenstraße 5, 30159 Hannover',
    nw: 'Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen\nKavalleriestraße 2-4, 40213 Düsseldorf',
    rp: 'Landesbeauftragter für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz\nHintere Bleiche 34, 55116 Mainz',
    sl: 'Unabhängiges Datenschutzzentrum Saarland\nFritz-Dobisch-Straße 12, 66111 Saarbrücken',
    sn: 'Sächsische Datenschutz- und Transparenzbeauftragte\nMaternistraße 17, 01067 Dresden',
    st: 'Landesbeauftragter für den Datenschutz und die Informationsfreiheit Sachsen-Anhalt\nLeiterstraße 9, 39104 Magdeburg',
    sh: 'Unabhängiges Landeszentrum für Datenschutz Schleswig-Holstein\nHolstenstraße 98, 24103 Kiel',
    th: 'Thüringer Landesbeauftragter für den Datenschutz und die Informationsfreiheit\nHäßlerstraße 8, 99096 Erfurt',
    bfdi: 'Bundesbeauftragter für den Datenschutz und die Informationsfreiheit\nHusarenstraße 30, 53117 Bonn'
  };

  const getLfDIAddress = (key: string) => LfDI_PRESETS[key] || LfDI_PRESETS.bfdi;

  // Auto-Fill presets for Companies
  const FIRMA_PRESETS: Record<string, { name: string, adr: string }> = {
    google: { name: 'Google Ireland Limited', adr: 'Gordon House, Barrow Street\nDublin 4, Irland' },
    meta: { name: 'Meta Platforms Ireland Limited', adr: '4 Grand Canal Square, Grand Canal Harbour\nDublin 2, Irland' },
    tiktok: { name: 'TikTok Technology Limited', adr: '10 Earlsfort Terrace\nDublin, D02 T380, Irland' },
    youtube: { name: 'YouTube LLC / Google Ireland', adr: 'Gordon House, Barrow Street\nDublin 4, Irland' },
    ebay: { name: 'eBay GmbH', adr: 'Albert-Einstein-Ring 2-6\n14532 Kleinmachnow' },
    jameda: { name: 'Jameda GmbH', adr: 'Balcke-Dürr-Allee 2\n40882 Ratingen' },
    trustpilot: { name: 'Trustpilot A/S', adr: 'Pilestræde 58, 5. Stock\n1112 Kopenhagen, Dänemark' },
    amazon: { name: 'Amazon Europe Core S.à r.l.', adr: '38 avenue John F. Kennedy\nL-1855 Luxemburg' }
  };

  const applyFirmaPreset = (targetBrief: string, presetKey: string) => {
    const p = FIRMA_PRESETS[presetKey];
    if (!p) return;
    if (targetBrief === 'b1') { setB1Firma(p.name); setB1FirmaAdr(p.adr); }
    if (targetBrief === 'b2') { setB2Firma(p.name); setB2FirmaAdr(p.adr); }
    if (targetBrief === 'b3') { setB3Firma(p.name); }
    if (targetBrief === 'b14') { setB14Plattform(p.name); setB14PlattformAdr(p.adr); }
  };

  // Frist-Tracker Actions
  const handleAddFrist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fristWas.trim()) return;

    const start = fristStart || new Date().toISOString().split('T')[0];
    const days = parseInt(fristTage) || 30;
    const end = new Date(start);
    end.setDate(end.getDate() + days);

    const newFrist = {
      id: Math.random().toString(36).substring(2, 9),
      was: fristWas.trim(),
      start,
      tage: days,
      end: end.toISOString().split('T')[0],
      erledigt: false
    };

    const updated = [...fristen, newFrist];
    setFristen(updated);
    saveState(updated);
    
    setFristWas('');
    setFristTage('30');
    setFristStart(new Date().toISOString().split('T')[0]);
  };

  const toggleFrist = (id: string) => {
    const updated = fristen.map(f => f.id === id ? { ...f, erledigt: !f.erledigt } : f);
    setFristen(updated);
    saveState(updated);
  };

  const deleteFrist = (id: string) => {
    if (!window.confirm('Frist wirklich löschen?')) return;
    const updated = fristen.filter(f => f.id !== id);
    setFristen(updated);
    saveState(updated);
  };

  // Calculate functions
  // 1. Abmahnkosten (RVG)
  const basisGebTab = [
    { value: 500, geb: 49 },
    { value: 1000, geb: 88 },
    { value: 1500, geb: 127 },
    { value: 2000, geb: 166 },
    { value: 3000, geb: 222 },
    { value: 4000, geb: 278 },
    { value: 5000, geb: 334 },
    { value: 6000, geb: 390 },
    { value: 7000, geb: 446 },
    { value: 8000, geb: 502 },
    { value: 9000, geb: 558 },
    { value: 10000, geb: 614 },
    { value: 13000, geb: 686 },
    { value: 16000, geb: 758 },
    { value: 19000, geb: 830 },
    { value: 22000, geb: 902 },
    { value: 25000, geb: 974 },
    { value: 30000, geb: 1070 },
    { value: 35000, geb: 1166 },
    { value: 40000, geb: 1262 },
    { value: 45000, geb: 1358 },
    { value: 50000, geb: 1454 },
    { value: 65000, geb: 1614 },
    { value: 80000, geb: 1774 },
    { value: 95000, geb: 1934 },
    { value: 110000, geb: 2094 }
  ];

  const getRVGBasis = (gw: number) => {
    for (let row of basisGebTab) {
      if (gw <= row.value) return row.geb;
    }
    return Math.round(110 + (gw * 0.015)); // rough estimate for extremely high values
  };

  const calcAbmahnTotal = () => {
    const basis = getRVGBasis(calcGw);
    let gebuehr = 0;
    let gesamt = 0;
    let name = '';

    if (calcArt === 'aussergerichtlich') {
      gebuehr = Math.round(basis * 1.3 * 100) / 100;
      name = 'Geschäftsgebühr (Nr. 2300 VV) × 1,3';
      const netto = gebuehr + 20;
      gesamt = netto * 1.19;
    } else {
      const verfahren = Math.round(basis * 1.3 * 100) / 100;
      const termin = Math.round(basis * 1.2 * 100) / 100;
      gebuehr = verfahren + termin;
      name = 'Verfahrensgebühr (1,3) + Terminsgebühr (1,2)';
      const netto = gebuehr + 20;
      gesamt = netto * 1.19;
    }
    return { gebuehr, gesamt, name };
  };

  // 2. Vertragsstrafe
  const calcStrafeTotal = () => {
    const fMap: Record<string, number> = { niedrig: 0.3, mittel: 0.5, hoch: 0.8 };
    const f = fMap[calcRisiko] || 0.5;
    const raw = calcSw * f;
    const rec = Math.min(raw, 2000);
    return { raw, rec };
  };

  // 3. Schadensersatz (Reviews)
  const calcSchadenTotal = () => {
    const basisMap: Record<string, number> = { leicht: 300, mittel: 600, schwer: 1000 };
    const schwereFaktorMap: Record<string, number> = { leicht: 1, mittel: 2, schwer: 4 };
    const basis = basisMap[calcSchwere] || 600;
    const schwereF = schwereFaktorMap[calcSchwere] || 2;
    
    let reichweiteF = 1.0;
    if (calcReichweite > 100000) reichweiteF = 3.0;
    else if (calcReichweite > 10000) reichweiteF = 2.0;
    else if (calcReichweite > 1000) reichweiteF = 1.5;

    const baseSchaden = Math.round(basis * calcSterne * schwereF * reichweiteF);
    return { min: baseSchaden, max: baseSchaden * 2 };
  };

  // PDF / Print action
  const handlePrint = (briefId: string) => {
    setStatBriefe(prev => {
      const next = prev + 1;
      saveState(fristen, next);
      return next;
    });

    const el = document.getElementById(briefId);
    if (el) {
      el.classList.add('print-me');
      window.print();
      setTimeout(() => el.classList.remove('print-me'), 500);
    }
  };

  // Safe escape formatting helper
  const nl2br = (str: string) => {
    return str.split('\n').map((line, idx) => <span key={idx}>{line}<br/></span>);
  };

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveState(fristen, statBriefe, userName, userAddr);
    alert('Absenderdaten erfolgreich lokal gespeichert!');
  };

  // Helper date formatter
  const formatDateStr = (dStr: string) => {
    if (!dStr) return '—';
    const parts = dStr.split('-');
    if (parts.length === 3) return `${parts[2]}.${parts[1]}.${parts[0]}`;
    return dStr;
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar no-print">
        <div className="nav-group">
          <span className="nav-label">Cockpit</span>
          <button className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveView('dashboard')}>📊 Dashboard</button>
          <button className={`nav-item ${activeView === 'rechner' ? 'active' : ''}`} onClick={() => setActiveView('rechner')}>🧮 3 Rechner</button>
          <button className={`nav-item ${activeView === 'frist_tracker' ? 'active' : ''}`} onClick={() => setActiveView('frist_tracker')}>⏰ Frist-Tracker</button>
        </div>

        <div className="nav-group">
          <span className="nav-label">🔒 DSGVO-Rechte</span>
          <button className={`nav-item ${activeView === 'dsgvo_auskunft' ? 'active' : ''}`} onClick={() => setActiveView('dsgvo_auskunft')}>📝 Art. 15 Auskunft</button>
          <button className={`nav-item ${activeView === 'dsgvo_loeschung' ? 'active' : ''}`} onClick={() => setActiveView('dsgvo_loeschung')}>🗑️ Art. 17 Löschung</button>
          <button className={`nav-item ${activeView === 'dsgvo_beschwerde' ? 'active' : ''}`} onClick={() => setActiveView('dsgvo_beschwerde')}>🚨 LfDI-Beschwerde</button>
        </div>

        <div className="nav-group">
          <span className="nav-label">⭐ Bewertungen</span>
          <button className={`nav-item ${activeView === 'bew_google' ? 'active' : ''}`} onClick={() => setActiveView('bew_google')}>🔍 Google löschen</button>
          <button className={`nav-item ${activeView === 'bew_jameda' ? 'active' : ''}`} onClick={() => setActiveView('bew_jameda')}>🩺 Jameda entfernen</button>
          <button className={`nav-item ${activeView === 'bew_ebay' ? 'active' : ''}`} onClick={() => setActiveView('bew_ebay')}>🤝 eBay anfechten</button>
          <button className={`nav-item ${activeView === 'bew_trustpilot' ? 'active' : ''}`} onClick={() => setActiveView('bew_trustpilot')}>📢 Trustpilot löschen</button>
        </div>

        <div className="nav-group">
          <span className="nav-label">📱 Social Media</span>
          <button className={`nav-item ${activeView === 'sm_instagram' ? 'active' : ''}`} onClick={() => setActiveView('sm_instagram')}>📸 Instagram Sperre</button>
          <button className={`nav-item ${activeView === 'sm_facebook' ? 'active' : ''}`} onClick={() => setActiveView('sm_facebook')}>👥 Facebook Sperre</button>
          <button className={`nav-item ${activeView === 'sm_youtube' ? 'active' : ''}`} onClick={() => setActiveView('sm_youtube')}>📺 YouTube Strike</button>
          <button className={`nav-item ${activeView === 'sm_tiktok' ? 'active' : ''}`} onClick={() => setActiveView('sm_tiktok')}>🎵 TikTok Bann</button>
        </div>

        <div className="nav-group">
          <span className="nav-label">⚖️ Urheberrecht</span>
          <button className={`nav-item ${activeView === 'urh_abmahnung' ? 'active' : ''}`} onClick={() => setActiveView('urh_abmahnung')}>🚨 Erste Hilfe Abmahn</button>
          <button className={`nav-item ${activeView === 'urh_unterlassung' ? 'active' : ''}`} onClick={() => setActiveView('urh_unterlassung')}>✍️ Mod. Unterlassung</button>
          <button className={`nav-item ${activeView === 'urh_counter' ? 'active' : ''}`} onClick={() => setActiveView('urh_counter')}>🛡️ Gegenabmahnung</button>
          <button className={`nav-item ${activeView === 'urh_dmca' ? 'active' : ''}`} onClick={() => setActiveView('urh_dmca')}>🌐 DMCA Notice</button>
        </div>

        <div className="nav-group">
          <span className="nav-label">Einstellungen</span>
          <button className={`nav-item ${activeView === 'faq' ? 'active' : ''}`} onClick={() => setActiveView('faq')}>❓ Rechtsinfos & FAQ</button>
          <button className={`nav-item ${activeView === 'einstellungen' ? 'active' : ''}`} onClick={() => setActiveView('einstellungen')}>⚙️ Absender (Profile)</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content relative">
        {/* Blurry paywall overlay for non-pro users */}
        {!loadingUser && !isPro && activeView !== 'dashboard' && activeView !== 'rechner' && activeView !== 'faq' && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(9, 11, 20, 0.85)', backdropFilter: 'blur(20px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '60px 40px', maxWidth: '600px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔒</div>
              <h2 style={{ color: 'white', marginBottom: '16px' }}>Digital-Schutzschild freischalten</h2>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
                Dieses Tool ist Teil des Vorlagenbude Premium-Pakets. Schalte alle 36 Generatoren, Widerspruchs-Vorlagen und den Frist-Tracker dauerhaft frei.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href={`https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01?client_reference_id=${userId}`} className="btn btn-primary" style={{ textDecoration: 'none', padding: '14px 28px', fontSize: '15px', fontWeight: 'bold' }}>
                  Master-Pass sichern (19€ Lifetime)
                </a>
                <button className="btn btn-secondary" onClick={() => setActiveView('dashboard')} style={{ padding: '12px' }}>
                  Zurück zum Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 1. DASHBOARD VIEW */}
        {activeView === 'dashboard' && (
          <section className="view active">
            <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '11px', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px', display: 'block' }}>Cybersecurity & Digital Rights</span>
            <h1 className="gradient-title">Digital-Schutzschild PRO</h1>
            <p className="lead">DSGVO-Auskunft erzwingen, Rufschädigung per Google-Löschung bekämpfen, Social-Media-Sperren aufheben und Urheberrechts-Abmahnungen entschärfen.</p>

            {/* Quick Stats Grid */}
            <div className="grid-4" style={{ marginTop: '32px' }}>
              <div className="card">
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🛡️</div>
                <h3>Aktive Schutzschilde</h3>
                <div className="stat" style={{ fontSize: '36px', fontWeight: 800, color: 'var(--accent-blue)' }}>12</div>
                <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Dokumenten-Generatoren</p>
              </div>
              <div className="card">
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
                <h3>Offene Fristen</h3>
                <div className="stat" style={{ fontSize: '36px', fontWeight: 800, color: 'var(--accent-red)' }}>
                  {fristen.filter(f => !f.erledigt).length}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Termine im Frist-Tracker</p>
              </div>
              <div className="card">
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📜</div>
                <h3>Erstellte Briefe</h3>
                <div className="stat" style={{ fontSize: '36px', fontWeight: 800, color: 'white' }}>{statBriefe}</div>
                <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Briefe lokal gedruckt</p>
              </div>
              <div className="card">
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚖️</div>
                <h3>Hebel & Rechner</h3>
                <div className="stat" style={{ fontSize: '36px', fontWeight: 800, color: '#a855f7' }}>3</div>
                <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Rechtliche RVG-Kalkulatoren</p>
              </div>
            </div>

            {/* Grid for Actions */}
            <div className="grid-2" style={{ marginTop: '32px' }}>
              <div className="card">
                <h3>Schnellstart: Was ist passiert?</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>Wähle dein aktuelles Problem aus, um direkt zum passenden Tool zu gelangen.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button className="btn btn-secondary" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between' }} onClick={() => setActiveView('dsgvo_auskunft')}>
                    <span>🔒 "Ich will wissen, was X über mich speichert"</span> ➔
                  </button>
                  <button className="btn btn-secondary" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between' }} onClick={() => setActiveView('dsgvo_loeschung')}>
                    <span>🗑️ "Unternehmen X soll meine Daten löschen"</span> ➔
                  </button>
                  <button className="btn btn-secondary" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between' }} onClick={() => setActiveView('bew_google')}>
                    <span>⭐ "Eine Google-Bewertung schädigt meinen Ruf"</span> ➔
                  </button>
                  <button className="btn btn-secondary" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between' }} onClick={() => setActiveView('sm_instagram')}>
                    <span>📱 "Mein Social-Media-Konto wurde grundlos gesperrt"</span> ➔
                  </button>
                  <button className="btn btn-secondary" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between' }} onClick={() => setActiveView('urh_abmahnung')}>
                    <span>⚖️ "Ich habe eine Urheberrechts-Abmahnung erhalten"</span> ➔
                  </button>
                </div>
              </div>

              <div className="card">
                <h3>Absender-Profil (Lokal)</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>Hinterlege deine Daten einmalig, um alle Dokumente automatisch auszufüllen. Deine Daten bleiben zu 100% lokal im Browser gespeichert.</p>
                <form onSubmit={handleSaveProfile} className="form-grid-1">
                  <div className="form-group">
                    <label>Dein vollständiger Name</label>
                    <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="z. B. Max Mustermann" />
                  </div>
                  <div className="form-group">
                    <label>Deine Anschrift (Straße, Hausnr, PLZ, Ort)</label>
                    <textarea rows={3} value={userAddr} onChange={e => setUserAddr(e.target.value)} placeholder="Musterstraße 1&#10;12345 Musterstadt" style={{ resize: 'none' }}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Absenderdaten speichern</button>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* 2. RECHNER VIEW */}
        {activeView === 'rechner' && (
          <section className="view active">
            <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '11px', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px', display: 'block' }}>Kalkulatoren</span>
            <h2>3 Rechner für digitale Rechte</h2>
            <p className="lead">Abmahnkosten prüfen, Vertragsstrafen kalkulieren und Schadensersatz-Forderungen abschätzen.</p>

            <div className="grid-2" style={{ marginTop: '32px' }}>
              {/* RVG Rechner */}
              <div className="card">
                <h3>💰 Abmahnkosten-Rechner (RVG)</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Berechnet die gesetzlichen Gebühren nach dem Rechtsanwaltsvergütungsgesetz (RVG § 13). Höhere Rechnungen von gegnerischen Kanzleien sind meist unzulässig.</p>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Gegenstandswert (€)</label>
                    <input type="number" value={calcGw} onChange={e => setCalcGw(parseInt(e.target.value) || 0)} min={100} step={100} />
                  </div>
                  <div className="form-group">
                    <label>Verfahrensart</label>
                    <select value={calcArt} onChange={e => setCalcArt(e.target.value)}>
                      <option value="aussergerichtlich">Außergerichtlich (Geschäftsgebühr 1.3)</option>
                      <option value="gerichtlich">Gerichtlich (Verfahrensgebühr 1.3 + Termin 1.2)</option>
                    </select>
                  </div>
                </div>
                <div className="calc-result" style={{ marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--muted)' }}>Gegenstandswert:</span>
                    <span style={{ fontWeight: 'bold' }}>{calcGw.toLocaleString('de-DE')} €</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--muted)' }}>{calcAbmahnTotal().name}:</span>
                    <span style={{ fontWeight: 'bold' }}>{calcAbmahnTotal().gebuehr.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--muted)' }}>Auslagenpauschale (Nr. 7002 VV):</span>
                    <span style={{ fontWeight: 'bold' }}>20,00 €</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '8px', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--muted)' }}>Zwischensumme Netto:</span>
                    <span style={{ fontWeight: 'bold' }}>{(calcAbmahnTotal().gebuehr + 20).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--muted)' }}>19% Mehrwertsteuer:</span>
                    <span style={{ fontWeight: 'bold' }}>{((calcAbmahnTotal().gebuehr + 20) * 0.19).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--accent-blue)', paddingTop: '8px', fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
                    <span>RVG-Gesamtsumme:</span>
                    <span style={{ color: 'var(--accent-blue)' }}>{calcAbmahnTotal().gesamt.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                  </div>
                </div>
              </div>

              {/* Vertragsstrafe Rechner */}
              <div className="card">
                <h3>⚖️ Vertragsstrafe-Rechner</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Berechnet eine rechtssichere Vertragsstrafe für modifizierte Unterlassungserklärungen. Der BGH deckelt unverhältnismäßig hohe Strafen für Verbraucher.</p>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Fiktiver Streitwert (€)</label>
                    <input type="number" value={calcSw} onChange={e => setCalcSw(parseInt(e.target.value) || 0)} min={100} step={100} />
                  </div>
                  <div className="form-group">
                    <label>Wiederholungsgefahr</label>
                    <select value={calcRisiko} onChange={e => setCalcRisiko(e.target.value)}>
                      <option value="niedrig">Niedrig (Faktor 0.3)</option>
                      <option value="mittel">Mittel (Faktor 0.5)</option>
                      <option value="hoch">Hoch (Faktor 0.8)</option>
                    </select>
                  </div>
                </div>
                <div className="calc-result" style={{ marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--muted)' }}>Streitwert:</span>
                    <span style={{ fontWeight: 'bold' }}>{calcSw.toLocaleString('de-DE')} €</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--muted)' }}>Risikofaktor:</span>
                    <span style={{ fontWeight: 'bold' }}>{calcRisiko === 'niedrig' ? '0.3' : calcRisiko === 'mittel' ? '0.5' : '0.8'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--muted)' }}>Mathematischer Wert:</span>
                    <span style={{ fontWeight: 'bold' }}>{calcStrafeTotal().raw.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #a855f7', paddingTop: '8px', fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
                    <span>Empfohlene Strafe (Cap 2k):</span>
                    <span style={{ color: '#a855f7' }}>{calcStrafeTotal().rec.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                  </div>
                  {calcStrafeTotal().raw > 2000 && (
                    <p style={{ fontSize: '11px', color: 'var(--accent-red)', marginTop: '8px', margin: 0 }}>
                      ⚠️ Der errechnete Wert übersteigt 2.000 €. Die Strafe wurde gemäß BGH-Richtlinie gedeckelt.
                    </p>
                  )}
                </div>
              </div>

              {/* Schadensersatz Rechner */}
              <div className="card" style={{ gridColumn: '1/-1' }}>
                <h3>💸 Schadensersatz-Schätzer (Online-Bewertungen)</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Schätzt die Höhe des potenziellen Schadensersatzes bei rufschädigenden Fake-Bewertungen auf Google, Jameda und anderen Plattformen.</p>
                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Sterne-Bewertung</label>
                    <input type="number" value={calcSterne} onChange={e => setCalcSterne(parseInt(e.target.value) || 1)} min={1} max={5} />
                  </div>
                  <div className="form-group">
                    <label>Monatliche Reichweite (Aufrufe)</label>
                    <input type="number" value={calcReichweite} onChange={e => setCalcReichweite(parseInt(e.target.value) || 0)} min={0} step={100} />
                  </div>
                  <div className="form-group">
                    <label>Schwere der falschen Behauptung</label>
                    <select value={calcSchwere} onChange={e => setCalcSchwere(e.target.value)}>
                      <option value="leicht">Leichte Falschaussage (Faktor 1.0)</option>
                      <option value="mittel">Mittlere Beleidigung (Faktor 2.0)</option>
                      <option value="schwer">Schwere Verleumdung (Faktor 4.0)</option>
                    </select>
                  </div>
                </div>
                <div className="calc-result" style={{ marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--muted)' }}>Sterne-Faktor:</span>
                    <span style={{ fontWeight: 'bold' }}>{calcSterne} ★</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--muted)' }}>Schwere-Faktor (Basis €):</span>
                    <span style={{ fontWeight: 'bold' }}>{calcSchwere === 'leicht' ? '300' : calcSchwere === 'mittel' ? '600' : '1000'} €</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--accent-blue)', paddingTop: '8px', fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                    <span>Schadensersatz-Schätzung (Spanne):</span>
                    <span style={{ color: 'var(--accent-blue)' }}>
                      {calcSchadenTotal().min.toLocaleString('de-DE')} € – {calcSchadenTotal().max.toLocaleString('de-DE')} €
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. FRIST-TRACKER VIEW */}
        {activeView === 'frist_tracker' && (
          <section className="view active">
            <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '11px', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px', display: 'block' }}>Fristenkalender</span>
            <h2>Frist-Tracker (Mit Ampelsystem)</h2>
            <p className="lead">Behalte alle Fristen von DSGVO-Anträgen, Widersprüchen und Abmahnungen sicher im Griff.</p>

            <div className="grid-2" style={{ marginTop: '32px' }}>
              <div className="card">
                <h3>Frist eintragen</h3>
                <form onSubmit={handleAddFrist} className="form-grid-1">
                  <div className="form-group">
                    <label>Bezeichnung / Fall</label>
                    <input type="text" value={fristWas} onChange={e => setFristWas(e.target.value)} placeholder="z.B. DSGVO Auskunft an Google Ireland" required />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Startdatum</label>
                      <input type="date" value={fristStart} onChange={e => setFristStart(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Dauer (Tage)</label>
                      <input type="number" value={fristTage} onChange={e => setFristTage(e.target.value)} min={1} required />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Frist hinzufügen</button>
                </form>
              </div>

              <div className="card">
                <h3>Aktive & Erledigte Fristen</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '350px', overflowY: 'auto', marginTop: '12px' }}>
                  {fristen.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)', fontSize: '14px' }}>
                      Keine aktiven Fristen erfasst. Verwende das Formular links, um deine Fristen lokal zu verwalten.
                    </div>
                  ) : (
                    fristen.map((f: any) => {
                      const todayISOStr = new Date().toISOString().split('T')[0];
                      const diffTime = new Date(f.end).getTime() - new Date(todayISOStr).getTime();
                      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      const isOverdue = daysLeft < 0;
                      const isUrgent = daysLeft <= 7 && !isOverdue;

                      return (
                        <div key={f.id} style={{
                          padding: '16px',
                          background: 'rgba(255,255,255,0.02)',
                          borderRadius: '12px',
                          border: '1px solid',
                          borderColor: f.erledigt ? 'rgba(255,255,255,0.05)' : isOverdue ? 'rgba(239, 68, 68, 0.4)' : isUrgent ? 'rgba(245, 158, 11, 0.4)' : 'rgba(139, 92, 246, 0.2)',
                          opacity: f.erledigt ? 0.6 : 1,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div>
                            <h4 style={{ textDecoration: f.erledigt ? 'line-through' : 'none', color: f.erledigt ? 'var(--muted)' : 'white', margin: '0 0 4px 0' }}>{f.was}</h4>
                            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>
                              Start: {formatDateStr(f.start)} ({f.tage} Tage) → Ende:{' '}
                              <strong style={{ color: f.erledigt ? 'var(--muted)' : isOverdue ? 'var(--accent-red)' : isUrgent ? '#f59e0b' : '#a855f7' }}>{formatDateStr(f.end)}</strong>
                            </p>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {!f.erledigt && (
                              <span style={{
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                color: isOverdue ? 'white' : 'black',
                                background: isOverdue ? 'var(--accent-red)' : isUrgent ? '#f59e0b' : '#c084fc'
                              }}>
                                {isOverdue ? '⚠ ÜBERFÄLLIG' : isUrgent ? `⏳ ${daysLeft} Tage` : `${daysLeft} Tage`}
                              </span>
                            )}
                            <button className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => toggleFrist(f.id)}>
                              {f.erledigt ? '↺' : '✓'}
                            </button>
                            <button className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '12px', color: 'var(--accent-red)' }} onClick={() => deleteFrist(f.id)}>
                              🗑️
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. DSGVO: ART. 15 AUSKUNFT */}
        {activeView === 'dsgvo_auskunft' && (
          <section className="view active">
            <div className="grid-2">
              <div className="card">
                <h3>Auskunfts-Antrag gemäß Art. 15 DSGVO</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Erfrage bei jedem beliebigen Unternehmen (Schufa, Facebook, etc.), welche persönlichen Daten dort gespeichert sind. Die Auskunft ist kostenlos.</p>
                <div className="form-grid-1">
                  <div className="form-group">
                    <label>Empfänger / Unternehmen wählen (Preset)</label>
                    <select onChange={e => applyFirmaPreset('b1', e.target.value)}>
                      <option value="">-- Preset wählen --</option>
                      <option value="google">Google Ireland</option>
                      <option value="meta">Meta (Facebook/Instagram)</option>
                      <option value="tiktok">TikTok Technology</option>
                      <option value="ebay">eBay GmbH</option>
                      <option value="amazon">Amazon Europe</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Firmenname</label>
                    <input type="text" value={b1Firma} onChange={e => setB1Firma(e.target.value)} placeholder="z. B. Google Ireland Limited" />
                  </div>
                  <div className="form-group">
                    <label>Anschrift der Firma</label>
                    <textarea rows={2} value={b1FirmaAdr} onChange={e => setB1FirmaAdr(e.target.value)} placeholder="Gordon House, Barrow Street&#10;Dublin 4, Irland" style={{ resize: 'none' }}></textarea>
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Verbindungsart</label>
                      <select value={b1Empf} onChange={e => setB1Empf(e.target.value)}>
                        <option value="allgemein">Allgemeiner Kunde / Nutzer</option>
                        <option value="social">Social Media Nutzer (EuGH-Hebel)</option>
                        <option value="arbeitgeber">Ehemaliger Arbeitgeber (§ 26 BDSG)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tonalität des Briefes</label>
                      <select value={b1Tone} onChange={e => setB1Tone(e.target.value)}>
                        <option value="friendly">Freundlich (Standard)</option>
                        <option value="firm">Bestimmt (Fristsetzung)</option>
                        <option value="lawyer">Sehr streng (Anwalts-Drohung)</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Identifikationsmerkmale (z.B. Kundennummer, Benutzername)</label>
                    <input type="text" value={b1Id} onChange={e => setB1Id(e.target.value)} placeholder="z. B. Kundennummer: KD-12948" />
                  </div>
                  <div className="form-group">
                    <label>Spezielle Angaben (optional)</label>
                    <input type="text" value={b1Extras} onChange={e => setB1Extras(e.target.value)} placeholder="z. B. Speziell Informationen zu Werbeeinstellungen" />
                  </div>
                  <div className="form-group">
                    <label>Anlagen anhängen (Checkboxen)</label>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        <input type="checkbox" checked={b1Att.ausweis} onChange={e => setB1Att({ ...b1Att, ausweis: e.target.checked })} /> Kopie Personalausweis (geschwärzt)
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        <input type="checkbox" checked={b1Att.vertrag} onChange={e => setB1Att({ ...b1Att, vertrag: e.target.checked })} /> Kopie des Vertrages
                      </label>
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={() => handlePrint('b1-preview')}>📄 PDF generieren / Drucken</button>
                </div>
              </div>

              {/* Brief Vorschau */}
              <div className="card">
                <h3>Brief-Vorschau</h3>
                <div id="b1-preview" className="letter-preview" style={{ padding: '30px', background: 'white', color: 'black', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '13px', lineHeight: '1.5' }}>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666' }}>
                    <div>DIGITAL-SCHUTZSCHILD · Auskunfts-Antrag Art. 15 DSGVO</div>
                    <div>Generiert {new Date().toLocaleDateString('de-DE')}</div>
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <strong>{userName || '[Dein Name]'}</strong><br/>
                    {userAddr ? nl2br(userAddr) : '[Deine Anschrift]'}
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                    An:<br/>
                    <strong>{b1Firma || '[Firmenname]'}</strong><br/>
                    {b1FirmaAdr ? nl2br(b1FirmaAdr) : '[Anschrift der Firma]'}
                  </div>
                  <div style={{ textAlign: 'right', marginBottom: '20px' }}>Datum: {new Date().toLocaleDateString('de-DE')}</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>Auskunfts-Antrag gemäß Art. 15 DSGVO</div>
                  
                  <p>{getToneObj(b1Tone).greet}</p>
                  {b1Empf === 'social' && (
                    <p>Ich weise darauf hin, dass Sie als Plattform-Betreiber gemäß Art. 4 Nr. 7 DSGVO Verantwortlicher für die Verarbeitung meiner personenbezogenen Daten sind und die DSGVO unmittelbar anwendbar ist (EuGH C-230/14, "Weltimmo").</p>
                  )}
                  {b1Empf === 'arbeitgeber' && (
                    <p>Im Beschäftigungsverhältnis sind Sie als Arbeitgeber gemäß § 26 BDSG Verantwortlicher für die Verarbeitung meiner Beschäftigtendaten.</p>
                  )}
                  
                  <p>hiermit mache ich von meinem <strong>Auskunftsrecht nach Art. 15 DSGVO</strong> Gebrauch und bitte Sie, mir innerhalb der gesetzlichen Frist von <strong>{getToneObj(b1Tone).frist}</strong> folgende Informationen zu übermitteln:</p>
                  <ol style={{ marginLeft: '20px', marginBottom: '14px' }}>
                    <li>Bestätigung, ob Sie personenbezogene Daten von mir verarbeiten</li>
                    <li>Kategorien und konkrete Datenpunkte der verarbeiteten Daten</li>
                    <li>Verarbeitungszwecke</li>
                    <li>Empfänger oder Kategorien von Empfängern</li>
                    <li>Speicherdauer bzw. Kriterien für die Festlegung</li>
                    <li>Herkunft der Daten (falls nicht bei mir erhoben)</li>
                    <li>Profiling-Informationen (Art. 22 DSGVO) sofern zutreffend</li>
                  </ol>
                  
                  {b1Id && <p>Zur eindeutigen Zuordnung meines Kontos übermittle ich Ihnen folgendes Merkmal: <strong>{b1Id}</strong></p>}
                  {b1Extras && <p>{b1Extras}</p>}
                  
                  <p>Die Auskunft ist gemäß <strong>Art. 12 III DSGVO</strong> kostenlos. Eine Fristverlängerung um 2 Monate ist nur unter den Voraussetzungen des Art. 12 III DSGVO und mit Mitteilung innerhalb des ersten Monats zulässig.</p>
                  
                  {(b1Att.ausweis || b1Att.vertrag) && (
                    <div style={{ borderTop: '1px solid #eee', marginTop: '16px', paddingTop: '8px', fontSize: '11px', color: '#555' }}>
                      <strong>Anlagen:</strong>
                      <ul style={{ marginLeft: '16px' }}>
                        {b1Att.ausweis && <li>Kopie Personalausweis (geschwärzt)</li>}
                        {b1Att.vertrag && <li>Kopie des Vertrages</li>}
                      </ul>
                    </div>
                  )}

                  <div dangerouslySetInnerHTML={{ __html: getToneObj(b1Tone).eskal }}></div>
                  <p style={{ marginTop: '20px' }}>Mit freundlichen Grüßen,</p>
                  <p style={{ marginTop: '40px' }}>___________________________<br/>{userName || '[Dein Name]'}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 5. DSGVO: LÖSCHUNG */}
        {activeView === 'dsgvo_loeschung' && (
          <section className="view active">
            <div className="grid-2">
              <div className="card">
                <h3>Löschungs-Antrag gemäß Art. 17 DSGVO</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Fordere ein Unternehmen auf, unrechtmäßig oder veraltet gespeicherte Daten unverzüglich zu löschen ("Recht auf Vergessenwerden").</p>
                <div className="form-grid-1">
                  <div className="form-group">
                    <label>Empfänger / Unternehmen wählen (Preset)</label>
                    <select onChange={e => applyFirmaPreset('b2', e.target.value)}>
                      <option value="">-- Preset wählen --</option>
                      <option value="google">Google Ireland</option>
                      <option value="meta">Meta (Facebook/Instagram)</option>
                      <option value="tiktok">TikTok Technology</option>
                      <option value="ebay">eBay GmbH</option>
                      <option value="amazon">Amazon Europe</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Firmenname</label>
                    <input type="text" value={b2Firma} onChange={e => setB2Firma(e.target.value)} placeholder="z. B. Google Ireland Limited" />
                  </div>
                  <div className="form-group">
                    <label>Anschrift der Firma</label>
                    <textarea rows={2} value={b2FirmaAdr} onChange={e => setB2FirmaAdr(e.target.value)} placeholder="Gordon House, Barrow Street&#10;Dublin 4, Irland" style={{ resize: 'none' }}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Welche Daten sollen gelöscht werden?</label>
                    <input type="text" value={b2Daten} onChange={e => setB2Daten(e.target.value)} placeholder="z. B. Mein Nutzerkonto 'max_mustermann' und alle Verlaufsdaten" />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Grund für Löschung</label>
                      <select value={b2Grund} onChange={e => setB2Grund(e.target.value)}>
                        <option value="zweck_entfaellt">Der Zweck der Speicherung ist entfallen</option>
                        <option value="einwilligung_widerruf">Einwilligung widerrufen (Art. 7 III DSGVO)</option>
                        <option value="widerspruch">Widerspruch eingelegt (Art. 21 DSGVO)</option>
                        <option value="unrechtmaessig">Die Verarbeitung ist unrechtmäßig</option>
                        <option value="rechtliche_pflicht">Erfüllung einer rechtlichen Pflicht</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tonalität des Briefes</label>
                      <select value={b2Tone} onChange={e => setB2Tone(e.target.value)}>
                        <option value="friendly">Freundlich (Standard)</option>
                        <option value="firm">Bestimmt (Fristsetzung)</option>
                        <option value="lawyer">Sehr streng (Anwalts-Drohung)</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Spezielle Begründung (optional)</label>
                    <input type="text" value={b2Extras} onChange={e => setB2Extras(e.target.value)} placeholder="z. B. Die Speicherung schädigt meine Bonität unberechtigt" />
                  </div>
                  <div className="form-group">
                    <label>Kopie Personalausweis beilegen?</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', marginTop: '6px' }}>
                      <input type="checkbox" checked={b2Att.ausweis} onChange={e => setB2Att({ ...b2Att, ausweis: e.target.checked })} /> Kopie Personalausweis (geschwärzt)
                    </label>
                  </div>
                  <button className="btn btn-primary" onClick={() => handlePrint('b2-preview')}>📄 PDF generieren / Drucken</button>
                </div>
              </div>

              {/* Brief Vorschau */}
              <div className="card">
                <h3>Brief-Vorschau</h3>
                <div id="b2-preview" className="letter-preview" style={{ padding: '30px', background: 'white', color: 'black', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '13px', lineHeight: '1.5' }}>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666' }}>
                    <div>DIGITAL-SCHUTZSCHILD · Löschungs-Antrag Art. 17 DSGVO</div>
                    <div>Generiert {new Date().toLocaleDateString('de-DE')}</div>
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <strong>{userName || '[Dein Name]'}</strong><br/>
                    {userAddr ? nl2br(userAddr) : '[Deine Anschrift]'}
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                    An:<br/>
                    <strong>{b2Firma || '[Firmenname]'}</strong><br/>
                    {b2FirmaAdr ? nl2br(b2FirmaAdr) : '[Anschrift der Firma]'}
                  </div>
                  <div style={{ textAlign: 'right', marginBottom: '20px' }}>Datum: {new Date().toLocaleDateString('de-DE')}</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>Antrag auf Löschung gemäß Art. 17 DSGVO</div>
                  
                  <p>Sehr geehrte Damen und Herren,</p>
                  <p>hiermit beantrage ich gemäß <strong>Art. 17 DSGVO</strong> die unverzügliche Löschung der folgenden personenbezogenen Daten:</p>
                  <p style={{ margin: '8px 0', padding: '10px', background: '#f8f8f8', borderLeft: '3px solid #8b5cf6' }}>
                    <strong>{b2Daten || '[konkrete Daten]'}</strong>
                  </p>
                  
                  <p>
                    Begründung:{' '}
                    {b2Grund === 'zweck_entfaellt' && 'der Zweck der Verarbeitung ist entfallen.'}
                    {b2Grund === 'einwilligung_widerruf' && 'ich widerrufe meine Einwilligung (Art. 7 III DSGVO) und es liegt keine andere Rechtsgrundlage vor.'}
                    {b2Grund === 'widerspruch' && 'ich lege Widerspruch nach Art. 21 DSGVO ein und es liegen keine zwingenden schutzwürdigen Gründe Ihrerseits vor.'}
                    {b2Grund === 'unrechtmaessig' && 'die Verarbeitung ist unrechtmäßig.'}
                    {b2Grund === 'rechtliche_pflicht' && 'die Löschung ist zur Erfüllung einer rechtlichen Pflicht erforderlich.'}
                  </p>
                  
                  {b2Extras && <p>{b2Extras}</p>}
                  
                  <p>Nach <strong>Art. 17 I DSGVO</strong> sind Sie verpflichtet, diese Daten unverzüglich zu löschen, sofern einer der in Art. 17 I genannten Gründe vorliegt. Ausnahmen nach Art. 17 III DSGVO müssen Sie konkret darlegen.</p>
                  <p>Ich weise darauf hin, dass Sie gemäß <strong>Art. 19 DSGVO</strong> allen Empfängern, denen die Daten offengelegt wurden, die Löschung mitzuteilen haben.</p>
                  <p>Ich bitte um Bestätigung der Löschung innerhalb von <strong>{getToneObj(b2Tone).frist}</strong>. Erfolgt keine Reaktion, behalte ich mir eine Beschwerde bei der zuständigen Aufsichtsbehörde vor.</p>
                  
                  {b2Att.ausweis && (
                    <div style={{ borderTop: '1px solid #eee', marginTop: '16px', paddingTop: '8px', fontSize: '11px', color: '#555' }}>
                      <strong>Anlagen:</strong>
                      <ul style={{ marginLeft: '16px' }}>
                        <li>Kopie Personalausweis (geschwärzt)</li>
                      </ul>
                    </div>
                  )}

                  <div dangerouslySetInnerHTML={{ __html: getToneObj(b2Tone).eskal }}></div>
                  <p style={{ marginTop: '20px' }}>Mit freundlichen Grüßen,</p>
                  <p style={{ marginTop: '40px' }}>___________________________<br/>{userName || '[Dein Name]'}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. DSGVO: LfDI BESCHWERDE */}
        {activeView === 'dsgvo_beschwerde' && (
          <section className="view active">
            <div className="grid-2">
              <div className="card">
                <h3>Beschwerde an die Landesdatenschutzbehörde (LfDI)</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Reagiert ein Unternehmen nicht innerhalb eines Monats auf deinen Auskunfts- oder Löschungsantrag, reiche Beschwerde bei der Aufsichtsbehörde ein.</p>
                <div className="form-grid-1">
                  <div className="form-group">
                    <label>Aufsichtsbehörde des Bundeslandes</label>
                    <select value={b3Bl} onChange={e => setB3Bl(e.target.value)}>
                      <option value="bfdi">Bundesbeauftragter (BfDI)</option>
                      <option value="bw">Baden-Württemberg</option>
                      <option value="by">Bayern</option>
                      <option value="be">Berlin</option>
                      <option value="bb">Brandenburg</option>
                      <option value="hb">Bremen</option>
                      <option value="hh">Hamburg</option>
                      <option value="he">Hessen</option>
                      <option value="mv">Mecklenburg-Vorpommern</option>
                      <option value="ni">Niedersachsen</option>
                      <option value="nw">Nordrhein-Westfalen</option>
                      <option value="rp">Rheinland-Pfalz</option>
                      <option value="sl">Saarland</option>
                      <option value="sn">Sachsen</option>
                      <option value="st">Sachsen-Anhalt</option>
                      <option value="sh">Schleswig-Holstein</option>
                      <option value="th">Thüringen</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Gegen welches Unternehmen richtet sich die Beschwerde?</label>
                    <input type="text" value={b3Firma} onChange={e => setB3Firma(e.target.value)} placeholder="z. B. Google Ireland Limited" />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Art des Verstoßes</label>
                      <select value={b3Art} onChange={e => setB3Art(e.target.value)}>
                        <option value="auskunft">Auskunftsantrag ignoriert (Art. 15)</option>
                        <option value="loeschung">Löschungsantrag ignoriert (Art. 17)</option>
                        <option value="widerspruch">Widerspruch nicht beachtet (Art. 21)</option>
                        <option value="einwilligung">Einwilligung missachtet (Art. 7)</option>
                        <option value="datenleck">Datenleck nicht gemeldet (Art. 34)</option>
                        <option value="andere">Anderer DSGVO-Verstoß</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Datum deines Antrags</label>
                      <input type="date" value={b3Datum} onChange={e => setB3Datum(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Konkreter Sachverhalt (Details für die Behörde)</label>
                    <textarea rows={3} value={b3Sachverhalt} onChange={e => setB3Sachverhalt(e.target.value)} placeholder="z. B. Ich habe am genannten Datum per Einschreiben Auskunft verlangt. Die Frist von einem Monat verstrich ergebnislos, es gab keinerlei Rückmeldung."></textarea>
                  </div>
                  <div className="form-group">
                    <label>Anlagen beilegen?</label>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        <input type="checkbox" checked={b3Att.antrag} onChange={e => setB3Att({ ...b3Att, antrag: e.target.checked })} /> Kopie des ursprünglichen Antrags
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        <input type="checkbox" checked={b3Att.ablehnung} onChange={e => setB3Att({ ...b3Att, ablehnung: e.target.checked })} /> Sendebeleg / Einschreiben-Rückschein
                      </label>
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={() => handlePrint('b3-preview')}>📄 PDF generieren / Drucken</button>
                </div>
              </div>

              {/* Brief Vorschau */}
              <div className="card">
                <h3>Brief-Vorschau</h3>
                <div id="b3-preview" className="letter-preview" style={{ padding: '30px', background: 'white', color: 'black', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '13px', lineHeight: '1.5' }}>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666' }}>
                    <div>DIGITAL-SCHUTZSCHILD · LfDI-Beschwerde Art. 77 DSGVO</div>
                    <div>Generiert {new Date().toLocaleDateString('de-DE')}</div>
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <strong>{userName || '[Dein Name]'}</strong><br/>
                    {userAddr ? nl2br(userAddr) : '[Deine Anschrift]'}
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                    An:<br/>
                    <strong>{nl2br(getLfDIAddress(b3Bl))}</strong>
                  </div>
                  <div style={{ textAlign: 'right', marginBottom: '20px' }}>Datum: {new Date().toLocaleDateString('de-DE')}</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>Beschwerde gemäß Art. 77 DSGVO gegen {b3Firma || '[Firmenname]'}</div>
                  
                  <p>Sehr geehrte Damen und Herren,</p>
                  <p>hiermit erhebe ich <strong>Beschwerde nach Art. 77 DSGVO</strong> gegen das oben genannte Unternehmen wegen folgender DSGVO-Verletzung:</p>
                  <p style={{ margin: '8px 0', padding: '10px', background: '#f8f8f8', borderLeft: '3px solid #8b5cf6' }}>
                    <strong>
                      {b3Art === 'auskunft' && 'Auskunfts-Antrag (Art. 15 DSGVO) wurde ignoriert'}
                      {b3Art === 'loeschung' && 'Löschungs-Antrag (Art. 17 DSGVO) wurde ignoriert'}
                      {b3Art === 'widerspruch' && 'Widerspruch (Art. 21 DSGVO) wurde nicht beachtet'}
                      {b3Art === 'einwilligung' && 'Einwilligung (Art. 7 DSGVO) wurde nicht respektiert'}
                      {b3Art === 'datenleck' && 'Datenleck nicht gemeldet (Art. 34 DSGVO)'}
                      {b3Art === 'andere' && 'Anderer DSGVO-Verstoß'}
                    </strong>
                  </p>
                  
                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>Sachverhalt</h4>
                  <p>{b3Sachverhalt || '[Sachverhalt]'}</p>
                  
                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>Bisheriger Verfahrensgang</h4>
                  <p>• <strong>{formatDateStr(b3Datum)}</strong>: Ursprünglicher Antrag an das Unternehmen gestellt</p>
                  <p>• Bis heute: Keine oder unzureichende Reaktion des Verantwortlichen</p>
                  <p>• Frist nach Art. 12 III DSGVO verstrich ergebnislos</p>
                  
                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>Rechtsgrundlage</h4>
                  <p>Die Beschwerde stützt sich auf <strong>Art. 77 I DSGVO</strong>. Die Aufsichtsbehörde prüft den Vorfall und ergreift gemäß <strong>Art. 58 DSGVO</strong> die notwendigen Abhilfemaßnahmen (Anweisungen, Verwarnungen oder Bußgelder).</p>
                  
                  {(b3Att.antrag || b3Att.ablehnung) && (
                    <div style={{ borderTop: '1px solid #eee', marginTop: '16px', paddingTop: '8px', fontSize: '11px', color: '#555' }}>
                      <strong>Anlagen:</strong>
                      <ul style={{ marginLeft: '16px' }}>
                        {b3Att.antrag && <li>Kopie des ursprünglichen Antrags</li>}
                        {b3Att.ablehnung && <li>Sendebeleg / Einschreiben-Rückschein</li>}
                      </ul>
                    </div>
                  )}

                  <p style={{ marginTop: '20px' }}>Mit freundlichen Grüßen,</p>
                  <p style={{ marginTop: '40px' }}>___________________________<br/>{userName || '[Dein Name]'}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 7. BEWERTUNGEN: GOOGLE LÖSCHEN */}
        {activeView === 'bew_google' && (
          <section className="view active">
            <div className="grid-2">
              <div className="card">
                <h3>Google-Bewertung löschen lassen</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Google haftet als Host-Provider ab Kenntnisnahme für rufschädigende, unwahre oder beleidigende Rezensionen auf Google Maps.</p>
                <div className="form-grid-1">
                  <div className="form-group">
                    <label>URL der Google-Bewertung / deines Eintrags</label>
                    <input type="text" value={b4Url} onChange={e => setB4Url(e.target.value)} placeholder="z. B. https://maps.google.com/..." />
                  </div>
                  <div className="form-group">
                    <label>Name des Rezensenten</label>
                    <input type="text" value={b4Name} onChange={e => setB4Name(e.target.value)} placeholder="z. B. 'Max M.' oder Pseudonym" />
                  </div>
                  <div className="form-group">
                    <label>Verstoß-Begründung</label>
                    <select value={b4Grund} onChange={e => setB4Grund(e.target.value)}>
                      <option value="kein_kontakt">Kein Kundenkontakt (Fake-Bewertung)</option>
                      <option value="unwahrheit">Rufschädigende Unwahrheiten (Tatsachenbehauptung)</option>
                      <option value="beleidigung">Beleidigung / Schmähkritik</option>
                      <option value="mitarbeiter">Ehemaliger Mitarbeiter (Interessenskonflikt)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Beschreibung des genauen Inhalts der Bewertung</label>
                    <textarea rows={3} value={b4Details} onChange={e => setB4Details(e.target.value)} placeholder="z. B. Der Nutzer schreibt, ich hätte ihn 'betrogen'. Dies ist eine unwahre Tatsachenbehauptung. Es gab nie eine vertragliche Beziehung."></textarea>
                  </div>
                  <div className="form-group">
                    <label>Tonalität des Schreibens</label>
                    <select value={b4Tone} onChange={e => setB4Tone(e.target.value)}>
                      <option value="friendly">Sachlich (Standard)</option>
                      <option value="firm">Bestimmt (BGH Rechtsprechung)</option>
                      <option value="lawyer">Sehr streng (Haftungs-Androhung)</option>
                    </select>
                  </div>
                  <button className="btn btn-primary" onClick={() => handlePrint('b4-preview')}>📄 PDF generieren / Drucken</button>
                </div>
              </div>

              {/* Brief Vorschau */}
              <div className="card">
                <h3>Brief-Vorschau</h3>
                <div id="b4-preview" className="letter-preview" style={{ padding: '30px', background: 'white', color: 'black', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '13px', lineHeight: '1.5' }}>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666' }}>
                    <div>DIGITAL-SCHUTZSCHILD · Google-Bewertung Beanstandung</div>
                    <div>Generiert {new Date().toLocaleDateString('de-DE')}</div>
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <strong>{userName || '[Dein Name]'}</strong><br/>
                    {userAddr ? nl2br(userAddr) : '[Deine Anschrift]'}
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                    An:<br/>
                    <strong>Google Ireland Limited</strong><br/>
                    Gordon House, Barrow Street<br/>
                    Dublin 4, Irland
                  </div>
                  <div style={{ textAlign: 'right', marginBottom: '20px' }}>Datum: {new Date().toLocaleDateString('de-DE')}</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>Rüge einer rechtsverletzenden Bewertung (Google Maps / Google Business)</div>
                  
                  <p>Sehr geehrte Damen und Herren,</p>
                  <p>hiermit rüge ich die rechtsverletzende Bewertung des Nutzers <strong>"{b4Name || '[Name des Rezensenten]'}"</strong> auf meiner Google Business / Google Maps Seite.</p>
                  <p>URL des Eintrags: <strong>{b4Url || '[URL]'}</strong></p>
                  
                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>Begründung und Rügegegenstand</h4>
                  <p>
                    {b4Grund === 'kein_kontakt' && 'Es besteht kein Kundenkontakt. Der Rezensent stand zu keinem Zeitpunkt in einer geschäftlichen Beziehung zu meinem Unternehmen. Es handelt sich um eine Fake-Bewertung.'}
                    {b4Grund === 'unwahrheit' && 'Die Bewertung enthält unwahre Tatsachenbehauptungen, die geeignet sind, den Ruf meines Gewerbebetriebs massiv zu schädigen.'}
                    {b4Grund === 'beleidigung' && 'Die Formulierung überschreitet die Grenze zur Schmähkritik und stellt eine unzulässige Beleidigung dar.'}
                    {b4Grund === 'mitarbeiter' && 'Der Rezensent ist ein ehemaliger Mitarbeiter, welcher durch die Bewertung wettbewerbswidrige Rache übt.'}
                  </p>
                  
                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>Konkreter Verstoß</h4>
                  <p>{b4Details || '[Details]'}</p>

                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>Rechtlicher Hebel</h4>
                  <p>Gemäß der ständigen BGH-Rechtsprechung (u.a. BGH VI ZR 34/15) sind Sie als Host-Provider verpflichtet, nach Erhalt einer solchen substanziierten Rüge das Stellungnahmeverfahren einzuleiten und die Bewertung zu entfernen, falls der Verfasser die geschäftliche Beziehung oder den Wahrheitsgehalt nicht nachweist.</p>
                  <p>Ich fordere Sie auf, die Bewertung innerhalb von <strong>{getToneObj(b4Tone).frist}</strong> zu löschen oder zu sperren.</p>

                  <div dangerouslySetInnerHTML={{ __html: getToneObj(b4Tone).eskal }}></div>
                  <p style={{ marginTop: '20px' }}>Mit freundlichen Grüßen,</p>
                  <p style={{ marginTop: '40px' }}>___________________________<br/>{userName || '[Dein Name]'}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 8. BEWERTUNGEN: JAMEDA */}
        {activeView === 'bew_jameda' && (
          <section className="view active">
            <div className="grid-2">
              <div className="card">
                <h3>Jameda-Profil & Bewertungen entfernen</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Ärzte und Heilberufler können unliebsame Bewertungen oder sogar das gesamte Profil auf Jameda löschen lassen (BGH 2018).</p>
                <div className="form-grid-1">
                  <div className="form-group">
                    <label>URL deines Jameda-Profils</label>
                    <input type="text" value={b5Url} onChange={e => setB5Url(e.target.value)} placeholder="z. B. https://www.jameda.de/..." />
                  </div>
                  <div className="form-group">
                    <label>Name des Rezensenten (falls spezifische Bewertung)</label>
                    <input type="text" value={b5Name} onChange={e => setB5Name(e.target.value)} placeholder="z. B. 'Anonym' oder Name" />
                  </div>
                  <div className="form-group">
                    <label>Sachverhalt / Unwahrheiten</label>
                    <textarea rows={3} value={b5Details} onChange={e => setB5Details(e.target.value)} placeholder="z. B. Patient behauptet, ich hätte eine Falschbehandlung vorgenommen. Dieser Patient war nie in meiner Praxis registriert."></textarea>
                  </div>
                  <div className="form-group">
                    <label>Tonalität</label>
                    <select value={b5Tone} onChange={e => setB5Tone(e.target.value)}>
                      <option value="friendly">Sachlich (Standard)</option>
                      <option value="firm">Bestimmt (BGH-Urteil zitiert)</option>
                      <option value="lawyer">Sehr streng (Anwalts-Drohung)</option>
                    </select>
                  </div>
                  <button className="btn btn-primary" onClick={() => handlePrint('b5-preview')}>📄 PDF generieren / Drucken</button>
                </div>
              </div>

              {/* Brief Vorschau */}
              <div className="card">
                <h3>Brief-Vorschau</h3>
                <div id="b5-preview" className="letter-preview" style={{ padding: '30px', background: 'white', color: 'black', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '13px', lineHeight: '1.5' }}>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666' }}>
                    <div>DIGITAL-SCHUTZSCHILD · Jameda Rüge</div>
                    <div>Generiert {new Date().toLocaleDateString('de-DE')}</div>
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <strong>{userName || '[Dein Name]'}</strong><br/>
                    {userAddr ? nl2br(userAddr) : '[Deine Anschrift]'}
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                    An:<br/>
                    <strong>Jameda GmbH</strong><br/>
                    Balcke-Dürr-Allee 2<br/>
                    40882 Ratingen
                  </div>
                  <div style={{ textAlign: 'right', marginBottom: '20px' }}>Datum: {new Date().toLocaleDateString('de-DE')}</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>Rüge einer unzulässigen Bewertung auf Jameda</div>
                  
                  <p>Sehr geehrte Damen und Herren,</p>
                  <p>hiermit rüge ich die auf Ihrem Portal veröffentlichte Bewertung des Rezensenten <strong>"{b5Name || 'Anonym'}"</strong> auf meinem Profil.</p>
                  <p>URL des Arztprofils: <strong>{b5Url || '[URL]'}</strong></p>
                  
                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>Begründung</h4>
                  <p>Der geschilderte Vorfall entspricht nicht der Wahrheit. Ein Behandlungsverhältnis mit dem Verfasser der Bewertung hat zu keinem Zeitpunkt bestanden.</p>
                  <p>{b5Details || '[Details]'}</p>

                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>Rechtlicher Hintergrund</h4>
                  <p>Nach dem wegweisenden BGH-Urteil (Az. I ZR 109/17) haben Ärzte das Recht, Profile auf Bewertungssystemen entfernen zu lassen, wenn die Plattform ihre Neutralitätsrolle verletzt. Zudem sind Sie verpflichtet, die Identität und das Behandlungsverhältnis des Bewerters im Rügeverfahren streng zu prüfen.</p>
                  <p>Ich fordere Sie auf, die Bewertung innerhalb von <strong>{getToneObj(b5Tone).frist}</strong> zu löschen.</p>

                  <div dangerouslySetInnerHTML={{ __html: getToneObj(b5Tone).eskal }}></div>
                  <p style={{ marginTop: '20px' }}>Mit freundlichen Grüßen,</p>
                  <p style={{ marginTop: '40px' }}>___________________________<br/>{userName || '[Dein Name]'}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 9. BEWERTUNGEN: EBAY / AMAZON */}
        {activeView === 'bew_ebay' && (
          <section className="view active">
            <div className="grid-2">
              <div className="card">
                <h3>eBay/Amazon Bewertung anfechten</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Schütze deine Händler-Reputation vor Erpressungen, Beleidigungen oder unberechtigten Negativ-Bewertungen.</p>
                <div className="form-grid-1">
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Plattform</label>
                      <select value={b6Plattform} onChange={e => setB6Plattform(e.target.value)}>
                        <option value="ebay">eBay</option>
                        <option value="amazon">Amazon</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Artikelnummer / ASIN</label>
                      <input type="text" value={b6Item} onChange={e => setB6Item(e.target.value)} placeholder="z. B. Item-ID: 1294819" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Käufername / Transaktions-ID</label>
                    <input type="text" value={b6Name} onChange={e => setB6Name(e.target.value)} placeholder="z. B. 'buyer_99' / Transaktion: TX-900" />
                  </div>
                  <div className="form-group">
                    <label>Verstoß-Details</label>
                    <textarea rows={3} value={b6Details} onChange={e => setB6Details(e.target.value)} placeholder="z. B. Der Käufer hat mich negativ bewertet, weil ich mich geweigert habe, ihm nachträglich 50% Rabatt zu erstatten. Das ist Erpressung."></textarea>
                  </div>
                  <div className="form-group">
                    <label>Tonalität</label>
                    <select value={b6Tone} onChange={e => setB6Tone(e.target.value)}>
                      <option value="friendly">Sachlich (Standard)</option>
                      <option value="firm">Bestimmt</option>
                      <option value="lawyer">Streng</option>
                    </select>
                  </div>
                  <button className="btn btn-primary" onClick={() => handlePrint('b6-preview')}>📄 PDF generieren / Drucken</button>
                </div>
              </div>

              {/* Brief Vorschau */}
              <div className="card">
                <h3>Brief-Vorschau</h3>
                <div id="b6-preview" className="letter-preview" style={{ padding: '30px', background: 'white', color: 'black', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '13px', lineHeight: '1.5' }}>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666' }}>
                    <div>DIGITAL-SCHUTZSCHILD · Händlerbewertung Rüge</div>
                    <div>Generiert {new Date().toLocaleDateString('de-DE')}</div>
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <strong>{userName || '[Dein Name]'}</strong><br/>
                    {userAddr ? nl2br(userAddr) : '[Deine Anschrift]'}
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                    An:<br/>
                    <strong>{b6Plattform === 'ebay' ? 'eBay GmbH' : 'Amazon Europe Core S.à r.l.'}</strong><br/>
                    {b6Plattform === 'ebay' ? 'Albert-Einstein-Ring 2-6\n14532 Kleinmachnow' : '38 avenue John F. Kennedy\nL-1855 Luxemburg'}
                  </div>
                  <div style={{ textAlign: 'right', marginBottom: '20px' }}>Datum: {new Date().toLocaleDateString('de-DE')}</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>Meldung einer unzulässigen Händlerbewertung ({b6Plattform === 'ebay' ? 'eBay' : 'Amazon'})</div>
                  
                  <p>Sehr geehrte Damen und Herren,</p>
                  <p>hiermit beanstande ich eine unberechtigte, geschäftsschädigende Bewertung durch den Käufer <strong>"{b6Name || '[Käufername]'}"</strong>.</p>
                  <p>Betroffener Artikel / Transaktion: <strong>{b6Item || '[Artikel-ID]'}</strong></p>
                  
                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>Begründung</h4>
                  <p>Der Käufer verstößt mit dieser Bewertung gegen Ihre Händler- und Community-Richtlinien. Die Bewertung beruht auf sachfremden Motiven oder unzulässigen Forderungen.</p>
                  <p>{b6Details || '[Details]'}</p>

                  <p>Ich fordere Sie auf, die Bewertung im Rahmen Ihres internen Prüfungsverfahrens unverzüglich, spätestens jedoch innerhalb von <strong>{getToneObj(b6Tone).frist}</strong> zu löschen.</p>

                  <div dangerouslySetInnerHTML={{ __html: getToneObj(b6Tone).eskal }}></div>
                  <p style={{ marginTop: '20px' }}>Mit freundlichen Grüßen,</p>
                  <p style={{ marginTop: '40px' }}>___________________________<br/>{userName || '[Dein Name]'}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 10. BEWERTUNGEN: TRUSTPILOT */}
        {activeView === 'bew_trustpilot' && (
          <section className="view active">
            <div className="grid-2">
              <div className="card">
                <h3>Trustpilot-Bewertung löschen</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Trustpilot reagiert empfindlich auf falsche Bewertungen ohne Kaufbeleg. Nutze dies aus, um unberechtigte Rufschädigung zu stoppen.</p>
                <div className="form-grid-1">
                  <div className="form-group">
                    <label>URL der Trustpilot-Seite / der Bewertung</label>
                    <input type="text" value={b7Url} onChange={e => setB7Url(e.target.value)} placeholder="z. B. https://de.trustpilot.com/review/..." />
                  </div>
                  <div className="form-group">
                    <label>Name des Rezensenten</label>
                    <input type="text" value={b7Name} onChange={e => setB7Name(e.target.value)} placeholder="z. B. 'Gast' oder Name" />
                  </div>
                  <div className="form-group">
                    <label>Begründung der Rüge</label>
                    <textarea rows={3} value={b7Details} onChange={e => setB7Details(e.target.value)} placeholder="z. B. Der Bewerter behauptet fälschlicherweise, wir würden Kundengelder veruntreuen. Dies ist strafbare Verleumdung."></textarea>
                  </div>
                  <div className="form-group">
                    <label>Tonalität</label>
                    <select value={b7Tone} onChange={e => setB7Tone(e.target.value)}>
                      <option value="friendly">Sachlich (Standard)</option>
                      <option value="firm">Bestimmt</option>
                      <option value="lawyer">Streng</option>
                    </select>
                  </div>
                  <button className="btn btn-primary" onClick={() => handlePrint('b7-preview')}>📄 PDF generieren / Drucken</button>
                </div>
              </div>

              {/* Brief Vorschau */}
              <div className="card">
                <h3>Brief-Vorschau</h3>
                <div id="b7-preview" className="letter-preview" style={{ padding: '30px', background: 'white', color: 'black', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '13px', lineHeight: '1.5' }}>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666' }}>
                    <div>DIGITAL-SCHUTZSCHILD · Trustpilot Rüge</div>
                    <div>Generiert {new Date().toLocaleDateString('de-DE')}</div>
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <strong>{userName || '[Dein Name]'}</strong><br/>
                    {userAddr ? nl2br(userAddr) : '[Deine Anschrift]'}
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                    An:<br/>
                    <strong>Trustpilot A/S</strong><br/>
                    Pilestræde 58, 5. Stock<br/>
                    1112 Kopenhagen, Dänemark
                  </div>
                  <div style={{ textAlign: 'right', marginBottom: '20px' }}>Datum: {new Date().toLocaleDateString('de-DE')}</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>Rüge wegen rechtswidriger Fake-Bewertung auf Trustpilot</div>
                  
                  <p>Sehr geehrte Damen und Herren,</p>
                  <p>hiermit rüge ich die auf Ihrem Portal veröffentlichte Bewertung des Rezensenten <strong>"{b7Name || '[Name Rezensent]'}"</strong>.</p>
                  <p>Link zur Bewertungsseite: <strong>{b7Url || '[URL]'}</strong></p>
                  
                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>Sachverhalt</h4>
                  <p>Der Bewerter war nie Kunde unseres Unternehmens und verstößt durch haltlose Schmähungen gegen Ihre Nutzungsbedingungen.</p>
                  <p>{b7Details || '[Details]'}</p>

                  <p>Ich fordere Sie auf, die Bewertung im Rahmen Ihrer Prüfpflichten unverzüglich, spätestens jedoch innerhalb von <strong>{getToneObj(b7Tone).frist}</strong> zu löschen.</p>

                  <div dangerouslySetInnerHTML={{ __html: getToneObj(b7Tone).eskal }}></div>
                  <p style={{ marginTop: '20px' }}>Mit freundlichen Grüßen,</p>
                  <p style={{ marginTop: '40px' }}>___________________________<br/>{userName || '[Dein Name]'}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 11. SOCIAL MEDIA SPERREN: GENERAL TEMPLATE */}
        {(activeView === 'sm_instagram' || activeView === 'sm_facebook' || activeView === 'sm_youtube' || activeView === 'sm_tiktok') && (
          <section className="view active">
            <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '11px', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px', display: 'block' }}>Social Media Sperren</span>
            <h2>Widerspruch gegen Account-Sperrung ({activeView === 'sm_instagram' ? 'Instagram' : activeView === 'sm_facebook' ? 'Facebook' : activeView === 'sm_youtube' ? 'YouTube' : 'TikTok'})</h2>
            <p className="lead">Fälschliche Accountsperren verstoßen gegen das vertragliche Willkürverbot. Zwinge die Plattform zur Freischaltung.</p>

            <div className="grid-2" style={{ marginTop: '32px' }}>
              <div className="card">
                <h3>Account-Daten eingeben</h3>
                <div className="form-grid-1">
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Benutzername / Handle</label>
                      <input type="text" value={smUsername} onChange={e => setSmUsername(e.target.value)} placeholder="z. B. @max_mustermann" />
                    </div>
                    <div className="form-group">
                      <label>Registrierte E-Mail Adresse</label>
                      <input type="email" value={smEmail} onChange={e => setSmEmail(e.target.value)} placeholder="z. B. max@mustermann.de" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Datum der Sperrung</label>
                    <input type="date" value={smDatum} onChange={e => setSmDatum(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Details / Begründung der Plattform (falls bekannt)</label>
                    <textarea rows={3} value={smDetails} onChange={e => setSmDetails(e.target.value)} placeholder="z. B. Es wird behauptet, ich hätte gegen die 'Gemeinschaftsrichtlinien' verstoßen. Konkrete Postings oder Beweise wurden mir nicht genannt."></textarea>
                  </div>
                  <div className="form-group">
                    <label>Tonalität des Schreibens</label>
                    <select value={smTone} onChange={e => setSmTone(e.target.value)}>
                      <option value="friendly">Sachlich (Standard)</option>
                      <option value="firm">Bestimmt (Vertragsbruch)</option>
                      <option value="lawyer">Sehr streng (Anwalts-Drohung / LfDI-Meldung)</option>
                    </select>
                  </div>
                  <button className="btn btn-primary" onClick={() => handlePrint('sm-preview')}>📄 PDF generieren / Drucken</button>
                </div>
              </div>

              {/* Brief Vorschau */}
              <div className="card">
                <h3>Brief-Vorschau</h3>
                <div id="sm-preview" className="letter-preview" style={{ padding: '30px', background: 'white', color: 'black', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '13px', lineHeight: '1.5' }}>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666' }}>
                    <div>DIGITAL-SCHUTZSCHILD · Widerspruch Accountsperre</div>
                    <div>Generiert {new Date().toLocaleDateString('de-DE')}</div>
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <strong>{userName || '[Dein Name]'}</strong><br/>
                    {userAddr ? nl2br(userAddr) : '[Deine Anschrift]'}
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                    An:<br/>
                    <strong>
                      {activeView === 'sm_tiktok' ? 'TikTok Technology Limited' : activeView === 'sm_youtube' ? 'Google Ireland Limited (YouTube)' : 'Meta Platforms Ireland Limited'}
                    </strong><br/>
                    {activeView === 'sm_tiktok' && '10 Earlsfort Terrace\nDublin, D02 T380, Irland'}
                    {activeView === 'sm_youtube' && 'Gordon House, Barrow Street\nDublin 4, Irland'}
                    {(activeView === 'sm_instagram' || activeView === 'sm_facebook') && '4 Grand Canal Square, Grand Canal Harbour\nDublin 2, Irland'}
                  </div>
                  <div style={{ textAlign: 'right', marginBottom: '20px' }}>Datum: {new Date().toLocaleDateString('de-DE')}</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>
                    Formeller Widerspruch gegen die Sperrung des Accounts "{smUsername || '[Benutzername]'}"
                  </div>
                  
                  <p>Sehr geehrte Damen und Herren,</p>
                  <p>hiermit lege ich formell Widerspruch gegen die am <strong>{formatDateStr(smDatum)}</strong> vorgenommene Sperrung meines Nutzerkontos ein.</p>
                  
                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>Account-Informationen:</h4>
                  <p>
                    • Plattform:{' '}
                    {activeView === 'sm_instagram' ? 'Instagram' : activeView === 'sm_facebook' ? 'Facebook' : activeView === 'sm_youtube' ? 'YouTube' : 'TikTok'}<br/>
                    • Benutzername: <strong>{smUsername || '[Name]'}</strong><br/>
                    • E-Mail: <strong>{smEmail || '[E-Mail]'}</strong>
                  </p>
                  
                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>Begründung</h4>
                  <p>Die Sperrung erfolgte ohne Angabe eines konkreten Verstoßes oder Beweisen. Ich habe mich zu jedem Zeitpunkt an die geltenden Gesetze und die Nutzungsbedingungen Ihrer Plattform gehalten. Eine willkürliche Sperrung stellt einen eklatanten Verstoß gegen das Plattform-Vertragsrecht dar.</p>
                  <p>{smDetails || '[Details]'}</p>

                  <p>Ich fordere Sie auf, den Account unverzüglich, spätestens jedoch innerhalb von <strong>{getToneObj(smTone).frist}</strong> wieder vollständig freizugeben.</p>

                  <div dangerouslySetInnerHTML={{ __html: getToneObj(smTone).eskal }}></div>
                  <p style={{ marginTop: '20px' }}>Mit freundlichen Grüßen,</p>
                  <p style={{ marginTop: '40px' }}>___________________________<br/>{userName || '[Dein Name]'}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 12. URHEBERRECHT: ERSTE HILFE */}
        {activeView === 'urh_abmahnung' && (
          <section className="view active">
            <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '11px', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px', display: 'block' }}>Erste-Hilfe</span>
            <h2>Abmahnung erhalten: Sofort-Checkliste</h2>
            <p className="lead">Ruhe bewahren. Eine Abmahnung ist kein Gerichtsurteil. Befolge diese 4 goldenen Regeln, um Tausende Euro zu sparen.</p>

            <div className="grid-2" style={{ marginTop: '32px' }}>
              <div className="card" style={{ borderLeft: '4px solid var(--accent-red)' }}>
                <h3 style={{ color: 'var(--accent-red)' }}>🛑 Die 3 größten Fehler — Sofort stoppen!</h3>
                <ol style={{ marginLeft: '20px', lineHeight: '1.8', marginTop: '12px' }}>
                  <li><strong>Niemals die vorformulierte Unterlassungserklärung unterschreiben!</strong> Diese enthält fast immer ein Schuldanerkenntnis und überhöhte, lebenslange Vertragsstrafen (meist 5.000 €+ pro Verstoß).</li>
                  <li><strong>Niemals direkt bei der gegnerischen Kanzlei anrufen!</strong> Jedes Wort am Telefon kann als Geständnis gewertet werden. Die Gegenseite schneidet Gespräche mit oder verfasst Aktenvermerke gegen dich.</li>
                  <li><strong>Fristen auf keinen Fall verstreichen lassen!</strong> Bei Verpassen einer Frist droht sofort eine einstweilige Verfügung vor Gericht. Das treibt die Kosten in astronomische Höhen.</li>
                </ol>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                <h3 style={{ color: '#10b981' }}>✅ Das richtige Vorgehen</h3>
                <ol style={{ marginLeft: '20px', lineHeight: '1.8', marginTop: '12px' }}>
                  <li><strong>Fristen prüfen:</strong> Notiere das Fristende im <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '12px' }} onClick={() => setActiveView('frist_tracker')}>Frist-Tracker</button>.</li>
                  <li><strong>Kosten prüfen:</strong> Berechne die echten Anwaltsgebühren nach RVG mit unserem <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '12px' }} onClick={() => setActiveView('rechner')}>Kalkulator</button>.</li>
                  <li><strong>Modifizierte Unterlassungserklärung abgeben:</strong> Wenn der Verstoß berechtigt war, gib eine *modifizierte* Erklärung ab. Damit räumst du die Wiederholungsgefahr aus, verweigerst aber die überzogenen Geldforderungen.</li>
                </ol>
              </div>
            </div>

            <div className="card" style={{ marginTop: '32px' }}>
              <h3>Welches Dokument brauchst du jetzt?</h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>Wähle das passende Tool basierend auf deinem Fall:</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn btn-primary" onClick={() => setActiveView('urh_unterlassung')}>
                  ✍️ "Die Abmahnung ist berechtigt" ➔ Modifizierte Unterlassung
                </button>
                <button className="btn btn-secondary" onClick={() => setActiveView('urh_counter')}>
                  🛡️ "Die Abmahnung ist falsch" ➔ Gegenabmahnung erstellen
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 13. URHEBERRECHT: MOD. UNTERLASSUNG */}
        {activeView === 'urh_unterlassung' && (
          <section className="view active">
            <div className="grid-2">
              <div className="card">
                <h3>Modifizierte Unterlassungserklärung erstellen</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Beseitige die Wiederholungsgefahr ohne Schuldanerkenntnis und ohne Akzeptanz der gegnerischen Geldforderung (Börgerliches Gesetzbuch § 315 / "Hamburger Brauch").</p>
                <div className="form-grid-1">
                  <div className="form-group">
                    <label>Name des Abmahners (Rechteinhaber)</label>
                    <input type="text" value={b12Abmahner} onChange={e => setB12Abmahner(e.target.value)} placeholder="z. B. Sony Music Entertainment Germany GmbH" />
                  </div>
                  <div className="form-group">
                    <label>Gegnerische Kanzlei</label>
                    <input type="text" value={b12Kanzlei} onChange={e => setB12Kanzlei(e.target.value)} placeholder="z. B. Frommer Legal Rechtsanwälte" />
                  </div>
                  <div className="form-group">
                    <label>Anschrift der gegnerischen Kanzlei</label>
                    <textarea rows={2} value={b12KanzleiAdr} onChange={e => setB12KanzleiAdr(e.target.value)} placeholder="Musterstraße 5&#10;80331 München" style={{ resize: 'none' }}></textarea>
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Bezeichnung des Werks (z.B. Songtitel, Bild)</label>
                      <input type="text" value={b12Werk} onChange={e => setB12Werk(e.target.value)} placeholder="z. B. Film 'Musterfilm' / Bild 'Strand'" />
                    </div>
                    <div className="form-group">
                      <label>Datum der Abmahnung</label>
                      <input type="date" value={b12Datum} onChange={e => setB12Datum(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Aktenzeichen der Kanzlei</label>
                      <input type="text" value={b12Aktenzeichen} onChange={e => setB12Aktenzeichen(e.target.value)} placeholder="z. B. AZ-90928/26" />
                    </div>
                    <div className="form-group">
                      <label>Gesetzte Frist</label>
                      <input type="date" value={b12Frist} onChange={e => setB12Frist(e.target.value)} />
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={() => handlePrint('b12-preview')}>📄 PDF generieren / Drucken</button>
                </div>
              </div>

              {/* Brief Vorschau */}
              <div className="card">
                <h3>Brief-Vorschau</h3>
                <div id="b12-preview" className="letter-preview" style={{ padding: '30px', background: 'white', color: 'black', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '13px', lineHeight: '1.5' }}>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666' }}>
                    <div>DIGITAL-SCHUTZSCHILD · Modifizierte Unterlassungserklärung</div>
                    <div>Generiert {new Date().toLocaleDateString('de-DE')}</div>
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <strong>{userName || '[Dein Name]'}</strong><br/>
                    {userAddr ? nl2br(userAddr) : '[Deine Anschrift]'}
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                    An:<br/>
                    <strong>{b12Kanzlei || '[Kanzlei]'}</strong><br/>
                    {b12KanzleiAdr ? nl2br(b12KanzleiAdr) : '[Anschrift Kanzlei]'}<br/>
                    {b12Abmahner && `als Bevollmächtigte für ${b12Abmahner}`}
                  </div>
                  <div style={{ textAlign: 'right', marginBottom: '20px' }}>Datum: {new Date().toLocaleDateString('de-DE')}</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
                    Ihr Schreiben vom {formatDateStr(b12Datum)} / Aktenzeichen: {b12Aktenzeichen || '[Aktenzeichen]'}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>
                    Unterlassungsverpflichtungserklärung (Modifiziert nach Hamburger Brauch)
                  </div>
                  
                  <p>Ohne Anerkennung einer rechtlichen Pflicht, jedoch rechtsverbindlich, verpflichtet sich der Unterzeichnende gegenüber der Firma <strong>{b12Abmahner || '[Gläubiger]'}</strong>:</p>
                  
                  <p style={{ padding: '12px', background: '#f9f9f9', borderLeft: '3px solid #8b5cf6', margin: '14px 0' }}>
                    es bei Meidung einer für jeden Fall der schuldhaften Zuwiderhandlung vom Gläubiger festzusetzenden, im Streitfall vom zuständigen Gericht auf ihre Angemessenheit hin zu überprüfenden Vertragsstrafe (gemäß Hamburger Brauch) zu unterlassen,<br/>
                    das urheberrechtlich geschützte Werk <strong>"{b12Werk || '[Werk]'}"</strong> ohne vorherige Zustimmung des Gläubigers im Internet öffentlich zugänglich zu machen (z. B. Filesharing).
                  </p>
                  
                  <p><strong>Wichtiger Hinweis zur Klarstellung:</strong> Diese Erklärung dient ausschließlich der Abwendung eines einstweiligen Verfügungsverfahrens. Die Zahlung von Schadensersatz oder vorprozessualen Anwaltsgebühren wird hiermit ausdrücklich zurückgewiesen und bleibt gesonderter Verhandlung vorbehalten.</p>

                  <p style={{ marginTop: '40px' }}>___________________________<br/>{userName || '[Dein Name]'}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 14. URHEBERRECHT: GEGENABMAHNUNG */}
        {activeView === 'urh_counter' && (
          <section className="view active">
            <div className="grid-2">
              <div className="card">
                <h3>Gegenabmahnung erstellen</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>War die Abmahnung ungerechtfertigt (z. B. du besitzt die Rechte oder falsche IP-Adresse), fordere Schadensersatz für deine Aufwände zurück.</p>
                <div className="form-grid-1">
                  <div className="form-group">
                    <label>Name des gegnerischen Abmahners / Kanzlei</label>
                    <input type="text" value={b13Gegner} onChange={e => setB13Gegner(e.target.value)} placeholder="z. B. Frommer Legal Rechtsanwälte" />
                  </div>
                  <div className="form-group">
                    <label>Anschrift des Gegners</label>
                    <textarea rows={2} value={b13GegnerAdr} onChange={e => setB13GegnerAdr(e.target.value)} placeholder="Musterstraße 5&#10;80331 München" style={{ resize: 'none' }}></textarea>
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Bezeichnung des vorgeworfenen Werks</label>
                      <input type="text" value={b13Werk} onChange={e => setB13Werk(e.target.value)} placeholder="z. B. Foto 'Strand' auf Website" />
                    </div>
                    <div className="form-group">
                      <label>Datum ihrer Abmahnung</label>
                      <input type="date" value={b13Datum} onChange={e => setB13Datum(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Eigene Aufwandsentschädigung (€)</label>
                    <input type="number" value={b13Kosten} onChange={e => setB13Kosten(e.target.value)} placeholder="z. B. 300" />
                  </div>
                  <button className="btn btn-primary" onClick={() => handlePrint('b13-preview')}>📄 PDF generieren / Drucken</button>
                </div>
              </div>

              {/* Brief Vorschau */}
              <div className="card">
                <h3>Brief-Vorschau</h3>
                <div id="b13-preview" className="letter-preview" style={{ padding: '30px', background: 'white', color: 'black', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '13px', lineHeight: '1.5' }}>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666' }}>
                    <div>DIGITAL-SCHUTZSCHILD · Gegenabmahnung</div>
                    <div>Generiert {new Date().toLocaleDateString('de-DE')}</div>
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <strong>{userName || '[Dein Name]'}</strong><br/>
                    {userAddr ? nl2br(userAddr) : '[Deine Anschrift]'}
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                    An:<br/>
                    <strong>{b13Gegner || '[Gegner]'}</strong><br/>
                    {b13GegnerAdr ? nl2br(b13GegnerAdr) : '[Anschrift Gegner]'}
                  </div>
                  <div style={{ textAlign: 'right', marginBottom: '20px' }}>Datum: {new Date().toLocaleDateString('de-DE')}</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>Gegenabmahnung wegen unberechtigter Urheberrechts-Abmahnung</div>
                  
                  <p>Sehr geehrte Damen und Herren,</p>
                  <p>ich nehme Bezug auf Ihr Schreiben vom <strong>{formatDateStr(b13Datum)}</strong>, mit dem Sie mich wegen angeblicher Urheberrechtsverletzungen an dem Werk <strong>"{b13Werk || '[Werk]'}"</strong> abgemahnt haben.</p>
                  <p>Diese Abmahnung weise ich vollumfänglich und entschieden zurück. Der Vorwurf ist sachlich und rechtlich völlig unbegründet. Ich bin rechtmäßiger Inhaber der Nutzungsrechte (bzw. die vorgeworfene IP-Adresse ist nachweislich fehlerhaft zugeordnet).</p>
                  <p>Eine unberechtigte Abmahnung stellt einen unzulässigen Eingriff in den eingerichteten und ausgeübten Gewerbebetrieb dar und begründet eine Schadensersatzpflicht für die mir entstandenen Aufwände zur Rechtsverteidigung.</p>
                  <p>Ich fordere Sie hiermit auf, mir die entstandenen Aufwendungen in Höhe von <strong>{b13Kosten || '300'} Euro</strong> auf mein bekanntes Konto zu erstatten.</p>
                  
                  <p style={{ marginTop: '20px' }}>Mit freundlichen Grüßen,</p>
                  <p style={{ marginTop: '40px' }}>___________________________<br/>{userName || '[Dein Name]'}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 15. URHEBERRECHT: DMCA NOTICE */}
        {activeView === 'urh_dmca' && (
          <section className="view active">
            <div className="grid-2">
              <div className="card">
                <h3>DMCA Copyright Notice einreichen</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Hat jemand dein Bild, Video oder Text unberechtigt auf einer Plattform (YouTube, Facebook, Hoster) hochgeladen, zwinge den Hoster per DMCA zur Löschung.</p>
                <div className="form-grid-1">
                  <div className="form-group">
                    <label>Empfängerplattform (Preset)</label>
                    <select onChange={e => applyFirmaPreset('b14', e.target.value)}>
                      <option value="">-- Preset wählen --</option>
                      <option value="google">Google LLC (Search/Drive)</option>
                      <option value="meta">Meta Platforms (Facebook/Instagram)</option>
                      <option value="tiktok">TikTok Technology</option>
                      <option value="youtube">YouTube LLC</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Name des Plattform-Betreibers</label>
                    <input type="text" value={b14Plattform} onChange={e => setB14Plattform(e.target.value)} placeholder="z. B. Google LLC" />
                  </div>
                  <div className="form-group">
                    <label>Anschrift</label>
                    <textarea rows={2} value={b14PlattformAdr} onChange={e => setB14PlattformAdr(e.target.value)} placeholder="Anschrift eintragen..." style={{ resize: 'none' }}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Bezeichnung deines Original-Werks</label>
                    <input type="text" value={b14Werk} onChange={e => setB14Werk(e.target.value)} placeholder="z. B. Mein geschriebener Blogbeitrag 'Reise nach Italien'" />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>URL zu deinem Original</label>
                      <input type="url" value={b14UrlOriginal} onChange={e => setB14UrlOriginal(e.target.value)} placeholder="https://meine-website.de/..." />
                    </div>
                    <div className="form-group">
                      <label>URL der Raubkopie auf der Plattform</label>
                      <input type="url" value={b14UrlKopie} onChange={e => setB14UrlKopie(e.target.value)} placeholder="https://plattform.com/post/..." />
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={() => handlePrint('b14-preview')}>📄 PDF generieren / Drucken</button>
                </div>
              </div>

              {/* Brief Vorschau */}
              <div className="card">
                <h3>Brief-Vorschau</h3>
                <div id="b14-preview" className="letter-preview" style={{ padding: '30px', background: 'white', color: 'black', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '13px', lineHeight: '1.5' }}>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666' }}>
                    <div>DIGITAL-SCHUTZSCHILD · DMCA Take-Down Notice</div>
                    <div>Generiert {new Date().toLocaleDateString('en-US')}</div>
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <strong>{userName || '[Dein Name]'}</strong><br/>
                    {userAddr ? nl2br(userAddr) : '[Deine Anschrift]'}
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                    To:<br/>
                    <strong>{b14Plattform || '[Plattform]'}</strong><br/>
                    {b14PlattformAdr ? nl2br(b14PlattformAdr) : '[Anschrift Plattform]'}
                  </div>
                  <div style={{ textAlign: 'right', marginBottom: '20px' }}>Date: {new Date().toLocaleDateString('en-US')}</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>DMCA Copyright Infringement Notification</div>
                  
                  <p>Dear Copyright Agent,</p>
                  <p>I am writing to notify you of a copyright infringement occurring on your online platform. I am the exclusive owner of the copyrighted work described below.</p>
                  
                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>1. The Copyrighted Work:</h4>
                  <p>Title/Description: <strong>{b14Werk || '[Original-Werk]'}</strong><br/>
                  Original URL: <strong>{b14UrlOriginal || '[Original URL]'}</strong></p>

                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>2. The Infringing Material:</h4>
                  <p>The unauthorized copy is accessible at the following URL: <strong>{b14UrlKopie || '[Kopie URL]'}</strong></p>

                  <h4 style={{ margin: '14px 0 6px 0', fontSize: '13px' }}>3. Statements & Declarations:</h4>
                  <p>• I have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</p>
                  <p>• The information in this notification is accurate, and under penalty of perjury, I am the owner of the exclusive right that is allegedly infringed.</p>
                  
                  <p>Please remove or disable access to the infringing material immediately as required by the Digital Millennium Copyright Act (17 U.S.C. § 512).</p>
                  
                  <p style={{ marginTop: '20px' }}>Sincerely,</p>
                  <p style={{ marginTop: '40px' }}>___________________________<br/>{userName || '[Dein Name]'}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 16. FAQ VIEW */}
        {activeView === 'faq' && (
          <section className="view active">
            <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '11px', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px', display: 'block' }}>Rechtswissen</span>
            <h2>Digitales Recht: FAQ & Grundlagen</h2>
            <p className="lead">Hier findest du die wichtigsten BGH-Urteile, Fristenregeln und gesetzlichen Grundlagen im Überblick.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
              <div className="card">
                <h4>🔒 Wie viel Zeit hat ein Unternehmen für eine DSGVO-Auskunft?</h4>
                <p style={{ fontSize: '14px', color: 'var(--muted)', margin: '8px 0 0 0' }}>
                  Gemäß **Art. 12 Abs. 3 DSGVO** muss die Auskunft unverzüglich, spätestens jedoch **innerhalb eines Monats** erfolgen. In begründeten Einzelfällen kann die Frist um weitere zwei Monate verlängert werden – das Unternehmen muss dich darüber aber zwingend im ersten Monat schriftlich benachrichtigen. Reagiert die Firma nicht, kannst du sofort über unseren Generator Beschwerde beim Landesdatenschutzbeauftragten (LfDI) einlegen.
                </p>
              </div>

              <div className="card">
                <h4>⭐ Wann muss Google eine negative Bewertung löschen?</h4>
                <p style={{ fontSize: '14px', color: 'var(--muted)', margin: '8px 0 0 0' }}>
                  Google haftet als Host-Provider erst, sobald die Plattform Kenntnis von einer konkreten Rechtsverletzung erlangt. 
                  Sobald eine substanziierte Rüge per Mail/Brief eingeht (z.B. *"Dieser Nutzer war nie Kunde"* oder *"Die Tatsachenbehauptung ist unwahr"*), ist Google verpflichtet, den Verfasser anzuschreiben. Reagiert dieser nicht innerhalb einer Frist (meist 7-14 Tage) oder kann er die Behauptung/Kundenbeziehung nicht nachweisen, **muss** Google den Eintrag entfernen (BGH-Grundsatzurteil VI ZR 34/15).
                </p>
              </div>

              <div className="card">
                <h4>⚖️ Was bringt eine modifizierte Unterlassungserklärung?</h4>
                <p style={{ fontSize: '14px', color: 'var(--muted)', margin: '8px 0 0 0' }}>
                  Wer eine Abmahnung (z.B. wegen Filesharing) erhält und diese berechtigt ist, sollte **niemals** das vom Gegner vorformulierte Schreiben unterschreiben. Dieses enthält oft feste, exorbitante Vertragsstrafen (z.B. 5.001 €) und ein verstecktes Schuldanerkenntnis. 
                  Eine *modifizierte* Unterlassungserklärung räumt die Wiederholungsgefahr aus, legt die Vertragsstrafe aber nach dem flexiblen "Hamburger Brauch" fest. Dadurch bestimmt im Streitfall ein neutrales Gericht eine angemessene Strafe. Die Geldforderung (Schadensersatz, Anwaltskosten) wird damit ausdrücklich ausgeklammert und separat verhandelt.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 17. EINSTELLUNGEN / PROFILE VIEW */}
        {activeView === 'einstellungen' && (
          <section className="view active">
            <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '11px', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px', display: 'block' }}>Konfiguration</span>
            <h2>Lokales Absender-Profil</h2>
            <p className="lead">Verwalte deine Adressdaten und importiere/exportiere Backups deiner Fristen und Statistiken.</p>

            <div className="grid-2" style={{ marginTop: '32px' }}>
              <div className="card">
                <h3>Absender-Adresse konfigurieren</h3>
                <form onSubmit={handleSaveProfile} className="form-grid-1">
                  <div className="form-group">
                    <label>Dein vollständiger Name</label>
                    <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="z. B. Max Mustermann" />
                  </div>
                  <div className="form-group">
                    <label>Deine Anschrift (Straße, Hausnr, PLZ, Ort)</label>
                    <textarea rows={4} value={userAddr} onChange={e => setUserAddr(e.target.value)} placeholder="Musterstraße 1&#10;12345 Musterstadt" style={{ resize: 'none' }}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Profil speichern</button>
                </form>
              </div>

              <div className="card">
                <h3>Backup & Datenverwaltung</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>
                  Die Vorlagenbude arbeitet zu 100% offline. Deine Daten liegen verschlüsselt im Local Storage deines Browsers. Verwende diese Buttons, um Sicherheitskopien anzulegen.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => {
                    const blob = new Blob([JSON.stringify({ fristen, counters: { briefe: statBriefe }, profile: { name: userName, addr: userAddr } }, null, 2)], { type: 'application/json' });
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = `digital-schutzschild-backup-${new Date().toISOString().split('T')[0]}.json`;
                    a.click();
                  }}>
                    📥 Backup exportieren (JSON)
                  </button>
                  <button className="btn btn-secondary" style={{ width: '100%', color: 'var(--accent-red)' }} onClick={() => {
                    if (window.confirm('Möchtest du wirklich alle Fristen und Zähler zurücksetzen? Dieser Schritt kann nicht rückgängig gemacht werden.')) {
                      setFristen([]);
                      setStatBriefe(0);
                      setUserName('');
                      setUserAddr('');
                      localStorage.removeItem('vb_schuetzschild_v1');
                      alert('Lokale Daten erfolgreich gelöscht.');
                    }
                  }}>
                    🚨 Alle lokalen Daten löschen
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
