import assert from 'assert'
import { model, actions } from './index'

describe('Todo', () => {

	describe('CRUD', () => {

		// TESTING
		it('Should be able to push a new item', () => {

			const text = 'Hello World!!!'
			const { todos } = actions.ADD( model, { text })
			const item = todos[0]

			assert.equal(item.text, text)
		})

	})
})
