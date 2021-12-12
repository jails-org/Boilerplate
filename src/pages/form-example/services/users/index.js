// @ts-check
import axios from 'axios'
import { User } from '../../entities/user'

/** @type { (Array) => Promise<Array> } */
export const getUsers = async () => {

	// @ts-ignore
	const endpoint = APPCONFIG.endpoints.jsonplaceholder
	const { data } = await axios.get(`${endpoint}/users`)

	return data.map( User )
}
