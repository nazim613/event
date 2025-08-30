'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  Calendar,
  MapPin,
  Clock,
  Tag,
  ArrowRight,
  Search,
  Heart,
  AlertTriangle,
  UserPlus,
  Bookmark,
  BookmarkCheck,
  LogIn,
  BookmarkX,
  Trash2
} from 'lucide-react';

import Header from '../components/Header';
import CustomCursor from '../components/CustomCursor';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';

// Import your API service functions
import { getSavedEvents, unsaveEvent } from '../../../api-service';

// Define the interfaces
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

interface SavedEventFromAPI {
  id: string;
  eventId: number; // API returns eventId as a number
  userId: string;
  createdAt: string;
  updatedAt: string;
  event?: Event; // This might not be populated by the API
}

interface SavedEvent {
  id: string;
  eventId: string;
  userId: string;
  savedAt: string;
  event: Event;
}

interface User {
  id: string;
  name: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

function SavedEventsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // State for saved events
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [removingEvents, setRemovingEvents] = useState<Set<string>>(new Set());
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // User state
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Helper function to safely process saved events data
  const processSavedEventsData = async (data: unknown): Promise<SavedEvent[]> => {
    console.log('Raw saved events data:', data);
    
    if (!data) {
      console.log('No data received');
      return [];
    }

    let savedEventsFromAPI: SavedEventFromAPI[] = [];

    // Extract the saved events array from API response
    if (Array.isArray(data)) {
      savedEventsFromAPI = data;
    } else if (typeof data === 'object' && data !== null) {
      const dataObj = data as Record<string, unknown>;
      if (dataObj.data && Array.isArray(dataObj.data)) {
        savedEventsFromAPI = dataObj.data;
      } else if (dataObj.savedEvents && Array.isArray(dataObj.savedEvents)) {
        savedEventsFromAPI = dataObj.savedEvents;
      } else if (dataObj.events && Array.isArray(dataObj.events)) {
        savedEventsFromAPI = dataObj.events;
      } else {
        console.error('Unexpected data structure:', typeof data, Object.keys(dataObj));
        return [];
      }
    } else {
      console.error('Unexpected data type:', typeof data);
      return [];
    }

    console.log('Extracted saved events array:', savedEventsFromAPI);

    // Transform the API data to match our expected interface
    const transformedEvents: SavedEvent[] = [];

    for (const savedEventFromAPI of savedEventsFromAPI) {
      try {
        // Check if the saved event has the event details already populated
        if (savedEventFromAPI.event) {
          // Event details are already included
          const transformedEvent: SavedEvent = {
            id: savedEventFromAPI.id,
            eventId: savedEventFromAPI.eventId.toString(),
            userId: savedEventFromAPI.userId,
            savedAt: savedEventFromAPI.createdAt,
            event: {
              ...savedEventFromAPI.event,
              id: savedEventFromAPI.event.id || savedEventFromAPI.eventId.toString()
            }
          };
          transformedEvents.push(transformedEvent);
        } else {
          // Need to fetch event details separately
          // For now, create a placeholder event structure
          console.warn(`Event details not populated for eventId: ${savedEventFromAPI.eventId}`);
          
          const placeholderEvent: SavedEvent = {
            id: savedEventFromAPI.id,
            eventId: savedEventFromAPI.eventId.toString(),
            userId: savedEventFromAPI.userId,
            savedAt: savedEventFromAPI.createdAt,
            event: {
              id: savedEventFromAPI.eventId.toString(),
              title: `Event ${savedEventFromAPI.eventId}`,
              description: 'Event details not available. Please check back later.',
              date: new Date().toISOString().split('T')[0], // Today's date as fallback
              time: '12:00 PM',
              location: 'Location TBD',
              category: 'General',
              price: 'Free',
              attendees: 0,
              maxAttendees: 100,
              hasLocation: true,
              hasGuests: false,
              highlights: []
            }
          };
          
          transformedEvents.push(placeholderEvent);
        }
      } catch (error) {
        console.error('Error processing saved event:', savedEventFromAPI, error);
      }
    }

    console.log('Transformed events:', transformedEvents);
    return transformedEvents;
  };

