<script lang="ts">
  type T = $$Generic<Record<string, unknown>>
  type U = $$Generic<FormPath<T>>

  import { cn, type WithElementRef, type WithoutChildren } from '$lib/shadcn/utils.js'
  import * as FormPrimitive from 'formsnap'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { FormPath } from 'sveltekit-superforms'

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
