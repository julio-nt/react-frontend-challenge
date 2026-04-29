import { SidebarTrigger, useSidebar } from '@shared/components/ui/sidebar';
import logo from '/logo.png';
import { Moon, Search, Sun } from 'lucide-react';
import { useThemeStore } from '../../../shared/store/theme';
import BookFilter from '@modules/library/components/BookFilter';
import { useLocation } from '@tanstack/react-router';
import BookshelfFilter from '@modules/bookshelf/components/BookshelfFilter';
import type { NavigationLinks } from '@core/navigation';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { Button } from '@shared/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/components/ui/dialog';
import { useState } from 'react';

const Navbar = () => {
  const isMobile = useIsMobile();
  const { pathname }: { pathname: NavigationLinks } = useLocation();

  const { open } = useSidebar();

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { toggleTheme, theme } = useThemeStore();
  const isDarkMode = theme === 'dark';

  function handleThemeToggle() {
    toggleTheme(isDarkMode ? 'light' : 'dark');
  }

  const IconThemeToUse = isDarkMode ? Sun : Moon;

  return (
    <>
      <nav
        className={`flex items-center justify-between w-full h-16 border-b px-4 ${open ? 'md:pl-68' : ''} transition-all`}
      >
        <div className='space-x-2'>
          <SidebarTrigger />
          <img src={logo} alt='Libris Logo' className={'h-8 inline-block'} />
          <span className={'font-bold text-lg'}>Libris</span>
        </div>

        {isMobile ? (
          <Button onClick={() => setIsOpenDialog(true)}>
            <Search />
            Buscar Livros
          </Button>
        ) : (
          <>
            {pathname === '/' && <BookFilter setIsOpenMobile={setIsOpenDialog} />}
            {pathname === '/estantes' && <BookshelfFilter setIsOpenMobile={setIsOpenDialog} />}
          </>
        )}

        <IconThemeToUse size={20} className='cursor-pointer' onClick={handleThemeToggle} />
      </nav>

      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Buscar Livros</DialogTitle>
          </DialogHeader>

          {pathname === '/' && <BookFilter setIsOpenMobile={setIsOpenDialog} />}
          {pathname === '/estantes' && <BookshelfFilter setIsOpenMobile={setIsOpenDialog} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
