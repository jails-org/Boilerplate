
export default function registerUser ({ main, state }) {

	main( _ => [
		events
	])

	const events = ({ on }) => {
		on('form:submit', saveUser)
	}

	const saveUser = (e, { data }) => {
		state.set({ user : data  })
	}
}

export const model = {
	user : null
}
