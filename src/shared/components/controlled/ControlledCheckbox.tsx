import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Checkbox } from '../ui/checkbox';

interface ControlledCheckboxProps<T extends FieldValues> {
  label: string;
  control: Control<T>;
  name: Path<T>;
}

const ControlledCheckbox = <T extends FieldValues>({ label, control, name, ...rest }: ControlledCheckboxProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FieldGroup>
          <Field orientation='horizontal' className='space-y-[-0.25rem]'>
            <Checkbox
              {...rest}
              id={field.name}
              name={field.name}
              ref={field.ref}
              checked={field.value}
              onCheckedChange={field.onChange}
              onBlur={field.onBlur}
            />
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          </Field>
        </FieldGroup>
      )}
    />
  );
};

export default ControlledCheckbox;
