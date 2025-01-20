import { describe, test, expect } from 'vitest'
import { usersCase } from '../_use-cases/users'

describe('THE USERS LIST', () => {

	test('Should loading state be true when fetching users', async () => {
		usersCase.dispatch('FETCH_USERS')
			.then((state) => expect( state.loading ).toEqual( true ))
	})

	test('Should add a users list into the store', async () => {

		const state = await new Promise((resolve) => {
			usersCase.dispatch('FETCH_USERS')
			usersCase.patternMatch({
				SET_USERS( state ) {
					resolve(state)
				}
			})
		})

		expect( state.users.length ).toEqual( 10 )
	})

	test('Should be able to remove a user from the list by id', async () => {
		const state = await usersCase.dispatch('REMOVE_USER', { id : '1' })
		expect( state.users.length ).toEqual( 9 )
	})

})
