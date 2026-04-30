import { useBookshelfStore } from '@shared/store/bookshelf';
import { useMutation } from '@tanstack/react-query';
import type { SaveBookRequest } from './interface';
import { useLocation } from '@tanstack/react-router';
import Query from '@core/query';
import { QueryKeys, type SetDataQuery } from '@core/query/interface';
import type { Book } from '@modules/book/model/Book';
import { useUrlFilter } from '../useUrlFilter';

export function useSaveBook() {
  const { filters } = useUrlFilter();
  const { search } = useLocation();

  const { save } = useBookshelfStore();

  const mutation = useMutation({
    mutationFn: async ({ book, status }: SaveBookRequest) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      save({ book, status });

      const chachedBookshelfList = Query.getData([QueryKeys.BOOKSHELF_LIST, filters]);

      if (!chachedBookshelfList) {
        console.warn('Não foi possível encontrar dados para atualização de cache:', book.id);
        return;
      }

      if (search.status) {
        Query.setData<SetDataQuery<Book[]>>([QueryKeys.BOOKSHELF_LIST, filters], (prev) => {
          if (!prev) return prev;

          const updatedBooks = prev.pages[0].filter((b) => b.id !== book.id);

          return { ...prev, pages: [updatedBooks] };
        });
      }

      const newQueryFilterKey = {
        ...filters,
        status,
      };

      const updateNewQuery = Query.getData([QueryKeys.BOOKSHELF_LIST, newQueryFilterKey]);

      if (updateNewQuery) {
        Query.setData<SetDataQuery<Book[]>>(
          [QueryKeys.BOOKSHELF_LIST, newQueryFilterKey],
          (prev) => {
            if (!prev) return prev;
            const updatedBooks = [book, ...prev.pages[0]];

            return { ...prev, pages: [updatedBooks] };
          }
        );
      }
    },
  });

  return { mutate: mutation.mutate, isLoading: mutation.isPending, error: mutation.error };
}
