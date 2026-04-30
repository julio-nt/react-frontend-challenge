import { useState } from 'react';
import { TableTanstack } from '@shared/components/ui/table';
import { useNavigation } from '@core/navigation';
import type { Book } from '@modules/book/model/Book';
import SaveBook from '@modules/book/components/SaveBook';
import { useBookTable } from '@shared/hooks/use-book-table';

const TableBookshelfList = ({ data }: { data: Book[] }) => {
  const { goTo } = useNavigation();

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

export default TableBookshelfList;
