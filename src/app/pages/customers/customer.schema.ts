import { z } from 'zod';

export const customerSchema = z.object({
  companyName: z.string().min(1, 'Şirkət adı mütləqdir'),
  voen: z.string().regex(/^$|^[0-9]{10}$/, 'VÖEN boş olmalı və ya 10 rəqəmdən ibarət olmalıdır'),
  contactPerson: z.string().min(1, 'Əlaqədar şəxs mütləqdir'),
  phone: z.string().regex(/^\+?[0-9]{7,15}$/, 'Telefon nömrəsi düzgün formatda deyil (7-15 rəqəm)'),
  email: z.email('E-poçt düzgün formatda deyil'),
  address: z.string(),
  // birthDate: zDateToIsoString
});

export type CustomerFormValue = z.infer<typeof customerSchema>;