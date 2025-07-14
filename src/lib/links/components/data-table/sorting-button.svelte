<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import ArrowUpDownIcon from '@lucide/svelte/icons/arrow-up-down'
  import type { ComponentProps } from 'svelte'

  let {
    text,
    variant = 'ghost',
    ...restProps
  }: ComponentProps<typeof Button> & { text: string } = $props()
</script>

<Button {variant} {...restProps}>
  {text}
  <ArrowUpDownIcon class="ml-2" />
</Button>
