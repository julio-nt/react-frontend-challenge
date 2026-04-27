import { useAuthStore } from '@modules/account/store/auth';
import { useMutation } from '@tanstack/react-query';

export function useLogout() {
  const mutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      useAuthStore.getState().logout();

      return { ok: true };
    },
  });

  return { mutate: mutation.mutate, isLoading: mutation.isPending };
}
