import storage from 'jails.packages5/storage'
import store   from 'jails.packages5/store'

const KEY = 'STORE'

//@Store
export default () => {

	const initialState = {
		characters: []
	}

	const appstore = store(initialState, {
		//...Actions
		SAVE_CHARACTERS: (state, { characters }) => ({
			characters
		})
	})

	// Saving state into localstorage at every storage changes
	appstore.subscribe(( state, { action, payload } ) => {
		storage.session.set(KEY, state)
		console.groupCollapsed(`Store [${action}]`)
		console.log({ payload, state })
		console.groupEnd()
	})

	return appstore
}
