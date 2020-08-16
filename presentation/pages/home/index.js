import main  from 'js/main'
import jails from 'jails-js'
import store from 'data/stores'
import Router from 'jails.packages/router'

// @Components
import * as application from 'js/application'
import * as page from './app'
import * as todo from './components/todo'

// @Dependencies
const dependencies = {
	store: store(),
	router: new Router()
}

// @Application
jails.register('application', application, dependencies)
jails.register('home', page, dependencies)

// @Components
jails.register('todo', todo, dependencies)

main()
