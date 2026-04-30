import { useLocation, useNavigate, useSearch } from '@tanstack/react-router';
import type { BookshelfListFilters } from './interface';

export function useUrlFilter() {
  const { pathname } = useLocation();

  const filters = useSearch({
    strict: false,
  }) as Partial<BookshelfListFilters>;
  const navigate = useNavigate();

  function setFilters(newFilters: Partial<BookshelfListFilters>) {
    if (pathname !== '/estantes') return;

    navigate({
      to: '/estantes',
      search: (prev: BookshelfListFilters) => {
        return { ...prev, ...newFilters };
      },
    });
  }

  return { filters, setFilters };
}
