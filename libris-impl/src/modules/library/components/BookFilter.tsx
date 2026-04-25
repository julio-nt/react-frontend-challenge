import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shared/components/ui/dialog';
import { useForm } from 'react-hook-form';
import type { SearchBookFilter } from '../useCase/useSearchBook/interface';
import ControlledInput from '@shared/components/controlled/ControlledInput';
import { Search } from 'lucide-react';
import { Button } from '@shared/components/ui/button';
import { useEffect, useState } from 'react';
import { useDebounce } from '@shared/hooks/use-debounce';
import ControlledCombobox from '@shared/components/controlled/ControlledCombobox';

interface BookFilterProps {
  onFilter: (filters: SearchBookFilter) => void;
}

const BookFilter = ({ onFilter }: BookFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formFilter = useForm<SearchBookFilter>({
    defaultValues: {
      q: '',
      inauthor: '',
      intitle: '',
      inpublisher: '',
      maxResults: 30,
      orderBy: 'relevance',
      printType: 'all',
    },
  });

  const debouncedQ = useDebounce(formFilter.watch('q'), 500);

  const handleClear = () => {
    formFilter.setValue('q', '');
    formFilter.setValue('inauthor', '');
    formFilter.setValue('intitle', '');
    formFilter.setValue('inpublisher', '');
    formFilter.setValue('maxResults', 30);
    formFilter.setValue('orderBy', 'relevance');
    formFilter.setValue('printType', 'all');
  };

  function handleSearch(q?: string) {
    const qToUse = q || formFilter.getValues('q');
    onFilter({
      q: qToUse,
      startIndex: 0,
    });
    setIsOpen(false);
  }

  function handleDetailedSearch(values: SearchBookFilter) {
    onFilter({
      ...values,
      q: values.intitle || values.inauthor || values.inpublisher || ' ',
      startIndex: 0,
    });
    setIsOpen(false);
  }

  useEffect(() => {
    if (debouncedQ) handleSearch(debouncedQ);
  }, [debouncedQ]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div>
        <div className='relative'>
          <div className='absolute right-0 bottom-0 flex'>
            <Button
              variant={'outline'}
              className='w-16 rounded-r-none rounded-l-none'
              onClick={() => handleSearch()}
            >
              <Search size={16} />
            </Button>
            <DialogTrigger asChild>
              <Button variant={'secondary'} className=' rounded-l-none'>
                Mais Filtros
              </Button>
            </DialogTrigger>
          </div>
          <ControlledInput label='Faça uma busca' name='q' control={formFilter.control} />
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pesquisar por livros</DialogTitle>
            <DialogDescription>
              Use os campos abaixo para refinar sua busca por livros
            </DialogDescription>
          </DialogHeader>

          <form className='space-y-4' onSubmit={formFilter.handleSubmit(handleDetailedSearch)}>
            <ControlledInput label='Título' name='intitle' control={formFilter.control} />
            <ControlledInput label='Autor' name='inauthor' control={formFilter.control} />
            <ControlledInput label='Editora' name='inpublisher' control={formFilter.control} />

            <div className='grid grid-cols-2 gap-4'>
              <ControlledCombobox
                label='Tipo de busca'
                name='printType'
                control={formFilter.control}
                options={[
                  { label: 'Todos', value: 'all' },
                  { label: 'Livros', value: 'books' },
                  { label: 'Revistas', value: 'magazines' },
                ]}
              />

              <ControlledCombobox
                label='Ordenar por'
                name='orderBy'
                control={formFilter.control}
                options={[
                  { label: 'Mais Relevantes', value: 'relevance' },
                  { label: 'Mais novos', value: 'newest' },
                ]}
              />

              <ControlledCombobox
                label='Tamanho da página'
                name='maxResults'
                control={formFilter.control}
                options={[
                  { label: '5', value: 5 },
                  { label: '10', value: 10 },
                  { label: '15', value: 15 },
                  { label: '20', value: 20 },
                  { label: '30', value: 30 },
                  { label: '40', value: 40 },
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
