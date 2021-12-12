import jails from 'jails-js'
import main  from 'shared/main'
import dependencies from 'shared/dependencies'

// @Components
import * as application from 'shared/application'
import * as page from './page'

// @Application
jails.register('application', application, dependencies)
jails.register('web-component-example', page, dependencies)

// @Components

main()
