import { useEffect, useState } from 'react';
import { useSearchBook } from '../useCase/useSearchBook';
import type { SearchBookFilter } from '../useCase/useSearchBook/interface';
import BookFilter from './BookFilter';
import Loading from '@shared/components/ui/loading';

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

      {data?.items?.map((book) => {
        return (
          <div>
            <p>{book.volumeInfo.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
