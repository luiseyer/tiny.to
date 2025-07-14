<script lang="ts">
  import '../app.css'
  import '@fontsource-variable/inter'
  import '@fontsource-variable/jetbrains-mono'
  import { setAuthState } from '$lib/auth'
  import { Toaster } from '$lib/components/ui/sonner'
  import { ModeWatcher, mode } from 'mode-watcher'
  import type { LayoutProps } from './$types'

  let { children, data }: LayoutProps = $props()

  setAuthState(data.user)
</script>

<svelte:head>
  <title>Tiny.to</title>
  <meta name="description" content="Tiny.to es un acortador de enlaces." />
</svelte:head>

<ModeWatcher />
<Toaster richColors theme={mode.current ?? 'light'} />

{@render children?.()}
