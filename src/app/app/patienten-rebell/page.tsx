"use client";

import { useState, useEffect, useRef } from 'react';
import './rebell.css';

export default function PatientenRebell() {
  const [view, setView] = useState('dossier');

  // Form states - Dossier
  const [name, setName] = useState('');
  const [arzt, setArzt] = useState('');
  const [symptome, setSymptome] = useState('');
  const [dauer, setDauer] = useState('');
  const [schmerzSkala, setSchmerzSkala] = useState('5');
  const [alltag, setAlltag] = useState('');
  const [bisher, setBisher] = useState('');

  // Form states - Verweigerung
  const [diagnostik, setDiagnostik] = useState('MRT / Bildgebung');
  const [begruendungArzt, setBegruendungArzt] = useState('Ist nicht nötig');

  // Print function using html2pdf if available, fallback to window.print
  const handlePrint = (elementId: string, filename: string) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    // @ts-ignore
    if (window.html2pdf) {
      const opt = {
        margin:       10,
        filename:     filename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      // @ts-ignore
      window.html2pdf().set(opt).from(el).save();
    } else {
      window.print();
    }
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

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const today = new Date().toLocaleDateString('de-DE');

  return (
    <div className="rebell-wrapper">
      <div className="graffiti-tag tag-1">GASLIGHTING<br/>SHIELD</div>
      <div className="graffiti-tag tag-2">REBELL<br/>01</div>

      <aside className="rebell-sidebar no-print">
        <div className="rebell-brand">
          PATIENTEN <span>REBELL v1.0</span>
        </div>

        <button 
          className={`rebell-navbtn ${view === 'dossier' ? 'active' : ''}`}
          onClick={() => setView('dossier')}
        >
          📝 Symptom-Dossier
        </button>
        <button 
          className={`rebell-navbtn ${view === 'doku' ? 'active' : ''}`}
          onClick={() => setView('doku')}
        >
          🛑 Verweigerungs-Doku
        </button>
        <button 
          className={`rebell-navbtn ${view === 'akte' ? 'active' : ''}`}
          onClick={() => setView('akte')}
        >
          📂 Akteneinsicht
        </button>
      </aside>

      <main className="rebell-main no-print">
        
        {/* DOSSIER VIEW */}
        <div className={`rebell-view ${view === 'dossier' ? 'active' : ''}`}>
          <h1 className="rebell-title">Symptom-Dossier</h1>
          <p className="rebell-subtitle">
            Ärzte haben oft wenig Zeit und neigen dazu, Symptome als "Stress" abzutun. 
            Präsentiere deine Leiden als hochprofessionellen, schriftlichen Bericht, um Medical Gaslighting zu verhindern.
          </p>

          <div className="rebell-panel">
            <div className="form-row">
              <div className="form-group">
                <label className="rebell-label">Dein Name</label>
                <input className="rebell-input" value={name} onChange={e => setName(e.target.value)} placeholder="Maria Muster" />
              </div>
              <div className="form-group">
                <label className="rebell-label">Name des Arztes / Praxis</label>
                <input className="rebell-input" value={arzt} onChange={e => setArzt(e.target.value)} placeholder="Dr. Med. Ignorant" />
              </div>
            </div>

            <div className="form-group">
              <label className="rebell-label">Hauptsymptome (Faktenbasiert)</label>
              <textarea className="rebell-textarea" value={symptome} onChange={e => setSymptome(e.target.value)} placeholder="Z.B. Extreme Schmerzen im Unterleib, ausstrahlend in den Rücken. Blutdruckabfall." />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="rebell-label">Dauer der Beschwerden</label>
                <input className="rebell-input" value={dauer} onChange={e => setDauer(e.target.value)} placeholder="Seit 6 Monaten durchgehend" />
              </div>
              <div className="form-group">
                <label className="rebell-label">Schmerzskala (1-10)</label>
                <select className="rebell-select" value={schmerzSkala} onChange={e => setSchmerzSkala(e.target.value)}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} / 10</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="rebell-label">Einschränkung im Alltag</label>
              <textarea className="rebell-textarea" value={alltag} onChange={e => setAlltag(e.target.value)} placeholder="Z.B. Ich kann an 3 Tagen im Monat nicht arbeiten. Schmerzmittel wirken nicht mehr." />
            </div>

            <div className="form-group">
              <label className="rebell-label">Bisherige (erfolglose) Behandlungsansätze / Arzt-Aussagen</label>
              <textarea className="rebell-textarea" value={bisher} onChange={e => setBisher(e.target.value)} placeholder="Mir wurde gesagt, es sei nur Stress. Ibuprofen hilft nicht." />
            </div>

            <button className="rebell-btn" onClick={() => handlePrint('pdf-dossier', 'Symptom_Dossier.pdf')}>
              🖨️ PDF Dossier Erzeugen
            </button>
          </div>
        </div>

        {/* DOKU VIEW */}
        <div className={`rebell-view ${view === 'doku' ? 'active' : ''}`}>
          <h1 className="rebell-title">Aufforderung zur Dokumentation</h1>
          <p className="rebell-subtitle">
            Dein Arzt weigert sich, ein MRT, Blutbild oder einen Spezialisten anzuordnen? 
            Zwinge ihn dazu, diese Verweigerung formell in deiner Akte zu dokumentieren. Das ändert oft schlagartig die Meinung.
          </p>

          <div className="rebell-panel">
            <div className="form-row">
              <div className="form-group">
                <label className="rebell-label">Dein Name</label>
                <input className="rebell-input" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="rebell-label">Name des Arztes</label>
                <input className="rebell-input" value={arzt} onChange={e => setArzt(e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label className="rebell-label">Verweigerte Diagnostik</label>
              <input className="rebell-input" value={diagnostik} onChange={e => setDiagnostik(e.target.value)} placeholder="z.B. MRT des Beckens" />
            </div>

            <div className="form-group">
              <label className="rebell-label">Begründung des Arztes</label>
              <input className="rebell-input" value={begruendungArzt} onChange={e => setBegruendungArzt(e.target.value)} placeholder="z.B. 'Dafür sind Sie zu jung'" />
            </div>

            <button className="rebell-btn toxic" onClick={() => handlePrint('pdf-doku', 'Forderung_Dokumentation.pdf')}>
              ⚠️ PDF Forderung Erzeugen
            </button>
          </div>
        </div>

        {/* AKTE VIEW */}
        <div className={`rebell-view ${view === 'akte' ? 'active' : ''}`}>
          <h1 className="rebell-title">Akteneinsicht</h1>
          <p className="rebell-subtitle">
            Gemäß § 630g BGB hast du das Recht, jederzeit eine vollständige Kopie deiner Patientenakte anzufordern, um zu prüfen, was Ärzte über dich notiert haben (oft verharmlosend).
          </p>

          <div className="rebell-panel">
            <div className="form-row">
              <div className="form-group">
                <label className="rebell-label">Dein Name</label>
                <input className="rebell-input" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="rebell-label">Praxis</label>
                <input className="rebell-input" value={arzt} onChange={e => setArzt(e.target.value)} />
              </div>
            </div>

            <button className="rebell-btn" onClick={() => handlePrint('pdf-akte', 'Anforderung_Patientenakte.pdf')}>
              🖨️ PDF Akteneinsicht Erzeugen
            </button>
          </div>
        </div>
      </main>

      {/* OFF-SCREEN PDF TEMPLATES (Hidden in UI, rendered in PDF) */}
      <div style={{ position: 'absolute', top: '-10000px', left: '-10000px' }}>
        
        {/* PDF 1: Dossier */}
        <div id="pdf-dossier" className="doc-paper">
          <div className="header">
            <div className="header-title">Patienten-Dossier & Symptom-Bericht</div>
            <div style={{textAlign: 'right'}}>
              <strong>Stand:</strong> {today}<br/>
              <strong>Patientin:</strong> {name || '______________________'}
            </div>
          </div>

          <div className="meta-grid">
            <div className="meta-item"><strong>Behandelnde Praxis:</strong> {arzt || '______________________'}</div>
            <div className="meta-item"><strong>Dauer der Beschwerden:</strong> {dauer || '______________________'}</div>
            <div className="meta-item"><strong>Schmerz-Level (1-10):</strong> {schmerzSkala} / 10</div>
          </div>

          <h2>1. Hauptsymptome & Klinisches Bild</h2>
          <p style={{whiteSpace: 'pre-wrap', minHeight: '80px'}}>
            {symptome || 'Es wurden noch keine spezifischen Symptome formuliert.'}
          </p>

          <h2>2. Einschränkungen der Lebensqualität & Alltagsfähigkeit</h2>
          <p style={{whiteSpace: 'pre-wrap', minHeight: '80px'}}>
            {alltag || 'Auswirkungen auf den Alltag nicht spezifiziert.'}
          </p>

          <h2>3. Bisherige Therapieversuche & ärztliche Aussagen</h2>
          <p style={{whiteSpace: 'pre-wrap', minHeight: '80px'}}>
            {bisher || 'Keine vorherigen Behandlungen dokumentiert.'}
          </p>

          <div style={{marginTop: '50px', fontSize: '10pt', color: '#555', borderTop: '1px solid #ccc', paddingTop: '10px'}}>
            <em>Dieses Dossier dient der objektiven, schriftlichen Dokumentation der Beschwerden und ist der Patientenakte gem. § 630f BGB beizufügen. 
            Es soll sicherstellen, dass die Schwere der Einschränkungen nicht subjektiv abgewertet, sondern evidenzbasiert und leitliniengerecht behandelt wird.</em>
          </div>
        </div>

        {/* PDF 2: Doku Verweigerung */}
        <div id="pdf-doku" className="doc-paper">
          <p style={{textAlign: 'right'}}>{today}</p>
          <p>
            <strong>Von:</strong> {name || '______________________'}<br/>
            <strong>An:</strong> {arzt || '______________________'}
          </p>
          <br/><br/>
          <h1 style={{fontSize: '14pt', textAlign: 'left'}}>Formelle Aufforderung zur Dokumentation einer verweigerten Diagnostik / Behandlung</h1>
          <br/>
          <p>Sehr geehrte Damen und Herren,</p>
          <p>hiermit beziehe ich mich auf unser Gespräch bzw. die Behandlung vom {today}.</p>
          <p>
            In diesem Rahmen habe ich ausdrücklich um die Durchführung bzw. Überweisung für folgende Diagnostik/Behandlung gebeten:<br/><br/>
            <strong>{diagnostik || '__________________________________'}</strong>
          </p>
          <p>
            Diese Bitte wurde von Ihnen mit folgender Begründung abgelehnt:<br/><br/>
            <strong>"{begruendungArzt || '__________________________________'}"</strong>
          </p>
          <p>
            Gemäß § 630f BGB ist der Behandelnde verpflichtet, sämtliche aus fachlicher Sicht für die derzeitige und künftige Behandlung wesentlichen Maßnahmen und deren Ergebnisse in der Patientenakte aufzuzeichnen. Da ich unter anhaltenden Beschwerden leide und Sie eine weiterführende Abklärung ablehnen, ist dies ein wesentlicher Bestandteil der Behandlungshistorie.
          </p>
          <p>
            <strong>Ich fordere Sie hiermit höflich, aber bestimmt dazu auf, meine explizite Bitte nach der o.g. Diagnostik sowie Ihre Verweigerung inklusive Ihrer ärztlichen Begründung formell in meiner Patientenakte zu dokumentieren.</strong>
          </p>
          <p>
            Ich behalte mir vor, zeitnah eine Kopie meiner Patientenakte gem. § 630g BGB anzufordern, um die erfolgte Dokumentation zu prüfen.
          </p>
          <br/><br/>
          <p>Mit freundlichen Grüßen</p>
          <br/><br/>
          <p>__________________________________<br/>({name || 'Unterschrift'})</p>
        </div>

        {/* PDF 3: Akteneinsicht */}
        <div id="pdf-akte" className="doc-paper">
          <p style={{textAlign: 'right'}}>{today}</p>
          <p>
            <strong>Von:</strong> {name || '______________________'}<br/>
            <strong>An:</strong> {arzt || '______________________'}
          </p>
          <br/><br/>
          <h1 style={{fontSize: '14pt', textAlign: 'left'}}>Geltendmachung des Rechts auf Akteneinsicht gem. § 630g BGB</h1>
          <br/>
          <p>Sehr geehrte Damen und Herren,</p>
          <p>
            hiermit mache ich von meinem gesetzlichen Recht auf Akteneinsicht gemäß § 630g Abs. 1 BGB sowie Art. 15 Abs. 1 DSGVO Gebrauch.
          </p>
          <p>
            Ich fordere Sie auf, mir <strong>unverzüglich, spätestens jedoch innerhalb einer Frist von vier Wochen</strong> nach Eingang dieses Schreibens, eine vollständige Kopie meiner gesamten Behandlungsdokumentation (Patientenakte) zur Verfügung zu stellen.
          </p>
          <p>
            Dies umfasst sämtliche in der Akte befindlichen Unterlagen, insbesondere:
          </p>
          <ul>
            <li>Anamnesen, Diagnosen und Befunde</li>
            <li>Therapiepläne und Arztbriefe</li>
            <li>Pflegeberichte und Gesprächsnotizen</li>
            <li>Laborwerte, EKG, Röntgen-, CT- oder MRT-Befunde</li>
          </ul>
          <p>
            Gemäß Art. 15 Abs. 3 DSGVO ist die erste Kopie der Patientenakte für mich <strong>kostenfrei</strong> zur Verfügung zu stellen (bestätigt durch EuGH, Urt. v. 26.10.2023, Az. C-307/22).
          </p>
          <p>
            Bitte senden Sie mir die Unterlagen vorzugsweise digital als PDF oder andernfalls postalisch an meine bei Ihnen hinterlegte Adresse zu.
          </p>
          <br/><br/>
          <p>Mit freundlichen Grüßen</p>
          <br/><br/>
          <p>__________________________________<br/>({name || 'Unterschrift'})</p>
        </div>

      </div>
    </div>
  );
}
