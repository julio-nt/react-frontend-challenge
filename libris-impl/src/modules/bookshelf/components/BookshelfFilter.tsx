import ControlledCombobox from '@shared/components/controlled/ControlledCombobox';
import ControlledInput from '@shared/components/controlled/ControlledInput';
import { useForm } from 'react-hook-form';

const BookshelfFilter = () => {
  const formFilters = useForm({
    defaultValues: {
      name: '',
      status: '',
    },
  });

  return (
    <div className='grid grid-cols-2 gap-4'>
      <ControlledInput label='Nome' name='name' control={formFilters.control} />
      <ControlledCombobox label='Status' name='status' control={formFilters.control} options={[]} />
    </div>
  );
};

export default BookshelfFilter;
