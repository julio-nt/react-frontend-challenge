import BookListSkeleton from '../../book/components/BookListSkeleton';
import BookItem from '@modules/book/components/BookItem';
import type { Book } from '../../book/model/Book';

const BookList = ({ data, isLoading }: { data: Book[]; isLoading: boolean }) => {
  if (isLoading) {
    return <BookListSkeleton />;
  }
  return (
    <div className='flex flex-wrap gap-4'>
      {data.map((book, i) => (
        <BookItem key={`${i}-${book.id}`} book={book} />
      ))}
    </div>
  );
};

export default BookList;
