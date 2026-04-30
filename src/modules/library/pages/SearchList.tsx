import { Button } from '@shared/components/ui/button';
import BookList from '../components/BookList';
import TableBookList from '../components/TableBookList';
import { List, Search, Table } from 'lucide-react';
import { useThemeStore } from '@shared/store/theme';
import { useSearchBook } from '../useCase/useSearchBook';
import { useUrlFilter } from '../useCase/useUrlFilter';
import { useEffect } from 'react';
import { toast } from '@core/toast';
import InfiniteScroll from '../../../shared/components/ui/InfiniteScroll';

const Component = () => {
  const { layout, toggleLayout } = useThemeStore();

  const IconToUse = layout === 'grid' ? Table : List;

  const { filters } = useUrlFilter();

  const { data, isLoading, pagination, error } = useSearchBook({ filters });

  useEffect(() => {
    if (error) {
      toast.warning('Ocorreu um erro ao buscar os livros. Por favor, tente novamente.');
    }
  }, [error]);

  if (!isLoading && data.length === 0) {
    return (
      <div className='flex flex-col items-center text-muted-foreground gap-4'>
        <Search size={48} />
        <p>Faça uma busca para encontrar livros</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <Button onClick={() => toggleLayout(layout === 'grid' ? 'list' : 'grid')}>
        <IconToUse />
      </Button>

      <InfiniteScroll
        onLoadMore={pagination.fetchNextPage}
        hasMore={pagination.hasNextPage}
        isLoadingMore={pagination.isFetchingNextPage}
      >
        {layout === 'grid' ? (
          <TableBookList data={data} isLoading={isLoading} />
        ) : (
          <BookList data={data} isLoading={isLoading} />
        )}
      </InfiniteScroll>
    </div>
  );
};

const SearchPage = {
  path: '/',
  Component,
};

export default SearchPage;
