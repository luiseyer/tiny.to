import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import { _INVALID_URL_, _NOT_FOUND_, _NOT_UNIQUE_, _UNEXPECTED_ERROR_ } from '$lib/messages'
import type { Click, Link, User } from '$lib/types'
import DefaultPocketBase, { ClientResponseError } from 'pocketbase'

export class PocketBase extends DefaultPocketBase {
  constructor() {
    super(PUBLIC_POCKETBASE_URL)
  }

  readonly users = this.collection<User>('users')
  readonly links = this.collection<Link>('links')
  readonly clicks = this.collection<Click>('clicks')
}

type BaseErrorOption = string | { message?: string; cause?: unknown } | undefined

class BaseError extends Error {
  readonly status: number

  constructor(status: number, options?: BaseErrorOption) {
    if (typeof options === 'string') super(options)
    else super(options?.message, { cause: options?.cause })

    this.status = status
  }
}

export class UnexpectedError extends BaseError {
  constructor(message: string = _UNEXPECTED_ERROR_, cause?: unknown) {
    super(500, { message, cause })
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string = _NOT_FOUND_) {
    super(404, message)
  }

  static isErr(error: unknown) {
    return error instanceof ClientResponseError && error.status === 404
  }
}

export class BadRequestError<T extends string> extends BaseError {
  readonly field: T

  constructor(field: T, message: string) {
    super(400, message)
    this.field = field
  }
}

export class NotUniqueError<T extends string> extends BadRequestError<T> {
  readonly code = 'validation_not_unique'

  constructor(field: T, message: string = _NOT_UNIQUE_) {
    super(field, message)
  }

  static isErr(error: unknown, field: string) {
    return (
      error instanceof ClientResponseError &&
      error.response.data?.[field]?.code === 'validation_not_unique'
    )
  }
}

export class InvalidUrlError<T extends string> extends BadRequestError<T> {
  readonly code = 'validation_invalid_url'

  constructor(field: T, message: string = _INVALID_URL_) {
    super(field, message)
  }

  static isErr(error: unknown, field: string) {
    return (
      error instanceof ClientResponseError &&
      error.response.data?.[field]?.code === 'validation_invalid_url'
    )
  }
}
