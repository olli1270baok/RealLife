import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#ff1e56",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "VORLAGENBUDE | Dein rechtlicher Schutzschild",
  description: "Komplizierte Dinge einfacher machen.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Vorlagenbude",
  },
  icons: {
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <div className="bg-blob-container no-print">
          <div className="bg-blob bg-blob-1"></div>
          <div className="bg-blob bg-blob-2"></div>
          <div className="bg-blob bg-blob-3"></div>
        </div>
        <header className="no-print">
          <div className="logo">VORLAGENBUDE </div>
          <div className="badge">100% ABO-FREI</div>
        </header>

        {children}
      </body>
    </html>
  );
}
