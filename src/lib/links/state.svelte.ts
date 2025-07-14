import { pb } from '$lib/pocketbase'
import type { Link, LinkCreate, LinkUpdate } from '$lib/types'
import { getContext, onMount, setContext } from 'svelte'
import { SvelteMap } from 'svelte/reactivity'
import { toast } from 'svelte-sonner'

class LinksState {
  private links = new SvelteMap<string, Link>()

  constructor(links: Link[] = []) {
    this.links = new SvelteMap(links.map((link) => [link.id, link]))

    onMount(() => {
      pb.links.subscribe('*', ({ action, record }) => {
        if (action === 'create' || action === 'update') {
          this.links.set(record.id, record)
        }
        if (action === 'delete') {
          this.links.delete(record.id)
        }
      })
    })
  }

  async create(link: LinkCreate) {
    await pb.links.create(link)
  }

  async update(id: string, link: LinkUpdate) {
    await pb.links.update(id, link)
  }

  delete(id: string) {
    const currentLink = this.links.get(id)
    if (!currentLink) return

    this.links.delete(id)
    toast.info('Enlace eliminado', {
      description: 'Se eliminará permanentemente.',
      duration: 10000,
      action: {
        label: 'Cancelar',
        onClick: () => this.links.set(id, currentLink)
      },
      onAutoClose: async () => {
        try {
          await pb.links.delete(id)
          toast.success('Enlace eliminado de forma permanente')
        } catch (_) {
          toast.error('Error al eliminar enlace desde el servidor')
          this.links.set(id, currentLink)
        }
      }
    })
  }

  readonly list = $derived(
    Array.from(this.links.values()).toSorted((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  )

  getOne(id: string) {
    return this.links.get(id)
  }
}

const LINKS_KEY = Symbol('LINKS')

export function setLinksState(links: Link[]) {
  return setContext(LINKS_KEY, new LinksState(links))
}

export function getLinksState() {
  return getContext<LinksState>(LINKS_KEY)
}
