import { create } from 'zustand';
import type { SearchBookFilter } from '../../../modules/library/useCase/useSearchBook/interface';
import type { SearchStore } from './interface';

export const useSearchStore = create<SearchStore>()((set) => {
  function saveSearch(filters: SearchBookFilter) {
    set({ filters });
  }

  return { filters: undefined, saveSearch };
});
