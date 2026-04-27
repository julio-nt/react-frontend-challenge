import ControlledCombobox from '@shared/components/controlled/ControlledCombobox';
import ControlledInput from '@shared/components/controlled/ControlledInput';
import { useForm } from 'react-hook-form';
import { useUrlFilter } from '../useCase/useUrlFilter';
import { BOOK_STATUS } from '@modules/library/model/BookStatus';
import { useEffect } from 'react';
import type { BookshelfListFilters } from '../useCase/useUrlFilter/interface';
import { useDebounce } from '@shared/hooks/use-debounce';

const statusOptions = [
  { label: 'Todos', value: '' },
  ...Object.entries(BOOK_STATUS).map(([key, label]) => ({ label, value: key })),
];

const BookshelfFilter = () => {
  const { filters, setFilters } = useUrlFilter();

  const formFilters = useForm<BookshelfListFilters>({
    defaultValues: {
      name: filters.name ?? '',
      status: filters.status ?? '',
    },
  });

  const debouncedName = useDebounce(formFilters.watch('name'), 500);
  const status = formFilters.watch('status');

  useEffect(() => {
    const status = formFilters.watch('status');
    setFilters({ name: debouncedName, status });
  }, [debouncedName, status]);

  return (
    <div className='grid grid-cols-2 gap-4'>
      <ControlledInput label='Nome' name='name' control={formFilters.control} />
      <ControlledCombobox
        label='Status'
        name='status'
        control={formFilters.control}
        options={statusOptions}
      />
    </div>
  );
};

export default BookshelfFilter;
