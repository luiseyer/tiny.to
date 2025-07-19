import { POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from '$env/static/private'
import { PocketBase } from '$lib/pocketbase'

/**
 *  Cliente Administrador de PocketBase
 *
 *  **Solo debe ser usado en el servidor**
 */
export const pbAdmin = new PocketBase()

pbAdmin.autoCancellation(false)

await pbAdmin
  .collection('_superusers')
  .authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD, {
    // Esto refresca la autenticación cada 30 minutos
    autoRefreshThreshold: 30 * 60
  })

export default pbAdmin
