import storage from 'jails.packages/storage'
import { pandora, log } from 'jails.packages/pandora'
import { getCharacters } from 'apis/sample'

const KEY = 'STORE'

//@Store
export default () => {

	const Store = pandora({
		model,
		actions,
		middlewares: process.env.NODE_ENV == 'development'
			? [ log(KEY) ]
			: []
	})

	// Saving state into localstorage at every storage changes
	Store.subscribe(( state ) => storage.local.set(KEY, state))
	return Store
}

//@Model
const model = storage.local.get(KEY) || {
	theme: 'theme-light',
	loading :false,
	items 	:[]
}

//@Actions
const actions = {

	FETCH: (state, payload, {dispatch}) => {

		if( state.items.length )
			return

		getCharacters()
			.then( items => dispatch('RENDER_ITEMS', { items }))

		return {
			loading: true
		}
	},

	RENDER_ITEMS: (state, {items}) => ({
		items,
		loading : false
	}),

	SET_THEME: (state, {theme}) => ({
		theme
	})
}
