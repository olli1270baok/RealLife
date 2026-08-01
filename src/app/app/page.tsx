"use client";

import { useRouter } from 'next/navigation';

export default function AppDashboard() {
  const router = useRouter();

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="content-wrapper">
          <section className="view active">
            <div className="hero">
              <h1>Willkommen in der <br/><span>Kommandozentrale.</span></h1>
              <p style={{fontSize: '16px', maxWidth: '700px', marginBottom: 0}}>
                Hier hast du Zugriff auf alle 36 Schutzschilde. Wähle dein Werkzeug.
              </p>
            </div>

            <h2 style={{marginTop: '40px'}}>Deine Schutzschilde (Freigeschaltet)</h2>
            <div className="grid-3">
              <div className="card highlight" style={{cursor: 'pointer'}} onClick={() => router.push('/app/retouren-rebell')}>
                <h3 style={{color: 'var(--accent-red)'}}>🛍️ Retouren-Rebell</h3>
                <p>E-Commerce Abwehr (Paketverlust, Amazon-Sperren, Gewährleistung).</p>
                <div style={{marginTop: '16px', color: 'var(--accent-blue)', fontSize: '12px', fontWeight: 'bold'}}>JETZT STARTEN →</div>
              </div>
              
              <div className="card" style={{opacity: 0.5}}>
                <h3>🏥 Patienten-Bollwerk</h3>
                <p>Pflegegrad, GdB, Bürgergeld. (Wird portiert...)</p>
              </div>

              <div className="card" style={{opacity: 0.5}}>
                <h3>📸 Blitzer-Bollwerk</h3>
                <p>Bußgeld, Punkte, MPU. (Wird portiert...)</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
