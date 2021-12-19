import apis	 from '../src/apis'
import chalk from 'chalk'

export default () => {
	return apis()
		.catch( err => {
			console.log( chalk.bold.red('❌  [ API ERROR ]'), '===>', chalk.bgRed.bold.white(` ${err.message} `) )
		})
}
