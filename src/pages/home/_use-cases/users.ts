import { Store } 	from 'jails.std/store'
import { getUsers } from '../_services/users'

const initialState = {
	users	: [],
	loading	: false
}

export const usersCase = Store( initialState, {

	FETCH_USERS( state, payload, { dispatch }) {
		getUsers().then( users => dispatch('SET_USERS', { users }) )
		return {
			loading: true
		}
	},

	SET_USERS( state, { users }) {
		return {
			users
		}
	},

	REMOVE_USER( state, { id }) {
		return {
			users: state.users.filter( user => user.id !== id )
		}
	}
})
