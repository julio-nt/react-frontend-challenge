import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BookshelfStore, RemoveBookshelfRequest, SaveBookshelfRequest } from './interface';

export const useBookshelfStore = create<BookshelfStore>()(
  persist(
    (set, get) => {
      function save({ book, status }: SaveBookshelfRequest) {
        const bookshelf = get().bookshelf;

        const existingBookIndex = bookshelf.findIndex((b) => b.id === book.id);

        if (existingBookIndex === -1) {
          const newBook = { ...book, status };
          set(() => ({
            bookshelf: [...bookshelf, newBook],
          }));
          return;
        }

        const updatedShelf = bookshelf.map((b) => (b.id === book.id ? { ...b, status } : b));

        set(() => {
          return { bookshelf: updatedShelf };
        });
      }

      function remove({ bookId }: RemoveBookshelfRequest) {
        const bookshelf = get().bookshelf;

        const updatedShelf = bookshelf.filter((b) => b.id !== bookId);

        set(() => ({
          bookshelf: updatedShelf,
        }));
      }

      return { bookshelf: [], save, remove };
    },
    { name: 'bookshelf-store' }
  )
);
