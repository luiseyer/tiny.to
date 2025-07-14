<script lang="ts">
  import DataTable from '$lib/links/components/data-table'
  import { Modal, setModalState } from '$lib/links/components/modal'

  setModalState()
</script>

<Modal />

<div class="flex flex-col gap-4 px-4 lg:px-6">
  <DataTable />
</div>
