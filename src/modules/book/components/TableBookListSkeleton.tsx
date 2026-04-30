import { Skeleton } from '@shared/components/ui/skeleton';

const TableBookRowSkeleton = () => (
  <tr className='border-b'>
    <td className='p-3 w-12'>
      <Skeleton className='w-10 h-14 rounded' />
    </td>
    <td className='p-3'>
      <Skeleton className='h-4 w-48' />
    </td>
    <td className='p-3'>
      <Skeleton className='h-4 w-36' />
    </td>
    <td className='p-3'>
      <Skeleton className='h-4 w-24' />
    </td>
    <td className='p-3'>
      <Skeleton className='h-4 w-32' />
    </td>
    <td className='p-3'>
      <Skeleton className='h-8 w-16 rounded-md' />
    </td>
  </tr>
);

const TableBookListSkeleton = () => {
  return (
    <div className='mt-6 rounded-md border overflow-hidden'>
      <table className='w-full text-sm'>
        <thead className='bg-muted text-muted-foreground'>
          <tr>
            {Array.from({ length: 6 }).map((_, i) => (
              <th key={i} className='p-3 text-left font-medium'>
                <Skeleton className='h-4 w-20' />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableBookRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBookListSkeleton;
