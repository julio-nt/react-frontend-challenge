import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SearchBookFilter } from '../useCase/useSearchBook/interface';

interface SearchStore {
  filters: SearchBookFilter | undefined;
  saveSearch: (filters: SearchBookFilter) => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => {
      function saveSearch(filters: SearchBookFilter) {
        set({ filters });
      }

      return { filters: undefined, saveSearch };
    },
    { name: 'search-store' }
  )
);
