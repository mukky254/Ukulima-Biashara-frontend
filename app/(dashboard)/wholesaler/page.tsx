'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WholesalerDashboard from '@/components/dashboard/WholesalerDashboard';

export default function WholesalerDashboardPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Client-side only check
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Wholesaler Dashboard</h1>
        <p className="text-gray-600 mt-2">Source fresh produce from farmers</p>
      </div>
      <WholesalerDashboard />
    </div>
  );
}
