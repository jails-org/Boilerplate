import { trackPageView } from 'js/helpers/tracking'

export default async function application ({ main }) {

	main( _ => [
		trackpage
	])

	const trackpage = () => {
		trackPageView()
	}
}
