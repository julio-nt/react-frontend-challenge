import { createColumnHelper } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useUrlFilter } from '../useCase/useUrlFilter';
import { useEffect, useState } from 'react';
import { toast } from '@core/toast';
import { TableTanstack } from '@shared/components/ui/table';
import { useNavigation } from '@core/navigation';
import { Button } from '@shared/components/ui/button';
import { formatDate } from '@shared/util/date';
import { getBookStatus } from '@shared/util/book';
import type { Book } from '@modules/library/model/Book';
import { BOOK_STATUS } from '@modules/library/model/BookStatus';
import SaveBook from '@modules/library/components/SaveBook';
import TableBookListSkeleton from '@modules/library/components/TableBookListSkeleton';
import { useBookshelfList } from '../useCase/useBookshelfList';

const TableBookshelfList = () => {
  const { goTo } = useNavigation();
  const { filters } = useUrlFilter();

  const { data, isLoading, error } = useBookshelfList({ filters });

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const columnHelper = createColumnHelper<Book>();

  const columns = [
    columnHelper.display({
      id: 'cover',
      header: '',
      size: 64,
      cell: (props) => {
        const thumbnail = props.row.original.volumeInfo.imageLinks?.smallThumbnail;
        return thumbnail ? (
          <img
            src={thumbnail}
            alt={props.row.original.volumeInfo.title}
            className='w-10 h-14 object-cover rounded'
          />
        ) : (
          <div className='w-10 h-14 bg-muted rounded flex items-center justify-center'>
            <Search className='h-4 w-4 text-muted-foreground' />
          </div>
        );
      },
    }),
    columnHelper.accessor((row) => row.volumeInfo.title, {
      id: 'title',
      header: 'Título',
      cell(props) {
        const title = props.getValue();
        if (!title) return '';

        const smallTitle = title.length > 50 ? `${title.slice(0, 47)}...` : title;
        return <span title={title}>{smallTitle}</span>;
      },
    }),
    columnHelper.accessor((row) => row.volumeInfo.authors?.join(', '), {
      id: 'authors',
      header: 'Autor(es)',
      cell(props) {
        const authors = props.getValue();
        const smallAuthors =
          authors && authors.length > 30 ? `${authors.slice(0, 27)}...` : authors;
        return smallAuthors || '';
      },
    }),
    columnHelper.accessor((row) => row.volumeInfo.publishedDate, {
      header: 'Publicação',
      cell(props) {
        const date = props.getValue();
        return formatDate(date) || '';
      },
    }),
    columnHelper.accessor((row) => row.volumeInfo.publisher, {
      id: 'publisher',
      header: 'Editora',
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: (info) => {
        const bookId = info.row.original.id;
        const currentShelf = getBookStatus(bookId);

        return (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenSave(info.row.original);
            }}
          >
            {currentShelf ? BOOK_STATUS[currentShelf] : 'Salvar'}
          </Button>
        );
      },
    }),
  ];

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

  if (!data?.length) {
    return (
      <div className='flex flex-col items-center text-muted-foreground gap-4 mt-8'>
        <Search size={48} />
        <p>Faça uma busca para encontrar livros</p>
      </div>
    );
  }

  return (
    <>
      {/* <InfiniteScroll
        onLoadMore={pagination.fetchNextPage}
        hasMore={pagination.hasNextPage}
        isLoadingMore={pagination.isFetchingNextPage}
      > */}
        <TableTanstack data={data} columns={columns} onRowClick={handleOpenDetails} />
      {/* </InfiniteScroll> */}

      <SaveBook
        book={selectedBook ?? undefined}
        isOpen={isSaveDialogOpen}
        setIsOpen={setIsSaveDialogOpen}
      />
    </>
  );
};

export default TableBookshelfList;
