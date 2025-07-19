<script lang="ts">
  import * as Dialog from '$lib/shadcn/ui/dialog'
  import * as Sheet from '$lib/shadcn/ui/sheet'
  import type { Snippet } from 'svelte'
  import { MediaQuery } from 'svelte/reactivity'

  const isDesktop = new MediaQuery('(min-width: 768px)')

  type Props = {
    title: string
    description?: string | undefined
    open?: boolean | undefined
    onClose?: (() => void) | undefined
    children?: Snippet | undefined
  }

  let { title, description, open = $bindable(true), onClose, children }: Props = $props()
</script>

{#if isDesktop.current}
  <Dialog.Root bind:open onOpenChange={(v) => !v && onClose?.()}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
        {#if description}
          <Dialog.Description>{description}</Dialog.Description>
        {/if}
      </Dialog.Header>
      {@render children?.()}
    </Dialog.Content>
  </Dialog.Root>
{:else}
  <Sheet.Root bind:open onOpenChange={(v) => !v && onClose?.()}>
    <Sheet.Content side="bottom">
      <Sheet.Header class="text-left">
        <Sheet.Title>{title}</Sheet.Title>
        {#if description}
          <Sheet.Description>{description}</Sheet.Description>
        {/if}
      </Sheet.Header>
      {#if children}
        <div class="px-4 pb-4">{@render children()}</div>
      {/if}
    </Sheet.Content>
  </Sheet.Root>
{/if}
