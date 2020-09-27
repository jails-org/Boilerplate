import jails 	  from 'jails-js'
import HelloWorld from '../webcomponents/hello-world'

import 'axios'

export default () => {

	process.env.NODE_ENV == 'development'
		? jails.devStart()
		: jails.start()

	// All web components should be defined after jails start
	customElements.define('hello-world', HelloWorld)

	// Uncomment to unleash PWA features
	// if ('serviceWorker' in navigator) {
	// 	window.addEventListener('load', () => {
	// 		navigator.serviceWorker.register('/sw.js')
	// 	})
	// }
}
