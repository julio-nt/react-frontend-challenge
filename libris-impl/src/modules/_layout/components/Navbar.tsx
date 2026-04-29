import { SidebarTrigger, useSidebar } from '@shared/components/ui/sidebar';
import logo from '/logo.png';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../../shared/store/theme';
import BookFilter from '@modules/library/components/BookFilter';
import { useLocation } from '@tanstack/react-router';
import BookshelfFilter from '@modules/bookshelf/components/BookshelfFilter';
import type { NavigationLinks } from '@core/navigation';

const Navbar = () => {
  const { pathname }: { pathname: NavigationLinks } = useLocation();

  const { open } = useSidebar();

  const { toggleTheme, theme } = useThemeStore();
  const isDarkMode = theme === 'dark';

  function handleThemeToggle() {
    toggleTheme(isDarkMode ? 'light' : 'dark');
  }

  const IconThemeToUse = isDarkMode ? Sun : Moon;

  return (
    <nav
      className={`flex items-center justify-between w-full h-16 border-b px-4 ${open ? 'md:pl-68' : ''} transition-all`}
    >
      <div className='space-x-2'>
        <SidebarTrigger />
        <img src={logo} alt='Libris Logo' className={'h-8 inline-block'} />
        <span className={'font-bold text-lg'}>Libris</span>
      </div>

      {pathname === '/' && <BookFilter />}
      {pathname === '/estantes' && <BookshelfFilter />}

      <IconThemeToUse size={20} className='cursor-pointer' onClick={handleThemeToggle} />
    </nav>
  );
};

export default Navbar;
