/* ======================================================
   Real Life – App JavaScript
   All topics, content, checklist, glossary & interactions
   ====================================================== */

// ─────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────

let TOPICS = [
  {
    id: 'wohnung',
    icon: '🏠',
    color: '#4f8ef7',
    gradient: 'linear-gradient(135deg,#1e3a5f,#2d1b69)',
    title: 'Eigene Wohnung',
    short: 'Mietvertrag, Kaution, Nebenkosten & Rechte als Mieter',
    tags: ['Mietrecht', 'Finanzen', 'Haushalt'],
    sections: [
      {
        title: 'Wohnung suchen',
        content: `
          <p class="content-intro">Die erste eigene Wohnung zu finden ist aufregend – aber ohne das richtige Wissen kann es teuer werden. Hier ist was du wirklich wissen musst.</p>
          <div class="info-card">
            <h4>📋 Wo suchen?</h4>
            <ul>
              <li><strong>ImmoScout24.de</strong> – Deutschlands größte Plattform</li>
              <li><strong>eBay Kleinanzeigen / Kleinanzeigen.de</strong> – oft günstigere Angebote direkt vom Vermieter</li>
              <li><strong>WG-Gesucht.de</strong> – für WG-Zimmer ideal</li>
              <li><strong>Facebook Marketplace</strong> – lokale Gruppen, oft ohne Makler</li>
              <li>Schwarzes Brett an Uni, Supermarkt, Waschsalon</li>
            </ul>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Beispiel: Was bedeuten die Abkürzungen?</div>
            <p><strong>2 ZKB = 2 Zimmer + Küche + Bad</strong> → eine 2-Zimmer-Wohnung mit separater Küche und Bad.<br>
            <strong>KM = Kaltmiete</strong> (ohne Heizung/Wasser).<br>
            <strong>WM = Warmmiete</strong> (inkl. Nebenkosten).<br>
            <strong>NK = Nebenkosten</strong> (Wasser, Heizung, Müll, Hausmeister).<br>
            <strong>OHNE Provision</strong> = du zahlst keinen Makler!</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Tipp</div>
            <p>Maklergebühren trägt seit 2015 das Bestellerprinzip – wer den Makler beauftragt zahlt ihn. Als Mieter zahlst du in der Regel keine Maklergebühr mehr. Wenn ein Vermieter trotzdem Provision fordert – Finger weg!</p>
          </div>
          <div class="info-card">
            <h4>🔍 Worauf bei der Besichtigung achten?</h4>
            <ul>
              <li>Schimmel in Ecken, Fenstern, hinter Möbeln prüfen</li>
              <li>Wasserabfluss & Druck testen (Hähne aufmachen)</li>
              <li>Heizung andrehen – funktioniert sie?</li>
              <li>Handyempfang & ggf. DSL-Verfügbarkeit prüfen</li>
              <li>Lärm prüfen: Wann ist die Besichtigung? (Tageszeit wichtig)</li>
              <li>Kellerabteil, Fahrradraum, Waschkeller prüfen</li>
              <li>Übergabeprotokoll: Fotos machen von ALLEM</li>
            </ul>
          </div>
        `
      },
      {
        title: 'Mietvertrag',
        content: `
          <p class="content-intro">Der Mietvertrag ist ein rechtlich bindender Vertrag. Lies ihn von Anfang bis Ende – egal wie lang er ist!</p>
          <ol class="steps-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-content">
                <strong>Mietdauer & Kündigung</strong>
                <span>Unbefristete Mietverträge sind die Norm. Du kannst mit 3 Monaten Frist kündigen. Befristete Verträge enden automatisch – aber prüfe ob sie legal befristet sind (nur mit triftigem Grund möglich).</span>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-content">
                <strong>Kaution (Sicherheitsleistung)</strong>
                <span>Maximal 3 Monatskaltmieten erlaubt. Du kannst in 3 Ratenzahlungen zahlen! Vermieter muss die Kaution auf einem separaten Konto verwalten – du bekommst sie beim Auszug zurück (abzüglich Schäden).</span>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-content">
                <strong>Schönheitsreparaturen prüfen!</strong>
                <span>Viele Klauseln sind unwirksam (z.B. "Wohnung muss bei Auszug weiß gestrichen sein"). Der BGH hat viele solcher Klauseln gekippt. Wenn du sowas siehst: Mieterschutzverein fragen!</span>
              </div>
            </li>
            <li>
              <div class="step-num">4</div>
              <div class="step-content">
                <strong>Haustiere & Untervermieter</strong>
                <span>Steht dazu etwas im Vertrag? Kleine Tiere (Hamster, Fische) darf man immer halten. Für Hunde/Katzen brauchst du meist Erlaubnis.</span>
              </div>
            </li>
            <li>
              <div class="step-num">5</div>
              <div class="step-content">
                <strong>Wohnungsübergabe: Protokoll!</strong>
                <span>Erstelle ein schriftliches Übergabeprotokoll mit Fotos. Beide Parteien unterschreiben. So schützt du dich vor unrechtmäßigen Kautions-Abzügen.</span>
              </div>
            </li>
          </ol>
          <div class="warning-box">
            <div class="warning-box-label">⚠️ Achtung</div>
            <p>Unterschreib NIE einen Vertrag unter Druck. "Die Wohnung ist heiß begehrt" – trotzdem: mindestens 24 Stunden zum Durchlesen verlangen. Seriöse Vermieter akzeptieren das!</p>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Beispiel: Kündigung richtig machen</div>
            <p>Lea möchte zum 31. Dezember ausziehen. Sie muss <strong>spätestens am 30. September</strong> kündigen (3 Monate Vorlaufzeit). Kündigung IMMER per Einwurfeinschreiben schicken – so hast du einen Nachweis!</p>
          </div>
        `
      },
      {
        title: 'Nebenkosten',
        content: `
          <p class="content-intro">Nebenkosten werden unterschätzt. Je nach Wohnung und Heizung können sie 30–40% der Kaltmiete ausmachen!</p>
          <table class="cost-table">
            <thead><tr><th>Kostenart</th><th>Umlagefähig?</th><th>Typisch/Monat</th></tr></thead>
            <tbody>
              <tr><td>Heizkosten</td><td class="cost-required">Ja</td><td>30–120€</td></tr>
              <tr><td>Warmwasser</td><td class="cost-required">Ja</td><td>10–25€</td></tr>
              <tr><td>Hausstrom/Strom-Gemeinschaft</td><td class="cost-required">Ja</td><td>5–15€</td></tr>
              <tr><td>Wasser/Abwasser</td><td class="cost-required">Ja</td><td>15–40€</td></tr>
              <tr><td>Müllentsorgung</td><td class="cost-required">Ja</td><td>5–15€</td></tr>
              <tr><td>Hausmeister</td><td class="cost-required">Ja</td><td>10–25€</td></tr>
              <tr><td>Gebäudeversicherung</td><td class="cost-required">Ja</td><td>15–50€</td></tr>
              <tr><td>Verwaltungskosten</td><td class="cost-important">Nein!</td><td>–</td></tr>
              <tr><td>Instandhaltungsrücklage</td><td class="cost-important">Nein!</td><td>–</td></tr>
            </tbody>
          </table>
          <div class="tip-box">
            <div class="tip-box-label">💡 Nebenkostenabrechnung prüfen</div>
            <p>Spätestens 12 Monate nach Ende des Abrechnungsjahres muss die Abrechnung kommen, sonst verliert der Vermieter seinen Nachzahlungsanspruch! Du hast 12 Monate Zeit, Einspruch zu erheben. Lass sie bei Bedarf vom Mieterschutzverein prüfen (ca. 10€ Beitrag/Monat – lohnt sich!)</p>
          </div>
          <div class="info-card">
            <h4>💡 Strom selbst anmelden</h4>
            <p>Beim Einzug läuft Strom zunächst beim Grundversorger. Dein Job: Mit einem Vergleichsportal (Verivox, Check24) den günstigsten Anbieter finden und schnell wechseln. Kannst hunderte Euro im Jahr sparen!</p>
          </div>
        `
      },
      {
        title: 'Wohnrechte',
        content: `
          <p class="content-intro">Als Mieter hast du in Deutschland sehr starke Rechte. Kenne sie!</p>
          <div class="info-card">
            <h4>🛡️ Mietminderung</h4>
            <p>Bei Mängeln (Schimmel, defekte Heizung, Wasser durch Dach) darfst du die Miete mindern. Erst Mangel schriftlich anzeigen, Frist setzen – dann mindern. Typische Minderungen: Heizung defekt im Winter = 20–30%, starker Schimmel = 10–25%.</p>
          </div>
          <div class="info-card">
            <h4>🔒 Kündigung durch Vermieter</h4>
            <p>Vermieter kann nur bei Eigenbedarf, schwerem Verstoß (mehrfach nicht zahlen) oder wirtschaftlicher Verwertung kündigen. Einfach so kündigen ist in Deutschland NICHT möglich. Frist: 3 Monate (unter 5 Jahre), 6 Monate (5–8 Jahre), 9 Monate (über 8 Jahre).</p>
          </div>
          <div class="info-card">
            <h4>🔧 Reparaturen</h4>
            <p>Kleine Reparaturen bis ca. 75-100€ sind je nach Vertrag Mietersache. Alles was an der Substanz ist (Heizung, Rohre, Elektrik) muss der Vermieter bezahlen. Schäden sofort schriftlich melden!</p>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Anlaufstelle: Mieterschutzverein</div>
            <p>Dein Vermieter verhält sich komisch? Mieterschutzverein beitreten! Kosten: ca. 8–15€/Monat. Dafür bekommst du kostenlose Rechtsberatung zu jedem Mietstreit. Infos: <strong>mieterbund.de</strong></p>
          </div>
        `
      }
    ]
  },
  {
    id: 'versicherungen',
    icon: '🛡️',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg,#2d1b69,#1a1040)',
    title: 'Versicherungen',
    short: 'Welche sind Pflicht, welche sind sinnvoll, was kannst du weglassen',
    tags: ['Pflicht', 'Schutz', 'Finanzen'],
    sections: [
      {
        title: 'Überblick',
        content: `
          <p class="content-intro">Versicherungen sind langweilig – bis du sie brauchst. Hier trennst du Pflicht von "nice to have" von "totaler Abzocke".</p>
          <div class="info-card">
            <h4>🚨 PFLICHT-Versicherungen (ohne geht nicht)</h4>
            <ul>
              <li><strong>Krankenversicherung</strong> – gesetzlich vorgeschrieben ab 18 (wenn du nicht mehr familienversichert bist)</li>
              <li><strong>Kfz-Haftpflicht</strong> – wenn du ein Auto hast, absolut Pflicht</li>
              <li><strong>Berufshaftpflicht</strong> – für bestimmte Berufe (Arzt, Anwalt, Lehrer)</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>✅ SEHR WICHTIG (fast jeder braucht sie)</h4>
            <ul>
              <li><strong>Private Haftpflichtversicherung</strong> – die wichtigste überhaupt!</li>
              <li><strong>Berufsunfähigkeitsversicherung</strong> – sichert dein Einkommen wenn du nicht mehr arbeiten kannst</li>
              <li><strong>Hausratversicherung</strong> – schützt deinen Besitz in der Wohnung</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>ℹ️ SITUATIONSABHÄNGIG</h4>
            <ul>
              <li>Zahnzusatz (bei hoher Zahnarztnutzung)</li>
              <li>Rechtsschutzversicherung (bei Risikoberufen/Miete)</li>
              <li>Reisekrankenversicherung (für Auslandsreisen)</li>
              <li>Unfallversicherung (wenn kein sicherer Job)</li>
            </ul>
          </div>
          <div class="warning-box">
            <div class="warning-box-label">❌ Oft unnötig</div>
            <p>Handyversicherung, Brillenversicherung, Reisegepäckversicherung, Kreditkartenversicherung, Reiserücktrittsversicherung (wenn du selten verreist) – lass die Finger weg oder vergleiche sehr genau!</p>
          </div>
        `
      },
      {
        title: 'Haftpflicht',
        content: `
          <p class="content-intro">Die private Haftpflichtversicherung ist die wichtigste Versicherung für jeden – und kostet nur ca. 3–8€ pro Monat!</p>
          <div class="example-box">
            <div class="example-box-label">📌 Warum ist sie so wichtig?</div>
            <p>Tim radelt durch die Stadt und fährt jemanden um. Der Verletzte kann 6 Monate nicht arbeiten und verklagt Tim auf <strong>80.000€ Schadensersatz</strong>. Ohne Haftpflicht muss Tim das aus eigener Tasche zahlen – mit Haftpflicht zahlt die Versicherung!</p>
          </div>
          <div class="info-card">
            <h4>Was ist versichert?</h4>
            <ul>
              <li>Du verletzt jemanden aus Versehen (Fahrrad, zu Fuß, Sport)</li>
              <li>Du beschädigst fremdes Eigentum (Handy fallen lassen, Parkkratzert)</li>
              <li>Schlüsselverlust (Mieter-Haftpflicht)</li>
              <li>Wasserrohrschäden die du verursachst</li>
            </ul>
          </div>
          <div class="warning-box">
            <div class="warning-box-label">⚠️ Was NICHT versichert ist</div>
            <p>Schäden die du dir selbst verursachst! Oder Schäden, die du vorsätzlich herbeigeführt hast. Oder Schäden an gemieteten Gegenständen (Check: oft extra buchbar).</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Wo abschließen?</div>
            <p>Vergleiche auf <strong>Check24.de</strong> oder <strong>Verivox.de</strong>. Gute Anbieter: HUK-COBURG, DEVK, Getsafe (App), Friday. Deckungssumme mind. <strong>10 Mio. €</strong> wählen!</p>
          </div>
        `
      },
      {
        title: 'Krankenversicherung',
        content: `
          <p class="content-intro">Ab 18 oder wenn du nicht mehr in Ausbildung/Studium bist, musst du dich selbst versichern. Hier die Basics.</p>
          <div class="info-card">
            <h4>GKV vs. PKV – Was ist der Unterschied?</h4>
            <ul>
              <li><strong>GKV</strong> (Gesetzlich): Pflichtversicherung für Angestellte. Beitrag = % deines Gehalts (ca. 14,6% + Zusatzbeitrag). Arbeitgeber zahlt die Hälfte!</li>
              <li><strong>PKV</strong> (Privat): Nur für Selbstständige, Beamte, Gutverdiener (>69.300€/Jahr). Günstig jung, teuer im Alter.</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>Familienversicherung (Tipp für unter 25)</h4>
            <p>Bis 25 Jahre kannst du gratis über deine Eltern mitversichert sein – wenn du regelmäßig nicht mehr verdienst als <strong>die Minijob-Grenze (603€/Monat netto, Stand 2026)</strong>. Danach eigene Versicherung!</p>
          </div>
          <div class="info-card">
            <h4>Als Student in der GKV</h4>
            <p>Studenten zahlen nur ca. 110–120€/Monat bis zum 25. Geburtstag (Studententarif). Danach Standardbeitrag. Aber: immer noch sehr günstig verglichen mit PKV!</p>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Beispiel: Welche Kasse wählen?</div>
            <p>Die Leistungen sind gesetzlich großteils gleich. Unterschiede: Zusatzbeitrag (0,5–2%), Bonusprogramme, Zahnarzt-Zuschuss, Auslands-Leistungen. Vergleich: <strong>krankenkassen.de</strong> oder die Stiftung Warentest empfiehlt jährlich Kassen.</p>
          </div>
        `
      },
      {
        title: 'BU-Versicherung',
        content: `
          <p class="content-intro">Die Berufsunfähigkeitsversicherung (BU) ist nach der Haftpflicht die wichtigste Versicherung – auch wenn du jung und gesund bist!</p>
          <div class="warning-box">
            <div class="warning-box-label">Erschreckende Wahrheit</div>
            <p>Jeder 4. Arbeitnehmer wird im Laufe seines Berufslebens berufsunfähig. Die häufigste Ursache sind psychische Erkrankungen (Burnout, Depression) – nicht Unfälle! Der Staat zahlt nur minimale Erwerbsminderungsrente.</p>
          </div>
          <div class="info-card">
            <h4>Wie funktioniert die BU?</h4>
            <p>Wenn du deinen Beruf für mindestens 6 Monate zu mind. 50% nicht mehr ausüben kannst, zahlt die BU eine monatliche Rente – bis zum Rentenalter! Empfohlene Rente: mind. 60–80% deines Nettoeinkommens.</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Je jünger, desto günstiger</div>
            <p>Mit 25 zahlst du ca. 30–80€/Monat. Mit 35 schon 80–150€. Und: Vorerkrankungen können zum Ausschluss führen. Deshalb: BU so früh wie möglich abschließen, am besten vor dem 30. Geburtstag!</p>
          </div>
          <div class="info-card">
            <h4>Worauf achten?</h4>
            <ul>
              <li><strong>Keine abstrakte Verweisung</strong> – Versicherer darf dich nicht auf irgendeinen anderen Beruf verweisen</li>
              <li><strong>Weltweiter Schutz</strong></li>
              <li><strong>Leistung ab 50% BU</strong></li>
              <li>Gute Anbieter: Allianz, Hannoversche, Nürnberger, Condor</li>
            </ul>
          </div>
        `
      },
      {
        title: 'Hausrat',
        content: `
          <p class="content-intro">Die Hausratversicherung schützt alles was in deiner Wohnung steht – also deinen gesamten Besitz.</p>
          <div class="info-card">
            <h4>Was ist versichert?</h4>
            <ul>
              <li>Einbruchdiebstahl (auch versuchter Einbruch mit Schäden)</li>
              <li>Brand, Blitz, Explosion</li>
              <li>Leitungswasser (geplatztes Rohr von Nachbar)</li>
              <li>Sturm ab Windstärke 8</li>
              <li>Vandalismus</li>
            </ul>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Beispiel: Versicherungssumme berechnen</div>
            <p>Faustregel: <strong>650–750€ × Wohnfläche in m²</strong> = empfohlene Versicherungssumme. Für eine 50m²-Wohnung also ca. 32.500–37.500€. Klingt viel? Rechne mal Laptop, Fernseher, Möbel, Kleidung, Küche zusammen – du kommst schnell drauf!</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Kosten</div>
            <p>Ca. 5–15€/Monat für eine 50m² Wohnung. Achte auf Unterversicherungsverzicht! Vergleich: Check24, Verivox.</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'steuern',
    icon: '📊',
    color: '#10d9a0',
    gradient: 'linear-gradient(135deg,#0a3d2e,#0d2a1e)',
    title: 'Steuern',
    short: 'Steuererklärung, Klassen, Freibeträge & Rückerstattung',
    tags: ['Finanzamt', 'Rückerstattung', 'Formulare'],
    sections: [
      {
        title: 'Grundlagen',
        content: `
          <p class="content-intro">Steuern klingen kompliziert – sind sie aber nicht, wenn du die Basics verstehst. Und: Die meisten bekommen Geld zurück!</p>
          <div class="info-card">
            <h4>Was ist die Lohnsteuer?</h4>
            <p>Als Angestellter wird die Lohnsteuer automatisch vom Gehalt abgezogen – noch bevor du es siehst. Dein Arbeitgeber führt sie ans Finanzamt ab. In der Steuererklärung kannst du zu viel gezahlte Steuer zurückfordern – im Schnitt 1.000€!</p>
          </div>
          <div class="info-card">
            <h4>Steuerklassen (1–6)</h4>
            <ul>
              <li><strong>Klasse 1</strong>: Single, getrennt lebend → Standard</li>
              <li><strong>Klasse 2</strong>: Alleinerziehend → Entlastungsbetrag</li>
              <li><strong>Klasse 3</strong>: Verheiratet, besserverdienender Partner → niedriger Abzug</li>
              <li><strong>Klasse 4</strong>: Verheiratet, ähnliches Einkommen → für beide</li>
              <li><strong>Klasse 5</strong>: Ehepartner des Klasse-3-Verdieners → hoher Abzug</li>
              <li><strong>Klasse 6</strong>: Zweiter Job → höchster Abzug</li>
            </ul>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Beispiel: Lohnsteuertabelle</div>
            <p>Jonas verdient 2.500€ brutto. Mit Steuerklasse 1 wird etwa <strong>230–280€ Lohnsteuer</strong> + Solidaritätszuschlag (wenn fällig) + Kirchensteuer abgezogen. Durch Steuererklärung kann er zB. Fahrtkosten, Arbeitsausstattung geltend machen und bekommt Geld zurück.</p>
          </div>
        `
      },
      {
        title: 'Steuererklärung',
        content: `
          <p class="content-intro">Steuererklärung machen: Klingt scary, ist aber oft einfach und lohnt sich fast immer!</p>
          <ol class="steps-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-content">
                <strong>Belege sammeln (das ganze Jahr)</strong>
                <span>Jobticket, Fahrtkosten, Homeoffice-Tage, Weiterbildungen, Arbeitsmittel (Laptop, Bürostuhl), Krankheitskosten, Spendenquittungen</span>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-content">
                <strong>Tool wählen</strong>
                <span><strong>ELSTER</strong> (kostenlos, vom Finanzamt), <strong>Taxfix</strong> (App, einfach, ab 34€), <strong>Wundertax</strong> (günstig), <strong>Smartsteuer</strong>, <strong>Steuererklarung.de</strong></span>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-content">
                <strong>Lohnsteuerbescheinigung von Arbeitgeber</strong>
                <span>Bekommst du automatisch January/Februar. Enthält alle relevanten Zahlen für die Erklärung.</span>
              </div>
            </li>
            <li>
              <div class="step-num">4</div>
              <div class="step-content">
                <strong>Einreichen</strong>
                <span>Frist: 31. Juli des Folgejahres (mit Steuerberater: 28. Februar übernächstes Jahr). Spätere Einreichung meist problemlos – erste Mahnung kommt erst nach Frist.</span>
              </div>
            </li>
            <li>
              <div class="step-num">5</div>
              <div class="step-content">
                <strong>Steuerbescheid prüfen</strong>
                <span>Kommt ca. 2–4 Monate nach Einreichung. Hast du einen Monat Zeit Einspruch einzulegen wenn etwas falsch ist.</span>
              </div>
            </li>
          </ol>
          <div class="tip-box">
            <div class="tip-box-label">💡 Wann muss ich Steuererklärung machen?</div>
            <p>Pflicht: Mehrere Arbeitgeber, Lohnersatzleistungen (ALG, Elterngeld), Kapitalerträge über 1.000€/Jahr, Selbstständigkeit. Freiwillig: Als Angestellter in Klasse 1 – aber fast immer lohnt es sich!</p>
          </div>
        `
      },
      {
        title: 'Absetzen',
        content: `
          <p class="content-intro">Diese Ausgaben kannst du von der Steuer absetzen – das sind die häufigsten und wertvollsten!</p>
          <div class="info-card">
            <h4>🚗 Werbungskosten (Arbeit)</h4>
            <ul>
              <li><strong>Fahrtkosten</strong>: 0,30€ × km × Arbeitstage (einfache Strecke) – ab km 21 sogar 0,38€ (Stand 2026)!</li>
              <li><strong>Homeoffice-Pauschale</strong>: 6€ pro Tag, max. 1.260€/Jahr</li>
              <li><strong>Arbeitsmittel</strong>: Laptop, Drucker, Bürostuhl, Monitor (bis 800€ sofort absetzbar)</li>
              <li><strong>Berufskleidung</strong>: Nur wenn ausschließlich beruflich (Uniform)</li>
              <li><strong>Fortbildungen</strong>: Bücher, Kurse, Seminare</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>🏥 Sonderausgaben</h4>
            <ul>
              <li>Kranken-/Pflegeversicherungsbeiträge</li>
              <li>Altersvorsorge (Riester, rürup, betriebliche)</li>
              <li>Spenden & Mitgliedsbeiträge</li>
              <li>Kirchensteuer</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>💊 Außergewöhnliche Belastungen</h4>
            <ul>
              <li>Arztkosten, Brillen, Zahnersatz (über zumutbarer Eigenbelastung)</li>
              <li>Pflegekosten für Angehörige</li>
              <li>Behinderungsbedingte Kosten</li>
            </ul>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Beispiel: So viel bekommst du zurück</div>
            <p>Jana pendelt 20 km zur Arbeit (an 220 Tagen). Fahrtkosten: 20 km × 0,30€ × 220 = <strong>1.320€</strong>. Arbeitnehmer-Pauschbetrag ist schon eingerechnet. Wenns über 1.230€ liegt, bekommt sie extra Geld zurück – je nach Steuersatz ca. 200–450€!</p>
          </div>
        `
      },
      {
        title: 'Selbstständigkeit',
        content: `
          <p class="content-intro">Freelancer oder Nebenjob? Dann gelten andere Regeln. Hier die Basics der Selbstständigen-Steuer.</p>
          <div class="info-card">
            <h4>Gewerbeanmeldung (kostenlos!)</h4>
            <p>Jede selbstständige Tätigkeit muss beim <strong>Gewerbeamt</strong> (Stadtverwaltung) angemeldet werden. Kostet ca. 20–40€. Ausnahme: Freie Berufe (Journalisten, Designer, Entwickler, Ärzte) – die melden nur beim Finanzamt an!</p>
          </div>
          <div class="info-card">
            <h4>Kleinunternehmerregelung</h4>
            <p>Bis <strong>25.000€ Umsatz/Jahr</strong> musst du keine Umsatzsteuer erheben und abführen (Kleinunternehmerregelung). Ideal für Nebenjobs & Erstgründer. Nachteil: Du kannst Vorsteuer nicht zurückfordern.</p>
          </div>
          <div class="info-card">
            <h4>Einnahmen-Überschuss-Rechnung (EÜR)</h4>
            <p>Simple Buchführung: Einnahmen minus Ausgaben = Gewinn. Keine doppelte Buchführung. Einfaches Tool: <strong>fastbill.com</strong>, <strong>sevdesk.de</strong>, oder Excel-Tabelle.</p>
          </div>
          <div class="warning-box">
            <div class="warning-box-label">⚠️ Steuernachzahlungen!</div>
            <p>Als Selbstständiger zahlst du vierteljährliche Vorauszahlungen! Lege immer <strong>25–30% deiner Einnahmen</strong> auf ein separates Konto für Steuern. Sonst kommt die böse Überraschung beim Steuerbescheid.</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'behoerden',
    icon: '🏛️',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg,#3d2800,#1f1500)',
    title: 'Behörden & Ämter',
    short: 'Welches Amt wofür, wie melde ich mich an, was brauche ich mit',
    tags: ['Einwohnermeldeamt', 'BA', 'ELSTER'],
    sections: [
      {
        title: 'Anmeldung',
        content: `
          <p class="content-intro">In Deutschland musst du dich innerhalb von 14 Tagen nach einem Umzug anmelden. Das Einwohnermeldeamt ist dein erster Stop.</p>
          <ol class="steps-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-content">
                <strong>Einwohnermeldeamt (Bürgerbüro) aufsuchen</strong>
                <span>Online Termin buchen ist Pflicht in den meisten Städten → stadtname.de/einwohnermeldeamt. Wartezeit ohne Termin: oft 2–4 Wochen!</span>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-content">
                <strong>Mitbringen</strong>
                <span>Personalausweis/Reisepass + Wohnungsgeberbestätigung (Formular das dein Vermieter ausfüllt – er MUSS das tun!)</span>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-content">
                <strong>Meldebestätigung erhalten</strong>
                <span>Sofort vor Ort. Brauchst du für: Bankkonto, GEZ-Anmeldung, Führerschein, Arbeitgeber</span>
              </div>
            </li>
          </ol>
          <div class="tip-box">
            <div class="tip-box-label">💡 Weitere Aufgaben beim Umzug</div>
            <p>Adressänderung bei: Bank, Krankenkasse, Arbeitgeber, BAfög-Amt, Finanzamt, KFZ-Zulassung, Versicherungen, Online-Shops, PayPal, Amazon, Post-Nachsendeauftrag stellen!</p>
          </div>
          <div class="warning-box">
            <div class="warning-box-label">⚠️ GEZ (Rundfunkbeitrag)</div>
            <p>18,36€/Monat. An jedem neuen Wohnsitz erneut anmelden (auf rundfunkbeitrag.de). Bei Sozialleistungen oder BAföG: Befreiung möglich!</p>
          </div>
        `
      },
      {
        title: 'Arbeitsagentur',
        content: `
          <p class="content-intro">Jobverlust kann jeden treffen. Wer seine Rechte kennt, schützt sich besser.</p>
          <div class="info-card">
            <h4>Arbeitslosengeld I (ALG I)</h4>
            <ul>
              <li>Anspruch nach mind. 12 Monaten Beitragszahlung in 2 Jahren</li>
              <li>Höhe: 60% des letzten Nettolohns (67% mit Kind)</li>
              <li>Dauer: 6–24 Monate je nach Beitragsdauer und Alter</li>
              <li>Muss <strong>am ersten Tag der Arbeitslosigkeit</strong> oder noch während Kündigungsfrist beantragt werden!</li>
            </ul>
          </div>
          <div class="warning-box">
            <div class="warning-box-label">⚠️ Achtung Sperrzeit!</div>
            <p>Wenn du selbst kündigst oder schuldhaft gekündigt wirst, droht eine Sperrzeit von 12 Wochen (kein ALG I). Immer erst kündigen lassen wenn möglich. Oder Aufhebungsvertrag aushandeln.</p>
          </div>
          <div class="info-card">
            <h4>Was tun wenn gekündigt?</h4>
            <ol class="steps-list" style="margin-top:8px">
              <li><div class="step-num">1</div><div class="step-content"><strong>Arbeitssuchend melden</strong><span>Sofort, spätestens 3 Tage nach Kenntnis der Kündigung – Telefon, Online oder persönlich bei der Agentur für Arbeit</span></div></li>
              <li><div class="step-num">2</div><div class="step-content"><strong>Arbeitslos melden</strong><span>Am ersten Tag der Arbeitslosigkeit. Online: arbeitsagentur.de oder persönlich.</span></div></li>
              <li><div class="step-num">3</div><div class="step-content"><strong>Bewerbungsaktivitäten nachweisen</strong><span>Du musst aktiv auf Jobsuche sein. Dokumentiere Bewerbungen!</span></div></li>
            </ol>
          </div>
        `
      },
      {
        title: 'Finanzamt',
        content: `
          <p class="content-intro">Das Finanzamt ist gar nicht so böse. Hier was du wissen musst.</p>
          <div class="info-card">
            <h4>Steuernummer</h4>
            <p>Bekommst du automatisch nach Anmeldung des Wohnsitzes. Für Selbstständige zusätzlich: Steuer-ID (11-stellig, lebenslang gültig) und Steuernummer beim zuständigen Finanzamt beantragen.</p>
          </div>
          <div class="info-card">
            <h4>ELSTER – Elektronische Steuererklärung</h4>
            <p>Auf <strong>elster.de</strong> kannst du kostenlos Steuererklärungen einreichen, Vorauszahlungen anpassen, Fristverlängerungen beantragen. Registrierung dauert 1–2 Wochen (Aktivierungsbrief per Post).</p>
          </div>
          <div class="info-card">
            <h4>Welches Finanzamt ist zuständig?</h4>
            <p>Das Finanzamt des aktuellen Wohnsitzes. Nach dem Umzug automatischer Wechsel. Bei Selbstständigkeit: Ort der Betriebsstätte.</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Einspruch einlegen</div>
            <p>Du hast 1 Monat nach Erhalt des Steuerbescheids Zeit Einspruch einzulegen. Einfach formloses Schreiben ans Finanzamt: "Hiermit erhebe ich Einspruch gegen den Steuerbescheid vom [Datum]..." Begründung kann nachgereicht werden.</p>
          </div>
        `
      },
      {
        title: 'Weitere Ämter',
        content: `
          <p class="content-intro">Welches Amt ist wofür zuständig? Der Überblick.</p>
          <div class="info-card">
            <h4>🚌 KFZ-Zulassungsstelle</h4>
            <p>Auto an-/abmelden, Kennzeichen, Umschreibung bei Umzug. Dokumente: Fahrzeugbrief (Zulassungsbescheinigung Teil II), Ausweis, eVB-Nummer der Versicherung, Hauptuntersuchungsbescheinigung (TÜV).</p>
          </div>
          <div class="info-card">
            <h4>👶 Standesamt</h4>
            <p>Geburten, Heiraten, Sterbefälle anmelden. Namensänderungen. Dokumente für Auslandsehe.</p>
          </div>
          <div class="info-card">
            <h4>📋 Sozialamt / Jobcenter</h4>
            <p>ALG II / Bürgergeld nach 12-monatigem ALG I oder ohne Anspruch. Wohngeld beantragen (Mietzuschuss für Geringverdiener), Kinderzuschlag.</p>
          </div>
          <div class="info-card">
            <h4>🎓 BAföG-Amt</h4>
            <p>Ausbildungsförderung für Studenten. Antrag an Studentenwerk der Uni. Online: bafoeg-digital.de. Rückzahlung erst ab 10.000€ Einkommen, max. 10.010€ gesamt.</p>
          </div>
          <div class="info-card">
            <h4>🏡 Bürgerservice / Bürgeramt</h4>
            <p>Personalausweis, Reisepass, Führungszeugnis, Melderegisterauskunft, Kfz-Ummeldung in manchen Städten. Terminbuchung immer zuerst online!</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'finanzen',
    icon: '💰',
    color: '#f97316',
    gradient: 'linear-gradient(135deg,#3d1500,#200c00)',
    title: 'Finanzen & Budgetierung',
    short: 'Haushaltsbuch, Schulden vermeiden, Sparen & Investieren',
    tags: ['Sparen', 'Budget', 'Investieren'],
    sections: [
      {
        title: 'Haushaltsbuch',
        content: `
          <p class="content-intro">Wer nicht weiß wohin sein Geld geht, kann auch nicht mehr werden. Ein Budget ist dein wichtigstes Finanz-Tool.</p>
          <div class="info-card">
            <h4>Die 50/30/20-Regel</h4>
            <ul>
              <li><strong>50%</strong> für Fixkosten: Miete, Strom, Versicherungen, Lebensmittel</li>
              <li><strong>30%</strong> für Wünsche: Freizeit, Restaurants, Shopping, Urlaub</li>
              <li><strong>20%</strong> für Sparen & Investieren</li>
            </ul>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Beispiel: 2.000€ Netto</div>
            <p><strong>Fixkosten (1.000€):</strong> Miete 600€ + GEZ 18€ + Strom 80€ + Handy 30€ + Versicherungen 80€ + Lebensmittel 200€ = 1.008€ ✓<br>
            <strong>Wünsche (600€):</strong> Ausgehen, Sport, Streaming, Shopping<br>
            <strong>Sparen (400€):</strong> 200€ ETF-Sparplan + 150€ Notfallreserve + 50€ Sonstiges</p>
          </div>
          <div class="info-card">
            <h4>📱 Apps fürs Haushaltsbuch</h4>
            <ul>
              <li><strong>YNAB</strong> (You Need A Budget) – sehr mächtig, kostet Geld, lohnt sich</li>
              <li><strong>MoneyMoney</strong> – deutsches Banking-App mit Kontenübersicht</li>
              <li><strong>Finanzguru</strong> – kostenlos, analysiert automatisch Kontobewegungen</li>
              <li><strong>Excel/Google Sheets</strong> – einfachste Lösung, völlig ausreichend</li>
            </ul>
          </div>
        `
      },
      {
        title: 'Notfallpolster',
        content: `
          <p class="content-intro">Bevor du investierst: Notfallpolster! Das ist das Fundament deiner finanziellen Sicherheit.</p>
          <div class="info-card">
            <h4>Wie viel brauche ich?</h4>
            <p>Experten empfehlen: <strong>3–6 Monatsausgaben</strong> als Liquiditätsreserve. Bei 1.500€ monatlichen Ausgaben also 4.500–9.000€. Dieses Geld ist NICHT für Investitionen – es muss sofort verfügbar sein!</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Wo parken?</div>
            <p>Tagesgeldkonto mit möglichst hohem Zinssatz. Aktuell: 2–3% Zinsen bei Trade Republic, ING, DKB – vergleiche auf <strong>tagesgeldvergleich.net</strong>. Das Geld ist getrennt vom Girokonto – schützt vor Impulskäufen!</p>
          </div>
          <div class="warning-box">
            <div class="warning-box-label">⚠️ Kreditkarten-Schulden zuerst!</div>
            <p>Hast du Schulden mit hohen Zinsen (Dispo, Kreditkarte: 10–20%)? Zuerst tilgen, dann erst Notfallpolster aufbauen. Diese Zinsen fressen jeden Spargewinn auf!</p>
          </div>
        `
      },
      {
        title: 'Investieren',
        content: `
          <p class="content-intro">Investieren ist dein Weg zu echter finanzieller Freiheit. Der Zinseszins ist das 8. Weltwunder – nutze ihn jung!</p>
          <div class="info-card">
            <h4>ETF-Sparplan – Der einfachste Weg</h4>
            <p>ETF (Exchange Traded Fund) = ein Korb aus vielen Aktien. Du investierst z.B. in den "MSCI World" der die 1.600 größten Unternehmen weltweit enthält. Historische Rendite: ~7-9% pro Jahr.</p>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Der Zinseszinseffekt</div>
            <p>Wenn du mit 22 anfängst und <strong>100€/Monat</strong> bei 7% jährlicher Rendite investierst:<br>
            • Nach 10 Jahren: ~17.000€<br>
            • Nach 20 Jahren: ~51.000€<br>
            • Nach 30 Jahren: ~117.000€<br>
            Du hast nur 36.000€ eingezahlt – der Rest ist Zinseszins!</p>
          </div>
          <ol class="steps-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-content">
                <strong>Depot eröffnen</strong>
                <span>Empfohlen: Trade Republic, Scalable Capital, ING, comdirect – alle kostenlos. Sparplan schon ab 1€/Monat.</span>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-content">
                <strong>ETF auswählen</strong>
                <span>Einstieg: iShares Core MSCI World (IE00B4L5Y983) oder Vanguard FTSE All-World – breit gestreut, günstige Kosten (TER unter 0,25%)</span>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-content">
                <strong>Sparplan einrichten & vergessen</strong>
                <span>Automatiksparplan: Monatlich fester Betrag. Dann: Nicht ständig reinschauen! Kurseinbrüche aussitzen.</span>
              </div>
            </li>
          </ol>
          <div class="warning-box">
            <div class="warning-box-label">⚠️ Wichtig</div>
            <p>Aktien schwanken – kurzfristig kann der Wert fallen. Nur Geld investieren das du mind. 10 Jahre nicht brauchst. Keine Einzelaktien, keine Krypto als Hauptinvestition wenn du Anfänger bist!</p>
          </div>
        `
      },
      {
        title: 'Schulden',
        content: `
          <p class="content-intro">Schulden können jeden treffen – wichtig ist wie du damit umgehst.</p>
          <div class="info-card">
            <h4>Die Schulden-Hierarchie</h4>
            <ul>
              <li>🔴 <strong>Sofort tilgen</strong>: Dispo (oft 10%+), Kreditkarten (15%+)</li>
              <li>🟡 <strong>Bald tilgen</strong>: Raten-Kredite ohne Sondertilgungsmöglichkeit</li>
              <li>🟢 <strong>Nicht dringend</strong>: BAföG (0% Zinsen), Niedrigzins-Hypothek (unter 2%)</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>Wenn du in der Schuldenfalle bist</h4>
            <ul>
              <li>Kostenlose Schuldnerberatung: <strong>schuldnerberatung.de</strong></li>
              <li>Caritas, AWO, Diakonie – alle bieten kostenlose Beratung</li>
              <li>Insolvenzberatung als letzter Weg (nach 3 Jahren schuldenfrei)</li>
              <li>NIEMALS Inkasso ignorieren – reagieren, verhandeln!</li>
            </ul>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Bonus: Schufa verstehen</div>
            <p>Die Schufa bewertet deine Kreditwürdigkeit. Einmal pro Jahr kostenloser Schufa-Bericht auf <strong>meineschufa.de</strong> (nicht der kostenpflichtige "Bonitätsausweis" – die wollen dich abzocken!). Fehler im Bericht können gelöscht werden.</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'recht',
    icon: '⚖️',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg,#002030,#001525)',
    title: 'Rechtliches',
    short: 'Verträge, Kündigung, Rechte, Ratenzahlungen & Anwalt',
    tags: ['Verbraucherrecht', 'Kündigung', 'Anwalt'],
    sections: [
      {
        title: 'Verbraucherrechte',
        content: `
          <p class="content-intro">Als Verbraucher hast du in Deutschland starke Rechte. Diese Basics sollte jeder kennen!</p>
          <div class="info-card">
            <h4>Widerrufsrecht (14 Tage)</h4>
            <p>Bei Online-Käufen und Haustürgeschäften hast du 14 Tage Widerrufsrecht ohne Angabe von Gründen. Läuft die Widerrufsfrist nicht oder gar nicht (kein Hinweis), hast du sogar 12 Monate + 14 Tage!</p>
          </div>
          <div class="info-card">
            <h4>Gewährleistung (2 Jahre)</h4>
            <p>Vom Händler: 2 Jahre Gewährleistung auf alle Neuwaren. Bei gebrauchten Waren kann er sie auf 1 Jahr reduzieren. Die ersten 12 Monate trägt der Händler die Beweislast – er muss beweisen dass es kein Mangel war.</p>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Gewährleistung vs. Garantie</div>
            <p><strong>Gewährleistung</strong> = gesetzliches Recht, kannst du nicht wegverhandeln.<br>
            <strong>Garantie</strong> = freiwillige Zusatzleistung des Herstellers (oft länger, aber manchmal strenger in Bedingungen).<br>
            Bei Problemen zunächst immer Gewährleistung beim Händler gelten machen!</p>
          </div>
          <div class="info-card">
            <h4>Kaufvertrag – was gilt?</h4>
            <ul>
              <li>Mündliche Verträge sind gültig! (schwer zu beweisen)</li>
              <li>Unterschrift unter AGB heißt: Du hast sie akzeptiert</li>
              <li>Kleingedrucktes ist trotzdem rechtlich bindend</li>
              <li>Unwirksame Klauseln in AGB: verbraucherzentrale.de prüfen</li>
            </ul>
          </div>
        `
      },
      {
        title: 'Abo & Kündigung',
        content: `
          <p class="content-intro">Abo-Fallen sind überall. So erkennst und vermeidest du sie!</p>
          <div class="info-card">
            <h4>Typische Abo-Fallen</h4>
            <ul>
              <li>Streaming: Netflix, Spotify – klar, aber laufen unbegrenzt</li>
              <li>"30 Tage kostenlos" – verlängert sich automatisch, lass Kündigung sofort eintragen</li>
              <li>Zeitschriften-Abos die sich nach Probeabo verlängern</li>
              <li>Fitnessstudio: Mindestlaufzeit 24 Monate + Kündigungsfristen</li>
              <li>Apps mit Abo (App Store → Abos verwalten regelmäßig prüfen!)</li>
            </ul>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Abo-Manager nutzen</div>
            <p><strong>Subscriptions Tracker Apps</strong> helfen: Finanzguru, YNAB oder einfach Excel. Manche Banken (z.B. N26) zeigen wiederkehrende Zahlungen an. Regelmäßig prüfen: Zahl ich noch für etwas das ich nicht nutze?</p>
          </div>
          <div class="info-card">
            <h4>Kündigung – so richtig</h4>
            <ul>
              <li>Wichtige Kündigungen IMMER: Einwurfeinschreiben (nicht normal, nicht Einschreiben mit Rückschein solo)</li>
              <li>Frist im Vertrag prüfen: zum Ende des Quartals? Zum Monatsende? 4 Wochen vorher?</li>
              <li>Bei schriftlicher Kündigungsablehennung: Screenshot/Kopie behalten</li>
              <li>Online kündigen: Screenshot mit Timestamp! (Rechtlich oft ein Problem)</li>
            </ul>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Kündigungsschreiben – Vorlage</div>
            <p>Ort, Datum<br><br>
            Absender: [Dein Name, Adresse]<br>
            An: [Firma, Adresse]<br><br>
            <strong>Kündigung meines [Vertragsart], Kundennummer: [Nummer]</strong><br><br>
            Hiermit kündige ich o.g. Vertrag fristgemäß zum nächstmöglichen Termin [oder: zum 31.12.2026].<br><br>
            Bitte bestätigen Sie mir die Kündigung schriftlich.<br><br>
            Mit freundlichen Grüßen<br>
            [Unterschrift]</p>
          </div>
        `
      },
      {
        title: 'Anwalt & Hilfe',
        content: `
          <p class="content-intro">Du brauchst einen Anwalt? So gehst du vor – ohne Unsummen zu zahlen.</p>
          <div class="info-card">
            <h4>Kostenlose Rechtsberatung</h4>
            <ul>
              <li><strong>Verbraucherzentrale</strong> (verbraucherzentrale.de) – erste Beratung oft günstig oder kostenlos</li>
              <li><strong>Mieterschutzverein</strong> – für alles rund um Mietrecht</li>
              <li><strong>Gewerkschaften</strong> (ver.di, IG Metall) – kostenlose Rechtsberatung für Mitglieder</li>
              <li><strong>Rechtsberatung durch Studenten</strong> an Uni-Kliniken (kostenlos)</li>
              <li>Online: advocado.de, telefonische Erstberatung</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>Prozesskostenhilfe</h4>
            <p>Wenn du wenig verdienst und Recht brauchst: Prozesskostenhilfe (PKH) beantragen! Der Staat übernimmt die Anwalts- und Gerichtskosten. Voraussetzung: Einkommen unter ca. 1.600€ netto/Monat, Klage hat Erfolgsaussichten.</p>
          </div>
          <div class="info-card">
            <h4>Rechtsschutzversicherung sinnvoll?</h4>
            <p>Bei: Mietverhältnissen, Arbeitsrecht, Verkehrsrecht – ja sehr sinnvoll. Kostet ca. 15–40€/Monat. Wartezeit beachten (meist 3 Monate). Anbieter: ARAG, DAS, ADAC Rechtsschutz.</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Kostenloser Anwalts-Tipp</div>
            <p>Beim Anwalt: Erstberatungsgebühr max. 190€ netto (gesetzlich begrenzt). Du kannst vor dem Gespräch fragen: "Was kostet die Erstberatung?" Dann entscheidest du ob du es weiter verfolgst.</p>
          </div>
        `
      },
      {
        title: 'Arbeit & Vertrag',
        content: `
          <p class="content-intro">Dein Arbeitsvertrag ist der wichtigste Vertrag deines Lebens. Hier was du verstehen musst.</p>
          <div class="info-card">
            <h4>Arbeitsvertrag – Check-Liste</h4>
            <ul>
              <li>Gehalt: Brutto oder Netto? (Immer Brutto – Netto ist nach Abzügen)</li>
              <li>Urlaubstage: Mindestens 20 Arbeitstage (5-Tage-Woche) gesetzlich</li>
              <li>Arbeitszeit: Maximal 8h/Tag (10h in Ausnahmen)</li>
              <li>Probezeit: Max. 6 Monate – in dieser Zeit vereinfachte Kündigung</li>
              <li>Kündigungsfrist: Gesetzlich 4 Wochen zum 15. oder Ende des Monats. Im Vertrag oft länger.</li>
              <li>Urlaubsanspruch anteilig im ersten Jahr</li>
            </ul>
          </div>
          <div class="warning-box">
            <div class="warning-box-label">⚠️ Gehaltsverhandlung</div>
            <p>Unterschreib nie sofort! Du kannst sagen: "Ich muss den Vertrag noch einmal in Ruhe prüfen." Das ist dein gutes Recht. Verhandle Gehalt VOR der Unterschrift – danach ist es schwerer.</p>
          </div>
          <div class="info-card">
            <h4>Kündigung durch Arbeitgeber</h4>
            <ul>
              <li>Nach 6 Monaten gilt das Kündigungsschutzgesetz</li>
              <li>Kündigung muss schriftlich und mit Grund (bei Bedarf) erfolgen</li>
              <li>Bei unrechtmäßiger Kündigung: Klage innerhalb von <strong>3 Wochen</strong>!</li>
              <li>Zuerst zu ver.di oder Fachanwalt für Arbeitsrecht</li>
            </ul>
          </div>
        `
      }
    ]
  },
  {
    id: 'gesundheit',
    icon: '🏥',
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg,#3d0015,#200010)',
    title: 'Gesundheit',
    short: 'Arzt, Krankschreibung, Apotheke, psychische Gesundheit',
    tags: ['Arzt', 'AU', 'Mental Health'],
    sections: [
      {
        title: 'Arztbesuche',
        content: `
          <p class="content-intro">Welcher Arzt für welches Problem – und wie funktioniert das deutsche Gesundheitssystem?</p>
          <div class="info-card">
            <h4>Arztarten & wann zu wem</h4>
            <ul>
              <li><strong>Hausarzt</strong> → Erste Anlaufstelle für fast alles. Überweisungen. Kennt deine Geschichte.</li>
              <li><strong>Facharzt</strong> → Spezialist (Kardiologe, Dermatologe etc.) – meist Überweisung nötig</li>
              <li><strong>Kassenärztliche Bereitschaftsdienst (116 117)</strong> → Abends/Wochenends bei nicht-lebensbedrohlichen Beschwerden</li>
              <li><strong>Notaufnahme (112)</strong> → Nur bei echten Notfällen (Herzanfall, schwere Verletzung)</li>
            </ul>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Hausarzt finden</div>
            <p>Hausarzt suchen auf <strong>arztsuche.de</strong> oder <strong>jameda.de</strong>. Manche nehmen keine neuen Kassenpatienten – einfach anrufen. Privatpatienten werden bevorzugt terminiert (ungerecht, aber Realität).</p>
          </div>
          <div class="info-card">
            <h4>Krankschreibung (AU)</h4>
            <ul>
              <li>Ab dem <strong>ersten Krankheitstag</strong> musst du den Arbeitgeber informieren</li>
              <li>Arbeitgeber kann direkt ab Tag 1 ein Attest verlangen (check deinen Arbeitsvertrag!)</li>
              <li>Gesetzlich: Attest erst ab 3. Tag nötig (im Vertrag kann kürzer vereinbart sein)</li>
              <li>AU gilt bis zum genannten Datum. Wenn noch krank: Verlängerung beim Arzt holen!</li>
              <li>Seit 2023: eAU – elektronische Arbeitsunfähigkeitsbescheinigung, geht direkt ans Finanzamt</li>
            </ul>
          </div>
        `
      },
      {
        title: 'Apotheke & Medikamente',
        content: `
          <p class="content-intro">Medikamente, Rezepte, Zuzahlungen – so navigierst du durch den Dschungel.</p>
          <div class="info-card">
            <h4>Rezeptpflichtig vs. Freiverkäuflich</h4>
            <ul>
              <li><strong>Frei (OTC)</strong>: Ibuprofen, Aspirin, Erkältungsmittel – ohne Rezept kaufbar</li>
              <li><strong>Rezeptpflichtig</strong>: Antibiotika, starke Schmerzmittel – nur mit Rezept</li>
              <li><strong>Kassenrezept (grün)</strong>: Zuzahlung max. 10€ (mindestens 5€, maximal 10€)</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>Zuzahlungsbefreiung</h4>
            <p>Wer chronisch krank ist oder viele Medikamente braucht: Zuzahlungsbefreiung beantragen! Belastungsgrenze = 2% des Jahresbruttoeinkommens (1% bei chronisch Kranken). Darüber: Kasse zahlt alles!</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Günstigere Medikamente</div>
            <p>Generika (wirkstoffgleiche Nachahmerprodukte) sind bis zu 80% günstiger als Markenprodukte. Beim Kassenrezept wählt die Apotheke oft automatisch das günstigste. Online-Apotheken (Doc Morris, Apotheke.de) sind oft auch günstiger für OTC-Produkte.</p>
          </div>
        `
      },
      {
        title: 'Psychische Gesundheit',
        content: `
          <p class="content-intro">Psychische Gesundheit ist genauso wichtig wie körperliche – und in Deutschland leider unterversorgt. Hier findest du Hilfe.</p>
          <div class="info-card">
            <h4>Psychotherapeut finden</h4>
            <p>Wartezeiten sind lang (6-18 Monate für Kassenarzt). Was tun? Zuerst zum Hausarzt – dieser kann eine psychotherapeutische Sprechstunde/Akutbehandlung überweisen. Probatorische Sitzungen (5-8) helfen beim Kennenlernen.</p>
          </div>
          <div class="info-card">
            <h4>Schnellere Alternativen</h4>
            <ul>
              <li><strong>Online-Therapie</strong>: HelloBetter, Instahelp – von Kassen z.T. erstattet</li>
              <li><strong>Telefonseelsorge</strong>: 0800 111 0 111 (kostenlos, 24/7)</li>
              <li><strong>Kriseninterventionsstelle</strong>: In jeder Großstadt vorhanden</li>
              <li><strong>Psychosomatische Ambulanzen</strong> an Unikliniken: Kürzere Warten</li>
            </ul>
          </div>
          <div class="warning-box">
            <div class="warning-box-label">🆘 Bei akutem Suizidgedanken</div>
            <p>Sofort: <strong>0800 111 0 111</strong> (Telefonseelsorge) oder <strong>112</strong> anrufen oder nächste psychiatrische Notaufnahme aufsuchen. Du bist nicht allein!</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Psychische Gesundheit am Arbeitsplatz</div>
            <p>Burnout & psychische Erkrankungen sind Krankheit! Beware: Offenbarungspflicht dem Arbeitgeber gegenüber gibt es nicht (außer wenn die Erkrankung die Arbeit gefährdet). Betrieblicher Sozialdienst kann helfen – anonym!</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'kommunikation',
    icon: '📱',
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg,#2d1458,#1a0d36)',
    title: 'Handy, Internet & Datenschutz',
    short: 'Handy-Vertrag, DSL, DSGVO & digitale Sicherheit',
    tags: ['Vertrag', 'Datenschutz', 'Digital'],
    sections: [
      {
        title: 'Handyvertrag',
        content: `
          <p class="content-intro">Handyverträge können teuer werden. So findest du das beste Angebot!</p>
          <div class="info-card">
            <h4>Vertrag vs. Prepaid – was passt?</h4>
            <ul>
              <li><strong>Prepaid</strong>: Keine Schufa, kein Risiko, flexible Nutzung. Ideal zum Start.</li>
              <li><strong>Laufzeitvertrag</strong>: Günstiger pro GB/Monat, aber 24 Monate gebunden. Kündigung: schriftlich, 3 Monate vor Ablauf!</li>
              <li><strong>SIM-Only</strong>: Nur SIM ohne Handy – günstiger als Kombivertrag</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>Netz-Qualität in Deutschland</h4>
            <ul>
              <li>Bestes Netz: Telekom > Vodafone ≈ O2</li>
              <li>Discounter nutzen diese Netze: Congstar (Telekom), Aldi Talk (Telekom), Klarmobil (alle)</li>
              <li>Preisvergleich: <strong>billiger-telefonieren.de</strong>, <strong>teltarif.de</strong></li>
            </ul>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Tipp: Handy ohne Vertrag kaufen</div>
            <p>Kauf Handy auf Raten direkt beim Hersteller oder günstig gebraucht (Back Market, refurbed.de – geprüft & günstiger!). Dann nur SIM-Only-Tarif – spart oft 30–40€/Monat über 2 Jahre!</p>
          </div>
        `
      },
      {
        title: 'Internet & DSL',
        content: `
          <p class="content-intro">Internet ist heute Grundbedürfnis. So wirst du nicht abgezockt.</p>
          <div class="info-card">
            <h4>DSL vs. Kabel vs. Glasfaser</h4>
            <ul>
              <li><strong>DSL</strong>: Weit verbreitet, Telekom-Netz. Bis 250 Mbit/s typisch.</li>
              <li><strong>Kabel</strong>: Schnell (bis 1 Gbit/s), Vodafone/Unitymedia-Netz. Gut in Städten.</li>
              <li><strong>Glasfaser</strong>: Zukunft, sehr schnell & stabil. Noch nicht überall verfügbar.</li>
            </ul>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Anbieter wechseln & sparen</div>
            <p>Alle 12 Monate vergleichen auf <strong>verivox.de</strong> oder <strong>idealo.de</strong>. Neukunden-Deals sind immer besser als Bestandskunden-Tarife. Kündigen und als "Neukunde" zurückkehren ist erlaubt (beim Partnerwechsel)!</p>
          </div>
          <div class="info-card">
            <h4>Router & WLAN-Sicherheit</h4>
            <ul>
              <li>Standard-Passwort des Routers sofort ändern!</li>
              <li>WPA3 oder mindestens WPA2 verwenden</li>
              <li>FRITZ!Box empfohlen – viel besser als Anbieter-Router</li>
              <li>Regelmäßige Firmware-Updates des Routers</li>
            </ul>
          </div>
        `
      },
      {
        title: 'Datenschutz',
        content: `
          <p class="content-intro">Deine Daten sind wertvoll. So schützt du sie in der digitalen Welt.</p>
          <div class="info-card">
            <h4>Passwörter richtig</h4>
            <ul>
              <li>Für jeden Dienst ein eigenes Passwort!</li>
              <li>Passwort-Manager: <strong>Bitwarden</strong> (kostenlos, Open Source), KeePass, 1Password</li>
              <li>Zweidimensionale Auth (2FA) überall aktivieren wo möglich</li>
              <li>Sicheres Passwort: mind. 12 Zeichen, Groß/Klein/Zahl/Symbol</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>DSGVO – Deine Rechte</h4>
            <ul>
              <li><strong>Auskunft</strong>: Du kannst fragen was ein Unternehmen über dich gespeichert hat</li>
              <li><strong>Löschung</strong> ("Recht auf Vergessenwerden"): GDPR Art. 17</li>
              <li><strong>Datenübertragbarkeit</strong>: Daten in maschinenlesbarem Format herausfordern</li>
              <li>Tool: <strong>askthecode.de</strong> oder <strong>datarequests.org</strong> für Anfragen</li>
            </ul>
          </div>
          <div class="warning-box">
            <div class="warning-box-label">⚠️ Phishing & Betrug</div>
            <p>Banken UND Behörden fragen NIEMALS per Email/SMS nach Passwort, TAN oder Zugangsdaten! Bei Verdacht: Direkt auf offizielle Webseite gehen (nie Link aus Email klicken), Nummer aus Telefonbuch wählen. Betrug melden: phishing-initiative.de</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'altersvorsorge',
    icon: '🌱',
    color: '#34d399',
    gradient: 'linear-gradient(135deg,#0a2e1e,#051a10)',
    title: 'Rente & Altersvorsorge',
    short: '3-Säulen-System, Rentenpunkte, Riester, ETF & früher in Rente',
    tags: ['Rente', 'Riester', 'Zukunft'],
    sections: [
      {
        title: 'Das 3-Säulen-System',
        content: `
          <p class="content-intro">Deutschland hat ein 3-Säulen-System für die Rente. Die gesetzliche Rente allein wird NICHT reichen – handle jetzt!</p>
          <div class="info-card">
            <h4>Säule 1: Gesetzliche Rentenversicherung (GRV)</h4>
            <p>Pflichtbeitrag: 18,6% des Bruttolohns (je Hälfte du und Arbeitgeber). Du sammelst Rentenpunkte. 1 Rentenpunkt (Stand 2026) ≈ 39,32€/Monat Rente. Erwartete Rente = deutlich unter dem letzten Gehalt!</p>
          </div>
          <div class="info-card">
            <h4>Säule 2: Betriebliche Altersvorsorge (bAV)</h4>
            <p>Arbeitgeber muss mind. 15% Zuschuss leisten wenn du per Entgeltumwandlung vorsorge. Oft auch freiwillige Arbeitgeberzuschüsse. Steuerbegünstigt! Frag beim Arbeitgeber nach!</p>
          </div>
          <div class="info-card">
            <h4>Säule 3: Private Vorsorge</h4>
            <ul>
              <li><strong>Riester-Rente</strong>: Staatliche Förderung (175€/Jahr + Kinderzulage), aber kompliziert & oft unflexibel</li>
              <li><strong>Rürup-Rente</strong>: Für Selbstständige, steuergefördert</li>
              <li><strong>ETF-Sparplan</strong>: Flexibel, keine Garantie aber historisch beste Rendite</li>
            </ul>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Die bittere Wahrheit</div>
            <p>Wer heute mit 2.500€ brutto startet und 45 Jahre arbeitet, bekommt ca. 1.100–1.400€ Rente/Monat. Nach Abzug von ca. 10% Kranken-/Pflegeversicherung: unter 1.300€ netto. Private Vorsorge ist HEUTE schon wichtig!</p>
          </div>
        `
      },
      {
        title: 'Jetzt anfangen',
        content: `
          <p class="content-intro">50€ mit 25 investiert bringen mehr als 200€ mit 45. Der frühe Vogel fängt den Wurm – beim Investieren umso mehr!</p>
          <ol class="steps-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-content">
                <strong>Renteninformation anschauen</strong>
                <span>Die Rentenversicherung schickt ab 27 Jahren jährlich eine Renteninformation per Post. Schau dir an wie viele Punkte du hast! Online: drv.de (Deutsche Rentenversicherung)</span>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-content">
                <strong>bAV beim Arbeitgeber anfragen</strong>
                <span>Gibt es einen Arbeitgeber-Zuschuss? Das ist quasi gratis Geld! Nicht ablehnen.</span>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-content">
                <strong>ETF-Sparplan einrichten (langfristig)</strong>
                <span>Schon 50–100€/Monat in einen breit gestreuten ETF macht nach 40 Jahren einen riesigen Unterschied.</span>
              </div>
            </li>
          </ol>
          <div class="tip-box">
            <div class="tip-box-label">💡 FIRE-Bewegung (Financial Independence)</div>
            <p>FIRE = "Financial Independence, Retire Early". Wer sehr früh sehr viel spart (50%+ des Einkommens), kann mit 40-50 Jahren aufhören zu arbeiten. Basis: Sparquote erhöhen + in ETFs investieren + Entnahmerate unter 4%/Jahr halten. Mehr Info: frugalisten.de</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'karriere',
    icon: '💼',
    color: '#e879f9',
    gradient: 'linear-gradient(135deg,#3d0050,#220030)',
    title: 'Bewerbung & Karriere',
    short: 'Lebenslauf, Gehaltsverhandlung, Lohnabrechnung & Probezeit',
    tags: ['Bewerbung', 'Gehalt', 'Arbeitsrecht'],
    sections: [
      {
        title: 'Lebenslauf & Bewerbung',
        content: `
          <p class="content-intro">Der Lebenslauf entscheidet in 30 Sekunden ob du eingeladen wirst. Hier die Regeln die wirklich zählen.</p>
          <div class="info-card">
            <h4>📄 Lebenslauf-Basics (Deutschland)</h4>
            <ul>
              <li><strong>Antichronologisch</strong>: Neuestes zuerst – immer!</li>
              <li><strong>1–2 Seiten</strong>: Alles was länger ist wird nicht gelesen</li>
              <li><strong>Foto</strong>: In Deutschland üblich (anders als USA/UK). Professionell, aktuell, neutraler Hintergrund</li>
              <li><strong>Lücken erklären</strong>: Reise, Krankheit, Weiterbildung – kurz und ehrlich</li>
              <li><strong>Quantifizieren</strong>: „Umsatz um 20% gesteigert" statt „Vertriebserfahrung"</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>✉️ Anschreiben – immer noch nötig?</h4>
            <p>Oft ja – aber es wird kürzer. Max. 1 Seite. Klare Struktur: Warum du? Warum diese Firma? Was bringt du mit? Kein „Hiermit bewerbe ich mich..." als Einstieg – direkt mit deinem stärksten Argument!</p>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Kostenlose Tools</div>
            <p><strong>Canva.com</strong> – Professionelle Lebenslauf-Vorlagen kostenlos.<br>
            <strong>europass.eu</strong> – EU-Standard Lebenslauf (gut für internationale Bewerbungen).<br>
            <strong>LinkedIn</strong> – Pflicht im Berufsleben! Profil vollständig anlegen.<br>
            <strong>Xing</strong> – Eher im deutschsprachigen Raum aktiv.</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 KI-Tipp</div>
            <p>ChatGPT oder ähnliche KI-Tools können Anschreiben als Vorlage erstellen – aber immer selbst anpassen! Personalchefs erkennen unbearbeiteten KI-Text sofort. Nutze KI als Startpunkt, nicht als Endergebnis.</p>
          </div>
        `
      },
      {
        title: 'Vorstellungsgespräch',
        content: `
          <p class="content-intro">Das Gespräch entscheidet – Vorbereitung ist 80% des Erfolgs.</p>
          <ol class="steps-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-content">
                <strong>Firma recherchieren</strong>
                <span>Website, LinkedIn, Glassdoor (Mitarbeiter-Bewertungen!), aktuelle News. Zeig dass du weißt was die Firma tut.</span>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-content">
                <strong>Klassische Fragen vorbereiten</strong>
                <span>„Erzählen Sie von sich" (= kurze Zusammenfassung deiner Karriere), „Stärken/Schwächen", „Warum diese Stelle?", „Wo sehen Sie sich in 5 Jahren?"</span>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-content">
                <strong>Eigene Fragen stellen</strong>
                <span>PFLICHT! Zeigt Interesse. Gute Fragen: „Wie sieht ein typischer Arbeitstag aus?", „Was gefällt Ihnen am meisten an der Firma?", „Wie wird Erfolg gemessen?"</span>
              </div>
            </li>
            <li>
              <div class="step-num">4</div>
              <div class="step-content">
                <strong>Auftreten & Kleidung</strong>
                <span>Lieber eine Stufe formeller als die Unternehmenskultur. Pünktlichkeit = 10 Min. vorher da. Handy aus!</span>
              </div>
            </li>
          </ol>
          <div class="warning-box">
            <div class="warning-box-label">⚠️ Diese Fragen dürfen Arbeitgeber NICHT stellen</div>
            <p>Schwangerschaft/Kinderwunsch, Religion, politische Einstellung, Vorstrafen (außer relevant), Krankheiten (außer direkt jobbedingt). Du musst wahrheitsgemäß nur bei zulässigen Fragen antworten!</p>
          </div>
        `
      },
      {
        title: 'Lohnabrechnung',
        content: `
          <p class="content-intro">Deine erste Gehaltsabrechnung wirkt wie Hieroglyphen. Hier entschlüsseln wir sie Zeile für Zeile.</p>
          <table class="cost-table">
            <thead><tr><th>Position</th><th>Was bedeutet das?</th></tr></thead>
            <tbody>
              <tr><td><strong>Bruttogehalt</strong></td><td>Vereinbartes Gehalt laut Vertrag</td></tr>
              <tr><td>Rentenversicherung (AN)</td><td>9,3% – dein Anteil (AG zahlt auch 9,3%)</td></tr>
              <tr><td>Krankenversicherung (AN)</td><td>~7,3% + Zusatzbeitrag deiner Kasse</td></tr>
              <tr><td>Pflegeversicherung</td><td>1,7% (ohne Kinder: +0,6%)</td></tr>
              <tr><td>Arbeitslosenversicherung</td><td>1,3% deines Gehalts</td></tr>
              <tr><td>Lohnsteuer</td><td>Nach Steuerklasse – variabel</td></tr>
              <tr><td>Kirchensteuer</td><td>8–9% der Lohnsteuer (nur wenn KM)</td></tr>
              <tr><td class="cost-required"><strong>Nettogehalt</strong></td><td class="cost-required">Was du überwiesen bekommst</td></tr>
            </tbody>
          </table>
          <div class="tip-box">
            <div class="tip-box-label">💡 Brutto-Netto-Rechner</div>
            <p>Schnell rechnen: <strong>brutto-netto-rechner.info</strong> – einfach Bruttolohn, Steuerklasse, Krankenversicherung eingeben und sofort das Netto sehen!</p>
          </div>
          <div class="info-card">
            <h4>📋 Was du aufheben musst</h4>
            <p>Alle Gehaltsabrechnungen aufheben – mindestens bis zur Rente! Sie sind Nachweis für Rentenansprüche falls mal die DRV-Daten fehlen. Am besten digital scannen.</p>
          </div>
        `
      },
      {
        title: 'Gehaltsverhandlung',
        content: `
          <p class="content-intro">Gehaltsverhandlung ist kein Kampf – sondern ein professionelles Gespräch auf Augenhöhe. Die meisten jungen Menschen trauen sich nicht – und verlieren dadurch tausende Euro.</p>
          <div class="info-card">
            <h4>🎯 Vorbereitung: Was ist der Marktpreis?</h4>
            <ul>
              <li><strong>Gehaltsvergleiche</strong>: stepstone.de/gehaltsreport, glassdoor.de, entgeltatlas.arbeitsagentur.de</li>
              <li>Berufsverbände veröffentlichen oft Gehaltsübersichten nach Region und Berufsjahren</li>
              <li>Netzwerk: Kolleginnen und Kollegen fragen (Tabu ist überholt – und rechtlich das Auskunftsrecht gilt!)</li>
            </ul>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Beispiel: So verhandelst du</div>
            <p>Du möchtest 38.000€, weißt aber dass der Markt 40.000€ hergibt. Strategie:<br><br>
            „Basierend auf meiner Recherche und meinen Qualifikationen habe ich eine Vorstellung von <strong>42.000€ brutto</strong>." (Anker setzen über dem Ziel!)<br><br>
            Gegenangebot: 38.000€. Antwort: „Da liegen wir noch etwas auseinander. Wäre 40.000€ möglich?" – Oft klappt das!</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Wenn Gehalt nicht möglich ist</div>
            <p>Verhandel Benefits: Homeoffice-Tage, Weiterbildungsbudget, Jobticket, 30 statt 25 Urlaubstage, früherer Gehaltsreview-Termin. Diese haben ebenfalls echten Geldwert!</p>
          </div>
          <div class="info-card">
            <h4>🕐 Wann verhandeln?</h4>
            <ul>
              <li>Beim Jobangebot: VOR der Unterschrift – danach wird es schwerer</li>
              <li>Jährliches Gehaltsgespräch: Terminanfrage nach guten Leistungen, nach erfolgreichem Projekt</li>
              <li>Nicht während Probezeit (außer das Angebot war offensichtlich unter Marktwert)</li>
            </ul>
          </div>
        `
      },
      {
        title: 'Nebenjob & Selbstständigkeit',
        content: `
          <p class="content-intro">Side Hustle, Freelance, Werkstudent – viele junge Erwachsene haben mehrere Einkommensquellen. Was musst du beachten?</p>
          <div class="info-card">
            <h4>👨‍🎓 Werkstudent-Job</h4>
            <ul>
              <li>Max. 20h/Woche in der Vorlesungszeit (Semesterferien: bis 40h)</li>
              <li>Beitragsfrei in der Rentenversicherung: NEIN | Kranken/Pflege: JA befreit (Werkstudentenprivileg)</li>
              <li>Mindestlohn gilt auch für Werkstudenten!</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>💼 Minijob (603€-Job)</h4>
            <ul>
              <li>Bis 603€/Monat (Stand 2026) – pauschal besteuert, kein Sozialversicherungsabzug für dich</li>
              <li>Mehrere Minijobs möglich – aber zusammen nicht über 603€ beim selben Arbeitgeber</li>
              <li>Rentenversicherung: Automatisch einzahlend – du kannst aber befreien lassen (Formular beim Arbeitgeber)</li>
              <li>Tipp: Bei Mindestlohn (13,90€ seit 2026) darfst du im Minijob maximal ca. 43 Stunden monatlich arbeiten.</li>
            </ul>
          </div>
          <div class="warning-box">
            <div class="warning-box-label">⚠️ Nebenjob beim Hauptarbeitgeber anzeigen!</div>
            <p>Viele Arbeitsverträge enthalten eine Nebentätigkeitsklausel – du musst Nebenjobs anzeigen (nicht genehmigen lassen, nur melden). Außerdem: Arbeitszeitgesetz beachten – max. 10h/Tag, 8h im Durchschnitt!</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Freelance starten</div>
            <p>Mit Kreativarbeit, IT, Beratung oder Nachhilfe freelancen: Kein Gewerbe nötig wenn du Freiberufler bist (Design, Programmierung, Journalismus = freie Berufe). Nur beim Finanzamt anmelden, Kleinunternehmerregelung nutzen, Rechnungen stellen!</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'mobilitaet',
    icon: '🚗',
    color: '#f97316',
    gradient: 'linear-gradient(135deg,#3d1a00,#1a0b00)',
    title: 'Mobilität & Fahrzeug',
    short: 'Auto kaufen/leasen, Kfz-Kosten, Führerschein & ÖPNV-Alternativen',
    tags: ['Auto', 'Leasing', 'ÖPNV'],
    sections: [
      {
        title: 'Auto kaufen oder leasen?',
        content: `
          <p class="content-intro">Ein Auto ist oft die zweitgrößte Anschaffung nach dem Haus. Hier die echten Zahlen die niemand ausrechnet.</p>
          <div class="info-card">
            <h4>🔍 Kaufen – was kostet ein Auto wirklich?</h4>
            <p>Ein Gebrauchtwagen für 10.000€ klingt günstig – aber die Gesamtkosten:</p>
            <table class="cost-table">
              <thead><tr><th>Kostenart</th><th>Monatlich ca.</th></tr></thead>
              <tbody>
                <tr><td>Wertverlust (bei 10K€ Auto)</td><td>80–150€</td></tr>
                <tr><td>Kfz-Versicherung</td><td>60–150€</td></tr>
                <tr><td>Kfz-Steuer</td><td>10–30€</td></tr>
                <tr><td>Sprit (10.000 km/Jahr)</td><td>100–160€</td></tr>
                <tr><td>TÜV, Inspektion, Reifen</td><td>40–80€</td></tr>
                <tr><td class="cost-important">Gesamtkosten</td><td class="cost-important">290–570€/Monat!</td></tr>
              </tbody>
            </table>
          </div>
          <div class="warning-box">
            <div class="warning-box-label">⚠️ Leasing: Die versteckten Kosten</div>
            <p>Leasing klingt günstig (nur 199€/Monat!) – aber: Anzahlung, Kilometerüberschreitung (teuer!), Sonderzahlungen, Überführungskosten, du besitzt NIE das Auto. Leasingrate × Laufzeit oft deutlich teurer als Kauf eines Gebrauchtwagens!</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Gebrauchtwagen sicher kaufen</div>
            <p>Kaufe nie ohne: TÜV-Bericht (max. 12 Monate alt), Fahrzeughistorie (carVertical.com oder ADAC), Probefahrt + Werkstatt-Check (ca. 100€, spart tausende!). Vorsicht bei Privatkäufen: keine Gewährleistung!</p>
          </div>
        `
      },
      {
        title: 'Kfz-Versicherung',
        content: `
          <p class="content-intro">Pflicht für jedes Auto. Aber welche Deckung brauchst du und wie sparst du?</p>
          <div class="info-card">
            <h4>3 Arten der Kfz-Versicherung</h4>
            <ul>
              <li><strong>Haftpflicht</strong>: PFLICHT. Zahlt Schäden die du anderen verursachst. Dein eigenes Auto: nicht abgedeckt.</li>
              <li><strong>Teilkasko</strong>: Zusätzlich: Diebstahl, Brand, Glasbruch, Marderbiss, Sturm, Hagel</li>
              <li><strong>Vollkasko</strong>: Auch eigenverschuldete Unfälle + Vandalismus. Für neue oder teure Autos sinnvoll.</li>
            </ul>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Wann brauche ich was?</div>
            <p><strong>Neues Auto</strong>: Vollkasko (Bank verlangt's oft bei Finanzierung)<br>
            <strong>Gebrauchtwagen unter 5 Jahre</strong>: Teilkasko<br>
            <strong>Älteres Auto unter 5.000€ Wert</strong>: Nur Haftpflicht – Vollkasko lohnt sich nicht mehr!</p>
          </div>
          <div class="info-card">
            <h4>💡 Geld sparen bei der Kfz-Versicherung</h4>
            <ul>
              <li>Jährliche statt monatliche Zahlung: spart 5–10%</li>
              <li>Hohe Selbstbeteiligung (500–1.000€) senkt Prämie deutlich</li>
              <li>SF-Klasse: Je länger schadensfrei, desto günstiger</li>
              <li>Wechsel: Jedes Jahr zum 1. Oktober wechseln (Stichtag!), Vergleich auf check24.de</li>
              <li>Eltern-SF-Klasse übertragen lassen</li>
            </ul>
          </div>
        `
      },
      {
        title: 'ÖPNV & Alternativen',
        content: `
          <p class="content-intro">Ein Auto ist teuer. Diese Alternativen sparen Tausende Euro im Jahr und sind oft genauso praktisch!</p>
          <div class="info-card">
            <h4>🎫 Deutschlandticket</h4>
            <p>49€/Monat (oder günstigerer Arbeitgeber-Tarif) – ÖPNV deutschlandweit. Monatlich kündbar! Ideal wenn du in einer Stadt lebst. Kein Auto + Deutschlandticket spart bei 400€/Monat Autokosten über 4.000€/Jahr!</p>
          </div>
          <div class="info-card">
            <h4>🚲 Fahrrad & E-Bike</h4>
            <ul>
              <li><strong>Job-Rad</strong>: Arbeitgeber least E-Bike für dich, du zahlst per Gehaltsumwandlung – steuerlicher Vorteil bis 40%!</li>
              <li>Fahrrad-Diebstahlversicherung: Oft in Hausrat inkludierbar, oder ADAC-Schutzbrief</li>
              <li>Pedelec (bis 25 km/h): Kein Führerschein, kein Kennzeichen nötig</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>🚗 Carsharing</h4>
            <ul>
              <li><strong>SHARE NOW</strong>, <strong>Sixt Share</strong>, <strong>Miles</strong> – minutenweise mieten, inklusive Versicherung und Sprit</li>
              <li>Ideal wenn du max. 1–2x pro Woche ein Auto brauchst</li>
              <li>Für Stadtbewohner fast immer günstiger als eigenes Auto</li>
            </ul>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Die Rechnung</div>
            <p>Deutschlandticket (49€) + Carsharing (50€/Monat im Schnitt) + Fahrrad = ca. 100€/Monat. Verglichen mit eigenem Auto (350–500€): Ersparnis von 250–400€ monatlich = <strong>3.000–4.800€/Jahr!</strong></p>
          </div>
        `
      },
      {
        title: 'Führerschein & Zulassung',
        content: `
          <p class="content-intro">Führerschein, Kfz-Anmeldung, TÜV – das Bürokratie-ABC rund ums Auto.</p>
          <div class="info-card">
            <h4>🔖 Führerschein Klassen (Übersicht)</h4>
            <ul>
              <li><strong>Klasse B</strong>: Standard-PKW bis 3,5t</li>
              <li><strong>Klasse A1</strong>: Motorrad bis 125ccm (ab 16)</li>
              <li><strong>Klasse A</strong>: Motorrad unbegrenzt (ab 24, oder 2 Jahre A2)</li>
              <li><strong>Klasse BE</strong>: PKW mit Anhänger – wichtig wenn du umziehst!</li>
              <li><strong>Begleitetes Fahren (BF17)</strong>: Ab 17 mit Elternteil – günstigerer Einstieg in SF-Klasse</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>🚘 Auto anmelden – was brauchst du?</h4>
            <ul>
              <li>Personalausweis</li>
              <li>Fahrzeugbrief (Zulassungsbescheinigung Teil II)</li>
              <li>Fahrzeugschein (Zulassungsbescheinigung Teil I) – vom Vorbesitzer</li>
              <li>eVB-Nummer deiner Kfz-Versicherung (bekommst du von der Versicherung sofort per E-Mail)</li>
              <li>HU-Nachweis (TÜV) – falls über fällig</li>
              <li>SEPA-Lastschrift für Kfz-Steuer</li>
            </ul>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 TÜV & HU</div>
            <p>Hauptuntersuchung (TÜV) alle 2 Jahre (neues Auto: 3 Jahre). Überfälliger TÜV = teures Bußgeld + Versicherungsprobleme bei Unfall! Erinnerung: Steht auf dem Kennzeichen (Farbstreifen + Jahr).</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'haushalt',
    icon: '🍳',
    color: '#34d399',
    gradient: 'linear-gradient(135deg,#0a2e1a,#081a0f)',
    title: 'Haushalt & Alltagskompetenzen',
    short: 'Waschen, Kochen, Putzen, Reparaturen & Energie sparen',
    tags: ['Alltag', 'Sparen', 'Selbstständig'],
    sections: [
      {
        title: 'Waschen & Pflegen',
        content: `
          <p class="content-intro">Kleidung richtig waschen ist keine Selbstverständlichkeit – falsch gemacht schrumpft der Lieblingssweatshirt oder verfärbt sich der weiße Hemden-Stapel rosa.</p>
          <div class="info-card">
            <h4>🏷️ Wäscheetiketten – die wichtigsten Symbole</h4>
            <ul>
              <li>🔢 <strong>Zahl im Waschbottich</strong>: Maximaltemperatur (30°, 40°, 60°, 95°)</li>
              <li>✋ <strong>Hand im Bottich</strong>: Nur Handwäsche</li>
              <li>❌ <strong>Durchgestrichen</strong>: Nicht waschen!</li>
              <li>⬜ <strong>Quadrat mit Kreis</strong>: Trockner erlaubt | mit Punkt = niedrige Temp.</li>
              <li>🔺 <strong>Dreieck</strong>: Bleiche erlaubt | durchgestrichen = nicht bleichen</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>Wäsche richtig sortieren</h4>
            <ul>
              <li><strong>Weiß</strong>: Allein waschen, 60°C möglich</li>
              <li><strong>Hell</strong>: 30–40°C, zusammen mit anderen Hellen</li>
              <li><strong>Dunkel/Bunt</strong>: 30°C, erste Wäsche immer allein</li>
              <li><strong>Wolle/Seide</strong>: Schonprogramm oder Handwäsche</li>
            </ul>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Energie sparen beim Waschen</div>
            <p>30°C statt 60°C spart bis zu 60% Energie. Volle Trommel = effizienter. Schleudern spart Trocknungszeit. Trockner: teuerste Maschine im Haushalt – Wäscheständer nutzen!</p>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Schnell-Lösung: Rotwein-Fleck</div>
            <p>Sofort: Mit Sprudelwasser aufsaugen (NICHT reiben!). Dann Geschirrspülmittel einarbeiten, 10 Minuten ziehen lassen, kalt auswaschen. Bei hartnäckigen Flecken: Gallseife. Niemals heiß waschen bevor der Fleck raus ist!</p>
          </div>
        `
      },
      {
        title: 'Günstig & gesund kochen',
        content: `
          <p class="content-intro">Du musst kein Koch sein um gesund und günstig zu essen. Mit 5 Grundrezepten überlebst du die ersten Monate.</p>
          <div class="info-card">
            <h4>🛒 Günstig einkaufen</h4>
            <ul>
              <li>Discounter (Aldi, Lidl) für Grundnahrungsmittel – bis 40% günstiger als Supermarkt</li>
              <li>Eigenmarken/No-Name: Oft vom selben Hersteller, deutlich günstiger</li>
              <li><strong>Zu-gut-für-die-Tonne</strong>: foodsharing.de, Too Good To Go App – Essen für 1–3€</li>
              <li>Saisonales kaufen: Erdbeeren im Winter = 3x teurer und schlechter</li>
              <li>Gefrorenes Gemüse: Genauso nahrhaft und viel günstiger</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>🍳 Die 5 Grundrezepte</h4>
            <ul>
              <li><strong>Nudeln mit Tomatensoße</strong>: 10 Min., &lt;2€/Person</li>
              <li><strong>Rührei mit Gemüse</strong>: 5 Min., &lt;1,50€</li>
              <li><strong>Linseneintopf</strong>: 30 Min., reicht 3 Tage, &lt;1€/Portion</li>
              <li><strong>Reis mit Pfannengemüse</strong>: 20 Min., sehr variabel</li>
              <li><strong>Overnight Oats</strong>: 2 Min. am Abend, gesundes Frühstück</li>
            </ul>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Meal Prep spart Zeit & Geld</div>
            <p>Einmal pro Woche vorkochen: Reis, Linsen, Ofengemüse in großer Menge zubereiten – reicht 4–5 Tage. Abends 5 Minuten kombinieren statt 30 Minuten täglich kochen. Gefrierbox nutzen für Portionen!</p>
          </div>
        `
      },
      {
        title: 'Putzen & Ordnung',
        content: `
          <p class="content-intro">Putzen ist einfacher wenn du ein System hast. Und kostet weniger als du denkst – wenn du das richtige kaufst.</p>
          <div class="info-card">
            <h4>🧹 Die 5 Putzmittel die du wirklich brauchst</h4>
            <ul>
              <li><strong>Allzweckreiniger</strong> (z.B. Domestos Spray): Küche, Bad, Oberflächen</li>
              <li><strong>WC-Reiniger</strong>: Toilette innen</li>
              <li><strong>Glasreiniger</strong>: Spiegel, Fenster</li>
              <li><strong>Scheuermilch</strong>: Hartnäckige Ablagerungen, Waschbecken</li>
              <li><strong>Backpulver + Essig</strong>: Günstige Universalwaffe gegen Kalk, Geruch</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>📅 Putzplan für Erstbesitzer</h4>
            <ul>
              <li><strong>Täglich (5 Min.)</strong>: Küche nach Kochen, Spüle, Wischmopp in Küche</li>
              <li><strong>Wöchentlich (30 Min.)</strong>: Staubsaugen, Bad komplett, Böden wischen</li>
              <li><strong>Monatlich</strong>: Kühlschrank, Ofen, Fenster, hinter Möbeln</li>
              <li><strong>Jährlich</strong>: Großreinemachen, Jalousien, Kellerabteil</li>
            </ul>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Schimmel verhindern</div>
            <p>Täglich 10 Minuten Stoßlüften (Fenster ganz auf) ist effektiver als Kippen. Nach dem Duschen: Feuchtigkeit wegwischen + Tür offen. Raumfeuchte 40–60% ist ideal (Hygrometer ca. 8€).</p>
          </div>
        `
      },
      {
        title: 'Kleine Reparaturen',
        content: `
          <p class="content-intro">Nicht für jede Kleinigkeit den Handwerker rufen – diese Dinge kann wirklich jeder selbst.</p>
          <div class="info-card">
            <h4>🔧 Basis-Werkzeugkasten</h4>
            <ul>
              <li>Hammer + Nägel (Bilder aufhängen)</li>
              <li>Akkuschrauber oder Schraubenzieher-Set</li>
              <li>Zange (Flach + Kombizange)</li>
              <li>Wasserwaage (für gerade Regale)</li>
              <li>Maßband</li>
              <li>Dübel-Sortiment (Wand vs. Hohlraum-Dübel)</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>Selbst reparierbar</h4>
            <ul>
              <li>🚿 <strong>Tropfender Wasserhahn</strong>: Dichtung tauschen, YouTube-Tutorial, Teile &lt;5€</li>
              <li>💡 <strong>Sicherung ausgefallen</strong>: Sicherungskasten öffnen, ausgelöste Sicherung zurückstellen oder neue einsetzen</li>
              <li>🚽 <strong>Toilette läuft</strong>: Füllventil oder Ablaufventil im Tank tauschen, 15€ + 1 Stunde</li>
              <li>🖼️ <strong>Loch in der Wand</strong>: Spachtelmasse + schleifen + streichen</li>
            </ul>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 YouTube ist dein Freund</div>
            <p>Für JEDE Reparatur gibt es ein deutschsprachiges YouTube-Tutorial. Suchbegriff: Modellnummer + Problem. IFIXIT.com für Elektronik-Reparaturen. Werkzeug leihen statt kaufen: Baumarkt-Verleih oder Nachbarschaftshilfe!</p>
          </div>
          <div class="warning-box">
            <div class="warning-box-label">⚠️ Finger weg bei</div>
            <p>Elektrischen Installationen (Strom = Lebensgefahr!), Gasinstallationen (immer Fachmann!), tragenden Wänden. Bei Mietwohnung: Größere Eingriffe immer erst mit Vermieter absprechen!</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'familie',
    icon: '👨‍👩‍👧',
    color: '#fb923c',
    gradient: 'linear-gradient(135deg,#3d1800,#1f0d00)',
    title: 'Familie, Partnerschaft & Zusammenleben',
    short: 'Zusammenziehen, Elterngeld, Kindergeld & Rechte in der Beziehung',
    tags: ['Elterngeld', 'Kindergeld', 'Ehe'],
    sections: [
      {
        title: 'Zusammenziehen',
        content: `
          <p class="content-intro">Zusammenziehen macht vieles günstiger – aber bringt auch rechtliche Fragen mit sich die du kennen solltest.</p>
          <div class="info-card">
            <h4>📋 Wer steht im Mietvertrag?</h4>
            <p>Beide Partner sollten im Mietvertrag stehen – dann haben beide die gleichen Rechte und Pflichten. Steht nur einer drin: Bei Trennung oder Tod kann der andere einfach herausgebeten werden. Vermieter muss dem Einzug eines Partners nicht zustimmen, muss aber informiert werden!</p>
          </div>
          <div class="info-card">
            <h4>💰 Gemeinsames Konto – ja oder nein?</h4>
            <ul>
              <li><strong>Getrennte Konten</strong>: Jeder zahlt seinen Anteil – einfach, klar, fair</li>
              <li><strong>Haushaltskonto</strong>: Beide zahlen festem Betrag ein, davon werden gemeinsame Ausgaben bezahlt</li>
              <li><strong>Gemeinsames Hauptkonto</strong>: Geht gut wenn Vertrauen und gleiche Finanzsicht. Trennung = kompliziert!</li>
            </ul>
          </div>
          <div class="warning-box">
            <div class="warning-box-label">⚠️ Ehevertrag – warum wichtig?</div>
            <p>Ohne Ehevertrag gilt gesetzlicher Zugewinnausgleich: Was während der Ehe angespart wurde, wird bei Scheidung hälftig geteilt. Für Selbstständige, Erbschaften und Firmenbeteiligungen oft problematisch. Beratung beim Notar!</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Unverheiratet – und wenn was passiert?</div>
            <p>Unverheiratete Partner haben KEINE gegenseitigen Erbrechte! Vorsorgevollmacht + Testament sind deshalb auch für junge Paare ohne Trauschein wichtig. Notarkosten: ca. 100–300€.</p>
          </div>
        `
      },
      {
        title: 'Elterngeld',
        content: `
          <p class="content-intro">Wer Eltern wird hat Anspruch auf Elterngeld – aber die Regeln sind komplex. Hier die Basics.</p>
          <div class="info-card">
            <h4>Was ist Elterngeld?</h4>
            <ul>
              <li><strong>Basiselterngeld</strong>: 65–67% des letzten Nettogehalts, für 12 Monate (berufstätig) – 2 Monate extra wenn Partner auch Elternzeit nimmt</li>
              <li><strong>Min./Max.</strong>: Mindestens 300€/Monat, maximal 1.800€/Monat</li>
              <li><strong>ElterngeldPlus</strong>: Halber Betrag, aber doppelt so lange – ideal wenn du in Teilzeit arbeiten möchtest</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>Elternzeit vs. Elterngeld</h4>
            <p><strong>Elternzeit</strong> = Recht auf Freistellung vom Job (bis 3 Jahre!). Muss mind. 7 Wochen vorher beim Arbeitgeber beantragt werden.<br>
            <strong>Elterngeld</strong> = Geld vom Staat. Wird bei der zuständigen Elterngeldstelle beantragt (Jugendamt / Versorgungsamt je nach Bundesland).</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Elterngeld-Strategie für Paare</div>
            <p>Der besserverdienende Partner zuerst in Elternzeit: Elterngeld ist 67% des letzten Nettolohns – also je höher das Gehalt, desto mehr Elterngeld. Dann Partner mit 2 Partnermonaten. Maximale Auszahlungsdauer: 14 Monate!</p>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 Beantragung</div>
            <p>Elterngeld rückwirkend bis zu 3 Monate beantragbar. Aber: Kein Elterngeld für Monate vor der Geburt. Spätestens direkt nach der Geburt beantragen! Berechner: elterngeld.de oder BMFSFJ-Rechner</p>
          </div>
        `
      },
      {
        title: 'Kindergeld & Leistungen',
        content: `
          <p class="content-intro">Kinder kosten Geld – der Staat hilft. Aber nur wenn du die Leistungen auch beantragst!</p>
          <div class="info-card">
            <h4>💶 Kindergeld</h4>
            <ul>
              <li>259€/Monat pro Kind (Stand 2026) – automatisch bis 18, danach bis 25 bei Ausbildung/Studium</li>
              <li>Beantragung: Familienkasse der Agentur für Arbeit – rückwirkend max. 6 Monate!</li>
              <li>Online: familienkasse.de oder persönlich bei der Agentur für Arbeit</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>🏠 Kinderzuschlag</h4>
            <p>Für Geringverdiener die zwar Kindergeld bekommen, aber trotzdem nicht genug für die ganze Familie verdienen. Bis zu 292€/Monat zusätzlich pro Kind. Rechner: arbeitsagentur.de/familie-und-kinder/kinderzuschlag</p>
          </div>
          <div class="info-card">
            <h4>📚 Bildungs- und Teilhabepaket</h4>
            <p>Für Kinder aus einkommensschwachen Familien (Bürgergeld, Wohngeld): Schulessen, Klassenfahrten, Schulbedarf, Nachhilfe, Vereinsbeiträge werden bezahlt. Beim Jobcenter/Sozialamt beantragen.</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Steuerliche Vorteile</div>
            <p>Kinderfreibetrag (wird jährlich angepasst, mind. 9.400€/Jahr) oder Kindergeld – das Finanzamt berechnet automatisch (Günstigerprüfung), was für euch besser ist. Kinderbetreuungskosten: bis zu 2/3 der Kosten (max. 4.000€/Kind/Jahr) absetzbar!</p>
          </div>
        `
      },
      {
        title: 'Trennung & Rechte',
        content: `
          <p class="content-intro">Trennungen sind emotional schwer – und rechtlich komplex. Diese Basics können teure Fehler verhindern.</p>
          <div class="info-card">
            <h4>🔑 Wohnung bei Trennung</h4>
            <p>Wer bleibt in der Wohnung? Das entscheiden nicht ihr alleine. Beide haben ggfs. gleiche Rechte wenn beide im Mietvertrag stehen. Im Streitfall: Familiengericht. Der Ausziehende bleibt Mitmieter bis Vermieter den Vertrag anpasst!</p>
          </div>
          <div class="info-card">
            <h4>👶 Sorgerecht & Unterhalt</h4>
            <ul>
              <li>Unverheiratet: Mutter hat automatisch alleiniges Sorgerecht – Vater muss Sorgerechtserklärung beantragen (beim Jugendamt, kostenlos)</li>
              <li>Verheiratet: Gemeinsames Sorgerecht bleibt auch nach Scheidung, außer Gericht entscheidet anders</li>
              <li>Kindesunterhalt: Düsseldorfer Tabelle regelt Beträge nach Einkommen. Beachten: Unterhalt muss auch der verdienende Elternteil zahlen der das Kind betreut!</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>📋 Scheidung – Ablauf (Deutschland)</h4>
            <ul>
              <li>1 Jahr Trennungszeit Pflicht (Leben in getrennten Haushalten)</li>
              <li>Scheidungsantrag über Anwalt beim Familiengericht</li>
              <li>Mindestens einer braucht einen Anwalt (Anwaltszwang!)</li>
              <li>Verfahrensdauer: 3–18 Monate, kostet ca. 1.500–5.000€+</li>
            </ul>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Mediation</div>
            <p>Vor dem teuren Gerichtsverfahren: Mediation! Ein neutraler Mediator hilft bei Einigung über Unterhalt, Sorgerecht, Vermögen. Kostet ca. 150–300€/Stunde, oft 3–5 Sitzungen. Jugendhilfe bietet auch kostenlose Beratung an.</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'krise',
    icon: '🆘',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg,#3d0000,#1a0000)',
    title: 'Krisensituationen & Notfallplan',
    short: 'Was tun bei Einbruch, Unfall, psychischer Krise, Obdachlosigkeit & Co.',
    tags: ['Notfall', 'Krisenplan', 'Erste Hilfe'],
    sections: [
      {
        title: 'Wohnungsnotfall',
        content: `
          <p class="content-intro">Einbruch, Wasserschaden, Brand – manchmal schlägt das Leben ohne Vorwarnung zu. Vorbereitet sein macht den Unterschied.</p>
          <ol class="steps-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-content">
                <strong>Bei Einbruch</strong>
                <span>NICHT die Wohnung betreten wenn der Täter noch da sein könnte! 110 anrufen. Nichts anfassen (Spurensicherung). Dann: Versicherung (Hausrat) melden, Verlustliste erstellen, Anzeige erstatten.</span>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-content">
                <strong>Bei Wohnungsbrand</strong>
                <span>112 sofort! Wohnung verlassen, Türen schließen (kein Aufzug!). Wenn Du eingeschlossen bist: Tür abdichten, Fenster öffnen, auf sich aufmerksam machen. Nie zurück in brennendes Gebäude!</span>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-content">
                <strong>Bei Wasserschaden</strong>
                <span>Hauptabsperrhahn schließen (meist im Keller). Strom im betroffenen Bereich abschalten. Vermieter sofort informieren. Hausratversicherung anrufen. Fotos für Schadensdokumentation!</span>
              </div>
            </li>
            <li>
              <div class="step-num">4</div>
              <div class="step-content">
                <strong>Sicherungskasten ausgefallen</strong>
                <span>Sicherungskasten aufmachen: Ausgelöste Sicherung (in Mittelposition) zurückstellen. Wenn sie wieder auslöst: Zu viele Geräte am selben Stromkreis, oder Gerät defekt → Elektriker!</span>
              </div>
            </li>
          </ol>
          <div class="tip-box">
            <div class="tip-box-label">💡 Notfall-Vorsorge jetzt</div>
            <p>Dokumente (Ausweis, Versicherungsunterlagen, Geburtsurkunde) digital sichern – in der Cloud oder verschlüsselt. Notfallkontakte im Handy speichern. Rauchmelder in JEDEM Raum (Pflicht in D!) + Feuerlöscher.</p>
          </div>
        `
      },
      {
        title: 'Psychische Krise',
        content: `
          <p class="content-intro">Wenn nichts mehr geht – es gibt immer Hilfe. Hier sind die richtigen Anlaufstellen für jede Situation.</p>
          <div class="info-card">
            <h4>🆘 Sofortige Hilfe (24/7)</h4>
            <ul>
              <li><strong>Telefonseelsorge</strong>: 0800 111 0 111 (kostenlos, anonym)</li>
              <li><strong>Krisenchat</strong>: krisenchat.de – Chatten statt Telefonieren (24/7)</li>
              <li><strong>Krisentelefon für Kinder/Jugendliche</strong>: 0800 111 0 333</li>
              <li><strong>Psychiatrische Notaufnahme</strong>: Beim nächsten Krankenhaus – kein Termin nötig!</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>Mittel- und langfristige Hilfe</h4>
            <ul>
              <li><strong>Hausarzt</strong>: Erste Anlaufstelle – überweist zu Psychologen/Psychiater</li>
              <li><strong>Online-Therapie</strong>: HelloBetter, Instahelp, Selfapy – oft von Kassen erstattet</li>
              <li><strong>Psychosomatische Ambulanz</strong>: An Unikliniken, kürzere Wartezeiten als niedergelassene Therapeuten</li>
              <li><strong>Selbsthilfegruppen</strong>: nakos.de für Sucht, Depression, Angststörungen uvm.</li>
            </ul>
          </div>
          <div class="warning-box">
            <div class="warning-box-label">⛑️ Bei akuter Suizidgefahr</div>
            <p>0800 111 0 111 anrufen ODER 112 ODER direkt in die nächste Notaufnahme fahren. Du bist nicht allein. Jede Krise ist vorübergehend. Professionelle Hilfe kann Leben retten.</p>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Krankschreibung</div>
            <p>Psychische Erkrankungen berechtigen zur Krankmeldung – genau wie körperliche. Arbeitgeber darf den Grund NICHT erfahren. Dein Arzt bescheinigt nur die Arbeitsunfähigkeit, nicht die Diagnose.</p>
          </div>
        `
      },
      {
        title: 'Wohnungslosigkeit',
        content: `
          <p class="content-intro">Wohnungsnot kann jeden treffen – durch Trennungen, Jobverlust oder plötzliche Kündigung. So handelst du richtig.</p>
          <div class="info-card">
            <h4>⚡ Sofortmaßnahmen bei drohender Obdachlosigkeit</h4>
            <ul>
              <li>Sofort zum <strong>Sozialamt</strong>: Hat Pflicht, akute Wohnungslosigkeit zu verhindern (§ 67 SGB XII)</li>
              <li>Wohnungsnotfallhilfe der Stadt – jede größere Stadt hat eine</li>
              <li>Soziale Einrichtungen: Caritas, Diakonie, AWO haben Notunterkünfte</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>📞 Hilfsangebote</h4>
            <ul>
              <li><strong>Bundesarbeitsgemeinschaft Wohnungslosenhilfe</strong>: bagw.de – Beratung und Anlaufstellen</li>
              <li><strong>Caritas</strong>: caritas.de – lokale Anlaufstellen für Wohnungslose</li>
              <li><strong>Notunterkünfte</strong>: Die Stadt ist gesetzlich verpflichtet eine Unterkunft zu stellen!</li>
            </ul>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Wenn der Vermieter unrechtmäßig kündigt</div>
            <p>Du musst eine Wohnung NICHT räumen bis das Gericht entschieden hat! Einfach Räumungsklage abwarten – das dauert Monate. Mieterschutzverein sofort kontaktieren!</p>
          </div>
        `
      },
      {
        title: 'Sucht & Abhängigkeit',
        content: `
          <p class="content-intro">Sucht ist eine Krankheit – keine Charakterschwäche. Professionelle Hilfe funktioniert.</p>
          <div class="info-card">
            <h4>Arten der Sucht die oft unerkannt bleiben</h4>
            <ul>
              <li>🍺 Alkohol (viele trinken mehr als sie denken)</li>
              <li>🎰 Online-Glücksspiel (sehr schnell suchterzeugend)</li>
              <li>📱 Social Media / Gaming Sucht</li>
              <li>☕ Nikotin (auch E-Zigaretten!)</li>
              <li>💊 Medikamente (Schlafmittel, Schmerzmittel)</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>Anlaufstellen</h4>
            <ul>
              <li><strong>Bundeszentrale für gesundheitliche Aufklärung (BZgA)</strong>: bzga.de – kostenlose Beratung zu allen Suchtthemen</li>
              <li><strong>Rauchfrei-Hotline</strong>: 0800 8 31 31 31 (kostenlos, Mo–Do 10–22 Uhr)</li>
              <li><strong>Spielsucht Hotline</strong>: 0800 1 37 27 00 (kostenlos, 24/7)</li>
              <li><strong>Anonyme Alkoholiker</strong>: anonyme-alkoholiker.de</li>
              <li><strong>Drogenberatung</strong>: drogenberatung.de – local + online</li>
            </ul>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Entzug und Rehab</div>
            <p>Entzug wird von der Krankenkasse bezahlt! Stationäre Reha bis zu 3 Monate, ambulante Programme, Selbsthilfegruppen – alles kostenlos über GKV. Arzt fragen oder bei der Krankenkasse direkt anfragen.</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'digital',
    icon: '🌐',
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg,#002535,#001525)',
    title: 'Digitales Leben & Sicherheit',
    short: 'Social Media, digitaler Nachlass, KI-Tools, Cybermobbing & Online-Betrug',
    tags: ['Internet', 'Sicherheit', 'KI'],
    sections: [
      {
        title: 'Online-Betrug erkennen',
        content: `
          <p class="content-intro">Betrug im Internet ist professioneller als je zuvor. Diese Warnsignale erkennst du sofort – und so schützt du dich.</p>
          <div class="info-card">
            <h4>🚨 Die häufigsten Betrugsmaschen (Aktuell 2026)</h4>
            <ul>
              <li><strong>Phishing-E-Mails</strong>: Gefälschte Bankemails – erkennbar an Absenderadresse, Link-URL, Rechtschreibfehlern. Lösung: NIE auf Links klicken, direkt auf Webseite gehen!</li>
              <li><strong>Fake-Shops</strong>: Günstige Waren auf dubiosen Seiten – Geld geht verloren. Check: Impressum vorhanden? Trust-Score auf trustedshops.de?</li>
              <li><strong>Love-Scam</strong>: Online-Beziehung die plötzlich um Geld bittet. Immer Betrug!</li>
              <li><strong>WhatsApp-"Kind in Not"</strong>: Neue Nummer, "Mama ich brauch dringend Geld". Rückrufen auf bekannter Nummer!</li>
              <li><strong>Gewinnspiel-Abo-Fallen</strong>: "Du hast gewonnen" – tatsächlich teureres Abo</li>
            </ul>
          </div>
          <div class="example-box">
            <div class="example-box-label">📌 So prüfst du eine verdächtige Website</div>
            <p>URL prüfen: amazon.de ≠ amazon-de-shop.com<br>
            Impressum vorhanden? (Pflicht in Deutschland!)<br>
            <strong>virustotal.com</strong>: URL auf Schadsoftware prüfen<br>
            <strong>whois.domaintools.com</strong>: Wer betreibt die Seite?<br>
            Komische Rechtschreibung? Schlechte Bilder? Kein Datenschutz? = Warnsignal!</p>
          </div>
        `
      },
      {
        title: 'Social Media & Recht',
        content: `
          <p class="content-intro">Was du postest bleibt – und kann rechtliche Konsequenzen haben. Hier die wichtigsten Regeln.</p>
          <div class="info-card">
            <h4>📸 Recht am eigenen Bild</h4>
            <p>In Deutschland: Fotos von Personen dürfen nicht ohne Zustimmung veröffentlicht werden! Gilt auch für Freunde und Bekannte. Wildert du auf Konzerten? Künstler auf Bühne = erlaubt. Backstage oder in der Menge = Zustimmung nötig!</p>
          </div>
          <div class="info-card">
            <h4>⚡ Was Social-Media-Posts kosten können</h4>
            <ul>
              <li>Beleidigung/Verleumdung: Abmahnungen bis 10.000€, Strafanzeige möglich</li>
              <li>Markenschutzverletzung: Logos/Brands ohne Erlaubnis = teuer</li>
              <li>Copyrighted Music in Videos: Content wird gesperrt oder monetisiert</li>
              <li>Cybermobbing: Strafbar (§ 238 StGB), Schadensersatzpflicht</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>🔒 Datenschutz auf Social Media</h4>
            <ul>
              <li>Datenschutz-Einstellungen auf Maximum setzen</li>
              <li>Standort-Sharing ausschalten (Fotos verraten Aufenthaltsort!)</li>
              <li>App-Berechtigungen regelmäßig prüfen: Braucht TikTok wirklich Zugriff auf Kontakte?</li>
              <li>Datenkopie anfordern: DSGVO-Recht bei jeder Plattform</li>
            </ul>
          </div>
        `
      },
      {
        title: 'Digitaler Nachlass',
        content: `
          <p class="content-intro">Was passiert mit deinen Online-Konten wenn du stirbst? Die wenigsten denken daran – aber es ist wichtig.</p>
          <div class="info-card">
            <h4>Was du regeln solltest</h4>
            <ul>
              <li><strong>Passwort-Safe</strong>: Vertrauensperson weiß wo und wie sie Zugang bekommt (z.B. Bitwarden mit Notfallkontakt)</li>
              <li><strong>Online-Banking</strong>: Bank benachrichtigen, Vollmacht oder Erbnachweis nötig</li>
              <li><strong>Social Media</strong>: Facebook, Instagram etc. können auf Antrag Gedenkprofile oder Löschung vornehmen</li>
              <li><strong>Abos kündigen</strong>: Spotify, Netflix etc. laufen weiter bis jemand kündigt!</li>
            </ul>
          </div>
          <div class="tip-box">
            <div class="tip-box-label">💡 Digitaler Nachlass-Brief</div>
            <p>Schreibe einen Brief mit: Liste deiner wichtigen Konten, wo Passwörter zu finden sind, was mit deinen Daten/Profilen geschehen soll. In einem verschlossenen Umschlag aufbewahren – Vertrauensperson weiß wo er liegt.</p>
          </div>
          <div class="info-card">
            <h4>🤖 KI-Tools sinnvoll nutzen</h4>
            <ul>
              <li><strong>ChatGPT</strong>: Texte schreiben, Ideen entwickeln, Erklärungen holen</li>
              <li><strong>Perplexity.ai</strong>: Recherchieren mit Quellenangaben</li>
              <li><strong>DeepL</strong>: Übersetzen (besser als Google Translate)</li>
              <li>Wichtig: KI kann irren! Fakten immer prüfen. Nie vertrauliche Daten eingeben (Passwörter, Ausweisdaten).</li>
            </ul>
          </div>
        `
      }
    ]
  },
  {
    id: 'behoerdendeutsch',
    icon: '🏛️',
    color: '#0891b2',
    gradient: 'linear-gradient(135deg,#134e4a,#164e63)',
    title: 'Behörden-Deutsch entziffern',
    short: 'Briefe vom Amt verstehen ohne Panik zu bekommen.',
    tags: ['Amt', 'Briefe', 'Recht'],
    sections: [
      {
        title: 'Warum schreiben die so komisch?',
        content: '<p class="content-intro">Beamtendeutsch ist nicht dazu da, dich zu ärgern. Es ist einfach extrem präzise formuliert, damit es vor Gericht wasserdicht ist.</p><div class="info-card"><h4>Das Problem: Nominalstil & Passiv</h4><p>Anstatt "Du musst das Formular ausfüllen" schreiben Ämter oft: "Es wird hiermit die Aufforderung zur Einreichung des Formulars erteilt." Das klingt total einschüchternd, bedeutet aber genau dasselbe!</p></div>'
      },
      {
        title: 'Der Übersetzer-Trick',
        content: '<div class="tip-box"><div class="tip-box-label">💡 3 Schritte zur Übersetzung</div><ol><li><strong>Such das Verb!</strong> Meistens verstecken Ämter die eigentliche "Action" in Substantiven (Nomen), z.B. "Zur Zurückweisung kommen". Das Verb dazu ist "zurückweisen" = Nein sagen.</li><li><strong>Wer tut hier was?</strong> Wegen des "Passivs" steht da oft nicht "Wir lehnen ab", sondern "Der Antrag wird abgelehnt". Frag dich immer: Wer macht was mit wem?</li><li><strong>Teile Schachtelsätze:</strong> Streiche gedanklich alle Einschübe zwischen Kommas raus, um den Kernsatz zu erkennen.</li></ol></div>'
      },
      {
        title: 'Die schlimmsten Briefe',
        content: '<div class="warning-box"><div class="warning-box-label">⚠️ Anhörungsschreiben</div><p>Wenn dort "Anhörung" steht, bedeutet das NICHT, dass du vor Gericht stammeln musst. Das Amt sagt dir damit einfach: "Wir wollen dir gleich einen Brief schicken, der vielleicht nicht so toll ist. Hast du noch eine Ausrede/einen Grund, den wir beachten sollten, bevor wir das entscheiden?" Schreibe einfach zurück und erkläre deine Lage.</p></div><div class="info-card"><h4>Die Fristsetzung</h4><p>Einer der wichtigsten Sätze: "Binnen einer Frist von 4 Wochen...". Diese Frist musst du einhalten, sonst wird es teuer oder dein Antrag wird abgewiesen. Wenn du es nicht pünktlich schaffst: ANRUFEN und um Fristverlängerung bitten!</p></div>'
      },
      {
        title: 'Hilfe: Leichte Sprache',
        content: '<div class="tip-box"><div class="tip-box-label">💡 Ein genialer Trick</div><p>Deutschland verpflichtet viele Behörden dazu, ihre Texte auch in sogenannter <strong>„Leichter Sprache“</strong> zur Verfügung zu stellen. Geh auf die Website des Amtes (z.B. BAföG-Amt, Jobcenter) und scrolle ganz nach unten oder oben rechts. Oft gibt es dort einen Button "Leichte Sprache". Hier wird das schlimmste Behördendeutsch in einfachen Hauptsätzen für jeden erklärt!</p></div>'
      }
    ]
  }
];

let CONTACTS = [
  {
    id: 'meldeamt',
    icon: '🏛️',
    color: '#4f8ef7',
    name: 'Einwohnermeldeamt / Bürgerbüro',
    role: 'An-/Abmeldung, Ummeldung bei Umzug',
    badge: 'Behörde',
    badgeColor: '#4f8ef7',
    summary: 'Pflicht innerhalb von 14 Tagen nach Umzug. Termin unbedingt vorher online buchen!',
    details: [
      { label: '📋 Was du mitbringst', text: 'Personalausweis oder Reisepass + Wohnungsgeberbestätigung (muss dein Vermieter ausfüllen)' },
      { label: '⏱️ Öffnungszeiten', text: 'Meist Mo–Fr 8–16 Uhr, teils Abendtermine. Immer zuerst Termin online buchen!' },
      { label: '💡 Tipp', text: 'Wer sich nicht rechtzeitig anmeldet, riskiert ein Bußgeld bis 1.000€. Nach Anmeldung bekommst du die Meldebestätigung sofort.' },
    ],
    links: [
      { label: '🔗 Berlin – Bürgeramt', url: 'https://service.berlin.de/dienstleistung/120686/' },
      { label: '🔗 München – Bürgerbüro', url: 'https://www.muenchen.de/rathaus/Stadtverwaltung/Kreisverwaltungsreferat/Buergerbuero.html' },
      { label: '🔗 Allgemein: Service-BW', url: 'https://www.service-bw.de' },
    ],
    phone: null,
  },
  {
    id: 'arbeitsagentur',
    icon: '💼',
    color: '#10d9a0',
    name: 'Agentur für Arbeit',
    role: 'ALG I, Jobsuche, Berufsberatung',
    badge: 'Behörde',
    badgeColor: '#10d9a0',
    summary: 'Zuständig für Arbeitslosengeld I (ALG I) und Jobvermittlung. Sofort am ersten Tag ohne Job melden!',
    details: [
      { label: '📞 Hotline (kostenlos)', text: '0800 4 5555 00 – Mo–Fr 8–18 Uhr' },
      { label: '⚠️ Wichtig', text: 'Arbeitssuchend melden: sofort wenn du von der Kündigung weißt (spätestens 3 Tage danach) – sonst droht Sperrzeit!' },
      { label: '💡 Online-Services', text: 'Jobbörse, Bewerbungsunterlagen-Check, Weiterbildungsförderung (§82 SGB III), Bildungsgutschein möglich' },
    ],
    links: [
      { label: '🔗 arbeitsagentur.de', url: 'https://www.arbeitsagentur.de' },
      { label: '🔗 Jobbörse', url: 'https://www.arbeitsagentur.de/jobsuche' },
      { label: '🔗 Arbeitssuchend melden (online)', url: 'https://www.arbeitsagentur.de/arbeitslos-arbeitsuchend-melden' },
    ],
    phone: 'tel:080045555500',
    phoneLabel: '0800 4 5555 00',
  },
  {
    id: 'finanzamt',
    icon: '📊',
    color: '#f59e0b',
    name: 'Finanzamt / ELSTER',
    role: 'Steuern, Steuererklärung, Steuer-ID',
    badge: 'Behörde',
    badgeColor: '#f59e0b',
    summary: 'Steuererklärung online über ELSTER einreichen – kostenlos, sicher, und du bekommst im Schnitt 1.000€ zurück!',
    details: [
      { label: '📋 Deine Steuer-ID', text: 'Steuer-Identifikationsnummer (11-stellig) findest du auf deinem letzten Steuerbescheid oder kannst sie anfordern.' },
      { label: '📅 Frist', text: 'Steuererklärung: bis 31. Juli des Folgejahres. Mit Steuerberater bis 28. Februar übernächstes Jahr.' },
      { label: '💡 ELSTER-Tipp', text: 'Registrierung dauert 1–2 Wochen (Brief per Post). Danach alles digital. Mit Ausweis-App geht es sofort.' },
    ],
    links: [
      { label: '🔗 ELSTER – Steuererklärung online', url: 'https://www.elster.de' },
      { label: '🔗 Finanzamt finden (Lokalisierung)', url: 'https://www.finanzamt.de' },
      { label: '🔗 Steuer-ID anfordern (BZSt)', url: 'https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/steuerlicheidentidentifikationsnummer_node.html' },
      { label: '🔗 Taxfix – einfache Steuererklärung', url: 'https://taxfix.de' },
    ],
    phone: null,
  },
  {
    id: 'mieterbund',
    icon: '🏠',
    color: '#8b5cf6',
    name: 'Mieterschutzverein / Mieterbund',
    role: 'Mietrecht, Vertragsberatung, Schlichtung',
    badge: 'Beratung',
    badgeColor: '#8b5cf6',
    summary: 'Bei Mietproblemen die wichtigste Adresse. Membership ca. 8–15€/Monat – dafür kostenlose Rechtsberatung zu jedem Mietstreit.',
    details: [
      { label: '🛡️ Wann hinwenden?', text: 'Betriebskostenabrechnung prüfen, Mieterhöhung anfechten, Kündigung durch Vermieter, Schimmel-Mängel, Kaution einbehalten' },
      { label: '💰 Kosten', text: 'Mitgliedschaft ca. 80–150€/Jahr. Erstberatung bei manchen Vereinen auch für Nichtmitglieder.' },
      { label: '📋 Lokalen Verein finden', text: 'Über mieterbund.de deinen nächsten lokalen Mieterverein finden.' },
    ],
    links: [
      { label: '🔗 Mieterbund – Verein finden', url: 'https://www.mieterbund.de' },
      { label: '🔗 Berliner Mieterverein', url: 'https://www.berliner-mieterverein.de' },
      { label: '🔗 Nebenkostencheck', url: 'https://www.mieterbund.de/mietrecht/betriebskosten/' },
    ],
    phone: null,
  },
  {
    id: 'verbraucherzentrale',
    icon: '⚖️',
    color: '#06b6d4',
    name: 'Verbraucherzentrale',
    role: 'Verbraucherrechte, Abo-Fallen, Vertragsrecht',
    badge: 'Beratung',
    badgeColor: '#06b6d4',
    summary: 'Staatlich geförderte Verbraucherberatung. Erste Anlaufstelle bei Abzocke, unklaren Verträgen und Datenschutz.',
    details: [
      { label: '🎯 Themen', text: 'Abo-Fallen, Finanzprodukte, Digitales (Daten, Datenschutz), Energie, Gesundheit, Reise, Reklamation' },
      { label: '💰 Kosten', text: 'Online-Infos kostenlos. Persönliche Beratung ab ca. 5–10€. Manche Beratungen kostenlos (z.B. Energieberatung).' },
      { label: '💡 Tipp', text: 'Abmahn-Vorlagen für Kündigung von Abos und Musterklage-Formulare kostenlos abrufbar!' },
    ],
    links: [
      { label: '🔗 verbraucherzentrale.de', url: 'https://www.verbraucherzentrale.de' },
      { label: '🔗 Abo kündigen – Musterbrief', url: 'https://www.verbraucherzentrale.de/wissensdatenbank' },
      { label: '🔗 Energieberatung (kostenlos)', url: 'https://www.verbraucherzentrale-energieberatung.de' },
      { label: '🔗 Marktwächter Finanzen', url: 'https://www.verbraucherzentrale.de/marktwaechter-finanzen' },
    ],
    phone: null,
  },
  {
    id: 'kassenarzt',
    icon: '🩺',
    color: '#f43f5e',
    name: 'Kassenärztlicher Bereitschaftsdienst',
    role: 'Arzt abends, nachts & Wochenende',
    badge: 'Gesundheit',
    badgeColor: '#f43f5e',
    summary: 'Kein Notfall, aber du brauchst sofort einen Arzt? 116 117 anrufen – kostenlos, 24/7, aus ganz Deutschland.',
    details: [
      { label: '📞 Rufnummer', text: '116 117 – kostenlos, 24 Stunden täglich, 7 Tage die Woche' },
      { label: '🔍 Wann anrufen?', text: 'Nicht lebensbedrohlich, aber dringend: starke Schmerzen, Fieber über 39°C, akute Erkrankung außerhalb Sprechzeiten' },
      { label: '🆚 Abgrenzung zu 112', text: '112 = echter Notfall (Bewusstlosigkeit, Herzinfarkt, schwere Verletzung). 116 117 = dringend aber nicht lebensbedrohlich' },
    ],
    links: [
      { label: '🔗 Bereitschaftsdienst-Finder', url: 'https://www.116117.de' },
      { label: '🔗 Online-Terminbuchung', url: 'https://www.116117.de/online-service' },
    ],
    phone: 'tel:116117',
    phoneLabel: '116 117 anrufen',
  },
  {
    id: 'notruf',
    icon: '🚨',
    color: '#ef4444',
    name: 'Notruf – Rettung & Feuerwehr',
    role: 'Lebensbedrohliche Notfälle',
    badge: '🔴 Notfall',
    badgeColor: '#ef4444',
    summary: '112 ist die europäische Notrufnummer – kostenlos aus jedem Handy, auch ohne SIM-Karte und ohne Empfang (wenn ein anderes Netz verfügbar ist).',
    details: [
      { label: '📞 Notrufnummer', text: '112 – Rettungsdienst & Feuerwehr | 110 – Polizei' },
      { label: '🗣️ Was du sagst', text: 'WO ist der Notfall? WAS ist passiert? WIE viele Verletzte? WARTEN auf Rückfragen – NICHT auflegen!' },
      { label: '🌍 Im Ausland', text: '112 funktioniert in der gesamten EU kostenlos. In den USA: 911. In Österreich: 144 (Rettung), 133 (Polizei), 122 (Feuerwehr).' },
    ],
    links: [
      { label: '🔗 Was tun im Notfall? (DRK)', url: 'https://www.drk.de/hilfe-in-deutschland/erste-hilfe/notsituationen/' },
      { label: '🔗 Erste Hilfe Grundlagen', url: 'https://www.ersthelfer.tv' },
    ],
    phone: 'tel:112',
    phoneLabel: '112 Notruf',
  },
  {
    id: 'polizei',
    icon: '👮',
    color: '#6366f1',
    name: 'Polizei',
    role: 'Anzeigen erstatten, Opferberatung',
    badge: 'Behörde',
    badgeColor: '#6366f1',
    summary: 'Nicht nur für Notfälle! Anzeigen kannst du auch online oder schriftlich erstatten. Weißer Ring hilft Opfern kostenlos.',
    details: [
      { label: '📞 Nummern', text: '110 = Polizei-Notruf | Online-Wache für nicht-dringende Anzeigen: länderspezifisch' },
      { label: '📋 Anzeige erstatten', text: 'Online (je nach Bundesland), persönlich im nächsten Revier oder schriftlich. Ausweis mitbringen.' },
      { label: '🤝 Opferhilfe', text: 'Weißer Ring e.V. bietet kostenlose Opferhilfe und -beratung bei allen Straftaten.' },
    ],
    links: [
      { label: '🔗 Online-Wache Bayern', url: 'https://www.onlinewache.polizei.de' },
      { label: '🔗 Weißer Ring – Opferhilfe', url: 'https://www.weisser-ring.de' },
      { label: '🔗 Opfertelefon Weißer Ring', url: 'tel:116006' },
    ],
    phone: 'tel:110',
    phoneLabel: '110 Polizei-Notruf',
  },
  {
    id: 'seelsorge',
    icon: '💙',
    color: '#3b82f6',
    name: 'Telefonseelsorge',
    role: 'Psychische Krisen, Sorgen, 24/7 kostenlos',
    badge: 'Gesundheit',
    badgeColor: '#3b82f6',
    summary: 'Kostenlos, anonym, 24/7 erreichbar. Für alle die reden müssen – egal ob große Krise oder nur ein schlechter Tag.',
    details: [
      { label: '📞 Nummern (kostenlos)', text: '0800 111 0 111 oder 0800 111 0 222 – rund um die Uhr, anonym, keine Kosten' },
      { label: '💬 Chat-Beratung', text: 'Für alle die nicht sprechen möchten: Online-Chat auf onlineberatung.telefonseelsorge.de' },
      { label: '🆘 Bei Suizidgedanken', text: 'Bitte sofort anrufen. Du bist nicht allein. Alle Gespräche sind vertraulich.' },
    ],
    links: [
      { label: '🔗 telefonseelsorge.de', url: 'https://www.telefonseelsorge.de' },
      { label: '🔗 Online-Chat', url: 'https://online.telefonseelsorge.de' },
      { label: '🔗 Krisentelefon für Jugendliche (krisenchat)', url: 'https://krisenchat.de' },
      { label: '🔗 Dargebotene Hand (Österreich)', url: 'https://www.telefonseelsorge.de' },
    ],
    phone: 'tel:0800111011',
    phoneLabel: '0800 111 0 111',
  },
  {
    id: 'schufa',
    icon: '💳',
    color: '#10d9a0',
    name: 'SCHUFA – Selbstauskunft',
    role: 'Kostenloser Bonitäts-Check, Fehler bereinigen',
    badge: 'Finanzen',
    badgeColor: '#10d9a0',
    summary: 'Einmal im Jahr kostenlose Datenkopie anfordern – die teure "Bonitätsauskunft" brauchst du NICHT. So geht es richtig!',
    details: [
      { label: '📋 So geht es kostenlos', text: 'meineSCHUFA.de → "Datenkopie nach Art. 15 DSGVO" wählen (NICHT der kostenpflichtige BonitätsAuskunft!) → per Post zugestellt' },
      { label: '🔍 Was prüfen?', text: 'Alle eingetragenen Kredite, Mobilfunkverträge, Bankkonten. Fehler gefunden? Widerspruch einlegen – kostenlos!' },
      { label: '💡 Score verbessern', text: 'Konten nicht unnötig eröffnen, Kreditrahmen nicht ausschöpfen, Rechnungen pünktlich zahlen, alte eingetragene Zahlungsausfälle löschen lassen (nach 3 Jahren)' },
    ],
    links: [
      { label: '🔗 meineSCHUFA.de (Datenkopie)', url: 'https://www.meineschufa.de/de/datenkopie' },
      { label: '🔗 SCHUFA Fehler melden', url: 'https://www.meineschufa.de/de/datenkopie' },
      { label: '🔗 Alternative: Boniversum', url: 'https://www.boniversum.de/verbraucherauskunft' },
    ],
    phone: null,
  },
  {
    id: 'bafoeg',
    icon: '🎓',
    color: '#f97316',
    name: 'BAföG-Amt / Studentenwerk',
    role: 'Studienfinanzierung, Wohngeld für Studierende',
    badge: 'Studium',
    badgeColor: '#f97316',
    summary: 'BAföG ist kein Geschenk – aber 50% davon musst du nie zurückzahlen! Und viele bekommen es die es nie beantragen.',
    details: [
      { label: '💰 Was bekomme ich?', text: 'Bis zu 992€/Monat (Stand 2026). Hälfte = Zuschuss, Hälfte = zinsloses Darlehen. Rückzahlung max. 10.010€.' },
      { label: '📋 Antragstellung', text: 'Beim BAföG-Amt des Studentenwerks deiner Hochschule – möglichst früh, da rückwirkend max. 1 Monat!' },
      { label: '💡 Wer hat Anspruch?', text: 'Abhängig von Elterneinkommen, deinem Einkommen, Fachrichtung und Studienfortschritt. Auch wer keinen Anspruch vermutet: einfach beantragen!' },
    ],
    links: [
      { label: '🔗 BAföG online beantragen', url: 'https://www.bafoeg-digital.de' },
      { label: '🔗 Studentenwerk finden', url: 'https://www.studentenwerke.de' },
      { label: '🔗 BAföG-Rechner', url: 'https://www.bafoeg-rechner.de' },
    ],
    phone: null,
  },
  {
    id: 'schuldnerberatung',
    icon: '🛟',
    color: '#a78bfa',
    name: 'Schuldnerberatung',
    role: 'Schulden, Insolvenz, Inkasso, Mahnbescheide',
    badge: 'Finanzen',
    badgeColor: '#a78bfa',
    summary: 'Schulden ignorieren macht es schlimmer. Kostenlose Schuldnerberatung hilft bei Zahlungsplan, Inkasso und Insolvenzverfahren.',
    details: [
      { label: '🆓 Kostenlose Anlaufstellen', text: 'Caritas, AWO, Diakonie bieten kostenlose Schuldnerberatung an. Alle sind zur Verschwiegenheit verpflichtet.' },
      { label: '⚠️ Inkasso bekommen?', text: 'NICHT ignorieren! Inhalt prüfen (Verjährung möglich?), Forderung schriftlich bestreiten wenn unklar, nie ohne Prüfung zahlen.' },
      { label: '📋 Privatinsolvenz', text: 'Letzter Ausweg – nach 3 Jahren schuldenfrei. Ermöglicht Neustart. Zuvor immer Beratung suchen!' },
    ],
    links: [
      { label: '🔗 Schuldnerberatung finden', url: 'https://www.schuldnerberatung.de' },
      { label: '🔗 Caritas Schuldenberatung', url: 'https://www.caritas.de/hilfeundberatung/onlineberatung/schulden' },
      { label: '🔗 BSB – Kostenloses Insolvenzinfo', url: 'https://www.bsb-ev.de' },
      { label: '🔗 Inkasso-Abwehr (Verbraucherzentrale)', url: 'https://www.verbraucherzentrale.de/themen/geld-versicherungen/schulden-inkasso' },
    ],
    phone: null,
  },
  {
    id: 'jobcenter',
    icon: '📋',
    color: '#34d399',
    name: 'Jobcenter / Bürgergeld',
    role: 'ALG II / Bürgergeld, Wohngeld, Sozialhilfe',
    badge: 'Behörde',
    badgeColor: '#34d399',
    summary: 'Nach dem ALG I oder ohne Rentenanspruch: Bürgergeld (früher Hartz IV). Auch Wohngeld und Kindersofortzuschlag hier beantragen.',
    details: [
      { label: '💰 Was gibt es?', text: 'Bürgergeld (Stand 2026): 563€/Monat (Alleinstehend) + Kosten für Unterkunft (Miete) + Heizkosten. Kinder: extra Leistungen.' },
      { label: '📋 Wer ist zuständig?', text: 'Das Jobcenter deiner Gemeinde. Zuständig wenn du erwerbsfähig bist und hilfebedürftig. Sozialhilfe: Sozialamt.' },
      { label: '🏡 Wohngeld', text: 'Für Geringverdiener die NICHT im Bürgergeld-Bezug sind! Kann mehrere hundert Euro monatlich betragen.' },
    ],
    links: [
      { label: '🔗 Bürgergeld beantragen', url: 'https://www.arbeitsagentur.de/soziale-sicherung/buergergeld' },
      { label: '🔗 Wohngeld beantragen', url: 'https://www.wohngeld.org' },
      { label: '🔗 Bürgergeld-Rechner', url: 'https://www.buergergeld-berechnen.de' },
      { label: '🔗 Kinderzuschlag beantragen', url: 'https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag' },
    ],
    phone: null,
  },
  {
    id: 'rentenversicherung',
    icon: '🌱',
    color: '#4ade80',
    name: 'Deutsche Rentenversicherung',
    role: 'Rentenpunkte, Rentenauskunft, Reha',
    badge: 'Rente',
    badgeColor: '#4ade80',
    summary: 'Dein Rentenkonto – wieviel hast du schon angespart? Kostenlose Rentenauskunft und Beratung bei der DRV.',
    details: [
      { label: '📊 Renteninformation', text: 'Ab 27 Jahren bekommst du jährlich eine Renteninformation per Post. Online jederzeit unter drv.de abrufbar.' },
      { label: '🩺 Rehabilitation', text: 'DRV finanziert Reha-Maßnahmen bevor du berufsunfähig wirst. Formulare: G100 (Antrag auf Leistungen zur Teilhabe).' },
      { label: '📞 Beratung', text: 'Kostenlose Rentenberatung: 0800 1000 4800 – Mo–Do 8–18, Fr 8–15 Uhr' },
    ],
    links: [
      { label: '🔗 drv.de – Rentenauskunft', url: 'https://www.deutsche-rentenversicherung.de' },
      { label: '🔗 Rentenrechner', url: 'https://www.deutsche-rentenversicherung.de/DRV/DE/Rente/Allgemeine-Informationen/Rentenrechner/rentenrechner_node.html' },
      { label: '🔗 Online-Rentenkonto einsehen', url: 'https://www.deutsche-rentenversicherung.de/DRV/DE/Beratungsservice/Online-Dienste/Rentenkonto/rentenkonto_node.html' },
    ],
    phone: 'tel:080010004800',
    phoneLabel: '0800 1000 4800',
  },
  {
    id: 'krankenversicherung',
    icon: '🏥',
    color: '#fb7185',
    name: 'Gesetzliche Krankenversicherung',
    role: 'Krankenkasse wählen, Leistungen, Zuzahlung',
    badge: 'Gesundheit',
    badgeColor: '#fb7185',
    summary: 'Krankenversicherung ist Pflicht. Als Angestellter wählst du aus hunderten GKV-Kassen – die Leistungen sind oft ähnlich, aber Zusatzbeitrag und Extraleistungen unterscheiden sich.',
    details: [
      { label: '💰 Was kostet GKV?', text: 'Ca. 14,6% + Zusatzbeitrag (0,5–2%) des Bruttogehalts. Hälfte zahlt der Arbeitgeber. Student: ca. 110–120€/Monat.' },
      { label: '🔄 Kasse wechseln', text: 'Jederzeit mit 2 Monaten Kündigungsfrist möglich (Mindestbindung 12 Monate beachten). Vergleich lohnt sich!' },
      { label: '🎁 Extraleistungen', text: 'Manche Kassen erstatten: Brille, Impfungen, Naturheilkunde, Rückenschule, Auslandsreisekrankenschutz.' },
    ],
    links: [
      { label: '🔗 Krankenkassen vergleichen', url: 'https://www.krankenkasseninfo.de' },
      { label: '🔗 GKV-Spitzenverband', url: 'https://www.gkv-spitzenverband.de' },
      { label: '🔗 Kasse finden (Stiftung Warentest)', url: 'https://www.test.de/thema/krankenversicherung/' },
      { label: '🔗 Familienversicherung prüfen', url: 'https://www.krankenkassen.de/gesetzliche-krankenkassen/krankenversicherung-beitrag/familienversicherung/' },
    ],
    phone: null,
  },
  {
    id: 'rundfunk',
    icon: '📺',
    color: '#e879f9',
    name: 'Rundfunkbeitrag (GEZ)',
    role: '18,36€/Monat – Anmeldung & Befreiung',
    badge: 'Haushalt',
    badgeColor: '#e879f9',
    summary: 'Jeder Haushalt zahlt 18,36€/Monat. Bei BAföG, ALG II oder Schwerbehinderung: Befreiung möglich. Sofort nach Einzug anmelden!',
    details: [
      { label: '📋 Wer zahlt?', text: 'Jeder Haushalt einmal – auch WGs zahlen nur einmal! Bei mehreren Wohnungen: Befreiung für Zweitwohnung möglich.' },
      { label: '🆓 Wer ist befreit?', text: 'BAföG-Empfänger, ALG II / Bürgergeld, Grundsicherung, anerkannte Schwerbehinderung (Merkzeichen RF). Nachweis einreichen!' },
      { label: '💡 Tipp', text: 'Die Anmeldung läuft automatisch weiter – bei Umzug in neue Gemeinde Adresse ändern, nicht neu anmelden.' },
    ],
    links: [
      { label: '🔗 Anmelden (rundfunkbeitrag.de)', url: 'https://www.rundfunkbeitrag.de/buergerinnen_und_buerger/anmelden_abmelden_aendern/' },
      { label: '🔗 Befreiung beantragen', url: 'https://www.rundfunkbeitrag.de/buergerinnen_und_buerger/formulare/befreiung_ermaessigung/' },
    ],
    phone: null,
  },
];

let CHECKLIST_GROUPS = [
  {
    group: '🏠 Eigene Wohnung',
    items: [
      'Mietvertrag gelesen & verstanden',
      'Wohnungsübergabeprotokoll erstellt (mit Fotos)',
      'Kaution überwiesen & Quittung erhalten',
      'Beim Einwohnermeldeamt angemeldet',
      'Post-Nachsendeauftrag gestellt',
      'Adressänderungen gemeldet (Bank, Krankenkasse, Arbeitgeber)',
      'Strom & Gas selbst angemeldet / Anbieter gewechselt',
      'GEZ-Beitrag angemeldet (rundfunkbeitrag.de)',
    ]
  },
  {
    group: '🛡️ Versicherungen',
    items: [
      'Private Haftpflichtversicherung abgeschlossen',
      'Krankenversicherung läuft (GKV oder PKV)',
      'Hausratversicherung abgeschlossen',
      'Berufsunfähigkeitsversicherung recherchiert',
      'Alle Versicherungen überblickt & unnötige gekündigt',
    ]
  },
  {
    group: '💰 Finanzen',
    items: [
      'Girokonto eröffnet (kostenlos: DKB, ING, N26)',
      'Haushaltsbuch / Budget eingerichtet',
      'Notfallpolster aufgebaut (mind. 1 Monatsausgaben)',
      'ETF-Sparplan eingerichtet oder recherchiert',
      'Schufa-Selbstauskunft eingeholt',
      'Alle Abos & laufende Zahlungen überblickt',
    ]
  },
  {
    group: '📊 Steuern',
    items: [
      'ELSTER-Konto angelegt (elster.de)',
      'Steuer-ID notiert (Brief vom Finanzamt)',
      'Lohnsteuerbescheinigung vom Arbeitgeber erhalten',
      'Erste Steuererklärung gemacht',
      'Belege für Steuern das ganze Jahr sammeln',
    ]
  },
  {
    group: '🏥 Gesundheit',
    items: [
      'Hausarzt gefunden & angemeldet',
      'Impfpass aktualisiert (Tetanus alle 10 Jahre!)',
      'Zahnvorsorge: 2x jährlich zum Zahnarzt',
      'Vorsorgeuntersuchungen kennen (Check-up 35, Hautkrebsscreening)',
      'Organspendeausweis Meinung gebildet',
    ]
  },
  {
    group: '⚖️ Dokumente & Recht',
    items: [
      'Personalausweis gültig (mind. auf Auslandsreisen)',
      'Wichtige Dokumente gesichert (auch digital)',
      'Vollmacht für Eltern/Vertraute bei Notfall (Vorsorgevollmacht)',
      'Testament – zumindest mal darüber nachgedacht',
      'Arbeitsvertrag gelesen & verstanden',
    ]
  }
];

let GLOSSARY = [
  { term: 'Bruttolohn', def: 'Dein Gehalt VOR allen Abzügen (Steuern, Sozialversicherung). Das ist die Zahl im Vertrag, aber nie das was du siehst.' },
  { term: 'Nettolohn', def: 'Was du tatsächlich ausgezahlt bekommst. Nach Abzug von Lohnsteuer, Kranken-, Pflege-, Renten- und Arbeitslosenversicherung.' },
  { term: 'Kaltmiete', def: 'Grundmiete ohne Nebenkosten (Heizung, Wasser, Müll). Die Kaltmiete + Nebenkosten = Warmmiete.' },
  { term: 'Betriebskosten / Nebenkosten', def: 'Zusatzkosten zur Miete: Heizung, Wasser, Hausmeister, Müll, Gebäudeversicherung etc. Jährliche Abrechnung mit Nachzahlung oder Guthaben.' },
  { term: 'Kaution', def: 'Sicherheitsleistung an den Vermieter, max. 3 Kaltmieten. Muss auf separatem Konto liegen und wird nach Auszug zurückgezahlt (abzgl. Schäden).' },
  { term: 'Schufa', def: 'Auskunftei die deine Kreditwürdigkeit bewertet. Banken und Vermieter fragen oft an. Je höher der Score, desto besser. Kostenlose Selbstauskunft 1x/Jahr.' },
  { term: 'Widerrufsrecht', def: '14 Tage Zeit um online oder Haustür-Käufe ohne Begründung rückgängig zu machen. Beginnt erst wenn Widerrufserklärung ausgehändigt wurde!' },
  { term: 'Gewährleistung', def: 'Gesetzliche 2-Jahres-Garantie des Händlers auf Mängel bei Neuwaren. Nicht mit freiwilliger Herstellergarantie verwechseln!' },
  { term: 'Steuer-ID', def: '11-stellige lebenslange Nummer die jeder Deutsche bei Geburt erhält. Wird für Steuererklärungen, BAföG, Rente benötigt. Im Brief vom Finanzamt.' },
  { term: 'GKV', def: 'Gesetzliche Krankenversicherung. Pflichtmitgliedschaft für Angestellte. Beitrag ca. 14-15% des Bruttos (Hälfte zahlt Arbeitgeber).' },
  { term: 'PKV', def: 'Private Krankenversicherung. Nur für Selbstständige, Beamte und Gutverdiener (>69.300€). Günstiger jung, sehr teuer im Alter.' },
  { term: 'Lohnsteuer', def: 'Einkommensteuer für Angestellte, wird direkt vom Gehalt abgezogen und vom Arbeitgeber abgeführt. In der Steuererklärung kann man zu viel gezahltes zurückfordern.' },
  { term: 'Werbungskosten', def: 'Beruflich bedingte Aufwendungen die du von der Steuer absetzen kannst: Fahrtkosten, Fortbildungen, Arbeitsmittel, Homeoffice-Pauschale.' },
  { term: 'Sonderausgaben', def: 'Bestimmte private Ausgaben die steuermindernd wirken: Krankenversicherungsbeiträge, Altersvorsorge, Spenden, Kirchensteuer.' },
  { term: 'ETF', def: 'Exchange Traded Fund – Fonds der einen Index (z.B. MSCI World) nachbildet und die 1.600 größten Weltunternehmen enthält. Kosteneffizient & breit gestreut.' },
  { term: 'Riester-Rente', def: 'Staatlich gefördertes privates Rentenprodukt. Jährliche Zulage von 175€ (+Kinderzulage). Komplex und unflexibel – für manche sinnvoll, für andere nicht.' },
  { term: 'Berufsunfähigkeitsversicherung (BU)', def: 'Zahlt monatliche Rente wenn du deinen Beruf dauerhaft nicht mehr ausüben kannst. Eine der wichtigsten Versicherungen überhaupt!' },
  { term: 'Einwurfeinschreiben', def: 'Versandart bei Kündigung oder wichtigen Briefen. Beweist dass du den Brief eingeworfen hast, nicht dass er angekommen ist. Kostengünstiger als z.B. Einschreiben mit Rückschein.' },
  { term: 'Mietminderung', def: 'Recht des Mieters, die Miete bei erheblichen Mängeln anteilig zu kürzen. Vorher: Mangel schriftlich anzeigen, Frist setzen!' },
  { term: 'Kleinunternehmerregelung', def: 'Selbstständige mit unter 25.000€ Jahresumsatz müssen keine Umsatzsteuer abführen (Stand 2026).' },
  { term: 'ALG I', def: 'Arbeitslosengeld I – 60/67% des letzten Nettolohns, bis zu 24 Monate. Anspruch nach mind. 12 Monaten Beitragszahlung. Sofort am ersten Tag melden!' },
  { term: 'Bürgergeld / ALG II', def: 'Grundsicherung nach ALG I oder ohne Anspruch. Setzt Bedürftigkeit (Vermögen, Einkommen) voraus. Beim Jobcenter beantragen.' },
  { term: 'DSGVO', def: 'Datenschutz-Grundverordnung – EU-Gesetz das deine Datenschutzrechte regelt. Gibt dir Recht auf Auskunft, Löschung und Übertragbarkeit deiner Daten.' },
  { term: 'Prozesskostenhilfe', def: 'Staatliche Unterstützung für Gerichtskosten wenn du dir einen Anwalt nicht leisten kannst. Voraussetzung: niedriges Einkommen, Erfolgschancen vorhanden.' },
  { term: 'Arbieternehmer-Pauschbetrag', def: 'Automatisch angesetzter Betrag für Werbungskosten: 1.230€/Jahr (2023). Erst wenn du mehr an Werbungskosten nachweisen kannst, bringt die Steuererklärung mehr.' },
  { term: 'Rechtsbehelfsbelehrung', def: 'Steht oft am Ende von Bescheiden. Erklärt dir, wie und bis wann du dich beschweren kannst (meist 4 Wochen Frist).' },
  { term: 'Versagung', def: 'Behördisch für "Ablehnung". Dein Antrag wurde versagt = abgeschmettert.' },
  { term: 'Mitwirkungspflicht', def: 'Du musst beim Antrag aktiv helfen. Wenn du angeforderte Dokumente nicht schickst, hast du deine Pflicht verletzt und bekommst kein Geld.' },
  { term: 'Glaubhaftmachung', def: 'Du musst etwas nicht 100% lückenlos beweisen, aber sehr wahrscheinlich machen (z.B. eine eidesstattliche Versicherung abgeben).' },
  { term: 'Fristwahrung', def: 'Eine Frist einhalten. Der Brief muss VOR Ablauf des Datums DA sein, nicht erst losgeschickt werden (Poststempel zählt oft nicht!).' },
  { term: 'Vorläufiger Bescheid', def: 'Gut: Du kriegst erstmal Geld. Schlecht: Das Amt rechnet am Ende des Jahres nochmal genau nach und will evtl. Geld zurück.' },
  { term: 'Niederschrift', def: 'Das Protokoll zu einer Besprechung, in der genau steht, was wer wann gesagt hat.' }
];

let LEGAL_CONTENT = {
  impressum: `<h3>Impressum</h3><p>Angaben gemäß § 5 TMG:<br>Dein Name<br>Deine Adresse<br>Email: hallo@deinedomain.de</p>`,
  datenschutz: `<h3>Datenschutz</h3><p>Diese Datenschutzerklärung klärt dich über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten innerhalb unseres Onlineangebotes auf.</p>`
};

function loadAdminContent() {
  const saved = localStorage.getItem('adultguide_custom_data');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (data.TOPICS) {
         TOPICS.forEach(base => { if (!data.TOPICS.find(t => t.id === base.id)) data.TOPICS.push(base); });
         TOPICS = data.TOPICS;
      }
      if (data.CONTACTS) {
         CONTACTS.forEach(base => { if (!data.CONTACTS.find(t => t.id === base.id)) data.CONTACTS.push(base); });
         CONTACTS = data.CONTACTS;
      }
      if (data.CHECKLIST_GROUPS) CHECKLIST_GROUPS = data.CHECKLIST_GROUPS;
      if (data.GLOSSARY) {
         GLOSSARY.forEach(base => { if (!data.GLOSSARY.find(t => t.term === base.term)) data.GLOSSARY.push(base); });
         GLOSSARY = data.GLOSSARY;
      }
      if (data.LEGAL_CONTENT) LEGAL_CONTENT = Object.assign(LEGAL_CONTENT, data.LEGAL_CONTENT);
      
      // Update local storage implicitly mapped above back to browser for safety
      localStorage.setItem('adultguide_custom_data', JSON.stringify({TOPICS, CONTACTS, CHECKLIST_GROUPS, GLOSSARY, LEGAL_CONTENT}));
    } catch(e) { console.error('Error parsing admin data', e); }
  }
}
loadAdminContent();


// ─────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────
let currentModule = null;
let currentSectionIdx = 0;
let checklistState = {};

// ─────────────────────────────────────────────────────
// PREMUIM & PAYWALL
// ─────────────────────────────────────────────────────
const STRIPE_CHECKOUT_URL = 'https://buy.stripe.com/14A5kx9Nl3gt83f7y94Ni00'; // HIER DEINEN STRIPE-LINK EINFÜGEN!
let isPremium = localStorage.getItem('adultguide_premium') === 'true';

// Auf Redirect-Parameter prüfen (?premium=true)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('premium') === 'true') {
  localStorage.setItem('adultguide_premium', 'true');
  isPremium = true;
  // Säubere die URL
  window.history.replaceState({}, document.title, window.location.pathname);
}

// Global Paywall Modal Template
function getPaywallHTML(message = 'Dieses Feature ist exklusiv für Vollversions-Nutzer.') {
  return `
    <div class="paywall-overlay">
      <div class="paywall-icon">🔒</div>
      <h3>Real Life Komplett freischalten</h3>
      <p style="text-align:center; color:var(--text-secondary); line-height:1.5; margin-bottom:20px;">${message}<br><br>Alle 15 Themen freischalten, Notfallnummern nutzen und Checklisten sichern. Einmalig 4,99€ – kein Abo.</p>
      <ul class="paywall-features">
        <li>✅ Alle 15 Themen & 80+ Praxis-Tipps komplett lesbar</li>
        <li>✅ Direkte Anlaufstellen & Notfall-Telefonnummern</li>
        <li>✅ Interaktive Umzugs- & Finanzcheckliste</li>
        <li>✅ Kein Abo, kein Account-Zwang</li>
      </ul>
      <button class="btn-primary" style="width: 100%; margin-bottom: 20px" onclick="window.open(STRIPE_CHECKOUT_URL, '_blank')">Jetzt für 4,99€ freischalten</button>
      <div class="paywall-code-area">
        <p style="font-size: 0.8rem; color: #888; text-align: center; margin-bottom: 10px;">Hast du bereits einen Code per E-Mail erhalten?</p>
        <div style="display: flex; gap: 10px;">
          <input type="text" id="license-input" placeholder="ADULT-XXXX-XXXX" style="text-transform: uppercase;" />
          <button class="btn-secondary" onclick="verifyCode()" id="verify-btn">Einlösen</button>
        </div>
        <p id="license-msg" style="color: #ef4444; font-size: 0.8rem; margin-top: 10px; text-align: center;"></p>
      </div>
    </div>
  `;
}

async function verifyCode() {
  const codeInput = document.getElementById('license-input').value.toUpperCase().trim();
  const msgEl = document.getElementById('license-msg');
  const btn = document.getElementById('verify-btn');
  
  if (!codeInput) {
    msgEl.textContent = 'Bitte einen Code eingeben.';
    msgEl.style.color = '#ef4444';
    return;
  }
  
  if (codeInput === 'DEMO-FREE') {
    // Hardcoded demo fallback
    localStorage.setItem('adultguide_premium', 'true');
    isPremium = true;
    location.reload();
    return;
  }

  btn.textContent = 'Lädt...';
  try {
    const res = await fetch('/api/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: codeInput })
    });
    
    const data = await res.json();
    if (res.ok && data.success) {
      localStorage.setItem('adultguide_premium', 'true');
      isPremium = true;
      msgEl.style.color = '#10d9a0';
      msgEl.textContent = 'Erfolgreich freigeschaltet! Wird geladen...';
      setTimeout(() => location.reload(), 1000);
    } else {
      msgEl.style.color = '#ef4444';
      msgEl.textContent = data.error || 'Ungültiger Code.';
      btn.textContent = 'Einlösen';
    }
  } catch (err) {
    msgEl.style.color = '#ef4444';
    msgEl.textContent = 'Netzwerkfehler. Bitte später versuchen.';
    btn.textContent = 'Einlösen';
  }
}

function showGlobalPaywall(msg) {
  // Simple modal popup using an existing structure or a newly created div.
  let pModal = document.getElementById('global-paywall');
  if (!pModal) {
    pModal = document.createElement('div');
    pModal.id = 'global-paywall';
    pModal.className = 'module-overlay';
    pModal.innerHTML = `
      <div class="module-panel" style="max-height: 85vh; margin-top: 5vh;">
        <button class="module-close" onclick="document.getElementById('global-paywall').classList.add('hidden')">✕</button>
        <div style="padding: 20px;">
          ${getPaywallHTML(msg)}
        </div>
      </div>
    `;
    document.body.appendChild(pModal);
  } else {
    pModal.querySelector('.paywall-overlay').parentElement.innerHTML = getPaywallHTML(msg);
    pModal.classList.remove('hidden');
  }
}

function initPaywallCheckout() {
  // Option 1: Direct link (better for landing page conversion)
  window.open(STRIPE_CHECKOUT_URL, '_blank');
  
  // Option 2: Show the modal (if you'd rather explain features again first)
  // showGlobalPaywall('Sichere dir dauerhaften Zugriff auf alle Experten-Inhalte und Funktionen.');
}

function updatePricingSection() {
  const pricingSection = document.getElementById('premium');
  const premiumCard = document.getElementById('premium-card');
  if (!pricingSection) return;

  if (isPremium) {
    // Falls Nutzer schon Premium ist, zeigen wir einen "Aktiv" Status an
    // statt die Sektion komplett zu verstecken (damit du sie prüfen kannst)
    const actionArea = pricingSection.querySelector('.premium-action');
    if (actionArea) {
      actionArea.innerHTML = `
        <div class="price-tag">
          <span style="font-size: 3rem;">✅</span>
          <span class="price-note" style="color:#10d9a0">Vollversion Aktiv</span>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); text-align: center; margin-bottom: 20px;">Du hast bereits lebenslangen Zugriff auf alle Inhalte. Danke für deine Unterstützung!</p>
        <button class="btn-secondary" style="width: 100%; border-color:#10d9a0; color:#10d9a0; pointer-events:none;">Premium Mitglied</button>
      `;
    }
  }
}

// ─────────────────────────────────────────────────────
// LEGAL POPUP
// ─────────────────────────────────────────────────────
function showLegalPopup(type) {
  let lModal = document.getElementById('legal-modal');
  if (!lModal) {
    lModal = document.createElement('div');
    lModal.id = 'legal-modal';
    lModal.className = 'module-overlay';
    document.body.appendChild(lModal);
  }
  
  const content = type === 'impressum' ? LEGAL_CONTENT.impressum : LEGAL_CONTENT.datenschutz;
  
  lModal.innerHTML = `
    <div class="module-panel" style="max-height: 85vh; margin-top: 5vh;">
      <button class="module-close" onclick="document.getElementById('legal-modal').classList.add('hidden'); document.body.style.overflow=''">✕</button>
      <div class="content-block" style="padding: 30px;">
        ${content}
      </div>
    </div>
  `;
  lModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// ─────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initA11yTheming();
  loadChecklistState();
  renderTopics();
  renderContacts();
  renderChecklist();
  renderGlossary();
  initSearch();
  initScrollReveal();
  updatePricingSection();

  // A11y Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModule();
      document.getElementById('legal-modal')?.classList.add('hidden');
      document.getElementById('global-paywall')?.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  // Admin Shortcut: Ctrl + Shift + A
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      window.location.href = 'admin.html';
    }
  });
});

// ─────────────────────────────────────────────────────
// A11Y & THEMING LOGIC
// ─────────────────────────────────────────────────────
function initA11yTheming() {
  const html = document.documentElement;
  
  // 1. Load Theme preference
  const savedTheme = localStorage.getItem('adultguide_theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.setAttribute('data-theme', 'light');
  }

  const themeBtn = document.getElementById('theme-toggle');
  if(themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const nextTheme = current === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', nextTheme);
      localStorage.setItem('adultguide_theme', nextTheme);
    });
  }

  // 2. Load Text Scale preference
  const savedScale = localStorage.getItem('adultguide_textscale');
  if (savedScale === 'large') {
    html.setAttribute('data-text-size', 'large');
  }

  const scaleBtn = document.getElementById('a11y-text-toggle');
  if(scaleBtn) {
    scaleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-text-size');
      const nextScale = current === 'large' ? 'normal' : 'large';
      if (nextScale === 'large') {
        html.setAttribute('data-text-size', 'large');
        localStorage.setItem('adultguide_textscale', 'large');
      } else {
        html.removeAttribute('data-text-size');
        localStorage.setItem('adultguide_textscale', 'normal');
      }
    });
  }
}


