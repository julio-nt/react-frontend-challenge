import { SidebarTrigger, useSidebar } from '@shared/components/ui/sidebar';
import logo from '/logo.png';

const Navbar = () => {
  const { open } = useSidebar();

  return (
    <nav className={`flex items-center justify-between w-full h-16 border-b px-4 ${open ? 'pl-68' : ''} transition-all`}>
      <div className='space-x-2'>
        <SidebarTrigger />
        <img src={logo} alt='Libris Logo' className={'h-8 inline-block'} />
        <span className={'font-bold text-lg'}>Libris</span>
      </div>
    </nav>
  );
};

export default Navbar;
