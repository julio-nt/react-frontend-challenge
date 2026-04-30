import type { Bookshelf } from '@shared/store/bookshelf/interface';
import type { BookshelfListFilters } from '../useUrlFilter/interface';
import type { Book } from '@modules/library/model/Book';

function handleFiltering(data: Bookshelf, filters: BookshelfListFilters) {
  const { name, author, publisher, status, sortBy } = filters;

  const source: Book[] = status ? data[status] : Object.values(data).flat();

  let filteredResult: Book[] = source;

  if (name) {
    filteredResult = filteredResult.filter((b) =>
      b.volumeInfo?.title?.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (author) {
    filteredResult = filteredResult.filter((b) =>
      b.volumeInfo?.authors?.some((a) => a.toLowerCase().includes(author.toLowerCase()))
    );
  }

  if (publisher) {
    filteredResult = filteredResult.filter((b) =>
      b.volumeInfo?.publisher?.toLowerCase().includes(publisher.toLowerCase())
    );
  }

  if (sortBy) {
    filteredResult = filteredResult.sort((a, b) =>
      (a.volumeInfo?.[sortBy] || '').localeCompare(b.volumeInfo?.[sortBy] || '')
    );
  }

  return filteredResult;
}

export { handleFiltering };
