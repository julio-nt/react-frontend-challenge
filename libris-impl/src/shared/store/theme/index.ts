import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  theme: 'light' | 'dark';
  layout: 'list' | 'grid';
  toggleTheme: (theme: 'light' | 'dark') => void;
  toggleLayout: (layout: 'list' | 'grid') => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => {
      function toggleTheme(theme: 'light' | 'dark') {
        set({ theme });
      }

      function toggleLayout(layout: 'list' | 'grid') {
        set({ layout });
      }

      return { theme: 'light', layout: 'list', toggleTheme, toggleLayout };
    },
    { name: 'theme-store' }
  )
);
