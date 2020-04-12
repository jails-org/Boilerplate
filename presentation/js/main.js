import jails from 'jails-js'
import 'axios'

import HelloWorld from '../webcomponents/hello-world'

customElements.define('hello-world', HelloWorld)

export default () => {

	process.env.NODE_ENV == 'development'
		? jails.devStart()
		: jails.start()
}
