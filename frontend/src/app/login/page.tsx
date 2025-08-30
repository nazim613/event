// app/login/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from '../components/LoginModal';

// Define the user data interface to match your auth system
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserData {
  user: User;
  token: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { user, loading, login, isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState<boolean>(true);

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [user, loading, router, isAuthenticated]);

  const handleClose = (): void => {
    setShowModal(false);
    router.back();
  };

  const handleLoginSuccess = (): void => {
    setShowModal(false);
    router.push('/community');
  };

  const handleLogin = async (userData: UserData): Promise<void> => {
    try {
      const success = login(userData);
      if (success) {
        console.log('User logged in successfully');
      } else {
        throw new Error('Failed to store authentication data');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (maybe show a toast notification)
    }
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't show login if user is already authenticated
  if (isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Already Logged In</h1>
          <p className="text-gray-600 mb-4">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  if (!showModal) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Login Cancelled</h1>
          <p className="text-gray-600 mb-4">You can return to login anytime.</p>
          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Open Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <LoginModal 
        onClose={handleClose}
        onLoginSuccess={handleLoginSuccess}
        handleLogin={handleLogin}
      />
    </div>
  );
};

export default LoginPage;