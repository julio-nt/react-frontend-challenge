import type { Book } from '../../book/model/Book';
import { useState } from 'react';
import TableBookListSkeleton from '../../book/components/TableBookListSkeleton';
import SaveBook from '../../book/components/SaveBook';
import { TableTanstack } from '@shared/components/ui/table';
import { useNavigation } from '@core/navigation';
import { useBookTable } from '@shared/hooks/use-book-table';

const TableBookList = ({ data, isLoading }: { data: Book[]; isLoading: boolean }) => {
  const { goTo } = useNavigation();

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

  if (isLoading) {
    return <TableBookListSkeleton />;
  }

  return (
    <>
      <TableTanstack data={data} columns={columns} onRowClick={handleOpenDetails} />

      <SaveBook
        book={selectedBook ?? undefined}
        isOpen={isSaveDialogOpen}
        setIsOpen={setIsSaveDialogOpen}
      />
    </>
  );
};

export default TableBookList;
