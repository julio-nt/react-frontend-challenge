import React from 'react';
import { Controller, type Control, type FieldError, type FieldErrors, type FieldValues, type Path } from 'react-hook-form';
import { Input } from '../ui/input';
import { Field, FieldLabel } from '../ui/field';
import Loading from '../ui/loading';

interface ControlledInputProps<T extends FieldValues> extends Omit<React.ComponentProps<'input'>, 'name'> {
  label?: string;
  control: Control<T>;
  name: Path<T>;
  error?: FieldErrors<T>;
  isLoading?: boolean;
}

const ControlledInput = <T extends FieldValues>({ label, control, name, error, isLoading, ...rest }: ControlledInputProps<T>) => {
  const fieldError = error?.[name] as FieldError | undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field className='space-y-[-0.25rem]'>
          <FieldLabel htmlFor={field.name}>
            {label}
            {isLoading && <Loading />}
          </FieldLabel>
          <Input {...field} {...rest} id={field.name} className={fieldError ? 'border-red-400' : ''} />
          {fieldError && <p className='text-red-400 text-sm'>{fieldError.message}</p>}
        </Field>
      )}
    />
  );
};

export default ControlledInput;
