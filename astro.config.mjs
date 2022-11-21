import { defineConfig } from 'astro/config'
import compress from 'astro-compress'
import rupture from 'rupture'

// https://astro.build/config
export default defineConfig({
	integrations: [compress()],
	vite: {
		ssr: {
			external: ['svgo']
		},
		css: {
			preprocessorOptions: {
				styl: {
					use: rupture(),
					paths:['src/']
				}
			}
		}
	  }
})
