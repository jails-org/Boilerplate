// @ts-check
import axios from 'axios'
import { Character } from '../../entities/character'

/** @type { (Object) => Promise<Array> } */
export const getCharacters = async () => {

	// @ts-ignore
	const endpoint = APPCONFIG.endpoints.rickandmorty
	const {data} = await axios.get(`${endpoint}/character/1,2,3,4,5`)

	return data.map( Character )
}
