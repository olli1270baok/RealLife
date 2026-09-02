"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface TrainCase {
  id: string;
  date: string;
  train: string;
  amount: string;
  type: string;
  reason: string;
  status?: 'offen' | 'eingereicht' | 'erfolgreich' | 'abgelehnt';
}

export default function BahnRebell() {
  const router = useRouter();
  const [activeView, setActiveView] = useState('dashboard');
  const [isPro, setIsPro] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const [cases, setCases] = useState<TrainCase[]>([]);

  // Unified Form Fields for Brief Terminal
  const [bName, setBName] = useState('');
  const [bIban, setBIban] = useState('');
  const [bArt, setBArt] = useState('verspaetung');
  const [bDate, setBDate] = useState('');
  const [bTrain, setBTrain] = useState('');
  
  // Specific Fields
  const [bFrom, setBFrom] = useState('');
  const [bTo, setBTo] = useState('');
  const [bTimePlan, setBTimePlan] = useState('');
  const [bTimeReal, setBTimeReal] = useState('');
  const [bAmount, setBAmount] = useState('');
  const [bKm, setBKm] = useState('');
  const [bFlight, setBFlight] = useState('');
  const [bTicketNr, setBTicketNr] = useState('');

  const [bCaseSelection, setBCaseSelection] = useState('');
  const [letterHtml, setLetterHtml] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  // Calc Fields
  const [cTicketType, setCTicketType] = useState('einfach');
  const [cPrice, setCPrice] = useState('50');
  const [cDelay, setCDelay] = useState('60');
  const [cReason, setCReason] = useState('bahn');
  const [cTrain, setCTrain] = useState('');
  const [cDate, setCDate] = useState('');
  const [cResult, setCResult] = useState<{amount: string, msg: string, class: string, rawCalc: any} | null>(null);

  useEffect(() => {
    document.body.className = 'theme-bahn';
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id);
        if (session.user.app_metadata?.is_pro) {
          setIsPro(true);
        }
      }
      setLoadingUser(false);
    };
    checkUser();
    return () => {
      document.body.className = '';
    };
  }, [router]);

  useEffect(() => {
    // Load local storage data
    const savedCases = localStorage.getItem('bahnrebell_cases');
    if (savedCases) setCases(JSON.parse(savedCases));

    const sName = localStorage.getItem('bahn_name');
    const sIban = localStorage.getItem('bahn_iban');
    if (sName) setBName(sName);
    if (sIban) setBIban(sIban);
  }, []);

  const saveUserData = () => {
    localStorage.setItem('bahn_name', bName);
    localStorage.setItem('bahn_iban', bIban);
  };

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

  const calculateTrainClaim = () => {
    const delay = parseInt(cDelay);
    const price = parseFloat(cPrice) || 0;
    const train = cTrain || 'Zug';
    const date = cDate || new Date().toISOString().split('T')[0];

    let amount = 0;
    let hasClaim = true;
    let alertMsg = "";
    let alertClass = "success";

    if (delay === 0) {
      hasClaim = false;
      alertMsg = "Unter 60 Minuten Verspätung am Zielort gibt es keinen gesetzlichen Entschädigungsanspruch.";
      alertClass = "warning";
    }

    if (hasClaim && (cReason === 'wetter' || cReason === 'fremd')) {
      hasClaim = false;
      alertMsg = "Seit Juni 2023 (EU 2021/782) entfällt die Entschädigung bei extremem Wetter oder Fremdeinwirkung (Personen im Gleis). ABER: Hotel- und Taxikosten (bis 120€) müssen weiterhin bezahlt werden (Betreuungspflicht)! Nutze dafür den Brief-Generator 'Taxi & Hotel'.";
      alertClass = "fail";
    }

    if (hasClaim && cReason === 'streik') {
      alertMsg = "Streik des eigenen Bahnpersonals entbindet die Bahn NICHT von der Entschädigungspflicht. Voller Anspruch!";
      alertClass = "success";
    }

    if (hasClaim) {
      if (cTicketType === 'dticket') {
        amount = 1.50;
        alertMsg = "Beim Deutschlandticket gibt es pauschal 1,50 € pro Fall ab 60 Min Verspätung. Achtung: Da Auszahlungen erst ab 4,00 € erfolgen, musst du 3 Fälle in einem Monat sammeln!";
      } else if (cTicketType === 'zeitkarte') {
        amount = 1.50; 
        alertMsg = "Pauschaler Erstattungssatz für Zeitkarten. Ggf. abweichend je nach genauer Kartenart (z.B. BahnCard 100).";
      } else {
        amount = (delay === 60) ? price * 0.25 : price * 0.5;
        alertMsg = "Dein Erstattungsanspruch ist gültig. Erstelle jetzt das Forderungsschreiben.";
      }
    }

    const formattedAmount = amount.toFixed(2).replace('.', ',');
    
    setCResult({
      amount: formattedAmount,
      msg: alertMsg,
      class: alertClass,
      rawCalc: { id: Date.now().toString(), date, train, amount: formattedAmount, type: cTicketType, reason: cReason, status: 'offen' }
    });
  };

  const saveTrainCase = () => {
    if (!cResult?.rawCalc) return;
    const newCases = [...cases, cResult.rawCalc];
    setCases(newCases);
    localStorage.setItem('bahnrebell_cases', JSON.stringify(newCases));
    alert("Fall gespeichert!");
    switchView('dashboard');
  };

  const deleteCase = (id: string) => {
    const newCases = cases.filter(c => c.id !== id);
    setCases(newCases);
    localStorage.setItem('bahnrebell_cases', JSON.stringify(newCases));
  };

  const updateCaseStatus = (id: string, newStatus: any) => {
    const newCases = cases.map(c => c.id === id ? { ...c, status: newStatus } : c);
    setCases(newCases);
    localStorage.setItem('bahnrebell_cases', JSON.stringify(newCases));
  };

  const pendingAmount = cases.filter(c => c.status === 'eingereicht').reduce((acc, c) => acc + parseFloat(c.amount.replace(',', '.')), 0);
  const successAmount = cases.filter(c => c.status === 'erfolgreich').reduce((acc, c) => acc + parseFloat(c.amount.replace(',', '.')), 0);
  const openAmount = cases.filter(c => c.status === 'offen' || !c.status).reduce((acc, c) => acc + parseFloat(c.amount.replace(',', '.')), 0);

  const handleCaseSelect = (e: any) => {
    const id = e.target.value;
    setBCaseSelection(id);
    const c = cases.find(x => x.id === id);
    if (c) {
      setBDate(c.date);
      setBTrain(c.train);
    }
  };

  const exportBackup = () => {
    const backupData = {
      cases,
      bName,
      bIban
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bahnrebell_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.cases) {
          setCases(data.cases);
          localStorage.setItem('bahnrebell_cases', JSON.stringify(data.cases));
        }
        if (data.bName) {
          setBName(data.bName);
          localStorage.setItem('bahn_name', data.bName);
        }
        if (data.bIban) {
          setBIban(data.bIban);
          localStorage.setItem('bahn_iban', data.bIban);
        }
        alert('Backup erfolgreich importiert!');
      } catch (err) {
        alert('Fehler beim Importieren der Datei.');
      }
    };
    reader.readAsText(file);
  };

  const generateLetter = () => {
    saveUserData();
    setIsScanning(true);
    setScanStep(0);
    setTimeout(() => setScanStep(1), 400);
    setTimeout(() => setScanStep(2), 800);
    setTimeout(() => setScanStep(3), 1200);
    setTimeout(runActualGeneration, 1600);
  };

  const runActualGeneration = () => {
    saveUserData();
    const today = new Date().toLocaleDateString('de-DE');
    const name = bName || '[Dein Name]';
    const iban = bIban || '[Deine IBAN]';
    const date = bDate ? new Date(bDate).toLocaleDateString('de-DE') : '[Datum]';
    const train = bTrain || '[Zugnummer]';
    const from = bFrom || '[Start]';
    const to = bTo || '[Ziel]';
    const time_plan = bTimePlan || '[hh:mm]';
    const time_real = bTimeReal || '[hh:mm]';
    const amount = bAmount || '[Betrag]';
    const km = bKm || '[Kilometer]';
    const flight = bFlight || '[Flugnummer]';
    const ticketNr = bTicketNr || '[Ticket/Reservierungsnummer]';

    let subj = "";
    let body = "";

    if (bArt === 'verspaetung') {
      subj = `Forderung von Fahrgastrechten gemäß EU-Verordnung 2021/782`;
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit mache ich Erstattungsansprüche für meine Reise am <strong>${date}</strong> geltend.</p>
      <p>Ich war Reisender im Zug <strong>${train}</strong> von <strong>${from}</strong> nach <strong>${to}</strong>. Die planmäßige Ankunft war für ${time_plan} Uhr vorgesehen. Tatsächlich erreichte ich mein Ziel erst um ${time_real} Uhr, was eine signifikante Verspätung darstellt.</p>
      <p>Gemäß Art. 19 der EU-Fahrgastrechteverordnung 2021/782 steht mir bei einer Verspätung in diesem Ausmaß eine prozentuale Entschädigung des Ticketpreises bzw. die Pauschale für Zeitkarten zu.</p>
      <p>Kopien meiner Originalfahrkarte(n) liegen diesem Schreiben bei.</p>
      <p>Ich fordere Sie auf, den Entschädigungsbetrag innerhalb von 14 Tagen auf folgendes Konto zu überweisen:</p>
      <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>
      <p>Sollten Sie die Zahlung verweigern, behalte ich mir vor, die Schlichtungsstelle für den öffentlichen Personenverkehr (söp) bzw. das Eisenbahn-Bundesamt einzuschalten.</p>`;
    } else if (bArt === 'zusatzkosten') {
      subj = `Rückerstattung von Ersatzaufwendungen (Taxi/Hotel) gemäß Art. 20 EU-VO 2021/782`;
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>am <strong>${date}</strong> wollte ich den Zug <strong>${train}</strong> nutzen. Aufgrund eines Zugausfalls bzw. einer erheblichen Verspätung war es mir nicht möglich, mein Fahrtziel planmäßig oder am selben Tag zu erreichen.</p>
      <p>Gemäß Art. 20 der EU-Fahrgastrechteverordnung (Betreuungsleistungen) ist das Eisenbahnunternehmen in einem solchen Fall verpflichtet, für eine alternative Beförderung (z.B. Taxi bis zu 120 Euro) zu sorgen oder angemessene Hotelkosten zu übernehmen.</p>
      <p>Da von Ihrem Personal vor Ort keine entsprechende Lösung bereitgestellt wurde, war ich gezwungen, diese Leistung selbst in Anspruch zu nehmen und in Vorleistung zu treten.</p>
      <p>Ich fordere Sie hiermit auf, meine Auslagen in Höhe von <strong>${amount} Euro</strong> zu erstatten. Die Originalquittung liegt diesem Schreiben bei.</p>
      <p>Bitte überweisen Sie den Betrag innerhalb von 14 Tagen auf mein Konto:</p>
      <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>`;
    } else if (bArt === 'abbruch') {
      subj = `Fahrtverzicht & Forderung auf 100% Ticket-Erstattung`;
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>ich hatte für den <strong>${date}</strong> eine Fahrt mit dem Zug <strong>${train}</strong> gebucht.</p>
      <p>Vor oder bei der Abfahrt war absehbar, dass der Zug mit einer Verspätung von über 60 Minuten am Zielort eintreffen würde (bzw. er ist komplett ausgefallen). Da die Fahrt nach diesen Plänen sinnlos wurde, habe ich gemäß Art. 18 der EU-Verordnung 2021/782 von meinem Recht auf Fahrtverzicht Gebrauch gemacht und die Fahrt nicht angetreten.</p>
      <p>Ich fordere Sie auf, den vollen Ticketpreis in Höhe von <strong>${amount} Euro</strong> unverzüglich zu erstatten.</p>
      <p>Die ungenutzte Originalfahrkarte liegt diesem Schreiben bei.</p>
      <p>Bitte überweisen Sie den Betrag auf folgendes Konto:</p>
      <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>`;
    } else if (bArt === 'strafe') {
      subj = `Widerspruch gegen Erhöhtes Beförderungsentgelt (FNr: ${ticketNr})`;
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>ich lege hiermit formell Widerspruch gegen die Forderung eines Erhöhten Beförderungsentgeltes in Höhe von 60 Euro vom <strong>${date}</strong> (Zug <strong>${train}</strong>) ein.</p>
      <p>Zum Zeitpunkt der Kontrolle besaß ich einen gültigen Fahrschein / ein gültiges Abonnement für die fragliche Strecke. Lediglich aufgrund eines technischen Problems (DB Navigator App nicht ladbar / Akku leer) konnte ich das Ticket im Moment der Kontrolle nicht digital vorzeigen.</p>
      <p>Das Ticket lag jedoch nachweislich bereits vor Antritt der Fahrt vor. Der Beförderungsvertrag wurde rechtsgültig geschlossen. Ich reiche hiermit eine Kopie meines gültigen Tickets / Abos nach.</p>
      <p>Gemäß der Tarifbestimmungen reduziert sich die Forderung bei nachträglichem Vorzeigen eines personalisierten Tickets auf eine geringe Bearbeitungsgebühr (in der Regel 7 Euro), der ich zustimme. Die Zahlung der vollen 60 Euro weise ich jedoch vollumfänglich zurück.</p>
      <p>Ich bitte um schriftliche Bestätigung der Stornierung des Erhöhten Beförderungsentgelts.</p>`;
    } else if (bArt === 'sitzplatz') {
      subj = `Rückforderung der Sitzplatzreservierung (Zugausfall/Wagenreihung)`;
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>am <strong>${date}</strong> habe ich für meine Fahrt mit dem Zug <strong>${train}</strong> eine Sitzplatzreservierung gebucht (Reservierungsnummer: <strong>${ticketNr}</strong>).</p>
      <p>Dieser reservierte Sitzplatz stand mir nicht zur Verfügung. Gründe hierfür waren entweder ein Zugausfall, eine geänderte Wagenreihung oder der vollständige Ausfall des betroffenen Waggons.</p>
      <p>Gemäß Ihren Tarifbedingungen habe ich bei Nichtbereitstellung des reservierten Platzes Anspruch auf die volle Erstattung des Reservierungsentgelts.</p>
      <p>Ich fordere Sie auf, mir den Betrag in Höhe von <strong>${amount} Euro</strong> auf mein untenstehendes Konto zu erstatten.</p>
      <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>`;
    } else if (bArt === 'klima') {
      subj = `Beschwerde & Forderung nach Entschädigung (Defekte Klimaanlage / Unzumutbare Hitze)`;
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit reiche ich eine formelle Beschwerde zu meiner Fahrt am <strong>${date}</strong> im Zug <strong>${train}</strong> ein.</p>
      <p>Während der Fahrt war die Klimaanlage in meinem Waggon defekt. Die Innentemperatur stieg auf ein unerträgliches Maß an, was zu extremen körperlichen Belastungen führte. Eine Verlegung in einen anderen Waggon war aufgrund von Überfüllung nicht möglich.</p>
      <p>Die Beförderungsbedingungen waren unzumutbar. Es ist die Pflicht des Beförderers, für ein gesundheitlich unbedenkliches Raumklima zu sorgen. Die Rechtsprechung (u.a. AG Frankfurt am Main) hat Fahrgästen bei extremer Hitze und defekten Klimaanlagen in ICE-Zügen bereits Schmerzensgeld bzw. Minderung des Fahrpreises zugesprochen.</p>
      <p>Ich erwarte eine angemessene finanzielle Entschädigung für diese erlittene Tortur auf mein Konto:</p>
      <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>
      <p>Sollten Sie sich weigern, eine kulante Lösung anzubieten, behalte ich mir rechtliche Schritte vor.</p>`;
    } else if (bArt === 'pkw') {
      subj = `Rückerstattung von Ersatzaufwendungen (Nutzung von Privat-PKW / Carsharing) gemäß Art. 20 EU-VO 2021/782`;
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>am <strong>${date}</strong> wollte ich den Zug <strong>${train}</strong> nutzen, welcher komplett ausfiel oder extrem verspätet war. Da meine geplante Ankunftszeit in die Nachtstunden fiel (bzw. es die letzte Verbindung des Tages war) und von Ihnen kein Ersatzverkehr bereitgestellt wurde, war ich gezwungen, auf einen privaten PKW / Carsharing auszuweichen, um mein Ziel zu erreichen.</p>
      <p>Gemäß ständiger Rechtsprechung und Art. 20 der EU-Fahrgastrechteverordnung haben Fahrgäste Anspruch auf Ersatz der notwendigen Fahrtkosten (bis maximal 120 Euro), wenn die Bahn keine Alternative stellt.</p>
      <p>Da kein Taxi verfügbar war bzw. eine Fahrt mit dem PKW die wirtschaftlichste Lösung darstellte, mache ich hiermit Kilometergeld für die zurückgelegte Strecke geltend.</p>
      <p>Gefahrene Strecke: <strong>${km} Kilometer</strong>.<br>
      Angesetzter Satz: 0,30 Euro pro gefahrenem Kilometer (analog zum Bundesreisekostengesetz).</p>
      <p>Daraus ergibt sich eine Forderung von <strong>${amount} Euro</strong>.</p>
      <p>Ich fordere Sie auf, diesen Betrag auf folgendes Konto zu überweisen:</p>
      <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>`;
    } else if (bArt === 'railfly') {
      subj = `Schadensersatzforderung: Verpasster Flug durch Bahnverspätung (Rail&Fly)`;
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>am <strong>${date}</strong> befand ich mich auf der Anreise zu meinem Flug (Flugnummer: <strong>${flight}</strong>). Ich nutzte hierfür ein gültiges Rail&Fly Ticket.</p>
      <p>Der von mir rechtzeitig gewählte Zug <strong>${train}</strong> hatte eine derart massive Verspätung, dass ich meinen Flug nicht mehr rechtzeitig erreichen konnte.</p>
      <p>Im Gegensatz zu normalen Bahntickets fungiert die Deutsche Bahn bei Rail&Fly Tickets juristisch als Erfüllungsgehilfe der Fluggesellschaft bzw. des Reiseveranstalters. Ein verschuldeter Verzug beim Zubringerzug haftet somit für die dadurch entstehenden Folgeschäden.</p>
      <p>Durch das Verpassen des Fluges sind mir erhebliche Mehrkosten (Umbuchung / Neubuchung / Übernachtung) in Höhe von <strong>${amount} Euro</strong> entstanden. Die entsprechenden Belege liegen bei.</p>
      <p>Ich fordere Sie hiermit auf, den entstandenen Schaden in voller Höhe zu erstatten und den Betrag auf folgendes Konto zu überweisen:</p>
      <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>`;
    } else if (bArt === 'beschwerde') {
      subj = `Formelle Dienstaufsichtsbeschwerde (Unangemessenes Verhalten des Personals)`;
      body = `<p>An die Direktion / den Kundendialog der DB Fernverkehr AG,</p>
      <p>hiermit reiche ich eine formelle Dienstaufsichtsbeschwerde gegen einen Mitarbeiter Ihres Unternehmens ein.</p>
      <p>Der Vorfall ereignete sich am <strong>${date}</strong> im Zug <strong>${train}</strong> (zwischen <strong>${from}</strong> und <strong>${to}</strong>).</p>
      <p>Ihr Mitarbeiter hat sich mir (bzw. anderen Fahrgästen) gegenüber in höchstem Maße unprofessionell, beleidigend und unangemessen verhalten. Ein solches Verhalten von Dienstleistern gegenüber zahlenden Kunden ist völlig inakzeptabel und wirft ein desaströses Licht auf Ihr Unternehmen.</p>
      <p>Ich erwarte, dass Sie diesen Vorfall untersuchen, den betreffenden Zugbegleiter intern zur Rechenschaft ziehen und entsprechende disziplinarische Maßnahmen ergreifen. Ebenso erwarte ich eine formelle Entschuldigung für die erlittenen Unannehmlichkeiten.</p>
      <p>Mit freundlichen Grüßen,</p>`;
    } else if (bArt === 'soep') {
      subj = `Schlichtungsantrag: Ablehnung von Fahrgastrechten durch die Deutsche Bahn`;
      body = `<p>Sehr geehrte Damen und Herren der Schlichtungsstelle,</p>
      <p>hiermit rufe ich die Schlichtungsstelle für den öffentlichen Personenverkehr (söp) an, da das zuständige Eisenbahnunternehmen (DB Fernverkehr AG) meine berechtigten Forderungen aus der Reise am <strong>${date}</strong> mit dem Zug <strong>${train}</strong> abgelehnt hat.</p>
      <p>Trotz eindeutiger Rechtslage gemäß EU-Verordnung 2021/782 weigert sich das Unternehmen, die geforderte Summe in Höhe von <strong>${amount} Euro</strong> zu erstatten.</p>
      <p>Die gesamte vorangegangene Korrespondenz sowie Nachweise (Fahrkarten, Belege, Ablehnungsschreiben der Bahn) füge ich diesem Antrag in Kopie bei.</p>
      <p>Ich bitte um Prüfung des Sachverhalts und Einleitung eines Schlichtungsverfahrens, um die Durchsetzung meiner gesetzlichen Fahrgastrechte zu erwirken.</p>
      <p>Sollte die Schlichtung erfolgreich sein, bitte ich um Anweisung zur Überweisung auf folgendes Konto:</p>
      <p>Kontoinhaber: ${name}<br>IBAN: ${iban}</p>`;
    }

    const recipientHTML = bArt === 'soep' 
      ? `An:<br>Schlichtungsstelle für den öffentlichen Personenverkehr e.V. (söp)<br>Fasanenstraße 81<br>10623 Berlin`
      : `An:<br>DB Fernverkehr AG / Kundendialog<br>60647 Frankfurt am Main`;

    setLetterHtml(`
      <div class="sender">${name.replace(/\n/g, '<br>')}<br>[Deine Straße]<br>[PLZ Ort]<br></div>
      <div class="recipient">${recipientHTML}</div>
      <div class="date">${today}</div>
      <div class="subject">${subj}</div>
      ${body}
      <p>Mit freundlichen Grüßen,</p>
      <br><br><br>
      <p>${name.split('\n')[0]}</p>
    `);
    
    setIsScanning(false);
    setTimeout(() => {
      document.getElementById('view-preview')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const printLetter = () => {
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
          <span className="nav-label">Cockpit</span>
          <button className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => switchView('dashboard')}><span className="nav-icon">🚄</span> Dashboard</button>
          <button className={`nav-item ${activeView === 'rechner' ? 'active' : ''}`} onClick={() => switchView('rechner')}><span className="nav-icon">🧮</span> Entschädigungs-Rechner</button>
        </div>
        
        <div className="nav-group">
          <span className="nav-label">Generatoren</span>
          <button className={`nav-item ${activeView === 'briefe' ? 'active' : ''}`} onClick={() => switchView('briefe')}><span className="nav-icon">📜</span> PDF-Brief-Terminal (9)</button>
        </div>
        
        <div className="nav-group">
          <span className="nav-label">Hilfe & Tools</span>
          <button className={`nav-item ${activeView === 'ausreden' ? 'active' : ''}`} onClick={() => switchView('ausreden')}><span className="nav-icon">🛡️</span> Die neue EU-Regel (2023)</button>
        </div>
        <div className="nav-group">
          <span className="nav-label">Einstellungen</span>
          <button className={`nav-item ${activeView === 'settings' ? 'active' : ''}`} onClick={() => switchView('settings')}><span className="nav-icon">⚙️</span> Backup & Restore</button>
        </div>
      </aside>

      <main className="main-content relative">
        {!loadingUser && !isPro && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(3, 7, 18, 0.8)', backdropFilter: 'blur(20px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '60px 40px', maxWidth: '600px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', backdropFilter: 'blur(16px)' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔒</div>
              <h2 className="gradient-title-db" style={{ marginBottom: '20px' }}>Premium-Werkzeug gesperrt</h2>
              <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '40px' }}>Dieses Werkzeug ist aktuell gesperrt. Schalte jetzt den vollen Funktionsumfang der Vorlagenbude frei – Lifetime, ohne Abo.</p>
              <button className="btn btn-primary" style={{ width: '100%', padding: '20px', fontSize: '18px' }} onClick={handleCheckout}>
                JETZT MASTER-PASS KAUFEN (19€)
              </button>
            </div>
          </div>
        )}

        <div className="content-wrapper">
          {/* DASHBOARD */}
          {activeView === 'dashboard' && (
            <section className="view active" id="view-dashboard">
              <div className="tech-anim-container no-print">
                <svg width="100%" height="80" viewBox="0 0 800 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 50 40 L 750 40" stroke="rgba(255, 59, 111, 0.12)" strokeWidth="4" />
                  <path d="M 50 40 L 750 40" stroke="var(--accent-red)" strokeWidth="2" className="timeline-path" />
                  <circle cx="50" cy="40" r="8" fill="#030712" stroke="var(--accent-red)" strokeWidth="3" className="timeline-dot" style={{ color: 'var(--accent-red)' }} />
                  <circle cx="283" cy="40" r="6" fill="#030712" stroke="var(--accent-blue)" strokeWidth="2" className="timeline-dot" style={{ color: 'var(--accent-blue)', animationDelay: '0.5s' }} />
                  <circle cx="516" cy="40" r="6" fill="#030712" stroke="var(--accent-purple)" strokeWidth="2" className="timeline-dot" style={{ color: 'var(--accent-purple)', animationDelay: '1s' }} />
                  <circle cx="750" cy="40" r="8" fill="#030712" stroke="var(--accent-red)" strokeWidth="3" className="timeline-dot" style={{ color: 'var(--accent-red)', animationDelay: '1.5s' }} />
                </svg>
              </div>

              <div className="hero glow-red" style={{ transition: 'all 0.3s', borderLeft: '4px solid var(--accent-red)', padding: '40px', marginBottom: '40px' }}>
                <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '11px', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '12px', display: 'block' }}>Fahrgastrechte Terminal</span>
                <h1 className="gradient-title-db" style={{ fontSize: '3.2rem', lineHeight: '1.1', marginBottom: '16px' }}>Hol dir dein Geld <br/>von der Bahn.</h1>
                <p style={{ fontSize: '16px', maxWidth: '700px', marginBottom: 0 }}>Seit Juni 2023 nutzt die Bahn neue "außergewöhnliche Umstände", um nicht zu zahlen. Dieses Terminal berechnet deine exakten Ansprüche nach der aktuellen EU-Verordnung 2021/782 und generiert jetzt 10 verschiedene druckfertige Anschreiben.</p>
                
                <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                  <button className="btn btn-primary" onClick={() => switchView('rechner')}>Neuen Fall berechnen</button>
                  <button className="btn btn-secondary" onClick={() => switchView('briefe')}>Zum Brief-Terminal</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)', borderLeft: '4px solid #f39c12' }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, letterSpacing: '1px' }}>Offene Forderungen</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px' }}>{openAmount.toFixed(2).replace('.', ',')} €</div>
                </div>
                <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)', borderLeft: '4px solid #3498db' }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, letterSpacing: '1px' }}>Eingereicht (Wartend)</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px' }}>{pendingAmount.toFixed(2).replace('.', ',')} €</div>
                </div>
                <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)', borderLeft: '4px solid #2ecc71' }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, letterSpacing: '1px' }}>Erfolgreich zurückgeholt</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px', color: '#2ecc71' }}>{successAmount.toFixed(2).replace('.', ',')} €</div>
                </div>
              </div>

              <h3 style={{ color: 'var(--white)', marginBottom: '16px' }}>Gespeicherte Fälle</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {cases.length === 0 ? (
                  <p style={{ color: 'var(--muted)' }}>Noch keine Fälle gespeichert.</p>
                ) : (
                  cases.map(c => (
                    <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'var(--black)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '4px', height: '40px', borderRadius: '2px', background: c.status === 'erfolgreich' ? '#2ecc71' : c.status === 'eingereicht' ? '#3498db' : c.status === 'abgelehnt' ? '#e74c3c' : '#f39c12' }}></div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--accent-red)', marginBottom: '4px' }}>{c.amount} €</div>
                          <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{c.train} — {c.date}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <select 
                          value={c.status || 'offen'} 
                          onChange={(e) => updateCaseStatus(c.id, e.target.value)}
                          style={{ padding: '6px 12px', fontSize: '12px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--white)' }}
                        >
                          <option value="offen">🟡 Offen</option>
                          <option value="eingereicht">🔵 Eingereicht</option>
                          <option value="erfolgreich">🟢 Erfolgreich</option>
                          <option value="abgelehnt">🔴 Abgelehnt</option>
                        </select>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', borderColor: 'rgba(255,82,82,0.3)', color: '#ff5252' }} onClick={() => deleteCase(c.id)}>Löschen</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {/* RECHNER */}
          {activeView === 'rechner' && (
            <section className="view active" id="view-rechner">
              <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '12px', display: 'block' }}>EU VO 2021/782</span>
              <h2>Entschädigungs-Rechner</h2>
              <p>Berechne, wie viel dir die Bahn aufgrund der Verspätung am Zielort schuldet.</p>

              <div className="grid-2" style={{ marginTop: '32px' }}>
                <div className="card highlight" style={{ borderTop: '4px solid var(--accent-red)' }}>
                  <div className="form-group">
                    <label>Art des Tickets</label>
                    <select value={cTicketType} onChange={e => setCTicketType(e.target.value)}>
                      <option value="einfach">Einzelfahrkarte / Hin- und Rückfahrt</option>
                      <option value="dticket">Deutschlandticket (49€-Ticket)</option>
                      <option value="zeitkarte">Zeitkarte (Wochen-/Monatskarte / BahnCard 100)</option>
                    </select>
                  </div>

                  {cTicketType === 'einfach' && (
                    <div className="form-group">
                      <label>Ticketpreis (in €)</label>
                      <input type="number" value={cPrice} onChange={e => setCPrice(e.target.value)} min="0" step="0.1" />
                    </div>
                  )}

                  <div className="form-group">
                    <label>Verspätung am Zielbahnhof</label>
                    <select value={cDelay} onChange={e => setCDelay(e.target.value)}>
                      <option value="0">Unter 60 Minuten (0%)</option>
                      <option value="60">60 bis 119 Minuten (25%)</option>
                      <option value="120">Ab 120 Minuten (50%)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Grund für Verspätung/Ausfall (laut Bahn)</label>
                    <select value={cReason} onChange={e => setCReason(e.target.value)}>
                      <option value="bahn">Schuld der Bahn (Lokschaden, Personalmangel, Stellwerk)</option>
                      <option value="streik">Streik des Bahn-Personals</option>
                      <option value="wetter">Extremes Wetter (Sturm, Überschwemmung)</option>
                      <option value="fremd">Fremdeinwirkung (Personen im Gleis, Kabelklau)</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Zugnummer (z.B. ICE 123)</label>
                      <input type="text" value={cTrain} onChange={e => setCTrain(e.target.value)} placeholder="ICE 123" />
                    </div>
                    <div className="form-group">
                      <label>Datum der Fahrt</label>
                      <input type="date" value={cDate} onChange={e => setCDate(e.target.value)} />
                    </div>
                  </div>

                  <button className="btn btn-primary" style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }} onClick={calculateTrainClaim}>Anspruch prüfen</button>
                </div>

                <div>
                  {cResult && (
                    <div className="card" style={{ marginBottom: '24px' }}>
                      <h3>Dein Anspruch</h3>
                      <div style={{ textAlign: 'center', padding: '40px', background: 'var(--black)', border: '2px dashed var(--border)', borderRadius: '8px', margin: '24px 0' }}>
                        <div style={{ fontSize: '72px', color: 'var(--accent-red)', lineHeight: 1, fontWeight: 700 }}>{cResult.amount} €</div>
                        <div style={{ color: 'var(--muted)', marginTop: '12px', fontSize: '16px', fontWeight: 600 }}>Erstattungswert</div>
                      </div>
                      <div className={`result-box ${cResult.class}`} style={{ display: 'block', marginBottom: '24px' }} dangerouslySetInnerHTML={{ __html: `<strong>Analyse:</strong> ${cResult.msg}` }}></div>
                      <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={saveTrainCase}>💾 Fall speichern</button>
                    </div>
                  )}

                  <div className="card">
                    <h3 style={{ color: 'var(--white)' }}>Die 4€-Bagatellgrenze</h3>
                    <p>Beträge unter 4,00 € zahlt die Bahn nicht aus. <strong>Trick für Zeitkarten/D-Ticket:</strong> Du kannst Entschädigungen (je 1,50€ beim D-Ticket) innerhalb der Gültigkeitsdauer deiner Karte <strong>sammeln</strong> und zusammen einreichen, sobald du über 4€ kommst (also ab 3 Verspätungen).</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* AUSREDEN */}
          {activeView === 'ausreden' && (
            <section className="view active" id="view-ausreden">
              <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '12px', display: 'block' }}>EU-Gesetzesänderung Juni 2023</span>
              <h2>Der neue Ausreden-Buster</h2>
              <p>Seit Juni 2023 gilt die neue EU-Bahngastrechteverordnung (VO 2021/782). Die Bahn nutzt das massiv aus, um nicht mehr zu zahlen. Hier sind die echten Regeln.</p>

              <div className="grid-2" style={{ marginTop: '32px' }}>
                <div className="card">
                  <h3 style={{ color: 'var(--accent-red)' }}>Neue Ausrede: Wetter / Fremdeinwirkung</h3>
                  <p>Die Bahn muss bei extremen Wetterereignissen (schwerer Sturm), "Personen im Gleis", Kabeldiebstahl oder Polizeieinsätzen <strong>keine 25% oder 50% Erstattung mehr zahlen</strong>.</p>
                  <div className="alert alert-danger" style={{ marginTop: '16px' }}>
                    <strong>Vorsicht:</strong> Das gilt ABER NICHT für Streiks des eigenen Personals! Bei Streik gibt es nach wie vor Geld! Und es gilt nicht für normales schlechtes Wetter (Regen, Herbstlaub).
                  </div>
                </div>

                <div className="card">
                  <h3 style={{ color: 'var(--accent-red)' }}>Die Waffe: Betreuungspflicht!</h3>
                  <p>Selbst wenn die Bahn wegen Sturm nicht erstatten muss, <strong>muss sie dir Hotel und Taxi zahlen!</strong> (Artikel 20 der VO).</p>
                  <div className="alert alert-success" style={{ marginTop: '16px' }}>
                    <strong>Regel:</strong> Fällt dein Zug aus und du kommst am selben Tag nicht mehr ans Ziel, MUSS die Bahn dir ein Hotel stellen oder bezahlen. Und wenn planmäßige Ankunft 0:00-05:00 Uhr ist und du +60 Min Verspätung hast, MUSS sie ein Taxi bis 120€ zahlen.
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* BRIEF TERMINAL */}
          {activeView === 'briefe' && (
            <section className="view active" id="view-briefe">
              <div className="no-print">
                <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '12px', display: 'block' }}>Formular-Ersatz</span>
                <h2>PDF-Brief-Terminal (10 Vorlagen)</h2>
                <p>Generiere hier druckfertige juristische PDF-Schreiben gegen die Bahn. Wähle einfach den passenden Fall aus.</p>

                <div className="card highlight" style={{ borderTop: '4px solid var(--accent-red)', marginTop: '32px' }}>
                  
                  <div className="form-group">
                    <label>Art des Schreibens wählen</label>
                    <select value={bArt} onChange={e => setBArt(e.target.value)} style={{ padding: '16px', background: 'var(--darker)' }}>
                      <optgroup label="Standard-Erstattungen">
                        <option value="verspaetung">Erstattung 25% / 50% (Verspätung)</option>
                        <option value="abbruch">100% Erstattung (Fahrtverzicht)</option>
                        <option value="sitzplatz">Erstattung der Sitzplatzreservierung</option>
                      </optgroup>
                      <optgroup label="Zusatz- & Folgekosten">
                        <option value="zusatzkosten">Taxi & Hotelkosten (Art. 20 VO)</option>
                        <option value="pkw">Fahrtengeld für Privat-PKW / Carsharing (Analog zu Taxi)</option>
                        <option value="railfly">Schadensersatz: Verpasster Flug (Rail&Fly Ticket)</option>
                      </optgroup>
                      <optgroup label="Ärger, Strafen & Beschwerden">
                        <option value="strafe">Widerspruch 60€ Strafe (DB App defekt / Akku leer)</option>
                        <option value="klima">Schmerzensgeld (Defekte Klimaanlage / Hitze)</option>
                        <option value="beschwerde">Formelle Dienstaufsichtsbeschwerde (Personal)</option>
                      </optgroup>
                      <optgroup label="Eskalation (Letzte Instanz)">
                        <option value="soep">SÖP Schlichtungsstelle (Eskalation nach Ablehnung)</option>
                      </optgroup>
                    </select>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />

                  {(bArt === 'verspaetung' || bArt === 'zusatzkosten' || bArt === 'abbruch') && (
                    <div className="form-group">
                      <label>Daten aus gespeichertem Fall laden (optional)</label>
                      <select value={bCaseSelection} onChange={handleCaseSelect}>
                        <option value="">-- manuell eingeben --</option>
                        {cases.map(c => <option key={c.id} value={c.id}>{c.train} am {c.date} ({c.amount}€)</option>)}
                      </select>
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group"><label>Reisender (Name)</label><input type="text" value={bName} onChange={e => setBName(e.target.value)} /></div>
                    <div className="form-group"><label>Deine IBAN</label><input type="text" value={bIban} onChange={e => setBIban(e.target.value)} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Datum der Fahrt/Störung</label><input type="date" value={bDate} onChange={e => setBDate(e.target.value)} /></div>
                    <div className="form-group"><label>Zugnummer (z.B. ICE 123)</label><input type="text" value={bTrain} onChange={e => setBTrain(e.target.value)} /></div>
                  </div>

                  {(bArt === 'verspaetung' || bArt === 'beschwerde') && (
                    <div className="form-row">
                      <div className="form-group"><label>Abfahrtsbahnhof</label><input type="text" value={bFrom} onChange={e => setBFrom(e.target.value)} /></div>
                      <div className="form-group"><label>Zielbahnhof</label><input type="text" value={bTo} onChange={e => setBTo(e.target.value)} /></div>
                    </div>
                  )}

                  {bArt === 'verspaetung' && (
                    <div className="form-row">
                      <div className="form-group"><label>Planmäßige Ankunft</label><input type="time" value={bTimePlan} onChange={e => setBTimePlan(e.target.value)} /></div>
                      <div className="form-group"><label>Tatsächliche Ankunft</label><input type="time" value={bTimeReal} onChange={e => setBTimeReal(e.target.value)} /></div>
                    </div>
                  )}

                  {(bArt === 'zusatzkosten' || bArt === 'abbruch' || bArt === 'sitzplatz' || bArt === 'pkw' || bArt === 'railfly') && (
                    <div className="form-group">
                      <label>Geforderter Betrag (in €)</label>
                      <input type="number" value={bAmount} onChange={e => setBAmount(e.target.value)} step="0.01" />
                    </div>
                  )}

                  {bArt === 'pkw' && (
                    <div className="form-group">
                      <label>Gefahrene Kilometer (Auto)</label>
                      <input type="number" value={bKm} onChange={e => setBKm(e.target.value)} />
                    </div>
                  )}

                  {bArt === 'railfly' && (
                    <div className="form-group">
                      <label>Flugnummer des verpassten Flugs</label>
                      <input type="text" value={bFlight} onChange={e => setBFlight(e.target.value)} />
                    </div>
                  )}

                  {(bArt === 'strafe' || bArt === 'sitzplatz') && (
                    <div className="form-group">
                      <label>Ticket-, Fall- oder Reservierungsnummer</label>
                      <input type="text" value={bTicketNr} onChange={e => setBTicketNr(e.target.value)} />
                    </div>
                  )}

                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '24px' }} onClick={generateLetter}>
                    PDF-Vorschau generieren
                  </button>
                </div>
              </div>

              {letterHtml && (
                <div id="view-preview" style={{ marginTop: '24px' }}>
                  <div className="no-print" style={{ padding: '16px', background: 'var(--darker)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Brief-Vorschau</h3>
                    <button className="btn btn-secondary" onClick={printLetter}>🖨️ Drucken / PDF</button>
                  </div>
                  <div className="letter-paper" dangerouslySetInnerHTML={{ __html: letterHtml }} />
                </div>
              )}
            </section>
          )}

          {/* SETTINGS (BACKUP) */}
          {activeView === 'settings' && (
            <section className="view active">
              <span style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '12px', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '12px', display: 'block' }}>Datenverwaltung</span>
              <h2>Backup & Wiederherstellung</h2>
              <p style={{ color: 'var(--muted)' }}>Lade alle deine Bahn-Fälle und Standard-Absenderdaten als Backup-Datei (.json) herunter. Du kannst sie jederzeit auf einem anderen Gerät (oder nach einem Browser-Reset) wieder einspielen.</p>
              
              <div className="card highlight" style={{ borderTop: '4px solid var(--accent-red)', marginTop: '32px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button className="btn btn-primary" style={{ background: '#3498db', borderColor: '#3498db' }} onClick={exportBackup}>
                    ⬇️ Backup Exportieren (.json)
                  </button>
                  <div style={{ position: 'relative' }}>
                    <input type="file" accept=".json" onChange={importBackup} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                    <button className="btn btn-secondary">
                      ⬆️ Backup Importieren
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>
      </main>

      {isScanning && (
        <div className="brief-scanner-overlay">
          <div style={{ background: 'var(--card)', padding: '40px', borderRadius: '12px', border: '1px solid var(--accent-red)', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 0 30px rgba(255, 51, 102, 0.3)' }}>
            <div style={{ fontSize: '40px', marginBottom: '20px', animation: 'pulseGlow 1.5s infinite' }}>🚄⚖️</div>
            <h3 style={{ color: 'var(--accent-red)' }}>Bahn-Rebell Buster</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '24px' }}>Generiere rechtssicheren PDF-Brief...</p>
            
            <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ height: '100%', background: 'var(--accent-red)', width: '0%', animation: 'scanProgress 1.5s linear forwards' }} />
            </div>

            <div style={{ fontSize: '13px', textAlign: 'left', minHeight: '40px', color: 'var(--text)' }}>
              {scanStep === 0 && "🔍 Analysiere Fahrplandaten & Verspätung..."}
              {scanStep === 1 && "📖 Gleiche ab mit EU-VO 2021/782..."}
              {scanStep === 2 && "📝 Setze Fristen & Paragrafen auf..."}
              {scanStep === 3 && "✍️ Fertigstellung der PDF-Vorschau..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
