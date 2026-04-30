import { describe, it, expect, beforeEach } from 'vitest';
import { useBookshelfStore } from '@shared/store/bookshelf';
import type { Book } from '@modules/book/model/Book';

const emptyBookshelf = { to_read: [], reading: [], read: [] };

const makeBook = (id: string): Book => ({
  id,
  volumeInfo: { title: `Book ${id}` },
  saleInfo: { country: 'US' },
});

describe('useBookshelfStore — save', () => {
  beforeEach(() => {
    useBookshelfStore.setState({ bookshelf: emptyBookshelf });
  });

  it('saves a book to to_read', () => {
    useBookshelfStore.getState().save({ book: makeBook('1'), status: 'to_read' });
    expect(useBookshelfStore.getState().bookshelf.to_read).toHaveLength(1);
  });

  it('saves a book to reading', () => {
    useBookshelfStore.getState().save({ book: makeBook('2'), status: 'reading' });
    expect(useBookshelfStore.getState().bookshelf.reading).toHaveLength(1);
  });

  it('saves a book to read', () => {
    useBookshelfStore.getState().save({ book: makeBook('3'), status: 'read' });
    expect(useBookshelfStore.getState().bookshelf.read).toHaveLength(1);
  });

  it('moves a book from one shelf to another', () => {
    const book = makeBook('4');
    useBookshelfStore.getState().save({ book, status: 'to_read' });
    useBookshelfStore.getState().save({ book, status: 'reading' });

    const { bookshelf } = useBookshelfStore.getState();
    expect(bookshelf.to_read).toHaveLength(0);
    expect(bookshelf.reading).toHaveLength(1);
  });

  it('does not duplicate a book on the same shelf', () => {
    const book = makeBook('5');
    useBookshelfStore.getState().save({ book, status: 'read' });
    useBookshelfStore.getState().save({ book, status: 'read' });

    expect(useBookshelfStore.getState().bookshelf.read).toHaveLength(1);
  });
});
