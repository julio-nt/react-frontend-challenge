import { formatDate } from '@shared/util/date';
import type { Book } from '../../book/model/Book';
import { useState } from 'react';
import { Button } from '@shared/components/ui/button';
import SaveBook from './SaveBook';
import { useBookshelfStore } from '../../../shared/store/bookshelf';
import { BOOK_STATUS } from '../../book/model/BookStatus';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { useNavigation } from '@core/navigation';

interface BookItemProps {
  book: Book | undefined;
}

const BookItem = ({ book }: BookItemProps) => {
  if (!book) return null;
  const isMobile = useIsMobile();
  const { goTo } = useNavigation();

  const bookshelf = useBookshelfStore((state) => state.bookshelf);

  const [isOnFocus, setIsOnFocus] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const currentSanvedBook = bookshelf.find((b) => b.id === book.id);
  const currentShelf = currentSanvedBook?.status;

  const bookTitle = book.volumeInfo.title
    ? book.volumeInfo.title.length > 40
      ? book.volumeInfo.title.slice(0, 40) + '...'
      : book.volumeInfo.title
    : 'Sem título';

  const bookAuthors = book.volumeInfo.authors
    ? book.volumeInfo.authors.join(', ').slice(0, 30) +
      (book.volumeInfo.authors.join(', ').length > 30 ? '...' : '')
    : 'Sem autor';

  function handleBookClick() {
    if (!isMobile) return;

    setIsOnFocus(true);
  }

  function handleOverlayClick() {
    if (!isOnFocus || !book?.id) return;

    goTo('/livro/$id', { params: { id: book.id } });
  }

  return (
    <div
      className='w-[180px] border border-2 border-foreground rounded-sm flex flex-col transition-all relative'
      onClick={handleBookClick}
    >
      {!book.volumeInfo.imageLinks?.thumbnail ? (
        <div className='w-full h-[250px] rounded-sm bg-gray-200 flex items-center justify-center'>
          <p className='text-gray-500'>Sem imagem</p>
        </div>
      ) : (
        <img src={book.volumeInfo.imageLinks?.thumbnail} className='w-full h-[250px] rounded-sm' />
      )}

      <div
        className={`bg-black opacity-0 ${isOnFocus ? 'opacity-60' : ''}  absolute top-0 w-full h-full flex`}
      />

      <div
        className={`absolute top-0 transition-all w-full h-full flex flex-col p-4 text-white rounded-sm z-[9] cursor-pointer ${isOnFocus ? 'opacity-100' : 'opacity-0'}`}
        onMouseOver={() => setIsOnFocus(true)}
        onMouseOut={() => setIsOnFocus(false)}
        onClick={handleOverlayClick}
      >
        <p className='font-semibold text-sm mt-2 mb-4'>{bookTitle}</p>

        <div className='mt-auto space-y-1'>
          <p className='text-xs'>
            {!book.volumeInfo.authors
              ? 'Sem Autor'
              : `Autor${book.volumeInfo.authors?.length > 1 ? 'es' : ''}: ${bookAuthors}`}
          </p>
          {book.volumeInfo.publishedDate && (
            <p className='text-xs'>Publicado: {formatDate(book.volumeInfo.publishedDate)}</p>
          )}
        </div>

        <Button
          className='mt-4 bg-white text-black cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
            setIsSaveDialogOpen(true);
          }}
          disabled={!isOnFocus}
        >
          {currentShelf ? BOOK_STATUS[currentShelf] : 'Salvar'}
        </Button>
      </div>

      <SaveBook
        book={book}
        isOpen={isSaveDialogOpen}
        setIsOpen={setIsSaveDialogOpen}
      />
    </div>
  );
};

export default BookItem;
