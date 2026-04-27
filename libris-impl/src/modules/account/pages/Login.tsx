import LoginForm from '@modules/account/components/LoginForm';
import MainContainer from '@modules/account/components/MainContainer';

const Component = () => {
  return (
    <MainContainer>
      <div>
        <p className='text-xl text-center'>Bem Vindo a Libris</p>
        <p className='text-center'>Sua biblioteca digital</p>
      </div>

      <LoginForm />
    </MainContainer>
  );
};

const LoginPage = {
  path: '/login',
  Component,
};

export default LoginPage;
