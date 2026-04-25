import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '../ui/combobox';
import { Field, FieldGroup, FieldLabel } from '../ui/field';

interface Option {
  label: string;
  value: string | number;
}

interface ControlledComboboxProps<T extends FieldValues> {
  label: string;
  control: Control<T>;
  name: Path<T>;
  options: Option[];
}

const ControlledCombobox = <T extends FieldValues>({
  label,
  control,
  name,
  options,
}: ControlledComboboxProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FieldGroup>
          <Field className='space-y-[-0.25rem]'>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

            <Combobox
              items={options}
              itemToStringValue={(option) => option.label}
              value={options.find((o) => o.value === field.value) ?? null}
              onValueChange={(option) => field.onChange(option?.value)}
            >
              <ComboboxInput placeholder='Selecione uma opção' />
              <ComboboxContent>
                <ComboboxEmpty>Nenhuma opção encontrada.</ComboboxEmpty>
                <ComboboxList>
                  {(item: Option) => (
                    <ComboboxItem key={item.value} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
        </FieldGroup>
      )}
    />
  );
};

export default ControlledCombobox;
