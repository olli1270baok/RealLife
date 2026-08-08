"use client";

import { useEffect, useRef } from 'react';
import './cockpit.css';

export default function AnzeigenCockpitNative() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Import html2pdf dynamically if not already in window
    if (!window.html2pdf) {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      document.head.appendChild(script);
    }

    import('./logic.js').then((module) => {
      module.initCockpit();
    });

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div 
      className="cockpit-wrapper" 
      style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 100, backgroundColor: 'var(--bg-dark)', overflow: 'hidden' }}
      dangerouslySetInnerHTML={{ __html: `` }}
    />
  );
}
