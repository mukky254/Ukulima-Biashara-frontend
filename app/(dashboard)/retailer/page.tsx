'use client';

import RetailerDashboard from '@/components/dashboard/RetailerDashboard';

// Disable static generation
export const dynamic = 'force-dynamic';

export default function RetailerDashboardPage() {
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
