"use client";

import { useState, useEffect } from 'react';
import './rebell.css';

const TEMPLATES = [
  // Kat 1: Arzt & Diagnose
  { id: 't1', cat: 1, catName: 'Arzt & Diagnose', title: 'Symptom-Dossier', desc: 'Professioneller Vorbericht, um nicht als "hysterisch" abgestempelt zu werden.' },
  { id: 't2', cat: 1, catName: 'Arzt & Diagnose', title: 'Diagnostik-Verweigerung', desc: 'Zwingt den Arzt, eine abgelehnte Untersuchung haftbar zu begründen.' },
  { id: 't3', cat: 1, catName: 'Arzt & Diagnose', title: 'Akteneinsicht', desc: 'Anforderung der kompletten Patientenakte gem. § 630g BGB.' },
  { id: 't4', cat: 1, catName: 'Arzt & Diagnose', title: 'Zweitmeinungs-Forderung', desc: 'Offizielle Anforderung nach § 27b SGB V bei riskanten Eingriffen.' },
  { id: 't5', cat: 1, catName: 'Arzt & Diagnose', title: 'IGeL-Abwehr', desc: 'Formelle Ablehnung von aufgedrängten Selbstzahler-Leistungen.' },
  { id: 't6', cat: 1, catName: 'Arzt & Diagnose', title: 'Notaufnahme-Abweisung', desc: 'Zwingt das Krankenhaus, die Abweisung schriftlich zu übernehmen.' },
  { id: 't7', cat: 1, catName: 'Arzt & Diagnose', title: 'Geburtsbericht', desc: 'Spezifische Anforderung aller Protokolle und CTGs nach Geburt.' },
  
  // Kat 2: Kasse
  { id: 't8', cat: 2, catName: 'Krankenkasse', title: 'Krankenkassen-Widerspruch', desc: 'Härteste Frist-Wahrung gegen abgelehnte Hilfsmittel/Therapien.' },
  { id: 't9', cat: 2, catName: 'Krankenkasse', title: 'Krankengeld-Retter', desc: 'Widerspruch gegen die "Wunderheilung nach Aktenlage" (MDK).' },
  { id: 't10', cat: 2, catName: 'Krankenkasse', title: 'Mutter-Kind-Kur Widerspruch', desc: 'Zerschießt die Standard-Ablehnung der Krankenkassen.' },
  { id: 't11', cat: 2, catName: 'Krankenkasse', title: 'Reha-Antrag Widerspruch', desc: 'Juristischer Hebel gegen abgelehnte Reha-Maßnahmen.' },
  { id: 't12', cat: 2, catName: 'Krankenkasse', title: 'Zuzahlungsbefreiung', desc: 'Härtefall-Antrag auf Befreiung von Kassen-Zuzahlungen.' },
  { id: 't13', cat: 2, catName: 'Krankenkasse', title: 'Off-Label-Use', desc: 'Antrag auf Kostenübernahme von Medikamenten ohne Standardzulassung.' },
  { id: 't14', cat: 2, catName: 'Krankenkasse', title: 'Fahrtkosten-Erstattung', desc: 'Forderung der Kostenübernahme für Krankentransporte.' },
  
  // Kat 3: Fehler & Beschwerden
  { id: 't15', cat: 3, catName: 'Beschwerden & Fehler', title: 'Ärztekammer-Beschwerde', desc: 'Formelle Meldung wegen unethischem/diskriminierendem Verhalten.' },
  { id: 't16', cat: 3, catName: 'Beschwerden & Fehler', title: 'AGG-Diskriminierungs-Rüge', desc: 'Offizielle Beschwerde bei Fatshaming oder Women-Shaming.' },
  { id: 't17', cat: 3, catName: 'Beschwerden & Fehler', title: 'Gedächtnisprotokoll', desc: 'Gerichtsfeste Dokumentation direkt nach einem Behandlungsfehler.' },
  { id: 't18', cat: 3, catName: 'Beschwerden & Fehler', title: 'Gutachterkommission', desc: 'Antrag an die Schlichtungsstelle wegen vermutetem Ärztepfusch.' },
  { id: 't19', cat: 3, catName: 'Beschwerden & Fehler', title: 'Zahnarzt-Nachbesserung', desc: 'Aufforderung zur kostenlosen Behebung von mangelhaftem Zahnersatz.' },
  
  // Kat 4: Vorsorge
  { id: 't20', cat: 4, catName: 'Vorsorge', title: 'Patientenverfügung (Express)', desc: 'Schneller, rechtssicherer Generator für den absoluten Notfall.' }
];

