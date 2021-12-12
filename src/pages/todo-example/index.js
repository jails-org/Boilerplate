import jails from 'jails-js'
import main  from 'shared/main'
import dependencies from 'shared/dependencies'

// @Components
import * as application from 'shared/application'
import * as page from './page'
import * as todos from './components/todos'

import store from './store'

// @Application
jails.register('application', application, dependencies)
jails.register('todo-example', page, dependencies)

// @Components
jails.register('todos', todos, {...dependencies, store: store() })

main()
