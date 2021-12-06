import { trackPageView } from 'shared/analytics'
import Lazyload from 'vanilla-lazyload'

export default function application ({ main }) {

	main( _ => [
		events,
		pageload,
		lazyload,
		trackpage
	])

	const events = () => {
		//Animation out
		window.addEventListener('beforeunload', navigate)
		window.addEventListener('unload', navigate)
	}

	const pageload = () => {
		document.body.classList.add('in')
	}

	const navigate = (e) => {
		document.body.classList.remove('in')
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
