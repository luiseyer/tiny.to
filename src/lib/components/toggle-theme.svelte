<script lang="ts">
  import { Button, type ButtonProps } from '$lib/shadcn/ui/button'
  import MoonIcon from '@lucide/svelte/icons/moon'
  import SunIcon from '@lucide/svelte/icons/sun'
  import { toggleMode } from 'mode-watcher'

  let { variant = 'ghost', size = 'icon', ...restProps }: ButtonProps = $props()
</script>

<Button onclick={toggleMode} {variant} {size} {...restProps}>
  <SunIcon
    class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
  />
  <MoonIcon
    class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
  />
  <span class="sr-only">Alternar tema</span>
</Button>
