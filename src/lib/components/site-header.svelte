<script lang="ts">
  import { Separator, SidebarTrigger } from '$lib/components/ui/sidebar'
  import { getTitleState } from '$lib/title.svelte'

  const title = getTitleState()
</script>

<header
  class="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
>
  <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
    <h1 class="text-base font-medium">{title.value}</h1>
  </div>
</header>
