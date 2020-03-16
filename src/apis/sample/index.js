// @ts-check
import axios from 'axios'

// @ts-ignore
const api = APPCONFIG.api.rickandmorty

/** @type { (Object) => Promise } */
export const getCharacters = async () => {
	const {data} = await axios.get(`${api}/character/1,2,3,4,5`)
	return data
}
