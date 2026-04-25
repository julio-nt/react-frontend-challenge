import { LoaderCircle } from 'lucide-react';

const Loading = ({ size }: { size?: number }) => {
  return <LoaderCircle size={size} className='animate-spin [transform-box:fill-box] origin-center' />;
};

export default Loading;
