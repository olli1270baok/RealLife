# Migrations-Regel: 100% Inhalts-Übernahme

**CRITICAL RULE:** Wenn alte HTML-Werkzeuge aus dem `HTML_Imperium` in die neue Next.js React-App migriert werden, müssen **ausnahmslos ALLE** Inhalte 1:1 übernommen werden! 

Das beinhaltet:
1. **Alle Features & UI-Elemente:** Modals, Diagramme, Info-Boxen, Warnungen und Easter-Eggs dürfen nicht weggelassen oder vereinfacht werden.
2. **Datenbanken & Listen:** Wenn ein HTML-Dokument 40 Anbieter im Code hat, müssen alle 40 Anbieter migriert werden, nicht nur eine Stichprobe.
3. **Logik & Berechnung:** Jegliche Kalkulationen, Ampel-Systeme oder Formel-Berechnungen aus JavaScript müssen vollständig in React States und `useEffect` Hooks überführt werden.
4. **Texte & Wordings:** Kein Text, keine Erklärung und kein Button-Label darf eigenmächtig gelöscht oder "zusammengefasst" werden.

Bevor ein migriertes Tool als "fertig" markiert wird, ist der Quellcode des Original-HTML-Dokuments gewissenhaft von Zeile 1 bis zum Ende abzugleichen, um sicherzustellen, dass absolut nichts vergessen wurde.

# Web App Design & PDF-Export: Nativer Print-Workflow
- **Standard-Workflow:** Nutze IMMER den nativen Browser-Druckdialog (`window.print()`) für alle Funktionen, die PDFs oder ausdruckbare Dokumente erzeugen sollen.
- **Verbot von Drittanbieter-Bibliotheken:** Verwende KEINE Libraries wie `html2pdf.js`, da diese die Qualität verringern (Canvas-Bilder statt echten Text) und den Nutzer-Workflow blockieren/verlangsamen.
- **CSS Setup:** Erstelle immer ein hochpräzises `@media print` CSS, das alle UI-Elemente (Sidebars, Menüs, dunkle Hintergründe, Buttons) ausblendet und ausschließlich das Ziel-Dokument auf einer weißen A4-Fläche formatiert. Der Nutzer soll bei Klick auf "Drucken / PDF" direkt den nativen Dialog seines Betriebssystems sehen.
