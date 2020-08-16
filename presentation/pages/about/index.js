import main  from 'js/main'
import jails from 'jails-js'
import store from 'data/stores'

// @Components
import * as application from 'js/application'
import * as page from './app'
import * as rickandmorty from './components/rickandmorty'

// @Dependencies
const dependencies = {
	store: store()
}

// @Application
jails.register('application', application, dependencies)
jails.register('about', page, dependencies)


// @Components
jails.register('rickandmorty', rickandmorty, dependencies)
main()
