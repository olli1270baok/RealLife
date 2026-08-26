# DESIGN_REBUILD_STATUS

## IMPLEMENTED
- Die grundlegende Designsprache wurde auf eine moderne Utility-SaaS-Optik umgestellt (Navy / Dunkelblau, Sand und punktuelles Orange).
- Die Marketing-Landingpages für die vier Kern-Tools (Bahn-Rebell, Nebenkosten-Rebell, Abo-Killer und Flug-Rebell) wurden generiert und implementiert. Jedes Produkt hat nun einen eigenen Trichter und wird klar im Vordergrund erklärt, statt einer Sammlung von zufälligen Tools.
- Das grundlegende Routing in die eigentlichen PWA-Ansichten (über `/app/[product]`) wurde beibehalten.
- Alte Templatebude-UI und übermäßiger Neon-Glow wurden entfernt.

## PRODUCT FLOWS
- **Bahn-Rebell**: Benutzer landet auf `/bahn-rebell` (Marketing) -> CTA "Zum Tool" oder "Jetzt Fall prüfen" führt zu `/app/bahn-rebell`.
- **Nebenkosten-Rebell**: Benutzer landet auf `/nebenkosten-rebell` -> Klick auf CTAs führt zu `/app/nebenkosten-rebell`.
- **Abo-Killer**: Einstieg über `/abo-killer` -> CTAs leiten zu `/app/abo-killer`.
- **Flug-Rebell**: Einstieg über `/flug-rebell` -> CTAs leiten zu `/app/flug-rebell`.

## MOBILE
- Alle neuen Hero- und Landingpage-Ansichten wurden responsiv gestaltet (Mobile-First Layouts für Stacking von Grid-Inhalten auf kleinen Screens). CTAs sind als prominent nutzbare Touch-Targets umgesetzt.

## COMPONENTS
- Es wurden in diesem Schritt vor allem die 4 Page-Routen im `/app/(marketing)` Verzeichnis für die Landingpages als eigenständige Komponenten geschrieben, die konsistentes UI verwenden.
- Die Hauptnavigation auf den Landingpages beinhaltet einen Header-Link zur Startseite ("VORLAGENBUDE") sowie dedizierte, auffällige Call-to-Action Buttons in Orange für die App-Route.

## REMAINING
- Evtl. weitere Integration der Startseiten (Homepage `/` Hero) in das neue Styling, falls noch verbleibende Fragmente aus dem alten Design existieren.
- Überarbeitung restlicher UI-Komponenten (falls erforderlich) auf tiefere App-Pfade zur Angleichung an das Dunkelblau/Orange Theme, sofern nicht im ersten Schritt erledigt.

## TECHNICAL RISKS
- Es muss sichergestellt werden, dass die `/app/...` Routen für alle 4 Tools auch funktional auf der neuen PWA bereitstehen; ansonsten gibt es hier Routing-Fehler ("404").
- Durch die Trennung Marketing -> App wird die PWA erst nach Klick geladen, das PWA-Manifest und die Service Worker arbeiten ab hier.

## MANUAL ACTIONS
- Überprüfung des neuen User Flows im Browser (Startseite -> Marketing-Page -> App-Route).
- Validierung der bestehenden Kaufen-Funktionalitäten im Checkout für die neuen Produkte.

## SHOPIFY LATER
- Es wird später in `/app/...` eine Shopify-Commerce-Logik benötigt, die über serverseitig erzeugte `entitlement_ref` den Warenkorb füttert, während die Stripe-Integration entfernt wird. Diese Checkout-Referenz sollte aus den PWA-Bereichen initiiert werden.
