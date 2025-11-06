'use client';

import { useState, useEffect } from 'react';
import { ordersAPI, productsAPI } from '@/lib/api';
import { Order, Product } from '@/types';
import Link from 'next/link';

const WholesalerDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [ordersResponse, productsResponse] = await Promise.all([
        ordersAPI.getMyOrders(),
        productsAPI.getProducts({ limit: 6 })
      ]);
      
      setOrders(ordersResponse.data);
      setProducts(productsResponse.data.products);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = orders
    .filter(order => order.paymentStatus === 'paid')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const pendingOrders = orders.filter(order => 
    ['pending', 'confirmed'].includes(order.status)
  ).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">📦</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">🔄</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">KSh {totalSpent}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            href="/products" 
            className="bg-green-600 text-white text-center py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Browse Products
          </Link>
          <Link 
            href="/orders" 
            className="bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            My Orders
          </Link>
          <Link 
            href="/messages" 
            className="bg-purple-600 text-white text-center py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
          >
            Messages
          </Link>
          <Link 
            href="/profile" 
            className="bg-orange-600 text-white text-center py-3 px-4 rounded-lg hover:bg-orange-700 transition duration-200"
          >
            Profile
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Featured Products</h2>
            <Link href="/products" className="text-green-600 hover:text-green-700">
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          {products.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No products available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product._id} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold text-green-600">
                      KSh {product.price}
                    </span>
                    <span className="text-sm text-gray-500">per {product.unit}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>{product.farmer.name}</span>
                    <span>{product.location.county}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WholesalerDashboard;
