/* Async / Await */
import 'regenerator-runtime/runtime'
import 'axios'

import jails from 'jails-js'

export default () => {

	process.env.NODE_ENV == 'development'
		? jails.devStart()
		: jails.start()
}

export const thirdParty = ( name ) => {
	return new Promise((resolve) => {
		const script = document.querySelector(`script[data-name=${name}]`)
		eval( script.text )
		resolve( script )
	})
}

