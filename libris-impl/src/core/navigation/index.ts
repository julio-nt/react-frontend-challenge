import { useNavigate } from '@tanstack/react-router';

export type NavigationLinks = '/' | '/login' | '/cadastro' | '/estantes';

export function useNavigation() {
  const navigate = useNavigate();

  function goTo(url: NavigationLinks, search?: Record<string, string>) {
    navigate({ to: url, search });
  }

  return { goTo };
}
