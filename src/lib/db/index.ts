import type { Click, Link, User } from '$lib/types'
import DefaultPocketBase from 'pocketbase'

export class PocketBase extends DefaultPocketBase {
  constructor() {
    super('http://127.0.0.1:8090')
  }

  users = this.collection<User>('users')
  links = this.collection<Link>('links')
  clicks = this.collection<Click>('clicks')
}

const pb = new PocketBase()
export default pb
