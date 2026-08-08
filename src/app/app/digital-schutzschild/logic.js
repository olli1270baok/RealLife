export function initDigitalSchutzschild() {

// === ANTI-TAMPERING & BRANDING LOCK (Deaktiviert für native React-App) ===
// (function(){
//   document.addEventListener('contextmenu', e => e.preventDefault());
//   document.onkeydown = function(e){
//     if(e.keyCode === 123) return false;
//     if(e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) return false;
//     if(e.ctrlKey && e.keyCode === 85) return false;
//     if(e.ctrlKey && e.keyCode === 83) return false;
//   };
//   // setInterval(function(){(new Function("debugger"))();},500);
//   // Anti-Tamper check removed for Next.js compatibility
// })();

// === LANGUAGE TOGGLE (DE/EN) ===
let lang = localStorage.getItem('ds_lang') || 'de';
const T = (de, en) => lang === 'de' ? de : en;
const I18N = {
  // Brand & Header
  brandName: ['Digital-Schutzschild', 'Digital Shield'],
  brandNameAccent: ['SCHUTZSCHILD', 'SHIELD'],
  brandBadge: ['PRO v3.0', 'PRO v3.0'],
  brandTag: ['DSGVO · Bewertungen · Social Media · Urheberrecht', 'GDPR · Reviews · Social Media · Copyright'],
  // Sidebar
  navDashboard: ['Dashboard', 'Dashboard'],
  navDsgvoAuskunft: ['Auskunfts-Antrag', 'Access Request'],
  navDsgvoLoeschung: ['Löschungs-Antrag', 'Erasure Request'],
  navDsgvoBeschwerde: ['LfDI-Beschwerde', 'DPA Complaint'],
  navDsgvoSchaden: ['Schadensersatz Art. 82', 'Damages Art. 82'],
  navSchufaAuskunft: ['Gratis-Auskunft Art. 15', 'Free Info Art. 15'],
  navSchufaLoeschung: ['Schufa-Löschung', 'Schufa Erasure'],
  navBewGoogle: ['Google-Bewertung', 'Google Review'],
  navBewJameda: ['Jameda', 'Jameda'],
  navBewEbay: ['eBay / Amazon', 'eBay / Amazon'],
  navBewTrustpilot: ['Trustpilot', 'Trustpilot'],
  navSmInstagram: ['Instagram', 'Instagram'],
  navSmFacebook: ['Facebook', 'Facebook'],
  navSmYoutube: ['YouTube', 'YouTube'],
  navSmTiktok: ['TikTok', 'TikTok'],
  navUrhAbmahnung: ['Abmahnung erhalten', 'Cease & Desist Received'],
  navUrhUnterlassung: ['Modifizierte Unterlassung', 'Modified Cease & Desist'],
  navUrhCounter: ['Counter-Abmahnung', 'Counter-Cease & Desist'],
  navUrhDmca: ['DMCA-Notice', 'DMCA Notice'],
  navKiOptout: ['KI-Opt-Out + robots.txt', 'AI Opt-Out + robots.txt'],
  navWlanHaftung: ['WLAN-Haftungsausschluss', 'WiFi Liability Exclusion'],
  navSecurityPassword: ['Passwort-Generator', 'Password Generator'],
  navSecurityTfa: ['2FA-Checkliste', '2FA Checklist'],
  navRechner: ['3 Rechner', '3 Calculators'],
  navFristTracker: ['Frist-Tracker', 'Deadline Tracker'],
  navArchive: ['Archiv', 'Archive'],
  navFaq: ['FAQ', 'FAQ'],
  navEinstellungen: ['Einstellungen', 'Settings'],
  // Section headers
  navCatStart: ['Start', 'Start'],
  navCatDsgvo: ['DSGVO', 'GDPR'],
  navCatSchufa: ['Schufa & Bonität', 'Credit Score'],
  navCatBewertungen: ['Bewertungen', 'Reviews'],
  navCatSocial: ['Social Media', 'Social Media'],
  navCatUrheber: ['Urheberrecht', 'Copyright'],
  navCatKi: ['KI & Web', 'AI & Web'],
  navCatVertraege: ['Verträge', 'Contracts'],
  navCatSecurity: ['Security-Tools', 'Security Tools'],
  navCatTools: ['Tools', 'Tools'],
  navCatSystem: ['System', 'System'],
  // Header
  hdrBriefe: ['Briefe', 'Letters'],
  hdrFaelle: ['aktive Fälle', 'active cases'],
  // Hero
  heroPrefix: ['Dein', 'Your'],
  heroAccent: ['Schutzschild', 'Shield'],
  heroSuffix: ['für digitale Rechte.', 'for digital rights.'],
  heroLead1: ['DSGVO-Auskunft, negative Bewertungen löschen, Social-Media-Sperrung, Urheberrechts-Abmahnung —', 'GDPR access, delete negative reviews, social media blocking, copyright cease & desist —'],
  heroBriefGen: ['Brief-Generatoren', 'Letter Generators'],
  heroRechner: ['Rechner', 'Calculators'],
  heroTool: ['Tool', 'Tool'],
  heroOffline: ['Komplett offline, alle Daten lokal.', 'Completely offline, all data local.'],
  // KPI Cards
  kpiFaelle: ['Aktive Fälle', 'Active Cases'],
  kpiFaelleFoot: ['im Browser-Cache', 'in browser cache'],
  kpiBriefe: ['Briefe generiert', 'Letters generated'],
  kpiBriefeFoot: ['druckfertig', 'print-ready'],
  kpiFristen: ['Fristen aktiv', 'Active Deadlines'],
  kpiFristenFoot: ['laufende Tracker', 'running trackers'],
  kpiAbmahn: ['Abmahnkosten', 'C&D Costs'],
  kpiAbmahnFoot: ['gesparte Kosten', 'saved costs'],
  // Section headers
  schnellstartH: ['Was ist passiert?', 'What happened?'],
  schnellstartAccent: ['Schnellstart', 'Quick start'],
  grundlagenH: ['Rechtliche Grundlagen', 'Legal Basis'],
  // Helper cards
  cardDsgvoAuskunft: ['DSGVO Auskunft', 'GDPR Access'],
  cardDsgvoAuskunftDesc: ['Du willst wissen, was ein Unternehmen über dich speichert? Art. 15 DSGVO.', 'Want to know what a company stores about you? Art. 15 GDPR.'],
  cardLoeschung: ['Löschung beantragen', 'Request Erasure'],
  cardLoeschungDesc: ['"Recht auf Vergessenwerden" — Art. 17 DSGVO.', '"Right to be forgotten" — Art. 17 GDPR.'],
  cardBewertung: ['Bewertung löschen', 'Delete Review'],
  cardBewertungDesc: ['Google, Jameda, eBay, Trustpilot — falsche oder ehrenrührige Bewertungen.', 'Google, Jameda, eBay, Trustpilot — false or defamatory reviews.'],
  cardAccount: ['Account gesperrt?', 'Account blocked?'],
  cardAccountDesc: ['Instagram, Facebook, YouTube, TikTok — Widerspruch gegen Sperrung.', 'Instagram, Facebook, YouTube, TikTok — object to blocking.'],
  cardAbmahnung: ['Abmahnung erhalten', 'C&D Received'],
  cardAbmahnungDesc: ['Erste Schritte, Fristen, modifizierte Unterlassung — schnell reagieren.', 'First steps, deadlines, modified cease & desist — react fast.'],
  cardKosten: ['Kosten prüfen', 'Check Costs'],
  cardKostenDesc: ['Abmahnkosten, Vertragsstrafen, Frist-Tracker.', 'C&D costs, contract penalties, deadline tracker.'],
  // Footer
  footerNoCloud: ['Keine Cloud', 'No Cloud'],
  // Legal cards
  legalDsgvo: ['DSGVO', 'GDPR'],
  legalDsgvoDesc: ['EU-Datenschutz-Grundverordnung. Auskunft (Art. 15), Löschung (Art. 17), Datenübertragbarkeit (Art. 20), Beschwerde (Art. 77).', 'EU General Data Protection Regulation. Access (Art. 15), Erasure (Art. 17), Data Portability (Art. 20), Complaint (Art. 77).'],
  legalTmg: ['TMG / NetzDG', 'TMG / NetzDG'],
  legalTmgDesc: ['Telemediengesetz + Netzwerkdurchsetzungsgesetz. Verantwortlichkeit von Plattformen für Inhalte. Lösch-Ansprüche an Plattformen.', 'German Telemedia Act + Network Enforcement Act. Platform liability for content. Deletion claims against platforms.'],
  legalUrhg: ['UrhG', 'Copyright Act'],
  legalUrhgDesc: ['Urheberrechtsgesetz. Unterlassungs-Ansprüche (§ 97), Abmahnung (§ 97a), Schadensersatz (§ 97 II). DMCA für internationale Fälle.', 'German Copyright Act. Injunctive relief (§ 97), cease & desist (§ 97a), damages (§ 97 II). DMCA for international cases.'],
  // Common UI
  loading: ['Lädt...', 'Loading...'],
  saved: ['Gespeichert', 'Saved'],
  copy: ['Kopieren', 'Copy'],
  copied: ['Kopiert!', 'Copied!'],
  download: ['Herunterladen', 'Download'],
  print: ['Drucken', 'Print'],
  back: ['Zurück', 'Back'],
  next: ['Weiter', 'Next'],
  save: ['Speichern', 'Save'],
  cancel: ['Abbrechen', 'Cancel'],
  delete: ['Löschen', 'Delete'],
  edit: ['Bearbeiten', 'Edit'],
  send: ['Senden', 'Send'],
  generate: ['Generieren', 'Generate'],
  // Empty
  empty: ['Noch keine Einträge', 'No entries yet']
};
function toggleLang(){
  lang = lang === 'de' ? 'en' : 'de';
  localStorage.setItem('ds_lang', lang);
  document.documentElement.setAttribute('data-lang', lang);
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = lang === 'de' ? '🌐 DE' : '🌐 EN';
  applyI18n();
}
function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (I18N[key]) el.textContent = lang === 'de' ? I18N[key][0] : I18N[key][1];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (I18N[key]) el.placeholder = lang === 'de' ? I18N[key][0] : I18N[key][1];
  });
  // Re-render dynamic content that uses I18N directly
  if (typeof renderStats === 'function') try { renderStats(); } catch(e) {}
  if (typeof renderDashboard === 'function') try { renderDashboard(); } catch(e) {}
}
document.documentElement.setAttribute('data-lang', lang);
setTimeout(applyI18n, 100);

// === UTILS ===
const $ = id => document.getElementById(id);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,5);
const today = () => new Date().toLocaleDateString('de-DE');
const todayISO = () => new Date().toISOString().split('T')[0];
const formatDate = v => v ? new Date(v).toLocaleDateString('de-DE') : '—';
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// === LETTER DISPATCHER (für oninput="renderBrief(N)") ===
function renderBrief(num){
  const fn = window['renderBrief'+num];
  if(typeof fn === 'function') fn();
}

// === TOAST ===
function toast(msg, type='info', sub=''){
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const ico = {success:'✓', danger:'✕', warn:'!', info:'ℹ'}[type] || 'ℹ';
  t.innerHTML = `<span style="font-size:16px">${ico}</span><div style="flex:1">${msg}${sub?`<small style="display:block;color:var(--muted);margin-top:2px">${sub}</small>`:''}</div>`;
  document.getElementById('toasts').appendChild(t);
  setTimeout(()=>{t.style.animation='toastOut .3s forwards';setTimeout(()=>t.remove(),300)}, 3500);
}

// === MODAL ===
function openModal(){ document.getElementById('modalOverlay').classList.add('open'); }
function closeModal(){ document.getElementById('modalOverlay').classList.remove('open'); }
document.getElementById('modalClose').onclick = closeModal;
document.getElementById('modalOverlay').onclick = e => { if(e.target.id==='modalOverlay') closeModal(); };

// === NAVIGATION ===
function switchView(viewId){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.navbtn').forEach(b=>b.classList.toggle('active', b.dataset.view === viewId));
  document.getElementById('view-'+viewId).classList.add('active');
  document.querySelector('.main').scrollTop = 0;
  document.querySelector('aside')?.classList.remove('open');
  const titles = {
    dashboard:'Dashboard',
    dsgvo_auskunft:'Auskunfts-Antrag', dsgvo_loeschung:'Löschungs-Antrag', dsgvo_beschwerde:'LfDI-Beschwerde',
    dsgvo_schaden:'Schadensersatz Art. 82',
    schufa_auskunft:'Schufa Gratis-Auskunft', schufa_loeschung:'Schufa-Löschung',
    bew_google:'Google-Bewertung', bew_jameda:'Jameda', bew_ebay:'eBay/Amazon', bew_trustpilot:'Trustpilot',
    sm_instagram:'Instagram', sm_facebook:'Facebook', sm_youtube:'YouTube', sm_tiktok:'TikTok',
    urh_abmahnung:'Abmahnung', urh_unterlassung:'Unterlassung', urh_counter:'Counter-Abmahnung', urh_dmca:'DMCA-Notice',
    ki_optout:'KI-Opt-Out + robots.txt',
    wlan_haftung:'WLAN-Haftungsausschluss',
    security_password:'Passwort-Generator', security_tfa:'2FA-Checkliste',
    rechner:'3 Rechner', frist_tracker:'Frist-Tracker',
    archive:'Archiv', faq:'FAQ', einstellungen:'Einstellungen'
  };
  const cur = document.getElementById('current-title');
  if(cur) cur.textContent = titles[viewId] || viewId;
  if(viewId === 'dashboard') renderDashboard();
  if(viewId === 'rechner'){ calcAbmahn(); calcStrafe(); calcSchaden(); }
  if(viewId === 'frist_tracker') renderFristen();
  if(viewId === 'archive') renderArchive();
  if(viewId === 'dsgvo_schaden') renderDsgvoSchaden();
  if(viewId === 'schufa_auskunft') renderSchufaAuskunft();
  if(viewId === 'schufa_loeschung') renderSchufaLoeschung();
  if(viewId === 'ki_optout'){ renderKiOptout(); renderRobotsTxt(); }
  if(viewId === 'wlan_haftung') renderWlanHaftung();
  if(viewId === 'security_password') regenPassword();
  if(viewId === 'security_tfa') renderTfaCheckliste();
  if(viewId === 'fa'){}
  // Briefe 1-14 — initial render (so user sees content, not empty letter)
  const briefMap = {dsgvo_auskunft:1, dsgvo_loeschung:2, dsgvo_beschwerde:3, bew_google:4, bew_jameda:5, bew_ebay:6, bew_trustpilot:7, sm_instagram:8, sm_facebook:9, sm_youtube:10, sm_tiktok:11, urh_unterlassung:12, urh_counter:13, urh_dmca:14};
  if(briefMap[viewId]) {
    try { window['renderBrief'+briefMap[viewId]]?.(); }
    catch(e) { console.error('[switchView] renderBrief failed', viewId, e); }
  }
}
document.querySelectorAll('.navbtn').forEach(b => b.addEventListener('click', () => switchView(b.dataset.view)));
document.querySelector('aside').addEventListener('click', e => { if(e.target.classList.contains('navbtn')) document.querySelector('aside').classList.remove('open'); });

// === STATE ===
const STORE = 'vb_schuetzschild_v1';
function def(){ return {
  letters: [],
  fristen: [],
  counters: {briefe:0, faelle:0}
};}

let state = def();
try{ const s = localStorage.getItem(STORE); if(s) state = Object.assign(def(), JSON.parse(s)); }catch(e){}

