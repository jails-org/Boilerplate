import apis from '../data/apis'
import chalk from 'chalk'

export default () => {

	const promises = []

	for( const name in apis ) {
		const promise = apis[name]()
			.then(data => ({ data, name }))
			.catch( (err) => {
				ErrorMessage( {err, name })
				return { data: {}, name }
			})
		promises.push(promise)
	}

	return Promise.all( promises )
		.then((all) => {
			const data = all.reduce((acc, item) => {
				acc[item.name] = item.data
				return acc
			}, {})
			return data
		})
		.catch( _ => ({ }))
}

const ErrorMessage = ({ err, name }) => {
	console.log(
		chalk.bold.red('❌  [ API ERROR ]'),
		'at',
		chalk.yellow(name),
		'===>',
		chalk.bgRed.bold.white(` ${err.message} `)
	)
}
