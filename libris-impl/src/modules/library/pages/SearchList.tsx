import { Button } from '@shared/components/ui/button';
import BookList from '../components/BookList';
import TableBookList from '../components/TableBookList';
import { List, Table } from 'lucide-react';
import { useState } from 'react';

const Component = () => {
  const [viewType, setViewType] = useState<'table' | 'list'>('table');

  function toggleViewType() {
    setViewType((prev) => (prev === 'table' ? 'list' : 'table'));
  }

  const IconToUse = viewType === 'table' ? Table : List;

  return (
    <div>
      <Button onClick={toggleViewType}>
        <IconToUse />
      </Button>
      {viewType === 'table' ? <TableBookList /> : <BookList />}
    </div>
  );
};

const SearchPage = {
  path: '/',
  Component,
};

export default SearchPage;
