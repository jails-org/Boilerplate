import { defineConfig } from 'astro/config'
import compress from 'astro-compress'
import critters from 'astro-critters'
import tailwind from '@astrojs/tailwind'
import image from "@astrojs/image"
import rupture from 'rupture'

// https://astro.build/config
export default defineConfig({
	integrations: [compress(), critters(), image(), tailwind()],
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

