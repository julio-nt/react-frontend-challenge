import { create } from 'zustand';
import type { SearchBookshelfStore } from './interface';
import type { BookshelfListFilters } from '@modules/bookshelf/useCase/useUrlFilter/interface';

export const useSearchBookshelfStore = create<SearchBookshelfStore>()((set) => {
  function saveSearchBookshelf(filters: BookshelfListFilters) {
    set({ filters });
  }

  return { filters: undefined, saveSearchBookshelf };
});
