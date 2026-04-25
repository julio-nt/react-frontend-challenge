import { QueryKeys } from '@core/query/interface';
import { useAuthStore } from '@modules/account/storage/auth';
import { useQuery } from '@tanstack/react-query';

export function useLoggedUser() {
  const query = useQuery({
    queryKey: [QueryKeys.LOGGED_USER],
    retry: false,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const loggedUser = useAuthStore.getState().loggedUser;

      if (!loggedUser) {
        throw new Error('Não há usuário logado');
      }

      return loggedUser;
    },
  });

  return { loggedUser: query.data, isLoading: query.isPending };
}
