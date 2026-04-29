import type { SearchBookFilter } from '../useSearchBook/interface';
import { useDebounce } from '@shared/hooks/use-debounce';
import { useSearchStore } from '@shared/store/search';
import type { BookFilterProps } from './interface';
import { useEffect } from 'react';

export function useBookFilter({ params, formFilter, setIsOpen, setIsOpenMobile }: BookFilterProps) {
  const { saveSearch } = useSearchStore();

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

  function handleClearAll() {
    formFilter.setValue('q', '');
    handleClear();
  }

  function handleSearch() {
    const qToUse = debouncedQ || formFilter.getValues('q');
    const filters = formFilter.getValues();

    saveSearch({
      ...filters,
      q: qToUse,
    });
    setIsOpen(false);
  }

  function handleDetailedSearch(values: SearchBookFilter) {
    setIsOpenMobile(false);

    if (!values.intitle && !values.inauthor && !values.inpublisher) {
      handleSearch();
      return;
    }

    saveSearch({
      ...values,
      q: values.q || ' ',
    });
    setIsOpen(false);
  }

  useEffect(() => {
    if (debouncedQ) handleSearch();
  }, [debouncedQ]);

  useEffect(() => {
    formFilter.setValue('q', params.q || '');
    formFilter.setValue('inauthor', params.inauthor || '');
    formFilter.setValue('intitle', params.intitle || '');
    formFilter.setValue('inpublisher', params.inpublisher || '');
    formFilter.setValue('maxResults', params.maxResults || 20);
    formFilter.setValue('orderBy', params.orderBy || 'relevance');
    formFilter.setValue('printType', params.printType || 'all');
  }, [params]);

  return {
    handleClear,
    handleClearAll,
    debouncedQ,
    handleSearch,
    handleDetailedSearch,
  };
}
