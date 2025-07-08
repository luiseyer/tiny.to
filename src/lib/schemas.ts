import * as z from 'zod/v4'

export const user = z.object({
  id: z.nanoid(),
  name: z.string(),
  email: z.email(),
})

export const link = z.object({
  id: z.nanoid(),
  slug: z.string(),
  url: z.url(),
  user: user.shape.id,
  expiresAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const click = z.object({
  id: z.nanoid(),
  link: link.shape.id,
  timestamp: z.date(),
  ip: z.ipv4().or(z.ipv6()).optional(),
  userAgent: z.string().optional(),
})

const password = z.string().min(8).max(100)

export const register = user
  .omit({ id: true })
  .extend({ password: password, passwordConfirm: password })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['password', 'passwordConfirm'],
  })

export const login = user.pick({ email: true }).extend({ password: password })
