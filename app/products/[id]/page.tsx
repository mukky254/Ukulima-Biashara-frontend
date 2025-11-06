'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { productsAPI, ordersAPI } from '@/lib/api';
import { Product } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await productsAPI.getProduct(id as string);
      setProduct(response.data);
      setOrderQuantity(response.data.minOrder);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setOrderLoading(true);
    try {
      const orderData = {
        items: [
          {
            product: product?._id,
            quantity: orderQuantity
          }
        ],
        shippingAddress: {
          county: user.profile.location.county,
          subCounty: user.profile.location.subCounty
        },
        deliveryMethod: 'pickup',
        paymentMethod: 'mpesa',
        notes: ''
      };

      await ordersAPI.createOrder(orderData);
      alert('Order placed successfully!');
      router.push('/orders');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to place order');
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-1/2 p-8">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg mb-4">
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-lg">No Image Available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600 text-lg">{product.description}</p>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  KSh {product.price} <span className="text-lg text-gray-500">/ {product.unit}</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span>⭐ {product.rating || 'No ratings yet'}</span>
                  <span>👁️ {product.views} views</span>
                  <span>📍 {product.location.county}, {product.location.subCounty}</span>
                </div>

                {product.isOrganic && (
                  <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-4">
                    🌱 Organic
                  </span>
                )}
              </div>

              {/* Farmer Info */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-lg font-semibold mb-3">Sold By</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">
                      {product.farmer.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{product.farmer.name}</p>
                    <p className="text-sm text-gray-600">
                      ⭐ {product.farmer.rating || 'No ratings yet'} • {product.farmer.totalReviews || 0} reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Section */}
              {user && user.role !== 'farmer' && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4">Place Order</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity ({product.unit})
                      </label>
                      <input
                        type="number"
                        min={product.minOrder}
                        max={product.quantity}
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(Number(e.target.value))}
                        className="input-field"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Minimum order: {product.minOrder} {product.unit}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Price per {product.unit}:</span>
                        <span>KSh {product.price}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Quantity:</span>
                        <span>{orderQuantity} {product.unit}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>KSh {(product.price * orderQuantity).toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleOrder}
                      disabled={orderLoading || orderQuantity < product.minOrder || orderQuantity > product.quantity}
                      className="w-full btn-primary py-3 text-lg"
                    >
                      {orderLoading ? 'Placing Order...' : 'Place Order with M-Pesa'}
                    </button>

                    {orderQuantity > product.quantity && (
                      <p className="text-red-600 text-sm text-center">
                        Only {product.quantity} {product.unit} available
                      </p>
                    )}
                  </div>
                </div>
              )}

              {!user && (
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-600 mb-4">Please login to place an order</p>
                  <button
                    onClick={() => router.push('/login')}
                    className="w-full btn-primary py-3 text-lg"
                  >
                    Login to Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
