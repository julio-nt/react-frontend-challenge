import { useNavigation, type NavigationLinks } from '@core/navigation';
import type { User } from '@modules/account/model/User';
import { useLogout } from '@modules/account/useCase/useLogout';
import { Button } from '@shared/components/ui/button';
import {
  Sidebar as AppSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from '@shared/components/ui/sidebar';
import { useLocation } from '@tanstack/react-router';
import {
  Book,
  BookOpen,
  BookOpenCheck,
  BookSearch,
  SquareArrowRightExit,
  SquareLibrary,
} from 'lucide-react';

import logo from '/logo.png';

interface SidebarProps {
  user: User | undefined;
}

const Sidebar = ({ user }: SidebarProps) => {
  const { pathname, search } = useLocation();

  const currentPathname = search?.status ? `${pathname}?status=${search?.status}` : pathname;

  const { goTo } = useNavigation();
  const { setOpenMobile, isMobile } = useSidebar();

  const { mutate: logout } = useLogout();

  function handleItemClick(path: NavigationLinks | any) {
    goTo(path);
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  const sidebarItems = [
    {
      label: 'Descubra',
      type: 'groupLabel',
    },
    {
      label: 'Descubra',
      onClick: () => handleItemClick('/'),
      path: '/',
      icon: <BookSearch />,
    },
    {
      label: 'Meus Livros',
      type: 'groupLabel',
    },
    {
      label: 'Todos',
      onClick: () => handleItemClick('/estantes'),
      path: '/estantes',
      icon: <SquareLibrary />,
    },
    {
      label: 'Quero Ler',
      onClick: () => handleItemClick('/estantes?status=to_read'),
      path: '/estantes?status=to_read',
      icon: <Book />,
    },
    {
      label: 'Lendo',
      onClick: () => handleItemClick('/estantes?status=reading'),
      path: '/estantes?status=reading',
      icon: <BookOpen />,
    },
    {
      label: 'Concluídos',
      onClick: () => handleItemClick('/estantes?status=read'),
      path: '/estantes?status=read',
      icon: <BookOpenCheck />,
    },
  ];

  function handleLogout() {
    logout();
    goTo('/login');
  }

  return (
    <AppSidebar>
      <SidebarHeader className='border-b h-[64px]'>
        <div className='flex gap-2 my-auto ml-4'>
          <img src={logo} alt='Libris Logo' className={'h-8 inline-block'} />
          <p className='text-lg font-bold'>Libris</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className='space-y-2' title='Navegação'>
          {sidebarItems.map((item, index) => {
            if (item.type === 'groupLabel') {
              return <SidebarGroupLabel key={index}>{item.label}</SidebarGroupLabel>;
            }

            const isActive = currentPathname === item.path;

            return (
              <Button
                key={index}
                variant='ghost'
                className={`w-full justify-start gap-2 ${isActive ? 'bg-secondary' : ''}`}
                onClick={item.onClick}
              >
                {item.icon}
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