// ─────────────────────────────────────────────────────
// TOPICS
// ─────────────────────────────────────────────────────
function renderTopics() {
  const grid = document.getElementById('topics-grid');
  grid.innerHTML = TOPICS.map(t => `
    <div class="topic-card" onclick="openModule('${t.id}')" id="card-${t.id}" role="button" tabindex="0" aria-label="${t.title}">
      <div class="topic-icon-wrap" style="background: ${t.gradient}">
        <span>${t.icon}</span>
      </div>
      <h3>${t.title}</h3>
      <p>${t.short}</p>
      <div class="topic-tags">${t.tags.map(tag => `<span class="tag" style="color:${t.color}">${tag}</span>`).join('')}</div>
      <span class="topic-arrow">→</span>
    </div>
  `).join('');

  // Keyboard support
  grid.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') card.click();
    });
  });
}

// ─────────────────────────────────────────────────────
// MODULE OVERLAY
// ─────────────────────────────────────────────────────
function openModule(id) {
  const topic = TOPICS.find(t => t.id === id);
  if (!topic) return;
  currentModule = topic;
  currentSectionIdx = 0;

  document.getElementById('mod-icon').innerHTML = topic.icon;
  document.getElementById('mod-icon').style.background = topic.gradient;
  document.getElementById('mod-kicker').textContent = 'Real Life';
  document.getElementById('mod-title').textContent = topic.title;

  renderModuleTabs(topic);
  renderModuleContent(topic, 0);

  document.getElementById('module-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModule() {
  document.getElementById('module-overlay').classList.add('hidden');
  document.body.style.overflow = '';
  currentModule = null;
}

function renderModuleTabs(topic) {
  const tabs = document.getElementById('mod-tabs');
  tabs.innerHTML = topic.sections.map((s, i) => `
    <button class="mod-tab${i === 0 ? ' active' : ''}" onclick="navigateToSection(${i})" id="tab-${i}">${s.title}</button>
  `).join('');
}

function renderModuleContent(topic, idx) {
  const section = topic.sections[idx];
  const body = document.getElementById('mod-body');
  
  if (!isPremium && idx > 0) {
    // User is NOT premium and trying to view slide > 0
    body.innerHTML = `
      <div style="position: relative; overflow: hidden; padding-bottom: 20px;">
        <div class="content-blurred" aria-hidden="true" style="filter: blur(5px); opacity: 0.3; pointer-events: none; user-select: none;">
          <div class="section-content">${section.content.substring(0, 500)}...</div>
        </div>
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(10,10,15,0) 0%, rgba(10,10,15,0.9) 30%, #0a0a0f 100%); z-index: 1;"></div>
        <div style="position: relative; z-index: 2; margin-top: -120px;">
          ${getPaywallHTML('Um weiterlesen zu können, benötigst du die Vollversion.')}
        </div>
      </div>
    `;
    
    // Update tabs visually to indicate partial access mapping
    document.querySelectorAll('.mod-tab').forEach((t, i) => {
      t.classList.toggle('active', i === idx);
      if (i > 0) {
        if (!t.querySelector('.lock-icon')) {
            t.innerHTML += ' <span class="lock-icon" style="opacity:0.6; font-size:0.8em;">🔒</span>';
        }
      }
    });

    body.scrollTop = 0;
    
    document.getElementById('mod-page-indicator').textContent = `${idx + 1} / ${topic.sections.length}`;
    document.getElementById('mod-prev').style.visibility = idx === 0 ? 'hidden' : 'visible';
    document.getElementById('mod-next').style.display = 'none'; // hide next
    
    // Progress
    const pct = ((idx + 1) / topic.sections.length) * 100;
    document.getElementById('mod-progress').style.width = pct + '%';
    
    currentSectionIdx = idx;
    return;
  }

  body.innerHTML = `<div class="content-block">${section.content}</div>`;
  body.scrollTop = 0;

  // Update tabs
  document.querySelectorAll('.mod-tab').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
    // remove lock icon if any inside the tab
    const l = t.querySelector('.lock-icon');
    if(l) l.remove();
  });

  // Update progress
  const pct = ((idx + 1) / topic.sections.length) * 100;
  document.getElementById('mod-progress').style.width = pct + '%';

  // Update navigation
  document.getElementById('mod-page-indicator').textContent = `${idx + 1} / ${topic.sections.length}`;
  document.getElementById('mod-prev').style.visibility = idx === 0 ? 'hidden' : 'visible';
  document.getElementById('mod-next').style.display = 'block';
  document.getElementById('mod-next').textContent = idx === topic.sections.length - 1 ? 'Fertig ✓' : 'Weiter →';

  currentSectionIdx = idx;
}

