import { Search } from 'lucide-react';
import { useUrlFilter } from '../useCase/useUrlFilter';
import { useEffect, useState } from 'react';
import { toast } from '@core/toast';
import { TableTanstack } from '@shared/components/ui/table';
import { useNavigation } from '@core/navigation';
import type { Book } from '@modules/library/model/Book';
import SaveBook from '@modules/library/components/SaveBook';
import TableBookListSkeleton from '@modules/library/components/TableBookListSkeleton';
import { useBookshelfList } from '../useCase/useBookshelfList';
import { useBookTable } from '@shared/hooks/use-book-table';
import InfiniteScroll from '@modules/library/components/InfiniteScroll';

const TableBookshelfList = () => {
  const { goTo } = useNavigation();
  const { filters } = useUrlFilter();

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useBookshelfList({ filters });

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  function handleOpenSave(book: Book) {
    setSelectedBook(book);
    setIsSaveDialogOpen(true);
  }

  function handleOpenDetails(book: Book) {
    goTo('/livro/$id', { params: { id: book.id } });
  }

  const { columns } = useBookTable({ onOpenSave: handleOpenSave });

  useEffect(() => {
    if (error) {
      toast.error('Ocorreu um erro ao buscar os livros. Por favor, tente novamente.');
    }
  }, [error]);

  if (isLoading) {
    return <TableBookListSkeleton />;
  }

  if (!data?.length) {
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
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
        isLoadingMore={isFetchingNextPage}
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

export default TableBookshelfList;
