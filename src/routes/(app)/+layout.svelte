<script lang="ts">
  import AppSidebar from '$lib/components/app-sidebar.svelte'
  import SiteHeader from '$lib/components/site-header.svelte'
  import { SidebarInset, SidebarProvider } from '$lib/components/ui/sidebar'
  import { setTitleState } from '$lib/title.svelte'

  let { children } = $props()

  setTitleState()
</script>

<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <SiteHeader />

    <main class="@container/main flex flex-1 flex-col gap-2">
      <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <!-- <SectionCards /> -->
        <!-- <div class="px-4 lg:px-6"> -->
        <!-- <ChartAreaInteractive /> -->
        <!-- </div> -->
        <!-- <DataTable data={data} /> -->
        <!-- <div class="flex gap-4 px-4 lg:px-6"> -->
        <!-- <div class="basis-1/2"> -->
        <!-- <ChartPieDonut /> -->
        <!-- </div> -->
        <!-- <div class="basis-1/2"> -->
        <!-- <ChartBarMixed /> -->
        <!-- </div> -->
        <!-- </div> -->
        {@render children?.()}
      </div>
    </main>
  </SidebarInset>
</SidebarProvider>
