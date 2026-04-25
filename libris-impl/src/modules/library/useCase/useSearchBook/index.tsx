import { useQuery } from '@tanstack/react-query';
import type { SearchBookRequest, SearchBookResponse } from './interface';
import HttpBookApi from '@core/http';

export function useSearchBook({ skip, filters }: SearchBookRequest) {
  const query = useQuery({
    queryKey: ['search-book', filters],
    enabled: !skip && !!filters,
    retry: false,
    queryFn: async () => {
      if (!filters?.q) return null;

      const url = 'https://www.googleapis.com/books/v1/volumes';

      const params = new URLSearchParams();

      params.append('q', filters.q);
      params.append('projection', 'lite');

      if (filters.intitle) params.append('intitle', filters.intitle);
      if (filters.inauthor) params.append('inauthor', filters.inauthor);
      if (filters.inpublisher) params.append('inpublisher', filters.inpublisher);
      if (filters.subject) params.append('subject', filters.subject);
      if (filters.isbn) params.append('isbn', filters.isbn);
      if (filters.lccn) params.append('lccn', filters.lccn);
      if (filters.oclc) params.append('oclc', filters.oclc);

      const response = await HttpBookApi.get<SearchBookResponse>(url, params);

      return response;
    },
  });

  return {
    data: query.data,
    isLoading: query.isFetching,
    isReloading: query.isRefetching,
    refetch: query.refetch,
  };
}
