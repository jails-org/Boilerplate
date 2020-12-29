import jails from 'jails-js'
import main  from 'js/main'
import dependencies from 'js/dependencies'

// @Components
import * as application from 'js/application'
import * as page from './page'
import * as todo from './components/todo'

// @Application
jails.register('application', application, dependencies)
jails.register('home', page, dependencies)

// @Components
jails.register('todo', todo, dependencies)

main()
