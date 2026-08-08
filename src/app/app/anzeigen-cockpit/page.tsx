"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './cockpit.css';

const THEMES = [
  { id: 'theme-midnight', class: 't-midnight', label: 'Midnight Stealth' },
  { id: 'theme-cyber', class: 't-cyber', label: 'Cyber Rebell' },
  { id: 'theme-alert', class: 't-alert', label: 'Alert Danger' },
  { id: 'theme-minimal', class: 't-minimal', label: 'Minimal Light' }
];

const TEMPLATES = [
  // Original
  { id: 'c1', cat: 1, catName: 'Strafrecht', title: 'Strafanzeige', desc: 'Erstelle eine formelle Strafanzeige für Polizei oder Staatsanwaltschaft (z.B. bei Betrug, Stalking).' },
  { id: 'c2', cat: 2, catName: 'Arbeitsrecht', title: 'Überlastungsanzeige', desc: 'Sichere dich bei Personalmangel rechtlich ab, um Haftung bei Fehlern zu vermeiden.' },
  { id: 'c3', cat: 3, catName: 'Familie & Soziales', title: 'Kindeswohl-Meldung', desc: 'Formelle Meldung an das Jugendamt bei Verdacht auf Kindeswohlgefährdung.' },
  { id: 'c4', cat: 4, catName: 'Zivilrecht', title: 'Mietmangel-Anzeige', desc: 'Offizielle Mängelanzeige an den Vermieter inkl. Mietminderungs-Androhung.' },
  
  // Neue Waffen
  { id: 'c5', cat: 5, catName: 'Öffentliches Recht', title: 'Ordnungsamt-Meldung', desc: 'Anzeige wegen Falschparkern, Lärmbelästigung oder illegaler Müllentsorgung.' },
  { id: 'c6', cat: 1, catName: 'Datenschutz', title: 'DSGVO-Beschwerde', desc: 'Beschwerde an den Landesdatenschutzbeauftragten wegen Datenmissbrauch.' },
  { id: 'c7', cat: 2, catName: 'Arbeitsrecht', title: 'Gewerbeaufsicht-Meldung', desc: 'Anonyme Meldung von schweren Arbeitsschutzverstößen oder unbezahlten Überstunden.' },
  { id: 'c8', cat: 5, catName: 'Öffentliches Recht', title: 'Veterinäramt-Meldung', desc: 'Offizielles Schreiben wegen Vernachlässigung oder Tierquälerei.' },
  { id: 'c9', cat: 5, catName: 'Öffentliches Recht', title: 'Finanzamt-Tipp', desc: 'Formelle Anzeige wegen Steuerhinterziehung oder Schwarzarbeit.' }
];

