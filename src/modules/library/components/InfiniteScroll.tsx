import { useEffect, useRef } from 'react';
import Loading from '@shared/components/ui/loading';

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
  children: React.ReactNode;
}

const InfiniteScroll = ({ onLoadMore, hasMore, isLoadingMore, children }: InfiniteScrollProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoadingMore]);

  return (
    <div>
      {children}
      <div ref={sentinelRef} className='h-4' />
      {isLoadingMore && (
        <div className='flex justify-center py-4'>
          <Loading size={32} />
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
