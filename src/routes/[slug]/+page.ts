import { pb } from '$lib/pocketbase'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, fetch }) => {
  const { slug } = params

  try {
    const link = await pb.links.getFirstListItem(`slug='${slug}'`, { fetch })

    return { link }
  } catch (_) {
    error(404, 'Not Found')
  }
}
