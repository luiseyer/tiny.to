<script lang="ts">
  import { Card, CardDescription, CardHeader, CardTitle } from '$lib/shadcn/ui/card'
  import { onMount } from 'svelte'
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()

  const { link } = data

  let title = $state('Enlace encontrado!')
  let seconds = $state(5)

  onMount(() => {
    const insterval = setInterval(() => {
      seconds = seconds - 1
      if (seconds === 0) {
        clearInterval(insterval)
        window.location.replace(link.url)
      }
    }, 1000)
  })
</script>

<div class="grid h-dvh place-content-center place-items-center">
  <Card class="w-sm">
    <CardHeader>
      <CardTitle class="text-center text-2xl">{title}</CardTitle>

      <CardDescription class="text-center text-xl">
        Redireccionando en {seconds} segundos...
      </CardDescription>
    </CardHeader>
  </Card>
</div>
