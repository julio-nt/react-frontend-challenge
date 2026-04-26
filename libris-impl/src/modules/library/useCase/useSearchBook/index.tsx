import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import type { SearchBookRequest, SearchBookResponse } from './interface';
import HttpBookApi from '@core/http';
import { QueryKeys } from '@core/query/interface';
import { adapter } from './adapter';
import type { PaginatedBook } from '@modules/library/model/Book';

const PAGE_SIZE = 20;

export function useSearchBook({ skip, filters }: SearchBookRequest) {
  const query = useInfiniteQuery<
    PaginatedBook | null,
    Error,
    InfiniteData<PaginatedBook | null>,
    unknown[],
    number
  >({
    queryKey: [QueryKeys.SEARCH_BOOK_LIST, filters],
    enabled: !skip && !!filters?.q,
    refetchOnWindowFocus: false,
    retry: false,
    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return undefined;
      const loadedCount = allPages.reduce((acc, page) => acc + (page?.items?.length ?? 0), 0);
      if (loadedCount >= lastPage.totalItems) return undefined;
      return loadedCount;
    },

    queryFn: async ({ pageParam }) => {
      if (!filters?.q) return null;

      const url = 'https://www.googleapis.com/books/v1/volumes';
      const params = new URLSearchParams();
      const fullTextSearch = searchParamsToQuery(filters);

      params.append('maxResults', filters.maxResults?.toString() ?? String(PAGE_SIZE));
      params.append('printType', filters.printType ?? 'all');
      params.append('orderBy', filters.orderBy ?? 'relevance');
      params.append('projection', 'full');
      params.append('startIndex', String(pageParam));
      params.append('q', fullTextSearch);

      if (filters.intitle) params.append('intitle', filters.intitle);
      if (filters.inauthor) params.append('inauthor', filters.inauthor);
      if (filters.inpublisher) params.append('inpublisher', filters.inpublisher);

      const response = await HttpBookApi.get<SearchBookResponse>(url, params);

      const adaptedItems = response.items?.map((item) => {
        const { book } = adapter(item);
        return book;
      });

      const adaptedResponse: PaginatedBook = {
        kind: response.kind,
        totalItems: response.totalItems,
        items: adaptedItems ?? [],
      };

      return adaptedResponse;
    },
  });

  const allItems = query.data?.pages.flatMap((page) => page?.items ?? []) ?? [];
  const totalItems = query.data?.pages[0]?.totalItems ?? 0;

  const pagination = {
    totalItems,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
  };

  return {
    data: allItems,
    isLoading: query.isLoading,
    pagination,
  };
}

function searchParamsToQuery(params: SearchBookRequest['filters']) {
  let extraParams = params?.q || '';

  if (params?.intitle) extraParams += `+intitle:${params.intitle}`;
  if (params?.inauthor) extraParams += `+inauthor:${params.inauthor}`;
  if (params?.inpublisher) extraParams += `+inpublisher:${params.inpublisher}`;

  return `${extraParams}`;
}
