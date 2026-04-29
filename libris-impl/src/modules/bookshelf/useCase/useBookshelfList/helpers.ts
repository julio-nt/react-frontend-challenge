import type { Bookshelf } from '@shared/store/bookshelf/interface';
import type { BookshelfListFilters } from '../useUrlFilter/interface';
import type { Book } from '@modules/library/model/Book';

function handleFiltering(data: Bookshelf, filters: BookshelfListFilters) {
  const { name, author, publisher, status, maxResults, sortBy } = filters;

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

  console.log('filteredResult', {filteredResult, sortBy});

  if (sortBy) {
    filteredResult = filteredResult.sort((a, b) =>
      (a.volumeInfo?.[sortBy] || '').localeCompare(b.volumeInfo?.[sortBy] || '')
    );
  }

  const filtered = filteredResult.slice(0, maxResults || filteredResult.length);

  return filtered.sort((a, b) =>
    (a.volumeInfo?.title || '').localeCompare(b.volumeInfo?.title || '')
  );
}

export { handleFiltering };
