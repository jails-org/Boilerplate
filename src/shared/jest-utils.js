
import pug 	from 'pug'
import fs 	from 'fs'
import path from 'path'

export const getPugComponent = ( src, mixin = '', options = '' ) => {
    const template = fs.readFileSync(path.resolve(`src/${src}`), 'utf-8')
	return pug.render(`${template}\n+${mixin}(${JSON.stringify(options)})`)
}
