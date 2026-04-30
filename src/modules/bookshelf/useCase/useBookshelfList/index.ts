import { QueryKeys } from '@core/query/interface';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import type { BookshelfListRequest } from './interface';
import { useBookshelfStore } from '@shared/store/bookshelf';
import type { Book } from '@modules/book/model/Book';
import { handleFiltering } from './helpers';

const PAGE_SIZE = 10;

export function useBookshelfList({ skip, filters }: BookshelfListRequest) {
  const query = useInfiniteQuery<
    { data: Book[]; totalItems: number },
    Error,
    InfiniteData<{ data: Book[]; totalItems: number }>,
    unknown[],
    number
  >({
    queryKey: [QueryKeys.BOOKSHELF_LIST, filters],
    enabled: !skip,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce((acc, page) => acc + page.data.length, 0);
      if (lastPage.data.length < (filters?.maxResults || PAGE_SIZE)) return undefined;
      return loadedCount;
    },
    queryFn: async ({ pageParam }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const { bookshelf } = useBookshelfStore.getState();

        const allFiltered = handleFiltering(bookshelf, filters || {});

        const paginatedData = allFiltered.slice(
          pageParam,
          pageParam + (filters?.maxResults || PAGE_SIZE)
        );

        return {
          data: paginatedData,
          totalItems: allFiltered.length,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Erro ao buscar estantes: ${errorMessage}`);
      }
    },
  });

  const data = query.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    data,
    totalItems: query.data?.pages[0].totalItems ?? 0,
    isLoading: query.isPending,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isRefetching: query.isRefetching,
  };
}
