"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

// 1:1 Translation Dictionaries
const DICTIONARIES = {
  de: {
    dashboard: "Übersicht",
    lifecheck: "Lebenslagen-Check",
    cases: "Meine Fälle",
    deadlines: "Fristen-Zentrale",
    housing: "Wohnen & Wohngeld",
    contracts: "Verträge & Inkasso",
    family: "Familie & Leistungen",
    health: "Gesundheit & Patientenrechte",
    participation: "GdB & Teilhabe",
    damage: "Schaden & Versicherung",
    provision: "Vorsorge & Angehörige",
    school: "Schule, Kita & Ausbildung",
    documents: "Unterlagen",
    contacts: "Kontakte & Kennungen",
    letters: "Schreiben-Werkstatt",
    chronicle: "Kontakt-Chronik",
    sources: "Amtliche Quellen",
    print: "Druck & PDF",
    settings: "Einstellungen",
    navStart: "Start & Orientierung",
    navShield: "Bürger-Schutzschild",
    navWork: "Werkzeuge & Nachweise",
    localNote: "Keine Cloud · kein Upload",
    search: "Fälle, Fristen, Dokumente durchsuchen"
  },
  en: {
    dashboard: "Overview",
    lifecheck: "Life-event check",
    cases: "My cases",
    deadlines: "Deadline centre",
    housing: "Housing & housing benefit",
    contracts: "Contracts & debt collection",
    family: "Family & benefits",
    health: "Health & patient rights",
    participation: "Disability & participation",
    damage: "Claims & insurance",
    provision: "Planning & relatives",
    school: "School, childcare & training",
    documents: "Documents",
    contacts: "Contacts & identifiers",
    letters: "Letter studio",
    chronicle: "Contact history",
    sources: "Official sources",
    print: "Print & PDF",
    settings: "Settings",
    navStart: "Start & orientation",
    navShield: "Citizen protection",
    navWork: "Tools & evidence",
    localNote: "No cloud · no upload",
    search: "Search cases, deadlines and documents"
  }
};

// 1:1 Module Data from HTML Imperium
const MODULE_DATA: Record<string, { icon: string; title: string; sub: string; actions: string[]; types: string[] }> = {
  housing: {
    icon: "⌂",
    title: "Wohnen & Wohngeld",
    sub: "Miete, Nebenkosten, Mängel, Kaution und Wohngeld geordnet bearbeiten.",
    actions: [
      "Antragsmonat und Eingang eines Wohngeldantrags sichern",
      "Mietvertrag, Miethöhe und Wohnkostenbelege zusammenstellen",
      "Mangel mit Datum, Fotos, Zeugen und Verlauf dokumentieren",
      "Nebenkostenabrechnung und Belege getrennt erfassen",
      "Auszug, Übergabe und Kautionsrückzahlung nachhalten"
    ],
    types: ["Wohngeld", "Mieterhöhung", "Nebenkosten", "Wohnungsmangel", "Kaution", "Umzug"]
  },
  contracts: {
    icon: "⛓",
    title: "Verträge & Inkasso",
    sub: "Vertragsdaten, Kündigungen, Forderungen und Reaktionen beweisbar ordnen.",
    actions: [
      "Vertragspartner, Vertragsnummer und Abschlussweg festhalten",
      "Kündigungs- oder Widerrufserklärung nachweisbar versenden",
      "Inkassoforderung und Hauptforderung getrennt erfassen",
      "Unbekannte oder bestrittene Forderung schriftlich zurückweisen",
      "Gerichtliche Post niemals als normales Inkassoschreiben behandeln"
    ],
    types: ["Kündigung", "Widerruf", "Inkasso", "Mahnung", "Abo-Falle", "Reklamation"]
  },
  family: {
    icon: "♡",
    title: "Familie & Leistungen",
    sub: "Familienleistungen als zusammenhängende Kette statt als einzelne Anträge betrachten.",
    actions: [
      "Haushaltskonstellation und betreute Kinder erfassen",
      "Kindergeld, Kinderzuschlag und Wohngeld gemeinsam prüfen",
      "Elterngeld- und Elternzeitunterlagen trennen",
      "Unterhaltszahlungen und Unterhaltsvorschuss dokumentieren",
      "Änderungen bei Einkommen, Betreuung oder Haushalt mitteilen"
    ],
    types: ["Kindergeld", "Kinderzuschlag", "Elterngeld", "Unterhaltsvorschuss", "Bildung & Teilhabe", "Elternzeit"]
  },
  health: {
    icon: "＋",
    title: "Gesundheit & Patientenrechte",
    sub: "Behandlungsverlauf, Krankenkassenentscheidungen und eigene Nachweise zusammenführen.",
    actions: [
      "Befunde, Verordnungen und Arztkontakte zeitlich ordnen",
      "Antrag und Eingang bei Kranken- oder Pflegekasse sichern",
      "Ablehnungsgründe mit beantragter Leistung abgleichen",
      "Patientenakte oder konkrete Unterlagen schriftlich anfordern",
      "Bei Streit Beratung und aktuelle Rechtslage einbeziehen"
    ],
    types: ["Kostenübernahme", "Hilfsmittel", "Patientenakte", "Behandlung", "Krankenkasse", "Pflegekasse"]
  },
  participation: {
    icon: "♿",
    title: "GdB & Teilhabe",
    sub: "Auswirkungen im Alltag und Beruf nachvollziehbar statt nur Diagnosen sammeln.",
    actions: [
      "Gesundheitsstörungen und Funktionsbeeinträchtigungen erfassen",
      "Behandelnde Stellen und Befunde vollständig auflisten",
      "Auswirkungen auf Alltag, Mobilität und Arbeit konkret beschreiben",
      "GdB-Bescheid und zugrunde gelegte Befunde vergleichen",
      "Gleichstellung und Teilhabeleistungen gesondert prüfen"
    ],
    types: ["GdB-Antrag", "Änderungsantrag", "Gleichstellung", "Teilhabe", "Hilfsmittel", "Nachteilsausgleich"]
  },
  damage: {
    icon: "◇",
    title: "Schaden & Versicherung",
    sub: "Vom Ereignis bis zur Regulierung eine lückenlose Beweis- und Kostenakte führen.",
    actions: [
      "Ereignisort, Zeitpunkt und Hergang sofort dokumentieren",
      "Fotos, Zeugen und beteiligte Stellen sichern",
      "Schadenpositionen und Folgekosten einzeln erfassen",
      "Schadennummer und jede Kommunikation protokollieren",
      "Zahlung, Kürzung oder Ablehnung mit Begründung abgleichen"
    ],
    types: ["Verkehrsunfall", "Haftpflicht", "Hausrat", "Reise", "Gebäude", "Sonstiger Schaden"]
  },
  provision: {
    icon: "∞",
    title: "Vorsorge & Angehörige",
    sub: "Originale, Vertrauenspersonen und Aktualität für den Ernstfall organisieren.",
    actions: [
      "Vorsorgevollmacht nur nach sorgfältiger Information erstellen",
      "Bevollmächtigte und Ersatzpersonen eindeutig festlegen",
      "Aufbewahrungsort der Originalurkunden dokumentieren",
      "Patientenverfügung regelmäßig auf Aktualität prüfen",
      "Angehörige über Zugriff, Kontakte und Wünsche informieren"
    ],
    types: ["Vorsorgevollmacht", "Betreuungsverfügung", "Patientenverfügung", "Notfallmappe", "Nachlass", "Angehörigenplan"]
  },
  school: {
    icon: "▤",
    title: "Schule, Kita & Ausbildung",
    sub: "Gespräche, Anträge, Vorfälle und landesspezifische Zuständigkeiten strukturiert festhalten.",
    actions: [
      "Einrichtung, Ansprechpartner und Bundesland erfassen",
      "Gesprächsanlässe und Vereinbarungen protokollieren",
      "Nachteilsausgleich mit konkretem Bedarf vorbereiten",
      "Vorfälle sachlich mit Datum, Beteiligten und Folgen dokumentieren",
      "Landesrecht und Schulordnung immer aktuell prüfen"
    ],
    types: ["Kita", "Schule", "Nachteilsausgleich", "Schülerbeförderung", "Ausbildung", "Vorfall"]
  }
};

// 1:1 Life Events from HTML Imperium
const LIFE_EVENTS: Record<string, { icon: string; title: string; desc: string; tasks: string[] }> = {
  move: {
    icon: "⌂",
    title: "Umzug",
    desc: "Meldewesen, Verträge, Wohnung, Versorgung",
    tasks: ["Wohnungsübergabe dokumentieren", "Adressänderungen und Zuständigkeiten sammeln", "Energie, Internet und Versicherungen prüfen", "Wohngeld oder Wohnkosten neu bewerten"]
  },
  birth: {
    icon: "♡",
    title: "Geburt",
    desc: "Familienleistungen, Dokumente, Betreuung",
    tasks: ["Geburtsurkunden und Krankenkasse organisieren", "Kindergeld und mögliche Familienleistungen prüfen", "Elterngeld und Elternzeit vorbereiten", "Betreuung und Unterlagenplan anlegen"]
  },
  separation: {
    icon: "⇄",
    title: "Trennung",
    desc: "Haushalt, Kinder, Verträge, Finanzen",
    tasks: ["Haushalte und Zuständigkeiten trennen", "Unterhalt und mögliche Vorschussleistungen prüfen", "Gemeinsame Verträge und Vollmachten erfassen", "Kinderbezogene Absprachen sachlich protokollieren"]
  },
  illness: {
    icon: "＋",
    title: "Längere Krankheit",
    desc: "Längere Krankheit, Arbeitgeber, Behandlung, Teilhabe",
    tasks: ["Leistungs- und Behandlungsverlauf anlegen", "Bescheide und Zahlungen verfolgen", "Arbeitsplatz und Teilhabeoptionen prüfen", "Vollmachten und Notfallkontakte aktualisieren"]
  },
  jobloss: {
    icon: "◇",
    title: "Arbeitsverlust",
    desc: "Meldungen, Versicherungsleistungen, Existenz",
    tasks: ["Arbeitssuchend- und Arbeitslosmeldung prüfen", "Unterlagen des Arbeitsverhältnisses sichern", "Versicherungs- und Sozialleistungen koordinieren", "Wohnkosten und laufende Verträge priorisieren"]
  },
  care: {
    icon: "♧",
    title: "Pflegefall",
    desc: "Pflegekasse, Alltag, Angehörige, Vollmacht",
    tasks: ["Pflegeantrag und Eingangsdatum dokumentieren", "Alltagsbeeinträchtigungen erfassen", "Begutachtung und Gutachten nachhalten", "Vollmachten und Entlastung der Angehörigen prüfen"]
  },
  death: {
    icon: "∞",
    title: "Todesfall",
    desc: "Nachlass, Verträge, Behörden, Angehörige",
    tasks: ["Sterbeurkunden und wichtige Originale sichern", "Bestattung und zuständige Stellen koordinieren", "Verträge und Versicherungen erfassen", "Nachlassfragen fachlich prüfen lassen"]
  },
  retirement: {
    icon: "◷",
    title: "Rentenübergang",
    desc: "Anträge, Versicherungen, Wohnen, Vorsorge",
    tasks: ["Versicherungsverlauf und Rentenantrag prüfen", "Krankenversicherung und Zusatzleistungen klären", "Wohngeld oder Grundsicherung orientierend prüfen", "Vorsorgeunterlagen aktualisieren"]
  },
  disability: {
    icon: "♿",
    title: "Behinderung",
    desc: "GdB, Teilhabe, Nachteilsausgleich",
    tasks: ["Befunde und funktionale Auswirkungen sammeln", "GdB- oder Änderungsantrag vorbereiten", "Berufliche Gleichstellung orientierend prüfen", "Nachteilsausgleiche und Teilhabe erfassen"]
  }
};

// 1:1 Sources from HTML Imperium
const SOURCES = [
  { name: "Bundesportal", area: "Zuständige Stellen", url: "https://verwaltung.bund.de/", note: "Behörden und Verwaltungsleistungen nach Ort suchen." },
  { name: "Familienportal des Bundes", area: "Familie", url: "https://familienportal.de/familienportal/familienleistungen", note: "Amtliche Orientierung zu Familienleistungen und Lebenslagen." },
  { name: "BMWSB · Wohngeld", area: "Wohnen", url: "https://www.bmwsb.bund.de/SharedDocs/faqs/Webs/BMWSB/DE/wohnen/wohngeld/wohngeld-faq-liste.html", note: "Grundlagen, Antrag und Zuständigkeit zum Wohngeld." },
  { name: "Bundesgesundheitsministerium", area: "Gesundheit", url: "https://www.bundesgesundheitsministerium.de/service/buergertelefon/beschwerden-ueber-die-kranken-oder-pflegeversicherung", note: "Orientierung zu Beschwerden und Rechtsbehelfen gegenüber Kassen." },
  { name: "Bundesagentur für Arbeit", area: "Teilhabe", url: "https://www.arbeitsagentur.de/menschen-mit-behinderungen/spezielle-hilfe-und-unterstuetzung/gleichstellung", note: "Aktuelle Informationen zur Gleichstellung." },
  { name: "BMJ · Vorsorge", area: "Vorsorge", url: "https://www.bmj.de/DE/themen/vorsorge_betreuungsrecht/vorsorgevollmacht/vorsorgevollmacht_node.html", note: "Amtliche Hinweise und Formulare zu Vollmacht und Betreuung." },
  { name: "Gesetze im Internet", area: "Rechtsgrundlagen", url: "https://www.gesetze-im-internet.de/", note: "Konsolidierte Bundesgesetze. Fassung und Änderungsstand beachten." },
  { name: "Verbraucherzentrale", area: "Verbraucher", url: "https://www.verbraucherzentrale.de/", note: "Unabhängige Verbraucherinformationen und Beratungsangebote." }
];

