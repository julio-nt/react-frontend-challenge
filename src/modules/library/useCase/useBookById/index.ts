import HttpBookApi from '@core/http';
import { useQuery } from '@tanstack/react-query';
import { adapter } from '../useSearchBook/adapter';
import type { BookApi } from '@modules/book/model/BookApi';
import { QueryKeys } from '@core/query/interface';
import { env } from '@shared/util/env';

export function useBookById({ bookId }: { bookId: string | undefined }) {
  const query = useQuery({
    queryKey: [QueryKeys.BOOK_BY_ID, bookId],
    enabled: !!bookId,
    retry: false,
    queryFn: async () => {
      const url = `${env.GOOGLE_BOOKS_API_URL}/volumes`;

      const response = await HttpBookApi.get<BookApi>(`${url}/${bookId}`);

      const adaptedResponse = adapter(response);

      return adaptedResponse;
    },
  });

  return { data: query.data, isLoading: query.isPending, error: query.error };
}
