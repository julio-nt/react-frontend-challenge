import { useSearchBook } from '../useCase/useSearchBook';
import BookListSkeleton from './BookListSkeleton';
import BookItem from './BookItem';
import { Search } from 'lucide-react';
import { useUrlFilter } from '../useCase/useUrlFilter';
import InfiniteScroll from './InfiniteScroll';
import { useEffect } from 'react';
import { toast } from '@core/toast';

const BookList = () => {
  const { filters } = useUrlFilter();

  const { data, isLoading, pagination, error } = useSearchBook({ filters });

  useEffect(() => {
    if (error) {
      toast.error('Ocorreu um erro ao buscar os livros. Por favor, tente novamente.');
    }
  }, [error]);

  return (
    <div>
      {isLoading ? (
        <div className='mt-6'>
          <BookListSkeleton />
        </div>
      ) : (
        <div className='mt-6 space-y-2'>
          {!pagination.totalItems ? (
            <div className='flex flex-col items-center text-muted-foreground gap-4 mt-8'>
              <Search size={48} />
              <p>Faça uma busca para encontrar livros</p>
            </div>
          ) : (
            <>
              <InfiniteScroll
                onLoadMore={pagination.fetchNextPage}
                hasMore={pagination.hasNextPage}
                isLoadingMore={pagination.isFetchingNextPage}
              >
                <div className='flex flex-wrap gap-4'>
                  {data.map((book, i) => (
                    <BookItem key={`${i}-${book.id}`} book={book} />
                  ))}
                </div>
              </InfiniteScroll>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BookList;
