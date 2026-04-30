import type { SearchBookFilter } from '../useSearchBook/interface';
import { useDebounce } from '@shared/hooks/use-debounce';
import type { BookFilterProps } from './interface';
import { useEffect } from 'react';
import { useUrlFilter } from '../useUrlFilter';

export function useBookFilter({ formFilter, setIsOpen, setIsOpenMobile }: BookFilterProps) {
  const { filters, setFilters } = useUrlFilter();

  const qValue = formFilter.watch('q');

  const debouncedQ = useDebounce(qValue, 500);

  function handleClear() {
    formFilter.setValue('inauthor', '');
    formFilter.setValue('intitle', '');
    formFilter.setValue('inpublisher', '');
    formFilter.setValue('maxResults', 20);
    formFilter.setValue('orderBy', 'relevance');
    formFilter.setValue('printType', 'all');
  }

  function handleSearch() {
    const filters = formFilter.getValues();

    const qToUse = debouncedQ || filters.q;

    setFilters({
      ...filters,
      q: qToUse,
    });
    setIsOpen(false);
  }

  function handleDetailedSearch(values: SearchBookFilter) {
    if (!values.intitle && !values.inauthor && !values.inpublisher) {
      handleSearch();
      return;
    }

    setFilters(values);
    setIsOpen(false);
    setIsOpenMobile(false);
  }

  useEffect(() => {
    if (debouncedQ) handleSearch();
  }, [debouncedQ]);

  useEffect(() => {
    formFilter.setValue('q', filters.q || '');
    formFilter.setValue('inauthor', filters.inauthor || '');
    formFilter.setValue('intitle', filters.intitle || '');
    formFilter.setValue('inpublisher', filters.inpublisher || '');
    formFilter.setValue('maxResults', filters.maxResults || 20);
    formFilter.setValue('orderBy', filters.orderBy || 'relevance');
    formFilter.setValue('printType', filters.printType || 'all');
  }, [filters]);

  return {
    handleClear,
    handleSearch,
    handleDetailedSearch,
  };
}
