
export default function helloWorld ({ main, state }) {

    main( _ => [
        events,
		hydratation
    ])

    const events = ({ on }) => {
		on('click', '[data-remove]', remove)
    }

	const hydratation = () => {
		state.set({ hydrated : true })
	}

	const remove = (e) => {
		const id = Number(e.target.dataset.remove)
		const filtered = item => item.id !== id
		state.set( s => s.users = s.users.filter( filtered ) )
	}
}

export const model = {
	users: [],
	hydrated: false
}
