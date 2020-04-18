import { thirdParty } from './utils'

const analytics = thirdParty('analytics')

export const trackPageView = () => {
	analytics.then( _ => ga('send', 'pageview') )
}

export const trackEvent = (...args) => {
	analytics.then( _ => ga.apply(ga, args) )
}
