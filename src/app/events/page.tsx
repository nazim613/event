'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Tag, 
  ArrowRight,
  Filter,
  Search,
  Heart,
  Share2,
  Ticket,
  Star,
  Mail,
  Phone,
  Sparkles,
  Target,
  Award,
  Play,
  CheckCircle,
  Globe,
  Mic,
  Gift,
  Zap,
  Camera,
  Music,
  AlertTriangle,
  UserPlus
} from 'lucide-react';

import Header from '../components/Header';
import CustomCursor from '../components/CustomCursor';
import Footer from '../components/Footer';

// Import your API service function
import { getEvents } from '../../../api-service';

// Define the Event interface
interface Event {
  id: string;
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

function EventsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // New state variables for events and API status
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    async function fetchEventsFromApi() {
      try {
        const eventsData = await getEvents();
        // Type assertion to tell TypeScript that eventsData matches our Event interface
        setAllEvents(eventsData as Event[]);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchEventsFromApi();
  }, []); // The empty array ensures this runs only once

  // Separate events into upcoming and past based on the fetched data
  const now = new Date();
  const upcomingEvents = allEvents.filter(event => new Date(event.date) >= now);
  const pastEvents = allEvents.filter(event => new Date(event.date) < now);

  const categories = ['all', 'Adventure', 'Social', 'Culture', 'Workshop', 'Food'] as const;

