<script lang="ts">
  import { getAuthState } from '$lib/auth'
  import { getLinksState } from '$lib/links'
  import { _LINK_CREATED_ } from '$lib/messages'
  import { BadRequestError, UnexpectedError } from '$lib/pocketbase'
  import { linkCreate } from '$lib/schemas'
  import Form from './form.svelte'
  import type { LinkCreate } from '$lib/types'
  import { toast } from 'svelte-sonner'
  import { zod4Client } from 'sveltekit-superforms/adapters'
  import { defaults, setError, superForm } from 'sveltekit-superforms/client'

  type Props = {
    onSuccess?: () => void
  }

  const auth = getAuthState()
  const links = getLinksState()

  const initialData: LinkCreate = { slug: '', url: '' }

  let { onSuccess }: Props = $props()

  const form = superForm(defaults(initialData, zod4Client(linkCreate)), {
    SPA: true,
    validators: zod4Client(linkCreate),

    onSubmit: () => {
      validateForm({ update: true })
    },

    onUpdate: async ({ result, form }) => {
      if (result.type === 'failure') return

      const [error] = await links.create({ ...form.data, user: auth.user?.id })

      if (error instanceof BadRequestError) {
        return setError(form, error.field, error.message)
      }

      if (error instanceof UnexpectedError) {
        return toast.error(error.message)
      }

      toast.success(_LINK_CREATED_)

      onSuccess?.()
    },
  })

  const { validateForm } = form
</script>

<Form {form} />
