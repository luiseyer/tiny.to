<script lang="ts">
  import { Input } from '$lib/shadcn/ui/input/index.js'
  import { cn } from '$lib/shadcn/utils.js'
  import type { ComponentProps } from 'svelte'

  let {
    ref = $bindable(null),
    value = $bindable(''),
    class: className,
    ...restProps
  }: ComponentProps<typeof Input> = $props()
</script>

<Input
  bind:ref
  bind:value
  data-slot="sidebar-input"
  data-sidebar="input"
  class={cn('h-8 w-full bg-background shadow-none', className)}
  {...restProps}
/>
