import type { User } from '@modules/account/model/User';

export interface RegisterStore {
  userList: User[];
  register: (user: User) => { ok: boolean; message?: string };
}
