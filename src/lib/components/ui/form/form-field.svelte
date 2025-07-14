<script lang="ts">
  import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils'
  import * as FormPrimitive from 'formsnap'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { FormPath } from 'sveltekit-superforms'

  type T = $$Generic<Record<string, unknown>>
  type U = $$Generic<FormPath<T>>

  let {
    ref = $bindable(null),
    class: className,
    form,
    name,
    children: childrenProp,
    ...restProps
  }: FormPrimitive.FieldProps<T, U> &
    WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> = $props()
</script>

<FormPrimitive.Field {form} {name}>
  {#snippet children({ constraints, errors, tainted, value })}
    <div bind:this={ref} data-slot="form-item" class={cn('space-y-2', className)} {...restProps}>
      {@render childrenProp?.({ constraints, errors, tainted, value: value as T[U] })}
    </div>
  {/snippet}
</FormPrimitive.Field>
