import { thirdPartyIframe } from './utils'

const analytics = thirdPartyIframe('analytics')

export const trackPageView = () => {

	const ua = APPCONFIG.analytics

	analytics.then( _ => {
		ga('create', ua, 'auto')
		ga('send', 'pageview')
	})
}

export const trackEvent = (...args) => {
	analytics.then( _ => ga.apply(ga, args) )
}
