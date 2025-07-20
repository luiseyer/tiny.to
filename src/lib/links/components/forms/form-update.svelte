<script lang="ts">
  import { getLinksState } from '$lib/links'
  import { _LINK_UPDATED_ } from '$lib/messages'
  import { BadRequestError, UnexpectedError } from '$lib/pocketbase'
  import { linkUpdate } from '$lib/schemas'
  import Form from './form.svelte'
  import type { Link } from '$lib/types'
  import { toast } from 'svelte-sonner'
  import { zod4Client } from 'sveltekit-superforms/adapters'
  import { defaults, setError, superForm } from 'sveltekit-superforms/client'

  type Props = {
    data: Link
    onSuccess?: () => void
  }

  let { data, onSuccess }: Props = $props()

  const links = getLinksState()

  const form = superForm(defaults(data, zod4Client(linkUpdate)), {
    SPA: true,
    validators: zod4Client(linkUpdate),

    onSubmit: () => {
      validateForm({ update: true })
    },

    onUpdate: async ({ result, form }) => {
      if (result.type === 'failure') return

      const [error] = await links.update(data.id, form.data)

      if (error instanceof BadRequestError) {
        return setError(form, error.field, error.message)
      }

      if (error instanceof UnexpectedError) {
        return toast.error(error.message)
      }

      toast.success(_LINK_UPDATED_)

      onSuccess?.()
    },
  })

  const { validateForm } = form
</script>

<Form {form} />
