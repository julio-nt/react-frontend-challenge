import { describe, it, expect, beforeEach } from 'vitest';
import { useBookshelfStore } from '@shared/store/bookshelf';
import type { Book } from '@modules/book/model/Book';

const emptyBookshelf = { to_read: [], reading: [], read: [] };

const makeBook = (id: string): Book => ({
  id,
  volumeInfo: { title: `Book ${id}` },
  saleInfo: { country: 'US' },
});

describe('useBookshelfStore — remove', () => {
  beforeEach(() => {
    useBookshelfStore.setState({ bookshelf: emptyBookshelf });
  });

  it('removes a book from the shelf', () => {
    const book = makeBook('1');
    useBookshelfStore.getState().save({ book, status: 'to_read' });
    useBookshelfStore.getState().remove({ bookId: '1', status: 'to_read' });

    expect(useBookshelfStore.getState().bookshelf.to_read).toHaveLength(0);
  });

  it('does not affect other shelves when removing', () => {
    useBookshelfStore.getState().save({ book: makeBook('2'), status: 'to_read' });
    useBookshelfStore.getState().save({ book: makeBook('3'), status: 'reading' });
    useBookshelfStore.getState().remove({ bookId: '2', status: 'to_read' });

    const { bookshelf } = useBookshelfStore.getState();
    expect(bookshelf.to_read).toHaveLength(0);
    expect(bookshelf.reading).toHaveLength(1);
  });

  it('is a no-op when removing a book that does not exist', () => {
    useBookshelfStore.getState().remove({ bookId: 'ghost', status: 'read' });
    expect(useBookshelfStore.getState().bookshelf.read).toHaveLength(0);
  });

  it('removes only the target book when shelf has multiple', () => {
    useBookshelfStore.getState().save({ book: makeBook('4'), status: 'read' });
    useBookshelfStore.getState().save({ book: makeBook('5'), status: 'read' });
    useBookshelfStore.getState().remove({ bookId: '4', status: 'read' });

    const { read } = useBookshelfStore.getState().bookshelf;
    expect(read).toHaveLength(1);
    expect(read[0].id).toBe('5');
  });
});
