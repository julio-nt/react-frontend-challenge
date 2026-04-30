import BookItem from '@modules/book/components/BookItem';
import type { Book } from '@modules/book/model/Book';

const BookShelfList = ({ data }: { data: Book[] }) => {
  return (
    <div className='flex flex-wrap gap-4'>
      {data.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookShelfList;
