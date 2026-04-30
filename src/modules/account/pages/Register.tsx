import MainContainer from '@modules/account/components/MainContainer';
import RegisterForm from '@modules/account/components/RegisterForm';

const Component = () => {
  return (
    <MainContainer>
      <div>
        <p className='text-xl text-center'>Bem Vindo a Libris</p>
        <p className='text-center'>Cadastre sua conta</p>
      </div>

      <RegisterForm />
    </MainContainer>
  );
};

const RegisterPage = {
  path: '/cadastro',
  Component,
};

export default RegisterPage;
