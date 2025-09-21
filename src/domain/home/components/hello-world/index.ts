import { type Component } from 'jails-js'

export default function helloWorld({ main, on, state }: Component ) {

	main(() => {
		on('click', '[data-add]', onadd)
	})

	const onadd = () => {
		state.set( s => s.counter += 1 )
	}
}

export const model = {
	counter: 0
}
