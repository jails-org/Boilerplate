import fs from 'fs'

// Global Functions
export default ({ routes }) => ({

	toJSON( value = '' ){
		return JSON.stringify(value).replace(/\"/g, '\'')
	},

	getData( name ){
		return JSON.parse(fs.readFileSync(`./src/data/${name}.json`, 'utf-8'))
	},

	getRoute( app ){
		return routes.find( r => r.app === app )
	}
})
