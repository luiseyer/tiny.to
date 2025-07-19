import { page } from '$app/state'
import {
  _LINK_NOT_CREATED_,
  _LINK_NOT_DELETED_,
  _LINK_NOT_FOUND_,
  _LINK_NOT_UNIQUE_,
  _LINK_NOT_UPDATED_
} from '$lib/messages'
import { InvalidUrlError, NotFoundError, NotUniqueError, UnexpectedError } from '$lib/pocketbase'
import { pb } from '$lib/pocketbase/client'
import type { Link, LinkCreate, LinkUpdate } from '$lib/types'
import { attempt, failure, type Result, success } from '$lib/utils/attempt'
import { getContext, setContext } from 'svelte'
import { SvelteMap } from 'svelte/reactivity'

type CreationError =
  | NotUniqueError<keyof LinkCreate>
  | InvalidUrlError<keyof LinkCreate>
  | UnexpectedError

type UpdateError =
  | NotFoundError
  | NotUniqueError<keyof LinkUpdate>
  | InvalidUrlError<keyof LinkUpdate>
  | UnexpectedError

class LinksState {
  private data = new SvelteMap<string, Link>()

  constructor(links: Link[] = []) {
    for (const { id, ...data } of links) {
      this.data.set(id, { id, ...data })
    }

    $effect(() => {
      if (page.route.id) this.subscribe()
    })
  }

  private subscribe() {
    pb.links.unsubscribe().then(() => {
      pb.links.subscribe('*', ({ action, record }) => {
        if (action === 'create' || action === 'update') {
          this.data.set(record.id, record)
        }
        if (action === 'delete') {
          this.data.delete(record.id)
        }
      })
    })
  }

  async create(link: LinkCreate): Result<Link, CreationError> {
    const [error, data] = await attempt(pb.links.create(link))

    if (!error) {
      return success(data)
    }
    if (NotUniqueError.isErr(error, 'slug')) {
      return failure(new NotUniqueError('slug', _LINK_NOT_UNIQUE_))
    }
    if (InvalidUrlError.isErr(error, 'url')) {
      return failure(new InvalidUrlError('url'))
    }
    return failure(new UnexpectedError(_LINK_NOT_CREATED_, error))
  }

  async update(id: string, link: LinkUpdate): Result<Link, UpdateError> {
    const [error, data] = await attempt(pb.links.update(id, link))

    if (!error) {
      return success(data)
    }
    if (NotFoundError.isErr(error)) {
      return failure(new NotFoundError(_LINK_NOT_FOUND_))
    }
    if (NotUniqueError.isErr(error, 'slug')) {
      return failure(new NotUniqueError('slug', _LINK_NOT_UNIQUE_))
    }
    if (InvalidUrlError.isErr(error, 'url')) {
      return failure(new InvalidUrlError('url'))
    }
    return failure(new UnexpectedError(_LINK_NOT_UPDATED_, error))
  }

  delete(id: string): {
    timeout: number
    undo: () => void
    onSuccess: (cb: () => void) => void
    onError: (cb: (error: NotFoundError | UnexpectedError) => void) => void
  } {
    const timeout = 10000
    const currentLink = this.data.get(id)

    if (!currentLink) {
      return {
        timeout,
        undo: () => {},
        onSuccess: () => {},
        onError: (cb) => cb(new NotFoundError(_LINK_NOT_FOUND_))
      }
    }

    this.data.delete(id)

    let successHandler: () => void = () => {}
    let errorHandler: (error: NotFoundError | UnexpectedError) => void = () => {}
    let deletionConfirmed = false

    const deletionPromise = new Promise<void>((resolve, reject) => {
      successHandler = resolve
      errorHandler = reject
    })

    const executeDeletion = async () => {
      if (deletionConfirmed) return
      deletionConfirmed = true

      const [error] = await attempt(pb.links.delete(id))

      if (!error) return successHandler()

      this.data.set(id, currentLink)

      errorHandler(
        NotFoundError.isErr(error)
          ? new NotFoundError(_LINK_NOT_FOUND_)
          : new UnexpectedError(_LINK_NOT_DELETED_, error)
      )
    }

    const deletionTimeout = setTimeout(executeDeletion, timeout)

    return {
      timeout,
      undo: () => {
        if (deletionTimeout) clearTimeout(deletionTimeout)
        if (currentLink) this.data.set(id, currentLink)
        deletionConfirmed = true
      },
      onSuccess: (cb: () => void) => deletionPromise.then(cb),
      onError: (cb) => deletionPromise.catch(cb)
    }
  }

  get(id: string) {
    return this.data.get(id)
  }

  readonly list = $derived(
    Array.from(this.data.values()).toSorted((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  )
}

const LINKS_KEY = Symbol('LINKS')

export function setLinksState(links: Link[]) {
  return setContext(LINKS_KEY, new LinksState(links))
}

export function getLinksState() {
  return getContext<LinksState>(LINKS_KEY)
}
