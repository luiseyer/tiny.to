<script lang="ts">
  import { page } from '$app/state'
  import { Button } from '$lib/shadcn/ui/button'
  import { Input } from '$lib/shadcn/ui/input'
  import type { Link } from '$lib/types'
  import PlusIcon from '@lucide/svelte/icons/circle-plus'
  import XIcon from '@lucide/svelte/icons/x'
  import type { Table } from '@tanstack/table-core'

  type Props = {
    table: Table<Link>
    onCreate?: (() => void) | undefined
  }

  let { table, onCreate }: Props = $props()

  let value = $state('')

  const isFiltered = $derived(table.getState().columnFilters.length > 0)

  function onFilter(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    table.getColumn('slug')?.setFilterValue(e.currentTarget.value)
    table.getColumn('url')?.setFilterValue(e.currentTarget.value)
  }

  function onReset() {
    table.resetColumnFilters()
    value = ''
  }
</script>

<div class="flex items-center justify-between">
  <div class="flex flex-1 items-center space-x-2">
    <Input
      id="search-links-by-slug-or-url"
      placeholder="Buscar enlaces..."
      bind:value
      oninput={onFilter}
      onchange={onFilter}
      class="w-64 border-accent shadow-sm"
    />

    {#if isFiltered}
      <Button variant="ghost" onclick={onReset}>
        <XIcon /> Limpiar
      </Button>
    {/if}
  </div>

  <Button onclick={onCreate}>
    <PlusIcon /> Crear enlace
  </Button>
</div>
