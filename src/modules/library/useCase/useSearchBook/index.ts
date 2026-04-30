import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import type { SearchBookRequest, SearchBookResponse } from './interface';
import HttpBookApi from '@core/http';
import { QueryKeys } from '@core/query/interface';
import { adapter } from './adapter';
import type { PaginatedBook } from '@modules/book/model/Book';
import { searchParamsToQuery } from './helpers';
import { env } from '@shared/util/env';
import { useMemo } from 'react';

export function useSearchBook({ skip, filters }: SearchBookRequest) {
  const query = useInfiniteQuery<
    PaginatedBook | null,
    Error,
    InfiniteData<PaginatedBook | null>,
    unknown[],
    number
  >({
    queryKey: [QueryKeys.SEARCH_BOOK_LIST, filters],
    enabled: !skip,
    refetchOnWindowFocus: false,
    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return undefined;
      const loadedCount = allPages.reduce((acc, page) => acc + (page?.items?.length ?? 0), 0);
      if (loadedCount >= lastPage.totalItems) return undefined;
      return loadedCount;
    },

    queryFn: async ({ pageParam }) => {
      const url = `${env.GOOGLE_BOOKS_API_URL}/volumes`;
      const params = new URLSearchParams();

      const newParams = searchParamsToQuery(params, filters);

      params.append('startIndex', pageParam.toString());

      if (!newParams?.toString()) return null;

      const response = await HttpBookApi.get<SearchBookResponse>(url, newParams);

      const adaptedItems = response.items?.map((item) => {
        const book = adapter(item);
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

  const allItems = useMemo(
    () => query.data?.pages.flatMap((page) => page?.items ?? []) ?? [],
    [query.data?.pages]
  );
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
    error: query.isError,
  };
}
