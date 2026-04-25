import { useSidebar } from '@shared/components/ui/sidebar';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar();

  return <div className={`max-w-[1400px] py-4 px-6 ${open ? 'pl-68' : ''} transition-all`}>{children}</div>;
};

export default PageWrapper;
