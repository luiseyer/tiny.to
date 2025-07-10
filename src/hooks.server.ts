import { building } from '$app/environment'
import { PocketBase } from '$lib/shared/pocketbase'

export async function handle({ event, resolve }) {
  event.locals.pb = new PocketBase()

  event.locals.pb.authStore.loadFromCookie(
    event.request.headers.get('cookie') || ''
  )

  try {
    event.locals.pb.authStore.isValid &&
      (await event.locals.pb.users.authRefresh())
  } catch (_) {
    event.locals.pb.authStore.clear()
  }

  const response = await resolve(event)

  response.headers.append(
    'set-cookie',
    event.locals.pb.authStore.exportToCookie({
      httpOnly: false,
      secure: building,
    })
  )

  return response
}
