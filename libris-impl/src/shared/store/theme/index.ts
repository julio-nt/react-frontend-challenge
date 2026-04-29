import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => {
      function toggleTheme(theme: 'light' | 'dark') {
        set({ theme });
      }

      return { theme: 'light', toggleTheme };
    },
    { name: 'theme-store' }
  )
);
