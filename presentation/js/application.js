import { trackPageView } from 'js/helpers/analytics'
import Lazyload from 'vanilla-lazyload'

export default function application({ main }) {

	main( _ => [
		events,
		lazyload,
		trackpage
	])

	const events = () => {
		//Animation out
		window.addEventListener('beforeunload', navigate)
	}

	const navigate = (e) => {
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
