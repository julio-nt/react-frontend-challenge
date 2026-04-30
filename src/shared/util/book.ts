import type { BookStatus } from '@modules/library/model/BookStatus';
import { useBookshelfStore } from '@shared/store/bookshelf';

export function getBookStatus(bookId: string) {
  const bookshelf = useBookshelfStore.getState().bookshelf;

  const currentShelf: BookStatus | undefined = bookId
    ? bookshelf.to_read.find((b) => b.id === bookId)
      ? 'to_read'
      : bookshelf.reading.find((b) => b.id === bookId)
        ? 'reading'
        : bookshelf.read.find((b) => b.id === bookId)
          ? 'read'
          : undefined
    : undefined;

  return currentShelf;
}
