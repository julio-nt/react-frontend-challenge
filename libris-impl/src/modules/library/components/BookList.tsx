import { useEffect } from 'react';
import { useSearchBook } from '../useCase/useSearchBook';
import BookFilter from './BookFilter';
import Loading from '@shared/components/ui/loading';
import BookItem from './BookItem';
import { Search } from 'lucide-react';
import { useUrlFilter } from '../useCase/useUrlFilter';

const BookList = () => {
  const { filters, setFilters } = useUrlFilter();

  const { data, isLoading, isReloading, refetch } = useSearchBook({ filters });

  useEffect(() => {
    refetch();
  }, [filters]);

  return (
    <div>
      <BookFilter onFilter={setFilters} />

      {isLoading && !isReloading ? (
        <div className='flex flex-col items-center gap-4 mt-8 text-muted-foreground'>
          <Loading size={42} />
          <p>Carregando resultados...</p>
        </div>
      ) : (
        <div className='mt-6 space-y-2'>
          {!data?.totalItems ? (
            <div className='flex flex-col items-center text-muted-foreground gap-4 mt-8'>
              <Search size={48} />
              <p>Faça uma busca para encontrar livros</p>
            </div>
          ) : (
            <div className={`flex flex-wrap gap-4 ${isReloading ? 'blur' : ''}`}>
              {data?.items?.map((book) => {
                return <BookItem key={book.id} book={book} />;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookList;
