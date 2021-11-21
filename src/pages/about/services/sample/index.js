// @ts-check
import axios from 'axios'
import { Character } from '../../entities/character'

/** @type { (Array) => Promise<Array> } */
export const getCharacters = async ( params = [1, 6, 7, 8, 10] ) => {

	// @ts-ignore
	const endpoint = APPCONFIG.endpoints.rickandmorty
	const {data} = await axios.get(`${endpoint}/character/${params}`)

	return data.map( Character )
}
