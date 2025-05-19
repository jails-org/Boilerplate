// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({

	vite: {
		resolve: {
			preserveSymlinks: true
		},

		optimizeDeps: {
			force: true
		},

		ssr: {
			external: ['svgo']
		},

		plugins: [tailwindcss()]
	}
})
