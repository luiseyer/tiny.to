import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import type { Click, Link, User } from '$lib/types'
import DefaultPocketBase from 'pocketbase'

export class PocketBase extends DefaultPocketBase {
  constructor() {
    super(PUBLIC_POCKETBASE_URL)
  }

  users = this.collection<User>('users')
  links = this.collection<Link>('links')
  clicks = this.collection<Click>('clicks')
}
