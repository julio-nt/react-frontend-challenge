import { useNavigation } from '@core/navigation';
import { useLoggedUser } from '@modules/account/useCase/useLoggedUser';
import Loading from '@shared/components/ui/loading';
import { Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import { SidebarProvider } from '@shared/components/ui/sidebar';
import Sidebar from './components/Sidebar';
import PageWrapper from './components/PageWrapper';

const PrivateLayout = () => {
  const { goTo } = useNavigation();

  const { loggedUser, isLoading } = useLoggedUser();

  function handleValidateToken() {
    if (isLoading) return;

    if (!loggedUser) {
      goTo('/login');
    }
  }

  useEffect(() => {
    handleValidateToken();
  }, [loggedUser, isLoading]);

  return (
    <div>
      {isLoading ? (
        <div className='flex flex-col items-center justify-center h-screen'>
          <Loading size={42} />
          <span>Carregando sua biblioteca digital...</span>
        </div>
      ) : loggedUser ? (
        <SidebarProvider>
          <div className='h-screen w-full'>
            <Navbar />
            <Sidebar user={loggedUser} />
            <PageWrapper>
              <Outlet />
            </PageWrapper>
          </div>
        </SidebarProvider>
      ) : (
        <p>Não há usuário logado</p>
      )}
    </div>
  );
};

export default PrivateLayout;
