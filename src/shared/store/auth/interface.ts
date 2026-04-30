import type { User } from '@modules/account/model/User';

export interface AuthStore {
  loggedUser: User | null;
  login: (user: User) => void;
  logout: () => void;
}
