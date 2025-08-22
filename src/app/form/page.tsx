'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CustomCursor from '../components/CustomCursor';
import { ArrowRight, CheckCircle, Heart, Star, Zap, Users, MapPin, Phone, Mail, User } from 'lucide-react';

export default function JoinCommunityPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    whatsapp_group: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    setIsSubmitted(true);
    
    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true);
    }, 1000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-blue-50 flex items-center justify-center px-6">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to the Family! 🎉</h1>
          <p className="text-gray-600 text-lg mb-8">Your application has been submitted successfully. We will add you to our WhatsApp group soon!</p>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-blue-50 text-gray-900 font-sans antialiased">
      <Header />
      <CustomCursor />

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-r from-yellow-300/10 to-amber-300/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-gradient-to-r from-blue-300/10 to-purple-300/5 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-pink-300/10 to-yellow-300/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <section className="relative min-h-screen flex items-center justify-center py-32 px-6">
        <div className="relative z-10 max-w-4xl w-full mx-auto">
          {/* Form container with glassmorphism effect */}
          <div className="p-8 md:p-12 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 animate-slide-up">
            {/* Header section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-200 rounded-full text-sm text-yellow-700 mb-6 animate-bounce-gentle">
                <Star className="w-4 h-4 mr-2 animate-spin-slow" />
                Join Our Community
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-yellow-700 to-amber-600 bg-clip-text text-transparent mb-4 animate-fade-in-up">
                Become a Part of Our Family
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed animate-fade-in-up delay-200">
                Fill out the form below to join the Dehradun Hangouts WhatsApp group and start making connections.
              </p>
            </div>

            <div className="space-y-6">
              <div className="animate-fade-in-up delay-300">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-yellow-600" />
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/90 hover:shadow-md"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="animate-fade-in-up delay-400">
                <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-yellow-600" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/90 hover:shadow-md"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="animate-fade-in-up delay-500">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-yellow-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/90 hover:shadow-md"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="animate-fade-in-up delay-600">
                <label className="block text-gray-700 font-semibold mb-4 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-yellow-600" />
                  Are you part of the WhatsApp hangout?
                </label>
                <div className="flex items-center space-x-8">
                  <label className="flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      name="whatsapp_group" 
                      value="yes" 
                      checked={formData.whatsapp_group === 'yes'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-yellow-600 bg-white border-2 border-gray-300 focus:ring-yellow-400 focus:ring-2" 
                      required 
                    />
                    <span className="ml-3 text-gray-700 group-hover:text-yellow-600 transition-colors">Yes, Im already in</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      name="whatsapp_group" 
                      value="no" 
                      checked={formData.whatsapp_group === 'no'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-yellow-600 bg-white border-2 border-gray-300 focus:ring-yellow-400 focus:ring-2" 
                      required 
                    />
                    <span className="ml-3 text-gray-700 group-hover:text-yellow-600 transition-colors">No, add me please!</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 animate-fade-in-up delay-700">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                  className="group w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  {isSubmitted ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">Submit Application</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </button>
              </div>

              {/* Additional info section */}
              <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 animate-fade-in-up delay-800">
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">What happens next?</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    We will review your application within 24 hours
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    You will receive a WhatsApp invitation link
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Welcome to the most awesome community in Dehradun! 🎉
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/5 to-amber-600/5"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2 animate-fade-in-left">
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-4">
                Dehradun Hangouts
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mb-6 animate-pulse"></div>
              <p className="text-gray-300 leading-relaxed max-w-md mb-6">
                Dehradun Hangouts is a vibrant community initiative designed to connect people through shared experiences and unforgettable memories.
              </p>
            </div>
            <div className="animate-fade-in-up delay-200">
              <h4 className="text-white font-semibold mb-6">What We Do</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  CREATING A COMMUNITY
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  CONNECTING PEOPLES
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  EXPLORING PLACES
                </a></li>
              </ul>
            </div>
            <div className="animate-fade-in-up delay-300">
              <h4 className="text-white font-semibold mb-6">Contact</h4>
              <div className="space-y-3 text-sm text-gray-300">
                <p className="hover:text-yellow-400 transition-colors cursor-pointer flex items-center group">
                  <Mail className="w-4 h-4 mr-2 group-hover:text-yellow-400" />
                  dehradunhangouts@gmail.com
                </p>
                <p className="hover:text-yellow-400 transition-colors cursor-pointer flex items-center group">
                  <Phone className="w-4 h-4 mr-2 group-hover:text-yellow-400" />
                  +91 9997997266
                </p>
                <p className="hover:text-yellow-400 transition-colors cursor-pointer flex items-center group">
                  <MapPin className="w-4 h-4 mr-2 group-hover:text-yellow-400" />
                  Dehradun, IN
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm animate-fade-in-up delay-400">
            <p>© 2025 Dehradun Hangouts. Creating extraordinary moments worldwide.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, -20px) rotate(1deg); }
          66% { transform: translate(-10px, 10px) rotate(-1deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-15px, 15px) rotate(-1deg); }
          66% { transform: translate(25px, -10px) rotate(1deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in-left {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-fade-in-left { animation: fade-in-left 0.6s ease-out; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-800 { animation-delay: 800ms; }
        .delay-900 { animation-delay: 900ms; }
      `}</style>
    </div>
  );
}