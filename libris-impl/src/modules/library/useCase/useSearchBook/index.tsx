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

      params.append('maxResults', filters.maxResults?.toString() || '30');
      params.append('printType', filters.printType || 'all');
      params.append('orderBy', filters.orderBy || 'relevance');
      params.append('startIndex', filters.startIndex?.toString() || '0');

      params.append('q', fullTextSearch);

      if (filters.intitle) params.append('intitle', filters.intitle);
      if (filters.inauthor) params.append('inauthor', filters.inauthor);
      if (filters.inpublisher) params.append('inpublisher', filters.inpublisher);

      const response = await HttpBookApi.get<SearchBookResponse>(url, params);

      return response;
    },
  });

  const currentPage = filters?.startIndex
    ? Math.floor(filters.startIndex / (filters.maxResults || 30)) + 1
    : 1;

  const pagination = {
    totalItems: query.data?.totalItems || 0,
    itemsPerPage: filters?.maxResults || 30,
    currentPage,
  };

  return {
    data: query.data,
    isLoading: query.isLoading,
    isReloading: query.isRefetching,
    refetch: query.refetch,
    pagination,
  };
}

function searchParamsToQuery(params: SearchBookRequest['filters']) {
  let extraParams = params?.q || '';

  if (params?.intitle) extraParams += `+intitle:${params.intitle}`;
  if (params?.inauthor) extraParams += `+inauthor:${params.inauthor}`;
  if (params?.inpublisher) extraParams += `+inpublisher:${params.inpublisher}`;

  return `${extraParams}`;
}
