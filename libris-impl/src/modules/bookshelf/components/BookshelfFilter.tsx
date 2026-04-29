import ControlledSelect from '@shared/components/controlled/ControlledSelect';
import ControlledInput from '@shared/components/controlled/ControlledInput';
import { useForm } from 'react-hook-form';
import { useUrlFilter } from '../useCase/useUrlFilter';
import { BOOK_STATUS } from '@modules/library/model/BookStatus';
import { useState } from 'react';
import type { BookshelfListFilters } from '../useCase/useUrlFilter/interface';
import { Button } from '@shared/components/ui/button';
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shared/components/ui/dialog';
import { useBookshelfFilter } from '../useCase/useBookshelfFilter';

const statusOptions = [
  { label: 'Todos', value: '' },
  ...Object.entries(BOOK_STATUS).map(([key, label]) => ({ label, value: key })),
];

const BookshelfFilter = ({ setIsOpenMobile }: { setIsOpenMobile: (open: boolean) => void }) => {
  const { filters } = useUrlFilter();

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const formFilters = useForm<BookshelfListFilters>({
    defaultValues: {
      name: filters.name ?? '',
      status: filters.status ?? '',
      author: filters.author ?? '',
      publisher: filters.publisher ?? '',
      maxResults: filters.maxResults ?? 20,
    },
  });

  const { handleSearch, handleClear } = useBookshelfFilter({
    formFilters,
    dialogState: { isOpen: isOpenDialog, setIsOpen: setIsOpenDialog },
    dialogStateMobile: { isOpen: false, setIsOpen: setIsOpenMobile },
  });

  return (
    <div className='w-full max-w-[700px]'>
      <div className='relative w-full '>
        <div className='absolute right-0 bottom-0 flex'>
          <Button
            variant={'outline'}
            className='w-16 rounded-r-none rounded-l-none'
            onClick={() => handleSearch(formFilters.getValues())}
          >
            <Search size={16} />
          </Button>

          <Button
            variant={'secondary'}
            className=' rounded-l-none'
            onClick={() => setIsOpenDialog(true)}
          >
            Mais Filtros
          </Button>
        </div>

        <ControlledInput
          placeholder='Busque por um titulo na sua estante...'
          name='name'
          control={formFilters.control}
        />
      </div>

      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pesquisar por livros na estante</DialogTitle>
            <DialogDescription>
              Use os campos abaixo para refinar sua busca por livros na sua estante
            </DialogDescription>
          </DialogHeader>

          <form className='space-y-4' onSubmit={formFilters.handleSubmit(handleSearch)}>
            <ControlledInput
              label='Título'
              name='name'
              control={formFilters.control}
              error={formFilters.formState.errors}
            />
            <ControlledInput
              label='Autor'
              name='author'
              control={formFilters.control}
              error={formFilters.formState.errors}
            />
            <ControlledInput
              label='Editora'
              name='publisher'
              control={formFilters.control}
              error={formFilters.formState.errors}
            />

            <hr className='bg-muted' />

            <div className='grid sm:grid-cols-2 gap-4'>
              <ControlledSelect
                label='Status'
                name='status'
                control={formFilters.control}
                options={statusOptions}
              />

              <ControlledSelect
                label='Tamanho da página'
                name='maxResults'
                control={formFilters.control}
                options={[
                  { label: '5', value: 5 },
                  { label: '10', value: 10 },
                  { label: '15', value: 15 },
                  { label: '20', value: 20 },
                ]}
              />
            </div>

            <div className='grid sm:grid-cols-2 gap-4 items-center mt-8'>
              <Button type='button' variant={'destructive'} onClick={handleClear}>
                Limpar Filtros
              </Button>
              <Button variant={'outline'}>Aplicar Filtros</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookshelfFilter;
