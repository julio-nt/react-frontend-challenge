import { useNavigation } from '@core/navigation';
import { registerSchema, type RegisterFormSchema } from './schema';
import { useRegisterStore } from '@modules/account/store/register';
import { useRegister } from '@modules/account/useCase/useRegister';
import ControlledInput from '@shared/components/controlled/ControlledInput';
import { useForm } from 'react-hook-form';
import { Button } from '@shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@core/toast';

const RegisterForm = () => {
  const { goTo } = useNavigation();
  const { setLastEmail } = useRegisterStore();

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
        setLastEmail(values.email);
        goTo('/login');
        toast.success('Cadastro realizado com sucesso!', {
          description: 'Faça login para continuar.',
        });
      },
      onError: (err) => {
        toast.error('Erro ao cadastrar', {
          description: err.message,
        });
      },
    });
  }

  const formStateError = registerForm.formState.errors;

  return (
    <>
      <form className='space-y-4' onSubmit={registerForm.handleSubmit(handleSubmit)}>
        <ControlledInput
          label='Nome'
          control={registerForm.control}
          name='name'
          error={formStateError}
          disabled={isLoading}
        />
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

        {error && <p className='text-red-400 text-sm text-center'>{error.message}</p>}

        <Button className='w-full' disabled={isLoading}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </form>

      <p className='text-center text-sm text-muted-foreground'>
        Já possui uma conta?
        <span
          className='text-blue-500 cursor-pointer hover:underline underline-offset-2'
          onClick={() => goTo('/login')}
        >
          {' '}
          Faça login
        </span>
      </p>
    </>
  );
};

export default RegisterForm;
