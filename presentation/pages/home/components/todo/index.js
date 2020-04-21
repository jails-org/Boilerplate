
export default function todo ({ main, msg, injection }) {

	const { router } = injection

	main( _ => [
		events,
		routes
	])

	const events = ({ on }) => {
		on('submit', '.add', add)
		on('click', '.clear', clear)
		on('blur', 'li .form-control', save)
		on('click', '.remove', action('REMOVE'))
		on('dblclick', 'label', action('EDIT'))
		on('change', '.check', action('TOGGLE'))
	}

	const routes = () => {
		router.get('/:filter', visibility)
		router.get('', _ => router.navigate('/all'))
	}

	const add = ( e ) => {

		const { target } = e
		const text = target.text.value.trim()

		if ( text ) {
			msg.dispatch('ADD', { text })
				.then(_ => target.text.value = '')
		}

		e.preventDefault()
	}

	const save = ({ target }) => {
		const { id, text } = getData(target)
		if (text) {
			msg.dispatch('SAVE', { id, text })
		}
	}

	const clear = () => {
		msg.dispatch('CLEAR')
	}

	const visibility = ({ params }) => {
		const visibility = params.filter
		msg.dispatch('VISIBILITY', { visibility })
	}

	const action = ( name ) => (e) => {
		const { id } = getData(e.target)
		msg.dispatch(name, { id })
	}

	const getData = (target) => {
		const id = +target.dataset.id
		const text = target.value
		return { id, text }
	}
}

// @View
const visibility = (by, todos) => {
	switch (by) {
		case 'completed':
			return todos.filter( item => item.completed )
		case 'active':
			return todos.filter( item => !item.completed )
		default:
			return todos
	}
}

// @Todo Factory
const Todo = ({ text }) => ({
	text,
	id			: Math.random() * Math.pow(10, 20),
	completed	: false,
	edit		: false
})

// @Model
export const model = {
	filter: '',
	todos : []
}

// @View
export const view = ({ filter, todos }) => ({
	filter,
	todos: visibility( filter, todos )
})

// @Actions
export const actions = {

	ADD: (state, { text }) => ({
		todos: state.todos.concat( Todo({ text }) )
	}),

	CLEAR: (state, payload) => ({
		todos: state.todos.filter(item => !item.completed)
	}),

	TOGGLE: (state, { id }) => ({
		todos: state.todos.map(item => {
			item.completed = item.id === id ? !item.completed : item.completed
			return item
		})
	}),

	SAVE: (state, { id, text }) => ({
		todos: state.todos.map( item => item.id === id? { ...item, text, edit: false } : item )
	}),

	EDIT: (state, { id }) => ({
		todos: state.todos.map(item => {
			item.edit = item.id === id ? true : item.edit
			return item
		})
	}),

	REMOVE: (state, { id }) => ({
		todos: state.todos.filter( item => item.id !== id )
	}),

	VISIBILITY: (state, { visibility }) => ({
		filter: visibility ? visibility : state.filter
	})
}
