"use client";

import { useEffect, useRef } from 'react';
import './cockpit.css';

export default function AnzeigenCockpitNative() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (!window.html2pdf) {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      document.head.appendChild(script);
    }

    import('./logic.js').then((module) => {
      module.initCockpit();
    });

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div 
      className="cockpit-wrapper" 
      style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 100, backgroundColor: 'var(--bg-dark)', overflow: 'hidden' }}
      dangerouslySetInnerHTML={{ __html: `

<div class="module-strip">
    <div class="logo">⚖️ <span data-i18n="logoText">Anzeigen-Cockpit</span></div>
    <button class="module-chip active" data-mod="ueberlastung" onclick="switchModule('ueberlastung')">🚨 <span data-i18n="modUeberlastung">Überlastung</span></button>
    <button class="module-chip" data-mod="kindeswohl" onclick="switchModule('kindeswohl')">🛡️ <span data-i18n="modKindeswohl">Kindeswohl</span></button>
    <button class="module-chip" data-mod="strafanzeige" onclick="switchModule('strafanzeige')">🚔 <span data-i18n="modStrafanzeige">Strafanzeige</span></button>
    <button class="module-chip" data-mod="mietmangel" onclick="switchModule('mietmangel')">🏠 <span data-i18n="modMietmangel">Mietmangel</span></button>
    <div class="spacer"></div>
    <button class="head-btn" id="modeToggle" title="Dark/Light">◐</button>
    <button class="head-btn" id="langToggle" title="Sprache">DE</button>
    <button class="head-btn" id="resetBtn" title="Reset">↺</button>
</div>

<div class="app" id="app">

<aside class="sidebar">
    <div class="sidebar-header">
        <h2><span class="accent" id="moduleTitleIcon">🚨</span> <span id="moduleTitleText" data-i18n="modUeberlastung">Überlastung</span> <small>· <span data-i18n="sidebarSubtitle">Gefährdungsanzeige</span></small></h2>
    </div>

    <div class="tabbar">
        <button class="tabbtn active" data-tab="brief">📝 <span data-i18n="tabBrief">Brief</span></button>
        <button class="tabbtn" data-tab="vorfall">⚠️ <span data-i18n="tabVorfall">Vorfälle</span></button>
        <button class="tabbtn" data-tab="empfaenger">📬 <span data-i18n="tabRecipient">Empfänger</span></button>
        <button class="tabbtn" data-tab="eskalation">🚨 <span data-i18n="tabEskalation">Eskalation</span></button>
        <button class="tabbtn" data-tab="versand">📮 <span data-i18n="tabShip">Versand</span></button>
        <button class="tabbtn" data-tab="beweis">🔍 <span data-i18n="tabEvidence">Beweise</span></button>
    </div>

    <div class="sidebar-content">

        <!-- ===== BRIEF TAB (modul-spezifisch) ===== -->
        <div class="tab-pane active" data-pane="brief">
            <div class="alert-banner" id="briefAlert" data-i18n="alertUeberlastung">
                💡 <b>Haftungsschutz:</b> Diese Anzeige überträgt die Verantwortung für Fehler aus Personalmangel auf den Arbeitgeber.
            </div>

            <!-- Modul-spezifische Felder werden hier dynamisch eingefügt -->
            <div id="moduleFields"></div>

            <div class="section-title" data-i18n="sectTemplate">1. Schnell-Vorlage</div>
            <select id="template-select" onchange="loadTemplate()">
                <option value="" data-i18n="customOpt">-- Eigene Vorlage (Leer) --</option>
            </select>

            <div class="section-title" data-i18n="sectSubject">2. Betreff</div>
            <input type="text" id="in-subject" data-i18n-ph="subjPlaceholder" placeholder="Betreff der Anzeige">

            <div class="section-title">
                <span>3. <span data-i18n="sectBody">Haupttext</span></span>
                <span class="help" id="bodyCounter">0 / 5000</span>
            </div>
            <textarea id="in-body" rows="14" data-i18n-ph="bodyPlaceholder" placeholder=""></textarea>

            <div class="section-title">
                <span>4. <span data-i18n="sectArsenal">Rechtsgrundlagen-Arsenal</span></span>
                <span class="help" data-i18n="arsenalHelp">Klicken zum Hinzufügen</span>
            </div>
            <div class="info-banner" data-i18n="arsenalInfo">
                ⚖️ Wähle die passenden Rechtsgrundlagen — sie werden automatisch in den Brief eingefügt.
            </div>
            <div id="arsenalContainer"></div>
        </div>

        <!-- ===== VORFÄLLE ===== -->
        <div class="tab-pane" data-pane="vorfall">
            <div class="info-banner" data-i18n="vorfallInfo">
                📅 Dokumentiere jeden Vorfall — Datum, Zeit, was passiert ist, Zeugen.
            </div>
            <div class="section-title" data-i18n="sectNewIncident">Neuer Vorfall</div>
            <div class="flex-row">
                <div><label data-i18n="lblIncidentDate">Datum</label><input type="date" id="new-incident-date"></div>
                <div><label data-i18n="lblIncidentTime">Uhrzeit</label><input type="time" id="new-incident-time"></div>
            </div>
            <label data-i18n="lblIncidentCategory">Kategorie</label>
            <select id="new-incident-category"></select>
            <label data-i18n="lblIncidentDesc">Was ist passiert?</label>
            <textarea id="new-incident-desc" rows="3" placeholder=""></textarea>
            <label data-i18n="lblIncidentWitness">Zeugen (optional)</label>
            <input type="text" id="new-incident-witness">
            <button class="btn btn-primary" onclick="addIncident()" data-i18n="btnAddIncident">＋ Vorfall dokumentieren</button>
            <div class="section-title">
                <span data-i18n="sectIncidentList">Dokumentierte Vorfälle</span>
                <span class="help" id="incidentCount">(0)</span>
            </div>
            <div id="incidentList" class="incident-list"></div>
            <div class="flex-row" style="margin-top:6px">
                <button class="btn btn-ghost" onclick="incidentsToBody()" data-i18n="btnIncidentsToBody">→ In Brief übernehmen</button>
                <button class="btn btn-ghost btn-danger" onclick="clearIncidents()" data-i18n="btnClearIncidents">Alle löschen</button>
            </div>
        </div>

        <!-- ===== EMPFÄNGER ===== -->
        <div class="tab-pane" data-pane="empfaenger">
            <div class="info-banner" data-i18n="recipientInfo">
                📬 Mehrere Empfänger verwalten — Primary wird im Brief verwendet.
            </div>
            <div class="section-title" data-i18n="sectRecipients">Empfänger-Liste</div>
            <div id="recipientList"></div>
            <div class="section-title" data-i18n="sectNewRecipient">＋ Neuer Empfänger</div>
            <div class="flex-row">
                <div><label data-i18n="lblRName">Name / Stelle</label><input type="text" id="new-r-name"></div>
                <div><label data-i18n="lblRRole">Rolle</label><select id="new-r-role"></select></div>
            </div>
            <label data-i18n="lblRAddr">Anschrift</label>
            <textarea id="new-r-addr" rows="2"></textarea>
            <button class="btn btn-primary" onclick="addRecipient()" data-i18n="btnAddRecipient">＋ Empfänger hinzufügen</button>
        </div>

        <!-- ===== ESKALATION ===== -->
        <div class="tab-pane" data-pane="eskalation">
            <div class="alert-banner" data-i18n="eskalationInfo">
                🚨 Eskalation nur wenn Stufen davor nicht fruchten.
            </div>
            <div class="section-title" data-i18n="sectTimeline">Eskalations-Timeline</div>
            <div class="timeline" id="timelineContainer"></div>
            <div class="section-title" data-i18n="sectReaction">Reaktionsfrist</div>
            <div class="flex-row">
                <div><label data-i18n="lblFrist">Frist (Tage)</label><input type="number" id="in-frist" value="5" min="1" max="30"></div>
                <div>
                    <label data-i18n="lblReaction">Reaktion</label>
                    <select id="in-reaction">
                        <option value="offen" data-i18n="reactOpen">Noch offen</option>
                        <option value="teilweise" data-i18n="reactTeilweise">Teilweise Reaktion</option>
                        <option value="voll" data-i18n="reactVoll">Vollständig</option>
                        <option value="ignoriert" data-i18n="reactIgnoriert">Ignoriert</option>
                    </select>
                </div>
            </div>
            <div class="section-title" data-i18n="sectFristBerechnung">Frist-Berechnung</div>
            <div id="fristBerechnung" class="info-banner"></div>
        </div>

        <!-- ===== VERSAND ===== -->
        <div class="tab-pane" data-pane="versand">
            <div class="info-banner" data-i18n="versandInfo">📮 Versand-Art entscheidet über Beweiskraft.</div>
            <div class="section-title" data-i18n="sectShipMethod">Versand-Art wählen</div>
            <div class="ship-grid" id="shipMethodGrid">
                <button class="ship-card" data-ship="einschreiben" onclick="setShip(this)">
                    <div class="icon">📮</div>
                    <div class="name">Einschreiben</div>
                    <div class="desc" data-i18n="shipEinschreiben">Mit Rückschein</div>
                </button>
                <button class="ship-card" data-ship="persoenlich" onclick="setShip(this)">
                    <div class="icon">🤝</div>
                    <div class="name">Persönlich</div>
                    <div class="desc" data-i18n="shipPers">Gegen Bestätigung</div>
                </button>
                <button class="ship-card" data-ship="email" onclick="setShip(this)">
                    <div class="icon">📧</div>
                    <div class="name">E-Mail</div>
                    <div class="desc" data-i18n="shipEmail">Schnell</div>
                </button>
                <button class="ship-card" data-ship="fax" onclick="setShip(this)">
                    <div class="icon">📠</div>
                    <div class="name">Fax</div>
                    <div class="desc" data-i18n="shipFax">Mit Protokoll</div>
                </button>
            </div>
            <div class="section-title" data-i18n="sectTracking">Sendungs-Tracking</div>
            <div class="flex-row">
                <div><label data-i18n="lblSendungsnr">Sendungs-Nr.</label><input type="text" id="in-tracking"></div>
                <div><label data-i18n="lblSendDate">Versand-Datum</label><input type="text" id="in-ship-date" placeholder="TT.MM.JJJJ"></div>
            </div>
            <label data-i18n="lblShipNote">Notizen zum Versand</label>
            <textarea id="in-ship-note" rows="2"></textarea>
        </div>

        <!-- ===== BEWEISE ===== -->
        <div class="tab-pane" data-pane="beweis">
            <div class="info-banner" data-i18n="evidenceInfo">🔍 Beweissicherung entscheidet über Erfolg.</div>
            <div class="section-title" data-i18n="sectEvidenceChecklist">Checkliste Beweissicherung</div>
            <div class="evidence-grid" id="evidenceList"></div>
            <div class="section-title" data-i18n="sectAnonym">Anonymisierungs-Modus</div>
            <div class="info-banner" data-i18n="anonymInfo">🎭 Ersetze sensible Daten im PDF.</div>
            <label><input type="checkbox" id="in-anonymize" onchange="updatePreview()"> <span data-i18n="lblAnonym">Anonymisiertes PDF erzeugen</span></label>
        </div>

    </div>

    <div class="sidebar-footer">
        <button class="btn btn-ghost" onclick="copyLetter()" data-i18n="btnCopy">📋 Kopieren</button>
        <button class="btn btn-primary" onclick="exportPDF()">📄 <span data-i18n="btnPdf">PDF</span></button>
    </div>
</aside>

<main class="preview-area">
    <div class="a4-page" id="document-preview">
        <div class="module-stamp ueberlastung" id="moduleStamp" style="display:none">ÜBERLASTUNG</div>
        <div class="letter-header">
            <div class="col">
                <div class="sender-info">
                    <strong id="out-sender-name">—</strong><br>
                    <span id="out-sender-addr">—</span><br>
                    <span id="out-sender-extras" style="font-size:8pt;color:#888"></span>
                </div>
            </div>
            <div class="col right">
                <div class="receiver-info" id="out-receiver">—</div>
            </div>
        </div>
        <div class="date-info" id="out-date">—</div>
        <div class="subject-line" id="out-subject">—</div>
        <div class="letter-body" id="out-body"></div>
        <div class="letter-signature">
            Mit freundlichen Grüßen<br><br><br>
            <span id="out-sender-sign">—</span>
        </div>
        <div class="letter-meta" id="out-meta" style="display:none"></div>
    </div>
</main>

</div>


` }}
    />
  );
}
