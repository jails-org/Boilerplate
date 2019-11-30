import assert from 'assert'
import {model, actions} from './index'
import {pandora} from 'jails.packages/pandora'

describe('Hello World', () => {

	describe('TESTING - HELLO WORLD ACTIONS', () => {

		// Registering component actions in mockup store
		const store = pandora({
			model,
			actions
		})

		// TESTING
		it('Should be true', () => {
			assert.equal(true, true)
		})

	})
})