function save(){
  try{
    localStorage.setItem(STORE, JSON.stringify(state));
  }catch(e){
    // Quota exceeded — auto-cleanup old done deadlines
    if (e && (e.name === 'QuotaExceededError' || e.code === 22)) {
      console.warn('[save] Quota exceeded, cleaning up old done deadlines');
      const before = state.fristen.length;
      state.fristen = state.fristen.filter(f => !f.erledigt);
      try {
        localStorage.setItem(STORE, JSON.stringify(state));
        if (typeof toast === 'function') toast(`Speicher voll — ${before - state.fristen.length} alte Einträge entfernt`, 'warn');
      } catch(e2) {
        console.error('[save] Still quota-exceeded after cleanup, clearing store', e2);
        try { localStorage.removeItem(STORE); } catch(e3) {}
        if (typeof toast === 'function') toast('Speicher kritisch voll — Daten gelöscht', 'danger');
      }
    } else {
      console.error('[save] Unexpected error', e);
    }
  }
  renderStats();
}

function renderStats(){
  $('stat-briefe').textContent = state.counters.briefe || 0;
  $('stat-falle').textContent = state.letters.length;
  $('stat-fristen').textContent = state.fristen.filter(f => !f.erledigt).length;
  $('stat-eur').innerHTML = (state.counters.gespart || 0).toLocaleString('de-DE') + '<span class="unit">€</span>';
  const hdr = $('hdrStat');
  if(hdr) hdr.innerHTML = `Σ <b>${state.counters.briefe||0}</b> ${I18N.hdrBriefe[lang==='de'?0:1]} · <b>${state.fristen.filter(f=>!f.erledigt).length}</b> ${I18N.hdrFaelle[lang==='de'?0:1]}`;
}
function renderDashboard(){
  // DRY: same stat update logic, also safe-guards (no-op if elements missing)
  if ($('stat-briefe')) $('stat-briefe').textContent = state.counters.briefe || 0;
  if ($('stat-falle')) $('stat-falle').textContent = state.letters.length;
  if ($('stat-fristen')) $('stat-fristen').textContent = state.fristen.filter(f => !f.erledigt).length;
  if ($('stat-eur')) $('stat-eur').innerHTML = (state.counters.gespart || 0).toLocaleString('de-DE') + '<span class="unit">€</span>';
}

function renderDashboard(){
  $('stat-briefe').textContent = state.counters.briefe || 0;
  $('stat-falle').textContent = state.letters.length;
  $('stat-fristen').textContent = state.fristen.filter(f => !f.erledigt).length;
  $('stat-eur').innerHTML = (state.counters.gespart || 0).toLocaleString('de-DE') + '<span class="unit">€</span>';
}

// === TONE ENGINE ===
const TONE = {
  friendly: {greet:'Sehr geehrte Damen und Herren,', close:'Mit freundlichen Grüßen', frist:'14 Tagen',  eskal:'',  harte:false},
  firm:     {greet:'Sehr geehrte Damen und Herren,', close:'Mit freundlichen Grüßen', frist:'14 Tagen',  eskal:'<p>Sollten Sie nicht innerhalb der genannten Frist reagieren, behalte ich mir weitere rechtliche Schritte vor.</p>', harte:false},
  lawyer:   {greet:'Sehr geehrte Damen und Herren,', close:'Mit freundlichen Grüßen', frist:'7 Tagen',   eskal:'<p><strong>Letztmalig fordere ich Sie auf.</strong> Andernfalls werde ich ohne weitere Ankündigung rechtliche Schritte einleiten und einen Rechtsanwalt beauftragen. Die Kosten tragen Sie.</p>', harte:true}
};
function getTone(prefix){
  return TONE[$(prefix+'_tone')?.value || 'firm'];
}

// === RECEIPTS ENGINE ===
function getReceipts(prefix){
  const list = $(prefix+'_receipts'); if(!list) return [];
  return Array.from(list.querySelectorAll('input[type=checkbox]:checked'))
    .map(cb => (cb.parentElement.textContent || '').trim())
    .filter(Boolean);  // skip empty
}
function renderReceiptsBlock(prefix){
  const r = getReceipts(prefix);
  if(!r.length) return '';
  return `<div class="lp-attachments"><b>Anlagen</b><ul>${r.map(x=>`<li>${x}</li>`).join('')}</ul></div>`;
}

// === LETTER HELPERS ===
// SAFE getter: returns default if element missing OR value empty
const safeVal = (id, fallback) => {
  const el = $(id);
  if (!el) return fallback;  // Element missing (e.g. wrong tab active)
  return el.value || fallback;  // Empty string also falls back
};
function getLetterData(prefix){
  return {
    name: safeVal(prefix+'_name', '[Dein Name]'),
    addr: safeVal(prefix+'_addr', '[Deine Straße, PLZ Ort]'),
    // Optional: IBAN/BIC for Schadensersatz-Brief
    iban: safeVal(prefix+'_iban', ''),
    bic: safeVal(prefix+'_bic', ''),
    // Optional: birth for Schufa-Brief
    birth: safeVal(prefix+'_birth', '')
  };
}
function letterHeader(label){
  return `<div class="lp-header"><div class="lp-brand">DIGITAL-SCHUTZSCHILD · ${label}</div><div class="lp-meta">DSGVO · TMG · UrhG · Generiert ${today()}</div></div>`;
}
function letterFoot(){
  return `<div class="lp-foot">DIGITAL-SCHUTZSCHILD PRO · Vorlagenbude · v3.0 · Rechtliche Vorlage ohne Gewähr</div>`;
}

// ============================================================
// === BRIEF 1: DSGVO AUSKUNFT (Art. 15) ===
// ============================================================
function renderBrief1(){
  const d = getLetterData('b1');
  const firma = safeVal('b1_firma', '[Firmenname]');
  const firmaAdr = safeVal('b1_firma_adr', '[Anschrift]');
  const empf = safeVal('b1_empf', 'allgemein');
  const idArt = safeVal('b1_id', 'kopie');
  const extras = safeVal('b1_extras', '');
  const tone = getTone('b1');
  const frist = tone.frist;

  const empfPreset = {
    allgemein: {anrede:'Sehr geehrte Damen und Herren,', hinweis:''},
    social: {anrede:'Sehr geehrte Damen und Herren,', hinweis:'<p>Ich weise darauf hin, dass Sie als Plattform-Betreiber gemäß Art. 4 Nr. 7 DSGVO Verantwortlicher für die Verarbeitung meiner personenbezogenen Daten sind und die DSGVO unmittelbar anwendbar ist (EuGH C-230/14, "Weltimmo").</p>'},
    online: {anrede:'Sehr geehrte Damen und Herren,', hinweis:''},
    arbeitgeber: {anrede:'Sehr geehrte Damen und Herren,', hinweis:'<p>Im Beschäftigungsverhältnis sind Sie als Arbeitgeber gemäß § 26 BDSG Verantwortlicher für die Verarbeitung meiner Beschäftigtendaten.</p>'},
    other: {anrede:'Sehr geehrte Damen und Herren,', hinweis:''}
  };

  $('b1_out').innerHTML = `
    ${letterHeader('Auskunfts-Antrag Art. 15 DSGVO')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}</div>
    <div class="recipient">An:<br>${esc(firma)}<br>${esc(firmaAdr).replace(/\n/g,'<br>')}</div>
    <div class="date">${today()}</div>
    <div class="subject">Auskunfts-Antrag gemäß Art. 15 DSGVO</div>
    <p>${empfPreset[empf].anrede}</p>
    ${empfPreset[empf].hinweis}
    <p>hiermit mache ich von meinem <strong>Auskunftsrecht nach Art. 15 DSGVO</strong> Gebrauch und bitte Sie, mir innerhalb der gesetzlichen Frist von <strong>${frist}</strong> folgende Informationen zu übermitteln:</p>
    <ol style="margin:8px 0 14px 24px;line-height:1.7">
      <li>Bestätigung, ob Sie personenbezogene Daten von mir verarbeiten</li>
      <li>Kategorien und konkrete Datenpunkte der verarbeiteten Daten</li>
      <li>Verarbeitungszwecke</li>
      <li>Empfänger oder Kategorien von Empfängern</li>
      <li>Speicherdauer bzw. Kriterien für die Festlegung</li>
      <li>Herkunft der Daten (falls nicht bei mir erhoben)</li>
      <li>Profiling-Informationen (Art. 22 DSGVO) sofern zutreffend</li>
    </ol>
    ${extras?`<p>${esc(extras).replace(/\n/g,'<br>')}</p>`:''}
    <p>Die Auskunft ist gemäß <strong>Art. 12 III DSGVO</strong> kostenlos. Eine Fristverlängerung um 2 Monate ist nur unter den Voraussetzungen des Art. 12 III DSGVO und mit Mitteilung innerhalb des ersten Monats zulässig.</p>
    ${renderReceiptsBlock('b1')}
    <p>Ich bitte um Zusendung der Auskunft an meine oben genannte Anschrift oder in elektronischer Form.</p>
    ${tone.eskal}
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `;
}

// ============================================================
// === BRIEF 2: DSGVO LÖSCHUNG (Art. 17) ===
// ============================================================
function renderBrief2(){
  const d = getLetterData('b2');
  const firma = safeVal('b2_firma', '[Firmenname]');
  const firmaAdr = safeVal('b2_firma_adr', '[Anschrift]');
  const grund = safeVal('b2_grund', 'zweck_entfaellt');
  const daten = safeVal('b2_daten', '[konkrete Daten]');
  const extras = safeVal('b2_extras', '');
  const tone = getTone('b2');

  const grundTxt = {
    zweck_entfaellt: 'der Zweck der Verarbeitung ist entfallen',
    einwilligung_widerruf: 'ich widerrufe meine Einwilligung (Art. 7 III DSGVO) und es liegt keine andere Rechtsgrundlage vor',
    widerspruch: 'ich lege Widerspruch nach Art. 21 DSGVO ein und es liegen keine zwingenden schutzwürdigen Gründe Ihrerseits vor',
    unrechtmaessig: 'die Verarbeitung ist unrechtmäßig',
    rechtliche_pflicht: 'die Löschung ist zur Erfüllung einer rechtlichen Pflicht erforderlich'
  };

  $('b2_out').innerHTML = `
    ${letterHeader('Löschungs-Antrag Art. 17 DSGVO')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}</div>
    <div class="recipient">An:<br>${esc(firma)}<br>${esc(firmaAdr).replace(/\n/g,'<br>')}</div>
    <div class="date">${today()}</div>
    <div class="subject">Antrag auf Löschung gemäß Art. 17 DSGVO</div>
    <p>Sehr geehrte Damen und Herren,</p>
    <p>hiermit beantrage ich gemäß <strong>Art. 17 DSGVO</strong> die unverzügliche Löschung der folgenden personenbezogenen Daten:</p>
    <p style="margin:8px 0;padding:10px;background:#f8f8f8;border-left:3px solid var(--accent)"><strong>${esc(daten).replace(/\n/g,'<br>')}</strong></p>
    <p>Begründung: ${grundTxt[grund]}.</p>
    ${extras?`<p>${esc(extras).replace(/\n/g,'<br>')}</p>`:''}
    <p>Nach <strong>Art. 17 I DSGVO</strong> sind Sie verpflichtet, diese Daten unverzüglich zu löschen, sofern einer der in Art. 17 I genannten Gründe vorliegt. Ausnahmen nach Art. 17 III DSGVO (z.B. Erfüllung gesetzlicher Pflichten, Geltendmachung von Rechtsansprüchen) müssen Sie konkret darlegen.</p>
    <p>Ich weise darauf hin, dass Sie gemäß <strong>Art. 19 DSGVO</strong> allen Empfängern, denen die Daten offengelegt wurden, die Löschung mitzuteilen haben.</p>
    <p>Ich bitte um Bestätigung der Löschung innerhalb von <strong>${tone.frist}</strong>. Erfolgt keine Reaktion, behalte ich mir eine Beschwerde bei der zuständigen Datenschutz-Aufsichtsbehörde vor.</p>
    ${renderReceiptsBlock('b2')}
    ${tone.eskal}
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `;
}

// ============================================================
// === BRIEF 3: LfDI-Beschwerde ===
// ============================================================
const LfDI = {
  bw: 'Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg, Königstraße 10a, 70173 Stuttgart',
  by: 'Bayerisches Landesamt für Datenschutzaufsicht, Promenade 18, 91522 Ansbach',
  be: 'Berliner Beauftragte für Datenschutz und Informationsfreiheit, Friedrichstr. 219, 10969 Berlin',
  bb: 'Landesbeauftragte für den Datenschutz und für das Recht auf Akteneinsicht Brandenburg, Stahnsdorfer Damm 77, 14532 Kleinmachnow',
  hb: 'Die Landesbeauftragte für Datenschutz und Informationsfreiheit der Freien Hansestadt Bremen, Arndtstraße 1, 27570 Bremerhaven',
  hh: 'Hamburgische Beauftragte für Datenschutz und Informationsfreiheit, Ludwig-Erhard-Straße 22, 20459 Hamburg',
  he: 'Hessischer Beauftragter für Datenschutz und Informationsfreiheit, Gustav-Stresemann-Ring 1, 65189 Wiesbaden',
  mv: 'Landesbeauftragter für Datenschutz und Informationsfreiheit Mecklenburg-Vorpommern, Lennéstraße 1, 19053 Schwerin',
  ni: 'Landesbeauftragte für den Datenschutz Niedersachsen, Prinzenstraße 5, 30159 Hannover',
  nw: 'Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2-4, 40213 Düsseldorf',
  rp: 'Landesbeauftragter für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz, Hintere Bleiche 34, 55116 Mainz',
  sl: 'Unabhängiges Datenschutzzentrum Saarland, Fritz-Dobisch-Straße 12, 66111 Saarbrücken',
  sn: 'Sächsische Datenschutz- und Transparenzbeauftragte, Maternistraße 17, 01067 Dresden',
  st: 'Landesbeauftragter für den Datenschutz und die Informationsfreiheit Sachsen-Anhalt, Leiterstraße 9, 39104 Magdeburg',
  sh: 'Unabhängiges Landeszentrum für Datenschutz Schleswig-Holstein, Holstenstraße 98, 24103 Kiel',
  th: 'Thüringer Landesbeauftragter für den Datenschutz und die Informationsfreiheit, Häßlerstraße 8, 99096 Erfurt',
  bfdi: 'Bundesbeauftragter für den Datenschutz und die Informationsfreiheit, Bonn'
};

function renderBrief3(){
  const d = getLetterData('b3');
  const bl = safeVal('b3_bl', 'bw');
  const art = safeVal('b3_art', 'auskunft');
  const firma = safeVal('b3_firma', '[Firmenname]');
  const datum = formatDate($('b3_datum').value);
  const sachverhalt = safeVal('b3_sachverhalt', '[Sachverhalt]');
  const tone = getTone('b3');

  const artTxt = {
    auskunft: 'Auskunfts-Antrag (Art. 15 DSGVO) wurde ignoriert',
    loeschung: 'Löschungs-Antrag (Art. 17 DSGVO) wurde ignoriert',
    widerspruch: 'Widerspruch (Art. 21 DSGVO) wurde nicht beachtet',
    einwilligung: 'Einwilligung (Art. 7 DSGVO) wurde nicht respektiert',
    datenleck: 'Datenleck nicht gemeldet (Art. 34 DSGVO)',
    andere: 'andere DSGVO-Verletzung'
  };

  $('b3_out').innerHTML = `
    ${letterHeader('Beschwerde nach Art. 77 DSGVO')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}</div>
    <div class="recipient">An:<br>${LfDI[bl].replace(/\n/g,'<br>')}</div>
    <div class="date">${today()}</div>
    <div class="subject">Beschwerde gemäß Art. 77 DSGVO gegen ${esc(firma).replace(/\n/g,'<br>')}</div>
    <p>${tone.greet}</p>
    <p>hiermit erhebe ich <strong>Beschwerde nach Art. 77 DSGVO</strong> gegen das oben genannte Unternehmen wegen folgender DSGVO-Verletzung:</p>
    <p style="margin:8px 0;padding:10px;background:#f8f8f8;border-left:3px solid var(--accent)"><strong>${artTxt[art]}</strong></p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Sachverhalt</h4>
    <p>${esc(sachverhalt).replace(/\n/g,'<br>')}</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Bisheriger Verfahrensgang</h4>
    <p>• <strong>${datum}</strong>: Ursprünglicher Antrag an das Unternehmen gestellt</p>
    <p>• Bis heute: keine oder unzureichende Reaktion</p>
    <p>• Frist nach Art. 12 III DSGVO abgelaufen</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Rechtsgrundlage</h4>
    <p>Rechtsgrundlage: <strong>Art. 77 I DSGVO</strong> — Jede betroffene Person hat das Recht, bei einer Aufsichtsbehörde Beschwerde einzulegen. Die Beschwerde ist gemäß Art. 78 I DSGVO unabhängig von anderen Rechtsbehelfen zulässig.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Bitte</h4>
    <p>Ich bitte Sie, den Sachverhalt zu prüfen und das Unternehmen aufzufordern, die DSGVO-Verletzung zu beheben. Ihnen stehen gemäß <strong>Art. 58 DSGVO</strong> umfangreiche Befugnisse zu (Auskunft, Anweisung, Bußgeld bis 20 Mio. €).</p>
    ${renderReceiptsBlock('b3')}
    ${tone.eskal}
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `;
}

