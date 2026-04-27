import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book } from '../../library/model/Book';
import type { BookStatus } from '../../library/model/BookStatus';

interface BookshelfStore {
  bookshelf: {
    to_read: Book[];
    reading: Book[];
    read: Book[];
  };
  save: ({ book, status }: { book: Book; status: BookStatus }) => void;
  remove: ({ bookId, status }: { bookId: string; status: BookStatus }) => void;
}

export const useBookshelfStore = create<BookshelfStore>()(
  persist(
    (set, get) => {
      function save({ book, status }: { book: Book; status: BookStatus }) {
        const currentBookShelf = Object.entries(get().bookshelf).find(([, books]) =>
          books.some((b) => b.id === book.id)
        );

        set((state) => {
          const newBookshelf = { ...state.bookshelf };

          if (currentBookShelf) {
            const [key] = currentBookShelf;
            newBookshelf[key as BookStatus] = newBookshelf[key as BookStatus].filter(
              (b) => b.id !== book.id
            );
          }

          newBookshelf[status] = [...newBookshelf[status], book];

          return { bookshelf: newBookshelf };
        });
      }

      function remove({ bookId, status }: { bookId: string; status: BookStatus }) {
        const currentShelf = get().bookshelf?.[status] ?? [];

        const updatedShelf = currentShelf.filter((b) => b.id !== bookId);

        set((state) => ({
          bookshelf: {
            ...state.bookshelf,
            [status]: updatedShelf,
          },
        }));
      }

      return { bookshelf: { to_read: [], reading: [], read: [] }, save, remove };
    },
    { name: 'bookshelf-store' }
  )
);
