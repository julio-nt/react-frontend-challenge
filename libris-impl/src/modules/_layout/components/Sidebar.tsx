import { useNavigation, type NavigationLinks } from '@core/navigation';
import type { User } from '@modules/account/model/User';
import { useLogout } from '@modules/account/useCase/useLogout';
import { Button } from '@shared/components/ui/button';
import {
  Sidebar as AppSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from '@shared/components/ui/sidebar';
import { useLocation } from '@tanstack/react-router';
import { SquareArrowRightExit } from 'lucide-react';

interface SidebarProps {
  user: User | undefined;
}

const Sidebar = ({ user }: SidebarProps) => {
  const { pathname } = useLocation();

  const { goTo } = useNavigation();
  const { setOpenMobile, isMobile } = useSidebar();

  const { mutate: logout } = useLogout();

  function handleItemClick(path: NavigationLinks) {
    goTo(path);
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  const sidebarItems = [
    {
      label: 'Início',
      onClick: () => handleItemClick('/'),
      path: '/',
    },
    {
      label: 'Minha Estante',
      onClick: () => handleItemClick('/estantes'),
      path: '/estantes',
    },
  ];

  function handleLogout() {
    logout();
    goTo('/login');
  }

  return (
    <AppSidebar>
      <SidebarHeader className='border-b h-[64px]'>
        <p className='text-lg font-bold'>Menu</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {sidebarItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Button
                key={item.label}
                variant='ghost'
                className={`w-full justify-start ${isActive ? 'bg-secondary' : ''}`}
                onClick={item.onClick}
              >
                {item.label}
              </Button>
            );
          })}
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
