import { useBookshelfStore } from '@shared/store/bookshelf';
import { useMutation } from '@tanstack/react-query';
import type { RemoveBookRequest } from './interface';
import Query from '@core/query';
import { QueryKeys } from '@core/query/interface';
import type { Book } from '@modules/library/model/Book';

export function useRemoveBook() {
  const mutation = useMutation({
    mutationFn: async ({ bookId, status }: RemoveBookRequest) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      useBookshelfStore.getState().remove({ bookId, status });

      const chachedBookshelfList = Query.getData([QueryKeys.BOOKSHELF_LIST]);

      if (!chachedBookshelfList) {
        console.warn('Não foi possível encontrar dados para atualização de cache:', bookId);
        return;
      }

      Query.setData<Book[]>([QueryKeys.BOOKSHELF_LIST], (prev) => {
        if (!prev) return prev;
        return prev.filter((book) => book.id !== bookId);
      });
    },
  });

  return { mutate: mutation.mutate, isLoading: mutation.isPending, error: mutation.error };
}
