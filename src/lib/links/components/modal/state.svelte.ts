import type { Link } from '$lib/types'
import { getContext, hasContext, setContext } from 'svelte'

class ModalState {
  open = $state(false)
  link = $state<Link['id'] | undefined>(undefined)
}

const MODAL_KEY = Symbol('MODAL_LINK')

export function setModalState() {
  return setContext(MODAL_KEY, new ModalState())
}

export function getModalState() {
  if (hasContext(MODAL_KEY)) {
    return getContext<ReturnType<typeof setModalState>>(MODAL_KEY)
  }
  return setModalState()
}
