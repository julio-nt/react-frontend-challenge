import type { BookStatus } from '@modules/book/model/BookStatus';
import { useBookshelfStore } from '@shared/store/bookshelf';

export function getBookStatus(bookId: string) {
  const bookshelf = useBookshelfStore.getState().bookshelf;

  const currentBook = bookshelf.find((b) => b.id === bookId);
  const currentShelf = currentBook?.status as BookStatus | undefined;

  return currentShelf;
}
