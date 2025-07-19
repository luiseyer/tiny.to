<script lang="ts">
  import { page } from '$app/state'
  import { getClicksState } from '$lib/clicks'
  import { getLinksState } from '$lib/links'
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/shadcn/ui/card'
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '$lib/shadcn/ui/table'
  import { flip } from 'svelte/animate'

  const links = getLinksState()
  const clicks = getClicksState()

  const topLinks = $derived.by(() => {
    const clicksInMonth = clicks.list.filter((click) => {
      const date = new Date(click.timestamp)
      return date.getMonth() === new Date().getMonth()
    })

    const topLinks = links.list.filter((link) => {
      return clicksInMonth.some((click) => click.link === link.id)
    })

    return topLinks
      .map((link) => {
        return {
          ...link,
          clicks: clicksInMonth.filter((click) => click.link === link.id).length,
        }
      })
      .toSorted((a, b) => {
        return (
          clicksInMonth.filter(({ link }) => link === b.id).length -
          clicksInMonth.filter(({ link }) => link === a.id).length
        )
      })
      .slice(0, 10)
  })

  const numberFormatter = Intl.NumberFormat('es', { compactDisplay: 'short', notation: 'compact' })
</script>

<div class="flex flex-col gap-2 px-4 lg:px-6">
  <Card>
    <CardHeader>
      <CardTitle class="text-xl">Top 10 Enlaces</CardTitle>
      <CardDescription>Enlaces mas visitados en los últimos 30 días.</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader class="bg-muted">
            <TableRow>
              <TableHead class="px-8 py-4 text-muted-foreground">Enlace Acortado</TableHead>
              <TableHead class="px-8 py-4 text-muted-foreground">Enlace de Destino</TableHead>
              <TableHead class="px-8 py-4 text-right text-muted-foreground">Visitas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {#each topLinks as item (item.id)}
              <tr
                animate:flip={{ duration: 250 }}
                data-slot="table-row"
                class="border-b transition-colors data-[state=selected]:bg-muted hover:[&,&>svelte-css-wrapper]:[&>th,td]:bg-muted/50"
              >
                <TableCell class="max-w-64 overflow-hidden px-8 py-4 text-ellipsis">
                  <a href={item.slug} title={item.slug} target="_blank" class="hover:underline">
                    {item.slug}
                  </a>
                </TableCell>
                <TableCell class="max-w-96 overflow-hidden px-8 py-4 text-ellipsis">
                  <a href={item.url} title={item.url} target="_blank" class="hover:underline">
                    {item.url}
                  </a>
                </TableCell>
                <TableCell class="px-8 py-4 text-right">
                  {numberFormatter.format(item.clicks * 10)}
                </TableCell>
              </tr>
            {/each}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
</div>
