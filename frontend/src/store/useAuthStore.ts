import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie'; 

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set: any) => ({
      user: null,
      token: null,
      setAuth: (user: User, token:any) => {
        Cookies.set('token', token, { 
          expires: 7,
          path: '/',
          sameSite: 'lax' 
        });
        set({ user, token });
      },
      logout: () => {
        Cookies.remove('token');
        set({ user: null, token: null });
      },
    }),
    { name: 'auth-storage' }
  )
);