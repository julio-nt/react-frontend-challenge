import { useRegisterStore } from '@modules/account/storage/register';
import { useMutation } from '@tanstack/react-query';
import type { RegisterRequest } from './interface';

export function useRegister() {
  const mutation = useMutation({
    mutationFn: async (body: RegisterRequest) => {
      const { name, email, password } = body;

      const { userList } = useRegisterStore.getState();
      const existingUser = userList.find((user) => user.email === email);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (existingUser) {
        throw new Error('Email já cadastrado');
      }

      const newUser = {
        id: crypto.randomUUID(),
        name: name,
        email: email,
        password: password,
        created_at: new Date().toISOString(),
      };

      useRegisterStore.getState().register(newUser);

      return { ok: true };
    },
  });

  return { mutate: mutation.mutate, isLoading: mutation.isPending, error: mutation.error };
}
