<script lang="ts">
  import '../app.css'
  import '@fontsource-variable/inter'
  import '@fontsource-variable/jetbrains-mono'
  import { setAuthContext } from '$lib/auth.svelte'
  import { Button } from '$lib/components/ui/button'
  import MoonIcon from '@lucide/svelte/icons/moon'
  import SunIcon from '@lucide/svelte/icons/sun'
  import { ModeWatcher, toggleMode } from 'mode-watcher'

  let { children } = $props()

  setAuthContext()
</script>

<ModeWatcher />

{@render children?.()}

<Button onclick={toggleMode} variant="secondary" size="icon" class="fixed right-5 bottom-5">
  <SunIcon
    class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
  />
  <MoonIcon
    class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
  />
  <span class="sr-only">Toggle theme</span>
</Button>
