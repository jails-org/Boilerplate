
export default function registerUser ({ main, msg }) {

	main( _ => [
		events
	])

	const events = ({ on }) => {
		on(':submit', saveUser)
	}

	const saveUser = (e, { data }) => {

		const name = data.username.value
		const email = data.email.value

		msg.set( s => s.user = { name, email } )
	}
}

export const model = {
	user : null
}
