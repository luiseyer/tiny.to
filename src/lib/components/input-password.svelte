<script lang="ts">
  import { Button } from '$lib/shadcn/ui/button'
  import { Input } from '$lib/shadcn/ui/input'
  import { EyeIcon, EyeOffIcon } from '@lucide/svelte'
  import type { HTMLInputAttributes } from 'svelte/elements'

  type Props = Omit<HTMLInputAttributes, 'type' | 'files'>

  let { value = $bindable(), ...restProps }: Props = $props()

  let showPassword = $state(false)
</script>

<div class="relative">
  <Input {...restProps} type={showPassword ? 'text' : 'password'} bind:value />

  <Button
    variant="ghost"
    size="icon"
    class="absolute top-1/2 right-0 -translate-y-1/2"
    onclick={() => (showPassword = !showPassword)}
  >
    {#if showPassword}
      <EyeIcon />
    {:else}
      <EyeOffIcon />
    {/if}
  </Button>
</div>
