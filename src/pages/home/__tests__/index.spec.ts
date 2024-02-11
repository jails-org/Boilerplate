import { describe, test, expect } from 'vitest'
import * as usersCase from '../_use-cases/users'
import { getUsers } from '../_services/users'

describe('THE USERS LIST', () => {

	test('Should add a users list into the store', async () => {
		const newusers = await getUsers()
		usersCase.setUsers( newusers )
		const users = usersCase.users.value
		expect( users ).toEqual( newusers )
	})

	test('Should be able to remove a user from the list by id', async () => {
		const newusers = await getUsers()
		usersCase.removeUser( 1 )
		const users = usersCase.users.value
		expect( users.length ).toEqual(newusers.length - 1)
	})
})
