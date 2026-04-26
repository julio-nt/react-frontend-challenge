export type BookStatus = keyof typeof BOOK_STATUS;

export const BOOK_STATUS = {
  to_read: 'Quero Ler',
  reading: 'Lendo',
  read: 'Concluído',
};
