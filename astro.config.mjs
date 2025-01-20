import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({

	integrations: [
		// https://docs.astro.build/en/guides/integrations-guide/tailwind
		tailwind()
	],

	vite: {
		resolve: {
			preserveSymlinks: true
		},
		optimizeDeps: {
			force: true
		},
		ssr: {
			external: ['svgo']
		}
	}
})

