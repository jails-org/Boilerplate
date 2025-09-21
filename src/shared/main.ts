import { register, start } from 'jails-js'
import * as application from 'shared/application'

export { register, start } from 'jails-js'
export const dependencies = {}

register('app-main', application, dependencies)

document.addEventListener('DOMContentLoaded', (e) => {
	start()
})
