import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import rupture from 'rupture'

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind()],
	vite: {
		ssr: {
			external: ['svgo']
		},
		css: {
			preprocessorOptions: {
				styl: {
					use: rupture(),
					paths: ['src', 'node_modules'],
					resolveURL : true,
					includeCSS : true,
					additionalData: ``
				}
			}
		}
	}
})

