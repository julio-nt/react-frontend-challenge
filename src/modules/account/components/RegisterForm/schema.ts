import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.email('Email inválido'),
  password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
});

export type RegisterFormSchema = z.infer<typeof registerSchema>;
