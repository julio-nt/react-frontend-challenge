import { useDebounce } from '@shared/hooks/use-debounce';
import { useSearchBookshelfStore } from '@shared/store/search-bookshelf';
import type { BookshelfListFilters } from '../useUrlFilter/interface';
import { useEffect } from 'react';
import type { BookshelfFilterProps } from './interface';

export function useBookshelfFilter({
  formFilters,
  dialogState,
  dialogStateMobile,
}: BookshelfFilterProps) {
  const { saveSearchBookshelf } = useSearchBookshelfStore();

  const debouncedName = useDebounce(formFilters.watch('name'), 500);

  function handleSearch(values: BookshelfListFilters) {
    saveSearchBookshelf(values);
    dialogState.setIsOpen(false);
    dialogStateMobile.setIsOpen(false);
  }

  function handleClear() {
    formFilters.setValue('name', '');
    formFilters.setValue('status', '');
    formFilters.setValue('author', '');
    formFilters.setValue('publisher', '');
    formFilters.setValue('maxResults', 20);
  }

  useEffect(() => {
    if (dialogState.isOpen) return;
    const values = formFilters.getValues();

    saveSearchBookshelf({ name: debouncedName, ...values });
  }, [debouncedName]);

  return { handleSearch, handleClear };
}
