
export default function helloworld ({ main, msg, update, injection }){

	const {store} = injection

	main( _ => [
		events,
		fetch
	])

	const events = ({ on }) => {
		on('change', 'select', change)
	}

	const fetch = () => {
		store.dispatch('FETCH')
	}

	const change = (e) => {

		const theme = e.target.value
		const root = document.documentElement

		store.dispatch('SET_THEME', { theme })
			.then( _ => root.setAttribute('data-theme', theme) )
	}

	update( (props) => {
		msg.set(state => {
			state.items = props.items
			state.theme = props.theme
		})
	})

}

export const model = {
	items: null,
	theme: ''
}

export const view = (state) => {

	return {
		...state,
		darkmode : state.theme == 'theme-dark',
		lightmode: state.theme == 'theme-light'
	}
}
