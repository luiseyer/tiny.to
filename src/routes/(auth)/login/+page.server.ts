import { Routes } from '$lib/consts'
import { login } from '$lib/schemas'
import { error, fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod4 } from 'sveltekit-superforms/adapters'

export const load = async ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    redirect(302, Routes.Dashboard)
  }

  return { form: await superValidate(zod4(login)) }
}

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, zod4(login))
    if (!form.valid) {
      return fail(400, { form })
    }

    const { email, password } = form.data

    try {
      await locals.pb.users.authWithPassword(email, password)
    } catch (err) {
      if (Error.isError(err) && err.message === 'Failed to authenticate.') {
        error(400, 'Correo o contraseña incorrectos')
      }

      error(500, 'Ocurrió un error al iniciar sesión')
    }

    redirect(301, Routes.Dashboard)
  }
}
