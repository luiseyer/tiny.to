import { Routes } from '$lib/consts'
import { user } from '$lib/schemas'
import { PocketBase } from '$lib/shared/pocketbase'
import { type Handle, redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

export const authentication: Handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase()

  event.locals.pb.authStore.loadFromCookie(
    event.request.headers.get('cookie') || ''
  )

  try {
    if (event.locals.pb.authStore.isValid) {
      await event.locals.pb.users.authRefresh()
      event.locals.user = user.safeParse(event.locals.pb.authStore.record).data
    }
  } catch (_) {
    event.locals.pb.authStore.clear()
  }

  const response = await resolve(event)

  const pbCookie = event.locals.pb.authStore.exportToCookie({
    httpOnly: false,
    sameSite: 'lax'
  })

  response.headers.append('set-cookie', pbCookie)

  return response
}

const UNPROTECTED_PATHS = [Routes.Login, Routes.Register, Routes.Logout]

export const authtorization: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url

  const isProtectedPath =
    !UNPROTECTED_PATHS.some((path) => pathname.startsWith(path)) &&
    pathname !== Routes.Home

  const isAuthenticated = event.locals.pb.authStore.isValid

  if (isProtectedPath && !isAuthenticated) {
    return redirect(302, Routes.Login)
  }

  return await resolve(event)
}

export const handle = sequence(authentication, authtorization)
