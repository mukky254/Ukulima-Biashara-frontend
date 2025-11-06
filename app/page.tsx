'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Welcome to{' '}
              <span className="text-gradient bg-gradient-to-r from-green-200 to-green-100">Ukulima Biashara</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Connecting Kenyan farmers directly with wholesalers and retailers. 
              Fresh produce, fair prices, and efficient supply chains.
            </p>
            
            {!user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <Link href="/register" className="btn-primary text-lg px-8 py-4 bg-white text-green-600 hover:bg-green-50">
                  Get Started
                </Link>
                <Link href="/login" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-green-600">
                  Sign In
                </Link>
              </div>
            ) : (
              <Link 
                href={`/${user.role}`} 
                className="btn-primary text-lg px-8 py-4 inline-block animate-fade-in-up" style={{animationDelay: '0.4s'}}
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Farmer Card */}
            <div className="card text-center group hover:border-green-200">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition duration-300">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">For Farmers</h3>
              <p className="text-gray-600 leading-relaxed">
                List your produce, reach more buyers, get fair prices, and grow your farming business. 
                Connect directly with verified wholesalers and retailers.
              </p>
            </div>
            
            {/* Wholesaler Card */}
            <div className="card text-center group hover:border-green-200">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition duration-300">
                <span className="text-3xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">For Wholesalers</h3>
              <p className="text-gray-600 leading-relaxed">
                Source fresh produce directly from farmers, ensure better quality, get competitive prices, 
                and build reliable supply chains.
              </p>
            </div>
            
            {/* Retailer Card */}
            <div className="card text-center group hover:border-green-200">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition duration-300">
                <span className="text-3xl">🏪</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">For Retailers</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with reliable suppliers, get fresh inventory daily, offer quality products to your customers, 
                and grow your retail business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-green-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-green-100 font-medium">Farmers</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="text-3xl md:text-4xl font-bold mb-2">200+</div>
              <div className="text-green-100 font-medium">Wholesalers</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
              <div className="text-green-100 font-medium">Products</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-green-100 font-medium">Counties</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers, wholesalers, and retailers who are already benefiting from our platform.
          </p>
          {!user && (
            <Link href="/register" className="btn-primary bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-4">
              Join Now - It&apos;s Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
