import { type Component } from 'jails-js'

export default function counter({ main, on, state } : Component) {

	main(_ => {
		on('click', 'button', onclick)
	})

	const onclick = (e) => {
		state.set( s => s.count += 1 )
	}

}

export const model = {
	count : 0
}
