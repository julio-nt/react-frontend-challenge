import { useNavigate, useSearch } from '@tanstack/react-router';
import type { BookshelfListFilters } from './interface';
import { useEffect } from 'react';
import { useSearchBookshelfStore } from '@shared/store/search-bookshelf';

export function useUrlFilter() {
  const { filters: globalFilter } = useSearchBookshelfStore();

  const filters = useSearch({ from: '/private/estantes' });
  const navigate = useNavigate({ from: '/estantes' });

  function setFilters() {
    if (!globalFilter) return;

    navigate({
      search: (prev: BookshelfListFilters) => {
        return { ...prev, ...globalFilter };
      },
    });
  }

  useEffect(() => {
    setFilters();
  }, [globalFilter]);

  return { filters, setFilters };
}