  const getColorClasses = (color: string): string => {
    const colors: Record<string, string> = {
      Adventure: 'from-yellow-400 to-amber-500',
      Social: 'from-blue-500 to-blue-700',
      Culture: 'from-yellow-400 to-blue-600',
      Workshop: 'from-blue-600 to-blue-800',
      Food: 'from-yellow-500 to-amber-500',
    };
    return colors[color] || 'from-yellow-400 to-amber-500';
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      Adventure: 'text-yellow-500',
      Social: 'text-blue-500',
      Culture: 'text-purple-500',
      Workshop: 'text-green-500',
      Food: 'text-orange-500',
    };
    return colors[category] || 'text-gray-500';
  };

  const filterEvents = (events: Event[]): Event[] => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'tomorrow';
    if (diffDays > 1 && diffDays <= 7) return date.toLocaleDateString('en-US', { weekday: 'long' });
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const groupEventsByDate = (events: Event[]): Record<string, Event[]> => {
    const grouped: Record<string, Event[]> = {};
    events.forEach(event => {
      const dateKey = event.date;
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
    return grouped;
  };

  const eventsToDisplay = activeTab === 'upcoming' ? upcomingEvents : pastEvents;
  const filteredEvents = filterEvents(eventsToDisplay);
  const groupedEvents = groupEventsByDate(filteredEvents);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 font-sans antialiased px-4">
        <svg className="animate-spin h-10 w-10 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-xl font-semibold text-center">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 font-sans antialiased px-4">
        <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        <p className="mt-4 text-2xl font-bold text-red-600 text-center">{error}</p>
        <p className="text-gray-500 mt-2 text-center">Could not connect to the server.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      <Header />
      <CustomCursor />

      {/* CSS Animations matching homepage */}
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-white overflow-hidden">
        {/* Subtle background elements matching homepage */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-4 md:right-20 w-48 md:w-72 h-48 md:h-72 bg-gradient-to-r from-yellow-300/20 to-amber-300/15 rounded-full blur-3xl subtle-pulse"></div>
          <div className="absolute bottom-20 left-4 md:left-20 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-blue-300/15 to-amber-400/15 rounded-full blur-3xl subtle-pulse stagger-2"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 md:w-80 h-60 md:h-80 bg-gradient-to-r from-yellow-300/15 to-blue-300/15 rounded-full blur-3xl subtle-pulse stagger-3"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-full text-sm text-yellow-600 mb-6 scale-in">
              <Calendar className="w-4 h-4 mr-2" />
              Community Events
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 fade-in-up leading-tight">
              Upcoming & Past <span className="gradient-text">Events</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed fade-in-up stagger-2 px-4">
              Join our vibrant community events designed to foster meaningful connections and create lasting memories in Dehradun
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Events</h2>
            
            {/* Tab Navigation */}
            <div className="flex bg-white rounded-xl shadow-lg border border-gray-200 p-1 scale-in w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 sm:px-6 py-3 rounded-lg font-semibold transition-smooth flex-1 sm:flex-none text-sm sm:text-base ${
                  activeTab === 'upcoming'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-4 sm:px-6 py-3 rounded-lg font-semibold transition-smooth flex-1 sm:flex-none text-sm sm:text-base ${
                  activeTab === 'past'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Past
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 fade-in-up stagger-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-smooth bg-white shadow-sm text-sm md:text-base"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-smooth bg-white shadow-sm w-full sm:min-w-48 sm:w-auto text-sm md:text-base"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Timeline Events */}
          <div className="relative">
            {/* Vertical Timeline Line - Hidden on mobile, visible on md+ */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gray-300 hidden md:block"></div>

            {Object.entries(groupedEvents).map(([date, events], dateIndex) => (
              <div key={date} className="mb-8">
                {/* Date Header */}
                <div className="flex items-center gap-3 md:gap-6 mb-6 fade-in-left stagger-1">
                  <div className="relative hidden md:block">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full border-4 border-white shadow-lg relative z-10"></div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-base md:text-lg font-semibold text-gray-900">{formatDate(date)}</span>
                    <span className="text-sm text-gray-500">{getDayOfWeek(date)}</span>
                  </div>
                </div>

                {/* Events for this date */}
                <div className="md:ml-16 space-y-4">
                  {events.map((event, eventIndex) => (
                    <div key={event.id} className={`relative group scale-in stagger-${eventIndex + 2}`}>
                      {/* Timeline connector - Hidden on mobile */}
                      <div className="absolute -left-14 top-8 w-3 h-px bg-gray-300 hidden md:block"></div>
                      
                      {/* Event Card */}
                      <div 
                        className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl p-4 md:p-6 transition-smooth cursor-pointer hover-lift shadow-sm hover:shadow-lg"
                        onClick={() => setSelectedEvent(event)}
                      >
                        {/* Mobile Header with Image and Time */}
                        <div className="flex items-start justify-between mb-4 lg:hidden">
                          <div className="flex items-center gap-3">
                            <span className="text-base font-mono text-gray-600 font-semibold">
                              {event.time}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${getCategoryColor(event.category)} bg-current`}></span>
                            </div>
                          </div>
                          
                          {/* Event Image - Mobile positioned at top right */}
                          {event.imageUrl ? (
                            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                              <Image
                                src={event.imageUrl}
                                alt={event.title}
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                              <div 
                                className="w-full h-full flex items-center justify-center text-xs font-bold text-white leading-tight text-center"
                                style={{
                                  background: 'linear-gradient(135deg, #facc15, #f59e0b, #3b82f6, #facc15)',
                                  backgroundSize: '400% 400%',
                                  animation: 'gradientShift 3s ease infinite'
                                }}
                              >
                                JOIN<br />ME AT<br />PARTY
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            {/* Title - Mobile version without time */}
                            <div className="lg:flex lg:flex-col lg:sm:flex-row lg:sm:items-center lg:gap-2 lg:sm:gap-4 mb-3">
                              <span className="hidden lg:block text-base md:text-lg font-mono text-gray-600 font-semibold">
                                {event.time}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className={`hidden lg:block w-2 h-2 rounded-full ${getCategoryColor(event.category)} bg-current`}></span>
                                <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                                  {event.title}
                                </h3>
                              </div>
                            </div>
                            
                            {/* Description */}
                            <p className="text-gray-600 mb-4 lg:sm:ml-20 text-sm leading-relaxed">
                              {event.description}
                            </p>
                            
                            {/* Status and Info */}
                            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm lg:sm:ml-20">
                              {!event.hasLocation ? (
                                <div className="flex items-center gap-1 text-yellow-500">
                                  <AlertTriangle className="w-4 h-4" />
                                  <span className="font-medium">Location Missing</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 text-gray-500">
                                  <MapPin className="w-4 h-4" />
                                  <span className="truncate max-w-32 sm:max-w-none">{event.location}</span>
                                </div>
                              )}
                              
                              {!event.hasGuests ? (
                                <div className="flex items-center gap-1 text-gray-500">
                                  <Users className="w-4 h-4" />
                                  <span>No guests</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 text-gray-500">
                                  <Users className="w-4 h-4" />
                                  <span className="whitespace-nowrap">{event.attendees} of {event.maxAttendees} joined</span>
                                </div>
                              )}
                              
                              <div className="text-green-600 font-bold">
                                {event.price}
                              </div>
                              
                              {activeTab === 'past' && event.rating && (
                                <div className="flex items-center gap-1 text-yellow-500">
                                  <Star className="w-4 h-4 fill-current" />
                                  <span className="font-medium">{event.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Desktop Event Image and Actions */}
                          <div className="hidden lg:flex flex-col items-center gap-4 ml-6">
                            {/* Event Image - Desktop */}
                            {event.imageUrl ? (
                              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                                <Image
                                  src={event.imageUrl}
                                  alt={event.title}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                                <div 
                                  className="w-full h-full flex items-center justify-center text-xs font-bold text-white leading-tight text-center"
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

                        {/* Action Button - Full width on mobile, positioned at bottom */}
                        <div className="mt-4 lg:hidden">
                          {activeTab === 'upcoming' ? (
                            <button className="w-full px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] border border-gray-600">
                              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                <ArrowRight className="w-3 h-3" />
                              </div>
                              <span>Manage Event</span>
                            </button>
                          ) : (
                            <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg hover-glow">
                              <span>View Highlights</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Desktop Action Button */}
                        <div className="hidden lg:flex justify-end mt-4">
                          {activeTab === 'upcoming' ? (
                            <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-[1.02] border border-gray-600">
                              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                <ArrowRight className="w-3 h-3" />
                              </div>
                              <span>Manage</span>
                            </button>
                          ) : (
                            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shadow-lg hover-glow">
                              <span>View Highlights</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Timeline End */}
            <div className="flex items-center gap-3 md:gap-6 fade-in-up stagger-4">
              <div className="relative hidden md:block">
                <div className="w-4 h-4 bg-gray-300 rounded-full border-4 border-white shadow-lg relative z-10"></div>
              </div>
              <span className="text-sm text-gray-500">End of timeline</span>
            </div>
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-20 fade-in-up">
              <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">No events found</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto px-4">We could not find any events matching your search criteria. Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-xl hover:shadow-lg transition-smooth hover-glow"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section matching homepage */}
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
            Ready to Make New 
            <span className="block text-yellow-100">Connections?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-yellow-100 mb-10 max-w-2xl mx-auto leading-relaxed fade-in-up stagger-2 px-4">
            Do not miss out on amazing experiences. Join our community and be part of unforgettable adventures in Dehradun.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up stagger-3">
            <Link href="/form">
              <button className="bg-white text-yellow-600 font-semibold px-6 md:px-8 py-4 rounded-xl hover:shadow-lg transition-smooth hover-lift flex items-center justify-center w-full sm:w-auto">
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </button>
            </Link>
            
            <button className="border-2 border-white/30 text-white font-semibold px-6 md:px-8 py-4 rounded-xl transition-smooth hover:bg-white/10 hover:border-white/50 backdrop-blur-sm w-full sm:w-auto">
              Browse Past Events
            </button>
          </div>
        </div>
      </section>
      
      <Footer />

      {/* Event Details Slide-out Panel */}
      {selectedEvent && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setSelectedEvent(null)}
          />
          
          {/* Slide-out Panel */}
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 transform transition-transform shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800">
                <div className="text-gray-400 text-sm">
                  
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <span className="text-gray-400 text-lg">×</span>
                </button>
              </div>

              {/* Event Image */}
              <div className="relative h-48 flex-shrink-0">
                <div 
                  className="w-full h-full flex items-center justify-center text-white font-bold text-lg"
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24)',
                    backgroundSize: '400% 400%',
                    animation: 'gradientShift 3s ease infinite'
                  }}
                >
                  JOIN<br />ME AT<br />THE<br />PARTY
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 text-white">
                {/* Event Type */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span className="text-pink-400 text-sm font-medium">Private Event</span>
                </div>

                {/* Event Title */}
                <h1 className="text-xl md:text-2xl font-bold mb-4 text-black/50">{selectedEvent.title}</h1>

                {/* Host Info */}
                <div className="flex items-center gap-3 mb-6">
                  
                  <span className="text-black/50 text-sm md:text-base">Hosted by </span>
                </div>

                {/* Date and Time */}
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <div className="text-center">
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      {new Date(selectedEvent.date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-white mb-1">
                      {new Date(selectedEvent.date).getDate()}
                    </div>
                    <div className="text-sm text-gray-300">
                      {new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="text-sm text-gray-300 mt-2">
                      {selectedEvent.time} - {selectedEvent.time === '21:00' ? '22:00' : '17:00'}
                    </div>
                  </div>
                </div>

                {/* Registration Button */}
                <button className="w-full bg-gray-700 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold mb-6 transition-colors">
                  Registration
                </button>

                {/* Event Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base md:text-lg text-black/70 font-semibold mb-2">Description</h3>
                    <p className="text-black/50 leading-relaxed text-sm md:text-base">{selectedEvent.description}</p>
                  </div>

                  <div>
                    <h3 className="text-base md:text-lg text-black/70 font-semibold mb-2">Location</h3>
                    <p className="text-black/50 text-sm md:text-base">{selectedEvent.location || 'Location to be announced'}</p>
                  </div>

                  <div>
                    <h3 className="text-base md:text-lg text-black/70 font-semibold mb-2">Attendees</h3>
                    <p className="text-black/50 text-sm md:text-base">{selectedEvent.attendees} of {selectedEvent.maxAttendees} joined</p>
                  </div>

                  <div>
                    <h3 className="text-base md:text-lg text-black/70 font-semibold mb-2">Price</h3>
                    <p className="text-green-400 font-bold text-lg">{selectedEvent.price}</p>
                  </div>

                  <div>
                    <h3 className="text-base md:text-lg text-black/70 font-semibold mb-2">Category</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${selectedEvent.category === 'Adventure' ? 'bg-black/20 text-black' : selectedEvent.category === 'Social' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'}`}>
                      {selectedEvent.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-2">Highlights</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.highlights.map((highlight, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedEvent.rating && (
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-2">Rating</h3>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 font-semibold">{selectedEvent.rating}</span>
                      </div>
                    </div>
                  )}

                  {selectedEvent.feedback && (
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-2">Feedback</h3>
                      <p className="text-gray-300 italic text-sm md:text-base">{selectedEvent.feedback}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EventsPage;