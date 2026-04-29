import type { Book } from '../model/Book';
import { Search } from 'lucide-react';
import { useUrlFilter } from '../useCase/useUrlFilter';
import { useSearchBook } from '../useCase/useSearchBook';
import { useEffect, useState } from 'react';
import { toast } from '@core/toast';
import TableBookListSkeleton from './TableBookListSkeleton';
import InfiniteScroll from './InfiniteScroll';
import SaveBook from './SaveBook';
import { TableTanstack } from '@shared/components/ui/table';
import { useNavigation } from '@core/navigation';
import { useBookTable } from '@shared/hooks/use-book-table';

const TableBookList = () => {
  const { goTo } = useNavigation();
  const { filters } = useUrlFilter();

  const { data, isLoading, pagination, error } = useSearchBook({ filters });

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const { columns } = useBookTable({ onOpenSave: handleOpenSave });

  function handleOpenSave(book: Book) {
    setSelectedBook(book);
    setIsSaveDialogOpen(true);
  }

  function handleOpenDetails(book: Book) {
    goTo('/livro/$id', { params: { id: book.id } });
  }

  useEffect(() => {
    if (error) {
      toast.error('Ocorreu um erro ao buscar os livros. Por favor, tente novamente.');
    }
  }, [error]);

  if (isLoading) {
    return <TableBookListSkeleton />;
  }

  if (!pagination.totalItems) {
    return (
      <div className='flex flex-col items-center text-muted-foreground gap-4'>
        <Search size={48} />
        <p>Faça uma busca para encontrar livros</p>
      </div>
    );
  }

  return (
    <>
      <InfiniteScroll
        onLoadMore={pagination.fetchNextPage}
        hasMore={pagination.hasNextPage}
        isLoadingMore={pagination.isFetchingNextPage}
      >
        <TableTanstack data={data} columns={columns} onRowClick={handleOpenDetails} />
      </InfiniteScroll>

      <SaveBook
        book={selectedBook ?? undefined}
        isOpen={isSaveDialogOpen}
        setIsOpen={setIsSaveDialogOpen}
      />
    </>
  );
};

export default TableBookList;
