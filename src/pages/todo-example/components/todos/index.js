
export default function todos ({ main, elm, state, dependencies }) {

	const { router, store } = dependencies
	const input = elm.querySelector('[name=todo]')

	main( _ => [
		events,
		routes,
		start
	])

	const events = ({ on }) => {
		on('submit', '.add', add)
		on('blur', 'li .form-control', save)
		on('click', '.clear', clear)
		on('click', '.remove', remove)
		on('dblclick', 'label', edit)
		on('change', '.check', toggle)
		state.subscribe( updateStore )
	}

	const routes = () => {
		router.get('/:filter', visibility)
		router.get('', _ => router.navigate('/all'))
	}

	const start = () => {
		const { todos } = store.getState()
		state.set({ todos })
	}

	const updateStore = (s) => {
		store.dispatch('UPDATE_TODOS', { todos: s.todos })
	}

	const add = ( e ) => {

		const text = input.value.trim()

		if ( text ) {
			state.set( s => s.todos = s.todos.concat( Todo({ text }) ) )
				.then( _ => input.value = '' )
		}

		e.preventDefault()
	}

	const save = ({ target }) => {
		const { id, text } = getData(target)
		if (text) {
			state.set( s => s.todos = s.todos.map( item => item.id === id? { ...item, text, edit: false } : item ) )
		}
	}

	const clear = () => {
		state.set( s => s.todos = s.todos.filter(item => !item.completed) )
	}

	const visibility = ({ params }) => {
		const filter = params.filter
		state.set({ filter })
	}

	const remove = (e) => {
		const { id } = getData(e.target)
		state.set( s => s.todos = s.todos.filter( item => item.id !== id ) )
	}

	const edit = (e) => {
		const { id } = getData(e.target)
		state.set( s => s.todos = s.todos.map(item => {
			item.edit = item.id === id ? true : item.edit
			return item
		}))
	}

	const toggle = (e) => {
		const { id } = getData(e.target)
		state.set( s => s.todos = s.todos.map( item => {
			item.completed = item.id === id ? !item.completed : item.completed
			return item
		}))
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
export const view = ({ filter, todos:newtodos }) => {
	const todos = visibility( filter, newtodos )
	return {
		filter,
		todos
	}
}
