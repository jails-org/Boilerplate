import assert from 'assert'
import { model, actions } from '../../presentation/pages/home/components/todo'

describe('COMPONENT/TODO', () => {

	describe('CRUD', () => {

		// TESTING
		it('Should be able to push a new item', () => {

			const text = 'Hello World!!!'
			const { todos } = actions.ADD(model, { text })
			const item = todos[0]

			assert.strictEqual(item.text, text)
		})
	})
})
