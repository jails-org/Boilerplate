
export class WebComponent extends HTMLElement {

	constructor() {
		super()
		const slot = this.querySelector('slot')
		this.state = {}
		this._slot  = slot ? slot.innerHTML : ''
	}

	setState( data = {} ) {
		this.state 	   = Object.assign( this.state, data )
		this.innerHTML = this.render( this.state, this )
	}

	attributeChangedCallback( name, oldValue, newValue ){
		this.onChange( name, oldValue, newValue )
	}

	onMount(){}
	onUnmount(){}
	onChange(){}
	render(){}

	connectedCallback() {
		this.onMount()
	}

	disconnectedCallback(){
		this.onUnmount()
	}
}

// NOOP template literal
export const html = (strings, ...keys) => {
	const lastIndex = strings.length - 1
	return (
		strings.slice(0, lastIndex).reduce((p, s, i) => p + s + keys[i], '') +
		strings[lastIndex]
	)
}

// Map items on arrays
export const map = (array, lambda) => {
	return array.map(lambda).join('')
}