  // Check if user is logged in
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else {
      // If no user is logged in, show login modal
      setShowLoginModal(true);
      setLoading(false);
    }
  }, []);

  // Fetch saved events when user is available
  useEffect(() => {
    async function fetchSavedEvents() {
      if (user && token) {
        setLoading(true);
        setError(null); // Reset error state
        try {
          console.log('Fetching saved events for user:', user.id);
          const savedEventsData = await getSavedEvents(user.id, token);
          const processedData = await processSavedEventsData(savedEventsData);
          setSavedEvents(processedData);
          console.log('Successfully set saved events:', processedData.length, 'events');
        } catch (error) {
          console.error("Failed to fetch saved events:", error);
          setError("Failed to load saved events. Please try again.");
          setSavedEvents([]); // Ensure we set empty array on error
        } finally {
          setLoading(false);
        }
      }
    }
    fetchSavedEvents();
  }, [user, token]);

  const categories = ['all', 'Adventure', 'Social', 'Culture', 'Workshop', 'Food'] as const;

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

  const filterEvents = (events: SavedEvent[]): SavedEvent[] => {
    // Ensure events is always an array
    if (!Array.isArray(events)) {
      console.error("filterEvents was called with a non-array value:", events);
      return [];
    }
    return events.filter(savedEvent => {
      // Safely access the event property
      if (!savedEvent || !savedEvent.event) {
        console.warn("Invalid saved event structure:", savedEvent);
        return false;
      }
      
      const event = savedEvent.event;
      const matchesSearch = (event.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.location || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const today = new Date();
      const diffTime = date.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return 'today';
      if (diffDays === 1) return 'tomorrow';
      if (diffDays > 1 && diffDays <= 7) return date.toLocaleDateString('en-US', { weekday: 'long' });
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (error) {
      console.error('Invalid date string:', dateString, error);
      return 'Invalid date';
    }
  };

  const getDayOfWeek = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } catch (error) {
      console.error('Invalid date string:', dateString, error);
      return '';
    }
  };

  const groupEventsByDate = (events: SavedEvent[]): Record<string, SavedEvent[]> => {
    if (!Array.isArray(events)) {
      console.error("groupEventsByDate was called with a non-array value:", events);
      return {};
    }

    const grouped: Record<string, SavedEvent[]> = {};
    events.forEach(savedEvent => {
      if (savedEvent && savedEvent.event && savedEvent.event.date) {
        const dateKey = savedEvent.event.date;
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(savedEvent);
      } else {
        console.warn("Invalid saved event structure in groupEventsByDate:", savedEvent);
      }
    });
    return grouped;
  };

  const handleEventClick = (eventId: string) => {
    const numericId = parseInt(eventId, 10);
    if (isNaN(numericId)) {
      console.error('Invalid event ID:', eventId);
      return;
    }
    router.push(`/eventdetails/${numericId}`);
  };

  const handleRemoveEvent = async (eventId: string) => {
    if (!user || !token) return;

    setRemovingEvents(prev => new Set(prev).add(eventId));

    try {
      await unsaveEvent(eventId, user.id, token);
      setSavedEvents(prev => {
        if (!Array.isArray(prev)) {
          console.error("savedEvents is not an array when removing event");
          return [];
        }
        return prev.filter(savedEvent => savedEvent.event.id !== eventId);
      });
    } catch (error) {
      console.error('Failed to remove saved event:', error);
      alert('Failed to remove event. Please try again.');
    } finally {
      setRemovingEvents(prev => {
        const newSet = new Set(prev);
        newSet.delete(eventId);
        return newSet;
      });
    }
  };

  const handleLogin = async (userData: LoginResponse) => {
    try {
      if (userData && userData.user && userData.token) {
        setToken(userData.token);
        setUser({
          id: userData.user.id,
          name: userData.user.name,
        });

        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify({
          id: userData.user.id,
          name: userData.user.name,
        }));

        // Fetch saved events after login
        setLoading(true);
        setError(null); // Reset error state
        try {
          console.log('Fetching saved events after login for user:', userData.user.id);
          const savedEventsData = await getSavedEvents(userData.user.id, userData.token);
          const processedData = await processSavedEventsData(savedEventsData);
          setSavedEvents(processedData);
          console.log('Successfully set saved events after login:', processedData.length, 'events');
        } catch (savedEventsErr) {
          console.error('Failed to fetch saved events after login:', savedEventsErr);
          setError("Failed to load saved events. Please try again.");
          setSavedEvents([]); // Ensure we set empty array on error
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // Safely filter events and group them
  const filteredEvents = filterEvents(savedEvents);
  const groupedEvents = groupEventsByDate(filteredEvents);

  // Show login modal if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
        <Header />
        <CustomCursor />

        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="w-24 h-24 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-12 h-12 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Access Your Saved Events</h2>
          <p className="text-gray-600 mb-8 text-center max-w-md">
            Please log in to view and manage your saved events.
          </p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <LogIn className="w-5 h-5 mr-2 inline" />
            Log In
          </button>
        </div>

        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLoginSuccess={() => setShowLoginModal(false)}
            handleLogin={handleLogin}
          />
        )}

        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 font-sans antialiased px-4">
        <svg className="animate-spin h-10 w-10 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-xl font-semibold text-center">Loading your saved events...</p>
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
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      <Header />
      <CustomCursor />

      {/* CSS Animations matching events page */}
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
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-4 md:right-20 w-48 md:w-72 h-48 md:h-72 bg-gradient-to-r from-yellow-300/20 to-amber-300/15 rounded-full blur-3xl subtle-pulse"></div>
          <div className="absolute bottom-20 left-4 md:left-20 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-blue-300/15 to-amber-400/15 rounded-full blur-3xl subtle-pulse stagger-2"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 md:w-80 h-60 md:h-80 bg-gradient-to-r from-yellow-300/15 to-blue-300/15 rounded-full blur-3xl subtle-pulse stagger-3"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-full text-sm text-yellow-600 mb-6 scale-in">
              <Bookmark className="w-4 h-4 mr-2" />
              Your Saved Events
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 fade-in-up leading-tight">
              My <span className="gradient-text">Saved Events</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed fade-in-up stagger-2 px-4">
              Keep track of all the amazing events you have bookmarked. Never miss out on experiences that matter to you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Saved Events</h2>
              <p className="text-gray-600 mt-2">
                {savedEvents.length} event{savedEvents.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 fade-in-up stagger-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search saved events..."
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
                  {events.map((savedEvent, eventIndex) => {
                    const event = savedEvent.event;
                    return (
                      <div key={savedEvent.id} className={`relative group scale-in stagger-${eventIndex + 2}`}>
                        {/* Timeline connector - Hidden on mobile */}
                        <div className="absolute -left-14 top-8 w-3 h-px bg-gray-300 hidden md:block"></div>

                        {/* Event Card */}
                        <div className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl p-4 md:p-6 transition-smooth cursor-pointer hover-lift shadow-sm hover:shadow-lg">
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

                            <div className="flex items-center gap-2">
                              {/* Remove Button - Mobile */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveEvent(event.id);
                                }}
                                disabled={removingEvents.has(event.id)}
                                className={`p-2 rounded-lg transition-all duration-300 shadow-sm border bg-red-50 text-red-600 hover:bg-red-100 border-red-200 hover:border-red-300 ${
                                  removingEvents.has(event.id) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
                                }`}
                                title="Remove from saved events"
                              >
                                {removingEvents.has(event.id) ? (
                                  <div className="w-4 h-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
                                ) : (
                                  <BookmarkX className="w-4 h-4" />
                                )}
                              </button>

                              {/* Event Image - Mobile */}
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
                          </div>

                          {/* Event Content */}
                          <div onClick={() => handleEventClick(event.id)}>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-tight">
                              {event.title}
                            </h3>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span>{event.time}</span>
                              </div>
<div className="flex items-center gap-1">
                                <Tag className="w-4 h-4 text-gray-400" />
                                <span className={getCategoryColor(event.category)}>{event.category}</span>
                              </div>
                            </div>

                            <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
                              {event.description}
                            </p>
                          </div>

                          {/* Action Buttons - Full width on mobile, side by side on desktop */}
                          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
                            {/* View More Button */}
                            <button
                              onClick={() => handleEventClick(event.id)}
                              className="flex-1 sm:flex-none px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] border border-gray-600"
                            >
                              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                <ArrowRight className="w-3 h-3" />
                              </div>
                              <span>View Details</span>
                            </button>

                            {/* Register Button */}
                            <button className="flex-1 sm:flex-none px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg hover-glow">
                              <UserPlus className="w-4 h-4" />
                              <span>Register</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Timeline End */}
            {savedEvents.length > 0 && (
              <div className="flex items-center gap-3 md:gap-6 fade-in-up stagger-4">
                <div className="relative hidden md:block">
                  <div className="w-4 h-4 bg-gray-300 rounded-full border-4 border-white shadow-lg relative z-10"></div>
                </div>
                <span className="text-sm text-gray-500">End of saved events</span>
              </div>
            )}
          </div>

          {/* Empty State */}
          {savedEvents.length === 0 && (
            <div className="text-center py-20 fade-in-up">
              <div className="w-24 h-24 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">No saved events yet</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto px-4">
                Start exploring events and save the ones you are interested in. They will appear here for easy access.
              </p>
              <Link href="/events">
                <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-xl hover:shadow-lg transition-smooth hover-glow">
                  Browse Events
                </button>
              </Link>
            </div>
          )}

          {/* Filtered Empty State */}
          {savedEvents.length > 0 && filteredEvents.length === 0 && (
            <div className="text-center py-20 fade-in-up">
              <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">No matching events found</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto px-4">
                We could not find any saved events matching your search criteria. Try adjusting your filters or search terms.
              </p>
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 md:top-20 left-10 md:left-20 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full blur-3xl subtle-pulse"></div>
          <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-60 md:w-80 h-60 md:h-80 bg-white/5 rounded-full blur-3xl subtle-pulse stagger-2"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-yellow-100 mb-8 scale-in">
            <Heart className="w-4 h-4 mr-2 text-yellow-200" />
            Discover More Events
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white fade-in-up leading-tight">
            Ready to Explore
            <span className="block text-yellow-100">More Events?</span>
          </h2>

          <p className="text-lg md:text-xl text-yellow-100 mb-10 max-w-2xl mx-auto leading-relaxed fade-in-up stagger-2 px-4">
            Do not miss out on amazing experiences. Browse our full collection of events and find your next adventure.
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

      {/* LoginModal Component */}
      {showLoginModal && (
        <LoginModal
          onClose={() => {
            setShowLoginModal(false);
            router.push('/events');
          }}
          onLoginSuccess={() => setShowLoginModal(false)}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default SavedEventsPage;