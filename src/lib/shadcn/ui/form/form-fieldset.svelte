<script lang="ts">
  type T = $$Generic<Record<string, unknown>>
  type U = $$Generic<FormPath<T>>

  import { cn, type WithoutChild } from '$lib/shadcn/utils.js'
  import * as FormPrimitive from 'formsnap'
  import type { FormPath } from 'sveltekit-superforms'

  let {
    ref = $bindable(null),
    class: className,
    form,
    name,
    ...restProps
  }: WithoutChild<FormPrimitive.FieldsetProps<T, U>> = $props()
</script>

<FormPrimitive.Fieldset bind:ref {form} {name} class={cn('space-y-2', className)} {...restProps} />
