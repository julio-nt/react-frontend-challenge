import type { User } from '@modules/account/model/User';

export interface RegisterStore {
  userList: User[];
  register: (user: User) => { ok: boolean; message?: string };
  lastEmail?: string;
  setLastEmail: (email: string) => void;
  removeLastEmail: () => void;
}
