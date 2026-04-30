import { Button } from '@shared/components/ui/button';
import BookShelfList from '../components/BookshelfList';
import TableBookshelfList from '../components/TableBookshelfList';
import { useThemeStore } from '@shared/store/theme';
import { BookDashed, List, Table } from 'lucide-react';
import { useBookshelfList } from '../useCase/useBookshelfList';
import { toast } from '@core/toast';
import { useEffect } from 'react';
import InfiniteScroll from '@shared/components/ui/InfiniteScroll';
import LoadingBookshelf from '../components/LoadingBookshelf';
import { useUrlFilter } from '../useCase/useUrlFilter';
import { BOOK_STATUS } from '@modules/book/model/BookStatus';

const Component = () => {
  const { layout, toggleLayout } = useThemeStore();

  const { filters } = useUrlFilter();

  const IconToUse = layout === 'grid' ? Table : List;

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBookshelfList({ filters });

  useEffect(() => {
    if (error) {
      toast.error('Ocorreu um erro ao buscar os livros. Por favor, tente novamente.');
    }
  }, [error]);

  return (
    <div className='space-y-4'>
      <div>
        <h1 className='text-2xl font-bold'>Minha Estante</h1>
        {filters.status && (
          <p className='text-lg font-semibold text-muted-foreground'>
            {BOOK_STATUS[filters.status]}
          </p>
        )}
        {data.length > 0 && (
          <p className='text-sm text-muted-foreground'>
            {data.length} {data.length === 1 ? 'livro' : 'livros'}
          </p>
        )}
      </div>

      <Button onClick={() => toggleLayout(layout === 'grid' ? 'list' : 'grid')}>
        <IconToUse />
      </Button>

      {isLoading && <LoadingBookshelf layout={layout} />}

      {!isLoading && data.length === 0 && (
        <div className='flex flex-col items-center text-muted-foreground gap-4 mt-8'>
          <BookDashed size={48} />
          <p>Nenhum livro salvo na estante, adicione livros para vê-los aqui.</p>
        </div>
      )}

      {!isLoading && data.length > 0 && (
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasMore={hasNextPage}
          isLoadingMore={isFetchingNextPage}
        >
          {layout === 'grid' ? <TableBookshelfList data={data} /> : <BookShelfList data={data} />}
        </InfiniteScroll>
      )}
    </div>
  );
};

const BookShelfsPage = {
  path: '/estantes',
  Component,
};

export default BookShelfsPage;
