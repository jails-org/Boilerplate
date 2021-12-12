import { getUsers } from '../../services/users'

export default function registerUser ({ main, state, get }) {

	const form = get('form')

	main( _ => [
		events,
		setUsers
	])

	const events = ({ on }) => {
		on('form:submit', saveUser)
		on('change', 'select', select)
	}

	const setUsers = async () => {
		const items = await getUsers()
		state.set({ items })
	}

	const select = (e) => {

		const id = Number(e.target.value)
		const { items } = state.get()
		const user = items.find( user => user.id === id )

		form('setFields', { ...user })
	}

	const saveUser = (e, { data }) => {
		const { name, phone, email } = data
		state.set({ user: { name, phone, email } })
	}
}

export const model = {
	items: [],
	user : null
}
