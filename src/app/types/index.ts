// types/index.ts

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: unknown; // Allow additional properties
}

export interface UserData {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

// Auth related types
export interface AuthData {
  token: string;
  user: User;
  expirationTime: number | null;
}

// Event related types
export interface Event {
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

// Post related types
export interface Post {
  id: string;
  content: string;
  likes: number;
  isLiked: boolean;
  comments: number;
  shares: number;
  authorId: string;
  authorName?: string;
  timestamp: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Component prop types
export interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
  handleLogin: (userData: UserData) => void;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (userData: UserData) => boolean;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}