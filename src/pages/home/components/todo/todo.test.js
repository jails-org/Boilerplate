import jails from 'jails-js'
import $ from 'jquery'
import * as todo from './index'
import { getPugComponent } from '../../../../shared/jest-utils'

beforeAll( (cb) => {

	const html = getPugComponent('pages/home/components/todo/index.pug', 'todo', {})
	document.body.innerHTML = html

	jails.register('todo', todo, { router: { get: _ => null } } )
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
