<script lang="ts">
  import '../app.css'
  import '@fontsource-variable/inter'
  import '@fontsource-variable/jetbrains-mono'
  import { dev } from '$app/environment'
  import { setAuthState } from '$lib/auth'
  import { NavProgressBar } from '$lib/components/nav-progress-bar'
  import { Toaster } from '$lib/shadcn/ui/sonner'
  import { ModeWatcher } from 'mode-watcher'
  import { RenderScan } from 'svelte-render-scan'
  import type { LayoutProps } from './$types'

  let { children, data }: LayoutProps = $props()

  setAuthState(data.user)
</script>

{#if dev}
  <RenderScan />
{/if}

<svelte:head>
  <title>Tiny.to</title>
  <meta name="description" content="Tiny.to es un acortador de enlaces." />
</svelte:head>

<ModeWatcher defaultMode="system" />
<Toaster richColors />
<NavProgressBar />

{@render children?.()}
