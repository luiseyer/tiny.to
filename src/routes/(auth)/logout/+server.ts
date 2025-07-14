import { json } from '@sveltejs/kit'

export const POST = ({ locals }) => {
  locals.pb.authStore.clear()
  locals.user = undefined

  return json({ success: true })
}
