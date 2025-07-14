<script lang="ts">
  import { Routes } from '$lib/consts'
  import LinkIcon from '@lucide/svelte/icons/link'

  let { children } = $props()
</script>

<div class="grid min-h-svh lg:grid-cols-2">
  <div class="flex flex-col gap-4 p-6 md:p-10">
    <div class="flex justify-center gap-2 md:justify-start">
      <a href={Routes.Home} class="flex items-center gap-2 font-medium">
        <div
          class="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground"
        >
          <LinkIcon class="size-4" />
        </div>
        Tiny.to
      </a>
    </div>
    <div class="flex flex-1 items-center justify-center">
      <div class="w-full max-w-xs">
        {@render children?.()}
      </div>
    </div>
  </div>

  <div class="relative hidden bg-muted lg:block">
    <img
      width="100"
      height="100"
      src="https://raw.githubusercontent.com/huntabyte/shadcn-svelte/453c0f887e962eb2748be1c878c05efe321ab285/docs/static/img/placeholder.svg"
      alt="placeholder"
      class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
    />
  </div>
</div>
