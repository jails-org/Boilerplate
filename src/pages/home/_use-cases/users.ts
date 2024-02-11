import { signal } from 'jails.pandora/store'

export { effect } from 'jails.pandora/store'

export const users = signal([])

export const setUsers = ( list ) => {
	users.value = list
}

export const removeUser = (id) => {
	users.value = users.value.filter( item => item.id !== id )
}
