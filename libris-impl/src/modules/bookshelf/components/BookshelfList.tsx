import BookItem from '@modules/library/components/BookItem';
import { useBookshelfList } from '../useCase/useBookshelfList';
import { BookDashed } from 'lucide-react';
import { useUrlFilter } from '../useCase/useUrlFilter';
import BookListSkeleton from '@modules/library/components/BookListSkeleton';

const BookShelfList = () => {
  const { filters } = useUrlFilter();
  const { data, isLoading } = useBookshelfList({ skip: false, filters });

  return (
    <div className='space-y-4'>
      {/* <BookshelfFilter /> */}
      {isLoading ? (
        <BookListSkeleton />
      ) : data.length === 0 ? (
        <div className='flex flex-col items-center text-muted-foreground gap-4 mt-8'>
          <BookDashed size={48} />
          <p>Nenhum livro salvo na estante, adicione livros para vê-los aqui.</p>
        </div>
      ) : (
        <div className='flex flex-wrap gap-4'>
          {data.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookShelfList;
