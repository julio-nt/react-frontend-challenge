import BookItem from '@modules/library/components/BookItem';
import BookshelfFilter from './BookshelfFilter';
import { useBookshelfList } from '../useCase/useBookshelfList';
import Loading from '@shared/components/ui/loading';
import { BookDashed } from 'lucide-react';
import { useUrlFilter } from '../useCase/useUrlFilter';

const BookShelfList = () => {
  const { filters } = useUrlFilter();
  const { data, isLoading } = useBookshelfList({ skip: false, filters });

  return (
    <div className='space-y-4'>
      <BookshelfFilter />
      {isLoading ? (
        <div className='flex flex-col items-center gap-4 mt-8 text-muted-foreground'>
          <Loading size={42} />
          <p>Carregando estante...</p>
        </div>
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
