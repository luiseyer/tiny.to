<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '$lib/components/ui/dropdown-menu'
  import { getModalState } from '$lib/links/components/modal'
  import { getLinksState } from '$lib/links/state.svelte'
  import type { Link } from '$lib/types'
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis'
  import SquarePenIcon from '@lucide/svelte/icons/square-pen'
  import Trash2Icon from '@lucide/svelte/icons/trash-2'
  import type { Row } from '@tanstack/table-core'

  let { row }: { row: Row<Link> } = $props()

  const links = getLinksState()
  const modal = getModalState()

  async function remove() {
    await links.delete(row.original.id)
  }

  function edit() {
    modal.link = row.original.id
    modal.open = true
  }
</script>

<DropdownMenu>
  <DropdownMenuTrigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
        <span class="sr-only">Abrir menú</span>
        <EllipsisIcon />
      </Button>
    {/snippet}
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
      <DropdownMenuItem onclick={edit}><SquarePenIcon /> Editar</DropdownMenuItem>
      <DropdownMenuItem onclick={remove}><Trash2Icon /> Eliminar</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Ver analíticas</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
