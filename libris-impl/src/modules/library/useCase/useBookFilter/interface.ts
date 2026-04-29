import type { UseFormReturn } from 'react-hook-form';
import type { SearchBookFilter } from '../useSearchBook/interface';

export interface BookFilterProps {
  params: SearchBookFilter;
  formFilter: UseFormReturn<SearchBookFilter>;
  setIsOpen: (open: boolean) => void;
  setIsOpenMobile: (open: boolean) => void;
}
