import type { Metadata, Viewport } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
