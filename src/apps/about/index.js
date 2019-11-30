import main from 'main'
import jails from 'jails-js'
import store from 'store'

// @Components
import * as application from 'application'
import * as page from './app'
import * as hello from 'components/hello-world'


// @Dependencies
const dependencies = {
	store: store()
}

// @Application
jails.register('application', application, dependencies)
jails.register('about', page, dependencies)

// @Components
jails.register('hello-world', hello, dependencies)

main()
