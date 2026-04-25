import { formatDate } from '@shared/util/date';
import type { Book } from '../model/Book';

interface BookItemProps {
  book: Book | undefined;
}

const BookItem = ({ book }: BookItemProps) => {
  if (!book) return null;

  const bookTitle =
    book.volumeInfo.title.length > 100
      ? book.volumeInfo.title.slice(0, 100) + '...'
      : book.volumeInfo.title;

  return (
    <div className='w-[180px] border rounded-sm p-2 flex flex-col'>
      {!book.volumeInfo.imageLinks?.thumbnail ? (
        <div className='w-full h-[250px] bg-gray-200 flex items-center justify-center'>
          <p className='text-gray-500'>Sem imagem</p>
        </div>
      ) : (
        <img src={book.volumeInfo.imageLinks?.thumbnail} className='w-full h-[250px] ' />
      )}
      <p className='font-semibold text-sm mt-2 mb-4'>{bookTitle}</p>
      <div className='mt-auto text-gray-500'>
        <p className='text-xs'>
          {!book.volumeInfo.authors
            ? 'Sem Autor'
            : `Autor${book.volumeInfo.authors?.length > 1 ? 'es' : ''}: ${book.volumeInfo.authors?.join(', ')}`}
        </p>
        {book.volumeInfo.publishedDate && (
          <p className='text-xs'>Publicado: {formatDate(book.volumeInfo.publishedDate)}</p>
        )}
      </div>
    </div>
  );
};

export default BookItem;
