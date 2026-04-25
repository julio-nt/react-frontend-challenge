import { Button } from '@shared/components/ui/button';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginFormData } from './schema';
import ControlledInput from '@shared/components/controlled/ControlledInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@core/navigation';
import { useLogin } from '@modules/account/useCase/useLogin';
import ControlledCheckbox from '@shared/components/controlled/ControlledCheckbox';
import { useSearch } from '@tanstack/react-router';

const Component = () => {
  const { goTo } = useNavigation();
  const { mutate, isLoading, error } = useLogin();

  const search = useSearch({
    from: '/login',
  });

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: search.email || '',
      password: '',
      rememberMe: false,
    },
  });

  function handleSubmit(values: LoginFormData) {
    const { email, password } = values;

    mutate(
      { email, password },
      {
        onSuccess: () => {
          goTo('/');
        },
      }
    );
  }

  function handleLinkClick(to: 'cadastro' | 'esqueci-senha') {
    goTo(`/${to}`);
  }

  const formStateError = loginForm.formState.errors;

  return (
    <div className='flex flex-col h-screen w-full'>
      <div className='space-y-4 m-auto w-full max-w-[340px] border py-6 p-4 rounded shadow-lg'>
        <div>
          <p className='text-xl text-center'>Bem Vindo a Libris</p>
          <p className='text-center'>Sua biblioteca digital</p>
        </div>

        <form className='space-y-4' onSubmit={loginForm.handleSubmit(handleSubmit)}>
          <ControlledInput label='Email' control={loginForm.control} name='email' error={formStateError} />
          <ControlledInput label='Senha' control={loginForm.control} name='password' error={formStateError} type='password' />

          <ControlledCheckbox label='Lembrar de mim' control={loginForm.control} name='rememberMe' />

          {error && <p className='text-red-500 text-sm text-center'>{error.message}</p>}

          <Button className='w-full' isLoading={isLoading}>
            Entrar
          </Button>
        </form>

        <div>
          <p
            className='text-center text-sm text-muted-foreground cursor-pointer hover:underline underline-offset-2'
            onClick={() => handleLinkClick('esqueci-senha')}
          >
            Esqueceu sua senha?
          </p>
          <p className='text-center text-sm text-muted-foreground'>
            Não tem uma conta?
            <span
              className='text-blue-500 cursor-pointer hover:underline underline-offset-2'
              onClick={() => handleLinkClick('cadastro')}
            >
              {' '}
              Cadastre-se
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const LoginPage = {
  path: '/login',
  Component,
};

export default LoginPage;
