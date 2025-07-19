import {
  _INVALID_DATE_,
  _INVALID_EMAIL_,
  _INVALID_PASSWORD_,
  _INVALID_SLUG_REGEX_,
  _INVALID_URL_,
  _REQUIRED_FIELD_
} from '$lib/messages'
import * as z from 'zod/v4'

export const user = z.object({
  id: z.string(),
  name: z.string().nonempty(_REQUIRED_FIELD_),
  email: z.email(_INVALID_EMAIL_),
  avatar: z.string().optional()
})

const isoDatetime = z.preprocess(
  (v) => (typeof v === 'string' ? new Date(v).toISOString() : v),
  z.iso.datetime()
)
const expiresAt = isoDatetime
  .optional()
  .refine((v) => !v || new Date(v).getTime() > Date.now(), _INVALID_DATE_)

export const link = z.object({
  id: z.string(),
  slug: z
    .string()
    .nonempty(_REQUIRED_FIELD_)
    .regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9_-]*[a-zA-Z0-9])?$/, _INVALID_SLUG_REGEX_),
  url: z.url(_INVALID_URL_),
  user: user.shape.id.optional(),
  expiresAt: expiresAt,
  createdAt: isoDatetime,
  updatedAt: isoDatetime
})

export const linkCreate = link.omit({ id: true, createdAt: true, updatedAt: true })

export const linkUpdate = linkCreate.omit({ user: true }).partial()

export const click = z.object({
  id: z.string(),
  link: link.shape.id,
  timestamp: isoDatetime,
  ip: z.ipv4().or(z.ipv6()),
  userAgent: z.string().optional()
})

export const register = user
  .omit({ id: true })
  .extend({
    password: z
      .string()
      .min(8, {
        error: ({ minimum }) => _INVALID_PASSWORD_.replace('{{count}}', minimum.toString())
      })
  })

export const login = user
  .pick({ email: true })
  .extend({ password: z.string().nonempty(_REQUIRED_FIELD_) })
