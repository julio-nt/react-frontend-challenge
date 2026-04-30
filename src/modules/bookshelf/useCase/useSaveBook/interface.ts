import type { Book } from '@modules/book/model/Book';

export interface SaveBookRequest {
  book: Book;
  status: 'to_read' | 'reading' | 'read';
}