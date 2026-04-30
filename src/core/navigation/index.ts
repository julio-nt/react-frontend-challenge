import { useNavigate } from '@tanstack/react-router';

export type NavigationLinks =
  | '/'
  | '/login'
  | '/cadastro'
  | '/estantes'
  | '/estantes?status=to_read'
  | '/estantes?status=reading'
  | '/estantes?status=read'
  | '/livro/$id';

export function useNavigation() {
  const navigate = useNavigate();

  function goTo(
    url: NavigationLinks,
    { search, params }: { search?: Record<string, string>; params?: Record<string, string> } = {}
  ) {
    navigate({ to: url, search, params });
  }

  return { goTo };
}
