<script lang="ts">
  import { Button } from '$lib/shadcn/ui/button'
  import { cn } from '$lib/shadcn/utils'
  import type { Link } from '$lib/types'
  import ArrowDownIcon from '@lucide/svelte/icons/arrow-down'
  import ArrowUpIcon from '@lucide/svelte/icons/arrow-up'
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down'
  import type { Column } from '@tanstack/table-core'
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = {
    column: Column<Link>
    title: string
  } & HTMLAttributes<HTMLDivElement>

  let { column, title, class: className, ...restProps }: Props = $props()
</script>

{#if !column?.getCanSort()}
  <div class={className} {...restProps}>
    {title}
  </div>
{:else}
  <div class={cn('flex items-center', className)} {...restProps}>
    <Button variant="ghost" size="sm" class="-ml-3 h-8" onclick={() => column.toggleSorting()}>
      <span>
        {title}
      </span>
      {#if column.getIsSorted() === 'desc'}
        <ArrowDownIcon />
      {:else if column.getIsSorted() === 'asc'}
        <ArrowUpIcon />
      {:else}
        <ChevronsUpDownIcon />
      {/if}
    </Button>
  </div>
{/if}
