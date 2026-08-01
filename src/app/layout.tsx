import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VORLAGENBUDE | Dein rechtlicher Schutzschild",
  description: "E-Commerce, Behörden & Konzerne in die Schranken weisen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <header className="no-print">
          <div className="logo">VORLAGENBUDE <span>// SaaS</span></div>
          <div className="badge">100% ABO-FREI</div>
        </header>

        {children}
      </body>
    </html>
  );
}
