import type { Book } from '@modules/library/model/Book';

export interface SearchBookRequest {
  skip?: boolean;
  filters: SearchBookFilter | undefined;
}

export interface SearchBookFilter {
  q: string;
  intitle?: string;
  inauthor?: string;
  inpublisher?: string;
  subject?: string;
  isbn?: string;
  lccn?: string;
  oclc?: string;
}

export interface SearchBookResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}
