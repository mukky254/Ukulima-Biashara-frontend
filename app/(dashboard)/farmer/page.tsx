'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FarmerDashboard from '@/components/dashboard/FarmerDashboard';

export default function FarmerDashboardPage() {
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
        <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your products and orders</p>
      </div>
      <FarmerDashboard />
    </div>
  );
}
