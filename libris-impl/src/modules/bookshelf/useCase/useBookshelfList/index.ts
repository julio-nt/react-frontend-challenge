import { QueryKeys } from '@core/query/interface';
import { useQuery } from '@tanstack/react-query';
import type { BookshelfListRequest } from './interface';
import { useBookshelfStore } from '@shared/store/bookshelf';
import type { BookshelfListFilters } from '../useUrlFilter/interface';
import type { Bookshelf } from '@shared/store/bookshelf/interface';
import type { Book } from '@modules/library/model/Book';

export function useBookshelfList({ skip, filters }: BookshelfListRequest) {
  const query = useQuery({
    queryKey: [QueryKeys.BOOKSHELF_LIST, filters],
    enabled: !skip,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const { bookshelf } = useBookshelfStore.getState();

        const response = handleFiltering(bookshelf, filters || {});

        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Erro ao buscar estantes: ${errorMessage}`);
      }
    },
  });

  return { data: query.data || [], isLoading: query.isPending, error: query.error };
}

function handleFiltering(data: Bookshelf, filters: BookshelfListFilters) {
  const { name, author, publisher, status, maxResults, orderBy } = filters;

  const source: Book[] = status ? data[status] : Object.values(data).flat();

  let filteredResult: Book[] = source;

  if (name) {
    filteredResult = filteredResult.filter((b) =>
      b.volumeInfo?.title?.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (author) {
    filteredResult = filteredResult.filter((b) =>
      b.volumeInfo?.authors?.some((a) => a.toLowerCase().includes(author.toLowerCase()))
    );
  }

  if (publisher) {
    filteredResult = filteredResult.filter((b) =>
      b.volumeInfo?.publisher?.toLowerCase().includes(publisher.toLowerCase())
    );
  }

  if (orderBy) {
    filteredResult = filteredResult.sort((a, b) =>
      (a.volumeInfo?.[orderBy] || '').localeCompare(b.volumeInfo?.[orderBy] || '')
    );
  }

  const filtered = filteredResult.slice(0, maxResults || filteredResult.length);

  return filtered.sort((a, b) =>
    (a.volumeInfo?.title || '').localeCompare(b.volumeInfo?.title || '')
  );
}
