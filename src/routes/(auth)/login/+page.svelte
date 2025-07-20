<script lang="ts">
  import InputPassword from '$lib/components/input-password.svelte'
  import { Routes } from '$lib/consts'
  import { login } from '$lib/schemas'
  import { Button } from '$lib/shadcn/ui/button'
  import * as Form from '$lib/shadcn/ui/form'
  import { Input } from '$lib/shadcn/ui/input'
  import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle'
  import { toast } from 'svelte-sonner'
  import { superForm } from 'sveltekit-superforms'
  import { zod4Client } from 'sveltekit-superforms/adapters'
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()

  const form = superForm(data.form, {
    validators: zod4Client(login),
    onError({ result }) {
      if (result.status === 500 || result.status === 400) {
        toast.error(result.error.message)
      }
    },
  })

  const { form: formData, enhance, submitting } = form
</script>

<form method="POST" use:enhance class="flex flex-col gap-6">
  <div class="flex flex-col items-center gap-2 text-center">
    <h1 class="text-2xl font-bold">Inicia sesión en tu cuenta</h1>
    <p class="text-sm text-balance text-muted-foreground">
      Ingresa tu correo electrónico para iniciar sesión
    </p>
  </div>

  <Form.Field {form} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Correo electrónico</Form.Label>
        <Input {...props} bind:value={$formData.email} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Contraseña</Form.Label>
        <InputPassword {...props} bind:value={$formData.password} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button disabled={$submitting}>
    {#if $submitting}
      <LoaderCircleIcon class="animate-spin" /> Iniciando sesión...
    {:else}
      Iniciar sesión
    {/if}
  </Form.Button>

  <div class="grid gap-6">
    <div
      class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
    >
      <span class="relative z-10 bg-background px-2 text-muted-foreground"> O continua con </span>
    </div>
    <Button variant="outline" class="w-full">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 10.5C28.4183 10.5 32.2215 12.1856 34.9961 14.8817L39.0667 10.8111C35.0453 6.94274 30.0768 4.5 24 4.5C15.8235 4.5 8.78456 9.07613 5.09375 16.0312L9.77539 19.6875C11.5176 15.6599 17.2023 10.5 24 10.5Z"
          fill="#EA4335"
        />
        <path
          d="M42.1969 24C42.1969 22.3969 42.0625 20.8969 41.7406 19.4625H24V28.5H34.4391C33.9109 31.1391 32.25 33.3281 29.8969 34.8281V40.2469H36.8578C40.9453 36.4219 43.1969 30.5625 43.1969 24H42.1969Z"
          fill="#4285F4"
        />
        <path
          d="M24 43.5C30.0768 43.5 35.0453 40.0573 39.0667 36.1889L34.9961 32.1183C32.2215 34.8144 28.4183 36.5 24 36.5C17.2023 36.5 11.5176 31.3401 9.77539 27.3125L5.09375 30.9688C8.78456 37.9239 15.8235 42.5 24 42.5V43.5Z"
          fill="#34A853"
        />
        <path
          d="M5.09375 16.0312C3.35156 19.6875 3.35156 24.3125 5.09375 27.9688L9.77539 24.3125L9.77539 19.6875L5.09375 16.0312Z"
          fill="#FBBC05"
        />
      </svg>
      Iniciar sesión con Google
    </Button>
  </div>
  <div class="text-center text-sm">
    ¿No tienes una cuenta?
    <a href={Routes.Register} class="underline underline-offset-4"> Regístrate </a>
  </div>
</form>
