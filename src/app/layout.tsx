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
  description: "Digitale Apps für Bahnärger, Nebenkosten, Abos, Flugprobleme und anderen Alltagskram.",
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
    <html lang="de" className="scroll-smooth">
      <body className="bg-[#F5F4F0] text-[#0F172A] font-sans selection:bg-[#EA580C] selection:text-white">
        <header className="border-b border-[#E2E8F0] bg-[#F5F4F0] sticky top-0 z-50">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
            <Link href="/" className="font-extrabold text-xl tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>
              vorlagen<span className="text-[#EA580C]">b</span>ude
            </Link>
            
            <nav className="hidden md:flex gap-8 text-sm font-semibold text-[#0F172A] items-center">
              <Link href="/#kern-apps" className="hover:text-[#EA580C] transition-colors">Apps</Link>
              <Link href="/#kostenlos-testen" className="hover:text-[#EA580C] transition-colors">Kostenlos testen</Link>
              <Link href="/#warum-vorlagenbude" className="hover:text-[#EA580C] transition-colors">So funktioniert's</Link>
              <Link href="/meine-apps" className="bg-[#1e3a8a] text-white px-4 py-2 rounded font-bold hover:bg-[#172554] transition-colors ml-4">Meine Apps</Link>
            </nav>
            
            <div className="md:hidden flex gap-4 items-center">
              <Link href="/#kern-apps" className="text-sm font-semibold text-[#0F172A]">Apps</Link>
              <Link href="/meine-apps" className="text-sm font-semibold text-[#1e3a8a]">Meine Apps</Link>
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
