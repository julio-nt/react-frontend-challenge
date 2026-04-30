import { useCanGoBack, useParams } from '@tanstack/react-router';
import { useBookById } from '../../library/useCase/useBookById';
import BookDetailSkeleton from '../components/BookDetailSkeleton';
import { Button } from '@shared/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigation } from '@core/navigation';
import BookDetail from '../components/BookDetail';

const Component = () => {
  const { id } = useParams({ strict: false });
  const { goTo } = useNavigation();
  const canGoBack = useCanGoBack();

  const { data, isLoading } = useBookById({ bookId: id });

  function handleGoBack() {
    if (!canGoBack) {
      goTo('/');
      return;
    }

    window.history.back();
  }

  if (isLoading) return <BookDetailSkeleton />;

  if (!data) {
    return (
      <div className='flex flex-col items-center justify-center h-full gap-4 py-20'>
        <p className='text-xl font-semibold'>Livro não encontrado</p>
        <Button variant='outline' onClick={handleGoBack}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Voltar para a busca
        </Button>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <Button variant='ghost' className='pl-0' onClick={handleGoBack}>
        <ArrowLeft className='mr-2 h-4 w-4' />
        Voltar
      </Button>

      <BookDetail book={data} />
    </div>
  );
};

const BookDetailsPage = {
  path: '/livro/$id',
  Component,
};

export default BookDetailsPage;
