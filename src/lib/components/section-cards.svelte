<script lang="ts">
  import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/shadcn/ui/card'
  import { Skeleton } from '$lib/shadcn/ui/skeleton'
  import { cn } from '$lib/shadcn/utils'
  import type { IconProps } from '@lucide/svelte'
  import HistoryIcon from '@lucide/svelte/icons/history'
  import MonitorSmartphoneIcon from '@lucide/svelte/icons/monitor-smartphone'
  import PlusIcon from '@lucide/svelte/icons/plus'
  import TrendingUpIcon from '@lucide/svelte/icons/trending-up'
  import { type Component, onMount } from 'svelte'
  import { Tween } from 'svelte/motion'

  type CardProps = {
    icon: Component<IconProps>
    header: {
      title: string
      description: string
    }
    footer: {
      title: string
      description: string
    }
    class?: string | undefined
  }

  const totalClicks = new Tween(0, { duration: 1000 })
  const uniqueClicks = new Tween(0, { duration: 1000 })
  const todayClicks = new Tween(0, { duration: 1000 })
  const totalLinks = new Tween(0, { duration: 1000 })

  onMount(() => {
    totalClicks.target = 2435
    uniqueClicks.target = 1234
    todayClicks.target = 143
    totalLinks.target = 531
  })
</script>

{#snippet card(props: CardProps)}
  <Card class="group/card @container/card relative">
    <CardHeader>
      <CardDescription>{props.header.description}</CardDescription>
      <CardTitle class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
        {#if props.header.title === '0'}
          <Skeleton class="mt-3 h-6 w-[8ch]" />
        {:else}
          {props.header.title}
        {/if}
      </CardTitle>
      <div
        class={cn(
          'absolute top-4 right-4 rounded-full px-2.5 py-1.5',
          'group-odd/card:bg-chart-1 group-even/card:bg-chart-2',
          props.class
        )}
      >
        <props.icon class="size-4" />
      </div>
    </CardHeader>
    <CardFooter class="flex-col items-start gap-1 text-sm">
      <div class="line-clamp-1 flex gap-2 font-medium">{props.footer.title}</div>
      <div class="text-muted-foreground">{props.footer.description}</div>
    </CardFooter>
  </Card>
{/snippet}

<div class="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
  {@render card({
    icon: TrendingUpIcon,
    header: {
      title: totalClicks.current.toFixed(0),
      description: 'Clicks Totales',
    },
    footer: {
      title: 'Tendencias del mes',
      description: 'Visitas de los últimos 30 días',
    },
  })}

  {@render card({
    icon: MonitorSmartphoneIcon,
    header: {
      title: uniqueClicks.current.toFixed(0),
      description: 'Clicks únicos',
    },
    footer: {
      title: 'Tendencias del mes',
      description: 'Visitas por dispositivo',
    },
  })}

  {@render card({
    icon: HistoryIcon,
    header: {
      title: todayClicks.current.toFixed(0),
      description: 'Clickeados hoy',
    },
    footer: {
      title: 'Metricas de hoy',
      description: 'Enlaces visitados hoy',
    },
    class: '@xl/main:!bg-chart-2 @5xl/main:!bg-chart-1',
  })}

  {@render card({
    icon: PlusIcon,
    header: {
      title: totalLinks.current.toFixed(0),
      description: 'Enlaces creados',
    },
    footer: {
      title: 'Desde el inicio',
      description: 'Total de enlaces existentes',
    },
    class: '@xl/main:!bg-chart-1 @5xl/main:!bg-chart-2',
  })}
</div>
