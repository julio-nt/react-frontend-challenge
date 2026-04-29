import type { Book } from '@modules/library/model/Book';
import type { BookStatus } from '@modules/library/model/BookStatus';

export interface BookshelfStore {
  bookshelf: {
    to_read: Book[];
    reading: Book[];
    read: Book[];
  };
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