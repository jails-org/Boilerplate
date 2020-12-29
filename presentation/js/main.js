import jails from 'jails-js'
import Counter from '../webcomponents/x-counter'

export default () => {

	process.env.NODE_ENV == 'development'
		? jails.devStart()
		: jails.start()

	// All web components should be defined after jails start
	customElements.define('x-counter', Counter)
}
