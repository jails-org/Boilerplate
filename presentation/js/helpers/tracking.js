import { thirdPartyIframe } from './utils'

const analytics = thirdPartyIframe('analytics')

export const trackPageView = () => {

	analytics.then( _ => {
		ga('create', APPCONFIG.analytics, 'auto')
		ga('send', 'pageview')
	})
}

export const trackEvent = (...args) => {
	analytics.then( _ => ga.apply(ga, args) )
}
