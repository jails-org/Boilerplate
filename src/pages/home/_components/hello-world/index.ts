import { store } from '../../_use-cases/store'

export default function helloWorld ({ main, state }) {

    main( _ => [
        events,
		hydratation
    ])

    const events = ({ on }) => {
		on('click', '[data-remove]', remove)
		store.patternMatch({ USERS_LIST_REMOVE : update })
    }

	const hydratation = () => {
		state.set({ hydrated : true })
		const { users } = state.get()
		store.dispatch('USERS_LIST_SET', { users })
	}

	const remove = (e) => {
		const id = Number(e.target.dataset.remove)
		store.dispatch('USERS_LIST_REMOVE', { id })
	}

	const update = ({ users }) => {
		state.set({ users })
	}
}

export const model = {
	users: [],
	hydrated: false
}
