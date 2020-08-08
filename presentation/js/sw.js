// self.__WB_MANIFEST

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { skipWaiting, clientsClaim } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

skipWaiting()
clientsClaim()
cleanupOutdatedCaches()

precacheAndRoute([
	{ url: '/', revision: null },
	{ url: '/about', revision: null },
	{ url: `/site.webmanifest`, revision: null }
])

registerRoute(
	({ url }) => url.pathname.match(/\.(js|css|svg)/),
	new StaleWhileRevalidate({
		cacheName: 'assets'
	})
)
// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
	({ url }) => url.origin === 'https://fonts.googleapis.com',
	new StaleWhileRevalidate({
		cacheName: 'google-fonts-stylesheets'
	})
)

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
	({ url }) => url.origin === 'https://fonts.gstatic.com',
	new CacheFirst({
		cacheName: 'google-fonts-webfonts',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			new ExpirationPlugin({
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 30
			})
		]
	})
)
