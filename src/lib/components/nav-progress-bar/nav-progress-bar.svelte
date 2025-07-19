<script lang="ts">
  import { afterNavigate, beforeNavigate } from '$app/navigation'
  import { Progress } from '$lib/shadcn/ui/progress'
  import { expoOut } from 'svelte/easing'
  import { Tween } from 'svelte/motion'
  import { fade } from 'svelte/transition'

  let progress = new Tween(0, { duration: 1000, easing: expoOut })
  let navigating = $state(false)

  beforeNavigate((navigation) => {
    if (navigation.to?.url.href !== navigation.from?.url.href) {
      navigating = true
      progress.set(10, { duration: 50, easing: expoOut })
      progress.set(70, { duration: 500, easing: expoOut })
    }
  })

  afterNavigate(() => {
    if (navigating) {
      progress.set(100, { duration: 100, easing: expoOut })
      setTimeout(() => {
        progress.set(0, { duration: 0 })
        navigating = false
      }, 300)
    }
  })
</script>

{#if navigating}
  <div out:fade={{ duration: 500 }} class="fixed top-0 z-50 flex w-full flex-col">
    <Progress
      value={progress.current}
      max={100}
      class="h-1 animate-pulse rounded-none bg-chart-1/20 [&_[data-slot=progress-indicator]]:bg-chart-1"
    />
  </div>
{/if}
