# CURRENT ARCHITECTURE
Next.js App Router (React 19, Next 16) Web-App, die als PWA fungiert. Nutzerauthentifizierung und Lizenz-Check (is_pro) laufen über Supabase. Die gesamte Datenhaltung für persönliche App-Inhalte findet offline-fähig über den lokalen Browser-Speicher (localStorage) statt.

# CHANGED
- Stripe Checkout Links in der UI wurden abstrahiert und verweisen nun auf eine zentrale Commerce-Komponente (`src/lib/commerce/checkout.ts`).
- Das Branding wurde von "Templatebude" auf "vorlagenbude.de" umgestellt (inklusive Title, Metadaten, Manifest und Rechtstexten).
- Der Claim wurde auf "Komplizierte Dinge einfacher machen." aktualisiert.

# SHOPIFY READY
- Die Commerce-Logik exportiert nun `startCheckout(productId)`, die von Stripe auf Shopify umgeleitet werden kann, sobald die `shopifyCheckoutUrl` in der `src/lib/commerce/config.ts` befüllt wird.
- Die UI übergibt keine Stripe-spezifischen Identitätsdaten (`userId`) mehr. Das Abholen der Identität für den Übergangs-Stripe-Link passiert nun innerhalb der Commerce-Schicht.

# STRIPE REMAINING
- Der bestehende Stripe Payment Link für den "Master-Pass" ist weiterhin als Fallback aktiv, bis Shopify vollständig konfiguriert ist.
- Der Stripe Webhook (`src/app/api/webhook/stripe/route.ts`) ist noch aktiv und setzt nach erfolgreicher Zahlung `is_pro = true` in Supabase.

# SUPABASE
- Wird ausschließlich für die Authentifizierung (`auth.users`) und die Lizenz-Freischaltung (`is_pro` via `app_metadata`) verwendet.
- Keine persönlichen App-Daten werden in Supabase gespeichert (alles bleibt Local-First).

# DOMAIN MIGRATION
- Bevor `vorlagenbude.de` live gehen kann, müssen die Vercel Domains, Redirects und die neue Shopify Shop Domain (`shop.vorlagenbude.de` / App auf `app.vorlagenbude.de`) konfiguriert werden. 
- Die Supabase Redirect-URLs für Auth müssen auf die neue Domain aktualisiert werden.

# RISKS
- **Tech Debt (Lizenzmodell):** Aktuell schaltet Stripe den Nutzer global über `is_pro: true` in den `app_metadata` frei. Für mehrere einzeln kaufbare Shopify-Produkte ist dies zu grob. Zukünftiges Ziel: Eine produktbezogene Entitlement-Struktur in Supabase (user_id, product_id, status, order_reference).
- **Tech Debt (Shopify Identitätszuordnung):** Die Freischaltung via Shopify erfordert zukünftig eine serverseitig generierte Checkout-Referenz (`entitlement_ref`), die über den Shopify Order Webhook mit dem Supabase User gematcht wird (nicht nur per E-Mail).

# MANUAL ACTIONS
1. **Shopify Produkte anlegen:** Erstelle die entsprechenden Produkte in Shopify (z.B. Master-Pass) und kopiere die Checkout-Links in `src/lib/commerce/config.ts`.
2. **Shopify Webhook bauen:** Implementiere einen neuen API-Endpunkt für Shopify Order-Webhooks (als Ersatz für den aktuellen Stripe Webhook) inkl. `entitlement_ref`-Matching.
3. **Supabase Redirects:** Trage die neuen `vorlagenbude.de` Domains in den Supabase Auth Settings ein.
