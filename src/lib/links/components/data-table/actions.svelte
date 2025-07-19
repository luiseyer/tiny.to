<script lang="ts">
  import { getLinksState } from '$lib/links'
  import { _LINK_DELETED_ } from '$lib/messages'
  import { Button } from '$lib/shadcn/ui/button'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '$lib/shadcn/ui/dropdown-menu'
  import type { Link } from '$lib/types'
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis'
  import SquarePenIcon from '@lucide/svelte/icons/square-pen'
  import Trash2Icon from '@lucide/svelte/icons/trash-2'
  import type { Row } from '@tanstack/table-core'
  import { toast } from 'svelte-sonner'

  type Props = {
    row: Row<Link>
    onUpdate?: ((id: string) => void) | undefined
  }

  let { row, onUpdate }: Props = $props()

  const links = getLinksState()

  function onDelete() {
    const { timeout, undo, onSuccess, onError } = links.delete(row.original.id)

    const undoToast = toast.info('Enlace eliminado', {
      description: 'Se eliminará permanentemente.',
      duration: timeout,
      dismissable: true,
      action: { label: 'Deshacer', onClick: undo },
    })

    onError((error) => {
      toast.dismiss(undoToast)
      toast.error(error.message)
    })

    onSuccess(() => {
      toast.success(_LINK_DELETED_)
    })
  }

  function onEdit() {
    onUpdate?.(row.original.id)
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
      <DropdownMenuItem onclick={onEdit}><SquarePenIcon /> Editar</DropdownMenuItem>
      <DropdownMenuItem onclick={onDelete}><Trash2Icon /> Eliminar</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Ver analíticas</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
