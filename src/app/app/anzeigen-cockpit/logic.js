export function initCockpit() {


    (function(){
      const blocked = (e) => {
        const tag = (e.target.tagName || '').toLowerCase();
        if(['input','textarea','select'].includes(tag)) return false;
        if(e.target.isContentEditable) return false;
        return true;
      };
      document.addEventListener('contextmenu', e => { if(blocked(e)) e.preventDefault(); });
      document.addEventListener('copy', e => { if(blocked(e)) e.preventDefault(); });
      document.addEventListener('cut',  e => { if(blocked(e)) e.preventDefault(); });
      document.addEventListener('paste', e => { if(blocked(e)) e.preventDefault(); });
      /* Debugger removed */
      /* Anti-Tamper check removed for Next.js */
    })();
    

/* === CORE STATE === */
const STORE_KEY = "vorlagenbude_anzeigen_cockpit_v3";
const STATE_VERSION = 3;
const MODULES = ['ueberlastung', 'kindeswohl', 'strafanzeige', 'mietmangel', 'ordnungsamt', 'datenschutz', 'gewerbe', 'tier', 'finanzamt'];
let currentModule = 'ueberlastung';
let activeWeapons = new Set();
let currentShipMethod = 'einschreiben';

const defaultState = () => ({
  meta: { version: STATE_VERSION, createdAt: Date.now(), updatedAt: Date.now(), language: 'de', mode: 'dark', currentModule: 'ueberlastung' },
  modules: {
    ueberlastung: {
      inputs: { sender:'', senderAddr:'', personalnr:'', receiver:'', date:'', area:'', subject:'Überlastungsanzeige / Gefährdungsanzeige', body:'', stage:'1', frist:5, reaction:'offen' },
      arsenal: [], ship: { method:'einschreiben', tracking:'', date:'', note:'' }, anonymize: false
    },
    kindeswohl: {
      // Bug-Fix #11: Default-Werte für alle Stages/Fristen
      inputs: { sender:'', senderAddr:'', role_observer:'', kind_name:'', kind_alter:'', sorge1:'', sorge2:'', kind_wohnort:'', empf_typ:'jugendamt', receiver:'', date:'', subject:'', body:'', kategorie:'', anonymitaet:false, frist:3, reaction:'offen' },
      arsenal: [], ship: { method:'einschreiben', tracking:'', date:'', note:'' }, anonymize: true
    },
    strafanzeige: {
      inputs: { sender:'', senderAddr:'', receiver:'', date:'', tat_zeit:'', tat_ort:'', taeter:'', zeugen:'', beweise:'', schaden:'', rechtsgut:'', subject:'', body:'', straftat:'', frist:7, reaction:'offen' },
      arsenal: [], ship: { method:'einschreiben', tracking:'', date:'', note:'' }, anonymize: false
    },
    mietmangel: {
      // Bug-Fix #11: frist_maengel (Mängelbehebung) klar getrennt von frist (Eskalation)
      inputs: { sender:'', senderAddr:'', mietobjekt:'', mietbeginn:'', vermieter_name:'', vermieter_adr:'', mangel_seit:'', mangel_art:'', mietminderung_pct:0, frist_maengel:14, receiver:'', date:'', subject:'', body:'', frist:14, reaction:'offen' },
      arsenal: [], ship: { method:'einschreiben', tracking:'', date:'', note:'' }, anonymize: false
    },
    ordnungsamt: {
      inputs: { sender:'', senderAddr:'', receiver:'', date:'', subject:'', body:'', frist:7, reaction:'offen' },
      arsenal: [], ship: { method:'einschreiben', tracking:'', date:'', note:'' }, anonymize: false
    },
    datenschutz: {
      inputs: { sender:'', senderAddr:'', receiver:'', date:'', subject:'', body:'', frist:14, reaction:'offen' },
      arsenal: [], ship: { method:'einschreiben', tracking:'', date:'', note:'' }, anonymize: false
    },
    gewerbe: {
      inputs: { sender:'', senderAddr:'', receiver:'', date:'', subject:'', body:'', frist:7, reaction:'offen' },
      arsenal: [], ship: { method:'einschreiben', tracking:'', date:'', note:'' }, anonymize: true
    },
    tier: {
      inputs: { sender:'', senderAddr:'', receiver:'', date:'', subject:'', body:'', frist:3, reaction:'offen' },
      arsenal: [], ship: { method:'einschreiben', tracking:'', date:'', note:'' }, anonymize: true
    },
    finanzamt: {
      inputs: { sender:'', senderAddr:'', receiver:'', date:'', subject:'', body:'', frist:14, reaction:'offen' },
      arsenal: [], ship: { method:'einschreiben', tracking:'', date:'', note:'' }, anonymize: true
    }
  },
  shared: {
    incidents: [], recipients: [], evidence: {}
  }
});

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.meta && parsed.meta.version === STATE_VERSION) {
        // Bug-Fix #37: Merge mit Defaults damit keine Module fehlen
        const def = defaultState();
        MODULES.forEach(m => {
          if (!parsed.modules[m]) {
            parsed.modules[m] = def.modules[m];
          } else {
            // Auch inputs prüfen
            if (!parsed.modules[m].inputs) parsed.modules[m].inputs = def.modules[m].inputs;
            if (!parsed.modules[m].arsenal) parsed.modules[m].arsenal = [];
            if (!parsed.modules[m].ship) parsed.modules[m].ship = def.modules[m].ship;
            if (typeof parsed.modules[m].anonymize === 'undefined') parsed.modules[m].anonymize = false;
          }
        });
        if (!parsed.shared) parsed.shared = { incidents: [], recipients: [], evidence: {} };
        return parsed;
      }
    }
  } catch(e) { console.warn('[loadState] parse error:', e); }
  return defaultState();
}

function saveState() {
  state.meta.updatedAt = Date.now();
  // Bug-Fix #12: try/catch für localStorage-Quota
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch(e) {
    if (e.name === 'QuotaExceededError' || (e.code && e.code === 22)) {
      console.error('[saveState] localStorage quota exceeded — auto-cleanup');
      // Cleanup: alte Incidents/Recipients begrenzen
      if (state.shared.incidents.length > 100) {
        state.shared.incidents = state.shared.incidents.slice(-100);
      }
      if (state.shared.recipients.length > 50) {
        state.shared.recipients = state.shared.recipients.slice(-50);
      }
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(state));
        toast('⚠️ Speicher voll — alte Vorfälle/Empfänger gekürzt', 'warn');
      } catch(e2) {
        toast('❌ Speicher komplett voll — Daten nicht gespeichert', 'warn');
      }
    } else {
      console.error('[saveState]', e);
    }
  }
}

function cur() { return state.modules[currentModule]; }

