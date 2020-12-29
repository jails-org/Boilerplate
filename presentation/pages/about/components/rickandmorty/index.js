
export default function rickandmorty ({ main, msg, injection }) {

	const { store, getCharacters } = injection

	main( _ => [
		fetch
	])

	const fetch = async () => {
		const characters = await getCharacters([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
		store.dispatch('SAVE_CHARACTERS', { characters })
		msg.set( s => s.items = characters )
	}
}

export const model = {
	items : null
}
