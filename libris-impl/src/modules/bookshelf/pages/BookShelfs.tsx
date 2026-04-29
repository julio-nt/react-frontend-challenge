import { Button } from '@shared/components/ui/button';
import BookShelfList from '../components/BookshelfList';
import TableBookshelfList from '../components/TableBookshelfList';
import { useThemeStore } from '@shared/store/theme';
import { List, Table } from 'lucide-react';

const Component = () => {
  const { layout, toggleLayout } = useThemeStore();

  const IconToUse = layout === 'grid' ? Table : List;

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Minha Estante</h1>

      <Button onClick={() => toggleLayout(layout === 'grid' ? 'list' : 'grid')}>
        <IconToUse />
      </Button>
      {layout === 'grid' ? <TableBookshelfList /> : <BookShelfList />}
    </div>
  );
};

const BookShelfsPage = {
  path: '/estantes',
  Component,
};

export default BookShelfsPage;
