import { useQuery } from '@tanstack/react-query';
import type { SearchBookRequest, SearchBookResponse } from './interface';
import HttpBookApi from '@core/http';

export function useSearchBook({ skip, filters }: SearchBookRequest) {
  const query = useQuery({
    queryKey: ['search-book', filters],
    enabled: !skip && !!filters,
    refetchOnWindowFocus: false,
    retry: false,
    queryFn: async () => {
      if (!filters?.q) return null;

      const url = 'https://www.googleapis.com/books/v1/volumes';

      const params = new URLSearchParams();

      const fullTextSearch = searchParamsToQuery(filters);

      
      params.append('maxResults', '30');
      params.append('printType', 'books');
      // params.append('projection', 'lite');

      params.append('q', fullTextSearch);

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
    isLoading: query.isPending,
    isReloading: query.isRefetching,
    refetch: query.refetch,
  };
}

function searchParamsToQuery(params: SearchBookRequest['filters']) {
  let extraParams = params?.q || '';

  if (params?.intitle) extraParams += `+intitle:${params.intitle}`;
  if (params?.inauthor) extraParams += `+inauthor:${params.inauthor}`;
  if (params?.inpublisher) extraParams += `+inpublisher:${params.inpublisher}`;
  if (params?.subject) extraParams += `+subject:${params.subject}`;
  if (params?.isbn) extraParams += `+isbn:${params.isbn}`;
  if (params?.lccn) extraParams += `+lccn:${params.lccn}`;
  if (params?.oclc) extraParams += `+oclc:${params.oclc}`;

  return `${extraParams}`;
}
