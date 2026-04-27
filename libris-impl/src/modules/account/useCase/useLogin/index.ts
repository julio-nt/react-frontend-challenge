import { useAuthStore } from '@modules/account/store/auth';
import { useRegisterStore } from '@modules/account/store/register';
import { useMutation } from '@tanstack/react-query';
import type { LoginRequest } from './interface';

export function useLogin() {
  const mutation = useMutation({
    mutationFn: async (body: LoginRequest) => {
      const { email, password } = body;

      const { userList } = useRegisterStore.getState();
      const existingUser = userList.find((user) => user.email === email && user.password === password);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (existingUser) {
        useAuthStore.getState().login(existingUser);
        return { ok: true, user: existingUser };
      }

      throw new Error('Email ou senha inválidos');
    },
  });

  return { mutate: mutation.mutate, isLoading: mutation.isPending, error: mutation.error };
}
