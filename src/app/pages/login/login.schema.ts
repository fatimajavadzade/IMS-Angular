import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('E-poçt düzgün formatda deyil'),
  password: z.string().min(1, 'Şifrə mütləqdir'),
});

export type LoginFormValue = z.infer<typeof loginSchema>;