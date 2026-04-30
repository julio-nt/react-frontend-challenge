import BookListSkeleton from '@modules/book/components/BookListSkeleton';
import TableBookListSkeleton from '@modules/book/components/TableBookListSkeleton';

const LoadingBookshelf = ({ layout }: { layout: 'grid' | 'list' }) => {
  if (layout === 'grid') {
    return <TableBookListSkeleton />;
  }

  return <BookListSkeleton />;
};

export default LoadingBookshelf;
