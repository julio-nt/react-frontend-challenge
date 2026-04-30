import type { BookStatus } from '@modules/book/model/BookStatus';

export interface BookshelfListFilters {
  name?: string;
  status?: BookStatus | '';
  author?: string;
  publisher?: string;
  sortBy?: 'title' | 'publishedDate' | 'status';
  maxResults?: number;
}
