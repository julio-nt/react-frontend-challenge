import type { BookApi } from '@modules/library/model/BookApi';

export interface SearchBookRequest {
  skip?: boolean;
  filters: SearchBookFilter | undefined;
}

export interface SearchBookFilter {
  q: string;
  intitle?: string;
  inauthor?: string;
  inpublisher?: string;
  printType?: 'all' | 'books' | 'magazines';
  orderBy?: 'relevance' | 'newest';
  maxResults?: number;
  // startIndex?: number;
}

export interface SearchBookResponse {
  kind: string;
  totalItems: number;
  items: BookApi[];
}
