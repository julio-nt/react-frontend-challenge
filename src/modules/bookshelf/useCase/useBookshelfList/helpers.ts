import type { BookshelfListFilters } from '../useUrlFilter/interface';
import type { Book } from '@modules/book/model/Book';

function handleFiltering(data: Book[], filters: BookshelfListFilters) {
  const { name, author, publisher, status, sortBy } = filters;

  const source: Book[] = status ? data.filter((b) => b.status === status) : data;

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
    if (sortBy === 'status') {
      filteredResult = filteredResult.sort((a, b) => {
        const statusOrder = { to_read: 0, reading: 1, read: 2 };
        const aStatus = a.status ? statusOrder[a.status] : -1;
        const bStatus = b.status ? statusOrder[b.status] : -1;
        return aStatus - bStatus;
      });
    } else {
      filteredResult = filteredResult.sort((a, b) =>
        (a.volumeInfo?.[sortBy] || '').localeCompare(b.volumeInfo?.[sortBy] || '')
      );
    }
  }

  return filteredResult;
}

export { handleFiltering };
