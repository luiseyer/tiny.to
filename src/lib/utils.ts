import { DEFAULT_EXPIRATION_DAYS } from '$lib/consts'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// biome-ignore lint/suspicious/noExplicitAny: allowed any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T
// biome-ignore lint/suspicious/noExplicitAny: allowed any
export type WithoutChildren<T> = T extends { children?: any }
  ? Omit<T, 'children'>
  : T
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null
}

export function getExpirationDate(
  days: number = DEFAULT_EXPIRATION_DAYS
): Date {
  const currentDate = new Date()
  const expirationDate = new Date(currentDate)

  expirationDate.setDate(currentDate.getDate() + days)
  return expirationDate
}