// ============================================================
// === BRIEF 4: GOOGLE-BEWERTUNG ===
// ============================================================
function renderBrief4(){
  const d = getLetterData('b4');
  const unternehmen = safeVal('b4_unternehmen', '[Dein Unternehmen]');
  const link = safeVal('b4_link', '');
  const datum = formatDate($('b4_datum').value);
  const grund = safeVal('b4_grund', 'fakten');
  const text = safeVal('b4_text', '[Bewertungstext]');
  const widerlegung = safeVal('b4_widerlegung', '[Deine Widerlegung]');
  const tone = getTone('b4');

  const grundTxt = {
    fakten: 'Die Bewertung enthält sachlich falsche Tatsachenbehauptungen und ist deshalb gemäß § 823 BGB i.V.m. § 1004 BGB (Unterlassungs-Anspruch) zu löschen.',
    beleidigung: 'Die Bewertung enthält beleidigende und herabsetzende Äußerungen, die gegen die Google-Richtlinien sowie gegen § 185 StGB (Beleidigung) verstoßen.',
    unwahr: 'Die Behauptungen sind nachweislich unwahr — die Bewertung muss entfernt werden.',
    verleumdung: 'Die Bewertung enthält ehrenrührige Behauptungen gemäß § 187 StGB (Verleumdung). Strafanzeige wird vorbehalten.',
    spam: 'Die Bewertung wurde ohne echte Geschäftsbeziehung abgegeben und stellt Spam dar.',
    keine_erfahrung: 'Es lag keine tatsächliche Kundenbeziehung vor — die Bewertung ist daher nicht berechtigt.'
  };

  $('b4_out').innerHTML = `
    ${letterHeader('Google-Bewertung Lösch-Antrag')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}</div>
    <div class="recipient">An:<br>Google Ireland Ltd.<br>Gordon House, Barrow Street<br>Dublin 4, D04 E5W5, Ireland</div>
    <div class="date">${today()}</div>
    <div class="subject">Antrag auf Löschung einer rechtswidrigen Google-Bewertung${link?' — '+esc(link):''}</div>
    <p>${tone.greet}</p>
    <p>ich betreibe das Unternehmen <strong>${esc(unternehmen)}</strong> und bin Inhaber des Google-My-Business-Eintrags${link?` (${esc(link)})`:''}.</p>
    <p>Am <strong>${datum}</strong> wurde eine Bewertung abgegeben, die gegen geltendes Recht verstößt. Ich beantrage die <strong>sofortige Löschung</strong> dieser Bewertung.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Wörtlicher Text der Bewertung</h4>
    <p style="font-style:italic;border-left:3px solid #999;padding-left:14px;color:#444">„${esc(text).replace(/\n/g,'<br>')}"</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Rechtsgrundlage</h4>
    <p>${grundTxt[grund]}</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Widerlegung</h4>
    <p>${esc(widerlegung).replace(/\n/g,'<br>')}</p>
    <p>Als Host-Provider sind Sie gemäß § 10 TMG für rechtswidrige Inhalte Dritter verantwortlich, sobald Sie Kenntnis erlangen. Mit diesem Schreiben erlangen Sie Kenntnis und sind zur Löschung verpflichtet.</p>
    <p>Ich bitte um <strong>Löschung innerhalb von 7 Tagen</strong>. Andernfalls werde ich gerichtliche Schritte einleiten.</p>
    ${renderReceiptsBlock('b4')}
    ${tone.eskal}
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `;
}

// ============================================================
// === BRIEF 5: JAMEDA ===
// ============================================================
function renderBrief5(){
  const d = getLetterData('b5');
  const unternehmen = safeVal('b5_adr', '[Jameda GmbH, Adresse]');
  const aktion = safeVal('b5_aktion', 'eintrag');
  const name = safeVal('b5_name', '[Name]');
  const fach = safeVal('b5_fach', '');
  const link = safeVal('b5_link', '');
  const tone = getTone('b5');

  const aktionTxt = {
    eintrag: 'meinen vollständigen Profileintrag aus Ihrem Verzeichnis zu löschen',
    bewertungen: 'alle zu meinem Profil gespeicherten Bewertungen zu löschen',
    foto: 'mein Profilfoto aus Ihrem Verzeichnis zu entfernen'
  };

  $('b5_out').innerHTML = `
    ${letterHeader('Jameda-Löschantrag')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}</div>
    <div class="recipient">An:<br>${esc(unternehmen).replace(/\n/g,'<br>')}</div>
    <div class="date">${today()}</div>
    <div class="subject">Antrag auf Löschung meines Profileintrags${link?' — '+esc(link):''}</div>
    <p>${tone.greet}</p>
    <p>ich bin <strong>${esc(name)}${fach?', '+esc(fach):''}</strong> und bitte Sie, <strong>${aktionTxt[aktion]}</strong>.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Rechtsgrundlage</h4>
    <p>Der Bundesgerichtshof hat mit Urteil vom 23.02.2018 (Az. I ZR 109/17) entschieden, dass Ärztinnen und Ärzte das Recht haben, aus dem Jameda-Bewertungsportal <strong>ohne Begründung</strong> gelöscht zu werden. Sie sind als Plattformbetreiber zur Löschung verpflichtet, ohne dass es einer weiteren Begründung meinerseits bedarf.</p>
    <p>Eine <strong>Widerspruchsfrist von 14 Tagen</strong> ist angemessen. Sollte die Löschung nicht fristgerecht erfolgen, behalte ich mir weitere rechtliche Schritte vor.</p>
    ${renderReceiptsBlock('b5')}
    <p>Bitte um eine <strong>schriftliche Bestätigung</strong> der Löschung an meine oben genannte Anschrift.</p>
    ${tone.eskal}
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `;
}

// ============================================================
// === BRIEF 6: EBAY/AMAZON ===
// ============================================================
function renderBrief6(){
  const d = getLetterData('b6');
  const plattform = safeVal('b6_plattform', 'ebay');
  const grund = safeVal('b6_grund', 'beleidigung');
  const adr = safeVal('b6_adr', '[Plattform-Adresse]');
  const name = safeVal('b6_name', '[Account-Name]');
  const artnr = safeVal('b6_artnr', '');
  const text = safeVal('b6_text', '[Bewertungstext]');
  const widerlegung = safeVal('b6_widerlegung', '[Widerlegung]');
  const tone = getTone('b6');

  const plattformName = {ebay:'eBay', amazon:'Amazon', kleinanzeigen:'Kleinanzeigen', other:'der Plattform'}[plattform];
  const grundTxt = {
    beleidigung: 'Beleidigung — die Bewertung enthält herabsetzende Äußerungen ohne sachlichen Bezug',
    erpressung: 'Erpressung — die Bewertung wurde als Druckmittel für Zugeständnisse missbraucht (§ 253 StGB)',
    unwahr: 'Sachliche Falschaussage — die behaupteten Tatsachen sind unrichtig',
    verleumdung: 'Verleumdung — die Bewertung enthält ehrverletzende Falschaussagen (§ 187 StGB)',
    kein_kauf: 'Kein echter Kaufvertrag — die Bewertung wurde ohne Geschäftsbeziehung abgegeben'
  };

  $('b6_out').innerHTML = `
    ${letterHeader('eBay/Amazon Bewertung Anfechtung')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}</div>
    <div class="recipient">An:<br>${esc(adr).replace(/\n/g,'<br>')}</div>
    <div class="date">${today()}</div>
    <div class="subject">Anfechtung einer Bewertung${artnr?' — Transaktion '+esc(artnr):''}</div>
    <p>${tone.greet}</p>
    <p>ich bin Verkäufer auf ${plattformName} unter dem Account <strong>${esc(name)}</strong>${artnr?' (Transaktion '+esc(artnr)+')':''}.</p>
    <p>Eine negative Bewertung wurde abgegeben, die ich hiermit gemäß Ihrer Nutzungsbedingungen anfechte.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Wörtlicher Text der Bewertung</h4>
    <p style="font-style:italic;border-left:3px solid #999;padding-left:14px;color:#444">„${esc(text).replace(/\n/g,'<br>')}"</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Grund der Anfechtung</h4>
    <p>${grundTxt[grund]}.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Meine Widerlegung</h4>
    <p>${esc(widerlegung).replace(/\n/g,'<br>')}</p>
    <p>Bitte prüfen Sie den Sachverhalt und löschen Sie die Bewertung. Gemäß Ihrer eigenen AGB und dem Grundsatz von Treu und Glauben sind Sie verpflichtet, rechtswidrige Bewertungen zu entfernen.</p>
    ${renderReceiptsBlock('b6')}
    ${tone.eskal}
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `;
}

// ============================================================
// === BRIEF 7: TRUSTPILOT ===
// ============================================================
function renderBrief7(){
  const d = getLetterData('b7');
  const unternehmen = safeVal('b7_unternehmen', '[Dein Unternehmen]');
  const grund = safeVal('b7_grund', 'beleidigung');
  const adr = safeVal('b7_adr', '[Plattform-Adresse]');
  const text = safeVal('b7_text', '[Bewertungstext]');
  const widerlegung = safeVal('b7_widerlegung', '[Widerlegung]');
  const tone = getTone('b7');

  const grundTxt = {
    beleidigung: 'Die Bewertung enthält persönliche Beleidigungen und Schmähkritik ohne sachlichen Bezug',
    verleumdung: 'Die Bewertung enthält ehrverletzende Falschaussagen (§ 187 StGB)',
    unwahr: 'Die Bewertung enthält nachweislich falsche Tatsachenbehauptungen',
    kein_kunde: 'Die Bewertung wurde von einer Person abgegeben, die keine echte Geschäftsbeziehung hat',
    wettbewerb: 'Die Bewertung wurde von einem Wettbewerber oder in dessen Auftrag abgegeben'
  };

  $('b7_out').innerHTML = `
    ${letterHeader('Trustpilot-Bewertung Lösch-Antrag')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}</div>
    <div class="recipient">An:<br>Trustpilot A/S<br>Pilestræde 58, 5th floor<br>1112 Kopenhagen, Dänemark</div>
    <div class="date">${today()}</div>
    <div class="subject">Lösch-Antrag für rechtswidrige Trustpilot-Bewertung</div>
    <p>${tone.greet}</p>
    <p>ich vertrete das Unternehmen <strong>${esc(unternehmen).replace(/\n/g,'<br>')}</strong> und beantrage die Löschung einer rechtswidrigen Bewertung.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Wörtlicher Text der Bewertung</h4>
    <p style="font-style:italic;border-left:3px solid #999;padding-left:14px;color:#444">„${esc(text).replace(/\n/g,'<br>')}"</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Verstoß gegen Trustpilot-Richtlinien</h4>
    <p>${grundTxt[grund]}. Die Bewertung verstößt gegen Ihre Community-Richtlinien und/oder gegen geltendes Recht.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Meine Widerlegung</h4>
    <p>${esc(widerlegung).replace(/\n/g,'<br>')}</p>
    <p>Als EU-rechtlich in Dänemark ansässiges Unternehmen sind Sie an die DSGVO gebunden. Die Verarbeitung rechtswidriger Daten verletzt die Rechte des Betroffenen.</p>
    ${renderReceiptsBlock('b7')}
    <p>Bitte um Löschung innerhalb von <strong>7 Tagen</strong>.</p>
    ${tone.eskal}
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `;
}

// ============================================================
// === BRIEF 8: INSTAGRAM SPERRUNG ===
// ============================================================
function renderBrief8(){
  const d = getLetterData('b8');
  const adr = safeVal('b8_adr', '[Plattform-Adresse]');
  const art = safeVal('b8_art', 'komplett');
  const handle = safeVal('b8_handle', '[@handle]');
  const datum = formatDate($('b8_datum').value);
  const email = safeVal('b8_email', '');
  const grund = safeVal('b8_grund', '[Grund laut Meta]');
  const stellung = safeVal('b8_stellung', '[Deine Stellungnahme]');
  const tone = getTone('b8');

  $('b8_out').innerHTML = `
    ${letterHeader('Instagram-Sperrung Widerspruch')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}<br>Instagram-Account: ${esc(handle)}${email?' · E-Mail: '+esc(email):''}</div>
    <div class="recipient">An:<br>${esc(adr).replace(/\n/g,'<br>')}</div>
    <div class="date">${today()}</div>
    <div class="subject">Widerspruch gegen Sperrung meines Instagram-Accounts @${esc(handle).replace('@','')} vom ${datum}</div>
    <p>${tone.greet}</p>
    <p>mein Instagram-Account <strong>${esc(handle)}</strong> wurde am <strong>${datum}</strong> ${art==='komplett'?'komplett gesperrt':art==='vorübergehend'?'vorübergehend gesperrt':art==='shadowban'?'durch einen Shadow-Ban in der Reichweite massiv eingeschränkt':'mit einzelnen gelöschten Inhalten'}.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Begründung der Sperrung laut Meta</h4>
    <p style="font-style:italic;border-left:3px solid #999;padding-left:14px;color:#444">„${esc(grund).replace(/\n/g,'<br>')}"</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Meine Stellungnahme</h4>
    <p>${esc(stellung).replace(/\n/g,'<br>')}</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Rechtsgrundlage</h4>
    <p>Als Verantwortlicher im Sinne der DSGVO sind Sie verpflichtet, Sperrungen nachvollziehbar zu begründen (Art. 22 DSGVO i.V.m. Art. 12 DSGVO). Eine pauschale Sperrung ohne ausreichende Begründung ist rechtswidrig.</p>
    <p>Ich bitte um <strong>Wiederherstellung meines Accounts innerhalb von 7 Tagen</strong> sowie um eine schriftliche, nachvollziehbare Begründung der ursprünglichen Sperrung.</p>
    ${renderReceiptsBlock('b8')}
    ${tone.eskal}
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `;
}

