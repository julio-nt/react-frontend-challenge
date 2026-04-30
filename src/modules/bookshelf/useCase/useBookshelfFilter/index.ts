import { useDebounce } from '@shared/hooks/use-debounce';
import type { BookshelfListFilters } from '../useUrlFilter/interface';
import { useEffect } from 'react';
import type { BookshelfFilterProps } from './interface';
import { useUrlFilter } from '../useUrlFilter';

export function useBookshelfFilter({
  formFilters,
  dialogState,
  dialogStateMobile,
}: BookshelfFilterProps) {
  const { setFilters } = useUrlFilter();

  const debouncedName = useDebounce(formFilters.watch('name'), 500);

  function handleSearch(values: BookshelfListFilters) {
    setFilters(values);
    dialogState.setIsOpen(false);
    dialogStateMobile.setIsOpen(false);
  }

  function handleClear() {
    formFilters.setValue('name', '');
    formFilters.setValue('status', '');
    formFilters.setValue('author', '');
    formFilters.setValue('publisher', '');
    formFilters.setValue('maxResults', 20);
    formFilters.setValue('sortBy', 'title');
  }

  useEffect(() => {
    if (dialogState.isOpen) return;
    const values = formFilters.getValues();

    setFilters({ name: debouncedName, ...values });
  }, [debouncedName]);

  return { handleSearch, handleClear };
}
