import { useForm } from 'react-hook-form';
import { registerSchema, type RegisterFormSchema } from './schema';
import ControlledInput from '@shared/components/controlled/ControlledInput';
import { Button } from '@shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@core/navigation';
import { useToast } from '@core/toast';
import { useRegister } from '@modules/account/useCase/useRegister';

const Component = () => {
  const { goTo } = useNavigation();
  const { toastSuccess } = useToast();

  const { mutate, isLoading, error } = useRegister();

  const registerForm = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function handleSubmit(values: RegisterFormSchema) {
    if (values.password !== values.confirmPassword) {
      registerForm.setError('confirmPassword', { message: 'As senhas não coincidem' });
      return;
    }

    const sendData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    mutate(sendData, {
      onSuccess: () => {
        goTo('/login', { email: values.email });
        toastSuccess('Cadastrado com sucesso, faça login para continuar!');
      },
    });
  }

  const formStateError = registerForm.formState.errors;

  return (
    <div className='flex flex-col h-screen w-full'>
      <div className='space-y-4 m-auto w-full max-w-[340px] border py-6 p-4 rounded shadow-lg'>
        <div>
          <p className='text-xl text-center'>Bem Vindo a Libris</p>
          <p className='text-center'>Sua biblioteca digital</p>
        </div>

        <form className='space-y-4' onSubmit={registerForm.handleSubmit(handleSubmit)}>
          <ControlledInput label='Nome' control={registerForm.control} name='name' error={formStateError} disabled={isLoading} />
          <ControlledInput
            label='Email'
            control={registerForm.control}
            name='email'
            error={formStateError}
            disabled={isLoading}
          />
          <ControlledInput
            label='Senha'
            control={registerForm.control}
            name='password'
            error={formStateError}
            type={'password'}
            disabled={isLoading}
          />
          <ControlledInput
            label='Confirmar Senha'
            control={registerForm.control}
            name='confirmPassword'
            error={formStateError}
            type={'password'}
            disabled={isLoading}
          />

          {error && <p className='text-red-500 text-sm text-center'>{error.message}</p>}

          <Button className='w-full' disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>

        <p className='text-center text-sm text-muted-foreground'>
          Já possui uma conta?
          <span className='text-blue-500 cursor-pointer hover:underline underline-offset-2' onClick={() => goTo('/login')}>
            {' '}
            Faça login
          </span>
        </p>
      </div>
    </div>
  );
};

const RegisterPage = {
  path: '/cadastro',
  Component,
};

export default RegisterPage;
