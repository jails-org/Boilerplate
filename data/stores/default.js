import storage from 'jails.packages/storage'
import { pandora, log } from 'jails.packages/pandora'

const KEY = 'STORE'
const isDev = process.env.NODE_ENV == 'development'

//@Store
export default () => {

	const store = pandora({
		model,
		actions,
		middlewares: isDev ? [ log(KEY) ] : []
	})

	// Saving state into localstorage at every storage changes
	store.subscribe(( state ) => storage.session.set(KEY, state))
	return store
}

//@Model
const model = {
	characters: []
}

//@Actions
const actions = {

	SAVE_CHARACTERS: (state, { characters }) => ({
		characters
	})
}
