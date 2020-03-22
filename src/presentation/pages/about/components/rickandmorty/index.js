export default function rickandmorty ({ main, injection, render }) {

	const { store } = injection

	main( _ => [
		fetch,
		subscriptions
	])

	const fetch = () => {
		store.dispatch('FETCH')
	}

	const subscriptions = () => {
		store.subscribe( render )
	}
}
