import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  const { id } = locals.user || {}

  return {
    links: id
      ? await locals.pb.links.getFullList({ filter: `user="${id}"` })
      : [],
    clicks: id
      ? await locals.pb.clicks.getFullList({ filter: `link.user="${id}"` })
      : []
  }
}
