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

interface BookFilterProps {
  onFilter: (filters: SearchBookFilter) => void;
}

const BookFilter = ({ onFilter }: BookFilterProps) => {
  const formFilter = useForm<SearchBookFilter>({
    defaultValues: {
      q: '',
      inauthor: '',
      intitle: '',
      inpublisher: '',
      isbn: '',
      lccn: '',
      oclc: '',
      subject: '',
    },
  });

  const handleClear = () => {
    formFilter.reset({});
  };

  function handleSearch() {
    onFilter({
      q: formFilter.getValues('q'),
    });
  }

  function handleFilter(values: SearchBookFilter) {
    onFilter({
      ...values,
      q:
        values.intitle ||
        values.inauthor ||
        values.inpublisher ||
        values.isbn ||
        values.lccn ||
        values.oclc ||
        values.subject ||
        values.q,
    });
  }

  return (
    <Dialog>
      <div>
        <div className='relative'>
          <div className='absolute right-0 bottom-0 flex'>
            <Button variant={'outline'} className='w-16 rounded-r-none' onClick={handleSearch}>
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

          <form className='space-y-4' onSubmit={formFilter.handleSubmit(handleFilter)}>
            <ControlledInput label='Título' name='intitle' control={formFilter.control} />
            <ControlledInput label='Autor' name='inauthor' control={formFilter.control} />
            <ControlledInput label='Editora' name='inpublisher' control={formFilter.control} />
            <ControlledInput label='ISBN' name='isbn' control={formFilter.control} />
            <ControlledInput label='LCCN' name='lccn' control={formFilter.control} />
            <ControlledInput label='OCLC' name='oclc' control={formFilter.control} />
            <ControlledInput label='Assunto' name='subject' control={formFilter.control} />

            <div className='grid grid-cols-2 gap-4 items-center'>
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
