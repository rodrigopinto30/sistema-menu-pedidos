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
      setAuth: (user: User, token: string) => {
        Cookies.set('token', token, { expires: 7 });
        Cookies.set('user_role', user.role, { expires: 7 });
        set({ user, token });
      },
      logout: () => {
        Cookies.remove('token');
        Cookies.remove('user_role');
        set({ user: null, token: null });
      },
      updateUser: (updatedUser: User) => set({ user: updatedUser }),
    }),
    { name: 'auth-storage' }
  )
);