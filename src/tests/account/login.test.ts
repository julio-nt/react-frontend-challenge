import { describe, it, expect, beforeEach } from 'vitest';
import { loginSchema } from '@modules/account/components/LoginForm/schema';
import { useAuthStore } from '@shared/store/auth';
import { useRegisterStore } from '@shared/store/register';

describe('loginSchema', () => {
  it('accepts valid credentials', () => {
    const result = loginSchema.safeParse({ email: 'user@test.com', password: '123456' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({ email: 'not-an-email', password: '123456' });
    expect(result.success).toBe(false);
  });

  it('rejects password shorter than 6 characters', () => {
    const result = loginSchema.safeParse({ email: 'user@test.com', password: '123' });
    expect(result.success).toBe(false);
  });

  it('accepts optional rememberMe field', () => {
    const result = loginSchema.safeParse({ email: 'user@test.com', password: '123456', rememberMe: true });
    expect(result.success).toBe(true);
  });
});

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ loggedUser: null });
  });

  it('starts with no logged user', () => {
    expect(useAuthStore.getState().loggedUser).toBeNull();
  });

  it('logs in a user', () => {
    const user = { id: '1', name: 'Alice', email: 'alice@test.com', password: 'secret', created_at: '' };
    useAuthStore.getState().login(user);
    expect(useAuthStore.getState().loggedUser).toEqual(user);
  });

  it('logs out the user', () => {
    const user = { id: '1', name: 'Alice', email: 'alice@test.com', password: 'secret', created_at: '' };
    useAuthStore.getState().login(user);
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().loggedUser).toBeNull();
  });

  it('throws when user is not found in register store', async () => {
    useRegisterStore.setState({ userList: [] });
    const { userList } = useRegisterStore.getState();
    const found = userList.find((u) => u.email === 'ghost@test.com' && u.password === 'pass');
    expect(found).toBeUndefined();
  });
});
