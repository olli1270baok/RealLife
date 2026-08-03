"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

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
      "Gerichtliche Post niemals als normales Inkassochemikalie behandeln"
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
    tasks: ["Versicherungsverlauf and Rentenantrag prüfen", "Krankenversicherung und Zusatzleistungen klären", "Wohngeld oder Grundsicherung orientierend prüfen", "Vorsorgeunterlagen aktualisieren"]
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
  { id: "appointment", title: "Gespräch bestätigen", subject: "Bestätigung unseres Gesprächs vom [DATUM]", body: "zur Dokumentation fasse ich unser Gespräch vom [DATUM] wie folgt zusammen:\n\n[GESPRÄCHSINHALT]\n\nAls nächste Schritte wurden vereinbart: [NÄCHSTE SCHRITTE]. Falls diese Zusammenfassung nicht zutrifft, bitte ich um kurzfristige Korrektur.\n\nMit freundlichen Grüßen" }
];

export default function LebenslagenLotse() {
  const router = useRouter();

  // Auth & Premium states
  const [userId, setUserId] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // App Navigation View
  const [activeView, setActiveView] = useState('dashboard');

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
  
  // Modals Form Data
  const [formData, setFormData] = useState<any>({});

  // Ireland Address preset list
  const PLATFORM_PRESETS: Record<string, { name: string; dept: string; addr: string; ref: string }> = {
    google: { name: 'Google Ireland Limited', dept: 'Datenschutzabteilung', addr: 'Gordon House, Barrow Street\nDublin 4, Irland', ref: '' },
    meta: { name: 'Meta Platforms Ireland Limited', dept: 'Datenschutzabteilung', addr: '4 Grand Canal Square, Grand Canal Harbour\nDublin 2, Irland', ref: '' },
    tiktok: { name: 'TikTok Technology Limited', dept: 'Datenschutzabteilung', addr: '10 Earlsfort Terrace\nDublin, D02 T380, Irland', ref: '' }
  };

  const applyPlatformPreset = (key: string) => {
    const p = PLATFORM_PRESETS[key];
    if (!p) return;
    setFormData({
      ...formData,
      name: p.name,
      department: p.dept,
      address: p.addr
    });
  };

  // Mount effects
  useEffect(() => {
    document.body.className = 'theme-lotse';

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
        const parsed = JSON.parse(raw);
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
      }
    } catch (e) {
      console.error("Failed to load local storage", e);
    }

    return () => {
      document.body.className = '';
    };
  }, [router]);

  // Sync to local storage
  const saveState = (updates: Partial<{
    person: any; lifeSelections: any; lifeTasks: any; cases: any; deadlines: any;
    documents: any; contacts: any; chronicle: any; letters: any; moduleItems: any;
    checkStates: any; activeCase: any;
  }>) => {
    try {
      const current = {
        version: 1,
        meta: { lang: "de", theme: "light", palette: "civic", terms: true, termsAt: new Date().toISOString() },
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

  // Build current letter content
  useEffect(() => {
    if (activeView === 'letters') {
      const t = TEMPLATES.find(x => x.id === selectedTemplateId) || TEMPLATES[0];
      const selectedCaseObj = cases.find(x => x.id === activeCase);
      const contactObj = contacts.find(x => x.id === selectedCaseObj?.contactId);

      const senderStr = [person.name, person.street, person.city, person.email, person.phone].filter(Boolean).join('\n');
      const recipientStr = contactObj 
        ? [contactObj.name, contactObj.department, contactObj.address].filter(Boolean).join('\n')
        : "[Empfänger / Behörde]\n[Anschrift]";

      const refStr = contactObj?.reference ? `Akten-/Kundennummer: ${contactObj.reference}\n` : '';
      const dateStr = `Datum: ${new Date().toLocaleDateString('de-DE')}`;

      const text = `${senderStr || '[Vor- und Nachname]\n[Anschrift]'}\n\n${recipientStr}\n\n${refStr}${dateStr}\n\nBetreff: ${t.subject}\n\nSehr geehrte Damen und Herren,\n\n${t.body}`;
      setLetterText(text);
    }
  }, [activeView, selectedTemplateId, activeCase, person, cases, contacts]);

  // Helper date formatter
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

  // UI Actions
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
    alert('Persönlicher Aktionsplan wurde erstellt!');
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
    if (!window.confirm('Eintrag wirklich löschen?')) return;

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

  // Letter saving
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
    alert('Brief erfolgreich gespeichert!');
  };

  const handlePrintLetter = () => {
    window.print();
  };

  // Profile Form submit
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveState({ person });
    alert('Absenderdaten erfolgreich lokal gespeichert!');
  };

  // Global search implementation
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
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar no-print">
        <div className="brand">
          <div className="brandmark" style={{ background: 'linear-gradient(145deg, #d8b4fe, #a855f7)' }}>LL</div>
          <div>
            <strong>Lebenslagen-Lotse Pro</strong>
            <small>baokmedia© × Vorlagenbude©</small>
          </div>
        </div>

        <div className="nav-group">
          <span className="nav-label">Start & Orientierung</span>
          <button className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveView('dashboard'); setSearchQuery(''); }}>📊 Übersicht</button>
          <button className={`nav-item ${activeView === 'lifecheck' ? 'active' : ''}`} onClick={() => { setActiveView('lifecheck'); setSearchQuery(''); }}>✦ Lebenslagen-Check</button>
          <button className={`nav-item ${activeView === 'cases' ? 'active' : ''}`} onClick={() => { setActiveView('cases'); setSearchQuery(''); }}>📅 Meine Fälle</button>
          <button className={`nav-item ${activeView === 'deadlines' ? 'active' : ''}`} onClick={() => { setActiveView('deadlines'); setSearchQuery(''); }}>⚑ Fristen-Zentrale</button>
        </div>

        <div className="nav-group">
          <span className="nav-label">Bürger-Schutzschild</span>
          {Object.entries(MODULE_DATA).map(([id, val]) => (
            <button key={id} className={`nav-item ${activeView === id ? 'active' : ''}`} onClick={() => { setActiveView(id); setSearchQuery(''); }}>
              {val.icon} {val.title}
            </button>
          ))}
        </div>

        <div className="nav-group">
          <span className="nav-label">Werkzeuge & Nachweise</span>
          <button className={`nav-item ${activeView === 'documents' ? 'active' : ''}`} onClick={() => { setActiveView('documents'); setSearchQuery(''); }}>📁 Unterlagen</button>
          <button className={`nav-item ${activeView === 'contacts' ? 'active' : ''}`} onClick={() => { setActiveView('contacts'); setSearchQuery(''); }}>☏ Kontakte & Kennungen</button>
          <button className={`nav-item ${activeView === 'letters' ? 'active' : ''}`} onClick={() => { setActiveView('letters'); setSearchQuery(''); }}>✎ Schreiben-Werkstatt</button>
          <button className={`nav-item ${activeView === 'chronicle' ? 'active' : ''}`} onClick={() => { setActiveView('chronicle'); setSearchQuery(''); }}>⌛ Kontakt-Chronik</button>
          <button className={`nav-item ${activeView === 'sources' ? 'active' : ''}`} onClick={() => { setActiveView('sources'); setSearchQuery(''); }}>✓ Amtliche Quellen</button>
          <button className={`nav-item ${activeView === 'print' ? 'active' : ''}`} onClick={() => { setActiveView('print'); setSearchQuery(''); }}>▣ Druck & PDF</button>
          <button className={`nav-item ${activeView === 'settings' ? 'active' : ''}`} onClick={() => { setActiveView('settings'); setSearchQuery(''); }}>⚙️ Einstellungen</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content relative">
        {/* Header Search bar */}
        <header className="topbar no-print" style={{ justifyContent: 'space-between' }}>
          <div className="search" style={{ flex: 1, maxWidth: '500px' }}>
            <span>⌕</span>
            <input type="text" value={searchQuery} onChange={e => handleSearchChange(e.target.value)} placeholder="Fälle, Fristen, Dokumente durchsuchen..." />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" onClick={() => openModal('case')} title="Neuen Fall anlegen">＋ Fall</button>
            <button className="btn btn-secondary" onClick={() => openModal('deadline')} title="Neue Frist sichern">⚑ Frist</button>
          </div>
        </header>

        {/* Premium Lock Overlay */}
        {!loadingUser && !isPro && activeView !== 'dashboard' && activeView !== 'sources' && activeView !== 'settings' && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(11, 12, 16, 0.85)', backdropFilter: 'blur(20px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '60px 40px', maxWidth: '600px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔒</div>
              <h2 style={{ color: 'white', marginBottom: '16px' }}>Lebenslagen-Lotse freischalten</h2>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
                Dieser Planungsassistent ist Teil der Vorlagenbude Premium-Suite. Schalte alle Planer, Dokumenten-Register und die Schreiben-Werkstatt dauerhaft frei.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href={`https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01?client_reference_id=${userId}`} className="btn btn-primary" style={{ textDecoration: 'none', padding: '14px 28px', fontSize: '15px', fontWeight: 'bold' }}>
                  Master-Pass sichern (19€ Lifetime)
                </a>
                <button className="btn btn-secondary" onClick={() => setActiveView('dashboard')} style={{ padding: '12px' }}>
                  Zurück zur Übersicht
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GLOBAL SEARCH RESULTS ROUTE OVERRIDE */}
        {searchQuery.trim() !== '' && (
          <section className="view active">
            <span className="eyebrow">Lokale Suche</span>
            <h1>Ergebnisse für „{searchQuery}“</h1>
            <p className="lead">{searchResults.length} Treffer in deinen gespeicherten Daten.</p>

            <div className="stack" style={{ marginTop: '30px' }}>
              {searchResults.length === 0 ? (
                <div className="empty">Keine passenden Einträge gefunden.</div>
              ) : (
                searchResults.map((r, i) => (
                  <div key={i} className="card">
                    <span className="pill" style={{ marginBottom: '8px', display: 'inline-block' }}>{r.group}</span>
                    <h3>{r.title}</h3>
                    <p className="muted" style={{ margin: 0 }}>{r.meta}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* 1. DASHBOARD OVERVIEW */}
        {searchQuery.trim() === '' && activeView === 'dashboard' && (
          <section className="view active">
            <div className="hero" style={{ background: 'linear-gradient(135deg, #581c87, #1e1b4b)' }}>
              <div>
                <span className="eyebrow" style={{ color: '#f59e0b' }}>Lebenslagen-Lotse Pro · 100% Lokal</span>
                <h1 style={{ fontFamily: 'Georgia, serif', color: 'white', marginTop: '12px' }}>Ordnung, wenn das Leben kompliziert wird.</h1>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
                  Ein privates Bürger-Schutzschild für Fälle, Fristen, Unterlagen, Kontakte und beweisbare nächste Schritte – über Behörden- und Lebensbereiche hinweg.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" onClick={() => setActiveView('lifecheck')}>✦ Lebenslage starten</button>
                  <button className="btn btn-secondary" onClick={() => openModal('case')}>＋ Fall anlegen</button>
                  <button className="btn btn-secondary" onClick={() => openModal('deadline')}>⚑ Frist sichern</button>
                </div>
              </div>
              <div className="shieldvisual">
                <div className="shield" style={{ background: 'linear-gradient(145deg, #c084fc, #a855f7)', color: 'white' }}>
                  LL
                  <span style={{ fontSize: '9px', fontWeight: 'bold' }}>lokal · geordnet · beweisbar</span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid-4" style={{ marginTop: '24px' }}>
              <div className="card">
                <div className="stat" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent-blue)' }}>{cases.length}</div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Fälle gesamt</p>
              </div>
              <div className="card">
                <div className="stat" style={{ fontSize: '32px', fontWeight: 800, color: '#f59e0b' }}>
                  {cases.filter(x => x.status !== 'erledigt').length}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>offene Fälle</p>
              </div>
              <div className="card">
                <div className="stat" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent-red)' }}>
                  {deadlines.filter(x => x.status !== 'erledigt' && getDaysLeft(x.due) <= 14).length}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Fristen ≤ 14 Tage</p>
              </div>
              <div className="card">
                <div className="stat" style={{ fontSize: '32px', fontWeight: 800, color: '#10b981' }}>
                  {lifeTasks.length ? Math.round(lifeTasks.filter(x => x.done).length / lifeTasks.length * 100) : 0}%
                </div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Lebenslagen-Plan</p>
              </div>
            </div>

            <div className="grid-2" style={{ marginTop: '24px' }}>
              {/* Urgent deadlines */}
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3>Jetzt wichtig</h3>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setActiveView('deadlines')}>Alle Fristen</button>
                </div>
                {deadlines.filter(x => x.status !== 'erledigt' && getDaysLeft(x.due) <= 14).length === 0 ? (
                  <div className="empty">Keine dringenden Fristen.</div>
                ) : (
                  <div className="stack">
                    {deadlines.filter(x => x.status !== 'erledigt' && getDaysLeft(x.due) <= 14).slice(0, 5).map(x => (
                      <div key={x.id} className="item" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 'bold' }}>{x.title}</span>
                          <span className="pill bad">{formatDateStr(x.due)}</span>
                        </div>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--muted)' }}>
                          Fall: {cases.find(c => c.id === x.caseId)?.title || 'Ohne Fall'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick modules grid */}
              <div className="card">
                <h3>Schnellzugriff</h3>
                <div className="grid-3" style={{ gap: '8px', marginTop: '12px' }}>
                  {Object.entries(MODULE_DATA).slice(0, 6).map(([id, val]) => (
                    <button key={id} className="btn btn-secondary" style={{ textAlign: 'left', padding: '14px 10px', height: 'auto', display: 'block' }} onClick={() => setActiveView(id)}>
                      <b style={{ color: 'white', display: 'block', fontSize: '13px' }}>{val.icon} {val.title.split(' ')[0]}</b>
                      <small style={{ color: 'var(--muted)', fontSize: '11px', display: 'block', marginTop: '4px' }}>{val.sub.substring(0, 24)}...</small>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid-2" style={{ marginTop: '24px' }}>
              <div className="card">
                <h3>Aktive Fälle</h3>
                {cases.filter(x => x.status !== 'erledigt').length === 0 ? (
                  <div className="empty">Keine aktiven Fälle. Leg einen an, um zu starten.</div>
                ) : (
                  <div className="stack">
                    {cases.filter(x => x.status !== 'erledigt').slice(0, 5).map(x => (
                      <div key={x.id} className="item" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 'bold' }}>{x.title}</span>
                          <span className="pill">{x.status}</span>
                        </div>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--muted)' }}>
                          Bereich: {MODULE_DATA[x.area]?.title || x.area} | Stelle: {x.authority || 'Nicht vermerkt'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="card">
                <h3>Sicherer Prüfpfad</h3>
                <div className="stack" style={{ gap: '12px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ background: 'var(--border)', borderRadius: '50%', width: '24px', height: '24px', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 'bold', color: 'white', flexShrink: 0 }}>1</div>
                    <div>
                      <b style={{ color: 'white', fontSize: '13px' }}>Eingang sichern</b>
                      <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--muted)' }}>Briefe, Portalnachrichten, Briefumschläge (Poststempel!) und tatsächlichen Zugangstag sofort festhalten.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ background: 'var(--border)', borderRadius: '50%', width: '24px', height: '24px', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 'bold', color: 'white', flexShrink: 0 }}>2</div>
                    <div>
                      <b style={{ color: 'white', fontSize: '13px' }}>Frist und Ziel trennen</b>
                      <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--muted)' }}>Die gesetzliche Antwortfrist, Fristen zur Nachreichung und deine persönlichen Deadlines sauber trennen.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ background: 'var(--border)', borderRadius: '50%', width: '24px', height: '24px', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 'bold', color: 'white', flexShrink: 0 }}>3</div>
                    <div>
                      <b style={{ color: 'white', fontSize: '13px' }}>Nachweisbar handeln</b>
                      <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--muted)' }}>Alle Schriftstücke, Anlagen und Versandbelege (Einschreiben, Fax-Sendebericht) lückenlos in der Chronik protokollieren.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. LIFE-EVENT CHECK VIEW */}
        {searchQuery.trim() === '' && activeView === 'lifecheck' && (
          <section className="view active">
            <span className="eyebrow">Geführte Orientierung</span>
            <h1>Was hat sich verändert?</h1>
            <p className="lead">Wähle eine oder mehrere Lebenslagen. Daraus entsteht eine editierbare Aufgabenroute – ohne automatische Anspruchsentscheidung.</p>

            <div className="grid-3" style={{ marginTop: '24px' }}>
              {Object.entries(LIFE_EVENTS).map(([id, e]) => (
                <div key={id} className="lifeoption" style={{ display: 'flex', gap: '10px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '18px', padding: '16px' }}>
                  <input type="checkbox" id={`life_${id}`} checked={lifeSelections.includes(id)} onChange={el => {
                    const checked = el.target.checked;
                    const next = checked ? [...lifeSelections, id] : lifeSelections.filter(x => x !== id);
                    setLifeSelections(next);
                  }} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                  <label htmlFor={`life_${id}`} style={{ cursor: 'pointer', flex: 1 }}>
                    <span style={{ fontSize: '24px', display: 'block', marginBottom: '4px' }}>{e.icon}</span>
                    <b style={{ color: 'white', display: 'block' }}>{e.title}</b>
                    <small style={{ color: 'var(--muted)', display: 'block', fontSize: '11px', marginTop: '2px' }}>{e.desc}</small>
                  </label>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', margin: '24px 0' }}>
              <button className="btn btn-primary" onClick={handleBuildLifePlan}>Persönlichen Plan erzeugen</button>
              <button className="btn btn-secondary" onClick={handleClearPlan}>Auswahl leeren</button>
            </div>

            <div className="grid-2">
              <div className="card">
                <h3>Mein Aktionsplan</h3>
                <div className="tasklist" style={{ marginTop: '12px' }}>
                  {lifeTasks.length === 0 ? (
                    <div className="empty">Wähle oben passende Lebenslagen aus und erzeuge deinen Plan.</div>
                  ) : (
                    lifeTasks.map(t => (
                      <label key={t.id} className="taskrow" style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '12px', border: '1px solid var(--border)', borderRadius: '12px', cursor: 'pointer', marginBottom: '8px' }}>
                        <input type="checkbox" checked={t.done} onChange={() => toggleLifeTask(t.id)} style={{ width: '18px', height: '18px' }} />
                        <div>
                          <b style={{ textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--muted)' : 'white' }}>{t.text}</b>
                          <small style={{ display: 'block', color: 'var(--muted)', fontSize: '11px' }}>Kategorie: {t.life}</small>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>

              <div className="card">
                <h3>Prüflogik für Lebensbereiche</h3>
                <div className="stack" style={{ gap: '16px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span className="pill" style={{ height: 'fit-content' }}>1</span>
                    <div>
                      <b style={{ color: 'white' }}>Wer ist betroffen?</b>
                      <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--muted)' }}>Person, Haushaltskonstellation, Kinder, Angehörige und eventuelle gesetzliche Vertretungen klar zuordnen.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span className="pill" style={{ height: 'fit-content' }}>2</span>
                    <div>
                      <b style={{ color: 'white' }}>Was läuft bereits?</b>
                      <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--muted)' }}>Bereits bezogene Leistungen, laufende Verträge, offene Verfahren und bestehende Fristen vollständig inventarisieren.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span className="pill" style={{ height: 'fit-content' }}>3</span>
                    <div>
                      <b style={{ color: 'white' }}>Was muss bewiesen werden?</b>
                      <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--muted)' }}>Zustellungsdaten, anspruchsbegründende Tatsachen, entstandene Kosten, Beeinträchtigungen oder getroffene Vereinbarungen belegbar sichern.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. CASE BOARD VIEW */}
        {searchQuery.trim() === '' && activeView === 'cases' && (
          <section className="view active">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <span className="eyebrow">Fallakte</span>
                <h1>Meine Fälle</h1>
                <p className="lead">Jeder Vorgang erhält Ziel, Stelle, Kennung, Status und verknüpfte Nachweise.</p>
              </div>
              <button className="btn btn-primary" onClick={() => openModal('case')}>＋ Fall anlegen</button>
            </div>

            <div className="grid-4" style={{ gap: '16px' }}>
              {['offen', 'in_bearbeitung', 'wartet', 'erledigt'].map(status => (
                <div key={status} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: '20px', padding: '16px', minHeight: '300px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontWeight: 'bold' }}>
                    <span style={{ textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.05em' }}>{status.replaceAll('_', ' ')}</span>
                    <span className="pill">{cases.filter(x => x.status === status).length}</span>
                  </div>
                  {cases.filter(x => x.status === status).map(c => (
                    <div key={c.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '14px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <h4 style={{ color: 'white', margin: 0, fontSize: '14px' }}>{c.title}</h4>
                        <span className={`pill ${c.priority === 'hoch' ? 'bad' : c.priority === 'mittel' ? 'warn' : ''}`}>{c.priority}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 10px 0', minHeight: '32px' }}>{c.goal || 'Kein Ziel definiert'}</p>
                      <div style={{ fontSize: '11px', color: 'var(--muted)', borderTop: '1px solid var(--border)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{MODULE_DATA[c.area]?.title.split(' ')[0] || c.area}</span>
                        <span>{c.authority || 'Freitext Stelle'}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                        <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => openModal('case', c.id)}>Edit</button>
                        <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--accent-red)' }} onClick={() => handleDeleteItem('case', c.id)}>Löschen</button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. DEADLINES CENTRAL VIEW */}
        {searchQuery.trim() === '' && activeView === 'deadlines' && (
          <section className="view active">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <span className="eyebrow">Fristen-Schutzschicht</span>
                <h1>Fristen-Zentrale</h1>
                <p className="lead">Keine automatische Rechtsberechnung: Zugang, Belehrung, Fristtyp und eigenes Sicherheitsdatum getrennt dokumentieren.</p>
              </div>
              <button className="btn btn-primary" onClick={() => openModal('deadline')}>⚑ Frist sichern</button>
            </div>

            <div className="grid-3" style={{ marginBottom: '24px' }}>
              <div className="card">
                <h3>Offen</h3>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'white' }}>
                  {deadlines.filter(x => x.status !== 'erledigt').length}
                </div>
              </div>
              <div className="card">
                <h3>Fällig in 14 Tagen</h3>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent-red)' }}>
                  {deadlines.filter(x => x.status !== 'erledigt' && getDaysLeft(x.due) >= 0 && getDaysLeft(x.due) <= 14).length}
                </div>
              </div>
              <div className="card">
                <h3>Überfällig</h3>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent-red)' }}>
                  {deadlines.filter(x => x.status !== 'erledigt' && getDaysLeft(x.due) < 0).length}
                </div>
              </div>
            </div>

            <div className="tablewrap">
              <table>
                <thead>
                  <tr>
                    <th>Frist</th>
                    <th>Fällig</th>
                    <th>Fall</th>
                    <th>Typ & Notiz</th>
                    <th>Status</th>
                    <th>Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {deadlines.length === 0 ? (
                    <tr>
                      <td colSpan={6}><div className="empty">Keine Fristen erfasst.</div></td>
                    </tr>
                  ) : (
                    deadlines.map(d => {
                      const daysLeft = getDaysLeft(d.due);
                      const isOverdue = daysLeft < 0;

                      return (
                        <tr key={d.id}>
                          <td>
                            <strong style={{ color: 'white' }}>{d.title}</strong>
                            <br/>
                            <small className="muted">{d.type || '—'}</small>
                          </td>
                          <td>
                            {formatDateStr(d.due)}
                            <br/>
                            <small className={isOverdue ? 'text-danger' : 'muted'} style={{ color: isOverdue ? 'var(--accent-red)' : '' }}>
                              {isOverdue ? `${Math.abs(daysLeft)} Tage überfällig` : `${daysLeft} Tage übrig`}
                            </small>
                          </td>
                          <td>{cases.find(c => c.id === d.caseId)?.title || 'Ohne Fall'}</td>
                          <td>{d.note || '—'}</td>
                          <td>
                            <span className={`pill ${d.status === 'erledigt' ? 'good' : isOverdue ? 'bad' : 'warn'}`}>
                              {d.status}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button className="btn btn-secondary small" onClick={() => openModal('deadline', d.id)}>Edit</button>
                              <button className="btn btn-secondary small" style={{ color: 'var(--accent-red)' }} onClick={() => handleDeleteItem('deadline', d.id)}>Löschen</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="legalnote" style={{ marginTop: '24px' }}>
              <b>Frist-Notfall:</b> Wenn das Fristende unklar oder sehr nah ist, nicht auf die App verlassen. Rechtsbehelfsbelehrung des Originalbescheids und das tatsächliche Zugangsdatum sorgfältig prüfen und gegebenenfalls sofort rechtlichen Beistand einholen.
            </div>
          </section>
        )}

        {/* 5. MODULAR VIEWS (Wohnen, Verträge, Familie, Gesundheit, GdB, Schaden, Vorsorge, Schule) */}
        {searchQuery.trim() === '' && MODULE_DATA[activeView] && (
          <section className="view active">
            <div className="modulehero" style={{ padding: '30px', border: '1px solid var(--border)', borderRadius: '24px', background: 'rgba(255,255,255,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <span className="eyebrow">Bürger-Schutzschild</span>
                <h1 style={{ margin: '8px 0', fontFamily: 'Georgia, serif', color: 'white' }}>{MODULE_DATA[activeView].icon} {MODULE_DATA[activeView].title}</h1>
                <p className="lead" style={{ margin: 0 }}>{MODULE_DATA[activeView].sub}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                  <button className="btn btn-primary" onClick={() => openModal('module', null, { module: activeView })}>＋ Vorgang erfassen</button>
                  <button className="btn btn-secondary" onClick={() => setActiveView('letters')}>✎ Schreiben erstellen</button>
                </div>
              </div>
              <div style={{ fontSize: '72px', opacity: 0.8, marginRight: '20px' }}>{MODULE_DATA[activeView].icon}</div>
            </div>

            <div className="grid-2">
              <div className="card">
                <h3>Sicherer Prüfpfad (Checkliste)</h3>
                <div className="tasklist" style={{ marginTop: '12px' }}>
                  {MODULE_DATA[activeView].actions.map((act, i) => {
                    const key = `${activeView}:${i}`;
                    return (
                      <label key={i} className="taskrow" style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '12px', border: '1px solid var(--border)', borderRadius: '12px', cursor: 'pointer', marginBottom: '8px' }}>
                        <input type="checkbox" checked={!!checkStates[key]} onChange={() => toggleCheckState(key)} style={{ width: '18px', height: '18px' }} />
                        <span style={{ color: 'white' }}>{act}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3>Meine Vorgänge</h3>
                  <span className="pill">{moduleItems.filter(m => m.module === activeView).length}</span>
                </div>
                {moduleItems.filter(m => m.module === activeView).length === 0 ? (
                  <div className="empty">Noch keine Vorgänge erfasst.</div>
                ) : (
                  <div className="stack">
                    {moduleItems.filter(m => m.module === activeView).map(x => (
                      <div key={x.id} className="item" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 'bold', color: 'white' }}>{x.title}</span>
                          <span className="pill">{x.status}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>
                          <span>Typ: {x.type}</span>
                          <span>Datum: {formatDateStr(x.date)}</span>
                          <span>Ref: {x.reference || 'keine'}</span>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 10px 0' }}>{x.note}</p>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button className="btn btn-secondary small" onClick={() => openModal('module', x.id)}>Edit</button>
                          <button className="btn btn-secondary small" style={{ color: 'var(--accent-red)' }} onClick={() => handleDeleteItem('module', x.id)}>Löschen</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid-3" style={{ marginTop: '24px' }}>
              <div className="card">
                <h4>📁 Unterlagen</h4>
                <p className="muted" style={{ fontSize: '12px' }}>Nachweise und Belege mit Aufbewahrungsort digital listen.</p>
                <button className="btn btn-secondary small" onClick={() => setActiveView('documents')}>Unterlagen öffnen</button>
              </div>
              <div className="card">
                <h4>☏ Kontakte & Kennungen</h4>
                <p className="muted" style={{ fontSize: '12px' }}>Behörden, Aktenzeichen und Ansprechpartner anlegen.</p>
                <button className="btn btn-secondary small" onClick={() => setActiveView('contacts')}>Kontakte öffnen</button>
              </div>
              <div className="card">
                <h4>✓ Amtliche Quellen</h4>
                <p className="muted" style={{ fontSize: '12px' }}>Gesetzliche Handbücher, Richtlinien und Portale prüfen.</p>
                <button className="btn btn-secondary small" onClick={() => setActiveView('sources')}>Quellen öffnen</button>
              </div>
            </div>
          </section>
        )}

        {/* 6. DOCUMENTS REGISTER VIEW */}
        {searchQuery.trim() === '' && activeView === 'documents' && (
          <section className="view active">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <span className="eyebrow">Nachweis-Register</span>
                <h1>Unterlagen</h1>
                <p className="lead">Die App speichert Metadaten und Aufbewahrungsorte – keine Dokumentdateien werden hochgeladen.</p>
              </div>
              <button className="btn btn-primary" onClick={() => openModal('document')}>＋ Unterlage erfassen</button>
            </div>

            <div className="tablewrap">
              <table>
                <thead>
                  <tr>
                    <th>Dokument</th>
                    <th>Kategorie</th>
                    <th>Fall</th>
                    <th>Datum</th>
                    <th>Aufbewahrungsort</th>
                    <th>Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.length === 0 ? (
                    <tr>
                      <td colSpan={6}><div className="empty">Noch keine Unterlagen erfasst.</div></td>
                    </tr>
                  ) : (
                    documents.map(d => (
                      <tr key={d.id}>
                        <td>
                          <b style={{ color: 'white' }}>{d.title}</b>
                          {d.note && <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: 'var(--muted)' }}>{d.note}</p>}
                        </td>
                        <td>{d.category || '—'}</td>
                        <td>{cases.find(c => c.id === d.caseId)?.title || 'Ohne Fall'}</td>
                        <td>{formatDateStr(d.date)}</td>
                        <td>{d.location || '—'}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button className="btn btn-secondary small" onClick={() => openModal('document', d.id)}>Edit</button>
                            <button className="btn btn-secondary small text-danger" style={{ color: 'var(--accent-red)' }} onClick={() => handleDeleteItem('document', d.id)}>Löschen</button>
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

        {/* 7. CONTACTS VIEW */}
        {searchQuery.trim() === '' && activeView === 'contacts' && (
          <section className="view active">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <span className="eyebrow">Mehrere Stellen · Mehrere Kennungen</span>
                <h1>Kontakte & Kennungen</h1>
                <p className="lead">Kundennummern gehören zur jeweiligen Behörde oder Organisation – nicht pauschal zur Person.</p>
              </div>
              <button className="btn btn-primary" onClick={() => openModal('contact')}>＋ Kontakt anlegen</button>
            </div>

            <div className="grid-3">
              {contacts.length === 0 ? (
                <div className="empty" style={{ gridColumn: '1/-1' }}>Noch keine Stellen oder Kennungen gespeichert.</div>
              ) : (
                contacts.map(c => (
                  <div key={c.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="pill">{c.kind || 'Stelle'}</span>
                      <button className="btn btn-secondary small" style={{ color: 'var(--accent-red)', padding: '4px 8px' }} onClick={() => handleDeleteItem('contact', c.id)}>×</button>
                    </div>
                    <h3 style={{ fontFamily: 'Georgia, serif', color: 'white', margin: 0 }}>{c.name}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>{c.department || 'Gesamtstelle'}</p>
                    
                    <div className="stack" style={{ gap: '8px', fontSize: '12px', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
                      <div>
                        <small className="muted" style={{ display: 'block', fontSize: '10px' }}>AKTEN-/KUNDENNUMMER</small>
                        <b>{c.reference || '—'}</b>
                      </div>
                      <div>
                        <small className="muted" style={{ display: 'block', fontSize: '10px' }}>KONTAKT</small>
                        <span>Telefon: {c.phone || '—'}</span>
                        <br/>
                        <span>E-Mail: {c.email || '—'}</span>
                      </div>
                      <div>
                        <small className="muted" style={{ display: 'block', fontSize: '10px' }}>ANSCHRIFT / PORTAL</small>
                        <span style={{ whiteSpace: 'pre-wrap' }}>{c.address || '—'}</span>
                      </div>
                    </div>
                    <button className="btn btn-secondary small" style={{ marginTop: '8px' }} onClick={() => openModal('contact', c.id)}>Bearbeiten</button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* 8. LETTER STUDIO VIEW */}
        {searchQuery.trim() === '' && activeView === 'letters' && (
          <section className="view active">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <span className="eyebrow">Schreiben-Werkstatt</span>
                <h1>Kontrolliert formulieren</h1>
                <p className="lead">Vorlage auswählen, personalisieren, prüfen und anschließend drucken oder als PDF sichern.</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-secondary" onClick={() => {
                  navigator.clipboard.writeText(letterText);
                  alert('Schreiben in die Zwischenablage kopiert!');
                }}>Kopieren</button>
                <button className="btn btn-primary" onClick={handleSaveLetterText}>Schreiben speichern</button>
              </div>
            </div>

            <div className="lettertools" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
              <div className="card">
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Fallzuordnung</label>
                  <select value={activeCase} onChange={e => {
                    setActiveCase(e.target.value);
                    saveState({ activeCase: e.target.value });
                  }} style={{ width: '100%', padding: '10px', background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white' }}>
                    <option value="">Ohne Fallzuordnung</option>
                    {cases.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <h3>Vorlagen</h3>
                <div className="stack" style={{ gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
                  {TEMPLATES.map(t => (
                    <button key={t.id} className={`templatebtn ${t.id === selectedTemplateId ? 'active' : ''}`} onClick={() => setSelectedTemplateId(t.id)} style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', textAlign: 'left', background: t.id === selectedTemplateId ? 'var(--accent-blue)' : 'rgba(255,255,255,0.01)', color: 'white', display: 'block', width: '100%', cursor: 'pointer' }}>
                      <b style={{ display: 'block', fontSize: '13px' }}>{t.title}</b>
                      <small style={{ color: t.id === selectedTemplateId ? 'white' : 'var(--muted)', fontSize: '11px', display: 'block', marginTop: '2px' }}>{t.subject}</small>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <textarea value={letterText} onChange={e => setLetterText(e.target.value)} className="letterpaper" style={{ width: '100%', minHeight: '600px', padding: '40px', background: 'white', color: 'black', border: '1px solid #ccc', borderRadius: '12px', fontFamily: 'Courier, monospace', fontSize: '14px', lineHeight: '1.6', resize: 'vertical' }}></textarea>
              </div>
            </div>
          </section>
        )}

        {/* 9. CONTACT CHRONICLE VIEW */}
        {searchQuery.trim() === '' && activeView === 'chronicle' && (
          <section className="view active">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <span className="eyebrow">Beweisbare Kommunikation</span>
                <h1>Kontakt-Chronik</h1>
                <p className="lead">Telefonate, Portalnachrichten, Briefe, persönliche Gespräche und Versandnachweise erfassen.</p>
              </div>
              <button className="btn btn-primary" onClick={() => openModal('chronicle')}>＋ Kontakt protokollieren</button>
            </div>

            <div className="timeline">
              {chronicle.length === 0 ? (
                <div className="empty">Noch kein Kontakt protokolliert.</div>
              ) : (
                chronicle.map(c => (
                  <div key={c.id} className="timelineitem" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ background: '#c084fc', width: '12px', height: '12px', borderRadius: '50%', border: '4px solid var(--border)' }}></div>
                      <div style={{ width: '2px', background: 'var(--border)', flex: 1 }}></div>
                    </div>
                    <div className="item" style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '16px', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>{c.subject}</span>
                        <span className="pill">{c.channel}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>
                        <span>Datum: {formatDateStr(c.date)} {c.time}</span>
                        <span>Fall: {cases.find(x => x.id === c.caseId)?.title || 'Ohne Fall'}</span>
                        <span>Person: {c.person || '—'}</span>
                      </div>
                      <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: 'var(--muted)' }}>{c.result}</p>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-secondary small" onClick={() => openModal('chronicle', c.id)}>Edit</button>
                        <button className="btn btn-secondary small text-danger" style={{ color: 'var(--accent-red)' }} onClick={() => handleDeleteItem('chronicle', c.id)}>Löschen</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* 10. OFFICIAL SOURCES VIEW */}
        {searchQuery.trim() === '' && activeView === 'sources' && (
          <section className="view active">
            <span className="eyebrow">Original vor Zusammenfassung</span>
            <h1>Amtliche Quellen</h1>
            <p className="lead">Stand der redaktionellen Grundauswahl: 2. August 2026. Links dienen zur aktuellen Eigenprüfung und benötigen beim Öffnen Internet.</p>

            <div className="stack" style={{ gap: '16px', marginTop: '24px' }}>
              {SOURCES.map((s, i) => (
                <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '18px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#c084fc', width: '40px', height: '40px', borderRadius: '10px', display: 'grid', placeItems: 'center', fontWeight: 'bold' }}>✓</div>
                    <div>
                      <span className="pill" style={{ marginBottom: '4px', display: 'inline-block' }}>{s.area}</span>
                      <h3 style={{ margin: 0, fontFamily: 'Georgia, serif', color: 'white' }}>{s.name}</h3>
                      <p className="muted" style={{ margin: '4px 0 0 0', fontSize: '12px' }}>{s.note}</p>
                    </div>
                  </div>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '10px 16px', textDecoration: 'none' }}>Original öffnen</a>
                </div>
              ))}
            </div>

            <div className="legalnote" style={{ marginTop: '24px' }}>
              Quellen können umziehen oder sich ändern. Für Landesrecht, kommunale Satzungen, Versicherungsbedingungen und den Einzelfall zusätzlich die zuständige Originalstelle prüfen.
            </div>
          </section>
        )}

        {/* 11. PRINT & PDF CENTRAL */}
        {searchQuery.trim() === '' && activeView === 'print' && (
          <section className="view active">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <span className="eyebrow">Druckzentrale</span>
                <h1>Druck & PDF</h1>
                <p className="lead">Im Browser-Druckdialog „Als PDF sichern“ wählen. Vorher Inhalte und personenbezogene Angaben kontrollieren.</p>
              </div>
              <button className="btn btn-primary" onClick={handlePrintLetter}>Drucken / PDF</button>
            </div>

            <div className="grid-3" style={{ marginBottom: '32px' }}>
              <button className="card" style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => { setActiveView('dashboard'); setTimeout(() => window.print(), 100); }}>
                <h3>Fallübersicht</h3>
                <p className="muted" style={{ fontSize: '12px' }}>Kennzahlen und offene Fälle.</p>
              </button>
              <button className="card" style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => { setActiveView('deadlines'); setTimeout(() => window.print(), 100); }}>
                <h3>Fristenliste</h3>
                <p className="muted" style={{ fontSize: '12px' }}>Fälligkeiten und Status.</p>
              </button>
              <button className="card" style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => { setActiveView('letters'); setTimeout(() => window.print(), 100); }}>
                <h3>Aktuelles Schreiben</h3>
                <p className="muted" style={{ fontSize: '12px' }}>Briefansicht ohne Navigation.</p>
              </button>
            </div>

            <div className="card">
              <h2>Gespeicherte Schreiben</h2>
              {letters.length === 0 ? (
                <div className="empty">Noch kein Schreiben gespeichert.</div>
              ) : (
                <div className="stack" style={{ marginTop: '12px' }}>
                  {letters.map(l => (
                    <div key={l.id} className="item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '12px', marginBottom: '8px' }}>
                      <div>
                        <b style={{ color: 'white' }}>{l.title}</b>
                        <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>Erstellt am: {formatDateStr(l.date)}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-secondary small" onClick={() => {
                          setSelectedTemplateId(TEMPLATES[0].id);
                          setActiveView('letters');
                          setTimeout(() => {
                            setLetterText(l.text);
                          }, 10);
                        }}>In Werkstatt öffnen</button>
                        <button className="btn btn-secondary small text-danger" style={{ color: 'var(--accent-red)' }} onClick={() => handleDeleteItem('letter', l.id)}>Löschen</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* 12. SETTINGS VIEW */}
        {searchQuery.trim() === '' && activeView === 'settings' && (
          <section className="view active">
            <span className="eyebrow">Lokal & Selbstbestimmt</span>
            <h1>Einstellungen</h1>
            <p className="lead">Persönliche Angaben werden nur für Schreiben verwendet und bleiben in diesem Browserprofil.</p>

            <div className="grid-2" style={{ marginTop: '24px' }}>
              <div className="card">
                <h3>Persönliche Angaben</h3>
                <form onSubmit={handleSaveProfile} className="form-grid-1" style={{ marginTop: '12px' }}>
                  <div className="form-group">
                    <label>Dein vollständiger Name</label>
                    <input type="text" value={person.name} onChange={e => setPerson({ ...person, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Straße & Hausnummer</label>
                    <input type="text" value={person.street} onChange={e => setPerson({ ...person, street: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>PLZ und Ort</label>
                    <input type="text" value={person.city} onChange={e => setPerson({ ...person, city: e.target.value })} />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>E-Mail Adresse</label>
                      <input type="email" value={person.email} onChange={e => setPerson({ ...person, email: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Telefonnummer</label>
                      <input type="text" value={person.phone} onChange={e => setPerson({ ...person, phone: e.target.value })} />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>Angaben speichern</button>
                </form>
              </div>

              <div className="card">
                <h3>Backup & Daten</h3>
                <p className="muted" style={{ fontSize: '13px', marginBottom: '24px' }}>
                  Alle Daten bleiben verschlüsselt im Browser. Nimm Backups vor, um deine Fallakten zu sichern.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button className="btn btn-secondary" onClick={() => {
                    const data = { person, lifeSelections, lifeTasks, cases, deadlines, documents, contacts, chronicle, letters, moduleItems, checkStates, activeCase };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = `Lebenslagen-Lotse-Backup-${new Date().toISOString().split('T')[0]}.json`;
                    a.click();
                  }}>📥 JSON-Backup exportieren</button>

                  <button className="btn btn-secondary" style={{ color: 'var(--accent-red)' }} onClick={() => {
                    if (window.confirm('Alle lokalen Daten dieser App unwiderruflich löschen?')) {
                      if (window.confirm('Letzte Bestätigung: Wirklich alles löschen?')) {
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
                        alert('Alle Daten gelöscht.');
                      }
                    }
                  }}>Reset: Alle Daten löschen</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* MODAL WINDOWS FOR FORM ENTRIES */}
        {isModalOpen && (
          <div className="modal open" style={{ position: 'fixed', inset: 0, background: 'rgba(5, 12, 22, 0.7)', zIndex: 100, display: 'grid', placeItems: 'center', padding: '20px' }}>
            <div className="modalbox" style={{ background: '#141b24', border: '1px solid var(--border)', borderRadius: '26px', padding: '24px', width: 'min(700px, 100%)', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h2 style={{ fontFamily: 'Georgia, serif', color: 'white', margin: 0 }}>
                  {modalEditId ? 'Eintrag bearbeiten' : 'Neuer Eintrag'} ({modalType})
                </h2>
                <button className="close" onClick={() => setIsModalOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 0, color: 'white', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>×</button>
              </div>

              <form onSubmit={handleModalSave} className="form-grid-1">
                {/* 1. CASE TYPE FORM */}
                {modalType === 'case' && (
                  <div className="form-grid-1">
                    <div className="form-group">
                      <label>Titel des Falls</label>
                      <input type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                    </div>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Lebensbereich</label>
                        <select value={formData.area || 'housing'} onChange={e => setFormData({ ...formData, area: e.target.value })}>
                          {Object.entries(MODULE_DATA).map(([k, v]) => (
                            <option key={k} value={k}>{v.title}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Priorität</label>
                        <select value={formData.priority || 'mittel'} onChange={e => setFormData({ ...formData, priority: e.target.value })}>
                          <option value="niedrig">Niedrig</option>
                          <option value="mittel">Mittel</option>
                          <option value="hoch">Hoch</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Behörde/Stelle (Freitext)</label>
                        <input type="text" value={formData.authority || ''} onChange={e => setFormData({ ...formData, authority: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Verknüpfte Stelle & Kennung</label>
                        <select value={formData.contactId || ''} onChange={e => setFormData({ ...formData, contactId: e.target.value })}>
                          <option value="">Keine verknüpfte Stelle</option>
                          {contacts.map(c => (
                            <option key={c.id} value={c.id}>{c.name} {c.reference ? `(${c.reference})` : ''}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Ziel des Falls</label>
                      <textarea rows={2} value={formData.goal || ''} onChange={e => setFormData({ ...formData, goal: e.target.value })} placeholder="Was soll erreicht werden?"></textarea>
                    </div>
                    <div className="form-group">
                      <label>Notizen</label>
                      <textarea rows={2} value={formData.note || ''} onChange={e => setFormData({ ...formData, note: e.target.value })}></textarea>
                    </div>
                  </div>
                )}

                {/* 2. DEADLINE TYPE FORM */}
                {modalType === 'deadline' && (
                  <div className="form-grid-1">
                    <div className="form-group">
                      <label>Bezeichnung der Frist</label>
                      <input type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                    </div>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Fälligkeitsdatum</label>
                        <input type="date" value={formData.due || ''} onChange={e => setFormData({ ...formData, due: e.target.value })} required />
                      </div>
                      <div className="form-group">
                        <label>Tatsächlicher Zugang</label>
                        <input type="date" value={formData.access || ''} onChange={e => setFormData({ ...formData, access: e.target.value })} />
                      </div>
                    </div>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Zugeordneter Fall</label>
                        <select value={formData.caseId || ''} onChange={e => setFormData({ ...formData, caseId: e.target.value })}>
                          <option value="">Ohne Fallzuordnung</option>
                          {cases.map(c => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Fristtyp / Quelle</label>
                        <input type="text" value={formData.type || ''} onChange={e => setFormData({ ...formData, type: e.target.value })} placeholder="z. B. Widerspruch Bescheid" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Notiz / Sicherheitspuffer-Datum</label>
                      <textarea rows={3} value={formData.note || ''} onChange={e => setFormData({ ...formData, note: e.target.value })}></textarea>
                    </div>
                  </div>
                )}

                {/* 3. DOCUMENT TYPE FORM */}
                {modalType === 'document' && (
                  <div className="form-grid-1">
                    <div className="form-group">
                      <label>Unterlagenbezeichnung</label>
                      <input type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                    </div>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Kategorie</label>
                        <input type="text" value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="z. B. Beweis, Abrechnung" />
                      </div>
                      <div className="form-group">
                        <label>Dokumenten-Datum</label>
                        <input type="date" value={formData.date || ''} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                      </div>
                    </div>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Zugeordneter Fall</label>
                        <select value={formData.caseId || ''} onChange={e => setFormData({ ...formData, caseId: e.target.value })}>
                          <option value="">Ohne Fallzuordnung</option>
                          {cases.map(c => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Physischer Aufbewahrungsort</label>
                        <input type="text" value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="z. B. Ordner A, Fach 2" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Inhaltliche Notiz / Prüfhinweis</label>
                      <textarea rows={2} value={formData.note || ''} onChange={e => setFormData({ ...formData, note: e.target.value })}></textarea>
                    </div>
                  </div>
                )}

                {/* 4. CONTACT TYPE FORM */}
                {modalType === 'contact' && (
                  <div className="form-grid-1">
                    <div className="form-group">
                      <label>Behörden- & Plottform Presets</label>
                      <select onChange={e => applyPlatformPreset(e.target.value)}>
                        <option value="">-- Keine Platform --</option>
                        <option value="google">Google Ireland</option>
                        <option value="meta">Meta Platforms (Facebook)</option>
                        <option value="tiktok">TikTok Technology</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Behörde / Organisation / Person</label>
                      <input type="text" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Art</label>
                        <select value={formData.kind || 'Behörde'} onChange={e => setFormData({ ...formData, kind: e.target.value })}>
                          {['Behörde', 'Versicherung', 'Vermieter', 'Schule/Kita', 'Arzt/Klinik', 'Beratung', 'Sonstige'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Abteilung / Ansprechpartner</label>
                        <input type="text" value={formData.department || ''} onChange={e => setFormData({ ...formData, department: e.target.value })} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Akten- / Kunden- / Schadennummer</label>
                      <input type="text" value={formData.reference || ''} onChange={e => setFormData({ ...formData, reference: e.target.value })} />
                    </div>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Telefon</label>
                        <input type="text" value={formData.phone || ''} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>E-Mail</label>
                        <input type="email" value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Anschrift / Webportal</label>
                      <textarea rows={2} value={formData.address || ''} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                    </div>
                  </div>
                )}

                {/* 5. CHRONICLE TYPE FORM */}
                {modalType === 'chronicle' && (
                  <div className="form-grid-1">
                    <div className="form-group">
                      <label>Betreff des Kontakts / Schreibens</label>
                      <input type="text" value={formData.subject || ''} onChange={e => setFormData({ ...formData, subject: e.target.value })} required />
                    </div>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Datum</label>
                        <input type="date" value={formData.date || ''} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                      </div>
                      <div className="form-group">
                        <label>Uhrzeit</label>
                        <input type="time" value={formData.time || ''} onChange={e => setFormData({ ...formData, time: e.target.value })} />
                      </div>
                    </div>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Kanal</label>
                        <select value={formData.channel || 'Telefon'} onChange={e => setFormData({ ...formData, channel: e.target.value })}>
                          {['Telefon', 'Portal', 'E-Mail', 'Brief', 'Persönlich', 'Einschreiben', 'Fax'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Ansprechpartner / Empfänger</label>
                        <input type="text" value={formData.person || ''} onChange={e => setFormData({ ...formData, person: e.target.value })} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Verbundener Fall</label>
                      <select value={formData.caseId || ''} onChange={e => setFormData({ ...formData, caseId: e.target.value })}>
                        <option value="">Ohne Fallzuordnung</option>
                        {cases.map(c => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Ergebnis, Inhalt, Versandnachweis</label>
                      <textarea rows={3} value={formData.result || ''} onChange={e => setFormData({ ...formData, result: e.target.value })}></textarea>
                    </div>
                  </div>
                )}

                {/* 6. MODULE-ITEM TYPE FORM */}
                {modalType === 'module' && (
                  <div className="form-grid-1">
                    <div className="form-group">
                      <label>Bezeichnung des Vorgangs</label>
                      <input type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                    </div>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Art</label>
                        <select value={formData.type || ''} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                          <option value="">-- Typ wählen --</option>
                          {MODULE_DATA[formData.module]?.types.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Datum</label>
                        <input type="date" value={formData.date || ''} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                      </div>
                    </div>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Status</label>
                        <select value={formData.status || 'offen'} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                          {['offen', 'in_bearbeitung', 'wartet', 'erledigt'].map(s => (
                            <option key={s} value={s}>{s.replaceAll('_', ' ')}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Aktenzeichen / Kennung</label>
                        <input type="text" value={formData.reference || ''} onChange={e => setFormData({ ...formData, reference: e.target.value })} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Sachstand und nächste Schritte</label>
                      <textarea rows={3} value={formData.note || ''} onChange={e => setFormData({ ...formData, note: e.target.value })}></textarea>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Abbrechen</button>
                  <button type="submit" className="btn btn-primary">Speichern</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
