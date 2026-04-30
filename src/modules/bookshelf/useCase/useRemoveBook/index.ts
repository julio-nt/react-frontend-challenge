import { useBookshelfStore } from '@shared/store/bookshelf';
import { useMutation } from '@tanstack/react-query';
import type { RemoveBookRequest } from './interface';
import Query from '@core/query';
import { QueryKeys, type SetDataQuery } from '@core/query/interface';
import type { Book } from '@modules/book/model/Book';
import { useUrlFilter } from '../useUrlFilter';

export function useRemoveBook() {
  const { filters } = useUrlFilter();
  const { remove } = useBookshelfStore();

  const mutation = useMutation({
    mutationFn: async ({ bookId, status }: RemoveBookRequest) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      remove({ bookId, status });

      const chachedBookshelfList = Query.getData([QueryKeys.BOOKSHELF_LIST, filters]);

      if (!chachedBookshelfList) {
        console.warn('Não foi possível encontrar dados para atualização de cache:', bookId);
        return;
      }

      Query.setData<SetDataQuery<Book[]>>([QueryKeys.BOOKSHELF_LIST, filters], (prev) => {
        if (!prev) return prev;

        const updatedBooks = prev.pages[0].filter((book) => book.id !== bookId);

        return { ...prev, pages: [updatedBooks] };
      });
    },
  });

  return { mutate: mutation.mutate, isLoading: mutation.isPending, error: mutation.error };
}
