import jails from 'jails-js'
import main  from 'shared/main'
import dependencies from 'shared/dependencies'
import store from './store'

// @Components
import * as page from './page'
import * as rickandmorty from './components/rickandmorty'

// @Application
jails.register('about', page, dependencies)

// @Components
jails.register('rickandmorty', rickandmorty, {...dependencies, store: store() })

main()
