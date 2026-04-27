import { formatDate } from '@shared/util/date';
import type { Book } from '../model/Book';
import { useState } from 'react';
import { Button } from '@shared/components/ui/button';
import SaveBook from './SaveBook';
import { useBookshelfStore } from '../../bookshelf/store/bookshelf';
import { BOOK_STATUS } from '../model/BookStatus';

interface BookItemProps {
  book: Book | undefined;
}

const BookItem = ({ book }: BookItemProps) => {
  if (!book) return null;

  const bookshelf = useBookshelfStore((state) => state.bookshelf);

  const [hover, setHover] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const currentShelf = bookshelf.to_read.find((b) => b.id === book.id)
    ? 'to_read'
    : bookshelf.reading.find((b) => b.id === book.id)
      ? 'reading'
      : bookshelf.read.find((b) => b.id === book.id)
        ? 'read'
        : null;

  const bookTitle =
    book.volumeInfo.title.length > 50
      ? book.volumeInfo.title.slice(0, 50) + '...'
      : book.volumeInfo.title;

  return (
    <div className='w-[180px] border border-2 border-foreground rounded-sm flex flex-col transition-all relative'>
      {!book.volumeInfo.imageLinks?.thumbnail ? (
        <div className='w-full h-[250px] rounded-sm bg-gray-200 flex items-center justify-center'>
          <p className='text-gray-500'>Sem imagem</p>
        </div>
      ) : (
        <img src={book.volumeInfo.imageLinks?.thumbnail} className='w-full h-[250px] rounded-sm' />
      )}
      <div
        className={`bg-black opacity-0 ${hover ? 'opacity-60' : ''}  absolute top-0 w-full h-full flex`}
      />
      <div
        className={`absolute top-0 opacity-0  transition-all hover:opacity-100 w-full h-full flex flex-col p-4 text-white rounded-sm`}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <p className='font-semibold text-sm mt-2 mb-4'>{bookTitle}</p>
        <div className='mt-auto space-y-1'>
          <p className='text-xs'>
            {!book.volumeInfo.authors
              ? 'Sem Autor'
              : `Autor${book.volumeInfo.authors?.length > 1 ? 'es' : ''}: ${book.volumeInfo.authors?.join(', ')}`}
          </p>
          {book.volumeInfo.publishedDate && (
            <p className='text-xs'>Publicado: {formatDate(book.volumeInfo.publishedDate)}</p>
          )}
        </div>
        <Button className='mt-4 bg-white text-black' onClick={() => setIsSaveDialogOpen(true)}>
          {currentShelf ? BOOK_STATUS[currentShelf] : 'Salvar'}
        </Button>
      </div>
      <SaveBook book={book} isOpen={isSaveDialogOpen} setIsOpen={setIsSaveDialogOpen} currentShelf={currentShelf} />
    </div>
  );
};

export default BookItem;
