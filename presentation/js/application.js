import { trackPageView } from 'helpers/tracking'

export default function application ({ main, injection, render }) {

	const { store } = injection

	main( _ => [
		events,
		pageload
	])

	const events = () => {
		store.subscribe( render )
	}

	const pageload = () => {
		trackPageView()
	}
}
