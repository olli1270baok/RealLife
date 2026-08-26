import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from 'next/link';

export const viewport: Viewport = {
  themeColor: "#0B1221",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Vorlagenbude – Komplizierte Dinge einfacher machen",
  description: "Digitale Helfer für Bahnverspätungen, Nebenkosten, Abos, Flugprobleme und komplizierten Alltagskram. Direkt nutzbar und einfach verständlich.",
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
      <body className="bg-[#F5F4F0] text-[#0F172A] font-sans selection:bg-[#EA580C] selection:text-white">
        <header className="no-print border-b border-[#E2E8F0] bg-[#F5F4F0] sticky top-0 z-50">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
            <Link href="/" className="font-extrabold text-xl tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>
              vorlagenbude
            </Link>
            
            <nav className="hidden md:flex gap-8 text-sm font-semibold text-[#64748B]">
              <Link href="/#loesungen" className="hover:text-[#0F172A] transition-colors">Lösungen</Link>
              <Link href="/#so-funktionierts" className="hover:text-[#0F172A] transition-colors">So funktioniert's</Link>
              <Link href="/#apps" className="hover:text-[#0F172A] transition-colors">Apps</Link>
            </nav>

            <Link href="/#loesungen" className="bg-[#0B1221] text-white px-5 py-2.5 rounded text-sm font-bold hover:bg-[#1E293B] transition-colors">
              Kostenlos ausprobieren
            </Link>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
