<script lang="ts">
  import { getAuthState } from '$lib/auth'
  import AppSidebar from '$lib/components/app-sidebar.svelte'
  import SiteHeader from '$lib/components/site-header.svelte'
  import { SidebarInset, SidebarProvider } from '$lib/components/ui/sidebar'
  import { setLinksState } from '$lib/links/state.svelte'
  import type { LayoutProps } from './$types'

  let { children, data }: LayoutProps = $props()

  const auth = getAuthState()

  const links = setLinksState(data.links)

  $effect(() => {
    if (auth.user) {
      links.subscribe(auth.user.id)
    }
  })
</script>

<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <SiteHeader />

    <main class="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {@render children?.()}
    </main>
  </SidebarInset>
</SidebarProvider>
