<script lang="ts">
  import { page } from '$app/state'
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card'
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '$lib/components/ui/table'

  const data = [
    {
      id: 'link_abcde12345',
      url: 'https://www.google.com',
      slug: 'googl01',
      expiresAt: '2025-07-16T13:00:00.000Z',
      createdAt: '2025-07-09T13:00:00.000Z',
      updatedAt: '2025-07-09T13:00:00.000Z',
    },
    {
      id: 'link_fghij67890',
      url: 'https://developer.mozilla.org/es/',
      slug: 'mdnweb',
      expiresAt: '2025-07-16T14:15:00.000Z',
      createdAt: '2025-07-09T14:15:00.000Z',
      updatedAt: '2025-07-09T14:15:00.000Z',
    },
    {
      id: 'link_klmno11223',
      url: 'https://svelte.dev/',
      slug: 'sveltd',
      expiresAt: '2025-07-17T09:30:00.000Z',
      createdAt: '2025-07-10T09:30:00.000Z',
      updatedAt: '2025-07-10T09:30:00.000Z',
    },
    {
      id: 'link_pqrst44556',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      slug: 'rickrl',
      expiresAt: '2025-07-17T11:00:00.000Z',
      createdAt: '2025-07-10T11:00:00.000Z',
      updatedAt: '2025-07-10T11:00:00.000Z',
    },
    {
      id: 'link_uvwxy77889',
      url: 'https://github.com/luiseyer',
      slug: 'mygit',
      expiresAt: '2025-07-18T10:00:00.000Z',
      createdAt: '2025-07-11T10:00:00.000Z',
      updatedAt: '2025-07-11T10:00:00.000Z',
    },
    {
      id: 'link_zabcd00112',
      url: 'https://www.reddit.com/r/programming/',
      slug: 'rprog',
      expiresAt: '2025-07-18T16:45:00.000Z',
      createdAt: '2025-07-11T16:45:00.000Z',
      updatedAt: '2025-07-11T16:45:00.000Z',
    },
    {
      id: 'link_efghi33445',
      url: 'https://www.typescriptlang.org/',
      slug: 'tslang',
      expiresAt: '2025-07-19T08:00:00.000Z',
      createdAt: '2025-07-12T08:00:00.000Z',
      updatedAt: '2025-07-12T08:00:00.000Z',
    },
    {
      id: 'link_jklmn66778',
      url: 'https://stackoverflow.com/',
      slug: 'stkoflow',
      expiresAt: '2025-07-19T14:00:00.000Z',
      createdAt: '2025-07-12T14:00:00.000Z',
      updatedAt: '2025-07-12T14:00:00.000Z',
    },
    {
      id: 'link_opqrs99001',
      url: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
      slug: 'csharpd',
      expiresAt: '2025-07-20T11:00:00.000Z',
      createdAt: '2025-07-13T11:00:00.000Z',
      updatedAt: '2025-07-13T11:00:00.000Z',
    },
    {
      id: 'link_tuvwx22334',
      url: 'https://pocketbase.io/',
      slug: 'pbhome',
      expiresAt: '2025-07-20T17:30:00.000Z',
      createdAt: '2025-07-13T17:30:00.000Z',
      updatedAt: '2025-07-13T17:30:00.000Z',
    },
  ]
</script>

<div class="flex flex-col gap-2 px-4 lg:px-6">
  <Card>
    <CardHeader>
      <CardTitle class="text-xl">Top 10 Enlaces</CardTitle>
      <CardDescription>Enlaces mas visitados en el último mes.</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader class="bg-muted">
            <TableRow>
              <TableHead class="px-8 py-4 text-muted-foreground">Enlace Acortado</TableHead>
              <TableHead class="px-8 py-4 text-muted-foreground">Enlace Original</TableHead>
              <TableHead class="px-8 py-4 text-right text-muted-foreground">Clicks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {#each data as item (item.id)}
              <TableRow>
                <TableCell class="px-8 py-4">
                  <a href="{page.url.origin}/{item.slug}" target="_blank" class="hover:underline">
                    tiny.to/{item.slug}
                  </a>
                </TableCell>
                <TableCell class="px-8 py-4">
                  <a href={item.url} target="_blank" class="hover:underline">{item.url}</a>
                </TableCell>
                <TableCell class="px-8 py-4 text-right"
                  >{(1000 * Math.random()).toFixed(0)}</TableCell
                >
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
</div>
