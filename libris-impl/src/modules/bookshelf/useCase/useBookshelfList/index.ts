import { QueryKeys } from '@core/query/interface';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import type { BookshelfListRequest } from './interface';
import { useBookshelfStore } from '@shared/store/bookshelf';
import type { Book } from '@modules/library/model/Book';
import { handleFiltering } from './helpers';

const PAGE_SIZE = 10;

export function useBookshelfList({ skip, filters }: BookshelfListRequest) {
  const query = useInfiniteQuery<Book[], Error, InfiniteData<Book[]>, unknown[], number>({
    queryKey: [QueryKeys.BOOKSHELF_LIST, filters],
    enabled: !skip,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce((acc, page) => acc + page.length, 0);
      if (lastPage.length < (filters?.maxResults || PAGE_SIZE)) return undefined;
      return loadedCount;
    },
    queryFn: async ({ pageParam }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const { bookshelf } = useBookshelfStore.getState();

        const allFiltered = handleFiltering(bookshelf, filters || {});

        return allFiltered.slice(pageParam, pageParam + (filters?.maxResults || PAGE_SIZE));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Erro ao buscar estantes: ${errorMessage}`);
      }
    },
  });

  const data = query.data?.pages.flat() ?? [];

  return {
    data,
    isLoading: query.isPending,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  };
}
