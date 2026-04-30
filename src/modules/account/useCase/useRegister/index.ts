import { useMutation } from '@tanstack/react-query';
import type { RegisterRequest } from './interface';
import { useApiSimulation } from '@core/_api/register';

export function useRegister() {
  const { simulateRegister } = useApiSimulation();

  const mutation = useMutation({
    mutationFn: async (body: RegisterRequest) => {
      await simulateRegister(body);

      return { ok: true };
    },
  });

  return { mutate: mutation.mutate, isLoading: mutation.isPending, error: mutation.error };
}
