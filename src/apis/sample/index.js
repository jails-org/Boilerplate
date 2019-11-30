// @ts-check
import axios from 'axios'

/** @type { (Object) => Promise } */
export const getCharacters = async () => {

	// @ts-ignore
	// NEVER MOVE APPCONFIG TO OUTSIDE A FUNCTION
	const api = APPCONFIG.api.rickandmorty
	const {data} = await axios.get(`${api}/character/1,2,3,4,5`)

	return data
}
