<script lang="ts">
  import { page } from '$app/state'
  import ToggleTheme from '$lib/components/toggle-theme.svelte'
  import { Separator, SidebarTrigger } from '$lib/shadcn/ui/sidebar'
</script>

<header
  class="flex h-12 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 lg:px-6"
>
  <div class="flex w-full items-center gap-1 lg:gap-2">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
    <h1 class="text-base font-medium">{page.data.title}</h1>
  </div>

  <div class="flex items-center gap-1 lg:gap-2">
    <ToggleTheme />
  </div>
</header>
