import { QueryKeys } from '@core/query/interface';
import { useQuery } from '@tanstack/react-query';
import type { BookshelfListRequest } from './interface';
import { useBookshelfStore } from '@modules/bookshelf/store/bookshelf';

export function useBookshelfList({ skip, filters }: BookshelfListRequest) {
  const query = useQuery({
    queryKey: [QueryKeys.BOOKSHELF_LIST, filters],
    enabled: !skip,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const { bookshelf } = useBookshelfStore.getState();

        const source = filters?.status ? bookshelf[filters.status] : Object.values(bookshelf).flat();

        const filtered = filters?.name
          ? source.filter((b) =>
              b.volumeInfo?.title?.toLowerCase().includes(filters.name!.toLowerCase())
            )
          : source;

        return filtered.sort((a, b) =>
          (a.volumeInfo?.title || '').localeCompare(b.volumeInfo?.title || '')
        );
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Erro ao buscar estantes: ${errorMessage}`);
      }
    },
  });

  return { data: query.data || [], isLoading: query.isPending, error: query.error };
}
