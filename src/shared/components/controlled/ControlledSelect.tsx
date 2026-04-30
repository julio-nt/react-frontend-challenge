import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Field, FieldGroup, FieldLabel } from '../ui/field';

interface Option {
  label: string;
  value: string | number;
}

interface ControlledSelectProps<T extends FieldValues> {
  label: string;
  groupLabel?: string;
  control: Control<T>;
  name: Path<T>;
  options: Option[];
}

const ControlledSelect = <T extends FieldValues>({
  label,
  control,
  name,
  groupLabel,
  options,
}: ControlledSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value = field.value.toString() || '__empty__';

        function handleChange(newValue: string) {
          if (newValue === '__empty__') {
            field.onChange('');
            return;
          }

          field.onChange(newValue);
        }

        return (
          <FieldGroup>
            <Field className='space-y-[-0.25rem]'>
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

              <Select value={value} onValueChange={handleChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Selecione uma opção' />
                </SelectTrigger>
                <SelectContent>
                  {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
                  <SelectGroup>
                    {!options || options.length === 0 ? (
                      <SelectItem value='__empty__' disabled>
                        Nenhum item disponível
                      </SelectItem>
                    ) : (
                      options.map((item) => {
                        const optionValue = item.value.toString() || '__empty__';
                        return (
                          <SelectItem key={item.value} value={optionValue}>
                            {item.label}
                          </SelectItem>
                        );
                      })
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        );
      }}
    />
  );
};

export default ControlledSelect;
