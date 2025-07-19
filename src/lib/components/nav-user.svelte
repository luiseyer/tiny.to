<script lang="ts">
  import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
  import { getAuthState } from '$lib/auth'
  import * as Avatar from '$lib/shadcn/ui/avatar'
  import * as DropdownMenu from '$lib/shadcn/ui/dropdown-menu'
  import * as Sidebar from '$lib/shadcn/ui/sidebar'
  import BellIcon from '@lucide/svelte/icons/bell'
  import CreditCardIcon from '@lucide/svelte/icons/credit-card'
  import EllipsisVerticalIcon from '@lucide/svelte/icons/ellipsis-vertical'
  import LogoutIcon from '@lucide/svelte/icons/log-out'
  import UserIcon from '@lucide/svelte/icons/user'
  import UserCircleIcon from '@lucide/svelte/icons/user-circle'
  import { toast } from 'svelte-sonner'

  const auth = getAuthState()
  const sidebar = Sidebar.useSidebar()

  const avatar = $derived.by(() => {
    const { id, avatar } = auth.user || {}
    if (!id || !avatar) return undefined
    return `${PUBLIC_POCKETBASE_URL}/api/files/users/${id}/${avatar}`
  })

  async function logout() {
    const [error] = await auth.logout()

    if (error) {
      toast.error(error.message)
    }
  }
</script>

{#if auth.user}
  <Sidebar.Menu>
    <Sidebar.MenuItem>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <Sidebar.MenuButton
              {...props}
              size="lg"
              class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar.Root class="size-8">
                <Avatar.Image src={avatar} alt={auth.user?.name} />
                <Avatar.Fallback><UserIcon /></Avatar.Fallback>
              </Avatar.Root>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium">{auth.user?.name}</span>
                <span class="truncate text-xs text-muted-foreground">
                  {auth.user?.email}
                </span>
              </div>
              <EllipsisVerticalIcon class="ml-auto size-4" />
            </Sidebar.MenuButton>
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
          side={sidebar.isMobile ? 'bottom' : 'right'}
          align="end"
          sideOffset={4}
        >
          <DropdownMenu.Label class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar.Root class="size-8">
                <Avatar.Image src={avatar} alt={auth.user?.name} />
                <Avatar.Fallback><UserIcon /></Avatar.Fallback>
              </Avatar.Root>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium">{auth.user?.name}</span>
                <span class="truncate text-xs text-muted-foreground">
                  {auth.user?.email}
                </span>
              </div>
            </div>
          </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item><UserCircleIcon /> Mi cuenta</DropdownMenu.Item>
            <DropdownMenu.Item><CreditCardIcon /> Billing</DropdownMenu.Item>
            <DropdownMenu.Item><BellIcon /> Notificaciones</DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onclick={logout}>
            <LogoutIcon /> Cerrar sesión
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Sidebar.MenuItem>
  </Sidebar.Menu>
{/if}
