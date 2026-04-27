import { useNavigation } from '@core/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from './schema';
import { useRegisterStore } from '@modules/account/store/register';
import { useLogin } from '@modules/account/useCase/useLogin';
import ControlledCheckbox from '@shared/components/controlled/ControlledCheckbox';
import ControlledInput from '@shared/components/controlled/ControlledInput';
import { Button } from '@shared/components/ui/button';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const { goTo } = useNavigation();
  const { mutate, isLoading, error } = useLogin();
  const { lastEmail, setLastEmail, removeLastEmail } = useRegisterStore();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: lastEmail || '',
      password: '',
      rememberMe: lastEmail ? true : false,
    },
  });

  function handleSubmit(values: LoginFormData) {
    const { email, password, rememberMe } = values;

    console.log('Login data:', { rememberMe });

    mutate(
      { email, password },
      {
        onSuccess: () => {
          console.log('aqui');
          rememberMe ? setLastEmail(email) : removeLastEmail();
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
    <>
      <form className='space-y-4' onSubmit={loginForm.handleSubmit(handleSubmit)}>
        <ControlledInput
          label='Email'
          control={loginForm.control}
          name='email'
          error={formStateError}
        />
        <ControlledInput
          label='Senha'
          control={loginForm.control}
          name='password'
          error={formStateError}
          type='password'
        />

        <ControlledCheckbox label='Lembrar de mim' control={loginForm.control} name='rememberMe' />

        {error && <p className='text-red-500 text-sm text-center'>{error.message}</p>}

        <Button className='w-full' isLoading={isLoading}>
          Entrar
        </Button>
      </form>

      <div className='space-y-2'>
        <p
          className='text-center text-sm text-muted-foreground cursor-pointer hover:underline underline-offset-2'
          onClick={() => handleLinkClick('esqueci-senha')}
        >
          Esqueceu sua senha?
        </p>
        <p
          className='text-center text-sm text-muted-foreground cursor-pointer'
          onClick={() => handleLinkClick('cadastro')}
        >
          Não tem uma conta?{' '}
          <span className='text-blue-400 hover:underline underline-offset-2'>Cadastre-se</span>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
