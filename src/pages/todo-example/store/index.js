import storage from 'jails.packages5/storage'
import store   from 'jails.packages5/store'

const KEY = 'STORE/TODO'

//@Store
export default () => {

	const initialState = storage.session.get(KEY) || {
		todos: []
	}

	const appstore = store(initialState, {
		//...Actions
		UPDATE_TODOS: (state, { todos }) => ({
			todos
		})
	})

	// Saving state into localstorage at every storage changes
	appstore.subscribe(( state, { action, payload } ) => {
		storage.session.set(KEY, state)
		console.groupCollapsed(`${KEY} -> ${action}`)
		console.log({ payload, state })
		console.groupEnd()
	})

	return appstore
}
