'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RetailerDashboard from '@/components/dashboard/RetailerDashboard';

export default function RetailerDashboardPage() {
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
        <h1 className="text-3xl font-bold text-gray-900">Retailer Dashboard</h1>
        <p className="text-gray-600 mt-2">Find quality products for your store</p>
      </div>
      <RetailerDashboard />
    </div>
  );
}
