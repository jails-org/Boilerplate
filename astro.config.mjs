import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import critters from 'astro-critters';
import rupture from 'rupture';

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
	integrations: [compress(), critters(), tailwind()],
	vite: {
		ssr: {
			external: ['svgo']
		}
	}
})
