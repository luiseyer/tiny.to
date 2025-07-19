<script lang="ts">
  import { getLinksState } from '$lib/links'
  import * as DataTable from '$lib/links/components/data-table'
  import { FormCreate, FormUpdate } from '$lib/links/components/forms'
  import { Modal } from '$lib/links/components/modal'
  import type { Link } from '$lib/types'

  const links = getLinksState()

  let createLink = $state(false)
  let updateLink = $state<Link | undefined>(undefined)
</script>

<Modal
  title="Crear Enlace"
  description="Completa los campos para crear un enlace"
  bind:open={createLink}
>
  <FormCreate onSuccess={() => (createLink = true)} />
</Modal>

<Modal
  title="Editar Enlace"
  description="Cambia los datos de tu enlace"
  open={Boolean(updateLink)}
  onClose={() => (updateLink = undefined)}
>
  {#if updateLink}
    <FormUpdate data={updateLink} onSuccess={() => (createLink = true)} />
  {/if}
</Modal>

<div class="flex flex-col gap-4 px-4 lg:px-6">
  <DataTable.Root data={links.list} onUpdate={(id) => (updateLink = links.get(id))}>
    {#snippet children({ table, columns })}
      <DataTable.Toolbar {table} onCreate={() => (createLink = true)} />
      <DataTable.Content {table} {columns} />
      <DataTable.Pagination {table} />
    {/snippet}
  </DataTable.Root>
</div>
