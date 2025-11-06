'use client';

import { useState } from 'react';
import { productsAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function CreateProduct() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'vegetables',
    subcategory: '',
    price: '',
    unit: 'kg',
    quantity: '',
    minOrder: '1',
    isOrganic: false,
    isFresh: true,
    county: user?.profile?.location?.county || '',
    subCounty: user?.profile?.location?.subCounty || ''
  });

  const categories = {
    vegetables: ['Tomatoes', 'Kale', 'Cabbage', 'Carrots', 'Onions', 'Potatoes'],
    fruits: ['Mangoes', 'Bananas', 'Oranges', 'Avocado', 'Pineapples', 'Watermelons'],
    grains: ['Maize', 'Beans', 'Rice', 'Wheat', 'Sorghum', 'Millet'],
    dairy: ['Milk', 'Cheese', 'Yogurt', 'Butter'],
    poultry: ['Chicken', 'Eggs', 'Turkey', 'Duck'],
    livestock: ['Beef', 'Goat Meat', 'Sheep Meat', 'Pork'],
    other: ['Honey', 'Herbs', 'Spices', 'Tea', 'Coffee']
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await productsAPI.createProduct({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        minOrder: Number(formData.minOrder),
        location: {
          county: formData.county,
          subCounty: formData.subCounty
        }
      });
      router.push('/farmer');
    } catch (error: any) {
      console.error('Error creating product:', error);
      alert(error.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'farmer') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Only farmers can create products.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">List New Product</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Fresh Organic Tomatoes"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="input-field"
                placeholder="Describe your product in detail..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  {Object.keys(categories).map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory *
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select subcategory</option>
                  {categories[formData.category as keyof typeof categories]?.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (KSh) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="0"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit *
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="g">Gram (g)</option>
                  <option value="piece">Piece</option>
                  <option value="bunch">Bunch</option>
                  <option value="crate">Crate</option>
                  <option value="bag">Bag</option>
                  <option value="liter">Liter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity Available *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Order *
                </label>
                <input
                  type="number"
                  name="minOrder"
                  value={formData.minOrder}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="1"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  County *
                </label>
                <input
                  type="text"
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Nairobi"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub-County *
                </label>
                <input
                  type="text"
                  name="subCounty"
                  value={formData.subCounty}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Westlands"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isOrganic"
                  checked={formData.isOrganic}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Organic Product</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isFresh"
                  checked={formData.isFresh}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Fresh Product</label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Creating Product...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