export default function PatientenRebell() {
  const [view, setView] = useState<'matrix' | 'form'>('matrix');
  const [activeId, setActiveId] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    gegenseite: '',
    datum: new Date().toLocaleDateString('de-DE'),
    versichertennummer: '',
    text1: '',
    text2: '',
    text3: ''
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    // Ruft den nativen Browser-Druckdialog auf, was ein viel direkterer Workflow ist.
    // Nutzer können dort direkt auf den Drucker gehen oder "Als PDF speichern" wählen.
    window.print();
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // @ts-ignore
    if (!window.html2pdf) {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      document.head.appendChild(script);
    }
    return () => { document.body.style.overflow = originalOverflow; };
  }, []);

  const activeTemplate = TEMPLATES.find(t => t.id === activeId);

  return (
    <div className="rebell-wrapper">
      <div className="graffiti-tag tag-1">GASLIGHTING<br/>SHIELD</div>
      <div className="graffiti-tag tag-2">REBELL<br/>01</div>

      {view === 'matrix' && (
        <aside className="rebell-sidebar no-print">
          <div className="rebell-brand">PATIENTEN <span>REBELL v2.0</span></div>
          <button className="rebell-navbtn active" onClick={() => setView('matrix')}>
            ⚔️ Das Arsenal (Alle 20)
          </button>
        </aside>
      )}

      <main className={`rebell-main no-print ${view === 'form' ? 'form-mode' : ''}`}>
        
        {/* MATRIX VIEW */}
        {view === 'matrix' && (
          <div style={{padding: '40px 60px'}}>
            <h1 className="rebell-title">Wähle deine Waffe.</h1>
            <p className="rebell-subtitle">20 juristische Generatoren für Ärzte, Kliniken und Krankenkassen. Keine Kompromisse mehr.</p>
            
            {[1, 2, 3, 4].map(cat => (
              <div key={cat} style={{marginBottom: '40px'}}>
                <div className="category-label">
                  {cat === 1 && 'Arzt & Diagnose'}
                  {cat === 2 && 'Krankenkasse & MDK'}
                  {cat === 3 && 'Behandlungsfehler & Beschwerden'}
                  {cat === 4 && 'Vorsorge & Vollmachten'}
                </div>
                <div className="matrix-grid">
                  {TEMPLATES.filter(t => t.cat === cat).map(t => (
                    <div key={t.id} className="matrix-card" onClick={() => { setActiveId(t.id); setView('form'); }}>
                      <div className={`badge cat${cat}`}>{t.catName}</div>
                      <h3 style={{marginTop: '15px'}}>{t.title}</h3>
                      <p>{t.desc}</p>
                      <div style={{color: 'var(--accent)', fontSize: '11px', fontWeight: 'bold'}}>GENERATOR STARTEN →</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SPLIT FORM VIEW (Live Preview) */}
        {view === 'form' && activeTemplate && (
          <div className="split-layout">
            <div className="split-form">
              <div className="split-form-header">
                <button 
                  style={{background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 'bold'}}
                  onClick={() => setView('matrix')}
                >
                  ← Zurück zum Arsenal
                </button>
                <h2 style={{color: '#fff', fontSize: '20px', fontFamily: 'Outfit, sans-serif'}}>{activeTemplate.title}</h2>
              </div>
              
              <div className="split-form-body">
                <div className="form-group">
                  <label className="rebell-label">1. Absender (Dein Name & Anschrift)</label>
                  <textarea className="rebell-textarea" style={{minHeight: '80px'}} name="name" value={formData.name} onChange={handleChange} placeholder="Maria Muster&#10;Musterstraße 1&#10;12345 Stadt" />
                </div>
                <div className="form-group">
                  <label className="rebell-label">2. Empfänger (Arzt / Kasse / Kammer)</label>
                  <textarea className="rebell-textarea" style={{minHeight: '80px'}} name="gegenseite" value={formData.gegenseite} onChange={handleChange} placeholder="Dr. Med. Mustermann&#10;Krankenkasse XY" />
                </div>

                {activeTemplate.cat === 2 && (
                  <div className="form-group">
                    <label className="rebell-label">Versichertennummer</label>
                    <input className="rebell-input" name="versichertennummer" value={formData.versichertennummer} onChange={handleChange} />
                  </div>
                )}

                <div className="form-group">
                  <label className="rebell-label">
                    3. {activeTemplate.id === 't1' ? 'Symptome & Auswirkungen' : 
                     activeTemplate.id === 't2' ? 'Welche Untersuchung wurde mit welcher Begründung verweigert?' :
                     activeTemplate.id === 't17' ? 'Was ist exakt passiert?' :
                     activeTemplate.id === 't8' ? 'Welche Leistung wurde abgelehnt (Aktenzeichen)?' :
                     'Kern-Fakten / Begründung für dieses Schreiben'}
                  </label>
                  <textarea className="rebell-textarea" style={{minHeight: '150px'}} name="text1" value={formData.text1} onChange={handleChange} placeholder="Bitte ausführlich beschreiben..." />
                </div>
              </div>

              <div className="split-form-footer">
                <button className="rebell-btn" style={{width: '100%', justifyContent: 'center'}} onClick={handlePrint}>
                  🖨️ DIREKT DRUCKEN / PDF
                </button>
              </div>
            </div>

            <div className="split-preview">
              {/* LIVE PDF PAPER */}
              <div id="pdf-active-preview" className="doc-paper">
                
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '40px'}}>
                  <div style={{width: '250px', whiteSpace: 'pre-wrap'}}>{formData.name || 'Max Mustermann\nMusterstraße 1\n12345 Stadt'}</div>
                  <div style={{textAlign: 'right'}}>{formData.datum}</div>
                </div>
                
                <div style={{whiteSpace: 'pre-wrap', marginBottom: '40px', fontWeight: 'bold'}}>{formData.gegenseite || 'Empfänger / Praxis / Krankenkasse'}</div>
                
                {activeTemplate.cat === 2 && (
                  <div style={{marginBottom: '20px'}}><strong>Versichertennummer:</strong> {formData.versichertennummer || '______________________'}</div>
                )}

                {/* Custom Titles */}
                {activeTemplate.id === 't1' && <h1>Symptom-Dossier & Vorbericht</h1>}
                {activeTemplate.id === 't2' && <h1>Formelle Aufforderung zur Dokumentation einer verweigerten Diagnostik</h1>}
                {activeTemplate.id === 't3' && <h1>Geltendmachung des Rechts auf Akteneinsicht gem. § 630g BGB</h1>}
                {activeTemplate.id === 't4' && <h1>Anforderung einer ärztlichen Zweitmeinung gem. § 27b SGB V</h1>}
                {activeTemplate.id === 't5' && <h1>Ablehnung von Individuellen Gesundheitsleistungen (IGeL)</h1>}
                {activeTemplate.id === 't6' && <h1>Forderung einer schriftlichen Bestätigung der Abweisung (Notaufnahme/Facharzt)</h1>}
                {activeTemplate.id === 't7' && <h1>Akteneinsicht: Anforderung des vollständigen Geburtsberichts & CTG-Protokolle</h1>}
                {activeTemplate.id === 't8' && <h1>Widerspruch gegen den Ablehnungsbescheid</h1>}
                {activeTemplate.id === 't9' && <h1>Widerspruch gegen die Einstellung der Krankengeldzahlung (MDK-Aktenlage)</h1>}
                {activeTemplate.id === 't10' && <h1>Widerspruch gegen die Ablehnung der Mutter-Kind-Kur / Vater-Kind-Kur</h1>}
                {activeTemplate.id === 't11' && <h1>Widerspruch gegen die Ablehnung der Rehabilitationsmaßnahme</h1>}
                {activeTemplate.id === 't12' && <h1>Antrag auf Härtefall-Zuzahlungsbefreiung</h1>}
                {activeTemplate.id === 't13' && <h1>Antrag auf Kostenübernahme im Off-Label-Use</h1>}
                {activeTemplate.id === 't14' && <h1>Antrag auf Erstattung von Fahrkosten gem. § 60 SGB V</h1>}
                {activeTemplate.id === 't15' && <h1>Offizielle Beschwerde bei der zuständigen Ärztekammer</h1>}
                {activeTemplate.id === 't16' && <h1>Rüge wegen Verdachts auf Verstoß gegen das AGG (Diskriminierung)</h1>}
                {activeTemplate.id === 't17' && <h1>Gedächtnisprotokoll: Verdacht auf Behandlungsfehler</h1>}
                {activeTemplate.id === 't18' && <h1>Antrag auf Durchführung eines Schlichtungsverfahrens bei der Gutachterkommission</h1>}
                {activeTemplate.id === 't19' && <h1>Aufforderung zur kostenlosen Nachbesserung (Mängel beim Zahnersatz)</h1>}
                {activeTemplate.id === 't20' && <h1>Patientenverfügung & Vorsorgevollmacht (Express-Dokumentation)</h1>}

                <p>Sehr geehrte Damen und Herren,</p>

                {/* Template Specific Body Logic */}
                {activeTemplate.id === 't1' && <p>zur Vorbereitung auf die Behandlung / Diagnostik überreiche ich Ihnen hiermit mein Symptom-Dossier, um eine evidenzbasierte und effiziente Anamnese zu gewährleisten.</p>}
                {activeTemplate.id === 't2' && <p>ich fordere Sie hiermit nachdrücklich auf, gem. § 630f BGB Ihre Verweigerung der gewünschten Diagnostik haftbar in meiner Patientenakte zu dokumentieren.</p>}
                {activeTemplate.id === 't3' && <p>ich mache hiermit von meinem gesetzlichen Recht auf Akteneinsicht gem. § 630g BGB (sowie Art. 15 DSGVO) Gebrauch und fordere eine vollständige, kostenlose Kopie meiner Behandlungsdokumentation.</p>}
                {(activeTemplate.cat === 2 && activeTemplate.id !== 't12' && activeTemplate.id !== 't13' && activeTemplate.id !== 't14') && <p>hiermit lege ich fristgerecht Widerspruch gegen Ihren Ablehnungsbescheid ein.</p>}
                
                <br/>
                <strong>Sachverhalt / Begründung:</strong>
                <p style={{whiteSpace: 'pre-wrap', marginTop: '10px'}}>{formData.text1 || 'Es wurde kein spezifischer Sachverhalt angegeben.'}</p>
                <br/>

                {activeTemplate.id === 't17' && <p>Dieses Protokoll wurde zeitnah und nach bestem Wissen und Gewissen erstellt, um den Sachverhalt gerichtsfest zu dokumentieren.</p>}
                
                {(activeTemplate.id === 't8' || activeTemplate.id === 't9' || activeTemplate.id === 't10' || activeTemplate.id === 't11') && <p>Ich fordere eine erneute Prüfung unter Einbeziehung des Medizinischen Dienstes (MD) in Form einer persönlichen Begutachtung, da eine Entscheidung rein nach "Aktenlage" meiner komplexen gesundheitlichen Situation nicht gerecht wird.</p>}

                <br/><br/><br/>
                <p>Mit freundlichen Grüßen</p>
                <br/><br/><br/>
                <p>__________________________________<br/>({formData.name ? formData.name.split('\n')[0] : 'Unterschrift'})</p>

              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
