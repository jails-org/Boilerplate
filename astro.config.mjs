import { defineConfig } from 'astro/config'
import rupture from 'rupture'

// https://astro.build/config
export default defineConfig({
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
