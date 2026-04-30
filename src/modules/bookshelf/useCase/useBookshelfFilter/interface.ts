export interface BookshelfFilterProps {
  formFilters: any;
  dialogState: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  };
  dialogStateMobile: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  };
}
