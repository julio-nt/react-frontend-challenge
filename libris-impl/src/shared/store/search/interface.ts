import type { SearchBookFilter } from '@modules/library/useCase/useSearchBook/interface';

export interface SearchStore {
  filters: SearchBookFilter | undefined;
  saveSearch: (filters: SearchBookFilter) => void;
}
