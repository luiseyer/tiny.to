import { Routes } from '$lib/consts'
import { register } from '$lib/schemas'
import { error, redirect } from '@sveltejs/kit'
import { ClientResponseError } from 'pocketbase'
import { fail, setError, superValidate } from 'sveltekit-superforms'
import { zod4 } from 'sveltekit-superforms/adapters'

export const load = async ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    return redirect(302, Routes.Dashboard)
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
      await locals.pb.users.create({
        ...form.data,
        passwordConfirm: form.data.password
      })
    } catch (err) {
      if (
        err instanceof ClientResponseError &&
        err.data.data?.email?.code === 'validation_not_unique'
      ) {
        return setError(form, 'email', 'Este correo ya está registrado')
      }

      return error(500, 'Ocurrió un error al registrarse')
    }

    return redirect(301, Routes.Dashboard)
  }
}
