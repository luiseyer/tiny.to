import { pbAdmin } from '$lib/pocketbase/server'

export async function load({ params, fetch }) {
  const { slug } = params

  return { link: await pbAdmin.links.getFirstListItem(`slug='${slug}'`, { fetch }) }
}
