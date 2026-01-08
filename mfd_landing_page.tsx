import React, { useState } from 'react';
import { CheckCircle, TrendingUp, Shield, Users, Phone, Mail, MessageCircle, BarChart3, PieChart, AlertCircle, ArrowRight } from 'lucide-react';

export default function MFDLandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    assetsRange: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store lead data
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    leads.push({...formData, timestamp: new Date().toISOString()});
    localStorage.setItem('leads', JSON.stringify(leads));
    
    setSubmitted(true);
    
    // Auto-redirect to WhatsApp after 2 seconds
    setTimeout(() => {
      handleWhatsApp();
    }, 2000);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi! I'm ${formData.name}. I'd like to get my mutual fund portfolio reviewed.`);
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Thank You, {formData.name}!</h2>
          <p className="text-gray-600 mb-8 text-lg">I'll reach out within 24 hours. Meanwhile, let's connect on WhatsApp for faster service.</p>
          <button 
            onClick={handleWhatsApp}
            className="bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600 transition flex items-center gap-3 mx-auto text-lg font-semibold shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Continue on WhatsApp
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">WealthGrowth</span>
          </div>
          <button 
            onClick={() => window.open('https://wa.me/919876543210', '_blank')}
            className="bg-green-500 text-white px-5 py-2.5 rounded-lg hover:bg-green-600 transition flex items-center gap-2 font-medium shadow-md"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Shield className="w-4 h-4" />
              AMFI Registered MFD - ARN-XXXXX
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Stop Losing Money to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Hidden Costs</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get a free expert portfolio review and discover how much you're losing to high expense ratios, overlapping funds, and underperforming schemes.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-3xl font-bold text-indigo-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Portfolios Reviewed</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-3xl font-bold text-indigo-600 mb-1">₹50Cr+</div>
                <div className="text-sm text-gray-600">Assets Under Advisory</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-3xl font-bold text-indigo-600 mb-1">12%</div>
                <div className="text-sm text-gray-600">Avg. XIRR Improved</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#form" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl transition font-semibold text-center flex items-center justify-center gap-2 text-lg"
              >
                Get Free Review Now
                <ArrowRight className="w-5 h-5" />
              </a>
              <button 
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                className="bg-white border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl hover:bg-indigo-50 transition font-semibold flex items-center justify-center gap-2 text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </button>
            </div>
          </div>

          {/* Problem Highlights */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Is Your Portfolio Suffering From:</h3>
            
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">High Expense Ratios (2%+)</h4>
                <p className="text-gray-600">Regular plans cost 0.5-1% more annually. On ₹10L, that's ₹50K lost over 10 years!</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <PieChart className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Portfolio Overlap (60%+)</h4>
                <p className="text-gray-600">Your 5 "diversified" funds might own the same 20 stocks. That's concentration risk!</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-xl">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Underperforming Funds</h4>
                <p className="text-gray-600">Holding funds that haven't beaten benchmarks in 3 years? Time to switch.</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-center text-gray-500 text-sm">✓ Free Review ✓ No Obligation ✓ 24hr Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">What You'll Get</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Comprehensive analysis of your entire mutual fund portfolio</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Analysis</h3>
              <p className="text-gray-600">Fund-wise returns, XIRR calculation, and benchmark comparison</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Asset Allocation Review</h3>
              <p className="text-gray-600">Equity-debt ratio, sector concentration, and diversification gaps</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Optimization Strategy</h3>
              <p className="text-gray-600">Personalized recommendations to improve returns and reduce risk</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="form" className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Get Your Free Portfolio Review</h2>
            <p className="text-gray-600 mb-8 text-center">Takes 30 seconds. No credit card required.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
                  placeholder="Rajesh Kumar"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
                  placeholder="9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
                  placeholder="rajesh@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Investment Size</label>
                <select
                  value={formData.assetsRange}
                  onChange={(e) => setFormData({...formData, assetsRange: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
                >
                  <option value="">Select range (optional)</option>
                  <option value="under-5L">Under ₹5 Lakhs</option>
                  <option value="5-10L">₹5-10 Lakhs</option>
                  <option value="10-25L">₹10-25 Lakhs</option>
                  <option value="25-50L">₹25-50 Lakhs</option>
                  <option value="50L-1Cr">₹50L - ₹1 Crore</option>
                  <option value="above-1Cr">Above ₹1 Crore</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-2xl transition font-bold text-lg"
              >
                Get Free Review Now →
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Your data is 100% secure. We never share your information.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">WealthGrowth</span>
          </div>
          <p className="text-gray-400 mb-2">AMFI Registered Mutual Fund Distributor - ARN-XXXXX</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="mailto:your@email.com" className="hover:text-white transition">your@email.com</a>
            <a href="tel:+919876543210" className="hover:text-white transition">+91 98765 43210</a>
          </div>
          <p className="text-gray-500 text-sm mt-6">Mutual Fund investments are subject to market risks. Read all scheme related documents carefully.</p>
        </div>
      </footer>
    </div>
  );
}