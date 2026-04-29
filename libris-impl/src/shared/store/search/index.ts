import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SearchBookFilter } from '../../../modules/library/useCase/useSearchBook/interface';

interface SearchStore {
  filters: SearchBookFilter | undefined;
  saveSearch: (filters: SearchBookFilter) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => {
      function saveSearch(filters: SearchBookFilter) {
        set({ filters });
      }

      function clearSearch() {
        set({ filters: undefined });
      }

      return { filters: undefined, saveSearch, clearSearch };
    },
    { name: 'search-store' }
  )
);
