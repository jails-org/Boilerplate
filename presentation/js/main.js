import jails from 'jails-js'
import 'axios'

export default () => {

	process.env.NODE_ENV == 'development'
		? jails.devStart()
		: jails.start()
}
