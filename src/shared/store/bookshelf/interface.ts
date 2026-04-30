import type { Book } from '@modules/book/model/Book';
import type { BookStatus } from '@modules/book/model/BookStatus';

export interface BookshelfStore {
  bookshelf: Book[];
  save: ({ book, status }: { book: Book; status: BookStatus }) => void;
  remove: ({ bookId }: { bookId: string }) => void;
}

export interface SaveBookshelfRequest {
  book: Book;
  status: BookStatus;
}

export interface RemoveBookshelfRequest {
  bookId: string;
}

export interface Bookshelf {
  to_read: Book[];
  reading: Book[];
  read: Book[];
}
