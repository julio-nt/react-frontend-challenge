import { SidebarTrigger, useSidebar } from '@shared/components/ui/sidebar';
import logo from '/logo.png';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../storage/theme';

const Navbar = () => {
  const { open } = useSidebar();

  const { toggleTheme, theme } = useThemeStore();
  const isDarkMode = theme === 'dark';

  function handleThemeToggle() {
    toggleTheme(isDarkMode ? 'light' : 'dark');
  }

  const IconThemeToUse = isDarkMode ? Sun : Moon;

  return (
    <nav
      className={`flex items-center justify-between w-full h-16 border-b px-4 ${open ? 'pl-68' : ''} transition-all`}
    >
      <div className='space-x-2'>
        <SidebarTrigger />
        <img src={logo} alt='Libris Logo' className={'h-8 inline-block'} />
        <span className={'font-bold text-lg'}>Libris</span>
      </div>

      <IconThemeToUse size={20} className='cursor-pointer' onClick={handleThemeToggle} />
    </nav>
  );
};

export default Navbar;
