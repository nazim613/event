'use client';

import React, { useState } from 'react';
import { loginUser, registerUser } from '../../../api-service'; // Adjust path as needed
import type { 
  LoginModalProps, 
  UserData, 
  LoginCredentials, 
  RegisterCredentials 
} from '../types'; // Import from your types file

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess, handleLogin }) => {
  // State for login form inputs and errors
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // State to toggle between login and registration forms
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  // State for registration form specific inputs
  const [name, setName] = useState<string>('');

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let response: unknown;
      
      if (isRegistering) {
        // Handle user registration
        const registerData: RegisterCredentials = { name, email, password };
        response = await registerUser(registerData);
      } else {
        // Handle user login
        const loginData: LoginCredentials = { email, password };
        response = await loginUser(loginData);
      }
      
      // Type guard to check if response has the expected structure
      if (isUserData(response)) {
        handleLogin(response);
        onLoginSuccess();
      } else {
        console.error('Invalid response structure:', response);
        throw new Error(
          isRegistering 
            ? 'Registration failed - invalid response format' 
            : 'Login failed - invalid response format'
        );
      }
    } catch (err: unknown) {
      console.error('Authentication error:', err);
      let errorMessage: string;
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      } else {
        errorMessage = isRegistering 
          ? 'Registration failed. Please try again.' 
          : 'Login failed. Please check your credentials.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Type guard function to check if the response is valid UserData
  const isUserData = (data: unknown): data is UserData => {
    if (!data || typeof data !== 'object') {
      return false;
    }
    
    const obj = data as Record<string, unknown>;
    
    // Check if token exists and is a non-empty string
    if (typeof obj.token !== 'string' || obj.token.length === 0) {
      return false;
    }
    
    // Check if user object exists and has required properties
    if (!obj.user || typeof obj.user !== 'object' || obj.user === null) {
      return false;
    }
    
    const user = obj.user as Record<string, unknown>;
    
    // Check required user properties
    if (typeof user.id !== 'string' || 
        typeof user.name !== 'string' || 
        typeof user.email !== 'string') {
      return false;
    }
    
    return true;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">
          {isRegistering ? 'Create Your Account' : 'Login to Post'}
        </h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          {/* Conditionally render the Name field for registration */}
          {isRegistering && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
                disabled={isLoading}
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isRegistering ? 'Registering...' : 'Logging in...'}
                </>
              ) : (
                isRegistering ? 'Register' : 'Login'
              )}
            </button>
          </div>
        </form>
        
        {/* Toggle link to switch between forms */}
        <p className="mt-6 text-center text-sm text-gray-600">
          {isRegistering ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(false);
                  setError('');
                  setName('');
                }}
                className="text-blue-500 hover:text-blue-600 hover:underline focus:outline-none font-medium"
                disabled={isLoading}
              >
                Log in
              </button>
            </>
          ) : (
            <>
              Dont have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(true);
                  setError('');
                }}
                className="text-blue-500 hover:text-blue-600 hover:underline focus:outline-none font-medium"
                disabled={isLoading}
              >
                Sign up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginModal;