import { QueryKeys } from '@core/query/interface';
import { useQuery } from '@tanstack/react-query';
import type { BookshelfListRequest } from './interface';
import { useBookshelfStore } from '@modules/bookshelf/store/bookshelf';

export function useBookshelfList({ skip }: BookshelfListRequest) {
  const { bookshelf } = useBookshelfStore.getState();

  const query = useQuery({
    queryKey: [QueryKeys.BOOKSHELF_LIST],
    enabled: !skip,
    queryFn: async () => {
      try {
        const allBooks = Object.values(bookshelf).flat();

        const orderedBooks = allBooks.sort((a, b) => {
          const titleA = a.volumeInfo?.title || '';
          const titleB = b.volumeInfo?.title || '';

          return titleA.localeCompare(titleB);
        });

        return orderedBooks;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Erro ao buscar estantes: ${errorMessage}`);
      }
    },
  });

  return { data: query.data || [], isLoading: query.isPending, error: query.error };
}
