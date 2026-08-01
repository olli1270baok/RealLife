"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/app');
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Registrierung erfolgreich! Du kannst dich jetzt einloggen (oder musst deine E-Mail bestätigen, falls eingestellt).');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Willkommen zurück</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '30px' }}>Logge dich ein, um zur Vorlagenbude zu gelangen.</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>E-Mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.de"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Passwort</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>

          {error && <div className="alert alert-danger" style={{ marginBottom: '20px' }}>{error}</div>}
          {message && <div className="alert" style={{ backgroundColor: '#2a2a2a', borderLeft: '4px solid #00ff88', marginBottom: '20px' }}>{message}</div>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '15px' }} disabled={loading}>
            {loading ? 'Lädt...' : 'Einloggen'}
          </button>
        </form>

        <button 
          type="button" 
          className="btn btn-secondary" 
          style={{ width: '100%' }} 
          onClick={handleSignUp}
          disabled={loading}
        >
          Neuen Account erstellen
        </button>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>
            &larr; Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
