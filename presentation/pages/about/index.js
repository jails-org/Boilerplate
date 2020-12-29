import jails from 'jails-js'
import main  from 'js/main'
import dependencies from 'js/dependencies'

// @Services
import { getCharacters } from 'data/services/sample'

// @Components
import * as application from 'js/application'
import * as page from './page'
import * as rickandmorty from './components/rickandmorty'

// @Application
jails.register('application', application, dependencies)
jails.register('about', page, dependencies)

// @Components
jails.register('rickandmorty', rickandmorty, { ...dependencies, getCharacters })

main()
