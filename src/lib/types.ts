import type { click, link, user } from '$lib/schemas'
import type { z } from 'zod/v4'

export type User = z.infer<typeof user>
export type Link = z.infer<typeof link>
export type Click = z.infer<typeof click>
