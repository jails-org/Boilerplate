import jails from 'jails-js'
import main  from 'shared/main'
import dependencies from 'shared/dependencies'

// @Components
import * as application from 'shared/application'
import * as page from './page'
import * as form from 'jails.packages5/form'
import * as registerUser from './components/register-user'

// @Application
jails.register('application', application, dependencies)
jails.register('form-example', page, dependencies)

// @Components
jails.register('register-user', registerUser, dependencies)
jails.register('form', form, dependencies)

main()