function navigateToSection(idx) {
  if (!currentModule) return;
  renderModuleContent(currentModule, idx);
}

function navigateSection(dir) {
  if (!currentModule) return;
  const newIdx = currentSectionIdx + dir;
  if (newIdx < 0 || newIdx >= currentModule.sections.length) {
    if (dir > 0) closeModule();
    return;
  }
  renderModuleContent(currentModule, newIdx);
}

// Close on overlay click
document.getElementById('module-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeModule();
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModule();
});

// ─────────────────────────────────────────────────────
// CONTACTS
// ─────────────────────────────────────────────────────
function renderContacts() {
  const grid = document.getElementById('contacts-grid');
  grid.innerHTML = CONTACTS.map(c => `
    <div class="contact-card-v2" id="cc-${c.id}">
      <div class="cc-header">
        <div class="cc-icon-wrap" style="background: ${c.color}22; border: 1px solid ${c.color}44">
          <span class="cc-icon">${c.icon}</span>
        </div>
        <div class="cc-meta">
          <span class="cc-badge" style="color:${c.badgeColor}; background:${c.badgeColor}18; border-color:${c.badgeColor}40">${c.badge}</span>
          <h4 class="cc-name">${c.name}</h4>
          <div class="cc-role">${c.role}</div>
        </div>
      </div>
      <p class="cc-summary">${c.summary}</p>
      <div class="cc-expand-area" id="cc-expand-${c.id}" style="display:none">
        <div class="cc-details">
          ${c.details.map(d => `
            <div class="cc-detail-item">
              <div class="cc-detail-label">${d.label}</div>
              <div class="cc-detail-text">${d.text}</div>
            </div>
          `).join('')}
        </div>
        <div class="cc-links">
          ${c.links.map(l => `
            <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="cc-link">
              ${l.label} <span class="cc-link-arrow">↗</span>
            </a>
          `).join('')}
        </div>
        ${c.phone ? `
          <a href="${c.phone}" class="cc-phone-btn">
            📞 ${c.phoneLabel}
          </a>
        ` : ''}
      </div>
      <button class="cc-toggle" onclick="toggleContact('${c.id}')" id="cc-btn-${c.id}" style="border-color:${c.color}44; color:${c.color}" aria-expanded="false" aria-controls="cc-details-${c.id}">
        <span id="cc-btn-label-${c.id}">Details & Links anzeigen</span>
        <span class="cc-toggle-arrow" id="cc-arrow-${c.id}">▼</span>
      </button>
    </div>
  `).join('');
}

