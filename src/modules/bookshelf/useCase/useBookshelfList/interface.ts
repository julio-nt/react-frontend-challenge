import type { Book } from '@modules/book/model/Book';
import type { BookshelfListFilters } from '../useUrlFilter/interface';
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';

export interface BookshelfListRequest {
  skip?: boolean;
  filters?: BookshelfListFilters;
}

export interface BookshelfListResponse {
  data: {
    books: Book[]
    totalItems: number;
  };
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<Book[], unknown>, Error>>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}
