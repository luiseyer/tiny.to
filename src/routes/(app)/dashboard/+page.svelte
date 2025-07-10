<script lang="ts">
  import SectionCards from '$lib/components/section-cards.svelte'
  import TopLinksTable from '$lib/components/top-links-table.svelte'
  import { getTitleState } from '$lib/title.svelte'

  const title = getTitleState()

  title.value = 'Dashboard'
</script>

<SectionCards />

<TopLinksTable />
