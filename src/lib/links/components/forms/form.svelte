<script lang="ts">
  import DatePicker from '$lib/components/date-picker.svelte'
  import * as Form from '$lib/shadcn/ui/form'
  import { Input } from '$lib/shadcn/ui/input'
  import type { LinkCreate, LinkUpdate } from '$lib/types'
  import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle'
  import type { SuperForm } from 'sveltekit-superforms/client'

  type Props = {
    form: SuperForm<LinkCreate> | SuperForm<LinkUpdate>
  }

  let { form }: Props = $props()

  const { form: formData, enhance, tainted, submitting } = form

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
      <LoaderCircleIcon class="animate-spin" /> Guardando...
    {:else}
      Guardar
    {/if}
  </Form.Button>
</form>
