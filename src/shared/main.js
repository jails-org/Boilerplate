import jails from 'jails-js'
import Counter from '../webcomponents/x-counter'
import dependencies from './dependencies'

import * as application from 'shared/application'

export default () => {

	const start = performance.now()

	jails.register('application', application, dependencies)
	jails.start()

	const end = performance.now()

	console.log(`Jails performance speed : ${((end - start)).toFixed(2)} ms`)

	// All web components should be defined after jails start
	customElements.define('x-counter', Counter)
}
