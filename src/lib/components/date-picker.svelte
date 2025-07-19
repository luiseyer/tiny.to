<script lang="ts">
  import { buttonVariants } from '$lib/shadcn/ui/button'
  import { Calendar } from '$lib/shadcn/ui/calendar'
  import * as Popover from '$lib/shadcn/ui/popover'
  import * as Select from '$lib/shadcn/ui/select'
  import { cn } from '$lib/shadcn/utils'
  import {
    CalendarDate,
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
    today,
  } from '@internationalized/date'
  import CalendarIcon from '@lucide/svelte/icons/calendar'

  const df = new DateFormatter('es', {
    dateStyle: 'long',
  })

  function parse(value: string | undefined) {
    try {
      if (!value) return undefined

      const date = new Date(value)

      return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
    } catch (e) {
      return undefined
    }
  }

  let {
    id,
    value = $bindable(),
    class: className,
  }: { id: string; value: string | undefined; class?: string | undefined } = $props()

  let valueDate: DateValue | undefined = $state(parse(value))
  const valueString = $derived(
    valueDate ? df.format(valueDate.toDate(getLocalTimeZone())) : 'Nunca Expira'
  )

  const items = [
    { value: 1, label: 'Mañana' },
    { value: 3, label: 'En 3 días' },
    { value: 7, label: 'En 7 días' },
    { value: 30, label: 'En 30 días' },
    { value: 0, label: 'Nunca Expira' },
  ]
</script>

<Popover.Root>
  <Popover.Trigger
    {id}
    class={cn(
      buttonVariants({
        variant: 'outline',
        class: 'justify-start text-left font-normal',
      }),
      { 'text-muted-foreground': !valueDate },
      className
    )}
  >
    <CalendarIcon class="mr-2 size-4" />
    {valueDate ? df.format(valueDate.toDate(getLocalTimeZone())) : 'Selecciona una fecha'}
  </Popover.Trigger>
  <Popover.Content class="flex w-auto flex-col space-y-2 p-2">
    <Select.Root
      type="single"
      bind:value={
        () => valueString,
        (v) => {
          if (!v || Number.parseInt(v) === 0) {
            valueDate = undefined
            return
          }
          valueDate = today(getLocalTimeZone()).add({ days: Number.parseInt(v) })
        }
      }
    >
      <Select.Trigger>
        {valueString}
      </Select.Trigger>
      <Select.Content>
        {#each items as item (item.value)}
          <Select.Item value={`${item.value}`}>{item.label}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
    <div class="rounded-md border">
      <Calendar
        type="single"
        locale="es"
        minValue={parse(new Date(Date.now()).toISOString()) as DateValue}
        bind:value={valueDate as DateValue}
        onValueChange={(v) => {
          if (!v) return
          value = v.toDate(getLocalTimeZone()).toISOString()
        }}
      />
    </div>
  </Popover.Content>
</Popover.Root>
