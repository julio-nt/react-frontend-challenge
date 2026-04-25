import { formatDate } from '@shared/util/date';
import type { Book } from '../model/Book';

interface BookItemProps {
  book: Book | undefined;
}

const BookItem = ({ book }: BookItemProps) => {
  if (!book) return null;

  const bookPrice = book.saleInfo.listPrice?.amount || book.saleInfo.retailPrice?.amount;

  return (
    <div className='w-[180px] border rounded-sm p-2 flex flex-col'>
      {!book.volumeInfo.imageLinks?.thumbnail ? (
        <div className='w-full h-[250px] bg-gray-200 flex items-center justify-center'>
          <p className='text-gray-500'>Sem imagem</p>
        </div>
      ) : (
        <img src={book.volumeInfo.imageLinks?.thumbnail} className='w-full' />
      )}
      <p className='font-semibold mt-2 mb-4'>{book.volumeInfo.title}</p>
      <div className='mt-auto text-gray-500'>
        <p className='text-sm'>
          {!book.volumeInfo.authors
            ? 'Sem Autor'
            : `Autor${book.volumeInfo.authors?.length > 1 ? 'es' : ''}: ${book.volumeInfo.authors?.join(', ')}`}
        </p>
        {book.volumeInfo.publishedDate && (
          <p className='text-xs'>Publicado: {formatDate(book.volumeInfo.publishedDate)}</p>
        )}
        <p className='mt-4'>R$ {bookPrice?.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BookItem;
