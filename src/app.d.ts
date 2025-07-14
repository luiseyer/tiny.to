import type { PocketBase } from '$lib/shared/pocketbase'
import type { User } from '$lib/types'

declare global {
  // biome-ignore lint/style/noNamespace: Sveltekit Types
  namespace App {
    // interface Error {}
    interface Locals {
      pb: PocketBase
      user: User | undefined
    }
    interface PageData {
      title: string
    }
    // interface PageState {}
    // interface Platform {}
  }
}
