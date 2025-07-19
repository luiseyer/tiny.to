import { goto } from '$app/navigation'
import { page } from '$app/state'
import { Routes } from '$lib/consts'
import { _LOGOUT_ERROR_ } from '$lib/messages'
import { pb } from '$lib/pocketbase/client'
import { user as userSchema } from '$lib/schemas'
import type { User } from '$lib/types'
import { attempt, failure, success } from '$lib/utils/attempt'
import { getContext, setContext } from 'svelte'

class Auth {
  user = $state<User | undefined>(undefined)

  constructor(user: User | undefined) {
    this.user = user

    /** Si `data` es undefined cancela todas las suscripciones */
    pb.authStore.onChange((_, record) => {
      const { data } = userSchema.safeParse(record)
      this.user = data
      if (data) return this.subscribe(data.id)
      pb.realtime.unsubscribe()
    })

    $effect(() => {
      if (page.route.id) {
        pb.authStore.loadFromCookie(document.cookie)
      }
    })
  }

  /** Cancela las suscripciones existentes y se suscribe al nuevo id */
  private subscribe(id: string) {
    pb.users.unsubscribe().then(() => {
      pb.users.subscribe(id, ({ action, record }) => {
        if (action === 'update') this.user = record
        if (action === 'delete') this.logout()
      })
    })
  }

  async logout() {
    const [error, response] = await attempt(fetch(Routes.Logout, { method: 'POST' }))

    if (error || !response.ok) {
      return failure(new Error(_LOGOUT_ERROR_))
    }

    return success(goto(Routes.Login))
  }
}

const AUTH_KEY = Symbol('AUTH')

export function setAuthState(user: User | undefined) {
  return setContext(AUTH_KEY, new Auth(user))
}

export function getAuthState() {
  return getContext<ReturnType<typeof setAuthState>>(AUTH_KEY)
}
