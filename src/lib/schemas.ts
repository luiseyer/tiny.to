import * as z from 'zod/v4'

export const user = z.object({
  id: z.string(),
  name: z.string().nonempty('Este campo es obligatorio'),
  email: z.email('Debe ser un correo válido'),
  avatar: z.string().optional()
})

export const link = z.object({
  id: z.string(),
  slug: z.string(),
  url: z.url('Debe ser una URL válida'),
  user: user.shape.id,
  expiresAt: z.iso.datetime().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
})

export const linkCreate = link.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

export const linkUpdate = linkCreate.omit({ user: true }).partial()

export const click = z.object({
  id: z.string(),
  link: link.shape.id,
  timestamp: z.date(),
  ip: z.ipv4().or(z.ipv6()).optional(),
  userAgent: z.string().optional()
})

export const register = user
  .omit({ id: true })
  .extend({ password: z.string().min(8, 'Debe tener al menos 8 caracteres') })

export const login = user
  .pick({ email: true })
  .extend({ password: z.string().trim().nonempty('Este campo es obligatorio') })
