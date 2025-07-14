import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import devtoolsJson from 'vite-plugin-devtools-json'

export default defineConfig({
  plugins: [devtoolsJson(), tailwindcss(), sveltekit()],
  preview: { host: '0.0.0.0', allowedHosts: true },
  server: { allowedHosts: true }
})
