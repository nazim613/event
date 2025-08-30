// utils/auth.ts

// Define types
export interface User {
  id: string;
  name: string;
  email: string;
  // Add specific optional properties that you might need
  avatar?: string;
  role?: string;
  createdAt?: string;
  lastLoginAt?: string;
  preferences?: Record<string, unknown>;
}

export interface UserData {
  user: User;
  token: string;
}

export interface AuthData {
  token: string;
  user: User;
  expirationTime: number | null;
}

export const AUTH_KEYS = {
  TOKEN: 'authToken',
  USER_DATA: 'userData',
  TOKEN_EXPIRATION: 'tokenExpiration'
} as const;

// Store authentication data
export const storeAuthData = (userData: UserData): boolean => {
  try {
    localStorage.setItem(AUTH_KEYS.TOKEN, userData.token);
    localStorage.setItem(AUTH_KEYS.USER_DATA, JSON.stringify(userData.user));
    
    // Set token expiration (24 hours from now)
    const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    localStorage.setItem(AUTH_KEYS.TOKEN_EXPIRATION, expirationTime.toString());
    
    return true;
  } catch (error) {
    console.error('Error storing auth data:', error);
    return false;
  }
};

// Get stored authentication data
export const getAuthData = (): AuthData | null => {
  try {
    const token = localStorage.getItem(AUTH_KEYS.TOKEN);
    const userData = localStorage.getItem(AUTH_KEYS.USER_DATA);
    const tokenExpiration = localStorage.getItem(AUTH_KEYS.TOKEN_EXPIRATION);
    
    if (!token || !userData) {
      return null;
    }
    
    // Check if token is expired
    if (tokenExpiration) {
      const expirationTime = parseInt(tokenExpiration);
      const currentTime = new Date().getTime();
      
      if (currentTime > expirationTime) {
        clearAuthData();
        return null;
      }
    }
    
    return {
      token,
      user: JSON.parse(userData) as User,
      expirationTime: tokenExpiration ? parseInt(tokenExpiration) : null
    };
  } catch (error) {
    console.error('Error getting auth data:', error);
    clearAuthData();
    return null;
  }
};

// Clear authentication data
export const clearAuthData = (): boolean => {
  try {
    localStorage.removeItem(AUTH_KEYS.TOKEN);
    localStorage.removeItem(AUTH_KEYS.USER_DATA);
    localStorage.removeItem(AUTH_KEYS.TOKEN_EXPIRATION);
    return true;
  } catch (error) {
    console.error('Error clearing auth data:', error);
    return false;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const authData = getAuthData();
  return authData !== null;
};

// Get current user
export const getCurrentUser = (): User | null => {
  const authData = getAuthData();
  return authData ? authData.user : null;
};

// Get auth token
export const getAuthToken = (): string | null => {
  const authData = getAuthData();
  return authData ? authData.token : null;
};

// Set up automatic logout when token expires
export const setupAutoLogout = (onLogout: () => void): void => {
  const authData = getAuthData();
  if (!authData || !authData.expirationTime) return;
  
  const timeUntilExpiration = authData.expirationTime - new Date().getTime();
  
  if (timeUntilExpiration > 0) {
    setTimeout(() => {
      clearAuthData();
      console.log('Session expired. Please login again.');
      if (onLogout) onLogout();
    }, timeUntilExpiration);
  }
};