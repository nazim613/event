// contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  getAuthData, 
  storeAuthData, 
  clearAuthData, 
  setupAutoLogout,
  User,
  UserData
} from '../utils/auth';

// Define the context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (userData: UserData) => boolean;
  logout: () => void;
  isAuthenticated: () => boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Props type for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const authData = getAuthData();
        if (authData) {
          setUser(authData.user);
          setToken(authData.token);
          
          // Set up automatic logout
          setupAutoLogout(() => {
            logout();
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData: UserData): boolean => {
    try {
      const success = storeAuthData(userData);
      if (success) {
        setUser(userData.user);
        setToken(userData.token);
        
        // Set up automatic logout for this session
        setupAutoLogout(() => {
          logout();
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = (): void => {
    try {
      clearAuthData();
      setUser(null);
      setToken(null);
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const isAuthenticated = (): boolean => {
    return user !== null && token !== null;
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};