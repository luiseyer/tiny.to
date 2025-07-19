<script lang="ts">
  import { setClicksState } from '$lib/clicks'
  import AppSidebar from '$lib/components/app-sidebar.svelte'
  import SiteHeader from '$lib/components/site-header.svelte'
  import { setLinksState } from '$lib/links'
  import { SidebarInset, SidebarProvider } from '$lib/shadcn/ui/sidebar'
  import type { LayoutProps } from './$types'

  let { children, data }: LayoutProps = $props()

  setLinksState(data.links)
  setClicksState(data.clicks)
</script>

<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <SiteHeader />

    <main class="@container/main flex h-full flex-col gap-4 py-4 md:gap-6 md:py-6">
      {@render children?.()}
    </main>
  </SidebarInset>
</SidebarProvider>
