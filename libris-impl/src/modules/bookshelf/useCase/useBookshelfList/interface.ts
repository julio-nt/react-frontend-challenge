import type { BookshelfListFilters } from '../useUrlFilter/interface';

export interface BookshelfListRequest {
  skip?: boolean;
  filters?: BookshelfListFilters;
}
