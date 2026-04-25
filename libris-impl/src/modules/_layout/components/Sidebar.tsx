import { useNavigation } from '@core/navigation';
import type { User } from '@modules/account/model/User';
import { useLogout } from '@modules/account/useCase/useLogout';
import { Button } from '@shared/components/ui/button';
import { Sidebar as AppSidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from '@shared/components/ui/sidebar';
import { SquareArrowRightExit } from 'lucide-react';

interface SidebarProps {
  user: User | undefined;
}

const Sidebar = ({ user }: SidebarProps) => {
  const { goTo } = useNavigation();

  const { mutate: logout } = useLogout();

  const sidebarItems = [
    {
      label: 'Início',
      onClick: () => goTo('/'),
    },
    {
      label: 'Mais Populares',
      onClick: () => goTo('/'),
    },
    {
      label: 'Novos Lançamentos',
      onClick: () => goTo('/'),
    },
    {
      label: 'Minhas Categorias',
      onClick: () => goTo('/'),
    },
    {
      label: 'Meus Livros',
      onClick: () => goTo('/'),
    },
  ];

  function handleLogout() {
    logout();
    goTo('/login');
  }

  return (
    <AppSidebar>
      <SidebarHeader className='border-b'>
        <p className='text-lg font-bold'>Libris</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {sidebarItems.map((item) => (
            <Button key={item.label} variant='ghost' className='w-full justify-start' onClick={item.onClick}>
              {item.label}
            </Button>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='border-t pt-4'>
        {user && <p className='mb-2 text-sm'>{user.name}</p>}
        <Button onClick={handleLogout} className='bg-red-500 space-x-2 justify-start'>
          <SquareArrowRightExit />
          <span>Sair</span>
        </Button>
      </SidebarFooter>
    </AppSidebar>
  );
};

export default Sidebar;
