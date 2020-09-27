import { thirdParty } from './utils'

const analytics = thirdParty('analytics')

export const trackPageView = () => {

	analytics.then( _ => {
		window.ga('create', APPCONFIG.analytics, 'auto')
		window.ga('send', 'pageview')
	})
}

export const trackEvent = (...args) => {
	analytics.then( _ => window.ga.apply(window.ga, args) )
}
