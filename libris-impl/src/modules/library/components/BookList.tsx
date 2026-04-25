import { useEffect, useState } from 'react';
import { useSearchBook } from '../useCase/useSearchBook';
import type { SearchBookFilter } from '../useCase/useSearchBook/interface';
import BookFilter from './BookFilter';
import Loading from '@shared/components/ui/loading';
import BookItem from './BookItem';

const BookList = () => {
  const [filters, setFilters] = useState<SearchBookFilter>();

  const { data, isLoading, refetch } = useSearchBook({ filters });

  useEffect(() => {
    refetch();
  }, [filters]);

  return (
    <div>
      <BookFilter onFilter={setFilters} />
      {isLoading && (
        <div className='flex flex-col items-center gap-4 mt-8'>
          <Loading size={42} />
          <p>Carregando resultados...</p>
        </div>
      )}

      <div className='mt-6 space-y-2'>
        {data?.totalItems && (
          <p className='text-muted-foreground'>{data?.totalItems} resultados encontrados</p>
        )}

        <div className='flex flex-wrap gap-4'>
          {data?.items?.map((book) => {
            return <BookItem key={book.id} book={book} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BookList;
