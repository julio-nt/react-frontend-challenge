import BookItem from '@modules/library/components/BookItem';
import type { Book } from '@modules/library/model/Book';

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
