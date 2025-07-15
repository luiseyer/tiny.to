import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  return {
    links: await locals.pb.links.getFullList(),
    clicks: await locals.pb.clicks.getFullList()
  }
}
