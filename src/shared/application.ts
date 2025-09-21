import { type Component } from 'jails-js'
import { thirdParty } from 'jails.std/third-party'

export default function appMain({ main }: Component) {
	// Load third-party analytics library
	const analytics = thirdParty('analytics')

	main(() => {
		onload()
	})

	const onload = () => {
		analytics.then(() => {
			console.info('app-main/onload - Executing after analytics loaded')
		})
	}
}
