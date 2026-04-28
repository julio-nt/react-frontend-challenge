import type { Book } from '@modules/library/model/Book';
import type { BookApi } from '@modules/library/model/BookApi';

export function adapter(book: BookApi) {
  const adaptedBook: Book = {
    id: book.id,
    volumeInfo: {
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      authors: book.volumeInfo.authors,
      publisher: book.volumeInfo.publisher,
      publishedDate: book.volumeInfo.publishedDate,
      description: book.volumeInfo.description,
      pageCount: book.volumeInfo.pageCount,
      printType: book.volumeInfo.printType,
      categories: book.volumeInfo.categories,
      imageLinks: book.volumeInfo.imageLinks,
      language: book.volumeInfo.language,
    },
    saleInfo: {
      country: book.saleInfo.country,
    },
  };

  return adaptedBook;
}
