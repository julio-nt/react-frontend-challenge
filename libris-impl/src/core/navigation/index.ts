import { useNavigate } from '@tanstack/react-router';

export type NavigationLinks = '/' | '/login' | '/inicio' | '/esqueci-senha' | '/cadastro';

export function useNavigation() {
  const navigate = useNavigate();

  function goTo(url: NavigationLinks, search?: Record<string, string>) {
    navigate({ to: url, search });
  }

  return { goTo };
}
