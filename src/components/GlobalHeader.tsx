import Link from 'next/link';

export default function GlobalHeader() {
  return (
    <header className="border-b border-[#E2E8F0] bg-[#F5F4F0] sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>
          vorlagen<span className="text-[#EA580C]">b</span>ude
        </Link>
        
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-[#0F172A] items-center">
          <Link href="/#kern-apps" className="hover:text-[#EA580C] transition-colors">Apps</Link>
          <Link href="/#warum-vorlagenbude" className="hover:text-[#EA580C] transition-colors">So funktioniert's</Link>
        </nav>
        
        <div className="md:hidden flex gap-4 items-center">
          <Link href="/#kern-apps" className="text-sm font-semibold text-[#0F172A]">Apps</Link>
        </div>
      </div>
    </header>
  );
}
