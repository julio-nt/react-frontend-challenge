import type { BookshelfListFilters } from '@modules/bookshelf/useCase/useUrlFilter/interface';

export interface SearchBookshelfStore {
  filters: BookshelfListFilters | undefined;
  saveSearchBookshelf: (filters: BookshelfListFilters) => void;
}