// 1:1 Templates from HTML Imperium
const TEMPLATES = [
  { id: "status", title: "Sachstandsanfrage", subject: "Bitte um Mitteilung des Bearbeitungsstands", body: "am [DATUM] habe ich den oben bezeichneten Antrag eingereicht. Bislang liegt mir keine abschließende Entscheidung vor.\n\nBitte teilen Sie mir den aktuellen Bearbeitungsstand mit und informieren Sie mich konkret, falls noch Unterlagen oder Angaben benötigt werden.\n\nMit freundlichen Grüßen" },
  { id: "frist", title: "Fristwahrende Erklärung", subject: "Fristwahrende Erklärung zum Schreiben/Bescheid vom [DATUM]", body: "hiermit lege ich vorsorglich und fristwahrend den nach der Rechtsbehelfsbelehrung vorgesehenen Rechtsbehelf gegen den Bescheid/das Schreiben vom [DATUM] ein.\n\nEine ergänzende Begründung reiche ich nach Prüfung der Unterlagen nach. Bitte bestätigen Sie den Eingang schriftlich.\n\nMit freundlichen Grüßen" },
  { id: "docs", title: "Unterlagen nachreichen", subject: "Nachreichung von Unterlagen zum Vorgang", body: "zu dem oben bezeichneten Vorgang reiche ich die in der Anlage aufgeführten Unterlagen nach.\n\nBitte ordnen Sie diese meinem Vorgang zu und bestätigen Sie den Eingang. Sollte darüber hinaus etwas fehlen, bitte ich um eine konkrete schriftliche Mitteilung.\n\nMit freundlichen Grüßen" },
  { id: "file", title: "Akteneinsicht/Unterlagenkopie", subject: "Bitte um Akteneinsicht beziehungsweise Übersendung von Unterlagen", body: "zur sachgerechten Prüfung des Vorgangs bitte ich um Einsicht in die entscheidungserheblichen Unterlagen beziehungsweise um Übersendung entsprechender Kopien, soweit ein Anspruch hierauf besteht.\n\nBitte teilen Sie mir das weitere Vorgehen und gegebenenfalls entstehende Kosten vorab mit.\n\nMit freundlichen Grüßen" },
  { id: "housing", title: "Wohnungsmangel anzeigen", subject: "Mängelanzeige zur Wohnung [ADRESSE]", body: "hiermit zeige ich folgenden Mangel an: [MANGEL]. Festgestellt wurde er am [DATUM]. Die Auswirkungen sind: [AUSWIRKUNGEN].\n\nIch bitte um Prüfung und um Mitteilung, wann und wie der Mangel behoben wird. Beweismittel und bisheriger Verlauf sind dokumentiert.\n\nDiese Vorlage ersetzt keine Prüfung der konkreten mietrechtlichen Situation.\n\nMit freundlichen Grüßen" },
  { id: "contract", title: "Forderung bestreiten", subject: "Bestreiten der geltend gemachten Forderung", body: "die geltend gemachte Forderung ist für mich derzeit weder dem Grund noch der Höhe nach nachvollziehbar. Ich bestreite sie daher vorsorglich.\n\nBitte übersenden Sie eine nachvollziehbare Forderungsaufstellung sowie den behaupteten Vertragsschluss und die zugrunde liegenden Belege.\n\nMit freundlichen Grüßen" },
  { id: "insurance", title: "Schadenunterlagen nachreichen", subject: "Schadenfall [SCHADENNUMMER] – Unterlagen und Sachstand", body: "zum oben genannten Schadenfall übersende ich die beigefügten Unterlagen. Bitte bestätigen Sie deren Eingang und teilen Sie mit, ob weitere Nachweise benötigt werden.\n\nBitte informieren Sie mich außerdem über den aktuellen Bearbeitungsstand und etwaige noch offene Prüfpunkte.\n\nMit freundlichen Grüßen" },
  { id: "appointment", title: "Gespräch bestätigen", subject: "Bestätiung unseres Gesprächs vom [DATUM]", body: "zur Dokumentation fasse ich unser Gespräch vom [DATUM] wie folgt zusammen:\n\n[GESPRÄCHSINHALT]\n\nAls nächste Schritte wurden vereinbart: [NÄCHSTE SCHRITTE]. Falls diese Zusammenfassung nicht zutrifft, bitte ich um kurzfristige Korrektur.\n\nMit freundlichen Grüßen" }
];

