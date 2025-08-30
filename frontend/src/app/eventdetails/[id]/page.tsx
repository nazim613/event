'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Tag, 
  ArrowLeft,
  Star,
  Heart,
  Share2,
  UserPlus,
  AlertTriangle,
  Globe,
  Mail,
  Phone,
  CheckCircle
} from 'lucide-react';

import Header from '../../components/Header';
import CustomCursor from '../../components/CustomCursor';
import Footer from '../../components/Footer';

// Import your API service function
import { getEvents } from '../../../../api-service';

interface Event {
  id: number; // Changed from string to number
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: string;
  attendees: number;
  maxAttendees: number;
  hasLocation: boolean;
  hasGuests: boolean;
  imageUrl?: string;
  rating?: number;
  feedback?: string;
  highlights: string[];
}

function EventDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string; // eventId is a string from the URL

  // State for managing event data
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch event data
  useEffect(() => {
    async function fetchEvent() {
      // Check if eventId is available
      if (!eventId) {
        setLoading(false);
        setError("Event ID is missing.");
        return;
      }

      // Convert the string ID from the URL to a number
      const idAsNumber = parseInt(eventId, 10);
      
      // Handle cases where the ID is not a valid number
      if (isNaN(idAsNumber)) {
        setLoading(false);
        setError("Invalid event ID format.");
        return;
      }
      
      try {
        console.log('Fetching event with ID:', idAsNumber);
        const events = await getEvents();
        
        // Type assertion to tell TypeScript that events is an array of Event objects
        const typedEvents = events as Event[];
        
        // The find method will now work correctly with number types
        const foundEvent = typedEvents.find((e: Event) => e.id === idAsNumber);
        
        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          setError('Event not found');
        }
      } catch (err) {
        console.error('Failed to fetch event:', err);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      Adventure: 'text-yellow-500 bg-yellow-50 border-yellow-200',
      Social: 'text-blue-500 bg-blue-50 border-blue-200',
      Culture: 'text-purple-500 bg-purple-50 border-purple-200',
      Workshop: 'text-green-500 bg-green-50 border-green-200',
      Food: 'text-orange-500 bg-orange-50 border-orange-200',
    };
    return colors[category] || 'text-gray-500 bg-gray-50 border-gray-200';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDateDetails = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' })
    };
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
        <Header />
        <CustomCursor />
        <div className="flex items-center justify-center min-h-[60vh] pt-32">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-yellow-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xl font-semibold text-gray-700">Loading event details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Only calculate these values after we have the event data
  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
        <Header />
        <CustomCursor />
        <div className="flex items-center justify-center min-h-[60vh] pt-32">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Event not found'}
            </h1>
            <p className="text-gray-600 mb-8">The event you are looking for does not exist or has been removed.</p>
            <Link href="/events">
              <button className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition-colors font-semibold">
                Back to Events
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Main component logic (only runs when event exists)
  const dateDetails = getDateDetails(event.date);
  const isPastEvent = new Date(event.date) < new Date();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      <Header />
      <CustomCursor />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes subtileFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.02); opacity: 0.95; }
        }
        
        .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .fade-in-left { animation: fadeInLeft 0.8s ease-out forwards; }
        .scale-in { animation: scaleIn 0.6s ease-out forwards; }
        
        .gradient-text {
          background: linear-gradient(45deg, #facc15, #f59e0b, #3b82f6, #facc15);
          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 4s ease-in-out infinite;
        }
        
        .subtle-float { animation: subtileFloat 3s ease-in-out infinite; }
        .subtle-pulse { animation: subtlePulse 2s ease-in-out infinite; }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .hover-scale:hover { transform: scale(1.05); }
        .hover-glow:hover { box-shadow: 0 10px 30px rgba(251, 191, 36, 0.3); }
        
        .transition-smooth { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}</style>

      {/* Hero Section with Event Image */}
      <section className="relative pt-32 pb-20 bg-white overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-4 md:right-20 w-48 md:w-72 h-48 md:h-72 bg-gradient-to-r from-yellow-300/20 to-amber-300/15 rounded-full blur-3xl subtle-pulse"></div>
          <div className="absolute bottom-20 left-4 md:left-20 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-blue-300/15 to-amber-400/15 rounded-full blur-3xl subtle-pulse stagger-2"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          {/* Back Button */}
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-smooth mb-8 shadow-sm fade-in-left"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Events</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Event Info */}
            <div className="fade-in-up">
              {/* Category Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border mb-6 ${getCategoryColor(event.category)}`}>
                <Tag className="w-4 h-4" />
                {event.category}
              </div>

              {/* Event Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {event.title}
              </h1>

              {/* Event Status */}
              <div className="flex items-center gap-4 mb-8">
                {isPastEvent ? (
                  <div className="flex items-center gap-2 text-blue-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Event Completed</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">Upcoming Event</span>
                  </div>
                )}
                
                {event.rating && isPastEvent && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">{event.rating}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {event.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-xl font-semibold transition-colors shadow-lg hover-glow flex items-center justify-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  {isPastEvent ? 'View Results' : 'Register Now'}
                </button>
                
                <button className="px-8 py-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share Event
                </button>
              </div>
            </div>

            {/* Right Column - Event Image */}
            <div className="fade-in-up stagger-2">
              <div className="relative">
                {event.imageUrl ? (
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <div 
                      className="w-full h-full flex items-center justify-center text-white font-bold text-2xl"
                      style={{
                        background: 'linear-gradient(135deg, #facc15, #f59e0b, #3b82f6, #facc15)',
                        backgroundSize: '400% 400%',
                        animation: 'gradientShift 3s ease infinite'
                      }}
                    >
                      JOIN<br />ME AT<br />THE<br />PARTY
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Date & Time Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center hover-lift transition-smooth fade-in-up">
                <div className="text-6xl font-bold text-gray-900 mb-2">
                  {dateDetails.day}
                </div>
                <div className="text-yellow-500 font-bold text-lg mb-4">
                  {dateDetails.month}
                </div>
                <div className="text-gray-600 text-lg mb-6">
                  {dateDetails.weekday}
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-center gap-2 text-gray-700">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold text-lg">{event.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Columns - Event Information */}
            <div className="lg:col-span-2 space-y-8">
              {/* Location & Attendees */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover-lift transition-smooth fade-in-up stagger-1">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <MapPin className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">Location</h3>
                      {event.hasLocation ? (
                        <p className="text-gray-600">{event.location}</p>
                      ) : (
                        <div className="flex items-center gap-2 text-yellow-500">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="font-medium">To be announced</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover-lift transition-smooth fade-in-up stagger-2">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-50 rounded-xl">
                      <Users className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">Attendees</h3>
                      {event.hasGuests ? (
                        <p className="text-gray-600">
                          <span className="font-semibold text-green-600">{event.attendees}</span> of {event.maxAttendees} joined
                        </p>
                      ) : (
                        <p className="text-gray-500">No guests yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover-lift transition-smooth fade-in-up stagger-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-50 rounded-xl">
                      <Tag className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">Price</h3>
                      <p className="text-2xl font-bold text-green-600">{event.price}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              {event.highlights && event.highlights.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover-lift transition-smooth fade-in-up stagger-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">Event Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.highlights.map((highlight, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback Section (for past events) */}
              {isPastEvent && event.feedback && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover-lift transition-smooth fade-in-up stagger-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">Event Feedback</h3>
                  <p className="text-gray-600 italic leading-relaxed">{event.feedback}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 md:top-20 left-10 md:left-20 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full blur-3xl subtle-pulse"></div>
          <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-60 md:w-80 h-60 md:h-80 bg-white/5 rounded-full blur-3xl subtle-pulse stagger-2"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-yellow-100 mb-8 scale-in">
            <Heart className="w-4 h-4 mr-2 text-yellow-200" />
            Join Our Community
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white fade-in-up leading-tight">
            Do not Miss Out on
            <span className="block text-yellow-100">Future Events</span>
          </h2>
          
          <p className="text-lg md:text-xl text-yellow-100 mb-10 max-w-2xl mx-auto leading-relaxed fade-in-up stagger-2 px-4">
            Stay updated with our latest events and be the first to know about exciting opportunities in your area.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up stagger-3">
            <Link href="/events">
              <button className="bg-white text-yellow-600 font-semibold px-6 md:px-8 py-4 rounded-xl hover:shadow-lg transition-smooth hover-lift flex items-center justify-center w-full sm:w-auto">
                <Calendar className="w-5 h-5 mr-2" />
                Browse All Events
              </button>
            </Link>
            
            <Link href="/form">
              <button className="border-2 border-white/30 text-white font-semibold px-6 md:px-8 py-4 rounded-xl transition-smooth hover:bg-white/10 hover:border-white/50 backdrop-blur-sm w-full sm:w-auto">
                Join Community
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default EventDetailsPage;