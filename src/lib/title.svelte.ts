import { getContext, setContext } from 'svelte'

class TitleState {
  value = $state('')
}

const TITLE_STATE_CONTEXT_KEY = Symbol('TITLE_STATE_CONTEXT_KEY')

export function setTitleState() {
  return setContext(TITLE_STATE_CONTEXT_KEY, new TitleState())
}

export function getTitleState() {
  return getContext<ReturnType<typeof setTitleState>>(TITLE_STATE_CONTEXT_KEY)
}
