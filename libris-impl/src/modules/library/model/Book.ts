export interface PaginatedBook {
  kind: string;
  totalItems: number;
  items: Book[];
}

export interface Book {
  id: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
}

export interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  printType?: 'BOOK';
  categories?: string[];
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language?: string;
}

export interface SaleInfo {
  country: string;
}
