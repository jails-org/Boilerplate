import { defineConfig } from 'astro/config';
import critters from 'astro-critters';
import tailwind from '@astrojs/tailwind';
import image from "@astrojs/image";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [critters(), tailwind(), image(), compress()],
  vite: {
    ssr: {
      external: ['svgo']
    }
  }
});