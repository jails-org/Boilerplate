
export default function todo ({ main, msg, injection }) {

	const { router } = injection

	main( _ => [
		register,
		routes
	])

	const register = ({ on }) => {
		on('submit', '.add', add)
		on('submit', 'form', prevent)
		on('click', '.clear', clear)
		on('click', '.remove', action('REMOVE'))
		on('dblclick', 'label', action('EDIT'))
		on('change', '.check', action('TOGGLE'))
		on('blur', 'li .form-control', save)
	}

	const routes = () => {
		router.get('/:filter', visibility)
		router.get('', _ => router.navigate('/all'))
	}

	const getData = target => {
		const id = +target.dataset.id
		const text = target.value
		return { id, text }
	}

	const action = name => ({ target }) => {
		const { id } = getData(target)
		msg.dispatch(name, { id })
	}

	const prevent = e => {
		e.preventDefault()
	}

	const clear = () => {
		msg.dispatch('CLEAR')
	}

	const add = ({ target }) => {
		const text = target.text.value.trim()
		if (text) {
			msg.dispatch('ADD', { text })
		}
	}

	const save = ({ target }) => {
		const { id, text } = getData(target)
		if (text) {
			msg.dispatch('SAVE', { id, text })
		}
	}

	const visibility = ({ params }) => {
		const visibility = params.filter
		msg.dispatch('VISIBILITY', { visibility })
	}
}

// @View
const filter = (by, todos) => {
	switch (by) {
		case 'completed':
			return todos.filter(item => item.completed)
		case 'active':
			return todos.filter(item => !item.completed)
		default:
			return todos
	}
}

// @Todo Factory
const Todo = ({ text }) => ({
	text,
	id: Math.random() * Math.pow(10, 20),
	completed: false,
	edit: false
})

// @Model
export const model = {
	filter: 'all',
	todos: []
}

// @View
export const view = (state) => {
	return {
		...state,
		todos: filter(state.filter, state.todos)
	}
}

// @Actions
export const actions = {

	ADD: (state, { text }) => ({
		todos: state.todos.concat(Todo({ text }))
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
		todos: state.todos.map(item => (item.id === id ? Object.assign(item, { text, edit: false }) : item))
	}),

	EDIT: (state, { id }) => ({
		todos: state.todos.map(item => {
			item.edit = item.id === id ? true : item.edit
			return item
		})
	}),

	REMOVE: (state, { id }) => ({
		todos: state.todos.filter(item => item.id !== id)
	}),

	VISIBILITY: (state, { visibility }) => ({
		filter: visibility ? visibility : state.filter
	})
}
