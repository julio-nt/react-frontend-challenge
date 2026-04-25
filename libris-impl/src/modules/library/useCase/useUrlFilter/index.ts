import { useNavigate, useSearch } from '@tanstack/react-router';
import type { SearchBookFilter } from '../useSearchBook/interface';

export function useUrlFilter() {
  const filters = useSearch({ from: '/private/' });
  const navigate = useNavigate({ from: '/' });

  function setFilters(newFilters: Partial<SearchBookFilter>) {
    navigate({
      search: (prev: SearchBookFilter) => {
        return { ...prev, ...newFilters };
      },
    });
  }

  return { filters, setFilters };
}