function toggleContact(id) {
  if (!isPremium) {
    showGlobalPaywall('Die detaillierten Notfall- und Kontaktinformationen sind in der Vollversion freigeschaltet.');
    return;
  }

  const area = document.getElementById(`cc-expand-${id}`);
  const arrow = document.getElementById(`cc-arrow-${id}`);
  const label = document.getElementById(`cc-btn-label-${id}`);
  const isOpen = area.style.display !== 'none';
  area.style.display = isOpen ? 'none' : 'block';
  arrow.textContent = isOpen ? '▼' : '▲';
  label.textContent = isOpen ? 'Details & Links anzeigen' : 'Zuklappen';
  if (!isOpen) {
    setTimeout(() => document.getElementById(`cc-${id}`).scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }
}

// ─────────────────────────────────────────────────────
// CHECKLIST
// ─────────────────────────────────────────────────────
function loadChecklistState() {
  try {
    checklistState = JSON.parse(localStorage.getItem('adultguide-checklist') || '{}');
  } catch {
    checklistState = {};
  }
}

function saveChecklistState() {
  localStorage.setItem('adultguide-checklist', JSON.stringify(checklistState));
}

function toggleChecklistItem(key) {
  checklistState[key] = !checklistState[key];
  saveChecklistState();
  updateChecklistUI();
}

function renderChecklist() {
  const container = document.getElementById('checklist-container');
  const allItems = CHECKLIST_GROUPS.flatMap(g => g.items);
  const done = allItems.filter(item => checklistState[item]).length;
  const pct = Math.round((done / allItems.length) * 100);

  container.innerHTML = `
    <div class="checklist-progress">
      <div class="checklist-progress-label">
        <span>Fortschritt: ${done} von ${allItems.length} erledigt</span>
        <span>${pct}%</span>
      </div>
      <div class="checklist-progress-bar">
        <div class="checklist-progress-fill" style="width:${pct}%"></div>
      </div>
    </div>
    ${!isPremium ? `
      <div style="position: relative; margin-top: 40px; border-radius: 20px; overflow: hidden; border: 1px solid var(--glass-border); padding: 20px;">
        <div class="content-blurred" aria-hidden="true" style="opacity: 0.15; filter: blur(5px); pointer-events: none; user-select: none;">
          <div class="checklist-group">
            <div class="checklist-group-title">🏠 Eigene Wohnung (Vorschau)</div>
            <div class="checklist-item done"><div class="check-box">✓</div><span class="item-label">Mietvertrag geprüft</span></div>
            <div class="checklist-item"><div class="check-box"></div><span class="item-label">Stromvertrag angemeldet</span></div>
          </div>
        </div>
        <div style="position: absolute; top: 20px; left: 0; right: 0; bottom: 0; z-index: 2; padding: 20px; display: flex; align-items: center; justify-content: center;">
          <div style="width: 100%; max-width: 500px; margin: 0 auto; background: var(--bg-tertiary); border: 2px solid var(--glass-border); border-radius: 14px; padding: 20px; box-shadow: 0 15px 30px rgba(0,0,0,0.5);">
             ${getPaywallHTML('Sichere dir deinen Fortschritt. Die persönliche, detaillierte und speicherbare Checkliste für alle Themen ist Teil der Vollversion.')}
          </div>
        </div>
      </div>
    ` : ''}
    ${isPremium ? CHECKLIST_GROUPS.map(g => `
      <div class="checklist-group">
        <div class="checklist-group-title">${g.group}</div>
        ${g.items.map(item => {
          // Fallback if item is an object from admin panel error
          const label = typeof item === 'string' ? item : (item.label || 'Aufgabe');
          return `
          <div class="checklist-item ${checklistState[label] ? 'done' : ''}"
               onclick="toggleChecklistItem('${label.replace(/'/g, "\\'")}')"
               role="checkbox"
               aria-checked="${!!checklistState[label]}">
            <div class="check-box">${checklistState[label] ? '✓' : ''}</div>
            <span class="item-label">${label}</span>
          </div>
          `;
        }).join('')}
      </div>
    `).join('') : ''}
  `;
}

function updateChecklistUI() {
  renderChecklist();
}

// ─────────────────────────────────────────────────────
// GLOSSARY
// ─────────────────────────────────────────────────────
function renderGlossary(filter = '') {
  const grid = document.getElementById('glossary-grid');
  const items = GLOSSARY.filter(g =>
    g.term.toLowerCase().includes(filter.toLowerCase()) ||
    g.def.toLowerCase().includes(filter.toLowerCase())
  );
  grid.innerHTML = items.length > 0
    ? items.map(g => `
        <div class="glossary-item">
          <div class="glossary-term">${g.term}</div>
          <div class="glossary-def">${g.def}</div>
        </div>
      `).join('')
    : `<div style="color:var(--text-muted);grid-column:1/-1;padding:20px">Kein Begriff gefunden.</div>`;
}

document.getElementById('glossary-search').addEventListener('input', e => {
  renderGlossary(e.target.value);
});

// ─────────────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────────────
function buildSearchIndex() {
  const index = [];
  TOPICS.forEach(topic => {
    index.push({ title: topic.title, sub: topic.short, id: topic.id, icon: topic.icon });
    topic.sections.forEach(s => {
      index.push({ title: s.title, sub: topic.title, id: topic.id, icon: topic.icon });
    });
  });
  GLOSSARY.forEach(g => {
    index.push({ title: g.term, sub: g.def.substring(0, 80) + '...', id: 'glossar', icon: '📖' });
  });
  return index;
}

const SEARCH_INDEX = buildSearchIndex();

function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { results.classList.add('hidden'); return; }

    const matches = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q)
    ).slice(0, 8);

    if (matches.length === 0) { results.classList.add('hidden'); return; }

    results.innerHTML = matches.map(m => `
      <div class="search-result-item" onclick="handleSearchResult('${m.id}')">
        <span>${m.icon}</span>
        <div>
          <div class="stitle">${m.title}</div>
          <div class="scat">${m.sub}</div>
        </div>
      </div>
    `).join('');
    results.classList.remove('hidden');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('#main-nav')) results.classList.add('hidden');
  });
}

function handleSearchResult(id) {
  document.getElementById('search-results').classList.add('hidden');
  document.getElementById('search-input').value = '';
  if (TOPICS.find(t => t.id === id)) {
    openModule(id);
  } else {
    scrollToSection(id);
  }
}

// ─────────────────────────────────────────────────────
// SCROLL UTILITIES
// ─────────────────────────────────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.contact-card, .glossary-item, .checklist-group').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}
