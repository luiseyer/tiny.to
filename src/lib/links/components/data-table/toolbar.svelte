<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import { getModalState } from '$lib/links/components/modal'
  import type { Link } from '$lib/types'
  import PlusIcon from '@lucide/svelte/icons/circle-plus'
  import XIcon from '@lucide/svelte/icons/x'
  import type { Table } from '@tanstack/table-core'

  let { table }: { table: Table<Link> } = $props()

  const isFiltered = $derived(table.getState().columnFilters.length > 0)

  let value = $state('')

  const modal = getModalState()
</script>

<div class="flex items-center justify-between">
  <div class="flex flex-1 items-center space-x-2">
    <Input
      placeholder="Buscar enlaces..."
      bind:value
      oninput={(e) => {
        table.getColumn('slug')?.setFilterValue(e.currentTarget.value)
        table.getColumn('url')?.setFilterValue(e.currentTarget.value)
      }}
      onchange={(e) => {
        table.getColumn('slug')?.setFilterValue(e.currentTarget.value)
        table.getColumn('url')?.setFilterValue(e.currentTarget.value)
      }}
      class="w-64 border-accent shadow-sm"
    />

    {#if isFiltered}
      <Button
        variant="ghost"
        onclick={() => {
          table.resetColumnFilters()
          value = ''
        }}
      >
        <XIcon />
        Limpiar
      </Button>
    {/if}
  </div>

  <Button
    onclick={() => {
      modal.link = undefined
      modal.open = true
    }}
  >
    <PlusIcon />
    Crear enlace
  </Button>
</div>
