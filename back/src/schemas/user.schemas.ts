import { hashSync } from 'bcryptjs';
import * as z from 'zod'

export const schemaUserRegister = z.object({
    name: z.string().min(3).max(30),
    email: z.string().max(100).min(6).email(),
    password: z.string().max(120).transform((password) => {
      return hashSync(password,10)
  })
  });

export const schemaUserLogin = z.object({
    email: z.string().max(100).min(6).email(),
    password: z.string().max(120)
})