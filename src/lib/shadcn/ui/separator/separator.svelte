<script lang="ts">
  import { cn } from '$lib/shadcn/utils.js'
  import { Separator as SeparatorPrimitive } from 'bits-ui'

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: SeparatorPrimitive.RootProps = $props()
</script>

<SeparatorPrimitive.Root
  bind:ref
  data-slot="separator"
  class={cn(
    'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
    className
  )}
  {...restProps}
/>
