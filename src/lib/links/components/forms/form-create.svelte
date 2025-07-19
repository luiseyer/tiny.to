<script lang="ts">
  import { getAuthState } from '$lib/auth'
  import DatePicker from '$lib/components/date-picker.svelte'
  import { getLinksState } from '$lib/links'
  import { _LINK_CREATED_ } from '$lib/messages'
  import { BadRequestError, UnexpectedError } from '$lib/pocketbase'
  import { linkCreate } from '$lib/schemas'
  import * as Form from '$lib/shadcn/ui/form'
  import { Input } from '$lib/shadcn/ui/input'
  import type { LinkCreate } from '$lib/types'
  import LoaderCircle from '@lucide/svelte/icons/loader-circle'
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

  const { form: formData, enhance, validateForm, tainted, submitting } = form

  const isTainted = $derived($tainted?.slug || $tainted?.url || $tainted?.expiresAt)

  function formatSlug() {
    $formData.slug = $formData.slug.replaceAll(' ', '_').toLowerCase()
  }
</script>

<form method="POST" use:enhance class="flex flex-col gap-6">
  <Form.Field {form} name="slug">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Enlace Acortado</Form.Label>
        <Input {...props} bind:value={$formData.slug} oninput={formatSlug} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="url">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Enlace de Destino</Form.Label>
        <Input {...props} bind:value={$formData.url} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="expiresAt">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Fecha de Expiración</Form.Label>
        <DatePicker id={props.id} bind:value={$formData.expiresAt} class="w-full" />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button disabled={!isTainted || $submitting}>
    {#if $submitting}
      <LoaderCircle class="animate-spin" /> Guardando...
    {:else}
      Guardar
    {/if}
  </Form.Button>
</form>
