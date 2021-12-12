import { trackPageView } from 'shared/analytics'
import Lazyload from 'vanilla-lazyload'

export default function application ({ main }) {

	main( _ => [
		events,
		lazyload,
		trackpage
	])

	const events = () => {
		window.addEventListener('beforeunload', navigate)
		window.addEventListener('unload', navigate)
	}

	const navigate = (e) => {
		//Animation out
		document.body.classList.add('out')
	}

	const lazyload = () => {
		new Lazyload({
			elements_selector: 'img[data-src]'
		})
	}

	const trackpage = () => {
		trackPageView()
	}
}
