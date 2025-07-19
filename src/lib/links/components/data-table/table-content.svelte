<script lang="ts">
  import { FlexRender } from '$lib/shadcn/ui/data-table'
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '$lib/shadcn/ui/table'
  import { cn } from '$lib/shadcn/utils'
  import type { Link } from '$lib/types'
  import type { ColumnDef, Table as TableType } from '@tanstack/table-core'
  import { flip } from 'svelte/animate'

  type Props = {
    table: TableType<Link>
    columns: ColumnDef<Link>[]
  }

  let { table, columns }: Props = $props()

  const className = cn(
    'data-[name=select]:w-10',
    'data-[name=slug]:max-w-64',
    'data-[name=url]:max-w-96',
    'data-[name=expiresAt]:w-32',
    'data-[name=actions]:w-16',
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
