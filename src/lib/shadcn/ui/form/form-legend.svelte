<script lang="ts">
  import { cn, type WithoutChild } from '$lib/shadcn/utils.js'
  import * as FormPrimitive from 'formsnap'

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChild<FormPrimitive.LegendProps> = $props()
</script>

<FormPrimitive.Legend
  bind:ref
  class={cn('text-sm leading-none font-medium data-[fs-error]:text-destructive', className)}
  {...restProps}
/>
