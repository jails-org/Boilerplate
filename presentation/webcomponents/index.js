export class WebComponent extends HTMLElement {

	constructor() {
		super()
		const slot = this.querySelector('slot')
		this._slot  = slot ? slot.innerHTML : ''
		this.state = { slot: this._slot }
	}

	attributeChangedCallback( name, oldValue, newValue ){
		this.onChange( name, oldValue, newValue )
	}

	onMount(){}
	onUnmount(){}
	onChange(){}

	connectedCallback() {
		this.onMount()
	}

	disconnectedCallback(){
		this.onUnmount()
	}
}
