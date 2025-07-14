import { goto } from '$app/navigation'
import { page } from '$app/state'
import { Routes } from '$lib/consts'
import { pb } from '$lib/pocketbase'
import { user as userSchema } from '$lib/schemas'
import type { User } from '$lib/types'
import { getContext, setContext } from 'svelte'
import { toast } from 'svelte-sonner'

class Auth {
  user = $state<User | undefined>(undefined)

  constructor(user: User | undefined) {
    this.user = user

    pb.authStore.onChange((_, record) => {
      this.user = userSchema.safeParse(record).data
    })

    $effect(() => {
      if (page.url) {
        pb.authStore.loadFromCookie(document.cookie)
      }
    })

    $effect(() => {
      if (this.user)
        pb.users.subscribe(this.user.id, ({ action, record }) => {
          if (action === 'update') {
            this.user = record
          }
        })
    })
  }

  async logout() {
    try {
      const response = await fetch(Routes.Logout, { method: 'POST' })

      if (response.ok) {
        return goto(Routes.Login)
      }

      throw new Error(response.statusText)
    } catch (_) {
      toast.error('Error al cerrar sesión')
    }
  }
}

const AUTH_KEY = Symbol('AUTH')

export function setAuthState(user: User | undefined) {
  return setContext(AUTH_KEY, new Auth(user))
}

export function getAuthState() {
  return getContext<ReturnType<typeof setAuthState>>(AUTH_KEY)
}
