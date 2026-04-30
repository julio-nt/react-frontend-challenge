import { Button } from '@shared/components/ui/button';
import { List, Table } from 'lucide-react';

interface ToggleLayoutProps {
  layout: 'grid' | 'list';
  onToggle: (layout: 'grid' | 'list') => void;
}

const ToggleLayout = ({ layout, onToggle }: ToggleLayoutProps) => {
  const IconToUse = layout === 'grid' ? Table : List;

  return (
    <Button onClick={() => onToggle(layout === 'grid' ? 'list' : 'grid')}>
      <IconToUse size={20} />
      {layout === 'grid' ? 'Capas' : 'Lista'}
    </Button>
  );
};

export default ToggleLayout;
