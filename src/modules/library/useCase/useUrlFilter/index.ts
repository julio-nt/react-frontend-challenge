import { useLocation, useNavigate, useSearch } from '@tanstack/react-router';
import type { SearchBookFilter } from '../useSearchBook/interface';

export function useUrlFilter() {
  const { pathname } = useLocation();

  const filters = useSearch({ strict: false });
  const navigate = useNavigate({ from: '/' });

  function setFilters(newValues: Partial<SearchBookFilter>) {
    if (pathname !== '/') return;

    if (!newValues.q) {
      navigate({
        search: {
          q: '',
          ...newValues,
        },
      });
      return;
    }

    navigate({
      search: (prev: SearchBookFilter) => {
        return { ...prev, ...newValues };
      },
    });
  }

  return { filters, setFilters };
}
