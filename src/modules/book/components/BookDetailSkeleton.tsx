import { Skeleton } from "@shared/components/ui/skeleton";

const BookDetailSkeleton = () => {
  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <Skeleton className='h-8 w-24' />
      <div className='flex gap-8'>
        <Skeleton className='w-[200px] h-[300px] shrink-0 rounded-lg' />
        <div className='flex-1 space-y-4'>
          <Skeleton className='h-8 w-3/4' />
          <Skeleton className='h-5 w-1/2' />
          <Skeleton className='h-5 w-1/3' />
          <Skeleton className='h-24 w-full' />
        </div>
      </div>
    </div>
  );
};

export default BookDetailSkeleton;
