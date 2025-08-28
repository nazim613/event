'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import CustomCursor from '../components/CustomCursor';
import { getEvents, getCommunityPosts, createCommunityPost, togglePostLike } from '../../../api-service';
import {
  Home,
  Users,
  Calendar,
  User,
  MessageCircle,
  Heart,
  Share2,
  Plus,
  Bell,
  Search,
  MoreHorizontal,
  Bookmark,
  UserPlus,
  MapPin,
  Clock,
  AlertTriangle,
  Image as ImageIcon // Renamed to avoid conflict with interface
} from 'lucide-react';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';

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

interface Post {
  id: string;
  content: string;
  likes: number;
  isLiked: boolean;
  comments: number;
  shares: number;
  authorId: string;
  authorName?: string;
  timestamp: string;
  postImageUrl?: string; // Added for image posts
}

interface User {
  id: string;
  name: string;
  email?: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

const CommunityPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [activeTab, setActiveTab] = useState('Home');
  const [newPost, setNewPost] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null); // New state for image file
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // New state for image preview
  const [eventsTab, setEventsTab] = useState('upcoming');
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);

  // New useEffect to check for user in localStorage on component mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    const userToken = localStorage.getItem('token');
    if (user && userToken) {
      const userData: User = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(userData.name);
      setUserId(userData.id);
      setToken(userToken);
    }
  }, []);

  const login = (userData: LoginResponse) => {
    setIsLoggedIn(true);
    setUserName(userData.user.name);
    setUserId(userData.user.id);
    setToken(userData.token);
    // Persist login data in localStorage
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserId('');
    setToken('');
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const getAuthorDetails = (authorId: string) => {
    if (isLoggedIn && authorId === userId) {
      return {
        name: userName,
        avatar: '/api/placeholder/40/40',
        role: 'Community Member'
      };
    }
    return {
      name: 'Community Member',
      avatar: '/api/placeholder/40/40',
      role: 'Member'
    };
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreviewUrl(null);
    }
  };

  const handlePostSubmit = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (newPost.trim() || imageFile) {
      try {
        // --- UPDATED LOGIC ---
        // Pass the image file directly to the createCommunityPost function
        const newPostData = await createCommunityPost({
          content: newPost,
          authorId: userId,
          imageFile: imageFile, // Pass the image file here
          token: token
        });

        setPosts(prevPosts => [newPostData as Post, ...prevPosts]);
        setNewPost('');
        setImageFile(null);
        setImagePreviewUrl(null);
      } catch (error) {
        console.error('Failed to create post:', error);
      }
    }
  };

  const toggleLike = async (postId: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    try {
      const postToUpdate = posts.find(post => post.id === postId);
      if (!postToUpdate) return;
      const newIsLikedStatus = !postToUpdate.isLiked;

      setPosts(posts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: newIsLikedStatus,
              likes: newIsLikedStatus ? post.likes + 1 : post.likes - 1
            }
          : post
      ));

      await togglePostLike(postId, newIsLikedStatus, token);

    } catch (error) {
      console.error('Failed to toggle like:', error);
      setPosts(posts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      ));
    }
  };

  useEffect(() => {
    const fetchEventsFromApi = async () => {
      try {
        setEventsLoading(true);
        const eventsData = await getEvents();
        setAllEvents(eventsData as Event[]);
        setEventsError(null);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setEventsError("Failed to load events. Please try again.");
        setAllEvents([
          { id: '1', title: 'Morning Hike', description: 'Join us for an early morning adventure through the scenic trails', date: '2025-08-26', time: '6:00 AM', location: 'Robber\'s Cave', category: 'Adventure', price: 'Free', attendees: 12, maxAttendees: 20, hasLocation: true, hasGuests: true, highlights: ['Nature', 'Exercise', 'Photography'] },
          { id: '2', title: 'Coffee & Connect', description: 'Casual meetup over coffee to discuss upcoming plans', date: '2025-08-27', time: '4:00 PM', location: 'Café Ivy', category: 'Social', price: '₹200', attendees: 8, maxAttendees: 15, hasLocation: true, hasGuests: true, highlights: ['Networking', 'Coffee', 'Planning'] },
          { id: '3', title: 'Photography Walk', description: 'Capture the beauty of Dehradun with fellow photography enthusiasts', date: '2025-08-28', time: '5:30 PM', location: 'Mindrolling Monastery', category: 'Creative', price: 'Free', attendees: 15, maxAttendees: 25, hasLocation: true, hasGuests: true, highlights: ['Photography', 'Culture', 'Sunset'] },
          { id: '4', title: 'Sunset Trek', description: 'Amazing sunset views from the hills', date: '2025-08-20', time: '5:00 PM', location: 'Mussoorie Hills', category: 'Adventure', price: '₹300', attendees: 20, maxAttendees: 25, hasLocation: true, hasGuests: true, rating: 4.8, highlights: ['Trekking', 'Sunset', 'Hills'] },
          { id: '5', title: 'Book Club Meetup', description: 'Monthly book discussion session', date: '2025-08-18', time: '3:00 PM', location: 'Central Library', category: 'Social', price: 'Free', attendees: 10, maxAttendees: 12, hasLocation: true, hasGuests: true, rating: 4.5, highlights: ['Books', 'Discussion', 'Learning'] }
        ]);
      } finally {
        setEventsLoading(false);
      }
    };
    fetchEventsFromApi();
  }, []);

  useEffect(() => {
    const fetchPostsFromApi = async () => {
      try {
        setPostsLoading(true);
        const postsData = await getCommunityPosts();
        setPosts(postsData as Post[]);
        setPostsError(null);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setPostsError("Failed to load posts. Please try again.");
      } finally {
        setPostsLoading(false);
      }
    };
    fetchPostsFromApi();
  }, []);

  const now = new Date();
  const upcomingEvents = allEvents.filter(event => new Date(event.date) >= now);
  const pastEvents = allEvents.filter(event => new Date(event.date) < now);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 1 && diffDays <= 7) return date.toLocaleDateString('en-US', { weekday: 'long' });
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CustomCursor />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                {isLoggedIn ? (
                  <>
                    <h3 className="font-bold text-gray-900 text-lg">{userName}</h3>
                    <p className="text-gray-500 text-sm">Community Member</p>
                    <button
                      onClick={logout}
                      className="mt-4 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="font-bold text-gray-900 text-lg">Your Name</h3>
                    <p className="text-gray-500 text-sm">Community Explorer</p>
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="mt-4 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 text-sm border-b border-gray-100 pb-2">Shortcuts</h4>
                <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-yellow-50 rounded-lg transition-colors text-sm">
                  My Posts
                </button>
                <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-yellow-50 rounded-lg transition-colors text-sm">
                  Saved Events
                </button>
                <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-yellow-50 rounded-lg transition-colors text-sm">
                  My Groups
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 mt-15">
            {/* Create Post */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <input
                  type="text"
                  placeholder={isLoggedIn ? "What's on your mind?" : "Login to post..."}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="flex-1 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all"
                  disabled={!isLoggedIn}
                />
              </div>
              {imagePreviewUrl && (
                <div className="mb-4 relative">
                  <img src={imagePreviewUrl} alt="Image Preview" className="max-w-full h-auto rounded-lg" />
                  <button
                    onClick={() => { setImagePreviewUrl(null); setImageFile(null); }}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                  >
                    &times;
                  </button>
                </div>
              )}
              <div className="flex justify-between items-center mt-4">
                <label className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                  isLoggedIn ? 'text-blue-500 hover:bg-blue-50' : 'text-gray-400 cursor-not-allowed'
                }`}>
                  <ImageIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={!isLoggedIn}
                  />
                </label>
                <button
                  onClick={handlePostSubmit}
                  className={`px-6 py-2 text-white font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 ${
                    isLoggedIn ? 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:shadow-lg' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!isLoggedIn}
                >
                  Post
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {postsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                </div>
              ) : postsError ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-400" />
                  <p className="text-sm text-red-600">{postsError}</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Be the first to post!</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    {/* Post Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{getAuthorDetails(post.authorId).name}</h4>
                            <p className="text-gray-500 text-sm">{post.timestamp ? new Date(post.timestamp).toLocaleString() : 'Just now'}</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                          <MoreHorizontal className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="px-6 pb-4">
                      <p className="text-gray-800 leading-relaxed">{post.content}</p>
                      {post.postImageUrl && (
                        <div className="mt-4">
                          <img src={post.postImageUrl} alt="Post Image" className="max-w-full h-auto rounded-lg" />
                        </div>
                      )}
                    </div>

                    {/* Post Actions */}
                    <div className="px-6 py-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <button
                            onClick={() => toggleLike(post.id)}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                                post.isLiked
                                    ? 'text-red-500 bg-red-50 hover:bg-red-100'
                                    : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                            }`}
                          >
                            <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">{post.likes}</span>
                          </button>

                          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.comments}</span>
                          </button>

                          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-500 hover:text-green-500 hover:bg-green-50 transition-colors">
                            <Share2 className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.shares}</span>
                          </button>
                        </div>

                        <button className="p-2 text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors">
                          <Bookmark className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            {/* Events Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-yellow-500" />
                  Events
                </h3>
              </div>

              {/* Events Tabs */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setEventsTab('upcoming')}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    eventsTab === 'upcoming'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setEventsTab('past')}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    eventsTab === 'past'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Past Events
                </button>
              </div>

              {/* Events List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {eventsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                  </div>
                ) : eventsError ? (
                  <div className="text-center py-8">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-400" />
                    <p className="text-sm text-red-600">{eventsError}</p>
                  </div>
                ) : (
                  (eventsTab === 'upcoming' ? upcomingEvents : pastEvents).map((event) => (
                    <div key={event.id} className={`p-4 rounded-xl cursor-pointer transition-colors ${
                      eventsTab === 'upcoming'
                        ? 'bg-yellow-50 hover:bg-yellow-100 border border-yellow-200'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm">{event.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          event.category === 'Adventure' ? 'bg-green-100 text-green-700' :
                            event.category === 'Social' ? 'bg-blue-100 text-blue-700' :
                              event.category === 'Creative' ? 'bg-purple-100 text-purple-700' :
                                event.category === 'Culture' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-gray-100 text-gray-700'
                        }`}>
                          {event.category}
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{event.description}</p>

                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-gray-600">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center text-gray-600">
                            <Users className="w-3 h-3 mr-1" />
                            <span>{event.attendees} attendees</span>
                          </div>
                          <span className="font-semibold text-green-600">{event.price}</span>
                        </div>
                        {eventsTab === 'past' && event.rating && (
                          <div className="flex items-center text-xs text-yellow-600">
                            <span className="mr-1">⭐</span>
                            <span>{event.rating}/5</span>
                          </div>
                        )}
                      </div>

                      {eventsTab === 'upcoming' && (
                        <Link href="/events" as={`/events`} passHref legacyBehavior>
                          <button className="w-full mt-3 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-medium rounded-lg hover:shadow-md transition-all duration-200">
                            View Event
                          </button>
                        </Link>
                      )}
                    </div>
                  ))
                )}

                {!eventsLoading && !eventsError && (eventsTab === 'upcoming' ? upcomingEvents : pastEvents).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No {eventsTab} events</p>
                  </div>
                )}
              </div>
              <Link href="/form">
                <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Join Community
                </button>
              </Link>
            </div>


          </div>
        </div>
      </div>
      <Footer />
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => setShowLoginModal(false)}
          handleLogin={login}
        />
      )}
    </div>
  );
};

export default CommunityPage;