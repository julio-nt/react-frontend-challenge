import { useNavigate, useSearch } from '@tanstack/react-router';
import type { BookshelfListFilters } from './interface';

export function useUrlFilter() {
  const filters = useSearch({ from: '/private/estantes' });
  const navigate = useNavigate({ from: '/estantes' });

  function setFilters(newFilters: Partial<BookshelfListFilters>) {
    navigate({
      search: (prev: BookshelfListFilters) => ({ ...prev, ...newFilters }),
    });
  }

  return { filters, setFilters };
}
