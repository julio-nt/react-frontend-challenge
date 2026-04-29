import { useThemeStore } from '@shared/store/theme';
import { Moon, Sun } from 'lucide-react';
import type { MainContainerProps } from './interface';

const MainContainer = ({ children }: MainContainerProps) => {
  const { toggleTheme, theme } = useThemeStore();
  const isDarkMode = theme === 'dark';

  function handleThemeToggle() {
    toggleTheme(isDarkMode ? 'light' : 'dark');
  }

  const IconThemeToUse = isDarkMode ? Sun : Moon;

  return (
    <div className='flex flex-col h-screen w-full'>
      <IconThemeToUse size={20} className='cursor-pointer ml-auto mr-5 mt-5' onClick={handleThemeToggle} />

      <div className='space-y-4 m-auto w-full max-w-[340px] border py-6 p-4 rounded shadow-lg'>
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
