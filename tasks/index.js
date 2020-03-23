import apis from './apis'
import routes from '../presentation/routes'
import globals from './globals'

export default async () => {

	const _apis    = await apis()
	const _routes  = await routes({ APIS:_apis })

	Object.assign( global, globals({ routes:_routes }) )

	return Promise.all([
		_apis,
		_routes
	])
}