// ============================================================
// === BRIEF 9: FACEBOOK SPERRUNG ===
// ============================================================
function renderBrief9(){
  const d = getLetterData('b9');
  const adr = safeVal('b9_adr', '[Plattform-Adresse]');
  const art = safeVal('b9_art', 'komplett');
  const url = safeVal('b9_url', '');
  const sachverhalt = safeVal('b9_sachverhalt', '[Sachverhalt]');
  const tone = getTone('b9');

  $('b9_out').innerHTML = `
    ${letterHeader('Facebook-Sperrung Widerspruch')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}</div>
    <div class="recipient">An:<br>${esc(adr).replace(/\n/g,'<br>')}</div>
    <div class="date">${today()}</div>
    <div class="subject">Widerspruch gegen Deaktivierung meines Facebook-Accounts${url?' — '+esc(url):''}</div>
    <p>${tone.greet}</p>
    <p>mein Facebook-Account wurde ${art==='komplett'?'komplett deaktiviert':art==='vorübergehend'?'vorübergehend gesperrt':art==='verstoss'?'wegen eines angeblichen Verstoßes gegen die Gemeinschaftsstandards':art==='fake'?'fälschlich als Fake-Account markiert':'eingeschränkt'}.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Sachverhalt</h4>
    <p>${esc(sachverhalt).replace(/\n/g,'<br>')}</p>
    <p>Ich weise ausdrücklich darauf hin, dass ich <strong>keinerlei Verstoß</strong> gegen die Gemeinschaftsstandards begangen habe. Die Sperrung ist nicht nachvollziehbar und stellt einen rechtswidrigen Eingriff in meine Meinungsäußerungsfreiheit (Art. 5 I GG) und mein informationelles Selbstbestimmungsrecht dar.</p>
    <p>Ich fordere Sie auf, meinen Account <strong>unverzüglich wiederherzustellen</strong> und mir die konkrete Begründung der Sperrung mitzuteilen.</p>
    ${renderReceiptsBlock('b9')}
    ${tone.eskal}
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `;
}

// ============================================================
// === BRIEF 10: YOUTUBE STRIKE ===
// ============================================================
function renderBrief10(){
  const d = getLetterData('b10');
  const adr = safeVal('b10_adr', '[Plattform-Adresse]');
  const art = safeVal('b10_art', 'strike');
  const url = safeVal('b10_url', '');
  const video = safeVal('b10_video', '');
  const widerspruch = safeVal('b10_widerspruch', '[Dein Widerspruch]');
  const tone = getTone('b10');

  $('b10_out').innerHTML = `
    ${letterHeader('YouTube-Strike Widerspruch')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}</div>
    <div class="recipient">An:<br>${esc(adr).replace(/\n/g,'<br>')}</div>
    <div class="date">${today()}</div>
    <div class="subject">Widerspruch gegen Copyright-Strike / Content-Löschung${video?' — '+esc(video):''}</div>
    <p>${tone.greet}</p>
    <p>ich bin Inhaber des YouTube-Kanals${url?' '+esc(url):''} und widerspreche hiermit der gegen mich ausgesprochenen Maßnahme (${art==='strike'?'Copyright-Strike':art==='community'?'Community-Richtlinien-Verstoß':art==='removed'?'Video-Löschung':'Strike-Widerspruch'}).</p>
    ${video?`<h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Betroffenes Video</h4><p>${esc(video)}</p>`:''}
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Mein Widerspruch</h4>
    <p>${esc(widerspruch).replace(/\n/g,'<br>')}</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Rechtsgrundlage</h4>
    <p>Bei einem Copyright-Strike ist die Gegenabmahnung (Counter-Notice) gemäß <strong>17 USC § 512(g)</strong> (DMCA) möglich. Diese muss eine eidesstattliche Versicherung enthalten, dass die beanstandete Nutzung berechtigt ist.</p>
    <p>Ich fordere Sie auf, den Strike zurückzunehmen und das Video wieder zugänglich zu machen.</p>
    ${renderReceiptsBlock('b10')}
    ${tone.eskal}
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `;
}

// ============================================================
// === BRIEF 11: TIKTOK SPERRUNG ===
// ============================================================
function renderBrief11(){
  const d = getLetterData('b11');
  const adr = safeVal('b11_adr', '[Plattform-Adresse]');
  const art = safeVal('b11_art', 'banned');
  const handle = safeVal('b11_handle', '[@handle]');
  const sachverhalt = safeVal('b11_sachverhalt', '[Sachverhalt]');
  const tone = getTone('b11');

  $('b11_out').innerHTML = `
    ${letterHeader('TikTok-Sperrung Widerspruch')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}<br>TikTok: ${esc(handle)}</div>
    <div class="recipient">An:<br>${esc(adr).replace(/\n/g,'<br>')}</div>
    <div class="date">${today()}</div>
    <div class="subject">Widerspruch gegen Sperrung meines TikTok-Accounts @${esc(handle).replace('@','')}</div>
    <p>${tone.greet}</p>
    <p>mein TikTok-Account <strong>${esc(handle)}</strong> wurde ${art==='banned'?'permanent gebannt':art==='shadowban'?'durch einen Shadow-Ban in der Reichweite massiv eingeschränkt':art==='video'?'mit gelöschten Videos versehen':'in der Live-Stream-Funktion gesperrt'}.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Sachverhalt</h4>
    <p>${esc(sachverhalt).replace(/\n/g,'<br>')}</p>
    <p>Die Sperrung verstößt gegen die DSGVO, da Sie als Verantwortlicher im Sinne des Art. 4 Nr. 7 DSGVO verpflichtet sind, automatisierte Entscheidungen nachvollziehbar zu machen (Art. 22 DSGVO). Eine pauschale Sperrung ohne ausreichende Begründung ist rechtswidrig.</p>
    <p>Ich fordere die <strong>sofortige Wiederherstellung</strong> meines Accounts sowie eine nachvollziehbare Begründung der Sperrung.</p>
    ${renderReceiptsBlock('b11')}
    ${tone.eskal}
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `;
}

// ============================================================
// === BRIEF 12: MODIFIZIERTE UNTERLASSUNG ===
// ============================================================
function renderBrief12(){
  const d = getLetterData('b12');
  const strafe = safeVal('b12_strafe', '2000');
  const variante = safeVal('b12_variante', 'eingerichtet');
  const abmahner = safeVal('b12_abmahner', '[Abmahner]');
  const adr = safeVal('b12_abmahner_adr', '');
  const az = safeVal('b12_az', '');
  const gegenstand = safeVal('b12_gegenstand', '');

  $('b12_out').innerHTML = `
    ${letterHeader('Modifizierte Unterlassungserklärung')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}</div>
    <div class="recipient">An:<br>${esc(abmahner)}<br>${esc(adr).replace(/\n/g,'<br>')}</div>
    <div class="date">${today()}</div>
    <div class="subject">Modifizierte Unterlassungs- und Verpflichtungs-Erklärung — Az. ${esc(az)}</div>
    <p>Sehr geehrte Damen und Herren,</p>
    <p>ich nehme Bezug auf Ihre Abmahnung vom [Datum] (Az. <strong>${esc(az)}</strong>) wegen:</p>
    <p style="margin:8px 0;padding:10px;background:#f8f8f8;border-left:3px solid var(--accent)">${esc(gegenstand).replace(/\n/g,'<br>')}</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Erklärung</h4>
    <p>Im Interesse einer außergerichtlichen Beilegung der Angelegenheit und ohne Anerkennung einer Rechtspflicht erkläre ich — bei <strong>Meidung einer Vertragsstrafe</strong> in angemessener Höhe — mich bereit, es bei Vermeidung weiterer Rechtsverletzungen zu unterlassen, die in der Abmahnung bezeichneten Handlungen künftig zu wiederholen.</p>
    <p>Für jeden Fall der schuldhaften Zuwiderhandlung verpflichte ich mich zur Zahlung einer angemessenen <strong>Vertragsstrafe in Höhe von bis zu ${esc(strafe)} €</strong>, deren Höhe vom Gläubiger nach billigem Ermessen (§ 315 BGB) festzusetzen und im Streitfall vom zuständigen Gericht zu überprüfen ist.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Deutungs-Hinweis</h4>
    <p>Diese Erklärung ist so zu verstehen, dass sie sich auf Handlungen bezieht, die <strong>${variante==='eingerichtet'?'im Sinne der Rechtsprechung eingerichtet und vorbereitet':'in rechtswidriger Weise vervielfältigt und verbreitet'}</strong> wurden. Ein darüberhinausgehendes Schuldanerkenntnis wird hiermit ausdrücklich nicht abgegeben.</p>
    <p>Die Vertragsstrafe wird fällig mit jedem schuldhaften Verstoß gegen die Unterlassungsverpflichtung. Mehrere Verstöße begründen mehrere getrennte Vertragsstrafen.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Hinweis auf Modifikation</h4>
    <p>Diese Erklärung wird <strong>modifiziert</strong> abgegeben, um überhöhte Vertragsstrafen und unangemessene Schadensersatzforderungen zu vermeiden. Bei einer Vertragsstrafe über 2.000 € pro Verstoß ist nach ständiger Rechtsprechung in der Regel <strong>Reduzierung</strong> geboten.</p>
    <p>Ich bitte um Bestätigung des Erhalts und der Annahme dieser modifizierten Erklärung.</p>
    <p class="lp-sign">Mit freundlichen Grüßen,<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `;
}

// ============================================================
// === BRIEF 13: COUNTER-ABMAHNUNG ===
// ============================================================
function renderBrief13(){
  const d = getLetterData('b13');
  const grund = safeVal('b13_grund', 'kein_verstoss');
  const abmahner = safeVal('b13_abmahner', '');
  const adr = safeVal('b13_abmahner_adr', '');
  const az = safeVal('b13_az', '');
  const widerspruch = safeVal('b13_widerlegung', '[Stellungnahme]');
  const schaden = safeVal('b13_schaden', '');
  const tone = getTone('b13');

  const grundTxt = {
    lizenz: 'Ich verfügte zum Zeitpunkt der behaupteten Rechtsverletzung über eine gültige Lizenz für die Nutzung des Werks. Die Lizenz ist mit dieser Beschwerde belegt.',
    kein_recht: 'Sie sind nicht Inhaber der geltend gemachten Rechte. Die Aktivlegitimation für eine Abmahnung fehlt damit.',
    frei: 'Das betroffene Werk ist gemeinfrei (Public Domain) — die Rechte sind gemäß § 64 UrhG 70 Jahre nach dem Tod des Urhebers erloschen.',
    kein_verstoss: 'Die behauptete Rechtsverletzung liegt nicht vor. Es handelt sich um ein Zitat (§ 51 UrhG), um Satire (§ 24 UrhG) oder um eine freie Benutzung.',
    ueberzogen: 'Die in der Abmahnung geforderte Vertragsstrafe und/oder Anwaltskosten sind unangemessen hoch und überschreiten das in der Rechtsprechung Übliche.'
  };

  $('b13_out').innerHTML = `
    ${letterHeader('Counter-Abmahnung (Gegenabmahnung)')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}</div>
    <div class="recipient">An:<br>${esc(abmahner)}<br>${esc(adr).replace(/\n/g,'<br>')}</div>
    <div class="date">${today()}</div>
    <div class="subject">Counter-Abmahnung zu Ihrer Abmahnung — Az. ${esc(az)}</div>
    <p>${tone.greet}</p>
    <p>ich nehme Bezug auf Ihre Abmahnung (Az. <strong>${esc(az)}</strong>) und weise die geltend gemachten Ansprüche <strong>vollumfänglich zurück</strong>.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Begründung</h4>
    <p>${grundTxt[grund]}</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Meine Stellungnahme im Detail</h4>
    <p>${esc(widerspruch).replace(/\n/g,'<br>')}</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Rechtsfolge</h4>
    <p>Ihre Abmahnung ist unberechtigt. Ich fordere Sie auf, <strong>von der Geltendmachung der Ansprüche Abstand zu nehmen</strong>. Andernfalls sehen Sie sich folgenden Forderungen ausgesetzt:</p>
    ${schaden?`<p><strong>Schadensersatzforderung:</strong> ${esc(schaden)}</p>`:''}
    <p><strong>Negative Feststellungsklage:</strong> Ich werde gerichtlich feststellen lassen, dass Ihre Abmahnung unberechtigt war. Die Verfahrenskosten gehen dann zu Ihren Lasten.</p>
    ${tone.harte?'<p><strong>Strafanzeige:</strong> Bei fortbestehender Geltendmachung erstatte ich Strafanzeige wegen versuchter Erpressung (§ 253 StGB) und — bei fortbestehender Verleumdung — wegen Verleumdung (§ 187 StGB).</p>':''}
    <p><strong>Frist zur Rücknahme:</strong> Ich setze Ihnen eine Frist von <strong>${tone.frist}</strong> zur Rücknahme der Abmahnung und zur Bestätigung, dass keine weiteren Schritte eingeleitet werden.</p>
    ${renderReceiptsBlock('b13')}
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `;
}

// ============================================================
// === BRIEF 14: DMCA NOTICE ===
// ============================================================
function renderBrief14(){
  const d = getLetterData('b14');
  const plattform = safeVal('b14_plattform', 'google');
  const typ = safeVal('b14_typ', 'takedown');
  const adr = safeVal('b14_adr', '');
  const land = safeVal('b14_land', 'Deutschland');
  const url = safeVal('b14_url', '');
  const werk = safeVal('b14_werk', '');
  const beweis = safeVal('b14_beweis', '');

  $('b14_out').innerHTML = `
    ${letterHeader('DMCA Takedown Notice')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}<br>Land: ${esc(land)}</div>
    <div class="recipient">An:<br>${esc(adr).replace(/\n/g,'<br>')}</div>
    <div class="date">${today()}</div>
    <div class="subject">DMCA Takedown Notice — Urheberrechtsverletzung</div>
    <p>To Whom It May Concern,</p>
    <p>I am the copyright owner (or am authorized to act on behalf of the copyright owner) of the following copyrighted work:</p>
    <p style="margin:8px 0;padding:10px;background:#f8f8f8;border-left:3px solid var(--accent)"><strong>${esc(werk).replace(/\n/g,'<br>')}</strong></p>
    <p>The following URL contains material that infringes on my copyright:</p>
    <p style="margin:8px 0;padding:10px;background:#f8f8f8;border-left:3px solid #ef4444">${esc(url)}</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Good Faith Statement</h4>
    <p>I have a good faith belief that use of the copyrighted material described above is not authorized by the copyright owner, its agent, or the law.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Accuracy and Authority Statement</h4>
    <p>I swear, under penalty of perjury, that the information in this notification is accurate and that I am the copyright owner or am authorized to act on behalf of the owner of the exclusive right that is allegedly infringed.</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Evidence of Ownership</h4>
    <p>${esc(beweis).replace(/\n/g,'<br>')}</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Request</h4>
    <p>I request that you <strong>immediately remove or disable access to</strong> the infringing material identified above. Under 17 USC § 512(g), you must expeditiously remove or disable access to the allegedly infringing material.</p>
    <p>If you believe this notice was sent in error, you may submit a counter-notification pursuant to 17 USC § 512(g)(3).</p>
    <h4 style="margin-top:18px;font-family:Inter,sans-serif;text-transform:none;letter-spacing:0;color:#1a1a1a">Signature</h4>
    <p>I hereby certify under penalty of perjury that the foregoing is true and correct.</p>
    ${renderReceiptsBlock('b14')}
    <p>Mit freundlichen Grüßen (Sincerely),</p>
    <p class="lp-sign">${d.name}<br>${esc(d.addr).replace(/\n/g,', ')}<br>${esc(land)}</p>
    ${letterFoot()}
  `;
}

// === 3 RECHNER ===

