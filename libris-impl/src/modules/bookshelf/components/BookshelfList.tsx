import BookItem from '@modules/library/components/BookItem';
import BookshelfFilter from './BookshelfFilter';
import { useBookshelfList } from '../useCase/useBookshelfList';

const BookShelfList = () => {
  const { data } = useBookshelfList({ skip: false });

  return (
    <div className='space-y-4'>
      <BookshelfFilter />
      <div className='flex flex-wrap gap-4'>
        {data.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookShelfList;
