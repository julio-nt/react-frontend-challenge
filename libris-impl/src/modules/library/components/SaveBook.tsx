import {
  Command,
  CommandDialog,
  CommandList,
  CommandGroup,
  CommandItem,
} from '@shared/components/ui/command';
import type { Book } from '../model/Book';

interface SaveBookProps {
  book: Book | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SaveBook = ({ book, isOpen, setIsOpen }: SaveBookProps) => {
  const smallTitle =
    book?.volumeInfo.title && book?.volumeInfo.title.length > 30
      ? book.volumeInfo.title.slice(0, 30) + '...'
      : book?.volumeInfo.title;

  function handleSave(status: 'to_read' | 'reading' | 'read') {
    if (!book) return;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <Command>
        <CommandList>
          <CommandGroup heading={`Salvar "${smallTitle}" em:`}>
            <CommandItem onClick={() => handleSave('to_read')}>Quero Ler</CommandItem>
            <CommandItem onClick={() => handleSave('reading')}>Lendo</CommandItem>
            <CommandItem onClick={() => handleSave('read')}>Concluído</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default SaveBook;
