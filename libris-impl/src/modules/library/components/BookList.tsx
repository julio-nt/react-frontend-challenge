import BookListSkeleton from './BookListSkeleton';
import BookItem from './BookItem';
import type { Book } from '../model/Book';

const BookList = ({ data, isLoading }: { data: Book[]; isLoading: boolean }) => {
  return (
    <div>
      {isLoading ? (
        <div className='mt-6'>
          <BookListSkeleton />
        </div>
      ) : (
        <div className='flex flex-wrap gap-4'>
          {data.map((book, i) => (
            <BookItem key={`${i}-${book.id}`} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
