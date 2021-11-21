import { getCharacters } from '../../services/sample'

export default function rickandmorty ({ main, state, dependencies }) {

	const { store } = dependencies

	main( _ => [
		fetch
	])

	const fetch = async () => {
		const characters = await getCharacters([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
		store.dispatch('SAVE_CHARACTERS', { characters })
		state.set({ items: characters })
	}
}

export const model = {
	items : null
}
