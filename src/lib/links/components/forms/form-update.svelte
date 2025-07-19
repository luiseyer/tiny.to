<script lang="ts">
  import DatePicker from '$lib/components/date-picker.svelte'
  import { getLinksState } from '$lib/links'
  import { _LINK_UPDATED_ } from '$lib/messages'
  import { BadRequestError, UnexpectedError } from '$lib/pocketbase'
  import { linkUpdate } from '$lib/schemas'
  import * as Form from '$lib/shadcn/ui/form'
  import { Input } from '$lib/shadcn/ui/input'
  import type { Link } from '$lib/types'
  import LoaderCircle from '@lucide/svelte/icons/loader-circle'
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

  const { form: formData, enhance, validateForm, tainted, submitting } = form

  const isTainted = $derived($tainted?.slug || $tainted?.url || $tainted?.expiresAt)

  function formatSlug() {
    $formData.slug = $formData.slug?.replaceAll(' ', '_').toLowerCase()
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