export default function LebenslagenLotse() {
  const router = useRouter();

  // Auth & Premium states
  const [userId, setUserId] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // App Navigation View
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Theme & Palette states (Civic, Sand, Sage, Berry, Ocean, Mono & Light/Dark)
  const [theme, setTheme] = useState('light');
  const [palette, setPalette] = useState('civic');
  const [lang, setLang] = useState<'de' | 'en'>('de');

  // Local storage state
  const [person, setPerson] = useState({ name: '', street: '', city: '', email: '', phone: '' });
  const [lifeSelections, setLifeSelections] = useState<string[]>([]);
  const [lifeTasks, setLifeTasks] = useState<any[]>([]);
  const [cases, setCases] = useState<any[]>([]);
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [chronicle, setChronicle] = useState<any[]>([]);
  const [letters, setLetters] = useState<any[]>([]);
  const [moduleItems, setModuleItems] = useState<any[]>([]);
  const [checkStates, setCheckStates] = useState<Record<string, boolean>>({});
  const [activeCase, setActiveCase] = useState('');
  
  // Letter editor template state
  const [selectedTemplateId, setSelectedTemplateId] = useState('status');
  const [letterText, setLetterText] = useState('');

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'case' | 'deadline' | 'document' | 'contact' | 'chronicle' | 'module'>('case');
  const [modalEditId, setModalEditId] = useState<string | null>(null);
  
  // Lockscreen & Terms check
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [pinHash, setPinHash] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');

  // Modals Form Data
  const [formData, setFormData] = useState<any>({});

  // 1:1 translation helper
  const t = (key: string) => {
    return DICTIONARIES[lang][key as keyof typeof DICTIONARIES['de']] || DICTIONARIES['de'][key as keyof typeof DICTIONARIES['de']] || key;
  };

  const normalizeState = (x: any) => {
    const defaultsObj = {
      person: { name: '', street: '', city: '', email: '', phone: '' },
      lifeSelections: [],
      lifeTasks: [],
      cases: [],
      deadlines: [],
      documents: [],
      contacts: [],
      chronicle: [],
      letters: [],
      moduleItems: [],
      checkStates: {},
      activeCase: '',
      meta: { theme: 'light', palette: 'civic', lang: 'de', terms: false, pinHash: '', locked: false }
    };
    const clean = x && typeof x === 'object' ? x : {};
    return {
      person: { ...defaultsObj.person, ...(clean.person || {}) },
      lifeSelections: Array.isArray(clean.lifeSelections) ? clean.lifeSelections : [],
      lifeTasks: Array.isArray(clean.lifeTasks) ? clean.lifeTasks : [],
      cases: Array.isArray(clean.cases) ? clean.cases : [],
      deadlines: Array.isArray(clean.deadlines) ? clean.deadlines : [],
      documents: Array.isArray(clean.documents) ? clean.documents : [],
      contacts: Array.isArray(clean.contacts) ? clean.contacts : [],
      chronicle: Array.isArray(clean.chronicle) ? clean.chronicle : [],
      letters: Array.isArray(clean.letters) ? clean.letters : [],
      moduleItems: Array.isArray(clean.moduleItems) ? clean.moduleItems : [],
      checkStates: clean.checkStates && typeof clean.checkStates === 'object' ? clean.checkStates : {},
      activeCase: typeof clean.activeCase === 'string' ? clean.activeCase : '',
      meta: { ...defaultsObj.meta, ...(clean.meta || {}) }
    };
  };

  // Mount effects
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

    // Load Local Storage under compatible key
    try {
      const raw = localStorage.getItem('vorlagenbude_lebenslagen_lotse_v1');
      if (raw) {
        const parsed = normalizeState(JSON.parse(raw));
        setPerson(parsed.person);
        setLifeSelections(parsed.lifeSelections);
        setLifeTasks(parsed.lifeTasks);
        setCases(parsed.cases);
        setDeadlines(parsed.deadlines);
        setDocuments(parsed.documents);
        setContacts(parsed.contacts);
        setChronicle(parsed.chronicle);
        setLetters(parsed.letters);
        setModuleItems(parsed.moduleItems);
        setCheckStates(parsed.checkStates);
        setActiveCase(parsed.activeCase);
        
        setTheme(parsed.meta.theme);
        setPalette(parsed.meta.palette);
        setLang(parsed.meta.lang);
        setTermsAccepted(parsed.meta.terms);
        if (parsed.meta.pinHash) {
          setPinHash(parsed.meta.pinHash);
          setIsLocked(parsed.meta.locked ?? false);
        }
      } else {
        setShowTermsModal(true);
      }
    } catch (e) {
      console.error("Failed to load local storage", e);
    }
  }, [router]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveState({ person });
    alert(lang === 'de' ? 'Absenderdaten erfolgreich lokal gespeichert!' : 'Sender details saved locally!');
  };

  // Sync to local storage
  const saveState = (updates: Partial<{
    person: any; lifeSelections: any; lifeTasks: any; cases: any; deadlines: any;
    documents: any; contacts: any; chronicle: any; letters: any; moduleItems: any;
    checkStates: any; activeCase: any; theme: string; palette: string; lang: 'de' | 'en';
    terms: boolean; pinHash: string; locked: boolean;
  }>) => {
    try {
      const current = {
        version: 1,
        meta: {
          lang: updates.lang !== undefined ? updates.lang : lang,
          theme: updates.theme !== undefined ? updates.theme : theme,
          palette: updates.palette !== undefined ? updates.palette : palette,
          terms: updates.terms !== undefined ? updates.terms : termsAccepted,
          termsAt: new Date().toISOString(),
          pinHash: updates.pinHash !== undefined ? updates.pinHash : pinHash,
          locked: updates.locked !== undefined ? updates.locked : isLocked
        },
        person: updates.person !== undefined ? updates.person : person,
        lifeSelections: updates.lifeSelections !== undefined ? updates.lifeSelections : lifeSelections,
        lifeTasks: updates.lifeTasks !== undefined ? updates.lifeTasks : lifeTasks,
        cases: updates.cases !== undefined ? updates.cases : cases,
        deadlines: updates.deadlines !== undefined ? updates.deadlines : deadlines,
        documents: updates.documents !== undefined ? updates.documents : documents,
        contacts: updates.contacts !== undefined ? updates.contacts : contacts,
        chronicle: updates.chronicle !== undefined ? updates.chronicle : chronicle,
        letters: updates.letters !== undefined ? updates.letters : letters,
        moduleItems: updates.moduleItems !== undefined ? updates.moduleItems : moduleItems,
        checkStates: updates.checkStates !== undefined ? updates.checkStates : checkStates,
        activeCase: updates.activeCase !== undefined ? updates.activeCase : activeCase,
        currentView: activeView
      };
      localStorage.setItem('vorlagenbude_lebenslagen_lotse_v1', JSON.stringify(current));
    } catch (e) {
      console.error(e);
    }
  };

  // Letter template compilation
  useEffect(() => {
    if (activeView === 'letters') {
      const tObj = TEMPLATES.find(x => x.id === selectedTemplateId) || TEMPLATES[0];
      const selectedCaseObj = cases.find(x => x.id === activeCase);
      const contactObj = contacts.find(x => x.id === selectedCaseObj?.contactId);

      const senderStr = [person.name, person.street, person.city, person.email, person.phone].filter(Boolean).join('\n');
      const recipientStr = contactObj 
        ? [contactObj.name, contactObj.department, contactObj.address].filter(Boolean).join('\n')
        : "[Empfänger / Behörde]\n[Anschrift]";

      const refStr = contactObj?.reference ? `Akten-/Kundennummer: ${contactObj.reference}\n` : '';
      const dateStr = `Datum: ${new Date().toLocaleDateString('de-DE')}`;

      const text = `${senderStr || '[Vor- und Nachname]\n[Anschrift]'}\n\n${recipientStr}\n\n${refStr}${dateStr}\n\nBetreff: ${tObj.subject}\n\nSehr geehrte Damen und Herren,\n\n${tObj.body}`;
      setLetterText(text);
    }
  }, [activeView, selectedTemplateId, activeCase, person, cases, contacts]);

  const formatDateStr = (dStr: string) => {
    if (!dStr) return '—';
    const parts = dStr.split('-');
    if (parts.length === 3) return `${parts[2]}.${parts[1]}.${parts[0]}`;
    return dStr;
  };

  const getDaysLeft = (dueStr: string) => {
    if (!dueStr) return 9999;
    const todayStr = new Date().toISOString().split('T')[0];
    const diff = new Date(dueStr).getTime() - new Date(todayStr).getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Life checks
  const handleBuildLifePlan = () => {
    const tasks = lifeSelections.flatMap(id => {
      return LIFE_EVENTS[id].tasks.map(tText => ({
        id: Math.random().toString(36).substring(2, 9),
        life: LIFE_EVENTS[id].title,
        text: tText,
        done: false
      }));
    });
    setLifeTasks(tasks);
    saveState({ lifeSelections, lifeTasks: tasks });
    alert(lang === 'de' ? 'Persönlicher Aktionsplan wurde erstellt!' : 'Personal action plan created!');
  };

  const handleClearPlan = () => {
    setLifeSelections([]);
    setLifeTasks([]);
    saveState({ lifeSelections: [], lifeTasks: [] });
  };

  const toggleLifeTask = (taskId: string) => {
    const updated = lifeTasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
    setLifeTasks(updated);
    saveState({ lifeTasks: updated });
  };

  const toggleCheckState = (key: string) => {
    const updated = { ...checkStates, [key]: !checkStates[key] };
    setCheckStates(updated);
    saveState({ checkStates: updated });
  };

  // Modal handlers
  const openModal = (type: typeof modalType, id: string | null = null, extra: any = {}) => {
    setModalType(type);
    setModalEditId(id);
    let defaultData: any = {};

    if (id) {
      if (type === 'case') defaultData = cases.find(c => c.id === id);
      if (type === 'deadline') defaultData = deadlines.find(d => d.id === id);
      if (type === 'document') defaultData = documents.find(d => d.id === id);
      if (type === 'contact') defaultData = contacts.find(c => c.id === id);
      if (type === 'chronicle') defaultData = chronicle.find(c => c.id === id);
      if (type === 'module') defaultData = moduleItems.find(m => m.id === id);
    } else {
      defaultData = {
        status: 'offen',
        priority: 'mittel',
        area: extra.module || 'housing',
        date: new Date().toISOString().split('T')[0],
        due: new Date().toISOString().split('T')[0],
        module: extra.module || ''
      };
    }
    setFormData(defaultData);
    setIsModalOpen(true);
  };

  const handleModalSave = (e: React.FormEvent) => {
    e.preventDefault();
    const id = modalEditId || Math.random().toString(36).substring(2, 9);
    const dateToday = new Date().toISOString().split('T')[0];

    const record = {
      ...formData,
      id,
      updated: dateToday,
      created: formData.created || dateToday
    };

    if (modalType === 'case') {
      const updated = modalEditId ? cases.map(c => c.id === modalEditId ? record : c) : [record, ...cases];
      setCases(updated);
      saveState({ cases: updated });
    } else if (modalType === 'deadline') {
      const updated = modalEditId ? deadlines.map(d => d.id === modalEditId ? record : d) : [record, ...deadlines];
      setDeadlines(updated);
      saveState({ deadlines: updated });
    } else if (modalType === 'document') {
      const updated = modalEditId ? documents.map(d => d.id === modalEditId ? record : d) : [record, ...documents];
      setDocuments(updated);
      saveState({ documents: updated });
    } else if (modalType === 'contact') {
      const updated = modalEditId ? contacts.map(c => c.id === modalEditId ? record : c) : [record, ...contacts];
      setContacts(updated);
      saveState({ contacts: updated });
    } else if (modalType === 'chronicle') {
      const updated = modalEditId ? chronicle.map(c => c.id === modalEditId ? record : c) : [record, ...chronicle];
      setChronicle(updated);
      saveState({ chronicle: updated });
    } else if (modalType === 'module') {
      const updated = modalEditId ? moduleItems.map(m => m.id === modalEditId ? record : m) : [record, ...moduleItems];
      setModuleItems(updated);
      saveState({ moduleItems: updated });
    }

    setIsModalOpen(false);
    setFormData({});
    setModalEditId(null);
  };

  const handleDeleteItem = (type: string, id: string) => {
    if (!window.confirm(lang === 'de' ? 'Diesen Eintrag wirklich löschen?' : 'Really delete this entry?')) return;

    if (type === 'case') {
      const updated = cases.filter(c => c.id !== id);
      setCases(updated);
      saveState({ cases: updated });
    } else if (type === 'deadline') {
      const updated = deadlines.filter(d => d.id !== id);
      setDeadlines(updated);
      saveState({ deadlines: updated });
    } else if (type === 'document') {
      const updated = documents.filter(d => d.id !== id);
      setDocuments(updated);
      saveState({ documents: updated });
    } else if (type === 'contact') {
      const updated = contacts.filter(c => c.id !== id);
      setContacts(updated);
      saveState({ contacts: updated });
    } else if (type === 'chronicle') {
      const updated = chronicle.filter(c => c.id !== id);
      setChronicle(updated);
      saveState({ chronicle: updated });
    } else if (type === 'module') {
      const updated = moduleItems.filter(m => m.id !== id);
      setModuleItems(updated);
      saveState({ moduleItems: updated });
    } else if (type === 'letter') {
      const updated = letters.filter(l => l.id !== id);
      setLetters(updated);
      saveState({ letters: updated });
    }
  };

  // Letter actions
  const handleSaveLetterText = () => {
    const selectedT = TEMPLATES.find(x => x.id === selectedTemplateId) || TEMPLATES[0];
    const newL = {
      id: Math.random().toString(36).substring(2, 9),
      title: selectedT.title,
      date: new Date().toISOString().split('T')[0],
      text: letterText
    };
    const updated = [newL, ...letters];
    setLetters(updated);
    saveState({ letters: updated });
    alert(lang === 'de' ? 'Schreiben gespeichert!' : 'Letter saved successfully!');
  };

  // PIN settings
  const hashPin = async (val: string) => {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('LL|' + val));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleSetPin = async () => {
    const pinVal = (document.getElementById('newPinInput') as HTMLInputElement)?.value;
    if (!pinVal || pinVal.length < 4) {
      alert(lang === 'de' ? 'Bitte mindestens 4 Ziffern eingeben.' : 'Please enter at least 4 digits.');
      return;
    }
    const hashed = await hashPin(pinVal);
    setPinHash(hashed);
    setIsLocked(true);
    saveState({ pinHash: hashed, locked: true });
    (document.getElementById('newPinInput') as HTMLInputElement).value = '';
    alert(lang === 'de' ? 'Lokale PIN gesetzt!' : 'Local PIN set successfully!');
  };

  const handleRemovePin = async () => {
    if (!pinHash) return;
    const oldPin = window.prompt(lang === 'de' ? 'Aktuelle PIN eingeben:' : 'Enter current PIN:');
    if (!oldPin) return;
    const hashed = await hashPin(oldPin);
    if (hashed === pinHash) {
      setPinHash('');
      setIsLocked(false);
      saveState({ pinHash: '', locked: false });
      alert(lang === 'de' ? 'Lokale PIN entfernt.' : 'Local PIN removed.');
    } else {
      alert(lang === 'de' ? 'Falsche PIN!' : 'Incorrect PIN!');
    }
  };

  const handleUnlock = async () => {
    const hashed = await hashPin(enteredPin);
    if (hashed === pinHash) {
      setIsLocked(false);
      setEnteredPin('');
    } else {
      alert(lang === 'de' ? 'Falsche PIN!' : 'Incorrect PIN!');
    }
  };

  // Language & Theme switches
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    saveState({ theme: next });
  };

  const toggleLang = () => {
    const next = lang === 'de' ? 'en' : 'de';
    setLang(next);
    saveState({ lang: next });
  };

  const changePalette = (p: string) => {
    setPalette(p);
    saveState({ palette: p });
  };

  // Global search
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }

    const q = val.toLowerCase().trim();
    const results: any[] = [];

    const datasets = [
      { name: 'Fälle', items: cases, fields: ['title', 'goal', 'authority', 'note'] },
      { name: 'Fristen', items: deadlines, fields: ['title', 'type', 'note'] },
      { name: 'Unterlagen', items: documents, fields: ['title', 'category', 'location', 'note'] },
      { name: 'Kontakte', items: contacts, fields: ['name', 'kind', 'department', 'reference', 'phone', 'email', 'address'] },
      { name: 'Chronik', items: chronicle, fields: ['subject', 'channel', 'person', 'result'] },
      { name: 'Vorgänge', items: moduleItems, fields: ['title', 'type', 'reference', 'note'] }
    ];

    datasets.forEach(ds => {
      ds.items.forEach(item => {
        let match = false;
        ds.fields.forEach(f => {
          if (item[f] && String(item[f]).toLowerCase().includes(q)) {
            match = true;
          }
        });
        if (match) {
          results.push({
            group: ds.name,
            title: item.title || item.subject || item.name || item.type || 'Eintrag',
            meta: item.note || item.goal || item.result || item.address || ''
          });
        }
      });
    });

    setSearchResults(results);
  };

  return (
    <div className="lotse-app-wrapper" data-theme={theme} data-palette={palette}>
      {/* Scope CSS 1:1 from standalone app */}
      <style dangerouslySetInnerHTML={{__html: `
        .lotse-app-wrapper {
          --bg:#eef2f6;--paper:#fff;--paper2:#f7f9fc;--ink:#142033;--muted:#667287;--line:#d9e0ea;
          --nav:#10243f;--nav2:#173a61;--accent:#1768e5;--accent2:#71a8ff;--gold:#e8b43f;--good:#16845b;
          --warn:#b46a0a;--bad:#bd3f46;--soft:#e8f0ff;--buttonInk:#fff;--shadow:0 18px 55px rgba(22,36,58,.10);
          --radius:22px;--sidebar:278px;
          background: var(--bg);
          color: var(--ink);
          min-height: 100vh;
          font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }
        .lotse-app-wrapper[data-palette="sand"]{--bg:#f4efe7;--paper:#fffdf9;--paper2:#f8f2e8;--ink:#30271e;--muted:#75695e;--line:#e2d7c8;--nav:#3f3127;--nav2:#604737;--accent:#b45c35;--accent2:#df9c77;--gold:#d7a53a;--good:#4f7b57;--soft:#f7e5d9}
        .lotse-app-wrapper[data-palette="sage"]{--bg:#edf3ee;--paper:#fbfdfb;--paper2:#f2f7f2;--ink:#1c3025;--muted:#627267;--line:#d2dfd5;--nav:#1d3b2d;--nav2:#315a44;--accent:#2d7d55;--accent2:#7fbd98;--gold:#d0a640;--good:#24714c;--soft:#dff0e6}
        .lotse-app-wrapper[data-palette="berry"]{--bg:#f6eff3;--paper:#fffafd;--paper2:#fbf4f7;--ink:#34232c;--muted:#76616b;--line:#e5d4dc;--nav:#482638;--nav2:#6f3854;--accent:#a33e69;--accent2:#dc8faf;--gold:#d8a83e;--good:#36745b;--soft:#f6dfea}
        .lotse-app-wrapper[data-palette="ocean"]{--bg:#edf4f6;--paper:#fbfeff;--paper2:#f1f8fa;--ink:#17303a;--muted:#61757c;--line:#d1e0e5;--nav:#123743;--nav2:#1c5667;--accent:#167b91;--accent2:#70bfd0;--gold:#e2b03e;--good:#21755b;--soft:#dff1f5}
        .lotse-app-wrapper[data-palette="mono"]{--bg:#f0f1f2;--paper:#fff;--paper2:#f7f7f8;--ink:#191c20;--muted:#686d74;--line:#d9dde0;--nav:#20252a;--nav2:#353d44;--accent:#4a6475;--accent2:#9aadb9;--gold:#d3a63d;--good:#2e7353;--soft:#e4e9ec}
        .lotse-app-wrapper[data-theme="dark"]{--bg:#0c1118;--paper:#141b24;--paper2:#19222d;--ink:#f4f7fb;--muted:#abb6c6;--line:#2a3644;--nav:#08101b;--nav2:#12263c;--soft:#172b45;--shadow:0 22px 60px rgba(0,0,0,.34)}
        
        .lotse-app-wrapper * { box-sizing: border-box; }
        .lotse-app-wrapper button, .lotse-app-wrapper input, .lotse-app-wrapper select, .lotse-app-wrapper textarea { font: inherit; }
        .lotse-app-wrapper button { cursor: pointer; }
        .lotse-app-wrapper a { color: var(--accent); }
        
        .lotse-app-wrapper .app { min-height: 100vh; position: relative; }
        .lotse-app-wrapper .sidebar { position: fixed; inset: 0 auto 0 0; width: var(--sidebar); padding: 20px 16px; background: linear-gradient(155deg, var(--nav), var(--nav2)); color: #fff; display: flex; flex-direction: column; z-index: 40; overflow: auto; }
        .lotse-app-wrapper .brand { display: flex; align-items: center; gap: 12px; padding: 4px 6px 17px; }
        .lotse-app-wrapper .brandmark { width: 48px; height: 48px; border-radius: 16px; display: grid; place-items: center; background: linear-gradient(145deg, #f8d271, var(--gold)); color: #1f2a38; font-weight: 950; box-shadow: 0 10px 26px rgba(0,0,0,.2); }
        .lotse-app-wrapper .brand strong { display: block; font-size: 16px; }
        .lotse-app-wrapper .brand small { opacity: .7; }
        .lotse-app-wrapper .navgroup { font-size: 10px; text-transform: uppercase; letter-spacing: .15em; color: rgba(255,255,255,.5); padding: 14px 12px 6px; }
        .lotse-app-wrapper .nav { display: grid; gap: 3px; }
        .lotse-app-wrapper .navbtn { border: 0; background: transparent; color: rgba(255,255,255,0.78); padding: 9px 11px; border-radius: 12px; display: flex; align-items: center; gap: 11px; text-align: left; width: 100%; }
        .lotse-app-wrapper .navbtn:hover, .lotse-app-wrapper .navbtn.active { background: rgba(255,255,255,.12); color: #fff; }
        .lotse-app-wrapper .navbtn.active { box-shadow: inset 3px 0 var(--gold); }
        .lotse-app-wrapper .navicon { width: 22px; color: #f4cb62; text-align: center; }
        .lotse-app-wrapper .sidefoot { margin-top: auto; padding: 18px 8px 4px; font-size: 12px; color: rgba(255,255,255,.68); }
        .lotse-app-wrapper .sidefoot strong { color: #fff; }
        
        .lotse-app-wrapper .shell { margin-left: var(--sidebar); min-height: 100vh; }
        .lotse-app-wrapper .topbar { height: 74px; position: sticky; top: 0; z-index: 30; background: color-mix(in srgb, var(--paper) 92%, transparent); backdrop-filter: blur(18px); border-bottom: 1px solid var(--line); display: flex; align-items: center; gap: 12px; padding: 11px 28px; }
        .lotse-app-wrapper .search { flex: 1; max-width: 720px; position: relative; }
        .lotse-app-wrapper .search input { width: 100%; height: 48px; border: 1px solid var(--line); border-radius: 15px; background: var(--paper); color: var(--ink); padding: 0 16px 0 43px; outline: 0; }
        .lotse-app-wrapper .search span { position: absolute; left: 16px; top: 13px; color: var(--muted); }
        .lotse-app-wrapper .topactions { margin-left: auto; display: flex; gap: 8px; }
        .lotse-app-wrapper .iconbtn, .lotse-app-wrapper .btn { border: 1px solid var(--line); border-radius: 13px; background: var(--paper); color: var(--ink); padding: 10px 14px; font-weight: 750; }
        .lotse-app-wrapper .iconbtn { width: 46px; height: 46px; padding: 0; display: grid; place-items: center; }
        .lotse-app-wrapper .btn.primary { background: var(--accent); border-color: var(--accent); color: var(--buttonInk); }
        .lotse-app-wrapper .btn.danger { color: var(--bad); }
        .lotse-app-wrapper .btn.small { padding: 7px 10px; font-size: 12px; }
        .lotse-app-wrapper .mobilemenu { display: none; }
        
        .lotse-app-wrapper .main { padding: 34px 38px 70px; max-width: 1700px; margin: auto; }
        .lotse-app-wrapper .view { display: none; }
        .lotse-app-wrapper .view.active { display: block; }
        .lotse-app-wrapper .eyebrow { color: var(--accent); font-size: 11px; font-weight: 900; letter-spacing: .15em; text-transform: uppercase; }
        .lotse-app-wrapper .head { display: flex; justify-content: space-between; gap: 22px; align-items: flex-end; margin-bottom: 24px; }
        .lotse-app-wrapper .head h1 { margin: 4px 0 5px; font: 800 44px/1.03 Georgia, serif; letter-spacing: -.03em; }
        .lotse-app-wrapper .head p { margin: 0; color: var(--muted); max-width: 800px; }
        
        .lotse-app-wrapper .hero { position: relative; overflow: hidden; background: linear-gradient(135deg, var(--nav), var(--nav2)); color: #fff; border-radius: 32px; padding: 38px; box-shadow: var(--shadow); display: grid; grid-template-columns: 1.25fr .75fr; gap: 30px; }
        .lotse-app-wrapper .hero:after { content: ""; position: absolute; width: 420px; height: 420px; border: 80px solid rgba(255, 255, 255, .045); border-radius: 50%; right: -150px; top: -210px; }
        .lotse-app-wrapper .hero h1 { font: 800 58px/.96 Georgia, serif; letter-spacing: -.04em; margin: 10px 0 18px; max-width: 780px; color: white !important; }
        .lotse-app-wrapper .hero p { color: rgba(255, 255, 255, .78); font-size: 17px; max-width: 740px; }
        .lotse-app-wrapper .hero .eyebrow { color: #f2c85b; }
        .lotse-app-wrapper .heroactions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 24px; }
        .lotse-app-wrapper .heroactions .btn { background: transparent; color: #fff; border-color: rgba(255, 255, 255, .38); }
        .lotse-app-wrapper .heroactions .primary { background: #fff; color: var(--nav); border-color: #fff; }
        
        .lotse-app-wrapper .shieldvisual { align-self: center; position: relative; z-index: 1; }
        .lotse-app-wrapper .shield { width: 210px; height: 240px; margin: auto; clip-path: polygon(50% 0, 94% 17%, 88% 70%, 50% 100%, 12% 70%, 6% 17%); background: linear-gradient(145deg, #f3ce69, var(--gold)); display: grid; place-items: center; color: var(--nav); font: 950 64px Georgia, serif; box-shadow: 0 20px 55px rgba(0, 0, 0, .25); }
        .lotse-app-wrapper .shield span { font: 900 10px system-ui; letter-spacing: .16em; text-transform: uppercase; display: block; text-align: center; margin-top: 3px; }
        
        .lotse-app-wrapper .metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin: 18px 0; }
        .lotse-app-wrapper .metric, .lotse-app-wrapper .card { background: var(--paper); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: 0 10px 30px rgba(22, 36, 58, .04); }
        .lotse-app-wrapper .metric { padding: 18px; }
        .lotse-app-wrapper .metric strong { font: 800 30px Georgia, serif; display: block; color: var(--accent); }
        .lotse-app-wrapper .metric span { color: var(--muted); }
        
        .lotse-app-wrapper .grid2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        .lotse-app-wrapper .grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .lotse-app-wrapper .card { padding: 20px; min-width: 0; }
        .lotse-app-wrapper .card h2, .lotse-app-wrapper .card h3 { font-family: Georgia, serif; margin: 0 0 8px; color: var(--ink); }
        .lotse-app-wrapper .card h2 { font-size: 25px; }
        .lotse-app-wrapper .card h3 { font-size: 19px; }
        .lotse-app-wrapper .muted { color: var(--muted); }
        .lotse-app-wrapper .stack { display: grid; gap: 11px; }
        .lotse-app-wrapper .row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .lotse-app-wrapper .between { justify-content: space-between; }
        
        .lotse-app-wrapper .pill { display: inline-flex; align-items: center; gap: 5px; border-radius: 99px; padding: 5px 9px; background: var(--soft); color: var(--accent); font-size: 11px; font-weight: 850; }
        .lotse-app-wrapper .pill.good { background: color-mix(in srgb, var(--good) 15%, var(--paper)); color: var(--good); }
        .lotse-app-wrapper .pill.warn { background: color-mix(in srgb, var(--warn) 15%, var(--paper)); color: var(--warn); }
        .lotse-app-wrapper .pill.bad { background: color-mix(in srgb, var(--bad) 15%, var(--paper)); color: var(--bad); }
        
        .lotse-app-wrapper .quickgrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 13px; }
        .lotse-app-wrapper .quick { border: 1px solid var(--line); background: var(--paper2); border-radius: 18px; padding: 17px; text-align: left; color: var(--ink); width: 100%; }
        .lotse-app-wrapper .quick b { display: block; margin-bottom: 4px; }
        .lotse-app-wrapper .quick small { color: var(--muted); }
        .lotse-app-wrapper .empty { border: 1px dashed var(--line); border-radius: 16px; padding: 28px; text-align: center; color: var(--muted); }
        
        .lotse-app-wrapper .timeline { display: grid; gap: 0; }
        .lotse-app-wrapper .timelineitem { display: grid; grid-template-columns: 24px 1fr; gap: 11px; }
        .lotse-app-wrapper .timelineitem:before { content: ""; width: 12px; height: 12px; border-radius: 50%; background: var(--accent); margin: 6px; box-shadow: 0 0 0 5px var(--soft); }
        .lotse-app-wrapper .timelinebody { padding: 0 0 18px; border-left: 2px solid var(--line); margin-left: -18px; padding-left: 24px; }
        .lotse-app-wrapper .timelineitem:last-child .timelinebody { border-left-color: transparent; }
        
        .lotse-app-wrapper .item { border: 1px solid var(--line); background: var(--paper2); border-radius: 16px; padding: 14px; }
        .lotse-app-wrapper .itemtitle { font-weight: 850; overflow-wrap: anywhere; color: var(--ink); }
        .lotse-app-wrapper .itemmeta { display: flex; gap: 8px; flex-wrap: wrap; color: var(--muted); font-size: 12px; margin-top: 5px; }
        
        .lotse-app-wrapper .lifegrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 13px; }
        .lotse-app-wrapper .lifeoption { position: relative; }
        .lotse-app-wrapper .lifeoption input { position: absolute; opacity: 0; }
        .lotse-app-wrapper .lifeoption label { display: block; border: 1px solid var(--line); background: var(--paper); border-radius: 18px; padding: 18px; min-height: 120px; cursor: pointer; }
        .lotse-app-wrapper .lifeoption input:checked+label { border-color: var(--accent); box-shadow: 0 0 0 3px var(--soft); }
        .lotse-app-wrapper .lifeicon { font-size: 25px; color: var(--accent); display: block; margin-bottom: 8px; }
        .lotse-app-wrapper .lifeoption b { display: block; color: var(--ink); }
        .lotse-app-wrapper .lifeoption small { color: var(--muted); }
        
        .lotse-app-wrapper .board { display: flex; gap: 14px; overflow-x: auto; padding-bottom: 5px; }
        .lotse-app-wrapper .lane { background: var(--paper2); border: 1px solid var(--line); border-radius: 20px; padding: 14px; min-height: 260px; flex: 1; min-width: 250px; }
        .lotse-app-wrapper .lanehead { display: flex; justify-content: space-between; font-weight: 850; margin-bottom: 12px; color: var(--ink); }
        .lotse-app-wrapper .casecard { background: var(--paper); border: 1px solid var(--line); border-radius: 15px; padding: 13px; margin-bottom: 9px; }
        .lotse-app-wrapper .casecard h3 { font: 800 16px system-ui; margin: 0; color: var(--ink); }
        .lotse-app-wrapper .casecard p { color: var(--muted); font-size: 12px; margin: 5px 0; }
        .lotse-app-wrapper .caseactions { display: flex; gap: 5px; margin-top: 9px; }
        
        .lotse-app-wrapper .tablewrap { overflow: auto; border: 1px solid var(--line); border-radius: 18px; background: var(--paper); }
        .lotse-app-wrapper table { border-collapse: collapse; width: 100%; min-width: 760px; }
        .lotse-app-wrapper th, .lotse-app-wrapper td { text-align: left; padding: 12px 14px; border-bottom: 1px solid var(--line); vertical-align: top; color: var(--ink); }
        .lotse-app-wrapper th { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); background: var(--paper2); }
        .lotse-app-wrapper tr:last-child td { border-bottom: 0; }
        
        .lotse-app-wrapper .formgrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 13px; }
        .lotse-app-wrapper .field { display: grid; gap: 6px; min-width: 0; }
        .lotse-app-wrapper .field.wide { grid-column: 1 / -1; }
        .lotse-app-wrapper .field label { font-size: 12px; font-weight: 800; color: var(--ink); }
        .lotse-app-wrapper .field input, .lotse-app-wrapper .field select, .lotse-app-wrapper .field textarea { width: 100%; border: 1px solid var(--line); border-radius: 12px; background: var(--paper); color: var(--ink); padding: 11px 12px; outline: 0; }
        .lotse-app-wrapper .field textarea { min-height: 100px; resize: vertical; }
        .lotse-app-wrapper .field input:focus, .lotse-app-wrapper .field select:focus, .lotse-app-wrapper .field textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--soft); }
        
        .lotse-app-wrapper .checkline { display: flex; align-items: flex-start; gap: 9px; color: var(--ink); }
        .lotse-app-wrapper .checkline input { width: 18px !important; height: 18px; flex: 0 0 18px; margin-top: 2px; }
        .lotse-app-wrapper .checkline span { min-width: 0; overflow-wrap: anywhere; }
        
        .lotse-app-wrapper .modulehero { background: linear-gradient(135deg, var(--paper), var(--paper2)); border: 1px solid var(--line); border-radius: 27px; padding: 25px; display: grid; grid-template-columns: 1fr auto; gap: 20px; margin-bottom: 16px; color: var(--ink); }
        .lotse-app-wrapper .moduleicon { width: 76px; height: 76px; border-radius: 23px; background: var(--soft); color: var(--accent); display: grid; place-items: center; font-size: 31px; }
        
        .lotse-app-wrapper .tasklist { display: grid; gap: 8px; }
        .lotse-app-wrapper .taskrow { display: flex; gap: 10px; align-items: flex-start; padding: 11px; border: 1px solid var(--line); border-radius: 13px; background: var(--paper2); cursor: pointer; color: var(--ink); }
        .lotse-app-wrapper .taskrow input { width: 18px !important; height: 18px; flex: 0 0 18px; margin-top: 2px; }
        .lotse-app-wrapper .taskrow span { min-width: 0; overflow-wrap: anywhere; }
        
        .lotse-app-wrapper .sourcecard { display: grid; grid-template-columns: 55px 1fr auto; gap: 14px; align-items: center; color: var(--ink); }
        .lotse-app-wrapper .sourceicon { width: 50px; height: 50px; border-radius: 15px; background: var(--soft); display: grid; place-items: center; color: var(--accent); font-weight: 900; }
        .lotse-app-wrapper .sourcecard a { font-weight: 800; text-decoration: none; }
        
        .lotse-app-wrapper .letterpaper { background: #fff; color: #1a1a1a; border: 1px solid #d8d8d8; box-shadow: 0 15px 40px rgba(0,0,0,.08); padding: 55px 65px; min-height: 720px; max-width: 860px; margin: auto; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.55; white-space: pre-wrap; outline: 0; }
        .lotse-app-wrapper .lettertools { display: grid; grid-template-columns: 350px 1fr; gap: 16px; }
        .lotse-app-wrapper .templatebtn { width: 100%; border: 1px solid var(--line); background: var(--paper); color: var(--ink); border-radius: 13px; padding: 12px; text-align: left; margin-bottom: 7px; cursor: pointer; }
        .lotse-app-wrapper .templatebtn.active { background: var(--nav); color: #fff; }
        
        .lotse-app-wrapper .modal { position: fixed; inset: 0; background: rgba(5,12,22,.62); z-index: 100; display: none; place-items: center; padding: 18px; }
        .lotse-app-wrapper .modal.open { display: grid; }
        .lotse-app-wrapper .modalbox { width: min(760px, 100%); max-height: 92vh; overflow: auto; background: var(--paper); border: 1px solid var(--line); border-radius: 26px; box-shadow: var(--shadow); padding: 24px; color: var(--ink); }
        .lotse-app-wrapper .modalhead { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .lotse-app-wrapper .modalhead h2 { font: 800 27px Georgia, serif; margin: 0; color: var(--ink); }
        .lotse-app-wrapper .close { border: 0; background: var(--paper2); color: var(--ink); border-radius: 10px; width: 38px; height: 38px; font-size: 20px; font-weight: bold; cursor: pointer; }
        
        .lotse-app-wrapper .settingrow { display: flex; align-items: center; justify-content: space-between; gap: 18px; border-bottom: 1px solid var(--line); padding: 14px 0; color: var(--ink); }
        .lotse-app-wrapper .swatches { display: flex; gap: 8px; flex-wrap: wrap; }
        .lotse-app-wrapper .swatch { width: 30px; height: 30px; border-radius: 50%; border: 3px solid var(--paper); box-shadow: 0 0 0 1px var(--line); cursor: pointer; }
        .lotse-app-wrapper .swatch[data-p="civic"] { background: #1768e5; }
        .lotse-app-wrapper .swatch[data-p="sand"] { background: #b45c35; }
        .lotse-app-wrapper .swatch[data-p="sage"] { background: #2d7d55; }
        .lotse-app-wrapper .swatch[data-p="berry"] { background: #a33e69; }
        .lotse-app-wrapper .swatch[data-p="ocean"] { background: #167b91; }
        .lotse-app-wrapper .swatch[data-p="mono"] { background: #4a6475; }
        
        @media(max-width:1180px){
          .lotse-app-wrapper .metrics { grid-template-columns: repeat(2, 1fr); }
          .lotse-app-wrapper .grid3, .lotse-app-wrapper .lifegrid { grid-template-columns: repeat(2, 1fr); }
          .lotse-app-wrapper .hero { grid-template-columns: 1fr; }
          .lotse-app-wrapper .shieldvisual { display: none; }
          .lotse-app-wrapper .lettertools { grid-template-columns: 1fr; }
          .lotse-app-wrapper .board { flex-direction: column; }
        }
        @media(max-width:820px){
          .lotse-app-wrapper { --sidebar: 0px; }
          .lotse-app-wrapper .sidebar { transform: translateX(-100%); width: 278px; transition: .2s; }
          .lotse-app-wrapper .sidebar.open { transform: translateX(0); }
          .lotse-app-wrapper .shell { margin-left: 0; }
          .lotse-app-wrapper .mobilemenu { display: block; }
          .lotse-app-wrapper .topbar { padding: 10px 14px; }
          .lotse-app-wrapper .search { display: none; }
          .lotse-app-wrapper .main { padding: 24px 16px 60px; }
          .lotse-app-wrapper .hero { padding: 27px; }
          .lotse-app-wrapper .hero h1 { font-size: 41px; }
          .lotse-app-wrapper .head { align-items: flex-start; flex-direction: column; }
          .lotse-app-wrapper .head h1 { font-size: 35px; }
          .lotse-app-wrapper .grid2, .lotse-app-wrapper .grid3, .lotse-app-wrapper .quickgrid, .lotse-app-wrapper .lifegrid, .lotse-app-wrapper .formgrid { grid-template-columns: 1fr; }
          .lotse-app-wrapper .metrics { grid-template-columns: repeat(2, 1fr); }
          .lotse-app-wrapper .letterpaper { padding: 32px 25px; min-height: 600px; }
          .lotse-app-wrapper .modulehero { grid-template-columns: 1fr; }
          .lotse-app-wrapper .moduleicon { display: none; }
        }
      `}} />

      {/* Main app UI */}
      <div className="app">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="brand">
            <div className="brandmark">LL</div>
            <div>
              <strong>Lebenslagen-Lotse Pro</strong>
              <small>baokmedia© × Vorlagenbude©</small>
            </div>
          </div>
          
          <div className="navgroup">{t('navStart')}</div>
          <nav className="nav">
            <button className={`navbtn ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveView('dashboard'); setIsSidebarOpen(false); }}>
              <span className="navicon">⌂</span><span>{t('dashboard')}</span>
            </button>
            <button className={`navbtn ${activeView === 'lifecheck' ? 'active' : ''}`} onClick={() => { setActiveView('lifecheck'); setIsSidebarOpen(false); }}>
              <span className="navicon">✦</span><span>{t('lifecheck')}</span>
            </button>
            <button className={`navbtn ${activeView === 'cases' ? 'active' : ''}`} onClick={() => { setActiveView('cases'); setIsSidebarOpen(false); }}>
              <span className="navicon">▦</span><span>{t('cases')}</span>
            </button>
            <button className={`navbtn ${activeView === 'deadlines' ? 'active' : ''}`} onClick={() => { setActiveView('deadlines'); setIsSidebarOpen(false); }}>
              <span className="navicon">⚑</span><span>{t('deadlines')}</span>
            </button>
          </nav>

          <div className="navgroup">{t('navShield')}</div>
          <nav className="nav">
            {Object.entries(MODULE_DATA).map(([id, val]) => (
              <button key={id} className={`navbtn ${activeView === id ? 'active' : ''}`} onClick={() => { setActiveView(id); setIsSidebarOpen(false); }}>
                <span className="navicon">{val.icon}</span><span>{t(id)}</span>
              </button>
            ))}
          </nav>

          <div className="navgroup">{t('navWork')}</div>
          <nav className="nav">
            <button className={`navbtn ${activeView === 'documents' ? 'active' : ''}`} onClick={() => { setActiveView('documents'); setIsSidebarOpen(false); }}>
              <span className="navicon">▧</span><span>{t('documents')}</span>
            </button>
            <button className={`navbtn ${activeView === 'contacts' ? 'active' : ''}`} onClick={() => { setActiveView('contacts'); setIsSidebarOpen(false); }}>
              <span className="navicon">☏</span><span>{t('contacts')}</span>
            </button>
            <button className={`navbtn ${activeView === 'letters' ? 'active' : ''}`} onClick={() => { setActiveView('letters'); setIsSidebarOpen(false); }}>
              <span className="navicon">✎</span><span>{t('letters')}</span>
            </button>
            <button className={`navbtn ${activeView === 'chronicle' ? 'active' : ''}`} onClick={() => { setActiveView('chronicle'); setIsSidebarOpen(false); }}>
              <span className="navicon">⌛</span><span>{t('chronicle')}</span>
            </button>
            <button className={`navbtn ${activeView === 'sources' ? 'active' : ''}`} onClick={() => { setActiveView('sources'); setIsSidebarOpen(false); }}>
              <span className="navicon">✓</span><span>{t('sources')}</span>
            </button>
            <button className={`navbtn ${activeView === 'print' ? 'active' : ''}`} onClick={() => { setActiveView('print'); setIsSidebarOpen(false); }}>
              <span className="navicon">▣</span><span>{t('print')}</span>
            </button>
            <button className={`navbtn ${activeView === 'settings' ? 'active' : ''}`} onClick={() => { setActiveView('settings'); setIsSidebarOpen(false); }}>
              <span className="navicon">⚙</span><span>{t('settings')}</span>
            </button>
          </nav>

          <div className="sidefoot">
            <strong>100 % lokal</strong><br/>
            <span>{t('localNote')}</span>
          </div>
        </aside>

        {/* Outer content container */}
        <div className="shell">
          {/* Top Header */}
          <header className="topbar no-print">
            <button className="iconbtn mobilemenu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
            <div className="search">
              <span>⌕</span>
              <input value={searchQuery} onChange={e => handleSearchChange(e.target.value)} placeholder={t('search')} />
            </div>
            
            <div className="topactions">
              <button className="iconbtn" onClick={() => openModal('case')} title="Schnell erfassen">＋</button>
              <button className="iconbtn" onClick={toggleLang} title="Navigationssprache">{lang.toUpperCase()}</button>
              <button className="iconbtn" onClick={toggleTheme} title="Hell/Dunkel">◐</button>
              <button className="iconbtn desktoponly" onClick={() => setActiveView('settings')} title="Einstellungen">⚙</button>
            </div>
          </header>

          {/* Main page shell content */}
          <main className="main" style={{ position: 'relative' }}>
            
            {/* Paywall Master Pass Cover */}
            {!loadingUser && !isPro && activeView !== 'dashboard' && activeView !== 'sources' && activeView !== 'settings' && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg)', opacity: 0.98, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <div className="card" style={{ maxWidth: '560px', textAlign: 'center', padding: '40px', border: '1px solid var(--line)', borderRadius: '24px' }}>
                  <div style={{ fontSize: '50px', marginBottom: '14px' }}>🔒</div>
                  <h2 style={{ fontFamily: 'Georgia, serif' }}>Premium-Features gesperrt</h2>
                  <p className="muted" style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                    Der Lebenslagen-Lotse Pro ist ein Premium-Werkzeug der Vorlagenbude. Schalte alle Planer, Register und Vorlagen mit dem Master-Pass dauerhaft frei.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href={`https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01?client_reference_id=${userId}`} className="btn primary" style={{ textDecoration: 'none', textAlign: 'center' }}>
                      Jetzt Master-Pass sichern (19€)
                    </a>
                    <button className="btn" onClick={() => setActiveView('dashboard')}>Zurück zur Übersicht</button>
                  </div>
                </div>
              </div>
            )}

            {/* SEARCH SCREEN OVERRIDE */}
            {searchQuery.trim() !== '' && (
              <section className="view active">
                <div className="head">
                  <div>
                    <span className="eyebrow">Lokale Suche</span>
                    <h1>Ergebnisse für „{searchQuery}“</h1>
                    <p>{searchResults.length} Treffer in den lokalen Daten.</p>
                  </div>
                  <button className="btn" onClick={() => handleSearchChange('')}>Zurück</button>
                </div>
                <div className="stack">
                  {searchResults.length === 0 ? (
                    <div className="empty">Keine passenden Einträge gefunden.</div>
                  ) : (
                    searchResults.map((r, i) => (
                      <div key={i} className="card">
                        <span className="pill" style={{ marginBottom: '8px' }}>{r.group}</span>
                        <h3>{r.title}</h3>
                        <p className="muted" style={{ margin: 0 }}>{r.meta}</p>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {/* VIEW: DASHBOARD */}
            {searchQuery.trim() === '' && activeView === 'dashboard' && (
              <section className="view active">
                <div className="hero">
                  <div>
                    <div className="eyebrow">LEBENSLAGEN-LOTSE · 100 % LOKAL</div>
                    <h1>Ordnung, wenn das Leben kompliziert wird.</h1>
                    <p>Ein privates Bürger-Schutzschild für Fälle, Fristen, Unterlagen, Kontakte und beweisbare nächste Schritte – über Behörden- und Lebensbereiche hinweg.</p>
                    <div className="heroactions">
                      <button className="btn primary" onClick={() => setActiveView('lifecheck')}>✦ Lebenslage starten</button>
                      <button className="btn" onClick={() => openModal('case')}>＋ Fall anlegen</button>
                      <button className="btn" onClick={() => openModal('deadline')}>⚑ Frist sichern</button>
                    </div>
                  </div>
                  <div className="shieldvisual">
                    <div className="shield">LL<span>lokal · geordnet · beweisbar</span></div>
                  </div>
                </div>

                <div className="metrics">
                  <div className="metric">
                    <strong>{cases.length}</strong>
                    <span>Fälle gesamt</span>
                  </div>
                  <div className="metric">
                    <strong>{cases.filter(x => x.status !== 'erledigt').length}</strong>
                    <span>offene Fälle</span>
                  </div>
                  <div className="metric">
                    <strong>{deadlines.filter(x => x.status !== 'erledigt' && getDaysLeft(x.due) <= 14).length}</strong>
                    <span>Fristen ≤ 14 Tage</span>
                  </div>
                  <div className="metric">
                    <strong>{lifeTasks.length ? Math.round(lifeTasks.filter(x => x.done).length / lifeTasks.length * 100) : 0} %</strong>
                    <span>Lebenslagen-Plan</span>
                  </div>
                </div>

                <div className="grid2">
                  <div className="card">
                    <div className="row between">
                      <h2>Jetzt wichtig</h2>
                      <button className="btn small" onClick={() => setActiveView('deadlines')}>Alle Fristen</button>
                    </div>
                    {deadlines.filter(x => x.status !== 'erledigt' && getDaysLeft(x.due) <= 14).length === 0 ? (
                      <div className="empty">Noch keine dringenden Fristen.</div>
                    ) : (
                      <div className="timeline">
                        {deadlines.filter(x => x.status !== 'erledigt' && getDaysLeft(x.due) <= 14).slice(0, 5).map(x => (
                          <div key={x.id} className="timelineitem">
                            <div className="timelinebody">
                              <div className="itemtitle">{x.title}</div>
                              <div className="itemmeta">
                                <span>{formatDateStr(x.due)}</span>
                                <span>{cases.find(c => c.id === x.caseId)?.title || 'Ohne Fall'}</span>
                                <span className={`pill ${getDaysLeft(x.due) < 0 ? 'bad' : 'warn'}`}>
                                  {getDaysLeft(x.due) < 0 ? 'kritisch' : x.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="card">
                    <h2>Schnellzugriff</h2>
                    <div className="quickgrid">
                      {Object.entries(MODULE_DATA).slice(0, 6).map(([id, val]) => (
                        <button key={id} className="quick" onClick={() => setActiveView(id)}>
                          <b>{val.icon} {val.title.split(' ')[0]}</b>
                          <small>{val.sub.substring(0, 36)}...</small>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid2" style={{ marginTop: '16px' }}>
                  <div className="card">
                    <h2>Aktive Fälle</h2>
                    {cases.filter(x => x.status !== 'erledigt').length === 0 ? (
                      <div className="empty">Noch kein Fall angelegt.</div>
                    ) : (
                      <div className="stack">
                        {cases.filter(x => x.status !== 'erledigt').slice(0, 5).map(x => (
                          <div key={x.id} className="item">
                            <div className="row between">
                              <span className="itemtitle">{x.title}</span>
                              <span className="pill">{x.status}</span>
                            </div>
                            <div className="itemmeta">
                              <span>{MODULE_DATA[x.area]?.title || x.area}</span>
                              <span>{formatDateStr(x.updated || x.created)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="card">
                    <h2>Sicherer Ablauf</h2>
                    <div className="timeline">
                      <div className="timelineitem">
                        <div className="timelinebody">
                          <b>1 · Eingang sichern</b>
                          <div className="muted">Brief, Umschlag, Portalnachricht und tatsächlichen Zugang dokumentieren.</div>
                        </div>
                      </div>
                      <div className="timelineitem">
                        <div className="timelinebody">
                          <b>2 · Frist und Ziel trennen</b>
                          <div className="muted">Reaktionsfrist, Unterlagenfrist und persönliches Ziel getrennt festhalten.</div>
                        </div>
                      </div>
                      <div className="timelineitem">
                        <div className="timelinebody">
                          <b>3 · Nachweisbar handeln</b>
                          <div className="muted">Schreiben, Anlagen und Versandbeleg gemeinsam in der Chronik führen.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* VIEW: LIFE-EVENT CHECK */}
            {searchQuery.trim() === '' && activeView === 'lifecheck' && (
              <section className="view active">
                <div className="head">
                  <div>
                    <div className="eyebrow">GEFÜHRTE ORIENTIERUNG</div>
                    <h1>Was hat sich verändert?</h1>
                    <p>Wählen Sie eine oder mehrere Lebenslagen. Daraus entsteht eine editierbare Aufgabenroute – ohne automatische Anspruchsentscheidung.</p>
                  </div>
                </div>
                <div className="lifegrid">
                  {Object.entries(LIFE_EVENTS).map(([id, x]) => (
                    <div key={id} className="lifeoption">
                      <input type="checkbox" id={`life_${id}`} checked={lifeSelections.includes(id)} onChange={el => {
                        const checked = el.target.checked;
                        const next = checked ? [...lifeSelections, id] : lifeSelections.filter(v => v !== id);
                        setLifeSelections(next);
                      }} />
                      <label htmlFor={`life_${id}`}>
                        <span className="lifeicon">{x.icon}</span>
                        <b>{x.title}</b>
                        <small>{x.desc}</small>
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="row" style={{ margin: '18px 0' }}>
                  <button className="btn primary" onClick={handleBuildLifePlan}>Persönlichen Plan erzeugen</button>
                  <button className="btn" onClick={handleClearPlan}>Auswahl leeren</button>
                </div>

                <div className="grid2">
                  <div className="card">
                    <h2>Mein Aktionsplan</h2>
                    {lifeTasks.length === 0 ? (
                      <div className="empty">Wählen Sie oben passende Lebenslagen und erzeugen Sie den Plan.</div>
                    ) : (
                      <div className="tasklist">
                        {lifeTasks.map(t => (
                          <label key={t.id} className="taskrow">
                            <input type="checkbox" checked={t.done} onChange={() => toggleLifeTask(t.id)} />
                            <span>
                              <b style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</b>
                              <br/><small className="muted">{t.life}</small>
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="card">
                    <h2>Prüflogik</h2>
                    <div className="tasklist">
                      <div className="taskrow">
                        <span className="pill">1</span>
                        <span><b>Wer ist betroffen?</b><br/><small className="muted">Person, Haushalt, Kinder, Angehörige und Vertretungen.</small></span>
                      </div>
                      <div className="taskrow">
                        <span className="pill">2</span>
                        <span><b>Was läuft bereits?</b><br/><small class="muted">Leistungen, Verträge, Verfahren und bestehende Fristen.</small></span>
                      </div>
                      <div className="taskrow">
                        <span className="pill">3</span>
                        <span><b>Was muss bewiesen werden?</b><br/><small class="muted">Eingang, Tatsachen, Kosten, Einschränkungen oder Vereinbarungen.</small></span>
                      </div>
                      <div className="taskrow">
                        <span className="pill">4</span>
                        <span><b>Wo wird aktuell geprüft?</b><br/><small class="muted">Zuständige Stelle und amtliche Originalquelle festhalten.</small></span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* VIEW: CASES BOARD */}
            {searchQuery.trim() === '' && activeView === 'cases' && (
              <section className="view active">
                <div className="head">
                  <div>
                    <div className="eyebrow">FALLAKTE</div>
                    <h1>Meine Fälle</h1>
                    <p>Jeder Vorgang bekommt Ziel, Stelle, Kennung, Status und verknüpfte Nachweise.</p>
                  </div>
                  <div className="row">
                    <button className="btn primary" onClick={() => openModal('case')}>＋ Fall anlegen</button>
                  </div>
                </div>

                <div className="board">
                  {[['offen', 'Offen'], ['in_bearbeitung', 'In Bearbeitung'], ['wartet', 'Wartet'], ['erledigt', 'Erledigt']].map(([stVal, label]) => (
                    <div key={stVal} className="lane">
                      <div className="lanehead">
                        <span>{label}</span>
                        <span className="pill">{cases.filter(x => x.status === stVal).length}</span>
                      </div>
                      {cases.filter(x => x.status === stVal).map(x => (
                        <div key={x.id} className="casecard">
                          <div className="row between">
                            <h3>{x.title}</h3>
                            <span className={`pill ${x.priority === 'hoch' ? 'bad' : x.priority === 'mittel' ? 'warn' : ''}`}>{x.priority}</span>
                          </div>
                          <p>{x.goal || 'Kein Ziel notiert'}</p>
                          <div className="itemmeta">
                            <span>{MODULE_DATA[x.area]?.title || x.area}</span>
                            <span>{x.authority || 'Keine Stelle'}</span>
                          </div>
                          <div className="caseactions">
                            <button className="btn small" onClick={() => openModal('case', x.id)}>Bearbeiten</button>
                            <button className="btn small danger" onClick={() => handleDeleteItem('case', x.id)}>Löschen</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* VIEW: DEADLINES LIST */}
            {searchQuery.trim() === '' && activeView === 'deadlines' && (
              <section className="view active">
                <div className="head">
                  <div>
                    <div className="eyebrow">FRISTEN-SCHUTZSCHICHT</div>
                    <h1>Fristen-Zentrale</h1>
                    <p>Keine automatische Rechtsberechnung: Zugang, Belehrung, Fristtyp und eigenes Sicherheitsdatum getrennt dokumentieren.</p>
                  </div>
                  <button className="btn primary" onClick={() => openModal('deadline')}>⚑ Frist sichern</button>
                </div>

                <div className="grid3">
                  <div className="card">
                    <h3>Offen</h3>
                    <strong style={{ fontSize: '32px' }}>{deadlines.filter(x => x.status !== 'erledigt').length}</strong>
                  </div>
                  <div className="card">
                    <h3>In 14 Tagen</h3>
                    <strong style={{ fontSize: '32px', color: 'var(--warn)' }}>{deadlines.filter(x => x.status !== 'erledigt' && getDaysLeft(x.due) >= 0 && getDaysLeft(x.due) <= 14).length}</strong>
                  </div>
                  <div className="card">
                    <h3>Überfällig</h3>
                    <strong style={{ fontSize: '32px', color: 'var(--bad)' }}>{deadlines.filter(x => x.status !== 'erledigt' && getDaysLeft(x.due) < 0).length}</strong>
                  </div>
                </div>

                <div className="tablewrap" style={{ marginTop: '16px' }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Frist</th>
                        <th>Fällig</th>
                        <th>Fall</th>
                        <th>Grundlage/Notiz</th>
                        <th>Status</th>
                        <th>Aktion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deadlines.length === 0 ? (
                        <tr>
                          <td colSpan={6}><div className="empty">Noch keine Frist erfasst.</div></td>
                        </tr>
                      ) : (
                        deadlines.map(x => {
                          const dl = getDaysLeft(x.due);
                          return (
                            <tr key={x.id}>
                              <td>
                                <b>{x.title}</b>
                                <br/><small>{x.type || '—'}</small>
                              </td>
                              <td>
                                {formatDateStr(x.due)}
                                <br/>
                                <small className={dl < 0 ? 'pill bad' : 'muted'}>
                                  {dl < 0 ? `${Math.abs(dl)} Tage überfällig` : `${dl} Tage`}
                                </small>
                              </td>
                              <td>{cases.find(c => c.id === x.caseId)?.title || 'Ohne Fall'}</td>
                              <td>{x.note || '—'}</td>
                              <td>
                                <span className={`pill ${x.status === 'erledigt' ? 'good' : dl < 0 ? 'bad' : 'warn'}`}>{x.status}</span>
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                  <button className="btn small" onClick={() => openModal('deadline', x.id)}>Bearbeiten</button>
                                  <button className="btn small danger" onClick={() => handleDeleteItem('deadline', x.id)}>Löschen</button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="legalnote" style={{ marginTop: '16px' }}>
                  <b>Frist-Notfall:</b> Wenn das Ende unklar oder sehr nah ist, nicht auf die App verlassen. Rechtsbehelfsbelehrung und tatsächlichen Zugang prüfen und erforderlichenfalls sofort fachkundige Hilfe nutzen.
                </div>
              </section>
            )}

            {/* VIEW: MODULAR BÜRGER-SCHUTZSCHILD SUB-PAGES */}
            {searchQuery.trim() === '' && MODULE_DATA[activeView] && (
              <section className="view active">
                <div className="modulehero">
                  <div>
                    <div className="eyebrow">BÜRGER-SCHUTZSCHILD</div>
                    <h1 style={{ font: '800 40px/1.05 Georgia,serif', margin: '6px 0 8px', color: 'var(--ink)' }}>{MODULE_DATA[activeView].icon} {MODULE_DATA[activeView].title}</h1>
                    <p className="muted">{MODULE_DATA[activeView].sub}</p>
                    <div className="row" style={{ marginTop: '16px' }}>
                      <button className="btn primary" onClick={() => openModal('module', null, { module: activeView })}>＋ Vorgang erfassen</button>
                      <button className="btn" onClick={() => setActiveView('letters')}>✎ Schreiben erstellen</button>
                    </div>
                  </div>
                  <div className="moduleicon">{MODULE_DATA[activeView].icon}</div>
                </div>

                <div className="grid2">
                  <div className="card">
                    <h2>Sicherer Prüfpfad</h2>
                    <div className="tasklist">
                      {MODULE_DATA[activeView].actions.map((act, i) => {
                        const key = `${activeView}:${i}`;
                        return (
                          <label key={i} className="taskrow">
                            <input type="checkbox" checked={!!checkStates[key]} onChange={() => toggleCheckState(key)} />
                            <span>{act}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="card">
                    <div className="row between">
                      <h2>Meine Vorgänge</h2>
                      <span className="pill">{moduleItems.filter(x => x.module === activeView).length}</span>
                    </div>
                    {moduleItems.filter(x => x.module === activeView).length === 0 ? (
                      <div className="empty">Noch kein Vorgang in diesem Bereich.</div>
                    ) : (
                      <div className="stack">
                        {moduleItems.filter(x => x.module === activeView).map(x => (
                          <div key={x.id} className="item">
                            <div className="row between">
                              <span className="itemtitle">{x.title}</span>
                              <span className="pill">{x.status}</span>
                            </div>
                            <div className="itemmeta">
                              <span>{x.type}</span>
                              <span>{formatDateStr(x.date)}</span>
                              <span>{x.reference || 'ohne Kennung'}</span>
                            </div>
                            <p className="muted" style={{ fontSize: '13px', marginTop: '6px' }}>{x.note}</p>
                            <div className="row" style={{ marginTop: '8px' }}>
                              <button className="btn small" onClick={() => openModal('module', x.id)}>Bearbeiten</button>
                              <button className="btn small danger" onClick={() => handleDeleteItem('module', x.id)}>Löschen</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid3" style={{ marginTop: '16px' }}>
                  <div className="card">
                    <h3>Unterlagen</h3>
                    <p className="muted">Belege immer mit Datum, Herkunft, Bezug und Aufbewahrungsort erfassen.</p>
                    <button className="btn small" onClick={() => setActiveView('documents')}>Unterlagen öffnen</button>
                  </div>
                  <div className="card">
                    <h3>Kennung & Kontakt</h3>
                    <p className="muted">Mehrere Behörden und Kundennummern getrennt speichern.</p>
                    <button className="btn small" onClick={() => setActiveView('contacts')}>Kontakte öffnen</button>
                  </div>
                  <div className="card">
                    <h3>Rechtsstand</h3>
                    <p className="muted">Vor entscheidenden Schritten Originalquelle und örtliche Zuständigkeit prüfen.</p>
                    <button className="btn small" onClick={() => setActiveView('sources')}>Quellen öffnen</button>
                  </div>
                </div>
              </section>
            )}

            {/* VIEW: DOCUMENTS REGISTER */}
            {searchQuery.trim() === '' && activeView === 'documents' && (
              <section className="view active">
                <div className="head">
                  <div>
                    <div className="eyebrow">NACHWEIS-REGISTER</div>
                    <h1>Unterlagen</h1>
                    <p>Die App speichert Metadaten und Aufbewahrungsorte – keine Dokumentdateien werden hochgeladen.</p>
                  </div>
                  <button className="btn primary" onClick={() => openModal('document')}>＋ Unterlage erfassen</button>
                </div>

                <div className="tablewrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Dokument</th>
                        <th>Kategorie</th>
                        <th>Fall</th>
                        <th>Datum</th>
                        <th>Aufbewahrung</th>
                        <th>Aktion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.length === 0 ? (
                        <tr>
                          <td colSpan={6}><div className="empty">Noch keine Unterlagen erfasst.</div></td>
                        </tr>
                      ) : (
                        documents.map(x => (
                          <tr key={x.id}>
                            <td>
                              <b>{x.title}</b>
                              <br/><small>{x.note || ''}</small>
                            </td>
                            <td>{x.category || '—'}</td>
                            <td>{cases.find(c => c.id === x.caseId)?.title || 'Ohne Fall'}</td>
                            <td>{formatDateStr(x.date)}</td>
                            <td>{x.location || '—'}</td>
                            <td>
                              <div style={{ display: 'flex', gap: '4px' }}>
                                <button className="btn small" onClick={() => openModal('document', x.id)}>Bearbeiten</button>
                                <button className="btn small danger" onClick={() => handleDeleteItem('document', x.id)}>Löschen</button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* VIEW: CONTACTS & IDENTIFIERS */}
            {searchQuery.trim() === '' && activeView === 'contacts' && (
              <section className="view active">
                <div className="head">
                  <div>
                    <div className="eyebrow">MEHRERE STELLEN · MEHRERE KENNUNGEN</div>
                    <h1>Kontakte & Kennungen</h1>
                    <p>Kundennummern gehören zur jeweiligen Behörde oder Organisation – nicht pauschal zur Person.</p>
                  </div>
                  <button className="btn primary" onClick={() => openModal('contact')}>＋ Kontakt anlegen</button>
                </div>

                <div className="grid3">
                  {contacts.length === 0 ? (
                    <div className="empty" style={{ gridColumn: '1/-1' }}>Noch keine Stellen oder Kennungen gespeichert.</div>
                  ) : (
                    contacts.map(x => (
                      <div key={x.id} className="card">
                        <div className="row between">
                          <span className="pill">{x.kind || 'Stelle'}</span>
                          <button className="btn small danger" onClick={() => handleDeleteItem('contact', x.id)}>×</button>
                        </div>
                        <h3>{x.name}</h3>
                        <p className="muted">{x.department || ''}</p>
                        <div className="stack" style={{ fontSize: '13px', gap: '8px', borderTop: '1px solid var(--line)', paddingTop: '10px', marginTop: '10px' }}>
                          <div>
                            <small className="muted" style={{ display: 'block', fontSize: '10px' }}>Akten-/Kundennummer</small>
                            <b>{x.reference || '–'}</b>
                          </div>
                          <div>
                            <small className="muted" style={{ display: 'block', fontSize: '10px' }}>Kontakt</small>
                            {x.phone || '–'}<br/>{x.email || ''}
                          </div>
                          <div>
                            <small className="muted" style={{ display: 'block', fontSize: '10px' }}>Adresse / Portal</small>
                            <span style={{ whiteSpace: 'pre-wrap' }}>{x.address || '–'}</span>
                          </div>
                        </div>
                        <button className="btn small" style={{ marginTop: '12px', width: '100%' }} onClick={() => openModal('contact', x.id)}>Bearbeiten</button>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {/* VIEW: LETTER WORKSHOP */}
            {searchQuery.trim() === '' && activeView === 'letters' && (
              <section className="view active">
                <div className="head">
                  <div>
                    <div className="eyebrow">SCHREIBEN-WERKSTATT</div>
                    <h1>Kontrolliert formulieren</h1>
                    <p>Vorlage auswählen, personalisieren, prüfen und anschließend drucken oder als PDF sichern.</p>
                  </div>
                  <div className="row">
                    <button className="btn" onClick={() => {
                      navigator.clipboard.writeText(letterText);
                      alert('Brief in Zwischenablage kopiert.');
                    }}>Kopieren</button>
                    <button className="btn primary" onClick={handleSaveLetterText}>Schreiben speichern</button>
                  </div>
                </div>

                <div className="lettertools">
                  <div className="card">
                    <label className="field">
                      <span>Fallzuordnung</span>
                      <select value={activeCase} onChange={e => {
                        setActiveCase(e.target.value);
                        saveState({ activeCase: e.target.value });
                      }}>
                        <option value="">Ohne Fall</option>
                        {cases.map(x => (
                          <option key={x.id} value={x.id}>{x.title}</option>
                        ))}
                      </select>
                    </label>
                    <h3 style={{ marginTop: '18px' }}>Vorlagen</h3>
                    <div className="stack" style={{ maxHeight: '420px', overflowY: 'auto', gap: '6px' }}>
                      {TEMPLATES.map(x => (
                        <button key={x.id} className={`templatebtn ${x.id === selectedTemplateId ? 'active' : ''}`} onClick={() => setSelectedTemplateId(x.id)}>
                          <b>{x.title}</b>
                          <br/><small style={{ opacity: 0.85, fontSize: '11px' }}>{x.subject}</small>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <textarea value={letterText} onChange={e => setLetterText(e.target.value)} className="letterpaper" style={{ width: '100%', resize: 'vertical' }}></textarea>
                  </div>
                </div>
              </section>
            )}

            {/* VIEW: CHRONICLE */}
            {searchQuery.trim() === '' && activeView === 'chronicle' && (
              <section className="view active">
                <div className="head">
                  <div>
                    <div className="eyebrow">BEWEISBARE KOMMUNIKATION</div>
                    <h1>Kontakt-Chronik</h1>
                    <p>Telefonate, Portalnachrichten, Briefe, persönliche Gespräche und Versandnachweise erfassen.</p>
                  </div>
                  <button className="btn primary" onClick={() => openModal('chronicle')}>＋ Kontakt protokollieren</button>
                </div>

                <div className="timeline">
                  {chronicle.length === 0 ? (
                    <div className="empty">Noch kein Kontakt protokolliert.</div>
                  ) : (
                    chronicle.map(x => (
                      <div key={x.id} className="timelineitem">
                        <div className="timelinebody">
                          <div className="row between">
                            <span className="itemtitle">{x.subject}</span>
                            <span className="pill">{x.channel}</span>
                          </div>
                          <div className="itemmeta">
                            <span>{formatDateStr(x.date)} {x.time || ''}</span>
                            <span>{cases.find(c => c.id === x.caseId)?.title || 'Ohne Fall'}</span>
                            <span>{x.person || ''}</span>
                          </div>
                          <p style={{ marginTop: '6px', fontSize: '13px' }}>{x.result}</p>
                          <div className="row" style={{ marginTop: '10px' }}>
                            <button className="btn small" onClick={() => openModal('chronicle', x.id)}>Bearbeiten</button>
                            <button className="btn small danger" onClick={() => handleDeleteItem('chronicle', x.id)}>Löschen</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {/* VIEW: SOURCES */}
            {searchQuery.trim() === '' && activeView === 'sources' && (
              <section className="view active">
                <div className="head">
                  <div>
                    <div className="eyebrow">ORIGINAL VOR ZUSAMMENFASSUNG</div>
                    <h1>Amtliche Quellen</h1>
                    <p>Stand der redaktionellen Grundauswahl: 2. August 2026. Links dienen zur aktuellen Eigenprüfung und benötigen beim Öffnen Internet.</p>
                  </div>
                </div>

                <div className="stack">
                  {SOURCES.map((s, i) => (
                    <div key={i} className="card sourcecard">
                      <div className="sourceicon">✓</div>
                      <div>
                        <span className="pill">{s.area}</span>
                        <h3>{s.name}</h3>
                        <p className="muted" style={{ fontSize: '13px' }}>{s.note}</p>
                      </div>
                      <a className="btn" href={s.url} target="_blank" rel="noopener noreferrer">Original öffnen</a>
                    </div>
                  ))}
                </div>

                <div className="legalnote" style={{ marginTop: '16px' }}>
                  Quellen können umziehen oder sich ändern. Für Landesrecht, kommunale Satzungen, Versicherungsbedingungen und den Einzelfall zusätzlich die zuständige Originalstelle prüfen.
                </div>
              </section>
            )}

            {/* VIEW: PRINT & PDF */}
            {searchQuery.trim() === '' && activeView === 'print' && (
              <section className="view active">
                <div className="head">
                  <div>
                    <div className="eyebrow">DRUCKZENTRALE</div>
                    <h1>Druck & PDF</h1>
                    <p>Im Browser-Druckdialog „Als PDF sichern“ wählen. Vorher Inhalte und personenbezogene Angaben kontrollieren.</p>
                  </div>
                  <button className="btn primary" onClick={() => window.print()}>Drucken / PDF</button>
                </div>

                <div className="grid3">
                  <button className="card" onClick={() => { setActiveView('dashboard'); setTimeout(() => window.print(), 100); }} style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                    <h3>Fallübersicht</h3>
                    <p className="muted">Kennzahlen und offene Fälle.</p>
                  </button>
                  <button className="card" onClick={() => { setActiveView('deadlines'); setTimeout(() => window.print(), 100); }} style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                    <h3>Fristenliste</h3>
                    <p className="muted">Fälligkeiten und Status.</p>
                  </button>
                  <button className="card" onClick={() => { setActiveView('letters'); setTimeout(() => window.print(), 100); }} style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                    <h3>Aktuelles Schreiben</h3>
                    <p className="muted">Briefansicht ohne Navigation.</p>
                  </button>
                </div>

                <div className="card" style={{ marginTop: '16px' }}>
                  <h2>Gespeicherte Schreiben</h2>
                  {letters.length === 0 ? (
                    <div className="empty">Noch kein Schreiben gespeichert.</div>
                  ) : (
                    <div className="stack">
                      {letters.map(x => (
                        <div key={x.id} className="item">
                          <div className="row between">
                            <b>{x.title}</b>
                            <span>{formatDateStr(x.date)}</span>
                          </div>
                          <div style={{ marginTop: '8px' }}>
                            <button className="btn small" onClick={() => {
                              setSelectedTemplateId(TEMPLATES[0].id);
                              setActiveView('letters');
                              setTimeout(() => { setLetterText(x.text); }, 10);
                            }}>In Werkstatt öffnen</button>
                            <button className="btn small danger" style={{ marginLeft: '6px' }} onClick={() => handleDeleteItem('letter', x.id)}>Löschen</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* VIEW: SETTINGS */}
            {searchQuery.trim() === '' && activeView === 'settings' && (
              <section className="view active">
                <div className="head">
                  <div>
                    <div className="eyebrow">LOKAL & SELBSTBESTIMMT</div>
                    <h1>Einstellungen</h1>
                    <p>Persönliche Angaben werden nur für Schreiben verwendet und bleiben in diesem Browserprofil.</p>
                  </div>
                </div>

                <div className="grid2">
                  <div className="card">
                    <h2>Persönliche Angaben</h2>
                    <form onSubmit={handleSaveProfile} className="formgrid">
                      <div className="field wide">
                        <label>Name</label>
                        <input value={person.name} onChange={e => setPerson({ ...person, name: e.target.value })} />
                      </div>
                      <div className="field wide">
                        <label>Straße</label>
                        <input value={person.street} onChange={e => setPerson({ ...person, street: e.target.value })} />
                      </div>
                      <div className="field wide">
                        <label>PLZ und Ort</label>
                        <input value={person.city} onChange={e => setPerson({ ...person, city: e.target.value })} />
                      </div>
                      <div className="field">
                        <label>E-Mail</label>
                        <input type="email" value={person.email} onChange={e => setPerson({ ...person, email: e.target.value })} />
                      </div>
                      <div className="field">
                        <label>Telefon</label>
                        <input value={person.phone} onChange={e => setPerson({ ...person, phone: e.target.value })} />
                      </div>
                      <div className="field wide">
                        <button type="submit" className="btn primary">Angaben speichern</button>
                      </div>
                    </form>
                  </div>

                  <div className="card">
                    <h2>Darstellung</h2>
                    <div className="settingrow">
                      <div>
                        <b>Farbwelt</b><br/><small className="muted">Live umschalten</small>
                      </div>
                      <div className="swatches">
                        {['civic', 'sand', 'sage', 'berry', 'ocean', 'mono'].map(p => (
                          <button key={p} className="swatch" data-p={p} onClick={() => changePalette(p)} title={p} aria-label={`Farbwelt ${p}`}></button>
                        ))}
                      </div>
                    </div>
                    <div className="settingrow">
                      <div>
                        <b>Dark Mode</b><br/><small className="muted">Getrennt von der Farbwelt</small>
                      </div>
                      <button className="btn" onClick={toggleTheme}>
                        {theme === 'dark' ? 'Dunkel aktiv' : 'Hell aktiv'}
                      </button>
                    </div>
                    <div className="settingrow">
                      <div>
                        <b>Navigationssprache</b><br/><small className="muted">Menüführung DE/EN</small>
                      </div>
                      <button className="btn" onClick={toggleLang}>
                        {lang.toUpperCase()}
                      </button>
                    </div>
                  </div>

                  <div className="card">
                    <h2>Backup & Daten</h2>
                    <div className="stack">
                      <button className="btn primary" onClick={() => {
                        const dataBlob = new Blob([JSON.stringify({
                          person, lifeSelections, lifeTasks, cases, deadlines, documents, contacts, chronicle, letters, moduleItems, checkStates, activeCase,
                          meta: { theme, palette, lang, terms: termsAccepted, pinHash, locked: isLocked }
                        }, null, 2)], { type: 'application/json' });
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(dataBlob);
                        a.download = `Vorlagenbude-Lebenslagen-Lotse-Backup-${new Date().toISOString().split('T')[0]}.json`;
                        a.click();
                      }}>JSON-Backup exportieren</button>

                      <label className="btn" style={{ textAlign: 'center', cursor: 'pointer' }}>
                        Backup importieren
                        <input type="file" accept="application/json" hidden onChange={async e => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const parsed = JSON.parse(await file.text());
                            if (!window.confirm('Lokale Daten mit Backup überschreiben?')) return;
                            if (parsed.person) setPerson(parsed.person);
                            if (parsed.lifeSelections) setLifeSelections(parsed.lifeSelections);
                            if (parsed.lifeTasks) setLifeTasks(parsed.lifeTasks);
                            if (parsed.cases) setCases(parsed.cases);
                            if (parsed.deadlines) setDeadlines(parsed.deadlines);
                            if (parsed.documents) setDocuments(parsed.documents);
                            if (parsed.contacts) setContacts(parsed.contacts);
                            if (parsed.chronicle) setChronicle(parsed.chronicle);
                            if (parsed.letters) setLetters(parsed.letters);
                            if (parsed.moduleItems) setModuleItems(parsed.moduleItems);
                            if (parsed.checkStates) setCheckStates(parsed.checkStates);
                            if (parsed.activeCase) setActiveCase(parsed.activeCase);
                            if (parsed.meta) {
                              if (parsed.meta.theme) setTheme(parsed.meta.theme);
                              if (parsed.meta.palette) setPalette(parsed.meta.palette);
                              if (parsed.meta.lang) setLang(parsed.meta.lang);
                              if (parsed.meta.terms !== undefined) setTermsAccepted(parsed.meta.terms);
                            }
                            alert('Backup erfolgreich importiert!');
                          } catch (err) {
                            alert('Ungültiges Backup-Format.');
                          }
                        }} />
                      </label>

                      <button className="btn danger" onClick={() => {
                        if (window.confirm('Alle lokalen Daten unwiderruflich löschen?')) {
                          localStorage.removeItem('vorlagenbude_lebenslagen_lotse_v1');
                          setPerson({ name: '', street: '', city: '', email: '', phone: '' });
                          setLifeSelections([]);
                          setLifeTasks([]);
                          setCases([]);
                          setDeadlines([]);
                          setDocuments([]);
                          setContacts([]);
                          setChronicle([]);
                          setLetters([]);
                          setModuleItems([]);
                          setCheckStates({});
                          setActiveCase('');
                          setShowTermsModal(true);
                          setTermsAccepted(false);
                          alert('Alle Daten zurückgesetzt.');
                        }
                      }}>Alle lokalen Daten löschen</button>
                    </div>
                  </div>

                  <div className="card">
                    <h2>Lokale PIN-Sperre</h2>
                    <div className="field">
                      <label>Neue PIN (4–12 Zeichen)</label>
                      <input id="newPinInput" type="password" maxLength={12} inputMode="numeric" />
                    </div>
                    <div className="row" style={{ marginTop: '12px' }}>
                      <button className="btn primary" onClick={handleSetPin}>PIN setzen</button>
                      <button className="btn" onClick={handleRemovePin}>PIN entfernen</button>
                    </div>
                    <p className="muted" style={{ fontSize: '12px', marginTop: '10px' }}>Komfortsperre, keine Verschlüsselung. Schützt die Oberfläche bei Abwesenheit am Gerät.</p>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* 1:1 DYNAMIC FORM ENTRY MODAL */}
      {isModalOpen && (
        <div className="modal open">
          <div className="modalbox">
            <div className="modalhead">
              <h2>{modalEditId ? 'Eintrag bearbeiten' : 'Neuer Eintrag'}</h2>
              <button className="close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleModalSave}>
              {/* Form Render based on Modal Type */}
              {modalType === 'case' && (
                <div className="formgrid">
                  <div className="field wide">
                    <label>Titel des Falls</label>
                    <input type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                  </div>
                  <div className="field">
                    <label>Lebensbereich</label>
                    <select value={formData.area || 'housing'} onChange={e => setFormData({ ...formData, area: e.target.value })}>
                      {Object.entries(MODULE_DATA).map(([k, v]) => (
                        <option key={k} value={k}>{v.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>Priorität</label>
                    <select value={formData.priority || 'mittel'} onChange={e => setFormData({ ...formData, priority: e.target.value })}>
                      <option value="niedrig">Niedrig</option>
                      <option value="mittel">Mittel</option>
                      <option value="hoch">Hoch</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Status</label>
                    <select value={formData.status || 'offen'} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                      <option value="offen">Offen</option>
                      <option value="in_bearbeitung">In Bearbeitung</option>
                      <option value="wartet">Wartet</option>
                      <option value="erledigt">Erledigt</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Behörde / Organisation (Freitext)</label>
                    <input type="text" value={formData.authority || ''} onChange={e => setFormData({ ...formData, authority: e.target.value })} />
                  </div>
                  <div className="field wide">
                    <label>Gespeicherte Stelle mit Kennung</label>
                    <select value={formData.contactId || ''} onChange={e => setFormData({ ...formData, contactId: e.target.value })}>
                      <option value="">Keine verknüpfte Stelle</option>
                      {contacts.map(c => (
                        <option key={c.id} value={c.id}>{c.name} {c.reference ? `· ${c.reference}` : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field wide">
                    <label>Ziel des Falls</label>
                    <textarea value={formData.goal || ''} onChange={e => setFormData({ ...formData, goal: e.target.value })}></textarea>
                  </div>
                  <div className="field wide">
                    <label>Notizen</label>
                    <textarea value={formData.note || ''} onChange={e => setFormData({ ...formData, note: e.target.value })}></textarea>
                  </div>
                </div>
              )}

              {modalType === 'deadline' && (
                <div className="formgrid">
                  <div className="field wide">
                    <label>Bezeichnung der Frist</label>
                    <input type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                  </div>
                  <div className="field">
                    <label>Fälligkeitsdatum</label>
                    <input type="date" value={formData.due || ''} onChange={e => setFormData({ ...formData, due: e.target.value })} required />
                  </div>
                  <div className="field">
                    <label>Tatsächlicher Zugang</label>
                    <input type="date" value={formData.access || ''} onChange={e => setFormData({ ...formData, access: e.target.value })} />
                  </div>
                  <div className="field wide">
                    <label>Zugeordneter Fall</label>
                    <select value={formData.caseId || ''} onChange={e => setFormData({ ...formData, caseId: e.target.value })}>
                      <option value="">Ohne Fallzuordnung</option>
                      {cases.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field wide">
                    <label>Fristtyp / Quelle</label>
                    <input type="text" value={formData.type || ''} onChange={e => setFormData({ ...formData, type: e.target.value })} placeholder="Widerspruch Bescheid, etc." />
                  </div>
                  <div className="field">
                    <label>Status</label>
                    <select value={formData.status || 'offen'} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                      <option value="offen">Offen</option>
                      <option value="in_bearbeitung">In Bearbeitung</option>
                      <option value="erledigt">Erledigt</option>
                    </select>
                  </div>
                  <div className="field wide">
                    <label>Belehrung, Sicherheitsdatum, Notiz</label>
                    <textarea value={formData.note || ''} onChange={e => setFormData({ ...formData, note: e.target.value })}></textarea>
                  </div>
                </div>
              )}

              {modalType === 'document' && (
                <div className="formgrid">
                  <div className="field wide">
                    <label>Dokumentenbezeichnung</label>
                    <input type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                  </div>
                  <div className="field">
                    <label>Kategorie</label>
                    <input type="text" value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>Dokumenten-Datum</label>
                    <input type="date" value={formData.date || ''} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                  </div>
                  <div className="field wide">
                    <label>Zugeordneter Fall</label>
                    <select value={formData.caseId || ''} onChange={e => setFormData({ ...formData, caseId: e.target.value })}>
                      <option value="">Ohne Fallzuordnung</option>
                      {cases.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field wide">
                    <label>Aufbewahrungsort</label>
                    <input type="text" value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="Ordner Blau, Regal, etc." />
                  </div>
                  <div className="field wide">
                    <label>Inhalt / Prüfhinweis</label>
                    <textarea value={formData.note || ''} onChange={e => setFormData({ ...formData, note: e.target.value })}></textarea>
                  </div>
                </div>
              )}

              {modalType === 'contact' && (
                <div className="formgrid">
                  <div className="field wide">
                    <label>Behörden- & Plattform-Presets</label>
                    <select onChange={ev => {
                      const p = PLATFORM_PRESETS[ev.target.value];
                      if (p) {
                        setFormData({ ...formData, name: p.name, department: p.dept, address: p.addr });
                      }
                    }}>
                      <option value="">-- Preset wählen (Optional) --</option>
                      <option value="google">Google Ireland</option>
                      <option value="meta">Meta Platforms (Facebook)</option>
                      <option value="tiktok">TikTok Technology</option>
                    </select>
                  </div>
                  <div className="field wide">
                    <label>Behörde / Organisation / Person</label>
                    <input type="text" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="field">
                    <label>Art</label>
                    <select value={formData.kind || 'Behörde'} onChange={e => setFormData({ ...formData, kind: e.target.value })}>
                      {['Behörde', 'Versicherung', 'Vermieter', 'Schule/Kita', 'Arzt/Klinik', 'Beratung', 'Sonstige'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>Abteilung / Ansprechpartner</label>
                    <input type="text" value={formData.department || ''} onChange={e => setFormData({ ...formData, department: e.target.value })} />
                  </div>
                  <div className="field wide">
                    <label>Akten- / Kunden- / Schadennummer</label>
                    <input type="text" value={formData.reference || ''} onChange={e => setFormData({ ...formData, reference: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>Telefon</label>
                    <input type="text" value={formData.phone || ''} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>E-Mail</label>
                    <input type="email" value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="field wide">
                    <label>Anschrift / Portal-Link</label>
                    <textarea value={formData.address || ''} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                  </div>
                </div>
              )}

              {modalType === 'chronicle' && (
                <div className="formgrid">
                  <div className="field wide">
                    <label>Betreff des Vorgangs</label>
                    <input type="text" value={formData.subject || ''} onChange={e => setFormData({ ...formData, subject: e.target.value })} required />
                  </div>
                  <div className="field">
                    <label>Datum</label>
                    <input type="date" value={formData.date || ''} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                  </div>
                  <div className="field">
                    <label>Uhrzeit</label>
                    <input type="time" value={formData.time || ''} onChange={e => setFormData({ ...formData, time: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>Kanal</label>
                    <select value={formData.channel || 'Telefon'} onChange={e => setFormData({ ...formData, channel: e.target.value })}>
                      {['Telefon', 'Portal', 'E-Mail', 'Brief', 'Persönlich', 'Einschreiben', 'Fax'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>Gesprächspartner / Empfänger</label>
                    <input type="text" value={formData.person || ''} onChange={e => setFormData({ ...formData, person: e.target.value })} />
                  </div>
                  <div className="field wide">
                    <label>Zugeordneter Fall</label>
                    <select value={formData.caseId || ''} onChange={e => setFormData({ ...formData, caseId: e.target.value })}>
                      <option value="">Ohne Fallzuordnung</option>
                      {cases.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field wide">
                    <label>Inhalt, Ergebnis, Versandnachweis</label>
                    <textarea value={formData.result || ''} onChange={e => setFormData({ ...formData, result: e.target.value })}></textarea>
                  </div>
                </div>
              )}

              {modalType === 'module' && (
                <div className="formgrid">
                  <div className="field wide">
                    <label>Bezeichnung</label>
                    <input type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                  </div>
                  <div className="field">
                    <label>Art</label>
                    <select value={formData.type || ''} onChange={e => setFormData({ ...formData, type: e.target.value })} required>
                      <option value="">-- Auswählen --</option>
                      {MODULE_DATA[formData.module]?.types.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>Datum</label>
                    <input type="date" value={formData.date || ''} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                  </div>
                  <div className="field">
                    <label>Status</label>
                    <select value={formData.status || 'offen'} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                      <option value="offen">Offen</option>
                      <option value="in_bearbeitung">In Bearbeitung</option>
                      <option value="wartet">Wartet</option>
                      <option value="erledigt">Erledigt</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Kennung / Aktenzeichen</label>
                    <input type="text" value={formData.reference || ''} onChange={e => setFormData({ ...formData, reference: e.target.value })} />
                  </div>
                  <div className="field wide">
                    <label>Sachstand und nächste Schritte</label>
                    <textarea value={formData.note || ''} onChange={e => setFormData({ ...formData, note: e.target.value })}></textarea>
                  </div>
                </div>
              )}

              <div className="row" style={{ justifyContent: 'flex-end', marginTop: '18px' }}>
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Abbrechen</button>
                <button type="submit" className="btn primary" style={{ marginLeft: '8px' }}>Speichern</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1:1 TERMS ONBOARDING SCREEN */}
      {showTermsModal && !termsAccepted && (
        <div className="onboard open">
          <div className="oncard">
            <div className="brandmark" style={{ margin: '0 auto 16px auto' }}>LL</div>
            <div className="eyebrow" style={{ textAlign: 'center' }}>BAOKMEDIA© × VORLAGENBUDE©</div>
            <h1 style={{ font: '800 40px/1 Georgia,serif', margin: '10px 0', textAlign: 'center', color: '#10243f' }}>Ihr Bürger-Schutzschild.</h1>
            <p style={{ color: '#667287', textAlign: 'center', marginBottom: '20px' }}>Der Lebenslagen-Lotse ordnet Fälle, Unterlagen, Kontakte und nächste Schritte. Alle Angaben bleiben ausschließlich in diesem Browser.</p>
            <div className="legalnote">
              <strong>Wichtiger Hinweis</strong><br/>
              Private Organisations- und Formulierungshilfe. Keine Rechts-, Steuer-, Medizin-, Versicherungs- oder Sozialberatung. Fristen, Ansprüche, Zuständigkeiten und Formulare immer am Originalbescheid und bei der zuständigen Stelle prüfen.
            </div>
            <label className="checkline" style={{ margin: '18px 0', display: 'flex' }}>
              <input type="checkbox" id="termsCheck" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} />
              <span style={{ fontSize: '13px' }}>Ich habe den Hinweis gelesen und prüfe entscheidende Angaben anhand aktueller amtlicher Quellen.</span>
            </label>
            <button className="btn primary" style={{ width: '100%' }} disabled={!termsAccepted} onClick={() => {
              saveState({ terms: true });
              setShowTermsModal(false);
            }}>App sicher starten</button>
          </div>
        </div>
      )}

      {/* 1:1 LOCK SCREEN */}
      {pinHash && isLocked && (
        <div className="lockscreen open">
          <div className="lockcard" style={{ background: 'var(--paper)', border: '1px solid var(--line)' }}>
            <div className="brandmark" style={{ margin: '0 auto 16px auto' }}>LL</div>
            <h2 style={{ textAlign: 'center', margin: 0, fontFamily: 'Georgia, serif' }}>Lokaler Schutz</h2>
            <p className="muted" style={{ textAlign: 'center', fontSize: '14px', marginBottom: '16px' }}>PIN eingeben, um Ihre Akte zu öffnen.</p>
            <div className="field">
              <input type="password" value={enteredPin} onChange={e => setEnteredPin(e.target.value)} maxLength={12} placeholder="PIN" style={{ textAlign: 'center', fontSize: '20px', letterSpacing: '4px' }} />
            </div>
            <button className="btn primary" style={{ width: '100%', marginTop: '12px' }} onClick={handleUnlock}>Entsperren</button>
          </div>
        </div>
      )}
    </div>
  );
}
