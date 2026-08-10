"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, usePathname } from 'next/navigation';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // The /app root (dashboard) handles its own paywall banner.
  // Only sub-routes need the hard pro-check.
  const isDashboard = pathname === '/app' || pathname === '/app/';

  // Force loading state when navigating to sub-routes without confirmed pro access
  useEffect(() => {
    if (!isDashboard && !isPro) {
      setLoading(true);
    }
  }, [pathname, isDashboard, isPro]);

  useEffect(() => {
    const checkAccess = async () => {
      // Step 1: Check if logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      // Step 2: Refresh session to get latest app_metadata (catches post-payment state)
      const { data: refreshed } = await supabase.auth.refreshSession();
      const user = refreshed?.session?.user;
      const pro = user?.app_metadata?.is_pro === true;

      setIsPro(pro);

      // If we're on the dashboard, just let it through (it has its own paywall UI)
      if (isDashboard) {
        setLoading(false);
        return;
      }

      if (!pro) {
        // Just let it load. The sub-routes will handle the soft paywall overlay themselves.
        setLoading(false);
        return;
      }

      setLoading(false);
    };

    checkAccess();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router, isDashboard]);

  if (loading) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        minHeight: '100vh', backgroundColor: '#fdf8f3', gap: '16px'
      }}>
        <div style={{ fontSize: '40px' }}>🔒</div>
        <p style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontSize: '16px' }}>
          Zugang wird geprüft…
        </p>
      </div>
    );
  }



  return <>{children}</>;
}
