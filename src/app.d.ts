import type { PocketBase } from '$lib/shared/pocketbase'

declare global {
  // biome-ignore lint/style/noNamespace: Sveltekit Types
  namespace App {
    // interface Error {}
    interface Locals {
      pb: PocketBase
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}
