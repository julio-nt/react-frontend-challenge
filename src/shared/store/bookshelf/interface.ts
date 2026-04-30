import type { Book } from '@modules/book/model/Book';
import type { BookStatus } from '@modules/book/model/BookStatus';

export interface BookshelfStore {
  bookshelf: Bookshelf;
  save: ({ book, status }: { book: Book; status: BookStatus }) => void;
  remove: ({ bookId, status }: { bookId: string; status: BookStatus }) => void;
}

export interface SaveBookshelfRequest {
  book: Book;
  status: BookStatus;
}

export interface RemoveBookshelfRequest {
  bookId: string;
  status: BookStatus;
}

export interface Bookshelf {
  to_read: Book[];
  reading: Book[];
  read: Book[];
}
