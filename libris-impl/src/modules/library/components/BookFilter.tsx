import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shared/components/ui/dialog';
import { useForm } from 'react-hook-form';
import type { SearchBookFilter } from '../useCase/useSearchBook/interface';
import ControlledInput from '@shared/components/controlled/ControlledInput';
import { Search } from 'lucide-react';
import { Button } from '@shared/components/ui/button';
import { useEffect, useState } from 'react';
import { useDebounce } from '@shared/hooks/use-debounce';
import ControlledSelect from '@shared/components/controlled/ControlledSelect';
import { useSearch } from '@tanstack/react-router';
import { useSearchStore } from '../../../shared/store/search';

const BookFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { saveSearch } = useSearchStore();

  const { q, inauthor, intitle, inpublisher, maxResults, orderBy, printType } = useSearch({
    strict: false,
  });

  const formFilter = useForm<SearchBookFilter>({
    defaultValues: {
      q: q || '',
      inauthor: inauthor || '',
      intitle: intitle || '',
      inpublisher: inpublisher || '',
      maxResults: maxResults || 20,
      orderBy: orderBy || 'relevance',
      printType: printType || 'all',
    },
  });

  const debouncedQ = useDebounce(formFilter.watch('q'), 500);

  const handleClear = () => {
    formFilter.setValue('inauthor', '');
    formFilter.setValue('intitle', '');
    formFilter.setValue('inpublisher', '');
    formFilter.setValue('maxResults', 20);
    formFilter.setValue('orderBy', 'relevance');
    formFilter.setValue('printType', 'all');
  };

  function handleSearch() {
    const qToUse = debouncedQ || formFilter.getValues('q') || ' ';
    const filters = formFilter.getValues();
    saveSearch({
      ...filters,
      q: qToUse,
    });
    setIsOpen(false);
  }

  function handleDetailedSearch(values: SearchBookFilter) {
    if (!values.intitle && !values.inauthor && !values.inpublisher) {
      handleSearch();
      return;
    }

    saveSearch({
      ...values,
      q: values.q || ' ',
    });
    setIsOpen(false);
  }

  useEffect(() => {
    if (debouncedQ) handleSearch();
  }, [debouncedQ]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className='w-full max-w-[700px]'>
        <div className='relative w-full '>
          <div className='absolute right-0 bottom-0 flex'>
            <Button
              variant={'outline'}
              className='w-16 rounded-r-none rounded-l-none'
              onClick={() => handleSearch()}
            >
              <Search size={16} />
            </Button>

            <Button
              variant={'secondary'}
              className=' rounded-l-none'
              onClick={() => setIsOpen(true)}
            >
              Mais Filtros
            </Button>
          </div>
          <ControlledInput placeholder='Faça uma busca...' name='q' control={formFilter.control} />
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pesquisar por livros</DialogTitle>
            <DialogDescription>
              Use os campos abaixo para refinar sua busca por livros
            </DialogDescription>
          </DialogHeader>

          <form className='space-y-4' onSubmit={formFilter.handleSubmit(handleDetailedSearch)}>
            <ControlledInput
              label='Título'
              name='intitle'
              control={formFilter.control}
              error={formFilter.formState.errors}
            />
            <ControlledInput
              label='Autor'
              name='inauthor'
              control={formFilter.control}
              error={formFilter.formState.errors}
            />
            <ControlledInput
              label='Editora'
              name='inpublisher'
              control={formFilter.control}
              error={formFilter.formState.errors}
            />

            <hr className='bg-muted' />

            <div className='grid grid-cols-2 gap-4'>
              <ControlledSelect
                label='Tipo de busca'
                name='printType'
                control={formFilter.control}
                options={[
                  { label: 'Todos', value: 'all' },
                  { label: 'Livros', value: 'books' },
                  { label: 'Revistas', value: 'magazines' },
                ]}
              />

              <ControlledSelect
                label='Ordenar por'
                name='orderBy'
                control={formFilter.control}
                options={[
                  { label: 'Mais Relevantes', value: 'relevance' },
                  { label: 'Mais novos', value: 'newest' },
                ]}
              />

              <ControlledSelect
                label='Tamanho da página'
                name='maxResults'
                control={formFilter.control}
                options={[
                  { label: '5', value: 5 },
                  { label: '10', value: 10 },
                  { label: '15', value: 15 },
                  { label: '20', value: 20 },
                ]}
              />
            </div>

            <div className='grid grid-cols-2 gap-4 items-center mt-8'>
              <Button type='button' variant={'destructive'} onClick={handleClear}>
                Limpar Filtros
              </Button>
              <Button variant={'outline'}>Aplicar Filtros</Button>
            </div>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default BookFilter;
