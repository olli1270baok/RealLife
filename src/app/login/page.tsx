"use client";

import { useState, Suspense } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import GlobalHeader from '@/components/GlobalHeader';

function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const checkoutProduct = searchParams.get('checkout');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage('Account erstellt! Du kannst dich jetzt einloggen.');
        setIsSignUp(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        if (checkoutProduct) {
          router.push(`/checkout?product=${checkoutProduct}`);
        } else {
          router.push('/meine-apps');
        }
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      {/* Left Branding Side */}
      <div style={{ 
        flex: 1, 
        display: 'none', 
        '@media (minWidth: 768px)': { display: 'flex' },
        background: 'linear-gradient(135deg, #0d1117 0%, #1a0b12 100%)',
        borderRight: '1px solid rgba(255, 30, 86, 0.2)',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px',
        position: 'relative',
        overflow: 'hidden'
      }} className="hide-on-mobile">
        
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: 'rgba(255, 30, 86, 0.1)', filter: 'blur(100px)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '300px', height: '300px', background: 'rgba(255, 30, 86, 0.1)', filter: 'blur(100px)', borderRadius: '50%' }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📦</div>
          <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '20px', letterSpacing: '-1px' }}>
            Deine <br/><span style={{ color: 'var(--accent-red)' }}>Apps.</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--muted)', maxWidth: '400px', lineHeight: 1.6 }}>
            Zugriff auf deine gekauften und freigeschalteten Helfer.
          </p>
        </div>
      </div>

      {/* Right Form Side */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        position: 'relative'
      }}>
        
        <div style={{ position: 'absolute', top: '40px', right: '40px' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
            &larr; Startseite
          </Link>
        </div>

        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>
            {isSignUp ? 'Konto erstellen' : 'Deine Apps'}
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: '40px' }}>
            {isSignUp ? 'Erstelle einen Zugang für deine Vorlagenbude-Apps.' : 'Melde dich an, um auf bereits freigeschaltete Vorlagenbude-Apps zuzugreifen.'}
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', marginBottom: '8px', display: 'block' }}>E-Mail Adresse</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.de"
                style={{ width: '100%', padding: '14px 16px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '16px', outline: 'none', transition: 'border 0.3s' }}
                required 
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: '30px' }}>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', marginBottom: '8px', display: 'block' }}>Passwort</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '14px 16px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '16px', outline: 'none', transition: 'border 0.3s' }}
                required 
              />
            </div>

            {error && <div style={{ backgroundColor: 'rgba(255, 30, 86, 0.1)', border: '1px solid var(--accent-red)', color: 'white', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}
            {message && <div style={{ backgroundColor: 'rgba(0, 255, 136, 0.1)', border: '1px solid #00ff88', color: 'white', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>{message}</div>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: 600, letterSpacing: '0.5px' }} disabled={loading}>
              {loading ? 'Lädt...' : (isSignUp ? 'Konto erstellen' : 'Einloggen')}
            </button>
          </form>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
              {isSignUp ? 'Du hast bereits einen Account?' : 'Noch kein Zugang?'}
              <button 
                type="button" 
                onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }}
                style={{ background: 'none', border: 'none', color: 'var(--accent-red)', cursor: 'pointer', fontWeight: 600, marginLeft: '8px', fontSize: '14px' }}
              >
                {isSignUp ? 'Hier einloggen' : 'Konto erstellen'}
              </button>
            </p>
          </div>
        </div>
        {/* Footer */}
        <div style={{ marginTop: 'auto', paddingTop: '40px', display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <a href="/impressum" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '12px' }}>Impressum</a>
          <a href="/datenschutz" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '12px' }}>Datenschutz</a>
          <a href="/agb" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '12px' }}>AGB & Widerruf</a>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <>
      <GlobalHeader />
      <Suspense fallback={<div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">Lade...</div>}>
        <LoginForm />
      </Suspense>
    </>
  );
}
