<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox'
  import { createSvelteTable, renderComponent, renderSnippet } from '$lib/components/ui/data-table'
  import { getLinksState } from '$lib/links/state.svelte'
  import type { Link } from '$lib/types'
  import {
    type ColumnDef,
    type ColumnFiltersState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type PaginationState,
    type Row,
    type RowSelectionState,
    type SortingState,
    type Table as TableType,
  } from '@tanstack/table-core'
  import Actions from './actions.svelte'
  import ColumnHeader from './column-header.svelte'
  import Pagination from './pagination.svelte'
  import TableContent from './table-content.svelte'
  import Toolbar from './toolbar.svelte'

  const links = getLinksState()

  let rowSelection = $state<RowSelectionState>({})
  let sorting = $state<SortingState>([])
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 })
  let columnFilters = $state<ColumnFiltersState>([])

  const filterFn = (row: Row<Link>, value: string) => {
    return row.original.slug.includes(value) || row.original.url.includes(value)
  }

  const renderCheckbox = ({
    table,
    row,
  }: {
    table?: TableType<Link> | undefined
    row?: Row<Link> | undefined
  }) => {
    const checked = row?.getIsSelected() || table?.getIsAllPageRowsSelected() || false

    const onCheckedChange = (value: boolean) => {
      if (table) {
        table.toggleAllPageRowsSelected(value)
      }
      if (row) {
        row.toggleSelected(value)
      }
    }

    const indeterminate = table
      ? table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
      : false

    return renderComponent(Checkbox, {
      checked,
      onCheckedChange,
      indeterminate,
      'aria-label': 'Select all',
      class: 'border-chart-1/50',
    })
  }

  const columns: ColumnDef<Link>[] = [
    {
      id: 'select',
      header: ({ table }) => renderCheckbox({ table }),
      cell: ({ row }) => renderCheckbox({ row }),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'slug',
      header: ({ column }) => renderComponent(ColumnHeader, { title: 'Enlace Acortado', column }),
      cell: ({ row }) =>
        renderSnippet(Anchor, { href: row.original.slug, title: row.original.slug }),
      filterFn: (row, _, value) => filterFn(row, value),
    },
    {
      accessorKey: 'url',
      header: ({ column }) => renderComponent(ColumnHeader, { title: 'Enlace Original', column }),
      cell: ({ cell }) =>
        renderSnippet(Anchor, { href: String(cell.getValue()), title: String(cell.getValue()) }),
      filterFn: (row, _, value) => filterFn(row, value),
    },
    {
      accessorKey: 'expiresAt',
      header: ({ column }) =>
        renderComponent(ColumnHeader, { title: 'Fecha de Expiración', column }),
      cell: ({ row }) => {
        if (!row.original.expiresAt) return

        const formatter = new Intl.DateTimeFormat('es', { dateStyle: 'long' })
        return formatter.format(new Date(row.original.expiresAt))
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => renderComponent(Actions, { row }),
    },
  ]

  const table = createSvelteTable({
    get data() {
      return links.list
    },

    state: {
      get rowSelection() {
        return rowSelection
      },
      get sorting() {
        return sorting
      },
      get pagination() {
        return pagination
      },
      get columnFilters() {
        return columnFilters
      },
    },
    columns,
    enableRowSelection: true,
    onRowSelectionChange: (updater) => {
      if (typeof updater === 'function') {
        rowSelection = updater(rowSelection)
      } else {
        rowSelection = updater
      }
    },
    onSortingChange: (updater) => {
      if (typeof updater === 'function') {
        sorting = updater(sorting)
      } else {
        sorting = updater
      }
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        pagination = updater(pagination)
      } else {
        pagination = updater
      }
    },
    onColumnFiltersChange: (updater) => {
      if (typeof updater === 'function') {
        columnFilters = updater(columnFilters)
      } else {
        columnFilters = updater
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
</script>

{#snippet Anchor({ href, title }: { href: string; title: string })}
  <a {href} target="_blank" class="underline">{title}</a>
{/snippet}

<Toolbar {table} />
<TableContent {table} {columns} />
<Pagination {table} />
