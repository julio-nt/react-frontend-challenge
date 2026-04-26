import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book } from '../model/Book';
import type { BookStatus } from '../model/BookStatus';

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
        const currentShelf = get().bookshelf?.[status] ?? [];

        const currentBookShelf = Object.entries(get().bookshelf).find(([, books]) =>
          books.some((b) => b.id === book.id)
        );

        if (currentBookShelf) {
          const [key, books] = currentBookShelf;

          const removedBookShelf = books.filter((b) => b.id !== book.id);

          set((state) => ({
            bookshelf: {
              ...state.bookshelf,
              [key]: removedBookShelf,
            },
          }));
        }

        const updatedShelf = [...currentShelf, book];

        set((state) => ({
          bookshelf: {
            ...state.bookshelf,
            [status]: updatedShelf,
          },
        }));
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
