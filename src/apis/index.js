import axios from 'axios'

export default {

	// Return always a promise
	// Can be used in pug like this: API.users

	async users(){
		const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
		return data
	}
}
