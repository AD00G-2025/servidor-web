import { z } from 'zod';

export const registerSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const taskSchema = z.object({
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  concluida: z.boolean().default(false),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;