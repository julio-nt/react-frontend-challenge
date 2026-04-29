import type { Book } from '@modules/library/model/Book';
import { createColumnHelper } from '@tanstack/react-table';
import { formatDate } from '@shared/util/date';
import { getBookStatus } from '@shared/util/book';
import { Search } from 'lucide-react';
import { BOOK_STATUS, type BookStatus } from '@modules/library/model/BookStatus';
import { Button } from '@shared/components/ui/button';

export function useBookTable({ onOpenSave }: { onOpenSave: (book: Book) => void }) {
  const columnHelper = createColumnHelper<Book>();

  const columns = [
    columnHelper.display({
      id: 'cover',
      header: '',
      size: 64,
      cell: (props) => {
        const thumbnail = props.row.original.volumeInfo.imageLinks?.smallThumbnail;
        return Thumbnail({ thumbnail, title: props.row.original.volumeInfo.title || '' });
      },
    }),
    columnHelper.accessor((row) => row.volumeInfo.title, {
      id: 'title',
      header: 'Título',
      cell(props) {
        const title = props.getValue();
        return TextCell({ text: title });
      },
    }),
    columnHelper.accessor((row) => row.volumeInfo.authors?.join(', '), {
      id: 'authors',
      header: 'Autor(es)',
      cell(props) {
        const authors = props.getValue();
        return TextCell({ text: authors });
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
        const book = info.row.original;
        const currentShelf = getBookStatus(book.id);

        return ActionCell({
          book,
          handleOpenSave: () => onOpenSave(book),
          currentShelf,
        });
      },
    }),
  ];

  return { columns };
}

const Thumbnail = ({ thumbnail, title }: { thumbnail?: string; title: string }) => {
  return thumbnail ? (
    <img src={thumbnail} alt={title} className='w-10 h-14 object-cover rounded' />
  ) : (
    <div className='w-10 h-14 bg-muted rounded flex items-center justify-center'>
      <Search className='h-4 w-4 text-muted-foreground' />
    </div>
  );
};

const TextCell = ({ text }: { text?: string }) => {
  if (!text) return '';

  const smallText = text.length > 50 ? `${text.slice(0, 47)}...` : text;
  return <span title={text}>{smallText}</span>;
};

const ActionCell = ({
  book,
  handleOpenSave,
  currentShelf,
}: {
  book: Book;
  handleOpenSave: (book: Book) => void;
  currentShelf?: BookStatus;
}) => {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        handleOpenSave(book);
      }}
    >
      {currentShelf ? BOOK_STATUS[currentShelf] : 'Salvar'}
    </Button>
  );
};
