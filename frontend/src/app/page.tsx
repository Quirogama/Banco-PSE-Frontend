'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a un pago de ejemplo para testing
    router.push('/pago/1');
  }, [router]);

  return (
    <div className="container mt-5">
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Redirigiendo...</span>
        </div>
        <p className="mt-3">Redirigiendo...</p>
      </div>
    </div>
  );
}
