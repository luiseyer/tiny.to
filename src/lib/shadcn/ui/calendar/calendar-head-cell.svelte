<script lang="ts">
  import { cn } from '$lib/shadcn/utils.js'
  import { Calendar as CalendarPrimitive } from 'bits-ui'

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: CalendarPrimitive.HeadCellProps = $props()
</script>

<CalendarPrimitive.HeadCell
  bind:ref
  class={cn(
    'w-(--cell-size) rounded-md text-[0.8rem] font-normal text-muted-foreground',
    className
  )}
  {...restProps}
/>
