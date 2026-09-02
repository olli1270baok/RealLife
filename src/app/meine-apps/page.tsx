"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { hasEntitlement } from '@/lib/commerce/entitlements';
import { ProductId } from '@/lib/commerce/config';
import GlobalHeader from '@/components/GlobalHeader';

interface AppStatus {
  id: ProductId;
  name: string;
  description: string;
  url: string; // The marketing URL
  appUrl: string; // The actual app URL
}

const APPS: AppStatus[] = [
  { id: 'aboKiller', name: 'Abo-Killer', description: 'Verträge kündigen in Sekunden.', url: '/abo-killer', appUrl: '/app/abo-killer' },
  { id: 'nebenkostenRebell', name: 'Nebenkosten-Rebell', description: 'Abrechnung prüfen und Geld zurückholen.', url: '/nebenkosten-rebell', appUrl: '/app/nebenkosten-rebell' },
  { id: 'flugRebell', name: 'Flug-Rebell', description: 'Entschädigung bei Flugverspätung sichern.', url: '/flug-rebell', appUrl: '/app/flug-rebell' },
  { id: 'bahnRebell', name: 'Bahn-Rebell', description: 'Fahrpreis bei Bahnverspätung erstatten lassen.', url: '/bahn-rebell', appUrl: '/app/bahn-rebell' },
];

export default function MeineApps() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center">
        Lade deine Apps...
      </div>
    );
  }

  return (
    <>
    <GlobalHeader />
    <div className="min-h-screen bg-[#F5F4F0] text-[#0F172A] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Meine Apps</h1>
            <p className="text-gray-600">Willkommen in deiner Kommandozentrale, {user.email}</p>
          </div>
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/');
            }}
            className="text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors"
          >
            Abmelden
          </button>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {APPS.map((app) => {
            const isEntitled = hasEntitlement(user, app.id);
            // Bahn-Rebell is a special case: always free to open
            const isFree = app.id === 'bahnRebell';
            const canOpen = isEntitled || isFree;

            return (
              <div key={app.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl">{app.name}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${canOpen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {canOpen ? 'Freigeschaltet' : 'Nicht freigeschaltet'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-6 flex-1">{app.description}</p>
                
                {canOpen ? (
                  <Link href={app.appUrl} className="block text-center bg-[#1e3a8a] text-white py-3 rounded-lg font-bold hover:bg-[#172554] transition-colors">
                    App öffnen
                  </Link>
                ) : (
                  <Link href={app.url} className="block text-center bg-gray-100 text-[#1e3a8a] py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                    App ansehen
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}
