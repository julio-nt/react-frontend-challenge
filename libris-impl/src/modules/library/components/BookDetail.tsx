import { useBookshelfStore } from '@shared/store/bookshelf';
import { useState } from 'react';
import type { Book } from '../model/Book';
import { BookOpen, Building2, Calendar, FileText, Globe, Tag } from 'lucide-react';
import { formatDate } from '@shared/util/date';
import { Button } from '@shared/components/ui/button';
import { BOOK_STATUS } from '../model/BookStatus';
import { Separator } from '@shared/components/ui/separator';
import SaveBook from './SaveBook';

const BookDetail = ({ book }: { book: Book }) => {
  const bookshelf = useBookshelfStore((state) => state.bookshelf);

  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const currentShelf = bookshelf.to_read.find((b) => b.id === book?.id)
    ? 'to_read'
    : bookshelf.reading.find((b) => b.id === book?.id)
      ? 'reading'
      : bookshelf.read.find((b) => b.id === book?.id)
        ? 'read'
        : null;

  const { volumeInfo } = book;

  return (
    <>
      <div className='flex flex-col sm:flex-row gap-8'>
        <div className='shrink-0'>
          {volumeInfo.imageLinks?.thumbnail ? (
            <img
              src={volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')}
              alt={volumeInfo.title}
              className='w-[200px] h-[300px] object-cover rounded-lg shadow-lg'
            />
          ) : (
            <div className='w-[200px] h-[300px] bg-muted rounded-lg flex items-center justify-center shadow-lg'>
              <BookOpen className='h-12 w-12 text-muted-foreground' />
            </div>
          )}
        </div>

        <div className='flex-1 space-y-4'>
          <div>
            <h1 className='text-2xl font-bold leading-tight'>{volumeInfo.title ?? 'Sem título'}</h1>
            {volumeInfo.subtitle && (
              <p className='text-muted-foreground mt-1'>{volumeInfo.subtitle}</p>
            )}
          </div>

          {volumeInfo.authors && (
            <p className='text-sm font-medium'>{volumeInfo.authors.join(', ')}</p>
          )}

          <div className='flex flex-wrap gap-3 text-sm text-muted-foreground'>
            {volumeInfo.publishedDate && (
              <span className='flex items-center gap-1'>
                <Calendar className='h-4 w-4' />
                {formatDate(volumeInfo.publishedDate)}
              </span>
            )}
            {volumeInfo.publisher && (
              <span className='flex items-center gap-1'>
                <Building2 className='h-4 w-4' />
                {volumeInfo.publisher}
              </span>
            )}
            {volumeInfo.pageCount && (
              <span className='flex items-center gap-1'>
                <FileText className='h-4 w-4' />
                {volumeInfo.pageCount} páginas
              </span>
            )}
            {volumeInfo.language && (
              <span className='flex items-center gap-1'>
                <Globe className='h-4 w-4' />
                {volumeInfo.language.toUpperCase()}
              </span>
            )}
          </div>

          {volumeInfo.categories && volumeInfo.categories.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {volumeInfo.categories.map((cat) => (
                <span
                  key={cat}
                  className='flex items-center gap-1 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full'
                >
                  <Tag className='h-3 w-3' />
                  {cat}
                </span>
              ))}
            </div>
          )}

          <Button className='mt-2' onClick={() => setIsSaveDialogOpen(true)}>
            {currentShelf ? `${BOOK_STATUS[currentShelf]} · Alterar` : 'Salvar na estante'}
          </Button>
        </div>
      </div>

      {volumeInfo.description && (
        <>
          <Separator />
          <div className='space-y-2'>
            <h2 className='text-lg font-semibold'>Sinopse</h2>
            <p
              className='text-sm text-muted-foreground leading-relaxed'
              dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
            />
          </div>
        </>
      )}

      <SaveBook
        book={book}
        isOpen={isSaveDialogOpen}
        setIsOpen={setIsSaveDialogOpen}
        currentShelf={currentShelf}
      />
    </>
  );
};

export default BookDetail;
