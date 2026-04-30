import { Skeleton } from '@shared/components/ui/skeleton';

const BookItemSkeleton = () => (
  <div className='w-[180px] border border-2 border-foreground rounded-sm flex flex-col'>
    <Skeleton className='w-full h-[250px] rounded-sm' />
    <div className='p-2 space-y-2'>
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-3 w-3/4' />
    </div>
  </div>
);

const BookListSkeleton = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      {Array.from({ length: 5 }).map((_, i) => (
        <BookItemSkeleton key={i} />
      ))}
    </div>
  );
};

export default BookListSkeleton;