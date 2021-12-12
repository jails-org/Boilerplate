import jails from 'jails-js'
import $ from 'jquery'
import todoStore from '../../store'
import * as todos from './index'
import { getPugComponent } from '../../../../shared/utils/jest-utils'

beforeAll( (cb) => {

	const router = { get: _ => null }
	const store  = todoStore()
	const html   = getPugComponent('pages/todo-example/components/todos/index.pug', 'todos', {})

	document.body.innerHTML = html

	jails.register('todos', todos, { router, store } )
	jails.start()

	cb()
})

describe('TODO - Component', () => {

	test('it should append new item on form submit', () => {

		const text  = 'Meu teste'
		const form  = $('form')
		const input = $('input[type=text]')

		input.val( text )
		form.submit()

		const labelText = $('.custom-control-label').text()

		expect( labelText ).toBe( text )
	})
})
