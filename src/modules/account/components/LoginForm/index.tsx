import { useNavigation } from '@core/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from './schema';
import { useRegisterStore } from '@shared/store/register';
import { useLogin } from '@modules/account/useCase/useLogin';
import ControlledCheckbox from '@shared/components/controlled/ControlledCheckbox';
import ControlledInput from '@shared/components/controlled/ControlledInput';
import { Button } from '@shared/components/ui/button';
import { useForm } from 'react-hook-form';
import { toast } from '@core/toast';

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

    mutate(
      { email, password },
      {
        onSuccess: () => {
          rememberMe ? setLastEmail(email) : removeLastEmail();
          goTo('/');
        },
        onError: (err) => {
          toast.error('Erro ao fazer login', {
            description: err.message,
          });
        },
      }
    );
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

        {error && <p className='text-red-400 text-sm text-center'>{error.message}</p>}

        <Button className='w-full' isLoading={isLoading}>
          Entrar
        </Button>
      </form>

      <p
        className='text-center text-sm text-muted-foreground cursor-pointer'
        onClick={() => goTo(`/cadastro`)}
      >
        Não tem uma conta?{' '}
        <span className='text-blue-400 hover:underline underline-offset-2'>Cadastre-se</span>
      </p>
    </>
  );
};

export default LoginForm;
