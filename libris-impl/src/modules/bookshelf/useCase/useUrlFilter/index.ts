import { useNavigate, useSearch } from '@tanstack/react-router';
import type { BookshelfListFilters } from './interface';
import { useEffect } from 'react';
import { useSearchBookshelfStore } from '@shared/store/search-bookshelf';

export function useUrlFilter() {
  const { filters: globalFilter } = useSearchBookshelfStore();

  const filters = useSearch({ strict: false }) as Partial<BookshelfListFilters>;
  const navigate = useNavigate();

  function setFilters() {
    if (!globalFilter) return;

    navigate({
      to: '/estantes',
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
