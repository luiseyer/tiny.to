import type { LinksState } from '$lib/links/state.svelte'
import { pb } from '$lib/pocketbase'
import type { Click } from '$lib/types'
import { getContext, setContext } from 'svelte'
import { SvelteMap } from 'svelte/reactivity'

class ClicksState {
  private clicks = new SvelteMap<string, Click>()

  constructor(clicks: Click[] = []) {
    this.clicks = new SvelteMap(clicks.map((link) => [link.id, link]))
  }

  subscribe(links: LinksState['links']) {
    return pb.clicks.subscribe('*', ({ action, record }) => {
      if (!links.has(record.link)) {
        return
      }
      if (action === 'create' || action === 'update') {
        this.clicks.set(record.id, record)
      }
      if (action === 'delete') {
        this.clicks.delete(record.id)
      }
    })
  }

  readonly list = $derived(
    Array.from(this.clicks.values()).toSorted((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })
  )
}

const clicks_KEY = Symbol('CLICKS')

export function setClicksState(clicks: Click[]) {
  return setContext(clicks_KEY, new ClicksState(clicks))
}

export function getClicksState() {
  return getContext<ClicksState>(clicks_KEY)
}