// 1. Abmahnkosten-Rechner (RVG)
function calcAbmahn(){
  const gw = parseFloat($('calc-gw').value) || 0;
  const art = $('calc-art').value;
  // RVG-Tabelle: Geschäftsgebühr Nr. 2300 VV (aussergerichtlich) oder Verfahrensgebühr 3100 VV (gerichtlich)
  // Gebührensatz = Gegenstandswert × Faktor (z.B. 1,3) gemäß § 13 RVG
  // Bei aussergerichtlich: 1,3 Geschäftsgebühr + Auslagenpauschale 20 € + 19% USt
  // Bei gerichtlich: 1,3 Verfahrensgebühr + Terminsgebühr 1,2 + Auslagenpauschale 20 € + 19% USt
  // Ohne Berücksichtigung von Streitwert-Kappung

  let gebuehr, gebuehrName, gesamt;
  if(art === 'aussergerichtlich'){
    const basisGeb = gw * 1.3;
    const pausch = 20;
    const netto = basisGeb + pausch;
    const ust = netto * 0.19;
    gesamt = netto + ust;
    gebuehr = basisGeb;
    gebuehrName = 'Geschäftsgebühr (Nr. 2300 VV) × 1,3';
  } else {
    const verfahrensgeb = gw * 1.3;
    const terminsgeb = gw * 1.2;
    const pausch = 20;
    const netto = verfahrensgeb + terminsgeb + pausch;
    const ust = netto * 0.19;
    gesamt = netto + ust;
    gebuehr = verfahrensgeb + terminsgeb;
    gebuehrName = 'Verfahrensgebühr (1,3) + Terminsgebühr (1,2)';
  }

  $('calc-abmahn-result').innerHTML = `
    <div class="calc-line"><span class="label">Gegenstandswert</span><span class="value">${gw.toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>
    <div class="calc-line"><span class="label">${gebuehrName}</span><span class="value">${gebuehr.toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>
    <div class="calc-line"><span class="label">Auslagenpauschale</span><span class="value">20,00 €</span></div>
    <div class="calc-line"><span class="label">Zwischensumme netto</span><span class="value">${(gebuehr+20).toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>
    <div class="calc-line"><span class="label">19% USt</span><span class="value">${((gebuehr+20)*0.19).toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>
    <div class="calc-line total"><span class="label">Gesamt (RVG-konform)</span><span class="value">${gesamt.toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>
    <p style="font-size:11px;color:var(--muted);margin-top:10px"><em>Stand: 2026 · Berechnung nach § 13 RVG, Nr. 2300/3100 VV. Bei Streitwerten über 500.000 € gelten reduzierte Gebührensätze.</em></p>
  `;
}

// 2. Vertragsstrafe-Rechner
function calcStrafe(){
  const sw = parseFloat($('calc-sw').value) || 0;
  const risiko = $('calc-risiko').value;
  // Faustregel: Vertragsstrafe = Streitwert × Faktor
  // Faktor: niedrig = 0,3 / mittel = 0,5 / hoch = 0,8
  // Cap bei 2.000 € pro Verstoß (in der Regel angemessen)
  const faktorMap = {niedrig:0.3, mittel:0.5, hoch:0.8};
  const faktor = faktorMap[risiko];
  const roh = sw * faktor;
  const cap = 2000;
  const empfehlung = Math.min(roh, cap);
  const capHinweis = roh > cap ? ' (auf 2.000 € gedeckelt — bei höheren Werten Verhandlung empfohlen)' : '';

  $('calc-strafe-result').innerHTML = `
    <div class="calc-line"><span class="label">Streitwert</span><span class="value">${sw.toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>
    <div class="calc-line"><span class="label">Risiko-Faktor (${risiko})</span><span class="value">${faktor}</span></div>
    <div class="calc-line"><span class="label">Berechnet: Streitwert × Faktor</span><span class="value">${roh.toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>
    <div class="calc-line total"><span class="label">Empfohlene Vertragsstrafe${capHinweis}</span><span class="value">${empfehlung.toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>
    <p style="font-size:11px;color:var(--muted);margin-top:10px"><em>Faustregel: max. 2.000 € pro Verstoß (BGH: zu hohe Vertragsstrafen werden reduziert). Bei Erstverstoß niedriger, bei Wiederholung höher.</em></p>
  `;
}

// 3. Schadensersatz-Rechner (Bewertung)
function calcSchaden(){
  const sterne = parseInt($('calc-sterne').value) || 1;
  const reichweite = parseInt($('calc-reichweite').value) || 0;
  const schwere = $('calc-schwere').value;
  // Berechnung: Schadensersatz = Basis × Reichweite-Faktor × Schwere-Faktor
  // Basis = 100 € (falsche Aussage 1 Stern) bis 1000 € (schwere Verleumdung 1 Stern)
  const basisMap = {leicht:300, mittel:600, schwer:1000};
  const schwereFaktorMap = {leicht:1, mittel:2, schwer:4};
  const sterneFaktor = sterne; // 1-5
  const basis = basisMap[schwere];
  const schwereFaktor = schwereFaktorMap[schwere];
  // Reichweite: bis 1000 = 1.0, bis 10000 = 1.5, bis 100000 = 2.0, darüber = 3.0
  let reichweiteFaktor = 1;
  if(reichweite > 100000) reichweiteFaktor = 3;
  else if(reichweite > 10000) reichweiteFaktor = 2;
  else if(reichweite > 1000) reichweiteFaktor = 1.5;
  const schaden = Math.round(basis * sterneFaktor * schwereFaktor * reichweiteFaktor);

  $('calc-schaden-result').innerHTML = `
    <div class="calc-line"><span class="label">Sterne-Bewertung</span><span class="value">${sterne} ★</span></div>
    <div class="calc-line"><span class="label">Reichweite (Anzeigen / Monat)</span><span class="value">${reichweite.toLocaleString('de-DE')}</span></div>
    <div class="calc-line"><span class="label">Schwere der Aussage</span><span class="value">${schwere} (Faktor ${schwereFaktor})</span></div>
    <div class="calc-line"><span class="label">Reichweiten-Faktor</span><span class="value">×${reichweiteFaktor}</span></div>
    <div class="calc-line total"><span class="label">Schadensersatz-Schätzung (Spanne)</span><span class="value">${schaden.toLocaleString('de-DE')} – ${(schaden*2).toLocaleString('de-DE')} €</span></div>
    <p style="font-size:11px;color:var(--muted);margin-top:10px"><em>Schätzung auf Basis BGH-Rechtsprechung zu Bewertungs-Schadensersatz. Tatsächlicher Anspruch kann je nach Einzelfall deutlich abweichen. Anwalt empfohlen.</em></p>
  `;
}

// === FRIST-TRACKER ===
function addFrist(){
  const was = $('fr-was').value.trim();
  const start = $('fr-start').value || todayISO();
  const tage = parseInt($('fr-tage').value) || 30;
  if(!was){ toast('Bitte Beschreibung eingeben', 'warn'); return; }
  const end = new Date(start);
  end.setDate(end.getDate() + tage);
  state.fristen.push({id:uid(), was, start, tage, end:end.toISOString().split('T')[0], erledigt:false});
  save();
  renderFristen();
  $('fr-was').value = '';
  $('fr-start').value = todayISO();
  $('fr-tage').value = '30';
  toast('Frist hinzugefügt', 'success', `Endet am ${formatDate(end.toISOString().split('T')[0])}`);
}

function renderFristen(){
  const list = $('fristen-list');
  if(!list) return;
  const active = state.fristen.filter(f => !f.erledigt);
  const done = state.fristen.filter(f => f.erledigt);
  let html = '';
  if(active.length){
    html += active.sort((a,b) => a.end.localeCompare(b.end)).map(f => {
      const today_ = todayISO();
      const tageBis = Math.ceil((new Date(f.end) - new Date(today_)) / 86400000);
      const urgent = tageBis <= 7;
      const overdue = tageBis < 0;
      return `<div class="item" style="${overdue?'border-color:rgba(239,68,68,.5);background:var(--danger-soft)':''}">
        <div class="item-main">
          <div class="item-title">${esc(f.was)}</div>
          <div class="meta">
            <span>📅 ${esc(formatDate(f.start))} + ${esc(String(f.tage))} Tage</span>
            <span>→ Frist: <strong style="color:${overdue?'var(--danger)':urgent?'var(--warn)':'var(--accent)'}">${esc(formatDate(f.end))}</strong></span>
            <span class="pill ${overdue?'bad':urgent?'warn':'ok'}">${overdue?'⚠ ÜBERFÄLLIG':tageBis<=7?'⏰ '+tageBis+' Tage':'noch '+tageBis+' Tage'}</span>
          </div>
        </div>
        <div class="item-actions">
          <button class="mini ok" data-toggle="${esc(f.id)}">✓</button>
          <button class="mini danger" data-del-fr="${esc(f.id)}">×</button>
        </div>
      </div>`;
    }).join('');
  }
  if(done.length){
    html += '<h3 style="margin-top:24px;font-size:12px;color:var(--muted)">Erledigt</h3>';
    html += done.map(f => `<div class="item" style="opacity:.5"><div class="item-main"><div class="item-title" style="text-decoration:line-through">${esc(f.was)}</div><div class="meta"><span>✓ erledigt am ${esc(formatDate(f.end))}</span></div></div><div class="item-actions"><button class="mini" data-undo="${esc(f.id)}">↺</button><button class="mini danger" data-del-fr="${esc(f.id)}">×</button></div></div>`).join('');
  }
  if(!state.fristen.length) html = `<div class="empty">Noch keine Fristen. Trage oben eine DSGVO-Anfrage, eine Widerspruchsfrist oder eine Lösch-Frist ein.</div>`;
  list.innerHTML = html;
  // Use addEventListener (not onclick) for proper event delegation pattern
  // Also: defensive — if state.fristen doesn't contain the id (race condition), skip
  $$('[data-toggle]').forEach(b => b.addEventListener('click', () => {
    const f = state.fristen.find(x => x.id === b.dataset.toggle);
    if (f) { f.erledigt = true; save(); renderFristen(); toast('Frist erledigt', 'success'); }
  }));
  $$('[data-undo]').forEach(b => b.addEventListener('click', () => {
    const f = state.fristen.find(x => x.id === b.dataset.undo);
    if (f) { f.erledigt = false; save(); renderFristen(); }
  }));
  $$('[data-del-fr]').forEach(b => b.addEventListener('click', () => {
    if(!confirm('Frist löschen?')) return;
    state.fristen = state.fristen.filter(x => x.id !== b.dataset.delFr);
    save(); renderFristen();
  }));
}

// === ARCHIVE ===
function renderArchive(){
  $('arch-falle').textContent = state.letters.length;
  $('arch-briefe').textContent = state.counters.briefe || 0;
  $('arch-fristen').textContent = state.fristen.filter(f => !f.erledigt).length;
  $('arch-size').textContent = (JSON.stringify(state).length / 1024).toFixed(1);
}

// === BACKUP / RESET ===
function exportData(){
  // Sanitize filename: today() returns "07.08.2026" → use ISO for safe filename
  const safeDate = new Date().toISOString().split('T')[0];  // "2026-08-07"
  const blob = new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `digital-schuetzschild-backup-${safeDate}.json`;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
  toast('Backup exportiert', 'success', a.download);
}

function confirmReset(){
  if(!confirm('Wirklich ALLE Daten löschen?')) return;
  if(!confirm('Letzte Warnung — unwiderruflich! Sicher?')) return;
  state = def();
  localStorage.removeItem(STORE);
  save();
  switchView('dashboard');
  toast('System zurückgesetzt', 'warn');
}

$('importFile').onchange = e => {
  const f = e.target.files[0]; if(!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      state = Object.assign(def(), JSON.parse(r.result));
      save();
      switchView('dashboard');
      toast('Backup geladen', 'success', 'Daten wiederhergestellt');
    } catch(e){ toast('Ungültige Backup-Datei', 'danger'); }
  };
  r.readAsText(f);
  e.target.value = '';
};

