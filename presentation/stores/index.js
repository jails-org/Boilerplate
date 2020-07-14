import storage from 'jails.packages/storage'
import { pandora, log } from 'jails.packages/pandora'
import { getCharacters } from '../../data/services/sample'

const KEY = 'STORE'
const isDev = process.env.NODE_ENV == 'development'

//@Store
export default () => {

	const Store = pandora({
		model,
		actions,
		middlewares: isDev ? [ log(KEY) ] : []
	})

	// Saving state into localstorage at every storage changes
	Store.subscribe(( state ) => storage.session.set(KEY, state))
	return Store
}

//@Model
const model = {
	loading :false,
	items 	:[]
}

//@Actions
const actions = {

	FETCH: (state, payload, {dispatch}) => {
		getCharacters([ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 ])
			.then( items => dispatch('RENDER_ITEMS', { items }))
		return {
			loading: true
		}
	},

	RENDER_ITEMS: (state, {items}) => ({
		items,
		loading : false
	})
}
