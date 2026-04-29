import type { User } from '@modules/account/model/User';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthStore } from './interface';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => {
      function login(user: User) {
        set({ loggedUser: user });
      }

      function logout() {
        set({ loggedUser: null });
      }

      return { loggedUser: null, login, logout };
    },
    { name: 'auth-store' }
  )
);
