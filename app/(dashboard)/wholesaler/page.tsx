'use client';

import WholesalerDashboard from '@/components/dashboard/WholesalerDashboard';

export default function WholesalerDashboardPage() {
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
