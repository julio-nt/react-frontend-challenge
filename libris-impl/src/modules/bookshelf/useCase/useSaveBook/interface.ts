import type { Book } from '@modules/library/model/Book';

export interface SaveBookRequest {
  book: Book;
  status: 'to_read' | 'reading' | 'read';
}