import type { BookStatus } from '@modules/library/model/BookStatus';

export interface BookshelfListFilters {
  name?: string;
  status?: BookStatus;
}
