'use client';

import FarmerDashboard from '@/components/dashboard/FarmerDashboard';

export default function FarmerDashboardPage() {
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
