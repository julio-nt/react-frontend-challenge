import type { User } from '@modules/account/model/User';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RegisterStore } from './interface';

export const useRegisterStore = create<RegisterStore>()(
  persist(
    (set) => {
      const userList: User[] = [];

      function register(user: User) {
        set((state) => ({ userList: [...state.userList, user] }));

        return { ok: true };
      }

      return { userList, register };
    },
    { name: 'register-store' }
  )
);
