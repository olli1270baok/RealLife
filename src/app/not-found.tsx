"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F4F0] text-[#1e3a8a] flex flex-col items-center justify-center p-6">
      <h1 className="text-6xl font-extrabold tracking-tighter mb-4" style={{ fontFamily: "var(--font-head)" }}>404</h1>
      <p className="text-xl mb-8 font-medium">Diese Seite gibt es nicht.</p>
      <div className="flex gap-4">
        <Link href="/" className="bg-[#1e3a8a] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#172554] transition-colors">
          Zur Startseite
        </Link>
        <Link href="/#kern-apps" className="bg-white border border-[#bfdbfe] text-[#1e3a8a] px-6 py-3 rounded-xl font-bold hover:bg-[#eff6ff] transition-colors">
          Apps ansehen
        </Link>
      </div>
    </div>
  );
}

