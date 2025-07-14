<script lang="ts">
  import { FlexRender } from '$lib/components/ui/data-table'
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '$lib/components/ui/table'
  import { getLinksState } from '$lib/links/state.svelte'
  import type { Link } from '$lib/types'
  import { cn } from '$lib/utils'
  import type { ColumnDef, Table as TableType } from '@tanstack/table-core'
  import { flip } from 'svelte/animate'
  import { scale } from 'svelte/transition'

  let { table, columns }: { table: TableType<Link>; columns: ColumnDef<Link>[] } = $props()

  const links = getLinksState()

  const className = cn(
    'data-[name=select]:w-10',
    'data-[name=slug]:w-48 data-[name=slug]:max-w-48',
    'data-[name=url]:w-64 data-[name=url]:max-w-96',
    'data-[name=expiresAt]:w-32',
    'data-[name=actions]:w-10',
    '[&:has([role=checkbox])]:pl-4',
    'overflow-hidden p-4 text-ellipsis'
  )
</script>

<div class="overflow-hidden rounded-lg border">
  <Table>
    <TableHeader>
      {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
        <TableRow>
          {#each headerGroup.headers as header (header.id)}
            <TableHead class={className} data-name={header.id}>
              {#if !header.isPlaceholder}
                <FlexRender
                  content={header.column.columnDef.header!}
                  context={header.getContext()}
                />
              {/if}
            </TableHead>
          {/each}
        </TableRow>
      {/each}
    </TableHeader>

    <TableBody>
      {#each table.getRowModel().rows as row (row.id)}
        <tr
          animate:flip={{ duration: 250 }}
          transition:scale={{ duration: 250 }}
          data-slot="table-row"
          data-state={row.getIsSelected() && 'selected'}
          class="border-b transition-colors data-[state=selected]:bg-muted hover:[&,&>svelte-css-wrapper]:[&>th,td]:bg-muted/50"
        >
          {#each row.getVisibleCells() as cell (cell.id)}
            <TableCell class={className} data-name={cell.column.id}>
              <FlexRender content={cell.column.columnDef.cell!} context={cell.getContext()} />
            </TableCell>
          {/each}
        </tr>
      {:else}
        <TableRow>
          <TableCell colspan={columns.length} class="h-24 text-center">No hay enlaces</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</div>
