import { useBookshelfStore } from '@shared/store/bookshelf';
import { useMutation } from '@tanstack/react-query';
import type { SaveBookRequest } from './interface';

export function useSaveBook() {
  const { save } = useBookshelfStore();

  const mutation = useMutation({
    mutationFn: async ({ book, status }: SaveBookRequest) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      save({ book, status });

      return true;
    },
  });

  return { mutate: mutation.mutate, isLoading: mutation.isPending, error: mutation.error };
}
