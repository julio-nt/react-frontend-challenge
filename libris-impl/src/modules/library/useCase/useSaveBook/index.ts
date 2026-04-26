import { useBookshelfStore } from '@modules/library/store/bookshelf';
import { useMutation } from '@tanstack/react-query';
import type { SaveBookRequest } from './interface';

export function useSaveBook() {
  const mutation = useMutation({
    mutationFn: async ({ book, status }: SaveBookRequest) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      useBookshelfStore.getState().save({ book, status });
    },
  });

  return { mutate: mutation.mutate, isLoading: mutation.isPending, error: mutation.error };
}
