import { useBookshelfStore } from '@modules/library/store/bookshelf';
import { useMutation } from '@tanstack/react-query';
import type { RemoveBookRequest } from './interface';

export function useRemoveBook() {
  const mutation = useMutation({
    mutationFn: async ({ bookId, status }: RemoveBookRequest) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      useBookshelfStore.getState().remove({ bookId, status });
    },
  });

  return { mutate: mutation.mutate, isLoading: mutation.isPending, error: mutation.error };
}
