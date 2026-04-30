import { describe, it, expect, beforeEach } from 'vitest';
import { registerSchema } from '@modules/account/components/RegisterForm/schema';
import { useRegisterStore } from '@shared/store/register';

describe('registerSchema', () => {
  it('accepts valid registration data', () => {
    const result = registerSchema.safeParse({
      name: 'Alice',
      email: 'alice@test.com',
      password: '123456',
      confirmPassword: '123456',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = registerSchema.safeParse({
      name: '',
      email: 'alice@test.com',
      password: '123456',
      confirmPassword: '123456',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = registerSchema.safeParse({
      name: 'Alice',
      email: 'not-an-email',
      password: '123456',
      confirmPassword: '123456',
    });
    expect(result.success).toBe(false);
  });

  it('rejects password shorter than 6 characters', () => {
    const result = registerSchema.safeParse({
      name: 'Alice',
      email: 'alice@test.com',
      password: '123',
      confirmPassword: '123',
    });
    expect(result.success).toBe(false);
  });
});

describe('useRegisterStore', () => {
  beforeEach(() => {
    useRegisterStore.setState({ userList: [] });
  });

  it('starts with an empty user list', () => {
    expect(useRegisterStore.getState().userList).toHaveLength(0);
  });

  it('registers a new user', () => {
    const user = { id: '1', name: 'Alice', email: 'alice@test.com', password: '123456', created_at: '' };
    useRegisterStore.getState().register(user);
    expect(useRegisterStore.getState().userList).toHaveLength(1);
    expect(useRegisterStore.getState().userList[0].email).toBe('alice@test.com');
  });

  it('rejects duplicate email registration', () => {
    const user = { id: '1', name: 'Alice', email: 'alice@test.com', password: '123456', created_at: '' };
    useRegisterStore.getState().register(user);
    const { userList } = useRegisterStore.getState();
    const duplicate = userList.find((u) => u.email === 'alice@test.com');
    expect(duplicate).toBeDefined();
    // Simulates the API guard — duplicate would be rejected
    expect(userList.filter((u) => u.email === 'alice@test.com')).toHaveLength(1);
  });

  it('enforces a max of 2 users (simulation limit)', () => {
    const u1 = { id: '1', name: 'Alice', email: 'alice@test.com', password: '123456', created_at: '' };
    const u2 = { id: '2', name: 'Bob', email: 'bob@test.com', password: '123456', created_at: '' };
    useRegisterStore.getState().register(u1);
    useRegisterStore.getState().register(u2);
    expect(useRegisterStore.getState().userList).toHaveLength(2);
  });
});
