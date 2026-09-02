"use client";
import { supabase } from "@/lib/supabaseClient";

import { useEffect, useRef, useState } from 'react';
import './schutzschild.css';

export default function DigitalSchutzschildNative() {

  const [isPro, setIsPro] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsPro(session.user.app_metadata?.is_pro === true);
      }
      setLoadingUser(false);
    };
    checkUser();
  }, []);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    import('./logic.js').then((module) => {
      module.initDigitalSchutzschild();
    });

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div 
      className="ds-wrapper" 
      style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 100, backgroundColor: 'var(--bg)', overflow: 'hidden' }}
      dangerouslySetInnerHTML={{ __html: `

<div class="app-shell">
      {!loadingUser && !isPro && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(3, 7, 18, 0.8)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ background: '#1d2f47', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '60px 40px', maxWidth: '600px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', backdropFilter: 'blur(16px)' }}>
            <div style={{ fontSize: '64px', margin: '0 auto 20px' }}>🔒</div>
            <h2 style={{ marginBottom: '20px', color: 'white', fontFamily: 'Inter, sans-serif' }}>Premium-Werkzeug gesperrt</h2>
            <p style={{ color: '#a8b3c2', fontSize: '18px', marginBottom: '40px' }}>Dieses Werkzeug ist aktuell gesperrt. Schalte jetzt den vollen Funktionsumfang frei.</p>
            <a href="/meine-apps" style={{ display: 'inline-block', width: '100%', padding: '20px', fontSize: '18px', background: '#c65d32', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
              ZURÜCK ZUM COCKPIT
            </a>
          </div>
        </div>
      )}

  <!-- ============ SIDEBAR ============ -->
  <aside class="panel">
    <div class="brand">
      <div class="brand-mark">🛡️</div>
      <div>
        <div class="brand-name"><span data-i18n="brandName">DIGITAL</span><br><span data-i18n="brandNameAccent">SCHUTZSCHILD</span></div>
        <div class="brand-stat" data-i18n="brandTag">DSGVO · Bewertungen · Social Media · Urheberrecht</div>
        <button class="lang-toggle" id="lang-btn" onclick="toggleLang()" style="margin-top:6px;background:transparent;border:1px solid var(--border);color:var(--text-main);padding:3px 8px;border-radius:6px;cursor:pointer;font-size:.7rem;font-weight:700">🌐 DE</button>
      </div>
    </div>

    <div class="panel-body">
      <div class="navcat" data-i18n="navCatStart">Start</div>
      <button class="navbtn active" data-view="dashboard"><span class="navicon">⌂</span> <span data-i18n="navDashboard">Dashboard</span></button>

      <div class="navcat">🔒 <span data-i18n="navCatDsgvo">DSGVO</span> <span class="stage s1">S1</span></div>
      <button class="navbtn" data-view="dsgvo_auskunft"><span class="navicon">📋</span> <span data-i18n="navDsgvoAuskunft">Auskunfts-Antrag</span></button>
      <button class="navbtn" data-view="dsgvo_loeschung"><span class="navicon">🗑️</span> <span data-i18n="navDsgvoLoeschung">Löschungs-Antrag</span></button>
      <button class="navbtn" data-view="dsgvo_beschwerde"><span class="navicon">⚖️</span> <span data-i18n="navDsgvoBeschwerde">LfDI-Beschwerde</span></button>
      <button class="navbtn" data-view="dsgvo_schaden"><span class="navicon">💸</span> <span data-i18n="navDsgvoSchaden">Schadensersatz Art. 82</span></button>

      <div class="navcat">💰 <span data-i18n="navCatSchufa">Schufa & Bonität</span> <span class="stage s1">S1</span></div>
      <button class="navbtn" data-view="schufa_auskunft"><span class="navicon">📈</span> <span data-i18n="navSchufaAuskunft">Gratis-Auskunft Art. 15</span></button>
      <button class="navbtn" data-view="schufa_loeschung"><span class="navicon">🗑️</span> <span data-i18n="navSchufaLoeschung">Schufa-Löschung</span></button>

      <div class="navcat">⭐ <span data-i18n="navCatBewertungen">Bewertungen</span> <span class="stage s2">S2</span></div>
      <button class="navbtn" data-view="bew_google"><span class="navicon">🔍</span> <span data-i18n="navBewGoogle">Google-Bewertung</span></button>
      <button class="navbtn" data-view="bew_jameda"><span class="navicon">🩺</span> <span data-i18n="navBewJameda">Jameda</span></button>
      <button class="navbtn" data-view="bew_ebay"><span class="navicon">🛒</span> <span data-i18n="navBewEbay">eBay / Amazon</span></button>
      <button class="navbtn" data-view="bew_trustpilot"><span class="navicon">⭐</span> <span data-i18n="navBewTrustpilot">Trustpilot</span></button>

      <div class="navcat">📱 <span data-i18n="navCatSocial">Social Media</span> <span class="stage s3">S3</span></div>
      <button class="navbtn" data-view="sm_instagram"><span class="navicon">📷</span> <span data-i18n="navSmInstagram">Instagram</span></button>
      <button class="navbtn" data-view="sm_facebook"><span class="navicon">📘</span> <span data-i18n="navSmFacebook">Facebook</span></button>
      <button class="navbtn" data-view="sm_youtube"><span class="navicon">▶️</span> <span data-i18n="navSmYoutube">YouTube</span></button>
      <button class="navbtn" data-view="sm_tiktok"><span class="navicon">🎵</span> <span data-i18n="navSmTiktok">TikTok</span></button>

      <div class="navcat">⚖️ <span data-i18n="navCatUrheber">Urheberrecht</span> <span class="stage s4">S4</span></div>
      <button class="navbtn" data-view="urh_abmahnung"><span class="navicon">📨</span> <span data-i18n="navUrhAbmahnung">Abmahnung erhalten</span></button>
      <button class="navbtn" data-view="urh_unterlassung"><span class="navicon">✍️</span> <span data-i18n="navUrhUnterlassung">Modifizierte Unterlassung</span></button>
      <button class="navbtn" data-view="urh_counter"><span class="navicon">🛡️</span> <span data-i18n="navUrhCounter">Counter-Abmahnung</span></button>
      <button class="navbtn" data-view="urh_dmca"><span class="navicon">🌐</span> <span data-i18n="navUrhDmca">DMCA-Notice</span></button>

      <div class="navcat">🤖 <span data-i18n="navCatKi">KI & Web</span></div>
      <button class="navbtn" data-view="ki_optout"><span class="navicon">🤖</span> <span data-i18n="navKiOptout">KI-Opt-Out + robots.txt</span></button>

      <div class="navcat">🌐 <span data-i18n="navCatVertraege">Verträge</span></div>
      <button class="navbtn" data-view="wlan_haftung"><span class="navicon">📡</span> <span data-i18n="navWlanHaftung">WLAN-Haftungsausschluss</span></button>

      <div class="navcat">🔐 <span data-i18n="navCatSecurity">Security-Tools</span></div>
      <button class="navbtn" data-view="security_password"><span class="navicon">🔑</span> <span data-i18n="navSecurityPassword">Passwort-Generator</span></button>
      <button class="navbtn" data-view="security_tfa"><span class="navicon">🛡️</span> <span data-i18n="navSecurityTfa">2FA-Checkliste</span></button>

      <div class="navcat" data-i18n="navCatTools">Tools</div>
      <button class="navbtn" data-view="rechner"><span class="navicon">🧮</span> <span data-i18n="navRechner">3 Rechner</span></button>
      <button class="navbtn" data-view="frist_tracker"><span class="navicon">⏰</span> <span data-i18n="navFristTracker">Frist-Tracker</span></button>

      <div class="navcat" data-i18n="navCatSystem">System</div>
      <button class="navbtn" data-view="archive"><span class="navicon">🗄️</span> <span data-i18n="navArchive">Archiv</span></button>
      <button class="navbtn" data-view="faq"><span class="navicon">❓</span> <span data-i18n="navFaq">FAQ</span></button>
      <button class="navbtn" data-view="einstellungen"><span class="navicon">⚙️</span> <span data-i18n="navEinstellungen">Einstellungen</span></button>
    </div>

    <div class="sidefoot">
      🔒 <span style="color:var(--good)">100 % offline</span> · <span data-i18n="footerNoCloud">Keine Cloud</span><br>
      🛡️ Digital-Schutzschild v3.0 PRO<br>
      © 2026 Vorlagenbude
    </div>
  </aside>

  <!-- ============ MAIN ============ -->
  <main class="panel main">
    <div class="panel-head">
      <h2><span>⌂</span> <span id="current-title" data-i18n="navDashboard">Dashboard</span></h2>
      <div class="stat" id="hdrStat">Σ <b>0</b> <span data-i18n="hdrBriefe">Briefe</span> · <b>0</b> <span data-i18n="hdrFaelle">aktive Fälle</span></div>
    </div>
    <div class="content" id="content">

      <!-- ============ DASHBOARD ============ -->
      <section class="view active" id="view-dashboard">
        <div class="eyebrow">Vorlagenbude · 2026</div>
        <h1><span data-i18n="heroPrefix">Dein</span> <span class="accent" data-i18n="heroAccent">Schutzschild</span> <span data-i18n="heroSuffix">für digitale Rechte.</span></h1>
        <p class="lead"><span data-i18n="heroLead1">DSGVO-Auskunft, negative Bewertungen löschen, Social-Media-Sperrung, Urheberrechts-Abmahnung —</span> <strong>12 <span data-i18n="heroBriefGen">Brief-Generatoren</span>, 3 <span data-i18n="heroRechner">Rechner</span>, 1 <span data-i18n="heroTool">Tool</span></strong>. <span data-i18n="heroOffline">Komplett offline, alle Daten lokal.</span></p>

        <div class="stats">
          <div class="stat">
            <div class="stat-icon">📊</div>
            <div class="stat-label">📋 <span data-i18n="kpiFaelle">Aktive Fälle</span></div>
            <div class="stat-value" id="stat-falle">0</div>
            <div class="stat-foot" data-i18n="kpiFaelleFoot">im Browser-Cache</div>
          </div>
          <div class="stat">
            <div class="stat-icon">✉️</div>
            <div class="stat-label">✉️ <span data-i18n="kpiBriefe">Briefe generiert</span></div>
            <div class="stat-value" id="stat-briefe">0</div>
            <div class="stat-foot" data-i18n="kpiBriefeFoot">druckfertig</div>
          </div>
          <div class="stat">
            <div class="stat-icon">⏰</div>
            <div class="stat-label">⏰ <span data-i18n="kpiFristen">Fristen aktiv</span></div>
            <div class="stat-value" id="stat-fristen">0</div>
            <div class="stat-foot" data-i18n="kpiFristenFoot">laufende Tracker</div>
          </div>
          <div class="stat">
            <div class="stat-icon">💶</div>
            <div class="stat-label">💰 <span data-i18n="kpiAbmahn">Abmahnkosten</span></div>
            <div class="stat-value" id="stat-eur">0<span class="unit">€</span></div>
            <div class="stat-foot" data-i18n="kpiAbmahnFoot">gesparte Kosten</div>
          </div>
        </div>

        <h2 style="margin-bottom:14px"><span data-i18n="schnellstartH">Was ist passiert?</span> <span data-i18n="schnellstartAccent">Schnellstart</span></h2>
        <div class="helper-grid">
          <div class="helper-card" onclick="switchView('dsgvo_auskunft')">
            <div class="helper-card-icon">📋</div>
            <div class="helper-card-name" data-i18n="cardDsgvoAuskunft">DSGVO Auskunft</div>
            <div class="helper-card-desc" data-i18n="cardDsgvoAuskunftDesc">Du willst wissen, was ein Unternehmen über dich speichert? Art. 15 DSGVO.</div>
          </div>
          <div class="helper-card" onclick="switchView('dsgvo_loeschung')">
            <div class="helper-card-icon">🗑️</div>
            <div class="helper-card-name" data-i18n="cardLoeschung">Löschung beantragen</div>
            <div class="helper-card-desc" data-i18n="cardLoeschungDesc">"Recht auf Vergessenwerden" — Art. 17 DSGVO.</div>
          </div>
          <div class="helper-card" onclick="switchView('bew_google')">
            <div class="helper-card-icon">⭐</div>
            <div class="helper-card-name" data-i18n="cardBewertung">Bewertung löschen</div>
            <div class="helper-card-desc" data-i18n="cardBewertungDesc">Google, Jameda, eBay, Trustpilot — falsche oder ehrenrührige Bewertungen.</div>
          </div>
          <div class="helper-card" onclick="switchView('sm_instagram')">
            <div class="helper-card-icon">📱</div>
            <div class="helper-card-name" data-i18n="cardAccount">Account gesperrt?</div>
            <div class="helper-card-desc" data-i18n="cardAccountDesc">Instagram, Facebook, YouTube, TikTok — Widerspruch gegen Sperrung.</div>
          </div>
          <div class="helper-card" onclick="switchView('urh_abmahnung')">
            <div class="helper-card-icon">📨</div>
            <div class="helper-card-name" data-i18n="cardAbmahnung">Abmahnung erhalten</div>
            <div class="helper-card-desc" data-i18n="cardAbmahnungDesc">Erste Schritte, Fristen, modifizierte Unterlassung — schnell reagieren.</div>
          </div>
          <div class="helper-card" onclick="switchView('rechner')">
            <div class="helper-card-icon">🧮</div>
            <div class="helper-card-name" data-i18n="cardKosten">Kosten prüfen</div>
            <div class="helper-card-desc" data-i18n="cardKostenDesc">Abmahnkosten, Vertragsstrafen, Frist-Tracker.</div>
          </div>
        </div>

        <h2 style="margin-bottom:14px;margin-top:28px" data-i18n="grundlagenH">Rechtliche Grundlagen</h2>
        <div class="grid-3">
          <div class="card">
            <h3 data-i18n="legalDsgvo">DSGVO</h3>
            <p style="font-size:12px;color:var(--muted)" data-i18n="legalDsgvoDesc">EU-Datenschutz-Grundverordnung. Auskunft (Art. 15), Löschung (Art. 17), Datenübertragbarkeit (Art. 20), Beschwerde (Art. 77).</p>
          </div>
          <div class="card">
            <h3 data-i18n="legalTmg">TMG / NetzDG</h3>
            <p style="font-size:12px;color:var(--muted)" data-i18n="legalTmgDesc">Telemediengesetz + Netzwerkdurchsetzungsgesetz. Verantwortlichkeit von Plattformen für Inhalte. Lösch-Ansprüche an Plattformen.</p>
          </div>
          <div class="card">
            <h3 data-i18n="legalUrhg">UrhG</h3>
            <p style="font-size:12px;color:var(--muted)" data-i18n="legalUrhgDesc">Urheberrechtsgesetz. Unterlassungs-Ansprüche (§ 97), Abmahnung (§ 97a), Schadensersatz (§ 97 II). DMCA für internationale Fälle.</p>
          </div>
        </div>
      </section>

      <!-- ============ DSGVO AUSKUNFT ============ -->
      <section class="view" id="view-dsgvo_auskunft">
        <div class="eyebrow">🔒 DSGVO · Stufe 1</div>
        <h2>Auskunfts-<span class="accent">Antrag</span> (Art. 15)</h2>
        <p class="lead">Du hast das Recht zu erfahren, welche Daten ein Unternehmen über dich speichert. <strong>Frist für Antwort: 1 Monat</strong>. Wenn das Unternehmen nicht antwortet, kannst du Beschwerde beim Landesdatenschutz-Beauftragten einlegen.</p>

        <div class="split-view">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Ton<select id="b1_tone" onchange="renderBrief(1)"><option value="friendly">🟢 Sachlich</option><option value="firm" selected>🟡 Bestimmt</option><option value="lawyer">🔴 Mit Anwalts-Drohung</option></select></label></div>
                <div class="form-group"><label>Empfänger<select id="b1_empf" onchange="renderBrief(1)"><option value="allgemein">Allgemeines Unternehmen</option><option value="social">Social-Media-Plattform</option><option value="online">Online-Shop</option><option value="arbeitgeber">Arbeitgeber</option><option value="other">Andere</option></select></label></div>
              </div>
              <div class="form-group"><label>Name des Unternehmens<input type="text" id="b1_firma" placeholder="z.B. Meta Platforms Ireland Ltd." oninput="renderBrief(1)"></label></div>
              <div class="form-group"><label>Anschrift<textarea id="b1_firma_adr" rows="2" placeholder="Straße, PLZ Ort" oninput="renderBrief(1)"></textarea></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Dein Name<input type="text" id="b1_name" placeholder="Max Mustermann" oninput="renderBrief(1)"></label></div>
                <div class="form-group"><label>Deine Anschrift<textarea id="b1_addr" rows="2" oninput="renderBrief(1)"></textarea></label></div>
              </div>
              <div class="form-group"><label>Identitäts-Nachweis<select id="b1_id" onchange="renderBrief(1)"><option value="kopie">Kopie Personalausweis beigefügt</option><value value="online">Online-Identifizierung gewünscht</option><option value="schon">Bereits identifiziert (Kundennummer)</option></select></label></div>
              <div class="form-group"><label>Zusätzliche Hinweise<textarea id="b1_extras" rows="2" placeholder="z.B. auch Standortdaten, Profilbild, Inhalte..." oninput="renderBrief(1)"></textarea></label></div>
              <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="b1_receipts"><label class="cb"><input type="checkbox" data-r="ausweis" checked> Kopie Personalausweis</label><label class="cb"><input type="checkbox" data-r="vollmacht"> Vollmacht (falls Vertretung)</label><label class="cb"><input type="checkbox" data-r="nachweis"> Nachweis Kundenkonto</label></div></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief(1)">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief(1)">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-dsgvo_auskunft')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="b1_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ DSGVO LÖSCHUNG ============ -->
      <section class="view" id="view-dsgvo_loeschung">
        <div class="eyebrow">🔒 DSGVO · Stufe 1</div>
        <h2>Löschungs-<span class="accent">Antrag</span> (Art. 17)</h2>
        <p class="lead">Das "Recht auf Vergessenwerden" — du kannst verlangen, dass deine Daten gelöscht werden, wenn z.B. der Zweck entfällt oder du deine Einwilligung widerrufst.</p>

        <div class="split-view">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Ton<select id="b2_tone" onchange="renderBrief(2)"><option value="friendly">🟢 Sachlich</option><option value="firm" selected>🟡 Bestimmt</option><option value="lawyer">🔴 Mit Anwalts-Drohung</option></select></label></div>
                <div class="form-group"><label>Löschungs-Grund<select id="b2_grund" onchange="renderBrief(2)"><option value="zweck_entfällt">Zweck entfällt (z.B. Konto gelöscht)</option><option value="einwilligung_widerruf">Einwilligung widerrufen</option><option value="widerspruch">Widerspruch nach Art. 21</option><option value="unrechtmaessig">Daten unrechtmäßig verarbeitet</option><option value="rechtliche_pflicht">Rechtliche Pflicht zur Löschung</option></select></label></div>
              </div>
              <div class="form-group"><label>Name des Unternehmens<input type="text" id="b2_firma" placeholder="z.B. Facebook Ireland Ltd." oninput="renderBrief(2)"></label></div>
              <div class="form-group"><label>Anschrift<textarea id="b2_firma_adr" rows="2" oninput="renderBrief(2)"></textarea></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Dein Name<input type="text" id="b2_name" oninput="renderBrief(2)"></label></div>
                <div class="form-group"><label>Deine Anschrift<textarea id="b2_addr" rows="2" oninput="renderBrief(2)"></textarea></label></div>
              </div>
              <div class="form-group"><label>Welche Daten sollen gelöscht werden?<textarea id="b2_daten" rows="3" placeholder="z.B. Mein Konto @maxmustermann, alle Beiträge aus 2018-2020, alle Standortdaten..." oninput="renderBrief(2)"></textarea></label></div>
              <div class="form-group"><label>Begründung / Sonderfälle<textarea id="b2_extras" rows="2" placeholder="Optional: warum ist die Löschung wichtig?" oninput="renderBrief(2)"></textarea></label></div>
              <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="b2_receipts"><label class="cb"><input type="checkbox" data-r="ausweis" checked> Kopie Personalausweis</label><label class="cb"><input type="checkbox" data-r="widerruf"> Widerruf der Einwilligung</label><label class="cb"><input type="checkbox" data-r="nachweis"> Nachweis Konto-Löschung</label></div></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief(2)">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief(2)">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-dsgvo_loeschung')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="b2_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ DSGVO BESCHWERDE LfDI ============ -->
      <section class="view" id="view-dsgvo_beschwerde">
        <div class="eyebrow danger">🔒 DSGVO · Stufe 2</div>
        <h2>Beschwerde beim <span class="accent">Landesdatenschutz-Beauftragten</span></h2>
        <p class="lead">Das Unternehmen reagiert nicht auf deinen Auskunfts- oder Löschungs-Antrag? <strong>Du kannst dich kostenlos beim LfDI beschweren</strong> (Art. 77 DSGVO). Der LfDI kann Bußgelder verhängen.</p>

        <div class="split-view">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Bundesland<select id="b3_bl" onchange="renderBrief(3)"><option value="bw">Baden-Württemberg</option><option value="by">Bayern</option><option value="be">Berlin</option><option value="bb">Brandenburg</option><option value="hb">Bremen</option><option value="hh">Hamburg</option><option value="he">Hessen</option><option value="mv">Mecklenburg-Vorpommern</option><option value="ni">Niedersachsen</option><option value="nw">Nordrhein-Westfalen</option><option value="rp">Rheinland-Pfalz</option><option value="sl">Saarland</option><option value="sn">Sachsen</option><option value="st">Sachsen-Anhalt</option><option value="sh">Schleswig-Holstein</option><option value="th">Thüringen</option><option value="bfdi">Bundesbeauftragter (BfDI)</option></select></label></div>
                <div class="form-group"><label>Was wurde verletzt?<select id="b3_art" onchange="renderBrief(3)"><option value="auskunft">Auskunfts-Antrag ignoriert (Art. 15)</option><option value="loeschung">Löschungs-Antrag ignoriert (Art. 17)</option><option value="widerspruch">Widerspruch ignoriert (Art. 21)</option><option value="einwilligung">Einwilligung nicht beachtet (Art. 7)</option><option value="datenleck">Datenleck nicht gemeldet (Art. 34)</option><option value="andere">Andere DSGVO-Verletzung</option></select></label></div>
              </div>
              <div class="form-group"><label>Name des Unternehmens<textarea id="b3_firma" rows="2" oninput="renderBrief(3)"></textarea></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Dein Name<input type="text" id="b3_name" oninput="renderBrief(3)"></label></div>
                <div class="form-group"><label>Deine Anschrift<textarea id="b3_addr" rows="2" oninput="renderBrief(3)"></textarea></label></div>
              </div>
              <div class="form-group"><label>Datum des ursprünglichen Antrags<input type="date" id="b3_datum" oninput="renderBrief(3)"></label></div>
              <div class="form-group"><label>Sachverhalt<textarea id="b3_sachverhalt" rows="4" oninput="renderBrief(3)" placeholder="Was ist passiert? Welche Rechte wurden verletzt?"></textarea></label></div>
              <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="b3_receipts"><label class="cb"><input type="checkbox" data-r="antrag" checked> Ursprünglicher Antrag (Kopie)</label><label class="cb"><input type="checkbox" data-r="reaktion" checked> Reaktion des Unternehmens</label><label class="cb"><input type="checkbox" data-r="ausweis" checked> Kopie Personalausweis</label><label class="cb"><input type="checkbox" data-r="vollmacht"> Vollmacht</label></div></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief(3)">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief(3)">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-dsgvo_beschwerde')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="b3_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ GOOGLE BEWERTUNG ============ -->
      <section class="view" id="view-bew_google">
        <div class="eyebrow warn">⭐ Bewertung · Stufe 2</div>
        <h2>Google-<span class="accent">Bewertung</span> löschen lassen</h2>
        <p class="lead">Falsche oder ehrenrührige Google-Bewertung? Du kannst bei Google einen <strong>Lösch-Antrag stellen</strong>. Google prüft dann, ob die Bewertung gegen die Richtlinien verstößt.</p>

        <div class="split-view">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Ton<select id="b4_tone" onchange="renderBrief(4)"><option value="friendly">🟢 Sachlich</option><option value="firm" selected>🟡 Bestimmt</option><option value="lawyer">🔴 Mit Anwalts-Drohung</option></select></label></div>
                <div class="form-group"><label>Verstoß gegen<select id="b4_grund" onchange="renderBrief(4)"><option value="fakten">Sachlich falsche Tatsachenbehauptung</option><option value="beleidigung">Beleidigung / Schmähkritik</option><option value="unwahr">Offensichtlich unwahr</option><option value="verleumdung">Verleumdung</option><option value="spam">Spam / Bewertung ohne Auftrag</option><option value="keine_erfahrung">Bewertung ohne echte Erfahrung</option></select></label></div>
              </div>
              <div class="form-group"><label>Dein Name (Unternehmen)<input type="text" id="b4_unternehmen" placeholder="z.B. Musterfirma GmbH" oninput="renderBrief(4)"></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Google Maps Link zur Bewertung<input type="text" id="b4_link" placeholder="https://g.page/..." oninput="renderBrief(4)"></label></div>
                <div class="form-group"><label>Datum der Bewertung<input type="date" id="b4_datum" oninput="renderBrief(4)"></label></div>
              </div>
              <div class="form-group"><label>Wörtlicher Text der Bewertung<textarea id="b4_text" rows="3" placeholder="&quot;Firma XY ist absolut unzuverlässig ...&quot;" oninput="renderBrief(4)"></textarea></label></div>
              <div class="form-group"><label>Deine Widerlegung<textarea id="b4_widerlegung" rows="3" oninput="renderBrief(4)" placeholder="Warum ist die Bewertung falsch / beleidigend?"></textarea></label></div>
              <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="b4_receipts"><label class="cb"><input type="checkbox" data-r="screenshot" checked> Screenshot der Bewertung</label><label class="cb"><input type="checkbox" data-r="rechnung" checked> Beleg (Rechnung, Vertrag)</label><label class="cb"><input type="checkbox" data-r="korrespondenz"> Korrespondenz mit Kunde</label></div></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief(4)">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief(4)">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-bew_google')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="b4_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ JAMEDA ============ -->
      <section class="view" id="view-bew_jameda">
        <div class="eyebrow warn">⭐ Bewertung · Stufe 2</div>
        <h2><span class="accent">Jameda</span>-Eintrag entfernen</h2>
        <p class="lead">Du bist Ärztin/Arzt und willst nicht auf Jameda gelistet werden? Jameda muss dich auf Anfrage <strong>aus dem Verzeichnis entfernen</strong> — und zwar ohne Begründung. Das ist seit 2018 höchstrichterlich entschieden (BGH, 23.02.2018, Az. I ZR 109/17).</p>

        <div class="split-view">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Ton<select id="b5_tone" onchange="renderBrief(5)"><option value="friendly">🟢 Sachlich</option><option value="firm" selected>🟡 Bestimmt</option><option value="lawyer">🔴 Mit Anwalts-Drohung</option></select></label></div>
                <div class="form-group"><label>Aktion<select id="b5_aktion" onchange="renderBrief(5)"><option value="eintrag">Vollständigen Eintrag löschen</option><option value="bewertungen">Alle Bewertungen löschen</option><option value="foto">Foto entfernen</option></select></label></div>
              </div>
              <div class="form-group"><label>Jameda-Adresse<input type="text" id="b5_adr" value="Jameda GmbH, Karl-Theodor-Straße 55, 80803 München" oninput="renderBrief(5)"></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Dein Name<input type="text" id="b5_name" placeholder="Dr. Max Mustermann" oninput="renderBrief(5)"></label></div>
                <div class="form-group"><label>Deine Fachrichtung<input type="text" id="b5_fach" placeholder="Allgemeinmedizin" oninput="renderBrief(5)"></label></div>
              </div>
              <div class="form-group"><label>Deine Anschrift<textarea id="b5_addr" rows="2" oninput="renderBrief(5)"></textarea></label></div>
              <div class="form-group"><label>Jameda-Profil-Link (optional)<input type="text" id="b5_link" placeholder="https://www.jameda.de/..." oninput="renderBrief(5)"></label></div>
              <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="b5_receipts"><label class="cb"><input type="checkbox" data-r="ausweis" checked> Kopie Personalausweis</label><label class="cb"><input type="checkbox" data-r="approbation"> Approbationsurkunde</label><label class="cb"><input type="checkbox" data-r="vertrag"> Aktuelle Vertragsunterlagen</label></div></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief(5)">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief(5)">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-bew_jameda')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="b5_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ EBAY/AMAZON BEWERTUNG ============ -->
      <section class="view" id="view-bew_ebay">
        <div class="eyebrow warn">⭐ Bewertung · Stufe 2</div>
        <h2>eBay / Amazon-<span class="accent">Bewertung</span> anfechten</h2>
        <p class="lead">Eine negative Bewertung auf eBay oder Amazon ist <strong>unfair, unwahr oder beleidigend</strong>? Du kannst den Bewertungstext prüfen und löschen lassen.</p>

        <div class="split-view">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Plattform<select id="b6_plattform" onchange="renderBrief(6)"><option value="ebay">eBay</option><option value="amazon">Amazon</option><option value="kleinanzeigen">Kleinanzeigen</option><option value="other">Andere</option></select></label></div>
                <div class="form-group"><label>Verstoß gegen<select id="b6_grund" onchange="renderBrief(6)"><option value="beleidigung">Beleidigung</option><option value="erpressung">Erpressung (negative Bewertung gegen Zugeständnisse)</option><option value="unwahr">Sachlich falsch</option><option value="verleumdung">Verleumdung</option><option value="kein_kauf">Kein echter Kauf</option></select></label></div>
              </div>
              <div class="form-group"><label>Plattform-Anschrift<textarea id="b6_adr" rows="2" oninput="renderBrief(6)">eBay GmbH, Albert-Einstein-Ring 2-6, 14532 Kleinmachnow</textarea></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Dein Account-Name<input type="text" id="b6_name" oninput="renderBrief(6)"></label></div>
                <div class="form-group"><label>Artikel-Nr / Transaktion<input type="text" id="b6_artnr" placeholder="z.B. eBay-Artikelnummer" oninput="renderBrief(6)"></label></div>
              </div>
              <div class="form-group"><label>Wörtlicher Text der Bewertung<textarea id="b6_text" rows="3" oninput="renderBrief(6)"></textarea></label></div>
              <div class="form-group"><label>Deine Widerlegung<textarea id="b6_widerlegung" rows="3" oninput="renderBrief(6)" placeholder="Warum ist die Bewertung zu löschen?"></textarea></label></div>
              <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="b6_receipts"><label class="cb"><input type="checkbox" data-r="screenshot" checked> Screenshot der Bewertung</label><label class="cb"><input type="checkbox" data-r="versand" checked> Versandnachweis</label><label class="cb"><input type="checkbox" data-r="chat"> Chat-Verlauf mit Käufer</label></div></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief(6)">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief(6)">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-bew_ebay')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="b6_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ TRUSTPILOT ============ -->
      <section class="view" id="view-bew_trustpilot">
        <div class="eyebrow warn">⭐ Bewertung · Stufe 2</div>
        <h2>Trustpilot-<span class="accent">Bewertung</span> löschen</h2>
        <p class="lead">Falsche oder verleumderische Trustpilot-Bewertungen können gelöscht werden. Trustpilot prüft, ob die Bewertung <strong>gegen die Community-Richtlinien</strong> verstößt.</p>

        <div class="split-view">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Ton<select id="b7_tone" onchange="renderBrief(7)"><option value="friendly">🟢 Sachlich</option><option value="firm" selected>🟡 Bestimmt</option><option value="lawyer">🔴 Mit Anwalts-Drohung</option></select></label></div>
                <div class="form-group"><label>Verstoß<select id="b7_grund" onchange="renderBrief(7)"><option value="beleidigung">Beleidigung / Schmähkritik</option><option value="verleumdung">Verleumdung</option><option value="unwahr">Sachlich falsch</option><option value="kein_kunde">Kein echter Kunde</option><option value="wettbewerb">Wettbewerber-Bewertung</option></select></label></div>
              </div>
              <div class="form-group"><label>Dein Unternehmen / Profil<textarea id="b7_unternehmen" rows="2" oninput="renderBrief(7)" placeholder="Name + Profil-URL"></textarea></label></div>
              <div class="form-group"><label>Trustpilot-Anschrift<textarea id="b7_adr" rows="2" oninput="renderBrief(7)">Trustpilot A/S, Pilestræde 58, 5th floor, 1112 Kopenhagen, Dänemark</textarea></label></div>
              <div class="form-group"><label>Wörtlicher Text der Bewertung<textarea id="b7_text" rows="3" oninput="renderBrief(7)"></textarea></label></div>
              <div class="form-group"><label>Deine Widerlegung<textarea id="b7_widerlegung" rows="3" oninput="renderBrief(7)"></textarea></label></div>
              <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="b7_receipts"><label class="cb"><input type="checkbox" data-r="screenshot" checked> Screenshot</label><label class="cb"><input type="checkbox" data-r="rechnung"> Rechnung / Auftragsbestätigung</label><label class="cb"><input type="checkbox" data-r="korrespondenz"> Korrespondenz</label></div></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief(7)">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief(7)">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-bew_trustpilot')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="b7_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ INSTAGRAM SPERRUNG ============ -->
      <section class="view" id="view-sm_instagram">
        <div class="eyebrow danger">📱 Social Media · Stufe 3</div>
        <h2>Instagram-<span class="accent">Sperrung</span> Widerspruch</h2>
        <p class="lead">Dein Instagram-Account wurde gesperrt? Du kannst <strong>Widerspruch gegen die Sperrung einlegen</strong>. Meta (Instagram) muss innerhalb von 1 Monat antworten.</p>

        <div class="split-view">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Ton<select id="b8_tone" onchange="renderBrief(8)"><option value="friendly">🟢 Sachlich</option><option value="firm" selected>🟡 Bestimmt</option><option value="lawyer">🔴 Mit Anwalts-Drohung</option></select></label></div>
                <div class="form-group"><label>Art der Sperrung<select id="b8_art" onchange="renderBrief(8)"><option value="komplett">Komplett gesperrt</option><option value="vorübergehend">Vorübergehend gesperrt</option><option value="einzelne_inhalte">Einzelne Inhalte gelöscht</option><option value="shadowban">Shadow-Ban vermutet</option></select></label></div>
              </div>
              <div class="form-group"><label>Meta Ireland Adresse<textarea id="b8_adr" rows="2" oninput="renderBrief(8)">Meta Platforms Ireland Ltd., Merrion Road, Dublin 4, D04 X2K5, Ireland</textarea></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Dein Name<input type="text" id="b8_name" oninput="renderBrief(8)"></label></div>
                <div class="form-group"><label>Dein Instagram-Handle<input type="text" id="b8_handle" placeholder="@maxmustermann" oninput="renderBrief(8)"></label></div>
              </div>
              <div class="form-group"><label>Deine Anschrift<textarea id="b8_addr" rows="2" oninput="renderBrief(8)"></textarea></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Datum der Sperrung<input type="date" id="b8_datum" oninput="renderBrief(8)"></label></div>
                <div class="form-group"><label>E-Mail des Accounts<input type="text" id="b8_email" placeholder="max@..." oninput="renderBrief(8)"></label></div>
              </div>
              <div class="form-group"><label>Grund der Sperrung laut Meta (wörtlich)<textarea id="b8_grund" rows="2" oninput="renderBrief(8)"></textarea></label></div>
              <div class="form-group"><label>Deine Stellungnahme<textarea id="b8_stellung" rows="3" oninput="renderBrief(8)" placeholder="Warum ist die Sperrung unberechtigt?"></textarea></label></div>
              <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="b8_receipts"><label class="cb"><input type="checkbox" data-r="screenshot" checked> Screenshot der Sperr-Meldung</label><label class="cb"><input type="checkbox" data-r="ausweis" checked> Kopie Personalausweis</label><label class="cb"><input type="checkbox" data-r="beitraege"> Beispiele deiner Beiträge</label></div></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief(8)">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief(8)">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-sm_instagram')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="b8_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ FACEBOOK SPERRUNG ============ -->
      <section class="view" id="view-sm_facebook">
        <div class="eyebrow danger">📱 Social Media · Stufe 3</div>
        <h2>Facebook-<span class="accent">Sperrung</span> Widerspruch</h2>
        <p class="lead">Dein Facebook-Account wurde deaktiviert? Schreibe Meta direkt. Bei mehrfacher Sperrung hilft auch eine <strong>DSGVO-Beschwerde</strong>.</p>

        <div class="split-view">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Ton<select id="b9_tone" onchange="renderBrief(9)"><option value="friendly">🟢 Sachlich</option><option value="firm" selected>🟡 Bestimmt</option><option value="lawyer">🔴 Mit Anwalts-Drohung</option></select></label></div>
                <div class="form-group"><label>Art der Sperrung<select id="b9_art" onchange="renderBrief(9)"><option value="komplett">Komplett deaktiviert</option><option value="vorübergehend">Vorübergehend gesperrt</option><option value="verstoss">Verstoß gegen Gemeinschaftsstandards</option><option value="fake">Fälschlich als Fake markiert</option></select></label></div>
              </div>
              <div class="form-group"><label>Meta Ireland Adresse<textarea id="b9_adr" rows="2" oninput="renderBrief(9)">Meta Platforms Ireland Ltd., Merrion Road, Dublin 4, D04 X2K5, Ireland</textarea></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Dein Name<input type="text" id="b9_name" oninput="renderBrief(9)"></label></div>
                <div class="form-group"><label>Facebook-Profil-URL<input type="text" id="b9_url" placeholder="https://facebook.com/..." oninput="renderBrief(9)"></label></div>
              </div>
              <div class="form-group"><label>Deine Anschrift<textarea id="b9_addr" rows="2" oninput="renderBrief(9)"></textarea></label></div>
              <div class="form-group"><label>Sachverhalt<textarea id="b9_sachverhalt" rows="3" oninput="renderBrief(9)" placeholder="Was ist passiert? Warum ist die Sperrung unberechtigt?"></textarea></label></div>
              <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="b9_receipts"><label class="cb"><input type="checkbox" data-r="screenshot" checked> Screenshot der Sperr-Meldung</label><label class="cb"><input type="checkbox" data-r="ausweis" checked> Kopie Personalausweis</label></div></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief(9)">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief(9)">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-sm_facebook')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="b9_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ YOUTUBE STRIKE ============ -->
      <section class="view" id="view-sm_youtube">
        <div class="eyebrow danger">📱 Social Media · Stufe 3</div>
        <h2>YouTube-<span class="accent">Strike</span> / Content gelöscht</h2>
        <p class="lead">Dein YouTube-Video wurde gelöscht oder du hast einen Copyright-Strike? Du kannst <strong>Widerspruch einlegen oder Counter-Notice senden</strong>.</p>

        <div class="split-view">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Ton<select id="b10_tone" onchange="renderBrief(10)"><option value="friendly">🟢 Sachlich</option><option value="firm" selected>🟡 Bestimmt</option><option value="lawyer">🔴 Mit Anwalts-Drohung</option></select></label></div>
                <div class="form-group"><label>Art<select id="b10_art" onchange="renderBrief(10)"><option value="strike">Copyright-Strike (3-Strike-System)</option><option value="community">Community-Richtlinien-Verstoß</option><option value="removed">Video gelöscht</option><option value="strike_appeal">Widerspruch gegen Strike</option></select></label></div>
              </div>
              <div class="form-group"><label>Google Ireland Adresse<textarea id="b10_adr" rows="2" oninput="renderBrief(10)">Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, D04 E5W5, Ireland</textarea></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Dein Name<input type="text" id="b10_name" oninput="renderBrief(10)"></label></div>
                <div class="form-group"><label>YouTube-Kanal-URL<input type="text" id="b10_url" placeholder="https://youtube.com/@..." oninput="renderBrief(10)"></label></div>
              </div>
              <div class="form-group"><label>Video-URL / Video-ID<input type="text" id="b10_video" placeholder="https://youtube.com/watch?v=..." oninput="renderBrief(10)"></label></div>
              <div class="form-group"><label>Dein Widerspruch<textarea id="b10_widerspruch" rows="4" oninput="renderBrief(10)" placeholder="Warum ist der Strike/die Löschung unberechtigt? Fair Use? Eigene Inhalte?"></textarea></label></div>
              <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="b10_receipts"><label class="cb"><input type="checkbox" data-r="screenshot" checked> Screenshot der Strike-Meldung</label><label class="cb"><input type="checkbox" data-r="lizenz"> Lizenznachweis (falls eigene Nutzung)</label><label class="cb"><input type="checkbox" data-r="ausweis"> Kopie Personalausweis</label></div></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief(10)">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief(10)">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-sm_youtube')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="b10_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ TIKTOK SPERRUNG ============ -->
      <section class="view" id="view-sm_tiktok">
        <div class="eyebrow danger">📱 Social Media · Stufe 3</div>
        <h2>TikTok-<span class="accent">Sperrung</span> Widerspruch</h2>
        <p class="lead">TikTok hat deinen Account gesperrt? Schreibe TikTok Ireland direkt. Bei Verstoß gegen die Community-Richtlinien musst du konkret darlegen, warum die Sperrung unberechtigt ist.</p>

        <div class="split-view">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Ton<select id="b11_tone" onchange="renderBrief(11)"><option value="friendly">🟢 Sachlich</option><option value="firm" selected>🟡 Bestimmt</option><option value="lawyer">🔴 Mit Anwalts-Drohung</option></select></label></div>
                <div class="form-group"><label>Art<select id="b11_art" onchange="renderBrief(11)"><option value="banned">Permanent gebannt</option><option value="shadowban">Shadow-Ban</option><option value="video">Video gelöscht</option><option value="live">Live-Stream gesperrt</option></select></label></div>
              </div>
              <div class="form-group"><label>TikTok Ireland Adresse<textarea id="b11_adr" rows="2" oninput="renderBrief(11)">TikTok Technology Ltd., 10 Earlsfort Terrace, Dublin 2, D02 T380, Ireland</textarea></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Dein Name<input type="text" id="b11_name" oninput="renderBrief(11)"></label></div>
                <div class="form-group"><label>Dein TikTok-Handle<input type="text" id="b11_handle" placeholder="@maxmustermann" oninput="renderBrief(11)"></label></div>
              </div>
              <div class="form-group"><label>Deine Anschrift<textarea id="b11_addr" rows="2" oninput="renderBrief(11)"></textarea></label></div>
              <div class="form-group"><label>Sachverhalt<textarea id="b11_sachverhalt" rows="4" oninput="renderBrief(11)" placeholder="Was ist passiert? Welche Inhalte wurden beanstandet? Warum ist die Sperrung falsch?"></textarea></label></div>
              <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="b11_receipts"><label class="cb"><input type="checkbox" data-r="screenshot" checked> Screenshot der Sperr-Meldung</label><label class="cb"><input type="checkbox" data-r="ausweis" checked> Kopie Personalausweis</label></div></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief(11)">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief(11)">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-sm_tiktok')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="b11_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ ABMAHNUNG ERHALTEN ============ -->
      <section class="view" id="view-urh_abmahnung">
        <div class="eyebrow danger">⚖️ Urheberrecht · Stufe 4</div>
        <h2>Abmahnung <span class="accent">erhalten</span>?</h2>
        <p class="lead">Eine Abmahnung wegen Urheberrechtsverletzung erhalten? <strong>Ruhe bewahren</strong>, Frist prüfen, nicht ungeprüft unterschreiben. Diese Seite gibt dir die wichtigsten Schritte und Tools an die Hand.</p>

        <div class="alert danger">
          <span class="icon">⚠️</span>
          <div>
            <strong>Wichtig:</strong> Eine Abmahnung ist <strong>kein Schuldeingeständnis</strong>! Häufig sind Abmahnungen überzogen oder sogar rechtsmissbräuchlich. Unterschreibe NICHTS ohne Prüfung.
          </div>
        </div>

        <div class="grid-2">
          <div class="card">
            <div class="section-title">🚦 Erste Schritte</div>
            <ol style="font-size:13px;color:var(--ink-2);line-height:1.7;margin:8px 0 8px 20px">
              <li><strong>Frist notieren</strong> — Meist 7-14 Tage. Wochenend-Fristen beachten.</li>
              <li><strong>Inhalt prüfen</strong> — Was genau wird dir vorgeworfen? (Bild, Text, Video, Foto)</li>
              <li><strong>Beweise sichern</strong> — Screenshot der Quelle, Lizenznachweise</li>
              <li><strong>Nichts unterschreiben</strong> — Auch nicht teilweise</li>
              <li><strong>Anwalt konsultieren</strong> — Bei Streitwerten > 1.000 € empfehlenswert</li>
              <li><strong>Modifizierte Unterlassung abgeben</strong> — wenn berechtigt (siehe nächste Seite)</li>
            </ol>
          </div>
          <div class="card">
            <div class="section-title">📋 Abmahnung-Checkliste</div>
            <div class="list">
              <div class="item"><div class="item-main"><div class="item-title">Abmahner prüfen</div><p class="small muted">Ist der Abmahner überhaupt Inhaber der Rechte? Bei anonymen "Rechtsanwälten" für obskure Firmen: oft Abmahn-Abzocke.</p></div></div>
              <div class="item"><div class="item-main"><div class="item-title">Gegenstandswert prüfen</div><p class="small muted">Ist der Streitwert angemessen? Ein einzelnes Bild kann nicht 5.000 € Streitwert haben.</p></div></div>
              <div class="item"><div class="item-main"><div class="item-title">Vertragsstrafe angemessen?</div><p class="small muted">5.000 € pro Verstoß ist im normalen Fall zu hoch. Faustregel: max. 2.000 € pro Fall.</p></div></div>
              <div class="item"><div class="item-main"><div class="item-title">Anwaltskosten überprüfen</div><p class="small muted">RVG-Tabelle prüfen mit unserem Abmahnkosten-Rechner.</p></div></div>
            </div>
          </div>
        </div>

        <div class="card" style="margin-top:18px">
          <div class="section-title">🎯 Welche Briefe brauchst du?</div>
          <div class="grid-3">
            <button class="helper-card" onclick="switchView('urh_unterlassung')" style="text-align:left;cursor:pointer">
              <div class="helper-card-icon">✍️</div>
              <div class="helper-card-name">Modifizierte Unterlassung</div>
              <div class="helper-card-desc">Wenn die Abmahnung berechtigt ist: korrekte Unterlassungserklärung abgeben.</div>
            </button>
            <button class="helper-card" onclick="switchView('urh_counter')" style="text-align:left;cursor:pointer">
              <div class="helper-card-icon">🛡️</div>
              <div class="helper-card-name">Counter-Abmahnung</div>
              <div class="helper-card-desc">Wenn die Abmahnung unberechtigt ist: Gegenabmahnung mit Schadensersatzforderung.</div>
            </button>
            <button class="helper-card" onclick="switchView('rechner')" style="text-align:left;cursor:pointer">
              <div class="helper-card-icon">🧮</div>
              <div class="helper-card-name">Abmahnkosten prüfen</div>
              <div class="helper-card-desc">Rechner: Sind die geforderten Anwaltskosten korrekt nach RVG?</div>
            </button>
          </div>
        </div>
      </section>

      <!-- ============ MODIFIZIERTE UNTERLASSUNG ============ -->
      <section class="view" id="view-urh_unterlassung">
        <div class="eyebrow">⚖️ Urheberrecht · Stufe 4</div>
        <h2>Modifizierte <span class="accent">Unterlassungs-Erklärung</span></h2>
        <p class="lead">Wenn die Abmahnung <strong>berechtigt</strong> ist: du gibst eine modifizierte Unterlassungserklärung ab. Wichtig: <strong>modifiziert</strong> — niemals die vom Gegner vorformulierte 1:1 unterschreiben (Vertragsstrafe oft zu hoch).</p>

        <div class="alert info">
          <span class="icon">💡</span>
          <div><strong>Wichtig:</strong> Modifizierte Unterlassung = du erkennst die Forderung nur <strong>konkludent</strong> an, nicht ausdrücklich. Das verhindert ein Schuldeingeständnis und schützt dich vor überhöhten Schadensersatz-Forderungen.</div>
        </div>

        <div class="split-view">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Vertragsstrafe (Vorschlag)<input type="number" id="b12_strafe" value="2000" min="500" max="10000" step="500" oninput="renderBrief(12)"></label></div>
                <div class="form-group"><label>Deutungs-Variante<select id="b12_variante" onchange="renderBrief(12)"><option value="eingerichtet">"eingerichtet und vorbereitet" (kostengünstiger)</option><option value="vervielfaeltigt">"vervielfältigt und verbreitet" (strenger)</option></select></label></div>
              </div>
              <div class="form-group"><label>Abmahner (Anwalt oder Rechteinhaber)<input type="text" id="b12_abmahner" placeholder="z.B. Musteranwalt Rechtsanwälte" oninput="renderBrief(12)"></label></div>
              <div class="form-group"><label>Abmahner-Anschrift<textarea id="b12_abmahner_adr" rows="2" oninput="renderBrief(12)"></textarea></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Dein Name<input type="text" id="b12_name" oninput="renderBrief(12)"></label></div>
                <div class="form-group"><label>Dein Aktenzeichen<input type="text" id="b12_az" placeholder="z.B. 123/2026" oninput="renderBrief(12)"></label></div>
              </div>
              <div class="form-group"><label>Deine Anschrift<textarea id="b12_addr" rows="2" oninput="renderBrief(12)"></textarea></label></div>
              <div class="form-group"><label>Gegenstand der Abmahnung<textarea id="b12_gegenstand" rows="2" oninput="renderBrief(12)" placeholder="z.B. Verwendung des Fotos 'Sonnenuntergang.jpg' auf Ihrer Webseite..."></textarea></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief(12)">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief(12)">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-urh_unterlassung')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="b12_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ COUNTER-ABMAHNUNG ============ -->
      <section class="view" id="view-urh_counter">
        <div class="eyebrow danger">⚖️ Urheberrecht · Stufe 4</div>
        <h2>Counter-<span class="accent">Abmahnung</span> (Gegenabmahnung)</h2>
        <p class="lead">Die Abmahnung ist <strong>unberechtigt oder überzogen</strong>? Setze dich zur Wehr. Counter-Abmahnung mit Schadensersatzforderung — plus ggf. Strafanzeige wegen versuchter Erpressung (§ 253 StGB).</p>

        <div class="split-view">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Ton<select id="b13_tone" onchange="renderBrief(13)"><option value="friendly">🟢 Sachlich (zur Klarstellung)</option><option value="firm" selected>🟡 Bestimmt (mit Schadensersatz-Androhung)</option><option value="lawyer">🔴 Mit Strafanzeige-Drohung</option></select></label></div>
                <div class="form-group"><label>Grund der Unberechtigkeit<select id="b13_grund" onchange="renderBrief(13)"><option value="lizenz">Du hattest eine Lizenz (z.B. Creative Commons)</option><option value="kein_recht">Abmahner ist nicht Rechteinhaber</option><option value="frei">Werk ist gemeinfrei</option><option value="kein_verstoss">Keine Rechtsverletzung (z.B. Zitat, Satire)</option><option value="ueberzogen">Vertragsstrafe/Anwaltskosten überzogen</option></select></label></div>
              </div>
              <div class="form-group"><label>Abmahner<input type="text" id="b13_abmahner" oninput="renderBrief(13)"></label></div>
              <div class="form-group"><label>Abmahner-Anschrift<textarea id="b13_abmahner_adr" rows="2" oninput="renderBrief(13)"></textarea></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Dein Name<input type="text" id="b13_name" oninput="renderBrief(13)"></label></div>
                <div class="form-group"><label>Aktenzeichen<input type="text" id="b13_az" oninput="renderBrief(13)"></label></div>
              </div>
              <div class="form-group"><label>Deine Anschrift<textarea id="b13_addr" rows="2" oninput="renderBrief(13)"></textarea></label></div>
              <div class="form-group"><label>Deine Widerlegung<textarea id="b13_widerlegung" rows="4" oninput="renderBrief(13)" placeholder="Detailliert: warum ist die Abmahnung unberechtigt?"></textarea></label></div>
              <div class="form-group"><label>Schadensersatz-Forderung (optional)<input type="text" id="b13_schaden" placeholder="z.B. 500 € für unnötige Anwaltskosten" oninput="renderBrief(13)"></label></div>
              <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="b13_receipts"><label class="cb"><input type="checkbox" data-r="lizenz" checked> Lizenznachweis</label><label class="cb"><input type="checkbox" data-r="abmahnung" checked> Ursprüngliche Abmahnung</label><label class="cb"><input type="checkbox" data-r="beweis"> Beweis der Unberechtigung</label></div></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief(13)">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief(13)">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-urh_counter')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="b13_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ DMCA NOTICE ============ -->
      <section class="view" id="view-urh_dmca">
        <div class="eyebrow">⚖️ Urheberrecht · Stufe 4</div>
        <h2>DMCA-<span class="accent">Notice</span> an Plattform</h2>
        <p class="lead">Jemand hat <strong>dein urheberrechtlich geschütztes Werk</strong> ohne Erlaubnis auf einer Plattform hochgeladen? Mit einer DMCA-Notice verlangst du die Löschung. Plattformen wie YouTube, Twitter, Facebook müssen binnen 24-72h reagieren.</p>

        <div class="split-view">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Plattform<select id="b14_plattform" onchange="renderBrief(14)"><option value="youtube">YouTube</option><option value="facebook">Facebook / Instagram</option><option value="twitter">Twitter / X</option><option value="tiktok">TikTok</option><option value="google">Google Suche</option><option value="other">Andere</option></select></label></div>
                <div class="form-group"><label>Werk-Typ<select id="b14_typ" onchange="renderBrief(14)"><option value="foto">Foto / Bild</option><option value="video">Video</option><option value="text">Text / Artikel</option><option value="musik">Musik / Audio</option></select></label></div>
              </div>
              <div class="form-group"><label>Plattform-Adressat<textarea id="b14_adr" rows="2" oninput="renderBrief(14)">z.B. YouTube Copyright Team, Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, D04 E5W5, Ireland</textarea></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Dein Name (Rechteinhaber)<input type="text" id="b14_name" oninput="renderBrief(14)"></label></div>
                <div class="form-group"><label>Dein Land<select id="b14_land" onchange="renderBrief(14)"><option value="DE">Deutschland</option><option value="AT">Österreich</option><option value="CH">Schweiz</option></select></label></div>
              </div>
              <div class="form-group"><label>Deine Anschrift<textarea id="b14_addr" rows="2" oninput="renderBrief(14)"></textarea></label></div>
              <div class="form-group"><label>URL des rechtsverletzenden Inhalts<input type="text" id="b14_url" placeholder="https://..." oninput="renderBrief(14)"></label></div>
              <div class="form-group"><label>Beschreibung des Werks<textarea id="b14_werk" rows="2" oninput="renderBrief(14)" placeholder="z.B. 'Foto Sonnenuntergang Sylt, aufgenommen 15.8.2025'"></textarea></label></div>
              <div class="form-group"><label>Beweise der Urheberschaft<textarea id="b14_beweis" rows="2" oninput="renderBrief(14)" placeholder="z.B. EXIF-Daten, Original-Datei mit Zeitstempel, Veröffentlichung am 15.8.2025 auf meiner Website"></textarea></label></div>
              <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="b14_receipts"><label class="cb"><input type="checkbox" data-r="original" checked> Screenshot Originalwerk mit Zeitstempel</label><label class="cb"><input type="checkbox" data-r="screenshot_vor" checked> Screenshot der Rechtsverletzung</label><label class="cb"><input type="checkbox" data-r="ausweis"> Kopie Personalausweis</label><label class="cb"><input type="checkbox" data-r="eidesstattliche"> Optional: Eidesstattliche Versicherung</label></div></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief(14)">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief(14)">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-urh_dmca')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="b14_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ DSGVO SCHADENSERSATZ (Art. 82) ============ -->
      <section class="view" id="view-dsgvo_schaden">
        <div class="eyebrow">🔒 DSGVO · Stufe 1</div>
        <h2>Schadensersatz nach <span class="accent">Art. 82 DSGVO</span></h2>
        <p class="lead">Datenleck bei einem Konzern? Du hast Anspruch auf <strong>Schadensersatz für immaterielle Schäden</strong> – auch ohne konkreten Vermögensverlust (EuGH C-300/21 „UI ./. ÖAAB", C-687/21 „MediaMarktSaturn").</p>
        <div class="splitview-news">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-grid-2">
                <div class="form-group"><label>Ton<select id="bs_tone" onchange="renderDsgvoSchaden()"><option value="friendly">🟢 Sachlich</option><option value="firm" selected>🟡 Bestimmt</option><option value="lawyer">🔴 Anwaltlich</option></select></label></div>
                <div class="form-group"><label>Konzern<select id="bs_konzern" onchange="renderDsgvoSchaden()">
                  <option value="Meta Platforms Ireland Ltd">Meta (Facebook/Instagram)</option>
                  <option value="LinkedIn Ireland Unlimited Company">LinkedIn</option>
                  <option value="Deezer SA">Deezer</option>
                  <option value="Google Ireland Ltd">Google</option>
                  <option value="Amazon Europe Core S.à r.l.">Amazon</option>
                  <option value="Apple Distribution International Ltd">Apple</option>
                  <option value="Sony Music Entertainment Germany GmbH">Sony Music</option>
                  <option value="Andere">Anderes Unternehmen</option>
                </select></label></div>
              </div>
              <div class="form-group"><label>Empfänger-Firma<input type="text" id="bs_firma" placeholder="z.B. Meta Platforms Ireland Ltd." oninput="renderDsgvoSchaden()"></label></div>
              <div class="form-group"><label>Empfänger-Anschrift<textarea id="bs_firma_adr" rows="2" placeholder="4 Grand Canal Square, Dublin 2, Irland" oninput="renderDsgvoSchaden()"></textarea></label></div>
              <div class="form-group"><label>Dein Name<input type="text" id="bs_name" placeholder="Max Mustermann" oninput="renderDsgvoSchaden()"></label></div>
              <div class="form-group"><label>Deine Anschrift<textarea id="bs_addr" rows="2" oninput="renderDsgvoSchaden()"></textarea></label></div>
              <div class="form-group"><label>IBAN<input type="text" id="bs_iban" placeholder="DE89 3704 0044 0532 0130 00" oninput="renderDsgvoSchaden()"></label></div>
              <div class="form-group"><label>BIC<input type="text" id="bs_bic" placeholder="COBADEFFXXX" oninput="renderDsgvoSchaden()"></label></div>
              <div class="form-group"><label>Datum des Datenlecks<input type="date" id="bs_leck" onchange="renderDsgvoSchaden()"></label></div>
              <div class="form-group"><label>Welche Daten?<input type="text" id="bs_daten" placeholder="E-Mail, Telefon, Anschrift" oninput="renderDsgvoSchaden()"></label></div>
              <div class="form-group"><label>Anzahl Betroffener<input type="text" id="bs_anzahl" placeholder="z.B. 533 Mio." oninput="renderDsgvoSchaden()"></label></div>
              <div class="form-group"><label>Konkrete Folgen<textarea id="bs_folge" rows="2" placeholder="z.B. Spam, Phishing-Versuche, Identitätsangst" oninput="renderDsgvoSchaden()"></textarea></label></div>
              <div class="form-group"><label>Geforderter Betrag (€)<input type="number" id="bs_betrag" value="2500" min="100" step="100" oninput="renderDsgvoSchaden()"></label></div>
              <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="bs_receipts"><label class="cb"><input type="checkbox" data-r="leck-meldung" checked> Meldung des Datenlecks</label><label class="cb"><input type="checkbox" data-r="ausweis"> Personalausweis-Kopie</label><label class="cb"><input type="checkbox" data-r="spam-log"> Logbuch Spam/Phishing</label><label class="cb"><input type="checkbox" data-r="zeitung"> Zeitungsartikel zum Leak</label></div></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief('bs')">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief('bs')">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-dsgvo_schaden')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="bs_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ SCHUFA GRATIS-AUSKUNFT ============ -->
      <section class="view" id="view-schufa_auskunft">
        <div class="eyebrow">💰 Schufa & Bonität · Stufe 1</div>
        <h2>Gratis-<span class="accent">Auskunft</span> nach Art. 15 DSGVO</h2>
        <p class="lead">Wirtschaftsauskunfteien sind verpflichtet, dir <strong>einmal pro Jahr kostenlos</strong> eine vollständige Datenauskunft zu erteilen – inkl. Scoreformel, gespeicherten Forderungen und aller Empfänger.</p>
        <div class="splitview-news">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-group"><label>Auskunftei<select id="sa_auskunftei" onchange="updateSchufaPreset('sa');renderSchufaAuskunft()">
                <option value="SCHUFA Holding AG">SCHUFA Holding AG</option>
                <option value="CRIF Bürgel GmbH">CRIF Bürgel GmbH</option>
                <option value="Infoscore Consumer Data GmbH">Infoscore (arvato/Bertelsmann)</option>
                <option value="Creditreform">Creditreform</option>
              </select></label></div>
              <div class="form-group"><label>Anschrift<textarea id="sa_auskunftei_adr" rows="2" oninput="renderSchufaAuskunft()">Kormoranweg 5, 65201 Wiesbaden</textarea></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Dein Name<input type="text" id="sa_name" placeholder="Max Mustermann" oninput="renderSchufaAuskunft()"></label></div>
                <div class="form-group"><label>Geburtsdatum<input type="date" id="sa_geburtsdatum" onchange="renderSchufaAuskunft()"></label></div>
              </div>
              <div class="form-group"><label>Deine Anschrift<textarea id="sa_addr" rows="2" oninput="renderSchufaAuskunft()"></textarea></label></div>
              <div class="form-group"><label>Kundennummer (optional)<input type="text" id="sa_kundennr" placeholder="leer lassen wenn unbekannt" oninput="renderSchufaAuskunft()"></label></div>
              <div class="form-group"><label>Ton<select id="sa_tone" onchange="renderSchufaAuskunft()"><option value="friendly">🟢 Sachlich</option><option value="firm" selected>🟡 Bestimmt</option><option value="lawyer">🔴 Anwaltlich</option></select></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief('sa')">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief('sa')">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-schufa_auskunft')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="sa_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ SCHUFA LÖSCHUNG ============ -->
      <section class="view" id="view-schufa_loeschung">
        <div class="eyebrow">💰 Schufa & Bonität · Stufe 1</div>
        <h2>Schufa-<span class="accent">Löschungsantrag</span> (Art. 17)</h2>
        <p class="lead">Veraltete oder fehlerhafte Bonitätseinträge müssen nach <strong>EuGH C-413/23</strong> („SCHUFA/Hauptsache") <strong>spätestens nach 6 Monaten</strong> nach Restschuldbefreiung gelöscht werden.</p>
        <div class="splitview-news">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-group"><label>Auskunftei<select id="sl_auskunftei" onchange="updateSchufaPreset('sl');renderSchufaLoeschung()">
                <option value="SCHUFA Holding AG">SCHUFA Holding AG</option>
                <option value="CRIF Bürgel GmbH">CRIF Bürgel GmbH</option>
                <option value="Infoscore Consumer Data GmbH">Infoscore</option>
              </select></label></div>
              <div class="form-group"><label>Anschrift<textarea id="sl_auskunftei_adr" rows="2" oninput="renderSchufaLoeschung()">Kormoranweg 5, 65201 Wiesbaden</textarea></label></div>
              <div class="form-grid-2">
                <div class="form-group"><label>Dein Name<input type="text" id="sl_name" placeholder="Max Mustermann" oninput="renderSchufaLoeschung()"></label></div>
                <div class="form-group"><label>Geburtsdatum<input type="date" id="sl_birth" onchange="renderSchufaLoeschung()"></label></div>
              </div>
              <div class="form-group"><label>Deine Anschrift<textarea id="sl_addr" rows="2" oninput="renderSchufaLoeschung()"></textarea></label></div>
              <div class="form-group"><label>Bezeichnung des Eintrags<input type="text" id="sl_eintrag" placeholder="z.B. „Inkassoforderung XY GmbH"" oninput="renderSchufaLoeschung()"></label></div>
              <div class="form-group"><label>Vertragspartner / Gläubiger<input type="text" id="sl_gläubiger" placeholder="z.B. „Inkasso XYZ AG"" oninput="renderSchufaLoeschung()"></label></div>
              <div class="form-group"><label>Eintragungsdatum<input type="date" id="sl_datum" onchange="renderSchufaLoeschung()"></label></div>
              <div class="form-group"><label>Löschungsgrund<select id="sl_grund" onchange="renderSchufaLoeschung()">
                <option value="erledigt">Forderung beglichen / erledigt</option>
                <option value="falsch">Eintrag ist inhaltlich falsch</option>
                <option value="verjährt">Forderung verjährt</option>
                <option value="bestritten">Forderung wird bestritten</option>
                <option value="reschuldbefreiung">Restschuldbefreiung erteilt (EuGH C-413/23)</option>
              </select></label></div>
              <div class="form-group"><label>Begründung<textarea id="sl_begruendung" rows="2" placeholder="Optional – wird bei Standardgründen automatisch gesetzt" oninput="renderSchufaLoeschung()"></textarea></label></div>
              <div class="form-group"><label>Ton<select id="sl_tone" onchange="renderSchufaLoeschung()"><option value="friendly">🟢 Sachlich</option><option value="firm" selected>🟡 Bestimmt</option><option value="lawyer">🔴 Anwaltlich</option></select></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 LIVE-VORSCHAU</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief('sl')">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief('sl')">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-schufa_loeschung')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="sl_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ KI OPT-OUT + ROBOTS.TXT ============ -->
      <section class="view" id="view-ki_optout">
        <div class="eyebrow">🤖 KI & Web</div>
        <h2>KI-Training <span class="accent">Opt-Out</span> + robots.txt <span class="legal-pill">§ 44b UrhG</span></h2>
        <p class="lead">Widerspruchsschreiben an KI-Betreiber + passende <strong>robots.txt</strong>, um GPTBot, Google-Extended, Claude & Co. am Scraping deiner Werke zu hindern.</p>
        <div class="kitabs no-print">
          <button data-tab="letter" class="active" onclick="setKiTab('letter')">📨 Widerspruchs-Brief</button>
          <button data-tab="robots" onclick="setKiTab('robots')">🤖 robots.txt Generator</button>
        </div>

        <div id="ki-letter-tab">
          <div class="splitview-news">
            <div class="split-form no-print">
              <div class="card">
                <div class="form-grid-2">
                  <div class="form-group"><label>Ton<select id="ki_tone" onchange="renderKiOptout()"><option value="friendly">🟢 Sachlich</option><option value="firm" selected>🟡 Bestimmt</option><option value="lawyer">🔴 Anwaltlich</option></select></label></div>
                  <div class="form-group"><label>KI-Anbieter<select id="ki_anbieter" onchange="updateKiProvider();renderKiOptout()">
                    <option value="OpenAI Ireland Ltd">OpenAI (ChatGPT, GPT-4, Sora)</option>
                    <option value="Anthropic Ireland Ltd">Anthropic (Claude)</option>
                    <option value="Google Ireland Ltd">Google (Gemini, Search AI)</option>
                    <option value="Meta Platforms Ireland Ltd">Meta (Llama, Instagram-AI)</option>
                    <option value="Microsoft Ireland Operations Ltd">Microsoft (Copilot, Bing AI)</option>
                    <option value="Mistral AI SAS">Mistral AI</option>
                  </select></label></div>
                </div>
                <div class="form-group"><label>Anbieter-Anschrift<textarea id="ki_anbieter_adr" rows="2" oninput="renderKiOptout()"></textarea></label></div>
                <div class="form-group"><label>Dein Name<input type="text" id="ki_name" placeholder="Max Mustermann" oninput="renderKiOptout()"></label></div>
                <div class="form-group"><label>Deine Anschrift<textarea id="ki_addr" rows="2" oninput="renderKiOptout()"></textarea></label></div>
                <div class="form-group"><label>Betroffene Werke<textarea id="ki_werke" rows="3" placeholder="z.B. „alle Texte auf meinem Blog (example.com), alle meine Fotografien auf Instagram (@meinname), alle Tutorials auf YouTube"" oninput="renderKiOptout()"></textarea></label></div>
                <div class="form-group"><label>Rechtsgrundlage<select id="ki_rechtsgrundlage" onchange="renderKiOptout()">
                  <option value="urheberrecht">Urheberrecht (§ 44b UrhG + § 97 UrhG)</option>
                  <option value="dsgvo">DSGVO (Art. 21 Widerspruch)</option>
                  <option value="beide">Beides kombiniert</option>
                </select></label></div>
                <div class="form-group"><label>Beigefügte Belege<div class="cb-group" id="ki_receipts"><label class="cb"><input type="checkbox" data-r="werke-liste" checked> Werkliste / Links</label><label class="cb"><input type="checkbox" data-r="robots-screenshot" checked> Screenshot robots.txt</label><label class="cb"><input type="checkbox" data-r="ausweis"> Personalausweis-Kopie</label></div></label></div>
              </div>
            </div>
            <div class="split-preview">
              <div class="split-preview-bar no-print">
                <h4>📄 WIDERSPRUCHSBRIEF</h4>
                <div class="actions">
                  <button class="mini" onclick="copyBrief('ki')">📋 Kopieren</button>
                  <button class="mini" onclick="downloadBrief('ki')">⬇️ .txt</button>
                  <button class="btn primary sm" onclick="printView('view-ki_optout')">🖨️ Drucken / PDF</button>
                </div>
              </div>
              <div class="split-preview-body">
                <div class="letter-paper" id="ki_letter_out"></div>
              </div>
            </div>
          </div>
        </div>

        <div id="ki-robots-tab" style="display:none">
          <div class="splitview-news">
            <div class="split-form no-print">
              <div class="card">
                <div class="form-group"><label>Bot-Preset<select id="rb_preset" onchange="renderRobotsTxt()">
                  <option value="blockall">🛡️ Alle KI-Bots blocken (empfohlen)</option>
                  <option value="openai">Nur OpenAI (GPT, ChatGPT)</option>
                  <option value="google">Nur Google (Gemini, Search AI)</option>
                  <option value="meta">Nur Meta (Facebook, Instagram)</option>
                  <option value="pluscc">Plus Common Crawl (Trainingsdaten)</option>
                </select></label></div>
                <div class="form-group"><label>Zusätzliche Bots (Komma-separiert)<input type="text" id="rb_extra" placeholder="z.B. MyCustomBot,ScrapyBot" oninput="renderRobotsTxt()"></label></div>
                <div class="form-group"><label>Erlaubte Bereiche<select id="rb_allow" onchange="renderRobotsTxt()">
                  <option value="/">Alles (/)</option>
                  <option value="/blog/">Nur Blog</option>
                </select></label></div>
                <div class="form-group"><label>Kommentar oben<textarea id="rb_comment" rows="2" placeholder="z.B. „Widerspruch KI-Training nach § 44b UrhG"" oninput="renderRobotsTxt()"></textarea></label></div>
                <div style="margin-top:14px;padding:12px;background:var(--accent-soft);border-radius:8px;font-size:12px;color:var(--muted)">
                  💡 <strong>Tipp:</strong> Die Datei <code>robots.txt</code> im Hauptverzeichnis deiner Domain ablegen. Bots respektieren sie freiwillig – für <em>verbindlichen</em> Schutz zusätzlich <code>X-Robots-Tag</code> Header und Nutzungsbedingungen mit Vorbehalt.
                </div>
                <button class="btn primary sm" style="margin-top:14px" onclick="copyCode()">📋 Code in Zwischenablage kopieren</button>
                <button class="btn secondary sm" style="margin-top:14px;margin-left:6px" onclick="downloadCode()">⬇️ Als robots.txt herunterladen</button>
                <div id="rb_count" style="margin-top:10px;font-size:11px;color:var(--muted);font-family:var(--font-mono)"></div>
              </div>
            </div>
            <div>
              <h3 style="font-size:13px;margin:0 0 10px;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:1px;color:var(--muted)">🤖 robots.txt (Vorschau)</h3>
              <div class="code-block" id="rb_out"></div>
              <p style="margin-top:14px;font-size:12px;color:var(--muted);line-height:1.6">
                <strong style="color:var(--ink)">Rechtlicher Hinweis:</strong> robots.txt ist eine <em>freiwillige Konvention</em>. Verbindlich wird der Ausschluss erst durch (a) Vertragsklauseln in AGB/Nutzungsbedingungen, (b) HTTP-Header <code>X-Robots-Tag: noai, noimageai</code> und (c) im Streitfall durch eine einstweilige Verfügung gegen den konkreten Bot-Betreiber.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ WLAN-HAFTUNGSAUSSCHLUSS ============ -->
      <section class="view" id="view-wlan_haftung">
        <div class="eyebrow">🌐 Verträge</div>
        <h2>WLAN-<span class="accent">Haftungsausschluss</span></h2>
        <p class="lead">Vertragsvorlage für WGs, AirBnB-Gäste und private Gäste – sichert den Anschlussinhaber gegen <strong>Störerhaftung</strong> (BGH I ZR 121/08) und Filesharing-Abmahnungen ab.</p>
        <div class="splitview-news">
          <div class="split-form no-print">
            <div class="card">
              <div class="form-group"><label>Vertragsart<select id="wh_art" onchange="renderWlanHaftung()">
                <option value="wg">🏠 Wohngemeinschaft (Mitbewohner)</option>
                <option value="airbnb">🛏️ Ferienwohnung / Airbnb</option>
                <option value="gast">👤 Privater Gast / Besucher</option>
              </select></label></div>
              <div class="form-group"><label>Anschlussinhaber (Name)<input type="text" id="wh_anschluss" placeholder="Vermieter / Hauptanschluss" oninput="renderWlanHaftung()"></label></div>
              <div class="form-group"><label>Anschrift Anschluss<textarea id="wh_anschluss_adr" rows="2" oninput="renderWlanHaftung()"></textarea></label></div>
              <div class="form-group"><label>Nutzer / Gast (Name)<input type="text" id="wh_gast" placeholder="Mitbewohner / Gast" oninput="renderWlanHaftung()"></label></div>
              <div class="form-group"><label>Anschrift Nutzer<textarea id="wh_gast_adr" rows="2" oninput="renderWlanHaftung()"></textarea></label></div>
              <div class="form-group"><label>Zeitraum<input type="text" id="wh_zeitraum" placeholder="z.B. 01.01.2026 – 31.12.2026" value="01.01.2026 – 31.12.2026" oninput="renderWlanHaftung()"></label></div>
              <div class="form-group"><label>Zweck<textarea id="wh_zweck" rows="2" oninput="renderWlanHaftung()">private Mitbenutzung des WLAN-Anschlusses</textarea></label></div>
            </div>
          </div>
          <div class="split-preview">
            <div class="split-preview-bar no-print">
              <h4>📄 VERTRAGSVORLAGE</h4>
              <div class="actions">
                <button class="mini" onclick="copyBrief('wh')">📋 Kopieren</button>
                <button class="mini" onclick="downloadBrief('wh')">⬇️ .txt</button>
                <button class="btn primary sm" onclick="printView('view-wlan_haftung')">🖨️ Drucken / PDF</button>
              </div>
            </div>
            <div class="split-preview-body">
              <div class="letter-paper" id="wh_out"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ PASSWORT-GENERATOR ============ -->
      <section class="view" id="view-security_password">
        <div class="eyebrow">🔐 Security-Tools</div>
        <h2>Passwort-<span class="accent">Generator</span></h2>
        <p class="lead">Lokal in deinem Browser generiert, <strong>nichts wird übertragen</strong>. Mit Längeneinstellung, Kriterienfiltern und Echtzeit-Stärkeanzeige.</p>
        <div style="max-width:780px;margin:auto">
          <div class="pwd-display" onclick="copyPassword()" title="Klicken zum Kopieren">
            <span id="pwd_out" style="flex:1">– klick auf „Generieren" –</span>
            <small>📋 Klick zum Kopieren</small>
          </div>
          <div class="pwd-controls">
            <div class="pwd-length">
              <div class="pwd-length-label">
                <strong id="pwd_lenv">20</strong>
                <span>Zeichen Länge</span>
              </div>
              <input type="range" id="pwd_len" min="6" max="64" value="20" class="pwd-slider" oninput="regenPassword()">
            </div>
            <div class="pwd-criteria">
              <label><input type="checkbox" id="pwd_lower" checked onchange="regenPassword()"> a-z (Kleinbuchstaben)</label>
              <label><input type="checkbox" id="pwd_upper" checked onchange="regenPassword()"> A-Z (Großbuchstaben)</label>
              <label><input type="checkbox" id="pwd_digit" checked onchange="regenPassword()"> 0-9 (Ziffern)</label>
              <label><input type="checkbox" id="pwd_special" checked onchange="regenPassword()"> !@#\$% (Sonderzeichen)</label>
            </div>
            <div class="pwd-strength">
              <div class="pwd-strength-label">
                <span>Stärke: <strong id="pwd_strength_label">Sehr stark</strong></span>
                <span>Entropie: <strong id="pwd_entropy" style="font-family:var(--font-mono)">0 bit</strong> · <span id="pwd_countv"></span> Zeichen im Pool</span>
              </div>
              <div class="pwd-strength-bar"><i id="pwd_bar"></i></div>
            </div>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <button class="btn primary" onclick="regenPassword()">🔄 Neues Passwort generieren</button>
              <button class="btn secondary" onclick="copyPassword()">📋 In Zwischenablage</button>
            </div>
            <div style="padding:16px 18px;background:rgba(14,165,233,.08);border:1px solid var(--border);border-radius:10px;font-size:12px;line-height:1.7;color:var(--muted)">
              💡 <strong>Tipps für maximale Sicherheit:</strong> Mindestens 16 Zeichen · Kombinierte Zeichenklassen · Ein Passwort pro Account · Passwort-Manager nutzen (z. B. KeePass, Bitwarden) · 2FA aktivieren (siehe 2FA-Checkliste) · Niemals wiederverwenden.
            </div>
          </div>
        </div>
      </section>

      <!-- ============ 2FA-CHECKLISTE ============ -->
      <section class="view" id="view-security_tfa">
        <div class="eyebrow">🔐 Security-Tools</div>
        <h2>2FA-<span class="accent">Checkliste</span> für deine Accounts</h2>
        <p class="lead">Interaktive Checkliste zur sicheren Einrichtung der <strong>2-Faktor-Authentifizierung</strong> bei Google, Meta, Apple, PayPal, Microsoft und GitHub – mit Fortschrittsanzeige pro Anbieter.</p>
        <div class="tfa-grid" id="tfa_grid"></div>
        <div style="margin-top:18px;padding:14px 18px;background:var(--accent-soft);border-radius:10px;font-size:12px;line-height:1.7">
          💾 <strong>Fortschritt wird automatisch gespeichert</strong> in deinem Browser (localStorage, kein Cloud-Upload). Du kannst die Liste schrittweise durchgehen – sie bleibt erhalten.
        </div>
      </section>

      <!-- ============ RECHNER ============ -->
      <section class="view" id="view-rechner">
        <div class="eyebrow">🧮 Tools</div>
        <h1>3 <span class="accent">Rechner</span> für digitale Rechte</h1>
        <p class="lead">Abmahnkosten prüfen, Vertragsstrafen kalkulieren, Fristen berechnen — alle Tools basieren auf aktueller deutscher Rechtsprechung (Stand 2026).</p>

        <div class="grid-2">
          <div class="card">
            <div class="card-head"><h3>💰 Abmahnkosten-Rechner (RVG)</h3></div>
            <p style="font-size:12px;color:var(--muted);margin-bottom:12px">Berechnet die <strong>zulässigen Anwaltskosten</strong> nach RVG (Rechtsanwaltsvergütungsgesetz). Oft sind die geforderten Beträge überhöht.</p>
            <div class="form-grid-2">
              <div class="form-group"><label>Gegenstandswert (€)<input type="number" id="calc-gw" value="5000" min="100" step="100" oninput="calcAbmahn()"></label></div>
              <div class="form-group"><label>Verfahrensart<select id="calc-art" onchange="calcAbmahn()"><option value="aussergerichtlich">Außergerichtlich (Geschäftsgebühr 1,3)</option><option value="gerichtlich">Gerichtlich (Verfahrensgebühr 1,3)</option></select></label></div>
            </div>
            <div class="calc-result" id="calc-abmahn-result"></div>
          </div>

          <div class="card">
            <div class="card-head"><h3>⚖️ Vertragsstrafe-Rechner</h3></div>
            <p style="font-size:12px;color:var(--muted);margin-bottom:12px">Berechnet eine <strong>angemessene Vertragsstrafe</strong> für Unterlassungs-Erklärungen. Faustregel: max. 2x Streitwert, max. 2.000 € pro Verstoß.</p>
            <div class="form-grid-2">
              <div class="form-group"><label>Streitwert (€)<input type="number" id="calc-sw" value="5000" min="100" step="100" oninput="calcStrafe()"></label></div>
              <div class="form-group"><label>Verstoß-Wahrscheinlichkeit<select id="calc-risiko" onchange="calcStrafe()"><option value="niedrig">Niedrig (selten)</option><option value="mittel" selected>Mittel (gelegentlich)</option><option value="hoch">Hoch (wiederholt)</option></select></label></div>
            </div>
            <div class="calc-result" id="calc-strafe-result"></div>
          </div>

          <div class="card" style="grid-column:1/-1">
            <div class="card-head"><h3>💸 Schadensersatz-Rechner (Bewertung)</h3></div>
            <p style="font-size:12px;color:var(--muted);margin-bottom:12px">Berechnet eine <strong>Schadensersatz-Schätzung</strong> bei falschen Online-Bewertungen. Faktoren: Reichweite, Schwere, Dauer.</p>
            <div class="form-grid-3">
              <div class="form-group"><label>Sterne-Bewertung<input type="number" id="calc-sterne" value="1" min="1" max="5" oninput="calcSchaden()"></label></div>
              <div class="form-group"><label>Geschätzte Reichweite / Monat<input type="number" id="calc-reichweite" value="5000" min="0" step="100" oninput="calcSchaden()"></label></div>
              <div class="form-group"><label>Schwere<select id="calc-schwere" onchange="calcSchaden()"><option value="leicht">Leichte Falschaussage</option><option value="mittel" selected>Mittlere Beleidigung</option><option value="schwer">Schwere Verleumdung</option></select></label></div>
            </div>
            <div class="calc-result" id="calc-schaden-result"></div>
          </div>
        </div>
      </section>

      <!-- ============ FRIST-TRACKER ============ -->
      <section class="view" id="view-frist_tracker">
        <div class="eyebrow">⏰ Tools</div>
        <h1>Frist-<span class="accent">Tracker</span></h1>
        <p class="lead">Wichtige Fristen für deine aktiven digitalen Fälle. Speichere Daten und Anträge, behalte den Überblick.</p>

        <div class="card" style="margin-bottom:18px">
          <h3>📋 Neue Frist hinzufügen</h3>
          <div class="form-grid-3">
            <div class="form-group"><label>Was?<input type="text" id="fr-was" placeholder="z.B. DSGVO-Auskunft an Google"></label></div>
            <div class="form-group"><label>Versendet am<input type="date" id="fr-start"></label></div>
            <div class="form-group"><label>Frist in Tagen<input type="number" id="fr-tage" value="30" min="1" max="365"></label></div>
          </div>
          <div class="actions">
            <button class="btn primary" onclick="addFrist()">⏰ Frist starten</button>
          </div>
        </div>

        <h3 style="margin-bottom:14px">Aktive Fristen</h3>
        <div id="fristen-list" class="list"></div>
      </section>

      <!-- ============ ARCHIVE ============ -->
      <section class="view" id="view-archive">
        <div class="eyebrow">🗄️ System</div>
        <h1><span class="accent">Archiv</span> deiner Fälle</h1>
        <p class="lead">Alle generierten Briefe und Fristen werden lokal im Browser gespeichert. Backup als JSON-Datei regelmäßig empfohlen.</p>

        <div class="stats">
          <div class="stat">
            <div class="stat-icon">📋</div>
            <div class="stat-label">Aktive Fälle</div>
            <div class="stat-value" id="arch-falle">0</div>
          </div>
          <div class="stat">
            <div class="stat-icon">✉️</div>
            <div class="stat-label">Briefe generiert</div>
            <div class="stat-value" id="arch-briefe">0</div>
          </div>
          <div class="stat">
            <div class="stat-icon">⏰</div>
            <div class="stat-label">Aktive Fristen</div>
            <div class="stat-value" id="arch-fristen">0</div>
          </div>
          <div class="stat">
            <div class="stat-icon">📦</div>
            <div class="stat-label">Speicher</div>
            <div class="stat-value"><span id="arch-size">0</span><span class="unit">KB</span></div>
          </div>
        </div>

        <div class="card" style="margin-bottom:18px">
          <h3>💾 Backup & Export</h3>
          <div class="actions">
            <button class="btn primary" onclick="exportData()">⬇️ Backup exportieren (.json)</button>
            <button class="btn secondary" onclick="document.getElementById('importFile').click()">📥 Backup importieren</button>
            <input type="file" id="importFile" accept=".json" style="display:none">
          </div>
        </div>

        <div class="card">
          <h3>🗑️ System zurücksetzen</h3>
          <p style="font-size:13px;color:var(--muted)">Löscht alle Fälle, Briefe und Fristen. <strong>Unwiderruflich</strong>. Backup vorher erstellen!</p>
          <button class="btn danger" style="margin-top:12px" onclick="confirmReset()">⚠️ Alles löschen</button>
        </div>
      </section>

      <!-- ============ FAQ ============ -->
      <section class="view" id="view-faq">
        <div class="eyebrow">❓ Wissen kompakt</div>
        <h2>FAQ <span class="accent">&amp;</span> Glossar</h2>
        <p class="lead">Die wichtigsten Fragen zu DSGVO, Bewertungen, Social Media und Urheberrecht.</p>

        <div class="faq" style="margin-top:24px">
          <div class="faq-item open">
            <div class="faq-q">Was ist die DSGVO?</div>
            <div class="faq-a">Die <strong style="color:#fff">EU-Datenschutz-Grundverordnung (2016/679)</strong> gilt seit Mai 2018 in allen EU-Mitgliedstaaten. Sie regelt die Verarbeitung personenbezogener Daten. Wichtige Rechte: Auskunft (Art. 15), Löschung (Art. 17), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21), Beschwerde bei Aufsichtsbehörde (Art. 77).</div>
          </div>
          <div class="faq-item">
            <div class="faq-q">Wie lange muss ich auf eine DSGVO-Auskunft warten?</div>
            <div class="faq-a">Das Unternehmen muss innerhalb von <strong style="color:#fff">1 Monat</strong> antworten (Art. 12 III DSGVO). Bei komplexen Anfragen kann um 2 weitere Monate verlängert werden — das Unternehmen muss das aber <strong>innerhalb des ersten Monats</strong> mitteilen. Tut es das nicht, ist die Frist abgelaufen und du kannst dich beim LfDI beschweren.</div>
          </div>
          <div class="faq-item">
            <div class="faq-q">Muss eine negative Bewertung gelöscht werden?</div>
            <div class="faq-a">Eine <strong style="color:#fff">subjektive Meinung</strong> ("Service war mies") darf bleiben. Eine <strong style="color:#fff">falsche Tatsachenbehauptung</strong> ("Kunde wurde betrogen") muss gelöscht werden. Beleidigungen, Schmähkritik und Hasskommentare sind ebenfalls zu löschen. Die Abgrenzung Meinung vs. Tatsache ist oft streitig — im Zweifel Anwalt.</div>
          </div>
          <div class="faq-item">
            <div class="faq-q">Kann ich gegen eine Abmahnung Widerspruch einlegen?</div>
            <div class="faq-a">Ja. Eine Abmahnung ist <strong style="color:#fff">kein Schuldeingeständnis</strong>. Prüfe: Ist der Abmahner überhaupt Rechteinhaber? Ist der Streitwert angemessen? Sind die Anwaltskosten nach RVG korrekt? Wenn die Abmahnung unberechtigt ist: modifizierte Unterlassungserklärung abgeben (nicht die vorformulierte 1:1 unterschreiben!) oder Counter-Abmahnung mit Schadensersatzforderung senden.</div>
          </div>
          <div class="faq-item">
            <div class="faq-q">Was kostet eine modifizierte Unterlassungserklärung?</div>
            <div class="faq-a">Die Erklärung selbst kostet nichts. Aber: das <strong style="color:#fff">Vertragsstrafen-Versprechen</strong> ist wirtschaftlich bindend. Bei späterem Verstoß zahlt man die vereinbarte Strafe. Faustregel: <strong style="color:#fff">max. 2.000 € pro Verstoß</strong> ist üblich, 5.000+ € sind in der Regel überzogen. Verhandeln!</div>
          </div>
          <div class="faq-item">
            <div class="faq-q">Kann Instagram meinen Account einfach sperren?</div>
            <div class="faq-a">Ja, aber nur unter bestimmten Voraussetzungen. Meta darf Accounts sperren bei <strong style="color:#fff">Verstößen gegen die Gemeinschaftsstandards</strong>. Bei einmaligen Verstößen oft unverhältnismäßig. Du kannst Widerspruch einlegen, an die Schlichtungsstelle gehen oder beim LfDI Beschwerde einlegen (DSGVO-Verstoß, wenn keine Begründung gegeben wird).</div>
          </div>
          <div class="faq-item">
            <div class="faq-q">Sind die Daten in dieser App sicher?</div>
            <div class="faq-a">Ja. Alle Daten werden <strong style="color:#fff">ausschließlich lokal</strong> in deinem Browser (LocalStorage) gespeichert. Keine Cloud, keine Server, keine Tracker. Beim Browser-Cache löschen gehen die Daten verloren — regelmäßig Backup exportieren.</div>
          </div>
          <div class="faq-item">
            <div class="faq-q">Was ist DMCA?</div>
            <div class="faq-a">Der <strong style="color:#fff">Digital Millennium Copyright Act</strong> ist US-Recht, wird aber auch von deutschen Plattformen (YouTube, Twitter, Facebook) anerkannt. Mit einer DMCA-Notice kannst du von einer Plattform die Löschung urheberrechtlich geschützter Inhalte verlangen. Plattformen müssen innerhalb 24-72h reagieren.</div>
          </div>
          <div class="faq-item">
            <div class="faq-q">Was ist eine modifizierte Unterlassungserklärung?</div>
            <div class="faq-a">Eine <strong style="color:#fff">modifizierte</strong> Unterlassungserklärung erkennt die Forderung nur <strong style="color:#fff">konkludent</strong> an, nicht ausdrücklich. Das bedeutet: Du verpflichtest dich, das Verhalten zu unterlassen, ohne explizit zuzugeben, dass du rechtswidrig gehandelt hast. Vorteil: kein Schuldeingeständnis, Schutz vor überhöhten Schadensersatz-Forderungen. <strong style="color:#fff">Niemals die vom Gegner vorformulierte Erklärung 1:1 unterschreiben</strong> — Vertragsstrafe oft zu hoch.</div>
          </div>
          <div class="faq-item">
            <div class="faq-q">Muss ich bei Jameda gelistet sein?</div>
            <div class="faq-a">Nein. Der BGH hat 2018 entschieden, dass Jameda Ärzte <strong style="color:#fff">ohne Begründung aus dem Verzeichnis entfernen</strong> muss (Az. I ZR 109/17). Du kannst einfach schreiben "Bitte löschen Sie meinen Eintrag" — Jameda muss löschen. Es gibt auch ein <strong style="color:#fff">Jameda-Austrittsformular</strong>.</div>
          </div>
        </div>
      </section>

      <!-- ============ EINSTELLUNGEN ============ -->
      <section class="view" id="view-einstellungen">
        <div class="eyebrow">⚙️ System</div>
        <h2><span class="accent">Einstellungen</span></h2>

        <div class="grid-2">
          <div class="card">
            <h3 style="margin-bottom:12px">💾 Backup & Daten</h3>
            <p class="small muted" style="margin-bottom:14px">Sichere deine Daten regelmäßig. Die Datei ist nicht verschlüsselt.</p>
            <div class="actions">
              <button class="btn primary" onclick="exportData()">⬇️ Backup exportieren</button>
              <button class="btn secondary" onclick="document.getElementById('importFile').click()">📂 Backup laden</button>
              <button class="btn danger" onclick="confirmReset()">🗑️ Alles löschen</button>
            </div>
          </div>
          <div class="card">
            <h3 style="margin-bottom:12px">💡 Hinweise</h3>
            <p class="small muted">• Alle Daten bleiben ausschließlich auf deinem Gerät.</p>
            <p class="small muted" style="margin-top:6px">• <strong>Kein Ersatz</strong> für Rechtsberatung. Bei hohen Streitwerten (&gt; 5.000 €) oder komplexen Fällen: Anwalt konsultieren.</p>
            <p class="small muted" style="margin-top:6px">• <strong>DSGVO-Fristen zählen strikt</strong>: 1 Monat ohne Reaktion = Beschwerde beim LfDI möglich.</p>
            <p class="small muted" style="margin-top:6px">• <strong>Abmahnungen niemals ungeprüft unterschreiben</strong> — modifizierte Erklärung abgeben.</p>
          </div>
        </div>
      </section>

    </main>
  </div>
</div>

<div class="toast-container" id="toasts"></div>

<div class="modal-overlay" id="modalOverlay">
  <div class="modal">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
      <div>
        <div class="eyebrow" id="modal-eyebrow">Eintrag</div>
        <h3 id="modalTitle"></h3>
      </div>
      <button class="close-btn" id="modalClose">×</button>
    </div>
    <div id="modalBody"></div>
  </div>
</div>

<button class="mobile-toggle" onclick="document.querySelector('aside').classList.toggle('open')">☰</button>

` }}
    />
  );
}
