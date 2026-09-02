"use client";

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { startCheckout } from '@/lib/commerce/checkout';
import { ProductId } from '@/lib/commerce/config';

function CheckoutRedirect() {
  const searchParams = useSearchParams();
  const product = searchParams.get('product') as ProductId;

  useEffect(() => {
    if (product) {
      startCheckout(product);
    }
  }, [product]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Leite weiter zum Zahlungsanbieter...</h1>
        <p className="text-[#94A3B8]">Bitte einen Moment Geduld.</p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">Lade...</div>}>
      <CheckoutRedirect />
    </Suspense>
  );
}
