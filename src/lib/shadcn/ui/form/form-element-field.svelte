<script lang="ts">
  type T = $$Generic<Record<string, unknown>>
  type U = $$Generic<FormPathLeaves<T>>

  import { cn, type WithElementRef, type WithoutChildren } from '$lib/shadcn/utils.js'
  import * as FormPrimitive from 'formsnap'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { FormPathLeaves } from 'sveltekit-superforms'

  let {
    ref = $bindable(null),
    class: className,
    form,
    name,
    children: childrenProp,
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> &
    FormPrimitive.ElementFieldProps<T, U> = $props()
</script>

<FormPrimitive.ElementField {form} {name}>
  {#snippet children({ constraints, errors, tainted, value })}
    <div bind:this={ref} class={cn('space-y-2', className)} {...restProps}>
      {@render childrenProp?.({ constraints, errors, tainted, value: value as T[U] })}
    </div>
  {/snippet}
</FormPrimitive.ElementField>
