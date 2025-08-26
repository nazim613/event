import { create } from 'zustand';

interface UserState {
  isLoggedIn: boolean;
  userName: string | null;
  token: string | null;
  login: (name: string, token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  userName: null,
  token: null,
  login: (name, token) => set({ isLoggedIn: true, userName: name, token }),
  logout: () => set({ isLoggedIn: false, userName: null, token: null }),
}));