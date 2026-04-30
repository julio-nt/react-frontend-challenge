import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BookStatus } from '../../../modules/library/model/BookStatus';
import type { BookshelfStore, RemoveBookshelfRequest, SaveBookshelfRequest } from './interface';
import type { Book } from '@modules/library/model/Book';

export const useBookshelfStore = create<BookshelfStore>()(
  persist(
    (set, get) => {
      function save({ book, status }: SaveBookshelfRequest) {
        const bookshelf = get().bookshelf;
        const currentBookShelf = Object.entries(bookshelf).find(([, books]) =>
          books.some((b: Book) => b.id === book.id)
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

      function remove({ bookId, status }: RemoveBookshelfRequest) {
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
