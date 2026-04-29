import { useNavigate, useSearch } from '@tanstack/react-router';
import type { SearchBookFilter } from '../useSearchBook/interface';
import { useSearchStore } from '@shared/store/search';
import { useEffect } from 'react';

export function useUrlFilter() {
  const { filters: globalFilter } = useSearchStore();

  const filters = useSearch({ from: '/private/' });
  const navigate = useNavigate({ from: '/' });

  function setFilters() {
    if (!globalFilter) return;

    if (!globalFilter.q) {
      navigate({
        search: {
          maxResults: globalFilter.maxResults,
          orderBy: globalFilter.orderBy,
          printType: globalFilter.printType,
        },
      });
      return;
    }
    navigate({
      search: (prev: SearchBookFilter) => {
        return { ...prev, ...globalFilter };
      },
    });
  }

  useEffect(() => {
    setFilters();
  }, [globalFilter]);

  return { filters, setFilters };
}
