"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { ArrowRight, MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';           
import CustomCursor from '../components/CustomCursor';
import Link from 'next/link';

interface FormData {
  full_name: string;
  email_address: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email_address: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (): void => {
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({
        full_name: '',
        email_address: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradientShift {
          0% { 
            background-position: 0% 50%;
          }
          50% { 
            background-position: 100% 50%;
          }
          100% { 
            background-position: 0% 50%;
          }
        }
        
        @keyframes subtleFloat {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-8px);
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4);
          }
          50% { 
            box-shadow: 0 0 0 20px rgba(251, 191, 36, 0);
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .gradient-text {
          background: linear-gradient(45deg, #facc15, #f59e0b, #3b82f6, #facc15);
          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 4s ease-in-out infinite;
        }
        
        .gradient-text-white {
          background: linear-gradient(45deg, #facc15, #fbbf24, #f59e0b);
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease-in-out infinite;
        }
        
        .subtle-float {
          animation: subtleFloat 4s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulseGlow 2s infinite;
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        
        .hover-scale:hover {
          transform: scale(1.02);
        }
        
        .transition-smooth {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
      `}</style>

      <Header />
      <CustomCursor />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gray-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-yellow-300/20 to-amber-400/15 rounded-full blur-3xl subtle-float"></div>
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-r from-blue-300/15 to-yellow-300/20 rounded-full blur-3xl subtle-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400/10 to-blue-400/10 rounded-full blur-3xl subtle-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl w-full">
            
            {/* Page Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-sm text-yellow-600 mb-8 fade-in-up border border-yellow-200/50 shadow-lg">
                <Mail className="w-4 h-4 mr-2" />
                Lets Connect
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up stagger-1">
                <span className="block text-gray-900 mb-2">Get In</span>
                <span className="block gradient-text">Touch</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light fade-in-up stagger-2">
                Ready to join our community? We did love to hear from you. Send us a message and lets create amazing experiences together.
              </p>
            </div>

            {/* Main Contact Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              
              {/* Contact Info Cards */}
              <div className="lg:col-span-1 space-y-6 fade-in-up stagger-3">
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl hover-lift transition-smooth border border-white/50">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 pulse-glow">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Visit Us</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Dehradun, Uttarakhand<br />
                    India
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    Beautiful locations across the city
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl hover-lift transition-smooth border border-white/50">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Call Us</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    +91 9997997266
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    Available 10 AM - 8 PM
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl hover-lift transition-smooth border border-white/50">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Email Us</h3>
                  <p className="text-gray-600 text-lg leading-relaxed break-all">
                    dehradunhangouts@gmail.com
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    We will respond within 24 hours
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2 fade-in-up stagger-4">
                <div className="bg-white/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">
                      Send us a <span className="gradient-text">message</span>
                    </h2>
                    
                    {isSubmitted ? (
                      <div className="text-center py-16">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h3>
                        <p className="text-gray-600 text-lg">
                          Thank you for reaching out. We will get back to you soon.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="full_name"
                              value={formData.full_name}
                              onChange={handleInputChange}
                              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 hover:border-gray-300"
                              placeholder="Enter your full name"
                              data-cursor="pointer"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email_address"
                              value={formData.email_address}
                              onChange={handleInputChange}
                              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 hover:border-gray-300"
                              placeholder="Enter your email address"
                              data-cursor="pointer"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">
                            Subject
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 hover:border-gray-300"
                            placeholder="What's this about?"
                            data-cursor="pointer"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">
                            Message *
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={6}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 hover:border-gray-300 resize-none"
                            placeholder="Tell us more about how we can help you..."
                            data-cursor="pointer"
                            required
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="group flex items-center px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            data-cursor="pointer"
                          >
                            <span className="mr-3">Send Message</span>
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

           {/* CTA Section */}
<div className="text-center mt-20 mb-12 fade-in-up stagger-5">
  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/90 to-yellow-600/90"></div>
    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
    <div className="relative z-10">
      <h3 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Join the Community?
      </h3>
      <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
        Do not just contact us - become part of something amazing. Join hundreds of people creating memories in Dehradun.
      </p>
      <Link href="/form">
        <button className="group flex items-center mx-auto px-8 py-4 bg-white text-yellow-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-cursor="pointer">
          <span className="mr-2">Join Community</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </Link>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default ContactPage;