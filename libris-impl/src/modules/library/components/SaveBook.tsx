import {
  Command,
  CommandDialog,
  CommandList,
  CommandGroup,
  CommandItem,
} from '@shared/components/ui/command';
import type { Book } from '../model/Book';
import { useSaveBook } from '../useCase/useSaveBook';
import { BOOK_STATUS, type BookStatus } from '../model/BookStatus';
import { useRemoveBook } from '../useCase/useRemoveBook';

interface SaveBookProps {
  book: Book | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentShelf: BookStatus | null;
}

const SaveBook = ({ book, isOpen, setIsOpen, currentShelf }: SaveBookProps) => {
  const { mutate: saveBook, isLoading: isLoadingSave } = useSaveBook();
  const { mutate: removeBook, isLoading: isLoadingRemove } = useRemoveBook();

  const isLoadingAll = isLoadingSave || isLoadingRemove;

  const smallTitle =
    book?.volumeInfo.title && book?.volumeInfo.title.length > 30
      ? book.volumeInfo.title.slice(0, 30) + '...'
      : book?.volumeInfo.title;

  function handleSave(status: BookStatus) {
    if (!book || isLoadingAll) return;

    saveBook(
      { book, status },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  }

  function handleRemove(status: BookStatus) {
    if (!book || isLoadingAll) return;

    removeBook(
      { bookId: book.id, status },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <Command>
        <CommandList>
          <CommandGroup heading={`Salvar "${smallTitle}" em:`}>
            {Object.entries(BOOK_STATUS).map(([key, status]) => (
              <CommandItem
                key={key}
                onSelect={() => handleSave(key as BookStatus)}
                disabled={isLoadingAll || currentShelf === key}
              >
                {status} {currentShelf === key && '(Atual)'}
              </CommandItem>
            ))}
            {currentShelf && (
              <CommandItem
                onSelect={() => handleRemove(currentShelf as BookStatus)}
                disabled={isLoadingAll}
              >
                Remover da estante
              </CommandItem>
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default SaveBook;
