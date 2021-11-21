import jails from 'jails-js'
import main  from 'shared/main'
import dependencies from 'shared/dependencies'

// @Components
import * as application from 'shared/application'
import * as page from './page'
import * as todo from './components/todo'

// @Application
jails.register('application', application, dependencies)
jails.register('home', page, dependencies)

// @Components
jails.register('todo', todo, dependencies)

main()
