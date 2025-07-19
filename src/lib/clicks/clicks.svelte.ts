import { page } from '$app/state'
import { pb } from '$lib/pocketbase/client'
import type { Click } from '$lib/types'
import { getContext, setContext } from 'svelte'
import { SvelteMap } from 'svelte/reactivity'

class ClicksState {
  private data = new SvelteMap<string, Click>()

  constructor(clicks: Click[] = []) {
    for (const { id, ...data } of clicks) {
      this.data.set(id, { id, ...data })
    }

    $effect(() => {
      if (page.route.id) this.subscribe()
    })
  }

  private subscribe() {
    pb.links.unsubscribe().then(() => {
      pb.clicks.subscribe('*', ({ action, record }) => {
        if (action === 'create' || action === 'update') {
          this.data.set(record.id, record)
        }
        if (action === 'delete') {
          this.data.delete(record.id)
        }
      })
    })
  }

  readonly list = $derived(
    Array.from(this.data.values()).toSorted((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })
  )
}

const CLICKS_KEY = Symbol('CLICKS')

export function setClicksState(clicks: Click[]) {
  return setContext(CLICKS_KEY, new ClicksState(clicks))
}

export function getClicksState() {
  return getContext<ClicksState>(CLICKS_KEY)
}
