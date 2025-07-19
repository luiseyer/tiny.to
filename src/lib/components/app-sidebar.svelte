<script lang="ts">
  import { page } from '$app/state'
  import { Routes } from '$lib/consts'
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from '$lib/shadcn/ui/sidebar'
  import { cn } from '$lib/shadcn/utils'
  import ChartNoAxesColumnIncreasingIcon from '@lucide/svelte/icons/chart-no-axes-column-increasing'
  import LayoutDashboardIcon from '@lucide/svelte/icons/layout-dashboard'
  import LinkIcon from '@lucide/svelte/icons/link'
  import SettingsIcon from '@lucide/svelte/icons/settings'
  import NavUser from './nav-user.svelte'

  const items = [
    {
      title: 'Dashboard',
      url: Routes.Dashboard,
      icon: LayoutDashboardIcon,
    },
    {
      title: 'Enlaces',
      url: Routes.Links,
      icon: LinkIcon,
    },
    {
      title: 'Analíticas',
      url: Routes.Analytics,
      icon: ChartNoAxesColumnIncreasingIcon,
    },

    {
      title: 'Configuración',
      url: Routes.Settings,
      icon: SettingsIcon,
    },
  ]
</script>

<Sidebar variant="inset">
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          {#snippet child({ props })}
            <a href="/" {...props}>
              <LinkIcon class="h-5 w-5" />
              <span class="text-base font-semibold">Tiny.to</span>
            </a>
          {/snippet}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {#each items as item (item.title)}
            <SidebarMenuItem>
              <SidebarMenuButton
                class={cn({
                  'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground':
                    page.url.pathname === item.url,
                })}
              >
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </SidebarMenuButton>
            </SidebarMenuItem>
          {/each}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
  <SidebarFooter>
    <NavUser />
  </SidebarFooter>
</Sidebar>
