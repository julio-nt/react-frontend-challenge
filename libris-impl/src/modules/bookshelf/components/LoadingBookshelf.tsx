import BookListSkeleton from '@modules/library/components/BookListSkeleton';
import TableBookListSkeleton from '@modules/library/components/TableBookListSkeleton';

const LoadingBookshelf = ({ layout }: { layout: 'grid' | 'list' }) => {
  if (layout === 'grid') {
    return <TableBookListSkeleton />;
  }

  return <BookListSkeleton />;
};

export default LoadingBookshelf;
