import { Routes } from '$lib/consts'
import { _EMAIL_NOT_UNIQUE_, _REGISTER_ERROR_ } from '$lib/messages.js'
import { NotUniqueError } from '$lib/pocketbase/index.js'
import { register } from '$lib/schemas'
import { error, redirect } from '@sveltejs/kit'
import { fail, setError, superValidate } from 'sveltekit-superforms'
import { zod4 } from 'sveltekit-superforms/adapters'

export const load = async ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    redirect(302, Routes.Dashboard)
  }

  return { form: await superValidate(zod4(register)) }
}

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, zod4(register))
    if (!form.valid) {
      return fail(400, { form })
    }

    try {
      await locals.pb.users.create({ ...form.data, passwordConfirm: form.data.password })
    } catch (err) {
      if (NotUniqueError.isErr(err, 'email')) {
        return setError(form, 'email', _EMAIL_NOT_UNIQUE_)
      }
      error(500, _REGISTER_ERROR_)
    }
    redirect(301, Routes.Dashboard)
  }
}
