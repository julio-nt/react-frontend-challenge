import { useRegisterStore } from '@modules/account/store/register';

interface Request {
  name: string;
  email: string;
  password: string;
}

export function useApiSimulation() {
  const { userList } = useRegisterStore.getState();

  async function simulateRegister(request: Request) {
    const { name, email, password } = request;

    const existingUser = userList.find((user) => user.email === email);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    if (userList.length >= 2) {
      throw new Error('Limite de 2 usuários atingido para simulação');
    }

    const randomID = Math.random().toString(36).substring(2, 15);

    const newUser = {
      id: randomID,
      name: name,
      email: email,
      password: password,
      created_at: new Date().toISOString(),
    };

    useRegisterStore.getState().register(newUser);

    return { ok: true, message: 'Usuário registrado com sucesso' };
  }

  return { simulateRegister };
}
