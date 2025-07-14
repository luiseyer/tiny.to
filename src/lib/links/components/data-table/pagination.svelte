<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select'
  import type { Link } from '$lib/types'
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left'
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right'
  import ChevronsLeftIcon from '@lucide/svelte/icons/chevrons-left'
  import ChevronsRightIcon from '@lucide/svelte/icons/chevrons-right'
  import type { Table } from '@tanstack/table-core'

  let { table }: { table: Table<Link> } = $props()
</script>

<div class="flex items-center justify-between px-2">
  <div class="flex-1 text-sm text-muted-foreground">
    {table.getFilteredSelectedRowModel().rows.length} de
    {table.getFilteredRowModel().rows.length} filas(s) seleccionada(s).
  </div>
  <div class="flex items-center space-x-6 lg:space-x-8">
    <div class="flex items-center space-x-2">
      <p class="text-sm font-medium">Filas por página</p>
      <Select
        allowDeselect={false}
        type="single"
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value))
        }}
      >
        <SelectTrigger class="h-8 w-[70px]">
          {String(table.getState().pagination.pageSize)}
        </SelectTrigger>
        <SelectContent side="top">
          {#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
            <SelectItem value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          {/each}
        </SelectContent>
      </Select>
    </div>
    <div class="flex w-[100px] items-center justify-center text-sm font-medium">
      Página {table.getState().pagination.pageIndex + 1} de
      {table.getPageCount()}
    </div>
    <div class="flex items-center space-x-2">
      <Button
        variant="outline"
        class="hidden size-8 p-0 lg:flex"
        onclick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <span class="sr-only">Ir a la primera página</span>
        <ChevronsLeftIcon />
      </Button>
      <Button
        variant="outline"
        class="size-8 p-0"
        onclick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <span class="sr-only">Ir a la página anterior</span>
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="outline"
        class="size-8 p-0"
        onclick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span class="sr-only">Ir a la siguiente página</span>
        <ChevronRightIcon />
      </Button>
      <Button
        variant="outline"
        class="hidden size-8 p-0 lg:flex"
        onclick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <span class="sr-only">Ir a la última página</span>
        <ChevronsRightIcon />
      </Button>
    </div>
  </div>
</div>
