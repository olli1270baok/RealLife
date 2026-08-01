# Migrations-Regel: 100% Inhalts-Übernahme

**CRITICAL RULE:** Wenn alte HTML-Werkzeuge aus dem `HTML_Imperium` in die neue Next.js React-App migriert werden, müssen **ausnahmslos ALLE** Inhalte 1:1 übernommen werden! 

Das beinhaltet:
1. **Alle Features & UI-Elemente:** Modals, Diagramme, Info-Boxen, Warnungen und Easter-Eggs dürfen nicht weggelassen oder vereinfacht werden.
2. **Datenbanken & Listen:** Wenn ein HTML-Dokument 40 Anbieter im Code hat, müssen alle 40 Anbieter migriert werden, nicht nur eine Stichprobe.
3. **Logik & Berechnung:** Jegliche Kalkulationen, Ampel-Systeme oder Formel-Berechnungen aus JavaScript müssen vollständig in React States und `useEffect` Hooks überführt werden.
4. **Texte & Wordings:** Kein Text, keine Erklärung und kein Button-Label darf eigenmächtig gelöscht oder "zusammengefasst" werden.

Bevor ein migriertes Tool als "fertig" markiert wird, ist der Quellcode des Original-HTML-Dokuments gewissenhaft von Zeile 1 bis zum Ende abzugleichen, um sicherzustellen, dass absolut nichts vergessen wurde.
