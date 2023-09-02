import { type Component } from 'jails-js/types'

export default function counter({ main, state } : Component) {

	main(_ => [
		events
	])

	const events = ({ on }) => {
		on('click', 'button', onclick)
	}

	const onclick = (e) => {
		state.set( s => s.count += 1 )
	}

}

export const model = {
	count : 0
}
