import type { SearchBookRequest } from './interface';

const PAGE_SIZE = 20;

export function searchParamsToQuery(
  params: URLSearchParams,
  filters: SearchBookRequest['filters']
) {
  if (!filters) return;

  let extraParams = filters.q;

  if (filters.intitle) extraParams += `+intitle:${filters.intitle}`;
  if (filters.inauthor) extraParams += `+inauthor:${filters.inauthor}`;
  if (filters.inpublisher) extraParams += `+inpublisher:${filters.inpublisher}`;

  params.append('q', extraParams);

  params.append('maxResults', filters.maxResults?.toString() ?? String(PAGE_SIZE));
  params.append('printType', filters.printType ?? 'all');
  params.append('orderBy', filters.orderBy ?? 'relevance');
  params.append('projection', 'full');

  console.log('Query params:', { extraParams, params: params.toString() });

  return params;
}
