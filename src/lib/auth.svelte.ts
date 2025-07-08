import pb from '$lib/db'
import type { register } from '$lib/schemas'
import type { User } from '$lib/types'
import { getContext, setContext } from 'svelte'
import type { z } from 'zod/v4'

class Auth {
  user = $state<User | null>(null)

  async login(email: string, password: string) {
    return await pb.users.authWithPassword(email, password)
  }

  async register(data: z.infer<typeof register>) {
    return await pb.users.create(data)
  }
}

const AUTH_CONTEXT_KEY = Symbol('auth-context')

export function setAuthContext() {
  return setContext(AUTH_CONTEXT_KEY, new Auth())
}

export function getAuthContext() {
  return getContext<ReturnType<typeof setAuthContext>>(AUTH_CONTEXT_KEY)
}
