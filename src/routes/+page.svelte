<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card'
  import { Input } from '$lib/components/ui/input'
  import SettingsIcon from '@lucide/svelte/icons/settings'
  import { slide } from 'svelte/transition'

  let showSettings = $state<boolean>(false)
  let customSlug = $state<string>('')
</script>

<div class="grid h-dvh place-content-center place-items-center">
  <Card class="w-sm">
    <CardHeader>
      <CardTitle class="text-center text-2xl">tiny.to</CardTitle>
      <CardDescription class="text-center">Acorta tu URL en segundos</CardDescription>
    </CardHeader>

    <CardContent class="space-y-4">
      <div class="flex w-full items-center space-x-2">
        <Input type="text" placeholder="Inserta un enlace" />
        <Button size="icon" variant="outline" onclick={() => (showSettings = !showSettings)}>
          <SettingsIcon />
        </Button>
      </div>

      {#if showSettings}
        <div transition:slide>
          <Input type="text" placeholder="Nombre personalizado" bind:value={customSlug} />
        </div>
      {/if}

      <Button class="w-full">Acortar URL</Button>
    </CardContent>
  </Card>
</div>
