import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import rupture from 'rupture'
import path from 'path'

// https://astro.build/config
export default defineConfig({

	integrations: [
		// https://docs.astro.build/en/guides/integrations-guide/tailwind
		tailwind({ applyBaseStyles: false })
	],

	vite: {
		ssr: {
			external: ['svgo']
		},
		css: {
			preprocessorOptions: {
				styl: {
					use: rupture(),
					paths: [
						path.resolve('src'),
						path.resolve('node_modules')
					],
					resolveURL : true,
					includeCSS : true,
					additionalData: ``
				}
			}
		}
	}
})

