import { useNavigation } from '@core/navigation';
import { Button } from '@shared/components/ui/button';

const Component = () => {
  const { goTo } = useNavigation();

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-6xl font-bold'>404</h1>
      <p className='text-xl font-semibold'>Página não encontrada</p>
      <p className='text-muted-foreground'>A página que você está procurando não existe ou foi removida.</p>
      <Button onClick={() => goTo('/')}>Voltar para o início</Button>
    </div>
  );
};

const NotFoundPage = {
  Component,
};

export default NotFoundPage;
