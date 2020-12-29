import jails from 'jails-js'
import main  from 'js/main'
import dependencies from 'js/dependencies'
import * as validators from 'components/form/validators'

// @Components
import * as application from 'js/application'
import * as page from './page'
import * as form from 'jails.packages/form'
import * as registerUser from './components/register-user'

// @Application
jails.register('application', application, dependencies)
jails.register('form-example', page, dependencies)

// @Components
jails.register('form', form, {...dependencies, validators })
jails.register('register-user', registerUser, dependencies)

main()
