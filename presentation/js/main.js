import jails 	  from 'jails-js'
import HelloWorld from '../webcomponents/hello-world'

import 'axios'

export default () => {

	customElements.define('hello-world', HelloWorld)

	process.env.NODE_ENV == 'development'
		? jails.devStart()
		: jails.start()

	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('/sw.js')
		})
	}
}
