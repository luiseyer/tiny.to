export type Success<T> = [undefined, T]
export type Failure<E = Error> = [E]
export type Result<T, E = Error> = Promise<Success<T> | Failure<E>>

export function success<T>(value: T): Success<T> {
  return [undefined, value]
}

export function failure<E = Error>(error: E): Failure<E> {
  return [error]
}

export async function attempt<T, E = Error>(promise: Promise<T>): Result<T, E> {
  try {
    const data = await promise
    return success(data)
  } catch (error) {
    return failure(error as E)
  }
}
