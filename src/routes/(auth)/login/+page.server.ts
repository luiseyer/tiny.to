import { Routes } from '$lib/consts'
import { _INVALID_AUTH_CREDENTIALS_, _LOGIN_ERROR_ } from '$lib/messages.js'
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
        error(400, _INVALID_AUTH_CREDENTIALS_)
      }
      error(500, _LOGIN_ERROR_)
    }
    redirect(301, Routes.Dashboard)
  }
}
