"use client";

import { useRouter } from "next/navigation";

export default function NebenkostenRebellApp() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Nebenkosten-Rebell</h1>
      <p className="text-[#94A3B8] mb-8">App Interface Under Construction.</p>
      <button onClick={() => router.push("/meine-apps")} className="bg-[#F97316] px-6 py-2 rounded text-white font-bold hover:bg-[#EA580C]">Zurück zu Meine Apps</button>
    </div>
  );
}

