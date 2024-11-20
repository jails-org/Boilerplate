import { User } from '../../_entities/user'

export const getUsers = async () => {
	return fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then( users => users.map(User) )
}