/* === I18N === */
const I18N = {
  de: {
    logoText: "Anzeigen-Cockpit",
    modUeberlastung: "Überlastung", modKindeswohl: "Kindeswohl", modStrafanzeige: "Strafanzeige", modMietmangel: "Mietmangel",
    modOrdnungsamt: "Ordnungsamt", modDatenschutz: "DSGVO", modGewerbe: "Gewerbeaufsicht", modTier: "Veterinäramt", modFinanzamt: "Finanzamt",
    p_all_sender: "Dein Name", p_all_senderAddr: "Deine Anschrift", p_all_receiver: "Empfänger",
    sidebarSubtitle: "Gefährdungsanzeige",
    tabBrief: "Brief", tabVorfall: "Vorfälle", tabRecipient: "Empfänger",
    tabEskalation: "Eskalation", tabShip: "Versand", tabEvidence: "Beweise",
    alertUeberlastung: "💡 <b>Haftungsschutz:</b> Diese Anzeige überträgt die Verantwortung für Fehler aus Personalmangel auf den Arbeitgeber.",
    alertKindeswohl: "🛡️ <b>Kinderschutz:</b> Bei akuter Gefahr für das Kindeswohl ist sofortiges Handeln erforderlich. Im Notfall Polizei 110 rufen.",
    alertStrafanzeige: "🚔 <b>Strafanzeige:</b> Online-Delikte haben oft nur kurze Ermittlungsfristen — schnell handeln.",
    alertMietmangel: "🏠 <b>Mietmangel:</b> Mängelanzeige schützt dich vor Mietminderungsverlust und Kündigung wegen Mietrückstand.",
    sectTemplate: "1. Schnell-Vorlage", sectSubject: "2. Betreff", sectBody: "Haupttext", sectArsenal: "Rechtsgrundlagen",
    customOpt: "-- Eigene Vorlage (Leer) --",
    btnCopy: "Kopieren", btnPdf: "PDF",
    vorfallInfo: "📅 Dokumentiere jeden Vorfall — Datum, Zeit, was passiert ist, Zeugen.",
    btnAddIncident: "＋ Vorfall dokumentieren", sectIncidentList: "Dokumentierte Vorfälle",
    btnIncidentsToBody: "→ In Brief übernehmen", btnClearIncidents: "Alle löschen",
    recipientInfo: "📬 Mehrere Empfänger verwalten — Primary wird im Brief verwendet.",
    sectRecipients: "Empfänger-Liste", sectNewRecipient: "＋ Neuer Empfänger",
    btnAddRecipient: "＋ Empfänger hinzufügen",
    eskalationInfo: "🚨 Eskalation nur wenn Stufen davor nicht fruchten.",
    sectTimeline: "Eskalations-Timeline", sectReaction: "Reaktionsfrist",
    sectFristBerechnung: "Frist-Berechnung", versandInfo: "📮 Versand-Art entscheidet über Beweiskraft.",
    sectShipMethod: "Versand-Art wählen", sectTracking: "Sendungs-Tracking",
    shipEinschreiben: "Mit Rückschein", shipPers: "Gegen Bestätigung", shipEmail: "Schnell", shipFax: "Mit Protokoll",
    evidenceInfo: "🔍 Beweissicherung entscheidet über Erfolg.",
    sectEvidenceChecklist: "Checkliste Beweissicherung",
    anonymInfo: "🎭 Ersetze sensible Daten im PDF.", lblAnonym: "Anonymisiertes PDF",
    sectAnonym: "Anonymisierung",
    lblIncidentDate: "Datum", lblIncidentTime: "Uhrzeit", lblIncidentCategory: "Kategorie",
    lblIncidentDesc: "Was ist passiert?", lblIncidentWitness: "Zeugen (optional)",
    lblRName: "Name / Stelle", lblRRole: "Rolle", lblRAddr: "Anschrift",
    lblFrist: "Frist (Tage)", lblReaction: "Reaktion",
    reactOpen: "Noch offen", reactTeilweise: "Teilweise", reactVoll: "Vollständig", reactIgnoriert: "Ignoriert",
    lblSendungsnr: "Sendungs-Nr.", lblSendDate: "Versand-Datum", lblShipNote: "Notizen",
    arsenalInfo: "⚖️ Wähle die passenden Rechtsgrundlagen.", arsenalHelp: "Klicken zum Hinzufügen",

    // Module: ÜBERLASTUNG
    p_ueberlastung_sender: "Dein Name", p_ueberlastung_senderAddr: "Deine Privatanschrift",
    p_ueberlastung_personalnr: "Personalnummer (optional)", p_ueberlastung_receiver: "An (z.B. Geschäftsführung, PDL)",
    p_ueberlastung_area: "Betroffener Bereich", p_ueberlastung_subject: "Betreff",

    // Module: KINDESWOHL
    p_kind_sender: "Dein Name (Hinweisgeber/in)", p_kind_senderAddr: "Deine Anschrift",
    p_kind_role: "Deine Rolle (z.B. Lehrer/in, Nachbar/in)",
    p_kind_name: "Name des Kindes", p_kind_alter: "Alter",
    p_kind_sorge1: "Sorgeberechtigte/r (Mutter)", p_kind_sorge2: "Sorgeberechtigte/r (Vater)",
    p_kind_wohnort: "Wohnort des Kindes",
    p_kind_empf_typ: "Empfänger-Typ",
    p_kind_kategorie: "Beobachtungs-Kategorie",
    p_kind_anonymitaet: "Anonym bleiben / Schweigepflicht beachten",
    subjPlaceholder: "z.B. Gefährdungsanzeige gem. § 15 ArbSchG",
    bodyPlaceholder: "Sehr geehrte Damen und Herren,\n\nhiermit zeige ich an...",

    // Module: STRAFANZEIGE
    p_str_receiver: "An (Polizei / Staatsanwaltschaft)",
    p_str_tat_zeit: "Tatzeit (Datum + Uhrzeit)", p_str_tat_ort: "Tatort",
    p_str_taeter: "Täter-Beschreibung", p_str_zeugen: "Zeugen",
    p_str_beweise: "Beweismittel", p_str_schaden: "Schadenshöhe (€)",
    p_str_rechtsgut: "Rechtsgut / Straftatbestand", p_str_straftat: "Straftat",

    // Module: MIETMANGEL
    p_mie_mietobjekt: "Mietobjekt (Adresse, Wohnung, Etage)",
    p_mie_mietbeginn: "Mietbeginn", p_mie_vermieter_name: "Vermieter / Hausverwaltung",
    p_mie_vermieter_adr: "Anschrift Vermieter",
    p_mie_mangel_seit: "Mangel besteht seit",
    p_mie_mangel_art: "Mangel-Art", p_mie_mietminderung_pct: "Mietminderung (%)",
    p_mie_frist_maengel: "Frist zur Mängelbehebung (Tage)",

    // Receiver types
    recKind_jugendamt: "Jugendamt", recKind_familiengericht: "Familiengericht",
    recKind_beratungsstelle: "Beratungsstelle", recKind_polizei: "Polizei (Notfall)", recKind_schule: "Schule / Kita",
    recStr_polizei: "Polizei", recStr_staatsanwaltschaft: "Staatsanwaltschaft", recStr_versicherung: "Versicherung",
    recMie_vermieter: "Vermieter", recMie_hausverwaltung: "Hausverwaltung",
    recMie_mieterverein: "Mieterverein", recMie_anwalt: "Anwalt",

    // Recipients
    role_ueb_vorgesetzter: "Direkter Vorgesetzter", role_ueb_pdl: "Pflegedienstleitung",
    role_ueb_gf: "Geschäftsführung", role_ueb_br: "Betriebsrat",
    role_ueb_personal: "Personalabteilung", role_ueb_sicherheit: "Fachkraft für Arbeitssicherheit",
    role_ueb_arzt: "Betriebsarzt", role_ueb_sonstiges: "Sonstige",
    role_kind_schule: "Schule / Lehrkraft", role_kind_kita: "Erzieher/in", role_kind_nachbar: "Nachbar/in",
    role_kind_arzt: "Arzt / Ärztin", role_kind_sonstiges: "Sonstige",
    role_str_polizei: "Polizei", role_str_staatsanwalt: "Staatsanwaltschaft", role_str_versicherung: "Versicherung",
    role_str_zeuge: "Zeuge", role_str_sonstiges: "Sonstige",
    role_mie_vermieter: "Vermieter", role_mie_hausverwaltung: "Hausverwaltung",
    role_mie_mieterverein: "Mieterverein", role_mie_nachbar: "Nachbar", role_mie_sonstiges: "Sonstige",

    // Incident categories
    cat_inc_ueb_unterbesetzung: "Unterbesetzung Schicht", cat_inc_ueb_zwischenfall: "Zwischenfall Patient/Kunde",
    cat_inc_ueb_behandlungsfehler: "Behandlungsfehler drohend", cat_inc_ueb_arbeitszeit: "Arbeitszeitüberschreitung",
    cat_inc_ueb_pausen: "Pausen nicht eingehalten", cat_inc_ueb_anweisung: "Mündliche Anweisung gegen Bedenken",
    cat_inc_ueb_schulung: "Fehlende Unterweisung/Schulung", cat_inc_ueb_material: "Fehlendes Material / Ausrüstung",
    cat_inc_ueb_sonstiges: "Sonstiges",
    cat_inc_kind_vernachlaessigung: "Vernachlässigung", cat_inc_kind_koerperlich: "Körperliche Gewalt",
    cat_inc_kind_sexuell: "Sexueller Missbrauch (Verdacht)", cat_inc_kind_psychisch: "Psychische Gewalt",
    cat_inc_kind_sucht: "Suchtproblematik der Eltern", cat_inc_kind_haeuslich: "Häusliche Gewalt (miterlebt)",
    cat_inc_kind_suizidal: "Suizidalität", cat_inc_kind_verwahrlosung: "Verwahrlosung",
    cat_inc_kind_online: "Online-Grooming / Cybermobbing", cat_inc_kind_schule: "Schulprobleme / Schulverweigerung",
    cat_inc_kind_sonstiges: "Sonstiges",
    cat_inc_str_diebstahl: "Diebstahl", cat_inc_str_betrug: "Betrug", cat_inc_str_beleidigung: "Beleidigung",
    cat_inc_str_bedrohung: "Bedrohung", cat_inc_str_koerperverletzung: "Körperverletzung",
    cat_inc_str_sachbeschaedigung: "Sachbeschädigung", cat_inc_str_verleumdung: "Verleumdung",
    cat_inc_str_noetigung: "Nötigung", cat_inc_str_stalking: "Stalking", cat_inc_str_einbruch: "Einbruch / Wohnungseinbruch",
    cat_inc_str_online_betrug: "Online-Betrug / Phishing", cat_inc_str_identitaet: "Identitätsdiebstahl",
    cat_inc_str_cybermobbing: "Cybermobbing", cat_inc_str_sonstiges: "Sonstiges",
    cat_inc_mie_schimmel: "Schimmel", cat_inc_mie_heizung: "Heizungsausfall",
    cat_inc_mie_wasser: "Wasserschaden / Rohrbruch", cat_inc_mie_laerm: "Lärmbelästigung",
    cat_inc_mie_nebenkosten: "Fehlerhafte Nebenkostenabrechnung", cat_inc_mie_kaution: "Kautionsrückforderung",
    cat_inc_mie_modernisierung: "Unberechtigte Modernisierung", cat_inc_mie_ungeziefer: "Ungeziefer",
    cat_inc_mie_aufzug: "Aufzug defekt", cat_inc_mie_sonstiges: "Sonstiges",

    // Templates
    pflege: "Krankenpflege / Altenpflege", kita: "Kita / Erziehung", kita_ext: "Kita - Extremsituation",
    kita_leitung: "Kita-Leitung", rettung: "Rettungsdienst / Notaufnahme", aerzte: "Ärztlicher Dienst",
    kasse: "Kasse / Einzelhandel", buero: "Büro / Verwaltung", oeffentlich: "Öffentlicher Dienst",
    handwerk: "Handwerk / Produktion", lager: "Lager / Kommissionierung", bus_bahn: "ÖPNV",
    ord_falschparker: "Falschparker", ord_muell: "Illegale Müllentsorgung",
    dsgvo_auskunft: "Auskunft (Art. 15)", dsgvo_loeschung: "Löschung (Art. 17)",
    gew_arbeitsschutz: "Arbeitsschutzverstoß",
    tier_quaelerei: "Tierquälerei",
    fin_schwarzarbeit: "Schwarzarbeit / Steuer",
    lehrkraefte: "Lehrkräfte", erzieher: "Erzieher / Hort", soziale_arbeit: "Soziale Arbeit",
    gastronomie: "Gastronomie", sicherheit: "Sicherheitsdienst",
    kind_vernachlaessigung: "Kindeswohlgefährdung — Vernachlässigung",
    kind_koerperlich: "Kindeswohlgefährdung — körperliche Gewalt",
    kind_sexuell: "Kindeswohlgefährdung — sexueller Missbrauch (Verdacht)",
    kind_psychisch: "Kindeswohlgefährdung — psychische Gewalt",
    kind_sucht: "Kindeswohlgefährdung — Sucht der Eltern",
    kind_haeuslich: "Häusliche Gewalt — Kind miterlebt",
    kind_suizidal: "Suizidalität bei Kind / Jugendlichem",
    kind_schule: "Schulverweigerung / Verwahrlosung",
    kind_online: "Online-Grooming / Cybermobbing",
    kind_nachbar: "Beobachtung als Nachbar/in",
    str_diebstahl: "Diebstahlsanzeige", str_betrug: "Betrugsanzeige", str_online_betrug: "Online-Betrug / Phishing",
    str_beleidigung: "Beleidigung / Üble Nachrede", str_bedrohung: "Bedrohung", str_koerperverletzung: "Körperverletzung",
    str_sachbeschaedigung: "Sachbeschädigung", str_verleumdung: "Verleumdung", str_noetigung: "Nötigung",
    str_stalking: "Stalking", str_einbruch: "Wohnungseinbruchdiebstahl", str_identitaet: "Identitätsdiebstahl",
    str_cybermobbing: "Cybermobbing / Hass im Netz", str_unfallflucht: "Verkehrsunfallflucht",
    str_versicherung: "Anzeige zur Versicherung (mit Begründung)", str_arbeitszeugnis: "Üble Nachrede im Arbeitszeugnis",
    mie_schimmel: "Mängelanzeige: Schimmel", mie_heizung: "Mängelanzeige: Heizungsausfall",
    mie_wasser: "Mängelanzeige: Wasserschaden", mie_laerm: "Mängelanzeige: Lärmbelästigung",
    mie_nebenkosten: "Widerspruch Nebenkostenabrechnung", mie_kaution: "Kautionsrückforderung",
    mie_modernisierung: "Widerspruch Modernisierungsankündigung", mie_ungeziefer: "Mängelanzeige: Ungeziefer",
    mie_aufzug: "Mängelanzeige: Aufzug defekt", mie_wohnung: "Wohnungsmangel (Allgemein)",
    mie_kuendigung: "Widerspruch Kündigung (Mieter)", mie_mietminderung: "Allgemeine Mietminderung",

    // Arsenal categories
    cat_arbschg: "ArbSchG", cat_bgb: "BGB", cat_arbzg: "ArbZG", cat_stgb: "StGB", cat_owig: "OWiG",
    cat_sonstige: "Weitere Rechtsgrundlagen", cat_schicht: "Schichtdienst", cat_br: "Betriebsrat",
    cat_beweis: "Beweissicherung",
    cat_sgb: "SGB", cat_kkg: "KKG", cat_sorgerecht: "Sorgerecht (BGB)",
    cat_stpo: "StPO", cat_betrug: "Cybercrime", cat_strsonstige: "Sonstige",
    cat_miet: "Mietrecht (BGB)", cat_wohnen: "Wohnen (WoBindG etc.)", cat_miesonstige: "Sonstige Mietrechtsquellen",

    // Evidence
    ev_dienstplan: "Dienstplan-Kopien", ev_zeugen: "Zeugen-Liste", ev_gespraech: "Gesprächs-Notizen",
    ev_email: "E-Mails / Chat-Verläufe", ev_foto: "Fotos", ev_au: "AU-Bescheinigung",
    ev_unfall: "Unfall-Meldungen", ev_anweisung: "Schriftliche Anweisungen",
    ev_fortbildung: "Nachweis fehlender Fortbildungen", ev_ce_zert: "CE-Zertifikate",
    ev_frist: "Frist-Korrespondenz", ev_audit: "Audit-Bericht",
    ev_kind_schulnoten: "Schulnoten / Fehlzeiten", ev_kind_zeugen: "Nachbarn / Verwandte als Zeugen",
    ev_kind_arztbericht: "Ärztliche Befunde (mit Einwilligung)", ev_kind_kindergarten: "Kita-/Schulbeobachtungen",
    ev_kind_chatverlauf: "Chat-Verläufe / Screenshots", ev_kind_soforthilfe: "Soforthilfe-Kontakt dokumentiert",
    ev_str_diebstahl: "Diebstahlsanzeige bei Versicherung", ev_str_zeuge: "Zeugenaussagen notiert",
    ev_str_beweis: "Beweismittel gesichert (Fotos, Gegenstände)", ev_str_ip: "IP-Adressen / Logs dokumentiert",
    ev_str_auszug: "Auszug aus Strafanzeige (für Versicherung)",
    ev_mie_foto: "Fotos des Mangels (mit Datum)", ev_mie_messung: "Messprotokoll (Temperatur, Feuchtigkeit)",
    ev_mie_arzt: "Ärztliches Attest (gesundheitliche Auswirkung)", ev_mie_zeuge: "Zeugenaussagen (Nachbarn)",
    ev_mie_korrespondenz: "Schriftverkehr mit Vermieter", ev_mie_abrechnung: "Nebenkostenabrechnung + Belege",
    ev_mie_modernisierung: "Modernisierungs-Ankündigung", ev_mie_vertrag: "Mietvertrag + Übergabeprotokoll",

    // Timeline
    tl_anzeige: "1. Anzeige versandt", tl_frist: "Reaktionsfrist abgelaufen",
    tl_erinnerung: "2. Erinnerung versandt", tl_br: "3. Betriebsrat eingeschaltet",
    tl_anhoerung: "4. Anhörung / Mitbestimmung", tl_extern: "5. Externe Stelle eingeschaltet",
    tl_akut: "Akut-Eskalation (Polizei/Notfall)", tl_beratung: "Beratungsstelle eingeschaltet",
    tl_anhoerung_kind: "Anhörung Sorgeberechtigte", tl_familie: "Familiengericht angerufen",
    tl_anzeige_erstattet: "Anzeige erstattet", tl_akteneinsicht: "Akteneinsicht beantragt",
    tl_klage: "Klage eingereicht", tl_verhandlung: "Hauptverhandlung",
    tl_frist_kind: "Frist zur Mängelbehebung abgelaufen", tl_anwalt: "Anwalt eingeschaltet",
    tl_mietminderung: "Mietminderung erklärt", tl_klage_mie: "Klage eingereicht",

    // ===== FEHLENDE I18N KEYS (Bug-Fix nach v3.1 Redteam) =====
    sidebarSubtitle: "Gefährdungsanzeige",
    sectSender: "1. Absender", sectReceiver: "2. Empfänger", sectNewIncident: "Neuer Vorfall",
    sectIncidentList: "Dokumentierte Vorfälle", sectRecipients: "Empfänger-Liste", sectNewRecipient: "＋ Neuer Empfänger",
    sectTimeline: "Eskalations-Timeline", sectReaction: "Reaktionsfrist", sectFristBerechnung: "Frist-Berechnung",
    sectShipMethod: "Versand-Art wählen", sectTracking: "Sendungs-Tracking",
    lblSenderName: "Dein Name", lblSenderAddr: "Deine Privatanschrift",
    lblPersonalnr: "Personalnummer (optional)", lblReceiver: "Empfänger-Block (für Briefkopf)",
    lblDate: "Ort & Datum", lblArea: "Betroffener Bereich", lblStufe: "Eskalations-Stufe",
    lblSubject: "Betreff", lblBody: "Haupttext",
    p_ueberlastung_sender: "Dein Name", p_ueberlastung_senderAddr: "Deine Privatanschrift",
    p_ueberlastung_personalnr: "Personalnummer (optional)", p_ueberlastung_receiver: "An (z.B. Geschäftsführung, PDL)",
    p_ueberlastung_area: "Betroffener Bereich", p_ueberlastung_subject: "Betreff",
    p_kind_sender: "Dein Name (Hinweisgeber/in)", p_kind_role: "Deine Rolle (z.B. Lehrer/in, Nachbar/in)",
    p_kind_senderAddr: "Deine Anschrift",
    p_kind_name: "Name des Kindes", p_kind_alter: "Alter",
    p_kind_sorge1: "Sorgeberechtigte/r 1 (Mutter)", p_kind_sorge2: "Sorgeberechtigte/r 2 (Vater)",
    p_kind_wohnort: "Wohnort des Kindes",
    p_kind_empf_typ: "Empfänger-Typ", p_kind_kategorie: "Beobachtungs-Kategorie",
    p_kind_anonymitaet: "Anonym bleiben / Schweigepflicht",
    p_str_receiver: "An (Polizei / Staatsanwaltschaft)",
    p_str_straftat: "Straftat", p_str_tat_zeit: "Tatzeit", p_str_tat_ort: "Tatort",
    p_str_taeter: "Täter-Beschreibung", p_str_zeugen: "Zeugen",
    p_str_beweise: "Beweismittel", p_str_schaden: "Schadenshöhe (€)",
    p_str_rechtsgut: "Rechtsgut / Straftatbestand",
    p_mie_mietobjekt: "Mietobjekt (Adresse, Wohnung, Etage)",
    p_mie_mietbeginn: "Mietbeginn", p_mie_vermieter_name: "Vermieter / Hausverwaltung",
    p_mie_vermieter_adr: "Anschrift Vermieter", p_mie_mangel_seit: "Mangel besteht seit",
    p_mie_mangel_art: "Mangel-Art", p_mie_mietminderung_pct: "Mietminderung (%)",
    p_mie_frist_maengel: "Frist zur Mängelbehebung (Tage)",
    stage1: "1 — Erstanzeige", stage2: "2 — Erinnerung nach Fristablauf",
    stage3: "3 — Eskalation an Betriebsrat / GF", stage4: "4 — Anhörung / Mitbestimmung",
    stage5: "5 — Externe Stelle (Gewerkschaft / Aufsicht)",

    fristTemplate: (days, dueDate) => `Frist läuft ab am <b>${dueDate}</b> (${days} Werktage ab Versand).`
  },
  en: {
    logoText: "Notice Cockpit",
    modUeberlastung: "Overload", modKindeswohl: "Child Welfare", modStrafanzeige: "Criminal Report", modMietmangel: "Tenancy Defect",
    sidebarSubtitle: "Hazard notice",
    tabBrief: "Letter", tabVorfall: "Incidents", tabRecipient: "Recipients",
    tabEskalation: "Escalation", tabShip: "Shipping", tabEvidence: "Evidence",
    alertUeberlastung: "💡 <b>Liability protection:</b> This notice transfers responsibility for errors due to understaffing to the employer.",
    alertKindeswohl: "🛡️ <b>Child protection:</b> In acute danger, call police 110 immediately.",
    alertStrafanzeige: "🚔 <b>Criminal report:</b> Online crimes have short investigation deadlines — act fast.",
    alertMietmangel: "🏠 <b>Tenancy defect:</b> Reporting defects protects you from losing rent reduction rights.",
    sectTemplate: "1. Template", sectSubject: "2. Subject", sectBody: "Body", sectArsenal: "Legal grounds",
    customOpt: "-- Custom (empty) --",
    btnCopy: "Copy", btnPdf: "PDF",
    vorfallInfo: "📅 Document every incident — date, time, what happened, witnesses.",
    btnAddIncident: "＋ Document incident", sectIncidentList: "Documented incidents",
    btnIncidentsToBody: "→ Add to letter", btnClearIncidents: "Clear all",
    recipientInfo: "📬 Manage multiple recipients — primary is used in letter.",
    sectRecipients: "Recipient list", sectNewRecipient: "＋ New recipient",
    btnAddRecipient: "＋ Add recipient",
    eskalationInfo: "🚨 Only escalate if previous stages don't work.",
    sectTimeline: "Escalation timeline", sectReaction: "Response deadline",
    sectFristBerechnung: "Deadline calculation", versandInfo: "📮 Shipping method determines evidential value.",
    sectShipMethod: "Choose shipping", sectTracking: "Tracking",
    shipEinschreiben: "With return receipt", shipPers: "Against confirmation", shipEmail: "Fast", shipFax: "With log",
    evidenceInfo: "🔍 Evidence determines success.",
    sectEvidenceChecklist: "Evidence checklist",
    anonymInfo: "🎭 Replace sensitive data in PDF.", lblAnonym: "Anonymized PDF",
    sectAnonym: "Anonymization",
    lblIncidentDate: "Date", lblIncidentTime: "Time", lblIncidentCategory: "Category",
    lblIncidentDesc: "What happened?", lblIncidentWitness: "Witnesses (optional)",
    lblRName: "Name / role", lblRRole: "Role", lblRAddr: "Address",
    lblFrist: "Deadline (days)", lblReaction: "Response",
    reactOpen: "Open", reactTeilweise: "Partial", reactVoll: "Complete", reactIgnoriert: "Ignored",
    lblSendungsnr: "Tracking no.", lblSendDate: "Ship date", lblShipNote: "Notes",
    arsenalInfo: "⚖️ Pick the relevant legal grounds.", arsenalHelp: "Click to add",

    p_ueberlastung_sender: "Your name", p_ueberlastung_senderAddr: "Your private address",
    p_ueberlastung_personalnr: "Personnel number (optional)", p_ueberlastung_receiver: "To (e.g. management)",
    p_ueberlastung_area: "Affected area", p_ueberlastung_subject: "Subject",
    p_kind_sender: "Your name (notifier)", p_kind_senderAddr: "Your address",
    p_kind_role: "Your role (e.g. teacher, neighbor)",
    p_kind_name: "Child's name", p_kind_alter: "Age",
    p_kind_sorge1: "Custodian 1 (mother)", p_kind_sorge2: "Custodian 2 (father)",
    p_kind_wohnort: "Child's residence",
    p_kind_empf_typ: "Recipient type", p_kind_kategorie: "Observation category",
    p_kind_anonymitaet: "Stay anonymous / respect professional secrecy",
    subjPlaceholder: "e.g. Notice under § 15 ArbSchG",
    bodyPlaceholder: "Dear Sir/Madam,\n\nI hereby notify you...",

    p_str_receiver: "To (police / prosecution)",
    p_str_tat_zeit: "Time of crime", p_str_tat_ort: "Location",
    p_str_taeter: "Perpetrator description", p_str_zeugen: "Witnesses",
    p_str_beweise: "Evidence", p_str_schaden: "Damage (€)",
    p_str_rechtsgut: "Legal interest / offense", p_str_straftat: "Crime",
    p_mie_mietobjekt: "Rental object (address, floor)",
    p_mie_mietbeginn: "Tenancy start", p_mie_vermieter_name: "Landlord / property management",
    p_mie_vermieter_adr: "Landlord address",
    p_mie_mangel_seit: "Defect since", p_mie_mangel_art: "Defect type",
    p_mie_mietminderung_pct: "Rent reduction (%)", p_mie_frist_maengel: "Deadline for repair (days)",

    recKind_jugendamt: "Youth welfare office", recKind_familiengericht: "Family court",
    recKind_beratungsstelle: "Counseling center", recKind_polizei: "Police (emergency)", recKind_schule: "School / daycare",
    recStr_polizei: "Police", recStr_staatsanwaltschaft: "Public prosecutor", recStr_versicherung: "Insurance",
    recMie_vermieter: "Landlord", recMie_hausverwaltung: "Property management",
    recMie_mieterverein: "Tenants' association", recMie_anwalt: "Lawyer",

    role_ueb_vorgesetzter: "Direct supervisor", role_ueb_pdl: "Head of nursing",
    role_ueb_gf: "Management", role_ueb_br: "Works council",
    role_ueb_personal: "HR", role_ueb_sicherheit: "Safety officer",
    role_ueb_arzt: "Company doctor", role_ueb_sonstiges: "Other",
    role_kind_schule: "School / teacher", role_kind_kita: "Educator", role_kind_nachbar: "Neighbor",
    role_kind_arzt: "Doctor", role_kind_sonstiges: "Other",
    role_str_polizei: "Police", role_str_staatsanwalt: "Prosecutor", role_str_versicherung: "Insurance",
    role_str_zeuge: "Witness", role_str_sonstiges: "Other",
    role_mie_vermieter: "Landlord", role_mie_hausverwaltung: "Property management",
    role_mie_mieterverein: "Tenants' association", role_mie_nachbar: "Neighbor", role_mie_sonstiges: "Other",

    cat_inc_ueb_unterbesetzung: "Shift understaffing", cat_inc_ueb_zwischenfall: "Patient/customer incident",
    cat_inc_ueb_behandlungsfehler: "Treatment error imminent", cat_inc_ueb_arbeitszeit: "Working time violation",
    cat_inc_ueb_pausen: "Breaks not respected", cat_inc_ueb_anweisung: "Verbal order against concerns",
    cat_inc_ueb_schulung: "Missing training", cat_inc_ueb_material: "Missing material",
    cat_inc_ueb_sonstiges: "Other",
    cat_inc_kind_vernachlaessigung: "Neglect", cat_inc_kind_koerperlich: "Physical violence",
    cat_inc_kind_sexuell: "Suspected sexual abuse", cat_inc_kind_psychisch: "Psychological violence",
    cat_inc_kind_sucht: "Parental addiction", cat_inc_kind_haeuslich: "Witnessed domestic violence",
    cat_inc_kind_suizidal: "Suicidality", cat_inc_kind_verwahrlosung: "Neglect/verwahrlosung",
    cat_inc_kind_online: "Online grooming / cyberbullying", cat_inc_kind_schule: "School problems",
    cat_inc_kind_sonstiges: "Other",
    cat_inc_str_diebstahl: "Theft", cat_inc_str_betrug: "Fraud", cat_inc_str_beleidigung: "Insult",
    cat_inc_str_bedrohung: "Threat", cat_inc_str_koerperverletzung: "Bodily harm",
    cat_inc_str_sachbeschaedigung: "Property damage", cat_inc_str_verleumdung: "Defamation",
    cat_inc_str_noetigung: "Coercion", cat_inc_str_stalking: "Stalking", cat_inc_str_einbruch: "Burglary",
    cat_inc_str_online_betrug: "Online fraud / phishing", cat_inc_str_identitaet: "Identity theft",
    cat_inc_str_cybermobbing: "Cyberbullying", cat_inc_str_sonstiges: "Other",
    cat_inc_mie_schimmel: "Mold", cat_inc_mie_heizung: "Heating failure",
    cat_inc_mie_wasser: "Water damage", cat_inc_mie_laerm: "Noise",
    cat_inc_mie_nebenkosten: "Incorrect utility bill", cat_inc_mie_kaution: "Deposit return",
    cat_inc_mie_modernisierung: "Unauthorized renovation", cat_inc_mie_ungeziefer: "Pests",
    cat_inc_mie_aufzug: "Elevator broken", cat_inc_mie_sonstiges: "Other",

    pflege: "Care / nursing", kita: "Daycare", kita_ext: "Daycare — extreme",
    kita_leitung: "Daycare manager", rettung: "Emergency / ER", aerzte: "Medical service",
    kasse: "Cashier / retail", buero: "Office / admin", oeffentlich: "Public service",
    handwerk: "Crafts / production", lager: "Warehouse", bus_bahn: "Public transit",
    lehrkraefte: "Teachers", erzieher: "Educators", soziale_arbeit: "Social work",
    gastronomie: "Gastronomy", sicherheit: "Security",
    kind_vernachlaessigung: "Child welfare — neglect",
    kind_koerperlich: "Child welfare — physical violence",
    kind_sexuell: "Child welfare — suspected sexual abuse",
    kind_psychisch: "Child welfare — psychological violence",
    kind_sucht: "Child welfare — parental addiction",
    kind_haeuslich: "Domestic violence — child witnessed",
    kind_suizidal: "Suicidality in child / adolescent",
    kind_schule: "School refusal / neglect",
    kind_online: "Online grooming / cyberbullying",
    kind_nachbar: "Observation as neighbor",
    str_diebstahl: "Theft report", str_betrug: "Fraud report", str_online_betrug: "Online fraud / phishing",
    str_beleidigung: "Insult", str_bedrohung: "Threat", str_koerperverletzung: "Bodily harm",
    str_sachbeschaedigung: "Property damage", str_verleumdung: "Defamation", str_noetigung: "Coercion",
    str_stalking: "Stalking", str_einbruch: "Burglary", str_identitaet: "Identity theft",
    str_cybermobbing: "Cyberbullying", str_unfallflucht: "Hit and run", str_versicherung: "Report for insurance",
    str_arbeitszeugnis: "Defamation in work reference",
    mie_schimmel: "Defect notice: mold", mie_heizung: "Defect notice: heating",
    mie_wasser: "Defect notice: water damage", mie_laerm: "Defect notice: noise",
    mie_nebenkosten: "Objection to utility bill", mie_kaution: "Deposit return",
    mie_modernisierung: "Objection to renovation notice", mie_ungeziefer: "Defect notice: pests",
    mie_aufzug: "Defect notice: elevator", mie_wohnung: "General apartment defect",
    mie_kuendigung: "Objection to termination", mie_mietminderung: "General rent reduction",

    cat_arbschg: "ArbSchG", cat_bgb: "BGB", cat_arbzg: "ArbZG", cat_stgb: "StGB", cat_owig: "OWiG",
    cat_sonstige: "Other legal bases", cat_schicht: "Shifts", cat_br: "Works council",
    cat_beweis: "Evidence",
    cat_sgb: "SGB", cat_kkg: "KKG", cat_sorgerecht: "Custody (BGB)",
    cat_stpo: "StPO", cat_betrug: "Cybercrime", cat_strsonstige: "Other",
    cat_miet: "Tenancy law (BGB)", cat_wohnen: "Housing (WoBindG etc.)", cat_miesonstige: "Other tenancy sources",

    ev_dienstplan: "Shift schedule copies", ev_zeugen: "Witness list", ev_gespraech: "Conversation notes",
    ev_email: "Emails / chat logs", ev_foto: "Photos", ev_au: "Sick note",
    ev_unfall: "Accident reports", ev_anweisung: "Written orders",
    ev_fortbildung: "Proof of missing training", ev_ce_zert: "CE certificates",
    ev_frist: "Deadline correspondence", ev_audit: "Audit report",
    ev_kind_schulnoten: "School grades / absences", ev_kind_zeugen: "Neighbors / relatives as witnesses",
    ev_kind_arztbericht: "Medical findings (with consent)", ev_kind_kindergarten: "Daycare/school observations",
    ev_kind_chatverlauf: "Chat logs / screenshots", ev_kind_soforthilfe: "Emergency contact documented",
    ev_str_diebstahl: "Theft report for insurance", ev_str_zeuge: "Witness statements noted",
    ev_str_beweis: "Evidence secured (photos, items)", ev_str_ip: "IP addresses / logs",
    ev_str_auszug: "Excerpt from criminal report",
    ev_mie_foto: "Photos of defect (with date)", ev_mie_messung: "Measurement log (temp, humidity)",
    ev_mie_arzt: "Medical certificate (health impact)", ev_mie_zeuge: "Witness statements (neighbors)",
    ev_mie_korrespondenz: "Correspondence with landlord", ev_mie_abrechnung: "Utility bill + receipts",
    ev_mie_modernisierung: "Renovation announcement", ev_mie_vertrag: "Lease + handover protocol",

    tl_anzeige: "1. Notice sent", tl_frist: "Deadline expired",
    tl_erinnerung: "2. Reminder sent", tl_br: "3. Works council",
    tl_anhoerung: "4. Hearing", tl_extern: "5. External body",
    tl_akut: "Acute escalation (police/emergency)", tl_beratung: "Counseling engaged",
    tl_anhoerung_kind: "Custodians heard", tl_familie: "Family court contacted",
    tl_anzeige_erstattet: "Report filed", tl_akteneinsicht: "File inspection requested",
    tl_klage: "Lawsuit filed", tl_verhandlung: "Main hearing",
    tl_frist_kind: "Repair deadline expired", tl_anwalt: "Lawyer engaged",
    tl_mietminderung: "Rent reduction declared", tl_klage_mie: "Lawsuit filed",

    // ===== MISSING I18N KEYS (Bug-Fix after v3.1 Redteam) =====
    sidebarSubtitle: "Hazard notice",
    sectSender: "1. Sender", sectReceiver: "2. Recipient", sectNewIncident: "New incident",
    sectIncidentList: "Documented incidents", sectRecipients: "Recipient list", sectNewRecipient: "＋ New recipient",
    sectTimeline: "Escalation timeline", sectReaction: "Response deadline", sectFristBerechnung: "Deadline calculation",
    sectShipMethod: "Choose shipping", sectTracking: "Tracking",
    lblSenderName: "Your name", lblSenderAddr: "Your private address",
    lblPersonalnr: "Personnel number (optional)", lblReceiver: "Recipient block (for letterhead)",
    lblDate: "Place & date", lblArea: "Affected area", lblStufe: "Escalation level",
    lblSubject: "Subject", lblBody: "Body",
    p_ueberlastung_sender: "Your name", p_ueberlastung_senderAddr: "Your private address",
    p_ueberlastung_personalnr: "Personnel number (optional)", p_ueberlastung_receiver: "To (e.g. management)",
    p_ueberlastung_area: "Affected area", p_ueberlastung_subject: "Subject",
    p_kind_sender: "Your name (notifier)", p_kind_role: "Your role (e.g. teacher, neighbor)",
    p_kind_senderAddr: "Your address",
    p_kind_name: "Child's name", p_kind_alter: "Age",
    p_kind_sorge1: "Custodian 1 (mother)", p_kind_sorge2: "Custodian 2 (father)",
    p_kind_wohnort: "Child's residence",
    p_kind_empf_typ: "Recipient type", p_kind_kategorie: "Observation category",
    p_kind_anonymitaet: "Stay anonymous / respect professional secrecy",
    p_str_receiver: "To (police / prosecution)",
    p_str_straftat: "Crime", p_str_tat_zeit: "Time of crime", p_str_tat_ort: "Location",
    p_str_taeter: "Perpetrator description", p_str_zeugen: "Witnesses",
    p_str_beweise: "Evidence", p_str_schaden: "Damage (€)",
    p_str_rechtsgut: "Legal interest / offense",
    p_mie_mietobjekt: "Rental object (address, floor)",
    p_mie_mietbeginn: "Tenancy start", p_mie_vermieter_name: "Landlord / property management",
    p_mie_vermieter_adr: "Landlord address", p_mie_mangel_seit: "Defect since",
    p_mie_mangel_art: "Defect type", p_mie_mietminderung_pct: "Rent reduction (%)",
    p_mie_frist_maengel: "Deadline for repair (days)",
    stage1: "1 — Initial notice", stage2: "2 — Reminder after deadline",
    stage3: "3 — Escalation to works council / CEO", stage4: "4 — Hearing / co-determination",
    stage5: "5 — External body (union / authority)",

    fristTemplate: (days, dueDate) => `Deadline expires on <b>${dueDate}</b> (${days} business days from shipping).`
  },
  ordnungsamt: {
    ord_falschparker: { icon: "🚗", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich eine Ordnungswidrigkeit wegen verkehrsbehinderndem Falschparken an.\nDas Fahrzeug blockierte maßgeblich den Verkehrsfluss und stellte eine konkrete Behinderung dar.\n\nIch bitte um Einleitung eines Bußgeldverfahrens.` },
    ord_gehweg: { icon: "🚶", body: `Sehr geehrte Damen und Herren,\n\nhiermit erstatte ich Anzeige, da das beschriebene Fahrzeug den Gehweg vollständig blockierte.\nFußgänger, insbesondere mit Kinderwagen oder Rollstuhl, wurden gefährdet und mussten auf die Fahrbahn ausweichen.\n\nBeweisfotos liegen bei.` },
    ord_radweg: { icon: "🚲", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich ein vorschriftswidriges Parken auf dem ausgewiesenen Radweg.\nDies zwingt Radfahrer zu gefährlichen Ausweichmanövern in den fließenden Verkehr.\n\nIch bitte um Ahndung des Verstoßes.` },
    ord_schlagloch: { icon: "🕳️", body: `Sehr geehrte Damen und Herren,\n\nhiermit weise ich auf einen erheblichen Straßenschaden (tiefes Schlagloch) hin.\nEs besteht akute Unfall- und Verletzungsgefahr für Zweiradfahrer und Fußgänger.\n\nIch bitte um umgehende Absicherung und zeitnahe Instandsetzung der Gefahrenstelle.` },
    ord_verkehrswege: { icon: "🌿", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich eine massive Sicht- und Wegbehinderung durch überhängenden Bewuchs (Hecken/Bäume).\nDer Geh-/Radweg ist stark verengt, Straßenschilder sind nicht mehr erkennbar.\n\nBitte fordern Sie den Eigentümer zum Rückschnitt auf.` },
    ord_muell: { icon: "🗑️", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich eine illegale Müllentsorgung im öffentlichen Raum.\nDer Abfall (Sperrmüll/Hausmüll) stellt nicht nur eine optische Beeinträchtigung dar, sondern birgt auch gesundheitliche Risiken (Ungeziefer).\n\nIch bitte um rasche Beseitigung.` },
    ord_laerm: { icon: "🔊", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich eine unzumutbare Lärmbelästigung und Ruhestörung im öffentlichen Raum an.\nDie gesetzlichen Ruhezeiten werden massiv und wiederholt missachtet.\n\nIch bitte um entsprechende Überprüfung und Maßnahmen.` },
    ord_schrott: { icon: "🚙", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich ein nicht zugelassenes Schrottfahrzeug ohne gültige Kennzeichen, das im öffentlichen Verkehrsraum abgestellt wurde.\n\nIch bitte um Anbringung einer amtlichen Entfernungsaufforderung.` },
    ord_beleuchtung: { icon: "💡", body: `Sehr geehrte Damen und Herren,\n\nhiermit weise ich auf den Ausfall der öffentlichen Straßenbeleuchtung hin.\nDurch die Dunkelheit entsteht eine erhebliche Gefahrenquelle für alle Verkehrsteilnehmer und die Kriminalitätsprävention leidet.\n\nIch bitte um zeitnahe Reparatur.` },
    ord_hundekot: { icon: "💩", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich massive Verunreinigungen durch Hundekot auf Gehwegen bzw. Spielplätzen.\nDies stellt ein Hygienerisiko, insbesondere für spielende Kinder, dar.\n\nIch bitte um vermehrte Kontrollen in diesem Bereich.` }
  },
  datenschutz: {
    dsgvo_auskunft: { icon: "ℹ️", body: `Sehr geehrte Damen und Herren,\n\ngemäß Art. 15 DSGVO fordere ich Sie hiermit auf, mir unentgeltlich eine umfassende Auskunft über alle zu meiner Person gespeicherten personenbezogenen Daten zu erteilen.\n\nBitte stellen Sie mir diese Daten in einem strukturierten, gängigen Format zur Verfügung.` },
    dsgvo_loeschung: { icon: "🗑️", body: `Sehr geehrte Damen und Herren,\n\ngemäß Art. 17 DSGVO ("Recht auf Vergessenwerden") fordere ich Sie auf, sämtliche zu meiner Person gespeicherten personenbezogenen Daten unverzüglich zu löschen.\n\nBitte bestätigen Sie mir die vollständige Löschung schriftlich.` },
    dsgvo_widerruf: { icon: "🚫", body: `Sehr geehrte Damen und Herren,\n\nhiermit widerrufe ich meine erteilte Einwilligung zur Verarbeitung meiner Daten, insbesondere für Werbe- und Newsletter-Zwecke, mit sofortiger Wirkung gem. Art. 7 Abs. 3 DSGVO.\n\nIch fordere Sie auf, meine Daten unverzüglich aus Ihren Verteilern zu entfernen.` },
    dsgvo_meldung: { icon: "🏛️", body: `Sehr geehrte/r Landesbeauftragte/r für den Datenschutz,\n\nhiermit melde ich einen mutmaßlichen Datenschutzverstoß durch das genannte Unternehmen.\nDas Unternehmen verarbeitet personenbezogene Daten ohne ausreichende Rechtsgrundlage bzw. missachtet meine Betroffenenrechte.\n\nIch bitte um aufsichtsrechtliche Prüfung.` },
    dsgvo_spam: { icon: "📧", body: `Sehr geehrte Damen und Herren,\n\nhiermit beschwere ich mich über unerlaubte Werbekontaktaufnahme (Spam-Mails / Werbeanrufe) ohne meine vorherige ausdrückliche Einwilligung (Cold Calling).\n\nDies stellt einen klaren Verstoß gegen das UWG und die DSGVO dar.` },
    dsgvo_berichtigung: { icon: "✏️", body: `Sehr geehrte Damen und Herren,\n\ngemäß Art. 16 DSGVO fordere ich Sie auf, die zu meiner Person gespeicherten, unrichtigen Daten unverzüglich zu berichtigen.\n\nDie korrekten Daten lauten wie folgt: [HIER KORREKTE DATEN EINTRAGEN]. Bitte bestätigen Sie die Berichtigung.` },
    dsgvo_export: { icon: "💾", body: `Sehr geehrte Damen und Herren,\n\ngemäß Art. 20 DSGVO (Recht auf Datenübertragbarkeit) fordere ich Sie auf, mir meine personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format bereitzustellen.\n\nIch erwarte die Zusendung innerhalb der gesetzlichen Frist von einem Monat.` },
    dsgvo_sperrung: { icon: "🔒", body: `Sehr geehrte Damen und Herren,\n\ngemäß Art. 18 DSGVO fordere ich die Einschränkung der Verarbeitung meiner personenbezogenen Daten (Sperrung).\n\nBis zur Klärung des Sachverhalts dürfen meine Daten nicht weiter verarbeitet oder an Dritte weitergegeben werden.` },
    dsgvo_scoring: { icon: "📊", body: `Sehr geehrte Damen und Herren,\n\ngemäß Art. 21 DSGVO lege ich hiermit ausdrücklich Widerspruch gegen die Verarbeitung meiner Daten zum Zwecke von Profiling und automatisiertem Scoring ein.\n\nIch fordere die Offenlegung der Scoring-Algorithmen bezüglich meiner Person.` },
    dsgvo_weitergabe: { icon: "🤝", body: `Sehr geehrte Damen und Herren,\n\nhiermit fordere ich detaillierte Auskunft darüber, an welche Dritte Sie meine personenbezogenen Daten weitergegeben oder verkauft haben.\n\nBitte nennen Sie alle Empfänger namentlich und geben Sie die Rechtsgrundlage für die Übermittlung an.` }
  },
  gewerbe: {
    gew_arbeitszeit: { icon: "⏱️", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich systematische Verstöße gegen das Arbeitszeitgesetz (ArbZG).\nEs kommt regelmäßig zu massiven Überstunden ohne Ausgleich, die gesetzlichen Ruhepausen sowie Ruhezeiten zwischen den Schichten werden nicht eingehalten.\n\nIch bitte um Überprüfung der Arbeitszeitdokumentation.` },
    gew_arbeitsschutz: { icon: "👷", body: `Sehr geehrte Damen und Herren,\n\nhiermit weise ich auf erhebliche Mängel im betrieblichen Arbeitsschutz hin.\nNotwendige persönliche Schutzausrüstung fehlt, Maschinen sind defekt oder Sicherheitsvorkehrungen wurden deaktiviert.\n\nEs besteht akute Unfallgefahr für die Beschäftigten.` },
    gew_hygiene: { icon: "🧼", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich gravierende Hygienemängel im genannten Betrieb (z.B. Gastronomie).\nDie Zustände (Schmutz, Schimmelbildung, Verdacht auf Ungeziefer) verstoßen massiv gegen die Lebensmittelhygieneverordnung.\n\nIch bitte um unangekündigte Kontrolle durch die zuständigen Prüfer.` },
    gew_sonntag: { icon: "📅", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich einen Verstoß gegen die gesetzliche Sonn- und Feiertagsruhe an.\nArbeitnehmer werden regelmäßig an diesen Tagen beschäftigt, ohne dass eine entsprechende behördliche Ausnahmegenehmigung vorliegt.` },
    gew_gefahrstoff: { icon: "🛢️", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich eine unsachgemäße Lagerung und Handhabung von Gefahrstoffen (giftige/brennbare Substanzen).\nSicherheitsdatenblätter fehlen und Mitarbeiter sind nicht entsprechend unterwiesen.\n\nEs drohen Umweltschäden und Gesundheitsgefahren.` },
    gew_fluchtwege: { icon: "🚪", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich an, dass wesentliche Flucht- und Rettungswege im Betrieb blockiert, zugestellt oder gar verschlossen sind.\n\nIm Brand- oder Notfall ist eine sichere Evakuierung der Mitarbeiter nicht gewährleistet. Sofortiges Handeln ist geboten.` },
    gew_sanitaer: { icon: "🚽", body: `Sehr geehrte Damen und Herren,\n\nhiermit beschwere ich mich über die unzumutbaren Zustände der Sanitäranlagen für Mitarbeiter.\nDiese sind entweder in unzureichender Zahl vorhanden, dauerhaft defekt oder verstoßen gegen grundlegende Hygienestandards der Arbeitsstättenverordnung.` },
    gew_jugend: { icon: "🧒", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich einen Verstoß gegen das Jugendarbeitsschutzgesetz (JArbSchG).\nMinderjährige Beschäftigte / Auszubildende arbeiten zu lange, zu spät abends oder ohne die gesetzlich vorgeschriebenen verlängerten Pausenzeiten.` },
    gew_klima: { icon: "🌡️", body: `Sehr geehrte Damen und Herren,\n\nhiermit weise ich auf unzumutbare Raumtemperaturen am Arbeitsplatz hin.\nDie Arbeitsstättenregel ASR A3.5 wird massiv verletzt (keine ausreichende Beheizung im Winter bzw. unerträgliche Hitze im Sommer ohne Maßnahmen).` },
    gew_laerm: { icon: "🙉", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich eine gesundheitsgefährdende Lärm- und Schadstoffbelastung am Arbeitsplatz.\nDie Grenzwerte werden überschritten, Lärmschutzmaßnahmen fehlen und es mangelt an entsprechender Absaugung von Schadstoffen.` }
  },
  tier: {
    tier_gewalt: { icon: "🛑", body: `Sehr geehrte Damen und Herren,\n\nhiermit erstatte ich Anzeige wegen aktiver Tierquälerei und Misshandlung (§ 17 TierSchG).\nIch habe beobachtet, wie dem Tier erhebliche Schmerzen und Leiden absichtlich zugefügt wurden.\n\nIch bitte um sofortige Überprüfung und Sicherstellung des Tieres.` },
    tier_futter: { icon: "🥣", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich eine grobe Vernachlässigung der artgerechten Tierhaltung.\nDem Tier stehen weder ausreichend frisches Trinkwasser noch angemessene Nahrung zur Verfügung, was zu einer sichtbaren Abmagerung geführt hat.` },
    tier_platz: { icon: "⛓️", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich tierwidrige Haltungsbedingungen an.\nDas Tier wird in einem viel zu engen Käfig bzw. in permanenter, kurzer Anbindehaltung gehalten. Ein artgerechtes Verhalten oder ausreichende Bewegung sind ausgeschlossen.` },
    tier_arzt: { icon: "🚑", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich, dass ein Tier offensichtlich an einer schweren Krankheit oder schmerzhaften Verletzung leidet, der Halter jedoch jegliche tierärztliche Behandlung verweigert.\n\nBitte ordnen Sie eine tiermedizinische Untersuchung an.` },
    tier_zucht: { icon: "🐾", body: `Sehr geehrte Damen und Herren,\n\nhiermit teile ich meinen dringenden Verdacht auf illegale Welpenzucht und gewerbsmäßigen Hundehandel ("Vermehrer") mit.\nDie Umstände deuten auf fehlende Genehmigungen, fehlende Impfungen und unhygienische Zustände hin.` },
    tier_ausgesetzt: { icon: "📦", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich das vorsätzliche Aussetzen eines Haustieres an.\nDas Zurücklassen eines Tieres stellt einen Straftatbestand dar. Das Tier wurde in obhutsloser Lage aufgefunden.` },
    tier_gefahrhund: { icon: "🐕", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich einen potenziell gefährlichen Hund, der wiederholt ohne Leine und Maulkorb geführt wird und bereits Menschen oder andere Tiere bedroht hat.\n\nIch bitte um Überprüfung der Halterzuverlässigkeit.` },
    tier_hoarding: { icon: "🏚️", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich einen schweren Fall von Animal Hoarding (Tierhortung).\nDer Halter ist offensichtlich überfordert, die hygienischen Zustände in der Wohnung sind katastrophal und die Tiere leiden unter Verwahrlosung.` },
    tier_wetter: { icon: "❄️", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich, dass Tiere schutzlos extremen Witterungsbedingungen (Hitze im geschlossenen Auto / Kälte ohne Schutzhütte) ausgesetzt sind.\n\nEs besteht akute Lebensgefahr für die betroffenen Tiere.` },
    tier_wilderei: { icon: "🪤", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich den Verdacht auf Wilderei bzw. das illegale Aufstellen von Fallen und Giftködern an.\nDiese Praktiken gefährden heimische Wildtiere sowie Hunde und Katzen massiv.\n\nIch bitte um polizeiliche Ermittlungen.` }
  },
  finanzamt: {
    fin_schwarz: { icon: "💰", body: `Sehr geehrte Damen und Herren,\n\nhiermit erstatte ich Anzeige wegen Verdachts auf gewerbsmäßige Schwarzarbeit.\nPersonen werden ohne ordnungsgemäße Anmeldung zur Sozialversicherung und ohne Abführung von Lohnsteuer beschäftigt.\n\nIch bitte um Prüfung durch die Finanzkontrolle Schwarzarbeit.` },
    fin_steuer: { icon: "📉", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich einen fundierten Verdacht auf Steuerhinterziehung an.\nEinnahmen, insbesondere aus Bargeldgeschäften, werden systematisch an der Finanzbuchhaltung vorbeigeschleust und nicht in der Umsatzsteuererklärung angegeben.` },
    fin_kasse: { icon: "🧾", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich den dringenden Verdacht auf Kassenmanipulation.\nEs werden regelmäßig keine Kassenbons ausgegeben und das Kassensystem (TSE) scheint nicht gesetzeskonform betrieben zu werden.` },
    fin_scheinselbst: { icon: "🕴️", body: `Sehr geehrte Damen und Herren,\n\nhiermit weise ich auf illegale Arbeitnehmerüberlassung und Scheinselbstständigkeit hin.\nDie "Auftragnehmer" sind weisungsgebunden, in den Betrieb eingegliedert und tragen kein unternehmerisches Risiko.\n\nIch rege eine Statusfeststellung an.` },
    fin_mindestlohn: { icon: "💶", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich systematischen Betrug beim gesetzlichen Mindestlohn.\nDurch nicht erfasste, unbezahlte Überstunden oder falsche Stundenzettel liegt der tatsächliche Stundenlohn deutlich unter dem gesetzlichen Minimum.` },
    fin_buergergeld: { icon: "💸", body: `Sehr geehrte Damen und Herren,\n\nhiermit erstatte ich Anzeige wegen Leistungsbetrug (Doppelbezug).\nDie genannte Person bezieht staatliche Transferleistungen (Bürgergeld/Arbeitslosengeld), geht aber gleichzeitig einer nicht gemeldeten Schwarzarbeit nach.` },
    fin_schmuggel: { icon: "🚬", body: `Sehr geehrte Damen und Herren,\n\nhiermit teile ich dem Zoll mit, dass unversteuerte oder geschmuggelte Waren (z.B. Zigaretten, Alkohol) illegal und gewerbsmäßig weiterverkauft werden.\n\nIch bitte um eine entsprechende Zollprüfung.` },
    fin_briefkasten: { icon: "📬", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich den Verdacht auf Betrieb einer Scheinfirma / Briefkastengesellschaft.\nUnter der angegebenen Adresse findet keine wirtschaftliche Tätigkeit statt. Es besteht der Verdacht auf Geldwäsche oder Steuerflucht.` },
    fin_firmenwagen: { icon: "🚗", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich an, dass Firmenfahrzeuge systematisch für private Zwecke genutzt werden, ohne dass dies als geldwerter Vorteil ordnungsgemäß (1%-Regelung/Fahrtenbuch) versteuert wird.\n\nDies stellt eine Steuerhinterziehung dar.` },
    fin_gewinn: { icon: "🍷", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich den Verdacht auf verdeckte Gewinnausschüttung.\nPrivate Lebenshaltungskosten (Urlaube, Luxusgüter, private Umbauten) des Geschäftsführers werden systematisch als Betriebsausgaben der GmbH abgerechnet.` }
  }
};