// === LETTER EXPORT ===
const LETTER_OUT_ID = {1:'b1_out',2:'b2_out',3:'b3_out',4:'b4_out',5:'b5_out',6:'b6_out',7:'b7_out',8:'b8_out',9:'b9_out',10:'b10_out',11:'b11_out',12:'b12_out',13:'b13_out',14:'b14_out',bs:'bs_out',sa:'sa_out',sl:'sl_out',ki:'ki_letter_out',wh:'wh_out'};
const LETTER_SUBJECTS = {1:'DSGVO-Auskunft', 2:'DSGVO-Loeschung', 3:'LfDI-Beschwerde', 4:'Google-Bewertung-Loeschung', 5:'Jameda-Loeschung', 6:'eBay-Amazon-Anfechtung', 7:'Trustpilot-Loeschung', 8:'Instagram-Sperrung', 9:'Facebook-Sperrung', 10:'YouTube-Strike', 11:'TikTok-Sperrung', 12:'Modifizierte-Unterlassung', 13:'Counter-Abmahnung', 14:'DMCA-Notice', bs:'DSGVO-Schadensersatz-Art82', sa:'Schufa-Gratis-Auskunft', sl:'Schufa-Loeschung-Art17', ki:'KI-OptOut-UrhG-44b', wh:'WLAN-Haftungsausschluss'};
function getLetterHTML(num){ return $(LETTER_OUT_ID[num])?.innerHTML || ''; }
function getLetterPlainText(num){
  const div = document.createElement('div');
  div.innerHTML = getLetterHTML(num);
  return div.innerText.replace(/\n{3,}/g,'\n\n').trim();
}
function copyBrief(num){
  if (typeof num !== 'number' && typeof num !== 'string') return toast('Ungültiger Brief-Parameter','warn');
  const txt = getLetterPlainText(num);
  if(!txt) return toast('Kein Brief vorhanden','warn');
  if (!navigator.clipboard) return toast('Clipboard nicht verfügbar (z.B. in iframe)','danger');
  navigator.clipboard.writeText(txt).then(() => {
    state.counters.briefe = (state.counters.briefe || 0) + 1;
    save();
    renderStats();
    toast('Brief in Zwischenablage', 'success', 'Einfügen in E-Mail oder Texteditor');
  }).catch((e) => {
    console.error('[copyBrief] clipboard failed', e);
    // Fallback: textarea + execCommand
    try {
      const ta = document.createElement('textarea');
      ta.value = txt; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); ta.remove();
      state.counters.briefe = (state.counters.briefe || 0) + 1;
      save(); renderStats();
      toast('Brief kopiert (Fallback)', 'success');
    } catch(e2) { toast('Kopieren fehlgeschlagen', 'danger'); }
  });
}
function downloadBrief(num){
  const txt = getLetterPlainText(num);
  if(!txt) return toast('Kein Brief vorhanden','warn');
  const subject = LETTER_SUBJECTS[num] || ('Brief-'+num);
  const blob = new Blob([txt],{type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${subject}_${today()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  state.counters.briefe = (state.counters.briefe || 0) + 1;
  save();
  toast('Brief als .txt gespeichert', 'success', a.download);
}
function copyCode(){
  const code = $('rb_out')?.textContent || '';
  if(!code) return;
  navigator.clipboard.writeText(code).then(()=>toast('robots.txt in Zwischenablage','success','Einfügen in robots.txt deiner Domain')).catch(()=>toast('Kopieren fehlgeschlagen','danger'));
}
function downloadCode(){
  const code = $('rb_out')?.textContent || '';
  if(!code) return;
  const blob = new Blob([code],{type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'robots.txt'; a.click();
  URL.revokeObjectURL(url);
  toast('robots.txt heruntergeladen','success','Im Hauptverzeichnis deiner Domain ablegen');
}
function printView(viewId){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('print-me'));
  $('view-'+viewId).classList.add('print-me');
  state.counters.briefe = (state.counters.briefe || 0) + 1;
  save();
  setTimeout(()=>window.print(),200);
}

// ============================================================
// === BRIEF 15: DSGVO SCHADENSERSATZ (Art. 82) ===
// ============================================================
function renderDsgvoSchaden(){
  const d = getLetterData('bs');
  const firma = $('bs_firma')?.value || '[Firmenname]';
  const firmaAdr = $('bs_firma_adr')?.value || '[Anschrift]';
  const konzern = $('bs_konzern')?.value || 'Meta Platforms Ireland Ltd';
  const leckDatum = $('bs_leck')?.value || '[Datum Datenleck]';
  const datenArt = $('bs_daten')?.value || 'personenbezogene Daten (E-Mail, Telefon, Anschrift)';
  const anzahl = $('bs_anzahl')?.value || '[geschätzte Anzahl Betroffener]';
  const folge = $('bs_folge')?.value || '[konkrete Folgen: Spam, Phishing, Identitätsmissbrauch]';
  const betrag = $('bs_betrag')?.value || '2.500';
  const tone = getTone('bs');
  const frist = tone.frist;

  $('bs_out') && ($('bs_out').innerHTML = `
    ${letterHeader('Schadensersatz nach Art. 82 DSGVO')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}</div>
    <div class="recipient">An:<br>${esc(firma)}<br>${esc(firmaAdr).replace(/\n/g,'<br>')}<br><em>z. Hd. Datenschutzbeauftragter</em></div>
    <div class="date">${today()}</div>
    <div class="subject">Aufforderung zu Schadensersatz nach Art. 82 DSGVO wegen Datenleck vom ${esc(leckDatum)}</div>
    <p>${tone.anrede || 'Sehr geehrte Damen und Herren,'}</p>
    <p>am <strong>${esc(leckDatum)}</strong> kam es bei der <strong>${esc(konzern)}</strong> zu einem Datenleck, von dem auch meine folgenden personenbezogenen Daten betroffen waren:</p>
    <ul style="margin:8px 0 14px 24px;line-height:1.7">
      <li><strong>Betroffene Daten:</strong> ${esc(datenArt)}</li>
      <li><strong>Ausmaß des Datenlecks:</strong> ca. ${esc(anzahl)} Datensätze</li>
      <li><strong>Konkrete Folgen für mich:</strong> ${esc(folge)}</li>
    </ul>
    <p>Als Verantwortlicher im Sinne des <strong>Art. 4 Nr. 7 DSGVO</strong> haften Sie gemäß <strong>Art. 82 I DSGVO</strong> auf Schadensersatz für sämtliche Schäden – einschließlich <strong>immaterieller Schäden</strong> (vgl. EuGH C-300/21 „UI ./. ÖAAB", Rn. 31 ff.; EuGH C-687/21 „MediaMarktSaturn", Rn. 26 ff.).</p>
    <p>Nach ständiger Rechtsprechung des EuGH sind <strong>immaterielle Schäden</strong> wie der Kontrollverlust über eigene Daten, die Angst vor Identitätsmissbrauch oder die Sorge um künftige Folgen <strong>eigenständig ersatzfähig</strong> und erfordern keinen konkreten Vermögensverlust. Der Schadensersatz muss gemäß <strong>Art. 82 V DSGVO</strong> wirksam, verhältnismäßig und abschreckend sein.</p>
    <p>Auch wenn Ihre Konzernmutter in den USA sitzt, sind Sie als <strong>${esc(konzern)}</strong> unmittelbarer Adressat der DSGVO, sofern Sie Ihre Dienste auf den europäischen Markt ausrichten (EuGH C-230/14 „Weltimmo").</p>
    <p>Ich fordere Sie daher auf, mir bis zum <strong>${frist}</strong> einen Betrag in Höhe von</p>
    <p style="font-size:24px;font-weight:700;text-align:center;color:var(--accent);font-family:var(--font-mono);margin:14px 0">${esc(betrag)} €</p>
    <p>als Schadensersatz für den erlittenen immateriellen Schaden zu zahlen, und zwar auf folgendes Konto:</p>
    <p style="margin:14px 0;padding:14px 18px;background:rgba(0,0,0,.2);border-radius:8px;font-family:var(--font-mono);font-size:13px">${esc(d.name)}<br>IBAN: ${esc(d.iban || '[IBAN eintragen]')}<br>BIC: ${esc(d.bic || '[BIC eintragen]')}<br>Verwendungszweck: Schadensersatz Datenleck ${esc(leckDatum)}</p>
    <p>Sollte die Zahlung nicht fristgerecht eingehen, werde ich ohne weitere Mahnung:</p>
    <ol style="margin:8px 0 14px 24px;line-height:1.7">
      <li>Beschwerde bei der zuständigen Datenschutzaufsicht einreichen (Art. 77 DSGVO),</li>
      <li>weitere betroffene Nutzer auf die Möglichkeit der Sammelklage hinweisen,</li>
      <li>einen zivilrechtlichen Klageauftrag anwaltlich prüfen lassen.</li>
    </ol>
    <p>${tone.eskal}</p>
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `);
}

// ============================================================
// === BRIEF 16: SCHUFA GRATIS-AUSKUNFT (Art. 15) ===
// ============================================================
function renderSchufaAuskunft(){
  const d = getLetterData('sa');
  const auskunftei = $('sa_auskunftei')?.value || 'SCHUFA Holding AG';
  const auskunfteiAdr = $('sa_auskunftei_adr')?.value || 'Kormoranweg 5, 65201 Wiesbaden';
  const kundennr = $('sa_kundennr')?.value || '[Kundennummer – leer lassen wenn unbekannt]';
  const geburtsdatum = $('sa_geburtsdatum')?.value || '[Geburtsdatum]';
  const tone = getTone('sa');
  const frist = tone.frist;

  $('sa_out') && ($('sa_out').innerHTML = `
    ${letterHeader('Gratis-Auskunft nach Art. 15 DSGVO')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}<br>Geburtsdatum: ${esc(geburtsdatum)}</div>
    <div class="recipient">An:<br>${esc(auskunftei)}<br>${esc(auskunfteiAdr).replace(/\n/g,'<br>')}<br><em>z. Hd. Datenschutzbeauftragter</em></div>
    <div class="date">${today()}</div>
    <div class="subject">Antrag auf kostenlose Auskunft nach Art. 15 DSGVO (Datenauskunft) ${kundennr && kundennr !== '[Kundennummer – leer lassen wenn unbekannt]' ? '· Vorgangsnr. ' + esc(kundennr) : ''}</div>
    <p>${tone.anrede || 'Sehr geehrte Damen und Herren,'}</p>
    <p>ich bitte um <strong>umgehende und kostenlose Übermittlung</strong> sämtlicher Daten, die Sie zu meiner Person gespeichert haben, gemäß <strong>Art. 15 I DSGVO</strong>.</p>
    <p>Als <strong>Wirtschaftsauskunftei</strong> sind Sie gemäß <strong>Art. 15 I DSGVO</strong> verpflichtet, mir einmal jährlich <strong>kostenlos</strong> eine vollständige Auskunft über alle gespeicherten Daten zu erteilen. Die Auskunft muss nach <strong>Art. 15 III DSGVO</strong> in einem <strong>strukturierten, gängigen und maschinenlesbaren Format</strong> (z. B. PDF, CSV oder JSON) bereitgestellt werden.</p>
    <p>Ich fordere Sie auf, mir folgende Informationen zu übermitteln:</p>
    <ol style="margin:8px 0 14px 24px;line-height:1.7">
      <li>Bestätigung, ob Sie personenbezogene Daten von mir verarbeiten</li>
      <li>Vollständige <strong>Bonitätsdaten</strong> (Score-Werte, Bewertungsmodelle, Scoreformel)</li>
      <li>Gespeicherte <strong>Stammdaten</strong> (Name, Anschrift, Geburtsdatum, ggf. frühere Anschriften)</li>
      <li>Alle <strong>Vertragspartner</strong> (Gläubiger), zu denen Sie Daten über mich an Dritte übermittelt haben (Art. 19 DSGVO-Protokollierung)</li>
      <li>Liste aller <strong>Empfänger</strong>, an die Sie meine Daten in den letzten 12 Monaten übermittelt haben</li>
      <li>Speicherdauer bzw. konkrete <strong>Löschfristen</strong> der einzelnen Datenpunkte</li>
      <li>Herkunft der Daten (falls nicht aus Vertragsverhältnissen erhoben)</li>
      <li>Verwendete <strong>Logik</strong> der Scoreberechnung (Art. 22 DSGVO)</li>
    </ol>
    <p>Ich weise ausdrücklich darauf hin, dass die Auskunft gemäß <strong>Art. 12 V DSGVO i. V. m. Art. 15 III DSGVO</strong> kostenlos zu erteilen ist – unabhängig davon, ob Sie parallel eine kostenpflichtige Bonitäts­auskunft anbieten. Eine Weitergabe meiner Anfrage an Dritte ist nach <strong>Art. 5 I lit. f DSGVO</strong> nur im Rahmen der Zweckbindung zulässig.</p>
    <p>Mein Identitätsnachweis ist beigefügt. Bitte übermitteln Sie die Auskunft innerhalb der gesetzlichen Frist von <strong>${frist}</strong> an meine oben genannte Anschrift oder in elektronischer Form.</p>
    ${renderReceiptsBlock('sa')}
    <p>${tone.eskal}</p>
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `);
}

// ============================================================
// === BRIEF 17: SCHUFA LÖSCHUNGSANTRAG ===
// ============================================================
function renderSchufaLoeschung(){
  const d = getLetterData('sl');
  const auskunftei = $('sl_auskunftei')?.value || 'SCHUFA Holding AG';
  const auskunfteiAdr = $('sl_auskunftei_adr')?.value || 'Kormoranweg 5, 65201 Wiesbaden';
  const eintrag = $('sl_eintrag')?.value || '[Bezeichnung des zu löschenden Eintrags]';
  const vertragspartner = $('sl_gläubiger')?.value || '[Gläubiger]';
  const eintragDatum = $('sl_datum')?.value || '[Datum des Eintrags]';
  const grund = $('sl_grund')?.value || 'erledigt';
  const begruendung = $('sl_begruendung')?.value || 'Der Eintrag ist sachlich nicht mehr zutreffend und muss nach Ablauf der Speicherfrist gelöscht werden.';
  const tone = getTone('sl');
  const frist = tone.frist;

  const grundPresets = {
    erledigt: 'Die zugrunde liegende Forderung wurde vollständig beglichen, eine Restschuldbefreiung wurde erteilt.',
    falsch: 'Der Eintrag ist inhaltlich unrichtig. Die gespeicherte Forderung besteht nicht (mehr).',
    verjährt: 'Die Forderung ist nach §§ 195, 199 BGB verjährt. Die Verjährungsfrist ist abgelaufen.',
    bestritten: 'Die Forderung wird bestritten und ist gerichtlich anhängig (Anlage: Klageschrift).',
    reschuldbefreiung: 'Gemäß EuGH-Urteil C-413/23 PPU („SCHUFA/Hauptsache") sind Einträge nach erteilter Restschuldbefreiung <strong>spätestens nach 6 Monaten</strong> zu löschen, da das öffentliche Interesse an der Mitteilung erschöpft ist.'
  };

  $('sl_out') && ($('sl_out').innerHTML = `
    ${letterHeader('Löschungsantrag nach Art. 17 DSGVO')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}<br>Geburtsdatum: ${esc(d.birth || '[Geburtsdatum]')}</div>
    <div class="recipient">An:<br>${esc(auskunftei)}<br>${esc(auskunfteiAdr).replace(/\n/g,'<br>')}<br><em>z. Hd. Datenschutz/Löschstelle</em></div>
    <div class="date">${today()}</div>
    <div class="subject">Antrag auf Löschung gemäß Art. 17 DSGVO · Eintrag „${esc(eintrag)}"</div>
    <p>${tone.anrede || 'Sehr geehrte Damen und Herren,'}</p>
    <p>ich beantrage die <strong>sofortige Löschung</strong> des folgenden zu meiner Person gespeicherten Eintrags:</p>
    <table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px">
      <tr><td style="padding:8px 12px;background:rgba(0,0,0,.2);font-weight:700;width:35%">Bezeichnung</td><td style="padding:8px 12px;background:rgba(0,0,0,.15)">${esc(eintrag)}</td></tr>
      <tr><td style="padding:8px 12px;background:rgba(0,0,0,.2);font-weight:700">Vertragspartner</td><td style="padding:8px 12px;background:rgba(0,0,0,.15)">${esc(vertragspartner)}</td></tr>
      <tr><td style="padding:8px 12px;background:rgba(0,0,0,.2);font-weight:700">Eintragungsdatum</td><td style="padding:8px 12px;background:rgba(0,0,0,.15)">${esc(eintragDatum)}</td></tr>
    </table>
    <p><strong>Löschungsgrund:</strong></p>
    <p>${grundPresets[grund] || esc(begruendung)}</p>
    <p>Gemäß <strong>Art. 17 I lit. a DSGVO</strong> sind personenbezogene Daten unverzüglich zu löschen, wenn sie für die Zwecke, für die sie erhoben wurden, nicht mehr notwendig sind. Nach <strong>Art. 17 I lit. c DSGVO</strong> sind sie zu löschen, wenn die betroffene Person einen berechtigten Widerspruch nach Art. 21 I DSGVO erhebt.</p>
    <p>Ich berufe mich ferner auf die ständige Rechtsprechung:</p>
    <ul style="margin:8px 0 14px 24px;line-height:1.7">
      <li><strong>EuGH C-413/23 PPU „SCHUFA/Hauptsache"</strong> – Wirtschaftsauskunfteien sind Verantwortliche i. S. d. Art. 4 Nr. 7 DSGVO, soweit sie eigenständig Bonitäts­bewertungen abgeben.</li>
      <li><strong>BGH, Urt. v. 18.01.2022 – VI ZR 407/20</strong> – Keine zeitlich unbegrenzte Speicherung nach Tilgung; Erforderlichkeitsprüfung alle 3 Jahre.</li>
      <li><strong>EuGH C-230/14 „Weltimmo"</strong> – Niederlassungsbegriff für außereuropäische Anbieter bei Marktausrichtung.</li>
    </ul>
    <p><strong>Konkrete Frist:</strong> Bei erteilter Restschuldbefreiung ist der Eintrag nach der EuGH-Rechtsprechung <strong>spätestens nach 6 Monaten</strong> zu löschen. Bei sonstigen erledigten Forderungen gilt eine Regelspeicherfrist von längstens <strong>36 Monaten</strong> ab Tilgung, danach Erforderlichkeitsprüfung.</p>
    <p>Ich fordere Sie auf, den Eintrag bis spätestens <strong>${frist}</strong> zu löschen und mir die Löschung gemäß <strong>Art. 12 III DSGVO</strong> schriftlich zu bestätigen. Sollten Sie die Löschung ablehnen, bitte ich um eine <strong>ausführliche Begründung</strong> unter Angabe der konkreten Speicherfrist und des berechtigten Interesses nach Art. 6 I lit. f DSGVO.</p>
    ${renderReceiptsBlock('sl')}
    <p>${tone.eskal}</p>
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `);
}

// ============================================================
// === BRIEF 18: KI-OPT-OUT (UrhG § 44b) + robots.txt ===
// ============================================================
let _kiActive = 'letter';
function setKiTab(t){ _kiActive = t; document.querySelectorAll('.kitabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === t)); document.getElementById('ki-letter-tab').style.display = t==='letter'?'block':'none'; document.getElementById('ki-robots-tab').style.display = t==='robots'?'block':'none'; }

function renderKiOptout(){
  const d = getLetterData('ki');
  const anbieter = $('ki_anbieter')?.value || 'OpenAI Ireland Ltd';
  const anbieterAdr = $('ki_anbieter_adr')?.value || '[Anschrift des Anbieters]';
  const werke = $('ki_werke')?.value || '[z. B. „alle meine Texte auf meinem Blog example.com, alle meine Fotografien auf Instagram @meinname"]';
  const rechtsgrundlage = $('ki_rechtsgrundlage')?.value || 'urheberrecht';
  const tone = getTone('ki');
  const frist = tone.frist;

  $('ki_letter_out') && ($('ki_letter_out').innerHTML = `
    ${letterHeader('Widerspruch gegen KI-Training nach UrhG § 44b / DSGVO')}
    <div class="sender">${esc(d.name).replace(/\n/g,'<br>')}<br>${esc(d.addr).replace(/\n/g,'<br>')}</div>
    <div class="recipient">An:<br>${esc(anbieter)}<br>${esc(anbieterAdr).replace(/\n/g,'<br>')}<br><em>z. Hd. Datenschutz/Legal Department</em></div>
    <div class="date">${today()}</div>
    <div class="subject">Widerspruch gegen Nutzung meiner Werke für KI-Training (UrhG § 44b / Art. 21 DSGVO) <span class="legal-pill">§ 44b UrhG</span></div>
    <p>${tone.anrede || 'Sehr geehrte Damen und Herren,'}</p>
    <p>als Urheber nach <strong>§ 7 UrhG</strong> und Inhaber der ausschließlichen Nutzungsrechte nach <strong>§ 15 UrhG</strong> an folgenden Werken:</p>
    <blockquote style="margin:12px 0;padding:12px 16px;background:rgba(0,0,0,.2);border-left:3px solid var(--accent);font-style:italic">${esc(werke)}</blockquote>
    <p>widerspreche ich hiermit <strong>ausdrücklich</strong> der Nutzung dieser Werke für das <strong>Training, die Feinabstimmung (Fine-Tuning), das Reinforcement Learning from Human Feedback (RLHF) und jede sonstige Form der Reproduktion</strong> im Rahmen Ihrer KI-Modelle, einschließlich GPT-4, GPT-5, DALL·E, Sora, Gemini, Claude und nachgelagerter Modellgenerationen.</p>
    <p>Mein Widerspruch stützt sich auf folgende Rechtsgrundlagen:</p>
    <ul style="margin:8px 0 14px 24px;line-height:1.7">
      <li><strong>§ 44b UrhG (TDM-Schranken)</strong> – Die Text- und Data-Mining-Schranke nach § 44b I UrhG greift nur, wenn der Urheber nicht widersprochen hat. Mein Widerspruch ist jederzeit formfrei möglich und muss maschinenlesbar sein.</li>
      <li><strong>§ 97 UrhG (Unterlassungsanspruch)</strong> – Bei fortgesetzter Nutzung trotz Widerspruch steht mir ein Unterlassungsanspruch zu.</li>
      <li><strong>Art. 21 I DSGVO (Widerspruch)</strong> – Die Verarbeitung meiner personenbezogenen Daten (sofern es sich um Text-/Bildepositionen handelt) widerspreche ich aus Gründen, die sich aus meiner besonderen Situation ergeben.</li>
    </ul>
    <p>Ich fordere Sie auf:</p>
    <ol style="margin:8px 0 14px 24px;line-height:1.7">
      <li>meine Werke in Ihre <strong>robots.txt-Opt-Out-Liste</strong> aufzunehmen (GPTBot, Google-Extended, anthropic-ai, ClaudeBot, CCBot),</li>
      <li>bereits erstellte Trainingsdaten, die meine Werke enthalten, im Rahmen Ihrer regelmäßigen Modell-Updates zu entfernen,</li>
      <li>meine Werke in Ihrer internen <strong>Quellendatenbank</strong> als „nicht trainierbar" zu markieren,</li>
      <li>mir den Erhalt und die Umsetzung dieses Widerspruchs bis zum <strong>${frist}</strong> schriftlich zu bestätigen.</li>
    </ol>
    <p>Ich weise darauf hin, dass die einmal erteilte Einwilligung nach <strong>Art. 7 III DSGVO</strong> jederzeit widerruflich ist und die Verarbeitung ohne Rechtsgrundlage ab Widerruf rechtswidrig wird.</p>
    <p>Die technische Umsetzung dieses Widerspruchs wird durch eine korrespondierende <strong>robots.txt</strong> (siehe Generator im Tab "robots.txt") auf meiner Website ergänzt.</p>
    ${renderReceiptsBlock('ki')}
    <p>${tone.eskal}</p>
    <p>Mit freundlichen Grüßen</p>
    <p class="lp-sign">${tone.close},<br><br>_________________________<br>${esc(d.name)}</p>
    ${letterFoot()}
  `);
}

// === ROBOTS.TXT GENERATOR ===
const ROBOTS_PRESETS = {
  blockall: {label:'Alle KI-Bots blocken', bots:['GPTBot','ChatGPT-User','Google-Extended','Gemini-Bot','ClaudeBot','anthropic-ai','PerplexityBot','CCBot','Applebot-Extended','Bytespider','FacebookBot','Meta-ExternalAgent','Diffbot','DuckAssistBot','cohere-ai']},
  openai: {label:'Nur OpenAI (GPT, ChatGPT)', bots:['GPTBot','ChatGPT-User','OAI-SearchBot']},
  google: {label:'Nur Google (Gemini, Search AI)', bots:['Google-Extended','Gemini-Bot','Googlebot']},
  meta: {label:'Nur Meta (Facebook, Instagram)', bots:['Meta-ExternalAgent','FacebookBot','Meta-ExternalFetcher']},
  pluscc: {label:'Plus: Common Crawl (für Datasets)', bots:['CCBot']}
};

function renderRobotsTxt(){
  const sel = $('rb_preset')?.value || 'blockall';
  const extra = ($('rb_extra')?.value || '').split(',').map(s=>s.trim()).filter(Boolean);
  const allow = $('rb_allow')?.value || '/';
  const comment = $('rb_comment')?.value || '';
  const botList = [...new Set([...(ROBOTS_PRESETS[sel]?.bots || []), ...extra])];

  let code = '';
  if(comment) code += `# ${comment}\n`;
  code += `# Generiert am ${today()}\n`;
  code += `# Widerspruch nach UrhG § 44b (TDM) – alle aufgeführten KI-Bots erhalten\n# KEINEN Zugriff auf die Trainingsdaten Ihrer Werke.\n\n`;
  code += `User-agent: *\nDisallow: /admin/\nDisallow: /private/\nAllow: ${allow}\n\n`;
  if(botList.length === 0){
    code += `# Keine spezifischen KI-Bots blockiert – bitte oben auswählen.\n`;
  } else {
    code += `# === KI-Bot Opt-Out (UrhG § 44b) ===\n`;
    botList.forEach(bot => {
      code += `User-agent: ${bot}\nDisallow: /\n\n`;
    });
  }
  code += `# Sitemap (anpassen!):\n# Sitemap: https://example.com/sitemap.xml\n`;

  const out = $('rb_out');
  if(out) out.textContent = code;
  const hint = $('rb_count');
  if(hint) hint.textContent = `${botList.length} Bot${botList.length === 1 ? '' : 's'} geblockt`;
}

// ============================================================
// === BRIEF 19: WLAN-HAFTUNGSAUSSCHLUSS (Vertragsvorlage) ===
// ============================================================
function renderWlanHaftung(){
  const d = getLetterData('wh');
  const art = $('wh_art')?.value || 'wg';
  const anschlussName = $('wh_anschluss')?.value || '[Name Anschlussinhaber]';
  const anschlussAdr = $('wh_anschluss_adr')?.value || '[Anschrift Anschluss]';
  const gastName = $('wh_gast')?.value || '[Name Nutzer/Gast]';
  const gastAdr = $('wh_gast_adr')?.value || '[Anschrift Nutzer]';
  const zeitraum = $('wh_zeitraum')?.value || '01.01.2026 – 31.12.2026';
  const zweck = $('wh_zweck')?.value || 'private Mitbenutzung des WLAN-Anschlusses';
  const tone = getTone('wh');
  const frist = tone.frist;

  const artPresets = {
    wg: {heading:'WLAN-Mitbenutzungsvertrag (Wohngemeinschaft)', zusatz:'<p>Dieser Vertrag regelt die Mitbenutzung des bestehenden Internetanschlusses in der Wohngemeinschaft. Beide Parteien sind volljährig und in derselben Wohnung gemeldet.</p>'},
    airbnb: {heading:'WLAN-Nutzungsvereinbarung (Ferienwohnung / Airbnb)', zusatz:'<p>Dieser Vertrag regelt die Nutzung des Internetanschlusses durch Feriengäste während des gebuchten Aufenthalts. Eine kommerzielle Nutzung ist ausgeschlossen.</p>'},
    gast: {heading:'WLAN-Gastzugang-Vereinbarung', zusatz:'<p>Dieser Vertrag regelt die vorübergehende Nutzung des privaten Internetanschlusses durch einen persönlichen Gast. Die Nutzung ist freiwillig und unentgeltlich.</p>'}
  };
  const preset = artPresets[art] || artPresets.wg;

  $('wh_out') && ($('wh_out').innerHTML = `
    ${letterHeader(preset.heading)}
    <div style="margin:14px 0;padding:16px;background:rgba(14,165,233,.08);border:1px solid var(--border);border-radius:8px;font-size:12px">
      <strong>Zweck:</strong> Haftungsausschluss für den Anschlussinhaber gegen Störerhaftung (BGH, Urt. v. 12.05.2010 – I ZR 121/08 „Sommer unseres Lebens") und Schutz vor Abmahnungen wegen illegaler Downloads Dritter.
    </div>
    <h3 class="paragraph-heading" style="margin-top:18px;font-size:14px">§ 1 – Vertragsparteien</h3>
    <p><strong>Anschlussinhaber:</strong><br>${esc(anschlussName)}<br>${esc(anschlussAdr).replace(/\n/g,'<br>')}</p>
    <p><strong>Nutzer/Gast:</strong><br>${esc(gastName)}<br>${esc(gastAdr).replace(/\n/g,'<br>')}</p>
    <h3 class="paragraph-heading" style="margin-top:18px;font-size:14px">§ 2 – Vertragsgegenstand</h3>
    ${preset.zusatz}
    <p>Der Anschlussinhaber gestattet dem Nutzer die <strong>Mitbenutzung</strong> seines Internetanschlusses während des Zeitraums <strong>${esc(zeitraum)}</strong> zum Zweck <em>${esc(zweck)}</em>.</p>
    <h3 class="paragraph-heading" style="margin-top:18px;font-size:14px">§ 3 – Pflichten des Nutzers</h3>
    <ol style="margin:8px 0 14px 24px;line-height:1.7">
      <li>Der Nutzer verpflichtet sich, <strong>keine rechtswidrigen Handlungen</strong> über den Internetanschluss vorzunehmen – insbesondere keine urheberrechtlich geschützten Werke ohne Berechtigung herunterzuladen oder zu verbreiten (Filesharing, Tauschbörsen, Streaming illegaler Quellen).</li>
      <li>Der Nutzer verpflichtet sich, <strong>keine gewerbliche Nutzung</strong> vorzunehmen.</li>
      <li>Der Nutzer verpflichtet sich, den Anschluss <strong>nicht für Angriffe</strong> auf fremde Systeme, Spamming, Phishing oder sonstige strafbare Handlungen zu nutzen.</li>
      <li>Der Nutzer wird darauf hingewiesen, dass die IP-Adresse des Anschlusses bei Rechtsverletzungen <strong>ihm zugeordnet</strong> werden kann (BGH I ZR 74/12).</li>
    </ol>
    <h3 class="paragraph-heading" style="margin-top:18px;font-size:14px">§ 4 – Haftungsausschluss (Störerhaftung)</h3>
    <p>Der <strong>Anschlussinhaber übernimmt keinerlei Haftung</strong> für Handlungen, die der Nutzer über den Internetanschluss vornimmt. Der Nutzer stellt den Anschlussinhaber <strong>vollumfänglich von sämtlichen Ansprüchen Dritter</strong> frei, die aus einer rechtswidrigen Nutzung des Anschlusses durch den Nutzer resultieren – einschließlich:</p>
    <ul style="margin:8px 0 14px 24px;line-height:1.7">
      <li>Abmahnkosten und Anwaltskosten aus Urheberrechtsverletzungen,</li>
      <li>Schadensersatzforderungen,</li>
      <li>Vertragsstrafen aus Filesharing-Abmahnungen,</li>
      <li>Strafverfolgungskosten (soweit gesetzlich zulässig).</li>
    </ul>
    <h3 class="paragraph-heading" style="margin-top:18px;font-size:14px">§ 5 – Sicherheitsmaßnahmen</h3>
    <p>Dem Nutzer ist bekannt, dass die WLAN-Schnittstelle durch ein <strong>individuelles Passwort</strong> gesichert ist. Das Passwort darf nicht an Dritte weitergegeben werden. Die Nutzung erfolgt über einen vom Anschlussinhaber eingerichteten <strong>Gastzugang mit eigener SSID</strong>, sofern technisch möglich.</p>
    <h3 class="paragraph-heading" style="margin-top:18px;font-size:14px">§ 6 – Datenschutz / Protokollierung</h3>
    <p>Der Anschlussinhaber wird über die Nutzung des Anschlusses <strong>kein Nutzerprofil</strong> erstellen. Die im Router gespeicherten Verbindungsdaten (Datum, Zeit, IP) werden nur im Falle einer <strong>berechtigten Auskunftsanfrage</strong> durch Strafverfolgungsbehörden oder Rechteinhaber nach den Vorgaben der DSGVO und des TTDSG herausgegeben.</p>
    <h3 class="paragraph-heading" style="margin-top:18px;font-size:14px">§ 7 – Vertragsbeendigung</h3>
    <p>Der Vertrag endet automatisch mit Ablauf des in § 2 genannten Zeitraums. Das <strong>WLAN-Passwort wird bei Vertragsende ungültig</strong>. Der Nutzer hat keinen Anspruch auf Verlängerung.</p>
    <h3 class="paragraph-heading" style="margin-top:18px;font-size:14px">§ 8 – Schlussbestimmungen</h3>
    <p>Änderungen und Ergänzungen dieses Vertrages bedürfen der <strong>Schriftform</strong>. Sollte eine Bestimmung dieses Vertrages unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist – soweit zulässig – der Wohnsitz des Anschlussinhabers.</p>
    <div style="margin-top:30px;display:grid;grid-template-columns:1fr 1fr;gap:30px;font-size:12px">
      <div>
        <p>________________________<br><strong>${esc(anschlussName)}</strong><br><em>Anschlussinhaber</em><br>Ort, Datum: __________________</p>
      </div>
      <div>
        <p>________________________<br><strong>${esc(gastName)}</strong><br><em>Nutzer/Gast</em><br>Ort, Datum: __________________</p>
      </div>
    </div>
    <p style="margin-top:24px;padding:12px;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.3);border-radius:8px;font-size:11px;color:#fbbf24">⚠️ <strong>Hinweis:</strong> Die Anwesenheit beider Vertragsparteien bei Unterzeichnung wird empfohlen, da die rechtssichere Zuordnung der IP-Adresse nach BGH-Rechtsprechung (BGH I ZR 121/08) eine klare vertragliche Regelung der WLAN-Mitbenutzung erfordert. Bei Mietverhältnissen ist zusätzlich die Zustimmung des Vermieters empfehlenswert.</p>
  `);
}

// ============================================================
// === TOOL: PASSWORT-GENERATOR (Cybersecurity Toolkit) ===
// ============================================================
const PWD_CHARS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digit: '0123456789',
  special: '!@#$%^&*()_+-=[]{}|;:,.<>?/~'
};

function regenPassword(){
  const length = parseInt($('pwd_len')?.value || '20');
  const incLower = $('pwd_lower')?.checked ?? true;
  const incUpper = $('pwd_upper')?.checked ?? true;
  const incDigit = $('pwd_digit')?.checked ?? true;
  const incSpecial = $('pwd_special')?.checked ?? true;

  let pool = '';
  const required = [];
  if(incLower){ pool += PWD_CHARS.lower; required.push(PWD_CHARS.lower[Math.floor(Math.random()*PWD_CHARS.lower.length)]); }
  if(incUpper){ pool += PWD_CHARS.upper; required.push(PWD_CHARS.upper[Math.floor(Math.random()*PWD_CHARS.upper.length)]); }
  if(incDigit){ pool += PWD_CHARS.digit; required.push(PWD_CHARS.digit[Math.floor(Math.random()*PWD_CHARS.digit.length)]); }
  if(incSpecial){ pool += PWD_CHARS.special; required.push(PWD_CHARS.special[Math.floor(Math.random()*PWD_CHARS.special.length)]); }

  if(pool.length === 0){ pool = PWD_CHARS.lower; }

  const chars = [...required];
  for(let i = chars.length; i < length; i++){
    chars.push(pool[Math.floor(Math.random()*pool.length)]);
  }
  // Shuffle (Fisher-Yates)
  for(let i = chars.length - 1; i > 0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  const pwd = chars.join('');

  const out = $('pwd_out');
  if(out) out.textContent = pwd;
  if($('pwd_lenv')) $('pwd_lenv').textContent = length;
  if($('pwd_countv')) $('pwd_countv').textContent = pool.length;

  // Strength calculation (NIST-inspired)
  const hasLower = /[a-z]/.test(pwd);
  const hasUpper = /[A-Z]/.test(pwd);
  const hasDigit = /[0-9]/.test(pwd);
  const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
  const types = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
  const entropy = Math.log2(Math.pow(pool.length, length));
  let strength = 0, label = 'Sehr schwach', color = 'var(--danger)';
  if(length >= 8 && types >= 2){ strength = 25; label = 'Schwach'; color = 'var(--danger)'; }
  if(length >= 12 && types >= 3){ strength = 50; label = 'Mittel'; color = 'var(--warn)'; }
  if(length >= 16 && types >= 4){ strength = 75; label = 'Stark'; color = 'var(--accent)'; }
  if(length >= 20 && types >= 4 && entropy >= 80){ strength = 100; label = 'Sehr stark'; color = 'var(--good)'; }

  const bar = $('pwd_bar');
  if(bar){ bar.style.width = strength+'%'; bar.style.background = color; }
  if($('pwd_strength_label')) $('pwd_strength_label').textContent = label;
  if($('pwd_entropy')) $('pwd_entropy').textContent = Math.round(entropy) + ' bit';
}

function copyPassword(){
  const pwd = $('pwd_out')?.textContent || '';
  if(!pwd) return;
  navigator.clipboard.writeText(pwd).then(()=>{
    toast('Passwort in Zwischenablage kopiert','success',pwd.substring(0,20)+'…');
  }).catch(()=>{
    const ta = document.createElement('textarea');
    ta.value = pwd; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    toast('Passwort kopiert','success');
  });
}

// ============================================================
// === TOOL: 2FA-CHECKLISTE (Cybersecurity Toolkit) ===
// ============================================================
const TFA_PROVIDERS = [
  {
    id:'google', name:'Google', icon:'🔍', steps:[
      {t:'2FA aktivieren', d:'Google-Konto → Sicherheit → 2-Schritt-Verifizierung aktivieren (myaccount.google.com/signinoptions/two-step-verification).',c:'critical'},
      {t:'Authenticator-App einrichten', d:'Google Authenticator oder eine Hardware-Sicherheits­variante (Titan, YubiKey) hinzufügen.',c:'critical'},
      {t:'Backup-Codes sichern', d:'10 Einmal-Codes herunterladen und offline (z. B. ausgedruckt im Tresor) aufbewahren.',c:'critical'},
      {t:'Wiederherstellungsnummer', d:'Eine Telefonnummer als Backup-Option hinterlegen – alternativ weglassen für maximale Sicherheit.',c:'important'},
      {t:'Geräte-Liste prüfen', d:'Alle angemeldeten Geräte regelmäßig kontrollieren (Sicherheit → Ihre Geräte).',c:'important'},
      {t:'App-Passwörter deaktivieren', d:'Ältere App-spezifische Passwörter entfernen, wenn nicht mehr benötigt.',c:'optional'}
    ]
  },
  {
    id:'meta', name:'Meta (Facebook, Instagram, WhatsApp)', icon:'📘', steps:[
      {t:'2FA in Facebook aktivieren', d:'Einstellungen → Sicherheit & Login → Zwei-Faktor-Authentifizierung verwenden.',c:'critical'},
      {t:'Authenticator-App bevorzugen', d:'Nicht nur SMS (SIM-Swapping-Risiko), sondern TOTP via Google Authenticator / Authy.',c:'critical'},
      {t:'Wiederherstellungscodes sichern', d:'Codes herunterladen und offline speichern – sie sind der einzige Weg zurück bei Geräteverlust.',c:'critical'},
      {t:'Instagram-2FA', d:'Einstellungen → Sicherheit → Zwei-Faktor-Authentifizierung (separater Login nötig).',c:'important'},
      {t:'WhatsApp-2FA', d:'Einstellungen → Account → Verifizierung in zwei Schritten → 6-stellige PIN setzen.',c:'important'},
      {t:'Vertrauenswürdige Kontakte', d:'3–5 Freunde als vertrauenswürdige Kontakte für Notfall-Wiederherstellung festlegen.',c:'optional'}
    ]
  },
  {
    id:'apple', name:'Apple ID', icon:'🍎', steps:[
      {t:'Zwei-Faktor-Authentifizierung aktivieren', d:'appleid.apple.com → Anmelden & Sicherheit → Zwei-Faktor-Authentifizierung (iOS: Einstellungen → [Name] → Anmelden & Sicherheit).',c:'critical'},
      {t:'Vertrauenswürdige Geräte pflegen', d:'Nur Geräte im Login, die physisch vorhanden sind. Bei Verkauf: „Aus Account entfernen".',c:'critical'},
      {t:'Wiederherstellungsschlüssel', d:'appleid.apple.com → Anmelden & Sicherheit → Wiederherstellungsschlüssel generieren und sicher aufbewahren.',c:'critical'},
      {t:'Account-Wiederherstellungskontakte', d:'appleid.apple.com → Anmelden & Sicherheit → Account-Wiederherstellungskontakte hinzufügen (1–2 vertrauenswürdige Personen).',c:'important'},
      {t:'Physische Sicherheitsschlüssel', d:'Apple unterstützt YubiKey/FIDO2 für Apple ID (ab 2023) – empfohlen für Hochsicherheits-Accounts.',c:'optional'},
      {t:'iCloud Private Relay', d:'appleid.apple.com → iCloud → Privater Relay aktivieren (verschleiert IP bei Safari-Browsing).',c:'optional'}
    ]
  },
  {
    id:'paypal', name:'PayPal', icon:'💰', steps:[
      {t:'2FA aktivieren', d:'Einstellungen → Sicherheit → 2-Schritt-Verifizierung. SMS oder Authenticator-App möglich.',c:'critical'},
      {t:'Authenticator statt SMS', d:'TOTP via Google Authenticator / Authy statt SMS (SIM-Swapping-Schutz).',c:'critical'},
      {t:'Sicherheitsfragen ändern', d:'Antworten nicht auf realen persönlichen Daten basieren (z. B. Phantasie-Antworten).',c:'important'},
      {t:'Geräte-Verwaltung prüfen', d:'Einstellungen → Sicherheit → Verwalten, welche Geräte eingeloggt sind.',c:'important'},
      {t:'Auto-Login deaktivieren', d:'Bei PayPal immer mit Passwort-Eingabe anmelden – kein Auto-Login im Browser.',c:'important'},
      {t:'Bewegungsbenachrichtigungen', d:'Push- oder E-Mail-Benachrichtigung bei jeder Transaktion aktivieren.',c:'optional'}
    ]
  },
  {
    id:'microsoft', name:'Microsoft 365 / Outlook', icon:'🪟', steps:[
      {t:'2FA aktivieren', d:'account.microsoft.com → Sicherheit → Erweiterte Sicherheitsoptionen → Zwei-Faktor-Authentifizierung.',c:'critical'},
      {t:'Microsoft Authenticator App', d:'App installieren und als zweite Stufe einrichten (Push-Approval, sicherer als SMS).',c:'critical'},
      {t:'Wiederherstellungscode', d:'account.microsoft.com → Sicherheit → Wiederherstellungscode generieren und offline speichern.',c:'critical'},
      {t:'Konto ohne Passwort (Passwordless)', d:'Microsoft unterstützt passwortlosen Login per Authenticator oder Windows Hello – maximaler Schutz.',c:'important'},
      {t:'Anmeldeaktivität überwachen', d:'account.microsoft.com → Sicherheit → Anmeldeaktivität regelmäßig prüfen.',c:'important'},
      {t:'App-Berechtigungen reduzieren', d:'Nicht genutzte App-Verbindungen (z. B. veraltete Drittanbieter) widerrufen.',c:'optional'}
    ]
  },
  {
    id:'github', name:'GitHub', icon:'💻', steps:[
      {t:'2FA aktivieren', d:'Settings → Password and authentication → Enable two-factor authentication.',c:'critical'},
      {t:'TOTP bevorzugen', d:'Authy oder Google Authenticator (nicht SMS).',c:'critical'},
      {t:'Backup-Codes sichern', d:'16 Codes herunterladen und im Passwort-Safe ablegen.',c:'critical'},
      {t:'Hardware-Sicherheitsschlüssel (FIDO2)', d:'YubiKey / Titan Key als primäre 2FA-Methode – schützt vor Phishing.',c:'important'},
      {t:'Sitzungen prüfen', d:'Settings → Sessions: alle aktiven Sitzungen regelmäßig kontrollieren.',c:'important'},
      {t:'SSH-Keys + PATs pflegen', d:'Alte SSH-Keys und Personal Access Tokens löschen, die nicht mehr benötigt werden.',c:'optional'}
    ]
  }
];

function renderTfaCheckliste(){
  // State persists in localStorage
  if(!window._tfaState) window._tfaState = {};
  const c = 'vb_tfa_v1';
  try { window._tfaState = JSON.parse(localStorage.getItem(c) || '{}'); } catch(e){ window._tfaState = {}; }
  const saveTfa = () => { try { localStorage.setItem(c, JSON.stringify(window._tfaState)); } catch(e){} };

  const cont = $('tfa_grid');
  if(!cont) return;
  cont.innerHTML = TFA_PROVIDERS.map(p => {
    const total = p.steps.length;
    const done = p.steps.filter((_,i) => window._tfaState[p.id+'_'+i]).length;
    const pct = Math.round(done/total*100);
    const status = done === 0 ? 'none' : (done === total ? 'full' : 'partial');
    return `
    <div class="tfa-card">
      <div class="tfa-card-head">
        <h3><span class="ico">${p.icon}</span>${p.name}</h3>
        <span class="tfa-progress" data-done="${status}">${done}/${total} (${pct}%)</span>
      </div>
      ${p.steps.map((s,i) => `
        <label class="tfa-step">
          <input type="checkbox" data-tfa="${p.id}_${i}" ${window._tfaState[p.id+'_'+i] ? 'checked' : ''}>
          <div class="tfa-step-text">
            <strong>${s.t}</strong>
            <small>${s.d}</small>
          </div>
        </label>
      `).join('')}
    </div>
    `;
  }).join('');

  cont.querySelectorAll('input[data-tfa]').forEach(cb => {
    cb.onchange = () => {
      window._tfaState[cb.dataset.tfa] = cb.checked;
      saveTfa();
      // Re-render this card only to update counter
      const card = cb.closest('.tfa-card');
      const id = cb.dataset.tfa.split('_')[0];
      const p = TFA_PROVIDERS.find(x => x.id === id);
      const total = p.steps.length;
      const done = p.steps.filter((_,i) => window._tfaState[p.id+'_'+i]).length;
      const pct = Math.round(done/total*100);
      const status = done === 0 ? 'none' : (done === total ? 'full' : 'partial');
      const prog = card.querySelector('.tfa-progress');
      prog.textContent = `${done}/${total} (${pct}%)`;
      prog.dataset.done = status;
    };
  });
}

// === HELFER: Provider-Presets ===
const SCHUFA_PRESETS = {
  'SCHUFA Holding AG':'Kormoranweg 5, 65201 Wiesbaden',
  'CRIF Bürgel GmbH':'Radlkoferstraße 2, 81373 München',
  'Infoscore Consumer Data GmbH':'Ruschestraße 1, 10367 Berlin',
  'Creditreform':'Hellersbergstraße 12, 41460 Neuss'
};
function updateSchufaPreset(prefix){
  const sel = $(prefix+'_auskunftei')?.value;
  const adr = $(prefix+'_auskunftei_adr');
  if(adr && SCHUFA_PRESETS[sel]){
    adr.value = SCHUFA_PRESETS[sel];
  }
}
const KI_PROVIDER_ADRESSEN = {
  'OpenAI Ireland Ltd':'1st Floor, The Liffey Trust Centre, 117-126 Sheriff Street Upper, Dublin 1, D01 YC43, Irland',
  'Anthropic Ireland Ltd':'3 Dublin Landings, North Wall Quay, Dublin 1, D01 C4E0, Irland',
  'Google Ireland Ltd':'Gordon House, Barrow Street, Dublin 4, D04 E5W5, Irland',
  'Meta Platforms Ireland Ltd':'4 Grand Canal Square, Dublin 2, D02 X525, Irland',
  'Microsoft Ireland Operations Ltd':'One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, D18 P521, Irland',
  'Mistral AI SAS':'15 Rue des Martyrs, 75009 Paris, Frankreich'
};
function updateKiProvider(){
  const sel = $('ki_anbieter')?.value;
  const adr = $('ki_anbieter_adr');
  if(adr && KI_PROVIDER_ADRESSEN[sel]){
    adr.value = KI_PROVIDER_ADRESSEN[sel];
  }
}

// === KEYBOARD ===
document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){
    document.querySelector('aside')?.classList.remove('open');
    $('modalOverlay')?.classList.remove('open');
  }
  if(e.ctrlKey && e.key === 'p'){ e.preventDefault(); window.print(); }
});

// === INIT ===
save();
renderStats();
renderDashboard();
calcAbmahn();
calcStrafe();
calcSchaden();
renderFristen();

// Heutiges Datum für Frist-Tracker Default
['fr-start'].forEach(id => { const el = $(id); if(el && !el.value) el.value = todayISO(); });


// Exports to window
window.toggleLang = toggleLang;
window.applyI18n = applyI18n;
window.renderBrief = renderBrief;
window.toast = toast;
window.openModal = openModal;
window.closeModal = closeModal;
window.switchView = switchView;
window.def = def;
window.save = save;
window.renderStats = renderStats;
window.renderDashboard = renderDashboard;
window.renderDashboard = renderDashboard;
window.getTone = getTone;
window.getReceipts = getReceipts;
window.renderReceiptsBlock = renderReceiptsBlock;
window.getLetterData = getLetterData;
window.letterHeader = letterHeader;
window.letterFoot = letterFoot;
window.renderBrief1 = renderBrief1;
window.renderBrief2 = renderBrief2;
window.renderBrief3 = renderBrief3;
window.renderBrief4 = renderBrief4;
window.renderBrief5 = renderBrief5;
window.renderBrief6 = renderBrief6;
window.renderBrief7 = renderBrief7;
window.renderBrief8 = renderBrief8;
window.renderBrief9 = renderBrief9;
window.renderBrief10 = renderBrief10;
window.renderBrief11 = renderBrief11;
window.renderBrief12 = renderBrief12;
window.renderBrief13 = renderBrief13;
window.renderBrief14 = renderBrief14;
window.calcAbmahn = calcAbmahn;
window.calcStrafe = calcStrafe;
window.calcSchaden = calcSchaden;
window.addFrist = addFrist;
window.renderFristen = renderFristen;
window.renderArchive = renderArchive;
window.exportData = exportData;
window.confirmReset = confirmReset;
window.getLetterHTML = getLetterHTML;
window.getLetterPlainText = getLetterPlainText;
window.copyBrief = copyBrief;
window.downloadBrief = downloadBrief;
window.copyCode = copyCode;
window.downloadCode = downloadCode;
window.printView = printView;
window.renderDsgvoSchaden = renderDsgvoSchaden;
window.renderSchufaAuskunft = renderSchufaAuskunft;
window.renderSchufaLoeschung = renderSchufaLoeschung;
window.setKiTab = setKiTab;
window.renderKiOptout = renderKiOptout;
window.renderRobotsTxt = renderRobotsTxt;
window.renderWlanHaftung = renderWlanHaftung;
window.regenPassword = regenPassword;
window.copyPassword = copyPassword;
window.renderTfaCheckliste = renderTfaCheckliste;
window.updateSchufaPreset = updateSchufaPreset;
window.updateKiProvider = updateKiProvider;
window.copyBrief = copyBrief;
window.downloadBrief = downloadBrief;

}