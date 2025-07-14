import type { click, link, linkCreate, linkUpdate, user } from '$lib/schemas'
import type { z } from 'zod/v4'

export type User = z.infer<typeof user>

export type Link = z.infer<typeof link>
export type LinkCreate = z.infer<typeof linkCreate>
export type LinkUpdate = z.infer<typeof linkUpdate>

export type Click = z.infer<typeof click>