const t = (k) => I18N[state.meta.language][k] || I18N.de[k] || k;

/* === TEMPLATES PER MODULE === */
const TEMPLATES = {
  ueberlastung: {
    pflege: { icon:"🏥", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich gemäß § 15 und § 16 Arbeitsschutzgesetz (ArbSchG) eine Überlastung an.

In meinem Arbeitsbereich (Station 4B, Frühschicht) liegt folgende Situation vor:
Aufgrund von extremem Personalmangel ist eine fachgerechte und sichere pflegerische Versorgung nicht mehr vollumfänglich gewährleistet.

Daraus ergeben sich konkrete Gefahren:
- Risiko von Medikations- und Behandlungsfehlern
- Unzureichende Überwachung von Risikopatienten
- Grundpflege und Prophylaxen können nicht zeitgerecht durchgeführt werden

Ich bemühe mich, Schäden abzuwenden, weise jedoch darauf hin, dass ich meine arbeitsvertraglichen Pflichten unter diesen Umständen nur noch eingeschränkt erfüllen kann.` },
    kita: { icon:"👶", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich eine Gefährdungs- und Überlastungsanzeige gemäß ArbSchG.

In unserer Einrichtung liegt aktuell eine eklatante personelle Unterbesetzung vor. Der vorgegebene Betreuungsschlüssel kann nicht ansatzweise eingehalten werden.

Konkret gefährdete Kinder, unzureichende Aufsicht, erhöhte Unfallgefahr, Verwahrung statt Pädagogik.

Ich fordere Sie als Träger auf, unverzüglich Maßnahmen zu ergreifen.` },
    kita_ext: { icon:"🆘", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich eine akute Notsituation an. Der gesetzlich vorgeschriebene Betreuungsschlüssel ist unterschritten. Notmaßnahmen erforderlich (Notbetreuung, Gruppenschließung).

Ohne sofortige Entscheidung kann ich die Aufsichtspflicht nicht länger gewährleisten.` },
    kita_leitung: { icon:"👩‍💼", body: `Sehr geehrte/r Träger-Vertreter/in,

als Leitung melde ich gemäß § 15 ArbSchG eine kritische Personalsituation. Akute Aufsichtspflichtverletzung droht. Bitte um sofortige Entscheidung über Schließung / Vertretungskräfte.` },
    rettung: { icon:"🚑", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich eine akute Gefährdung im Rettungsdienst an. Notwendige Vorhaltezeit kann nicht eingehalten werden. Triage unter Zeitdruck nicht leitliniengerecht. Sofortige Personalaufstockung oder Kapazitätsreduktion erforderlich.` },
    aerzte: { icon:"⚕️", body: `Sehr geehrte/r Chefarzt/in,

hiermit zeige ich gemäß § 15 ArbSchG eine arbeitsschutzrelevante Überlastung im ärztlichen Dienst an. Regelmäßige wöchentliche Arbeitszeit über 48h. Schichtdienst-Besetzung unter Bedarfsplanung. Bitte um Überprüfung der Dienstplangestaltung.` },
    kasse: { icon:"🛒", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich eine Überlastung im Kassenbereich an. Unterschreitung der Mindestbesetzung, hohe Kundenwartezeiten, Sicherheitsrisiken. Bitte um Anpassung der Personalplanung an Kundenfrequenzen.` },
    buero: { icon:"💼", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich formal eine massive Überlastung an. Arbeitsaufkommen übersteigt Ressourcen. Fristen und Qualität gefährdet. Bitte um Priorisierung und organisatorische Entlastung.` },
    oeffentlich: { icon:"🏛️", body: `Sehr geehrte/r Dienstvorgesetzte/r,

hiermit erhebe ich Remonstration und zeige Überlastung an. Aufgaben nicht mehr rechtmäßig bewältigbar. Amtspflichtverletzungen drohen. Bitte um Weisung zur Priorisierung.` },
    handwerk: { icon:"🔧", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Überlastungsanzeige für Produktion. Sicheres Arbeiten nicht gewährleistet. Erhöhtes Unfallrisiko durch Zeitdruck. Bitte um Anpassung der Vorgaben für Arbeitssicherheit.` },
    lager: { icon:"📦", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich Überlastung im Lager an. Hebe- und Tragearbeiten ohne Pausen. Bandscheibenvorfälle drohen. Bitte um Reduktion des Durchsatzes oder Personalaufstockung.` },
    bus_bahn: { icon:"🚌", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich Überlastung im Fahrdienst an. Verspätungen wegen Personalengpässen. Verkürzte Wendezeiten. Unfallgefahr durch Zeitdruck. Bitte um Anpassung des Umlaufplans.` },
    lehrkraefte: { icon:"📚", body: `Sehr geehrte/r Schulleitung,

hiermit zeige ich arbeitsschutzrelevante Überlastung an. Vertretungsstunden über zumutbares Maß. Klassen mit überhöhter Schülerzahl. Bitte um Entlastung durch zusätzliche Vertretungslehrkräfte.` },
    erzieher: { icon:"🎨", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich Überlastung im Hort-/Erzieherbereich an. Betreuungsschlüssel regelmäßig unterschritten. Aufsichtspflichtverletzungen drohen. Bitte um Anpassung der Personalausstattung.` },
    soziale_arbeit: { icon:"🤝", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich Überlastung in der Sozialen Arbeit an. Caseload über fachlichem Standard. Gefährdung Kindeswohl. Bitte um Reduktion der Fallzahlen und zusätzliche Personalressourcen.` },
    gastronomie: { icon:"🍽️", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich Überlastung in der Gastronomie an. Überschreitung Höchstarbeitszeit, Pausenregelungen verletzt. Bitte um Anpassung der Personalplanung.` },
    sicherheit: { icon:"🛡️", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich Überlastung im Sicherheitsdienst an. Alleinarbeit über Grenzen, überlange Schichten. Bitte um Anpassung der Schichtpläne.` }
  },
  kindeswohl: {
    kind_vernachlaessigung: { icon:"😢", body: `Sehr geehrte Damen und Herren,

hiermit melde ich gemäß § 8a SGB VIII eine beobachtete Kindeswohlgefährdung durch Vernachlässigung.

Beobachtungen:
[Datum/Uhrzeit, was beobachtet wurde: z.B. Kind wird nicht altersgerecht ernährt, Kleidung verschmutzt, regelmäßiges unbeaufsichtigtes Spielen im Treppenhaus, mangelnde medizinische Versorgung]

Bitte prüfen Sie die Situation und leiten Sie geeignete Schutzmaßnahmen ein (Beratung der Eltern, ggf. Inobhutnahme).

Ich stehe für Rückfragen und weitere Beobachtungen zur Verfügung.` },
    kind_koerperlich: { icon:"🤕", body: `Sehr geehrte Damen und Herren,

hiermit melde ich gemäß § 8a SGB VIII den Verdacht auf körperliche Gewalt gegen ein Kind.

Beobachtungen / Auffälligkeiten:
[Detaillierte Beschreibung: Hämatome an ungewöhnlichen Stellen, Verhalten des Kindes, Aussagen, Zeugen]

Bei akuter Gefahr: Sofortige Schutzmaßnahmen erforderlich. Polizei 110 informiert? (ja/nein)

Bitte um sofortige Prüfung und ggf. Einleitung von Schutzmaßnahmen.` },
    kind_sexuell: { icon:"⚠️", body: `Sehr geehrte Damen und Herren,

hiermit melde ich gemäß § 8a SGB VIII einen Verdacht auf sexuellen Missbrauch.

Hinweise (sehr zurückhaltend formulieren!):
[Beobachtungen, Aussagen des Kindes, Verhaltensänderungen, körperliche Auffälligkeiten — alles WAT-Standard]

WICHTIG: Original-Aussagen des Kindes wörtlich dokumentieren, ohne Interpretation.

Bitte um sofortige Prüfung unter Hinzuziehung spezialisierter Fachkräfte (InsoFa, Kinderschutzbund).` },
    kind_psychisch: { icon:"💔", body: `Sehr geehrte Damen und Herren,

hiermit melde ich gemäß § 8a SGB VIII eine mögliche psychische Kindeswohlgefährdung.

Beobachtungen:
[Chronologische Auflistung: Angstzustände, Rückzugsverhalten, Schlafstörungen, Entwicklungsverzögerungen, selbstverletzendes Verhalten]

Bitte um fachliche Einschätzung und ggf. Einleitung von Hilfemaßnahmen (Erziehungsberatung, SPFH).` },
    kind_sucht: { icon:"💉", body: `Sehr geehrte Damen und Herren,

hiermit melde ich eine Kindeswohlgefährdung im Zusammenhang mit Suchtproblematik der Sorgeberechtigten.

Beobachtungen:
[Hinweise auf Suchtmittelkonsum der Eltern: Vernachlässigung des Kindes, aggressive Episoden, unzuverlässige Versorgung]

Bitte um Prüfung und ggf. Einleitung von Hilfen (Suchtberatung, SPFH, ggf. Inobhutnahme).` },
    kind_haeuslich: { icon:"🆘", body: `Sehr geehrte Damen und Herren,

hiermit melde ich gemäß § 8a SGB VIII, dass ein Kind häusliche Gewalt miterlebt (oder mitzuerleben scheint).

Beobachtungen:
[Anzeichen: Angst des Kindes, Verletzungen, Aussagen, Schreie aus Wohnung, Anwesenheit bei Polizeieinsatz]

Bei akuter Gefahr: Polizei 110 rufen. Bitte um Prüfung und Schutzmaßnahmen für das Kind.` },
    kind_suizidal: { icon:"🆘", body: `Sehr geehrte Damen und Herren,

hiermit melde ich akute Sorge um das Leben und die Gesundheit eines Kindes/Jugendlichen.

Beobachtungen:
[Suizidale Äußerungen, Verletzungen, Abschiedsbrief, Social-Media-Posts, Verhaltensänderungen]

WICHTIG: Bei akuter Suizidalität sofort Polizei 110 oder Kinder- und Jugendpsychiatrie informieren!

Bitte um sofortige Hilfe und Schutzmaßnahmen.` },
    kind_schule: { icon:"🏫", body: `Sehr geehrte Damen und Herren,

hiermit melde ich eine mögliche Kindeswohlgefährdung durch Schulverweigerung und/oder Verwahrlosung.

Beobachtungen:
[Anhaltende Fehlzeiten, Verschlechterung des Pflegezustands, Verhaltensauffälligkeiten, Hinweise aus dem häuslichen Umfeld]

Bitte um Prüfung und Einleitung geeigneter Hilfen (Schulsozialarbeit, Jugendhilfe).` },
    kind_online: { icon:"💻", body: `Sehr geehrte Damen und Herren,

hiermit melde ich Verdacht auf Online-Grooming oder Cybermobbing.

Hinweise:
[Chat-Verläufe, Profil-Kontakte, Verhaltensänderungen, Schlafstörungen, Aussagen des Kindes]

WICHTIG: Original-Chat-Verläufe sichern (Screenshots mit Datum/Uhrzeit), bevor sie gelöscht werden.

Bei akuter Gefahr: Polizei 110. Bitte um Prüfung und Schutzmaßnahmen.` },
    kind_nachbar: { icon:"🏘️", body: `Sehr geehrte Damen und Herren,

als besorgte/r Nachbar/in melde ich Hinweise auf eine mögliche Kindeswohlgefährdung in der Nachbarschaft.

Beobachtungen:
[Was wurde wann beobachtet? Schreie, Kind allein, vernachlässigter Eindruck, aggressive Situationen, etc.]

Ich habe das Kind / die Familie nicht persönlich gesprochen, möchte aber meine Beobachtungen zur Verfügung stellen, damit die zuständigen Stellen die Situation einschätzen können.` }
  },
  strafanzeige: {
    str_diebstahl: { icon:"👜", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen Diebstahls gemäß § 242 StGB.

Tathergang:
Am [Datum] um [Uhrzeit] wurde mir in [Ort] folgender Gegenstand entwendet:
[Genaue Beschreibung, Wert, Seriennummer falls vorhanden]

Täterbeschreibung:
[Größe, Statur, Kleidung, Besonderheiten, Fluchtrichtung]

Zeugen: [Namen, Erreichbarkeit]
Beweismittel: [Fotos, Videos, etc.]

Schadenshöhe: ca. [Betrag] €

Bitte um Aufnahme des Verfahrens und Zeugenvernehmung.` },
    str_betrug: { icon:"💸", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen Betrugs gemäß § 263 StGB.

Tathergang:
Am [Datum] wurde ich durch [Täuschungshandlung] um [Schadenshöhe] € betrogen.

Konkret:
[Verkauf von Waren, die nie geliefert wurden / Vorauszahlung / falsche Angaben etc.]

Täter / Firma: [Name, Adresse, Website, Kontoverbindung]
Zeugen: [Namen]
Beweismittel: [E-Mails, Chat-Verläufe, Kontoauszüge, Verträge]

Bitte um strafrechtliche Verfolgung und Sicherung der Vermögenswerte.` },
    str_online_betrug: { icon:"🖥️", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen Online-Betrugs (Phishing / Fake-Shop / Romance-Scamming etc.) gemäß § 263 StGB.

Tathergang:
Am [Datum] habe ich auf [Plattform/Website] [Waren gekauft / eine Anzahlung geleistet / persönliche Daten preisgegeben / auf einen Link geklickt] und dabei einen Schaden von [Betrag] € erlitten.

Plattform / Täter: [URL, Username, Kontoverbindung, E-Mail-Adresse, Telefonnummer]

Beweismittel:
[Screenshots der Kommunikation, Kontoauszüge, Phishing-Mail mit Headern, etc.]

WICHTIG: Kontoumstellung / Kartensperrung bereits veranlasst? (ja/nein)
Schadenshöhe: [Betrag] €

Bitte um strafrechtliche Verfolgung. Online-Delikte unterliegen oft nur kurzen Ermittlungsfristen.` },
    str_beleidigung: { icon:"🗣️", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen Beleidigung gemäß § 185 StGB / Übler Nachrede gemäß § 186 StGB.

Vorgang:
Am [Datum] um [Uhrzeit] wurde ich in [Ort/Plattform] wie folgt beleidigt:
[Wörtliche Wiedergabe der Äußerung]

Täter: [Name / Benutzername]
Beweismittel: [Screenshots, Audio, Zeugen]
Zeugen: [Namen]

Bitte um strafrechtliche Verfolgung.` },
    str_bedrohung: { icon:"😡", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen Bedrohung gemäß § 241 StGB.

Vorgang:
Am [Datum] wurde mir gegenüber folgende Drohung ausgesprochen:
[Wörtliche Wiedergabe, Datum, Uhrzeit, Kanal (persönlich, Telefon, E-Mail, Social Media)]

Täter: [Name, Kontaktdaten]
Beweismittel: [Screenshot, Mitschnitt, Zeugen]

WICHTIG: Polizeiliche Gefährdungsbeurteilung gewünscht? (ja/nein)

Bitte um strafrechtliche Verfolgung und ggf. Kontaktaufnahme zum Täter.` },
    str_koerperverletzung: { icon:"🩹", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen Körperverletzung gemäß §§ 223, 229 StGB.

Vorgang:
Am [Datum] um [Uhrzeit] wurde ich in [Ort] von [Täter] wie folgt verletzt:
[Beschreibung: Schläge, Tritte, Würgen, Verwendung von Gegenständen, etc.]

Verletzungen: [Detaillierte Beschreibung, ärztliche Atteste beifügen]
Täter: [Name, Aussehen]
Zeugen: [Namen, Erreichbarkeit]
Beweismittel: [Fotos der Verletzungen, ärztliche Befunde, Kleidung]

Bitte um strafrechtliche Verfolgung und ggf. Untersuchungshaft.` },
    str_sachbeschaedigung: { icon:"🔨", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen Sachbeschädigung gemäß § 303 StGB.

Vorgang:
Am [Datum] wurde folgende Sache beschädigt:
[Beschreibung: Auto zerkratzt, Scheibe eingeworfen, Möbel beschädigt, etc.]

Täter (falls bekannt): [Name, Aussehen]
Schadenshöhe: ca. [Betrag] €
Beweismittel: [Fotos, Videos, Zeugen]
Zeugen: [Namen]

Bitte um Ermittlung des Täters und strafrechtliche Verfolgung.` },
    str_verleumdung: { icon:"📢", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen Verleumdung gemäß § 187 StGB (üble Nachrede § 186 StGB).

Vorgang:
Am [Datum] hat [Täter] über mich folgende unwahre Tatsachenbehauptungen verbreitet:
[Wörtliche Wiedergabe der Behauptung, ggf. Link]

Die Behauptungen sind erwiesen unwahr, weil [Begründung].

Täter: [Name, Plattform]
Verbreitungsweg: [Mündlich, schriftlich, Internet]
Beweismittel: [Screenshots, Zeugen]

Bitte um strafrechtliche Verfolgung. Privatklage vorbehalten.` },
    str_noetigung: { icon:"💪", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen Nötigung gemäß § 240 StGB.

Vorgang:
Am [Datum] wurde ich durch [Drohung/Gewalt] zu folgendem Verhalten gezwungen:
[Was wurde erzwungen?]

Täter: [Name, Aussehen]
Verwendetes Nötigungsmittel: [Drohung mit: ...]
Zeugen: [Namen]
Beweismittel: [Aufzeichnungen, Zeugenaussagen]

Bitte um strafrechtliche Verfolgung.` },
    str_stalking: { icon:"👁️", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen Nachstellung (Stalking) gemäß § 238 StGB.

Vorgang (chronologisch):
[Liste aller unerwünschten Kontakte: Anrufe, SMS, E-Mails, Auflauern, unerwünschtes Auftauchen, Nachstellen im Internet, etc.]

Täter: [Name, Adresse]
Zeugen: [Namen]
Beweismittel: [Listen mit Datum/Uhrzeit, Screenshots, Nachrichten, Anrufliste]

WICHTIG: Antrag auf einstweilige Anordnung / Kontaktverbot gewünscht? (ja/nein)
Polizeiliche Beratung nach § 1 Abs. 2 GewSchG gewünscht? (ja/nein)

Bitte um strafrechtliche Verfolgung und Schutzmaßnahmen.` },
    str_einbruch: { icon:"🏠", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen Wohnungseinbruchdiebstahls gemäß §§ 242, 244 StGB.

Tatort: [Adresse]
Tatzeit: [Zeitfenster, z.B. zwischen 8 und 18 Uhr]
Tatzeit entdeckt: [Datum, Uhrzeit]

Beute / Schaden:
[Entwendete Gegenstände mit Wertangabe, Beschädigungen an Türen, Fenstern, Schlössern]

Spurenlage:
[Aufbruchsspuren, DNA-Spuren, Fußabdrücke, etc.]

Täter (falls beobachtet): [Beschreibung]
Zeugen: [Nachbarn, Passanten]

Polizei war vor Ort? Tatortaufnahme? (ja/nein)

Bitte um strafrechtliche Verfolgung und Sicherung der Spuren.` },
    str_identitaet: { icon:"🪪", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen Identitätsdiebstahls gemäß §§ 263, 269 StGB (Ausspähen und Abfangen von Daten gemäß § 202a StGB).

Vorgang:
Am [Datum] habe ich festgestellt, dass meine persönlichen Daten ohne meine Zustimmung verwendet wurden für:
[Eröffnung von Konten / Bestellungen / Verträgen / Straftaten unter meinem Namen]

Bisherige Maßnahmen:
[Anzeige bei Schufa, Kontosperrung, Passersatz, etc.]

Täter (falls bekannt): [Name]
Beweismittel: [Schufa-Auskunft, Kontoauszüge, E-Mails]

Schadenshöhe: ca. [Betrag] €

Bitte um strafrechtliche Verfolgung.` },
    str_cybermobbing: { icon:"💬", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen Cybermobbing / Hasskommentaren (StGB §§ 185, 166, 130, 166a etc.).

Vorgang (chronologisch):
[Liste aller Hasskommentare, Bedrohungen, Beleidigungen mit Screenshots, URL, Datum/Uhrzeit]

Plattformen: [Facebook, Twitter, Instagram, ...]
Accounts der Täter: [Username, soweit bekannt]
Zeugen: [Namen]

Beweismittel: [Screenshots, Bildschirmaufnahmen, IP-Adressen falls bekannt]

WICHTIG: Plattformen wurden gemeldet? (ja/nein)
Schaden: [Beleidigungen, Drohungen, psychische Belastung]

Bitte um strafrechtliche Verfolgung. Antrag auf Beschlagnahme der IP-Adressen bei den Plattformen.` },
    str_unfallflucht: { icon:"🚗", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen Unfallflucht gemäß § 142 StGB.

Vorgang:
Am [Datum] um [Uhrzeit] parkte ich mein Fahrzeug [Marke, Typ, Kennzeichen] in [Ort]. Bei meiner Rückkehr stellte ich fest:
[Schaden: Kratzer, Beule, etc., ggf. Zeugen, die Unfall beobachtet haben]

Verursacher (falls beobachtet): [Beschreibung, Kennzeichen, Fluchtrichtung]
Zeugen: [Namen]
Beweismittel: [Fotos vom Schaden, Unfallort, ggf. Dashcam]

Schadenshöhe: ca. [Betrag] €

Versicherung des Verursachers: [falls bekannt]

Bitte um strafrechtliche Verfolgung und Ermittlung des Verursachers.` },
    str_versicherung: { icon:"📋", body: `Sehr geehrte Damen und Herren,

zur Vorlage bei meiner Versicherung [Name, Versicherungsnummer] zeige ich den folgenden Sachverhalt an.

Vorgang:
Am [Datum] ereignete sich [kurze Beschreibung des Vorfalls]. Täter: [Name, falls bekannt]. Schadenshöhe: ca. [Betrag] €.

Strafanzeige bei Polizei erstattet am [Datum], Aktenzeichen: [Az].

Beweismittel (in Kopie):
- Strafanzeige
- Rechnungen / Kostenvoranschläge
- Fotos vom Schaden
- Zeugenaussagen

Bitte um Regulierung des Schadens gemäß [Vertragsgrundlage].` },
    str_arbeitszeugnis: { icon:"📄", body: `Sehr geehrte Damen und Herren,

hiermit erstatte ich Strafanzeige wegen übler Nachrede / Verleumdung gemäß §§ 186, 187 StGB im Arbeitszeugnis.

Vorgang:
Im Arbeitszeugnis vom [Datum], ausgestellt von [Arbeitgeber], wurden folgende unwahre, herabsetzende Formulierungen verwendet:
[Zitat der konkreten Formulierung]

Diese Aussagen sind:
- erwiesen unwahr, weil [Begründung]
- nicht von der Zeugnissprache gedeckt
- geeignet, meine berufliche Zukunft zu schädigen

Arbeitgeber: [Name, Adresse]
Beweismittel: [Kopie des Zeugnisses, ggf. Gutachten]

WICHTIG: Klage auf Zeugnisberichtigung beim Arbeitsgericht bereits anhängig? (ja/nein)

Bitte um strafrechtliche Verfolgung. Privatklage vorbehalten.` }
  },
  mietmangel: {
    mie_schimmel: { icon:"🦠", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich gemäß § 536c BGB einen erheblichen Mangel der Mietsache an.

Mangel: Schimmelbildung
Mietobjekt: [Adresse, Wohnung, Etage, betroffene Räume]
Mangel besteht seit: [Datum]

Beschreibung:
[Detailbeschreibung: Wo tritt Schimmel auf, wie groß, welche Wände / Decke / Fenster, Geruch, gesundheitliche Auswirkungen?]

Maßnahmen zur Schadensbegrenzung:
[Was habe ich unternommen, z.B. Stoßlüften, Möbel weggerückt, Fotos]

Gesundheitliche Auswirkungen:
[Allergien, Atemwegsprobleme, ärztliche Befunde]

Bisheriger Schriftverkehr: [ja/nein, wann, was]
Mietminderung: Ich werde die Miete ab dem [Datum] um [X]% mindern, bis der Mangel behoben ist.

Bitte um umgehende Mängelbehebung innerhalb der gesetzten Frist und Mitteilung des vorgesehenen Termins. Bei Nichtabhilfe behalte ich mir weitere Schritte vor.` },
    mie_heizung: { icon:"🌡️", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich gemäß § 536c BGB einen erheblichen Mangel der Mietsache an.

Mangel: Heizungsausfall
Mietobjekt: [Adresse, Wohnung]
Mangel besteht seit: [Datum, Uhrzeit]

Beschreibung:
[Heizung funktioniert nicht, bestimmte Heizkörper betroffen, gesamte Wohnung kalt, Temperatur in der Wohnung]

Außentemperatur: [°C]
Innentemperatur: [°C] (gemessen mit Thermometer)
Gesundheitliche Auswirkungen: [ja, welche]

Notmaßnahme meinerseits: [Elektroheizung, Heizlüfter, Aufenthalt in anderer Wohnung]

Mietminderung: Ich werde die Miete ab dem [Datum] um [X]% mindern, bis der Mangel behoben ist (siehe Mietminderungstabelle).

Bitte um sofortige Mängelbehebung. Bei Lebensgefahr bitte ich um alternative Heizmöglichkeit (Hotelunterbringung).` },
    mie_wasser: { icon:"💧", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich gemäß § 536c BGB einen Wasserschaden / Rohrbruch in der Mietsache an.

Mangel: Wasserschaden
Mietobjekt: [Adresse, Wohnung, betroffene Räume]
Mangel besteht seit: [Datum, Uhrzeit]

Beschreibung:
[Wo tritt Wasser aus? Welche Räume betroffen? Möbel, Böden, Wände beschädigt? Schimmelgefahr?]

Notmaßnahmen: [Eimer, Wasser abstellen, Möbel wegrücken, etc.]
Schadenshöhe (Einrichtungsgegenstände): ca. [Betrag] €

Mietminderung: Ich werde die Miete ab dem [Datum] um [X]% mindern, bis der Mangel behoben ist.

Bitte um sofortige Mängelbehebung und Schadensbeseitigung. Trocknungsgeräte, Bautrockner etc. sollten zügig aufgestellt werden.` },
    mie_laerm: { icon:"🔊", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich gemäß § 536c BGB eine Lärmbelästigung in der Mietsache an.

Mangel: Lärmbelästigung
Quelle: [Nachbar, Gewerbe, Baustelle, etc.]
Mangel besteht seit: [Datum]

Beschreibung:
[Wann tritt Lärm auf? Tagsüber, nachts, zu Ruhezeiten? Art: Musik, Trittschall, Gewerbelärm, Baulärm?]

Lärmprotokoll (Auszug):
[Datum, Uhrzeit, Art, Dauer, gemessene Lautstärke in dB]

Gesundheitliche Auswirkungen: [Schlafstörungen, Konzentrationsprobleme]

Mietminderung: Ich werde die Miete ab dem [Datum] um [X]% mindern.

Bitte um Abstellung der Lärmbelästigung. Bei gewerblichem Lärm: Prüfung der Genehmigung. Bei Baulärm: Einhaltung der Ruhezeiten. Bei Nachbarschaftslärm: Bitte um Vermittlung.` },
    mie_nebenkosten: { icon:"📑", body: `Sehr geehrte Damen und Herren,

hiermit widerspreche ich der Nebenkostenabrechnung für den Abrechnungszeitraum [Datum bis Datum].

Abrechnung: [Datum, Betrag, Guthaben/Nachzahlung]
Mein Widerspruch ist fristgerecht innerhalb der 12-Monats-Frist gemäß § 556 Abs. 3 BGB.

Konkret beanstande ich:
[Aufzählung der fehlerhaften Posten: nicht umlagefähige Kosten, falsche Verteilerschlüssel, fehlende Belege, Doppelberechnungen, etc.]

Bitte um:
1. Übersendung aller Belege (Rechnungen, Wartungsprotokolle, Zählerstände)
2. Korrigierte Abrechnung mit nachvollziehbarem Verteilerschlüssel
3. Aussetzung der Nachzahlung bis zur Klärung

Ich behalte mir vor, einen Sachverständigen einzuschalten und die Abrechnung gerichtlich prüfen zu lassen.` },
    mie_kaution: { icon:"💰", body: `Sehr geehrte Damen und Herren,

hiermit fordere ich gemäß § 551 BGB die Rückzahlung der Mietkaution ein.

Auszug: [Datum]
Wohnung übergeben: [Datum]
Kaution gezahlt: [Betrag] € ([bar / überwiesen])
Fristige Abrechnung sollte erfolgt sein bis: [Datum + 6 Monate]

Bis heute habe ich keine (vollständige) Abrechnung erhalten. Verzinsung gemäß § 551 Abs. 3 BGB BGB wurde nicht / unzureichend vorgenommen.

Meine Forderung:
- Rückzahlung der Kaution abzüglich etwaiger berechtigter Forderungen
- Zinsen gemäß § 551 Abs. 3 BGB (Sparbuch-Zinssatz)
- Abrechnung mit Belegen

Bitte um Überweisung bis zum [Datum, +14 Tage]. Andernfalls behalte ich mir die gerichtliche Geltendmachung vor.` },
    mie_modernisierung: { icon:"🏗️", body: `Sehr geehrte Damen und Herren,

hiermit widerspreche ich der Modernisierungsankündigung vom [Datum].

Angekündigte Maßnahmen:
[Aufzählung]

Meine Einwände:
- Ankündigungsfrist: 3 Monate gemäß § 555c Abs. 3 BGB — ist [nicht] eingehalten
- Form: Schriftlich begründet gemäß § 555c Abs. 2 BGB — ist [nicht] eingehalten
- Härtegründe gemäß § 555d Abs. 3 BGB: [z.B. Alter, Schwangerschaft, Behinderung, finanzielle Belastung]
- Unzumutbarkeit: [Begründung]

Härteeinwand gemäß § 555d Abs. 3 BGB:
[Detaillierte Begründung: welche Auswirkungen hätte die Maßnahme auf mich?]

Ich verlange:
1. Aussetzung / Verschiebung der Maßnahme
2. Ggf. Aufhebungsvertrag gegen angemessene Entschädigung
3. Bei berechtigter Modernisierung: Mieterhöhung gemäß § 559 BGB erst nach Abnahme der Maßnahme

Bitte um schriftliche Stellungnahme.` },
    mie_ungeziefer: { icon:"🐛", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich gemäß § 536c BGB Ungeziefer in der Mietsache an.

Mangel: [Art: Kakerlaken, Bettwanzen, Mäuse, Ratten, Silberfische, etc.]
Mietobjekt: [Adresse, betroffene Räume]
Mangel besteht seit: [Datum]

Beschreibung:
[Wo, wie viele, wie intensiv? Gesundheitliche Risiken?]

Eigene Maßnahmen: [Fallen, Reinigung, befallene Gegenstände entsorgt]

Mietminderung: Ich werde die Miete ab dem [Datum] um [X]% mindern, bis der Mangel behoben ist.

Bitte um sofortige professionelle Schädlingsbekämpfung. Bitte teilen Sie mir den Termin mit.` },
    mie_aufzug: { icon:"🛗", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich gemäß § 536c BGB den Ausfall des Aufzugs an.

Mangel: Aufzug defekt seit [Datum]
Auswirkung: [Wohnung in Etage, Mobilitätseinschränkung, Kinder, Einkauf, etc.]

Bisherige Dauer des Ausfalls: [Tage/Wochen]
Wiederholtes Vorkommen? [ja/nein, wie oft]

Mietminderung: Ich werde die Miete ab dem [Datum] um [X]% mindern, bis der Mangel behoben ist (Mietminderungstabelle: ca. 5-20% je nach Etage und Dauer).

Bitte um sofortige Reparatur. Bei längerem Ausfall: Mietminderung gemäß Rechtsprechung dauerhaft prüfen.` },
    mie_wohnung: { icon:"🏠", body: `Sehr geehrte Damen und Herren,

hiermit zeige ich gemäß § 536c BGB folgende Mängel der Mietsache an:

Mangel 1: [Beschreibung]
Mangel 2: [Beschreibung]
Mangel 3: [Beschreibung]

Diese Mängel beeinträchtigen die Gebrauchstauglichkeit der Wohnung erheblich.

Mietminderung: Ich werde die Miete ab dem [Datum] um insgesamt [X]% mindern, bis alle Mängel behoben sind.

Bitte um Mängelbehebung innerhalb der Frist von [Datum]. Bei Nichtabhilfe behalte ich mir weitere Schritte vor (Anwalt, Mieterverein, Gericht).` },
    mie_kuendigung: { icon:"📄", body: `Sehr geehrte Damen und Herren,

hiermit widerspreche ich der Kündigung vom [Datum, Kündigungsfrist] fristgerecht.

Kündigungsgrund: [vom Vermieter behaupteter Grund]

Meine Einwände:
- Kündigungsgrund nicht gegeben / nicht bewiesen: [Begründung]
- Kündigungsfrist nicht eingehalten: [Begründung]
- Sozialklausel (§ 574 BGB): [Härtegründe: Alter, Familie, Krankheit, keine Ersatzwohnung]
- Schwere Gesundheitsgefährdung durch Obdachlosigkeit
- Treuwidrigkeit: [ggf. lange Mietzeit, Investitionen des Mieters]

Frist: Ich widerspreche der Kündigung innerhalb der gesetzlichen Frist von 2 Monaten (§ 574b BGB).

Wichtiger Hinweis: Kündigung nur dann wirksam, wenn Gericht auf Räumungsklage entscheidet. Bis dahin Mietverhältnis fortbestehend.

Bitte um Rücknahme der Kündigung. Andernfalls werde ich mich an das zuständige Amtsgericht wenden und Räumungsschutz beantragen.` },
    mie_mietminderung: { icon:"💸", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich gemäß §§ 536, 536c BGB Mängel der Mietsache an, die eine Mietminderung rechtfertigen.\n\nMietobjekt: [Adresse]\nMängel:\n1. [Beschreibung, Mangel besteht seit Datum]\n2. [Beschreibung, Mangel besteht seit Datum]\n\nMietminderung gemäß Mietminderungstabelle (Burkhard/Walther):\n1. Mangel: ca. [X]% Mietminderung\n2. Mangel: ca. [X]% Mietminderung\n\nGesamtmietminderung: ca. [X]% der Bruttomiete = [Betrag] € monatlich\n\nIch werde die Miete ab dem [Datum] um diesen Betrag mindern. Bitte um Kenntnisnahme.` }
  },
  ordnungsamt: {
    ord_falschparker: { icon:"🚗", body: `Sehr geehrte Damen und Herren,\n\nhiermit erstatte ich Anzeige wegen einer Ordnungswidrigkeit im ruhenden Verkehr.\n\nFahrzeug: [Kennzeichen, Marke, Farbe]\nTatzeit: [Datum, Uhrzeit]\nTatort: [Straße, Hausnummer, Ort]\nVerstoß: [z.B. Gehweg zugeparkt, Halteverbot, Ausfahrt blockiert]\n\nBeweismittel: Fotos liegen bei.\nZeuge: [Mein Name, Adresse]\n\nIch bitte um Verfolgung der Ordnungswidrigkeit.` },
    ord_gehweg: { icon:"🚶", body: `Sehr geehrte Damen und Herren,\n\nhiermit erstatte ich Anzeige wegen Blockierung des Gehwegs.\n\nFahrzeug: [Kennzeichen, Marke, Farbe]\nOrt/Datum: [Straße, Datum]\n\nFußgänger, insbesondere mit Kinderwagen oder Rollstuhl, wurden gezwungen auf die Fahrbahn auszuweichen. Dies stellt eine erhebliche Gefährdung dar.\n\nBeweisfotos liegen bei. Ich bitte um Ahndung.` },
    ord_radweg: { icon:"🚲", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich vorschriftswidriges Parken auf dem ausgewiesenen Radweg (Zeichen 237 StVO).\n\nFahrzeug: [Kennzeichen, Marke, Farbe]\nOrt: [Straße, Datum, Uhrzeit]\n\nRadfahrer wurden zu gefährlichen Ausweichmanövern in den Kraftfahrzeugverkehr gezwungen.\n\nBeweisfotos liegen bei. Ich bitte um Einleitung eines Bußgeldverfahrens.` },
    ord_schlagloch: { icon:"🕳️", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich einen erheblichen Straßenschaden (tiefes Schlagloch) als akute Gefahrenstelle.\n\nOrt: [genaue Adresse, Fahrtrichtung]\nGröße/Tiefe: ca. [Angabe]\nFestgestellt am: [Datum]\n\nFür Fahrrad- und Motorradfahrer besteht akute Sturz- und Verletzungsgefahr.\n\nIch bitte um umgehende Absicherung und zeitnahe Instandsetzung.` },
    ord_verkehrswege: { icon:"🌿", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich eine Sicht- und Wegbehinderung durch überhängenden Bewuchs auf öffentlichem Gehweg bzw. Radweg.\n\nOrt: [genaue Adresse / Grundstück]\nSachverhalt: Gehweg auf ca. [X] Meter verengt / Straßenschilder nicht mehr erkennbar.\n\nGemäß § 32 StVO sind Hindernisse auf Straßen verboten. Ich bitte, den Eigentümer zum Rückschnitt aufzufordern.` },
    ord_muell: { icon:"🗑️", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich eine illegale Müllentsorgung im öffentlichen Raum.\n\nOrt: [Genaue Ortsangabe]\nFestgestellt: [Datum, Uhrzeit]\nArt des Mülls: [Sperrmüll, Bauschutt, Hausmüll]\n\nHinweise auf Verursacher: [Kennzeichen / Personenbeschreibung, falls vorhanden]\n\nBeweismittel: Fotos liegen bei. Ich bitte um Beseitigung und Ermittlung des Verursachers.` },
    ord_laerm: { icon:"🔊", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich eine unzumutbare Lärmbelästigung und Ruhestörung im öffentlichen Raum an.\n\nOrt: [Adresse / Bereich]\nZeitpunkt: [Datum, Uhrzeit – wiederholt?]\nUrsache: [z.B. Baustellenlärm außerhalb genehmigter Zeiten, Outdoor-Event]\n\nDie gesetzlichen Ruhezeiten werden massiv missachtet. Ich bitte um Überprüfung und Ahndung.` },
    ord_schrott: { icon:"🚙", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich ein nicht zugelassenes Fahrzeug ohne gültige Kennzeichen, das dauerhaft im öffentlichen Verkehrsraum abgestellt ist.\n\nStandort: [Straße, Hausnummer]\nFahrzeugbeschreibung: [Marke, Farbe, Schäden]\nAbgestellt seit ca.: [Datum]\n\nGemäß § 12 Abs. 3b StVO ist dies verboten. Ich bitte um Anbringung einer Entfernungsaufforderung und ggf. Abschleppung.` },
    ord_beleuchtung: { icon:"💡", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich den Ausfall der öffentlichen Straßenbeleuchtung.\n\nOrt: [genaue Straßenangabe, Masten-Nr. falls sichtbar]\nFestgestellt: [Datum]\nAnzahl ausgefallener Leuchten: [ca. X]\n\nDie Dunkelheit stellt eine erhebliche Gefahrenquelle für alle Verkehrsteilnehmer dar. Ich bitte um zeitnahe Reparatur.` },
    ord_hundekot: { icon:"💩", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich massive und anhaltende Verunreinigungen durch Hundekot auf dem Gehweg / dem Spielplatz.\n\nOrt: [Adresse / Bereich]\n\nDie Verunreinigungen stellen ein erhebliches Hygienerisiko dar, insbesondere für spielende Kinder (Gefahr der Übertragung von Parasiten).\n\nIch bitte um verstärkte Kontrollen und ggf. Aufstellung von Kotbeutelständern.` }
  },
  datenschutz: {
    dsgvo_auskunft: { icon:"ℹ️", body: `Sehr geehrte Damen und Herren,\n\ngemäß Art. 15 DSGVO fordere ich Sie hiermit auf, mir Auskunft über alle zu meiner Person gespeicherten personenbezogenen Daten zu erteilen.\n\nDies umfasst: Verarbeitungszwecke, Datenkategorien, Empfänger, Speicherdauer, Herkunft der Daten sowie eventuelle automatisierte Entscheidungsfindung.\n\nIch setze Ihnen hierfür eine Frist von einem Monat (Art. 12 Abs. 3 DSGVO).` },
    dsgvo_loeschung: { icon:"🗑️", body: `Sehr geehrte Damen und Herren,\n\ngemäß Art. 17 DSGVO ("Recht auf Vergessenwerden") fordere ich Sie auf, sämtliche zu meiner Person gespeicherten personenbezogenen Daten unverzüglich und vollständig zu löschen.\n\nBitte bestätigen Sie mir die vollständige Löschung schriftlich innerhalb von 30 Tagen.` },
    dsgvo_widerruf: { icon:"🚫", body: `Sehr geehrte Damen und Herren,\n\nhiermit widerrufe ich meine erteilte Einwilligung zur Verarbeitung meiner personenbezogenen Daten, insbesondere für Werbe- und Newsletter-Zwecke, mit sofortiger Wirkung gemäß Art. 7 Abs. 3 DSGVO.\n\nIch fordere Sie auf, meine Daten unverzüglich aus allen Verteilern und Systemen zu entfernen.` },
    dsgvo_meldung: { icon:"🏛️", body: `Sehr geehrte/r Landesbeauftragte/r für den Datenschutz,\n\nhiermit melde ich einen mutmaßlichen Datenschutzverstoß durch das genannte Unternehmen.\n\nDas Unternehmen verarbeitet personenbezogene Daten ohne ausreichende Rechtsgrundlage bzw. ignoriert meine Betroffenenrechte trotz Aufforderung.\n\nIch bitte um aufsichtsrechtliche Prüfung gemäß Art. 77 DSGVO.` },
    dsgvo_spam: { icon:"📧", body: `Sehr geehrte Damen und Herren,\n\nhiermit beschwere ich mich über unerlaubte Werbekontaktaufnahme ohne meine vorherige ausdrückliche Einwilligung.\n\nArt der Kontaktaufnahme: [Spam-E-Mail / Werbeanruf / SMS]\nDatum: [Datum]\n\nDies verstößt gegen § 7 UWG sowie die DSGVO. Ich fordere Sie zur sofortigen Unterlassung auf und behalte mir rechtliche Schritte vor.` },
    dsgvo_berichtigung: { icon:"✏️", body: `Sehr geehrte Damen und Herren,\n\ngemäß Art. 16 DSGVO fordere ich Sie auf, die zu meiner Person gespeicherten, unrichtigen Daten unverzüglich zu berichtigen.\n\nFolgende Daten sind falsch: [Beschreibung, was falsch ist]\nKorrekte Angaben: [Korrekte Daten]\n\nBitte bestätigen Sie die Berichtigung schriftlich.` },
    dsgvo_export: { icon:"💾", body: `Sehr geehrte Damen und Herren,\n\ngemäß Art. 20 DSGVO (Recht auf Datenübertragbarkeit) fordere ich Sie auf, mir alle meine personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format (z.B. CSV oder JSON) bereitzustellen.\n\nIch erwarte die Zusendung innerhalb von einem Monat.` },
    dsgvo_sperrung: { icon:"🔒", body: `Sehr geehrte Damen und Herren,\n\ngemäß Art. 18 DSGVO fordere ich die Einschränkung der Verarbeitung meiner personenbezogenen Daten.\n\nGrund: [z.B. Richtigkeit der Daten wird bestritten / Verarbeitung ist unrechtmäßig / Daten werden für Rechtsansprüche benötigt]\n\nBis zur Klärung des Sachverhalts dürfen meine Daten nicht weiter aktiv verarbeitet oder an Dritte weitergegeben werden.` },
    dsgvo_scoring: { icon:"📊", body: `Sehr geehrte Damen und Herren,\n\ngemäß Art. 21 DSGVO lege ich hiermit ausdrücklich Widerspruch gegen die Verarbeitung meiner Daten zum Zwecke von Profiling und automatisiertem Scoring ein.\n\nIch fordere außerdem die Offenlegung der logischen Grundlage des Scorings sowie dessen Auswirkungen auf mich (Art. 22 DSGVO).` },
    dsgvo_weitergabe: { icon:"🤝", body: `Sehr geehrte Damen und Herren,\n\nhiermit fordere ich detaillierte Auskunft darüber, an welche Dritten (Unternehmen, Behörden, Partner) Sie meine personenbezogenen Daten weitergegeben oder übermittelt haben.\n\nBitte nennen Sie alle Empfänger namentlich und geben Sie die jeweilige Rechtsgrundlage für die Übermittlung an (Art. 15 Abs. 1 lit. c DSGVO).` }
  },
  gewerbe: {
    gew_arbeitszeit: { icon:"⏱️", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich systematische Verstöße gegen das Arbeitszeitgesetz (ArbZG).\n\nUnternehmen: [Name, Adresse]\n\nVerstöße:\n- Regelmäßige Überschreitung der täglichen Höchstarbeitszeit (§ 3 ArbZG: max. 10h)\n- Gesetzliche Ruhepausen werden nicht eingehalten\n- Ruhezeiten zwischen Schichten zu kurz\n\nIch bitte um Prüfung der Arbeitszeitdokumentation.` },
    gew_arbeitsschutz: { icon:"👷", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich erhebliche Mängel im betrieblichen Arbeitsschutz.\n\nUnternehmen: [Name, Adresse]\n\nFolgende Verstöße liegen vor:\n- Notwendige persönliche Schutzausrüstung fehlt oder ist defekt\n- Sicherheitsvorkehrungen an Maschinen wurden deaktiviert\n\nEs besteht akute Unfallgefahr. Ich bitte um unangekündigte Betriebskontrolle.` },
    gew_hygiene: { icon:"🧼", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich gravierende Hygienemängel im genannten Betrieb.\n\nBetrieb: [Name, Adresse]\n\nFestgestellte Mängel: [Schmutz, Schimmel, Verdacht auf Ungeziefer, mangelnde Kühlkette]\n\nDie Zustände verstoßen gegen die Lebensmittelhygieneverordnung (LMHV). Ich bitte um unangekündigte Kontrolle.` },
    gew_sonntag: { icon:"📅", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich Verstöße gegen die gesetzliche Sonn- und Feiertagsruhe an (§ 9 ArbZG).\n\nUnternehmen: [Name, Adresse]\n\nArbeitnehmer werden regelmäßig an Sonn- und Feiertagen beschäftigt, ohne dass eine behördliche Ausnahmegenehmigung vorliegt.\n\nIch bitte um Überprüfung.` },
    gew_gefahrstoff: { icon:"🛢️", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich die unsachgemäße Lagerung und Handhabung von Gefahrstoffen.\n\nBetrieb: [Name, Adresse]\n\nSachverhalt: Giftige/brennbare Substanzen werden nicht ordnungsgemäß gelagert, Sicherheitsdatenblätter fehlen, Mitarbeiter sind nicht unterwiesen (Verstoß gegen GefStoffV).\n\nEs drohen Umweltschäden und Gesundheitsgefahren.` },
    gew_fluchtwege: { icon:"🚪", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich, dass wesentliche Flucht- und Rettungswege im Betrieb dauerhaft blockiert, zugestellt oder verschlossen sind (Verstoß gegen ArbStättV §4).\n\nBetrieb: [Name, Adresse]\n\nIm Brand- oder Notfall ist eine sichere Evakuierung der Mitarbeiter nicht gewährleistet. Sofortiges Handeln ist geboten.` },
    gew_sanitaer: { icon:"🚽", body: `Sehr geehrte Damen und Herren,\n\nhiermit beschwere ich mich über unzumutbare Sanitäranlagen für Mitarbeiter.\n\nBetrieb: [Name, Adresse]\n\nDie Anlagen sind in unzureichender Zahl vorhanden, dauerhaft defekt oder verstoßen gegen grundlegende Hygienestandards gemäß Arbeitsstättenverordnung (ASR A4.1).` },
    gew_jugend: { icon:"🧒", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich Verstöße gegen das Jugendarbeitsschutzgesetz (JArbSchG).\n\nBetrieb: [Name, Adresse]\n\nMinderjährige Beschäftigte / Auszubildende: [Arbeiten zu lange / nach 22 Uhr / ohne Pausenzeiten gemäß § 11 JArbSchG]\n\nIch bitte um Überprüfung.` },
    gew_klima: { icon:"🌡️", body: `Sehr geehrte Damen und Herren,\n\nhiermit weise ich auf unzumutbare Raumtemperaturen am Arbeitsplatz hin (Verstoß gegen ASR A3.5).\n\nBetrieb: [Name, Adresse]\nProblem: [keine ausreichende Beheizung im Winter / unerträgliche Hitze im Sommer ohne Maßnahmen]\n\nIch bitte um Überprüfung und Anordnung von Schutzmaßnahmen.` },
    gew_laerm: { icon:"🙉", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich eine gesundheitsgefährdende Lärm- und Schadstoffbelastung am Arbeitsplatz.\n\nBetrieb: [Name, Adresse]\n\nDie Grenzwerte der Lärm-Vibrationsschutzverordnung (LärmVibrationsArbSchV) werden überschritten. Entsprechende Schutzmaßnahmen (Lärmschutz, Absaugung) fehlen vollständig.` }
  },
  tier: {
    tier_gewalt: { icon:"🛑", body: `Sehr geehrte Damen und Herren,\n\nhiermit erstatte ich Anzeige wegen aktiver Tierquälerei und Misshandlung (§ 17 TierSchG).\n\nOrt: [Adresse]\nTierhalter: [Name, falls bekannt]\nTier: [Art, Beschreibung]\n\nIch habe beobachtet, dass dem Tier erhebliche Schmerzen und Leiden absichtlich zugefügt wurden.\n\nIch bitte um sofortige Überprüfung und Sicherstellung des Tieres.` },
    tier_futter: { icon:"🥣", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich grobe Vernachlässigung der artgerechten Tierhaltung.\n\nOrt: [Adresse]\nTier: [Art, Beschreibung]\n\nDem Tier stehen weder ausreichend frisches Trinkwasser noch angemessene Nahrung zur Verfügung, was zu einer sichtbaren Abmagerung und Schwächung geführt hat.\n\nIch bitte um unverzügliche Überprüfung.` },
    tier_platz: { icon:"⛓️", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich tierwidrige Haltungsbedingungen an.\n\nOrt: [Adresse]\nTier: [Art, Beschreibung]\n\nDas Tier wird in einem viel zu engen Käfig / in permanenter, kurzer Anbindehaltung ohne Auslauf gehalten. Artgerechtes Verhalten oder ausreichende Bewegung sind vollständig ausgeschlossen.` },
    tier_arzt: { icon:"🚑", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich, dass ein Tier offensichtlich an einer schweren Krankheit oder schmerzhaften Verletzung leidet.\n\nOrt: [Adresse]\nTier: [Art, Beschreibung der Verletzung/Krankheit]\n\nDer Halter verweigert jegliche tierärztliche Behandlung, was eine Straftat nach § 17 Nr. 1 TierSchG darstellt.\n\nBitte ordnen Sie eine tiermedizinische Untersuchung an.` },
    tier_zucht: { icon:"🐾", body: `Sehr geehrte Damen und Herren,\n\nhiermit teile ich meinen dringenden Verdacht auf illegale Welpenzucht und gewerbsmäßigen Tierhandel ("Vermehrer") mit.\n\nOrt: [Adresse]\n\nDie Umstände deuten auf fehlende Genehmigungen, fehlende Impfpässe, unhygienische Zustände und Verstöße gegen die Tierschutz-Hundeverordnung hin.\n\nIch bitte um Kontrolle.` },
    tier_ausgesetzt: { icon:"📦", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich das vorsätzliche Aussetzen eines Haustieres an (§ 17 Nr. 2 TierSchG).\n\nFundort des Tieres: [Adresse, Datum]\nTierbeschreibung: [Art, Rasse, Zustand]\n\nDas Tier wurde in obhutsloser Lage aufgefunden. Das Aussetzen stellt eine Straftat dar. Ich bitte um Einleitung von Ermittlungen.` },
    tier_gefahrhund: { icon:"🐕", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich einen potenziell gefährlichen Hund, der wiederholt ohne Leine und Maulkorb geführt wird.\n\nOrt: [Adresse, wann]\nHundehalter: [Beschreibung, falls bekannt]\nVorfälle: [Beschreibung der Gefährdung von Menschen oder anderen Tieren]\n\nIch bitte um Überprüfung der Halterzuverlässigkeit und entsprechende Auflagen.` },
    tier_hoarding: { icon:"🏚️", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich einen schweren Fall von Animal Hoarding (Tierhortung / übermäßige Tierhaltung).\n\nOrt: [Adresse]\n\nDer Halter ist offensichtlich überfordert, die hygienischen Zustände in der Wohnung/auf dem Grundstück sind katastrophal und die Tiere leiden unter massiver Verwahrlosung.\n\nIch bitte um sofortige Überprüfung.` },
    tier_wetter: { icon:"❄️", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich, dass Tiere schutzlos extremen Witterungsbedingungen ausgesetzt sind.\n\nOrt: [Adresse]\nSachverhalt: [Tier im geschlossenen Auto bei Hitze / Tier ohne Schutzhütte bei Frost]\n\nEs besteht akute Lebensgefahr für die betroffenen Tiere. Bitte sofort handeln!` },
    tier_wilderei: { icon:"🪤", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich den Verdacht auf Wilderei bzw. das illegale Aufstellen von Fallen oder Giftködern an.\n\nOrt: [Fundort, Datum]\n\nDiese Praktiken gefährden heimische Wildtiere sowie Hunde und Katzen massiv und sind strafbar nach dem Bundesjagdgesetz und dem TierSchG.\n\nIch bitte um polizeiliche Ermittlungen.` }
  },
  finanzamt: {
    fin_schwarz: { icon:"💰", body: `Sehr geehrte Damen und Herren,\n\nhiermit erstatte ich Anzeige wegen Verdachts auf gewerbsmäßige Schwarzarbeit.\n\nBetroffenes Unternehmen/Person: [Name, Adresse]\n\nPersonen werden ohne ordnungsgemäße Anmeldung zur Sozialversicherung und ohne Abführung von Lohnsteuer beschäftigt.\n\nIch bitte um Prüfung durch die Finanzkontrolle Schwarzarbeit (FKS).` },
    fin_steuer: { icon:"📉", body: `Sehr geehrte Damen und Herren,\n\nhiermit teile ich einen fundierten Verdacht auf Steuerhinterziehung mit.\n\nBetroffene Person/Unternehmen: [Name, Adresse]\n\nEinnahmen, insbesondere aus Bargeldgeschäften, werden systematisch nicht in der Steuer- und Umsatzsteuererklärung angegeben.\n\nIch bitte um steuerliche Prüfung.` },
    fin_kasse: { icon:"🧾", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich den dringenden Verdacht auf Kassenmanipulation.\n\nBetrieb: [Name, Adresse]\n\nEs werden regelmäßig keine Kassenbons ausgegeben (Verstoß gegen § 146a AO), und das Kassensystem scheint nicht den gesetzlichen Anforderungen (TSE-Pflicht) zu entsprechen.` },
    fin_scheinselbst: { icon:"🕴️", body: `Sehr geehrte Damen und Herren,\n\nhiermit weise ich auf illegale Arbeitnehmerüberlassung und Scheinselbstständigkeit hin.\n\nBetrieb: [Name, Adresse]\n\nDie als "Auftragnehmer" beschäftigten Personen sind weisungsgebunden, in den Betrieb eingegliedert und tragen kein unternehmerisches Risiko. Ich rege eine Statusfeststellung durch die DRV an.` },
    fin_mindestlohn: { icon:"💶", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich systematischen Betrug beim gesetzlichen Mindestlohn (MiLoG).\n\nBetrieb: [Name, Adresse]\n\nDurch nicht erfasste, unbezahlte Überstunden oder gefälschte Stundenzettel liegt der tatsächliche Stundenlohn deutlich unter dem gesetzlichen Mindestlohn.\n\nIch bitte um Prüfung durch den Zoll.` },
    fin_buergergeld: { icon:"💸", body: `Sehr geehrte Damen und Herren,\n\nhiermit erstatte ich Anzeige wegen Leistungsbetrug (unerlaubte Doppelnutzung).\n\nBetroffene Person: [Name, Adresse, falls bekannt]\n\nDie genannte Person bezieht staatliche Transferleistungen (Bürgergeld/ALG I), geht aber gleichzeitig einer nicht gemeldeten Erwerbstätigkeit (Schwarzarbeit) nach.\n\nIch bitte um Überprüfung.` },
    fin_schmuggel: { icon:"🚬", body: `Sehr geehrte Damen und Herren,\n\nhiermit teile ich dem Zoll mit, dass unversteuerte oder geschmuggelte Waren (z.B. Zigaretten, Alkohol) illegal und gewerbsmäßig weiterverkauft werden.\n\nOrt des Verkaufs: [Adresse]\n\nIch bitte um eine entsprechende Zollprüfung.` },
    fin_briefkasten: { icon:"📬", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich den Verdacht auf eine Scheinfirma / Briefkastengesellschaft.\n\nFirma: [Name, Adresse]\n\nUnter der genannten Adresse findet keinerlei wirtschaftliche Tätigkeit statt. Es besteht der Verdacht auf Geldwäsche oder Steuerflucht.\n\nIch bitte um steuerrechtliche Prüfung.` },
    fin_firmenwagen: { icon:"🚗", body: `Sehr geehrte Damen und Herren,\n\nhiermit zeige ich an, dass Firmenfahrzeuge systematisch für private Zwecke genutzt werden, ohne dass dies als geldwerter Vorteil ordnungsgemäß (1%-Regelung oder Fahrtenbuch) versteuert wird.\n\nBetroffener: [Name / Funktion]\n\nDies stellt Steuerhinterziehung dar.` },
    fin_gewinn: { icon:"🍷", body: `Sehr geehrte Damen und Herren,\n\nhiermit melde ich den Verdacht auf verdeckte Gewinnausschüttung (vGA) in einer GmbH.\n\nBetroffenes Unternehmen: [Name, Adresse]\n\nPrivate Lebenshaltungskosten des Gesellschafter-Geschäftsführers (Urlaube, Luxusgüter, private Umbauten) werden systematisch als Betriebsausgaben verbucht.\n\nIch bitte um steuerliche Prüfung.` }
  }
};

/* === PARAGRAPHEN-ARSENAL PER MODULE === */
const ARSENAL = {
  ueberlastung: [
    { cat:'cat_arbschg', icon:'🛡️', key:'arbschg5', title:{de:'§ 5 ArbSchG — Gefährdungsbeurteilung',en:'§ 5 ArbSchG — Risk assessment'}, preview:{de:'Arbeitgeber muss Gefahren prüfen',en:'Employer must assess hazards'}, text:'Gemäß § 5 ArbSchG ist der Arbeitgeber verpflichtet, eine Beurteilung der Gefährdungen zu ermitteln. Die aktuelle Personalsituation ist hier offenkundig nicht zutreffend beurteilt.' },
    { cat:'cat_arbschg', icon:'🛡️', key:'arbschg15', title:{de:'§ 15/16 ArbSchG — Pflicht zur Gefährdungsbeurteilung',en:'§ 15/16 ArbSchG — Core obligation'}, preview:{de:'Zentrale Rechtsgrundlage',en:'Core legal basis'}, text:'Diese Anzeige erfolgt auf Grundlage von § 15 i.V.m. § 16 ArbSchG. Der Arbeitgeber ist verpflichtet, die Gesundheit der Beschäftigten zu schützen.' },
    { cat:'cat_arbschg', icon:'🛡️', key:'haftung', title:{de:'Haftungsfreistellung',en:'Liability disclaimer'}, preview:{de:'Persönliche Haftung ablehnen',en:'Decline personal liability'}, text:'Ich lehne ausdrücklich jede zivil- und strafrechtliche Haftung für Schäden ab, die auf die dokumentierten unzureichenden Arbeitsbedingungen zurückzuführen sind.' },
    { cat:'cat_bgb', icon:'⚖️', key:'bgb618', title:{de:'§ 618 BGB — Fürsorgepflicht',en:'§ 618 BGB — Duty of care'}, preview:{de:'Schutz von Leben und Gesundheit',en:'Protection of life and health'}, text:'Ich weise auf § 618 BGB hin: Der Arbeitgeber hat Dienstleistungen so zu regeln, dass der Verpflichtete gegen Gefahr für Leben und Gesundheit geschützt ist.' },
    { cat:'cat_bgb', icon:'⚖️', key:'bgb276', title:{de:'§ 276 BGB — Verschuldensmaßstab',en:'§ 276 BGB — Standard of care'}, preview:{de:'Haftungsmaßstab',en:'Liability standard'}, text:'Gemäß § 276 BGB i.V.m. § 254 BGB ist bei unzureichender Personalausstattung regelmäßig ein Mitverschulden des Arbeitgebers zu prüfen.' },
    { cat:'cat_bgb', icon:'⚖️', key:'bgb823', title:{de:'§ 823 BGB — Schadensersatz',en:'§ 823 BGB — Damages'}, preview:{de:'Arbeitgeber haftet für Organisationsverschulden',en:'Employer liable for organizational fault'}, text:'Gemäß § 823 BGB haftet der Arbeitgeber zum Schadensersatz, wenn er schuldhaft eine Rechtsverletzung begeht — Organisationsverschulden der Leitungsebene.' },
    { cat:'cat_arbzg', icon:'⏱️', key:'arbzg_pausen', title:{de:'ArbZG — Pausen / Ruhezeiten',en:'ArbZG — Breaks'}, preview:{de:'Pausen nicht eingehalten',en:'Breaks not respected'}, text:'Durch das massive Arbeitsaufkommen ist die Einhaltung der gesetzlich vorgeschriebenen Pausen- und Ruhezeiten nach dem ArbZG nicht mehr möglich. Straftat nach § 23 ArbZG.' },
    { cat:'cat_arbzg', icon:'⏱️', key:'arbzg_max', title:{de:'ArbZG — Höchstarbeitszeit',en:'ArbZG — Maximum working time'}, preview:{de:'8h/Tag, max. 10h, 48h/Woche',en:'8h/day, max. 10h, 48h/week'}, text:'Die tägliche Arbeitszeit überschreitet regelmäßig die nach § 3 ArbZG zulässige Höchstarbeitszeit von 8 Stunden (Ausgleich: max. 10h). Die wöchentliche Höchstarbeitszeit von 48h wird dauerhaft überschritten.' },
    { cat:'cat_arbzg', icon:'⏱️', key:'arbzg_nacht', title:{de:'ArbZG — Nachtarbeit',en:'ArbZG — Night work'}, preview:{de:'Besonderer Schutz Nachtarbeitnehmer',en:'Special night worker protection'}, text:'Bei Nachtarbeit gelten besondere Schutzvorschriften nach §§ 6, 6a ArbZG. Die Gesundheitsvorsorge ist sicherzustellen.' },
    { cat:'cat_stgb', icon:'⚠️', key:'stgb222', title:{de:'§ 222 StGB — Fahrlässige Tötung',en:'§ 222 StGB — Negligent homicide'}, preview:{de:'Persönliche Strafbarkeit',en:'Personal criminal liability'}, text:'Bei Eintritt einer schweren Schädigung ist eine strafrechtliche Verantwortlichkeit gemäß § 222 StGB zu prüfen. Die Verantwortlichkeit verlagert sich nach Kenntnisnahme auf den Arbeitgeber.' },
    { cat:'cat_stgb', icon:'⚠️', key:'stgb229', title:{de:'§ 229 StGB — Fahrlässige Körperverletzung',en:'§ 229 StGB — Negligent injury'}, preview:{de:'Strafbarkeit Behandlungsfehler',en:'Criminal liability'}, text:'Sollte es zu einer fahrlässigen Körperverletzung kommen, ist die persönliche strafrechtliche Verantwortlichkeit nach § 229 StGB zu prüfen.' },
    { cat:'cat_owig', icon:'🚨', key:'owig130', title:{de:'§ 130 OWiG — Aufsichtspflichtverletzung',en:'§ 130 OWiG — Supervision failure'}, preview:{de:'Aufsichtspflichtverletzung Inhaber',en:'Owner supervision failure'}, text:'§ 130 OWiG stellt Aufsichtspflichtverletzungen des Betriebsinhabers unter Geldbuße. Bei Duldung der Überlastung kann eine Ordnungswidrigkeit vorliegen (Bußgeld bis 1 Mio. €).' },
    { cat:'cat_sonstige', icon:'📜', key:'betrsichv', title:{de:'BetrSichV',en:'BetrSichV'}, preview:{de:'Sicherheit von Maschinen',en:'Work equipment safety'}, text:'Die BetrSichV verpflichtet zur sicheren Bereitstellung und Benutzung von Arbeitsmitteln. Bei Zeitdruck nicht eingehalten.' },
    { cat:'cat_sonstige', icon:'📜', key:'lastv', title:{de:'LasthandhabV',en:'LasthandhabV'}, preview:{de:'Manuelle Lastenhandhabung',en:'Manual load handling'}, text:'Die Lasthandhabungsverordnung verpflichtet zur Vermeidung manueller Lastenhandhabung. Bei chronischer Unterbesetzung nicht möglich.' },
    { cat:'cat_sonstige', icon:'📜', key:'arbstvo', title:{de:'ArbStättV',en:'ArbStättV'}, preview:{de:'Arbeitsstätten',en:'Workplaces'}, text:'Die ArbStättV regelt ausreichende Pausen- und Sanitärräume. Bei Personalmangel nicht nutzbar.' },
    { cat:'cat_sonstige', icon:'📜', key:'burlg', title:{de:'BUrlG',en:'BUrlG'}, preview:{de:'Mindesturlaub',en:'Minimum vacation'}, text:'Der gesetzliche Mindesturlaub (24 Werktage/Jahr) ist nicht verhandelbar.' },
    { cat:'cat_sonstige', icon:'📜', key:'dguv', title:{de:'DGUV',en:'DGUV'}, preview:{de:'Berufsgenossenschaft',en:'Trade association'}, text:'DGUV-Vorschriften (insb. V1) verpflichten zu sicheren Arbeitsbedingungen. Regressforderungen der BG möglich.' },
    { cat:'cat_schicht', icon:'🕐', key:'schicht_12h', title:{de:'12h-Schichten unzulässig',en:'12h shifts unlawful'}, preview:{de:'Höchstarbeitszeit nicht überschreiten',en:'Maximum working time'}, text:'12-Stunden-Schichten sind mit dem ArbZG nicht vereinbar (10h max, § 3 ArbZG).' },
    { cat:'cat_br', icon:'🏛️', key:'br_einschalten', title:{de:'Betriebsrat einschalten',en:'Engage works council'}, preview:{de:'Mitbestimmung',en:'Co-determination'}, text:'Der Betriebsrat ist gemäß § 87 Abs. 1 Nr. 7 BetrVG zu beteiligen. Ich werde diese Anzeige gleichzeitig dem Betriebsrat zur Kenntnis geben.' },
    { cat:'cat_br', icon:'🏛️', key:'remonstration', title:{de:'Remonstration (Beamte)',en:'Remonstration'}, preview:{de:'Bedenken gegen Anordnung',en:'Objections against order'}, text:'Als Beamter/Beamtin trete ich hiermit in die Remonstration gemäß § 63 BBG bzw. § 36 BeamtStG.' },
    { cat:'cat_beweis', icon:'📸', key:'beweis', title:{de:'Beweissicherung',en:'Evidence preservation'}, preview:{de:'Dokumentation',en:'Documentation'}, text:'Folgende Beweismittel sind gesichert: [Dienstpläne, Screenshots, Zeugenaussagen, E-Mails, Fotoaufnahmen].' }
  ],
  kindeswohl: [
    { cat:'cat_sgb', icon:'📘', key:'sgb8a', title:{de:'§ 8a SGB VIII — Schutzauftrag',en:'§ 8a SGB VIII — Protection mandate'}, preview:{de:'Zentrale Rechtsgrundlage',en:'Core legal basis'}, text:'Diese Meldung erfolgt gemäß § 8a SGB VIII. Jugendamt und freie Träger haben bei Bekanntwerden gewichtiger Anhaltspunkte für die Gefährdung des Kindeswohls eine Schutzkonzept einzuleiten.' },
    { cat:'cat_sgb', icon:'📘', key:'sgb8b', title:{de:'§ 8b SGB VIII — InsoFa',en:'§ 8b SGB VIII — Specialist'}, preview:{de:'Fachkraft hinzuziehen',en:'Engage specialist'}, text:'Bei der Gefährdungseinschätzung ist eine insoweit erfahrene Fachkraft (InsoFa) hinzuzuziehen gemäß § 8b SGB VIII.' },
    { cat:'cat_kkg', icon:'🛡️', key:'kkg1', title:{de:'§ 1 KKG — Beratung und Information',en:'§ 1 KKG — Counseling'}, preview:{de:'Beratungsanspruch',en:'Counseling claim'}, text:'Gemäß § 1 KKG haben Eltern (und Kinder) Anspruch auf Beratung und Information durch die Jugendhilfe — auch ohne Antrag.' },
    { cat:'cat_kkg', icon:'🛡️', key:'kkg2', title:{de:'§ 2 KKG — Beratung in Fragen Partnerschaft',en:'§ 2 KKG — Family counseling'}, preview:{de:'Erziehungsberatung',en:'Family counseling'}, text:'Erziehungsberatung gemäß § 2 KKG steht allen Kindern, Jugendlichen und Eltern kostenfrei zu.' },
    { cat:'cat_kkg', icon:'🛡️', key:'kkg4', title:{de:'§ 4 KKG — Bundesinitiative',en:'§ 4 KKG — Federal initiative'}, preview:{de:'Frühe Hilfen',en:'Early help'}, text:'Frühe Hilfen gemäß § 4 KKG bieten Unterstützung für Familien mit Kindern von 0-3 Jahren.' },
    { cat:'cat_sorgerecht', icon:'👪', key:'bgb1666', title:{de:'§ 1666 BGB — Kindeswohlgefährdung',en:'§ 1666 BGB — Child welfare endangerment'}, preview:{de:'Eingriff ins Sorgerecht',en:'Custody intervention'}, text:'Bei Gefährdung des Kindeswohls kann das Familiengericht gemäß § 1666 BGB Maßnahmen treffen bis hin zum Entzug des Sorgerechts.' },
    { cat:'cat_sorgerecht', icon:'👪', key:'bgb1666a', title:{de:'§ 1666a BGB — Trennung des Kindes',en:'§ 1666a BGB — Separation of child'}, preview:{de:'Inobhutnahme',en:'Taking into care'}, text:'Bei akuter Gefährdung kann das Familiengericht die Trennung des Kindes von der Familie anordnen gemäß § 1666a BGB.' },
    { cat:'cat_sgb', icon:'📘', key:'sgb42', title:{de:'§ 42 SGB VIII — Inobhutnahme',en:'§ 42 SGB VIII — Emergency taking'}, preview:{de:'Sofortige Schutzmaßnahme',en:'Immediate protection'}, text:'Das Jugendamt ist gemäß § 42 SGB VIII berechtigt und verpflichtet, ein Kind in Obhut zu nehmen, wenn es darum bittet oder eine dringende Gefahr für das Wohl besteht.' },
    { cat:'cat_stgb', icon:'⚠️', key:'stgb171', title:{de:'§ 171 StGB — Verletzung der Fürsorgepflicht',en:'§ 171 StGB — Breach of care duty'}, preview:{de:'Straftatbestand',en:'Criminal offense'}, text:'Wer seine Fürsorge- oder Erziehungspflicht grob vernachlässigt, wird gemäß § 171 StGB mit Freiheitsstrafe bis zu 3 Jahren bestraft.' },
    { cat:'cat_stgb', icon:'⚠️', key:'stgb174', title:{de:'§ 174 StGB — Sexueller Missbrauch',en:'§ 174 StGB — Sexual abuse'}, preview:{de:'Sexueller Missbrauch Schutzbefohlener',en:'Abuse of protected persons'}, text:'Sexueller Missbrauch Schutzbefohlener gemäß § 174 StGB ist mit Freiheitsstrafe bis zu 5 Jahren bedroht.' },
    { cat:'cat_stgb', icon:'⚠️', key:'stgb225', title:{de:'§ 225 StGB — Misshandlung Schutzbefohlener',en:'§ 225 StGB — Abuse of protected'}, preview:{de:'Misshandlung',en:'Abuse'}, text:'Wer eine Person unter 18 Jahren quält oder misshandelt, wird gemäß § 225 StGB mit Freiheitsstrafe von 6 Monaten bis zu 10 Jahren bestraft.' },
    { cat:'cat_stgb', icon:'⚠️', key:'stgb232', title:{de:'§ 232 StGB — Menschenhandel',en:'§ 232 StGB — Human trafficking'}, preview:{de:'Menschenhandel zum Zweck sexueller Ausbeutung',en:'Trafficking for sexual exploitation'}, text:'Menschenhandel zum Zweck der sexuellen Ausbeutung ist gemäß § 232 StGB mit Freiheitsstrafe bis zu 10 Jahren bedroht.' },
    { cat:'cat_stgb', icon:'⚠️', key:'stgb238', title:{de:'§ 238 StGB — Stalking / Nachstellung',en:'§ 238 StGB — Stalking'}, preview:{de:'Stalking auch Minderjähriger',en:'Stalking of minors'}, text:'Stalking / Nachstellung gemäß § 238 StGB ist auch bei Minderjährigen relevant — Kontaktverbote möglich.' },
    { cat:'cat_stgb', icon:'⚠️', key:'stgb166a', title:{de:'§ 166a StGB — Beschimpfung von Bekenntnissen',en:'§ 166a StGB — Blasphemy'}, preview:{de:'Religiöse Beschimpfung',en:'Religious insult'}, text:'Beschimpfung religiöser Bekenntnisse gemäß § 166a StGB — relevant bei Cybermobbing mit religiösem Bezug.' },
    { cat:'cat_sgb', icon:'📘', key:'sgb1', title:{de:'§ 1 SGB VIII — Recht auf Erziehung',en:'§ 1 SGB VIII — Right to education'}, preview:{de:'Grundrecht',en:'Fundamental right'}, text:'Jedes Kind hat gemäß § 1 SGB VIII das Recht auf Erziehung, Elternverantwortung und Jugendhilfe.' },
    { cat:'cat_kkg', icon:'🛡️', key:'kkg3', title:{de:'§ 3 KKG — Frühe Hilfen / Netzwerke',en:'§ 3 KKG — Early help networks'}, preview:{de:'Lokale Netzwerke Frühe Hilfen',en:'Local early help networks'}, text:'Lokale Netzwerke Frühe Hilfen gemäß § 3 KKG bieten Unterstützung für Familien in Belastungssituationen.' },
    { cat:'cat_sorgerecht', icon:'👪', key:'bgb1631', title:{de:'§ 1631 BGB — Inhalte Sorgerecht',en:'§ 1631 BGB — Content of custody'}, preview:{de:'Pflicht zu kindgerechter Erziehung',en:'Duty of age-appropriate upbringing'}, text:'Die Sorgeberechtigten sind gemäß § 1631 BGB verpflichtet, das Kind in seiner Entwicklung zu fördern und vor Schäden zu schützen.' },
    { cat:'cat_sgb', icon:'📘', key:'sgb50', title:{de:'§ 50 SGB VIII — Mitwirkung',en:'§ 50 SGB VIII — Cooperation'}, preview:{de:'Pflicht zur Mitwirkung',en:'Duty to cooperate'}, text:'Die Sorgeberechtigten sind verpflichtet, an der Hilfeplanung gemäß § 50 SGB VIII mitzuwirken.' },
    { cat:'cat_kkg', icon:'🛡️', key:'kkg5', title:{de:'§ 5 KKG — Bundesstiftung',en:'§ 5 KKG — Federal foundation'}, preview:{de:'Bundesstiftung Frühe Hilfen',en:'Federal early help foundation'}, text:'Die Bundesstiftung Frühe Hilfen gemäß § 5 KKG unterstützt bundesweit Familien mit Säuglingen und Kleinkindern.' },
    { cat:'cat_sorgerecht', icon:'👪', key:'bgb1684', title:{de:'§ 1684 BGB — Umgangsrecht',en:'§ 1684 BGB — Right of access'}, preview:{de:'Umgangsrecht',en:'Access rights'}, text:'Das Umgangsrecht gemäß § 1684 BGB umfasst auch das Recht des Kindes auf Umgang mit beiden Elternteilen.' }
  ],
  strafanzeige: [
    { cat:'cat_stgb', icon:'⚖️', key:'stgb242', title:{de:'§ 242 StGB — Diebstahl',en:'§ 242 StGB — Theft'}, preview:{de:'Fremdes Eigentum weggenommen',en:'Taking foreign property'}, text:'Diese Anzeige erfolgt wegen Diebstahls gemäß § 242 StGB. Wer eine fremde bewegliche Sache einem anderen in der Absicht wegnimmt, die Sache sich oder einem Dritten rechtswidrig zuzueignen, wird mit Freiheitsstrafe bis zu 5 Jahren bestraft.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb243', title:{de:'§ 243 StGB — Besonders schwerer Fall',en:'§ 243 StGB — Aggravated theft'}, preview:{de:'Schwerer Diebstahl',en:'Aggravated theft'}, text:'Besonders schwerer Fall des Diebstahls gemäß § 243 StGB: Einbruch, Taschendiebstahl, etc. Freiheitsstrafe 3 Monate bis 10 Jahre.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb244', title:{de:'§ 244 StGB — Wohnungseinbruch',en:'§ 244 StGB — Burglary'}, preview:{de:'Einbruchdiebstahl',en:'Burglary'}, text:'Wohnungseinbruchdiebstahl gemäß § 244 StGB: Freiheitsstrafe 6 Monate bis 10 Jahre. Besonders hohe Strafandrohung.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb263', title:{de:'§ 263 StGB — Betrug',en:'§ 263 StGB — Fraud'}, preview:{de:'Täuschung + Vermögensschaden',en:'Deception + financial loss'}, text:'Diese Anzeige erfolgt wegen Betrugs gemäß § 263 StGB. Wer in der Absicht, sich oder einem Dritten einen rechtswidrigen Vermögensvorteil zu verschaffen, das Vermögen eines anderen durch Täuschung schädigt, wird mit Freiheitsstrafe bis zu 5 Jahren bestraft.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb263a', title:{de:'§ 263a StGB — Computerbetrug',en:'§ 263a StGB — Computer fraud'}, preview:{de:'Online-Betrug',en:'Online fraud'}, text:'Computerbetrug gemäß § 263a StGB: Wer durch Computersysteme Vermögen schädigt. Relevant für Online-Banking-Betrug, Fake-Shops, Phishing.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb202a', title:{de:'§ 202a StGB — Ausspähen von Daten',en:'§ 202a StGB — Data espionage'}, preview:{de:'Datenklau',en:'Data theft'}, text:'Ausspähen und Abfangen von Daten gemäß § 202a StGB: Wer unbefugt Daten, die nicht für ihn bestimmt sind, sich oder einem anderen verschafft.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb269', title:{de:'§ 269 StGB — Fälschung beweiserheblicher Daten',en:'§ 269 StGB — Forgery of evidence'}, preview:{de:'Datenfälschung',en:'Data forgery'}, text:'Fälschung beweiserheblicher Daten gemäß § 269 StGB: Wer zur Täuschung im Rechtsverkehr beweiserhebliche Daten herstellt, verfälscht oder gebraucht.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb185', title:{de:'§ 185 StGB — Beleidigung',en:'§ 185 StGB — Insult'}, preview:{de:'Ehrenrührige Äußerung',en:'Insulting statement'}, text:'Beleidigung gemäß § 185 StGB: Wer einen anderen durch ehrenrührige Äußerungen herabsetzt, wird mit Geldstrafe oder Freiheitsstrafe bis zu 1 Jahr bestraft.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb186', title:{de:'§ 186 StGB — Üble Nachrede',en:'§ 186 StGB — Defamation'}, preview:{de:'Tatsachenbehauptung verbreitet',en:'Spreading defamatory claims'}, text:'Üble Nachrede gemäß § 186 StGB: Wer in Beziehung auf einen anderen eine unwahre Tatsache behauptet, die denselben verächtlich macht.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb187', title:{de:'§ 187 StGB — Verleumdung',en:'§ 187 StGB — Slander'}, preview:{de:'Wissentlich falsche Behauptung',en:'Knowingly false claim'}, text:'Verleumdung gemäß § 187 StGB: Wer wider besseres Wissen eine unwahre Tatsache behauptet. Höhere Strafandrohung als § 186.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb241', title:{de:'§ 241 StGB — Bedrohung',en:'§ 241 StGB — Threat'}, preview:{de:'Angedrohte Übel',en:'Threat of harm'}, text:'Bedrohung gemäß § 241 StGB: Wer einen anderen mit der Begehung einer Straftat bedroht. Geldstrafe oder Freiheitsstrafe bis zu 1 Jahr.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb223', title:{de:'§ 223 StGB — Körperverletzung',en:'§ 223 StGB — Bodily harm'}, preview:{de:'Körperliche Misshandlung',en:'Physical harm'}, text:'Körperverletzung gemäß § 243 StGB: Wer eine andere Person körperlich misshandelt oder an der Gesundheit schädigt. Freiheitsstrafe bis zu 5 Jahren.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb224', title:{de:'§ 224 StGB — Gefährliche Körperverletzung',en:'§ 224 StGB — Dangerous bodily harm'}, preview:{de:'Mit Waffe / mehreren',en:'With weapon / multiple'}, text:'Gefährliche Körperverletzung gemäß § 224 StGB: Begehung mit Waffe, hinterlistigen Überfall, gemeinschaftlich etc. Mindeststrafe 6 Monate.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb226', title:{de:'§ 226 StGB — Schwere Körperverletzung',en:'§ 226 StGB — Grievous bodily harm'}, preview:{de:'Schwere Verletzung',en:'Severe injury'}, text:'Schwere Körperverletzung gemäß § 226 StGB: Verlust der Sehkraft, Gehör, Fortpflanzungsfähigkeit, wichtiges Glied. Freiheitsstrafe 1-10 Jahre.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb303', title:{de:'§ 303 StGB — Sachbeschädigung',en:'§ 303 StGB — Property damage'}, preview:{de:'Beschädigung fremder Sachen',en:'Damage to foreign property'}, text:'Sachbeschädigung gemäß § 303 StGB: Wer rechtswidrig eine fremde Sache beschädigt oder zerstört. Geldstrafe oder Freiheitsstrafe bis zu 2 Jahren.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb303a', title:{de:'§ 303a StGB — Datenveränderung',en:'§ 303a StGB — Data alteration'}, preview:{de:'Daten gelöscht / verändert',en:'Data deleted / altered'}, text:'Datenveränderung gemäß § 303a StGB: Wer rechtswidrig Daten löscht, unterdrückt, unbrauchbar macht oder verändert.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb240', title:{de:'§ 240 StGB — Nötigung',en:'§ 240 StGB — Coercion'}, preview:{de:'Zwang durch Drohung / Gewalt',en:'Force by threat/violence'}, text:'Nötigung gemäß § 240 StGB: Wer einen Menschen mit Gewalt oder Drohung zu einer Handlung zwingt.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb238', title:{de:'§ 238 StGB — Stalking / Nachstellung',en:'§ 238 StGB — Stalking'}, preview:{de:'Wiederholte Belästigung',en:'Repeated harassment'}, text:'Stalking / Nachstellung gemäß § 238 StGB: Wer einem anderen wiederholt nachstellt, ihn kontaktiert. Freiheitsstrafe bis zu 3 Jahren.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb142', title:{de:'§ 142 StGB — Unfallflucht',en:'§ 142 StGB — Hit and run'}, preview:{de:'Unfallort verlassen',en:'Leaving accident scene'}, text:'Unfallflucht gemäß § 142 StGB: Wer sich nach einem Unfall vom Ort entfernt, ohne Feststellungen zu ermöglichen. Freiheitsstrafe bis zu 3 Jahren.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb166a', title:{de:'§ 166a StGB — Beschimpfung von Bekenntnissen',en:'§ 166a StGB — Blasphemy'}, preview:{de:'Beleidigung Religion',en:'Insulting religion'}, text:'Beschimpfung von Bekenntnissen, Religionsgesellschaften und Weltanschauungsvereinigungen gemäß § 166a StGB.' },
    { cat:'cat_stpo', icon:'🔍', key:'stpo158', title:{de:'§ 158 StPO — Strafanzeige',en:'§ 158 StPO — Criminal complaint'}, preview:{de:'Form der Anzeige',en:'Form of complaint'}, text:'Die Anzeige kann gemäß § 158 StPO mündlich oder schriftlich bei der Staatsanwaltschaft, den Behörden und Beamten des Polizeidienstes oder den Amtsgerichten erstattet werden.' },
    { cat:'cat_stpo', icon:'🔍', key:'stpo161a', title:{de:'§ 161a StPO — Vernehmung Zeugen',en:'§ 161a StPO — Witness examination'}, preview:{de:'Zeugenaussage',en:'Witness statement'}, text:'Die Staatsanwaltschaft kann gemäß § 161a StPO Zeugen und Sachverständige vernehmen und Beweise erheben.' },
    { cat:'cat_stpo', icon:'🔍', key:'stpo163', title:{de:'§ 163 StPO — Ermittlungspflicht',en:'§ 163 StPO — Investigation duty'}, preview:{de:'Polizei ermittelt',en:'Police investigates'}, text:'Die Polizei ist gemäß § 163 StPO verpflichtet, Straftaten zu erforschen und alle keinen Aufschub gestattenden Anordnungen zu treffen.' },
    { cat:'cat_stpo', icon:'🔍', key:'stpo406e', title:{de:'§ 406e StPO — Akteneinsicht',en:'§ 406e StPO — File inspection'}, preview:{de:'Recht auf Akteneinsicht',en:'Right to inspect files'}, text:'Verletzte haben gemäß § 406e StPO unter bestimmten Voraussetzungen Anspruch auf Akteneinsicht.' },
    { cat:'cat_stgb', icon:'⚖️', key:'stgb164', title:{de:'§ 164 StGB — Falsche Verdächtigung',en:'§ 164 StGB — False suspicion'}, preview:{de:'Falschbeschuldigung',en:'False accusation'}, text:'Falsche Verdächtigung gemäß § 164 StGB: Wer einen anderen wider besseres Wissen einer Straftat beschuldigt, wird mit Freiheitsstrafe bis zu 5 Jahren bestraft.' }
  ],
  mietmangel: [
    { cat:'cat_miet', icon:'🏠', key:'bgb536', title:{de:'§ 536 BGB — Mietminderung bei Sachmängeln',en:'§ 536 BGB — Rent reduction'}, preview:{de:'Grundlage Mietminderung',en:'Basis of rent reduction'}, text:'Hat die Mietsache zur Zeit der Überlassung an den Mieter einen Fehler, der ihre Tauglichkeit zu dem vertragsgemäßen Gebrauch aufhebt oder mindert, so ist der Mieter für die Zeit, in der die Tauglichkeit aufgehoben oder gemindert ist, von der Entrichtung der Miete ganz oder teilweise befreit.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb536a', title:{de:'§ 536a BGB — Schadensersatz',en:'§ 536a BGB — Damages'}, preview:{de:'Schadensersatz wegen Mangel',en:'Damages due to defect'}, text:'Kann der Mieter die Mietsache nicht vertragsgemäß gebrauchen, so ist der Vermieter verpflichtet, ihm Schadensersatz zu leisten.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb536b', title:{de:'§ 536b BGB — Kenntnis des Mieters',en:'§ 536b BGB — Knowledge of tenant'}, preview:{de:'Mietminderung verloren bei Kenntnis',en:'Lost right upon knowledge'}, text:'§ 536b BGB: Kennt der Mieter den Mangel bei Vertragsschluss, so steht ihm ein Mietminderungsrecht nicht zu. Spätere Mängel: Minderung weiter möglich.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb536c', title:{de:'§ 536c BGB — Mängelanzeige',en:'§ 536c BGB — Defect notice'}, preview:{de:'Pflicht zur Mängelanzeige',en:'Duty to report defect'}, text:'Der Mieter hat dem Vermieter einen Mangel unverzüglich anzuzeigen. Unterlässt er die Anzeige, ist er zum Ersatz des daraus entstehenden Schadens verpflichtet.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb536d', title:{de:'§ 536d BGB — Vertraglicher Ausschluss',en:'§ 536d BGB — Contractual exclusion'}, preview:{de:'Ausschluss Mietminderung',en:'Exclusion of rent reduction'}, text:'§ 536d BGB: Vertraglich kann das Mietminderungsrecht nicht ausgeschlossen werden bei Mängeln, die der Vermieter zu vertreten hat.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb543', title:{de:'§ 543 BGB — Fristlose Kündigung',en:'§ 543 BGB — Termination without notice'}, preview:{de:'Kündigung bei schwerem Mangel',en:'Termination for serious defect'}, text:'Jede Vertragspartei kann das Mietverhältnis aus wichtigem Grund außerordentlich mit der gesetzlichen Frist kündigen, wenn dem Kündigenden unter Berücksichtigung aller Umstände die Fortsetzung nicht zugemutet werden kann.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb555a', title:{de:'§ 555a BGB — Erhaltungsmaßnahmen',en:'§ 555a BGB — Maintenance'}, preview:{de:'Erhaltungspflicht Vermieter',en:'Landlord maintenance duty'}, text:'Der Vermieter hat die Mietsache instand zu halten. Mängel sind unverzüglich zu beseitigen.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb555b', title:{de:'§ 555b BGB — Modernisierung',en:'§ 555b BGB — Modernization'}, preview:{de:'Modernisierungsmaßnahmen',en:'Renovation measures'}, text:'Modernisierungsmaßnahmen sind bauliche Veränderungen, die den Gebrauchswert der Mietsache nachhaltig erhöhen, die allgemeinen Wohnverhältnisse verbessern oder energiesparend wirken.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb555c', title:{de:'§ 555c BGB — Ankündigung',en:'§ 555c BGB — Announcement'}, preview:{de:'3 Monate Ankündigungsfrist',en:'3 month announcement period'}, text:'Der Vermieter hat dem Mieter eine Modernisierungsmaßnahme spätestens 3 Monate vor Beginn in Textform anzukündigen und zu erläutern.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb555d', title:{de:'§ 555d BGB — Härteeinwand',en:'§ 555d BGB — Hardship objection'}, preview:{de:'Härtegründe gegen Modernisierung',en:'Hardship grounds'}, text:'Der Mieter kann einer Modernisierung widersprechen, wenn sie für ihn eine nicht zu rechtfertigende Härte bedeutet. Härtegründe sind insbesondere zu erwartende unzumutbare Beeinträchtigungen.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb555e', title:{de:'§ 555e BGB — Sonderkündigungsrecht',en:'§ 555e BGB — Special termination right'}, preview:{de:'Sonderkündigungsrecht Mieter',en:'Tenant special termination'}, text:'Kündigt der Vermieter eine Modernisierung an, kann der Mieter das Mietverhältnis außerordentlich zum Ende des übernächsten Monats kündigen.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb558', title:{de:'§ 558 BGB — Mieterhöhung',en:'§ 558 BGB — Rent increase'}, preview:{de:'Regelmäßige Mieterhöhung',en:'Regular rent increase'}, text:'Der Vermieter kann die Miete bis zur ortsüblichen Vergleichsmiete erhöhen. Erhöhung mit Zustimmung des Mieters (Mieterhöhungsverlangen) oder per Staffelmiete / Indexmiete.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb558a', title:{de:'§ 558a BGB — Mieterhöhungserklärung',en:'§ 558a BGB — Rent increase form'}, preview:{de:'Form Mieterhöhung',en:'Form of rent increase'}, text:'Die Mieterhöhung muss dem Mieter in Textform erklärt und begründet werden. Frist: 2 Monate Überlegungsfrist.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb559', title:{de:'§ 559 BGB — Mieterhöhung bei Modernisierung',en:'§ 559 BGB — Rent increase for modernization'}, preview:{de:'Modernisierungsumlage',en:'Modernization cost allocation'}, text:'Mieterhöhung nach Modernisierung: 8% der Kosten bei Energie-Modernisierung, sonst 11% der aufgewendeten Kosten.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb574', title:{de:'§ 574 BGB — Sozialklausel',en:'§ 574 BGB — Social clause'}, preview:{de:'Kündigung widersprechen',en:'Objection to termination'}, text:'Der Mieter kann der Kündigung widersprechen und vom Vermieter die Fortsetzung des Mietverhältnisses verlangen, wenn die Beendigung für ihn eine nicht zu rechtfertigende Härte bedeuten würde.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb574b', title:{de:'§ 574b BGB — Form Widerspruch',en:'§ 574b BGB — Form of objection'}, preview:{de:'Widerspruchsfrist 2 Monate',en:'2 month objection period'}, text:'Der Widerspruch ist spätestens 2 Monate vor Beendigung dem Vermieter in Textform zu erklären.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb551', title:{de:'§ 551 BGB — Mietkaution',en:'§ 551 BGB — Security deposit'}, preview:{de:'Kautionshöhe max. 3 Nettomieten',en:'Max 3 net rents deposit'}, text:'Die Mietkaution darf das 3-fache der monatlichen Nettomiete ohne Betriebskosten nicht übersteigen. Verzinsungspflicht gemäß Abs. 3.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb556', title:{de:'§ 556 BGB — Mietpreisbremse',en:'§ 556 BGB — Rent brake'}, preview:{de:'Mietpreisbremse',en:'Rent brake'}, text:'In angespannten Wohnungsmärkten darf die Miete bei Neuvermietung max. 10% über der ortsüblichen Vergleichsmiete liegen. Verstöße: Rüge an Vermieter, ggf. Rückforderung.' },
    { cat:'cat_wohnen', icon:'🏘️', key:'wobindg', title:{de:'WoBindG — Wohnungsbindung',en:'WoBindG — Housing binding'}, preview:{de:'Geförderter Wohnraum',en:'Subsidized housing'}, text:'Das Wohnungsbindungsgesetz regelt die Belegung und Vermietung von öffentlich gefördertem Wohnraum. Mieterhöhungen sind nur in den Grenzen des Gesetzes zulässig.' },
    { cat:'cat_miesonstige', icon:'📋', key:'wogg', title:{de:'WoGG — Wohngeld',en:'WoGG — Housing benefit'}, preview:{de:'Wohngeld bei finanzieller Notlage',en:'Housing benefit in financial hardship'}, text:'Das Wohngeldgesetz (WoGG) regelt die einkommensabhängige Unterstützung für angemessene Wohnkosten.' },
    { cat:'cat_miesonstige', icon:'📋', key:'heizkostenv', title:{de:'HeizkostenV',en:'HeizkostenV'}, preview:{de:'Verbrauchserfassung Heizung',en:'Consumption-based heating billing'}, text:'Die Heizkostenverordnung regelt die verbrauchsabhängige Abrechnung von Heiz- und Warmwasserkosten — Mindestens 50%, max. 70% nach Verbrauch.' },
    { cat:'cat_miesonstige', icon:'📋', key:'betrkv', title:{de:'BetrKV — Betriebskostenverordnung',en:'BetrKV — Operating costs ordinance'}, preview:{de:'Umlagefähige Betriebskosten',en:'Allocable operating costs'}, text:'Die Betriebskostenverordnung regelt abschließend, welche Betriebskosten auf den Mieter umgelegt werden dürfen (Katalog in § 2 BetrKV).' },
    { cat:'cat_miesonstige', icon:'📋', key:'wofg', title:{de:'WoFG — Wohnraumförderung',en:'WoFG — Housing promotion'}, preview:{de:'Förderung Wohnungsbau',en:'Housing construction promotion'}, text:'Das Wohnraumförderungsgesetz regelt die Förderung von Sozialwohnungen und bezahlbarem Wohnraum.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb552', title:{de:'§ 552 BGB — Schönheitsreparaturen',en:'§ 552 BGB — Cosmetic repairs'}, preview:{de:'Renovierungspflicht',en:'Renovation duty'}, text:'Der Mieter hat Schönheitsreparaturen nur zu tragen, wenn dies vertraglich wirksam vereinbart wurde. Unwirksame Klauseln führen zu Pflichten des Vermieters.' },
    { cat:'cat_miet', icon:'🏠', key:'bgb553', title:{de:'§ 553 BGB — Untervermietung',en:'§ 553 BGB — Subletting'}, preview:{de:'Recht auf Untervermietung',en:'Right to sublet'}, text:'Der Mieter kann vom Vermieter die Erlaubnis zur Untervermietung verlangen, wenn ein berechtigtes Interesse vorliegt (z.B. Partner, finanzielle Gründe).' }
  ],
  ordnungsamt: [
    { cat:'cat_ord', icon:'🚗', key:'stvo12', title:{de:'§ 12 StVO — Halten und Parken',en:'§ 12 StVO'}, preview:{de:'Halte- und Parkverbot',en:'Parking'}, text:'Das Halten und Parken ist unzulässig an engen und unübersichtlichen Straßenstellen, im Bereich von scharfen Kurven, auf Fußgängerüberwegen sowie bis zu 5 Meter davor.' },
    { cat:'cat_ord', icon:'🗑️', key:'krwg', title:{de:'§ 28 KrWG — Abfallentsorgung',en:'§ 28 KrWG'}, preview:{de:'Illegale Müllentsorgung',en:'Waste'}, text:'Abfälle dürfen zum Zweck der Beseitigung nur in den dafür zugelassenen Anlagen oder Einrichtungen (Abfallbeseitigungsanlagen) behandelt, gelagert oder abgelagert werden.' },
    { cat:'cat_ord', icon:'🚨', key:'owig117', title:{de:'§ 117 OWiG — Unzulässiger Lärm',en:'§ 117 OWiG'}, preview:{de:'Lärmbelästigung',en:'Noise'}, text:'Ordnungswidrig handelt, wer ohne berechtigten Anlass oder in einem unzulässigen oder nach den Umständen vermeidbaren Ausmaß Lärm erregt, der geeignet ist, die Allgemeinheit oder die Nachbarschaft erheblich zu belästigen.' }
  ],
  datenschutz: [
    { cat:'cat_dsgvo', icon:'ℹ️', key:'dsgvo15', title:{de:'Art. 15 DSGVO — Auskunftsrecht',en:'Art. 15 GDPR'}, preview:{de:'Recht auf Datenauskunft',en:'Access'}, text:'Die betroffene Person hat das Recht, von dem Verantwortlichen eine Bestätigung darüber zu verlangen, ob betreffende personenbezogene Daten verarbeitet werden; ist dies der Fall, so hat sie ein Recht auf Auskunft über diese Daten.' },
    { cat:'cat_dsgvo', icon:'🗑️', key:'dsgvo17', title:{de:'Art. 17 DSGVO — Recht auf Löschung',en:'Art. 17 GDPR'}, preview:{de:'Recht auf Vergessenwerden',en:'Erasure'}, text:'Die betroffene Person hat das Recht, von dem Verantwortlichen zu verlangen, dass sie betreffende personenbezogene Daten unverzüglich gelöscht werden, sofern einer der Gründe zutrifft (z.B. Zweckerreichung).' },
    { cat:'cat_dsgvo', icon:'🛡️', key:'dsgvo77', title:{de:'Art. 77 DSGVO — Beschwerde bei Aufsicht',en:'Art. 77 GDPR'}, preview:{de:'Beschwerderecht',en:'Complaint'}, text:'Jede betroffene Person hat unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer Aufsichtsbehörde.' }
  ],
  gewerbe: [
    { cat:'cat_gew', icon:'⏱️', key:'arbzg3', title:{de:'§ 3 ArbZG — Arbeitszeit',en:'§ 3 ArbZG'}, preview:{de:'Maximale Arbeitszeit',en:'Working time'}, text:'Die werktägliche Arbeitszeit der Arbeitnehmer darf acht Stunden nicht überschreiten. Sie kann auf bis zu zehn Stunden nur verlängert werden, wenn innerhalb von sechs Kalendermonaten im Durchschnitt acht Stunden nicht überschritten werden.' },
    { cat:'cat_gew', icon:'👷', key:'arbschg', title:{de:'§ 4 ArbSchG — Allgemeine Grundsätze',en:'§ 4 ArbSchG'}, preview:{de:'Sicherheit bei der Arbeit',en:'Safety'}, text:'Der Arbeitgeber hat die Arbeit so zu gestalten, dass eine Gefährdung für das Leben sowie die physische und die psychische Gesundheit möglichst vermieden wird.' }
  ],
  tier: [
    { cat:'cat_tier', icon:'🐶', key:'tierschg2', title:{de:'§ 2 TierSchG — Tierhaltung',en:'§ 2 TierSchG'}, preview:{de:'Pflichten Tierhalter',en:'Owner duties'}, text:'Wer ein Tier hält, betreut oder zu betreuen hat, muss das Tier seiner Art und seinen Bedürfnissen entsprechend angemessen ernähren, pflegen und verhaltensgerecht unterbringen.' },
    { cat:'cat_tier', icon:'🚫', key:'tierschg17', title:{de:'§ 17 TierSchG — Straftat',en:'§ 17 TierSchG'}, preview:{de:'Tötung/Quälerei',en:'Cruelty'}, text:'Mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe wird bestraft, wer ein Wirbeltier ohne vernünftigen Grund tötet oder ihm aus Rohheit erhebliche Schmerzen oder Leiden zufügt.' }
  ],
  finanzamt: [
    { cat:'cat_fin', icon:'💸', key:'schwarzarbg', title:{de:'§ 1 SchwarzArbG',en:'§ 1 SchwarzArbG'}, preview:{de:'Verbot der Schwarzarbeit',en:'Illicit work'}, text:'Zweck dieses Gesetzes ist die Bekämpfung der Schwarzarbeit. Schwarzarbeit leistet, wer steuerrechtliche Pflichten, sozialversicherungsrechtliche Pflichten oder Mitteilungspflichten nicht erfüllt.' },
    { cat:'cat_fin', icon:'📉', key:'ao370', title:{de:'§ 370 AO — Steuerhinterziehung',en:'§ 370 AO'}, preview:{de:'Straftatbestand',en:'Tax evasion'}, text:'Mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe wird bestraft, wer den Finanzbehörden über steuerlich erhebliche Tatsachen unrichtige oder unvollständige Angaben macht.' }
  ]
};

/* === EVIDENCE-ITEMS PER MODULE === */
const EVIDENCE = {
  ueberlastung: ['ev_dienstplan','ev_zeugen','ev_gespraech','ev_email','ev_foto','ev_au','ev_unfall','ev_anweisung','ev_fortbildung','ev_ce_zert','ev_frist','ev_audit'],
  kindeswohl: ['ev_kind_schulnoten','ev_kind_zeugen','ev_kind_arztbericht','ev_kind_kindergarten','ev_kind_chatverlauf','ev_kind_soforthilfe','ev_foto','ev_email'],
  strafanzeige: ['ev_str_diebstahl','ev_str_zeuge','ev_str_beweis','ev_str_ip','ev_str_auszug','ev_foto'],
  mietmangel: ['ev_mie_foto','ev_mie_messung','ev_mie_arzt','ev_mie_zeuge','ev_mie_korrespondenz','ev_mie_abrechnung','ev_mie_modernisierung','ev_mie_vertrag'],
  ordnungsamt: ['ev_ord_foto', 'ev_ord_zeuge', 'ev_ord_notiz', 'ev_ord_korrespondenz', 'ev_ord_sonstiges'],
  datenschutz: ['ev_dsgvo_korrespondenz', 'ev_dsgvo_screenshot', 'ev_dsgvo_vertrag', 'ev_dsgvo_zeuge', 'ev_dsgvo_sonstiges'],
  gewerbe: ['ev_gew_foto', 'ev_gew_zeuge', 'ev_gew_vertrag', 'ev_gew_dokumente', 'ev_gew_sonstiges'],
  tier: ['ev_tier_foto', 'ev_tier_video', 'ev_tier_zeuge', 'ev_tier_tierarzt', 'ev_tier_sonstiges'],
  finanzamt: ['ev_fin_rechnung', 'ev_fin_kontoauszug', 'ev_fin_zeuge', 'ev_fin_korrespondenz', 'ev_fin_sonstiges']
};

/* === INCIDENT CATEGORIES PER MODULE === */
const INCIDENT_CATS = {
  ueberlastung: 'cat_inc_ueb',
  kindeswohl: 'cat_inc_kind',
  strafanzeige: 'cat_inc_str',
  mietmangel: 'cat_inc_mie',
  ordnungsamt: 'cat_inc_ord',
  datenschutz: 'cat_inc_dsgvo',
  gewerbe: 'cat_inc_gew',
  tier: 'cat_inc_tier',
  finanzamt: 'cat_inc_fin'
};

/* === TIMELINE PER MODULE === */
const TIMELINE = {
  ueberlastung: [
    { stage:1, key:'tl_anzeige' }, { stage:2, key:'tl_frist' }, { stage:3, key:'tl_erinnerung' },
    { stage:4, key:'tl_br' }, { stage:5, key:'tl_anhoerung' }, { stage:6, key:'tl_extern' }
  ],
  kindeswohl: [
    { stage:1, key:'tl_anzeige' }, { stage:2, key:'tl_beratung' }, { stage:3, key:'tl_anhoerung_kind' },
    { stage:4, key:'tl_familie' }, { stage:5, key:'tl_akut' }
  ],
  strafanzeige: [
    { stage:1, key:'tl_anzeige_erstattet' }, { stage:2, key:'tl_akteneinsicht' },
    { stage:3, key:'tl_klage' }, { stage:4, key:'tl_verhandlung' }
  ],
  mietmangel: [
    { stage:1, key:'tl_anzeige' }, { stage:2, key:'tl_frist_kind' }, { stage:3, key:'tl_mietminderung' },
    { stage:4, key:'tl_anwalt' }, { stage:5, key:'tl_klage_mie' }
  ],
  ordnungsamt: ['ev_ord_foto', 'ev_ord_zeuge', 'ev_ord_notiz', 'ev_ord_korrespondenz', 'ev_ord_sonstiges'],
  datenschutz: ['ev_dsgvo_korrespondenz', 'ev_dsgvo_screenshot', 'ev_dsgvo_vertrag', 'ev_dsgvo_zeuge', 'ev_dsgvo_sonstiges'],
  gewerbe: ['ev_gew_foto', 'ev_gew_zeuge', 'ev_gew_vertrag', 'ev_gew_dokumente', 'ev_gew_sonstiges'],
  tier: ['ev_tier_foto', 'ev_tier_video', 'ev_tier_zeuge', 'ev_tier_tierarzt', 'ev_tier_sonstiges'],
  finanzamt: ['ev_fin_rechnung', 'ev_fin_kontoauszug', 'ev_fin_zeuge', 'ev_fin_korrespondenz', 'ev_fin_sonstiges']
};

/* === MODULE-SPECIFIC FORM FIELDS === */
const MODULE_FIELDS = {
  ueberlastung: `
    <div class="section-title" data-i18n="sectSender">1. Absender</div>
    <label data-i18n="p_ueberlastung_sender">Dein Name</label><input type="text" id="in-sender" data-bind="sender">
    <label data-i18n="p_ueberlastung_senderAddr">Privatanschrift</label><textarea id="in-sender-addr" rows="2" data-bind="senderAddr"></textarea>
    <label data-i18n="p_ueberlastung_personalnr">Personalnummer (optional)</label><input type="text" id="in-personalnr" data-bind="personalnr">

    <div class="section-title" data-i18n="sectReceiver">2. Empfänger</div>
    <label data-i18n="p_ueberlastung_receiver">An (z.B. Geschäftsführung, PDL)</label>
    <textarea id="in-receiver" rows="3" data-bind="receiver" placeholder="Klinikum Musterstadt GmbH&#10;Geschäftsführung / PDL&#10;Musterstraße 1&#10;12345 Musterstadt"></textarea>
    <div class="flex-row">
        <div><label data-i18n="lblDate">Ort & Datum</label><input type="text" id="in-date" data-bind="date"></div>
        <div><label data-i18n="p_ueberlastung_area">Betroffener Bereich</label><input type="text" id="in-area" data-bind="area" placeholder="z.B. Station 4B / Frühschicht"></div>
    </div>
    <label data-i18n="lblStufe">Eskalations-Stufe</label>
    <select id="in-stage" data-bind="stage">
        <option value="1" data-i18n="stage1">1 — Erstanzeige</option>
        <option value="2" data-i18n="stage2">2 — Erinnerung</option>
        <option value="3" data-i18n="stage3">3 — BR / GF</option>
        <option value="4" data-i18n="stage4">4 — Anhörung</option>
        <option value="5" data-i18n="stage5">5 — Externe</option>
    </select>
  `,
  kindeswohl: `
    <div class="section-title" data-i18n="sectSender">1. Hinweisgeber/in</div>
    <label data-i18n="p_kind_sender">Dein Name (Hinweisgeber/in)</label><input type="text" id="in-sender" data-bind="sender">
    <label data-i18n="p_kind_role">Deine Rolle</label>
    <select id="in-role_observer" data-bind="role_observer">
        <option value="">— Rolle wählen —</option>
        <option value="lehr">Lehrkraft</option><option value="erzieher">Erzieher/in</option>
        <option value="arzt">Ärztin/Arzt</option><option value="psychologe">Psychologe/in</option>
        <option value="sozialarbeiter">Sozialarbeiter/in</option><option value="nachbar">Nachbar/in</option>
        <option value="verwandt">Verwandte/r</option><option value="sonstige">Sonstige</option>
    </select>
    <label data-i18n="p_kind_senderAddr">Deine Anschrift</label><textarea id="in-sender-addr" rows="2" data-bind="senderAddr"></textarea>

    <div class="section-title">2. Kind</div>
    <div class="flex-row">
        <div><label data-i18n="p_kind_name">Name des Kindes</label><input type="text" id="in-kind_name" data-bind="kind_name"></div>
        <div><label data-i18n="p_kind_alter">Alter</label><input type="text" id="in-kind_alter" data-bind="kind_alter" placeholder="z.B. 7 Jahre"></div>
    </div>
    <label data-i18n="p_kind_sorge1">Sorgeberechtigte/r 1 (Mutter)</label><input type="text" id="in-sorge1" data-bind="sorge1">
    <label data-i18n="p_kind_sorge2">Sorgeberechtigte/r 2 (Vater)</label><input type="text" id="in-sorge2" data-bind="sorge2">
    <label data-i18n="p_kind_wohnort">Wohnort des Kindes</label><input type="text" id="in-kind_wohnort" data-bind="kind_wohnort">

    <div class="section-title">3. Empfänger</div>
    <label data-i18n="p_kind_empf_typ">Empfänger-Typ</label>
    <select id="in-empf_typ" data-bind="empf_typ">
        <option value="jugendamt">Jugendamt</option>
        <option value="familiengericht">Familiengericht</option>
        <option value="beratungsstelle">Beratungsstelle</option>
        <option value="polizei">Polizei (Notfall)</option>
        <option value="schule">Schule / Kita (interne Meldung)</option>
    </select>
    <label data-i18n="lblReceiver">Empfänger (Name + Anschrift)</label>
    <textarea id="in-receiver" rows="3" data-bind="receiver" placeholder="Jugendamt Musterstadt&#10;Fachbereich Kinderschutz&#10;Beispielweg 1&#10;12345 Musterstadt"></textarea>
    <div class="flex-row">
        <div><label data-i18n="lblDate">Ort & Datum</label><input type="text" id="in-date" data-bind="date"></div>
        <div><label data-i18n="p_kind_kategorie">Beobachtungs-Kategorie</label>
            <select id="in-kategorie" data-bind="kategorie">
                <option value="">— Kategorie —</option>
                <option value="vernachlaessigung">Vernachlässigung</option>
                <option value="koerperlich">Körperliche Gewalt</option>
                <option value="sexuell">Sexueller Missbrauch (Verdacht)</option>
                <option value="psychisch">Psychische Gewalt</option>
                <option value="sucht">Sucht der Eltern</option>
                <option value="haeuslich">Häusliche Gewalt</option>
                <option value="suizidal">Suizidalität</option>
                <option value="verwahrlosung">Verwahrlosung</option>
                <option value="online">Online-Grooming</option>
                <option value="sonstige">Sonstiges</option>
            </select>
        </div>
    </div>
    <label><input type="checkbox" id="in-anonymitaet" data-bind="anonymitaet"> <span data-i18n="p_kind_anonymitaet">Anonym bleiben / Schweigepflicht</span></label>
  `,
  strafanzeige: `
    <div class="section-title" data-i18n="sectSender">1. Anzeigeerstatter/in</div>
    <label data-i18n="lblSenderName">Dein Name</label><input type="text" id="in-sender" data-bind="sender">
    <label data-i18n="p_ueberlastung_senderAddr">Deine Anschrift</label><textarea id="in-sender-addr" rows="2" data-bind="senderAddr"></textarea>

    <div class="section-title">2. Empfänger</div>
    <label data-i18n="p_str_receiver">An (Polizei / Staatsanwaltschaft)</label>
    <textarea id="in-receiver" rows="3" data-bind="receiver" placeholder="Polizei Musterstadt&#10;Kriminaldauerdienst&#10;Beispielstr. 1&#10;12345 Musterstadt"></textarea>

    <div class="section-title">3. Sachverhalt</div>
    <div class="flex-row">
        <div><label data-i18n="p_str_straftat">Straftat</label>
            <select id="in-straftat" data-bind="straftat">
                <option value="">— Straftat —</option>
                <option value="diebstahl">Diebstahl (§ 242)</option>
                <option value="betrug">Betrug (§ 263)</option>
                <option value="onlinebetrug">Online-Betrug (§ 263a)</option>
                <option value="beleidigung">Beleidigung (§ 185)</option>
                <option value="bedrohung">Bedrohung (§ 241)</option>
                <option value="koerperverletzung">Körperverletzung (§ 223)</option>
                <option value="sachbeschaedigung">Sachbeschädigung (§ 303)</option>
                <option value="noetigung">Nötigung (§ 240)</option>
                <option value="stalking">Stalking (§ 238)</option>
                <option value="einbruch">Einbruch (§ 244)</option>
                <option value="identitaet">Identitätsdiebstahl (§ 269)</option>
                <option value="cybermobbing">Cybermobbing</option>
                <option value="unfallflucht">Unfallflucht (§ 142)</option>
                <option value="sonstige">Sonstige</option>
            </select>
        </div>
        <div><label data-i18n="lblDate">Ort & Datum</label><input type="text" id="in-date" data-bind="date"></div>
    </div>
    <div class="flex-row">
        <div><label data-i18n="p_str_tat_zeit">Tatzeit</label><input type="text" id="in-tat_zeit" data-bind="tat_zeit" placeholder="z.B. 06.08.2026, 14:30"></div>
        <div><label data-i18n="p_str_tat_ort">Tatort</label><input type="text" id="in-tat_ort" data-bind="tat_ort" placeholder="Adresse / Ort"></div>
    </div>
    <label data-i18n="p_str_taeter">Täter-Beschreibung</label><textarea id="in-taeter" rows="2" data-bind="taeter" placeholder="Größe, Statur, Kleidung, Besonderheiten"></textarea>
    <label data-i18n="p_str_zeugen">Zeugen</label><input type="text" id="in-zeugen" data-bind="zeugen" placeholder="Namen, Kontaktdaten">
    <label data-i18n="p_str_beweise">Beweismittel</label><textarea id="in-beweise" rows="2" data-bind="beweise" placeholder="Fotos, Videos, Dokumente, IP-Adressen..."></textarea>
    <label data-i18n="p_str_schaden">Schadenshöhe (€)</label><input type="number" id="in-schaden" data-bind="schaden" min="0" step="0.01" placeholder="0,00">
  `,
  mietmangel: `
    <div class="section-title" data-i18n="sectSender">1. Mieter/in</div>
    <label data-i18n="lblSenderName">Dein Name</label><input type="text" id="in-sender" data-bind="sender">
    <label data-i18n="p_ueberlastung_senderAddr">Deine Anschrift</label><textarea id="in-sender-addr" rows="2" data-bind="senderAddr"></textarea>

    <div class="section-title">2. Mietobjekt</div>
    <label data-i18n="p_mie_mietobjekt">Mietobjekt</label><input type="text" id="in-mietobjekt" data-bind="mietobjekt" placeholder="Straße, Nr., Etage, Wohnung">
    <div class="flex-row">
        <div><label data-i18n="p_mie_mietbeginn">Mietbeginn</label><input type="date" id="in-mietbeginn" data-bind="mietbeginn"></div>
        <div><label data-i18n="p_mie_mangel_seit">Mangel besteht seit</label><input type="date" id="in-mangel_seit" data-bind="mangel_seit"></div>
    </div>

    <div class="section-title">3. Vermieter</div>
    <label data-i18n="p_mie_vermieter_name">Vermieter / Hausverwaltung</label><input type="text" id="in-vermieter_name" data-bind="vermieter_name">
    <label data-i18n="p_mie_vermieter_adr">Anschrift Vermieter</label><textarea id="in-vermieter_adr" rows="2" data-bind="vermieter_adr" placeholder="Anschrift des Vermieters / der Hausverwaltung"></textarea>
    <label data-i18n="lblReceiver">Empfänger-Block (für Briefkopf)</label>
    <textarea id="in-receiver" rows="3" data-bind="receiver" placeholder="Wird automatisch ausgefüllt"></textarea>
    <div class="flex-row">
        <div><label data-i18n="lblDate">Ort & Datum</label><input type="text" id="in-date" data-bind="date"></div>
        <div><label data-i18n="p_mie_mangel_art">Mangel-Art</label>
            <select id="in-mangel_art" data-bind="mangel_art">
                <option value="">— Mangel —</option>
                <option value="schimmel">Schimmel</option>
                <option value="heizung">Heizungsausfall</option>
                <option value="wasser">Wasserschaden</option>
                <option value="laerm">Lärmbelästigung</option>
                <option value="nebenkosten">Nebenkostenabrechnung</option>
                <option value="kaution">Kautionsrückforderung</option>
                <option value="modernisierung">Modernisierung</option>
                <option value="ungeziefer">Ungeziefer</option>
                <option value="aufzug">Aufzug defekt</option>
                <option value="allgemein">Allgemeiner Mangel</option>
                <option value="sonstige">Sonstige</option>
            </select>
        </div>
    </div>
    <div class="flex-row">
        <div><label data-i18n="p_mie_mietminderung_pct">Mietminderung (%)</label><input type="number" id="in-mietminderung_pct" data-bind="mietminderung_pct" min="0" max="100" step="0.1" placeholder="z.B. 20"></div>
        <div><label data-i18n="p_mie_frist_maengel">Frist zur Mängelbehebung (Tage)</label><input type="number" id="in-frist_maengel" data-bind="frist_maengel" min="1" max="60" value="14"></div>
    </div>
  `,
  ordnungsamt: `
    <div class="section-title">1. Anzeigende Person</div>
    <label>Dein Name</label><input type="text" id="in-sender" data-bind="sender">
    <label>Deine Anschrift</label><textarea id="in-sender-addr" rows="2" data-bind="senderAddr"></textarea>
    <div class="section-title">2. Vorfall</div>
    <label>Fahrzeug / Objekt</label><input type="text" id="in-objekt" data-bind="objekt" placeholder="Kennzeichen, Marke, Farbe">
    <div class="flex-row">
        <div><label>Tatzeit</label><input type="text" id="in-tat_zeit" data-bind="tat_zeit" placeholder="Datum, Uhrzeit"></div>
        <div><label>Tatort</label><input type="text" id="in-tat_ort" data-bind="tat_ort" placeholder="Straße, Hausnr."></div>
    </div>
    <label>Verstoß-Art</label>
    <select id="in-verstoss" data-bind="verstoss">
        <option value="">— Verstoß wählen —</option>
        <option value="falschparker">Falschparker</option>
        <option value="muell">Illegale Müllentsorgung</option>
        <option value="laerm">Lärmbelästigung (öffentlich)</option>
        <option value="sonstige">Sonstiger Verstoß</option>
    </select>
    <div class="section-title">3. Empfänger</div>
    <label>Behörde</label><input type="text" id="in-receiver_name" data-bind="receiver_name" placeholder="Ordnungsamt Stadt XY">
    <label>Anschrift Behörde</label><textarea id="in-receiver_addr" rows="2" data-bind="receiver_addr"></textarea>
    <label data-i18n="lblReceiver">Empfänger-Block (für Briefkopf)</label>
    <textarea id="in-receiver" rows="3" data-bind="receiver" placeholder="Wird automatisch ausgefüllt"></textarea>
    <div class="flex-row">
        <div><label data-i18n="lblDate">Ort & Datum</label><input type="text" id="in-date" data-bind="date"></div>
    </div>
  `,
  datenschutz: `
    <div class="section-title">1. Betroffene Person</div>
    <label>Dein Name</label><input type="text" id="in-sender" data-bind="sender">
    <label>Deine Anschrift</label><textarea id="in-sender-addr" rows="2" data-bind="senderAddr"></textarea>
    <div class="section-title">2. Datenschutz-Anliegen</div>
    <label>Unternehmen / Verantwortlicher</label><input type="text" id="in-unternehmen" data-bind="unternehmen">
    <div class="flex-row">
        <div><label>Kunden- / Nutzer-ID</label><input type="text" id="in-kunden_id" data-bind="kunden_id"></div>
        <div><label>Fristsetzung (Tage)</label><input type="number" id="in-frist_tage" data-bind="frist_tage" value="30"></div>
    </div>
    <label>Anliegen</label>
    <select id="in-anliegen" data-bind="anliegen">
        <option value="auskunft">Datenauskunft (Art. 15)</option>
        <option value="loeschung">Datenlöschung (Art. 17)</option>
        <option value="berichtigung">Berichtigung (Art. 16)</option>
        <option value="widerspruch">Widerspruch (Art. 21)</option>
    </select>
    <div class="section-title">3. Empfänger</div>
    <label>Empfänger (Unternehmen oder LfDI)</label><textarea id="in-receiver_addr" rows="3" data-bind="receiver_addr"></textarea>
    <label data-i18n="lblReceiver">Empfänger-Block (für Briefkopf)</label>
    <textarea id="in-receiver" rows="3" data-bind="receiver" placeholder="Wird automatisch ausgefüllt"></textarea>
    <div class="flex-row">
        <div><label data-i18n="lblDate">Ort & Datum</label><input type="text" id="in-date" data-bind="date"></div>
    </div>
  `,
  gewerbe: `
    <div class="section-title">1. Hinweisgeber</div>
    <label>Dein Name</label><input type="text" id="in-sender" data-bind="sender">
    <label>Deine Anschrift</label><textarea id="in-sender-addr" rows="2" data-bind="senderAddr"></textarea>
    <div class="section-title">2. Vorfall / Verstoß</div>
    <label>Unternehmen</label><input type="text" id="in-unternehmen" data-bind="unternehmen">
    <label>Standort / Filiale</label><input type="text" id="in-standort" data-bind="standort">
    <label>Art des Verstoßes</label>
    <select id="in-verstoss_art" data-bind="verstoss_art">
        <option value="arbeitszeit">Arbeitszeitgesetz</option>
        <option value="arbeitsschutz">Arbeitsschutz / Sicherheit</option>
        <option value="hygiene">Hygienevorschriften</option>
        <option value="sonstige">Sonstiges</option>
    </select>
    <div class="section-title">3. Behörde</div>
    <label>Gewerbeaufsichtsamt</label><textarea id="in-receiver_addr" rows="3" data-bind="receiver_addr"></textarea>
    <label data-i18n="lblReceiver">Empfänger-Block (für Briefkopf)</label>
    <textarea id="in-receiver" rows="3" data-bind="receiver" placeholder="Wird automatisch ausgefüllt"></textarea>
    <div class="flex-row">
        <div><label data-i18n="lblDate">Ort & Datum</label><input type="text" id="in-date" data-bind="date"></div>
    </div>
  `,
  tier: `
    <div class="section-title">1. Hinweisgeber</div>
    <label>Dein Name</label><input type="text" id="in-sender" data-bind="sender">
    <label>Deine Anschrift</label><textarea id="in-sender-addr" rows="2" data-bind="senderAddr"></textarea>
    <div class="section-title">2. Vorfall / Tier</div>
    <label>Tierart</label><input type="text" id="in-tierart" data-bind="tierart" placeholder="z.B. Hund, Katze, Pferde">
    <label>Tierhalter (falls bekannt)</label><input type="text" id="in-tierhalter" data-bind="tierhalter">
    <label>Ort der Haltung</label><input type="text" id="in-haltungsort" data-bind="haltungsort">
    <label>Art der Gefährdung</label>
    <select id="in-gefaehrdung" data-bind="gefaehrdung">
        <option value="misshandlung">Misshandlung / Gewalt</option>
        <option value="vernachlaessigung">Vernachlässigung (Wasser/Futter)</option>
        <option value="platzmangel">Platzmangel / Anbindung</option>
        <option value="krankheit">Unbehandelte Krankheit</option>
    </select>
    <div class="section-title">3. Behörde</div>
    <label>Veterinäramt / Tierschutz</label><textarea id="in-receiver_addr" rows="3" data-bind="receiver_addr"></textarea>
    <label data-i18n="lblReceiver">Empfänger-Block (für Briefkopf)</label>
    <textarea id="in-receiver" rows="3" data-bind="receiver" placeholder="Wird automatisch ausgefüllt"></textarea>
    <div class="flex-row">
        <div><label data-i18n="lblDate">Ort & Datum</label><input type="text" id="in-date" data-bind="date"></div>
    </div>
  `,
  finanzamt: `
    <div class="section-title">1. Hinweisgeber</div>
    <label>Dein Name (kann anonym bleiben)</label><input type="text" id="in-sender" data-bind="sender">
    <label>Deine Anschrift</label><textarea id="in-sender-addr" rows="2" data-bind="senderAddr"></textarea>
    <div class="section-title">2. Sachverhalt</div>
    <label>Betroffene Person / Unternehmen</label><input type="text" id="in-unternehmen" data-bind="unternehmen">
    <label>Steuernummer (falls bekannt)</label><input type="text" id="in-steuernummer" data-bind="steuernummer">
    <label>Zeitraum der Zuwiderhandlung</label><input type="text" id="in-zeitraum" data-bind="zeitraum">
    <label>Verstoß</label>
    <select id="in-fin_verstoss" data-bind="fin_verstoss">
        <option value="schwarzarbeit">Schwarzarbeit</option>
        <option value="steuerhinterziehung">Steuerhinterziehung</option>
        <option value="kassenmanipulation">Kassenmanipulation</option>
        <option value="sonstige">Sonstiges</option>
    </select>
    <div class="section-title">3. Finanzamt / Zoll</div>
    <label>Zuständige Behörde</label><textarea id="in-receiver_addr" rows="3" data-bind="receiver_addr"></textarea>
    <label data-i18n="lblReceiver">Empfänger-Block (für Briefkopf)</label>
    <textarea id="in-receiver" rows="3" data-bind="receiver" placeholder="Wird automatisch ausgefüllt"></textarea>
    <div class="flex-row">
        <div><label data-i18n="lblDate">Ort & Datum</label><input type="text" id="in-date" data-bind="date"></div>
    </div>
  `
};

/* === RECIPIENT ROLES PER MODULE === */
const RECIPIENT_ROLES = {
  ueberlastung: ['vorgesetzter','pdl','gf','br','personal','sicherheit','arzt','sonstiges'],
  kindeswohl: ['schule','kita','nachbar','arzt','sonstiges'],
  strafanzeige: ['polizei','staatsanwalt','versicherung','zeuge','sonstiges'],
  mietmangel: ['vermieter','hausverwaltung','mieterverein','nachbar','sonstiges'],
  ordnungsamt: ['ordnungsamt', 'polizei', 'sonstiges'],
  datenschutz: ['datenschutzbeauftragter', 'lfdi', 'sonstiges'],
  gewerbe: ['gewerbeaufsicht', 'berufsgenossenschaft', 'sonstiges'],
  tier: ['veterinaeramt', 'tierschutzverein', 'polizei', 'sonstiges'],
  finanzamt: ['finanzamt', 'zoll', 'sonstiges']
};

/* === HELPER === */
function esc(s) {
  if (s == null) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/* === INIT === */
let state = null;

function init() {
  state = loadState();
  currentModule = state.meta.currentModule || 'ueberlastung';
  applyMode();
  buildModuleUI();
  restoreInputs();
  if (cur() && cur().inputs && !cur().inputs.date) {
    cur().inputs.date = `Musterstadt, den ${new Date().toLocaleDateString('de-DE')}`;
    if ($('#in-date')) $('#in-date').value = cur().inputs.date;
  }
  activeWeapons = new Set((cur() && cur().arsenal) || []);
  currentShipMethod = (cur() && cur().ship && cur().ship.method) || 'einschreiben';
  switchModuleUI(currentModule);
  applyI18n();
  applyShip();
  updatePreview();
  setTimeout(() => { updatePreview(); updateBodyCounter(); }, 50);
}

function buildModuleUI() {
  let html = MODULE_FIELDS[currentModule] || '';

  $('#moduleFields').innerHTML = html;
  bindInputs();
}

function bindInputs() {
  // Bug-Fix #14: Module bei Attach-Zeit capturen, damit change-Event auf entferntem Element
  // nicht in falsches Modul schreibt (wenn buildModuleUI innerHTML = ... setzt)
  const moduleAtAttach = currentModule;
  $$('[data-bind]').forEach(el => {
    const key = el.dataset.bind;
    el.addEventListener('input', () => {
      // Nur schreiben wenn Element noch aktiv + im richtigen Modul
      if (currentModule !== moduleAtAttach) return;
      if (!document.body.contains(el)) return;
      if (cur() && cur().inputs) cur().inputs[key] = el.type === 'checkbox' ? el.checked : el.value;
      saveState();
      updatePreview();
      updateBodyCounter();
    });
    el.addEventListener('change', () => {
      // change-Event feuert auch beim Entfernen des Elements (innerHTML-Replace)
      // → nur schreiben wenn Element noch aktiv + im richtigen Modul
      if (currentModule !== moduleAtAttach) return;
      if (!document.body.contains(el)) return;
      if (cur() && cur().inputs) cur().inputs[key] = el.type === 'checkbox' ? el.checked : el.value;
      saveState();
      updatePreview();
    });
  });
  // Bug-Fix #6: Listener für globale Felder, die NICHT data-bind haben
  // (Eskalation-Tab, Versand-Tab, globale Brief-Felder)
  const globalInputs = [
    {id:'in-subject', set: (v) => { if (cur() && cur().inputs) cur().inputs.subject = v; }},
    {id:'in-body', set: (v) => { if (cur() && cur().inputs) cur().inputs.body = v; }},
    {id:'in-frist', set: (v) => { if (cur() && cur().inputs) cur().inputs.frist = parseInt(v) || 5; }},
    {id:'in-reaction', set: (v) => { if (cur() && cur().inputs) cur().inputs.reaction = v; }},
    {id:'in-tracking', set: (v) => { if (cur() && cur().ship) cur().ship.tracking = v; }},
    {id:'in-ship-date', set: (v) => { if (cur() && cur().ship) cur().ship.date = v; }},
    {id:'in-ship-note', set: (v) => { if (cur() && cur().ship) cur().ship.note = v; }},
    {id:'in-anonymize', set: (v) => { if (cur()) cur().anonymize = !!v; }}
  ];
  globalInputs.forEach(({id, set}) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        if (currentModule !== moduleAtAttach) return;
        if (!document.body.contains(el)) return;
        set(el.type === 'checkbox' ? el.checked : el.value);
        saveState();
        updatePreview();
        updateBodyCounter();
      });
    }
  });
}

function restoreInputs() {
  // Bug-Fix #37: Defensive checks für corrupted/partial localStorage
  if (!cur() || !cur().inputs) {
    console.warn('[restoreInputs] No data for module', currentModule, '— using defaults');
    return;
  }
  $$('[data-bind]').forEach(el => {
    const key = el.dataset.bind;
    const val = cur().inputs[key];
    if (el.type === 'checkbox') el.checked = !!val;
    else if (val != null) el.value = val;
  });
  $('#in-subject').value = cur().inputs.subject || '';
  $('#in-body').value = cur().inputs.body || '';
  $('#in-frist').value = cur().inputs.frist || 5;
  $('#in-reaction').value = cur().inputs.reaction || 'offen';
  $('#in-tracking').value = (cur().ship && cur().ship.tracking) || '';
  $('#in-ship-date').value = (cur().ship && cur().ship.date) || '';
  $('#in-ship-note').value = (cur().ship && cur().ship.note) || '';
  $('#in-anonymize').checked = cur().anonymize || false;
  activeWeapons = new Set((cur().arsenal || []));
}

/* === MODULE SWITCH === */
function switchModule(mod) {
  // X10-Redteam: Defensive — nur gültige Module akzeptieren
  if (!MODULES || !MODULES.includes(mod)) {
    console.warn('[switchModule] invalid module:', mod);
    return;
  }
  // Bug-Fix #37: Defensive save (might fail if cur() is undefined on partial state)
  try { if (cur() && cur().arsenal) cur().arsenal = Array.from(activeWeapons); } catch(e) {}
  try { saveState(); } catch(e) {}
  // Switch
  currentModule = mod;
  state.meta.currentModule = mod;
  try { saveState(); } catch(e) {}
  // Update UI — alle in try/catch wrappern, damit 1 crash nicht alles blockiert
  try { switchModuleUI(mod); } catch(e) { console.error('[switchModule] switchModuleUI failed', e); }
  try { buildModuleUI(); } catch(e) { console.error('[switchModule] buildModuleUI failed', e); }
  try { restoreInputs(); } catch(e) { console.error('[switchModule] restoreInputs failed', e); }
  try { applyI18n(); } catch(e) { console.error('[switchModule] applyI18n failed', e); }
  try { applyShip(); } catch(e) { console.error('[switchModule] applyShip failed', e); }
  try { updatePreview(); } catch(e) { console.error('[switchModule] updatePreview failed', e); }
}

function switchModuleUI(mod) {
  document.body.classList.remove('ueberlastung-active', 'kindeswohl-active', 'strafanzeige-active', 'mietmangel-active', 'ordnungsamt-active', 'datenschutz-active', 'gewerbe-active', 'tier-active', 'finanzamt-active');
  document.body.classList.add(mod + '-active');
  $$('.module-chip').forEach(c => c.classList.toggle('active', c.dataset.mod === mod));
  // Update module title
  const iconMap = { ueberlastung: '🚨', kindeswohl: '🛡️', strafanzeige: '🚔', mietmangel: '🏠', ordnungsamt: '📸', datenschutz: '🛡️', gewerbe: '👷', tier: '🐶', finanzamt: '💸' };
  $('#moduleTitleIcon').textContent = iconMap[mod];
  // Update active class
  document.querySelector('.sidebar-header h2 .accent')?.classList.remove('accent','kind','str','mie');
  const titleSpan = $('#moduleTitleText');
  titleSpan.classList.remove('accent','kind','str','mie');
  const clsMap = { ueberlastung: 'accent', kindeswohl: 'kind', strafanzeige: 'str', mietmangel: 'mie' };
  const cls = clsMap[mod];
  if (cls) titleSpan.classList.add(cls);
  // Update module stamp class
  const stamp = $('#moduleStamp');
  stamp.classList.remove('ueberlastung','kindeswohl','strafanzeige','mietmangel');
  stamp.classList.add(mod);
  // Update alert
  const alertMap = {
    ueberlastung: 'alertUeberlastung', kindeswohl: 'alertKindeswohl',
    strafanzeige: 'alertStrafanzeige', mietmangel: 'alertMietmangel'
  };
  $('#briefAlert').dataset.i18n = alertMap[mod] || '';

  if (currentModule === 'mietmangel') {
    $('#moduleTitleIcon').innerText = '🏠';
    $('#moduleTitleText').innerText = 'Mietmangel';
    const subEl = document.querySelector('[data-i18n="sidebarSubtitle"]') || document.querySelector('.sidebar-header h2 small');
    if (subEl) subEl.innerText = 'Mängelanzeige & Minderung';
  } else if (currentModule === 'ordnungsamt') {
    $('#moduleTitleIcon').innerText = '📸';
    $('#moduleTitleText').innerText = 'Ordnungsamt';
    const subEl = document.querySelector('[data-i18n="sidebarSubtitle"]') || document.querySelector('.sidebar-header h2 small');
    if (subEl) subEl.innerText = 'Anzeige Ordnungswidrigkeit';
  } else if (currentModule === 'datenschutz') {
    $('#moduleTitleIcon').innerText = '🛡️';
    $('#moduleTitleText').innerText = 'DSGVO-Beschwerde';
    const subEl = document.querySelector('[data-i18n="sidebarSubtitle"]') || document.querySelector('.sidebar-header h2 small');
    if (subEl) subEl.innerText = 'Meldung an Landesbeauftragten';
  } else if (currentModule === 'gewerbe') {
    $('#moduleTitleIcon').innerText = '👷';
    $('#moduleTitleText').innerText = 'Gewerbeaufsicht';
    const subEl = document.querySelector('[data-i18n="sidebarSubtitle"]') || document.querySelector('.sidebar-header h2 small');
    if (subEl) subEl.innerText = 'Meldung Arbeitsschutz';
  } else if (currentModule === 'tier') {
    $('#moduleTitleIcon').innerText = '🐶';
    $('#moduleTitleText').innerText = 'Veterinäramt';
    const subEl = document.querySelector('[data-i18n="sidebarSubtitle"]') || document.querySelector('.sidebar-header h2 small');
    if (subEl) subEl.innerText = 'Meldung Tierquälerei';
  } else if (currentModule === 'finanzamt') {
    $('#moduleTitleIcon').innerText = '💸';
    $('#moduleTitleText').innerText = 'Finanzamt-Tipp';
    const subEl = document.querySelector('[data-i18n="sidebarSubtitle"]') || document.querySelector('.sidebar-header h2 small');
    if (subEl) subEl.innerText = 'Meldung Steuervergehen';
  }
}

/* === I18N === */
function applyI18n() {
  document.documentElement.lang = state.meta.language;
  $('#langToggle').textContent = state.meta.language.toUpperCase();
  $$('[data-i18n]').forEach(el => {
    const val = t(el.dataset.i18n);
    if (val) el.innerHTML = val;
  });
  $$('[data-i18n-ph]').forEach(el => {
    const val = t(el.dataset.i18nPh);
    if (val) el.placeholder = val;
  });
  // Module title
  const titleMap = { ueberlastung:'modUeberlastung', kindeswohl:'modKindeswohl', strafanzeige:'modStrafanzeige', mietmangel:'modMietmangel' };
  $('#moduleTitleText').textContent = t(titleMap[currentModule] || currentModule);
  const subtMap = { ueberlastung:'Gefährdungsanzeige', kindeswohl:'Kinderschutz-Meldung', strafanzeige:'Strafanzeige', mietmangel:'Mietmangel' };
  const subtEn = { ueberlastung:'Hazard notice', kindeswohl:'Child protection', strafanzeige:'Criminal report', mietmangel:'Tenancy defect' };
  const subEl = document.querySelector('.sidebar-header h2 small');
  if (subEl) subEl.textContent = state.meta.language === 'de' ? `· ${subtMap[currentModule] || ''}` : `· ${subtEn[currentModule] || ''}`;
  // Module chips
  $$('.module-chip').forEach(c => {
    const k = c.dataset.mod;
    const map = { ueberlastung:'modUeberlastung', kindeswohl:'modKindeswohl', strafanzeige:'modStrafanzeige', mietmangel:'modMietmangel' };
    c.lastChild.textContent = t(map[k] || k);
  });
  // Module stamp — Bug-Fix #7: zweisprachig
  const stampText = state.meta.language === 'de'
    ? { ueberlastung:'ÜBERLASTUNG', kindeswohl:'KINDESWOHL', strafanzeige:'STRAFANZEIGE', mietmangel:'MIETMANGEL' }
    : { ueberlastung:'OVERLOAD', kindeswohl:'CHILD WELFARE', strafanzeige:'CRIMINAL REPORT', mietmangel:'TENANCY DEFECT' };
  $('#moduleStamp').textContent = stampText[currentModule] || currentModule.toUpperCase();
  // Rebuild dynamic content
  renderTemplateSelect();
  renderArsenal();
  renderIncidents();
  renderRecipients();
  renderEvidence();
  renderTimeline();
  renderShipping();
  updatePreview();
}

function applyMode() {
  document.body.dataset.mode = state.meta.mode;
  document.body.dataset.theme = state.meta.mode;
  $$('.theme-dot').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.setTheme === state.meta.mode);
  });
}

/* === TEMPLATE SELECT === */
function renderTemplateSelect() {
  const sel = $('#template-select');
  sel.innerHTML = '';
  const opt0 = document.createElement('option');
  opt0.value = '';
  opt0.dataset.i18n = 'customOpt';
  opt0.textContent = '— ' + t('customOpt') + ' —';
  sel.appendChild(opt0);
  Object.entries(TEMPLATES[currentModule] || {}).forEach(([key, tpl]) => {
    const opt = document.createElement('option');
    opt.value = key;
    // Bug-Fix: tpl hat kein de/en-Key, sondern nur icon+body. Label via t(key).
    opt.textContent = `${tpl.icon} ${t(key)}`;
    sel.appendChild(opt);
  });
}

/* === ARSENAL === */
function renderArsenal() {
  const cont = $('#arsenalContainer');
  cont.innerHTML = '';
  const groups = {};
  (ARSENAL[currentModule] || []).forEach(item => {
    if (!groups[item.cat]) groups[item.cat] = [];
    groups[item.cat].push(item);
  });
  Object.entries(groups).forEach(([cat, items]) => {
    const catTitle = document.createElement('div');
    catTitle.className = 'arsenal-category';
    catTitle.textContent = t(cat);
    cont.appendChild(catTitle);
    const grid = document.createElement('div');
    grid.className = 'arsenal-grid';
    items.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'arsenal-btn' + (activeWeapons.has(item.key) ? ' active' : '');
      btn.dataset.weapon = item.key;
      btn.onclick = () => toggleWeapon(btn, item);
      btn.innerHTML = `<div class="title">${item.icon} ${esc(item.title[state.meta.language] || item.title.de)}</div><div class="preview">"${esc(item.preview[state.meta.language] || item.preview.de)}"</div>`;
      grid.appendChild(btn);
    });
    cont.appendChild(grid);
  });
}

function toggleWeapon(btn, item) {
  const bodyEl = $('#in-body');
  let text = bodyEl.value;
  const weaponText = '\n\n' + item.text;
  if (activeWeapons.has(item.key)) {
    // Bug-Fix #8: nur entfernen wenn Text am Ende steht (sonst Inkonsistenz)
    if (text.endsWith(weaponText)) {
      text = text.slice(0, -weaponText.length);
    } else if (text.includes(weaponText)) {
      // Es gibt Arsenal-Text, aber nicht am Ende — Warnung an User
      toast('⚠️ Arsenal-Text manuell im Brief eingefügt — bitte selbst entfernen', 'warn');
    }
    activeWeapons.delete(item.key);
    btn.classList.remove('active');
  } else {
    activeWeapons.add(item.key);
    text += weaponText;
    btn.classList.add('active');
  }
  bodyEl.value = text;
  bodyEl.scrollTop = bodyEl.scrollHeight;
  cur().inputs.body = text;
  cur().arsenal = Array.from(activeWeapons);
  saveState();
  updatePreview();
  updateBodyCounter();
}

/* === TEMPLATES === */
function loadTemplate() {
  if (!cur() || !cur().inputs) return;
  const key = $('#template-select').value;
  const bodyEl = $('#in-body');
  if (!key) {
    cur().inputs.body = '';
    bodyEl.value = '';
  } else {
    const tpl = TEMPLATES[currentModule] && TEMPLATES[currentModule][key];
    if (!tpl) return;
    let body = tpl.body;
    activeWeapons.forEach(wk => {
      const w = (ARSENAL[currentModule] || []).find(a => a.key === wk);
      if (w) body += '\n\n' + w.text;
    });
    cur().inputs.body = body;
    bodyEl.value = body;
  }
  saveState();
  updatePreview();
  updateBodyCounter();
}

/* === INCIDENTS === */
function addIncident() {
  if (!state.shared) state.shared = { incidents: [], recipients: [], evidence: {} };
  const date = $('#new-incident-date').value;
  const time = $('#new-incident-time').value;
  const cat = $('#new-incident-category').value;
  const desc = $('#new-incident-desc').value.trim();
  const witness = $('#new-incident-witness').value.trim();
  if (!date || !desc) { toast('⚠️ Datum und Beschreibung erforderlich', 'warn'); return; }
  state.shared.incidents.push({ id:'inc_'+Date.now()+'_'+Math.random().toString(36).slice(2,8), date, time, category:cat, desc, witness, createdAt:Date.now(), module: currentModule });
  $('#new-incident-date').value = ''; $('#new-incident-time').value = '';
  $('#new-incident-desc').value = ''; $('#new-incident-witness').value = '';
  saveState(); renderIncidents();
  toast('✅ Vorfall dokumentiert', 'success');
}

// Modul-spezifische Incident-Kategorien (hardcoded — Bug-Fix #1)
const INCIDENT_KEYS = {
  ueberlastung: ['cat_inc_ueb_unterbesetzung','cat_inc_ueb_zwischenfall','cat_inc_ueb_behandlungsfehler','cat_inc_ueb_arbeitszeit','cat_inc_ueb_pausen','cat_inc_ueb_anweisung','cat_inc_ueb_schulung','cat_inc_ueb_material','cat_inc_ueb_sonstiges'],
  kindeswohl: ['cat_inc_kind_vernachlaessigung','cat_inc_kind_koerperlich','cat_inc_kind_sexuell','cat_inc_kind_psychisch','cat_inc_kind_sucht','cat_inc_kind_haeuslich','cat_inc_kind_suizidal','cat_inc_kind_verwahrlosung','cat_inc_kind_online','cat_inc_kind_schule','cat_inc_kind_sonstiges'],
  strafanzeige: ['cat_inc_str_diebstahl','cat_inc_str_betrug','cat_inc_str_beleidigung','cat_inc_str_bedrohung','cat_inc_str_koerperverletzung','cat_inc_str_sachbeschaedigung','cat_inc_str_verleumdung','cat_inc_str_noetigung','cat_inc_str_stalking','cat_inc_str_einbruch','cat_inc_str_online_betrug','cat_inc_str_identitaet','cat_inc_str_cybermobbing','cat_inc_str_sonstiges'],
  mietmangel: ['cat_inc_mie_schimmel','cat_inc_mie_heizung','cat_inc_mie_wasser','cat_inc_mie_laerm','cat_inc_mie_nebenkosten','cat_inc_mie_kaution','cat_inc_mie_modernisierung','cat_inc_mie_ungeziefer','cat_inc_mie_aufzug','cat_inc_mie_sonstiges']
};

function renderIncidents() {
  // Build category options — Bug-Fix #1: hardcoded named keys statt Nummern-Loop
  const catSel = $('#new-incident-category');
  if (catSel) {
    catSel.innerHTML = '';
    const keys = INCIDENT_KEYS[currentModule] || [];
    keys.forEach(key => {
      const val = (I18N[state.meta.language] || I18N.de)[key];
      if (val) {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = val;
        catSel.appendChild(opt);
      }
    });
  }
  const list = $('#incidentList');
  const count = $('#incidentCount');
  if (count) count.textContent = `(${state.shared.incidents.length})`;
  if (!list) return;
  if (state.shared.incidents.length === 0) {
    list.innerHTML = `<div class="empty-state">Noch keine Vorfälle dokumentiert.</div>`;
    return;
  }
  list.innerHTML = '';
  state.shared.incidents.slice().reverse().forEach(inc => {
    const item = document.createElement('div');
    item.className = 'incident-item';
    // Bug-Fix #22: Kategorie übersetzt anzeigen
    const catLabel = (I18N[state.meta.language] || I18N.de)[inc.category] || inc.category;
    item.innerHTML = `<div class="head"><div><span class="date">${esc(inc.date)} ${inc.time?esc(inc.time):''} · ${esc(catLabel)}</span></div><div class="actions"><button class="btn-icon" data-del-inc="${esc(inc.id)}">🗑</button></div></div><div class="desc">${esc(inc.desc)}</div>${inc.witness?`<div style="font-size:0.65rem;color:var(--text-muted);margin-top:3px">👥 ${esc(inc.witness)}</div>`:''}`;
    // Bug-Fix #2: addEventListener statt inline onclick (XSS-Schutz)
    item.querySelector('[data-del-inc]').addEventListener('click', () => deleteIncident(inc.id));
    list.appendChild(item);
  });
}

function deleteIncident(id) {
  state.shared.incidents = state.shared.incidents.filter(x => x.id !== id);
  saveState(); renderIncidents();
}

function clearIncidents() {
  if (!confirm('Alle Vorfälle löschen?')) return;
  state.shared.incidents = [];
  saveState(); renderIncidents();
}

function incidentsToBody() {
  if (state.shared.incidents.length === 0) { toast('⚠️ Keine Vorfälle', 'warn'); return; }
  const date = new Date().toLocaleDateString(state.meta.language==='de'?'de-DE':'en-GB');
  // Bug-Fix #22: Header zweisprachig
  const header = state.meta.language === 'de' ? `— Chronologie (Stand ${date}) —` : `— Chronology (as of ${date}) —`;
  let block = `\n\n${header}\n\n`;
  state.shared.incidents.forEach((inc, i) => {
    const catLabel = (I18N[state.meta.language] || I18N.de)[inc.category] || inc.category;
    const witnessLabel = state.meta.language === 'de' ? 'Zeugen' : 'Witnesses';
    block += `${i+1}. ${inc.date}${inc.time?' um '+inc.time:''} [${catLabel}]\n${inc.desc}${inc.witness?'\n'+witnessLabel+': '+inc.witness:''}\n\n`;
  });
  $('#in-body').value += block;
  cur().inputs.body = $('#in-body').value;
  saveState(); updatePreview();
  toast('✅ Vorfälle übernommen', 'success');
}

/* === RECIPIENTS === */
function addRecipient() {
  if (!state.shared) state.shared = { incidents: [], recipients: [], evidence: {} };
  const name = $('#new-r-name').value.trim();
  const role = $('#new-r-role').value;
  const addr = $('#new-r-addr').value.trim();
  if (!name) { toast('⚠️ Name erforderlich', 'warn'); return; }
  // Bug-Fix #2: unique ID verhindert Kollisionen und XSS
  state.shared.recipients.push({ id:'r_'+Date.now()+'_'+Math.random().toString(36).slice(2,8), name, role, addr, isPrimary: state.shared.recipients.length===0, module: currentModule });
  $('#new-r-name').value = ''; $('#new-r-addr').value = '';
  saveState(); renderRecipients();
  toast('✅ Empfänger hinzugefügt', 'success');
}

function renderRecipients() {
  const roleSel = $('#new-r-role');
  if (roleSel) {
    roleSel.innerHTML = '';
    // Bug-Fix #3: korrekte Modul-Prefixes (kindeswohl → 'kind', nicht 'kin')
    const rolePrefix = { ueberlastung: 'ueb', kindeswohl: 'kind', strafanzeige: 'str', mietmangel: 'mie' };
    const prefix = rolePrefix[currentModule] || 'all';
    RECIPIENT_ROLES[currentModule].forEach(role => {
      const opt = document.createElement('option');
      opt.value = role;
      // Lookup: erst modulspezifisch, dann generisch, dann roher Role-Name
      const label = t(`role_${prefix}_${role}`) || t(`role_ueb_${role}`) || role;
      opt.textContent = label;
      roleSel.appendChild(opt);
    });
  }
  const list = $('#recipientList');
  if (!list) return;
  const recipients = state.shared.recipients.filter(r => !r.module || r.module === currentModule);
  if (recipients.length === 0) {
    list.innerHTML = `<div class="empty-state">Noch keine Empfänger erfasst.</div>`;
    return;
  }
  list.innerHTML = '';
  recipients.forEach(r => {
    const card = document.createElement('div');
    card.className = 'recipient-card';
    // Bug-Fix #2: addEventListener statt inline onclick (XSS-Schutz)
    card.innerHTML = `<div class="head"><div><div class="name">${esc(r.name)} ${r.isPrimary?'<span class="primary">★ PRIMARY</span>':''}</div><div class="role">${esc(r.role)}</div></div><div style="display:flex;gap:4px">${!r.isPrimary?`<button class="btn-icon" data-set-primary="${esc(r.id)}">★</button>`:''}<button class="btn-icon" data-del-r="${esc(r.id)}">🗑</button></div></div><div class="addr">${esc(r.addr||'—')}</div>`;
    const setBtn = card.querySelector('[data-set-primary]');
    if (setBtn) setBtn.addEventListener('click', () => setPrimary(r.id));
    const delBtn = card.querySelector('[data-del-r]');
    if (delBtn) delBtn.addEventListener('click', () => deleteRecipient(r.id));
    list.appendChild(card);
  });
}

function setPrimary(id) {
  state.shared.recipients.forEach(r => r.isPrimary = (r.id === id));
  saveState(); renderRecipients(); updatePreview();
}

function deleteRecipient(id) {
  state.shared.recipients = state.shared.recipients.filter(r => r.id !== id);
  if (state.shared.recipients.length > 0 && !state.shared.recipients.some(r => r.isPrimary)) state.shared.recipients[0].isPrimary = true;
  saveState(); renderRecipients(); updatePreview();
}

/* === EVIDENCE === */
function renderEvidence() {
  const list = $('#evidenceList');
  if (!list) return;
  list.innerHTML = '';
  const evidenceList = EVIDENCE[currentModule] || [];
  evidenceList.forEach(key => {
    const deText = I18N.de[key];
    const enText = I18N.en[key];
    if (!deText) return;
    const checked = state.shared.evidence[key] || false;
    const div = document.createElement('label');
    div.className = 'evidence-item' + (checked ? ' done' : '');
    div.innerHTML = `<input type="checkbox" ${checked?'checked':''} onchange="toggleEvidence('${key}', this.checked)"><span class="label">${esc(state.meta.language==='de'?deText:enText)}</span>`;
    list.appendChild(div);
  });
}

function toggleEvidence(key, val) {
  state.shared.evidence[key] = val;
  saveState(); renderEvidence();
}

/* === TIMELINE === */
function renderTimeline() {
  const cont = $('#timelineContainer');
  if (!cont) return;
  cont.innerHTML = '';
  // Bug-Fix #4: Defensive + korrekte Stage-Berechnung
  if (!cur() || !cur().inputs) return;
  const hasStageField = !!document.getElementById('in-stage');
  const currentStage = hasStageField ? parseInt(cur().inputs.stage || 1) : 0;
  (TIMELINE[currentModule] || []).forEach(ev => {
    const div = document.createElement('div');
    div.className = 'timeline-event' + (ev.stage <= currentStage ? ' done' : '');
    div.innerHTML = `<div class="title">${esc(t(ev.key))}</div><div class="meta">Stufe ${ev.stage}</div>`;
    cont.appendChild(div);
  });
  updateFristBerechnung();
}

function updateFristBerechnung() {
  const days = parseInt($('#in-frist')?.value || ((cur() && cur().inputs && cur().inputs.frist) || 5));
  const shipDate = (cur() && cur().ship && cur().ship.date) ? new Date(cur().ship.date) : new Date();
  let d = new Date(shipDate);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd !== 0 && wd !== 6) added++;
  }
  const dueDate = d.toLocaleDateString(state.meta.language==='de'?'de-DE':'en-GB');
  const fb = $('#fristBerechnung');
  if (fb) fb.innerHTML = t('fristTemplate')(days, dueDate);
}

/* === SHIPPING === */
function renderShipping() {
  $$('.ship-card').forEach(c => c.classList.toggle('active', c.dataset.ship === currentShipMethod));
}

function setShip(btn) {
  currentShipMethod = btn.dataset.ship;
  cur().ship.method = currentShipMethod;
  saveState(); renderShipping(); updatePreview();
}

function applyShip() {
  if (cur() && cur().ship && cur().ship.method) currentShipMethod = cur().ship.method;
  renderShipping();
}

/* === PREVIEW === */
function updatePreview() {
  // Bug-Fix #37: Defensive check für corrupted/partial state
  if (!cur() || !cur().inputs) return;
  // Update all bound fields
  $$('[data-bind]').forEach(el => {
    const key = el.dataset.bind;
    if (el.type === 'checkbox') cur().inputs[key] = el.checked;
    else if (el.value !== undefined) cur().inputs[key] = el.value;
  });
  cur().inputs.subject = $('#in-subject').value;
  cur().inputs.body = $('#in-body').value;
  cur().inputs.frist = parseInt($('#in-frist').value || 5);
  cur().inputs.reaction = $('#in-reaction').value;
  if (cur().ship) {
    cur().ship.tracking = $('#in-tracking').value;
    cur().ship.date = $('#in-ship-date').value;
    cur().ship.note = $('#in-ship-note').value;
  }
  cur().anonymize = $('#in-anonymize').checked;

  // Render
  const sender = cur().anonymize ? anonymize(cur().inputs.sender) : (cur().inputs.sender || '—');
  const senderAddr = cur().anonymize ? anonymize(cur().inputs.senderAddr) : cur().inputs.senderAddr;

  $('#out-sender-name').textContent = sender;

  // Build sender address + extras based on module
  let extras = '';
  if (currentModule === 'ueberlastung') {
    if (cur().inputs.personalnr) extras = `Pers-Nr.: ${cur().inputs.personalnr}`;
  } else if (currentModule === 'kindeswohl') {
    if (cur().inputs.role_observer) extras = `Rolle: ${cur().inputs.role_observer}`;
  } else if (currentModule === 'strafanzeige') {
    if (cur().inputs.straftat) extras = `Straftat: ${cur().inputs.straftat}`;
  } else if (currentModule === 'mietmangel') {
    if (cur().inputs.mietobjekt) extras = `Mietobjekt: ${cur().inputs.mietobjekt}`;
  }
  $('#out-sender-addr').innerHTML = senderAddr ? esc(senderAddr).replace(/\n/g,'<br>') : '—';
  $('#out-sender-extras').textContent = extras;

  // Receiver
  let receiver = cur().inputs.receiver;
  const primary = state.shared.recipients.find(r => r.isPrimary && (!r.module || r.module === currentModule));
  if (primary && primary.addr && !receiver) receiver = `${primary.name}\n${primary.addr}`;
  // Bug-Fix #13: Mietmangel — Receiver auto-fillen aus Vermieter-Daten
  if (currentModule === 'mietmangel' && !receiver) {
    if (cur().inputs.vermieter_name || cur().inputs.vermieter_adr) {
      receiver = [cur().inputs.vermieter_name, cur().inputs.vermieter_adr].filter(Boolean).join('\n');
    }
  }
  if (cur().anonymize) receiver = anonymize(receiver);
  $('#out-receiver').innerHTML = receiver ? esc(receiver).replace(/\n/g,'<br>') : '—';

  $('#out-date').textContent = cur().inputs.date || '—';
  $('#out-subject').textContent = cur().inputs.subject || '—';

  let body = cur().inputs.body || '';
  if (cur().anonymize) body = anonymize(body);
  $('#out-body').textContent = body;
  $('#out-sender-sign').textContent = sender;

  // Module stamp — Bug-Fix #4: nur zeigen wenn es ein echtes Stage-Feld gibt
  // (Mietmangel hat frist_maengel — das ist eine Frist, keine Stage → Stamp ausblenden)
  const hasStageField = !!document.getElementById('in-stage');
  const stage = hasStageField ? parseInt(cur().inputs.stage || 1) : 0;
  if (hasStageField && stage > 1) {
    $('#moduleStamp').style.display = 'block';
    $('#moduleStamp').textContent = $('#moduleStamp').textContent; // Keep label
  } else {
    $('#moduleStamp').style.display = 'none';
  }

  // Meta — Bug-Fix #7: Sende-Methode zweisprachig
  const metaParts = [];
  const sendLabel = state.meta.language === 'de' ? 'Sendung' : 'Shipment';
  const shipLabel = state.meta.language === 'de' ? 'Versand' : 'Shipping';
  if (cur().ship.tracking) metaParts.push(`${sendLabel}: ${cur().ship.tracking}`);
  if (cur().ship.date) metaParts.push(`${shipLabel}: ${new Date(cur().ship.date).toLocaleDateString(state.meta.language==='de'?'de-DE':'en-GB')}`);
  if (cur().ship.method) {
    const mText = state.meta.language === 'de'
      ? { einschreiben:'Einschreiben', persoenlich:'Persönlich', email:'E-Mail', fax:'Fax' }[cur().ship.method]
      : { einschreiben:'Registered mail', persoenlich:'In person', email:'Email', fax:'Fax' }[cur().ship.method];
    if (mText) metaParts.push(`${shipLabel}: ${mText}`);
  }
  if (metaParts.length) {
    $('#out-meta').style.display = 'block';
    $('#out-meta').textContent = metaParts.join(' · ');
  } else {
    $('#out-meta').style.display = 'none';
  }

  saveState();
  updateFristBerechnung();
  updateBodyCounter();
}

function updateBodyCounter() {
  const len = ($('#in-body').value || '').length;
  const c = $('#bodyCounter');
  if (c) c.textContent = `${len} / 5000`;
}

function anonymize(s) {
  if (!s) return s;
  return s
    // Vor- und Nachname (mind. 2 lowercase Buchstaben pro Wort, mind. 2 Wörter)
    // Akronym-Blocklist: § + Buchstabe/Ziffer (StGB, BGB, SGB, DGUV, etc.) nicht antasten
    .replace(/§\s*[A-ZÄÖÜ]{2,}[^a-zäöüß,;.\n]*/g, m => m)  // Paragraph + Akronym beibehalten
    .replace(/(\b[A-ZÄÖÜ][a-zäöüß]{2,})\s+([A-ZÄÖÜ][a-zäöüß]{2,})\b/g, (m, p1, p2) => {
      // Heuristik: Wenn beide Wörter typische Vor-/Nachnamen sind (nicht StGB/BGB/SGB § + Nummer)
      if (p1.match(/^(Herr|Frau|Dr|Prof|Mag|The|Dr\.|Prof\.|Mag\.|Sehr|Liebe)/)) return m;
      // Wenn davor "§" steht, nicht anonymisieren
      return p1[0] + '. ' + p2[0] + '.';
    })
    // PLZ (5 Ziffern) ersetzen
    .replace(/\b\d{5}\b/g, '[PLZ]')
    // Aktenzeichen, Versicherungsnummern (10-12 Ziffern)
    .replace(/\b\d{10,12}\b/g, '[NR]')
    // E-Mails
    .replace(/[\w.-]+@[\w.-]+\.\w+/g, '[EMAIL]')
    // Telefonnummern (mind. 6 Ziffern mit Trennzeichen)
    .replace(/\b0\d{2,4}[\s/-]?\d{3,}[\s/-]?\d{3,}\b/g, '[TEL]');
}

/* === COPY + PDF === */
function copyLetter() {
  const text = `Betreff: ${$('#in-subject').value}\n\n${$('#in-body').value}`;
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => toast('✅ Kopiert', 'success'));
  else { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); toast('✅ Kopiert', 'success'); }
}

function exportPDF() {
  // X10-Redteam: Defensive — wenn html2pdf fehlt, User informieren
  if (typeof html2pdf === 'undefined') {
    toast('❌ PDF-Bibliothek nicht geladen — bitte Internet prüfen', 'danger');
    return;
  }
  const element = document.getElementById('document-preview');
  if (!element) {
    toast('❌ Brief-Element nicht gefunden', 'danger');
    return;
  }
  const name = ($('#in-sender')?.value || 'X').split(' ')[0] || 'X';
  const modPrefix = { ueberlastung: 'Ueberlastungsanzeige', kindeswohl: 'Kindeswohl_Meldung', strafanzeige: 'Strafanzeige', mietmangel: 'Mietmangelanzeige' }[currentModule] || 'Brief';
  // Sanitize filename: nur a-zA-Z0-9, alles andere → _
  const safeName = (name || 'X').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50) || 'X';
  const opt = {
    margin: 0,
    filename: `${modPrefix}_${safeName}.pdf`,
    image: { type:'jpeg', quality:0.98 },
    html2canvas: { scale:2, useCORS:true, backgroundColor:'#ffffff' },
    jsPDF: { unit:'mm', format:'a4', orientation:'portrait' }
  };
  const btn = document.querySelector('#exportPdfBtn, .btn-primary');
  const oldText = btn ? btn.innerHTML : 'PDF';
  if (btn) { btn.disabled = true; btn.innerHTML = '⏳ Generiere...'; }
  try {
    html2pdf().set(opt).from(element).save().then(() => {
      if (btn) { btn.disabled = false; btn.innerHTML = '✅ PDF gespeichert'; }
      setTimeout(() => { if (btn) btn.innerHTML = oldText; }, 3000);
    }).catch(err => {
      console.error('[exportPDF] error:', err);
      if (btn) { btn.disabled = false; btn.innerHTML = oldText; }
      toast('❌ PDF-Fehler: ' + (err.message || 'unbekannt'), 'warn');
    });
  } catch(e) {
    console.error('[exportPDF] sync error:', e);
    if (btn) { btn.disabled = false; btn.innerHTML = oldText; }
    toast('❌ PDF-Generierung fehlgeschlagen', 'danger');
  }
}

function toast(msg, type='') {
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

/* === TABS === */
$$('.tabbtn').forEach(btn => btn.addEventListener('click', () => {
  const tab = btn.dataset.tab;
  $$('.tabbtn').forEach(b => b.classList.toggle('active', b === btn));
  $$('.tab-pane').forEach(p => p.classList.toggle('active', p.dataset.pane === tab));
}));

/* === HEADER BUTTONS === */
$$('[data-set-theme]').forEach(btn => {
  btn.onclick = () => {
    state.meta.mode = btn.dataset.setTheme;
    saveState();
    applyMode();
  };
});
// Fallback if modeToggle button is still present
if ($('#modeToggle')) $('#modeToggle').onclick = () => { state.meta.mode = state.meta.mode === 'dark' ? 'light' : 'dark'; saveState(); applyMode(); };
if ($('#langToggle')) $('#langToggle').onclick = () => { state.meta.language = state.meta.language === 'de' ? 'en' : 'de'; saveState(); applyI18n(); };
if ($('#resetBtn')) $('#resetBtn').onclick = () => { if (!confirm('Alle Daten zurücksetzen?')) return; state = defaultState(); saveState(); init(); toast('✅ Zurückgesetzt', 'success'); };
/* === START === */
init();



// Exports to window
window.loadState = loadState;
window.saveState = saveState;
window.cur = cur;
window.esc = esc;
window.init = init;
window.buildModuleUI = buildModuleUI;
window.bindInputs = bindInputs;
window.restoreInputs = restoreInputs;
window.switchModule = switchModule;
window.switchModuleUI = switchModuleUI;
window.applyI18n = applyI18n;
window.applyMode = applyMode;
window.renderTemplateSelect = renderTemplateSelect;
window.renderArsenal = renderArsenal;
window.toggleWeapon = toggleWeapon;
window.loadTemplate = loadTemplate;
window.addIncident = addIncident;
window.renderIncidents = renderIncidents;
window.deleteIncident = deleteIncident;
window.clearIncidents = clearIncidents;
window.incidentsToBody = incidentsToBody;
window.addRecipient = addRecipient;
window.renderRecipients = renderRecipients;
window.setPrimary = setPrimary;
window.deleteRecipient = deleteRecipient;
window.renderEvidence = renderEvidence;
window.toggleEvidence = toggleEvidence;
window.renderTimeline = renderTimeline;
window.updateFristBerechnung = updateFristBerechnung;
window.renderShipping = renderShipping;
window.setShip = setShip;
window.applyShip = applyShip;
window.updatePreview = updatePreview;
window.updateBodyCounter = updateBodyCounter;
window.anonymize = anonymize;
window.copyLetter = copyLetter;
window.exportPDF = exportPDF;
window.toast = toast;
window.generatePDF = generatePDF;
window.switchTab = switchTab;

}