export default function AnzeigenCockpit() {
  const router = useRouter();
  const [theme, setTheme] = useState('theme-midnight');
  const [view, setView] = useState<'matrix' | 'form'>('matrix');
  const [activeId, setActiveId] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    gegenseite: '', 
    datum: new Date().toLocaleDateString('de-DE'),
    sachverhalt: '',
    forderung: '' // E.g., fristsetzung
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    window.print();
  };

  // Ensure body scroll is disabled for this app to allow internal layout scrolling
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalOverflow; };
  }, []);

  const activeTemplate = TEMPLATES.find(t => t.id === activeId);

  return (
    <div className={`cockpit-wrapper ${theme}`}>
      
      {/* Theme Switcher */}
      <div className="theme-selector no-print">
        {THEMES.map(t => (
          <div 
            key={t.id} 
            className={`theme-dot ${t.class} ${theme === t.id ? 'active' : ''}`}
            onClick={() => setTheme(t.id)}
            title={t.label}
          />
        ))}
      </div>

      {/* MATRIX VIEW */}
      {view === 'matrix' && (
        <aside className="cockpit-sidebar no-print">
          <div className="cockpit-brand">ANZEIGEN <span>COCKPIT V4.0</span></div>
          <button className="cockpit-btn" style={{width: '100%', marginBottom: '20px'}} onClick={() => router.push('/app')}>
            ← ZUM DASHBOARD
          </button>
        </aside>
      )}

      <main className={`cockpit-main no-print ${view === 'form' ? 'form-mode' : ''}`}>
        
        {view === 'matrix' && (
          <div className="matrix-container">
            <h1 className="cockpit-brand" style={{fontSize: '42px', marginBottom: '10px'}}>Wähle deine Anzeige.</h1>
            <p style={{color: 'var(--muted)', marginBottom: '40px', fontSize: '16px'}}>Von der Strafanzeige bis zur Gewerbeaufsicht. Rechtssicher und direkt.</p>
            
            <div className="matrix-grid">
              {TEMPLATES.map(t => (
                <div key={t.id} className="matrix-card" onClick={() => { setActiveId(t.id); setView('form'); }}>
                  <div className="badge">{t.catName}</div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  <div style={{color: 'var(--accent)', fontSize: '11px', fontWeight: 'bold'}}>FORMULAR STARTEN →</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SPLIT FORM VIEW */}
        {view === 'form' && activeTemplate && (
          <div className="split-layout">
            <div className="split-form">
              <div className="split-form-header">
                <button 
                  style={{background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 'bold'}}
                  onClick={() => setView('matrix')}
                >
                  ← Zurück zur Übersicht
                </button>
                <h2 style={{color: 'var(--ink)', fontSize: '20px', fontFamily: 'Outfit, sans-serif'}}>{activeTemplate.title}</h2>
              </div>
              
              <div className="split-form-body">
                <div className="form-group">
                  <label className="cockpit-label">1. Absender (Dein Name & Anschrift)</label>
                  <textarea className="cockpit-textarea" style={{minHeight: '80px'}} name="name" value={formData.name} onChange={handleChange} placeholder="Maria Muster&#10;Musterstraße 1&#10;12345 Stadt" />
                </div>
                
                <div className="form-group">
                  <label className="cockpit-label">
                    2. Empfänger 
                    {activeTemplate.id === 'c1' && ' (Polizei / Staatsanwaltschaft)'}
                    {activeTemplate.id === 'c2' && ' (Arbeitgeber / Pflegedienstleitung)'}
                    {activeTemplate.id === 'c3' && ' (Zuständiges Jugendamt)'}
                    {activeTemplate.id === 'c4' && ' (Vermieter / Hausverwaltung)'}
                    {activeTemplate.id === 'c5' && ' (Ordnungsamt der Stadt)'}
                    {activeTemplate.id === 'c6' && ' (Landesdatenschutzbeauftragter)'}
                    {activeTemplate.id === 'c7' && ' (Gewerbeaufsichtsamt)'}
                    {activeTemplate.id === 'c8' && ' (Veterinäramt)'}
                    {activeTemplate.id === 'c9' && ' (Finanzamt / Zoll)'}
                  </label>
                  <textarea className="cockpit-textarea" style={{minHeight: '80px'}} name="gegenseite" value={formData.gegenseite} onChange={handleChange} placeholder="Behörde / Firma / Person..." />
                </div>

                <div className="form-group">
                  <label className="cockpit-label">3. Sachverhalt (Was ist passiert?)</label>
                  <textarea className="cockpit-textarea" style={{minHeight: '150px'}} name="sachverhalt" value={formData.sachverhalt} onChange={handleChange} placeholder="Bitte den Vorfall detailliert beschreiben (Datum, Ort, Beteiligte)..." />
                </div>

                {['c4', 'c6'].includes(activeTemplate.id) && (
                  <div className="form-group">
                    <label className="cockpit-label">4. Fristsetzung (Datum)</label>
                    <input className="cockpit-input" name="forderung" value={formData.forderung} onChange={handleChange} placeholder="z.B. 14 Tage ab heute" />
                  </div>
                )}
              </div>

              <div className="split-form-footer">
                <button className="cockpit-btn" style={{width: '100%'}} onClick={handlePrint}>
                  🖨️ DIREKT DRUCKEN / PDF
                </button>
              </div>
            </div>

            <div className="split-preview">
              {/* LIVE PDF PAPER */}
              <div className="doc-paper">
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '40px'}}>
                  <div style={{width: '250px', whiteSpace: 'pre-wrap'}}>{formData.name || 'Max Mustermann\nMusterstraße 1\n12345 Stadt'}</div>
                  <div style={{textAlign: 'right'}}>{formData.datum}</div>
                </div>
                
                <div style={{whiteSpace: 'pre-wrap', marginBottom: '40px', fontWeight: 'bold'}}>{formData.gegenseite || 'Empfänger / Behörde / Amt'}</div>
                
                {/* Custom Titles */}
                {activeTemplate.id === 'c1' && <h1>Strafanzeige und Strafantrag</h1>}
                {activeTemplate.id === 'c2' && <h1>Überlastungsanzeige / Gefährdungsanzeige gem. § 15 & 16 ArbSchG</h1>}
                {activeTemplate.id === 'c3' && <h1>Meldung gem. § 8a SGB VIII - Verdacht auf Kindeswohlgefährdung</h1>}
                {activeTemplate.id === 'c4' && <h1>Mängelanzeige und Aufforderung zur Mängelbeseitigung</h1>}
                {activeTemplate.id === 'c5' && <h1>Anzeige einer Ordnungswidrigkeit</h1>}
                {activeTemplate.id === 'c6' && <h1>Beschwerde wegen Verstoß gegen die DSGVO (Art. 77 DSGVO)</h1>}
                {activeTemplate.id === 'c7' && <h1>Meldung wegen Verstoß gegen das Arbeitsschutzgesetz / Arbeitszeitgesetz</h1>}
                {activeTemplate.id === 'c8' && <h1>Anzeige wegen Verdachts auf Verstoß gegen das Tierschutzgesetz (TierSchG)</h1>}
                {activeTemplate.id === 'c9' && <h1>Meldung wegen Verdachts auf Steuerhinterziehung / Schwarzarbeit</h1>}

                <p>Sehr geehrte Damen und Herren,</p>

                {activeTemplate.id === 'c1' && <p>hiermit erstatte ich Strafanzeige gegen Unbekannt bzw. gegen die im Sachverhalt benannte Person wegen aller in Betracht kommenden Delikte und stelle vorsorglich Strafantrag.</p>}
                {activeTemplate.id === 'c2' && <p>hiermit zeige ich formell eine konkrete Überlastungssituation an. Unter den derzeitigen Arbeitsbedingungen kann ich eine ordnungsgemäße Aufgabenerfüllung nicht mehr gewährleisten. Ich weise vorsorglich darauf hin, dass ich für daraus resultierende Fehler keine Haftung übernehme.</p>}
                {activeTemplate.id === 'c3' && <p>hiermit melde ich einen gewichtigen Verdacht auf Kindeswohlgefährdung. Ich bitte Sie, den unten geschilderten Sachverhalt dringend zu prüfen und entsprechende Maßnahmen zum Schutz des Kindes einzuleiten.</p>}
                {activeTemplate.id === 'c4' && <p>hiermit zeige ich formell folgende Mängel an der von mir gemieteten Mietsache an.</p>}
                {activeTemplate.id === 'c5' && <p>hiermit erstatte ich Anzeige wegen der unten beschriebenen Ordnungswidrigkeit. Ich bitte um Prüfung und Einleitung eines Bußgeldverfahrens.</p>}
                {activeTemplate.id === 'c6' && <p>hiermit reiche ich formell Beschwerde gegen den unten genannten Verantwortlichen ein, da dieser meine Rechte aus der Datenschutz-Grundverordnung (DSGVO) verletzt hat.</p>}
                {activeTemplate.id === 'c7' && <p>hiermit möchte ich Sie auf gravierende Missstände hinsichtlich des Arbeitsschutzes bzw. des Arbeitszeitgesetzes in dem unten benannten Betrieb aufmerksam machen und um eine behördliche Prüfung bitten.</p>}
                {activeTemplate.id === 'c8' && <p>hiermit erstatte ich Anzeige wegen des Verdachts auf Tierquälerei bzw. nicht artgerechter Haltung. Ich bitte Sie als zuständiges Veterinäramt um umgehende Kontrolle der Haltungsbedingungen.</p>}
                {activeTemplate.id === 'c9' && <p>hiermit möchte ich Ihnen folgenden Sachverhalt zur Prüfung übermitteln, da ein begründeter Verdacht auf ein steuer- oder abgabenrechtliches Vergehen besteht.</p>}
                
                <br/>
                <strong>Darlegung des Sachverhalts:</strong>
                <p style={{whiteSpace: 'pre-wrap', marginTop: '10px'}}>{formData.sachverhalt || 'Der Sachverhalt wurde noch nicht beschrieben.'}</p>
                <br/>

                {activeTemplate.id === 'c1' && <p>Ich bitte um Mitteilung des Aktenzeichens und um Information über den Ausgang des Verfahrens gem. § 171 StPO.</p>}
                {activeTemplate.id === 'c4' && <p>Ich fordere Sie auf, den Mangel bis zum <strong>{formData.forderung || 'angegebenen Datum'}</strong> zu beheben. Andernfalls behalte ich mir vor, die Miete angemessen zu mindern.</p>}
                {activeTemplate.id === 'c6' && <p>Ich fordere Sie auf, tätig zu werden und mich über den Stand und die Ergebnisse der Beschwerde zu unterrichten. Frist zur Stellungnahme durch das Unternehmen war der <strong>{formData.forderung || '_______________'}</strong>, welche fruchtlos verstrichen ist.</p>}
                {(activeTemplate.id === 'c7' || activeTemplate.id === 'c9') && <p>Aus Sorge vor Repressalien bitte ich darum, meine Identität gegenüber dem Beschuldigten vertraulich zu behandeln.</p>}

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
