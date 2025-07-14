<script lang="ts">
  import DatePicker from '$lib/components/date-picker.svelte'
  import { Button, buttonVariants } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import * as Drawer from '$lib/components/ui/drawer'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import { getLinksState } from '$lib/links/state.svelte'
  import { linkCreate } from '$lib/schemas'
  import { cn } from '$lib/utils'
  import { Database, LoaderCircleIcon } from '@lucide/svelte'
  import { MediaQuery } from 'svelte/reactivity'
  import { toast } from 'svelte-sonner'
  import { getModalState } from './state.svelte'

  const isDesktop = new MediaQuery('(min-width: 768px)')

  const modal = getModalState()
  const links = getLinksState()

  let isLoading = $state(false)
  let slug = $derived(modal.link ? links.getOne(modal.link)?.slug : undefined)
  let url = $derived(modal.link ? links.getOne(modal.link)?.url : undefined)
  let expiresAt = $derived(modal.link ? links.getOne(modal.link)?.expiresAt : undefined)

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    const callback = async () => {
      if (modal.link) {
        await links.update(modal.link, {
          slug,
          url,
          expiresAt: expiresAt,
        })

        return
      }

      const data = linkCreate.parse({ slug, url, expiresAt })
      await links.create(data)
    }

    const message = {
      success: modal.link ? 'Enlace actualizado' : 'Enlace creado',
      error: modal.link ? 'Error al actualizar el enlace' : 'Error al crear el enlace',
    }
    try {
      isLoading = true
      await callback()
      toast.success(message.success)
      modal.open = false
    } catch (_) {
      toast.error(message.error)
    } finally {
      isLoading = false
    }
  }
</script>

{#if isDesktop.current}
  <Dialog.Root bind:open={modal.open}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>{@render title()}</Dialog.Title>
        <Dialog.Description>{@render description()}</Dialog.Description>
      </Dialog.Header>
      {@render form()}
    </Dialog.Content>
  </Dialog.Root>
{:else}
  <Drawer.Root bind:open={modal.open}>
    <Drawer.Content>
      <Drawer.Header class="text-left">
        <Drawer.Title>{@render title()}</Drawer.Title>
        <Drawer.Description>{@render description()}</Drawer.Description>
      </Drawer.Header>
      {@render form()}
      <Drawer.Footer class="pt-2">
        <Drawer.Close class={buttonVariants({ variant: 'outline' })}>Cancelar</Drawer.Close>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
{/if}

{#snippet title()}
  {#if modal.link}
    Editar enlace
  {:else}
    Crear enlace
  {/if}
{/snippet}

{#snippet description()}
  {#if modal.link}
    Modifica tu enlace. Haz clic en guardar cuando estés listo.
  {:else}
    Crea un nuevo enlace. Haz clic en guardar cuando estés listo.
  {/if}
{/snippet}

{#snippet form()}
  <form
    class={cn('grid items-start gap-4', { 'px-4': !isDesktop.current })}
    onsubmit={handleSubmit}
  >
    <div class="grid gap-2">
      <Label for="slug">Nombre corto</Label>
      <Input id="slug" bind:value={slug} />
    </div>
    <div class="grid gap-2">
      <Label for="url">Dirección del enlace</Label>
      <Input id="url" type="url" bind:value={url} />
    </div>
    <div class="grid gap-2">
      <Label for="expiresAt">Fecha de expiración</Label>
      <DatePicker bind:value={expiresAt} />
    </div>
    <Button type="submit" disabled={isLoading}>
      {#if isLoading}
        <LoaderCircleIcon class="animate-spin" /> Guardando...
      {:else if modal.link}
        Guardar cambios
      {:else}
        Crear enlace
      {/if}
    </Button>
  </form>
{/snippet}
