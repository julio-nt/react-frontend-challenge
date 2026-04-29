import { Button } from '@shared/components/ui/button';
import BookList from '../components/BookList';
import TableBookList from '../components/TableBookList';
import { List, Table } from 'lucide-react';
import { useThemeStore } from '@shared/store/theme';

const Component = () => {
  const { layout, toggleLayout } = useThemeStore();

  const IconToUse = layout === 'grid' ? Table : List;

  return (
    <div className='space-y-4'>
      <Button onClick={() => toggleLayout(layout === 'grid' ? 'list' : 'grid')}>
        <IconToUse />
      </Button>
      {layout === 'grid' ? <TableBookList /> : <BookList />}
    </div>
  );
};

const SearchPage = {
  path: '/',
  Component,
};

export default SearchPage;
